import { useLayoutEffect, useRef } from 'react'

import { useEventListener } from '../useEventListener'

export type HotkeyModifier = 'ctrl' | 'meta' | 'mod' | 'shift' | 'alt'

export type HotkeyOptions = {
  /**
   * 비활성화. 동적으로 단축키를 끄고 켤 때 사용.
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * input·textarea·contenteditable에 포커스 있을 때 무시할지 여부.
   * @defaultValue true
   */
  ignoreInputs?: boolean
  /**
   * Default 동작 preventDefault 호출 여부.
   * @defaultValue true
   */
  preventDefault?: boolean
}

/**
 * 키보드 단축키를 전역(window)에 바인딩합니다.
 *
 * 단축키 표현식: `'mod+k'` `'shift+enter'` `'cmd+/'` `'alt+arrowright'` 같이
 * 수정자(`ctrl` `meta` `mod` `shift` `alt`)와 키를 `+`로 연결.
 *
 * `mod`는 OS에 따라 자동 매핑됩니다: macOS는 `meta`(⌘), 그 외는 `ctrl`.
 *
 * @example
 * ### 커맨드 팔레트
 * ```tsx
 * useHotkey('mod+k', () => commandPalette.open())
 * ```
 *
 * @example
 * ### 입력 중에도 활성
 * ```tsx
 * useHotkey('esc', onClose, { ignoreInputs: false })
 * ```
 */
export function useHotkey(
  combo: string,
  handler: (event: KeyboardEvent) => void,
  options: HotkeyOptions = {},
): void {
  const { disabled = false, ignoreInputs = true, preventDefault = true } = options
  const handlerRef = useRef(handler)
  useLayoutEffect(() => { handlerRef.current = handler })

  useEventListener('keydown', (event: Event) => {
    if (!(event instanceof KeyboardEvent)) return
    if (disabled) return
    if (ignoreInputs && isEditingTarget(event.target)) return
    if (matchesCombo(event, combo)) {
      if (preventDefault) event.preventDefault()
      handlerRef.current(event)
    }
  })
}

function isEditingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (target.isContentEditable) return true
  return false
}

const MOD_KEY_IS_META = (() => {
  if (typeof navigator === 'undefined') return false
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '')
})()

function matchesCombo(event: KeyboardEvent, combo: string): boolean {
  const parts = combo.toLowerCase().split('+').map((p) => p.trim())
  const requiredKey = parts.pop()
  if (!requiredKey) return false
  const need = {
    ctrl: false,
    meta: false,
    shift: false,
    alt: false,
  }
  for (const mod of parts) {
    if (mod === 'mod') {
      if (MOD_KEY_IS_META) need.meta = true
      else need.ctrl = true
    } else if (mod === 'cmd') {
      need.meta = true
    } else if (mod === 'ctrl' || mod === 'control') {
      need.ctrl = true
    } else if (mod === 'shift') {
      need.shift = true
    } else if (mod === 'alt' || mod === 'option' || mod === 'opt') {
      need.alt = true
    }
  }
  if (event.ctrlKey !== need.ctrl) return false
  if (event.metaKey !== need.meta) return false
  if (event.shiftKey !== need.shift) return false
  if (event.altKey !== need.alt) return false

  const key = event.key.toLowerCase()
  return key === requiredKey
}
