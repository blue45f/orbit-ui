import { cleanup, renderHook } from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, beforeEach, expect, test } from 'vitest'

import { useFocusTrap } from './useFocusTrap'

/**
 * useFocusTrap은 모달/시트의 키보드 포커스를 컨테이너 안에 가두는 a11y 핵심 훅이다.
 * jsdom은 레이아웃을 모르지만 이 훅은 레이아웃 비의존(명시적 visibility CSS만 검사)이라
 * 자동 포커스·Tab 순환·포커스 복원을 단위 테스트로 검증할 수 있다.
 */

let container: HTMLDivElement
let first: HTMLButtonElement
let last: HTMLButtonElement
let outside: HTMLButtonElement

beforeEach(() => {
  // Arrange: 트랩 외부 버튼 + 트랩 컨테이너(내부 버튼 2개)를 실제 DOM에 마운트한다.
  outside = document.createElement('button')
  outside.textContent = 'outside'
  document.body.appendChild(outside)

  container = document.createElement('div')
  first = document.createElement('button')
  first.textContent = 'first'
  last = document.createElement('button')
  last.textContent = 'last'
  container.append(first, last)
  document.body.appendChild(container)
})

afterEach(() => {
  cleanup()
  document.body.innerHTML = ''
})

const refTo = <T extends HTMLElement>(el: T | null) => {
  const ref = createRef<T>()
  // RefObject<T | null> 형태로 컨테이너를 가리키게 한다.
  ;(ref as { current: T | null }).current = el
  return ref
}

const pressTab = (shiftKey = false) =>
  document.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true })
  )

test('useFocusTrap: 활성화 시 첫 포커스 가능 요소로 자동 포커스한다', () => {
  // Arrange: 외부에 포커스가 있는 상태
  outside.focus()
  expect(document.activeElement).toBe(outside)

  // Act
  renderHook(() => useFocusTrap(refTo(container)))

  // Assert
  expect(document.activeElement).toBe(first)
})

test('useFocusTrap: enabled=false면 자동 포커스도 트랩도 동작하지 않는다', () => {
  // Arrange
  outside.focus()

  // Act
  renderHook(() => useFocusTrap(refTo(container), { enabled: false }))

  // Assert: 포커스가 외부에 그대로 유지된다
  expect(document.activeElement).toBe(outside)
})

test('useFocusTrap: autoFocus=false면 자동 포커스하지 않는다', () => {
  // Arrange
  outside.focus()

  // Act
  renderHook(() => useFocusTrap(refTo(container), { autoFocus: false }))

  // Assert
  expect(document.activeElement).toBe(outside)
})

test('useFocusTrap: 마지막 요소에서 Tab을 누르면 첫 요소로 순환한다', () => {
  // Arrange
  renderHook(() => useFocusTrap(refTo(container)))
  last.focus()
  expect(document.activeElement).toBe(last)

  // Act
  pressTab()

  // Assert
  expect(document.activeElement).toBe(first)
})

test('useFocusTrap: 첫 요소에서 Shift+Tab을 누르면 마지막 요소로 순환한다', () => {
  // Arrange
  renderHook(() => useFocusTrap(refTo(container)))
  first.focus()

  // Act
  pressTab(true)

  // Assert
  expect(document.activeElement).toBe(last)
})

test('useFocusTrap: 포커스가 컨테이너 밖에 있으면 Tab으로 트랩 안으로 끌어온다', () => {
  // Arrange: 자동 포커스를 끄고 외부에 포커스를 둔다
  renderHook(() => useFocusTrap(refTo(container), { autoFocus: false }))
  outside.focus()
  expect(document.activeElement).toBe(outside)

  // Act
  pressTab()

  // Assert: 컨테이너 첫 요소로 들어온다
  expect(document.activeElement).toBe(first)
})

test('useFocusTrap: 포커스 가능 요소가 없으면 컨테이너 자체에 포커스한다', () => {
  // Arrange: 내부 버튼을 모두 비활성화해 포커스 후보를 제거한다
  first.setAttribute('disabled', '')
  last.setAttribute('disabled', '')

  // Act
  renderHook(() => useFocusTrap(refTo(container)))

  // Assert: tabindex=-1 fallback으로 컨테이너가 포커스를 받는다
  expect(container.getAttribute('tabindex')).toBe('-1')
  expect(document.activeElement).toBe(container)
})

test('useFocusTrap: 언마운트 시 restoreFocus로 진입 직전 요소에 포커스를 복원한다', () => {
  // Arrange
  outside.focus()
  const { unmount } = renderHook(() => useFocusTrap(refTo(container)))
  expect(document.activeElement).toBe(first)

  // Act
  unmount()

  // Assert
  expect(document.activeElement).toBe(outside)
})

test('useFocusTrap: restoreFocus=false면 언마운트 시 포커스를 복원하지 않는다', () => {
  // Arrange
  outside.focus()
  const { unmount } = renderHook(() => useFocusTrap(refTo(container), { restoreFocus: false }))
  expect(document.activeElement).toBe(first)

  // Act
  unmount()

  // Assert: 복원하지 않으므로 트랩 내부 요소에 포커스가 남는다
  expect(document.activeElement).toBe(first)
})

test('useFocusTrap: Tab 외 키 입력은 무시한다', () => {
  // Arrange
  renderHook(() => useFocusTrap(refTo(container)))
  last.focus()

  // Act: 화살표 키는 트랩 순환을 트리거하지 않는다
  document.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
  )

  // Assert
  expect(document.activeElement).toBe(last)
})

test('useFocusTrap: 컨테이너 ref가 null이면 아무 동작도 하지 않는다', () => {
  // Arrange
  outside.focus()

  // Act
  renderHook(() => useFocusTrap(refTo<HTMLDivElement>(null)))

  // Assert: 안전하게 no-op
  expect(document.activeElement).toBe(outside)
})
