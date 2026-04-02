import {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  Children,
  PropsWithChildren,
  useCallback,
  cloneElement,
} from 'react'

import { cn } from '../../styles'
import {
  useControllableState,
  toCSSLength,
  getReactElementRef,
  findComponent,
} from '../../libs'
import { Portal, Presence, useUniqueID } from '../primitives'
import { ContentLayer, ContentLayerProps } from '../primitives/Layer'
import { OverlayContainerLayer, OverlayContainerLayerProps } from '../primitives/Overlay'

import { SnackbarProvider, useSnackbarContext } from './Toast.lib'

/* ========================================================================
 * Types
 * ======================================================================== */

export type SnackbarTheme = {
  fillColor?: string
  foregroundColor?: string
  radius?: string
  padding?: string
  gap?: string
}

export type ToastSpecificProps = {
  /** Toast 너비 @defaultValue '100%' */
  width?: number | string
  /** Toast 높이 @defaultValue 'fit-content' */
  height?: number | string
  /** @defaultValue 'start' */
  arrangement?: ContentLayerProps['arrangement']
  /** @defaultValue 'center' */
  alignment?: ContentLayerProps['alignment']
  /** 테마 커스터마이징 */
  theme?: Partial<SnackbarTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type ToastProps = ToastSpecificProps & {
  /** 열림 여부 (비제어) @defaultValue false */
  defaultIsPresented?: boolean
  /** 열림 여부 (제어) */
  isPresented?: boolean
  /** 열림/닫힘 상태 변경 콜백 */
  onIsPresentedChange?: (event: { newValue: boolean; when: 'before' | 'after' }) => void
  /** 고유 ID */
  id?: string
  /** z-index 값 @defaultValue '300' */
  elevation?: OverlayContainerLayerProps['elevation']
  /**
   * 스크린 리더 공지 우선순위
   * - 'polite': 일반 알림 (role="status", aria-live="polite")
   * - 'assertive': 긴급 알림 (role="alert", aria-live="assertive")
   * @defaultValue 'polite'
   */
  priority?: 'polite' | 'assertive'
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, keyof ToastSpecificProps | 'children' | 'open'>

/* ========================================================================
 * Main Component
 * ======================================================================== */

export const ToastRoot = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      width = '100%',
      height = 'fit-content',
      className: classNameProp,
      defaultIsPresented = false,
      isPresented: isPresentedProp,
      onIsPresentedChange,
      id: idProp,
      elevation = '300',
      priority = 'polite',
      children,
      style: styleProp,
      arrangement = 'start',
      alignment = 'center',
      theme,
      ...rest
    },
    forwardedRef
  ) => {
    const id = useUniqueID(idProp)

    const [isPresented, handleIsPresentedChange] = useControllableState({
      value: isPresentedProp,
      defaultValue: defaultIsPresented,
      onChange: (newValue: boolean) => {
        onIsPresentedChange?.({
          newValue,
          when: 'after',
        })
      },
    })

    const changeIsPresented = useCallback(
      (params: Parameters<typeof handleIsPresentedChange>[0]) => {
        const newValue = params.value
        const currentValue = isPresented

        if (currentValue !== newValue) {
          onIsPresentedChange?.({
            newValue,
            when: 'before',
          })
        }

        handleIsPresentedChange(params)
      },
      [isPresented, handleIsPresentedChange, onIsPresentedChange]
    )

    const { trigger, leading, center, trailing } = findComponent({
      childrenArray: Children.toArray(children),
      target: [
        { name: 'trigger', component: ToastTrigger },
        { name: 'leading', component: ToastLeading },
        { name: 'center', component: ToastCenter },
        { name: 'trailing', component: ToastTrailing },
      ],
    })

    const className = cn(
      'relative rounded-lg',
      'bg-gray-800 text-white',
      'shadow-lg',
      classNameProp
    )

    const style: React.CSSProperties = {
      width: toCSSLength(width),
      height: toCSSLength(height),
      backgroundColor: theme?.fillColor,
      color: theme?.foregroundColor,
      borderRadius: theme?.radius || '8px',
      padding: theme?.padding || '12px 16px',
      ...styleProp,
    }

    return (
      <SnackbarProvider id={id} isPresented={isPresented} changeIsPresented={changeIsPresented}>
        {trigger}
        <Portal>
          <Presence present={isPresented}>
            <OverlayContainerLayer
              {...rest}
              ref={forwardedRef}
              className={className}
              style={style}
              elevation={elevation}
              role={priority === 'assertive' ? 'alert' : 'status'}
              aria-live={priority}
              id={id}
            >
              <ContentLayer
                direction="horizontal"
                alignment={alignment}
                arrangement={arrangement}
                className="relative"
                style={{ gap: theme?.gap || '12px' }}
              >
                {leading && leading}
                {center}
                {trailing && trailing}
              </ContentLayer>
            </OverlayContainerLayer>
          </Presence>
        </Portal>
      </SnackbarProvider>
    )
  }
)

/* ========================================================================
 * Sub-components
 * ======================================================================== */

const ToastLeading = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cn('flex-shrink-0', className)}>
      {children}
    </div>
  )
)

interface ToastCenterProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  alignment?: ContentLayerProps['alignment']
}

const ToastCenter = forwardRef<HTMLDivElement, ToastCenterProps>(
  ({ children, className, alignment = 'top', style: styleProp, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cn('flex-1 min-w-0', className)}
      style={{
        alignSelf: alignment === 'top' ? 'flex-start' : alignment === 'center' ? 'center' : 'flex-end',
        ...styleProp,
      }}
    >
      {children}
    </div>
  )
)

const ToastTrailing = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cn('flex-shrink-0', className)}>
      {children}
    </div>
  )
)

export const ToastTrigger: React.FC<PropsWithChildren> = ({ children }) => {
  const { changeIsPresented, id, isPresented } = useSnackbarContext('Toast.Trigger')

  const child = Children.only(children) as React.ReactElement
  const childProps = child.props as React.HTMLAttributes<HTMLElement>

  const props = {
    ...childProps,
    ...(child.type === 'button'
      ? {
          'aria-controls': id,
          'aria-expanded': isPresented,
        }
      : {}),
  }

  const handleClick: React.MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      props.onClick?.(e)
      changeIsPresented({
        changeParams: [true],
        value: true,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onClick, changeIsPresented]
  )

  return cloneElement(child, {
    ref: getReactElementRef(child),
    ...props,
    onClick: handleClick,
  } as React.HTMLAttributes<HTMLElement>)
}

export type ToastCloseProps = {
  children: React.ReactElement
}

export const ToastClose: React.FC<ToastCloseProps> = ({ children }) => {
  const { changeIsPresented } = useSnackbarContext('Toast.Close')

  const child = Children.only(children)
  const childProps = child.props as React.HTMLAttributes<HTMLElement>

  const handleClick: React.MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      childProps.onClick?.(e)
      changeIsPresented({
        changeParams: [false],
        value: false,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childProps.onClick, changeIsPresented]
  )

  return cloneElement(child, {
    ref: getReactElementRef(child),
    ...childProps,
    onClick: handleClick,
  } as React.HTMLAttributes<HTMLElement>)
}

/* ========================================================================
 * Export
 * ======================================================================== */

type ToastComponent = typeof ToastRoot & {
  Leading: typeof ToastLeading
  Center: typeof ToastCenter
  Trailing: typeof ToastTrailing
  Trigger: typeof ToastTrigger
  Close: typeof ToastClose
}

/**
 * 스낵바 컴포넌트
 *
 * @example
 * ```tsx
 * <Toast defaultIsPresented>
 *   <Toast.Leading>📢</Toast.Leading>
 *   <Toast.Center>메시지입니다</Toast.Center>
 *   <Toast.Trailing>닫기</Toast.Trailing>
 * </Toast>
 * ```
 */
export const Toast: ToastComponent = Object.assign(ToastRoot, {
  Leading: ToastLeading,
  Center: ToastCenter,
  Trailing: ToastTrailing,
  Trigger: ToastTrigger,
  Close: ToastClose,
})
