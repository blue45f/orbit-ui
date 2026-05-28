import { useEffect, useState } from 'react'

export type WindowSize = {
  width: number
  height: number
}

/**
 * 윈도우 viewport 크기를 추적합니다. 리사이즈 시 자동 갱신.
 *
 * SSR 안전: 서버에서는 fallback 값 반환, 클라이언트 첫 effect에서 실제 값으로 동기화.
 *
 * @example
 * ```tsx
 * const { width, height } = useWindowSize()
 *
 * if (width < 768) return <MobileNav />
 * return <DesktopNav />
 * ```
 *
 * 대부분의 반응형 분기는 `useMediaQuery`가 더 적합합니다. 픽셀 값 자체가 필요할 때만 이 훅을 사용하세요.
 */
export function useWindowSize(fallback: WindowSize = { width: 0, height: 0 }): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => {
    if (typeof window === 'undefined') return fallback
    return { width: window.innerWidth, height: window.innerHeight }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handler()
    window.addEventListener('resize', handler)
    window.addEventListener('orientationchange', handler)
    return () => {
      window.removeEventListener('resize', handler)
      window.removeEventListener('orientationchange', handler)
    }
  }, [])

  return size
}
