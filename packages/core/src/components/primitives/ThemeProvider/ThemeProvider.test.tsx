import { render, cleanup } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { ThemeProvider } from './ThemeProvider'

afterEach(() => cleanup())

test('body 태그에 테마 클래스명을 `하나만` 추가한다', () => {
  const { rerender } = render(<ThemeProvider themeClass='light-theme'>theme</ThemeProvider>)

  expect(document.body.classList.contains('light-theme')).toBeTruthy()

  rerender(<ThemeProvider themeClass='dark-theme'>theme</ThemeProvider>)

  expect(document.body.classList.contains('light-theme')).toBeFalsy()
  expect(document.body.classList.contains('dark-theme')).toBeTruthy()
})
