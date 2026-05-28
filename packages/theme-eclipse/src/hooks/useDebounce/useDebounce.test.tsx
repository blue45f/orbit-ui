import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('초기값은 즉시 노출된다', () => {
    const { result } = renderHook(() => useDebounce('initial', 200))
    expect(result.current).toBe('initial')
  })

  test('delay 동안 값 변경은 반영되지 않는다', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } },
    )
    expect(result.current).toBe('a')

    rerender({ value: 'b' })
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(299)
    })
    expect(result.current).toBe('a')
  })

  test('delay 경과 후 값이 갱신된다', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'b' })
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('b')
  })

  test('연속 변경은 마지막 값만 반영된다', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 200),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'b' })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    rerender({ value: 'c' })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    rerender({ value: 'd' })
    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe('d')
  })

  test('delay가 0이면 다음 microtask에서 즉시 갱신된다', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 0),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'b' })
    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(result.current).toBe('b')
  })

  test('숫자 값도 정상 디바운스된다', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useDebounce(value, 100),
      { initialProps: { value: 1 } },
    )

    rerender({ value: 2 })
    rerender({ value: 3 })
    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe(3)
  })

  test('객체 값도 정상 디바운스된다 (reference 비교)', () => {
    vi.useFakeTimers()
    const a = { id: 1 }
    const b = { id: 2 }
    const { result, rerender } = renderHook(
      ({ value }: { value: { id: number } }) => useDebounce(value, 100),
      { initialProps: { value: a } },
    )
    expect(result.current).toBe(a)

    rerender({ value: b })
    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe(b)
  })

  test('unmount 시 타이머가 정리된다', () => {
    vi.useFakeTimers()
    const { rerender, unmount } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 200),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'b' })
    unmount()

    expect(() => {
      vi.advanceTimersByTime(200)
    }).not.toThrow()
  })
})
