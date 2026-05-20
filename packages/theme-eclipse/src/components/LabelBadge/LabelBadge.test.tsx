import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { LabelBadge } from './LabelBadge'

afterEach(() => cleanup())

describe('LabelBadge', () => {
  test('Label 텍스트를 렌더한다', () => {
    render(
      <LabelBadge>
        <LabelBadge.Label>BADGE</LabelBadge.Label>
      </LabelBadge>
    )
    expect(screen.getByText('BADGE')).toBeInTheDocument()
  })

  test('다양한 color variants에서 충돌 없이 렌더된다', () => {
    const colors = ['gray', 'sale'] as const
    colors.forEach((color) => {
      const { unmount } = render(
        <LabelBadge color={color}>
          <LabelBadge.Label>X</LabelBadge.Label>
        </LabelBadge>
      )
      expect(screen.getByText('X')).toBeInTheDocument()
      unmount()
    })
  })

  test('Visual과 Label 서브컴포넌트가 함께 렌더된다', () => {
    render(
      <LabelBadge>
        <LabelBadge.Visual>
          <span data-testid="visual">★</span>
        </LabelBadge.Visual>
        <LabelBadge.Label>BADGE</LabelBadge.Label>
      </LabelBadge>
    )
    expect(screen.getByTestId('visual')).toBeInTheDocument()
    expect(screen.getByText('BADGE')).toBeInTheDocument()
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <LabelBadge ref={ref}>
        <LabelBadge.Label>BADGE</LabelBadge.Label>
      </LabelBadge>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
