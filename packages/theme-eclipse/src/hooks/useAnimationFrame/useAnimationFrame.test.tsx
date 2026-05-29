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
})
