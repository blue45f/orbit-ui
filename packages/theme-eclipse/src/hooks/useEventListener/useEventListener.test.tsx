import { renderHook } from '@testing-library/react'
import { type RefObject, useRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useEventListener } from './useEventListener'

describe('useEventListener', () => {
  afterEach(() => cleanup())

  test('기본 타겟은 window이고 keydown 이벤트가 핸들러에 전달된다', () => {
    const handler = vi.fn()
    renderHook(() => useEventListener('keydown', handler))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(handler).toHaveBeenCalledTimes(1)
    expect((handler.mock.calls[0][0] as KeyboardEvent).key).toBe('Escape')
  })

  test('target ref가 가리키는 element에 부착된다', () => {
    const handler = vi.fn()
    const el = document.createElement('div')
    document.body.appendChild(el)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      useEventListener('click', handler, ref as RefObject<HTMLElement | null>)
    })

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(handler).toHaveBeenCalledTimes(1)

    document.body.removeChild(el)
  })

  test('target ref가 null이면 부착되지 않는다', () => {
    const handler = vi.fn()
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      useEventListener('click', handler, ref as RefObject<HTMLElement | null>)
    })

    document.body.dispatchEvent(new MouseEvent('click'))
    expect(handler).not.toHaveBeenCalled()
  })

  test('unmount 시 리스너가 해제된다', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(() => useEventListener('keydown', handler))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(handler).toHaveBeenCalledTimes(1)

    unmount()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('핸들러 변경 시 항상 최신 함수가 호출된다 (closure 갱신)', () => {
    let count = 0
    const { rerender } = renderHook(
      ({ multiplier }: { multiplier: number }) => {
        useEventListener('keydown', () => {
          count += multiplier
        })
      },
      { initialProps: { multiplier: 1 } },
    )

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(count).toBe(1)

    rerender({ multiplier: 10 })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    expect(count).toBe(11)
  })

  test('options.capture를 전달할 수 있다', () => {
    const order: string[] = []
    const parent = document.createElement('div')
    const child = document.createElement('div')
    parent.appendChild(child)
    document.body.appendChild(parent)

    parent.addEventListener('click', () => order.push('parent-capture'), true)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(child)
      useEventListener('click', () => order.push('child-bubble'), ref as RefObject<HTMLElement | null>)
    })

    child.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(order).toEqual(['parent-capture', 'child-bubble'])

    document.body.removeChild(parent)
  })
})
