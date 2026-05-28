import { useCallback, useEffect, useRef } from 'react'

/**
 * 콜백을 다음 애니메이션 프레임에 실행하도록 래핑합니다.
 *
 * 안정적인 `rafCallback`과 `cancel` 함수를 반환합니다.
 * unmount 시 pending RAF를 자동 취소합니다.
 *
 * @example
 * ```tsx
 * const [animate, cancelAnimate] = useRafCallback(() => {
 *   // 애니메이션 프레임마다 실행될 로직
 * })
 * ```
 */
export function useRafCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
): [T, () => void] {
  const callbackRef = useRef(callback)
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const rafRef = useRef<number | null>(null)

  const cancel = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const rafCallback = useCallback(
    (...args: Parameters<T>) => {
      cancel()
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        callbackRef.current(...args)
      })
    },
    [cancel],
  ) as T

  useEffect(() => cancel, [cancel])

  return [rafCallback, cancel]
}
