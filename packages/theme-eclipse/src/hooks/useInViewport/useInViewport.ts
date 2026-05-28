import { useEffect, useState } from 'react'

export type UseInViewportOptions = {
  /** 교차 임계값 (0~1). 기본값: 0 */
  threshold?: number
  /** 루트 마진. 기본값: '0px' */
  rootMargin?: string
  /** true 면 처음 교차 후 관찰을 중단합니다 */
  once?: boolean
}

/**
 * ref 엘리먼트가 현재 뷰포트에 보이는지 여부를 반환합니다.
 * IntersectionObserver 를 래핑한 SSR-safe 훅입니다.
 *
 * React 19 호환: ref 파라미터 타입으로 `{ current: T | null }` 을 사용합니다.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const isVisible = useInViewport(ref, { threshold: 0.5, once: true })
 *
 * return <div ref={ref}>{isVisible ? 'Visible!' : 'Not visible'}</div>
 * ```
 */
export function useInViewport<T extends Element = Element>(
  ref: { current: T | null },
  options: UseInViewportOptions = {},
): boolean {
  const [isInViewport, setIsInViewport] = useState(false)
  const { threshold = 0, rootMargin = '0px', once = false } = options

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false
        setIsInViewport(visible)
        if (visible && once) observer.disconnect()
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin, once])

  return isInViewport
}
