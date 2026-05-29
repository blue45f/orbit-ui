import { fireEvent, renderHook } from '@testing-library/react'
import { type RefObject, useRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useHover } from './useHover'

describe('useHover', () => {
  afterEach(() => cleanup())

  test('초기 상태는 false', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useHover(ref as RefObject<HTMLDivElement | null>)
    })

    expect(result.current).toBe(false)
    document.body.removeChild(el)
  })

  test('mouseenter 시 true', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const { result, rerender } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useHover(ref as RefObject<HTMLDivElement | null>)
    })

    fireEvent.mouseEnter(el)
    rerender()

    expect(result.current).toBe(true)
    document.body.removeChild(el)
  })

  test('mouseleave 시 false로 돌아온다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const { result, rerender } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useHover(ref as RefObject<HTMLDivElement | null>)
    })

    fireEvent.mouseEnter(el)
    rerender()
    expect(result.current).toBe(true)

    fireEvent.mouseLeave(el)
    rerender()
    expect(result.current).toBe(false)

    document.body.removeChild(el)
  })

  test('unmount 시 리스너가 해제된다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useHover(ref as RefObject<HTMLDivElement | null>)
    })

    unmount()
    // unmount 후 enter 이벤트는 어디에도 영향을 주지 않아야
    expect(() => fireEvent.mouseEnter(el)).not.toThrow()

    document.body.removeChild(el)
  })

  test('ref가 비어 있으면(current=null) false를 유지한다', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useHover(ref)
    })

    expect(result.current).toBe(false)
  })
})
