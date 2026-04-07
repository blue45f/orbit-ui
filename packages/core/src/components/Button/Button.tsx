import { IconPropsContext } from '@orbit-ui/icons'
import { Children, HTMLAttributes, ReactNode, forwardRef, useEffect, useReducer } from 'react'

import { cn, stateClasses } from '../../styles'
import { composeRefs, filterComponents, useFocus } from '../../libs'

import { ButtonContext, useButtonContext } from './Button.lib'

/* ========================================================================
 * Types
 * ======================================================================== */

export type ButtonSpecificProps = {
  /** 버튼 높이 */
  height?: number | string
  /** 테두리 두께 @default 1 */
  borderWidth?: number
  /** 로딩 중에도 내용 표시 여부 */
  alwaysVisible?: boolean
  /** 테마 커스터마이징 */
  theme?: Partial<ButtonTheme>
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스 */
  className?: string
}

export type ButtonProps = ButtonSpecificProps & {
  /** 버튼 너비 */
  width?: number | string
  /** 로딩 상태 */
  loading?: boolean
  /** 콘텐츠 정렬 @default 'center' */
  arrangement?: 'start' | 'center' | 'end' | 'space-between' | 'equal-weight'
  /** 비활성화 여부 */
  disabled?: boolean
  /** HTML 태그 @default 'button' */
  as?: 'button' | 'a'
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'as'>

export type ButtonTheme = {
  enabledFillColor?: string
  enabledBorderColor?: string
  enabledForegroundColor?: string
  disabledFillColor?: string
  disabledBorderColor?: string
  disabledForegroundColor?: string
  hoveredFillColor?: string
  pressedFillColor?: string
  focusedBorderColor?: string
  radius?: string
  paddingHorizontal?: string
  gap?: string
}

/* ========================================================================
 * Styles
 * ======================================================================== */

const buttonStyles = stateClasses({
  base: cn(
    'relative inline-flex items-center justify-center',
    'rounded-md px-400',
    'text-base font-medium',
    'transition-all duration-fast',
    'outline-none'
  ),
  enabled: 'cursor-pointer',
  disabled: 'cursor-not-allowed opacity-50',
  focused: 'ring-2 ring-offset-2 ring-blue-500',
})

const arrangementStyles = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  'space-between': 'justify-between',
  'equal-weight': 'justify-evenly',
}

/* ========================================================================
 * Main Component
 * ======================================================================== */

const InternalButtonRoot = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      width = 'fit-content',
      height = 'fit-content',
      borderWidth = 1,
      disabled = false,
      arrangement = 'center',
      theme,
      style: styleProp,
      className: classProp,
      alwaysVisible,
      as: Component = 'button',
      loading: loadingProp = false,
      onFocus,
      onBlur,
      ...rest
    } = props

    const a11y = useButtonA11y({ disabled, loading: loadingProp })

    const {
      isFocused,
      ref: selfRef,
      handlers,
    } = useFocus<HTMLButtonElement>({
      onFocus,
      onBlur,
      disabled,
    })

    const refs = composeRefs(ref, selfRef)

    const {
      filtered: [leading, trailing, loading],
      unfiltered: center,
    } = filterComponents(
      Children.toArray(children) as Awaited<ReactNode>[],
      ButtonLeading,
      ButtonTrailing,
      ButtonLoading
    )

    const busy = !alwaysVisible && !disabled && loadingProp

    const className = cn(
      buttonStyles({ disabled, focused: isFocused }),
      arrangementStyles[arrangement],
      classProp
    )

    const style: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderWidth: `${borderWidth}px`,
      borderStyle: borderWidth > 0 ? 'solid' : 'none',
      backgroundColor: disabled ? theme?.disabledFillColor : theme?.enabledFillColor,
      borderColor: disabled ? theme?.disabledBorderColor : theme?.enabledBorderColor,
      color: disabled ? theme?.disabledForegroundColor : theme?.enabledForegroundColor,
      borderRadius: theme?.radius,
      paddingLeft: theme?.paddingHorizontal,
      paddingRight: theme?.paddingHorizontal,
      gap: theme?.gap,
      ...styleProp,
    }

    return (
      <ButtonContext disabled={disabled} loading={loadingProp}>
        <Component
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={refs as any}
          className={className}
          style={style}
          data-loading={loadingProp}
          {...rest}
          {...a11y}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(handlers as any)}
        >
          {/* Content */}
          <span className={cn('flex items-center gap-200', busy && 'invisible')}>
            {leading}
            {center}
            {trailing}
          </span>

          {/* Loading */}
          {loading}
        </Component>
      </ButtonContext>
    )
  }
)

/* ========================================================================
 * A11y Hook
 * ======================================================================== */

function useButtonA11y({ disabled, loading }: Pick<ButtonProps, 'disabled' | 'loading'>) {
  const [dirty, markDirty] = useReducer(() => true, false)

  useEffect(() => {
    if (loading) markDirty()
  }, [loading])

  return {
    'aria-disabled': disabled || loading,
    'aria-live': (dirty ? 'assertive' : 'off') as 'assertive' | 'off',
  }
}

/* ========================================================================
 * Sub Components
 * ======================================================================== */

// Leading
export type ButtonLeadingProps = {
  width?: number
  height?: number
  children: React.ReactNode
} & HTMLAttributes<HTMLSpanElement>

const ButtonLeading: React.FC<ButtonLeadingProps> = ({
  className,
  width,
  height,
  children,
  ...rest
}) => {
  const size = width && height ? Math.min(width, height) : (width ?? height)
  const style = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  }

  return (
    <span
      {...rest}
      className={cn('inline-flex items-center justify-center', className)}
      style={style}
    >
      <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
    </span>
  )
}

// Center
export type ButtonCenterProps = {
  children: React.ReactNode
}

const ButtonCenter: React.FC<ButtonCenterProps> = ({ children }) => (
  <span className="inline-flex items-center justify-center">{children}</span>
)

// Trailing
export type ButtonTrailingProps = {
  width?: number
  height?: number
  children: React.ReactNode
} & HTMLAttributes<HTMLSpanElement>

const ButtonTrailing: React.FC<ButtonTrailingProps> = ({
  className,
  width,
  height,
  children,
  ...rest
}) => {
  const size = width && height ? Math.max(width, height) : (width ?? height)
  const style = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  }

  return (
    <span
      {...rest}
      className={cn('inline-flex items-center justify-center overflow-hidden', className)}
      style={style}
    >
      <IconPropsContext.Provider value={{ size }}>{children}</IconPropsContext.Provider>
    </span>
  )
}

// Loading
export type ButtonLoadingProps = {
  alt?: string
  children: React.ReactNode
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({ alt = '불러오는 중', children }) => {
  const { disabled, loading } = useButtonContext('Button.Loading')
  const busy = !disabled && loading

  if (!busy) return null

  return (
    <span className="absolute inset-0 flex items-center justify-center">
      {children}
      <span className="sr-only">{alt}</span>
    </span>
  )
}

/* ========================================================================
 * Export
 * ======================================================================== */

type ButtonComponent = typeof InternalButtonRoot & {
  Leading: typeof ButtonLeading
  Center: typeof ButtonCenter
  Trailing: typeof ButtonTrailing
  Loading: typeof ButtonLoading
}

/**
 * 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <Button>
 *   <Button.Leading><PlusIcon /></Button.Leading>
 *   <Button.Center>추가</Button.Center>
 *   <Button.Trailing><ChevronIcon /></Button.Trailing>
 * </Button>
 * ```
 */
export const Button: ButtonComponent = Object.assign(InternalButtonRoot, {
  Leading: ButtonLeading,
  Center: ButtonCenter,
  Trailing: ButtonTrailing,
  Loading: ButtonLoading,
})
