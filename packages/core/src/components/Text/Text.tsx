import { createContext, createElement, useContext } from 'react'

import { cn } from '../../styles'
import { polymorphic } from '../../libs'

/* ========================================================================
 * Types
 * ======================================================================== */

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'

export type TypographyTheme = {
  color?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
}

/* ========================================================================
 * Base Text Context (for theme packages)
 * ======================================================================== */

export type BaseTextContextValue = {
  maxLines?: number
  theme?: Partial<TypographyTheme>
  vars?: Record<string, string>
  textStyle?: string
  color?: string
}

export const BaseTextContext = createContext<BaseTextContextValue>({})

/* ========================================================================
 * Base Text Props (for theme packages)
 * ======================================================================== */

export type BaseTextProps = {
  /** 최대 줄 수 */
  maxLines?: number
  /** 텍스트 스타일 */
  textStyle?: string
  /** 텍스트 색상 */
  color?: string
  /** 테마 커스터마이징 */
  theme?: Partial<TypographyTheme>
  /** CSS 변수 */
  vars?: Record<string, string>
  /** 자식 요소 */
  children?: React.ReactNode
}

export type TextSpecificProps = {
  /** 변형 */
  variant?: TypographyVariant
  /** 테마 커스터마이징 */
  theme?: Partial<TypographyTheme>
}

type TagByVariant = {
  h1: 'h1'
  h2: 'h2'
  h3: 'h3'
  h4: 'h4'
  h5: 'h5'
  h6: 'h6'
  body1: 'p'
  body2: 'p'
  caption: 'span'
  overline: 'span'
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-bold',
  h4: 'text-lg font-semibold',
  h5: 'text-base font-semibold',
  h6: 'text-sm font-semibold',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
  overline: 'text-xs uppercase tracking-wide',
}

const tagByVariant: TagByVariant = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
}

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * 타이포그래피 컴포넌트
 *
 * @example
 * ```tsx
 * <Text variant="h1">제목</Text>
 * <Text variant="body1">본문</Text>
 * ```
 */
export const Text = polymorphic<'p', keyof React.JSX.IntrinsicElements, TextSpecificProps>(
  (props, ref) => {
    const {
      as,
      variant = 'body1',
      className: classProp,
      style: styleProp,
      theme,
      children,
      ...rest
    } = props

    const tag = as ?? tagByVariant[variant]

    const className = cn(variantStyles[variant], classProp)

    const style: React.CSSProperties = {
      color: theme?.color,
      fontSize: theme?.fontSize,
      fontWeight: theme?.fontWeight,
      lineHeight: theme?.lineHeight,
      letterSpacing: theme?.letterSpacing,
      ...styleProp,
    }

    return createElement(tag, { ref, className, style, ...rest }, children)
  },
  { useForwardRef: true }
)

/* ========================================================================
 * ForcedBaseTextStyle (for theme packages)
 * ======================================================================== */

/**
 * 자식 요소에 텍스트 스타일을 강제 적용하는 컴포넌트
 * 테마 패키지에서 텍스트 스타일을 일관되게 적용할 때 사용
 */
export const ForcedBaseTextStyle: React.FC<BaseTextProps> = (props) => {
  const { maxLines, textStyle, color, theme, vars, children } = props

  const style: React.CSSProperties = {
    ...(maxLines && {
      display: '-webkit-box',
      WebkitLineClamp: maxLines,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
    }),
    ...(color && { color }),
    ...theme,
    ...vars,
  }

  return (
    <BaseTextContext.Provider value={{ maxLines, textStyle, color, theme, vars }}>
      <span style={style}>{children}</span>
    </BaseTextContext.Provider>
  )
}

/* ========================================================================
 * BaseText (for theme packages)
 * ======================================================================== */

/**
 * 기본 텍스트 컴포넌트 (테마 패키지용)
 */
export const BaseText = polymorphic<'span', keyof React.JSX.IntrinsicElements, BaseTextProps>(
  (props, ref) => {
    const {
      as = 'span',
      maxLines,
      textStyle: _textStyle,
      color,
      theme,
      vars,
      children,
      ...rest
    } = props
    const context = useContext(BaseTextContext)

    const style: React.CSSProperties = {
      ...(maxLines && {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
      }),
      ...(color && { color }),
      ...context.theme,
      ...theme,
      ...context.vars,
      ...vars,
    }

    return createElement(as, { ref, style, ...rest }, children)
  },
  { useForwardRef: true }
)
