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

  test('좌표 객체에서 x만 전달하면 y는 0이 된다', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo({ x: 100 })

    expect(window.scrollTo).toHaveBeenCalledWith({
      left: 100,
      top: 0,
      behavior: 'smooth',
    })
  })

  test('좌표 객체에서 y만 전달하면 x는 0이 된다', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo({ y: 500 })

    expect(window.scrollTo).toHaveBeenCalledWith({
      left: 0,
      top: 500,
      behavior: 'smooth',
    })
  })

  test('Element에 대해 custom behavior 옵션을 적용한다', () => {
    const { result } = renderHook(() => useScrollTo())

    const el = document.createElement('div')
    const scrollIntoViewMock = vi.fn()
    el.scrollIntoView = scrollIntoViewMock
    document.body.appendChild(el)

    result.current.scrollTo(el, { behavior: 'auto' })

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
      inline: 'nearest',
    })

    document.body.removeChild(el)
  })

  test('Element에 대해 custom block 옵션을 적용한다', () => {
    const { result } = renderHook(() => useScrollTo())

    const el = document.createElement('div')
    const scrollIntoViewMock = vi.fn()
    el.scrollIntoView = scrollIntoViewMock
    document.body.appendChild(el)

    result.current.scrollTo(el, { block: 'center' })

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    })

    document.body.removeChild(el)
  })

  test('Element에 대해 custom inline 옵션을 적용한다', () => {
    const { result } = renderHook(() => useScrollTo())

    const el = document.createElement('div')
    const scrollIntoViewMock = vi.fn()
    el.scrollIntoView = scrollIntoViewMock
    document.body.appendChild(el)

    result.current.scrollTo(el, { inline: 'center' })

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    })

    document.body.removeChild(el)
  })
})
