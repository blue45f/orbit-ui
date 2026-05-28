import { type RefObject, useEffect, useState } from 'react'

/**
 * 대상 요소 또는 그 하위 요소 중 하나라도 포커스를 가지면 `true`를 반환합니다.
 *
 * CSS `:focus-within` pseudo-class의 JS 버전입니다.
 * `focusin`/`focusout` 이벤트를 기반으로 동작하며, `focusout` 시
 * `relatedTarget`이 여전히 컨테이너 내부인지 확인해 내부 이동을 무시합니다.
 *
 * @param ref - 감시할 컨테이너 요소의 ref
 * @returns 포커스가 컨테이너 내부에 있으면 `true`
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 * const isFocusWithin = useFocusWithin(containerRef)
 *
 * return (
 *   <div ref={containerRef} data-focus-within={isFocusWithin}>
 *     <input placeholder="이름" />
 *     <input placeholder="이메일" />
 *   </div>
 * )
 * ```
 */
export function useFocusWithin<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>
): boolean {
  const [focusWithin, setFocusWithin] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleFocusIn = () => {
      setFocusWithin(true)
    }

    const handleFocusOut = (event: FocusEvent) => {
      // relatedTarget은 포커스를 받는 다음 요소
      // 컨테이너 내부라면 포커스가 내부에서 이동한 것이므로 무시
      if (node.contains(event.relatedTarget as Node | null)) return
      setFocusWithin(false)
    }

    node.addEventListener('focusin', handleFocusIn)
    node.addEventListener('focusout', handleFocusOut)

    return () => {
      node.removeEventListener('focusin', handleFocusIn)
      node.removeEventListener('focusout', handleFocusOut)
    }
  }, [ref])

  return focusWithin
}
