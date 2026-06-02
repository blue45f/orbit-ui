import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type UseCountdownOptions = {
  /**
   * 시작 시점의 남은 ms.
   */
  from: number
  /**
   * 한 tick 간격 (ms).
   * @defaultValue 1000
   */
  interval?: number
  /**
   * 마운트되자마자 자동 시작.
   * @defaultValue false
   */
  autoStart?: boolean
  /**
   * 0 에 도달했을 때 호출.
   */
  onFinish?: () => void
}

export type UseCountdownReturn = {
  /** 현재 남은 ms */
  remaining: number
  /** 카운트다운 진행 중 여부 */
  isRunning: boolean
  /** 다 끝났는지 (남은 시간 === 0) */
  isFinished: boolean
  /** 시작 / 일시정지 후 재시작 */
  start: () => void
  /** 일시정지 (남은 시간 유지) */
  pause: () => void
  /** 초기 from 값으로 리셋, autoStart 와 무관하게 정지 상태 */
  reset: () => void
}

/**
 * 지정한 시간부터 0까지 카운트다운하는 타이머. 인터벌 유효 정확성에 약간의 드리프트가
 * 생기지 않도록 시작 시각 + interval 누적으로 남은 시간을 계산합니다.
 *
 * @example
 * ```tsx
 * const { remaining, isFinished, start } = useCountdown({
 *   from: 30_000,
 *   onFinish: () => sendOtp(),
 * })
 *
 * return <button onClick={start}>{isFinished ? 'Resend' : `${remaining / 1000}s`}</button>
 * ```
 */
export function useCountdown(options: UseCountdownOptions): UseCountdownReturn {
  const { from, interval = 1000, autoStart = false, onFinish } = options

  const [remaining, setRemaining] = useState<number>(from)
  const [isRunning, setIsRunning] = useState<boolean>(autoStart)

  const onFinishRef = useRef(onFinish)
  useLayoutEffect(() => {
    onFinishRef.current = onFinish
  })

  const startedAtRef = useRef<number | null>(null)
  const remainingAtStartRef = useRef<number>(from)
  const timerRef = useRef<number | null>(null)

  // Initialize startedAt when autoStart is true
  useEffect(() => {
    if (autoStart) {
      startedAtRef.current = Date.now()
    }
    // only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const tick = useCallback(() => {
    if (startedAtRef.current === null) return
    const elapsed = Date.now() - startedAtRef.current
    const next = Math.max(0, remainingAtStartRef.current - elapsed)
    setRemaining(next)
    if (next === 0) {
      clearTimer()
      setIsRunning(false)
      onFinishRef.current?.()
    }
  }, [clearTimer])

  const start = useCallback(() => {
    if (isRunning) return
    if (remaining === 0) {
      // resume after finish behaves like a fresh start
      remainingAtStartRef.current = from
      setRemaining(from)
    } else {
      remainingAtStartRef.current = remaining
    }
    startedAtRef.current = Date.now()
    setIsRunning(true)
  }, [isRunning, remaining, from])

  const pause = useCallback(() => {
    if (!isRunning) return
    // Capture current remaining so a later start() resumes from here.
    if (startedAtRef.current !== null) {
      const elapsed = Date.now() - startedAtRef.current
      const snapshot = Math.max(0, remainingAtStartRef.current - elapsed)
      setRemaining(snapshot)
      remainingAtStartRef.current = snapshot
    }
    startedAtRef.current = null
    setIsRunning(false)
  }, [isRunning])

  const reset = useCallback(() => {
    clearTimer()
    startedAtRef.current = null
    remainingAtStartRef.current = from
    setRemaining(from)
    setIsRunning(false)
  }, [from, clearTimer])

  useEffect(() => {
    if (!isRunning) {
      clearTimer()
      return
    }
    if (typeof window === 'undefined') return
    timerRef.current = window.setInterval(tick, interval)
    return clearTimer
  }, [isRunning, interval, tick, clearTimer])

  return {
    remaining,
    isRunning,
    isFinished: remaining === 0,
    start,
    pause,
    reset,
  }
}
