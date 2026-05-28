import { useEffect, useState } from 'react'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type UseBreakpointReturn = {
  breakpoint: Breakpoint
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  is2Xl: boolean
  isAtLeast: (bp: Breakpoint) => boolean
  isAtMost: (bp: Breakpoint) => boolean
}

const BP_ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'xs'
  if (window.matchMedia('(min-width: 1536px)').matches) return '2xl'
  if (window.matchMedia('(min-width: 1280px)').matches) return 'xl'
  if (window.matchMedia('(min-width: 1024px)').matches) return 'lg'
  if (window.matchMedia('(min-width: 768px)').matches) return 'md'
  if (window.matchMedia('(min-width: 640px)').matches) return 'sm'
  return 'xs'
}

/**
 * 현재 활성화된 Tailwind 스타일 브레이크포인트를 반환합니다.
 *
 * - `resize` 이벤트로 뷰포트 변경 감지
 * - SSR 안전: 서버에서는 항상 `'xs'`
 *
 * @example
 * ```tsx
 * const { breakpoint, isAtLeast } = useBreakpoint()
 * // breakpoint === 'md'
 * // isAtLeast('sm') → true
 * ```
 */
export function useBreakpoint(): UseBreakpointReturn {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getCurrentBreakpoint)

  useEffect(() => {
    const handler = () => setBreakpoint(getCurrentBreakpoint())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const currentIndex = BP_ORDER.indexOf(breakpoint)

  return {
    breakpoint,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
    isAtLeast: (bp) => currentIndex >= BP_ORDER.indexOf(bp),
    isAtMost: (bp) => currentIndex <= BP_ORDER.indexOf(bp),
  }
}
