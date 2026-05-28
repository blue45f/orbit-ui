import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * `delay`ms 후 콜백을 한 번 실행합니다. `delay`가 `null`이면 일시 중단.
 *
 * 콜백은 ref로 보관되므로 매 렌더의 최신 함수가 호출됩니다. 의존성 배열에 함수를 넣지 않아도 안전.
 *
 * @example
 * ```tsx
 * const [showHint, setShowHint] = useState(false)
 * useTimeout(() => setShowHint(true), 3000)
 * ```
 */
export function useTimeout(callback: () => void, delay: number | null): void {
  const callbackRef = useRef(callback)
  useLayoutEffect(() => { callbackRef.current = callback })

  useEffect(() => {
    if (delay === null) return
    const id = setTimeout(() => callbackRef.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}
