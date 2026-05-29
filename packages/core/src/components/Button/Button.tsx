import { IconPropsContext } from '@heejun-com/icons'
import { Children, HTMLAttributes, ReactNode, forwardRef, useEffect, useReducer } from 'react'

import { cn } from '../../styles'
import { filterComponents } from '../../libs'

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

/**
 * Button 테마 토큰 계약.
 *
 * 모든 키는 core Button 에서 `--btn-*` CSS custom property 로 emit 되고,
 * globals.css `.button-token` 헬퍼가 :hover / :active / :focus-visible / disabled
 * 상태를 이 변수들로 구동한다. theme 패키지 component-token 이 emit 하는 키와 1:1.
 *
 * `textStyle*` 는 per-size 토큰(variant.size 에서 suffix 가 벗겨진 평탄 키)을 받아
 * 타이포그래피(face/weight/size/lineHeight/tracking)를 토큰으로 렌더한다.
 */
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
  /** resting shadow. DESIGN §4 Flat-By-Default 에 따라 보통 none. */
  shadow?: string
  // 타이포그래피 토큰 (Label * Emphasized 등)
  textStyleFace?: string
  textStyleWeight?: string
  textStyleSize?: string
  textStyleLineHeight?: string
  textStyleTracking?: string
}

/**
 * ButtonTheme 키 → `.button-token` 헬퍼가 읽는 `--btn-*` custom property 이름 매핑.
 */
const THEME_TO_CSS_VAR: Record<keyof ButtonTheme, string> = {
  enabledFillColor: '--btn-enabled-fill',
  hoveredFillColor: '--btn-hovered-fill',
  pressedFillColor: '--btn-pressed-fill',
  disabledFillColor: '--btn-disabled-fill',
  enabledBorderColor: '--btn-enabled-border',
  disabledBorderColor: '--btn-disabled-border',
  focusedBorderColor: '--btn-focused-border',
  enabledForegroundColor: '--btn-enabled-foreground',
  disabledForegroundColor: '--btn-disabled-foreground',
  textStyleFace: '--btn-text-face',
  textStyleWeight: '--btn-text-weight',
  textStyleSize: '--btn-text-size',
  textStyleLineHeight: '--btn-text-line-height',
  textStyleTracking: '--btn-text-tracking',
  // 아래는 의사 클래스가 필요 없어 직접 style 속성으로 적용
  radius: '',
  paddingHorizontal: '',
  gap: '',
  shadow: '',
}

/* ========================================================================
 * Styles
 * ======================================================================== */

// 시각 상태는 `.button-token` 헬퍼(globals.css)가 CSS 의사 클래스로 구동한다.
// 여기서는 레이아웃/포인터/트랜지션과 disabled 의 커서만 담당한다.
// opacity-50 은 제거: disabled 는 전용 disabledFill/disabledForeground 토큰으로 렌더.
const buttonStyles = (disabled: boolean) =>
  cn(
    'button-token',
    'relative inline-flex items-center justify-center',
    'rounded-md px-400',
    'transition-all duration-fast',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  )

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
      ...rest
    } = props

    const a11y = useButtonA11y({ disabled, loading: loadingProp })

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

    const className = cn(buttonStyles(disabled), arrangementStyles[arrangement], classProp)

    // 모든 색상/타이포 토큰을 `--btn-*` custom property 로 emit → `.button-token`
    // 헬퍼가 hover/active/focus-visible/disabled 상태에서 읽는다.
    const tokenVars: Record<string, string> = {}
    if (theme) {
      for (const [key, cssVar] of Object.entries(THEME_TO_CSS_VAR)) {
        const value = theme[key as keyof ButtonTheme]
        if (cssVar && value) tokenVars[cssVar] = value
      }
    }

    const style: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderWidth: `${borderWidth}px`,
      borderStyle: borderWidth > 0 ? 'solid' : 'none',
      borderRadius: theme?.radius,
      paddingLeft: theme?.paddingHorizontal,
      paddingRight: theme?.paddingHorizontal,
      gap: theme?.gap,
      // 휴식 상태 그림자(보통 none). DESIGN §4 Flat-By-Default.
      boxShadow: theme?.shadow,
      ...tokenVars,
      ...styleProp,
    } as React.CSSProperties

    const userOnClick = (rest as { onClick?: (e: React.MouseEvent) => void }).onClick

    return (
      <ButtonContext disabled={disabled} loading={loadingProp}>
        <Component
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
          className={className}
          style={style}
          data-loading={loadingProp}
          // `.button-token` 의 disabled 스타일 hook. loading 과 분리(aria-disabled 와 달리).
          data-disabled={disabled || undefined}
          {...rest}
          {...a11y}
          // disabled/loading 상태에서 native click을 차단.
          // `as='a'`인 경우 native disabled 속성이 없어 onClick 가드가 필요함.
          disabled={Component === 'button' && (disabled || busy) ? true : undefined}
          onClick={(e: React.MouseEvent) => {
            if (disabled || busy) {
              e.preventDefault()
              e.stopPropagation()
              return
            }
            userOnClick?.(e)
          }}
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
  // 첫 렌더에서 즉시 aria-live=assertive를 켜면 마운트 알림이 시끄럽다.
  // 한 번이라도 loading이 true가 됐을 때부터 폴라이트하게 알린다.
  const [dirty, markDirty] = useReducer(() => true, false)

  useEffect(() => {
    if (loading) markDirty()
  }, [loading])

  return {
    'aria-disabled': disabled || loading,
    'aria-busy': loading || undefined,
    'aria-live': (dirty ? 'polite' : 'off') as 'polite' | 'off',
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
      <IconPropsContext.Provider value={{ size, tone: 'soft' }}>{children}</IconPropsContext.Provider>
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
  // 아이콘이 슬롯 안에 맞도록 가장 작은 변을 기준으로 한다 (Leading과 일관).
  const size = width && height ? Math.min(width, height) : (width ?? height)
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
      <IconPropsContext.Provider value={{ size, tone: 'soft' }}>{children}</IconPropsContext.Provider>
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
