import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'

import { useFocus } from './useFocus'

afterEach(() => cleanup())

test('useFocus: onFocus 시 isFocused=true, onBlur 시 false가 된다', () => {
  // Arrange
  const { result } = renderHook(() => useFocus({}))
  expect(result.current.isFocused).toBe(false)

  // Act & Assert: focus
  act(() => result.current.onFocus({} as never))
  expect(result.current.isFocused).toBe(true)

  // Act & Assert: blur
  act(() => result.current.onBlur({} as never))
  expect(result.current.isFocused).toBe(false)
})

test('useFocus: disabled면 onFocus를 무시한다', () => {
  // Arrange
  const { result } = renderHook(() => useFocus({ disabled: true }))

  // Act
  act(() => result.current.onFocus({} as never))

  // Assert
  expect(result.current.isFocused).toBe(false)
})

test('useFocus: 사용자 제공 onFocus/onBlur 콜백을 이벤트와 함께 호출한다', () => {
  // Arrange
  const onFocus = vi.fn()
  const onBlur = vi.fn()
  const { result } = renderHook(() => useFocus({ onFocus, onBlur }))
  const event = { type: 'focus' } as never

  // Act
  act(() => result.current.onFocus(event))
  act(() => result.current.onBlur(event))

  // Assert
  expect(onFocus).toHaveBeenCalledWith(event)
  expect(onBlur).toHaveBeenCalledWith(event)
})

test('useFocus: preventElementBlur는 target이 ref가 아니면 preventDefault를 호출한다', () => {
  // Arrange
  const { result } = renderHook(() => useFocus({}))
  const preventDefault = vi.fn()

  // Act: ref.current는 null이므로 다른 target이면 preventDefault 호출
  act(() =>
    result.current.preventElementBlur({
      target: document.createElement('div'),
      preventDefault,
    } as never)
  )

  // Assert
  expect(preventDefault).toHaveBeenCalled()
})
