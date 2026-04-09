import { IconPropsContext } from '@heejun-com/icons'
import { Children, forwardRef, MouseEvent, ReactNode, useCallback } from 'react'

import { cn } from '../../styles'
import {
  useComposedRefs,
  useControllableState,
  useFocus,
  toCSSLength,
  filterComponents,
} from '../../libs'
import { ContainerLayer, StateLayer, ContentLayer, BorderLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type ChipTheme = {
  enabledSelectedFillColor?: string
  enabledSelectedBorderColor?: string
  enabledSelectedForegroundColor?: string
  disabledSelectedFillColor?: string
  disabledSelectedBorderColor?: string
  disabledSelectedForegroundColor?: string
  enabledUnselectedFillColor?: string
  enabledUnselectedBorderColor?: string
  enabledUnselectedForegroundColor?: string
  disabledUnselectedFillColor?: string
  disabledUnselectedBorderColor?: string
  disabledUnselectedForegroundColor?: string
  focusedSelectedBorderColor?: string
  focusedUnselectedBorderColor?: string
  hoveredFillColor?: string
  pressedFillColor?: string
  radius?: string
  paddingHorizontal?: string
  paddingVertical?: string
  gap?: string
}

export type ChipSpecificProps = {
  /** 테마 커스터마이징 */
  theme?: Partial<ChipTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

type ChipCommonProps = {
  /** 선택된 상태 여부 (제어) */
  selected?: boolean
  /** 선택된 상태 여부 (비제어) */
  defaultSelected?: boolean
  /** Container 테두리 두께 @defaultValue `1` */
  borderWidth?: number | string
}

export type ChipPropsAsButton = ChipSpecificProps &
  ChipCommonProps & {
    as?: 'button'
    disabled?: boolean
  } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'>

export type ChipPropsAsAnchor = ChipSpecificProps &
  ChipCommonProps & {
    as: 'a'
  } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'>

export type ChipProps = ChipPropsAsButton | ChipPropsAsAnchor

/* ========================================================================
 * Main Component
 * ======================================================================== */

const ChipRoot = forwardRef<HTMLButtonElement | HTMLAnchorElement, ChipProps>((props, ref) => {
  const {
    children,
    selected: selectedProp,
    defaultSelected = false,
    borderWidth = 1,
    onClick,
    onFocus,
    onBlur,
    className: classProp,
    style: styleProp,
    theme,
    as = 'button',
    ...rest
  } = props

  const disabled = as === 'button' ? ((rest as ChipPropsAsButton).disabled ?? false) : false

  const [selected, handleChange] = useControllableState({
    value: selectedProp,
    defaultValue: defaultSelected,
    onChange: onClick as (e: MouseEvent<HTMLButtonElement>) => void,
  })

  const {
    isFocused,
    ref: selfRef,
    handlers,
  } = useFocus<HTMLButtonElement | HTMLAnchorElement>({
    onFocus: onFocus as React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>,
    onBlur: onBlur as React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>,
    disabled: as === 'button' ? disabled : false,
  })

  const refs = useComposedRefs(ref, selfRef)

  // 상태별 색상 결정
  const fillColor = disabled
    ? selected
      ? theme?.disabledSelectedFillColor
      : theme?.disabledUnselectedFillColor
    : selected
      ? theme?.enabledSelectedFillColor
      : theme?.enabledUnselectedFillColor

  const borderColor = isFocused
    ? selected
      ? theme?.focusedSelectedBorderColor
      : theme?.focusedUnselectedBorderColor
    : disabled
      ? selected
        ? theme?.disabledSelectedBorderColor
        : theme?.disabledUnselectedBorderColor
      : selected
        ? theme?.enabledSelectedBorderColor
        : theme?.enabledUnselectedBorderColor

  const foregroundColor = disabled
    ? selected
      ? theme?.disabledSelectedForegroundColor
      : theme?.disabledUnselectedForegroundColor
    : selected
      ? theme?.enabledSelectedForegroundColor
      : theme?.enabledUnselectedForegroundColor

  const className = cn(
    'relative inline-flex items-center',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    isFocused && 'ring-2 ring-offset-2 ring-blue-500',
    classProp
  )

  const style: React.CSSProperties = {
    borderRadius: theme?.radius || '9999px',
    paddingLeft: theme?.paddingHorizontal || '12px',
    paddingRight: theme?.paddingHorizontal || '12px',
    paddingTop: theme?.paddingVertical || '6px',
    paddingBottom: theme?.paddingVertical || '6px',
    backgroundColor: fillColor,
    borderWidth: toCSSLength(borderWidth),
    borderStyle: 'solid',
    borderColor: borderColor,
    color: foregroundColor,
    ...styleProp,
  }

  const {
    filtered: [leading, trailing],
    unfiltered,
  } = filterComponents(
    Children.toArray(children) as Awaited<ReactNode>[],
    ChipLeading,
    ChipTrailing
  )

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) =>
      handleChange({
        changeParams: [e as MouseEvent<HTMLButtonElement>],
        value: !selected,
      }),
    [handleChange, selected]
  )

  return (
    <ContainerLayer
      {...rest}
      as={as}
      className={className}
      type={as === 'button' ? 'button' : undefined}
      style={style}
      {...handlers}
      ref={refs}
      disabled={disabled}
      onClick={as === 'button' ? handleClick : undefined}
      data-selected={selected}
    >
      <StateLayer className={cn(!disabled && 'hover:bg-black/5 active:bg-black/10')} />
      <ContentLayer
        className="relative"
        direction="horizontal"
        alignment="center"
        style={{ gap: theme?.gap || '4px' }}
      >
        {leading}
        {unfiltered}
        {trailing}
      </ContentLayer>
      <BorderLayer />
    </ContainerLayer>
  )
})

/* ========================================================================
 * Sub-components
 * ======================================================================== */

export type ChipLeadingProps = {
  /** leading 슬롯 크기 @defaultValue `20` */
  size?: number
  children: React.ReactElement
}

const ChipLeading: React.FC<ChipLeadingProps> = ({ size = 20, children }) => (
  <span
    className="inline-flex items-center justify-center"
    onClick={(e) => isClickable(children) && e.stopPropagation()}
  >
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
  </span>
)

export type ChipTrailingProps = {
  /** trailing 슬롯 크기 @defaultValue `20` */
  size?: number
  children: React.ReactElement
}

const ChipTrailing: React.FC<ChipTrailingProps> = ({ size = 20, children }) => (
  <span
    className="inline-flex items-center justify-center"
    onClick={(e) => isClickable(children) && e.stopPropagation()}
  >
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
  </span>
)

const isClickable = (node: React.ReactElement): boolean =>
  typeof (node.props as React.HTMLAttributes<HTMLElement>)?.onClick === 'function'

/* ========================================================================
 * Export
 * ======================================================================== */

type ChipComponent = typeof ChipRoot & {
  Leading: typeof ChipLeading
  Trailing: typeof ChipTrailing
}

/**
 * 칩 컴포넌트
 *
 * @example
 * ```tsx
 * <Chip defaultSelected>
 *   <Chip.Leading><CheckIcon /></Chip.Leading>
 *   칩
 *   <Chip.Trailing><CloseIcon /></Chip.Trailing>
 * </Chip>
 * ```
 */
export const Chip: ChipComponent = Object.assign(ChipRoot, {
  Leading: ChipLeading,
  Trailing: ChipTrailing,
})
