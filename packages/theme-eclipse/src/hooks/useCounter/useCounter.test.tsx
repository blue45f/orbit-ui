import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useCounter } from './useCounter'

describe('useCounter', () => {
  afterEach(() => cleanup())

  test('기본 초기값은 0', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  test('initial=10이면 count=10', () => {
    const { result } = renderHook(() => useCounter({ initial: 10 }))
    expect(result.current.count).toBe(10)
  })

  test('increment/decrement', () => {
    const { result } = renderHook(() => useCounter({ initial: 5 }))

    act(() => result.current.increment())
    expect(result.current.count).toBe(6)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(5)
  })

  test('step 옵션', () => {
    const { result } = renderHook(() => useCounter({ initial: 0, step: 5 }))

    act(() => result.current.increment())
    expect(result.current.count).toBe(5)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  test('max에 도달하면 isAtMax=true이고 increment가 무시된다', () => {
    const { result } = renderHook(() => useCounter({ initial: 9, max: 10 }))

    act(() => result.current.increment())
    expect(result.current.count).toBe(10)
    expect(result.current.isAtMax).toBe(true)

    act(() => result.current.increment())
    expect(result.current.count).toBe(10)
  })

  test('min에 도달하면 isAtMin=true이고 decrement가 무시된다', () => {
    const { result } = renderHook(() => useCounter({ initial: 1, min: 0 }))

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
    expect(result.current.isAtMin).toBe(true)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  test('초기값이 범위 밖이면 clamp된다', () => {
    const { result: high } = renderHook(() => useCounter({ initial: 100, max: 10 }))
    expect(high.current.count).toBe(10)

    const { result: low } = renderHook(() => useCounter({ initial: -5, min: 0 }))
    expect(low.current.count).toBe(0)
  })

  test('set으로 직접 설정 가능, clamp 적용', () => {
    const { result } = renderHook(() => useCounter({ initial: 0, min: 0, max: 5 }))

    act(() => result.current.set(3))
    expect(result.current.count).toBe(3)

    act(() => result.current.set(100))
    expect(result.current.count).toBe(5)

    act(() => result.current.set(-10))
    expect(result.current.count).toBe(0)
  })

  test('함수형 set이 동작한다', () => {
    const { result } = renderHook(() => useCounter({ initial: 5 }))

    act(() => result.current.set((p) => p * 2))
    expect(result.current.count).toBe(10)
  })

  test('reset은 initial로 되돌린다', () => {
    const { result } = renderHook(() => useCounter({ initial: 3 }))

    act(() => result.current.set(99))
    expect(result.current.count).toBe(99)

    act(() => result.current.reset())
    expect(result.current.count).toBe(3)
  })
})
