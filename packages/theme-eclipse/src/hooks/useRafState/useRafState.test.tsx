import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useRafState } from './useRafState'

describe('useRafState', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => { cb(0); return 1 }))
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('초기 상태를 반환한다', () => {
    const { result } = renderHook(() => useRafState(0))
    expect(result.current[0]).toBe(0)
  })

  it('함수형 초기값을 지원한다', () => {
    const { result } = renderHook(() => useRafState(() => 42))
    expect(result.current[0]).toBe(42)
  })

  it('RAF 틱 이후 상태를 업데이트한다', () => {
    const { result } = renderHook(() => useRafState(0))
    const [, setRafState] = result.current

    act(() => {
      setRafState(10)
    })

    expect(result.current[0]).toBe(10)
  })

  it('연속 업데이트는 마지막 값으로 일괄 처리된다', () => {
    // stubbed RAF executes cb immediately, so each call goes through
    const rafCalls: FrameRequestCallback[] = []
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      rafCalls.push(cb)
      return rafCalls.length
    }))

    const { result } = renderHook(() => useRafState(0))
    const [, setRafState] = result.current

    act(() => {
      setRafState(1)
      setRafState(2)
      setRafState(3)
      // Flush the pending RAF
      rafCalls[rafCalls.length - 1]?.(0)
    })

    expect(result.current[0]).toBe(3)
  })

  it('unmount 시 pending RAF를 취소한다', () => {
    const pendingCbs: FrameRequestCallback[] = []
    let rafId = 0
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      pendingCbs.push(cb)
      rafId += 1
      return rafId
    }))
    const cancelMock = vi.fn()
    vi.stubGlobal('cancelAnimationFrame', cancelMock)

    const { result, unmount } = renderHook(() => useRafState(0))
    const [, setRafState] = result.current

    // Schedule an update but don't flush it
    act(() => {
      setRafState(99)
    })

    unmount()

    expect(cancelMock).toHaveBeenCalled()
  })
})
