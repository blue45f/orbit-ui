import { useCallback, useMemo, useState } from 'react'

export type UseSetReturn<T> = {
  /** 현재 Set */
  set: ReadonlySet<T>
  /** 항목 추가 (있어도 안전) */
  add: (item: T) => void
  /** 항목 제거 */
  remove: (item: T) => void
  /** 항목 토글 (있으면 제거, 없으면 추가) */
  toggle: (item: T) => void
  /** 포함 여부 */
  has: (item: T) => boolean
  /** 모든 항목 제거 */
  clear: () => void
  /** Set 전체 교체 */
  reset: (next: Iterable<T>) => void
}

/**
 * Set 상태 with helpers. 중복 없는 컬렉션 (선택된 row id, 활성 필터 토큰)에 적합.
 *
 * 매 상태 갱신마다 새 Set 인스턴스가 생성됩니다 (React 변경 감지를 위해).
 *
 * @example
 * ```tsx
 * const selected = useSet<string>([])
 *
 * <Checkbox
 *   checked={selected.has(row.id)}
 *   onCheckedChange={() => selected.toggle(row.id)}
 * />
 * ```
 */
export function useSet<T>(initial: Iterable<T> = []): UseSetReturn<T> {
  const [set, setSet] = useState<Set<T>>(() => new Set(initial))

  const add = useCallback((item: T) => {
    setSet((prev) => {
      if (prev.has(item)) return prev
      const next = new Set(prev)
      next.add(item)
      return next
    })
  }, [])

  const remove = useCallback((item: T) => {
    setSet((prev) => {
      if (!prev.has(item)) return prev
      const next = new Set(prev)
      next.delete(item)
      return next
    })
  }, [])

  const toggle = useCallback((item: T) => {
    setSet((prev) => {
      const next = new Set(prev)
      if (next.has(item)) next.delete(item)
      else next.add(item)
      return next
    })
  }, [])

  const has = useCallback((item: T) => set.has(item), [set])

  const clear = useCallback(() => {
    setSet((prev) => (prev.size === 0 ? prev : new Set()))
  }, [])

  const reset = useCallback((next: Iterable<T>) => {
    setSet(new Set(next))
  }, [])

  return useMemo(
    () => ({ set, add, remove, toggle, has, clear, reset }),
    [set, add, remove, toggle, has, clear, reset],
  )
}
