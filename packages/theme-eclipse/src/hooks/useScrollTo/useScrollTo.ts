import { useCallback } from 'react'

export type ScrollToOptions = {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  inline?: ScrollLogicalPosition
}

export type UseScrollToReturn = {
  scrollTo: (target: Element | { x?: number; y?: number }, options?: ScrollToOptions) => void
}

/**
 * 대상 좌표 또는 엘리먼트로 부드럽게 스크롤하는 안정된 함수를 반환합니다.
 *
 * @example
 * ```tsx
 * const { scrollTo } = useScrollTo()
 * // 좌표로 이동
 * scrollTo({ y: 500 })
 * // 엘리먼트로 이동
 * scrollTo(ref.current)
 * ```
 */
export function useScrollTo(): UseScrollToReturn {
  const scrollTo = useCallback(
    (target: Element | { x?: number; y?: number }, options: ScrollToOptions = {}) => {
      if (typeof window === 'undefined') return

      if (target instanceof Element) {
        target.scrollIntoView({
          behavior: options.behavior ?? 'smooth',
          block: options.block ?? 'start',
          inline: options.inline ?? 'nearest',
        })
      } else {
        window.scrollTo({
          left: target.x ?? 0,
          top: target.y ?? 0,
          behavior: options.behavior ?? 'smooth',
        })
      }
    },
    []
  )

  return { scrollTo }
}
