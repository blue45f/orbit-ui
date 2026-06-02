import { type RefObject, useEffect, useState } from 'react'

export type ResizeObserverSize = {
  width: number
  height: number
}

export type UseResizeObserverEntry = {
  size: ResizeObserverSize | null
  entry: ResizeObserverEntry | null
}

/**
 * 요소의 크기 변화를 추적합니다. content-box 기반.
 *
 * `getBoundingClientRect` 폴링 대신 ResizeObserver를 사용하므로 30/60fps 폴링 없이도 즉시 반응.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const { size } = useResizeObserver(ref)
 *
 * return (
 *   <div ref={ref}>
 *     {size && `${Math.round(size.width)}px wide`}
 *   </div>
 * )
 * ```
 *
 * SSR 안전: ResizeObserver 미지원 환경(jsdom 기본 등)에서 size는 null로 유지됩니다.
 */
export function useResizeObserver<T extends Element>(
  ref: RefObject<T | null>
): UseResizeObserverEntry {
  const [state, setState] = useState<UseResizeObserverEntry>({ size: null, entry: null })

  useEffect(() => {
    const node = ref.current
    if (!node || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      setState({ size: { width, height }, entry })
    })
    observer.observe(node)

    return () => observer.disconnect()
  }, [ref])

  return state
}
