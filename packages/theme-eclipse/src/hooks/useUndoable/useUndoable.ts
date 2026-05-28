import { useCallback, useState } from 'react'

type UndoableState<T> = {
  value: T
  history: T[]
  future: T[]
}

export function useUndoable<T>(initialValue: T): {
  value: T
  set: (newValue: T) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  history: T[]
  future: T[]
} {
  const [state, setState] = useState<UndoableState<T>>({
    value: initialValue,
    history: [],
    future: [],
  })

  const set = useCallback((newValue: T) => {
    setState((prev) => ({
      value: newValue,
      history: [...prev.history, prev.value],
      future: [],
    }))
  }, [])

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.history.length === 0) return prev
      const previous = prev.history[prev.history.length - 1]
      return {
        value: previous,
        history: prev.history.slice(0, -1),
        future: [prev.value, ...prev.future],
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.future.length === 0) return prev
      const next = prev.future[0]
      return {
        value: next,
        history: [...prev.history, prev.value],
        future: prev.future.slice(1),
      }
    })
  }, [])

  return {
    value: state.value,
    set,
    undo,
    redo,
    canUndo: state.history.length > 0,
    canRedo: state.future.length > 0,
    history: state.history,
    future: state.future,
  }
}
