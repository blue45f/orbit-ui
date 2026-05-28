import { useEffect, useMemo, useRef } from 'react'

/**
 * 콜백을 ref로 안정화해 이벤트 리스너·타이머가 항상 최신 버전을 호출하도록 합니다.
 *
 * 콜백이 바뀌어도 반환된 함수 참조는 변하지 않으므로,
 * useEffect 의존성 배열에 넣지 않아도 안전합니다.
 *
 * @example
 * ```tsx
 * const stableOnChange = useCallbackRef(onChange)
 *
 * useEffect(() => {
 *   element.addEventListener('change', stableOnChange)
 *   return () => element.removeEventListener('change', stableOnChange)
 * }, [stableOnChange]) // stableOnChange는 절대 바뀌지 않음
 * ```
 */
export function useCallbackRef<T extends (...args: unknown[]) => unknown>(
  callback: T | undefined,
): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useMemo(
    () =>
      ((...args) => {
        return callbackRef.current?.(...args)
      }) as T,
    [],
  )
}
