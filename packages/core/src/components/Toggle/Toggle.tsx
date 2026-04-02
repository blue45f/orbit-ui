import { forwardRef } from 'react'

import { cn } from '../../styles'
import {
  countElements,
  errorDev,
  toCSSLength,
  useComposedRefs,
  useControllableState,
  useFocus,
} from '../../libs'
import { ContainerLayer, StateLayer, ShapeLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type SwitchTheme = {
  enabledOnFillColor?: string
  enabledOnBorderColor?: string
  enabledOnForegroundColor?: string
  disabledOnFillColor?: string
  disabledOnBorderColor?: string
  disabledOnForegroundColor?: string
  enabledOffFillColor?: string
  enabledOffBorderColor?: string
  enabledOffForegroundColor?: string
  disabledOffFillColor?: string
  disabledOffBorderColor?: string
  disabledOffForegroundColor?: string
  focusedOnBorderColor?: string
  focusedOffBorderColor?: string
  hoveredFillColor?: string
  pressedFillColor?: string
  radius?: string
}

export type ToggleSpecificProps = {
  /**
   * Container 너비
   * @defaultValue `38`
   */
  width?: number | string
  /**
   * Container 높이
   * @defaultValue `24`
   */
  height?: number | string
  /**
   * Container 테두리 두께
   * @defaultValue `1`
   */
  borderWidth?: number | string
  children: React.ReactNode
  /** 테마 커스터마이징 */
  theme?: Partial<SwitchTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type ToggleProps = ToggleSpecificProps & {
  /** 체크 여부 (제어) */
  checked?: boolean
  /** 체크 여부 (비제어) */
  defaultChecked?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 체크 여부 변경 이벤트 핸들러 */
  onChange?: React.ChangeEventHandler<HTMLInputElement>
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'checked' | 'defaultChecked' | 'disabled' | 'children' | 'onChange'
  >

/* ========================================================================
 * Main Component
 * ======================================================================== */

const ToggleRoot = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const {
    width = 38,
    height = 24,
    borderWidth = 1,
    checked: checkedProp,
    defaultChecked = false,
    disabled = false,
    children,
    onChange,
    onFocus,
    onBlur,
    className: classProp,
    style: styleProp,
    theme,
    ...rest
  } = props

  const [checked, handleChange] = useControllableState({
    value: checkedProp,
    defaultValue: defaultChecked,
    onChange,
  })

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
  const thumbExists = countElements(children, ToggleThumb) === 1

  if (!thumbExists) errorDev('Toggle.Thumb 서브컴포넌트를 전달해주세요.')

  // 상태별 색상 결정 (fallback 값으로 시각적 기본 스타일 보장)
  const fillColor = disabled
    ? checked
      ? (theme?.disabledOnFillColor ?? 'rgba(0,0,0,0.12)')
      : (theme?.disabledOffFillColor ?? 'rgba(0,0,0,0.06)')
    : checked
      ? (theme?.enabledOnFillColor ?? '#2563EB')
      : (theme?.enabledOffFillColor ?? 'rgba(0,0,0,0.12)')

  const borderColor = isFocused
    ? checked
      ? (theme?.focusedOnBorderColor ?? '#2563EB')
      : (theme?.focusedOffBorderColor ?? '#94A3B8')
    : disabled
      ? checked
        ? (theme?.disabledOnBorderColor ?? 'transparent')
        : (theme?.disabledOffBorderColor ?? 'transparent')
      : checked
        ? (theme?.enabledOnBorderColor ?? 'transparent')
        : (theme?.enabledOffBorderColor ?? 'transparent')

  const foregroundColor = disabled
    ? checked
      ? (theme?.disabledOnForegroundColor ?? 'white')
      : (theme?.disabledOffForegroundColor ?? 'rgba(0,0,0,0.26)')
    : checked
      ? (theme?.enabledOnForegroundColor ?? 'white')
      : (theme?.enabledOffForegroundColor ?? 'white')

  const className = cn(
    'relative inline-block',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    isFocused && 'ring-2 ring-offset-2 ring-blue-500',
    classProp
  )

  const style: React.CSSProperties = {
    width: toCSSLength(width),
    height: toCSSLength(height),
    borderWidth: toCSSLength(borderWidth),
    borderStyle: 'solid',
    borderRadius: theme?.radius || '9999px',
    backgroundColor: fillColor,
    borderColor: borderColor,
    '--switch-foreground': foregroundColor,
    '--switch-width': toCSSLength(width),
    '--switch-height': toCSSLength(height),
    ...styleProp,
  } as React.CSSProperties

  return (
    <ContainerLayer as="div" className={className} style={style} data-checked={checked}>
      <input
        {...rest}
        {...handlers}
        ref={refs}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        checked={checked}
        className={cn('absolute inset-0 opacity-0 w-full h-full cursor-[inherit]')}
        onChange={(e) => {
          handleChange({
            changeParams: [e],
            value: e.target.checked,
          })
        }}
      />
      <StateLayer
        className={cn(
          !disabled && 'hover:bg-black/5 active:bg-black/10'
        )}
      />
      <ShapeLayer>{children}</ShapeLayer>
    </ContainerLayer>
  )
})

/* ========================================================================
 * Thumb Sub-component
 * ======================================================================== */

export type ToggleThumbProps = {
  /**
   * Thumb 너비
   * @defaultValue `18`
   */
  width?: number | string
  /**
   * Thumb 높이
   * @defaultValue `18`
   */
  height?: number | string
} & React.HTMLAttributes<HTMLSpanElement>

const ToggleThumb: React.FC<ToggleThumbProps> = (props) => {
  const { width = 18, height = 18, className, style } = props

  return (
    <span
      className={cn(
        'absolute rounded-full',
        'transition-transform duration-300 ease-out',
        'bg-[var(--switch-foreground,white)]',
        '[top:calc((var(--switch-height)-var(--thumb-height))/2)]',
        '[left:calc((var(--switch-height)-var(--thumb-height))/2)]',
        '[[data-checked=true]_&]:translate-x-[calc(var(--switch-width)-var(--thumb-width)-(var(--switch-height)-var(--thumb-height)))]',
        className
      )}
      style={{
        width: toCSSLength(width),
        height: toCSSLength(height),
        '--thumb-width': toCSSLength(width),
        '--thumb-height': toCSSLength(height),
        ...style,
      } as React.CSSProperties}
    />
  )
}

/* ========================================================================
 * Export
 * ======================================================================== */

type SwitchComponent = typeof ToggleRoot & {
  Thumb: typeof ToggleThumb
}

/**
 * 스위치 컴포넌트
 *
 * @example
 * ```tsx
 * <Toggle width={40} height={24} defaultChecked>
 *   <Toggle.Thumb width={20} height={20} />
 * </Toggle>
 * ```
 */
export const Toggle: SwitchComponent = Object.assign(ToggleRoot, {
  Thumb: ToggleThumb,
})
