import { useCallback, useEffect, useRef, useState } from 'react'

export type WakeLockState = {
  isSupported: boolean
  isActive: boolean
  request: () => Promise<void>
  release: () => Promise<void>
  error: Error | null
}

export function useWakeLock(): WakeLockState {
  const isSupported = typeof navigator !== 'undefined' && 'wakeLock' in navigator

  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const sentinelRef = useRef<WakeLockSentinel | null>(null)
  const wasActiveRef = useRef(false)

  const request = useCallback(async (): Promise<void> => {
    if (!isSupported) return
    try {
      sentinelRef.current = await navigator.wakeLock.request('screen')
      setIsActive(true)
      wasActiveRef.current = true
      setError(null)

      sentinelRef.current.addEventListener('release', () => {
        setIsActive(false)
      })
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      setError(e)
    }
  }, [isSupported])

  const release = useCallback(async (): Promise<void> => {
    if (!sentinelRef.current) return
    try {
      await sentinelRef.current.release()
      sentinelRef.current = null
      wasActiveRef.current = false
      setIsActive(false)
      setError(null)
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      setError(e)
    }
  }, [])

  useEffect(() => {
    if (!isSupported) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && wasActiveRef.current) {
        void request()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isSupported, request])

  return { isSupported, isActive, request, release, error }
}
