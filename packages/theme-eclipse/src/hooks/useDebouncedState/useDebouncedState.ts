import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type UseDebouncedStateReturn<T> = {
  /** 즉시 갱신되는 입력용 값 */
  value: T
  /** 마지막 변경 이후 delay 가 지난 뒤 갱신되는 안정 값 */
  debouncedValue: T
  /** value 와 debouncedValue 양쪽 모두 갱신 */
  setValue: (next: T | ((prev: T) => T)) => void
  /** 디바운스를 기다리지 않고 debouncedValue 즉시 반영 */
  flush: () => void
  /** 진행중인 디바운스 취소. debouncedValue 는 이전 값 유지 */
  cancel: () => void
}

/**
 * 즉시값과 디바운스된 값을 동시에 관리합니다.
 *
 * 검색·필터처럼 사용자가 빠르게 타이핑하는 동안 입력은 끊김 없이 보여주고,
 * 비싼 작업(API 호출, 정렬)은 입력이 멈춘 뒤에만 트리거하고 싶을 때 사용.
 *
 * @example
 * ```tsx
 * const { value, debouncedValue, setValue } = useDebouncedState('', 300)
 *
 * const { data } = useQuery(['search', debouncedValue], () => fetch(debouncedValue))
 *
 * return <input value={value} onChange={(e) => setValue(e.target.value)} />
 * ```
 */
export function useDebouncedState<T>(initial: T, delay = 300): UseDebouncedStateReturn<T> {
  const [value, setValueState] = useState<T>(initial)
  const [debouncedValue, setDebouncedValue] = useState<T>(initial)
  const timerRef = useRef<number | null>(null)
  const valueRef = useRef(value)
  useLayoutEffect(() => { valueRef.current = value })

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValueState((prev) => {
        const resolved = next instanceof Function ? (next as (p: T) => T)(prev) : next
        valueRef.current = resolved
        clearTimer()
        timerRef.current = window.setTimeout(() => {
          setDebouncedValue(resolved)
          timerRef.current = null
        }, delay)
        return resolved
      })
    },
    [delay, clearTimer],
  )

  const flush = useCallback(() => {
    clearTimer()
    setDebouncedValue(valueRef.current)
  }, [clearTimer])

  const cancel = useCallback(() => {
    clearTimer()
    // Roll value back to the last committed debouncedValue so subsequent
    // typing starts from a known good state.
    setValueState(debouncedValue)
    valueRef.current = debouncedValue
  }, [clearTimer, debouncedValue])

  useEffect(() => clearTimer, [clearTimer])

  return { value, debouncedValue, setValue, flush, cancel }
}
