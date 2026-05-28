import { useEffect } from 'react'

export type UseVibrateReturn = {
  vibrate: (pattern?: number | number[]) => void
  supported: boolean
}

/**
 * Vibration API를 통해 디바이스 진동을 제어합니다.
 *
 * - SSR 안전: 서버에서는 `supported: false`를 반환합니다.
 * - 언마운트 시 진행 중인 진동을 자동으로 취소합니다.
 * - `navigator.vibrate`를 지원하지 않는 환경에서는 no-op입니다.
 *
 * @example
 * ```tsx
 * const { vibrate, supported } = useVibrate()
 *
 * // 단순 진동 (200ms)
 * <button onClick={() => vibrate()}>Buzz</button>
 *
 * // 패턴 진동 [진동, 정지, 진동]
 * <button onClick={() => vibrate([100, 50, 100])}>Pattern</button>
 * ```
 */
export function useVibrate(): UseVibrateReturn {
  const supported =
    typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'

  useEffect(() => {
    return () => {
      if (supported) {
        navigator.vibrate(0)
      }
    }
  }, [supported])

  const vibrate = (pattern: number | number[] = 200) => {
    if (supported) {
      navigator.vibrate(pattern)
    }
  }

  return { vibrate, supported }
}
