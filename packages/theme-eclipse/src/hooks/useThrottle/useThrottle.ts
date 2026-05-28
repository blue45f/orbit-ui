import { useEffect, useRef, useState } from 'react'

/**
 * 값을 최대 `delay`ms에 한 번 갱신해 반환합니다.
 *
 * `useDebounce`와 달리 throttle window 동안 입력이 들어오면 *trailing call*로 마지막 값을
 * window 종료 시점에 한 번 반영합니다. 스크롤·리사이즈·드래그처럼 고정 간격으로 반응해야 하는 경우에 사용.
 *
 * @example
 * ```tsx
 * const [scrollY, setScrollY] = useState(0)
 * const throttled = useThrottle(scrollY, 50)
 * ```
 */
export function useThrottle<T>(value: T, delay = 200): T {
  const [throttled, setThrottled] = useState<T>(value)
  const blockedRef = useRef(false)
  const pendingRef = useRef<T>(value)
  const isFirstRunRef = useRef(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // 첫 effect: 초기값과 동일하므로 throttled가 이미 value. 그냥 통과.
    if (isFirstRunRef.current) {
      isFirstRunRef.current = false
      return
    }

    pendingRef.current = value
    if (blockedRef.current) return

    blockedRef.current = true

    const tick = () => {
      const next = pendingRef.current
      if (next !== throttled) {
        setThrottled(next)
        timerRef.current = setTimeout(tick, delay)
      } else {
        blockedRef.current = false
        timerRef.current = null
      }
    }

    timerRef.current = setTimeout(tick, delay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay])

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      blockedRef.current = false
    }
  }, [])

  return throttled
}
