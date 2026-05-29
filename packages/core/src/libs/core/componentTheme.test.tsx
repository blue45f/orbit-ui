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

test('useComponentTheme: override 값이 undefined면 base 값을 유지한다', () => {
  // Arrange & Act: undefined override는 건너뛴다
  const { result } = renderHook(() =>
    useComponentTheme({ a: 'x', b: 'y' }, { a: undefined } as unknown as Partial<
      Record<'a' | 'b', string>
    >)
  )

  // Assert
  expect(result.current.themeVars).toEqual({ a: 'x', b: 'y' })
})

test('useComponentTheme: themeStyle은 falsy(빈 문자열) 값을 CSS 변수에서 제외한다', () => {
  // Arrange & Act
  const { result } = renderHook(() => useComponentTheme({ fillColor: '', textColor: 'red' }))

  // Assert: 빈 문자열인 fillColor는 제외된다
  expect(result.current.themeStyle).toEqual({ '--text-color': 'red' })
})

test('linkComponentTheme: to에 없는 키는 매핑에서 제외한다', () => {
  // Arrange & Act: to에 b가 없으므로 a만 매핑된다
  const linked = linkComponentTheme(
    { a: '--a', b: '--b' },
    { a: 'red' } as unknown as Record<'a' | 'b', string>
  )

  // Assert
  expect(linked).toEqual({ '--a': 'red' })
})
