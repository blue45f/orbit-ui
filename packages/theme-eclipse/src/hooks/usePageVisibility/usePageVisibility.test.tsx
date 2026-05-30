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

  test('hidden → visible 으로 복귀한다', () => {
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

  test('마운트 직후 handler를 호출하여 SSR/CSR 상태 동기화', () => {
    // 초기 상태를 'hidden'으로 설정
    setVisibilityState('hidden')
    const { result } = renderHook(() => usePageVisibility())

    // useEffect 내 handler()가 호출되어 'hidden'으로 동기화되어야 함
    expect(result.current).toBe('hidden')
  })

  test('visibilitychange 이벤트 리스너가 등록되고 호출된다', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const { result } = renderHook(() => usePageVisibility())

    // addEventListener가 'visibilitychange'와 함께 호출되었는지 확인
    const addedEvents = addSpy.mock.calls.map(([type]) => type)
    expect(addedEvents).toContain('visibilitychange')

    // 리스너가 실제로 호출되면 상태가 업데이트됨을 확인
    act(() => {
      setVisibilityState('hidden')
      fireVisibilityChange()
    })

    expect(result.current).toBe('hidden')
  })
})
