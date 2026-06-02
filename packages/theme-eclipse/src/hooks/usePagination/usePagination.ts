import { useCallback, useMemo, useState } from 'react'

export type UsePaginationOptions = {
  /**
   * 전체 페이지 수. 1 미만이면 1로 보정.
   */
  total: number
  /**
   * 초기 페이지 (1-indexed).
   * @defaultValue 1
   */
  initialPage?: number
  /**
   * `visibleRange` 가 한 번에 노출할 페이지 수.
   * @defaultValue 5
   */
  siblings?: number
  /**
   * 경계 페이지(첫·마지막)를 visibleRange 에 항상 포함할지.
   * @defaultValue true
   */
  showBoundary?: boolean
  /**
   * 페이지 전환 시 호출.
   */
  onChange?: (page: number) => void
}

export type PageItem =
  | { type: 'page'; value: number; isActive: boolean }
  | { type: 'ellipsis'; key: string }

export type UsePaginationReturn = {
  page: number
  total: number
  setPage: (page: number) => void
  next: () => void
  prev: () => void
  first: () => void
  last: () => void
  isFirst: boolean
  isLast: boolean
  /**
   * 사용자에게 보여줄 페이지 항목 시퀀스. 페이지 번호와 '...' (ellipsis) 가 섞여 있고,
   * 그대로 map 해서 렌더링하면 됩니다.
   */
  items: PageItem[]
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

/**
 * 페이지네이션 상태와 보기 좋은 페이지 시퀀스를 함께 제공합니다.
 *
 * 표시 규칙(showBoundary=true 기준):
 * - 전체 페이지가 `siblings * 2 + 5` 이하면 모든 페이지를 노출
 * - 그보다 많으면 [1, ..., current 주변 siblings, ..., total] 패턴으로 ellipsis 삽입
 *
 * @example
 * ```tsx
 * const { page, items, prev, next } = usePagination({ total: 42, siblings: 2 })
 *
 * return (
 *   <nav>
 *     <button onClick={prev}>‹</button>
 *     {items.map((item) =>
 *       item.type === 'ellipsis'
 *         ? <span key={item.key}>…</span>
 *         : <button key={item.value} aria-current={item.isActive ? 'page' : undefined}>{item.value}</button>
 *     )}
 *     <button onClick={next}>›</button>
 *   </nav>
 * )
 * ```
 */
export function usePagination(options: UsePaginationOptions): UsePaginationReturn {
  const { total: totalRaw, initialPage = 1, siblings = 1, showBoundary = true, onChange } = options
  const total = Math.max(1, totalRaw)

  const [page, setPageState] = useState<number>(() => clamp(initialPage, 1, total))

  const setPage = useCallback(
    (next: number) => {
      const clamped = clamp(next, 1, total)
      setPageState((prev) => {
        if (prev === clamped) return prev
        onChange?.(clamped)
        return clamped
      })
    },
    [total, onChange]
  )

  const next = useCallback(() => setPage(page + 1), [page, setPage])
  const prev = useCallback(() => setPage(page - 1), [page, setPage])
  const first = useCallback(() => setPage(1), [setPage])
  const last = useCallback(() => setPage(total), [total, setPage])

  const items = useMemo<PageItem[]>(() => {
    const totalToShow = siblings * 2 + (showBoundary ? 5 : 3)
    if (total <= totalToShow) {
      return range(1, total).map((v) => ({ type: 'page', value: v, isActive: v === page }))
    }

    const leftSibling = Math.max(page - siblings, showBoundary ? 2 : 1)
    const rightSibling = Math.min(page + siblings, showBoundary ? total - 1 : total)
    const showLeftDots = leftSibling > (showBoundary ? 2 : 1) + 1
    const showRightDots = rightSibling < (showBoundary ? total - 1 : total) - 1

    const result: PageItem[] = []

    if (showBoundary) result.push({ type: 'page', value: 1, isActive: page === 1 })

    if (showLeftDots) {
      result.push({ type: 'ellipsis', key: 'left' })
    } else if (showBoundary) {
      // Fill the gap between 1 and leftSibling with explicit pages.
      for (let i = 2; i < leftSibling; i += 1) {
        result.push({ type: 'page', value: i, isActive: i === page })
      }
    }

    for (let i = leftSibling; i <= rightSibling; i += 1) {
      result.push({ type: 'page', value: i, isActive: i === page })
    }

    if (showRightDots) {
      result.push({ type: 'ellipsis', key: 'right' })
    } else if (showBoundary) {
      for (let i = rightSibling + 1; i < total; i += 1) {
        result.push({ type: 'page', value: i, isActive: i === page })
      }
    }

    if (showBoundary) result.push({ type: 'page', value: total, isActive: page === total })

    return result
  }, [page, total, siblings, showBoundary])

  return {
    page,
    total,
    setPage,
    next,
    prev,
    first,
    last,
    isFirst: page === 1,
    isLast: page === total,
    items,
  }
}
