import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useOnline } from './useOnline'

const setNavigatorOnline = (value: boolean) => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    get: () => value,
  })
}

const fireWindowEvent = (type: 'online' | 'offline') => {
  window.dispatchEvent(new Event(type))
}

describe('useOnline', () => {
  afterEach(() => {
    cleanup()
    setNavigatorOnline(true)
    vi.restoreAllMocks()
  })

  test('초기값은 navigator.onLine 을 반영한다', () => {
    setNavigatorOnline(true)
    const { result: online } = renderHook(() => useOnline())
    expect(online.current).toBe(true)

    setNavigatorOnline(false)
    const { result: offline } = renderHook(() => useOnline())
    expect(offline.current).toBe(false)
  })

  test('offline 이벤트가 발생하면 false 로 갱신된다', () => {
    setNavigatorOnline(true)
    const { result } = renderHook(() => useOnline())
    expect(result.current).toBe(true)

    act(() => {
      setNavigatorOnline(false)
      fireWindowEvent('offline')
    })

    expect(result.current).toBe(false)
  })

  test('online 이벤트가 발생하면 true 로 갱신된다', () => {
    setNavigatorOnline(false)
    const { result } = renderHook(() => useOnline())
    expect(result.current).toBe(false)

    act(() => {
      setNavigatorOnline(true)
      fireWindowEvent('online')
    })

    expect(result.current).toBe(true)
  })

  test('unmount 시 이벤트 리스너가 해제된다', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useOnline())
    unmount()
    const removed = removeSpy.mock.calls.map(([type]) => type)
    expect(removed).toContain('online')
    expect(removed).toContain('offline')
  })
})
