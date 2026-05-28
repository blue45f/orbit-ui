import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * `requestAnimationFrame`으로 업데이트를 일괄 처리하는 `useState` 변형입니다.
 *
 * 고빈도 업데이트(scroll, mousemove 등)에서 연속 setState 호출을 RAF로 병합해
 * 불필요한 리렌더를 줄입니다. unmount 시 pending RAF를 자동 취소합니다.
 *
 * @example
 * ```tsx
 * const [position, setPosition] = useRafState({ x: 0, y: 0 })
 *
 * useEffect(() => {
 *   const handleMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY })
 *   window.addEventListener('mousemove', handleMove)
 *   return () => window.removeEventListener('mousemove', handleMove)
 * }, [setPosition])
 * ```
 */
export function useRafState<T>(
  initialState: T | (() => T),
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialState)
  const rafRef = useRef<number | null>(null)
  const pendingRef = useRef<React.SetStateAction<T> | null>(null)

  const setRafState = useCallback((value: React.SetStateAction<T>) => {
    pendingRef.current = value
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      if (pendingRef.current !== null) {
        setState(pendingRef.current)
        pendingRef.current = null
      }
    })
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return [state, setRafState]
}
