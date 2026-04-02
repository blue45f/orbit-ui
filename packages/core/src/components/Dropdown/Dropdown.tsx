import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDownLineIcon } from '@prism-ui/icons'
import React, {
  AllHTMLAttributes,
  Children,
  HTMLAttributes,
  forwardRef,
  useCallback,
} from 'react'

import { cn } from '../../styles'
import {
  filterComponents,
  toCSSLength,
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
  /** 활성화 상태 (메뉴 열림 여부) @defaultValue `false` */
  activated?: boolean
  /** open 상태 (activated 의 별칭, Radix 호환) */
  open?: boolean
  /** open 상태 변경 콜백 (Radix 호환) */
  onOpenChange?: (open: boolean) => void
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
 * Trigger (styled button)
 * ======================================================================== */

const InternalDropdownTrigger = forwardRef<HTMLButtonElement, DropdownPropsWithRest>((props, ref) => {
  const {
    children,
    disabled = false,
    activated = false,
    open: _open,
    onOpenChange: _onOpenChange,
    value,
    placeholder,
    onClick,
    onFocus: _onFocus,
    onBlur: _onBlur,
    theme,
    style: styleProp,
    className: classProp,
    height,
    ...rest
  } = props
  const selected = value !== undefined && value !== null && !(typeof value === 'string' && value.length === 0)

  // 상태별 색상 결정
  const fillColor = disabled
    ? theme?.disabledFillColor
    : activated
      ? theme?.activatedFillColor
      : theme?.enabledFillColor

  const borderColor = disabled
    ? theme?.disabledBorderColor
    : activated
      ? theme?.activatedBorderColor
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
    <SelectProvider disabled={disabled} focused={false} activated={activated} selected={selected}>
      <ContainerLayer
        as="div"
        style={style}
        className={className}
        data-disabled={disabled}
        data-activated={activated}
        data-selected={selected}
      >
        <DropdownMenu.Trigger asChild>
          <button
            ref={ref}
            disabled={disabled}
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
        </DropdownMenu.Trigger>
        <BorderLayer />
      </ContainerLayer>
    </SelectProvider>
  )
})

/* ========================================================================
 * Root (wraps Radix DropdownMenu.Root)
 * ======================================================================== */

const InternalDropdownRoot = forwardRef<HTMLButtonElement, DropdownPropsWithRest>((props, ref) => {
  const {
    children,
    activated: activatedProp = false,
    open: openProp,
    onOpenChange,
    disabled = false,
    onClick,
    ...rest
  } = props

  const isOpen = openProp ?? activatedProp

  // Separate trigger children (Leading, Trailing, Center) from content children (Content, Item)
  const childArray = Children.toArray(children) as React.ReactElement[]

  const {
    filtered: [contentChildren],
    unfiltered: triggerChildren,
  } = filterComponents(childArray, DropdownContent)

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={onOpenChange}>
      <InternalDropdownTrigger
        ref={ref}
        disabled={disabled}
        activated={isOpen}
        onClick={onClick}
        {...rest}
      >
        {triggerChildren}
      </InternalDropdownTrigger>
      {contentChildren}
    </DropdownMenu.Root>
  )
})

/* ========================================================================
 * Sub-components: Trigger slots
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
 * Sub-components: Menu (powered by Radix)
 * ======================================================================== */

export type DropdownContentProps = {
  children: React.ReactNode
  /** 정렬 방향 @defaultValue `'start'` */
  align?: 'start' | 'center' | 'end'
  /** 오프셋 (간격) @defaultValue `4` */
  sideOffset?: number
  className?: string
  style?: React.CSSProperties
}

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, align = 'start', sideOffset = 4, className, style, ...rest }, ref) => (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-white shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          className
        )}
        style={style}
        {...rest}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
)

export type DropdownItemProps = {
  children: React.ReactNode
  /** 비활성화 상태 */
  disabled?: boolean
  /** 선택 시 콜백 */
  onSelect?: (event: Event) => void
  className?: string
  style?: React.CSSProperties
}

const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, disabled, onSelect, className, style, ...rest }, ref) => (
    <DropdownMenu.Item
      ref={ref}
      disabled={disabled}
      onSelect={onSelect}
      className={cn(
        'relative flex cursor-pointer select-none items-center px-4 py-2 text-sm outline-none',
        'transition-colors focus:bg-gray-100',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </DropdownMenu.Item>
  )
)

export type DropdownSeparatorProps = {
  className?: string
  style?: React.CSSProperties
}

const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, style, ...rest }, ref) => (
    <DropdownMenu.Separator
      ref={ref}
      className={cn('h-px my-1 bg-gray-200', className)}
      style={style}
      {...rest}
    />
  )
)

export type DropdownLabelProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const DropdownLabel = forwardRef<HTMLDivElement, DropdownLabelProps>(
  ({ children, className, style, ...rest }, ref) => (
    <DropdownMenu.Label
      ref={ref}
      className={cn('px-4 py-2 text-xs font-semibold text-gray-500', className)}
      style={style}
      {...rest}
    >
      {children}
    </DropdownMenu.Label>
  )
)

/* ========================================================================
 * Export
 * ======================================================================== */

type DropdownComponent = typeof InternalDropdownRoot & {
  Leading: typeof DropdownLeading
  Center: typeof DropdownCenter
  Trailing: typeof DropdownTrailing
  Content: typeof DropdownContent
  Item: typeof DropdownItem
  Separator: typeof DropdownSeparator
  Label: typeof DropdownLabel
}

/**
 * 드롭다운 메뉴 컴포넌트 (Radix UI 기반)
 *
 * 키보드 내비게이션, 포커스 관리, 포탈 렌더링, 외부 클릭 닫기,
 * 타입어헤드 검색을 기본 제공합니다.
 *
 * @example
 * ### 기본 사용법 (트리거만)
 * ```tsx
 * <Dropdown
 *   value="Option 1"
 *   open={activated}
 *   onOpenChange={setIsOpen}
 *   placeholder="선택하세요"
 * />
 * ```
 *
 * @example
 * ### 드롭다운 메뉴
 * ```tsx
 * <Dropdown
 *   value={selected}
 *   placeholder="선택하세요"
 *   open={activated}
 *   onOpenChange={setIsOpen}
 * >
 *   <Dropdown.Content>
 *     <Dropdown.Item onSelect={() => setSelected('Option 1')}>Option 1</Dropdown.Item>
 *     <Dropdown.Item onSelect={() => setSelected('Option 2')}>Option 2</Dropdown.Item>
 *     <Dropdown.Separator />
 *     <Dropdown.Item onSelect={() => setSelected('Option 3')}>Option 3</Dropdown.Item>
 *   </Dropdown.Content>
 * </Dropdown>
 * ```
 */
export const Dropdown: DropdownComponent = Object.assign(InternalDropdownRoot, {
  Leading: DropdownLeading,
  Center: DropdownCenter,
  Trailing: DropdownTrailing,
  Content: DropdownContent,
  Item: DropdownItem,
  Separator: DropdownSeparator,
  Label: DropdownLabel,
})
