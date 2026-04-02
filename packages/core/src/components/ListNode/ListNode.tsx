import { forwardRef, Children, ReactNode, createElement, useCallback, MouseEvent } from 'react'
import { IconPropsContext } from '@prism-ui/icons'

import { cn } from '../../styles'
import {
  filterComponents,
  useComposedRefs,
  useFocus,
  toCSSLength,
} from '../../libs'
import { StateLayer, ContentLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

type TagName = 'div' | 'li' | 'button' | 'a'

export type ListNodeTheme = {
  enabledFillColor?: string
  enabledForegroundColor?: string
  disabledFillColor?: string
  disabledForegroundColor?: string
  hoveredFillColor?: string
  pressedFillColor?: string
  focusedBorderColor?: string
  radius?: string
  paddingHorizontal?: string
  paddingVertical?: string
  gap?: string
}

export type ListNodeSpecificProps = {
  /** 테마 커스터마이징 */
  theme?: Partial<ListNodeTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type ListNodeProps = ListNodeSpecificProps & {
  /** HTML 태그 @defaultValue 'div' */
  as?: TagName
  /** 비활성화 여부 */
  disabled?: boolean
  /** 높이 */
  height?: number | string
  children?: ReactNode
} & Omit<React.HTMLAttributes<HTMLElement>, keyof ListNodeSpecificProps | 'as'>

/* ========================================================================
 * Main Component
 * ======================================================================== */

const InternalListNodeRoot = forwardRef<HTMLElement, ListNodeProps>((props, ref) => {
  const {
    children,
    disabled = false,
    height,
    as = 'div',
    onClick,
    onFocus,
    onBlur,
    theme,
    style: styleProp,
    className: classProp,
    ...rest
  } = props

  const {
    isFocused,
    ref: selfRef,
    handlers,
  } = useFocus<HTMLElement>({
    onFocus,
    onBlur,
    disabled,
  })

  const refs = useComposedRefs(ref, selfRef)

  const fillColor = disabled ? theme?.disabledFillColor : theme?.enabledFillColor
  const foregroundColor = disabled ? theme?.disabledForegroundColor : theme?.enabledForegroundColor

  const className = cn(
    'relative inline-flex w-full',
    disabled ? 'cursor-not-allowed opacity-60' : onClick ? 'cursor-pointer' : 'cursor-default',
    isFocused && 'ring-2 ring-offset-2 ring-blue-500',
    classProp
  )

  const style: React.CSSProperties = {
    backgroundColor: fillColor,
    color: foregroundColor,
    borderRadius: theme?.radius,
    paddingLeft: theme?.paddingHorizontal,
    paddingRight: theme?.paddingHorizontal,
    paddingTop: theme?.paddingVertical,
    paddingBottom: theme?.paddingVertical,
    ...(height && { height: toCSSLength(height) }),
    ...styleProp,
  }

  const {
    filtered: [leading, center, trailing],
    unfiltered,
  } = filterComponents(
    Children.toArray(children) as React.ReactElement[],
    ListNodeLeading,
    ListNodeCenter,
    ListNodeTrailing
  )

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!disabled && onClick) {
        onClick(e)
      }
    },
    [disabled, onClick]
  )

  return createElement(
    as,
    {
      ...rest,
      ...handlers,
      ref: refs,
      className,
      style,
      onClick: handleClick,
      'aria-disabled': disabled,
    },
    <>
      <StateLayer className={cn(!disabled && onClick && 'hover:bg-black/5 active:bg-black/10')} />
      <ContentLayer
        className="relative flex-1"
        direction="horizontal"
        alignment="center"
        style={{ gap: theme?.gap || '12px' }}
      >
        {leading}
        {center || unfiltered}
        {trailing}
      </ContentLayer>
    </>
  )
})

/* ========================================================================
 * Sub-components
 * ======================================================================== */

export type ListNodeLeadingProps = {
  size?: number
  children: React.ReactNode
} & React.HTMLAttributes<HTMLSpanElement>

const ListNodeLeading: React.FC<ListNodeLeadingProps> = ({
  size = 24,
  children,
  className,
  ...rest
}) => (
  <span {...rest} className={cn('inline-flex items-center justify-center flex-shrink-0', className)}>
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
  </span>
)

export type ListNodeCenterProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const ListNodeCenter: React.FC<ListNodeCenterProps> = ({ children, className, ...rest }) => (
  <div {...rest} className={cn('flex-1 min-w-0', className)}>
    {children}
  </div>
)

export type ListNodeTrailingProps = {
  size?: number
  children: React.ReactNode
} & React.HTMLAttributes<HTMLSpanElement>

const ListNodeTrailing: React.FC<ListNodeTrailingProps> = ({
  size = 24,
  children,
  className,
  ...rest
}) => (
  <span {...rest} className={cn('inline-flex items-center justify-center flex-shrink-0', className)}>
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
  </span>
)

/* ========================================================================
 * Export
 * ======================================================================== */

type ListNodeComponent = typeof InternalListNodeRoot & {
  Leading: typeof ListNodeLeading
  Center: typeof ListNodeCenter
  Trailing: typeof ListNodeTrailing
}

/**
 * 리스트 노드 컴포넌트
 *
 * @example
 * ```tsx
 * <ListNode onClick={handleClick}>
 *   <ListNode.Leading><UserIcon /></ListNode.Leading>
 *   <ListNode.Center>사용자 이름</ListNode.Center>
 *   <ListNode.Trailing><ChevronRightIcon /></ListNode.Trailing>
 * </ListNode>
 * ```
 */
export const ListNode: ListNodeComponent = Object.assign(InternalListNodeRoot, {
  Leading: ListNodeLeading,
  Center: ListNodeCenter,
  Trailing: ListNodeTrailing,
})
