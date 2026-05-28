import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useBattery } from './useBattery'

const setNavigatorGetBattery = (
  getBattery: undefined | (() => Promise<{
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
})
