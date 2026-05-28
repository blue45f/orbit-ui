import { useCallback, useRef, useState } from 'react'

export type EventHandler<T = unknown> = (payload: T) => void

export type UseEventEmitterReturn<T = unknown> = {
  /** 모든 구독자에게 payload를 전달합니다 */
  emit: (payload: T) => void
  /** 핸들러를 구독합니다. 반환값(cleanup)을 호출하면 구독 해제됩니다 */
  on: (handler: EventHandler<T>) => () => void
  /** 핸들러를 구독 해제합니다 */
  off: (handler: EventHandler<T>) => void
  /** 현재 구독자 수 */
  listenerCount: number
}

/**
 * 인스턴스 수준의 경량 인-프로세스 pub/sub 이벤트 버스입니다.
 *
 * @example
 * ```tsx
 * const { emit, on } = useEventEmitter<{ id: number }>()
 *
 * useEffect(() => {
 *   return on(({ id }) => console.log('item selected:', id))
 * }, [on])
 *
 * // 다른 곳에서
 * emit({ id: 42 })
 * ```
 */
export function useEventEmitter<T = unknown>(): UseEventEmitterReturn<T> {
  const listenersRef = useRef<Set<EventHandler<T>>>(new Set())
  const [listenerCount, setListenerCount] = useState(0)

  const on = useCallback((handler: EventHandler<T>): (() => void) => {
    listenersRef.current.add(handler)
    setListenerCount(listenersRef.current.size)
    return () => {
      listenersRef.current.delete(handler)
      setListenerCount(listenersRef.current.size)
    }
  }, [])

  const off = useCallback((handler: EventHandler<T>) => {
    listenersRef.current.delete(handler)
    setListenerCount(listenersRef.current.size)
  }, [])

  const emit = useCallback((payload: T) => {
    listenersRef.current.forEach((handler) => handler(payload))
  }, [])

  return { emit, on, off, listenerCount }
}
