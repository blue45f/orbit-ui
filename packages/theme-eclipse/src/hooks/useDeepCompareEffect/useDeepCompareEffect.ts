import { useEffect } from 'react'

import { useDeepCompareMemoize } from '../_internal/useDeepCompareMemoize'

/**
 * `useEffect`와 동일하지만, 의존성을 깊은 비교(deep equality)로 판단합니다.
 *
 * 객체나 배열 의존성이 동일한 내용으로 재생성되더라도 effect가 재실행되지 않습니다.
 * `JSON.stringify`가 아닌 `dequal` 기반 깊은 비교를 사용하므로, 객체 키 순서가 다르거나
 * 함수·undefined·Map·Set 같은 직렬화 불가능한 값이 섞여 있어도 올바르게 동작합니다.
 *
 * @example
 * ```tsx
 * useDeepCompareEffect(() => {
 *   fetchData(filters)
 * }, [filters]) // filters가 객체여도 내용이 같으면 재실행되지 않음
 * ```
 */
export function useDeepCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
): void {
  const memoizedDeps = useDeepCompareMemoize(deps)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, memoizedDeps)
}
