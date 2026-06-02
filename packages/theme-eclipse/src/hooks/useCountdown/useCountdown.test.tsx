import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useCountdown } from './useCountdown'

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: 0 })
  })
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('초기 남은 시간은 from, 정지 상태', () => {
    const { result } = renderHook(() => useCountdown({ from: 5000 }))
    expect(result.current.remaining).toBe(5000)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.isFinished).toBe(false)
  })

  test('autoStart=true 면 즉시 진행, 시간이 줄어듦', () => {
    const { result } = renderHook(() =>
      useCountdown({ from: 3000, autoStart: true, interval: 1000 })
    )
    expect(result.current.isRunning).toBe(true)
    expect(result.current.remaining).toBe(3000)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.remaining).toBe(2000)
  })

  test('start() 로 시작, pause() 로 멈춤', () => {
    const { result } = renderHook(() => useCountdown({ from: 3000, interval: 1000 }))

    act(() => {
      result.current.start()
    })
    expect(result.current.isRunning).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1500)
      result.current.pause()
    })
    expect(result.current.isRunning).toBe(false)
    expect(result.current.remaining).toBe(1500)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    // No further change while paused
    expect(result.current.remaining).toBe(1500)
  })

  test('일시정지 후 start() 는 남은 시간부터 재개', () => {
    const { result } = renderHook(() => useCountdown({ from: 3000, interval: 1000 }))

    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(1000)
      result.current.pause()
    })
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.remaining).toBe(1000)
  })

  test('reset 은 from 으로 되돌리고 정지 상태로', () => {
    const { result } = renderHook(() => useCountdown({ from: 3000, interval: 1000 }))
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(2000)
      result.current.reset()
    })
    expect(result.current.remaining).toBe(3000)
    expect(result.current.isRunning).toBe(false)
  })

  test('0 도달 시 isFinished=true 와 onFinish 콜백', () => {
    const onFinish = vi.fn()
    const { result } = renderHook(() =>
      useCountdown({ from: 2000, interval: 1000, autoStart: true, onFinish })
    )

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.remaining).toBe(0)
    expect(result.current.isFinished).toBe(true)
    expect(result.current.isRunning).toBe(false)
    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  test('finished 상태에서 start() 는 새 사이클을 시작한다', () => {
    const { result } = renderHook(() =>
      useCountdown({ from: 1000, interval: 500, autoStart: true })
    )
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.isFinished).toBe(true)

    act(() => {
      result.current.start()
    })
    expect(result.current.isRunning).toBe(true)
    expect(result.current.remaining).toBe(1000)
  })

  test('unmount 시 인터벌이 정리된다', () => {
    const onFinish = vi.fn()
    const { unmount } = renderHook(() =>
      useCountdown({ from: 2000, interval: 1000, autoStart: true, onFinish })
    )
    unmount()
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(onFinish).not.toHaveBeenCalled()
  })

  test('이미 진행 중이면 start() 는 무시된다 (no-op)', () => {
    const { result } = renderHook(() =>
      useCountdown({ from: 3000, interval: 1000, autoStart: true })
    )
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.remaining).toBe(2000)

    // 이미 running 이므로 start()는 재시작하지 않는다
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.remaining).toBe(1000)
    expect(result.current.isRunning).toBe(true)
  })

  test('정지 상태에서 pause() 는 무시된다 (no-op)', () => {
    const { result } = renderHook(() => useCountdown({ from: 3000, interval: 1000 }))
    expect(result.current.isRunning).toBe(false)

    act(() => {
      result.current.pause()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.remaining).toBe(3000)
  })
})
