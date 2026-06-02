import { useCallback, useMemo, useState } from 'react'

export type UseCounterOptions = {
  /** 초기값 @defaultValue 0 */
  initial?: number
  /** 최소값 (inclusive). 없으면 -Infinity */
  min?: number
  /** 최대값 (inclusive). 없으면 +Infinity */
  max?: number
  /** 한 번 증감 시 step @defaultValue 1 */
  step?: number
}

export type UseCounterReturn = {
  count: number
  increment: () => void
  decrement: () => void
  set: (next: number | ((prev: number) => number)) => void
  reset: () => void
  isAtMin: boolean
  isAtMax: boolean
}

/**
 * 숫자 카운터 state with clamp. quantity selector, 페이지네이션, 스테퍼 같은 패턴에.
 *
 * @example
 * ```tsx
 * const { count, increment, decrement, isAtMin } = useCounter({ initial: 1, min: 1, max: 99 })
 * ```
 */
export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const {
    initial = 0,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 1,
  } = options
  const [count, setCount] = useState<number>(() => clamp(initial, min, max))

  const set = useCallback(
    (next: number | ((prev: number) => number)) => {
      setCount((prev) => {
        const raw = next instanceof Function ? next(prev) : next
        return clamp(raw, min, max)
      })
    },
    [min, max]
  )

  const increment = useCallback(() => {
    set((prev) => prev + step)
  }, [set, step])

  const decrement = useCallback(() => {
    set((prev) => prev - step)
  }, [set, step])

  const reset = useCallback(() => {
    setCount(clamp(initial, min, max))
  }, [initial, min, max])

  return useMemo(
    () => ({
      count,
      increment,
      decrement,
      set,
      reset,
      isAtMin: count <= min,
      isAtMax: count >= max,
    }),
    [count, increment, decrement, set, reset, min, max]
  )
}

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min
  if (value > max) return max
  return value
}
