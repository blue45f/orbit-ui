import { useRef } from 'react'
import { dequal } from 'dequal'

/**
 * 깊은 비교(deep equality)로 값을 메모이즈합니다.
 *
 * 이전 값과 내용이 동일하면 같은 참조를 그대로 반환하고, 내용이 달라졌을 때만
 * 새 참조로 갱신합니다. `useEffect`/`useMemo`의 의존성으로 객체·배열을 넘길 때,
 * 매 렌더마다 재생성되는 동일 내용 값으로 인한 불필요한 재실행을 막습니다.
 *
 * `JSON.stringify` 기반 비교와 달리 객체 키 순서, 함수·undefined·Map·Set 등
 * 직렬화 불가능한 값에도 올바르게 동작합니다(zero-dep `dequal` 사용).
 *
 * @example
 * ```ts
 * const memoized = useDeepCompareMemoize(deps)
 * useEffect(effect, memoized)
 * ```
 */
export function useDeepCompareMemoize<T>(value: T): T {
  const ref = useRef<T>(value)

  // 깊은 비교로 동일하면 이전 참조를 유지하고, 달라졌을 때만 갱신합니다.
  // 렌더 중 ref를 읽고 쓰는 것은 이 메모이즈 패턴의 본질적인 동작이며,
  // usePrevious·useIsFirstRender와 동일하게 react-hooks/refs를 의도적으로 비활성화합니다.
  /* eslint-disable react-hooks/refs */
  if (!dequal(ref.current, value)) {
    ref.current = value
  }

  return ref.current
  /* eslint-enable react-hooks/refs */
}
