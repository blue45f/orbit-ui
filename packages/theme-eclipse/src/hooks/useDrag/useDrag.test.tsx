import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useDrag } from './useDrag'

function makeDragEvent(clientX = 0, clientY = 0): React.DragEvent {
  return { clientX, clientY } as React.DragEvent
}

describe('useDrag', () => {
  afterEach(() => cleanup())

  it('초기 isDragging은 false 다', () => {
    const { result } = renderHook(() => useDrag())
    expect(result.current.isDragging).toBe(false)
  })

  it('onDragStart 후 isDragging 이 true 로 변경된다', () => {
    const { result } = renderHook(() => useDrag())

    act(() => {
      result.current.dragProps.onDragStart(makeDragEvent(100, 200))
    })

    expect(result.current.isDragging).toBe(true)
  })

  it('onDragEnd 후 isDragging 이 false 로 변경된다', () => {
    const { result } = renderHook(() => useDrag())

    act(() => {
      result.current.dragProps.onDragStart(makeDragEvent(100, 200))
    })
    expect(result.current.isDragging).toBe(true)

    act(() => {
      result.current.dragProps.onDragEnd(makeDragEvent(150, 250))
    })
    expect(result.current.isDragging).toBe(false)
  })

  it('onDragStart · onDragEnd 콜백을 올바른 state 로 호출한다', () => {
    const onDragStart = vi.fn()
    const onDragEnd = vi.fn()

    const { result } = renderHook(() => useDrag({ onDragStart, onDragEnd }))

    act(() => {
      result.current.dragProps.onDragStart(makeDragEvent(10, 20))
    })
    expect(onDragStart).toHaveBeenCalledWith(
      expect.objectContaining({ isDragging: true, startX: 10, startY: 20 })
    )

    act(() => {
      result.current.dragProps.onDragEnd(makeDragEvent(50, 60))
    })
    expect(onDragEnd).toHaveBeenCalledWith(
      expect.objectContaining({ isDragging: false, x: 50, y: 60 })
    )
  })

  it('onDrag를 호출하면 상태를 갱신하고 delta를 계산한다', () => {
    const onDrag = vi.fn()
    const { result } = renderHook(() => useDrag({ onDrag }))

    act(() => {
      result.current.dragProps.onDragStart(makeDragEvent(10, 20))
    })

    act(() => {
      result.current.dragProps.onDrag(makeDragEvent(50, 70))
    })

    expect(onDrag).toHaveBeenCalledWith(
      expect.objectContaining({
        x: 50,
        y: 70,
        startX: 10,
        startY: 20,
        deltaX: 40,
        deltaY: 50,
      })
    )
  })

  it('ghost frame (clientX=0, clientY=0)는 무시한다', () => {
    const onDrag = vi.fn()
    const { result } = renderHook(() => useDrag({ onDrag }))

    act(() => {
      result.current.dragProps.onDragStart(makeDragEvent(10, 20))
    })

    act(() => {
      result.current.dragProps.onDrag(makeDragEvent(0, 0))
    })

    expect(onDrag).not.toHaveBeenCalled()
  })

  it('onDrag 콜백이 없을 때도 상태를 갱신한다', () => {
    const { result } = renderHook(() => useDrag())

    act(() => {
      result.current.dragProps.onDragStart(makeDragEvent(10, 20))
    })

    act(() => {
      result.current.dragProps.onDrag(makeDragEvent(50, 70))
    })

    expect(result.current.isDragging).toBe(true)
  })
})
