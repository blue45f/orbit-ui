import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { BreadcrumbComponent as Breadcrumb } from './Breadcrumb'

afterEach(() => cleanup())

describe('Breadcrumb', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(
      <Breadcrumb data-testid="breadcrumb">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    )

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
  })

  test('navigation role을 가지며 aria-label이 설정된다.', () => {
    render(<Breadcrumb data-testid="breadcrumb" />)

    const nav = screen.getByTestId('breadcrumb')
    expect(nav.tagName).toBe('NAV')
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb')
  })

  test('ref가 nav 요소에 전달된다.', () => {
    const ref = createRef<HTMLElement>()
    render(<Breadcrumb ref={ref} data-testid="breadcrumb" />)

    expect(ref.current).toBe(screen.getByTestId('breadcrumb'))
  })

  test('List는 ol 요소로 렌더링된다.', () => {
    render(
      <Breadcrumb.List data-testid="list">
        <Breadcrumb.Item>Item</Breadcrumb.Item>
      </Breadcrumb.List>
    )

    const list = screen.getByTestId('list')
    expect(list.tagName).toBe('OL')
  })

  test('Item은 li 요소로 렌더링된다.', () => {
    render(<Breadcrumb.Item data-testid="item">Item</Breadcrumb.Item>)

    const item = screen.getByTestId('item')
    expect(item.tagName).toBe('LI')
  })

  test('Link는 a 요소로 렌더링되며 href가 적용된다.', () => {
    render(
      <Breadcrumb.Link href="/home" data-testid="link">
        Home
      </Breadcrumb.Link>
    )

    const link = screen.getByTestId('link')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/home')
  })

  test('Page에 aria-current="page" 가 설정된다.', () => {
    render(<Breadcrumb.Page data-testid="page">Current Page</Breadcrumb.Page>)

    const page = screen.getByTestId('page')
    expect(page).toHaveAttribute('aria-current', 'page')
    // 현재 페이지는 navigable한 link가 아니므로 role="link"/aria-disabled를 부여하지 않는다.
  })

  test('Separator는 기본 "/" 를 렌더링한다.', () => {
    render(<Breadcrumb.Separator data-testid="sep" />)

    expect(screen.getByTestId('sep')).toHaveTextContent('/')
    expect(screen.getByTestId('sep')).toHaveAttribute('aria-hidden', 'true')
  })

  test('Separator는 사용자 정의 children을 렌더링한다.', () => {
    render(
      <Breadcrumb.Separator data-testid="sep">
        <span>{'>'}</span>
      </Breadcrumb.Separator>
    )

    expect(screen.getByTestId('sep')).toHaveTextContent('>')
  })

  test('Ellipsis가 정상 렌더링된다.', () => {
    render(<Breadcrumb.Ellipsis data-testid="ellipsis" />)

    const ellipsis = screen.getByTestId('ellipsis')
    expect(ellipsis).toBeInTheDocument()
    expect(ellipsis).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('More')).toBeInTheDocument()
  })

  test('전체 breadcrumb 구조가 정상 동작한다.', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
  })
})
