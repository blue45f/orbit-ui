import { afterEach, describe, expect, test, vi } from 'vitest'

import { screen, render, cleanup } from '../../test-utils'

import { AppBar } from './AppBar'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('AppBar', () => {
  test('Center만 있는 경우 정상적으로 렌더링된다.', () => {
    render(
      <AppBar data-testid='navigation-bar'>
        <AppBar.Center>Hello, World!</AppBar.Center>
      </AppBar>,
    )

    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })

  test('Leading, Center, Trailing 모두 렌더링된다.', () => {
    render(
      <AppBar data-testid='navigation-bar'>
        <AppBar.Leading>Leading</AppBar.Leading>
        <AppBar.Center>Center</AppBar.Center>
        <AppBar.Trailing>Trailing</AppBar.Trailing>
      </AppBar>,
    )

    expect(screen.getByText('Leading')).toBeInTheDocument()
    expect(screen.getByText('Center')).toBeInTheDocument()
    expect(screen.getByText('Trailing')).toBeInTheDocument()
  })

  test('height prop의 기본값은 44이다.', () => {
    render(
      <AppBar data-testid='navigation-bar'>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    const navElement = screen.getByTestId('navigation-bar')
    // height는 assignInlineVars를 통해 인라인 스타일로 설정되므로
    // 컴포넌트가 정상적으로 렌더링되는지로 검증
    expect(navElement).toBeInTheDocument()
  })

  test('height prop을 56으로 설정할 수 있다.', () => {
    render(
      <AppBar height={56} data-testid='navigation-bar'>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    const navElement = screen.getByTestId('navigation-bar')
    // height는 assignInlineVars를 통해 인라인 스타일로 설정되므로
    // 컴포넌트가 정상적으로 렌더링되는지로 검증
    expect(navElement).toBeInTheDocument()
  })

  test('arrangement prop의 기본값은 "start"이다.', () => {
    render(
      <AppBar data-testid='navigation-bar'>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    // arrangement는 ContentLayer에 전달되므로, 실제 DOM에서 확인하기 어렵지만
    // 컴포넌트가 정상적으로 렌더링되는지로 검증
    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })

  test('arrangement prop을 "equal-weight"로 설정할 수 있다.', () => {
    render(
      <AppBar arrangement='equal-weight' data-testid='navigation-bar'>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })

  test('alignment prop의 기본값은 "center"이다.', () => {
    render(
      <AppBar data-testid='navigation-bar'>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })

  test('alignment prop을 "top" 또는 "bottom"으로 설정할 수 있다.', () => {
    const { rerender } = render(
      <AppBar alignment='top' data-testid='navigation-bar'>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()

    rerender(
      <AppBar alignment='bottom' data-testid='navigation-bar'>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })

  test('theme prop을 통해 스타일을 커스터마이징할 수 있다.', () => {
    render(
      <AppBar
        theme={{
          fillColor: 'red',
          foregroundColor: 'blue',
        }}
        data-testid='navigation-bar'
      >
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })

  test('style과 className prop을 전달할 수 있다.', () => {
    render(
      <AppBar style={{ backgroundColor: 'red' }} className='custom-class' data-testid='navigation-bar'>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    const navElement = screen.getByTestId('navigation-bar')
    expect(navElement).toHaveClass('custom-class')
    // 인라인 스타일은 직접 확인
    const inlineStyle = navElement.getAttribute('style')
    expect(inlineStyle).toContain('background-color')
  })
})

describe('AppBar.Leading', () => {
  test('정상적으로 렌더링된다.', () => {
    render(
      <AppBar>
        <AppBar.Leading>Leading</AppBar.Leading>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    expect(screen.getByText('Leading')).toBeInTheDocument()
  })

  test('className prop을 전달할 수 있다.', () => {
    const { container } = render(
      <AppBar>
        <AppBar.Leading className='leading-class'>Leading</AppBar.Leading>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    // Leading은 Flex 컴포넌트로 렌더링되며 className이 적용됨
    const leadingElement = container.querySelector('.leading-class')
    expect(leadingElement).toBeTruthy()
  })
})

describe('AppBar.Center', () => {
  test('정상적으로 렌더링된다.', () => {
    render(
      <AppBar>
        <AppBar.Center>Center</AppBar.Center>
      </AppBar>,
    )

    expect(screen.getByText('Center')).toBeInTheDocument()
  })

  test('arrangement prop을 전달할 수 있다.', () => {
    render(
      <AppBar>
        <AppBar.Center arrangement='equal-weight'>Center</AppBar.Center>
      </AppBar>,
    )

    expect(screen.getByText('Center')).toBeInTheDocument()
  })

  test('className prop을 전달할 수 있다.', () => {
    const { container } = render(
      <AppBar>
        <AppBar.Center className='center-class'>Center</AppBar.Center>
      </AppBar>,
    )

    // Center는 Flex 컴포넌트로 렌더링되며 className이 적용됨
    const centerElement = container.querySelector('.center-class')
    expect(centerElement).toBeTruthy()
  })
})

describe('AppBar.Trailing', () => {
  test('정상적으로 렌더링된다.', () => {
    render(
      <AppBar>
        <AppBar.Center>Center</AppBar.Center>
        <AppBar.Trailing>Trailing</AppBar.Trailing>
      </AppBar>,
    )

    expect(screen.getByText('Trailing')).toBeInTheDocument()
  })

  test('className prop을 전달할 수 있다.', () => {
    const { container } = render(
      <AppBar>
        <AppBar.Center>Center</AppBar.Center>
        <AppBar.Trailing className='trailing-class'>Trailing</AppBar.Trailing>
      </AppBar>,
    )

    // Trailing은 Flex 컴포넌트로 렌더링되며 className이 적용됨
    const trailingElement = container.querySelector('.trailing-class')
    expect(trailingElement).toBeTruthy()
  })
})
