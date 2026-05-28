import { useCallback, useRef, useState } from 'react'

export type UseObjectStateReturn<T extends object> = [
  T,
  (patch: Partial<T> | ((prev: T) => Partial<T>)) => void,
  () => void,
]

/**
 * 객체 state를 위한 `useState` 변형으로, 부분 업데이트(partial merge)를 지원합니다.
 *
 * - `setState(patch)` — 기존 state와 patch를 얕게 병합
 * - `setState(prev => patch)` — 함수형 업데이트도 지원
 * - `reset()` — 초기값으로 되돌림
 *
 * @example
 * ```tsx
 * const [form, setForm, resetForm] = useObjectState({ name: '', age: 0 })
 *
 * setForm({ name: 'Alice' })      // → { name: 'Alice', age: 0 }
 * setForm(prev => ({ age: prev.age + 1 }))  // → { name: 'Alice', age: 1 }
 * resetForm()                     // → { name: '', age: 0 }
 * ```
 */
export function useObjectState<T extends object>(initialState: T): UseObjectStateReturn<T> {
  const initialRef = useRef<T>(initialState)
  const [state, setRawState] = useState<T>(initialState)

  const setState = useCallback((patch: Partial<T> | ((prev: T) => Partial<T>)) => {
    setRawState((prev) => {
      const updates = typeof patch === 'function' ? patch(prev) : patch
      return { ...prev, ...updates }
    })
  }, [])

  const reset = useCallback(() => {
    setRawState(initialRef.current)
  }, [])

  return [state, setState, reset]
}
