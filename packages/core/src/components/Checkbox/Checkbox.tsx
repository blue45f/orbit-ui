import { forwardRef, useCallback } from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'

import { cn } from '../../styles'
import { toCSSLength, countElements, errorDev } from '../../libs'
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
  onChange?: (checked: boolean) => void
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'checked' | 'defaultChecked' | 'disabled' | 'children' | 'onChange'
  >

/* ========================================================================
 * Main Component
 * ======================================================================== */

const CheckboxRoot = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  const {
    width = 22,
    height = 22,
    borderWidth = 1,
    checked: checkedProp,
    defaultChecked,
    disabled = false,
    children,
    onChange,
    className: classProp,
    style: styleProp,
    theme,
    ...rest
  } = props

  const iconExists = countElements(children, CheckboxIcon) === 1

  if (!iconExists) errorDev('Checkbox.Icon 서브컴포넌트를 전달해주세요.')

  const handleCheckedChange = useCallback(
    (value: RadixCheckbox.CheckedState) => {
      onChange?.(value === true)
    },
    [onChange]
  )

  return (
    <RadixCheckbox.Root
      ref={ref}
      checked={checkedProp}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={handleCheckedChange}
      asChild
      {...rest}
    >
      <ContainerLayer
        as="button"
        type="button"
        className={cn(
          'relative inline-flex items-center justify-center',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
          classProp
        )}
        data-state={checkedProp ? 'checked' : 'unchecked'}
        style={
          {
            width: toCSSLength(width),
            height: toCSSLength(height),
            borderWidth: toCSSLength(borderWidth),
            borderStyle: 'solid',
            borderRadius: theme?.radius || '4px',
            backgroundColor: checkedProp
              ? (theme?.enabledCheckedFillColor ?? '#2563EB')
              : (theme?.enabledUncheckedFillColor ?? 'transparent'),
            borderColor: checkedProp
              ? (theme?.enabledCheckedBorderColor ?? '#2563EB')
              : (theme?.enabledUncheckedBorderColor ?? '#D1D5DB'),
            color: checkedProp
              ? (theme?.enabledCheckedForegroundColor ?? 'white')
              : (theme?.enabledUncheckedForegroundColor ?? 'transparent'),
            ...styleProp,
          } as React.CSSProperties
        }
      >
        <StateLayer className={cn(!disabled && 'hover:bg-black/5 active:bg-black/10')} />
        <ShapeLayer className="flex items-center justify-center">
          <RadixCheckbox.Indicator forceMount>{children}</RadixCheckbox.Indicator>
        </ShapeLayer>
      </ContainerLayer>
    </RadixCheckbox.Root>
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
 * Radix UI Checkbox primitive를 내부적으로 사용합니다.
 * 접근성(aria-checked, keyboard navigation)이 자동으로 처리됩니다.
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
