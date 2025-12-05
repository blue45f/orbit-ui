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
  findComponent,
  toCSSLength,
  getReactElementRef,
  composeEventHandlers,
} from '../../libs'
import { Scrim } from '../Scrim'
import { ContentLayer, Portal, Presence, useUniqueID } from '../primitives'
import { OverlayContainerLayer, OverlayContainerLayerProps } from '../primitives/Overlay/OverlayContainerLayer'

import { AlertProvider, useAlertContext } from './AlertDialog.lib'

/* ========================================================================
 * Types
 * ======================================================================== */

export type AlertTheme = {
  fillColor?: string
  foregroundColor?: string
  radius?: string
  padding?: string
}

export type AlertDialogSpecificProps = {
  /** AlertDialog 너비 @defaultValue '100%' */
  width?: number | string
  /** AlertDialog 높이 @defaultValue 'fit-content' */
  height?: number | string
  /** AlertDialog 최대 너비 @defaultValue '300px' */
  maxWidth?: number | string
  /** 테마 커스터마이징 */
  theme?: Partial<AlertTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type AlertDialogProps = AlertDialogSpecificProps & {
  /** AlertDialog 열림 여부 (비제어) @defaultValue false */
  defaultIsPresented?: boolean
  /** AlertDialog 열림 여부 (제어) */
  isPresented?: boolean
  /** 열림/닫힘 상태 변경 콜백 */
  onIsPresentedChange?: (event: { newValue: boolean; when: 'before' | 'after' }) => void
  /** AlertDialog 고유 ID */
  id?: string
  /** z-index 값 @defaultValue '300' */
  elevation?: OverlayContainerLayerProps['elevation']
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, keyof AlertDialogSpecificProps | 'children' | 'open'>

/* ========================================================================
 * Main Component
 * ======================================================================== */

export const AlertDialogRoot = forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      width = '100%',
      height = 'fit-content',
      maxWidth = 300,
      className: classNameProp,
      defaultIsPresented = false,
      isPresented: isPresentedProp,
      onIsPresentedChange,
      id: idProp,
      elevation = '300',
      children,
      style: styleProp,
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

    const { trigger, top, bottom } = findComponent({
      childrenArray: Children.toArray(children),
      target: [
        { name: 'trigger', component: AlertDialogTrigger },
        { name: 'top', component: AlertDialogTop },
        { name: 'bottom', component: AlertDialogBottom },
      ],
    })

    const className = cn(
      'relative rounded-xl',
      'bg-white dark:bg-gray-800',
      'shadow-xl',
      classNameProp
    )

    const style: React.CSSProperties = {
      width: toCSSLength(width),
      height: toCSSLength(height),
      maxWidth: toCSSLength(maxWidth),
      backgroundColor: theme?.fillColor,
      color: theme?.foregroundColor,
      borderRadius: theme?.radius || '12px',
      padding: theme?.padding,
      ...styleProp,
    }

    return (
      <AlertProvider id={id} isPresented={isPresented} changeIsPresented={changeIsPresented}>
        {trigger}
        <Portal>
          <Scrim isPresented={isPresented} elevation={elevation} />
          <Presence present={isPresented}>
            <OverlayContainerLayer
              {...rest}
              ref={forwardedRef}
              className={className}
              style={style}
              dismissOnEscape={false}
              dismissOnClickOutside={false}
              dismissOnFocusOutside={false}
              onDismiss={() => {
                changeIsPresented({ changeParams: [false], value: false })
              }}
              elevation={elevation}
            >
              <ContentLayer direction="vertical" alignment="top" arrangement="start">
                {top}
                {bottom}
              </ContentLayer>
            </OverlayContainerLayer>
          </Presence>
        </Portal>
      </AlertProvider>
    )
  }
)

/* ========================================================================
 * Sub-components
 * ======================================================================== */

const AlertDialogTop = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} {...rest} className={cn('p-6', className)}>
      {children}
    </div>
  )
)

const AlertDialogBottom = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} {...rest} className={cn('p-4 flex gap-2', className)}>
      {children}
    </div>
  )
)

export const AlertDialogTrigger: React.FC<PropsWithChildren> = ({ children }) => {
  const { changeIsPresented, id, isPresented } = useAlertContext('AlertDialog.Trigger')

  const child = Children.only(children) as React.ReactElement
  const childProps = child.props as React.HTMLAttributes<HTMLElement>

  const isButton = child.type === 'button'
  const isAnchor = child.type === 'a'
  const isInteractiveElement = isButton || isAnchor

  const props = {
    ...childProps,
    'aria-haspopup': 'dialog',
    'aria-controls': id,
    'aria-expanded': isPresented,
    ...(isInteractiveElement ? {} : { role: 'button', tabIndex: 0 }),
  }

  const handleClick: React.MouseEventHandler<HTMLElement> = useCallback(() => {
    changeIsPresented({
      changeParams: [true],
      value: true,
    })
  }, [changeIsPresented])

  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = useCallback(
    (e) => {
      if (!isInteractiveElement && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        changeIsPresented({
          changeParams: [true],
          value: true,
        })
      }
    },
    [isInteractiveElement, changeIsPresented]
  )

  return cloneElement(child, {
    ref: getReactElementRef(child),
    ...props,
    onClick: composeEventHandlers(childProps.onClick, handleClick),
    ...(isInteractiveElement ? {} : { onKeyDown: composeEventHandlers(childProps.onKeyDown, handleKeyDown) }),
  } as React.HTMLAttributes<HTMLElement>)
}

export type AlertDialogCloseProps = {
  children: React.ReactElement
}

export const AlertDialogClose: React.FC<AlertDialogCloseProps> = ({ children }) => {
  const { changeIsPresented } = useAlertContext('AlertDialog.Close')

  const child = Children.only(children)
  const childProps = child.props as React.HTMLAttributes<HTMLElement>

  const handleClick: React.MouseEventHandler<HTMLElement> = useCallback(() => {
    changeIsPresented({
      changeParams: [false],
      value: false,
    })
  }, [changeIsPresented])

  return cloneElement(child, {
    ref: getReactElementRef(child),
    ...childProps,
    onClick: composeEventHandlers(childProps.onClick, handleClick),
  } as React.HTMLAttributes<HTMLElement>)
}

/* ========================================================================
 * Export
 * ======================================================================== */

type AlertDialogComponent = typeof AlertDialogRoot & {
  Trigger: typeof AlertDialogTrigger
  Top: typeof AlertDialogTop
  Bottom: typeof AlertDialogBottom
  Close: typeof AlertDialogClose
}

/**
 * 알림 다이얼로그 컴포넌트
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialog.Trigger>
 *     <Button>열기</Button>
 *   </AlertDialog.Trigger>
 *   <AlertDialog.Top>제목</AlertDialog.Top>
 *   <AlertDialog.Bottom>
 *     <AlertDialog.Close>
 *       <Button>확인</Button>
 *     </AlertDialog.Close>
 *   </AlertDialog.Bottom>
 * </AlertDialog>
 * ```
 */
export const AlertDialog: AlertDialogComponent = Object.assign(AlertDialogRoot, {
  Trigger: AlertDialogTrigger,
  Top: AlertDialogTop,
  Bottom: AlertDialogBottom,
  Close: AlertDialogClose,
})
