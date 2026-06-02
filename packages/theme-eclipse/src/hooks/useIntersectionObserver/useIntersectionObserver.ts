import { type RefObject, useEffect, useState } from 'react'

export type UseIntersectionObserverOptions = {
  /** root element. 기본 viewport. */
  root?: Element | Document | null
  /** rootMargin. CSS margin 문자열. 기본 '0px'. */
  rootMargin?: string
  /** threshold(들). 기본 0 (1px만 보이면). */
  threshold?: number | number[]
  /**
   * 한 번 교차 후 관찰 중단. infinite scroll의 트리거 등에 사용.
   * @defaultValue false
   */
  freezeOnceVisible?: boolean
  /**
   * 비활성화. ref가 nullable인 경우와 별개로 토글하고 싶을 때.
   * @defaultValue true
   */
  enabled?: boolean
}

export type UseIntersectionObserverEntry = {
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
}

/**
 * 요소가 viewport(또는 root)와 교차하는지 추적합니다. lazy load, scroll reveal, infinite scroll에 사용.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const { isIntersecting } = useIntersectionObserver(ref, { threshold: 0.5 })
 *
 * useEffect(() => {
 *   if (isIntersecting) trackImpression()
 * }, [isIntersecting])
 * ```
 *
 * @example
 * ### Infinite scroll
 * ```tsx
 * const sentinelRef = useRef<HTMLDivElement>(null)
 * const { isIntersecting } = useIntersectionObserver(sentinelRef, {
 *   freezeOnceVisible: false,
 *   rootMargin: '200px',
 * })
 * useEffect(() => { if (isIntersecting) loadMore() }, [isIntersecting])
 * ```
 */
export function useIntersectionObserver<T extends Element>(
  ref: RefObject<T | null>,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverEntry {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    freezeOnceVisible = false,
    enabled = true,
  } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [frozen, setFrozen] = useState(false)
  const isIntersecting = entry?.isIntersecting ?? false

  useEffect(() => {
    if (!enabled || frozen) return
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([next]) => {
        if (!next) return
        setEntry(next)
        if (next.isIntersecting && freezeOnceVisible) {
          setFrozen(true)
        }
      },
      { root, rootMargin, threshold }
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [ref, root, rootMargin, threshold, enabled, freezeOnceVisible, frozen])

  return { isIntersecting, entry }
}
