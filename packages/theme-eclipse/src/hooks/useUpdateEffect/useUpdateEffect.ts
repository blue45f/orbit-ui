import { type DependencyList, type EffectCallback, useEffect, useRef } from 'react'

/**
 * `useEffect`와 동일하지만 첫 렌더에는 실행되지 않습니다. 이후 deps 변경 시에만 실행.
 *
 * 마운트 시점에 트랜지션·애니메이션·analytics 이벤트를 한 번 실행하지 않으려 할 때 사용.
 *
 * @example
 * ```tsx
 * useUpdateEffect(() => {
 *   // 첫 렌더 시 호출되지 않음. value 변경 시에만 호출.
 *   trackFilterChange(value)
 * }, [value])
 * ```
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
