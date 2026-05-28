import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import type { NetworkEffectiveType } from './useNetwork'
import { useNetwork } from './useNetwork'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeMockConnection = () => {
  const mockAddEventListener = vi.fn()
  const mockRemoveEventListener = vi.fn()
  const mockConnection: {
    effectiveType: NetworkEffectiveType
    downlink: number
    rtt: number
    saveData: boolean
    addEventListener: typeof mockAddEventListener
    removeEventListener: typeof mockRemoveEventListener
  } = {
    effectiveType: '4g',
    downlink: 10,
    rtt: 50,
    saveData: false,
    addEventListener: mockAddEventListener,
    removeEventListener: mockRemoveEventListener,
  }
  return { mockConnection, mockAddEventListener, mockRemoveEventListener }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useNetwork', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  test('returns supported: false when navigator.connection is undefined', () => {
    vi.stubGlobal('navigator', { onLine: true })

    const { result } = renderHook(() => useNetwork())

    expect(result.current.supported).toBe(false)
    expect(result.current.effectiveType).toBeNull()
    expect(result.current.downlink).toBeNull()
    expect(result.current.rtt).toBeNull()
    expect(result.current.saveData).toBeNull()
  })

  test('returns online from navigator.onLine', () => {
    vi.stubGlobal('navigator', { onLine: false })

    const { result } = renderHook(() => useNetwork())

    expect(result.current.online).toBe(false)
  })

  test('reads effectiveType, downlink, rtt, saveData from connection object', () => {
    const { mockConnection } = makeMockConnection()
    vi.stubGlobal('navigator', { onLine: true, connection: mockConnection })

    const { result } = renderHook(() => useNetwork())

    expect(result.current.supported).toBe(true)
    expect(result.current.effectiveType).toBe('4g')
    expect(result.current.downlink).toBe(10)
    expect(result.current.rtt).toBe(50)
    expect(result.current.saveData).toBe(false)
  })

  test('updates state on connection change event', () => {
    const { mockConnection, mockAddEventListener } = makeMockConnection()
    vi.stubGlobal('navigator', { onLine: true, connection: mockConnection })

    const { result } = renderHook(() => useNetwork())

    expect(result.current.effectiveType).toBe('4g')

    // Simulate network degradation
    mockConnection.effectiveType = '2g'
    mockConnection.downlink = 0.5
    mockConnection.rtt = 500

    act(() => {
      // Find the 'change' listener and invoke it
      const [, listener] = mockAddEventListener.mock.calls.find(([type]) => type === 'change') ?? []
      listener?.()
    })

    expect(result.current.effectiveType).toBe('2g')
    expect(result.current.downlink).toBe(0.5)
    expect(result.current.rtt).toBe(500)
  })

  test('updates online to true on window online event', () => {
    const { mockConnection } = makeMockConnection()
    vi.stubGlobal('navigator', { onLine: false, connection: mockConnection })

    const { result } = renderHook(() => useNetwork())

    expect(result.current.online).toBe(false)

    act(() => {
      window.dispatchEvent(new Event('online'))
    })

    expect(result.current.online).toBe(true)
  })

  test('updates online to false on window offline event', () => {
    const { mockConnection } = makeMockConnection()
    vi.stubGlobal('navigator', { onLine: true, connection: mockConnection })

    const { result } = renderHook(() => useNetwork())

    expect(result.current.online).toBe(true)

    act(() => {
      window.dispatchEvent(new Event('offline'))
    })

    expect(result.current.online).toBe(false)
  })

  test('cleans up connection and window listeners on unmount', () => {
    const { mockConnection, mockRemoveEventListener } = makeMockConnection()
    vi.stubGlobal('navigator', { onLine: true, connection: mockConnection })

    const removeWindowSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useNetwork())

    unmount()

    // connection.removeEventListener should have been called with 'change'
    expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    // window.removeEventListener should have been called for both 'online' and 'offline'
    const removedTypes = removeWindowSpy.mock.calls.map(([type]) => type)
    expect(removedTypes).toContain('online')
    expect(removedTypes).toContain('offline')
  })
})
