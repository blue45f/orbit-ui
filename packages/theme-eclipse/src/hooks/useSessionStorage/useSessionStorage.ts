import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export type UseSessionStorageOptions<T> = {
  /**
   * 직렬화 함수. 기본은 JSON.stringify.
   */
  serialize?: (value: T) => string
  /**
   * 역직렬화 함수. 기본은 JSON.parse. 파싱 실패 시 initialValue로 fallback.
   */
  deserialize?: (raw: string) => T
}

type SetValue<T> = T | ((prev: T) => T)

/**
 * `sessionStorage` 값을 React state처럼 사용합니다.
 *
 * - 초기값은 storage → initialValue 순서로 결정
 * - SSR 안전 (서버에서는 initialValue, 클라이언트에서 storage 반영)
 * - 동일 탭 한정 — 다른 탭/창과 sync 하지 않음 (sessionStorage 특성)
 * - 직렬화 오류·storage quota 초과는 throw 하지 않고 무시 (state는 유지)
 *
 * cross-tab persistence 가 필요하다면 [[useLocalStorage]] 를 사용하세요.
 *
 * @example
 * ```tsx
 * const [draft, setDraft] = useSessionStorage('compose-draft', '')
 *
 * // 함수형 업데이트도 지원
 * setDraft((prev) => prev + ' more')
 * ```
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: UseSessionStorageOptions<T> = {},
): [T, (value: SetValue<T>) => void, () => void] {
  const { serialize = JSON.stringify, deserialize = JSON.parse as (raw: string) => T } = options

  const serializeRef = useRef(serialize)
  const deserializeRef = useRef(deserialize)
  useLayoutEffect(() => {
    serializeRef.current = serialize
    deserializeRef.current = deserialize
  })

  const [stored, setStored] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.sessionStorage.getItem(key)
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
            window.sessionStorage.setItem(key, serializeRef.current(next))
          } catch {
            // quota exceeded, denied, etc — state still updates
          }
        }
        return next
      })
    },
    [key],
  )

  const remove = useCallback(() => {
    setStored(initialValue)
    if (typeof window === 'undefined') return
    try {
      window.sessionStorage.removeItem(key)
    } catch {
      // ignore
    }
  }, [key, initialValue])

  return [stored, setValue, remove]
}
