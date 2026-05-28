import { useCallback, useMemo, useState } from 'react'

export type UseArrayReturn<T> = {
  /** 현재 배열 */
  items: T[]
  /** 마지막에 push */
  push: (item: T) => void
  /** 지정 index 제거 */
  removeAt: (index: number) => void
  /** 항목으로 제거 (첫 번째 매치) */
  remove: (item: T) => void
  /** 지정 index 갱신 */
  updateAt: (index: number, next: T | ((prev: T) => T)) => void
  /** 항목 토글 (있으면 제거, 없으면 추가). filter용 칩 그룹 패턴. */
  toggle: (item: T) => void
  /** 모든 항목 제거 */
  clear: () => void
  /** 배열 전체 교체 */
  set: (next: T[] | ((prev: T[]) => T[])) => void
}

/**
 * 배열 state with 표준 헬퍼.
 *
 * filter 칩 그룹, 선택 목록, 동적 폼 등 배열 조작이 잦은 경우에 boilerplate를 줄입니다.
 *
 * @example
 * ```tsx
 * const filters = useArray<string>(['recent'])
 *
 * <Chip onClick={() => filters.toggle('mine')}>내 글</Chip>
 * <SolidButton onClick={() => filters.clear()}>초기화</SolidButton>
 * ```
 */
export function useArray<T>(initial: T[] = []): UseArrayReturn<T> {
  const [items, setItems] = useState<T[]>(initial)

  const push = useCallback((item: T) => {
    setItems((prev) => [...prev, item])
  }, [])

  const removeAt = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const remove = useCallback((item: T) => {
    setItems((prev) => {
      const i = prev.indexOf(item)
      if (i === -1) return prev
      return prev.filter((_, idx) => idx !== i)
    })
  }, [])

  const updateAt = useCallback((index: number, next: T | ((prev: T) => T)) => {
    setItems((prev) => {
      if (index < 0 || index >= prev.length) return prev
      const copy = prev.slice()
      const current = copy[index] as T
      copy[index] = next instanceof Function ? (next as (p: T) => T)(current) : next
      return copy
    })
  }, [])

  const toggle = useCallback((item: T) => {
    setItems((prev) => {
      const i = prev.indexOf(item)
      if (i === -1) return [...prev, item]
      return prev.filter((_, idx) => idx !== i)
    })
  }, [])

  const clear = useCallback(() => {
    setItems([])
  }, [])

  const set = useCallback((next: T[] | ((prev: T[]) => T[])) => {
    setItems((prev) => (next instanceof Function ? (next as (p: T[]) => T[])(prev) : next))
  }, [])

  return useMemo(
    () => ({ items, push, removeAt, remove, updateAt, toggle, clear, set }),
    [items, push, removeAt, remove, updateAt, toggle, clear, set],
  )
}
