import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useSearchParam } from './useSearchParam'

describe('useSearchParam', () => {
  const originalPushState = globalThis.history.pushState.bind(globalThis.history)

  beforeEach(() => {
    // Reset URL to clean state
    globalThis.history.pushState({}, '', '/')
    vi.restoreAllMocks()
  })

  afterEach(() => {
    cleanup()
    globalThis.history.pushState = originalPushState
    globalThis.history.pushState({}, '', '/')
  })

  test('unknown param이면 null을 반환한다', () => {
    const { result } = renderHook(() => useSearchParam('unknown'))
    expect(result.current[0]).toBeNull()
  })

  test('URL에 param이 있으면 해당 값을 반환한다', () => {
    globalThis.history.pushState({}, '', '/?tab=overview')
    const { result } = renderHook(() => useSearchParam('tab'))
    expect(result.current[0]).toBe('overview')
  })

  test('set() 호출 시 값을 갱신하고 pushState를 호출한다', () => {
    const pushStateSpy = vi.spyOn(globalThis.history, 'pushState')
    const { result } = renderHook(() => useSearchParam('tab'))

    act(() => {
      result.current[1]('settings')
    })

    expect(result.current[0]).toBe('settings')
    expect(pushStateSpy).toHaveBeenCalledOnce()
  })

  test('set(null) 호출 시 param을 제거한다', () => {
    globalThis.history.pushState({}, '', '/?tab=overview')
    const { result } = renderHook(() => useSearchParam('tab'))

    act(() => {
      result.current[1](null)
    })

    expect(result.current[0]).toBeNull()
  })

  test('popstate 이벤트 발생 시 값이 동기화된다', () => {
    const { result } = renderHook(() => useSearchParam('page'))

    act(() => {
      globalThis.history.pushState({}, '', '/?page=2')
      globalThis.dispatchEvent(new PopStateEvent('popstate'))
    })

    expect(result.current[0]).toBe('2')
  })
})
