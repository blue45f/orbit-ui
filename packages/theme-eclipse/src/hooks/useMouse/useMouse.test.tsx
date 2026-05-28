import { act, fireEvent, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useMouse } from './useMouse'

describe('useMouse', () => {
  afterEach(() => cleanup())

  test('초기 상태는 x=0, y=0, elementX=null 이다', () => {
    const { result } = renderHook(() => useMouse())
    expect(result.current.mouse.x).toBe(0)
    expect(result.current.mouse.y).toBe(0)
    expect(result.current.mouse.pageX).toBe(0)
    expect(result.current.mouse.pageY).toBe(0)
    expect(result.current.mouse.elementX).toBeNull()
    expect(result.current.mouse.elementY).toBeNull()
    expect(result.current.mouse.elementRect).toBeNull()
  })

  test('window mousemove 이벤트로 x/y가 갱신된다', () => {
    const { result } = renderHook(() => useMouse())

    act(() => {
      fireEvent.mouseMove(window, { clientX: 200, clientY: 300, pageX: 200, pageY: 300 })
    })

    expect(result.current.mouse.x).toBe(200)
    expect(result.current.mouse.y).toBe(300)
    expect(result.current.mouse.pageX).toBe(200)
    expect(result.current.mouse.pageY).toBe(300)
  })

  test('ref가 연결된 요소가 없으면 elementX/elementY는 null이다', () => {
    const { result } = renderHook(() => useMouse())

    act(() => {
      fireEvent.mouseMove(window, { clientX: 200, clientY: 300, pageX: 200, pageY: 300 })
    })

    expect(result.current.mouse.elementX).toBeNull()
    expect(result.current.mouse.elementY).toBeNull()
    expect(result.current.mouse.elementRect).toBeNull()
  })

  test('ref가 요소에 부착되면 elementX/elementY가 계산된다', () => {
    const { result } = renderHook(() => useMouse<HTMLDivElement>())

    // Create a real DOM element and attach the ref
    const el = document.createElement('div')
    document.body.appendChild(el)

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 50,
      right: 200,
      bottom: 150,
      x: 100,
      y: 50,
      width: 100,
      height: 100,
      toJSON: () => '',
    })

    act(() => {
      result.current.ref(el)
    })

    act(() => {
      fireEvent.mouseMove(window, { clientX: 200, clientY: 300, pageX: 200, pageY: 300 })
    })

    expect(result.current.mouse.elementX).toBe(100) // 200 - 100
    expect(result.current.mouse.elementY).toBe(250) // 300 - 50
    expect(result.current.mouse.elementRect).not.toBeNull()

    document.body.removeChild(el)
  })

  test('ref가 없어도 크래시 없이 동작한다', () => {
    const { result } = renderHook(() => useMouse())

    expect(() => {
      act(() => {
        fireEvent.mouseMove(window, { clientX: 50, clientY: 60, pageX: 50, pageY: 60 })
      })
    }).not.toThrow()

    expect(result.current.mouse.x).toBe(50)
    expect(result.current.mouse.y).toBe(60)
  })

  test('ref 콜백은 안정적(stable)이다 — 리렌더 후에도 동일한 함수 참조', () => {
    const { result, rerender } = renderHook(() => useMouse())
    const firstRef = result.current.ref
    rerender()
    expect(result.current.ref).toBe(firstRef)
  })

  test('ref 연결 없을 때 elementRect는 null이다', () => {
    const { result } = renderHook(() => useMouse())

    act(() => {
      fireEvent.mouseMove(window, { clientX: 10, clientY: 20, pageX: 10, pageY: 20 })
    })

    expect(result.current.mouse.elementRect).toBeNull()
  })
})
