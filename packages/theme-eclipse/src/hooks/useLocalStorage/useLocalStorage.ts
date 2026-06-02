import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type UseLocalStorageOptions<T> = {
  /**
   * 직렬화 함수. 기본은 JSON.stringify.
   */
  serialize?: (value: T) => string
  /**
   * 역직렬화 함수. 기본은 JSON.parse. 파싱 실패 시 initialValue로 fallback.
   */
  deserialize?: (raw: string) => T
  /**
   * 같은 키의 다른 탭 변경 sync 여부.
   * @defaultValue true
   */
  syncTabs?: boolean
}

type SetValue<T> = T | ((prev: T) => T)

/**
 * `localStorage` 값을 React state처럼 사용합니다.
 *
 * - 초기값은 storage → initialValue 순서로 결정
 * - SSR 안전 (서버에서는 initialValue, 클라이언트 첫 effect에서 storage 반영)
 * - 다른 탭에서 같은 키를 변경하면 storage 이벤트로 자동 sync
 * - 직렬화 오류·storage quota 초과는 throw 하지 않고 무시 (state는 유지)
 *
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')
 *
 * // 함수형 업데이트도 지원
 * setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, (value: SetValue<T>) => void, () => void] {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse as (raw: string) => T,
    syncTabs = true,
  } = options

  const serializeRef = useRef(serialize)
  const deserializeRef = useRef(deserialize)
  useLayoutEffect(() => {
    serializeRef.current = serialize
    deserializeRef.current = deserialize
  })

  const [stored, setStored] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initialValue : deserialize(raw)
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: SetValue<T>) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, serializeRef.current(next))
          } catch {
            // quota exceeded, denied, etc — state still updates
          }
        }
        return next
      })
    },
    [key]
  )

  const remove = useCallback(() => {
    setStored(initialValue)
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
  }, [key, initialValue])

  useEffect(() => {
    if (!syncTabs || typeof window === 'undefined') return
    const handler = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== window.localStorage) return
      if (event.newValue === null) {
        setStored(initialValue)
        return
      }
      try {
        setStored(deserializeRef.current(event.newValue))
      } catch {
        // ignore parse errors
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key, initialValue, syncTabs])

  return [stored, setValue, remove]
}
