import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
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
import {
  OverlayContainerLayer,
  OverlayContainerLayerProps,
} from '../primitives/Overlay/OverlayContainerLayer'

import { SheetProvider, useSheetContext } from './Sheet.lib'

/* ========================================================================
 * Types
 * ======================================================================== */

export type SheetTheme = {
  fillColor?: string
  foregroundColor?: string
  radius?: string
  padding?: string
}

export type SheetSpecificProps = {
  /** 너비 @defaultValue '100%' */
  width?: number | string
  /** 높이 @defaultValue 'fit-content' */
  height?: number | string
  /** 테마 커스터마이징 */
  theme?: Partial<SheetTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type SheetProps = SheetSpecificProps & {
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
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, keyof SheetSpecificProps | 'children' | 'open'>

/* ========================================================================
 * Main Component
 * ======================================================================== */

export const SheetRoot = forwardRef<HTMLDivElement, SheetProps>(
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
        onIsPresentedChange?.({ newValue, when: 'after' })
      },
    })

    const changeIsPresented = useCallback(
      (params: Parameters<typeof handleIsPresentedChange>[0]) => {
        const newValue = params.value
        if (isPresented !== newValue) {
          onIsPresentedChange?.({ newValue, when: 'before' })
        }
        handleIsPresentedChange(params)
      },
      [isPresented, handleIsPresentedChange, onIsPresentedChange]
    )

    const { trigger, header, content, footer } = findComponent({
      childrenArray: Children.toArray(children),
      target: [
        { name: 'trigger', component: SheetTrigger },
        { name: 'header', component: SheetHeader },
        { name: 'content', component: SheetContent },
        { name: 'footer', component: SheetFooter },
      ],
    })

    const className = cn(
      'fixed bottom-0 left-0 right-0',
      'rounded-t-xl',
      'bg-white dark:bg-gray-800',
      'shadow-xl',
      classNameProp
    )

    const style: React.CSSProperties = {
      width: toCSSLength(width),
      height: toCSSLength(height),
      backgroundColor: theme?.fillColor,
      color: theme?.foregroundColor,
      borderRadius: theme?.radius || '12px 12px 0 0',
      padding: theme?.padding,
      zIndex: elevation,
      ...styleProp,
    }

    return (
      <SheetProvider id={id} isPresented={isPresented} changeIsPresented={changeIsPresented}>
        {trigger}
        <Portal>
          <Scrim isPresented={isPresented} elevation={elevation} />
          <Presence present={isPresented}>
            <OverlayContainerLayer
              {...rest}
              ref={forwardedRef}
              className={className}
              style={style}
              onDismiss={() => {
                changeIsPresented({ changeParams: [false], value: false })
              }}
              elevation={elevation}
            >
              <ContentLayer direction="vertical" alignment="top" arrangement="start">
                {header}
                {content}
                {footer}
              </ContentLayer>
            </OverlayContainerLayer>
          </Presence>
        </Portal>
      </SheetProvider>
    )
  }
)

/* ========================================================================
 * Sub-components
 * ======================================================================== */

const SheetHeader = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} {...rest} className={cn('p-4 border-b border-gray-200', className)}>
      {children}
    </div>
  )
)

const SheetContent = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} {...rest} className={cn('p-4 flex-1 overflow-auto', className)}>
      {children}
    </div>
  )
)

const SheetFooter = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} {...rest} className={cn('p-4 border-t border-gray-200', className)}>
      {children}
    </div>
  )
)

export const SheetTrigger: React.FC<PropsWithChildren> = ({ children }) => {
  const { changeIsPresented, id, isPresented } = useSheetContext('Sheet.Trigger')

  const child = Children.only(children) as React.ReactElement
  const childProps = child.props as React.HTMLAttributes<HTMLElement>

  const handleClick = useCallback(() => {
    changeIsPresented({ changeParams: [true], value: true })
  }, [changeIsPresented])

  return cloneElement(child, {
    ref: getReactElementRef(child),
    ...childProps,
    'aria-haspopup': 'dialog',
    'aria-controls': id,
    'aria-expanded': isPresented,
    onClick: composeEventHandlers(childProps.onClick, handleClick),
  } as React.HTMLAttributes<HTMLElement>)
}

export const SheetClose: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { changeIsPresented } = useSheetContext('Sheet.Close')

  const child = Children.only(children)
  const childProps = child.props as React.HTMLAttributes<HTMLElement>

  const handleClick = useCallback(() => {
    changeIsPresented({ changeParams: [false], value: false })
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

type SheetComponent = typeof SheetRoot & {
  Trigger: typeof SheetTrigger
  Header: typeof SheetHeader
  Content: typeof SheetContent
  Footer: typeof SheetFooter
  Close: typeof SheetClose
}

/**
 * 바텀 시트 컴포넌트
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <Sheet.Trigger><Button>열기</Button></Sheet.Trigger>
 *   <Sheet.Header>제목</Sheet.Header>
 *   <Sheet.Content>내용</Sheet.Content>
 *   <Sheet.Footer>
 *     <Sheet.Close><Button>닫기</Button></Sheet.Close>
 *   </Sheet.Footer>
 * </Sheet>
 * ```
 */
export const Sheet: SheetComponent = Object.assign(SheetRoot, {
  Trigger: SheetTrigger,
  Header: SheetHeader,
  Content: SheetContent,
  Footer: SheetFooter,
  Close: SheetClose,
})
