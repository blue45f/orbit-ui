import { useEffect, useState } from 'react'

export type PermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported'

/**
 * 브라우저 Permissions API를 통해 권한 상태를 반환합니다.
 *
 * `navigator.permissions`가 없는 환경(SSR 등)에서는 `'unsupported'`를 반환합니다.
 * 쿼리가 완료되기 전 초기 상태는 `'prompt'`이며,
 * `PermissionStatus.onchange`를 구독해 권한 변경을 실시간으로 반영합니다.
 *
 * @param name - 쿼리할 권한 이름 (`PermissionName` 타입)
 * @returns 현재 권한 상태 (`'granted'` | `'denied'` | `'prompt'` | `'unsupported'`)
 *
 * @example
 * ```tsx
 * const state = usePermission('camera')
 *
 * return (
 *   <p>Camera permission: {state}</p>
 * )
 * ```
 */
export function usePermission(name: PermissionName): PermissionState {
  const [state, setState] = useState<PermissionState>(() => {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      return 'unsupported'
    }
    return 'prompt'
  })

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState('unsupported')
      return
    }

    let status: PermissionStatus | null = null
    let cancelled = false

    const handleChange = () => {
      if (status && !cancelled) {
        setState(status.state)
      }
    }

    navigator.permissions
      .query({ name })
      .then((permissionStatus) => {
        if (cancelled) return
        status = permissionStatus
        setState(permissionStatus.state)
        permissionStatus.onchange = handleChange
      })
      .catch(() => {
        if (!cancelled) {
          setState('unsupported')
        }
      })

    return () => {
      cancelled = true
      if (status) {
        status.onchange = null
      }
    }
  }, [name])

  return state
}
