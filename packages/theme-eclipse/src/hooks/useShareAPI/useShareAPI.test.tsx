import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useShareAPI } from './useShareAPI'

describe('useShareAPI', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('isSupported is false when navigator.share is absent', () => {
    const { result } = renderHook(() => useShareAPI())
    expect(result.current.isSupported).toBe(false)
  })

  it('share() calls navigator.share when supported', async () => {
    const mockShare = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      writable: true,
      value: mockShare,
    })

    const { result } = renderHook(() => useShareAPI())
    await result.current.share({ title: 'Test', url: 'https://example.com' })

    expect(mockShare).toHaveBeenCalledWith({ title: 'Test', url: 'https://example.com' })

    delete (navigator as unknown as Record<string, unknown>).share
  })
})
