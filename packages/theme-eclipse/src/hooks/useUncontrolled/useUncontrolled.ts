import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export type UseUncontrolledOptions<T> = {
  /**
   * 외부에서 제어하는 값. `undefined` 면 내부 state 사용 (uncontrolled).
   */
  value?: T
  /**
   * uncontrolled 모드일 때의 초기값.
   */
  defaultValue?: T
  /**
   * controlled / uncontrolled 양쪽에서 모두 호출되는 변경 핸들러.
   */
  onChange?: (value: T) => void
  /**
   * `value` 와 `defaultValue` 가 모두 undefined일 때의 fallback.
   */
  finalValue?: T
}

/**
 * 컴포넌트가 controlled · uncontrolled 양쪽에서 똑같이 동작하도록 묶어주는 헬퍼.
 *
 * - `value` 가 주어지면 controlled — 내부 state 무시하고 prop 그대로 반환
 * - `value` 가 undefined 면 uncontrolled — `defaultValue` 기반 내부 state 사용
 * - 어느 쪽이든 `onChange` 콜백은 동일하게 호출됩니다
 *
 * 라이브러리 디자이너가 controlled API와 uncontrolled API 를 동시에 노출해야 할 때
 * (예: `<Tabs value=...>` vs `<Tabs defaultValue=...>`) 쓰면 보일러플레이트를 제거합니다.
 *
 * @example
 * ```tsx
 * export function Switch({ checked, defaultChecked, onChange }: Props) {
 *   const [value, setValue] = useUncontrolled({
 *     value: checked,
 *     defaultValue: defaultChecked,
 *     finalValue: false,
 *     onChange,
 *   })
 *   return <button aria-checked={value} onClick={() => setValue(!value)} />
 * }
 * ```
 */
export function useUncontrolled<T>(
  options: UseUncontrolledOptions<T> = {}
): [T, (next: T) => void, boolean] {
  const { value, defaultValue, finalValue, onChange } = options

  const onChangeRef = useRef(onChange)
  useLayoutEffect(() => {
    onChangeRef.current = onChange
  })

  const isControlled = value !== undefined

  const [internal, setInternal] = useState<T>(() =>
    defaultValue !== undefined ? defaultValue : (finalValue as T)
  )

  const set = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      onChangeRef.current?.(next)
    },
    [isControlled]
  )

  const current = isControlled ? (value as T) : internal
  return [current, set, isControlled]
}
