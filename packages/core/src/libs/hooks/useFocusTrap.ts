import { type RefObject, useEffect } from 'react'

export type UseFocusTrapOptions = {
  /**
   * 트랩 활성화 여부. 모달 open 상태와 묶어서 사용.
   * @defaultValue true
   */
  enabled?: boolean
  /**
   * 활성화 시 자동으로 첫 포커스 가능 요소에 포커스.
   * @defaultValue true
   */
  autoFocus?: boolean
  /**
   * 비활성화 시 트랩 진입 직전 포커스 요소로 복원.
   * @defaultValue true
   */
  restoreFocus?: boolean
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const isHidden = (el: HTMLElement): boolean => {
  // jsdom은 레이아웃 정보를 주지 않으므로 단위 테스트 시점엔 명시적 visibility CSS만
  // 저렴하게 검사한다. 실제 브라우저에선 브라우저 자체 tabindex 순서가 display:none을
  // 이미 건너뛴다.
  const style = typeof window !== 'undefined' ? window.getComputedStyle?.(el) : null
  if (style && (style.display === 'none' || style.visibility === 'hidden')) return true
  return false
}

const getFocusable = (container: HTMLElement): HTMLElement[] => {
  const candidates = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
  return candidates.filter((el) => {
    if (el.hasAttribute('disabled')) return false
    if (el.getAttribute('aria-hidden') === 'true') return false
    if (isHidden(el)) return false
    return true
  })
}

/**
 * 컨테이너 안쪽으로 키보드 포커스를 가두는 트랩을 설치합니다.
 *
 * - 활성화 시 첫 포커스 가능 요소에 자동 포커스 (`autoFocus`)
 * - Tab / Shift+Tab 이 컨테이너 안에서만 순환
 * - 비활성화 또는 unmount 시 진입 직전 요소로 포커스 복원 (`restoreFocus`)
 *
 * 모달·다이얼로그·드로어·바텀시트처럼 한 시점에 하나의 인터랙티브 영역만 다뤄야 하는
 * 곳에서 사용. WCAG 2.4.3 (Focus Order) 모달 요구사항을 충족시킨다.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * useFocusTrap(ref, { enabled: open })
 *
 * return open ? <div ref={ref} role='dialog'>...</div> : null
 * ```
 */
export function useFocusTrap<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options: UseFocusTrapOptions = {}
): void {
  const { enabled = true, autoFocus = true, restoreFocus = true } = options

  useEffect(() => {
    if (!enabled) return
    const container = containerRef.current
    if (!container || typeof document === 'undefined') return

    const previousActive = document.activeElement as HTMLElement | null

    if (autoFocus) {
      const focusable = getFocusable(container)
      const first = focusable[0] ?? container
      // tabindex=-1 fallback: 컨테이너가 비어 있어도 포커스를 받을 수 있게 한다.
      if (first === container && !container.hasAttribute('tabindex')) {
        container.setAttribute('tabindex', '-1')
      }
      first.focus()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const focusable = getFocusable(container)
      if (focusable.length === 0) {
        event.preventDefault()
        container.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey) {
        if (active === first || !container.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else {
        if (active === last || !container.contains(active)) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (restoreFocus && previousActive && typeof previousActive.focus === 'function') {
        previousActive.focus()
      }
    }
  }, [containerRef, enabled, autoFocus, restoreFocus])
}
