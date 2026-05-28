import { useEffect, useRef } from 'react'

/**
 * 컴포넌트가 현재 마운트 상태인지 ref로 반환합니다. SSR 안전성 + 비동기 콜백 안전성에 사용.
 *
 * @example
 * ```tsx
 * const isMounted = useIsMounted()
 *
 * useEffect(() => {
 *   fetchData().then((data) => {
 *     if (!isMounted.current) return // unmount된 경우 setState 호출 방지
 *     setData(data)
 *   })
 * }, [])
 * ```
 */
export function useIsMounted(): { readonly current: boolean } {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return mountedRef
}
