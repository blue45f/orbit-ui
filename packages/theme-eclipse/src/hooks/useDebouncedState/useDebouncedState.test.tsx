import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useDebouncedState } from './useDebouncedState'

describe('useDebouncedState', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('초기값으로 value 와 debouncedValue 모두 시작', () => {
    const { result } = renderHook(() => useDebouncedState('a', 300))
    expect(result.current.value).toBe('a')
    expect(result.current.debouncedValue).toBe('a')
  })

  test('setValue 는 value 를 즉시, debouncedValue 는 delay 뒤에 갱신', () => {
    const { result } = renderHook(() => useDebouncedState('a', 300))

    act(() => result.current.setValue('b'))
    expect(result.current.value).toBe('b')
    expect(result.current.debouncedValue).toBe('a')

    act(() => vi.advanceTimersByTime(299))
    expect(result.current.debouncedValue).toBe('a')

    act(() => vi.advanceTimersByTime(1))
    expect(result.current.debouncedValue).toBe('b')
  })

  test('연속 입력 시 타이머가 재시작된다', () => {
    const { result } = renderHook(() => useDebouncedState('', 300))

    act(() => result.current.setValue('h'))
    act(() => vi.advanceTimersByTime(200))
    act(() => result.current.setValue('he'))
    act(() => vi.advanceTimersByTime(200))
    expect(result.current.debouncedValue).toBe('')

    act(() => result.current.setValue('hel'))
    act(() => vi.advanceTimersByTime(300))
    expect(result.current.debouncedValue).toBe('hel')
  })

  test('flush 는 디바운스를 건너뛰고 debouncedValue 즉시 반영', () => {
    const { result } = renderHook(() => useDebouncedState('a', 300))

    act(() => result.current.setValue('z'))
    act(() => result.current.flush())
    expect(result.current.debouncedValue).toBe('z')
  })

  test('cancel 은 진행중인 디바운스를 취소하고 value 를 이전 debouncedValue 로 롤백', () => {
    const { result } = renderHook(() => useDebouncedState('a', 300))

    act(() => result.current.setValue('zzz'))
    expect(result.current.value).toBe('zzz')

    act(() => result.current.cancel())
    expect(result.current.value).toBe('a')
    expect(result.current.debouncedValue).toBe('a')
  })

  test('함수형 setValue 지원', () => {
    const { result } = renderHook(() => useDebouncedState(0, 100))

    act(() => result.current.setValue((n) => n + 1))
    expect(result.current.value).toBe(1)
    act(() => vi.advanceTimersByTime(100))
    expect(result.current.debouncedValue).toBe(1)
  })

  test('unmount 시 타이머가 정리된다', () => {
    const { result, unmount } = renderHook(() => useDebouncedState('a', 300))

    act(() => result.current.setValue('b'))
    unmount()
    // shouldn't throw or update anything
    act(() => vi.advanceTimersByTime(1000))
  })
})
