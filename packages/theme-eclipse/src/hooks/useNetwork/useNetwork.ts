import { useEffect, useState } from 'react'

export type NetworkEffectiveType = '2g' | '3g' | '4g' | 'slow-2g'

export type UseNetworkState = {
  /** Whether Network Information API is supported in this browser */
  supported: boolean
  /** true if the network is available (navigator.onLine) */
  online: boolean
  /** Effective connection type reported by the browser */
  effectiveType: NetworkEffectiveType | null
  /** Estimated downlink speed in Mbps */
  downlink: number | null
  /** Round-trip time in ms */
  rtt: number | null
  /** Whether the user has enabled data saver mode */
  saveData: boolean | null
}

interface NetworkInformation extends EventTarget {
  effectiveType?: NetworkEffectiveType
  downlink?: number
  rtt?: number
  saveData?: boolean
  addEventListener(type: 'change', listener: () => void): void
  removeEventListener(type: 'change', listener: () => void): void
}

interface ExtendedNavigator extends Navigator {
  connection?: NetworkInformation
  mozConnection?: NetworkInformation
  webkitConnection?: NetworkInformation
}

const getConnection = (): NetworkInformation | null => {
  if (typeof navigator === 'undefined') return null
  const nav = navigator as ExtendedNavigator
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection ?? null
}

const readState = (): UseNetworkState => {
  const connection = getConnection()
  const supported = connection !== null

  return {
    supported,
    online: typeof navigator !== 'undefined' ? navigator.onLine !== false : true,
    effectiveType: connection?.effectiveType ?? null,
    downlink: connection?.downlink ?? null,
    rtt: connection?.rtt ?? null,
    saveData: connection?.saveData ?? null,
  }
}

/**
 * Network Information API를 구독해 연결 품질 데이터를 반환합니다.
 *
 * 느린 연결에서 비디오 품질 낮추기 등 적응형 UX 구현에 활용할 수 있습니다.
 * API가 지원되지 않는 환경에서는 `supported: false`를 반환합니다.
 * SSR 환경에서도 안전하게 동작합니다.
 *
 * @example
 * ```tsx
 * const { supported, online, effectiveType, downlink } = useNetwork()
 *
 * if (!online) return <Banner>오프라인 상태입니다</Banner>
 * if (effectiveType === '2g' || effectiveType === 'slow-2g') {
 *   return <LowQualityVideo />
 * }
 * return <HighQualityVideo />
 * ```
 */
export function useNetwork(): UseNetworkState {
  const [state, setState] = useState<UseNetworkState>(readState)

  useEffect(() => {
    const handleChange = () => setState(readState())
    const handleOnline = () => setState((prev) => ({ ...prev, online: true }))
    const handleOffline = () => setState((prev) => ({ ...prev, online: false }))

    const connection = getConnection()
    if (connection) {
      connection.addEventListener('change', handleChange)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)
    }

    return () => {
      if (connection) {
        connection.removeEventListener('change', handleChange)
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }
  }, [])

  return state
}
