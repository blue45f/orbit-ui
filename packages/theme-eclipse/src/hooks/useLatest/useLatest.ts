import { type MutableRefObject, useLayoutEffect, useRef } from 'react'

/**
 * 값의 항상-최신 ref를 반환합니다. effect·timer·이벤트 핸들러에서 stale closure를 회피.
 *
 * @example
 * ```tsx
 * const valueRef = useLatest(value)
 *
 * useEffect(() => {
 *   const id = setInterval(() => {
 *     console.log('latest:', valueRef.current)  // 항상 최신
 *   }, 1000)
 *   return () => clearInterval(id)
 * }, [])
 * ```
 *
 * `useRef`와 달리 매 렌더마다 ref.current가 최신 값으로 갱신됩니다.
 */
export function useLatest<T>(value: T): MutableRefObject<T> {
  const ref = useRef<T>(value)
  useLayoutEffect(() => { ref.current = value })
  return ref
}
