import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { OutlineIconButton, OutlinedIconButton } from './OutlineIconButton'

afterEach(() => cleanup())

describe('OutlineIconButton', () => {
  test('아이콘 children을 포함하여 렌더된다', () => {
    render(
      <OutlineIconButton color="black" size="medium" aria-label="add">
        <span data-testid="icon">+</span>
      </OutlineIconButton>
    )
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  test('size/color에 따라 다르게 렌더된다', () => {
    const { rerender } = render(
      <OutlineIconButton color="black" size="small" aria-label="btn">
        <span>+</span>
      </OutlineIconButton>
    )
    const before = screen.getByRole('button').outerHTML

    rerender(
      <OutlineIconButton color="gray" size="large" aria-label="btn">
        <span>+</span>
      </OutlineIconButton>
    )
    expect(screen.getByRole('button').outerHTML).not.toBe(before)
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <OutlineIconButton ref={ref} color="black" size="medium" aria-label="btn">
        <span>+</span>
      </OutlineIconButton>
    )
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  test('클릭 핸들러가 호출된다', () => {
    const onClick = vi.fn()
    render(
      <OutlineIconButton color="black" size="medium" aria-label="btn" onClick={onClick}>
        <span>+</span>
      </OutlineIconButton>
    )
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })

  test('disabled 상태에서 클릭 핸들러가 호출되지 않는다', () => {
    const onClick = vi.fn()
    render(
      <OutlineIconButton color="black" size="medium" aria-label="btn" disabled onClick={onClick}>
        <span>+</span>
      </OutlineIconButton>
    )
    screen.getByRole('button').click()
    expect(onClick).not.toHaveBeenCalled()
  })

  test('OutlinedIconButton alias는 OutlineIconButton과 같다', () => {
    expect(OutlinedIconButton).toBe(OutlineIconButton)
  })
})
