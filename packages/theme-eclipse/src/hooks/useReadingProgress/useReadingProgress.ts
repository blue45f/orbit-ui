import { useCallback, useEffect, useRef, useState } from 'react'

export function useReadingProgress(containerRef?: { current: HTMLElement | null }): number {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  const calculate = useCallback(() => {
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      let value = 0

      if (containerRef) {
        const el = containerRef.current
        if (el) {
          const scrollable = el.scrollHeight - el.clientHeight
          value = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0
        }
      } else {
        const scrollTop = window.scrollY ?? document.documentElement.scrollTop
        const scrollable =
          document.documentElement.scrollHeight - document.documentElement.clientHeight
        value = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0
      }

      setProgress(Math.min(100, Math.max(0, value)))
    })
  }, [containerRef])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const target: EventTarget = containerRef?.current ?? window
    target.addEventListener('scroll', calculate, { passive: true })

    calculate()

    return () => {
      target.removeEventListener('scroll', calculate)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [containerRef, calculate])

  return progress
}
