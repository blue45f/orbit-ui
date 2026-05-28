import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * unmount 시 한 번 실행되는 cleanup 함수.
 *
 * 콜백은 ref로 보관되므로 매 렌더의 최신 함수가 호출됩니다.
 *
 * @example
 * ```tsx
 * useUnmount(() => {
 *   abortControllerRef.current?.abort()
 * })
 * ```
 */
export function useUnmount(callback: () => void): void {
  const callbackRef = useRef(callback)
  useLayoutEffect(() => { callbackRef.current = callback })

  useEffect(() => {
    return () => {
      callbackRef.current()
    }
  }, [])
}
