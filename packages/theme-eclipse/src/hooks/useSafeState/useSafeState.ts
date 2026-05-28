import { useCallback, useEffect, useRef, useState } from 'react'
import type React from 'react'

/**
 * `useState` 와 동일하지만, 컴포넌트 언마운트 후 setState 호출을 무시합니다.
 *
 * "Can't perform a React state update on an unmounted component" 경고를 방지합니다.
 *
 * @example
 * ```tsx
 * const [data, setData] = useSafeState<string | null>(null)
 *
 * useEffect(() => {
 *   fetchData().then(setData) // 언마운트 후에도 안전
 * }, [])
 * ```
 */
export function useSafeState<T>(
  initialState: T | (() => T),
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const isMounted = useRef(false)
  const [state, setState] = useState(initialState)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const safeSetState = useCallback<React.Dispatch<React.SetStateAction<T>>>((action) => {
    if (isMounted.current) setState(action)
  }, [])

  return [state, safeSetState]
}
