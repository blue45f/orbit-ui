import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useSessionStorage } from './useSessionStorage'

const KEY = 'orbit-ss-test'

describe('useSessionStorage', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  afterEach(() => {
    cleanup()
    window.sessionStorage.clear()
  })

  test('스토리지가 비어 있으면 initialValue를 반환한다', () => {
    const { result } = renderHook(() => useSessionStorage(KEY, 'default'))
    expect(result.current[0]).toBe('default')
  })

  test('스토리지에 값이 있으면 그 값을 반환한다', () => {
    window.sessionStorage.setItem(KEY, JSON.stringify('stored'))
    const { result } = renderHook(() => useSessionStorage(KEY, 'default'))
    expect(result.current[0]).toBe('stored')
  })

  test('setValue로 값을 갱신하면 state와 storage 모두 반영된다', () => {
    const { result } = renderHook(() => useSessionStorage(KEY, 'a'))

    act(() => {
      result.current[1]('b')
    })

    expect(result.current[0]).toBe('b')
    expect(window.sessionStorage.getItem(KEY)).toBe(JSON.stringify('b'))
  })

  test('함수형 setValue가 동작한다', () => {
    const { result } = renderHook(() => useSessionStorage(KEY, 0))

    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(2)
    expect(window.sessionStorage.getItem(KEY)).toBe('2')
  })

  test('remove는 storage와 state를 initialValue로 되돌린다', () => {
    const { result } = renderHook(() => useSessionStorage(KEY, 'default'))

    act(() => {
      result.current[1]('updated')
    })
    expect(window.sessionStorage.getItem(KEY)).toBe(JSON.stringify('updated'))

    act(() => {
      result.current[2]()
    })
    expect(result.current[0]).toBe('default')
    expect(window.sessionStorage.getItem(KEY)).toBeNull()
  })

  test('역직렬화에 실패하면 initialValue로 fallback', () => {
    window.sessionStorage.setItem(KEY, '{ not json')
    const { result } = renderHook(() => useSessionStorage(KEY, 'safe'))
    expect(result.current[0]).toBe('safe')
  })

  test('커스텀 serialize·deserialize 사용', () => {
    const { result } = renderHook(() =>
      useSessionStorage(KEY, new Date(0), {
        serialize: (d) => String(d.getTime()),
        deserialize: (raw) => new Date(Number(raw)),
      }),
    )

    act(() => {
      result.current[1](new Date(1234567890000))
    })

    expect(window.sessionStorage.getItem(KEY)).toBe('1234567890000')
    expect(result.current[0]).toEqual(new Date(1234567890000))
  })
})
