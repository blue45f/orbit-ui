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

  it('enter()를 호출하면 ref.current에서 requestFullscreen을 호출한다', async () => {
    const requestFullscreenSpy = vi.fn().mockResolvedValue(undefined)

    const el = document.createElement('div')
    Object.defineProperty(el, 'requestFullscreen', {
      value: requestFullscreenSpy,
      configurable: true,
    })

    const ref = { current: el }
    const { result } = renderHook(() => useFullscreen(ref))

    await act(async () => {
      await result.current.enter()
    })

    expect(requestFullscreenSpy).toHaveBeenCalled()
  })

  it('enter()는 ref.current가 null이면 실행하지 않는다', async () => {
    const ref = { current: null }
    const { result } = renderHook(() => useFullscreen(ref))

    await act(async () => {
      await result.current.enter()
    })
  })

  it('exit()를 호출하면 document.exitFullscreen을 호출한다', async () => {
    const exitFullscreenSpy = vi.fn().mockResolvedValue(undefined)

    const el = document.createElement('div')
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => el,
    })
    Object.defineProperty(document, 'exitFullscreen', {
      value: exitFullscreenSpy,
      configurable: true,
    })

    const ref = { current: el }
    const { result } = renderHook(() => useFullscreen(ref))

    await act(async () => {
      await result.current.exit()
    })

    expect(exitFullscreenSpy).toHaveBeenCalled()
  })

  it('exit()는 fullscreenElement가 없으면 exitFullscreen을 호출하지 않는다', async () => {
    const exitFullscreenSpy = vi.fn()

    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => null,
    })
    Object.defineProperty(document, 'exitFullscreen', {
      value: exitFullscreenSpy,
      configurable: true,
    })

    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useFullscreen(ref))

    await act(async () => {
      await result.current.exit()
    })

    expect(exitFullscreenSpy).not.toHaveBeenCalled()
  })

  it('toggle()은 isFullscreen이 false일 때 enter()를 호출한다', async () => {
    const requestFullscreenSpy = vi.fn().mockResolvedValue(undefined)

    const el = document.createElement('div')
    Object.defineProperty(el, 'requestFullscreen', {
      value: requestFullscreenSpy,
      configurable: true,
    })

    const ref = { current: el }
    const { result } = renderHook(() => useFullscreen(ref))

    expect(result.current.isFullscreen).toBe(false)

    await act(async () => {
      await result.current.toggle()
    })

    expect(requestFullscreenSpy).toHaveBeenCalled()
  })

  it('toggle()은 isFullscreen이 true일 때 exit()를 호출한다', async () => {
    const exitFullscreenSpy = vi.fn().mockResolvedValue(undefined)

    const el = document.createElement('div')
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => el,
    })
    Object.defineProperty(document, 'exitFullscreen', {
      value: exitFullscreenSpy,
      configurable: true,
    })

    const ref = { current: el }
    const { result } = renderHook(() => useFullscreen(ref))

    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'))
    })

    expect(result.current.isFullscreen).toBe(true)

    await act(async () => {
      await result.current.toggle()
    })

    expect(exitFullscreenSpy).toHaveBeenCalled()
  })
})
