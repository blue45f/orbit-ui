import { CancelIcon, IconPropsContext } from '@orbit-ui/icons'
import React, { Children, HTMLAttributes, forwardRef, useCallback } from 'react'

import { cn } from '../../styles'
import {
  composeRefs,
  filterComponents,
  toCSSLength,
  useFocus,
  useControllableState,
  flattenFragment,
  setNativeValue,
} from '../../libs'
import { BorderLayer, ContainerLayer, ContentLayer } from '../primitives/Layer'

import {
  TextFieldWithLabelAnimationProvider,
  useTextFieldWithLabelAnimationContext,
} from './FloatingTextField.lib'

/* ========================================================================
 * Types
 * ======================================================================== */

export type TextFieldWithLabelAnimationTheme = {
  enabledFillColor?: string
  enabledBorderColor?: string
  enabledForegroundColor?: string
  disabledFillColor?: string
  disabledBorderColor?: string
  disabledForegroundColor?: string
  focusedFillColor?: string
  focusedBorderColor?: string
  focusedForegroundColor?: string
  labelColor?: string
  labelFocusedColor?: string
  placeholderColor?: string
  radius?: string
  paddingHorizontal?: string
  paddingVertical?: string
  gap?: string
}

export type TextFieldWithLabelAnimationSpecificProps = {
  /** 높이 @defaultValue '56' */
  height?: number | string
  /** 라벨 */
  label?: string
  /** 테마 커스터마이징 */
  theme?: Partial<TextFieldWithLabelAnimationTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type TextFieldWithLabelAnimationProps = TextFieldWithLabelAnimationSpecificProps & {
  /** 입력 타입 @defaultValue 'text' */
  type?: 'text' | 'password' | 'email' | 'tel' | 'url'
  /** 입력 최대 길이 */
  maxLength?: number
  placeholder?: string
  disabled?: boolean
  value?: string
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type TextFieldWithLabelAnimationPropsWithRest = TextFieldWithLabelAnimationProps &
  Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>

/* ========================================================================
 * Main Component
 * ======================================================================== */

const InternalTextFieldWithLabelAnimationRoot = forwardRef<
  HTMLInputElement,
  TextFieldWithLabelAnimationPropsWithRest
>((props, ref) => {
  const {
    children,
    height = 56,
    disabled = false,
    type = 'text',
    maxLength,
    placeholder,
    label,
    value,
    defaultValue = '',
    onChange,
    onFocus,
    onBlur,
    theme,
    style: styleProp,
    className: classProp,
    ...rest
  } = props

  const [currentValue, handleValueChange] = useControllableState<
    string,
    [React.ChangeEvent<HTMLInputElement>]
  >({
    value,
    defaultValue,
    onChange,
  })

  const isPopulated = currentValue.length > 0

  const {
    isFocused,
    focusElement,
    preventElementBlur,
    ref: selfRef,
    handlers,
  } = useFocus<HTMLInputElement>({
    onFocus,
    onBlur,
    disabled,
  })

  const refs = composeRefs(ref, selfRef)
  const isLabelFloating = isFocused || isPopulated

  const fillColor = disabled
    ? theme?.disabledFillColor
    : isFocused
      ? theme?.focusedFillColor
      : theme?.enabledFillColor

  const borderColor = disabled
    ? theme?.disabledBorderColor
    : isFocused
      ? theme?.focusedBorderColor
      : theme?.enabledBorderColor

  const foregroundColor = disabled ? theme?.disabledForegroundColor : theme?.enabledForegroundColor

  const labelColor = isFocused ? theme?.labelFocusedColor : theme?.labelColor

  const className = cn(
    'relative inline-flex w-full',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-text',
    classProp
  )

  const style: React.CSSProperties = {
    height: toCSSLength(height),
    backgroundColor: fillColor,
    borderRadius: theme?.radius || '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: borderColor,
    color: foregroundColor,
    ...styleProp,
  }

  const {
    filtered: [leading, trailing, clearButton],
    unfiltered: center,
  } = filterComponents(
    Children.toArray(children) as React.ReactElement[],
    TextFieldWithLabelAnimationLeading,
    TextFieldWithLabelAnimationTrailing,
    TextFieldWithLabelAnimationClearButton
  )

  const hasLeadingSlot = flattenFragment(leading).length > 0
  const hasTrailingSlot = flattenFragment(trailing).length > 0
  const hasClearButton = flattenFragment(clearButton).length > 0

  const handleClear = useCallback(() => {
    if (selfRef.current) {
      setNativeValue(selfRef.current, '')
      selfRef.current.focus()
      handleValueChange({
        changeParams: [{ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>],
        value: '',
      })
    }
  }, [handleValueChange, selfRef])

  return (
    <TextFieldWithLabelAnimationProvider
      value={{
        disabled,
        focused: isFocused,
        populated: isPopulated,
        focusElement,
        preventElementBlur,
        handleClear,
      }}
    >
      <ContainerLayer
        as="div"
        className={className}
        style={style}
        data-disabled={disabled}
        data-focused={isFocused}
        data-populated={isPopulated}
        onClick={() => focusElement()}
      >
        <ContentLayer
          className="relative flex-1"
          direction="horizontal"
          alignment="center"
          style={{
            paddingLeft: theme?.paddingHorizontal || '16px',
            paddingRight: theme?.paddingHorizontal || '16px',
            gap: theme?.gap || '8px',
          }}
        >
          {hasLeadingSlot && leading}
          <div className="flex-1 relative pt-4">
            {/* Floating Label */}
            {label && (
              <label
                className={cn(
                  'absolute left-0 transition-all duration-200 pointer-events-none',
                  isLabelFloating ? 'top-0 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                )}
                style={{ color: labelColor }}
              >
                {label}
              </label>
            )}
            <input
              {...rest}
              {...handlers}
              ref={refs}
              type={type}
              disabled={disabled}
              maxLength={maxLength}
              placeholder={isLabelFloating ? placeholder : undefined}
              value={currentValue}
              className={cn(
                'w-full bg-transparent border-none outline-none',
                'text-inherit placeholder:text-[var(--placeholder-color)]',
                disabled && 'cursor-not-allowed'
              )}
              style={
                {
                  '--placeholder-color': theme?.placeholderColor || 'rgba(177, 179, 181, 1)',
                } as React.CSSProperties
              }
              onChange={(e) => {
                handleValueChange({
                  changeParams: [e],
                  value: e.target.value,
                })
              }}
              aria-disabled={disabled}
            />
            {center}
          </div>
          {hasClearButton && clearButton}
          {hasTrailingSlot && trailing}
        </ContentLayer>
        <BorderLayer />
      </ContainerLayer>
    </TextFieldWithLabelAnimationProvider>
  )
})

/* ========================================================================
 * Sub-components
 * ======================================================================== */

export type TextFieldWithLabelAnimationLeadingProps = {
  size?: number
  children: React.ReactNode
} & HTMLAttributes<HTMLSpanElement>

const TextFieldWithLabelAnimationLeading: React.FC<TextFieldWithLabelAnimationLeadingProps> = ({
  size = 24,
  children,
  className,
  ...rest
}) => (
  <span
    {...rest}
    className={cn('inline-flex items-center justify-center flex-shrink-0', className)}
  >
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
  </span>
)

export type TextFieldWithLabelAnimationTrailingProps = {
  size?: number
  children: React.ReactNode
} & HTMLAttributes<HTMLSpanElement>

const TextFieldWithLabelAnimationTrailing: React.FC<TextFieldWithLabelAnimationTrailingProps> = ({
  size = 24,
  children,
  className,
  ...rest
}) => (
  <span
    {...rest}
    className={cn('inline-flex items-center justify-center flex-shrink-0', className)}
  >
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
  </span>
)

export type TextFieldWithLabelAnimationClearButtonProps = {
  visibility?: 'onFocused' | 'onPopulated'
  children?: React.ReactNode
}

const TextFieldWithLabelAnimationClearButton: React.FC<
  TextFieldWithLabelAnimationClearButtonProps
> = ({ visibility = 'onFocused', children }) => {
  const { focused, populated, handleClear, preventElementBlur } =
    useTextFieldWithLabelAnimationContext('TextField.ClearButton')

  const isVisible = visibility === 'onFocused' ? focused && populated : populated
  if (!isVisible) return null

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center flex-shrink-0',
        'w-6 h-6 rounded-full',
        'bg-gray-200 hover:bg-gray-300',
        'transition-colors duration-150'
      )}
      onClick={handleClear}
      onMouseDown={preventElementBlur}
      aria-label="입력 내용 지우기"
    >
      {children || <CancelIcon size={16} />}
    </button>
  )
}

/* ========================================================================
 * Export
 * ======================================================================== */

type TextFieldWithLabelAnimationComponent = typeof InternalTextFieldWithLabelAnimationRoot & {
  Leading: typeof TextFieldWithLabelAnimationLeading
  Trailing: typeof TextFieldWithLabelAnimationTrailing
  ClearButton: typeof TextFieldWithLabelAnimationClearButton
}

/**
 * 플로팅 라벨 텍스트 입력 컴포넌트
 *
 * @example
 * ```tsx
 * <TextFieldWithLabelAnimation label="이메일" placeholder="이메일을 입력하세요">
 *   <TextFieldWithLabelAnimation.ClearButton />
 * </TextFieldWithLabelAnimation>
 * ```
 */
export const TextFieldWithLabelAnimation: TextFieldWithLabelAnimationComponent = Object.assign(
  InternalTextFieldWithLabelAnimationRoot,
  {
    Leading: TextFieldWithLabelAnimationLeading,
    Trailing: TextFieldWithLabelAnimationTrailing,
    ClearButton: TextFieldWithLabelAnimationClearButton,
  }
)
