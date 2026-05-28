import { useCallback, useMemo, useState } from 'react'

export type UseMapReturn<K, V> = {
  /** 현재 Map */
  map: ReadonlyMap<K, V>
  /** key-value 설정 */
  set: (key: K, value: V) => void
  /** key 제거 */
  remove: (key: K) => void
  /** key 조회 */
  get: (key: K) => V | undefined
  /** key 포함 여부 */
  has: (key: K) => boolean
  /** 모든 entry 제거 */
  clear: () => void
  /** Map 전체 교체 */
  reset: (next: Iterable<readonly [K, V]>) => void
}

/**
 * Map 상태 with helpers. key-value 쌍을 관리해야 할 때 사용.
 *
 * 매 상태 갱신마다 새 Map 인스턴스가 생성됩니다 (React 변경 감지를 위해).
 *
 * @example
 * ```tsx
 * const errors = useMap<string, string>([])
 *
 * <FloatingTextField
 *   label='이메일'
 *   error={errors.has('email')}
 *   helperText={errors.get('email')}
 * />
 *
 * function onValidate(field: string, message: string) {
 *   if (message) errors.set(field, message)
 *   else errors.remove(field)
 * }
 * ```
 */
export function useMap<K, V>(initial: Iterable<readonly [K, V]> = []): UseMapReturn<K, V> {
  const [map, setMap] = useState<Map<K, V>>(() => new Map(initial))

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      if (prev.get(key) === value) return prev
      const next = new Map(prev)
      next.set(key, value)
      return next
    })
  }, [])

  const remove = useCallback((key: K) => {
    setMap((prev) => {
      if (!prev.has(key)) return prev
      const next = new Map(prev)
      next.delete(key)
      return next
    })
  }, [])

  const get = useCallback((key: K) => map.get(key), [map])

  const has = useCallback((key: K) => map.has(key), [map])

  const clear = useCallback(() => {
    setMap((prev) => (prev.size === 0 ? prev : new Map()))
  }, [])

  const reset = useCallback((next: Iterable<readonly [K, V]>) => {
    setMap(new Map(next))
  }, [])

  return useMemo(
    () => ({ map, set, remove, get, has, clear, reset }),
    [map, set, remove, get, has, clear, reset],
  )
}
