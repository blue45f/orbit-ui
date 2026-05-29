import { cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { useEvent } from './useEvent'

afterEach(() => cleanup())

test('useEvent: 반환된 콜백의 참조는 리렌더 사이에 안정적이다', () => {
  // Arrange
  const { result, rerender } = renderHook(({ cb }) => useEvent(cb), {
    initialProps: { cb: () => 1 },
  })
  const first = result.current

  // Act
  rerender({ cb: () => 2 })

  // Assert: useCallback([]) 이므로 동일 참조 유지
  expect(result.current).toBe(first)
})

test('useEvent: 호출 시 항상 최신 콜백을 실행한다', () => {
  // Arrange
  const { result, rerender } = renderHook(({ cb }) => useEvent(cb), {
    initialProps: { cb: () => 'a' },
  })

  // Act
  rerender({ cb: () => 'b' })

  // Assert: 참조는 그대로지만 실행은 최신 cb
  expect(result.current()).toBe('b')
})

test('useEvent: 인자를 전달하고 반환값을 그대로 돌려준다', () => {
  // Arrange & Act
  const { result } = renderHook(() => useEvent((a: number, b: number) => a + b))

  // Assert
  expect(result.current(2, 3)).toBe(5)
})
