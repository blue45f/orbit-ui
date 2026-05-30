import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useLocalStorage } from './useLocalStorage'

const KEY = 'orbit-ls-test'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    window.localStorage.clear()
  })

  test('스토리지가 비어 있으면 initialValue를 반환한다', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'default'))
    expect(result.current[0]).toBe('default')
  })

  test('스토리지에 값이 있으면 그 값을 반환한다', () => {
    window.localStorage.setItem(KEY, JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage(KEY, 'default'))
    expect(result.current[0]).toBe('stored')
  })

  test('setValue로 값을 갱신하면 state와 storage 모두 반영된다', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'a'))

    act(() => {
      result.current[1]('b')
    })

    expect(result.current[0]).toBe('b')
    expect(window.localStorage.getItem(KEY)).toBe(JSON.stringify('b'))
  })

  test('함수형 setValue가 동작한다', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 0))

    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(2)
    expect(window.localStorage.getItem(KEY)).toBe('2')
  })

  test('remove로 스토리지에서 제거하고 initialValue로 리셋한다', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'default'))

    act(() => {
      result.current[1]('custom')
    })
    expect(window.localStorage.getItem(KEY)).not.toBeNull()

    act(() => {
      result.current[2]()
    })

    expect(result.current[0]).toBe('default')
    expect(window.localStorage.getItem(KEY)).toBeNull()
  })

  test('객체 값도 정상 직렬화·역직렬화된다', () => {
    const initial = { mode: 'light', density: 'compact' }
    const { result } = renderHook(() => useLocalStorage(KEY, initial))

    act(() => {
      result.current[1]({ mode: 'dark', density: 'spacious' })
    })

    expect(result.current[0]).toEqual({ mode: 'dark', density: 'spacious' })

    const stored = JSON.parse(window.localStorage.getItem(KEY)!) as {
      mode: string
      density: string
    }
    expect(stored).toEqual({ mode: 'dark', density: 'spacious' })
  })

  test('storage 이벤트로 다른 탭 변경이 sync된다', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'a'))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: KEY,
          newValue: JSON.stringify('from-other-tab'),
          storageArea: window.localStorage,
        })
      )
    })

    expect(result.current[0]).toBe('from-other-tab')
  })

  test('storage 이벤트의 newValue가 null이면 initialValue로 리셋된다', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'default'))
    act(() => {
      result.current[1]('changed')
    })

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: KEY,
          newValue: null,
          storageArea: window.localStorage,
        })
      )
    })

    expect(result.current[0]).toBe('default')
  })

  test('다른 key의 storage 이벤트는 무시된다', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'a'))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'other-key',
          newValue: JSON.stringify('z'),
          storageArea: window.localStorage,
        })
      )
    })

    expect(result.current[0]).toBe('a')
  })

  test('파싱 실패 시 initialValue로 fallback', () => {
    window.localStorage.setItem(KEY, '{ not valid json')
    const { result } = renderHook(() => useLocalStorage(KEY, 'safe'))
    expect(result.current[0]).toBe('safe')
  })

  test('syncTabs=false면 storage 이벤트를 무시한다', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'a', { syncTabs: false }))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: KEY,
          newValue: JSON.stringify('z'),
          storageArea: window.localStorage,
        })
      )
    })

    expect(result.current[0]).toBe('a')
  })

  test('setItem이 실패(quota 등)해도 throw하지 않고 state는 갱신된다', () => {
    const spy = vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('quota exceeded', 'QuotaExceededError')
    })
    const { result } = renderHook(() => useLocalStorage(KEY, 'a'))

    act(() => {
      result.current[1]('b')
    })

    expect(result.current[0]).toBe('b')
    spy.mockRestore()
  })

  test('removeItem이 실패해도 throw하지 않고 state는 initialValue로 리셋된다', () => {
    const spy = vi.spyOn(window.localStorage, 'removeItem').mockImplementation(() => {
      throw new Error('access denied')
    })
    const { result } = renderHook(() => useLocalStorage(KEY, 'default'))

    act(() => {
      result.current[1]('changed')
    })
    act(() => {
      result.current[2]()
    })

    expect(result.current[0]).toBe('default')
    spy.mockRestore()
  })

  test('storage 이벤트의 newValue가 잘못된 JSON이면 무시한다', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'a'))

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: KEY,
          newValue: '{ not valid json',
          storageArea: window.localStorage,
        })
      )
    })

    // 파싱 실패는 catch되어 state는 그대로 유지된다
    expect(result.current[0]).toBe('a')
  })
})
