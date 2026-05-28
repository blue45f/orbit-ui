import { renderHook } from '@testing-library/react'
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

    const { result } = renderHook(() =>
      useCssVariable('--color-primary', nullRef),
    )
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
})
