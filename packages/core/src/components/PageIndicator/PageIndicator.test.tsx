import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { PageDots } from '../PageDots'

import { PageIndicator } from './PageIndicator'

afterEach(() => cleanup())

describe('PageIndicator', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(
      <PageIndicator data-testid="indicator">
        <PageDots />
        <PageDots />
      </PageIndicator>
    )

    expect(screen.getByTestId('indicator')).toBeInTheDocument()
  })

  test('navigation landmark로 렌더링되고 Pagination 라벨을 가진다.', () => {
    render(
      <PageIndicator>
        <PageDots />
        <PageDots />
      </PageIndicator>
    )

    // <nav aria-label="Pagination"> 형태. tablist는 페이지네이션에 적절한 시맨틱이 아니다.
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
  })

  test('ref가 root 요소에 전달된다.', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <PageIndicator ref={ref} data-testid="indicator">
        <PageDots />
      </PageIndicator>
    )

    expect(ref.current).toBe(screen.getByTestId('indicator'))
  })

  test('자식 PageDots 요소들이 렌더링된다.', () => {
    render(
      <PageIndicator>
        <PageDots />
        <PageDots />
        <PageDots />
      </PageIndicator>
    )

    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  test('currentPage에 해당하는 PageDots가 selected 상태가 된다.', () => {
    render(
      <PageIndicator currentPage={1}>
        <PageDots />
        <PageDots />
        <PageDots />
      </PageIndicator>
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'false')
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'true')
    expect(buttons[2]).toHaveAttribute('aria-pressed', 'false')
  })

  test('PageDots 클릭 시 onPageChange가 호출된다.', async () => {
    const handler = vi.fn()
    render(
      <PageIndicator currentPage={0} onPageChange={handler}>
        <PageDots />
        <PageDots />
      </PageIndicator>
    )

    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[1])

    expect(handler).toHaveBeenCalledWith(1)
  })

  test('전달된 className이 적용된다.', () => {
    render(
      <PageIndicator data-testid="indicator" className="custom-class">
        <PageDots />
      </PageIndicator>
    )

    expect(screen.getByTestId('indicator')).toHaveClass('custom-class')
  })

  test('theme.fillColor가 배경색으로 적용된다.', () => {
    render(
      <PageIndicator data-testid="indicator" theme={{ fillColor: 'rgb(100, 100, 100)' }}>
        <PageDots />
      </PageIndicator>
    )

    expect(screen.getByTestId('indicator')).toHaveStyle({
      'background-color': 'rgb(100, 100, 100)',
    })
  })
})
