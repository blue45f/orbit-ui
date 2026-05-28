import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useAnimationFrame } from './useAnimationFrame'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('useAnimationFrame', () => {
  it('does not throw when requestAnimationFrame is not available', () => {
    const original = global.requestAnimationFrame
    // @ts-expect-error intentionally removing requestAnimationFrame
    delete global.requestAnimationFrame

    const cb = vi.fn()
    expect(() => renderHook(() => useAnimationFrame(cb))).not.toThrow()

    global.requestAnimationFrame = original
  })

  it('does not invoke callback when active is false', () => {
    const rafSpy = vi.spyOn(global, 'requestAnimationFrame')
    const cb = vi.fn()

    renderHook(() => useAnimationFrame(cb, false))

    expect(rafSpy).not.toHaveBeenCalled()
    expect(cb).not.toHaveBeenCalled()
  })
})
