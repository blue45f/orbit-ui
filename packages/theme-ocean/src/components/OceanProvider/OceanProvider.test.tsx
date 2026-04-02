import { render, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { darkTheme, lightTheme } from '../../styles'
import { FilledButton } from '../SolidButton'

import { OceanProvider } from './OceanProvider'

afterEach(() => cleanup())

describe('OceanProvider', () => {
  test('light/dark 테마 클래스명 바인딩 여부', () => {
    render(
      <OceanProvider mode='light'>
        <FilledButton color='black' size='medium'>
          Light Theme
        </FilledButton>
      </OceanProvider>,
    )
    expect(document.body.classList.contains(lightTheme)).toBeTruthy()

    render(
      <OceanProvider mode='dark'>
        <FilledButton color='black' size='medium'>
          Dark Theme
        </FilledButton>
      </OceanProvider>,
    )
    expect(document.body.classList.contains(darkTheme)).toBeTruthy()
  })

  test('기본값은 light 테마', () => {
    render(
      <OceanProvider>
        <FilledButton color='black' size='medium'>
          Default Theme
        </FilledButton>
      </OceanProvider>,
    )
    expect(document.body.classList.contains(lightTheme)).toBeTruthy()
  })
})

