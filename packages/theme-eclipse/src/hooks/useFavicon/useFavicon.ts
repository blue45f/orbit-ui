import { useEffect } from 'react'

export type UseFaviconOptions = {
  /**
   * `<link rel>` 값. emoji favicon은 `'icon'` 그대로, Apple touch는 `'apple-touch-icon'`.
   * @defaultValue 'icon'
   */
  rel?: string
  /**
   * MIME 타입. 자동 추론하지 않으니 명시 권장 (svg / png / ico).
   */
  type?: string
}

const findLink = (rel: string): HTMLLinkElement | null =>
  document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

/**
 * 문서의 favicon 을 동적으로 교체합니다.
 *
 * 알림 갯수가 있을 때만 빨간 점 아이콘, idle 상태에선 회색 등 상태 기반 표시에 유용.
 * 컴포넌트가 unmount 되어도 favicon 은 마지막 값을 유지하므로, 원래대로 되돌리려면 이전 URL 을 다시 전달하세요.
 *
 * @example
 * ```tsx
 * const isUnread = unreadCount > 0
 * useFavicon(isUnread ? '/favicon-alert.svg' : '/favicon.svg')
 * ```
 */
export function useFavicon(href: string, options: UseFaviconOptions = {}): void {
  const { rel = 'icon', type } = options

  useEffect(() => {
    if (typeof document === 'undefined') return

    const existing = findLink(rel)
    if (existing) {
      if (existing.href !== href) existing.href = href
      if (type && existing.type !== type) existing.type = type
      return
    }

    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    if (type) link.type = type
    document.head.appendChild(link)
  }, [href, rel, type])
}
