import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useObjectState } from './useObjectState'

type TestState = {
  name: string
  age: number
  active: boolean
}

const initialState: TestState = { name: 'Alice', age: 30, active: true }

describe('useObjectState', () => {
  afterEach(() => {
    cleanup()
  })

  test('초기 state를 반환한다', () => {
    const { result } = renderHook(() => useObjectState(initialState))
    expect(result.current[0]).toEqual(initialState)
  })

  test('setState에 객체를 전달하면 얕게 병합된다', () => {
    const { result } = renderHook(() => useObjectState(initialState))

    act(() => {
      result.current[1]({ name: 'Bob' })
    })

    expect(result.current[0]).toEqual({ name: 'Bob', age: 30, active: true })
  })

  test('setState에 함수를 전달하면 함수 결과를 병합한다', () => {
    const { result } = renderHook(() => useObjectState(initialState))

    act(() => {
      result.current[1]((prev) => ({ age: prev.age + 1 }))
    })

    expect(result.current[0]).toEqual({ name: 'Alice', age: 31, active: true })
  })

  test('reset()으로 초기값으로 되돌린다', () => {
    const { result } = renderHook(() => useObjectState(initialState))

    act(() => {
      result.current[1]({ name: 'Charlie', age: 99 })
    })
    expect(result.current[0]).toEqual({ name: 'Charlie', age: 99, active: true })

    act(() => {
      result.current[2]()
    })

    expect(result.current[0]).toEqual(initialState)
  })

  test('여러 번 부분 업데이트가 누적된다', () => {
    const { result } = renderHook(() => useObjectState(initialState))

    act(() => {
      result.current[1]({ name: 'Dave' })
    })
    act(() => {
      result.current[1]({ active: false })
    })

    expect(result.current[0]).toEqual({ name: 'Dave', age: 30, active: false })
  })
})
