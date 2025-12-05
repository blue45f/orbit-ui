import { useEffect, useRef } from 'react'

/**
 * 이전 렌더링 시점의 `value`를 반환해요.
 * - 이전에 렌더링한 적이 없으면 현재 값과 같아요.
 *
 * @example
 * ```ts
 * const prevValue = usePrevious(props.value)
 * ```
 */
export function usePrevious<T>(value: T): T {
  const store = useRef<T>(value)

  useEffect(() => {
    store.current = value
  }, [value])

  return store.current
}
