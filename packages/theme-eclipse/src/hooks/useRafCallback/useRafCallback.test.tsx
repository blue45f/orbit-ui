import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useRafCallback } from './useRafCallback'

describe('useRafCallback', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => { cb(0); return 1 }))
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('다음 RAF에서 callback이 실행된다', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useRafCallback(callback))
    const [rafCallback] = result.current

    act(() => {
      rafCallback()
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('cancel을 호출하면 callback이 실행되지 않는다', () => {
    const pendingCbs: FrameRequestCallback[] = []
    let rafId = 0
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      pendingCbs.push(cb)
      rafId += 1
      return rafId
    }))
    const cancelMock = vi.fn()
    vi.stubGlobal('cancelAnimationFrame', cancelMock)

    const callback = vi.fn()
    const { result } = renderHook(() => useRafCallback(callback))
    const [rafCallback, cancel] = result.current

    act(() => {
      rafCallback()
    })

    act(() => {
      cancel()
    })

    // Do NOT flush the RAF — callback should not fire
    expect(callback).not.toHaveBeenCalled()
    expect(cancelMock).toHaveBeenCalled()
  })

  it('항상 최신 callback을 호출한다', () => {
    const firstCallback = vi.fn()
    const secondCallback = vi.fn()

    const { result, rerender } = renderHook(
      ({ cb }: { cb: () => void }) => useRafCallback(cb),
      { initialProps: { cb: firstCallback } },
    )

    rerender({ cb: secondCallback })

    const [rafCallback] = result.current

    act(() => {
      rafCallback()
    })

    expect(firstCallback).not.toHaveBeenCalled()
    expect(secondCallback).toHaveBeenCalledTimes(1)
  })

  it('rafCallback과 cancel이 안정적인 참조를 유지한다', () => {
    const { result, rerender } = renderHook(() => useRafCallback(vi.fn()))

    const [rafCallback1, cancel1] = result.current
    rerender()
    const [rafCallback2, cancel2] = result.current

    expect(rafCallback1).toBe(rafCallback2)
    expect(cancel1).toBe(cancel2)
  })
})
