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

  it('share() is a no-op when not supported', async () => {
    setNavigatorShare(undefined)

    const { result } = renderHook(() => useShareAPI())
    await expect(result.current.share({ title: 'x' })).resolves.toBeUndefined()
  })

  it('canShare delegates to navigator.canShare when supported', () => {
    const base = navigator as unknown as Record<string, unknown>
    const mockCanShare = vi.fn().mockReturnValue(true)
    vi.stubGlobal('navigator', {
      ...base,
      share: vi.fn().mockResolvedValue(undefined),
      canShare: mockCanShare,
    } as unknown as Navigator)

    const { result } = renderHook(() => useShareAPI())
    const data = { title: 'x', url: 'https://e.com' }
    expect(result.current.canShare(data)).toBe(true)
    expect(mockCanShare).toHaveBeenCalledWith(data)
  })

  it('canShare returns false when navigator.canShare is absent', () => {
    // share만 있고 canShare는 없음 → ?? false 폴백
    setNavigatorShare(vi.fn().mockResolvedValue(undefined))

    const { result } = renderHook(() => useShareAPI())
    expect(result.current.canShare({ title: 'x' })).toBe(false)
  })

  it('canShare returns false when not supported', () => {
    setNavigatorShare(undefined)

    const { result } = renderHook(() => useShareAPI())
    expect(result.current.canShare({ title: 'x' })).toBe(false)
  })
})
