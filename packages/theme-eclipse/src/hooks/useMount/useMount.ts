import { type EffectCallback, useEffect } from 'react'

/**
 * 마운트 시 한 번만 실행되는 effect. deps 배열을 매번 신경 쓰지 않아도 되는 단축형.
 *
 * @example
 * ```tsx
 * useMount(() => {
 *   trackPageView()
 * })
 * ```
 */
export function useMount(effect: EffectCallback): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}
