import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWakeLock } from './useWakeLock'

describe('useWakeLock', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('isSupported is false when navigator.wakeLock is absent', () => {
    const originalWakeLock = (navigator as unknown as Record<string, unknown>).wakeLock
    delete (navigator as unknown as Record<string, unknown>).wakeLock

    const { result } = renderHook(() => useWakeLock())
    expect(result.current.isSupported).toBe(false)

    if (originalWakeLock !== undefined) {
      ;(navigator as unknown as Record<string, unknown>).wakeLock = originalWakeLock
    }
  })

  it('isActive starts as false', () => {
    const { result } = renderHook(() => useWakeLock())
    expect(result.current.isActive).toBe(false)
  })
})
