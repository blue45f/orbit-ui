import { useEffect, useState } from 'react'

export type ScrollPosition = {
  x: number
  y: number
}

const readPosition = (): ScrollPosition => {
  if (typeof window === 'undefined') return { x: 0, y: 0 }
  return { x: window.scrollX, y: window.scrollY }
}

/**
 * 윈도우 스크롤 좌표(x, y)를 반환합니다.
 *
 * - `passive: true` 리스너로 등록되어 스크롤 성능에 영향 없음
 * - `requestAnimationFrame` 으로 라스트 한 번만 setState — 페이지 스크롤 같이
 *   초당 수십 번 발생하는 이벤트에서도 React 리렌더는 프레임 단위로 제한됨
 * - SSR 안전 (서버에서는 (0, 0), 마운트 직후 실제 값으로 보정)
 *
 * @example
 * ```tsx
 * const { y } = useScrollPosition()
 *
 * return (
 *   <header style={{ background: y > 80 ? 'white' : 'transparent' }}>
 *     ...
 *   </header>
 * )
 * ```
 */
export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>(readPosition)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let frame = 0
    const onScroll = () => {
      if (frame !== 0) return
      frame = window.requestAnimationFrame(() => {
        setPosition(readPosition())
        frame = 0
      })
    }

    // Sync once on mount in case SSR set (0,0) and real value differs.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition(readPosition())
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [])

  return position
}
