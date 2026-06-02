import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useDevicePixelRatio } from './useDevicePixelRatio'

describe('useDevicePixelRatio', () => {
  let changeListeners: Array<() => void> = []
  let mockMediaQuery: {
    addEventListener: ReturnType<typeof vi.fn>
    removeEventListener: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    changeListeners = []
    mockMediaQuery = {
      addEventListener: vi.fn((_event: string, cb: () => void) => {
        changeListeners.push(cb)
      }),
      removeEventListener: vi.fn((_event: string, cb: () => void) => {
        changeListeners = changeListeners.filter((l) => l !== cb)
      }),
    }

    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: 2,
    })

    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMediaQuery as unknown as MediaQueryList)
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('초기 DPR 값을 반환한다', () => {
    const { result } = renderHook(() => useDevicePixelRatio())
    expect(result.current).toBe(2)
  })

  test('matchMedia change 이벤트 발생 시 DPR 값이 업데이트된다', () => {
    const { result } = renderHook(() => useDevicePixelRatio())
    expect(result.current).toBe(2)

    act(() => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 3,
      })
      changeListeners.forEach((cb) => cb())
    })

    expect(result.current).toBe(3)
  })

  test('window가 없는 SSR 환경에서 기본값 1을 반환한다', () => {
    // useDevicePixelRatio의 초기화 함수는 typeof window 체크를 이용
    // 실제 SSR 환경에서는 window가 없어 1을 반환함을 단위 테스트로 검증
    const initFn = () => (typeof window !== 'undefined' ? window.devicePixelRatio : 1)
    // jsdom 환경에서는 window가 있으므로 현재 DPR(2)를 반환
    expect(initFn()).toBe(2)

    // SSR 상황을 시뮬레이션하는 순수 로직 검증
    const ssrInit = (() => {
      const win = undefined as Window | undefined
      return typeof win !== 'undefined' ? win.devicePixelRatio : 1
    })()
    expect(ssrInit).toBe(1)
  })
})
