import { type RefObject, useEffect, useRef } from 'react'

type Target = Window | Document | HTMLElement | EventTarget

type EventMapOf<T extends Target | null> = T extends Window
  ? WindowEventMap
  : T extends Document
    ? DocumentEventMap
    : T extends HTMLElement
      ? HTMLElementEventMap
      : Record<string, Event>

/**
 * 타겟(`window` · `document` · DOM element)에 이벤트 리스너를 부착하고 unmount 시 자동 해제합니다.
 *
 * 핸들러는 ref로 보관되므로 의존성에 포함하지 않아도 매 렌더의 최신 함수를 호출합니다.
 *
 * @example
 * ### 키보드 단축키 (기본 타겟 = window)
 * ```tsx
 * useEventListener('keydown', (e) => {
 *   if (e.key === 'Escape') onClose()
 * })
 * ```
 *
 * @example
 * ### 특정 element에 부착
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * useEventListener('mousemove', handleMove, ref)
 * ```
 */
export function useEventListener<T extends Target | null>(
  type: string,
  handler: (event: EventMapOf<T>[keyof EventMapOf<T>] & Event) => void,
  target?: RefObject<T> | undefined,
  options?: boolean | AddEventListenerOptions,
): void {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const node: Target | null =
      target === undefined ? (typeof window !== 'undefined' ? window : null) : target.current
    if (node === null || typeof node.addEventListener !== 'function') {
      return
    }
    const listener = (event: Event) => {
      handlerRef.current(event as EventMapOf<T>[keyof EventMapOf<T>] & Event)
    }
    node.addEventListener(type, listener, options)
    return () => {
      node.removeEventListener(type, listener, options)
    }
  }, [type, target, options])
}
