import { useCallback, useEffect, useRef, useState } from 'react'

export type UseControllableStateOptions<T> = {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

/**
 * Radix UI 패턴의 controlled/uncontrolled 상태 헬퍼.
 *
 * - `value` 가 undefined가 아니면 controlled 모드 — 외부 값을 그대로 반환
 * - `value` 가 undefined 면 uncontrolled 모드 — `defaultValue` 기반 내부 state 사용
 * - 어느 쪽이든 `onChange` 콜백은 동일하게 호출됩니다
 *
 * @example
 * ```tsx
 * const [value, setValue] = useControllableState({
 *   value: props.value,
 *   defaultValue: props.defaultValue,
 *   onChange: props.onChange,
 * })
 * ```
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T | undefined, (next: T) => void] {
  const [uncontrolledState, setUncontrolledState] = useState<T | undefined>(defaultValue)
  const isControlled = value !== undefined
  const state = isControlled ? value : uncontrolledState

  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  const setState = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolledState(next)
      onChangeRef.current?.(next)
    },
    [isControlled]
  )

  return [state, setState]
}
