import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { cleanup } from '../../test-utils'

import { useReadingProgress } from './useReadingProgress'

describe('useReadingProgress', () => {
  afterEach(() => {
    cleanup()
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
