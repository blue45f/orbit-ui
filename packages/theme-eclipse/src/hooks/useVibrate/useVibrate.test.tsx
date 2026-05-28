import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useVibrate } from './useVibrate'

describe('useVibrate', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  describe('navigator.vibrate가 없는 환경', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'vibrate', {
        value: undefined,
        configurable: true,
        writable: true,
      })
    })

    test('supported가 false다', () => {
      const { result } = renderHook(() => useVibrate())
      expect(result.current.supported).toBe(false)
    })

    test('vibrate()를 호출해도 에러가 발생하지 않는다', () => {
      const { result } = renderHook(() => useVibrate())
      expect(() => act(() => result.current.vibrate())).not.toThrow()
    })
  })

  describe('navigator.vibrate가 있는 환경', () => {
    let vibrateSpy: ReturnType<typeof vi.fn>

    beforeEach(() => {
      vibrateSpy = vi.fn()
      Object.defineProperty(navigator, 'vibrate', {
        value: vibrateSpy,
        configurable: true,
        writable: true,
      })
    })

    test('supported가 true다', () => {
      const { result } = renderHook(() => useVibrate())
      expect(result.current.supported).toBe(true)
    })

    test('vibrate()는 기본 패턴 200ms로 호출된다', () => {
      const { result } = renderHook(() => useVibrate())

      act(() => result.current.vibrate())
      expect(vibrateSpy).toHaveBeenCalledWith(200)
    })

    test('vibrate([100, 50, 100])는 배열 패턴으로 호출된다', () => {
      const { result } = renderHook(() => useVibrate())

      act(() => result.current.vibrate([100, 50, 100]))
      expect(vibrateSpy).toHaveBeenCalledWith([100, 50, 100])
    })

    test('언마운트 시 navigator.vibrate(0)를 호출해 진동을 취소한다', () => {
      const { unmount } = renderHook(() => useVibrate())

      unmount()
      expect(vibrateSpy).toHaveBeenCalledWith(0)
    })
  })
})
