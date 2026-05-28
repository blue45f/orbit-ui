import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useThrottle } from './useThrottle'

describe('useThrottle', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('초기값은 즉시 노출된다', () => {
    const { result } = renderHook(() => useThrottle('a', 100))
    expect(result.current).toBe('a')
  })

  test('연속 변경은 throttle window 내에 trailing call로 반영된다', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ v }: { v: string }) => useThrottle(v, 100), {
      initialProps: { v: 'a' },
    })

    rerender({ v: 'b' })
    rerender({ v: 'c' })
    rerender({ v: 'd' })

    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe('d')
  })

  test('delay 경과 후 다음 변경은 다음 window 종료 시 반영된다', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ v }: { v: number }) => useThrottle(v, 100), {
      initialProps: { v: 0 },
    })

    rerender({ v: 1 })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe(1)

    // window unblocks after no trailing value
    act(() => {
      vi.advanceTimersByTime(200)
    })

    rerender({ v: 2 })
    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe(2)
  })

  test('unmount 시 trailing timer가 정리된다', () => {
    vi.useFakeTimers()
    const { rerender, unmount } = renderHook(
      ({ v }: { v: string }) => useThrottle(v, 200),
      { initialProps: { v: 'a' } },
    )

    rerender({ v: 'b' })
    unmount()

    expect(() => {
      vi.advanceTimersByTime(300)
    }).not.toThrow()
  })
})
