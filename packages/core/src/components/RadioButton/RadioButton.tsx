import { forwardRef, useCallback } from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import { cn } from '../../styles'
import { toCSSLength } from '../../libs'
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
  onChange?: (checked: boolean) => void
  /** 비활성화 여부 */
  disabled?: boolean
  /** radio name group */
  name?: string
  /** radio value */
  value?: string
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'checked' | 'disabled' | 'children' | 'onChange' | 'value'
  >

/* ========================================================================
 * Main Component
 * ======================================================================== */

export const RadioButtonRoot = forwardRef<HTMLButtonElement, RadioButtonProps>((props, ref) => {
  const {
    id: idProp,
    children,
    value = '__radio_value__',
    name: _name,
    checked = false,
    disabled = false,
    className: classProp,
    width = 24,
    height = 24,
    style: styleProp,
    borderWidth = 1,
    theme,
    onChange,
    ...rest
  } = props

  const id = useUniqueID(idProp)

  // 상태별 색상 결정
  const fillColor = disabled
    ? checked
      ? theme?.disabledSelectedFillColor
      : theme?.disabledUnselectedFillColor
    : checked
      ? theme?.enabledSelectedFillColor
      : theme?.enabledUnselectedFillColor

  const borderColor = disabled
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
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
    classProp,
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

  const handleValueChange = useCallback(
    (val: string) => {
      if (val === value) {
        onChange?.(true)
      }
    },
    [onChange, value],
  )

  return (
    <RadixRadioGroup.Root
      value={checked ? value : ''}
      onValueChange={handleValueChange}
      disabled={disabled}
      style={{ display: 'contents' }}
    >
      <RadixRadioGroup.Item ref={ref} value={value} id={id} asChild {...rest}>
        <ContainerLayer as='button' type='button' style={style} className={className} data-checked={checked}>
          <StateLayer className={cn(!disabled && 'hover:bg-black/5 active:bg-black/10')} />
          <BorderLayer
            style={{
              borderWidth: 'var(--radio-border-width)',
              borderColor: 'var(--radio-border-color)',
            }}
          />
          {children}
        </ContainerLayer>
      </RadixRadioGroup.Item>
    </RadixRadioGroup.Root>
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
        classProp,
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
 * 내부적으로 @radix-ui/react-radio-group을 사용합니다.
 * 접근성(role="radio", aria-checked, keyboard navigation)이 자동으로 처리됩니다.
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
