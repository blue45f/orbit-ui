import { useEffect, useRef } from 'react'

/**
 * 마지막 렌더에서의 값을 반환합니다. 첫 렌더에서는 `undefined`.
 *
 * 값 변경 감지·트랜지션 트리거에 사용합니다.
 *
 * @example
 * ```tsx
 * const prev = usePrevious(count)
 *
 * useEffect(() => {
 *   if (prev !== undefined && prev !== count) {
 *     onCountChange(prev, count)
 *   }
 * }, [count, prev])
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
