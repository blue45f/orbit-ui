import { renderHook } from '@testing-library/react'
import { expect, test } from 'vitest'

import { linkComponentTheme, useComponentTheme } from './componentTheme'

test('linkComponentTheme: from의 값을 키로, to의 값을 값으로 매핑한다', () => {
  // Arrange
  const from = { fill: '--btn-fill', text: '--btn-text' }
  const to = { fill: 'red', text: 'white' }

  // Act & Assert
  expect(linkComponentTheme(from, to)).toEqual({
    '--btn-fill': 'red',
    '--btn-text': 'white',
  })
})

test('useComponentTheme: overrides가 base를 덮어쓴 themeVars를 반환한다', () => {
  // Arrange & Act
  const { result } = renderHook(() =>
    useComponentTheme({ fillColor: 'blue', textColor: 'black' }, { fillColor: 'red' })
  )

  // Assert
  expect(result.current.themeVars).toEqual({ fillColor: 'red', textColor: 'black' })
})

test('useComponentTheme: themeStyle은 camelCase 키를 --kebab-case CSS 변수로 변환한다', () => {
  // Arrange & Act
  const { result } = renderHook(() => useComponentTheme({ fillColor: 'red' }))

  // Assert
  expect(result.current.themeStyle).toEqual({ '--fill-color': 'red' })
})
