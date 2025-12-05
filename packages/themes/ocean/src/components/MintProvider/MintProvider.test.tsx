import { render, cleanup } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { darkTheme, lightTheme } from '../../styles'
import { FilledButton } from '../SolidButton'

import { MintProvider } from './MintProvider'

afterEach(() => cleanup())

test('light/dark 테마 클래스명 바인딩 여부', () => {
  render(
    <MintProvider mode='light'>
      <FilledButton color='black' size='medium'>
        Light Theme
      </FilledButton>
    </MintProvider>,
  )
  expect(document.body.classList.contains(lightTheme)).toBeTruthy()

  render(
    <MintProvider mode='dark'>
      <FilledButton color='black' size='medium'>
        Dark Theme
      </FilledButton>
    </MintProvider>,
  )
  expect(document.body.classList.contains(darkTheme)).toBeTruthy()
})

test('기본값은 light 테마', () => {
  render(
    <MintProvider>
      <FilledButton color='black' size='medium'>
        Default Theme
      </FilledButton>
    </MintProvider>,
  )
  expect(document.body.classList.contains(lightTheme)).toBeTruthy()
})
