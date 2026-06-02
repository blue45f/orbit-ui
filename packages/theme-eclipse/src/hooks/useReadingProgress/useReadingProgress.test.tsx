import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useReadingProgress } from './useReadingProgress'

describe('useReadingProgress', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    // 테스트가 documentElement에 정의한 own 속성과 scrollY를 복원해
    // isolate:false 환경에서 다른 테스트 파일로 DOM 상태가 누수되는 것을 막는다.
    // own 속성 삭제 시 prototype getter(jsdom 기본값 0)로 되돌아간다.
    // @ts-expect-error 테스트가 정의한 own 속성 제거
    delete document.documentElement.scrollHeight
    // @ts-expect-error 테스트가 정의한 own 속성 제거
    delete document.documentElement.clientHeight
    // isolate:false 환경에서 다른 테스트가 scrollY를 getter로 재정의해도 확실히 덮어쓰도록 defineProperty 사용
    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 0 })
  })

  it('returns 0 initially', () => {
    const { result } = renderHook(() => useReadingProgress())
    expect(result.current).toBe(0)
  })

  it('returns a number between 0 and 100', () => {
    const { result } = renderHook(() => useReadingProgress())
    expect(result.current).toBeGreaterThanOrEqual(0)
    expect(result.current).toBeLessThanOrEqual(100)
  })

  it('returns 0 when scroll is at top', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 1000,
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 500,
    })
    // isolate:false 환경에서 다른 테스트가 scrollY를 getter로 재정의해도 확실히 덮어쓰도록 defineProperty 사용
    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 0 })

    const { result } = renderHook(() => useReadingProgress())
    expect(result.current).toBe(0)
  })

  it('window 스크롤 위치에 따라 진행률을 계산한다', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 1
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 500,
    })
    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 300 })

    const { result } = renderHook(() => useReadingProgress())
    // 300 / (2000 - 500) * 100 = 20
    expect(result.current).toBe(20)
  })

  it('container ref 경로로 진행률을 계산한다', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 1
    })
    const el = document.createElement('div')
    Object.defineProperty(el, 'scrollHeight', { configurable: true, value: 1000 })
    Object.defineProperty(el, 'clientHeight', { configurable: true, value: 200 })
    Object.defineProperty(el, 'scrollTop', { configurable: true, value: 400 })

    const { result } = renderHook(() => useReadingProgress({ current: el }))
    // 400 / (1000 - 200) * 100 = 50
    expect(result.current).toBe(50)
  })

  it('unmount 시 scroll 리스너를 제거한다', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useReadingProgress())

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
