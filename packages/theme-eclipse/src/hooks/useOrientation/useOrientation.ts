import { useEffect, useState } from 'react'

export type OrientationType =
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'unknown'

export type UseOrientationState = {
  type: OrientationType
  angle: number
}

const SSR_STATE: UseOrientationState = { type: 'unknown', angle: 0 }

/**
 * `window.orientation` 레거시 숫자 값을 OrientationType으로 변환합니다.
 * (구형 Safari 대응)
 */
const angleToType = (angle: number): OrientationType => {
  if (angle === 0) return 'portrait-primary'
  if (angle === 180) return 'portrait-secondary'
  if (angle === 90) return 'landscape-primary'
  if (angle === -90) return 'landscape-secondary'
  return 'unknown'
}

const readOrientation = (): UseOrientationState => {
  if (typeof window === 'undefined') return SSR_STATE

  // Modern API
  if (screen?.orientation?.type) {
    return {
      type: screen.orientation.type as OrientationType,
      angle: screen.orientation.angle,
    }
  }

  // Legacy Safari: window.orientation
  if (typeof window.orientation === 'number') {
    const angle = window.orientation as number
    return { type: angleToType(angle), angle }
  }

  return SSR_STATE
}

/**
 * 기기의 화면 방향(orientation) 상태를 반환합니다.
 *
 * `screen.orientation` API가 지원되면 해당 API를 사용하고,
 * 구형 Safari처럼 미지원 환경에서는 `window.orientation`(deprecated)으로 폴백합니다.
 * SSR 환경에서는 `{ type: 'unknown', angle: 0 }`을 반환합니다.
 *
 * @example
 * ```tsx
 * const { type, angle } = useOrientation()
 *
 * return (
 *   <p>
 *     방향: {type} ({angle}°)
 *   </p>
 * )
 * ```
 */
export function useOrientation(): UseOrientationState {
  const [state, setState] = useState<UseOrientationState>(readOrientation)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleChange = () => {
      setState(readOrientation())
    }

    // Modern API
    if (screen?.orientation?.addEventListener) {
      screen.orientation.addEventListener('change', handleChange)
      return () => {
        screen.orientation.removeEventListener('change', handleChange)
      }
    }

    // Legacy fallback
    window.addEventListener('orientationchange', handleChange)
    return () => {
      window.removeEventListener('orientationchange', handleChange)
    }
  }, [])

  return state
}
