import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useSearchParam } from './useSearchParam'

describe('useSearchParam', () => {
  const originalPushState = window.history.pushState.bind(window.history)

  beforeEach(() => {
    // Reset URL to clean state
    window.history.pushState({}, '', '/')
    vi.restoreAllMocks()
  })

  afterEach(() => {
    cleanup()
    window.history.pushState = originalPushState
    window.history.pushState({}, '', '/')
  })

  test('unknown param이면 null을 반환한다', () => {
    const { result } = renderHook(() => useSearchParam('unknown'))
    expect(result.current[0]).toBeNull()
  })

  test('URL에 param이 있으면 해당 값을 반환한다', () => {
    window.history.pushState({}, '', '/?tab=overview')
    const { result } = renderHook(() => useSearchParam('tab'))
    expect(result.current[0]).toBe('overview')
  })

  test('set() 호출 시 값을 갱신하고 pushState를 호출한다', () => {
    const pushStateSpy = vi.spyOn(window.history, 'pushState')
    const { result } = renderHook(() => useSearchParam('tab'))

    act(() => {
      result.current[1]('settings')
    })

    expect(result.current[0]).toBe('settings')
    expect(pushStateSpy).toHaveBeenCalledOnce()
  })

  test('set(null) 호출 시 param을 제거한다', () => {
    window.history.pushState({}, '', '/?tab=overview')
    const { result } = renderHook(() => useSearchParam('tab'))

    act(() => {
      result.current[1](null)
    })

    expect(result.current[0]).toBeNull()
  })

  test('popstate 이벤트 발생 시 값이 동기화된다', () => {
    const { result } = renderHook(() => useSearchParam('page'))

    act(() => {
      window.history.pushState({}, '', '/?page=2')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })

    expect(result.current[0]).toBe('2')
  })
})
