import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { PageDots } from '../PageDots'

import { PageIndicator } from './PageIndicator'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('PageIndicator', () => {
  test('자식 PageDots들이 렌더링된다', () => {
    render(
      <PageIndicator data-testid="indicator">
        <PageDots />
        <PageDots />
        <PageDots />
      </PageIndicator>
    )

    expect(screen.getByTestId('indicator')).toBeInTheDocument()
    expect(screen.getAllByRole('button').length).toBe(3)
  })

  test('currentPage prop을 전달할 수 있다', () => {
    render(
      <PageIndicator currentPage={1} data-testid="indicator">
        <PageDots />
        <PageDots />
        <PageDots />
      </PageIndicator>
    )

    expect(screen.getByTestId('indicator')).toBeInTheDocument()
  })

  test('빈 children도 정상 렌더링된다', () => {
    render(<PageIndicator data-testid="empty" />)

    expect(screen.getByTestId('empty')).toBeInTheDocument()
  })

  test('ref를 전달할 수 있다', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <PageIndicator ref={ref}>
        <PageDots />
      </PageIndicator>
    )

    expect(ref.current).not.toBeNull()
  })

  test('theme prop으로 토큰을 오버라이드할 수 있다', () => {
    render(
      <PageIndicator data-testid="themed" theme={{ gap: '8px' }}>
        <PageDots />
      </PageIndicator>
    )

    expect(screen.getByTestId('themed')).toBeInTheDocument()
  })
})
