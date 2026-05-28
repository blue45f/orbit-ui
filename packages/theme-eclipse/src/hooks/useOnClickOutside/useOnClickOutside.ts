import { type RefObject, useEffect, useLayoutEffect, useRef } from 'react'

export type UseOnClickOutsideOptions = {
  /**
   * 비활성화. dropdown·popover 닫힌 동안 리스너를 떼고 싶을 때.
   * @defaultValue true
   */
  enabled?: boolean
  /**
   * 'mousedown' (Radix·Headless UI 기본) vs 'click' (지연 발생 + dispose 가능). 기본 mousedown.
   * @defaultValue 'mousedown'
   */
  event?: 'mousedown' | 'click'
}

/**
 * 지정 ref(들) 밖에서 클릭이 발생하면 핸들러를 호출합니다.
 *
 * - 여러 ref를 배열로 전달해 trigger + content 같은 합성 컴포넌트도 안전.
 * - touchstart도 함께 구독해 모바일 외부 탭에 반응.
 * - 핸들러는 ref로 보관, 매 이벤트마다 최신 함수가 호출됩니다.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * useOnClickOutside(ref, () => setOpen(false))
 * ```
 *
 * @example
 * ### Trigger + Content 합성
 * ```tsx
 * useOnClickOutside([triggerRef, contentRef], () => setOpen(false))
 * ```
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null> | Array<RefObject<HTMLElement | null>>,
  handler: (event: MouseEvent | TouchEvent) => void,
  options: UseOnClickOutsideOptions = {},
): void {
  const { enabled = true, event = 'mousedown' } = options
  const handlerRef = useRef(handler)
  useLayoutEffect(() => { handlerRef.current = handler })

  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return
    const refs = Array.isArray(ref) ? ref : [ref]

    const listener = (e: MouseEvent | TouchEvent) => {
      const target = e.target
      if (!(target instanceof Node)) return
      for (const r of refs) {
        const node = r.current
        if (node && node.contains(target)) return
      }
      handlerRef.current(e)
    }

    document.addEventListener(event, listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener(event, listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, enabled, event])
}
