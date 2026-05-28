import { useEffect } from 'react'

/**
 * `useEffect`와 동일하지만, 의존성을 깊은 비교(deep equality)로 판단합니다.
 *
 * 객체나 배열 의존성이 동일한 내용으로 재생성되더라도 effect가 재실행되지 않습니다.
 * 내부적으로 JSON.stringify로 비교하므로 JSON 직렬화 가능한 값에만 사용하세요.
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
  deps: React.DependencyList,
): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [JSON.stringify(deps)])
}
