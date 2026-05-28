import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useGeolocation } from './useGeolocation'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeMockGeolocation = () => {
  const mockWatchPosition = vi.fn()
  const mockClearWatch = vi.fn()
  return { mockWatchPosition, mockClearWatch }
}

const stubGeolocation = (mockWatchPosition: ReturnType<typeof vi.fn>, mockClearWatch: ReturnType<typeof vi.fn>) => {
  vi.stubGlobal('navigator', {
    geolocation: { watchPosition: mockWatchPosition, clearWatch: mockClearWatch },
  })
}

const makePosition = (overrides?: Partial<GeolocationCoordinates>): GeolocationPosition => ({
  coords: {
    latitude: 37.5665,
    longitude: 126.978,
    accuracy: 10,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    toJSON: () => ({}),
    ...overrides,
  } as GeolocationCoordinates,
  timestamp: 1_700_000_000_000,
  toJSON: () => ({}),
})

const makeError = (code = 1, message = 'User denied geolocation'): GeolocationPositionError =>
  ({ code, message, PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 }) as GeolocationPositionError

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useGeolocation', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  test('starts in loading state', () => {
    const { mockWatchPosition, mockClearWatch } = makeMockGeolocation()
    // watchPosition is called but never resolves immediately
    stubGeolocation(mockWatchPosition, mockClearWatch)

    const { result } = renderHook(() => useGeolocation())

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeNull()
    expect(result.current.coords).toBeNull()
    expect(result.current.timestamp).toBeNull()
  })

  test('resolves with coords when watchPosition succeeds', () => {
    const { mockWatchPosition, mockClearWatch } = makeMockGeolocation()
    stubGeolocation(mockWatchPosition, mockClearWatch)

    const { result } = renderHook(() => useGeolocation())

    const position = makePosition()

    act(() => {
      // Invoke the success callback that watchPosition received
      const [successCb] = mockWatchPosition.mock.calls[0]
      successCb(position)
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.timestamp).toBe(position.timestamp)
    expect(result.current.coords).toEqual({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
    })
  })

  test('sets error when watchPosition fails', () => {
    const { mockWatchPosition, mockClearWatch } = makeMockGeolocation()
    stubGeolocation(mockWatchPosition, mockClearWatch)

    const { result } = renderHook(() => useGeolocation())

    const error = makeError()

    act(() => {
      const [, errorCb] = mockWatchPosition.mock.calls[0]
      errorCb(error)
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(error)
    expect(result.current.coords).toBeNull()
    expect(result.current.timestamp).toBeNull()
  })

  test('calls clearWatch on unmount', () => {
    const { mockWatchPosition, mockClearWatch } = makeMockGeolocation()
    const FAKE_WATCH_ID = 42
    mockWatchPosition.mockReturnValue(FAKE_WATCH_ID)
    stubGeolocation(mockWatchPosition, mockClearWatch)

    const { unmount } = renderHook(() => useGeolocation())

    unmount()

    expect(mockClearWatch).toHaveBeenCalledWith(FAKE_WATCH_ID)
  })

  test('SSR-safe: geolocation undefined returns not-loading empty state', () => {
    vi.stubGlobal('navigator', undefined)

    const { result } = renderHook(() => useGeolocation())

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.coords).toBeNull()
    expect(result.current.timestamp).toBeNull()
  })

  test('options are passed to watchPosition', () => {
    const { mockWatchPosition, mockClearWatch } = makeMockGeolocation()
    stubGeolocation(mockWatchPosition, mockClearWatch)

    const options: PositionOptions = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }

    renderHook(() => useGeolocation(options))

    expect(mockWatchPosition).toHaveBeenCalledTimes(1)
    const [, , receivedOptions] = mockWatchPosition.mock.calls[0]
    expect(receivedOptions).toEqual(options)
  })
})
