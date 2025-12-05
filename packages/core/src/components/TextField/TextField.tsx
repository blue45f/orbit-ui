import { CancelIcon, IconPropsContext } from '@ui-forge/icons'
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
  textOverflow,
  useElementSize,
} from '../../libs'
import { BorderLayer, ContainerLayer, ContentLayer } from '../primitives/Layer'

import { TextFieldProvider, TextFieldContextValue, useTextFieldContext } from './TextField.lib'

/* ========================================================================
 * Types
 * ======================================================================== */

export type TextFieldTheme = {
  enabledFillColor?: string
  enabledBorderColor?: string
  enabledForegroundColor?: string
  disabledFillColor?: string
  disabledBorderColor?: string
  disabledForegroundColor?: string
  focusedFillColor?: string
  focusedBorderColor?: string
  focusedForegroundColor?: string
  placeholderColor?: string
  radius?: string
  paddingHorizontal?: string
  paddingVertical?: string
  gap?: string
}

export type TextFieldSpecificProps = {
  /** TextField 높이 @defaultValue '48' */
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
    height = 48,
    disabled = false,
    axis = 'horizontal',
    maximumLine,
    minimumLine = 1,
    type = 'text',
    maxLength,
    placeholder,
    value,
    defaultValue = '',
    onChange,
    onFocus,
    onBlur,
    theme,
    style: styleProp,
    className: classProp,
    as = axis === 'vertical' ? 'textarea' : 'input',
    ...rest
  } = props

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
    ...handlers
  } = useFocus<HTMLInputElement | HTMLTextAreaElement>({
    onFocus,
    onBlur,
    disabled,
  })

  const refs = composeRefs(ref, selfRef)
  const [valueSizeRef, valueSize] = useElementSize<HTMLSpanElement>()

  // 상태별 색상 결정
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

  const foregroundColor = disabled
    ? theme?.disabledForegroundColor
    : isFocused
      ? theme?.focusedForegroundColor
      : theme?.enabledForegroundColor

  const className = cn(
    'relative inline-flex w-full',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-text',
    classProp
  )

  const style: React.CSSProperties = {
    height: axis === 'horizontal' ? toCSSLength(height) : 'auto',
    minHeight: axis === 'vertical' ? toCSSLength(height) : undefined,
    backgroundColor: fillColor,
    borderRadius: theme?.radius || '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: borderColor,
    color: foregroundColor,
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

  return (
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
              ref={refs as any}
              type={axis === 'horizontal' ? type : undefined}
              disabled={disabled}
              maxLength={maxLength}
              placeholder={placeholder}
              value={currentValue}
              rows={axis === 'vertical' ? minimumLine : undefined}
              className={cn(
                'w-full bg-transparent border-none outline-none resize-none',
                'text-inherit placeholder:text-[var(--placeholder-color)]',
                disabled && 'cursor-not-allowed'
              )}
              style={{
                '--placeholder-color': theme?.placeholderColor || 'rgba(177, 179, 181, 1)',
              } as React.CSSProperties}
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
    </TextFieldProvider>
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
  <span {...rest} className={cn('inline-flex items-center justify-center flex-shrink-0', className)}>
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
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
  <span {...rest} className={cn('inline-flex items-center justify-center flex-shrink-0', className)}>
    <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
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
  const { focused, populated, handleClear, preventElementBlur } = useTextFieldContext('TextField.ClearButton')

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

type TextFieldComponent = typeof InternalTextFieldRoot & {
  Leading: typeof TextFieldLeading
  Trailing: typeof TextFieldTrailing
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
  ClearButton: TextFieldClearButton,
})
