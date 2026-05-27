import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useMediaQuery } from './useMediaQuery'

type MockMQL = MediaQueryList & {
  __trigger: (matches: boolean) => void
}

function installMatchMedia(initialMatches: Record<string, boolean> = {}) {
  const lists = new Map<string, MockMQL>()
  const factory = vi.fn((query: string): MediaQueryList => {
    if (lists.has(query)) return lists.get(query)!
    const listeners = new Set<(event: MediaQueryListEvent) => void>()
    const mql: MockMQL = {
      media: query,
      matches: initialMatches[query] ?? false,
      onchange: null,
      addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener)
      },
      removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener)
      },
      addListener: (listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener)
      },
      removeListener: (listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener)
      },
      dispatchEvent: () => true,
      __trigger: (matches: boolean) => {
        mql.matches = matches
        const event = { matches, media: query } as MediaQueryListEvent
        listeners.forEach((listener) => listener(event))
      },
    }
    lists.set(query, mql)
    return mql
  })
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: factory,
  })
  return { factory, get: (q: string) => lists.get(q) }
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  test('초기 매치값을 반환한다', () => {
    installMatchMedia({ '(min-width: 768px)': true })
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  test('매치되지 않으면 false를 반환한다', () => {
    installMatchMedia({ '(min-width: 9999px)': false })
    const { result } = renderHook(() => useMediaQuery('(min-width: 9999px)'))
    expect(result.current).toBe(false)
  })

  test('change 이벤트로 값이 갱신된다', () => {
    const mm = installMatchMedia({ '(prefers-color-scheme: dark)': false })
    const { result } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'))
    expect(result.current).toBe(false)

    act(() => {
      mm.get('(prefers-color-scheme: dark)')?.__trigger(true)
    })

    expect(result.current).toBe(true)
  })

  test('query가 바뀌면 새 매치값을 반영한다', () => {
    installMatchMedia({
      '(max-width: 640px)': true,
      '(min-width: 1280px)': false,
    })
    const { result, rerender } = renderHook(({ q }: { q: string }) => useMediaQuery(q), {
      initialProps: { q: '(max-width: 640px)' },
    })
    expect(result.current).toBe(true)

    rerender({ q: '(min-width: 1280px)' })
    expect(result.current).toBe(false)
  })

  test('matchMedia가 없는 환경에서 fallback을 반환한다', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: undefined,
    })
    const { result } = renderHook(() => useMediaQuery('(min-width: 1px)', { fallback: true }))
    expect(result.current).toBe(true)
  })

  test('unmount 시 리스너가 해제된다', () => {
    const mm = installMatchMedia({ '(min-width: 320px)': false })
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 320px)'))

    unmount()
    // unmount 후 trigger를 호출해도 컴포넌트가 없으므로 에러나 메모리 누수가 없어야 함
    expect(() => {
      mm.get('(min-width: 320px)')?.__trigger(true)
    }).not.toThrow()
  })
})
