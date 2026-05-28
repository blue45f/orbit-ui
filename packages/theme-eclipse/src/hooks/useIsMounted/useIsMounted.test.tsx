import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useIsMounted } from './useIsMounted'

describe('useIsMounted', () => {
  afterEach(() => cleanup())

  test('마운트 후 current=true', () => {
    const { result } = renderHook(() => useIsMounted())
    expect(result.current.current).toBe(true)
  })

  test('unmount 후 current=false', () => {
    const { result, unmount } = renderHook(() => useIsMounted())
    expect(result.current.current).toBe(true)

    unmount()
    expect(result.current.current).toBe(false)
  })

  test('rerender 시 같은 ref 객체를 반환한다 (referential stability)', () => {
    const { result, rerender } = renderHook(() => useIsMounted())
    const firstRef = result.current

    rerender()
    expect(result.current).toBe(firstRef)
  })
})
