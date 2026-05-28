import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWindowFocus } from './useWindowFocus'

describe('useWindowFocus', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('document.hasFocus()가 true이면 초기값이 true이다', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true)
    const { result } = renderHook(() => useWindowFocus())
    expect(result.current).toBe(true)
  })

  it('focus 이벤트가 발생하면 true로 갱신된다', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(false)
    const { result } = renderHook(() => useWindowFocus())
    expect(result.current).toBe(false)

    act(() => {
      window.dispatchEvent(new Event('focus'))
    })

    expect(result.current).toBe(true)
  })

  it('blur 이벤트가 발생하면 false로 갱신된다', () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true)
    const { result } = renderHook(() => useWindowFocus())
    expect(result.current).toBe(true)

    act(() => {
      window.dispatchEvent(new Event('blur'))
    })

    expect(result.current).toBe(false)
  })
})
