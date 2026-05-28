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
})
