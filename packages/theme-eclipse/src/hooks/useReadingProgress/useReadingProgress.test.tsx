import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { cleanup } from '../../test-utils'

import { useReadingProgress } from './useReadingProgress'

describe('useReadingProgress', () => {
  afterEach(() => {
    cleanup()
    // 테스트가 documentElement에 정의한 own 속성과 scrollY를 복원해
    // isolate:false 환경에서 다른 테스트 파일로 DOM 상태가 누수되는 것을 막는다.
    // own 속성 삭제 시 prototype getter(jsdom 기본값 0)로 되돌아간다.
    // @ts-expect-error 테스트가 정의한 own 속성 제거
    delete document.documentElement.scrollHeight
    // @ts-expect-error 테스트가 정의한 own 속성 제거
    delete document.documentElement.clientHeight
    window.scrollY = 0
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
    window.scrollY = 0

    const { result } = renderHook(() => useReadingProgress())
    expect(result.current).toBe(0)
  })
})
