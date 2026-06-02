import { useEffect, useLayoutEffect } from 'react'

/**
 * SSR 안전한 `useLayoutEffect` 대체제입니다.
 *
 * 브라우저 환경에서는 `useLayoutEffect`를, 서버(SSR) 환경에서는 `useEffect`를 사용해
 * React의 서버 사이드 경고를 억제합니다.
 *
 * @example
 * ```tsx
 * // Next.js SSR 컴포넌트에서도 경고 없이 사용 가능
 * useIsomorphicLayoutEffect(() => {
 *   // DOM 접근 코드
 * }, [])
 * ```
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
