import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useScrollPosition } from './useScrollPosition'

const setScroll = (x: number, y: number) => {
  Object.defineProperty(window, 'scrollX', { configurable: true, get: () => x })
  Object.defineProperty(window, 'scrollY', { configurable: true, get: () => y })
}

const fireScroll = () => window.dispatchEvent(new Event('scroll'))

describe('useScrollPosition', () => {
  beforeEach(() => {
    // Stub rAF to run synchronously so we don't have to flush frames.
    vi.stubGlobal('requestAnimationFrame', ((cb: FrameRequestCallback) => {
      cb(performance.now())
      return 1
    }) as typeof requestAnimationFrame)
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    setScroll(0, 0)
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  test('초기값은 현재 window 스크롤 위치', () => {
    setScroll(12, 34)
    const { result } = renderHook(() => useScrollPosition())
    expect(result.current).toEqual({ x: 12, y: 34 })
  })

  test('scroll 이벤트가 발생하면 갱신된다', () => {
    const { result } = renderHook(() => useScrollPosition())
    expect(result.current).toEqual({ x: 0, y: 0 })

    act(() => {
      setScroll(80, 240)
      fireScroll()
    })

    expect(result.current).toEqual({ x: 80, y: 240 })
  })

  test('연속 scroll 이벤트는 rAF로 한 번에 합쳐진다', () => {
    let pendingCb: FrameRequestCallback | null = null
    vi.stubGlobal('requestAnimationFrame', ((cb: FrameRequestCallback) => {
      pendingCb = cb
      return 7
    }) as typeof requestAnimationFrame)

    const { result } = renderHook(() => useScrollPosition())

    act(() => {
      setScroll(10, 20)
      fireScroll()
      setScroll(30, 60)
      fireScroll()
      setScroll(50, 100)
      fireScroll()
    })

    // No frame has fired yet — state shouldn't reflect any of the scrolls.
    expect(result.current).toEqual({ x: 0, y: 0 })

    act(() => {
      pendingCb?.(performance.now())
    })

    // Latest values win after the single frame flushes.
    expect(result.current).toEqual({ x: 50, y: 100 })
  })

  test('unmount 시 scroll 리스너가 해제된다', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollPosition())
    unmount()
    const removed = removeSpy.mock.calls.map(([type]) => type)
    expect(removed).toContain('scroll')
  })
})
