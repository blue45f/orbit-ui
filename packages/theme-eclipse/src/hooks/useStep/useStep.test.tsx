import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useStep } from './useStep'

describe('useStep', () => {
  afterEach(() => cleanup())

  test('기본 초기 step=1, total 반영', () => {
    const { result } = renderHook(() => useStep({ total: 3 }))
    expect(result.current.current).toBe(1)
    expect(result.current.total).toBe(3)
    expect(result.current.isFirst).toBe(true)
    expect(result.current.isLast).toBe(false)
  })

  test('initial로 시작 step 지정', () => {
    const { result } = renderHook(() => useStep({ total: 3, initial: 2 }))
    expect(result.current.current).toBe(2)
  })

  test('next로 다음 단계 이동', () => {
    const { result } = renderHook(() => useStep({ total: 3 }))

    act(() => result.current.next())
    expect(result.current.current).toBe(2)

    act(() => result.current.next())
    expect(result.current.current).toBe(3)
    expect(result.current.isLast).toBe(true)
  })

  test('마지막에서 next 호출 시 isCompleted=true, current는 유지', () => {
    const { result } = renderHook(() => useStep({ total: 2 }))

    act(() => result.current.next())
    expect(result.current.current).toBe(2)

    act(() => result.current.next())

    expect(result.current.current).toBe(2)
    expect(result.current.isCompleted).toBe(true)
  })

  test('prev로 이전 단계 이동, 1에서 더 이동 안 됨', () => {
    const { result } = renderHook(() => useStep({ total: 3, initial: 2 }))

    act(() => result.current.prev())
    expect(result.current.current).toBe(1)

    act(() => result.current.prev())
    expect(result.current.current).toBe(1)
  })

  test('goTo로 특정 단계로 점프, clamp 적용', () => {
    const { result } = renderHook(() => useStep({ total: 5 }))

    act(() => result.current.goTo(3))
    expect(result.current.current).toBe(3)

    act(() => result.current.goTo(99))
    expect(result.current.current).toBe(5)

    act(() => result.current.goTo(-1))
    expect(result.current.current).toBe(1)
  })

  test('reset은 initial로 리셋', () => {
    const { result } = renderHook(() => useStep({ total: 3, initial: 2 }))

    act(() => result.current.next())
    act(() => result.current.next())
    expect(result.current.current).toBe(3)

    act(() => result.current.reset())
    expect(result.current.current).toBe(2)
    expect(result.current.isCompleted).toBe(false)
  })

  test('progress는 current/total', () => {
    const { result } = renderHook(() => useStep({ total: 4 }))

    expect(result.current.progress).toBe(0.25)

    act(() => result.current.next())
    expect(result.current.progress).toBe(0.5)
  })

  test('total < 1이면 에러를 던진다', () => {
    expect(() => renderHook(() => useStep({ total: 0 }))).toThrow(/total must be >= 1/)
  })

  test('initial이 범위 밖이면 clamp', () => {
    const { result: high } = renderHook(() => useStep({ total: 3, initial: 99 }))
    expect(high.current.current).toBe(3)

    const { result: low } = renderHook(() => useStep({ total: 3, initial: 0 }))
    expect(low.current.current).toBe(1)
  })
})
