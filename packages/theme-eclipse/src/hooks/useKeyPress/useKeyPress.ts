import { useEffect, useState } from 'react'

export type UseKeyPressOptions = {
  /**
   * 입력 필드(input, textarea, contenteditable) 안에 포커스가 있을 때도 감지할지.
   * @defaultValue false
   */
  ignoreInputs?: boolean
  /**
   * 키 매칭 시 기본 동작(스크롤, 검색, 등) 막을지.
   * @defaultValue false
   */
  preventDefault?: boolean
}

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (target.isContentEditable) return true
  return false
}

/**
 * 지정한 키가 현재 눌려 있는지 boolean 으로 반환합니다.
 *
 * - `keydown` 동안 `true`, `keyup` 시 `false` — 누르고 있는 동안 계속 true.
 * - 키 매칭은 `KeyboardEvent.key` 기준 (`'Shift'`, `'a'`, `'Enter'` 등).
 * - 입력 필드 안에 포커스가 있을 때는 기본적으로 무시 (`ignoreInputs: true`),
 *   원하면 false로 명시.
 *
 * 단발성 핸들러(콜백)가 필요하면 [[useHotkey]], 임의 이벤트 리스너가 필요하면 [[useEventListener]].
 *
 * @example
 * ```tsx
 * const isShift = useKeyPress('Shift')
 *
 * <button>{isShift ? '복수 선택' : '한 개 선택'}</button>
 * ```
 */
export function useKeyPress(targetKey: string, options: UseKeyPressOptions = {}): boolean {
  const { ignoreInputs = true, preventDefault = false } = options
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const matches = (event: KeyboardEvent) =>
      event.key === targetKey ||
      (targetKey.length === 1 && event.key.toLowerCase() === targetKey.toLowerCase())

    const onDown = (event: KeyboardEvent) => {
      if (!matches(event)) return
      if (ignoreInputs && isEditableTarget(event.target)) return
      if (preventDefault) event.preventDefault()
      setPressed(true)
    }
    const onUp = (event: KeyboardEvent) => {
      if (!matches(event)) return
      setPressed(false)
    }
    // If focus blurs out of the document mid-press, the keyup may never
    // arrive — reset on blur to avoid a stuck-pressed state.
    const onBlur = () => setPressed(false)

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [targetKey, ignoreInputs, preventDefault])

  return pressed
}
