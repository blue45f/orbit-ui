import { useEffect, useState } from 'react'

export type UseMediaQueryOptions = {
  /**
   * SSR 환경에서 첫 렌더 시 가정할 값. 클라이언트 하이드레이션 후 실제 매치 결과로 갱신됩니다.
   * @defaultValue false
   */
  fallback?: boolean
}

/**
 * `matchMedia(query)` 결과를 구독하고, 미디어 쿼리 매치 여부를 상태로 노출합니다.
 *
 * SSR 안전: 서버에서는 `fallback` 값을 반환하고, 클라이언트에서는 첫 effect tick에 동기화됩니다.
 *
 * @example
 * ```tsx
 * const isCompact = useMediaQuery('(max-width: 640px)')
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)')
 * ```
 */
export function useMediaQuery(query: string, options: UseMediaQueryOptions = {}): boolean {
  const { fallback = false } = options
  const [matches, setMatches] = useState<boolean>(() => readMatch(query, fallback))

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }
    const mq = window.matchMedia(query)
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mq.matches)
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handleChange)
      return () => mq.removeEventListener('change', handleChange)
    }
    // Safari < 14 fallback
    mq.addListener(handleChange)
    return () => mq.removeListener(handleChange)
  }, [query])

  return matches
}

function readMatch(query: string, fallback: boolean): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return fallback
  }
  try {
    return window.matchMedia(query).matches
  } catch {
    return fallback
  }
}
