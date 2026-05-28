import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { cleanup } from '../../test-utils'

import { useUndoable } from './useUndoable'

afterEach(() => {
  cleanup()
})

describe('useUndoable', () => {
  it('initial state has correct value and empty history', () => {
    const { result } = renderHook(() => useUndoable('initial'))
    expect(result.current.value).toBe('initial')
    expect(result.current.history).toHaveLength(0)
    expect(result.current.future).toHaveLength(0)
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
  })

  it('set updates value and adds to history', () => {
    const { result } = renderHook(() => useUndoable('a'))

    act(() => {
      result.current.set('b')
    })

    expect(result.current.value).toBe('b')
    expect(result.current.history).toEqual(['a'])
    expect(result.current.canUndo).toBe(true)
    expect(result.current.future).toHaveLength(0)
  })

  it('undo restores previous value', () => {
    const { result } = renderHook(() => useUndoable('a'))

    act(() => {
      result.current.set('b')
    })
    act(() => {
      result.current.undo()
    })

    expect(result.current.value).toBe('a')
    expect(result.current.history).toHaveLength(0)
    expect(result.current.future).toEqual(['b'])
    expect(result.current.canRedo).toBe(true)
  })

  it('redo re-applies undone value', () => {
    const { result } = renderHook(() => useUndoable('a'))

    act(() => {
      result.current.set('b')
    })
    act(() => {
      result.current.undo()
    })
    act(() => {
      result.current.redo()
    })

    expect(result.current.value).toBe('b')
    expect(result.current.history).toEqual(['a'])
    expect(result.current.future).toHaveLength(0)
  })
})
