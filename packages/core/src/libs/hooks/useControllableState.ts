/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'

interface ControllableStateParam<T, HandlerArgs extends any[]> {
  /** 비제어 컴포넌트일 때의 상태 */
  defaultValue?: T
  /** 제어 컴포넌트일 때의 상태 */
  value?: T
  /** 값 변경 이벤트 처리기 */
  onChange?: (...args: HandlerArgs) => void
}

export type ControllableStateSetter<T, HandlerArgs extends any[]> = (params: {
  changeParams: HandlerArgs
  value: T
}) => void

/**
 * 외부에서 제어할 수도, 제어하지 않을 수도 있는 컴포넌트의 내부 상태를 선언해요.
 *
 * @description
 * HTML `<input>`을 고려해 보세요.
 * - `<input>`은 `value` + `onChange`로 제어할 수도 있고, `defaultValue` [+ `onChange`]로 제어하지 않을 수도 있어요.
 * - 이런 형태의 API를 제공해야 하는 컴포넌트 내부에서 `useControllableState()`를 사용하세요.
 *
 * @param param {@link ControllableStateParam `ControllableStateParam<T>`}
 * @returns 값과 "변경 처리 콜백"의 튜플입니다. 예제를 참고하세요.
 *
 * @example
 * ```tsx
 * type Props = {
 *   defaultValue?: string
 *   value?: string
 *   onChange?: React.ChangeEventHandler<HTMLInputElement>
 * }
 *
 * const Component = ({ defaultValue, value: controlledValue, onChange }: Props) => {
 *   const [value, handleChange] = useControllableState({
 *     defaultValue,
 *     value: controlledValue,
 *     onChange,
 *   })
 *   return (
 *     // changeParams에는 onChange의 매개변수를 지정하세요.
 *     // 여기서는 onChange가 (event: React.ChangeEvent<HTMLInputElement>) => void이므로 changeParams는 [event]입니다.
 *     <input type='text' value={value} onChange={(e) => handleChange({ changeParams: [e], value: e.target.value })} />
 *   )
 * }
 * ```
 *
 * @see {@link ControllableStateSetter `StateSetter<T, HandlerArgs>`}
 */
export function useControllableState<T, HandlerArgs extends any[]>({
  defaultValue,
  value: controlledValue,
  onChange,
}: ControllableStateParam<T, HandlerArgs>): readonly [
  value: T,
  changeHandler: ControllableStateSetter<T, HandlerArgs>,
] {
  const [uncontrolledValue, setUncontrolledValue] = useUncontrolledState(defaultValue)

  const controlled = controlledValue !== undefined
  const value = controlled ? controlledValue : uncontrolledValue

  // 코드 간략화를 위해 `setState((current: T) => T)`의 사용은 생각하지 않음
  // 필요해지면 추가
  const setValue: ControllableStateSetter<T, HandlerArgs> = useCallback(
    ({ changeParams, value: newValue }) => {
      if (!controlled) {
        setUncontrolledValue(newValue)
      }
      onChange?.(...changeParams)
    },
    [controlled, setUncontrolledValue, onChange],
  )

  return [value as T, setValue] as const
}

function useUncontrolledState<T>(uncontrolledValue: T): readonly [T | undefined, (newValue: T) => void] {
  const uncontrolledState = useState(uncontrolledValue)
  const [value] = uncontrolledState
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (prevValueRef.current !== value) {
      prevValueRef.current = value
    }
  }, [value])

  return uncontrolledState
}
