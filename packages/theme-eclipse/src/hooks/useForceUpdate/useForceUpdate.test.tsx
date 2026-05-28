import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useForceUpdate } from './useForceUpdate'

describe('useForceUpdate', () => {
  afterEach(() => cleanup())

  test('forceUpdate를 호출하면 리렌더링된다', () => {
    let renderCount = 0
    const { result } = renderHook(() => {
      renderCount += 1
      return useForceUpdate()
    })

    expect(renderCount).toBe(1)

    act(() => result.current())
    expect(renderCount).toBe(2)
  })

  test('반환된 함수는 리렌더링 후에도 같은 참조를 유지한다', () => {
    const { result, rerender } = renderHook(() => useForceUpdate())
    const first = result.current

    rerender()
    expect(result.current).toBe(first)
  })

  test('여러 번 호출할 때마다 각각 리렌더링된다', () => {
    let renderCount = 0
    const { result } = renderHook(() => {
      renderCount += 1
      return useForceUpdate()
    })

    expect(renderCount).toBe(1)

    act(() => result.current())
    expect(renderCount).toBe(2)

    act(() => result.current())
    expect(renderCount).toBe(3)

    act(() => result.current())
    expect(renderCount).toBe(4)
  })
})
