import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useEventEmitter } from './useEventEmitter'

describe('useEventEmitter', () => {
  afterEach(() => {
    cleanup()
  })

  test('on()으로 핸들러를 구독한다', () => {
    const { result } = renderHook(() => useEventEmitter<number>())

    act(() => {
      result.current.on(vi.fn())
    })

    expect(result.current.listenerCount).toBe(1)
  })

  test('emit()이 모든 구독자에게 payload를 전달한다', () => {
    const { result } = renderHook(() => useEventEmitter<string>())
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    act(() => {
      result.current.on(handler1)
      result.current.on(handler2)
    })

    act(() => {
      result.current.emit('hello')
    })

    expect(handler1).toHaveBeenCalledWith('hello')
    expect(handler2).toHaveBeenCalledWith('hello')
  })

  test('off()로 핸들러를 구독 해제한다', () => {
    const { result } = renderHook(() => useEventEmitter<number>())
    const handler = vi.fn()

    act(() => {
      result.current.on(handler)
    })
    expect(result.current.listenerCount).toBe(1)

    act(() => {
      result.current.off(handler)
    })
    expect(result.current.listenerCount).toBe(0)

    act(() => {
      result.current.emit(42)
    })

    expect(handler).not.toHaveBeenCalled()
  })

  test('on()이 반환하는 cleanup 함수가 구독을 해제한다', () => {
    const { result } = renderHook(() => useEventEmitter<string>())
    const handler = vi.fn()
    let unsubscribe: (() => void) | undefined

    act(() => {
      unsubscribe = result.current.on(handler)
    })
    expect(result.current.listenerCount).toBe(1)

    act(() => {
      unsubscribe?.()
    })
    expect(result.current.listenerCount).toBe(0)

    act(() => {
      result.current.emit('test')
    })

    expect(handler).not.toHaveBeenCalled()
  })
})
