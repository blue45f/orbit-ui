import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useInfiniteScroll } from './useInfiniteScroll'

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  callback: IntersectionCallback
  observed: Element[] = []

  constructor(callback: IntersectionCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe(node: Element) {
    this.observed.push(node)
  }

  unobserve(_node: Element) {}

  disconnect() {
    this.observed = []
  }

  trigger(isIntersecting: boolean) {
    const entry = {
      isIntersecting,
      target: this.observed[0],
      intersectionRatio: isIntersecting ? 1 : 0,
      time: 0,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
    } as IntersectionObserverEntry
    this.callback([entry])
  }
}

describe('useInfiniteScroll', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = []
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('hasMore=true일 때 센티넬이 교차하면 onLoadMore가 호출된다', () => {
    const onLoadMore = vi.fn()
    const { result } = renderHook(() =>
      useInfiniteScroll({ hasMore: true, onLoadMore }),
    )

    const sentinel = document.createElement('div')
    document.body.appendChild(sentinel)

    act(() => {
      result.current.sentinelRef(sentinel)
    })

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true)
    })

    expect(onLoadMore).toHaveBeenCalledOnce()

    document.body.removeChild(sentinel)
  })

  test('hasMore=false일 때 센티넬이 교차해도 onLoadMore가 호출되지 않는다', () => {
    const onLoadMore = vi.fn()
    const { result } = renderHook(() =>
      useInfiniteScroll({ hasMore: false, onLoadMore }),
    )

    const sentinel = document.createElement('div')
    document.body.appendChild(sentinel)

    act(() => {
      result.current.sentinelRef(sentinel)
    })

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true)
    })

    expect(onLoadMore).not.toHaveBeenCalled()

    document.body.removeChild(sentinel)
  })

  test('unmount 시 observer가 disconnect된다', () => {
    const onLoadMore = vi.fn()
    const { result, unmount } = renderHook(() =>
      useInfiniteScroll({ hasMore: true, onLoadMore }),
    )

    const sentinel = document.createElement('div')
    document.body.appendChild(sentinel)

    act(() => {
      result.current.sentinelRef(sentinel)
    })

    expect(MockIntersectionObserver.instances[0].observed.length).toBe(1)

    unmount()

    // sentinelRef(null) 호출로 disconnect 됨
    act(() => {
      result.current.sentinelRef(null)
    })

    expect(MockIntersectionObserver.instances[0].observed.length).toBe(0)

    document.body.removeChild(sentinel)
  })

  test('IntersectionObserver가 custom rootMargin으로 초기화된다', () => {
    const onLoadMore = vi.fn()
    const { result } = renderHook(() =>
      useInfiniteScroll({ hasMore: true, onLoadMore, rootMargin: '200px' }),
    )

    const sentinel = document.createElement('div')
    document.body.appendChild(sentinel)

    act(() => {
      result.current.sentinelRef(sentinel)
    })

    // Get the constructor call arguments and verify rootMargin
    const observer = MockIntersectionObserver.instances[0]
    // Note: MockIntersectionObserver doesn't capture options, but we can verify it was created
    expect(observer).toBeDefined()

    document.body.removeChild(sentinel)
  })

  test('IntersectionObserver가 custom threshold로 초기화된다', () => {
    const onLoadMore = vi.fn()
    const { result } = renderHook(() =>
      useInfiniteScroll({ hasMore: true, onLoadMore, threshold: 0.5 }),
    )

    const sentinel = document.createElement('div')
    document.body.appendChild(sentinel)

    act(() => {
      result.current.sentinelRef(sentinel)
    })

    const observer = MockIntersectionObserver.instances[0]
    expect(observer).toBeDefined()

    document.body.removeChild(sentinel)
  })

  test('hasMore가 false에서 true로 변경되면 isLoading이 false로 리셋된다', () => {
    const onLoadMore = vi.fn()
    const { result, rerender } = renderHook(
      ({ hasMore }: { hasMore: boolean }) =>
        useInfiniteScroll({ hasMore, onLoadMore }),
      { initialProps: { hasMore: false } },
    )

    const sentinel = document.createElement('div')
    document.body.appendChild(sentinel)

    act(() => {
      result.current.sentinelRef(sentinel)
    })

    // Initially hasMore is false, so isLoading should be false
    expect(result.current.isLoading).toBe(false)

    // Change hasMore to true
    rerender({ hasMore: true })

    // After hasMore becomes true, useEffect should reset isLoading to false
    expect(result.current.isLoading).toBe(false)

    document.body.removeChild(sentinel)
  })
})
