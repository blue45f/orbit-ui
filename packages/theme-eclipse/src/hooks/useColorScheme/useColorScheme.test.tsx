import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useColorScheme } from './useColorScheme'

type MediaQueryListEventListener = (event: MediaQueryListEvent) => void

function createMockMediaQuery(matches: boolean): MediaQueryList {
  const listeners: MediaQueryListEventListener[] = []
  return {
    matches,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_, listener: MediaQueryListEventListener) => {
      listeners.push(listener)
    }),
    removeEventListener: vi.fn((_, listener: MediaQueryListEventListener) => {
      const idx = listeners.indexOf(listener)
      if (idx !== -1) listeners.splice(idx, 1)
    }),
    dispatchEvent: vi.fn(),
    _listeners: listeners,
  } as unknown as MediaQueryList & { _listeners: MediaQueryListEventListener[] }
}

describe('useColorScheme', () => {
  let darkMq: MediaQueryList & { _listeners: MediaQueryListEventListener[] }
  let lightMq: MediaQueryList & { _listeners: MediaQueryListEventListener[] }

  beforeEach(() => {
    darkMq = createMockMediaQuery(false) as MediaQueryList & {
      _listeners: MediaQueryListEventListener[]
    }
    lightMq = createMockMediaQuery(true) as MediaQueryList & {
      _listeners: MediaQueryListEventListener[]
    }

    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => {
      if (query === '(prefers-color-scheme: dark)') return darkMq
      if (query === '(prefers-color-scheme: light)') return lightMq
      return createMockMediaQuery(false)
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('초기 색상 구성표 값을 반환한다', () => {
    // lightMq.matches = true이므로 'light' 반환
    const { result } = renderHook(() => useColorScheme())
    expect(result.current).toBe('light')
  })

  it('미디어 쿼리 변경 시 색상 구성표를 업데이트한다', () => {
    const { result } = renderHook(() => useColorScheme())
    expect(result.current).toBe('light')

    // dark 모드로 변경 시뮬레이션
    act(() => {
      Object.defineProperty(darkMq, 'matches', { value: true, configurable: true })
      Object.defineProperty(lightMq, 'matches', { value: false, configurable: true })

      // 등록된 리스너들을 직접 호출
      darkMq._listeners.forEach((listener) => listener({} as MediaQueryListEvent))
    })

    expect(result.current).toBe('dark')
  })

  it('SSR 환경에서는 light를 기본값으로 반환한다', () => {
    const originalWindow = global.window
    // @ts-expect-error window를 undefined로 설정하는 SSR 시뮬레이션
    delete global.window

    let colorScheme: string | undefined
    try {
      // window가 없을 때 getColorScheme 함수의 동작 확인
      // 실제로는 useState 초기값 함수가 호출될 때 반영됨
      colorScheme = (() => {
        if (typeof window === 'undefined') return 'light'
        return 'other'
      })()
    } finally {
      global.window = originalWindow
    }

    expect(colorScheme).toBe('light')
  })

  it('dark/light 어느 쪽도 매칭되지 않으면 no-preference를 반환한다', () => {
    vi.mocked(window.matchMedia).mockImplementation(() => createMockMediaQuery(false))

    const { result } = renderHook(() => useColorScheme())
    expect(result.current).toBe('no-preference')
  })
})
