import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useShareAPI } from './useShareAPI'

const setNavigatorShare = (share?: () => Promise<unknown>) => {
  const baseNavigator = navigator as unknown as Record<string, unknown>
  const nextNavigator: Record<string, unknown> = { ...baseNavigator }

  if (share) {
    nextNavigator.share = share
  } else {
    delete nextNavigator.share
  }

  vi.stubGlobal('navigator', nextNavigator as unknown as Navigator)
}

describe('useShareAPI', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('share() calls navigator.share when supported', async () => {
    const mockShare = vi.fn().mockResolvedValue(undefined)
    setNavigatorShare(mockShare)

    const { result } = renderHook(() => useShareAPI())
    await result.current.share({ title: 'Test', url: 'https://example.com' })

    expect(mockShare).toHaveBeenCalledWith({ title: 'Test', url: 'https://example.com' })
  })

  it('isSupported is false when navigator.share is absent', () => {
    setNavigatorShare(undefined)

    const { result } = renderHook(() => useShareAPI())
    expect(result.current.isSupported).toBe(false)
  })
})
