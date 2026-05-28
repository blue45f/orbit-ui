import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useSet } from './useSet'

describe('useSet', () => {
  afterEach(() => cleanup())

  test('초기값을 반영한다', () => {
    const { result } = renderHook(() => useSet<string>(['a', 'b']))
    expect(result.current.set.size).toBe(2)
    expect(result.current.set.has('a')).toBe(true)
    expect(result.current.set.has('b')).toBe(true)
  })

  test('add로 항목 추가', () => {
    const { result } = renderHook(() => useSet<string>())

    act(() => result.current.add('a'))
    expect(result.current.set.has('a')).toBe(true)
  })

  test('add는 중복 추가를 무시하고 같은 reference를 유지한다', () => {
    const { result } = renderHook(() => useSet<string>(['a']))
    const before = result.current.set

    act(() => result.current.add('a'))

    expect(result.current.set).toBe(before)
  })

  test('remove로 항목 제거', () => {
    const { result } = renderHook(() => useSet<string>(['a', 'b']))

    act(() => result.current.remove('a'))
    expect(result.current.set.has('a')).toBe(false)
    expect(result.current.set.has('b')).toBe(true)
  })

  test('remove는 없는 항목을 무시하고 reference를 유지한다', () => {
    const { result } = renderHook(() => useSet<string>(['a']))
    const before = result.current.set

    act(() => result.current.remove('z'))

    expect(result.current.set).toBe(before)
  })

  test('toggle: 있으면 제거, 없으면 추가', () => {
    const { result } = renderHook(() => useSet<string>(['a']))

    act(() => result.current.toggle('a'))
    expect(result.current.set.has('a')).toBe(false)

    act(() => result.current.toggle('a'))
    expect(result.current.set.has('a')).toBe(true)
  })

  test('has', () => {
    const { result } = renderHook(() => useSet<string>(['a']))
    expect(result.current.has('a')).toBe(true)
    expect(result.current.has('b')).toBe(false)
  })

  test('clear', () => {
    const { result } = renderHook(() => useSet<string>(['a', 'b']))

    act(() => result.current.clear())
    expect(result.current.set.size).toBe(0)
  })

  test('clear가 이미 빈 Set이면 reference를 유지한다', () => {
    const { result } = renderHook(() => useSet<string>())
    const before = result.current.set

    act(() => result.current.clear())

    expect(result.current.set).toBe(before)
  })

  test('reset으로 전체 교체', () => {
    const { result } = renderHook(() => useSet<string>(['a']))

    act(() => result.current.reset(['x', 'y']))

    expect(result.current.set.size).toBe(2)
    expect(result.current.set.has('a')).toBe(false)
    expect(result.current.set.has('x')).toBe(true)
  })
})
