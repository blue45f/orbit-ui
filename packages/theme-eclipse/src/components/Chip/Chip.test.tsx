import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { Chip } from './Chip'

afterEach(() => cleanup())

describe('Chip', () => {
  test('children을 포함하여 button으로 렌더된다', () => {
    render(<Chip>Chip</Chip>)
    expect(screen.getByRole('button', { name: 'Chip' })).toBeInTheDocument()
  })

  test('Leading 서브컴포넌트가 렌더된다', () => {
    render(
      <Chip>
        <Chip.Leading>
          <span data-testid="lead">L</span>
        </Chip.Leading>
        Chip
      </Chip>
    )
    expect(screen.getByTestId('lead')).toBeInTheDocument()
    expect(screen.getByText('Chip')).toBeInTheDocument()
  })

  test('Trailing 서브컴포넌트가 렌더된다', () => {
    render(
      <Chip>
        Chip
        <Chip.Trailing>
          <span data-testid="trail">T</span>
        </Chip.Trailing>
      </Chip>
    )
    expect(screen.getByTestId('trail')).toBeInTheDocument()
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Chip ref={ref}>Chip</Chip>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  test('클릭 핸들러가 호출된다', () => {
    const onClick = vi.fn()
    render(<Chip onClick={onClick}>Chip</Chip>)
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })

  test('disabled 상태에서는 클릭 핸들러가 호출되지 않는다', () => {
    const onClick = vi.fn()
    render(
      <Chip disabled onClick={onClick}>
        Chip
      </Chip>
    )
    screen.getByRole('button').click()
    expect(onClick).not.toHaveBeenCalled()
  })
})
