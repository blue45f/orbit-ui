import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { usePagination } from './usePagination'

describe('usePagination', () => {
  afterEach(() => cleanup())

  test('초기 페이지는 initialPage, 안 주면 1', () => {
    const a = renderHook(() => usePagination({ total: 10 }))
    expect(a.result.current.page).toBe(1)

    const b = renderHook(() => usePagination({ total: 10, initialPage: 4 }))
    expect(b.result.current.page).toBe(4)
  })

  test('initialPage 가 범위 밖이면 clamp 된다', () => {
    const { result } = renderHook(() => usePagination({ total: 5, initialPage: 99 }))
    expect(result.current.page).toBe(5)
  })

  test('next/prev/first/last 가 정상 동작', () => {
    const { result } = renderHook(() => usePagination({ total: 5, initialPage: 3 }))
    act(() => result.current.next())
    expect(result.current.page).toBe(4)
    act(() => result.current.prev())
    expect(result.current.page).toBe(3)
    act(() => result.current.first())
    expect(result.current.page).toBe(1)
    expect(result.current.isFirst).toBe(true)
    act(() => result.current.last())
    expect(result.current.page).toBe(5)
    expect(result.current.isLast).toBe(true)
  })

  test('범위 끝에서 next/prev 는 clamp', () => {
    const { result } = renderHook(() => usePagination({ total: 3, initialPage: 1 }))
    act(() => result.current.prev())
    expect(result.current.page).toBe(1)
    act(() => result.current.last())
    expect(result.current.page).toBe(3)
    act(() => result.current.next())
    expect(result.current.page).toBe(3)
  })

  test('onChange 콜백은 페이지가 실제로 바뀔 때만 호출', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() => usePagination({ total: 3, onChange }))
    act(() => result.current.setPage(2))
    expect(onChange).toHaveBeenCalledWith(2)
    act(() => result.current.setPage(2))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('total이 적으면 모든 페이지가 노출된다 (ellipsis 없음)', () => {
    const { result } = renderHook(() => usePagination({ total: 5, siblings: 1 }))
    const values = result.current.items
      .filter((i) => i.type === 'page')
      .map((i) => (i.type === 'page' ? i.value : 0))
    expect(values).toEqual([1, 2, 3, 4, 5])
    expect(result.current.items.some((i) => i.type === 'ellipsis')).toBe(false)
  })

  test('총 페이지가 많으면 양쪽 끝 + ellipsis + 형제 페이지 구조', () => {
    const { result } = renderHook(() => usePagination({ total: 20, initialPage: 10, siblings: 1 }))
    // Expected: 1, '...', 9, 10, 11, '...', 20
    const compact = result.current.items.map((i) => (i.type === 'page' ? String(i.value) : '...'))
    expect(compact).toEqual(['1', '...', '9', '10', '11', '...', '20'])
  })

  test('현재 페이지가 시작 근처면 왼쪽 ellipsis 생략, 오른쪽만 노출', () => {
    const { result } = renderHook(() => usePagination({ total: 20, initialPage: 2, siblings: 1 }))
    const compact = result.current.items.map((i) => (i.type === 'page' ? String(i.value) : '...'))
    // Window 1,2,3 + ellipsis + boundary 20
    expect(compact).toEqual(['1', '2', '3', '...', '20'])
  })

  test('현재 페이지가 끝 근처면 오른쪽 ellipsis 생략, 왼쪽만 노출', () => {
    const { result } = renderHook(() => usePagination({ total: 20, initialPage: 17, siblings: 1 }))
    const compact = result.current.items.map((i) => (i.type === 'page' ? String(i.value) : '...'))
    // boundary 1 + ellipsis + window 16,17,18 + 오른쪽 명시 채움 19 + boundary 20
    expect(compact).toEqual(['1', '...', '16', '17', '18', '19', '20'])
  })

  test('isActive 가 현재 페이지에서만 true', () => {
    const { result } = renderHook(() => usePagination({ total: 5, initialPage: 3 }))
    const actives = result.current.items.filter((i) => i.type === 'page' && i.isActive)
    expect(actives).toHaveLength(1)
    expect(actives[0].type === 'page' && actives[0].value).toBe(3)
  })

  test('showBoundary=false: 중간 페이지는 경계(1·total) 없이 양쪽 ellipsis만', () => {
    const { result } = renderHook(() =>
      usePagination({ total: 20, initialPage: 10, siblings: 1, showBoundary: false })
    )
    const compact = result.current.items.map((i) => (i.type === 'page' ? String(i.value) : '...'))
    expect(compact).toEqual(['...', '9', '10', '11', '...'])
  })

  test('showBoundary=false: 시작 근처면 왼쪽 ellipsis도 경계도 없다', () => {
    const { result } = renderHook(() =>
      usePagination({ total: 20, initialPage: 1, siblings: 1, showBoundary: false })
    )
    const compact = result.current.items.map((i) => (i.type === 'page' ? String(i.value) : '...'))
    expect(compact).toEqual(['1', '2', '...'])
  })

  test('showBoundary=false: 끝 근처면 오른쪽 ellipsis도 경계도 없다', () => {
    const { result } = renderHook(() =>
      usePagination({ total: 20, initialPage: 20, siblings: 1, showBoundary: false })
    )
    const compact = result.current.items.map((i) => (i.type === 'page' ? String(i.value) : '...'))
    expect(compact).toEqual(['...', '19', '20'])
  })

  test('왼쪽 dots가 생략될 때 1과 형제 사이를 명시 페이지로 채운다', () => {
    // page=4, siblings=1 → leftSibling=3, showLeftDots=false → 2를 명시적으로 채움
    const { result } = renderHook(() => usePagination({ total: 20, initialPage: 4, siblings: 1 }))
    const compact = result.current.items.map((i) => (i.type === 'page' ? String(i.value) : '...'))
    expect(compact).toEqual(['1', '2', '3', '4', '5', '...', '20'])
  })

  test('total < 1 은 1 로 보정', () => {
    const { result } = renderHook(() => usePagination({ total: 0 }))
    expect(result.current.total).toBe(1)
    expect(result.current.page).toBe(1)
    expect(result.current.items.length).toBe(1)
  })
})
