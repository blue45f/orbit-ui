import { useEffect, useRef } from 'react'

/**
 * 첫 번째 렌더링에서만 `true`를 반환하고, 이후 모든 렌더링에서 `false`를 반환합니다.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isFirstRender = useIsFirstRender()
 *   useEffect(() => {
 *     if (!isFirstRender) {
 *       // 업데이트 시에만 실행
 *     }
 *   })
 * }
 * ```
 */
export function useIsFirstRender(): boolean {
  const isFirstRenderRef = useRef(true)

  useEffect(() => {
    isFirstRenderRef.current = false
  }, [])

  // eslint-disable-next-line react-hooks/refs
  return isFirstRenderRef.current
}
