import { forwardRef, Children, ReactNode } from 'react'
import { IconPropsContext } from '@ui-forge/icons'

import { cn } from '../../styles'
import { filterComponents, useComposedRefs, useFocus, toCSSLength } from '../../libs'
import { ContainerLayer, StateLayer, ContentLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type TabTheme = {
  enabledSelectedFillColor?: string
  enabledSelectedForegroundColor?: string
  enabledUnselectedFillColor?: string
  enabledUnselectedForegroundColor?: string
  disabledFillColor?: string
  disabledForegroundColor?: string
  hoveredFillColor?: string
  pressedFillColor?: string
  focusedBorderColor?: string
  paddingHorizontal?: string
  paddingVertical?: string
  gap?: string
}

export type TabItemSpecificProps = {
  /** 테마 커스터마이징 */
  theme?: Partial<TabTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type TabItemProps = TabItemSpecificProps & {
  /** 선택 상태 */
  selected?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  children?: ReactNode
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

/* ========================================================================
 * Main Component
 * ======================================================================== */

const InternalTabItemRoot = forwardRef<HTMLButtonElement, TabItemProps>((props, ref) => {
  const {
    children,
    selected = false,
    disabled = false,
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
    ...handlers
  } = useFocus<HTMLButtonElement>({
    onFocus,
    onBlur,
    disabled,
  })

  const refs = useComposedRefs(ref, selfRef)

  const fillColor = disabled
    ? theme?.disabledFillColor
    : selected
      ? theme?.enabledSelectedFillColor
      : theme?.enabledUnselectedFillColor

  const foregroundColor = disabled
    ? theme?.disabledForegroundColor
    : selected
      ? theme?.enabledSelectedForegroundColor
      : theme?.enabledUnselectedForegroundColor

  const className = cn(
    'relative inline-flex items-center justify-center',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    isFocused && 'ring-2 ring-offset-2 ring-blue-500',
    classProp
  )

  const style: React.CSSProperties = {
    backgroundColor: fillColor,
    color: foregroundColor,
    paddingLeft: theme?.paddingHorizontal || '16px',
    paddingRight: theme?.paddingHorizontal || '16px',
    paddingTop: theme?.paddingVertical || '8px',
    paddingBottom: theme?.paddingVertical || '8px',
    ...styleProp,
  }

  const {
    filtered: [leading, trailing],
    unfiltered: center,
  } = filterComponents(
    Children.toArray(children) as React.ReactElement[],
    TabItemLeading,
    TabItemTrailing
  )

  return (
    <ContainerLayer as="div" className={className} style={style} data-selected={selected}>
      <button
        {...rest}
        {...handlers}
        ref={refs}
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'absolute inset-0 w-full h-full',
          'bg-transparent border-none outline-none',
          'cursor-[inherit]'
        )}
        role="tab"
        aria-selected={selected}
        aria-disabled={disabled}
      />
      <StateLayer className={cn(!disabled && 'hover:bg-black/5 active:bg-black/10')} />
      <ContentLayer
        className="relative pointer-events-none"
        direction="horizontal"
        alignment="center"
        style={{ gap: theme?.gap || '4px' }}
      >
        {leading}
        {center}
        {trailing}
      </ContentLayer>
    </ContainerLayer>
  )
})

/* ========================================================================
 * Sub-components
 * ======================================================================== */

export type TabItemLeadingProps = {
  size?: number
  children: React.ReactNode
}

const TabItemLeading: React.FC<TabItemLeadingProps> = ({ size = 20, children }) => (
  <span className="inline-flex items-center justify-center">
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
  </span>
)

export type TabItemTrailingProps = {
  size?: number
  children: React.ReactNode
}

const TabItemTrailing: React.FC<TabItemTrailingProps> = ({ size = 20, children }) => (
  <span className="inline-flex items-center justify-center">
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
  </span>
)

/* ========================================================================
 * Export
 * ======================================================================== */

type TabItemComponent = typeof InternalTabItemRoot & {
  Leading: typeof TabItemLeading
  Trailing: typeof TabItemTrailing
}

/**
 * 탭 컴포넌트
 *
 * @example
 * ```tsx
 * <TabItem selected onClick={handleClick}>
 *   탭 1
 * </TabItem>
 * ```
 */
export const TabItem: TabItemComponent = Object.assign(InternalTabItemRoot, {
  Leading: TabItemLeading,
  Trailing: TabItemTrailing,
})
