import { useMemo } from 'react'

/* ========================================================================
 * Types
 * ======================================================================== */

export type Tokens = {
  [key: string]: string
}

export type ThemeOverrides<Theme extends Record<string, string>> = Partial<
  Record<keyof Theme, string>
>

/**
 * Recursively collects all string-valued leaf keys from a (possibly nested) theme token object.
 * This allows `theme` overrides to target any token key, including those nested under `variant`.
 */
type CollectStringKeys<T> = T extends string
  ? never
  : { [K in keyof T]: T[K] extends string ? K : CollectStringKeys<T[K]> }[keyof T]

export type ComponentThemeProps<Theme> = {
  theme?: Partial<Record<CollectStringKeys<Theme> & string, string>>
}

export type UseComponentThemeReturn = {
  themeVars: Record<string, string>
  themeStyle: React.CSSProperties
}

/* ========================================================================
 * Initial Values
 * ======================================================================== */

export const INITIAL_VALUE = {
  ELEVATION: 'auto',
  WIDTH: 'auto',
  COLOR: 'inherit',
  SPACING: '0px',
  SHADOW: 'none',
  RADIUS: 'none',
  TYPOGRAPHY: 'inherit',
}

/* ========================================================================
 * Hooks
 * ======================================================================== */

/**
 * 컴포넌트 테마 적용 훅
 *
 * @param themeBase - 기본 테마 객체
 * @param themeOverrides - 재정의할 테마 값
 * @returns themeVars (CSS 변수), themeStyle (인라인 스타일)
 *
 * @example
 * ```tsx
 * const { themeStyle } = useComponentTheme(defaultTheme, { fillColor: 'red' })
 * return <button style={themeStyle}>버튼</button>
 * ```
 */
export const useComponentTheme = <Theme extends Record<string, string>>(
  themeBase: Theme,
  themeOverrides: ThemeOverrides<Theme> = {}
): UseComponentThemeReturn => {
  const themeVars = useMemo(() => {
    return Object.entries(themeOverrides).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          ;(acc as Record<string, string>)[key] = value
        }
        return acc
      },
      { ...themeBase }
    )
  }, [themeBase, themeOverrides])

  const themeStyle = useMemo(() => {
    const style: React.CSSProperties = {}
    for (const [key, value] of Object.entries(themeVars)) {
      // CSS 변수를 인라인 스타일로 변환
      if (value) {
        const cssVarName = `--${camelToKebab(key)}`
        ;(style as Record<string, string>)[cssVarName] = value
      }
    }
    return style
  }, [themeVars])

  return { themeVars, themeStyle }
}

/**
 * 테마 연결 유틸리티
 */
export const linkComponentTheme = <Theme extends Record<string, string>>(
  from: Theme,
  to: Record<keyof Theme, string>
): Record<string, string> => {
  const linked: Record<string, string> = {}
  for (const key in from) {
    if (Object.prototype.hasOwnProperty.call(to, key)) {
      linked[from[key]] = to[key]
    }
  }
  return linked
}

/* ========================================================================
 * Utilities
 * ======================================================================== */

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}
