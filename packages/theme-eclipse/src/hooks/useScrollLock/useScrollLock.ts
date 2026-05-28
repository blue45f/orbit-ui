import { useEffect } from 'react'

export type UseScrollLockOptions = {
  /**
   * 잠금 활성화 여부. false면 아무 일도 하지 않습니다.
   * @defaultValue true
   */
  enabled?: boolean
  /**
   * 스크롤바 자리를 보존해 페이지 흔들림(jitter)을 막을지 여부.
   * 보통 모달·드로어가 열릴 때 시각적으로 더 깔끔합니다.
   * @defaultValue true
   */
  preserveScrollbarGap?: boolean
}

/**
 * 모달·드로어가 열린 동안 `<body>` 스크롤을 막습니다. unmount 또는 enabled=false 시 자동 복원.
 *
 * 스크롤바 너비를 측정해 동등한 padding-right를 부여하므로 콘텐츠가 좌우로 튀지 않습니다.
 *
 * @example
 * ```tsx
 * function Modal({ open, children }) {
 *   useScrollLock({ enabled: open })
 *   return open ? <div role='dialog'>{children}</div> : null
 * }
 * ```
 */
export function useScrollLock(options: UseScrollLockOptions = {}): void {
  const { enabled = true, preserveScrollbarGap = true } = options

  useEffect(() => {
    if (!enabled) return
    if (typeof document === 'undefined') return

    const { body, documentElement } = document
    const originalOverflow = body.style.overflow
    const originalPaddingRight = body.style.paddingRight

    const scrollbarWidth =
      preserveScrollbarGap && documentElement.scrollHeight > documentElement.clientHeight
        ? window.innerWidth - documentElement.clientWidth
        : 0

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = originalOverflow
      body.style.paddingRight = originalPaddingRight
    }
  }, [enabled, preserveScrollbarGap])
}
