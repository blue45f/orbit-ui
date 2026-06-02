import { useEffect, useState } from 'react'

import { useDeepCompareMemoize } from '../_internal/useDeepCompareMemoize'

export type UseGeolocationState = {
  loading: boolean
  error: GeolocationPositionError | null
  coords: {
    latitude: number
    longitude: number
    accuracy: number
    altitude: number | null
    altitudeAccuracy: number | null
    heading: number | null
    speed: number | null
  } | null
  timestamp: number | null
}

export type UseGeolocationOptions = PositionOptions

/**
 * 브라우저 Geolocation API를 구독해 현재 위치 정보를 반환합니다.
 *
 * `watchPosition`으로 실시간 위치 변경을 수신하며, unmount 시 자동으로
 * 구독을 해제합니다. SSR 환경(navigator.geolocation 미지원)에서는
 * loading: false, coords: null 상태를 즉시 반환합니다.
 *
 * @param options - 표준 PositionOptions (enableHighAccuracy, timeout, maximumAge)
 *
 * @example
 * ```tsx
 * const { loading, error, coords } = useGeolocation({ enableHighAccuracy: true })
 *
 * if (loading) return <Spinner />
 * if (error) return <Banner>{error.message}</Banner>
 * return <Map lat={coords!.latitude} lng={coords!.longitude} />
 * ```
 */
export function useGeolocation(options?: UseGeolocationOptions): UseGeolocationState {
  const isSupported =
    typeof navigator !== 'undefined' && typeof navigator.geolocation !== 'undefined'

  const [state, setState] = useState<UseGeolocationState>(() => ({
    loading: isSupported,
    error: null,
    coords: null,
    timestamp: null,
  }))

  // Deep-compare options so object-identity changes don't cause unnecessary re-subscribes
  const memoizedOptions = useDeepCompareMemoize(options)

  useEffect(() => {
    if (!isSupported) return

    const onSuccess = (position: GeolocationPosition) => {
      const { coords, timestamp } = position
      setState({
        loading: false,
        error: null,
        coords: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          altitude: coords.altitude,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed,
        },
        timestamp,
      })
    }

    const onError = (error: GeolocationPositionError) => {
      setState({
        loading: false,
        error,
        coords: null,
        timestamp: null,
      })
    }

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, memoizedOptions)

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [isSupported, memoizedOptions])

  return state
}
