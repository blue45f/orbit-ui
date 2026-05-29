import { cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { usePrevious } from './usePrevious'

afterEach(() => cleanup())

test('usePrevious: 첫 렌더에서는 현재 값과 동일한 값을 반환한다', () => {
  // Arrange & Act
  const { result } = renderHook(() => usePrevious('a'))

  // Assert
  expect(result.current).toBe('a')
})

test('usePrevious: 값이 바뀌면 직전 렌더의 값을 반환한다', () => {
  // Arrange
  const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
    initialProps: { value: 'a' },
  })
  expect(result.current).toBe('a')

  // Act & Assert: 'b'의 직전 값은 'a'
  rerender({ value: 'b' })
  expect(result.current).toBe('a')

  // Act & Assert: 'c'의 직전 값은 'b'
  rerender({ value: 'c' })
  expect(result.current).toBe('b')
})
