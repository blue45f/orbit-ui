import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useInterval } from './useInterval'

describe('useInterval', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('delay마다 콜백이 반복 호출된다', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    renderHook(() => useInterval(callback, 100))

    act(() => {
      vi.advanceTimersByTime(350)
    })

    expect(callback).toHaveBeenCalledTimes(3)
  })

  test('delay가 null이면 호출되지 않는다', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    renderHook(() => useInterval(callback, null))

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(callback).not.toHaveBeenCalled()
  })

  test('delay null로 토글하면 일시정지된다', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    const { rerender } = renderHook(({ d }: { d: number | null }) => useInterval(callback, d), {
      initialProps: { d: 100 as number | null },
    })

    act(() => {
      vi.advanceTimersByTime(250)
    })
    expect(callback).toHaveBeenCalledTimes(2)

    rerender({ d: null })

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(callback).toHaveBeenCalledTimes(2)

    rerender({ d: 100 })

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(callback).toHaveBeenCalledTimes(4)
  })

  test('unmount 시 인터벌이 정리된다', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    const { unmount } = renderHook(() => useInterval(callback, 100))

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(callback).toHaveBeenCalledTimes(1)

    unmount()

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('콜백 갱신 시 항상 최신 함수가 호출된다', () => {
    vi.useFakeTimers()
    let counter = 0
    const { rerender } = renderHook(
      ({ mult }: { mult: number }) => {
        useInterval(() => {
          counter += mult
        }, 100)
      },
      { initialProps: { mult: 1 } }
    )

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(counter).toBe(1)

    rerender({ mult: 10 })

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(counter).toBe(11)
  })
})
