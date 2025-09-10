import { render, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { darkTheme, lightTheme } from '../../styles'
import { FilledButton } from '../SolidButton'

import { EclipseProvider } from './EclipseProvider'

afterEach(() => cleanup())

describe('EclipseProvider', () => {
  test('light/dark 테마 클래스명 바인딩 여부', () => {
    render(
      <EclipseProvider mode="light">
        <FilledButton color="black" size="medium">
          Light Theme
        </FilledButton>
      </EclipseProvider>
    )
    expect(document.body.classList.contains(lightTheme)).toBeTruthy()

    render(
      <EclipseProvider mode="dark">
        <FilledButton color="black" size="medium">
          Dark Theme
        </FilledButton>
      </EclipseProvider>
    )
    expect(document.body.classList.contains(darkTheme)).toBeTruthy()
  })

  test('기본값은 light 테마', () => {
    render(
      <EclipseProvider>
        <FilledButton color="black" size="medium">
          Default Theme
        </FilledButton>
      </EclipseProvider>
    )
    expect(document.body.classList.contains(lightTheme)).toBeTruthy()
  })
})
