import { useCallback, useRef, useState } from 'react'

import { useEventListener } from '../useEventListener'

export type UseMouseState = {
  /** Mouse position relative to the viewport (clientX/Y) */
  x: number
  y: number
  /** Mouse position relative to document (pageX/Y) */
  pageX: number
  pageY: number
  /** Mouse position relative to the tracked element (if ref provided) */
  elementX: number | null
  elementY: number | null
  /** The tracked element's bounding rect (null if no ref or element not mounted) */
  elementRect: DOMRect | null
}

const initialState: UseMouseState = {
  x: 0,
  y: 0,
  pageX: 0,
  pageY: 0,
  elementX: null,
  elementY: null,
  elementRect: null,
}

/**
 * 마우스 위치를 뷰포트 기준 및 특정 요소 기준으로 추적합니다.
 *
 * 반환되는 `ref` 콜백을 추적할 요소에 부착하면 `elementX`/`elementY`가 계산됩니다.
 *
 * @example
 * ```tsx
 * const { ref, mouse } = useMouse<HTMLDivElement>()
 *
 * return (
 *   <div ref={ref}>
 *     <p>Viewport: ({mouse.x}, {mouse.y})</p>
 *     <p>Element: ({mouse.elementX}, {mouse.elementY})</p>
 *   </div>
 * )
 * ```
 */
export function useMouse<T extends HTMLElement = HTMLElement>(): {
  ref: React.RefCallback<T>
  mouse: UseMouseState
} {
  const [mouse, setMouse] = useState<UseMouseState>(initialState)
  const elementRef = useRef<T | null>(null)

  useEventListener('mousemove', (event: Event) => {
    const e = event as MouseEvent
    const update: UseMouseState = {
      x: e.clientX,
      y: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY,
      elementX: null,
      elementY: null,
      elementRect: null,
    }

    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      update.elementRect = rect
      update.elementX = e.clientX - rect.left
      update.elementY = e.clientY - rect.top
    }

    setMouse(update)
  })

  const ref = useCallback((node: T | null) => {
    elementRef.current = node
  }, [])

  return { ref, mouse }
}
