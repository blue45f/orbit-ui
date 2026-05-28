import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useToggle } from './useToggle'

describe('useToggle', () => {
  afterEach(() => cleanup())

  test('초기값은 false', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
  })

  test('initial=true이면 초기값이 true', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current[0]).toBe(true)
  })

  test('인자 없이 호출하면 토글된다', () => {
    const { result } = renderHook(() => useToggle())

    act(() => result.current[1]())
    expect(result.current[0]).toBe(true)

    act(() => result.current[1]())
    expect(result.current[0]).toBe(false)
  })

  test('true/false를 인자로 전달하면 그 값으로 설정된다', () => {
    const { result } = renderHook(() => useToggle())

    act(() => result.current[1](true))
    expect(result.current[0]).toBe(true)

    act(() => result.current[1](true))
    expect(result.current[0]).toBe(true)

    act(() => result.current[1](false))
    expect(result.current[0]).toBe(false)
  })

  test('toggle 함수는 referentially stable', () => {
    const { result, rerender } = renderHook(() => useToggle())
    const first = result.current[1]
    rerender()
    expect(result.current[1]).toBe(first)
  })
})
