import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useScrollTo } from './useScrollTo'

describe('useScrollTo', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('좌표 객체로 scrollTo를 호출하면 window.scrollTo가 실행된다', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo({ x: 100, y: 500 })

    expect(window.scrollTo).toHaveBeenCalledWith({
      left: 100,
      top: 500,
      behavior: 'smooth',
    })
  })

  test('Element를 전달하면 scrollIntoView가 호출된다', () => {
    const { result } = renderHook(() => useScrollTo())

    const el = document.createElement('div')
    const scrollIntoViewMock = vi.fn()
    el.scrollIntoView = scrollIntoViewMock
    document.body.appendChild(el)

    result.current.scrollTo(el)

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })

    document.body.removeChild(el)
  })

  test('반환된 scrollTo 함수는 리렌더링 간 동일한 참조를 유지한다', () => {
    const { result, rerender } = renderHook(() => useScrollTo())

    const firstRef = result.current.scrollTo
    rerender()
    const secondRef = result.current.scrollTo

    expect(firstRef).toBe(secondRef)
  })
})
