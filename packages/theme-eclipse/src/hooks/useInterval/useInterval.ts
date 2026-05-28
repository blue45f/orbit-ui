import { useEffect, useRef } from 'react'

/**
 * `delay`ms마다 콜백을 반복 실행합니다. `delay`가 `null`이면 일시 중단.
 *
 * 콜백은 ref로 보관되어 매 tick의 최신 함수가 호출됩니다. 카운터·자동 새로고침·polling 패턴.
 *
 * @example
 * ```tsx
 * const [seconds, setSeconds] = useState(0)
 * useInterval(() => setSeconds((s) => s + 1), 1000)
 * ```
 *
 * 일시정지가 필요하면 delay에 null을 전달합니다.
 *
 * ```tsx
 * useInterval(tick, paused ? null : 1000)
 * ```
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => callbackRef.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
