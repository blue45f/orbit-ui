import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useHash } from './useHash'

describe('useHash', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    // Reset hash after each test
    window.location.hash = ''
  })

  test('initial hash is empty string when location.hash is empty', () => {
    window.location.hash = ''
    const { result } = renderHook(() => useHash())
    expect(result.current.hash).toBe('')
  })

  test('returns current location.hash on init', () => {
    window.location.hash = '#section-1'
    const { result } = renderHook(() => useHash())
    expect(result.current.hash).toBe('#section-1')
  })

  test('setHash updates location.hash', () => {
    window.location.hash = ''
    const { result } = renderHook(() => useHash())

    act(() => {
      result.current.setHash('#new-section')
    })

    expect(window.location.hash).toBe('#new-section')
  })

  test('state updates on hashchange event', () => {
    window.location.hash = ''
    const { result } = renderHook(() => useHash())

    act(() => {
      window.location.hash = '#updated'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(result.current.hash).toBe('#updated')
  })

  test('cleans up hashchange listener on unmount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useHash())

    const addedHashChange = addSpy.mock.calls.filter(([type]) => type === 'hashchange')
    expect(addedHashChange).toHaveLength(1)

    unmount()

    const removedHashChange = removeSpy.mock.calls.filter(([type]) => type === 'hashchange')
    expect(removedHashChange).toHaveLength(1)
  })
})
