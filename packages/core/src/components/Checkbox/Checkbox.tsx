import { forwardRef } from 'react'

import { cn } from '../../styles'
import {
  toCSSLength,
  useComposedRefs,
  useControllableState,
  useFocus,
  countElements,
  errorDev,
} from '../../libs'
import { ContainerLayer, StateLayer, ShapeLayer } from '../primitives/Layer'

/* ========================================================================
 * Types
 * ======================================================================== */

export type CheckboxTheme = {
  enabledCheckedFillColor?: string
  enabledCheckedBorderColor?: string
  enabledCheckedForegroundColor?: string
  disabledCheckedFillColor?: string
  disabledCheckedBorderColor?: string
  disabledCheckedForegroundColor?: string
  enabledUncheckedFillColor?: string
  enabledUncheckedBorderColor?: string
  enabledUncheckedForegroundColor?: string
  disabledUncheckedFillColor?: string
  disabledUncheckedBorderColor?: string
  disabledUncheckedForegroundColor?: string
  focusedCheckedBorderColor?: string
  focusedCheckedForegroundColor?: string
  focusedUncheckedBorderColor?: string
  focusedUncheckedForegroundColor?: string
  hoveredFillColor?: string
  pressedFillColor?: string
  radius?: string
}

export type CheckboxSpecificProps = {
  /**
   * Container 너비
   * @defaultValue `22`
   */
  width?: number
  /**
   * Container 높이
   * @defaultValue `22`
   */
  height?: number
  /**
   * Container 외곽선 두께
   * @defaultValue `1`
   */
  borderWidth?: number
  children: React.ReactNode
  /** 테마 커스터마이징 */
  theme?: Partial<CheckboxTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type CheckboxProps = CheckboxSpecificProps & {
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

const CheckboxRoot = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    width = 22,
    height = 22,
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
    ...handlers
  } = useFocus<HTMLInputElement>({
    onFocus,
    onBlur,
    disabled,
  })

  const refs = useComposedRefs(ref, selfRef)
  const iconExists = countElements(children, CheckboxIcon) === 1

  if (!iconExists) errorDev('Checkbox.Icon 서브컴포넌트를 전달해주세요.')

  // 상태별 색상 결정
  const fillColor = disabled
    ? checked
      ? theme?.disabledCheckedFillColor
      : theme?.disabledUncheckedFillColor
    : checked
      ? theme?.enabledCheckedFillColor
      : theme?.enabledUncheckedFillColor

  const borderColor = isFocused
    ? checked
      ? theme?.focusedCheckedBorderColor
      : theme?.focusedUncheckedBorderColor
    : disabled
      ? checked
        ? theme?.disabledCheckedBorderColor
        : theme?.disabledUncheckedBorderColor
      : checked
        ? theme?.enabledCheckedBorderColor
        : theme?.enabledUncheckedBorderColor

  const foregroundColor = isFocused
    ? checked
      ? theme?.focusedCheckedForegroundColor
      : theme?.focusedUncheckedForegroundColor
    : disabled
      ? checked
        ? theme?.disabledCheckedForegroundColor
        : theme?.disabledUncheckedForegroundColor
      : checked
        ? theme?.enabledCheckedForegroundColor
        : theme?.enabledUncheckedForegroundColor

  const className = cn(
    'relative inline-flex items-center justify-center',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    isFocused && 'ring-2 ring-offset-2 ring-blue-500',
    classProp
  )

  const style: React.CSSProperties = {
    width: toCSSLength(width),
    height: toCSSLength(height),
    borderWidth: toCSSLength(borderWidth),
    borderStyle: 'solid',
    borderRadius: theme?.radius || '4px',
    backgroundColor: fillColor,
    borderColor: borderColor,
    color: foregroundColor,
    ...styleProp,
  }

  return (
    <ContainerLayer as="div" className={className} style={style} data-checked={checked}>
      <input
        {...rest}
        {...handlers}
        ref={refs}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="absolute inset-0 opacity-0 w-full h-full cursor-[inherit]"
        onChange={(e) =>
          handleChange({
            changeParams: [e],
            value: e.target.checked,
          })
        }
      />
      <StateLayer
        className={cn(!disabled && 'hover:bg-black/5 active:bg-black/10')}
      />
      <ShapeLayer className="flex items-center justify-center">{children}</ShapeLayer>
    </ContainerLayer>
  )
})

/* ========================================================================
 * Icon Sub-component
 * ======================================================================== */

export type CheckboxIconProps = {
  /** 체크박스 내부에 렌더링되는 컴포넌트 */
  children: React.ReactNode
}

const CheckboxIcon: React.FC<CheckboxIconProps> = ({ children }) => <>{children}</>

/* ========================================================================
 * Export
 * ======================================================================== */

type CheckboxComponent = typeof CheckboxRoot & {
  Icon: typeof CheckboxIcon
}

/**
 * 체크박스 컴포넌트
 *
 * @example
 * ```tsx
 * <Checkbox width={22} height={22} defaultChecked>
 *   <Checkbox.Icon><CheckIcon /></Checkbox.Icon>
 * </Checkbox>
 * ```
 */
export const Checkbox: CheckboxComponent = Object.assign(CheckboxRoot, {
  Icon: CheckboxIcon,
})
