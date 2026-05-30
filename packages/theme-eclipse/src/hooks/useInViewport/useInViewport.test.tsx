import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useInViewport } from './useInViewport'

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void

let observerCallback: IntersectionCallback | null = null
let mockObserve: ReturnType<typeof vi.fn>
let mockDisconnect: ReturnType<typeof vi.fn>

describe('useInViewport', () => {
  beforeEach(() => {
    mockObserve = vi.fn()
    mockDisconnect = vi.fn()

    const captureFns = { observe: mockObserve, disconnect: mockDisconnect }
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = captureFns.observe
        disconnect = captureFns.disconnect
        unobserve = vi.fn()
        constructor(callback: IntersectionCallback) {
          observerCallback = callback
        }
      },
    )
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    observerCallback = null
  })

  it('초기 상태는 false 다', () => {
    const el = document.createElement('div')
    const ref = { current: el }

    const { result } = renderHook(() => useInViewport(ref))
    expect(result.current).toBe(false)
  })

  it('엘리먼트가 교차하면 true 를 반환한다', () => {
    const el = document.createElement('div')
    const ref = { current: el }

    const { result } = renderHook(() => useInViewport(ref))
    expect(result.current).toBe(false)

    act(() => {
      observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry])
    })

    expect(result.current).toBe(true)
  })

  it('once 옵션이 true 면 첫 교차 후 observer 를 disconnect 한다', () => {
    const el = document.createElement('div')
    const ref = { current: el }

    renderHook(() => useInViewport(ref, { once: true }))

    act(() => {
      observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry])
    })

    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('once=false이면 여러 번 교차/미교차 상태 변화를 감지한다', () => {
    const el = document.createElement('div')
    const ref = { current: el }

    const { result } = renderHook(() => useInViewport(ref, { once: false }))

    act(() => {
      observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry])
    })
    expect(result.current).toBe(true)

    act(() => {
      observerCallback?.([{ isIntersecting: false } as IntersectionObserverEntry])
    })
    expect(result.current).toBe(false)

    // 다시 교차
    act(() => {
      observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry])
    })
    expect(result.current).toBe(true)

    // observer는 여전히 연결 (disconnect 안 함)
    expect(mockDisconnect).not.toHaveBeenCalled()
  })

  it('entry가 없을 때 isIntersecting=false로 안전하게 처리한다', () => {
    const el = document.createElement('div')
    const ref = { current: el }

    const { result } = renderHook(() => useInViewport(ref))
    expect(result.current).toBe(false)

    // 빈 entry 또는 undefined
    act(() => {
      observerCallback?.([{} as IntersectionObserverEntry])
    })
    expect(result.current).toBe(false)
  })

  it('false->false 상태도 업데이트된다', () => {
    const el = document.createElement('div')
    const ref = { current: el }

    const { result } = renderHook(() => useInViewport(ref))
    expect(result.current).toBe(false)

    // isIntersecting=false 명시적 트리거
    act(() => {
      observerCallback?.([{ isIntersecting: false } as IntersectionObserverEntry])
    })
    // 여전히 false지만 setIsInViewport가 호출되었음을 보이기 위해
    // 후속 true 상태 변화가 감지되는지 확인
    expect(result.current).toBe(false)

    act(() => {
      observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry])
    })
    expect(result.current).toBe(true)
  })
})
