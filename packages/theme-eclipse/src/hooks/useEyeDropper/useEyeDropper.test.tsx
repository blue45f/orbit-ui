import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { cleanup } from '../../test-utils'

import { useEyeDropper } from './useEyeDropper'

describe('useEyeDropper', () => {
  afterEach(() => {
    cleanup()
  })

  it('isSupported is false when EyeDropper is not in window', () => {
    const original = (window as unknown as Record<string, unknown>).EyeDropper
    delete (window as unknown as Record<string, unknown>).EyeDropper

    const { result } = renderHook(() => useEyeDropper())
    expect(result.current.isSupported).toBe(false)

    if (original !== undefined) {
      ;(window as unknown as Record<string, unknown>).EyeDropper = original
    }
  })

  it('open() returns null if EyeDropper is not supported', async () => {
    const original = (window as unknown as Record<string, unknown>).EyeDropper
    delete (window as unknown as Record<string, unknown>).EyeDropper

    const { result } = renderHook(() => useEyeDropper())
    const value = await result.current.open()
    expect(value).toBeNull()

    if (original !== undefined) {
      ;(window as unknown as Record<string, unknown>).EyeDropper = original
    }
  })
})
