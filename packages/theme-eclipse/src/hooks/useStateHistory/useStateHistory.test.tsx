import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useStateHistory } from './useStateHistory'

describe('useStateHistory', () => {
  afterEach(() => {
    cleanup()
  })

  test('초기값으로 시작하고 canUndo·canRedo 모두 false', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    expect(result.current.state).toBe('a')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
    expect(result.current.length).toBe(1)
  })

  test('set 으로 새 값을 push 하면 canUndo=true', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => {
      result.current.set('b')
    })
    expect(result.current.state).toBe('b')
    expect(result.current.canUndo).toBe(true)
    expect(result.current.canRedo).toBe(false)
  })

  test('undo / redo 가 양방향 이동한다', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => {
      result.current.set('b')
    })
    act(() => {
      result.current.set('c')
    })
    expect(result.current.state).toBe('c')

    act(() => {
      result.current.undo()
    })
    expect(result.current.state).toBe('b')
    expect(result.current.canRedo).toBe(true)

    act(() => {
      result.current.undo()
    })
    expect(result.current.state).toBe('a')
    expect(result.current.canUndo).toBe(false)

    act(() => {
      result.current.redo()
    })
    expect(result.current.state).toBe('b')

    act(() => {
      result.current.redo()
    })
    expect(result.current.state).toBe('c')
    expect(result.current.canRedo).toBe(false)
  })

  test('undo 후 set 하면 redo 가지가 잘려나간다', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => {
      result.current.set('b')
    })
    act(() => {
      result.current.set('c')
    })
    act(() => {
      result.current.undo()
    })
    expect(result.current.state).toBe('b')

    act(() => {
      result.current.set('d')
    })
    expect(result.current.state).toBe('d')
    expect(result.current.canRedo).toBe(false)
    expect(result.current.length).toBe(3) // a, b, d
  })

  test('같은 값을 set 하면 히스토리에 push 하지 않는다', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => {
      result.current.set('a')
    })
    expect(result.current.length).toBe(1)
    expect(result.current.canUndo).toBe(false)
  })

  test('함수형 set 이 동작한다', () => {
    const { result } = renderHook(() => useStateHistory(1))
    act(() => {
      result.current.set((n) => n + 1)
    })
    act(() => {
      result.current.set((n) => n * 10)
    })
    expect(result.current.state).toBe(20)
  })

  test('capacity 를 넘어가면 오래된 항목부터 잘린다', () => {
    const { result } = renderHook(() => useStateHistory(0, { capacity: 3 }))
    act(() => {
      result.current.set(1)
    })
    act(() => {
      result.current.set(2)
    })
    act(() => {
      result.current.set(3)
    })
    // history was 0,1,2,3 (4 long, capacity 3) → trimmed to 1,2,3
    expect(result.current.length).toBe(3)
    expect(result.current.state).toBe(3)
    act(() => {
      result.current.undo()
    })
    act(() => {
      result.current.undo()
    })
    expect(result.current.state).toBe(1)
    expect(result.current.canUndo).toBe(false)
  })

  test('reset 은 히스토리를 비우고 현재 값만 남긴다', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => {
      result.current.set('b')
    })
    act(() => {
      result.current.set('c')
    })
    act(() => {
      result.current.reset()
    })
    expect(result.current.state).toBe('c')
    expect(result.current.length).toBe(1)
    expect(result.current.canUndo).toBe(false)
  })

  test('reset(value) 는 지정한 값으로 초기화한다', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    act(() => {
      result.current.set('b')
    })
    act(() => {
      result.current.reset('zero')
    })
    expect(result.current.state).toBe('zero')
    expect(result.current.length).toBe(1)
  })

  test('맨 처음에서 undo / 맨 끝에서 redo 는 false 를 반환한다', () => {
    const { result } = renderHook(() => useStateHistory('a'))
    let ok: boolean | undefined
    act(() => {
      ok = result.current.undo()
    })
    expect(ok).toBe(false)
    act(() => {
      ok = result.current.redo()
    })
    expect(ok).toBe(false)
  })
})
