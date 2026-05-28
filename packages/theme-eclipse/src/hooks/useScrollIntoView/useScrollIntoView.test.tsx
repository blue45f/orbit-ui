import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useScrollIntoView } from './useScrollIntoView'

const setupTarget = () => {
  const target = document.createElement('div')
  document.body.appendChild(target)
  // jsdom doesn't compute layout — fake the rect.
  target.getBoundingClientRect = () =>
    ({
      top: 200,
      left: 0,
      right: 100,
      bottom: 220,
      width: 100,
      height: 20,
      x: 0,
      y: 200,
      toJSON: () => ({}),
    }) as DOMRect
  return target
}

describe('useScrollIntoView', () => {
  afterEach(() => {
    cleanup()
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  test('offset=0 이면 element.scrollIntoView 를 호출한다', () => {
    const target = setupTarget()
    const scrollIntoView = vi.fn()
    target.scrollIntoView = scrollIntoView as unknown as typeof target.scrollIntoView

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(target)
      return useScrollIntoView(ref)
    })

    result.current()
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  })

  test('offset>0 이면 window.scrollTo 로 직접 보정한다', () => {
    const target = setupTarget()
    const scrollTo = vi.fn()
    Object.defineProperty(window, 'scrollY', { configurable: true, get: () => 100 })
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(target)
      return useScrollIntoView(ref, { offset: 64 })
    })

    result.current()
    // rect.top(200) + scrollY(100) - offset(64) = 236
    expect(scrollTo).toHaveBeenCalledWith({ top: 236, behavior: 'smooth' })
  })

  test('호출 시 옵션을 override 할 수 있다', () => {
    const target = setupTarget()
    const scrollIntoView = vi.fn()
    target.scrollIntoView = scrollIntoView as unknown as typeof target.scrollIntoView

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(target)
      return useScrollIntoView(ref)
    })

    result.current({ behavior: 'auto', block: 'center' })
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'center',
      inline: 'nearest',
    })
  })

  test('ref 가 비어 있으면 아무 일도 하지 않는다', () => {
    const scrollTo = vi.fn()
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useScrollIntoView(ref)
    })

    expect(() => result.current()).not.toThrow()
    expect(scrollTo).not.toHaveBeenCalled()
  })

  test("block='center' 이면 offset 무시하고 native scrollIntoView 사용", () => {
    const target = setupTarget()
    const scrollIntoView = vi.fn()
    const scrollTo = vi.fn()
    target.scrollIntoView = scrollIntoView as unknown as typeof target.scrollIntoView
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(target)
      return useScrollIntoView(ref, { offset: 64, block: 'center' })
    })

    result.current()
    expect(scrollIntoView).toHaveBeenCalled()
    expect(scrollTo).not.toHaveBeenCalled()
  })
})
