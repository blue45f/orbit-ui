import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWakeLock } from './useWakeLock'

const setNavigatorWakeLock = (
  wakeLock:
    | undefined
    | {
        request: () => Promise<{
          addEventListener: () => void
          release: () => Promise<void>
        }>
      }
) => {
  const baseNavigator = navigator as unknown as Record<string, unknown>
  const nextNavigator: Record<string, unknown> = { ...baseNavigator }

  if (wakeLock) {
    nextNavigator.wakeLock = wakeLock
  } else {
    delete nextNavigator.wakeLock
  }

  vi.stubGlobal('navigator', nextNavigator as unknown as Navigator)
}

describe('useWakeLock', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('isSupported is false when navigator.wakeLock is absent', () => {
    setNavigatorWakeLock(undefined)

    const { result } = renderHook(() => useWakeLock())
    expect(result.current.isSupported).toBe(false)
  })

  it('isActive starts as false', () => {
    const { result } = renderHook(() => useWakeLock())
    expect(result.current.isActive).toBe(false)
  })
})
