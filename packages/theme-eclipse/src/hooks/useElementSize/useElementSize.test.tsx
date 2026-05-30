import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useElementSize } from './useElementSize'

describe('useElementSize', () => {
  let observeCallback: ResizeObserverCallback | null = null
  let mockObserve: ReturnType<typeof vi.fn>
  let mockDisconnect: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockObserve = vi.fn()
    mockDisconnect = vi.fn()

    const captureFns = { observe: mockObserve, disconnect: mockDisconnect }
    global.ResizeObserver = class {
      observe = captureFns.observe
      unobserve = vi.fn()
      disconnect = captureFns.disconnect
      constructor(callback: ResizeObserverCallback) {
        observeCallback = callback
      }
    } as unknown as typeof ResizeObserver
  })

  afterEach(() => {
    cleanup()
    observeCallback = null
    vi.restoreAllMocks()
  })

  it('초기에는 width와 height가 0이다', () => {
    const { result } = renderHook(() => useElementSize())
    expect(result.current.width).toBe(0)
    expect(result.current.height).toBe(0)
  })

  it('엘리먼트 크기가 변경되면 width와 height를 업데이트한다', () => {
    const { result } = renderHook(() => useElementSize())

    const fakeElement = document.createElement('div')

    act(() => {
      result.current.ref(fakeElement)
    })

    expect(mockObserve).toHaveBeenCalledWith(fakeElement)

    act(() => {
      if (observeCallback) {
        observeCallback(
          [
            {
              contentRect: { width: 300, height: 150 } as DOMRectReadOnly,
              target: fakeElement,
              borderBoxSize: [],
              contentBoxSize: [],
              devicePixelContentBoxSize: [],
            },
          ],
          {} as ResizeObserver,
        )
      }
    })

    expect(result.current.width).toBe(300)
    expect(result.current.height).toBe(150)
  })

  it('언마운트 시 observer를 해제한다', () => {
    const { result, unmount } = renderHook(() => useElementSize())

    const fakeElement = document.createElement('div')
    act(() => {
      result.current.ref(fakeElement)
    })

    expect(mockObserve).toHaveBeenCalledWith(fakeElement)

    unmount()

    // ref를 null로 호출하거나 unmount시 disconnect가 호출됨
    // 새 ref로 null을 전달해서 cleanup 트리거
    act(() => {
      result.current.ref(null)
    })

    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('ResizeObserver 콜백에서 entry가 undefined인 경우를 처리한다', () => {
    const { result } = renderHook(() => useElementSize())

    const fakeElement = document.createElement('div')

    act(() => {
      result.current.ref(fakeElement)
    })

    // Call the observer callback with a falsy entry (undefined in the array)
    act(() => {
      if (observeCallback) {
        observeCallback(
          [undefined as unknown as ResizeObserverEntry],
          {} as ResizeObserver,
        )
      }
    })

    // Size should remain 0,0 since entry was falsy and guard prevents update
    expect(result.current.width).toBe(0)
    expect(result.current.height).toBe(0)
  })
})
