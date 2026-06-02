import { type RefObject, useCallback } from 'react'

export type UseScrollIntoViewOptions = {
  /**
   * 스크롤 동작.
   * @defaultValue 'smooth'
   */
  behavior?: ScrollBehavior
  /**
   * 세로 정렬.
   * @defaultValue 'start'
   */
  block?: ScrollLogicalPosition
  /**
   * 가로 정렬.
   * @defaultValue 'nearest'
   */
  inline?: ScrollLogicalPosition
  /**
   * 스크롤 후 적용할 추가 오프셋(px). 헤더 고정 등 위에 sticky 영역이 있을 때 사용.
   * 양수면 더 아래로 노출됨 (즉, 요소 윗쪽에 공간이 더 생김).
   * @defaultValue 0
   */
  offset?: number
}

export type ScrollIntoViewTrigger = (override?: UseScrollIntoViewOptions) => void

/**
 * 참조된 요소를 뷰포트에 부드럽게 스크롤해 보여줍니다.
 *
 * - `behavior: 'smooth'` 지원 — `prefers-reduced-motion` 사용자는 브라우저가 자동으로 'auto' 로 대체
 * - `offset` 으로 sticky 헤더 같이 위에 가려지는 영역만큼 보정
 * - 호출 시점에 부분적인 옵션을 override 할 수 있음
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const scrollIntoView = useScrollIntoView(ref, { offset: 64 })
 *
 * useEffect(() => {
 *   if (matchedId === item.id) scrollIntoView()
 * }, [matchedId])
 * ```
 */
export function useScrollIntoView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseScrollIntoViewOptions = {}
): ScrollIntoViewTrigger {
  const { behavior = 'smooth', block = 'start', inline = 'nearest', offset = 0 } = options

  return useCallback(
    (override?: UseScrollIntoViewOptions) => {
      const node = ref.current
      if (!node || typeof window === 'undefined') return

      const finalOffset = override?.offset ?? offset
      const finalBehavior = override?.behavior ?? behavior
      const finalBlock = override?.block ?? block
      const finalInline = override?.inline ?? inline

      if (finalOffset === 0) {
        node.scrollIntoView({ behavior: finalBehavior, block: finalBlock, inline: finalInline })
        return
      }

      // Manual top calculation so we can apply the offset. block='start' is the
      // common case; for 'center'/'end' we fall back to native scrollIntoView
      // since the offset semantics get fuzzy.
      if (finalBlock !== 'start') {
        node.scrollIntoView({ behavior: finalBehavior, block: finalBlock, inline: finalInline })
        return
      }

      const rect = node.getBoundingClientRect()
      const top = rect.top + window.scrollY - finalOffset
      window.scrollTo({ top, behavior: finalBehavior })
    },
    [ref, behavior, block, inline, offset]
  )
}
