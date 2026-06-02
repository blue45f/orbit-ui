import { useEffect, useRef } from 'react'

import { useDeepCompareMemoize } from '../_internal/useDeepCompareMemoize'

/**
 * DOM 요소의 변이(mutation)를 MutationObserver로 감시합니다.
 *
 * 콜백은 ref로 보관되므로 매 렌더의 최신 함수를 호출하며,
 * options 변경 시 옵저버를 재연결합니다. unmount 시 자동 해제됩니다.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * useMutationObserver(ref, (mutations) => {
 *   console.log('mutations:', mutations)
 * }, { childList: true, subtree: true })
 * ```
 *
 * SSR 안전: MutationObserver 미지원 환경에서 조용히 무시됩니다.
 */
export function useMutationObserver(
  ref: { current: Element | null },
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true },
): void {
  const callbackRef = useRef(callback)
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const memoizedOptions = useDeepCompareMemoize(options)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof MutationObserver === 'undefined') return

    const observer = new MutationObserver((...args) => callbackRef.current(...args))
    observer.observe(node, memoizedOptions)

    return () => observer.disconnect()
  }, [ref, memoizedOptions])
}
