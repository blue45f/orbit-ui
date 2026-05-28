import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useQueue } from './useQueue'

describe('useQueue', () => {
  afterEach(() => cleanup())

  test('초기 큐는 비어 있다', () => {
    const { result } = renderHook(() => useQueue<number>())
    expect(result.current.queue).toEqual([])
    expect(result.current.size).toBe(0)
    expect(result.current.isEmpty).toBe(true)
  })

  test('initialItems로 초기 큐를 설정할 수 있다', () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3]))
    expect(result.current.queue).toEqual([1, 2, 3])
    expect(result.current.size).toBe(3)
    expect(result.current.isEmpty).toBe(false)
  })

  test('enqueue는 아이템을 끝에 추가한다', () => {
    const { result } = renderHook(() => useQueue<string>())

    act(() => result.current.enqueue('a'))
    act(() => result.current.enqueue('b'))
    act(() => result.current.enqueue('c'))

    expect(result.current.queue).toEqual(['a', 'b', 'c'])
    expect(result.current.size).toBe(3)
    expect(result.current.isEmpty).toBe(false)
  })

  test('dequeue는 첫 번째 아이템을 제거하고 반환한다', () => {
    const { result } = renderHook(() => useQueue<number>([10, 20, 30]))
    let removed: number | undefined

    act(() => {
      removed = result.current.dequeue()
    })

    expect(removed).toBe(10)
    expect(result.current.queue).toEqual([20, 30])
    expect(result.current.size).toBe(2)
  })

  test('빈 큐에서 dequeue하면 undefined를 반환한다', () => {
    const { result } = renderHook(() => useQueue<number>())
    let removed: number | undefined

    act(() => {
      removed = result.current.dequeue()
    })

    expect(removed).toBeUndefined()
    expect(result.current.queue).toEqual([])
  })

  test('peek은 첫 번째 아이템을 반환하되 제거하지 않는다', () => {
    const { result } = renderHook(() => useQueue<string>(['x', 'y', 'z']))

    let peeked: string | undefined
    act(() => {
      peeked = result.current.peek()
    })

    expect(peeked).toBe('x')
    expect(result.current.queue).toEqual(['x', 'y', 'z'])
    expect(result.current.size).toBe(3)
  })

  test('빈 큐에서 peek하면 undefined를 반환한다', () => {
    const { result } = renderHook(() => useQueue<number>())

    let peeked: number | undefined
    act(() => {
      peeked = result.current.peek()
    })

    expect(peeked).toBeUndefined()
  })

  test('clear는 큐를 비운다', () => {
    const { result } = renderHook(() => useQueue<number>([1, 2, 3]))

    act(() => result.current.clear())

    expect(result.current.queue).toEqual([])
    expect(result.current.size).toBe(0)
    expect(result.current.isEmpty).toBe(true)
  })

  test('isEmpty와 size가 정확히 반영된다', () => {
    const { result } = renderHook(() => useQueue<string>())

    expect(result.current.isEmpty).toBe(true)
    expect(result.current.size).toBe(0)

    act(() => result.current.enqueue('item'))
    expect(result.current.isEmpty).toBe(false)
    expect(result.current.size).toBe(1)

    act(() => result.current.dequeue())
    expect(result.current.isEmpty).toBe(true)
    expect(result.current.size).toBe(0)
  })
})
