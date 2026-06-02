import { createContext, useContext } from 'react'

import type { EclipseProviderProps } from './EclipseProvider'

export type EclipseThemeContextValue = {
  mode: NonNullable<EclipseProviderProps['mode']>
  platform: NonNullable<EclipseProviderProps['platform']>
  baseTextSize: NonNullable<EclipseProviderProps['baseTextSize']>
}

export const EclipseThemeContext = createContext<EclipseThemeContextValue | null>(null)

/**
 * EclipseProvider의 현재 테마 컨텍스트(mode·platform·baseTextSize)를 읽습니다.
 *
 * @throws EclipseProvider 외부에서 호출하면 명시적 에러를 던집니다. Provider를 누락한 컨텍스트 버그를
 *         조용한 fallback이 아닌 빠른 실패로 잡기 위함입니다.
 *
 * @example
 * ```tsx
 * import { useEclipseTheme } from '@heejun-com/theme-eclipse'
 *
 * function ThemeBadge() {
 *   const { mode, platform } = useEclipseTheme()
 *   return <span>{mode} · {platform}</span>
 * }
 * ```
 */
export function useEclipseTheme(): EclipseThemeContextValue {
  const ctx = useContext(EclipseThemeContext)
  if (ctx === null) {
    throw new Error(
      'useEclipseTheme must be called inside an <EclipseProvider>. ' +
        'Make sure the provider wraps your component tree.'
    )
  }
  return ctx
}
