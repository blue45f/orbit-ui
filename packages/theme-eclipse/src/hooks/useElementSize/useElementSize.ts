import { useCallback, useRef, useState } from 'react'

export type ElementSize = { width: number; height: number }

/**
 * ResizeObserver를 사용해 엘리먼트의 `width`와 `height`를 추적합니다.
 *
 * 반환된 `ref`를 대상 엘리먼트에 붙이면 크기가 변경될 때마다 자동으로 업데이트됩니다.
 * 엘리먼트가 언마운트되면 observer를 자동으로 해제합니다.
 *
 * @returns `{ ref, width, height }` — ref는 RefCallback
 *
 * @example
 * ```tsx
 * const { ref, width, height } = useElementSize()
 * return <div ref={ref}>{width} x {height}</div>
 * ```
 */
export function useElementSize<T extends HTMLElement = HTMLDivElement>(): {
  ref: React.RefCallback<T>
  width: number
  height: number
} {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })
  const observerRef = useRef<ResizeObserver | null>(null)

  const ref = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    if (!node) return

    observerRef.current = new ResizeObserver(([entry]) => {
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })

    observerRef.current.observe(node)
  }, [])

  return { ref, ...size }
}
