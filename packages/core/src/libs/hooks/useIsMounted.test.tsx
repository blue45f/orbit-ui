import { cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { useIsMounted } from './useIsMounted'

afterEach(() => cleanup())

test('useIsMounted: 마운트된 후에는 true를 반환한다', () => {
  // Arrange & Act
  const { result } = renderHook(() => useIsMounted())

  // Assert
  expect(result.current()).toBe(true)
})

test('useIsMounted: 언마운트되면 false를 반환한다', () => {
  // Arrange
  const { result, unmount } = renderHook(() => useIsMounted())
  expect(result.current()).toBe(true)

  // Act
  unmount()

  // Assert
  expect(result.current()).toBe(false)
})
