/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { MouseEvent, useRef } from 'react'

const DRAG_THRESHOLD = 2

interface UseDragScrollProps {
  draggingClassName?: string
}

export const useDragScroll = ({ draggingClassName }: UseDragScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const startPosition = useRef({ x: 0, left: 0 })
  const isDragging = useRef(false)
  const wasDragging = useRef(false)

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true
    wasDragging.current = false
    startPosition.current = {
      x: e.pageX - (containerRef.current?.offsetLeft ?? 0),
      left: containerRef.current?.scrollLeft ?? 0,
    }
    // 드래깅 시작 시 className 추가
    if (draggingClassName && containerRef.current) {
      containerRef.current.classList.add(draggingClassName)
    }
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    // 드래깅 종료 시 className 제거
    if (draggingClassName && containerRef.current) {
      containerRef.current.classList.remove(draggingClassName)
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    // 드래깅 종료 시 className 제거
    if (draggingClassName && containerRef.current) {
      containerRef.current.classList.remove(draggingClassName)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return
    wasDragging.current = true
    const x = e.pageX - (containerRef.current?.offsetLeft ?? 0)
    const walk = x - startPosition.current.x
    containerRef.current.scrollLeft = startPosition.current.left - walk

    // 클릭과 동시에 MouseMove가 살짝 일어날 수 있으며, 클릭 시 선택되지 않는 것처럼 느껴지는 사용성 이슈가 생겨나는 걸 방지하기 위한 코드
    if (Math.abs(walk) < DRAG_THRESHOLD) {
      wasDragging.current = false
    }
  }

  return {
    containerRef,
    wasDragging,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseLeave,
    handleMouseUp,
  }
}
