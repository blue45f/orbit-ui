import { forwardRef } from 'react'

import { cn } from '../../styles'
import {
  useComposedRefs,
  useControllableState,
  useFocus,
  toCSSLength,
} from '../../libs'
import { ContainerLayer, StateLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type DotIndicatorTheme = {
  enabledSelectedFillColor?: string
  enabledUnselectedFillColor?: string
  disabledSelectedFillColor?: string
  disabledUnselectedFillColor?: string
  hoveredFillColor?: string
  pressedFillColor?: string
}

export type PageDotsSpecificProps = {
  /** 테마 커스터마이징 */
  theme?: Partial<DotIndicatorTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type PageDotsProps = PageDotsSpecificProps & {
  /** 선택 상태 (제어) */
  selected?: boolean
  /** 선택 상태 (비제어) */
  defaultSelected?: boolean
  /** 크기 @defaultValue `6` */
  size?: number | string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * 도트 인디케이터 컴포넌트
 *
 * @example
 * ```tsx
 * <PageDots selected />
 * ```
 */
export const PageDots = forwardRef<HTMLButtonElement, PageDotsProps>((props, ref) => {
  const {
    selected: selectedProp,
    defaultSelected = false,
    disabled = false,
    size = 6,
    onClick,
    onFocus,
    onBlur,
    className: classProp,
    style: styleProp,
    theme,
    ...rest
  } = props

  const [selected, handleChange] = useControllableState({
    value: selectedProp,
    defaultValue: defaultSelected,
    onChange: onClick,
  })

  const {
    isFocused,
    ref: selfRef,
    handlers,
  } = useFocus<HTMLButtonElement>({
    onFocus,
    onBlur,
    disabled,
  })

  const refs = useComposedRefs(ref, selfRef)

  const fillColor = disabled
    ? selected
      ? theme?.disabledSelectedFillColor
      : theme?.disabledUnselectedFillColor
    : selected
      ? theme?.enabledSelectedFillColor
      : theme?.enabledUnselectedFillColor

  const className = cn(
    'relative inline-flex items-center justify-center',
    'rounded-full',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    isFocused && 'ring-2 ring-offset-2 ring-blue-500',
    classProp
  )

  const sizeValue = toCSSLength(size)
  const style: React.CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    backgroundColor: fillColor,
    ...styleProp,
  }

  return (
    <ContainerLayer as="div" className={className} style={style} data-selected={selected}>
      <button
        {...rest}
        {...handlers}
        ref={refs}
        type="button"
        disabled={disabled}
        className={cn(
          'absolute inset-0 w-full h-full',
          'bg-transparent border-none outline-none',
          'rounded-full cursor-[inherit]'
        )}
        onClick={(e) => {
          handleChange({
            changeParams: [e],
            value: !selected,
          })
        }}
        aria-pressed={selected}
        aria-disabled={disabled}
      />
      <StateLayer className={cn(!disabled && 'hover:bg-black/5 active:bg-black/10')} />
    </ContainerLayer>
  )
})
