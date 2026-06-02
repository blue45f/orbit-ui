import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type UseInfiniteScrollOptions = {
  hasMore: boolean
  onLoadMore: () => void
  rootMargin?: string
  threshold?: number
}

/**
 * 센티넬 엘리먼트가 뷰포트에 진입하면 `onLoadMore`를 호출해 추가 데이터를 로드합니다.
 * `hasMore`가 false이면 observer를 자동으로 해제합니다.
 *
 * @example
 * ```tsx
 * const { sentinelRef, isLoading } = useInfiniteScroll({ hasMore, onLoadMore })
 * return (
 *   <ul>
 *     {items.map(item => <li key={item.id}>{item.name}</li>)}
 *     <li ref={sentinelRef}>{isLoading ? 'Loading...' : null}</li>
 *   </ul>
 * )
 * ```
 */
export function useInfiniteScroll<T extends Element = HTMLDivElement>({
  hasMore,
  onLoadMore,
  rootMargin = '100px',
  threshold = 0,
}: UseInfiniteScrollOptions): { sentinelRef: React.RefCallback<T>; isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(false)
  const callbackRef = useRef(onLoadMore)
  const hasMoreRef = useRef(hasMore)

  useLayoutEffect(() => {
    callbackRef.current = onLoadMore
  })

  useLayoutEffect(() => {
    hasMoreRef.current = hasMore
  })

  const observerRef = useRef<IntersectionObserver | null>(null)

  const sentinelRef = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect()
      observerRef.current = null

      if (!node) return
      if (typeof IntersectionObserver === 'undefined') return

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting && hasMoreRef.current) {
            setIsLoading(true)
            callbackRef.current()
          }
        },
        { rootMargin, threshold }
      )
      observerRef.current.observe(node)
    },
    [rootMargin, threshold]
  )

  // hasMore가 변경되면(새 데이터 로드 후) isLoading을 초기화
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hasMore) setIsLoading(false)
  }, [hasMore])

  return { sentinelRef, isLoading }
}
