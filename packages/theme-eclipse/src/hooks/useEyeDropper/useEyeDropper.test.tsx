import { act, renderHook } from '@testing-library/react'
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

  it('open() returns the picked color and updates sRGBHex on success', async () => {
    class MockEyeDropper {
      open() {
        return Promise.resolve({ sRGBHex: '#ff0000' })
      }
    }
    ;(window as unknown as Record<string, unknown>).EyeDropper = MockEyeDropper

    try {
      const { result } = renderHook(() => useEyeDropper())
      expect(result.current.isSupported).toBe(true)

      let returned: string | null = null
      await act(async () => {
        returned = await result.current.open()
      })

      expect(returned).toBe('#ff0000')
      expect(result.current.sRGBHex).toBe('#ff0000')
      expect(result.current.error).toBeNull()
    } finally {
      delete (window as unknown as Record<string, unknown>).EyeDropper
    }
  })

  it('open() captures the error and returns null on failure', async () => {
    class MockEyeDropper {
      open() {
        return Promise.reject(new Error('user canceled'))
      }
    }
    ;(window as unknown as Record<string, unknown>).EyeDropper = MockEyeDropper

    try {
      const { result } = renderHook(() => useEyeDropper())

      let returned: string | null = '#unset'
      await act(async () => {
        returned = await result.current.open()
      })

      expect(returned).toBeNull()
      expect(result.current.error).toBeInstanceOf(Error)
      expect(result.current.error?.message).toBe('user canceled')
    } finally {
      delete (window as unknown as Record<string, unknown>).EyeDropper
    }
  })
})
