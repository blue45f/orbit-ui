import { expect, test } from 'vitest'

import { lightTheme, darkTheme } from '../styles/theme.css'

import { getTheme } from './getTheme'

test('기본값은 light theme이다', () => {
  const themeClass = getTheme()

  expect(themeClass.includes(darkTheme)).not.toBeTruthy()
  expect(themeClass.includes(lightTheme)).toBeTruthy()
})

test('dark theme를 선택할 수 있다', () => {
  const themeClass = getTheme({ mode: 'dark' })

  expect(themeClass.includes(darkTheme)).toBeTruthy()
  expect(themeClass.includes(lightTheme)).not.toBeTruthy()
})
