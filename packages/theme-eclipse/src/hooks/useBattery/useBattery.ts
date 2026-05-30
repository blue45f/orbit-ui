import { useEffect, useState } from 'react'

interface BatteryManager extends EventTarget {
  level: number
  charging: boolean
  chargingTime: number
  dischargingTime: number
}

export type BatteryState = {
  supported: boolean
  loading: boolean
  level: number | null
  charging: boolean | null
  chargingTime: number | null
  dischargingTime: number | null
}

/**
 * Battery Status API를 래핑하여 배터리 상태를 반환합니다.
 *
 * @returns 배터리 상태 객체 (`supported`, `loading`, `level`, `charging`, `chargingTime`, `dischargingTime`)
 *
 * @example
 * ```tsx
 * function BatteryInfo() {
 *   const { level, charging, supported } = useBattery()
 *   if (!supported) return <p>Battery API not supported</p>
 *   return <p>{charging ? 'Charging' : 'Discharging'} – {(level ?? 0) * 100}%</p>
 * }
 * ```
 */
export function useBattery(): BatteryState {
  const supported = typeof navigator !== 'undefined' && 'getBattery' in navigator
  const [state, setState] = useState<BatteryState>({
    supported,
    loading: supported,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  })

  useEffect(() => {
    if (!supported) return
    let battery: BatteryManager | null = null

    const update = (b: BatteryManager) => {
      setState({
        supported: true,
        loading: false,
        level: b.level,
        charging: b.charging,
        chargingTime: b.chargingTime,
        dischargingTime: b.dischargingTime,
      })
    }

    ;(navigator as Navigator & { getBattery(): Promise<BatteryManager> })
      .getBattery()
      .then((b) => {
        battery = b
        update(b)
        b.addEventListener('levelchange', () => update(b))
        b.addEventListener('chargingchange', () => update(b))
        b.addEventListener('chargingtimechange', () => update(b))
        b.addEventListener('dischargingtimechange', () => update(b))
      })
      .catch(() => {
        // Battery API 사용 불가(getBattery 거부) — unhandled rejection 방지 및 로딩 종료
        setState((s) => ({ ...s, loading: false }))
      })

    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', () => {})
        battery.removeEventListener('chargingchange', () => {})
        battery.removeEventListener('chargingtimechange', () => {})
        battery.removeEventListener('dischargingtimechange', () => {})
      }
    }
  }, [supported])

  return state
}
