import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'

export type UseStateHistoryOptions = {
  /**
   * 보관할 히스토리 최대 길이 (현재 값 포함).
   * @defaultValue 50
   */
  capacity?: number
}

export type UseStateHistoryReturn<T> = {
  /** 현재 값 */
  state: T
  /** 새 값으로 갱신. 함수형 갱신 지원. 같은 값은 push 하지 않음. */
  set: (value: T | ((prev: T) => T)) => void
  /** 한 단계 뒤로. 불가능하면 false 반환. */
  undo: () => boolean
  /** 한 단계 앞으로 (undo 된 상태에서만 가능). 불가능하면 false 반환. */
  redo: () => boolean
  /** 히스토리 비우고 현재 값만 남김 */
  reset: (value?: T) => void
  /** 현재 인덱스 (0 = 가장 오래된 값) */
  index: number
  /** 전체 히스토리 길이 */
  length: number
  canUndo: boolean
  canRedo: boolean
}

/**
 * 값과 그 값의 변경 이력을 함께 관리합니다. 양식 필드, 캔버스, 에디터처럼
 * undo·redo 가 자연스러운 곳에 사용.
 *
 * - 새 값을 set 하면 redo 스택은 비워집니다 (브라우저 history 와 동일한 규칙)
 * - `capacity` 를 넘어가면 가장 오래된 항목부터 잘려나갑니다
 * - 직전과 같은 값은 push 하지 않아 잘못된 undo가 늘어나지 않습니다
 *
 * @example
 * ```tsx
 * const { state, set, undo, redo, canUndo, canRedo } = useStateHistory('')
 *
 * <textarea value={state} onChange={(e) => set(e.target.value)} />
 * <button disabled={!canUndo} onClick={undo}>Undo</button>
 * <button disabled={!canRedo} onClick={redo}>Redo</button>
 * ```
 */
export function useStateHistory<T>(
  initialValue: T,
  options: UseStateHistoryOptions = {},
): UseStateHistoryReturn<T> {
  const { capacity = 50 } = options

  // history is a stack of states; index points at the *current* one. Anything
  // above the index is a redo branch waiting to be either consumed or
  // discarded by the next set().
  const [history, setHistory] = useState<T[]>(() => [initialValue])
  const [index, setIndex] = useState(0)

  const indexRef = useRef(index)
  const historyRef = useRef(history)
  useLayoutEffect(() => {
    indexRef.current = index
    historyRef.current = history
  })

  const set = useCallback(
    (value: T | ((prev: T) => T)) => {
      setHistory((current) => {
        const prev = current[indexRef.current]
        const next = value instanceof Function ? (value as (p: T) => T)(prev) : value
        if (Object.is(next, prev)) return current

        // Drop the redo branch and append the new state.
        const truncated = current.slice(0, indexRef.current + 1)
        const appended = [...truncated, next]
        const capped =
          appended.length > capacity ? appended.slice(appended.length - capacity) : appended
        // After cap, index might shift left; align it explicitly via setIndex.
        const newIndex = capped.length - 1
        setIndex(newIndex)
        return capped
      })
    },
    [capacity],
  )

  const undo = useCallback(() => {
    if (indexRef.current <= 0) return false
    setIndex((i) => i - 1)
    return true
  }, [])

  const redo = useCallback(() => {
    if (indexRef.current >= historyRef.current.length - 1) return false
    setIndex((i) => i + 1)
    return true
  }, [])

  const reset = useCallback((...args: [] | [T]) => {
    setHistory((current) => {
      const next = args.length === 0 ? current[indexRef.current] : args[0]
      setIndex(0)
      return [next]
    })
  }, []) as (value?: T) => void

  return useMemo<UseStateHistoryReturn<T>>(
    () => ({
      state: history[index],
      set,
      undo,
      redo,
      reset,
      index,
      length: history.length,
      canUndo: index > 0,
      canRedo: index < history.length - 1,
    }),
    [history, index, set, undo, redo, reset],
  )
}
