import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { ChipLink } from './ChipLink'

afterEach(() => cleanup())

describe('ChipLink', () => {
  test('a 태그로 렌더되며 href를 가진다', () => {
    render(<ChipLink href="https://example.com">방문</ChipLink>)
    const link = screen.getByRole('link', { name: '방문' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  test('target 속성이 전달된다', () => {
    render(
      <ChipLink href="https://example.com" target="_blank">
        Link
      </ChipLink>
    )
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  })

  test('Leading 서브컴포넌트가 렌더된다', () => {
    render(
      <ChipLink href="#">
        <ChipLink.Leading>
          <span data-testid="lead">L</span>
        </ChipLink.Leading>
        ChipLink
      </ChipLink>
    )
    expect(screen.getByTestId('lead')).toBeInTheDocument()
    expect(screen.getByText('ChipLink')).toBeInTheDocument()
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLAnchorElement>()
    render(
      <ChipLink ref={ref} href="#">
        Link
      </ChipLink>
    )
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
  })
})
