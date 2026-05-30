import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useIdle } from './useIdle'

const fireUserActivity = (type = 'mousemove') => {
  window.dispatchEvent(new Event(type))
}

const setVisibility = (state: DocumentVisibilityState) => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  })
  document.dispatchEvent(new Event('visibilitychange'))
}

describe('useIdle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setVisibility('visible')
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('초기 상태는 active(false)', () => {
    const { result } = renderHook(() => useIdle({ timeout: 1000 }))
    expect(result.current).toBe(false)
  })

  test('timeout 만큼 무활동이 지속되면 idle(true) 로 전환', () => {
    const { result } = renderHook(() => useIdle({ timeout: 1000 }))

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current).toBe(true)
  })

  test('활동 이벤트가 발생하면 idle 해제, 다시 카운트', () => {
    const { result } = renderHook(() => useIdle({ timeout: 1000 }))

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current).toBe(true)

    act(() => {
      fireUserActivity('mousemove')
    })
    expect(result.current).toBe(false)

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe(false) // still active because timer reset

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe(true)
  })

  test('탭이 hidden 되면 즉시 idle', () => {
    const { result } = renderHook(() => useIdle({ timeout: 60_000 }))
    expect(result.current).toBe(false)

    act(() => {
      setVisibility('hidden')
    })
    expect(result.current).toBe(true)

    act(() => {
      setVisibility('visible')
    })
    expect(result.current).toBe(false)
  })

  test('enabled=false 면 항상 false 유지', () => {
    const { result } = renderHook(() => useIdle({ timeout: 100, enabled: false }))

    act(() => {
      vi.advanceTimersByTime(10_000)
    })
    expect(result.current).toBe(false)
  })

  test('커스텀 events 목록만 활동으로 인정한다', () => {
    const { result } = renderHook(() =>
      useIdle({ timeout: 1000, events: ['keydown'] }),
    )

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current).toBe(true)

    act(() => {
      fireUserActivity('mousemove')
    })
    expect(result.current).toBe(true) // mousemove ignored

    act(() => {
      fireUserActivity('keydown')
    })
    expect(result.current).toBe(false) // keydown counted
  })

  test('unmount 시 타이머와 리스너가 정리된다', () => {
    const removeWindow = vi.spyOn(window, 'removeEventListener')
    const removeDoc = vi.spyOn(document, 'removeEventListener')
    const { unmount } = renderHook(() => useIdle({ timeout: 1000 }))
    unmount()

    const wRemoved = removeWindow.mock.calls.map(([type]) => type)
    expect(wRemoved).toContain('mousemove')
    expect(removeDoc.mock.calls.map(([type]) => type)).toContain('visibilitychange')
  })

  test('활동 이벤트 리스너는 모든 기본 이벤트 타입에 등록된다', () => {
    const addWindowSpy = vi.spyOn(window, 'addEventListener')
    renderHook(() => useIdle({ timeout: 1000 }))

    const addedTypes = addWindowSpy.mock.calls.map(([type]) => type)
    expect(addedTypes).toContain('mousemove')
    expect(addedTypes).toContain('mousedown')
    expect(addedTypes).toContain('keydown')
    expect(addedTypes).toContain('touchstart')
    expect(addedTypes).toContain('scroll')
    expect(addedTypes).toContain('wheel')
  })

  test('탭이 visible으로 돌아올 때 타이머가 리셋된다', () => {
    const { result } = renderHook(() => useIdle({ timeout: 1000 }))
    expect(result.current).toBe(false)

    act(() => {
      setVisibility('hidden')
    })
    expect(result.current).toBe(true)

    act(() => {
      setVisibility('visible')
    })
    expect(result.current).toBe(false)

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe(false) // Timer was reset on visibility change

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe(true)
  })

  test('enabled 변경 시 타이머와 리스너가 재설치된다', () => {
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useIdle({ timeout: 1000, enabled }),
      { initialProps: { enabled: true } },
    )

    expect(result.current).toBe(false)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current).toBe(true)

    rerender({ enabled: false })
    expect(result.current).toBe(false)

    act(() => {
      vi.advanceTimersByTime(10_000)
    })
    expect(result.current).toBe(false) // Stays false when disabled
  })
})
