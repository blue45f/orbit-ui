import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useFullscreen } from './useFullscreen'

describe('useFullscreen', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('초기 isFullscreen은 false이다', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useFullscreen(ref))
    expect(result.current.isFullscreen).toBe(false)
  })

  it('document.fullscreenElement가 있으면 supported가 true이다', () => {
    // jsdom에서 fullscreenElement는 존재하므로 supported는 true
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useFullscreen(ref))
    expect(result.current.supported).toBe('fullscreenElement' in document)
  })

  it('fullscreenchange 이벤트 발생 시 isFullscreen이 갱신된다', () => {
    const el = document.createElement('div')
    const ref = { current: el }

    // fullscreenElement를 el로 mock
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => el,
    })

    const { result } = renderHook(() => useFullscreen(ref))

    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'))
    })

    expect(result.current.isFullscreen).toBe(true)

    // fullscreenElement를 null로 복원
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => null,
    })

    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'))
    })

    expect(result.current.isFullscreen).toBe(false)
  })
})
