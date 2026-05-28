import { useReducer } from 'react'

/**
 * 컴포넌트를 강제로 리렌더링합니다.
 *
 * 외부 mutable 레퍼런스(ref, 외부 스토어 등)를 UI에 반영해야 할 때 사용합니다.
 * 반환된 함수는 마운트 동안 안정적(stable)입니다.
 *
 * @example
 * ```tsx
 * const forceUpdate = useForceUpdate()
 *
 * const handleExternalChange = () => {
 *   externalStore.update()
 *   forceUpdate()
 * }
 * ```
 */
export function useForceUpdate(): () => void {
  const [, dispatch] = useReducer((n: number) => n + 1, 0)
  return dispatch
}
