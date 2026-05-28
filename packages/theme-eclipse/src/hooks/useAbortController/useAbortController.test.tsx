import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useAbortController } from './useAbortController'

describe('useAbortController', () => {
  afterEach(() => {
    cleanup()
  })

  test('signal을 제공한다', () => {
    const { result } = renderHook(() => useAbortController())
    expect(result.current.signal).toBeInstanceOf(AbortSignal)
    expect(result.current.signal.aborted).toBe(false)
  })

  test('abort() 호출 시 signal이 aborted 상태가 된다', () => {
    const { result } = renderHook(() => useAbortController())
    const signal = result.current.signal

    act(() => {
      result.current.abort()
    })

    expect(signal.aborted).toBe(true)
  })

  test('unmount 시 자동으로 abort된다', () => {
    const { result, unmount } = renderHook(() => useAbortController())
    const signal = result.current.signal

    expect(signal.aborted).toBe(false)
    unmount()
    expect(signal.aborted).toBe(true)
  })

  test('reset() 호출 시 새로운 signal을 생성한다', () => {
    const { result } = renderHook(() => useAbortController())
    const firstSignal = result.current.signal

    act(() => {
      result.current.reset()
    })

    expect(result.current.signal).not.toBe(firstSignal)
    expect(result.current.signal.aborted).toBe(false)
  })
})
