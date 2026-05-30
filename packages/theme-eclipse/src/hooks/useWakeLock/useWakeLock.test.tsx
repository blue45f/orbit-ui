import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWakeLock } from './useWakeLock'

const setNavigatorWakeLock = (
  wakeLock:
    | undefined
    | {
        request: () => Promise<{
          addEventListener: () => void
          release: () => Promise<void>
        }>
      }
) => {
  const baseNavigator = navigator as unknown as Record<string, unknown>
  const nextNavigator: Record<string, unknown> = { ...baseNavigator }

  if (wakeLock) {
    nextNavigator.wakeLock = wakeLock
  } else {
    delete nextNavigator.wakeLock
  }

  vi.stubGlobal('navigator', nextNavigator as unknown as Navigator)
}

describe('useWakeLock', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('isSupported is false when navigator.wakeLock is absent', () => {
    setNavigatorWakeLock(undefined)

    const { result } = renderHook(() => useWakeLock())
    expect(result.current.isSupported).toBe(false)
  })

  it('isActive starts as false', () => {
    const { result } = renderHook(() => useWakeLock())
    expect(result.current.isActive).toBe(false)
  })

  it('request() is a no-op when wakeLock is unsupported', async () => {
    setNavigatorWakeLock(undefined)

    const { result } = renderHook(() => useWakeLock())
    await act(async () => {
      await result.current.request()
    })

    expect(result.current.isActive).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('request()를 호출하면 navigator.wakeLock.request()를 실행하고 isActive를 true로 설정한다', async () => {
    const mockSentinel = {
      release: vi.fn().mockResolvedValue(undefined),
      addEventListener: vi.fn(),
    }

    setNavigatorWakeLock({
      request: vi.fn().mockResolvedValue(mockSentinel),
    })

    const { result } = renderHook(() => useWakeLock())

    await act(async () => {
      await result.current.request()
    })

    expect(result.current.isActive).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('request()에서 에러 발생 시 error 상태를 갱신한다', async () => {
    const testError = new Error('Wake Lock denied')
    setNavigatorWakeLock({
      request: vi.fn().mockRejectedValue(testError),
    })

    const { result } = renderHook(() => useWakeLock())

    await act(async () => {
      await result.current.request()
    })

    expect(result.current.error).toEqual(testError)
    expect(result.current.isActive).toBe(false)
  })

  it('release()를 호출하면 isActive가 false가 된다', async () => {
    const mockSentinel = {
      release: vi.fn().mockResolvedValue(undefined),
      addEventListener: vi.fn(),
    }

    setNavigatorWakeLock({
      request: vi.fn().mockResolvedValue(mockSentinel),
    })

    const { result } = renderHook(() => useWakeLock())

    await act(async () => {
      await result.current.request()
    })
    expect(result.current.isActive).toBe(true)

    await act(async () => {
      await result.current.release()
    })
    expect(result.current.isActive).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('release()에서 에러 발생 시 error 상태를 갱신한다', async () => {
    const mockSentinel = {
      release: vi.fn().mockRejectedValue(new Error('Release failed')),
      addEventListener: vi.fn(),
    }

    setNavigatorWakeLock({
      request: vi.fn().mockResolvedValue(mockSentinel),
    })

    const { result } = renderHook(() => useWakeLock())

    await act(async () => {
      await result.current.request()
    })

    await act(async () => {
      await result.current.release()
    })

    expect(result.current.error?.message).toBe('Release failed')
  })

  it('sentinel의 release 이벤트 발생 시 isActive가 false가 된다', async () => {
    let releasedCallback: (() => void) | null = null

    const mockSentinel = {
      release: vi.fn().mockResolvedValue(undefined),
      addEventListener: vi.fn((event: string, callback: () => void) => {
        if (event === 'release') {
          releasedCallback = callback
        }
      }),
    }

    setNavigatorWakeLock({
      request: vi.fn().mockResolvedValue(mockSentinel),
    })

    const { result } = renderHook(() => useWakeLock())

    await act(async () => {
      await result.current.request()
    })
    expect(result.current.isActive).toBe(true)

    act(() => {
      releasedCallback?.()
    })

    expect(result.current.isActive).toBe(false)
  })

  it('document의 visibilitychange 이벤트에서 visible 상태일 때 request()를 다시 호출한다', async () => {
    const mockSentinel = {
      release: vi.fn().mockResolvedValue(undefined),
      addEventListener: vi.fn(),
    }

    const requestSpy = vi.fn().mockResolvedValue(mockSentinel)
    setNavigatorWakeLock({
      request: requestSpy,
    })

    const { result } = renderHook(() => useWakeLock())

    await act(async () => {
      await result.current.request()
    })
    expect(requestSpy).toHaveBeenCalledTimes(1)

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    })

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'))
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(requestSpy).toHaveBeenCalledTimes(2)
  })
})
