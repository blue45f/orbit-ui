import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useAnimationFrame } from './useAnimationFrame'

const originalRAF = global.requestAnimationFrame

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  // delete로 제거한 전역은 afterEach에서 반드시 복원해 isolate:false 환경의 파일 간 누수를 막는다
  global.requestAnimationFrame = originalRAF
})

describe('useAnimationFrame', () => {
  it('does not throw when requestAnimationFrame is not available', () => {
    // @ts-expect-error intentionally removing requestAnimationFrame
    delete global.requestAnimationFrame

    const cb = vi.fn()
    // 복원은 afterEach가 보장하므로 renderHook이 throw해도 전역이 누수되지 않는다
    expect(() => renderHook(() => useAnimationFrame(cb))).not.toThrow()
  })

  it('does not invoke callback when active is false', () => {
    const rafSpy = vi.spyOn(global, 'requestAnimationFrame')
    const cb = vi.fn()

    renderHook(() => useAnimationFrame(cb, false))

    expect(rafSpy).not.toHaveBeenCalled()
    expect(cb).not.toHaveBeenCalled()
  })

  it('invokes the callback with delta time and re-schedules each frame', () => {
    const rafSpy = vi.fn((_cb: FrameRequestCallback) => 1)
    const cancelSpy = vi.fn()
    vi.stubGlobal('requestAnimationFrame', rafSpy)
    vi.stubGlobal('cancelAnimationFrame', cancelSpy)

    const cb = vi.fn()
    const { unmount } = renderHook(() => useAnimationFrame(cb))

    // 훅이 예약한 loop 콜백을 mock.calls에서 캡처 (재호출해도 동일 loop 클로저)
    const loop = rafSpy.mock.calls[0][0]

    // 첫 프레임: lastTime이 null이라 delta는 0
    loop(0)
    expect(cb).toHaveBeenLastCalledWith(0)
    // 둘째 프레임: delta = 16 - 0
    loop(16)
    expect(cb).toHaveBeenLastCalledWith(16)
    // 초기 예약 1회 + 프레임마다 재예약 2회
    expect(rafSpy).toHaveBeenCalledTimes(3)

    // unmount 시 마지막 rAF를 취소한다
    unmount()
    expect(cancelSpy).toHaveBeenCalledWith(1)
  })
})
