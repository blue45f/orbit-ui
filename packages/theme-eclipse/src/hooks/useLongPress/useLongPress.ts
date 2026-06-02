import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

export type UseLongPressOptions = {
  /**
   * 트리거까지의 ms.
   * @defaultValue 500
   */
  delay?: number
  /**
   * 손가락/마우스가 일정 거리(px) 이상 움직이면 long-press 취소.
   * 사용자의 의도가 long-press → drag/scroll 로 바뀌었다는 신호.
   * @defaultValue 8
   */
  movementThreshold?: number
  /**
   * pointerdown 시 컨텍스트 메뉴(브라우저 길게 누르기) 무시.
   * 터치 디바이스에서 long-press 와 충돌하기 쉬워 기본 true.
   * @defaultValue true
   */
  preventContextMenu?: boolean
}

export type UseLongPressHandlers = {
  onPointerDown: (event: React.PointerEvent) => void
  onPointerMove: (event: React.PointerEvent) => void
  onPointerUp: (event: React.PointerEvent) => void
  onPointerCancel: (event: React.PointerEvent) => void
  onContextMenu: (event: React.MouseEvent) => void
}

/**
 * 일정 시간 누른 채로 유지되면 콜백을 호출하는 long-press 인터랙션을 만듭니다.
 *
 * Pointer Events 기반이라 마우스·터치·펜 모두 동일 코드 경로로 동작하며,
 * 손가락이 임계값보다 멀리 움직이면(스크롤/드래그 의도) 트리거를 취소합니다.
 *
 * 반환된 핸들러 객체를 그대로 spread 해서 사용합니다.
 *
 * @example
 * ```tsx
 * const handlers = useLongPress(() => setMenuOpen(true), { delay: 600 })
 * return <button {...handlers}>길게 눌러 메뉴 열기</button>
 * ```
 */
export function useLongPress(
  callback: (event: React.PointerEvent) => void,
  options: UseLongPressOptions = {}
): UseLongPressHandlers {
  const { delay = 500, movementThreshold = 8, preventContextMenu = true } = options

  const callbackRef = useRef(callback)
  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  const timerRef = useRef<number | null>(null)
  const startPointRef = useRef<{ x: number; y: number } | null>(null)
  const firedRef = useRef(false)

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    startPointRef.current = null
  }, [])

  useEffect(() => clear, [clear])

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      firedRef.current = false
      startPointRef.current = { x: event.clientX, y: event.clientY }
      // Snapshot the event so the timer callback can pass it through
      // even though React's synthetic events are pooled.
      const snapshot = event
      timerRef.current = window.setTimeout(() => {
        firedRef.current = true
        callbackRef.current(snapshot)
        timerRef.current = null
      }, delay)
    },
    [delay]
  )

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      const start = startPointRef.current
      if (!start || timerRef.current === null) return
      const dx = event.clientX - start.x
      const dy = event.clientY - start.y
      if (dx * dx + dy * dy > movementThreshold * movementThreshold) {
        clear()
      }
    },
    [clear, movementThreshold]
  )

  const onPointerUp = useCallback(() => {
    clear()
  }, [clear])

  const onPointerCancel = useCallback(() => {
    clear()
  }, [clear])

  const onContextMenu = useCallback(
    (event: React.MouseEvent) => {
      if (preventContextMenu && firedRef.current) {
        event.preventDefault()
      }
    },
    [preventContextMenu]
  )

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onContextMenu }
}
