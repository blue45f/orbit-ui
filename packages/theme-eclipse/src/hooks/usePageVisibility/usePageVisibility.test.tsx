import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { usePageVisibility } from './usePageVisibility'

const setVisibilityState = (state: DocumentVisibilityState) => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  })
}

const fireVisibilityChange = () => {
  document.dispatchEvent(new Event('visibilitychange'))
}

describe('usePageVisibility', () => {
  afterEach(() => {
    cleanup()
    setVisibilityState('visible')
    vi.restoreAllMocks()
  })

  test("초기값은 'visible' 이다 (jsdom 기본)", () => {
    const { result } = renderHook(() => usePageVisibility())
    expect(result.current).toBe('visible')
  })

  test("visibilitychange 로 'hidden' 으로 전환된다", () => {
    const { result } = renderHook(() => usePageVisibility())

    act(() => {
      setVisibilityState('hidden')
      fireVisibilityChange()
    })

    expect(result.current).toBe('hidden')
  })

  test("hidden → visible 으로 복귀한다", () => {
    setVisibilityState('hidden')
    const { result } = renderHook(() => usePageVisibility())
    expect(result.current).toBe('hidden')

    act(() => {
      setVisibilityState('visible')
      fireVisibilityChange()
    })

    expect(result.current).toBe('visible')
  })

  test("'prerender' 같은 비-hidden 상태는 'visible' 로 매핑된다", () => {
    setVisibilityState('prerender' as DocumentVisibilityState)
    const { result } = renderHook(() => usePageVisibility())
    expect(result.current).toBe('visible')
  })

  test('unmount 시 visibilitychange 리스너가 해제된다', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const { unmount } = renderHook(() => usePageVisibility())
    unmount()
    const removed = removeSpy.mock.calls.map(([type]) => type)
    expect(removed).toContain('visibilitychange')
  })
})
