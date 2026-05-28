import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useMap } from './useMap'

describe('useMap', () => {
  afterEach(() => cleanup())

  test('초기 entries를 반영한다', () => {
    const { result } = renderHook(() =>
      useMap<string, number>([
        ['a', 1],
        ['b', 2],
      ]),
    )
    expect(result.current.map.size).toBe(2)
    expect(result.current.get('a')).toBe(1)
    expect(result.current.get('b')).toBe(2)
  })

  test('set으로 entry 추가·갱신', () => {
    const { result } = renderHook(() => useMap<string, number>())

    act(() => result.current.set('a', 1))
    expect(result.current.get('a')).toBe(1)

    act(() => result.current.set('a', 99))
    expect(result.current.get('a')).toBe(99)
  })

  test('동일 value로 set 시 reference 유지', () => {
    const { result } = renderHook(() => useMap<string, number>([['a', 1]]))
    const before = result.current.map

    act(() => result.current.set('a', 1))

    expect(result.current.map).toBe(before)
  })

  test('remove로 key 제거', () => {
    const { result } = renderHook(() =>
      useMap<string, number>([
        ['a', 1],
        ['b', 2],
      ]),
    )

    act(() => result.current.remove('a'))
    expect(result.current.has('a')).toBe(false)
    expect(result.current.has('b')).toBe(true)
  })

  test('없는 key 제거 시 reference 유지', () => {
    const { result } = renderHook(() => useMap<string, number>([['a', 1]]))
    const before = result.current.map

    act(() => result.current.remove('z'))

    expect(result.current.map).toBe(before)
  })

  test('has·get으로 조회', () => {
    const { result } = renderHook(() => useMap<string, number>([['a', 1]]))
    expect(result.current.has('a')).toBe(true)
    expect(result.current.has('z')).toBe(false)
    expect(result.current.get('a')).toBe(1)
    expect(result.current.get('z')).toBeUndefined()
  })

  test('clear', () => {
    const { result } = renderHook(() => useMap<string, number>([['a', 1]]))

    act(() => result.current.clear())
    expect(result.current.map.size).toBe(0)
  })

  test('reset으로 전체 교체', () => {
    const { result } = renderHook(() => useMap<string, number>([['a', 1]]))

    act(() =>
      result.current.reset([
        ['x', 100],
        ['y', 200],
      ]),
    )

    expect(result.current.map.size).toBe(2)
    expect(result.current.has('a')).toBe(false)
    expect(result.current.get('x')).toBe(100)
  })
})
