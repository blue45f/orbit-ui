import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useTimeout } from './useTimeout'

describe('useTimeout', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('delay 이후 콜백이 호출된다', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    renderHook(() => useTimeout(callback, 200))

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('delay가 null이면 콜백이 호출되지 않는다', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    renderHook(() => useTimeout(callback, null))

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    expect(callback).not.toHaveBeenCalled()
  })

  test('unmount 시 타이머가 정리된다', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    const { unmount } = renderHook(() => useTimeout(callback, 200))

    unmount()
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(callback).not.toHaveBeenCalled()
  })

  test('delay 변경 시 타이머가 재설정된다', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    const { rerender } = renderHook(({ d }: { d: number }) => useTimeout(callback, d), {
      initialProps: { d: 500 },
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(callback).not.toHaveBeenCalled()

    rerender({ d: 200 })

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('콜백 변경 시 항상 최신 함수가 호출된다', () => {
    vi.useFakeTimers()
    const first = vi.fn()
    const second = vi.fn()
    const { rerender } = renderHook(({ cb }: { cb: () => void }) => useTimeout(cb, 200), {
      initialProps: { cb: first },
    })

    rerender({ cb: second })

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })
})
