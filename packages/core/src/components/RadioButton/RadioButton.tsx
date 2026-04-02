import { forwardRef } from 'react'

import { cn } from '../../styles'
import { toCSSLength, useComposedRefs, useFocus } from '../../libs'
import { BorderLayer, ContainerLayer, StateLayer } from '../primitives/Layer'
import { useUniqueID } from '../primitives/UniqueIDProvider'

/* ========================================================================
 * Types
 * ======================================================================== */

export type RadioTheme = {
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
}

export type RadioButtonSpecificProps = {
  /**
   * Container 너비
   * @defaultValue `24`
   */
  width?: number | string
  /**
   * Container 높이
   * @defaultValue `24`
   */
  height?: number | string
  /**
   * @defaultValue `1`
   */
  borderWidth?: number | string
  children: React.ReactNode
  /** 테마 커스터마이징 */
  theme?: Partial<RadioTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type RadioButtonProps = RadioButtonSpecificProps & {
  /** 체크 여부 (제어 컴포넌트) */
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  /** 비활성화 여부 */
  disabled?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'disabled' | 'children' | 'onChange'>

/* ========================================================================
 * Main Component
 * ======================================================================== */

export const RadioButtonRoot = forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const {
    id: idProp,
    children,
    value,
    name,
    checked = false,
    disabled = false,
    className: classProp,
    width = 24,
    height = 24,
    style: styleProp,
    borderWidth = 1,
    onFocus,
    onBlur,
    theme,
    ...rest
  } = props

  const id = useUniqueID(idProp)

  const {
    isFocused,
    ref: selfRef,
    handlers,
  } = useFocus<HTMLInputElement>({
    onFocus,
    onBlur,
    disabled,
  })

  const refs = useComposedRefs(ref, selfRef)

  // 상태별 색상 결정
  const fillColor = disabled
    ? checked
      ? theme?.disabledSelectedFillColor
      : theme?.disabledUnselectedFillColor
    : checked
      ? theme?.enabledSelectedFillColor
      : theme?.enabledUnselectedFillColor

  const borderColor = isFocused
    ? checked
      ? theme?.focusedSelectedBorderColor
      : theme?.focusedUnselectedBorderColor
    : disabled
      ? checked
        ? theme?.disabledSelectedBorderColor
        : theme?.disabledUnselectedBorderColor
      : checked
        ? theme?.enabledSelectedBorderColor
        : theme?.enabledUnselectedBorderColor

  const foregroundColor = disabled
    ? checked
      ? theme?.disabledSelectedForegroundColor
      : theme?.disabledUnselectedForegroundColor
    : checked
      ? theme?.enabledSelectedForegroundColor
      : theme?.enabledUnselectedForegroundColor

  const className = cn(
    'relative inline-flex items-center justify-center rounded-full',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    isFocused && 'ring-2 ring-offset-2 ring-blue-500',
    classProp
  )

  const style: React.CSSProperties = {
    width: toCSSLength(width),
    height: toCSSLength(height),
    backgroundColor: fillColor,
    '--radio-foreground': foregroundColor,
    '--radio-border-color': borderColor,
    '--radio-border-width': toCSSLength(borderWidth),
    ...styleProp,
  } as React.CSSProperties

  return (
    <ContainerLayer as="div" style={style} className={className} data-checked={checked}>
      <input
        {...rest}
        {...handlers}
        ref={refs}
        type="radio"
        className="absolute inset-0 opacity-0 w-full h-full cursor-[inherit]"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
      />
      <StateLayer className={cn(!disabled && 'hover:bg-black/5 active:bg-black/10')} />
      <BorderLayer
        style={{
          borderWidth: 'var(--radio-border-width)',
          borderColor: 'var(--radio-border-color)',
        }}
      />
      {children}
    </ContainerLayer>
  )
})

/* ========================================================================
 * Indicator Sub-component
 * ======================================================================== */

type IndicatorProps = {
  /** Indicator 너비 */
  width: number | string
  /** Indicator 높이 */
  height: number | string
} & React.HTMLAttributes<HTMLDivElement>

export const Indicator: React.FC<IndicatorProps> = (props) => {
  const { width, height, className: classProp, style: styleProp, ...rest } = props

  return (
    <span
      className={cn(
        'absolute rounded-full',
        'bg-[var(--radio-foreground)]',
        'scale-0 transition-transform duration-150',
        '[[data-checked=true]_&]:scale-100',
        classProp
      )}
      style={{
        width: toCSSLength(width),
        height: toCSSLength(height),
        ...styleProp,
      }}
      {...rest}
    />
  )
}

/* ========================================================================
 * Export
 * ======================================================================== */

type RadioButtonComponent = typeof RadioButtonRoot & {
  Indicator: typeof Indicator
}

/**
 * 라디오 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <RadioButton name="options" value="1" checked={selected === '1'} onChange={handleChange}>
 *   <RadioButton.Indicator width={12} height={12} />
 * </RadioButton>
 * ```
 */
export const RadioButton: RadioButtonComponent = Object.assign(RadioButtonRoot, {
  Indicator,
})
