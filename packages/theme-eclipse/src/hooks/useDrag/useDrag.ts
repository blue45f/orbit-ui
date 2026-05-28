import { useEffect, useMemo, useRef, useState } from 'react'
import type React from 'react'

export type DragState = {
  isDragging: boolean
  x: number
  y: number
  startX: number
  startY: number
  deltaX: number
  deltaY: number
}

export type UseDragOptions = {
  onDragStart?: (state: DragState) => void
  onDrag?: (state: DragState) => void
  onDragEnd?: (state: DragState) => void
}

export type UseDragReturn = {
  isDragging: boolean
  dragProps: {
    draggable: true
    onDragStart: (e: React.DragEvent) => void
    onDrag: (e: React.DragEvent) => void
    onDragEnd: (e: React.DragEvent) => void
  }
}

/**
 * 드래그 상태를 추적합니다. `dragProps` 를 draggable 엘리먼트에 spread 하세요.
 *
 * @example
 * ```tsx
 * const { isDragging, dragProps } = useDrag({
 *   onDragStart: (state) => console.log('drag started at', state.startX, state.startY),
 *   onDragEnd: (state) => console.log('drag ended', state),
 * })
 *
 * return <div {...dragProps} style={{ opacity: isDragging ? 0.5 : 1 }}>Drag me</div>
 * ```
 */
export function useDrag(options: UseDragOptions = {}): UseDragReturn {
  const [isDragging, setIsDragging] = useState(false)
  const stateRef = useRef<DragState>({
    isDragging: false,
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
  })
  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const dragProps = useMemo(
    () => ({
      draggable: true as const,
      onDragStart: (e: React.DragEvent) => {
        const next: DragState = {
          isDragging: true,
          x: e.clientX,
          y: e.clientY,
          startX: e.clientX,
          startY: e.clientY,
          deltaX: 0,
          deltaY: 0,
        }
        stateRef.current = next
        setIsDragging(true)
        optionsRef.current.onDragStart?.(next)
      },
      onDrag: (e: React.DragEvent) => {
        if (!e.clientX && !e.clientY) return // ghost frame
        const next: DragState = {
          ...stateRef.current,
          x: e.clientX,
          y: e.clientY,
          deltaX: e.clientX - stateRef.current.startX,
          deltaY: e.clientY - stateRef.current.startY,
        }
        stateRef.current = next
        optionsRef.current.onDrag?.(next)
      },
      onDragEnd: (e: React.DragEvent) => {
        const next: DragState = {
          ...stateRef.current,
          isDragging: false,
          x: e.clientX,
          y: e.clientY,
        }
        stateRef.current = next
        setIsDragging(false)
        optionsRef.current.onDragEnd?.(next)
      },
    }),
    [],
  )

  return { isDragging, dragProps }
}
