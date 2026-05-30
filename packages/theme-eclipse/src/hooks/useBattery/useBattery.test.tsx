import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useBattery } from './useBattery'

const setNavigatorGetBattery = (
  getBattery:
    | undefined
    | (() => Promise<{
        level: number
        charging: boolean
        chargingTime: number
        dischargingTime: number
        addEventListener: ReturnType<typeof vi.fn>
        removeEventListener: ReturnType<typeof vi.fn>
        dispatchEvent: ReturnType<typeof vi.fn>
      }>)
) => {
  const baseNavigator = navigator as unknown as Record<string, unknown>
  const nextNavigator: Record<string, unknown> = { ...baseNavigator }

  if (getBattery) {
    nextNavigator.getBattery = getBattery
  } else {
    delete nextNavigator.getBattery
  }

  vi.stubGlobal('navigator', nextNavigator as unknown as Navigator)
}

describe('useBattery', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('getBattery가 없으면 supported:false, loading:false를 반환한다', () => {
    setNavigatorGetBattery(undefined)

    const { result } = renderHook(() => useBattery())
    expect(result.current.supported).toBe(false)
    expect(result.current.loading).toBe(false)
  })

  it('getBattery가 있으면 supported:true, loading:true로 시작한다', () => {
    setNavigatorGetBattery(() => new Promise(() => {}))

    const { result } = renderHook(() => useBattery())
    expect(result.current.supported).toBe(true)
    expect(result.current.loading).toBe(true)
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

    setNavigatorGetBattery(() => Promise.resolve(mockBattery))

    const { result } = renderHook(() => useBattery())

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.supported).toBe(true)
    expect(result.current.loading).toBe(false)
    expect(result.current.level).toBe(0.75)
    expect(result.current.charging).toBe(false)
  })

  it('levelchange 이벤트 발생 시 배터리 level이 갱신된다', async () => {
    let addEventListenerFn: (() => void) | null = null
    const mockBattery = {
      level: 0.5,
      charging: false,
      chargingTime: 0,
      dischargingTime: 7200,
      addEventListener: vi.fn(function (event: string, cb: () => void) {
        if (event === 'levelchange') {
          addEventListenerFn = cb
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }

    setNavigatorGetBattery(() => Promise.resolve(mockBattery))

    const { result } = renderHook(() => useBattery())

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.level).toBe(0.5)

    // levelchange 이벤트 시뮬레이션
    await act(async () => {
      mockBattery.level = 0.8
      addEventListenerFn?.()
    })

    expect(result.current.level).toBe(0.8)
  })

  it('chargingchange 이벤트 발생 시 배터리 charging 상태가 갱신된다', async () => {
    let chargingChangeListener: (() => void) | null = null
    const mockBattery = {
      level: 0.75,
      charging: false,
      chargingTime: 0,
      dischargingTime: 7200,
      addEventListener: vi.fn(function (event: string, cb: () => void) {
        if (event === 'chargingchange') {
          chargingChangeListener = cb
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }

    setNavigatorGetBattery(() => Promise.resolve(mockBattery))

    const { result } = renderHook(() => useBattery())

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.charging).toBe(false)

    // chargingchange 이벤트 시뮬레이션
    await act(async () => {
      mockBattery.charging = true
      mockBattery.chargingTime = 3600
      chargingChangeListener?.()
    })

    expect(result.current.charging).toBe(true)
    expect(result.current.chargingTime).toBe(3600)
  })

  it('getBattery promise가 reject되면 상태는 유지된다', async () => {
    setNavigatorGetBattery(() => Promise.reject(new Error('Battery API unavailable')))

    const { result } = renderHook(() => useBattery())

    await act(async () => {
      await Promise.resolve()
    })

    // 실패해도 supported는 true로 유지
    expect(result.current.supported).toBe(true)
    // catch가 로딩을 종료한다 (unhandled rejection 없이)
    expect(result.current.loading).toBe(false)
  })
})
