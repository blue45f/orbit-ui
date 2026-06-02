import { CancelIcon, IconPropsContext } from '@heejun-com/icons'
import React, { Children, HTMLAttributes, forwardRef, useCallback, useId } from 'react'

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

import { TextFieldProvider, useTextFieldContext } from './TextField.lib'

/* ========================================================================
 * Types
 * ======================================================================== */

/**
 * TextField 테마 토큰 계약.
 *
 * border/placeholder/cursor 토큰은 `enabled|focused|disabled` × `Empty|Populated`
 * 매트릭스로 정의합니다. theme 패키지의 component-token 이 emit 하는 키와 1:1 로 맞춥니다.
 * `enabledBorderColor` 등 상태-only 레거시 키는 매트릭스 키가 없을 때의 fallback 으로 유지합니다.
 */
export type TextFieldTheme = {
  enabledFillColor?: string
  disabledFillColor?: string
  focusedFillColor?: string

  enabledForegroundColor?: string
  disabledForegroundColor?: string
  focusedForegroundColor?: string

  // 상태 × empty/populated 별 border color
  enabledEmptyBorderColor?: string
  enabledPopulatedBorderColor?: string
  focusedEmptyBorderColor?: string
  focusedPopulatedBorderColor?: string
  disabledEmptyBorderColor?: string
  disabledPopulatedBorderColor?: string

  // 상태 × empty/populated 별 border width
  enabledEmptyBorderWidth?: string
  enabledPopulatedBorderWidth?: string
  focusedEmptyBorderWidth?: string
  focusedPopulatedBorderWidth?: string
  disabledEmptyBorderWidth?: string
  disabledPopulatedBorderWidth?: string

  /** placeholder 색상 */
  enabledPlaceholderForegroundColor?: string
  /** 캐럿(텍스트 커서) 색상 */
  cursorFillColor?: string
  /** 에러 메시지 텍스트 색상 (Coral) */
  errorForegroundColor?: string
  /** 보조(helper) 텍스트 색상 */
  helperForegroundColor?: string

  // ---- 레거시 fallback 키 (매트릭스 키가 없을 때만 사용) ----
  enabledBorderColor?: string
  disabledBorderColor?: string
  focusedBorderColor?: string
  placeholderColor?: string

  radius?: string
  paddingHorizontal?: string
  paddingVertical?: string
  gap?: string
}

export type TextFieldSpecificProps = {
  /** TextField 높이 @defaultValue '44' */
  height?: number | string
  /** 테마 커스터마이징 */
  theme?: Partial<TextFieldTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type TextFieldProps = TextFieldSpecificProps & {
  /** 텍스트 확장 방향 @defaultValue 'horizontal' */
  axis?: 'horizontal' | 'vertical'
  /** 최대 줄 수 (multiline일 때만 적용) */
  maximumLine?: number
  /** 최소 줄 수 @defaultValue 1 */
  minimumLine?: number
  /** input type @defaultValue 'text' */
  type?: 'text' | 'password' | 'email' | 'tel' | 'url'
  /** 입력 최대 길이 */
  maxLength?: number
  placeholder?: string
  disabled?: boolean
  /**
   * 유효성 검증 실패 여부. true 면 input 에 `aria-invalid` 가 설정되고
   * 에러 border 토큰이 적용되며 `errorText` 가 노출됩니다.
   * @defaultValue false
   */
  error?: boolean
  /** 에러 상태에서 필드 아래 노출되는 메시지 (Coral, role="alert") */
  errorText?: React.ReactNode
  /** 평상시 필드 아래 노출되는 보조 설명 */
  helperText?: React.ReactNode
  /** 라벨 텍스트. input 과 자동으로 연결됩니다(useId). */
  label?: React.ReactNode
  /** 필수 입력 여부. required/aria-required 설정 + 라벨에 표식 노출 */
  required?: boolean
  /** 유효성 검증 실패 여부 (직접 지정 시 우선) */
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  /** 필수 입력 여부 */
  'aria-required'?: boolean | 'true' | 'false'
  /** 오류 메시지 등 설명 요소의 ID */
  'aria-describedby'?: string
  value?: string
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

type PossibleElement = 'input' | 'textarea'
type TextFieldPropsWithAs = TextFieldProps & { as?: PossibleElement } & Omit<
    React.HTMLAttributes<HTMLElement>,
    'as' | 'onChange'
  >

/* ========================================================================
 * Main Component
 * ======================================================================== */

const InternalTextFieldRoot = forwardRef<HTMLElement, TextFieldPropsWithAs>((props, ref) => {
  const {
    children,
    height = 44,
    disabled = false,
    axis = 'horizontal',
    maximumLine,
    minimumLine = 1,
    type = 'text',
    maxLength,
    placeholder,
    error = false,
    errorText,
    helperText,
    label,
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
    as = axis === 'vertical' ? 'textarea' : 'input',
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
    [React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>]
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
  } = useFocus<HTMLInputElement | HTMLTextAreaElement>({
    onFocus,
    onBlur,
    disabled,
  })

  const refs = composeRefs(ref, selfRef)

  // 상태(state) — disabled > focused > enabled
  const state = disabled ? 'disabled' : isFocused ? 'focused' : 'enabled'
  // 채움(fill) 여부 접미사
  const fillSuffix = isPopulated ? 'Populated' : 'Empty'

  // 상태별 fill / foreground
  const fillColor = disabled
    ? theme?.disabledFillColor
    : isFocused
      ? theme?.focusedFillColor
      : theme?.enabledFillColor

  const foregroundColor = disabled
    ? theme?.disabledForegroundColor
    : isFocused
      ? theme?.focusedForegroundColor
      : theme?.enabledForegroundColor

  // border color: 에러 시 error 토큰(이미 wrapper 에서 매트릭스 키로 머지됨) → 매트릭스 → 레거시 fallback
  const matrixBorderColor = theme?.[`${state}${fillSuffix}BorderColor` as keyof TextFieldTheme] as
    | string
    | undefined
  const legacyBorderColor = disabled
    ? theme?.disabledBorderColor
    : isFocused
      ? theme?.focusedBorderColor
      : theme?.enabledBorderColor
  const borderColor = matrixBorderColor ?? legacyBorderColor

  // border width: 매트릭스 → 기본 1px
  const borderWidth =
    (theme?.[`${state}${fillSuffix}BorderWidth` as keyof TextFieldTheme] as string | undefined) ??
    '1px'

  // placeholder / caret
  const placeholderColor =
    theme?.enabledPlaceholderForegroundColor ?? theme?.placeholderColor ?? 'rgba(177, 179, 181, 1)'
  const caretColor = theme?.cursorFillColor

  // helper / error 텍스트 색상 (토큰 미주입 시 합리적 fallback)
  const errorTextColor = theme?.errorForegroundColor ?? 'rgb(255, 64, 62)'
  const helperTextColor = theme?.helperForegroundColor ?? theme?.enabledForegroundColor

  // aria-invalid: 명시값 우선, 없으면 error prop
  const ariaInvalid = ariaInvalidProp ?? (error ? true : undefined)
  // aria-describedby: 호출자 지정 + 내부 description 영역 합성
  const ariaDescribedBy =
    [ariaDescribedByProp, descriptionId].filter(Boolean).join(' ') || undefined

  const className = cn(
    'relative inline-flex w-full',
    'input-focus-ring-token',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-text',
    classProp
  )

  const style: React.CSSProperties = {
    height: axis === 'horizontal' ? toCSSLength(height) : 'auto',
    minHeight: axis === 'vertical' ? toCSSLength(height) : undefined,
    backgroundColor: fillColor,
    borderRadius: theme?.radius || '8px',
    borderWidth,
    borderStyle: 'solid',
    borderColor: borderColor,
    color: foregroundColor,
    caretColor,
    paddingLeft: theme?.paddingHorizontal || '16px',
    paddingRight: theme?.paddingHorizontal || '16px',
    paddingTop: theme?.paddingVertical || '12px',
    paddingBottom: theme?.paddingVertical || '12px',
    ...styleProp,
  }

  const {
    filtered: [leading, trailing, clearButton],
    unfiltered: center,
  } = filterComponents(
    Children.toArray(children) as React.ReactElement[],
    TextFieldLeading,
    TextFieldTrailing,
    TextFieldClearButton
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

  const InputComponent = as

  const field = (
    <TextFieldProvider
      disabled={disabled}
      focused={isFocused}
      populated={isPopulated}
      focusElement={focusElement}
      preventElementBlur={preventElementBlur}
      handleClear={handleClear}
      placeholder={placeholder}
      type={type}
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
          style={{ gap: theme?.gap || '8px' }}
        >
          {hasLeadingSlot && leading}
          <div className="flex-1 relative">
            <InputComponent
              {...rest}
              {...handlers}
              id={inputId}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ref={refs as React.Ref<HTMLInputElement | HTMLTextAreaElement> as any}
              type={axis === 'horizontal' ? type : undefined}
              disabled={disabled}
              required={required || undefined}
              maxLength={maxLength}
              placeholder={placeholder}
              value={currentValue}
              rows={axis === 'vertical' ? minimumLine : undefined}
              className={cn(
                'w-full bg-transparent border-none outline-none',
                axis === 'vertical' ? 'resize-y' : 'resize-none',
                'text-inherit placeholder:text-[var(--placeholder-color)]',
                disabled && 'cursor-not-allowed'
              )}
              style={
                {
                  '--placeholder-color': placeholderColor,
                  caretColor,
                  ...(axis === 'vertical' && maximumLine
                    ? { maxHeight: `calc(${maximumLine} * 1.5em + 2px)`, overflowY: 'auto' }
                    : null),
                } as React.CSSProperties
              }
              onChange={(e) => {
                handleValueChange({
                  changeParams: [e],
                  value: e.target.value,
                })
              }}
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
    </TextFieldProvider>
  )

  return (
    <div className="inline-flex w-full flex-col gap-1">
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className={cn('text-sm', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer')}
          style={{ color: foregroundColor }}
        >
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5" style={{ color: errorTextColor }}>
              *
            </span>
          )}
        </label>
      )}
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

export type TextFieldLeadingProps = {
  size?: number
  children: React.ReactNode
} & HTMLAttributes<HTMLSpanElement>

const TextFieldLeading: React.FC<TextFieldLeadingProps> = ({
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

export type TextFieldTrailingProps = {
  size?: number
  children: React.ReactNode
} & HTMLAttributes<HTMLSpanElement>

const TextFieldTrailing: React.FC<TextFieldTrailingProps> = ({
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

export type TextFieldCenterProps = {
  children?: React.ReactNode
} & HTMLAttributes<HTMLSpanElement>

/** TextField Center - 입력 영역에 추가 컨텐츠 배치 */
const TextFieldCenter: React.FC<TextFieldCenterProps> = ({ children, className, ...rest }) => (
  <span {...rest} className={cn('inline-flex items-center', className)}>
    {children}
  </span>
)

export type TextFieldClearButtonProps = {
  visibility?: 'onFocused' | 'onPopulated'
  children?: React.ReactNode
}

const TextFieldClearButton: React.FC<TextFieldClearButtonProps> = ({
  visibility = 'onFocused',
  children,
}) => {
  const { focused, populated, handleClear, preventElementBlur } =
    useTextFieldContext('TextField.ClearButton')

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
        // 토큰 기반 tinted fill (라이트/다크 모두 동작)
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

type TextFieldComponent = typeof InternalTextFieldRoot & {
  Leading: typeof TextFieldLeading
  Trailing: typeof TextFieldTrailing
  Center: typeof TextFieldCenter
  ClearButton: typeof TextFieldClearButton
}

/**
 * 텍스트 입력 컴포넌트
 *
 * @example
 * ```tsx
 * <TextField placeholder="입력하세요">
 *   <TextField.Leading><SearchIcon /></TextField.Leading>
 *   <TextField.ClearButton />
 * </TextField>
 * ```
 */
export const TextField: TextFieldComponent = Object.assign(InternalTextFieldRoot, {
  Leading: TextFieldLeading,
  Trailing: TextFieldTrailing,
  Center: TextFieldCenter,
  ClearButton: TextFieldClearButton,
})
