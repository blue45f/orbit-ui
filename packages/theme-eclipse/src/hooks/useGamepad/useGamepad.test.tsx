import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useGamepad } from './useGamepad'

const setNavigatorGetGamepads = (getGamepads: undefined | (() => readonly (Gamepad | null)[])) => {
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

  it('updates gamepads state on gamepadconnected event', () => {
    const fakePad = { id: 'pad-1', index: 0 } as unknown as Gamepad
    setNavigatorGetGamepads(() => [fakePad])

    const { result } = renderHook(() => useGamepad())
    expect(result.current.gamepads).toHaveLength(0)

    act(() => {
      window.dispatchEvent(new Event('gamepadconnected'))
    })

    expect(result.current.gamepads).toEqual([fakePad])
  })

  it('refreshes gamepads state on gamepaddisconnected event', () => {
    const pads: (Gamepad | null)[] = [{ id: 'pad-1', index: 0 } as unknown as Gamepad]
    setNavigatorGetGamepads(() => pads)

    const { result } = renderHook(() => useGamepad())

    act(() => {
      window.dispatchEvent(new Event('gamepadconnected'))
    })
    expect(result.current.gamepads).toHaveLength(1)

    // 패드 분리 → getGamepads는 빈 목록 반환
    pads.length = 0
    act(() => {
      window.dispatchEvent(new Event('gamepaddisconnected'))
    })
    expect(result.current.gamepads).toHaveLength(0)
  })
})
