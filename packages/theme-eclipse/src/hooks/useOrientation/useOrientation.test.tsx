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

  test('screen.orientation 미지원 시 legacy window.orientation 을 angleToType 으로 변환한다', () => {
    vi.stubGlobal('screen', {}) // 모던 API 없음 → legacy 폴백
    const cases: Array<[number, string]> = [
      [0, 'portrait-primary'],
      [180, 'portrait-secondary'],
      [90, 'landscape-primary'],
      [-90, 'landscape-secondary'],
      [45, 'unknown'],
    ]

    try {
      for (const [angle, type] of cases) {
        Object.defineProperty(window, 'orientation', { configurable: true, value: angle })
        const { result, unmount } = renderHook(() => useOrientation())
        expect(result.current).toEqual({ type, angle })
        unmount()
      }
    } finally {
      // 테스트가 정의한 레거시 속성을 제거해 isolate:false 누수를 막는다
      delete (window as unknown as { orientation?: number }).orientation
    }
  })
})

type OrientationType =
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'unknown'
