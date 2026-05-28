import { useCallback, useEffect, useState } from 'react'

/**
 * URL 검색 파라미터 하나를 읽고 씁니다.
 *
 * - `popstate` 이벤트로 브라우저 뒤로/앞으로 이동 시 자동 동기화
 * - SSR 안전: 서버에서는 `null`을 반환
 *
 * @example
 * ```tsx
 * const [tab, setTab] = useSearchParam('tab')
 * // ?tab=overview → tab === 'overview'
 * setTab('settings')   // pushState + setState
 * setTab(null)         // key 제거
 * ```
 */
export function useSearchParam(
  key: string,
): [string | null, (value: string | null) => void] {
  const [value, setValue] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search).get(key)
  })

  useEffect(() => {
    const sync = () => {
      setValue(new URLSearchParams(window.location.search).get(key))
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [key])

  const set = useCallback(
    (next: string | null) => {
      const params = new URLSearchParams(window.location.search)
      if (next === null) params.delete(key)
      else params.set(key, next)
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)
      setValue(next)
    },
    [key],
  )

  return [value, set]
}
