import { useEffect } from 'react'

/**
 * 동시에 열린 오버레이 개수를 세는 모듈 레벨 카운터.
 * 첫 잠금에서만 body 스타일을 저장·적용하고, 마지막 해제에서만 원복한다.
 * (여러 시트/모달이 겹쳐도 마지막 하나가 닫힐 때까지 스크롤을 풀지 않게 한다)
 */
let lockCount = 0
let previousOverflow = ''

/**
 * `document.body`의 스크롤을 잠근다.
 *
 * - `locked`가 true인 동안 `body { overflow: hidden }`을 적용한다.
 * - 여러 오버레이가 겹쳐도 ref-count로 안전하게 동작한다. 마지막 잠금이 풀릴 때만
 *   원래 `overflow` 값으로 복원한다.
 * - SSR 안전: `document`가 없으면 아무 것도 하지 않는다.
 *
 * @example
 * ```tsx
 * useBodyScrollLock(isPresented)
 * ```
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return

    const { body } = document
    // 최초 잠금에서만 기존 값을 저장하고 overflow:hidden을 적용한다.
    if (lockCount === 0) {
      previousOverflow = body.style.overflow
      body.style.overflow = 'hidden'
    }
    lockCount += 1

    return () => {
      lockCount -= 1
      // 마지막 잠금이 해제될 때만 원래 값으로 복원한다.
      if (lockCount === 0) {
        body.style.overflow = previousOverflow
      }
    }
  }, [locked])
}
