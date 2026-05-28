import { useEffect, useState } from 'react'

const readOnline = (): boolean => {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine !== false
}

/**
 * 브라우저의 네트워크 연결 상태를 반환합니다.
 *
 * `online`/`offline` 이벤트를 구독해 변화를 즉시 반영합니다.
 * SSR 환경에서는 `true` 로 가정합니다 (서버는 항상 온라인이라고 보고
 * hydration 직후 실제 값으로 보정).
 *
 * @example
 * ```tsx
 * const isOnline = useOnline()
 *
 * return (
 *   <Banner role='status'>
 *     {isOnline ? '연결됨' : '오프라인 — 변경사항은 로컬에 저장됩니다'}
 *   </Banner>
 * )
 * ```
 */
export function useOnline(): boolean {
  const [online, setOnline] = useState<boolean>(readOnline)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    // sync once on mount in case navigator.onLine changed between SSR and CSR
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOnline(readOnline())
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return online
}
