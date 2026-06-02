import { CancelIcon, IconPropsContext } from '@heejun-com/icons'
import React, { Children, HTMLAttributes, forwardRef, useCallback, useId, useMemo } from 'react'

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

/**
 * FloatingTextField 테마 토큰 계약.
 * border 토큰은 TextField 와 동일하게 `state × Empty|Populated` 매트릭스로 정의합니다.
 */
export type TextFieldWithLabelAnimationTheme = {
  enabledFillColor?: string
  disabledFillColor?: string
  focusedFillColor?: string

  enabledForegroundColor?: string
  disabledForegroundColor?: string
  focusedForegroundColor?: string

  enabledEmptyBorderColor?: string
  enabledPopulatedBorderColor?: string
  focusedEmptyBorderColor?: string
  focusedPopulatedBorderColor?: string
  disabledEmptyBorderColor?: string
  disabledPopulatedBorderColor?: string

  enabledEmptyBorderWidth?: string
  enabledPopulatedBorderWidth?: string
  focusedEmptyBorderWidth?: string
  focusedPopulatedBorderWidth?: string
  disabledEmptyBorderWidth?: string
  disabledPopulatedBorderWidth?: string

  enabledPlaceholderForegroundColor?: string
  cursorFillColor?: string
  errorForegroundColor?: string
  helperForegroundColor?: string

  labelColor?: string
  labelFocusedColor?: string

  // ---- 레거시 fallback ----
  enabledBorderColor?: string
  disabledBorderColor?: string
  focusedBorderColor?: string
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
  /** 유효성 검증 실패 여부 */
  error?: boolean
  /** 에러 메시지 (Coral, role="alert") */
  errorText?: React.ReactNode
  /** 보조 설명 텍스트 */
  helperText?: React.ReactNode
  /** 필수 입력 여부 */
  required?: boolean
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
    error = false,
    errorText,
    helperText,
    required = false,
    value,
    defaultValue = '',
    onChange,
    onFocus,
    onBlur,
    theme,
    style: styleProp,
    className: classProp,
    id: idProp,
    'aria-invalid': ariaInvalidProp,
    'aria-required': ariaRequiredProp,
    'aria-describedby': ariaDescribedByProp,
    ...rest
  } = props

  const reactId = useId()
  const inputId = idProp ?? `${reactId}-input`
  const labelId = label ? `${reactId}-label` : undefined
  const descriptionId = errorText || helperText ? `${reactId}-description` : undefined

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

  const state = disabled ? 'disabled' : isFocused ? 'focused' : 'enabled'
  const fillSuffix = isPopulated ? 'Populated' : 'Empty'

  const fillColor = disabled
    ? theme?.disabledFillColor
    : isFocused
      ? theme?.focusedFillColor
      : theme?.enabledFillColor

  const matrixBorderColor = theme?.[
    `${state}${fillSuffix}BorderColor` as keyof TextFieldWithLabelAnimationTheme
  ] as string | undefined
  const legacyBorderColor = disabled
    ? theme?.disabledBorderColor
    : isFocused
      ? theme?.focusedBorderColor
      : theme?.enabledBorderColor
  const borderColor = matrixBorderColor ?? legacyBorderColor

  const borderWidth =
    (theme?.[`${state}${fillSuffix}BorderWidth` as keyof TextFieldWithLabelAnimationTheme] as
      | string
      | undefined) ?? '1px'

  const foregroundColor = disabled ? theme?.disabledForegroundColor : theme?.enabledForegroundColor

  const labelColor = isFocused ? theme?.labelFocusedColor : theme?.labelColor

  const placeholderColor =
    theme?.enabledPlaceholderForegroundColor ?? theme?.placeholderColor ?? 'rgba(177, 179, 181, 1)'
  const caretColor = theme?.cursorFillColor
  const errorTextColor = theme?.errorForegroundColor ?? 'rgb(255, 64, 62)'
  const helperTextColor = theme?.helperForegroundColor ?? theme?.enabledForegroundColor

  const ariaInvalid = ariaInvalidProp ?? (error ? true : undefined)
  const ariaDescribedBy =
    [ariaDescribedByProp, descriptionId].filter(Boolean).join(' ') || undefined

  const className = cn(
    'relative inline-flex w-full',
    'input-focus-ring-token',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-text',
    classProp
  )

  const style: React.CSSProperties = {
    height: toCSSLength(height),
    backgroundColor: fillColor,
    borderRadius: theme?.radius || '8px',
    borderWidth,
    borderStyle: 'solid',
    borderColor: borderColor,
    color: foregroundColor,
    caretColor,
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

  // Provider value 메모이즈 — 매 키 입력마다 ClearButton 등 consumer 가 재렌더되지 않도록 한다.
  const providerValue = useMemo(
    () => ({
      disabled,
      focused: isFocused,
      populated: isPopulated,
      focusElement,
      preventElementBlur,
      handleClear,
    }),
    [disabled, isFocused, isPopulated, focusElement, preventElementBlur, handleClear]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleValueChange({ changeParams: [e], value: e.target.value })
    },
    [handleValueChange]
  )

  const field = (
    <TextFieldWithLabelAnimationProvider value={providerValue}>
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
            {/* Floating Label — transform/opacity 로 애니메이션, htmlFor 로 input 과 연결 */}
            {label && (
              <label
                id={labelId}
                htmlFor={inputId}
                data-floating={isLabelFloating}
                className={cn(
                  'absolute left-0 top-0 origin-top-left',
                  // transform/opacity 만 트랜지션 (transition-all 회피), DESIGN 표준 이징
                  'transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)]',
                  isLabelFloating
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-[1.25rem] scale-[1.15] opacity-70',
                  disabled ? 'cursor-not-allowed' : 'cursor-text'
                )}
                style={{ color: labelColor, fontSize: '0.75rem' }}
              >
                {label}
                {required && (
                  <span aria-hidden="true" className="ml-0.5" style={{ color: errorTextColor }}>
                    *
                  </span>
                )}
              </label>
            )}
            <input
              {...rest}
              {...handlers}
              id={inputId}
              ref={refs}
              type={type}
              disabled={disabled}
              required={required || undefined}
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
                  '--placeholder-color': placeholderColor,
                  caretColor,
                } as React.CSSProperties
              }
              onChange={handleInputChange}
              aria-disabled={disabled}
              aria-invalid={ariaInvalid}
              aria-required={ariaRequiredProp ?? (required ? true : undefined)}
              aria-describedby={ariaDescribedBy}
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

  return (
    <div className="inline-flex w-full flex-col gap-1">
      {field}
      {(errorText || helperText) && (
        <span
          id={descriptionId}
          role={error && errorText ? 'alert' : undefined}
          aria-live={error && errorText ? 'polite' : undefined}
          className="text-xs"
          style={{ color: error && errorText ? errorTextColor : helperTextColor }}
        >
          {error && errorText ? errorText : helperText}
        </span>
      )}
    </div>
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
    <IconPropsContext.Provider value={{ size, tone: 'soft' }}>{children}</IconPropsContext.Provider>
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
    <IconPropsContext.Provider value={{ size, tone: 'soft' }}>{children}</IconPropsContext.Provider>
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
        // 최소 44x44 hit area(WCAG 2.5.5), 아이콘은 16px 유지
        'min-w-11 min-h-11 -mx-2.5 rounded-full',
        'transition-colors duration-150',
        '[&>span]:flex [&>span]:items-center [&>span]:justify-center',
        '[&>span]:w-6 [&>span]:h-6 [&>span]:rounded-full',
        '[&>span]:bg-[var(--sem-eclipse-color-fillSecondary,rgba(0,0,20,0.1))]',
        'hover:[&>span]:bg-[var(--sem-eclipse-color-fillPressed,rgba(0,0,0,0.08))]'
      )}
      onClick={handleClear}
      onMouseDown={preventElementBlur}
      aria-label="입력 내용 지우기"
    >
      <span>{children || <CancelIcon size={16} tone="soft" />}</span>
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
