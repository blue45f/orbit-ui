import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { AnimatedBadge } from './AnimatedBadge'

afterEach(() => cleanup())

describe('AnimatedBadge', () => {
  test('Label children을 포함하여 렌더된다', () => {
    render(
      <AnimatedBadge>
        <AnimatedBadge.Label>NEW</AnimatedBadge.Label>
      </AnimatedBadge>
    )
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  test('size variants가 leading slot 클래스에 반영된다', () => {
    const { rerender } = render(
      <AnimatedBadge size="small">
        <AnimatedBadge.Leading>
          <span data-testid="lead">★</span>
        </AnimatedBadge.Leading>
        <AnimatedBadge.Label>S</AnimatedBadge.Label>
      </AnimatedBadge>
    )
    const smallLeadingClass = screen.getByTestId('lead').parentElement?.className ?? ''
    expect(smallLeadingClass).toMatch(/w-2\.5/)

    rerender(
      <AnimatedBadge size="large">
        <AnimatedBadge.Leading>
          <span data-testid="lead">★</span>
        </AnimatedBadge.Leading>
        <AnimatedBadge.Label>S</AnimatedBadge.Label>
      </AnimatedBadge>
    )
    const largeLeadingClass = screen.getByTestId('lead').parentElement?.className ?? ''
    expect(largeLeadingClass).toMatch(/w-3\.5/)
  })

  test('color prop을 받을 수 있다', () => {
    render(
      <AnimatedBadge color="sale">
        <AnimatedBadge.Label>SALE</AnimatedBadge.Label>
      </AnimatedBadge>
    )
    expect(screen.getByText('SALE')).toBeInTheDocument()
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <AnimatedBadge ref={ref}>
        <AnimatedBadge.Label>NEW</AnimatedBadge.Label>
      </AnimatedBadge>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  test('Leading과 Label 서브컴포넌트가 함께 렌더된다', () => {
    render(
      <AnimatedBadge>
        <AnimatedBadge.Leading>
          <span data-testid="lead-icon">★</span>
        </AnimatedBadge.Leading>
        <AnimatedBadge.Label>BADGE</AnimatedBadge.Label>
      </AnimatedBadge>
    )
    expect(screen.getByTestId('lead-icon')).toBeInTheDocument()
    expect(screen.getByText('BADGE')).toBeInTheDocument()
  })
})
