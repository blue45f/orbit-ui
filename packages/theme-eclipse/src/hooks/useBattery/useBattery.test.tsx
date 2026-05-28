import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useBattery } from './useBattery'

describe('useBattery', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('getBattery가 없으면 supported:false, loading:false를 반환한다', () => {
    // Ensure getBattery is not present
    const originalGetBattery = (navigator as { getBattery?: unknown }).getBattery
    delete (navigator as { getBattery?: unknown }).getBattery

    const { result } = renderHook(() => useBattery())
    expect(result.current.supported).toBe(false)
    expect(result.current.loading).toBe(false)

    if (originalGetBattery !== undefined) {
      ;(navigator as { getBattery?: unknown }).getBattery = originalGetBattery
    }
  })

  it('getBattery가 있으면 supported:true, loading:true로 시작한다', () => {
    // Mock getBattery to return a never-resolving promise so loading stays true
    Object.defineProperty(navigator, 'getBattery', {
      configurable: true,
      value: () => new Promise(() => {}),
    })

    const { result } = renderHook(() => useBattery())
    expect(result.current.supported).toBe(true)
    expect(result.current.loading).toBe(true)

    // Restore
    Object.defineProperty(navigator, 'getBattery', {
      configurable: true,
      value: undefined,
    })
  })

  it('getBattery가 resolve되면 배터리 상태가 갱신된다', async () => {
    const mockBattery = {
      level: 0.75,
      charging: false,
      chargingTime: 0,
      dischargingTime: 7200,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }

    Object.defineProperty(navigator, 'getBattery', {
      configurable: true,
      value: () => Promise.resolve(mockBattery),
    })

    const { result } = renderHook(() => useBattery())

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.supported).toBe(true)
    expect(result.current.loading).toBe(false)
    expect(result.current.level).toBe(0.75)
    expect(result.current.charging).toBe(false)

    // Restore
    Object.defineProperty(navigator, 'getBattery', {
      configurable: true,
      value: undefined,
    })
  })
})
