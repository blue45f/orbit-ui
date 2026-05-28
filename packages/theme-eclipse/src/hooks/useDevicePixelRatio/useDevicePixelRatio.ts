import { useEffect, useState } from 'react'

/**
 * `window.devicePixelRatio`를 반환하며, DPR이 변경될 때(예: 다른 해상도 모니터로 창 이동) 자동으로 갱신됩니다.
 *
 * SSR 안전: 서버 환경에서는 기본값 `1`을 반환합니다.
 *
 * @example
 * ```tsx
 * const dpr = useDevicePixelRatio()
 * return <canvas width={100 * dpr} height={100 * dpr} style={{ width: 100, height: 100 }} />
 * ```
 */
export function useDevicePixelRatio(): number {
  const [dpr, setDpr] = useState<number>(() =>
    typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    let mediaQuery: MediaQueryList | null = null

    const updateDpr = () => setDpr(window.devicePixelRatio)

    function handleChange() {
      updateDpr()
      setupQuery()
    }

    function setupQuery() {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', handleChange)
      }
      const dprStr = Math.round(window.devicePixelRatio * 100) / 100
      mediaQuery = window.matchMedia(`(resolution: ${dprStr}dppx)`)
      mediaQuery.addEventListener('change', handleChange)
    }

    setupQuery()

    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [])

  return dpr
}
