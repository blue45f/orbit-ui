import { ChevronDownLineIcon } from '@ui-forge/icons'
import React, { AllHTMLAttributes, Children, HTMLAttributes, forwardRef, useCallback } from 'react'

import { cn } from '../../styles'
import {
  composeRefs,
  filterComponents,
  toCSSLength,
  useFocus,
  flattenFragment,
} from '../../libs'
import { BorderLayer, ContainerLayer, ContentLayer } from '../primitives/Layer'

import { SelectProvider, useSelectContext } from './Dropdown.lib'

/* ========================================================================
 * Types
 * ======================================================================== */

export type SelectTheme = {
  enabledFillColor?: string
  enabledBorderColor?: string
  enabledForegroundColor?: string
  disabledFillColor?: string
  disabledBorderColor?: string
  disabledForegroundColor?: string
  focusedFillColor?: string
  focusedBorderColor?: string
  activatedFillColor?: string
  activatedBorderColor?: string
  placeholderColor?: string
  radius?: string
  paddingHorizontal?: string
  gap?: string
}

export type DropdownProps = {
  /** 활성화 상태 (메뉴/시트 열림 여부) @defaultValue `false` */
  activated?: boolean
  /** 비활성화 상태 */
  disabled?: boolean
  /** 선택된 값 */
  value?: React.ReactNode
  /** placeholder 텍스트 */
  placeholder?: string
  /** 클릭 콜백 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** 컨테이너 높이 */
  height?: number
  /** 테마 커스터마이징 */
  theme?: Partial<SelectTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

type DropdownPropsWithRest = DropdownProps & Omit<AllHTMLAttributes<HTMLButtonElement>, 'onClick' | 'value'>

/* ========================================================================
 * Main Component
 * ======================================================================== */

const InternalDropdownRoot = forwardRef<HTMLButtonElement, DropdownPropsWithRest>((props, ref) => {
  const {
    children,
    disabled = false,
    activated = false,
    value,
    placeholder,
    onClick,
    onFocus,
    onBlur,
    theme,
    style: styleProp,
    className: classProp,
    height,
    ...rest
  } = props

  const selected = value !== undefined && value !== null && !(typeof value === 'string' && value.length === 0)

  const {
    isFocused,
    ref: selfRef,
    ...handlers
  } = useFocus<HTMLButtonElement>({
    onFocus,
    onBlur,
    disabled,
  })

  const refs = composeRefs(ref, selfRef)

  // 상태별 색상 결정
  const fillColor = disabled
    ? theme?.disabledFillColor
    : activated
      ? theme?.activatedFillColor
      : isFocused
        ? theme?.focusedFillColor
        : theme?.enabledFillColor

  const borderColor = disabled
    ? theme?.disabledBorderColor
    : activated
      ? theme?.activatedBorderColor
      : isFocused
        ? theme?.focusedBorderColor
        : theme?.enabledBorderColor

  const foregroundColor = disabled
    ? theme?.disabledForegroundColor
    : theme?.enabledForegroundColor

  const className = cn(
    'relative inline-flex w-full',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
    classProp
  )

  const style: React.CSSProperties = {
    backgroundColor: fillColor,
    borderRadius: theme?.radius || '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: borderColor,
    color: foregroundColor,
    ...(height !== undefined && { height: toCSSLength(height) }),
    ...styleProp,
  }

  const {
    filtered: [leading, trailing],
    unfiltered: center,
  } = filterComponents(Children.toArray(children) as React.ReactElement[], DropdownLeading, DropdownTrailing)

  const hasLeadingSlot = flattenFragment(leading).length > 0
  const hasTrailingSlot = flattenFragment(trailing).length > 0

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && onClick) {
        onClick(e)
      }
    },
    [disabled, onClick]
  )

  return (
    <SelectProvider disabled={disabled} focused={isFocused} activated={activated} selected={selected}>
      <ContainerLayer
        as="div"
        style={style}
        className={className}
        data-disabled={disabled}
        data-focused={isFocused}
        data-activated={activated}
        data-selected={selected}
      >
        <button
          ref={refs}
          disabled={disabled}
          {...handlers}
          {...rest}
          type="button"
          onClick={handleClick}
          className={cn(
            'w-full h-full bg-transparent border-none outline-none',
            'text-left cursor-[inherit]',
            disabled && 'cursor-not-allowed'
          )}
          style={{
            paddingLeft: theme?.paddingHorizontal || '16px',
            paddingRight: theme?.paddingHorizontal || '16px',
          }}
          aria-disabled={disabled}
        >
          <ContentLayer
            className="relative"
            alignment="center"
            arrangement="start"
            style={{ gap: theme?.gap || '8px' }}
          >
            {hasLeadingSlot && leading}
            <div className="flex-1 min-w-0">
              {value ? (
                <div className="truncate">{value}</div>
              ) : (
                placeholder && (
                  <div
                    className="truncate"
                    style={{ color: theme?.placeholderColor || 'rgba(177, 179, 181, 1)' }}
                  >
                    {placeholder}
                  </div>
                )
              )}
              {center}
            </div>
            {hasTrailingSlot ? trailing : <DropdownChevron />}
          </ContentLayer>
        </button>
        <BorderLayer />
      </ContainerLayer>
    </SelectProvider>
  )
})

/* ========================================================================
 * Sub-components
 * ======================================================================== */

export type DropdownLeadingProps = {
  children: React.ReactNode
} & HTMLAttributes<HTMLSpanElement>

const DropdownLeading: React.FC<DropdownLeadingProps> = ({ children, className, ...rest }) => (
  <span {...rest} className={cn('inline-flex items-center justify-center flex-shrink-0', className)}>
    {children}
  </span>
)

export type DropdownCenterProps = {
  children: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

const DropdownCenter: React.FC<DropdownCenterProps> = ({ children, className, ...rest }) => (
  <div {...rest} className={cn('flex-1 min-w-0', className)}>
    {children}
  </div>
)

export type DropdownTrailingProps = {
  children: React.ReactElement
} & HTMLAttributes<HTMLSpanElement>

const DropdownTrailing: React.FC<DropdownTrailingProps> = ({ className, ...props }) => (
  <span {...props} className={cn('inline-flex items-center justify-center flex-shrink-0', className)} />
)

const DropdownChevron: React.FC = () => {
  const { activated } = useSelectContext('DropdownChevron')

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center flex-shrink-0',
        'transition-transform duration-200',
        activated && 'rotate-180'
      )}
    >
      <ChevronDownLineIcon />
    </span>
  )
}

/* ========================================================================
 * Export
 * ======================================================================== */

type DropdownComponent = typeof InternalDropdownRoot & {
  Leading: typeof DropdownLeading
  Center: typeof DropdownCenter
  Trailing: typeof DropdownTrailing
}

/**
 * 셀렉트 트리거 컴포넌트
 *
 * @example
 * ```tsx
 * <Dropdown
 *   value="Option 1"
 *   activated={isOpen}
 *   onClick={() => setIsOpen(!isOpen)}
 *   placeholder="선택하세요"
 * />
 * ```
 */
export const Dropdown: DropdownComponent = Object.assign(InternalDropdownRoot, {
  Leading: DropdownLeading,
  Center: DropdownCenter,
  Trailing: DropdownTrailing,
})
