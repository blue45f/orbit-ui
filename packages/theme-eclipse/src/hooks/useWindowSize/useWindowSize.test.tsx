import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWindowSize } from './useWindowSize'

describe('useWindowSize', () => {
  afterEach(() => cleanup())

  test('초기 windowSize는 window.innerWidth/innerHeight', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 720, configurable: true })

    const { result } = renderHook(() => useWindowSize())

    expect(result.current).toEqual({ width: 1280, height: 720 })
  })

  test('resize 이벤트 발생 시 size가 갱신된다', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true })

    const { result } = renderHook(() => useWindowSize())
    expect(result.current.width).toBe(1024)

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 812, configurable: true })
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toEqual({ width: 375, height: 812 })
  })

  test('orientationchange 이벤트도 size를 갱신한다', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true })

    const { result } = renderHook(() => useWindowSize())

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 600, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
      window.dispatchEvent(new Event('orientationchange'))
    })

    expect(result.current).toEqual({ width: 600, height: 800 })
  })

  test('unmount 후에는 resize에 반응하지 않는다', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })

    const { result, unmount } = renderHook(() => useWindowSize())
    const snapshot = result.current

    unmount()

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 500, configurable: true })
      Object.defineProperty(window, 'innerHeight', { value: 400, configurable: true })
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toEqual(snapshot)
  })
})
