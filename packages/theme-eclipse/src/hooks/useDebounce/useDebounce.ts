import { useEffect, useRef, useState } from 'react'

/**
 * 입력값이 `delay`ms 동안 안정되면 값을 갱신해 반환합니다.
 *
 * 검색 입력처럼 keystroke마다 비싼 작업(API 호출, 필터링)을 실행하고 싶지 않을 때 사용합니다.
 *
 * @example
 * ```tsx
 * const [query, setQuery] = useState('')
 * const debouncedQuery = useDebounce(query, 300)
 *
 * useEffect(() => {
 *   if (debouncedQuery) fetchResults(debouncedQuery)
 * }, [debouncedQuery])
 * ```
 *
 * @param value 디바운스 대상 값
 * @param delay 안정 대기 시간(ms). 기본 200ms.
 * @returns 마지막으로 안정된 값
 */
export function useDebounce<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState<T>(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [value, delay])

  return debounced
}
