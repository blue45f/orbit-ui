import { useRef } from 'react'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * @param callback 애니메이션 프레임 단위로 호출되고, 시간 증분(deltaMS)을 인자로 갖는 콜백
 * @returns 중지 및 재시작 제어 함수
 *
 * @example
 * const Counter = () => {
 *   const [count, setCount] = useState(0)
 *
 *   useAnimationFrame((deltaMS) => {
 *     setCount((prevCount) => prevCount + deltaMS)
 *   })
 *
 *   return <div>{Math.round(count)}</div>
 * }
 */
export const useAnimationFrame = (
  callback: (deltaMS: number) => void,
): {
  pause: () => void
  resume: () => void
} => {
  const prevTimestamp = useRef<number | undefined>(undefined)
  const rafID = useRef<number | undefined>(undefined)

  const animate = (timestamp: number) => {
    if (prevTimestamp.current !== undefined) {
      callback(timestamp - prevTimestamp.current)
    }

    prevTimestamp.current = timestamp
    rafID.current = window.requestAnimationFrame(animate)
  }

  useIsomorphicLayoutEffect(() => {
    rafID.current = window.requestAnimationFrame(animate)

    return () => {
      rafID.current !== undefined && window.cancelAnimationFrame(rafID.current)
    }
  }, [])

  const pause = () => {
    rafID.current !== undefined && window.cancelAnimationFrame(rafID.current)
    rafID.current = undefined
    prevTimestamp.current = undefined
  }

  const resume = () => {
    if (rafID.current === undefined) {
      rafID.current = window.requestAnimationFrame(animate)
    }
  }

  return { pause, resume }
}
