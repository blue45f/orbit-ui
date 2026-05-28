import { useEffect, useLayoutEffect, useRef } from 'react'

export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  active = true,
): void {
  const callbackRef = useRef(callback)
  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    if (typeof requestAnimationFrame === 'undefined') return
    if (!active) return

    let rafId: number
    let lastTime: number | null = null

    const loop = (time: number) => {
      const delta = lastTime === null ? 0 : time - lastTime
      lastTime = time
      callbackRef.current(delta)
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [active])
}
