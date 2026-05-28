import { useState } from 'react'

export type OS = 'macos' | 'windows' | 'linux' | 'ios' | 'android' | 'undetermined'

function detectOs(): OS {
  if (typeof navigator === 'undefined') return 'undetermined'
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios'
  if (/Android/.test(ua)) return 'android'
  if (/Mac OS X/.test(ua)) return 'macos'
  if (/Win/.test(ua)) return 'windows'
  if (/Linux/.test(ua)) return 'linux'
  return 'undetermined'
}

/**
 * 현재 운영 체제를 감지합니다.
 *
 * SSR 안전: 서버(navigator가 없는 환경)에서는 `'undetermined'`를 반환합니다.
 *
 * @returns `'macos' | 'windows' | 'linux' | 'ios' | 'android' | 'undetermined'`
 *
 * @example
 * ```tsx
 * const os = useOs()
 * if (os === 'macos') {
 *   // macOS 전용 단축키 표시
 * }
 * ```
 */
export function useOs(): OS {
  const [os] = useState<OS>(detectOs)
  return os
}
