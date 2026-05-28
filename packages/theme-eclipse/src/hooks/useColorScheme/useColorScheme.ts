import { useEffect, useState } from 'react'

export type ColorScheme = 'light' | 'dark' | 'no-preference'

function getColorScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'light'
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'no-preference'
}

/**
 * 시스템 색상 구성표 기본 설정을 추적합니다.
 *
 * SSR 안전: 서버에서는 `'light'`를 반환합니다.
 *
 * @returns `'light' | 'dark' | 'no-preference'`
 *
 * @example
 * ```tsx
 * const colorScheme = useColorScheme()
 * return <div data-theme={colorScheme}>...</div>
 * ```
 */
export function useColorScheme(): ColorScheme {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(getColorScheme)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const dark = window.matchMedia('(prefers-color-scheme: dark)')
    const light = window.matchMedia('(prefers-color-scheme: light)')
    const handler = () => setColorScheme(getColorScheme())

    dark.addEventListener('change', handler)
    light.addEventListener('change', handler)

    return () => {
      dark.removeEventListener('change', handler)
      light.removeEventListener('change', handler)
    }
  }, [])

  return colorScheme
}
