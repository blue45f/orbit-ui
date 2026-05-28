import { useEffect, useRef, useState } from 'react'

export type UseIdleOptions = {
  /**
   * idle 로 전환되기까지의 무활동 시간 (ms).
   * @defaultValue 60_000 (1분)
   */
  timeout?: number
  /**
   * idle 감시 활성 여부. false 면 항상 active 로 유지.
   * @defaultValue true
   */
  enabled?: boolean
  /**
   * 활동으로 간주할 이벤트 타입.
   * @defaultValue ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'wheel']
   */
  events?: ReadonlyArray<keyof WindowEventMap>
}

const DEFAULT_EVENTS: ReadonlyArray<keyof WindowEventMap> = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
  'wheel',
]

/**
 * 사용자가 일정 시간 아무 활동도 하지 않으면 `true` 를 반환합니다.
 *
 * 자동 로그아웃 카운트다운, 절전 모드 진입, "오랜만에 돌아오셨네요" 같은
 * 환영 메시지에 사용. 이벤트 한 번이면 즉시 active 로 돌아옵니다.
 *
 * @example
 * ```tsx
 * const isIdle = useIdle({ timeout: 30_000 })
 *
 * useEffect(() => {
 *   if (!isIdle) return
 *   showAutoLogoutWarning()
 * }, [isIdle])
 * ```
 */
export function useIdle(options: UseIdleOptions = {}): boolean {
  const { timeout = 60_000, enabled = true, events = DEFAULT_EVENTS } = options

  const [idle, setIdle] = useState(false)
  const timerRef = useRef<number | null>(null)
  // Snapshot events into a stable joined key so a fresh inline array each
  // render doesn't tear down/re-install the listeners every render.
  const eventsKey = events.join(',')

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIdle(false)
      return
    }

    const eventTypes = eventsKey.split(',') as Array<keyof WindowEventMap>

    const reset = () => {
      setIdle(false)
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setIdle(true), timeout)
    }

    reset()

    for (const type of eventTypes) {
      window.addEventListener(type, reset, { passive: true })
    }

    // Treat tab going hidden as a strong signal to enter idle immediately —
    // a tab the user can't see is by definition not being interacted with.
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current)
        setIdle(true)
      } else {
        reset()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      for (const type of eventTypes) {
        window.removeEventListener(type, reset)
      }
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled, timeout, eventsKey])

  return idle
}
