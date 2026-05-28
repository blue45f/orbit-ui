import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useOs } from './useOs'

describe('useOs', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('Mac OS X UA에서 macos를 감지한다', () => {
    vi.stubGlobal('navigator', {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    })

    const { result } = renderHook(() => useOs())
    expect(result.current).toBe('macos')
  })

  it('iPhone UA에서 ios를 감지한다', () => {
    vi.stubGlobal('navigator', {
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
    })

    const { result } = renderHook(() => useOs())
    expect(result.current).toBe('ios')
  })

  it('Windows UA에서 windows를 감지한다', () => {
    vi.stubGlobal('navigator', {
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    })

    const { result } = renderHook(() => useOs())
    expect(result.current).toBe('windows')
  })

  it('navigator가 undefined이면 undetermined를 반환한다', () => {
    vi.stubGlobal('navigator', undefined)

    const { result } = renderHook(() => useOs())
    expect(result.current).toBe('undetermined')
  })
})
