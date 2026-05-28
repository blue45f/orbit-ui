import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useArray } from './useArray'

describe('useArray', () => {
  afterEach(() => cleanup())

  test('초기값을 반영한다', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]))
    expect(result.current.items).toEqual([1, 2, 3])
  })

  test('push로 마지막에 추가한다', () => {
    const { result } = renderHook(() => useArray<string>(['a']))

    act(() => result.current.push('b'))
    expect(result.current.items).toEqual(['a', 'b'])

    act(() => result.current.push('c'))
    expect(result.current.items).toEqual(['a', 'b', 'c'])
  })

  test('removeAt으로 index 기준 제거', () => {
    const { result } = renderHook(() => useArray<string>(['a', 'b', 'c']))

    act(() => result.current.removeAt(1))
    expect(result.current.items).toEqual(['a', 'c'])
  })

  test('remove로 항목 기준 첫 매치 제거', () => {
    const { result } = renderHook(() => useArray<string>(['a', 'b', 'a']))

    act(() => result.current.remove('a'))
    expect(result.current.items).toEqual(['b', 'a'])
  })

  test('updateAt으로 직접 값 변경', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]))

    act(() => result.current.updateAt(1, 99))
    expect(result.current.items).toEqual([1, 99, 3])
  })

  test('updateAt 함수형 변경', () => {
    const { result } = renderHook(() => useArray<number>([10, 20, 30]))

    act(() => result.current.updateAt(2, (prev) => prev + 5))
    expect(result.current.items).toEqual([10, 20, 35])
  })

  test('updateAt에 범위 밖 index 전달 시 무시', () => {
    const { result } = renderHook(() => useArray<number>([1, 2]))

    act(() => result.current.updateAt(99, 100))
    act(() => result.current.updateAt(-1, 100))
    expect(result.current.items).toEqual([1, 2])
  })

  test('toggle: 없으면 추가, 있으면 제거', () => {
    const { result } = renderHook(() => useArray<string>(['a']))

    act(() => result.current.toggle('b'))
    expect(result.current.items).toEqual(['a', 'b'])

    act(() => result.current.toggle('a'))
    expect(result.current.items).toEqual(['b'])

    act(() => result.current.toggle('a'))
    expect(result.current.items).toEqual(['b', 'a'])
  })

  test('clear는 빈 배열로 리셋', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]))

    act(() => result.current.clear())
    expect(result.current.items).toEqual([])
  })

  test('set으로 전체 배열 교체', () => {
    const { result } = renderHook(() => useArray<string>(['a']))

    act(() => result.current.set(['x', 'y', 'z']))
    expect(result.current.items).toEqual(['x', 'y', 'z'])
  })

  test('set 함수형 변경', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]))

    act(() => result.current.set((prev) => prev.map((n) => n * 10)))
    expect(result.current.items).toEqual([10, 20, 30])
  })

  test('초기값을 생략하면 빈 배열', () => {
    const { result } = renderHook(() => useArray<number>())
    expect(result.current.items).toEqual([])
  })
})
