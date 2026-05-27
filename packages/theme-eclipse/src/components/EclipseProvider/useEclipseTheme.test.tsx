import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { EclipseProvider } from './EclipseProvider'
import { useEclipseTheme } from './useEclipseTheme'

describe('useEclipseTheme', () => {
  afterEach(() => cleanup())

  test('Provider 외부에서 호출하면 명시적 에러를 던진다', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => renderHook(() => useEclipseTheme())).toThrow(
      /useEclipseTheme must be called inside an <EclipseProvider>/,
    )

    consoleError.mockRestore()
  })

  test('기본값(light · mobile · medium)을 노출한다', () => {
    const { result } = renderHook(() => useEclipseTheme(), {
      wrapper: ({ children }) => <EclipseProvider>{children}</EclipseProvider>,
    })

    expect(result.current).toEqual({
      mode: 'light',
      platform: 'mobile',
      baseTextSize: 'medium',
    })
  })

  test('mode=dark가 컨텍스트에 반영된다', () => {
    const { result } = renderHook(() => useEclipseTheme(), {
      wrapper: ({ children }) => <EclipseProvider mode="dark">{children}</EclipseProvider>,
    })

    expect(result.current.mode).toBe('dark')
  })

  test('platform=pc가 컨텍스트에 반영된다', () => {
    const { result } = renderHook(() => useEclipseTheme(), {
      wrapper: ({ children }) => (
        <EclipseProvider platform="pc">{children}</EclipseProvider>
      ),
    })

    expect(result.current.platform).toBe('pc')
  })

  test('baseTextSize=large가 컨텍스트에 반영된다', () => {
    const { result } = renderHook(() => useEclipseTheme(), {
      wrapper: ({ children }) => (
        <EclipseProvider baseTextSize="large">{children}</EclipseProvider>
      ),
    })

    expect(result.current.baseTextSize).toBe('large')
  })

  test('Provider mode prop이 다른 두 인스턴스는 독립적으로 컨텍스트를 노출한다', () => {
    const { result: light } = renderHook(() => useEclipseTheme(), {
      wrapper: ({ children }) => <EclipseProvider mode="light">{children}</EclipseProvider>,
    })
    const { result: dark } = renderHook(() => useEclipseTheme(), {
      wrapper: ({ children }) => <EclipseProvider mode="dark">{children}</EclipseProvider>,
    })

    expect(light.current.mode).toBe('light')
    expect(dark.current.mode).toBe('dark')
  })

  test('같은 props로 rerender 시 같은 객체 reference가 유지된다 (memo)', () => {
    const { result, rerender } = renderHook(() => useEclipseTheme(), {
      wrapper: ({ children }) => (
        <EclipseProvider mode="light" platform="pc" baseTextSize="medium">
          {children}
        </EclipseProvider>
      ),
    })

    const firstRef = result.current
    rerender()
    expect(result.current).toBe(firstRef)
  })
})
