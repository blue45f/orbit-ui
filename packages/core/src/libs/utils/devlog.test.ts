import { afterEach, expect, test, vi } from 'vitest'

import { errorDev, warnDev } from './devlog'

afterEach(() => vi.restoreAllMocks())

test('warnDev: 개발 환경에서 전달한 인자로 console.warn을 호출한다', () => {
  // Arrange
  const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})

  // Act
  warnDev('경고', 42)

  // Assert
  expect(spy).toHaveBeenCalledWith('경고', 42)
})

test('errorDev: 개발 환경에서 전달한 인자로 console.error를 호출한다', () => {
  // Arrange
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

  // Act
  errorDev('에러')

  // Assert
  expect(spy).toHaveBeenCalledWith('에러')
})
