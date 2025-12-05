import { useState } from 'react'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * 특정 요소 내 좌우 콘텐츠 중 더 넓은 쪽에 너비를 맞춰줘요.
 * - CTA, Square 버튼, TopBar와 같이 좌우에 여러 아이콘 또는 텍스트가 배치될 수 있는 컴포넌트에서 활용해요.
 * - 연결할 요소 타입을 Generic으로 전달할 수 있어요.
 *
 * @returns mutation을 감지할 좌우 요소 setter
 *
 * @example
 * const CTAButton = () => {
 *   const [left, right] = useWidthEqualizer()
 *
 *   // right, left 요소의 너비를 40px로 맞춤
 *   return (
 *     <button>
 *       <span ref={left} style={{ width: '20px' }}>
 *         <Icon1 />
 *         <Icon2 />
 *       </span>
 *       center
 *       <span ref={right} style={{ width: '40px' }}>text</span>
 *     </button>
 *   )
 * }
 */
export const useWidthEqualizer = <Left extends HTMLElement = HTMLElement, Right extends HTMLElement = HTMLElement>(): [
  (left: Left) => void,
  (right: Right) => void,
] => {
  const [left, setLeft] = useState<Left | null>(null)
  const [right, setRight] = useState<Right | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!left || !right) {
      return
    }

    const equalizeLR = () => {
      // min-width 속성이 없어야 현재 요소 너비를 정확히 계산할 수 있음
      left.style.minWidth = 'unset'
      right.style.minWidth = 'unset'

      const leftWidth = left.getBoundingClientRect().width || 0
      const rightWidth = right.getBoundingClientRect().width || 0
      const widerWidth = `${Math.ceil(Math.max(leftWidth, rightWidth))}px`

      left.style.minWidth = widerWidth
      right.style.minWidth = widerWidth
    }

    // 최초 1회 실행
    equalizeLR()

    const observer = new MutationObserver(equalizeLR)
    const options = { childList: true, characterData: true, subtree: true }

    observer.observe(left, options)
    observer.observe(right, options)

    return () => {
      observer.disconnect()
      left.style.minWidth = 'unset'
      right.style.minWidth = 'unset'
    }
  }, [left, right])

  return [setLeft, setRight]
}
