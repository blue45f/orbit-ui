import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useGamepad } from './useGamepad'

describe('useGamepad', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    delete (navigator as unknown as Record<string, unknown>).getGamepads
  })

  it('returns isSupported: false when navigator.getGamepads is absent', () => {
    const { result } = renderHook(() => useGamepad())
    expect(result.current.isSupported).toBe(false)
  })

  it('returns isSupported: true when navigator.getGamepads is available', () => {
    Object.defineProperty(navigator, 'getGamepads', {
      configurable: true,
      writable: true,
      value: vi.fn().mockReturnValue([]),
    })

    const { result } = renderHook(() => useGamepad())
    expect(result.current.isSupported).toBe(true)
  })
})
