import { useCallback, useEffect, useState } from 'react'

export type UsePointerLockReturn = {
  isLocked: boolean
  lock: () => Promise<void>
  unlock: () => void
  supported: boolean
}

/**
 * ref 엘리먼트에 대한 포인터 잠금(Pointer Lock)을 제어합니다.
 * FPS 게임, 캔버스 기반 인터랙션 등에 유용합니다.
 *
 * @param ref - 포인터를 잠글 엘리먼트의 ref
 * @returns 포인터 잠금 상태 및 제어 함수 (`isLocked`, `lock`, `unlock`, `supported`)
 *
 * @example
 * ```tsx
 * function GameCanvas() {
 *   const ref = useRef<HTMLCanvasElement>(null)
 *   const { isLocked, lock } = usePointerLock(ref)
 *   return <canvas ref={ref} onClick={lock} />
 * }
 * ```
 */
export function usePointerLock<T extends Element = Element>(
  ref: { current: T | null }
): UsePointerLockReturn {
  const supported = typeof document !== 'undefined' && 'pointerLockElement' in document
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    if (!supported) return
    const handleLock = () => setIsLocked(document.pointerLockElement === ref.current)
    const handleError = () => setIsLocked(false)
    document.addEventListener('pointerlockchange', handleLock)
    document.addEventListener('pointerlockerror', handleError)
    return () => {
      document.removeEventListener('pointerlockchange', handleLock)
      document.removeEventListener('pointerlockerror', handleError)
    }
  }, [supported, ref])

  const lock = useCallback(async () => {
    if (!ref.current || !supported) return
    await (ref.current as Element & { requestPointerLock(): void }).requestPointerLock()
  }, [ref, supported])

  const unlock = useCallback(() => {
    if (supported && document.pointerLockElement) document.exitPointerLock()
  }, [supported])

  return { isLocked, lock, unlock, supported }
}
