import { renderHook } from '@testing-library/react'
import type { MouseEvent, MutableRefObject } from 'react'
import { expect, test } from 'vitest'

import { useDragScroll } from './ScrollableTabGroup.lib'

const setup = () => {
  const { result } = renderHook(() => useDragScroll({ draggingClassName: 'dragging' }))
  const div = document.createElement('div')
  // 실제 컴포넌트에서는 ref가 DOM에 연결되므로 테스트에서 직접 연결한다
  ;(result.current.containerRef as MutableRefObject<HTMLDivElement | null>).current = div
  return { result, div }
}

const mouse = (pageX: number) => ({ pageX }) as unknown as MouseEvent

test('useDragScroll: mousedown 시 draggingClassName을 추가하고 mouseup 시 제거한다', () => {
  const { result, div } = setup()

  result.current.handleMouseDown(mouse(100))
  expect(div.classList.contains('dragging')).toBe(true)

  result.current.handleMouseUp()
  expect(div.classList.contains('dragging')).toBe(false)
})

test('useDragScroll: mouseleave 시에도 draggingClassName을 제거한다', () => {
  const { result, div } = setup()

  result.current.handleMouseDown(mouse(100))
  result.current.handleMouseLeave()

  expect(div.classList.contains('dragging')).toBe(false)
})

test('useDragScroll: 임계값(2px) 이상 이동하면 wasDragging=true가 된다', () => {
  const { result } = setup()

  result.current.handleMouseDown(mouse(100))
  result.current.handleMouseMove(mouse(150)) // 50px 이동

  expect(result.current.wasDragging.current).toBe(true)
})

test('useDragScroll: 임계값 미만(1px) 이동은 클릭으로 간주해 wasDragging=false', () => {
  const { result } = setup()

  result.current.handleMouseDown(mouse(100))
  result.current.handleMouseMove(mouse(101)) // 1px < 2px 임계값

  expect(result.current.wasDragging.current).toBe(false)
})

test('useDragScroll: mousedown 없이 mousemove하면 아무 동작도 하지 않는다', () => {
  const { result } = setup()

  result.current.handleMouseMove(mouse(150))

  expect(result.current.wasDragging.current).toBe(false)
  expect(result.current.isDragging.current).toBe(false)
})
