import { type RefObject, useEffect, useState } from 'react'

/**
 * 요소에 hover 중인지 추적합니다.
 *
 * 마우스 환경 한정 — 터치 환경에서는 항상 false를 반환합니다.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const isHovering = useHover(ref)
 *
 * return (
 *   <div ref={ref} data-hover={isHovering}>...</div>
 * )
 * ```
 *
 * 대부분의 hover 효과는 CSS `:hover`로 충분합니다. JS에서 분기해야 하는 경우에만 사용.
 */
export function useHover<T extends Element>(ref: RefObject<T | null>): boolean {
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleEnter = () => setHovering(true)
    const handleLeave = () => setHovering(false)

    node.addEventListener('mouseenter', handleEnter)
    node.addEventListener('mouseleave', handleLeave)
    return () => {
      node.removeEventListener('mouseenter', handleEnter)
      node.removeEventListener('mouseleave', handleLeave)
    }
  }, [ref])

  return hovering
}
