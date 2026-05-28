import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useObjectUrl } from './useObjectUrl'

describe('useObjectUrl', () => {
  beforeEach(() => {
    // jsdom does not implement URL.createObjectURL — define mocks manually
    URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url')
    URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('blob이 null이면 null을 반환한다', () => {
    const { result } = renderHook(() => useObjectUrl(null))
    expect(result.current).toBeNull()
  })

  test('Blob이 전달되면 Object URL을 생성해 반환한다', () => {
    const blob = new Blob(['hello'], { type: 'text/plain' })
    const { result } = renderHook(() => useObjectUrl(blob))

    expect(URL.createObjectURL).toHaveBeenCalledWith(blob)
    expect(result.current).toBe('blob:mock-url')
  })

  test('unmount 시 Object URL이 해제(revoke)된다', () => {
    const blob = new Blob(['hello'], { type: 'text/plain' })
    const { unmount } = renderHook(() => useObjectUrl(blob))

    unmount()

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
  })
})
