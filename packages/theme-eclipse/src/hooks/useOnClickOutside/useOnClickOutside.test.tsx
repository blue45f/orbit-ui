import { fireEvent, renderHook } from '@testing-library/react'
import { type RefObject, useRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useOnClickOutside } from './useOnClickOutside'

describe('useOnClickOutside', () => {
  afterEach(() => cleanup())

  test('ref 외부 클릭 시 핸들러가 호출된다', () => {
    const handler = vi.fn()
    const inside = document.createElement('div')
    const outside = document.createElement('div')
    document.body.appendChild(inside)
    document.body.appendChild(outside)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(inside)
      useOnClickOutside(ref as RefObject<HTMLDivElement | null>, handler)
    })

    fireEvent.mouseDown(outside)
    expect(handler).toHaveBeenCalledTimes(1)

    document.body.removeChild(inside)
    document.body.removeChild(outside)
  })

  test('ref 내부 클릭은 핸들러를 호출하지 않는다', () => {
    const handler = vi.fn()
    const inside = document.createElement('div')
    const child = document.createElement('span')
    inside.appendChild(child)
    document.body.appendChild(inside)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(inside)
      useOnClickOutside(ref as RefObject<HTMLDivElement | null>, handler)
    })

    fireEvent.mouseDown(inside)
    fireEvent.mouseDown(child)

    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(inside)
  })

  test('enabled=false면 호출되지 않는다', () => {
    const handler = vi.fn()
    const inside = document.createElement('div')
    const outside = document.createElement('div')
    document.body.appendChild(inside)
    document.body.appendChild(outside)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(inside)
      useOnClickOutside(ref as RefObject<HTMLDivElement | null>, handler, { enabled: false })
    })

    fireEvent.mouseDown(outside)

    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(inside)
    document.body.removeChild(outside)
  })

  test('여러 ref를 배열로 전달하면 그 중 어느 것에도 포함되지 않을 때만 호출된다', () => {
    const handler = vi.fn()
    const trigger = document.createElement('button')
    const content = document.createElement('div')
    const outside = document.createElement('div')
    document.body.appendChild(trigger)
    document.body.appendChild(content)
    document.body.appendChild(outside)

    renderHook(() => {
      const triggerRef = useRef<HTMLButtonElement>(trigger)
      const contentRef = useRef<HTMLDivElement>(content)
      useOnClickOutside(
        [
          triggerRef as RefObject<HTMLElement | null>,
          contentRef as RefObject<HTMLElement | null>,
        ],
        handler,
      )
    })

    fireEvent.mouseDown(trigger)
    expect(handler).not.toHaveBeenCalled()

    fireEvent.mouseDown(content)
    expect(handler).not.toHaveBeenCalled()

    fireEvent.mouseDown(outside)
    expect(handler).toHaveBeenCalledTimes(1)

    document.body.removeChild(trigger)
    document.body.removeChild(content)
    document.body.removeChild(outside)
  })

  test('touchstart도 동일하게 동작한다 (모바일)', () => {
    const handler = vi.fn()
    const inside = document.createElement('div')
    const outside = document.createElement('div')
    document.body.appendChild(inside)
    document.body.appendChild(outside)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(inside)
      useOnClickOutside(ref as RefObject<HTMLDivElement | null>, handler)
    })

    fireEvent.touchStart(outside)
    expect(handler).toHaveBeenCalledTimes(1)

    document.body.removeChild(inside)
    document.body.removeChild(outside)
  })

  test('event=click 옵션으로 click 이벤트를 사용할 수 있다', () => {
    const handler = vi.fn()
    const inside = document.createElement('div')
    const outside = document.createElement('div')
    document.body.appendChild(inside)
    document.body.appendChild(outside)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(inside)
      useOnClickOutside(ref as RefObject<HTMLDivElement | null>, handler, { event: 'click' })
    })

    // mousedown은 더 이상 듣지 않음
    fireEvent.mouseDown(outside)
    expect(handler).not.toHaveBeenCalled()

    fireEvent.click(outside)
    expect(handler).toHaveBeenCalledTimes(1)

    document.body.removeChild(inside)
    document.body.removeChild(outside)
  })

  test('unmount 시 리스너가 해제된다', () => {
    const handler = vi.fn()
    const outside = document.createElement('div')
    document.body.appendChild(outside)

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'))
      useOnClickOutside(ref as RefObject<HTMLDivElement | null>, handler)
    })

    unmount()
    fireEvent.mouseDown(outside)

    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(outside)
  })
})
