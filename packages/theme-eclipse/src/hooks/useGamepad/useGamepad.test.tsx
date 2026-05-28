import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useGamepad } from './useGamepad'

const setNavigatorGetGamepads = (
  getGamepads: undefined | (() => readonly (Gamepad | null)[])
) => {
  const baseNavigator = navigator as unknown as Record<string, unknown>
  const nextNavigator: Record<string, unknown> = { ...baseNavigator }

  if (getGamepads) {
    nextNavigator.getGamepads = getGamepads
  } else {
    delete nextNavigator.getGamepads
  }

  vi.stubGlobal('navigator', nextNavigator as unknown as Navigator)
}

describe('useGamepad', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('returns isSupported: false when navigator.getGamepads is absent', () => {
    setNavigatorGetGamepads(undefined)

    const { result } = renderHook(() => useGamepad())
    expect(result.current.isSupported).toBe(false)
  })

  it('returns isSupported: true when navigator.getGamepads is available', () => {
    setNavigatorGetGamepads(vi.fn().mockReturnValue([]))

    const { result } = renderHook(() => useGamepad())
    expect(result.current.isSupported).toBe(true)
  })
})
