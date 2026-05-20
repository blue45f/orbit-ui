import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { SolidIconButton } from './SolidIconButton'

afterEach(() => cleanup())

describe('SolidIconButton', () => {
  test('아이콘 children을 포함하여 렌더된다', () => {
    render(
      <SolidIconButton color="black" size="medium" aria-label="add">
        <span data-testid="icon">+</span>
      </SolidIconButton>
    )
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  test('size/color에 따라 다르게 렌더된다', () => {
    const { rerender } = render(
      <SolidIconButton color="black" size="small" aria-label="btn">
        <span>+</span>
      </SolidIconButton>
    )
    const before = screen.getByRole('button').outerHTML

    rerender(
      <SolidIconButton color="white" size="large" aria-label="btn">
        <span>+</span>
      </SolidIconButton>
    )
    expect(screen.getByRole('button').outerHTML).not.toBe(before)
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <SolidIconButton ref={ref} color="black" size="medium" aria-label="btn">
        <span>+</span>
      </SolidIconButton>
    )
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  test('클릭 핸들러가 호출된다', () => {
    const onClick = vi.fn()
    render(
      <SolidIconButton color="black" size="medium" aria-label="btn" onClick={onClick}>
        <span>+</span>
      </SolidIconButton>
    )
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })

  test('disabled 상태에서 클릭 핸들러가 호출되지 않는다', () => {
    const onClick = vi.fn()
    render(
      <SolidIconButton
        color="black"
        size="medium"
        aria-label="btn"
        disabled
        onClick={onClick}
      >
        <span>+</span>
      </SolidIconButton>
    )
    screen.getByRole('button').click()
    expect(onClick).not.toHaveBeenCalled()
  })
})
