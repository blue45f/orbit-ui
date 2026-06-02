import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useCssVariable } from './useCssVariable'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('useCssVariable', () => {
  it('returns empty string when element ref is null', () => {
    const nullRef = { current: null }
    vi.spyOn(global, 'getComputedStyle').mockReturnValue({
      getPropertyValue: vi.fn().mockReturnValue(''),
    } as unknown as CSSStyleDeclaration)

    const { result } = renderHook(() => useCssVariable('--color-primary', nullRef))
    expect(result.current[0]).toBe('')
  })

  it('reads the CSS variable from the element', () => {
    const mockGetPropertyValue = vi.fn().mockReturnValue(' #ff0000 ')
    vi.spyOn(global, 'getComputedStyle').mockReturnValue({
      getPropertyValue: mockGetPropertyValue,
    } as unknown as CSSStyleDeclaration)

    const { result } = renderHook(() => useCssVariable('--color-primary'))

    expect(mockGetPropertyValue).toHaveBeenCalledWith('--color-primary')
    expect(result.current[0]).toBe('#ff0000')
  })

  it('setProperty writes to the element style and updates the value', () => {
    const el = document.createElement('div')
    const ref = { current: el }

    const { result } = renderHook(() => useCssVariable('--gap', ref))

    act(() => {
      result.current[1]('8px')
    })

    expect(el.style.getPropertyValue('--gap')).toBe('8px')
    expect(result.current[0]).toBe('8px')
  })

  it('setProperty is a no-op when the ref is null', () => {
    const ref: { current: HTMLElement | null } = { current: null }
    const { result } = renderHook(() => useCssVariable('--gap', ref))

    act(() => {
      result.current[1]('8px')
    })

    // ref가 비어 있으면 throw 없이 무시되고 값은 그대로
    expect(result.current[0]).toBe('')
  })
})
