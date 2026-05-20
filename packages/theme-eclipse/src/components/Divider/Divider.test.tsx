import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { Divider } from './Divider'

afterEach(() => cleanup())

describe('Divider', () => {
  test('separator role로 렌더된다', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  test('기본 orientation은 horizontal이다', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal')
  })

  test('orientation="vertical" 이 적용된다', () => {
    render(<Divider orientation="vertical" length="20px" />)
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
  })
})
