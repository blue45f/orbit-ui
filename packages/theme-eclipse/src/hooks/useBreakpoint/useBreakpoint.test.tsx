import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useBreakpoint } from './useBreakpoint'

type MockMQL = {
  matches: boolean
  media: string
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
}

function installMatchMedia(matchesMap: Record<string, boolean> = {}) {
  const factory = vi.fn((query: string): MockMQL => ({
    matches: matchesMap[query] ?? false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: factory,
  })
  return factory
}

describe('useBreakpoint', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  test('matchMedia가 없는 SSR 환경에서 xs를 반환한다', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: undefined,
    })
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.breakpoint).toBe('xs')
    expect(result.current.isXs).toBe(true)
  })

  test('matchMedia 결과에 따라 올바른 브레이크포인트를 반환한다', () => {
    // md: 768px 이상이지만 1024px 미만
    installMatchMedia({
      '(min-width: 1536px)': false,
      '(min-width: 1280px)': false,
      '(min-width: 1024px)': false,
      '(min-width: 768px)': true,
      '(min-width: 640px)': true,
    })

    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.breakpoint).toBe('md')
    expect(result.current.isMd).toBe(true)
    expect(result.current.isSm).toBe(false)
  })

  test('isAtLeast / isAtMost 가 올바르게 동작한다', () => {
    // lg: 1024px 이상이지만 1280px 미만
    installMatchMedia({
      '(min-width: 1536px)': false,
      '(min-width: 1280px)': false,
      '(min-width: 1024px)': true,
      '(min-width: 768px)': true,
      '(min-width: 640px)': true,
    })

    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.breakpoint).toBe('lg')

    expect(result.current.isAtLeast('xs')).toBe(true)
    expect(result.current.isAtLeast('sm')).toBe(true)
    expect(result.current.isAtLeast('md')).toBe(true)
    expect(result.current.isAtLeast('lg')).toBe(true)
    expect(result.current.isAtLeast('xl')).toBe(false)
    expect(result.current.isAtLeast('2xl')).toBe(false)

    expect(result.current.isAtMost('2xl')).toBe(true)
    expect(result.current.isAtMost('xl')).toBe(true)
    expect(result.current.isAtMost('lg')).toBe(true)
    expect(result.current.isAtMost('md')).toBe(false)
    expect(result.current.isAtMost('sm')).toBe(false)
  })

  test('resize 이벤트 발생 시 브레이크포인트가 갱신된다', () => {
    // 처음에는 sm (640px 이상)
    const matchesMap: Record<string, boolean> = {
      '(min-width: 1536px)': false,
      '(min-width: 1280px)': false,
      '(min-width: 1024px)': false,
      '(min-width: 768px)': false,
      '(min-width: 640px)': true,
    }
    installMatchMedia(matchesMap)

    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.breakpoint).toBe('sm')

    // 뷰포트 확장 — xl 로 변경
    matchesMap['(min-width: 1536px)'] = false
    matchesMap['(min-width: 1280px)'] = true
    matchesMap['(min-width: 1024px)'] = true
    matchesMap['(min-width: 768px)'] = true
    matchesMap['(min-width: 640px)'] = true

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.breakpoint).toBe('xl')
  })

  test('unmount 시 resize 이벤트 리스너가 제거된다', () => {
    installMatchMedia({
      '(min-width: 1536px)': false,
      '(min-width: 1280px)': false,
      '(min-width: 1024px)': false,
      '(min-width: 768px)': false,
      '(min-width: 640px)': false,
    })

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useBreakpoint())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})
