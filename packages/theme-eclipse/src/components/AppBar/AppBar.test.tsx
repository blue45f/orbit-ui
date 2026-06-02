import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { AppBar } from './AppBar'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('AppBar', () => {
  test('Center만 렌더링된다', () => {
    render(
      <AppBar data-testid="bar">
        <AppBar.Center>Title</AppBar.Center>
      </AppBar>
    )

    expect(screen.getByTestId('bar')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  test('Leading/Center/Trailing 슬롯이 모두 렌더링된다', () => {
    render(
      <AppBar>
        <AppBar.Leading>Back</AppBar.Leading>
        <AppBar.Center>Page Title</AppBar.Center>
        <AppBar.Trailing>Action</AppBar.Trailing>
      </AppBar>
    )

    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Page Title')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  test('nav 요소로 렌더링되어 navigation 역할을 가진다', () => {
    render(
      <AppBar>
        <AppBar.Center>Nav</AppBar.Center>
      </AppBar>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  test('ref를 전달할 수 있다', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <AppBar ref={ref}>
        <AppBar.Center>Ref</AppBar.Center>
      </AppBar>
    )

    expect(ref.current).not.toBeNull()
  })

  test('theme prop으로 토큰을 오버라이드할 수 있다', () => {
    render(
      <AppBar data-testid="themed" theme={{ fillColor: 'rgb(255, 0, 0)' }}>
        <AppBar.Center>Themed</AppBar.Center>
      </AppBar>
    )

    expect(screen.getByTestId('themed')).toBeInTheDocument()
  })
})
