import { useEffect, useRef, useState } from 'react'

import { ResizeObserver } from '../utils/dom'

export type ElementSize = { width: number; height: number }

export const useElementSize = <T extends HTMLElement = HTMLDivElement>(): [
  React.MutableRefObject<T | null>,
  ElementSize,
] => {
  const [rect, setRect] = useState<ElementSize>({ width: 0, height: 0 })
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setRect(entries[0].contentRect)
      }
    })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return [elementRef, rect]
}
