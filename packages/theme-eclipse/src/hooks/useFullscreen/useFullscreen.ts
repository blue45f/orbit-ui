import { useCallback, useEffect, useState } from 'react'

export type UseFullscreenReturn = {
  isFullscreen: boolean
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
  supported: boolean
}

/**
 * ref 엘리먼트에 대한 전체화면 모드를 제어합니다.
 *
 * @param ref - 전체화면으로 표시할 엘리먼트의 ref
 * @returns 전체화면 상태 및 제어 함수 (`isFullscreen`, `enter`, `exit`, `toggle`, `supported`)
 *
 * @example
 * ```tsx
 * function VideoPlayer() {
 *   const ref = useRef<HTMLDivElement>(null)
 *   const { isFullscreen, toggle } = useFullscreen(ref)
 *   return (
 *     <div ref={ref}>
 *       <button onClick={toggle}>{isFullscreen ? 'Exit' : 'Fullscreen'}</button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useFullscreen<T extends Element = Element>(
  ref: { current: T | null }
): UseFullscreenReturn {
  const supported = typeof document !== 'undefined' && 'fullscreenElement' in document
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!supported) return
    const handleChange = () => {
      setIsFullscreen(document.fullscreenElement !== null)
    }
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [supported])

  const enter = useCallback(async () => {
    if (!ref.current || !supported) return
    await ref.current.requestFullscreen?.()
  }, [ref, supported])

  const exit = useCallback(async () => {
    if (!supported) return
    if (document.fullscreenElement) await document.exitFullscreen()
  }, [supported])

  const toggle = useCallback(async () => {
    if (isFullscreen) await exit()
    else await enter()
  }, [isFullscreen, enter, exit])

  return { isFullscreen, enter, exit, toggle, supported }
}
