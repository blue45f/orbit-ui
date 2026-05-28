import { useEffect, useState } from 'react'

export type PageVisibilityState = 'visible' | 'hidden'

const readVisibility = (): PageVisibilityState => {
  if (typeof document === 'undefined') return 'visible'
  return document.visibilityState === 'hidden' ? 'hidden' : 'visible'
}

/**
 * 현재 탭의 [Page Visibility][1] 상태를 반환합니다.
 *
 * 백그라운드로 들어간 탭에서 무거운 작업(폴링, 애니메이션, 데이터 fetch)을
 * 일시정지하는 데 사용합니다.
 *
 * SSR 환경에서는 `'visible'` 로 가정하며, 마운트 직후 실제 상태로 보정합니다.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
 *
 * @example
 * ```tsx
 * const visibility = usePageVisibility()
 *
 * useEffect(() => {
 *   if (visibility === 'hidden') return // 백그라운드면 폴링 중단
 *   const id = setInterval(fetchUpdates, 5000)
 *   return () => clearInterval(id)
 * }, [visibility])
 * ```
 */
export function usePageVisibility(): PageVisibilityState {
  const [visibility, setVisibility] = useState<PageVisibilityState>(readVisibility)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const handler = () => setVisibility(readVisibility())
    // sync once after mount in case state changed between SSR and CSR
    handler()
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  return visibility
}
