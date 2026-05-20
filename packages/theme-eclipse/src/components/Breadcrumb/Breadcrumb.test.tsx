import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Breadcrumb } from './Breadcrumb'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Breadcrumb', () => {
  test('navigation 역할로 렌더링되고 aria-label이 breadcrumb이다', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Page>Home</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    )

    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument()
  })

  test('Link/Page/Separator 서브컴포넌트가 모두 렌더링된다', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">홈</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>현재 페이지</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    )

    expect(screen.getByText('홈')).toBeInTheDocument()
    expect(screen.getByText('현재 페이지')).toBeInTheDocument()
  })

  test('Page는 aria-current=page 속성을 가진다', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Page>현재</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    )

    const page = screen.getByText('현재')
    expect(page).toHaveAttribute('aria-current', 'page')
  })

  test('Link는 href 속성을 가진다', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/components">컴포넌트</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    )

    const link = screen.getByText('컴포넌트')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/components')
  })

  test('Ellipsis 컴포넌트가 렌더링된다', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis />
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    )

    expect(screen.getByText('More')).toBeInTheDocument()
  })

  test('ref를 전달할 수 있다', () => {
    const ref = createRef<HTMLElement>()
    render(
      <Breadcrumb ref={ref}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Page>R</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('NAV')
  })
})
