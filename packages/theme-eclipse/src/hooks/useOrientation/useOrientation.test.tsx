import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useOrientation } from './useOrientation'

describe('useOrientation', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  test('returns { type: "unknown", angle: 0 } when screen.orientation is undefined', () => {
    vi.stubGlobal('screen', {})

    const { result } = renderHook(() => useOrientation())

    expect(result.current).toEqual({ type: 'unknown', angle: 0 })
  })

  test('returns initial type and angle from screen.orientation', () => {
    const mockChangeListeners: EventListenerOrEventListenerObject[] = []
    const mockOrientation = {
      type: 'portrait-primary' as OrientationType,
      angle: 0,
      addEventListener: vi.fn((_type: string, listener: EventListenerOrEventListenerObject) => {
        mockChangeListeners.push(listener)
      }),
      removeEventListener: vi.fn(),
    }

    vi.stubGlobal('screen', { orientation: mockOrientation })

    const { result } = renderHook(() => useOrientation())

    expect(result.current.type).toBe('portrait-primary')
    expect(result.current.angle).toBe(0)
  })

  test('updates state on change event from screen.orientation', () => {
    const mockChangeListeners: Array<() => void> = []
    const mockOrientation = {
      type: 'portrait-primary' as OrientationType,
      angle: 0,
      addEventListener: vi.fn((_type: string, listener: () => void) => {
        mockChangeListeners.push(listener)
      }),
      removeEventListener: vi.fn(),
    }

    vi.stubGlobal('screen', { orientation: mockOrientation })

    const { result } = renderHook(() => useOrientation())

    expect(result.current.type).toBe('portrait-primary')

    // Simulate orientation change
    act(() => {
      mockOrientation.type = 'landscape-primary' as OrientationType
      mockOrientation.angle = 90
      mockChangeListeners.forEach((listener) => listener())
    })

    expect(result.current.type).toBe('landscape-primary')
    expect(result.current.angle).toBe(90)
  })

  test('removes event listener on unmount', () => {
    const mockOrientation = {
      type: 'portrait-primary' as OrientationType,
      angle: 0,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    vi.stubGlobal('screen', { orientation: mockOrientation })

    const { unmount } = renderHook(() => useOrientation())

    unmount()

    expect(mockOrientation.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})

type OrientationType =
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'unknown'
