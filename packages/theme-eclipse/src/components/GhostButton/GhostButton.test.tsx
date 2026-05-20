import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { GhostButton, TextButton } from './GhostButton'

afterEach(() => cleanup())

describe('GhostButton', () => {
  test('children을 포함하여 렌더된다', () => {
    render(
      <GhostButton color="black" size="small">
        <GhostButton.Center>버튼</GhostButton.Center>
      </GhostButton>
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('버튼')).toBeInTheDocument()
  })

  test('color/size 별로 다르게 렌더된다', () => {
    const { rerender } = render(
      <GhostButton color="black" size="small">
        <GhostButton.Center>small</GhostButton.Center>
      </GhostButton>
    )
    const before = screen.getByRole('button').outerHTML

    rerender(
      <GhostButton color="gray" size="large">
        <GhostButton.Center>large</GhostButton.Center>
      </GhostButton>
    )
    expect(screen.getByRole('button').outerHTML).not.toBe(before)
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <GhostButton ref={ref} color="black" size="small">
        <GhostButton.Center>버튼</GhostButton.Center>
      </GhostButton>
    )
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  test('클릭 핸들러가 호출된다', () => {
    const onClick = vi.fn()
    render(
      <GhostButton color="black" size="small" onClick={onClick}>
        <GhostButton.Center>클릭</GhostButton.Center>
      </GhostButton>
    )
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })

  test('Trailing 서브컴포넌트가 렌더된다', () => {
    render(
      <GhostButton color="black" size="large">
        <GhostButton.Center>중앙</GhostButton.Center>
        <GhostButton.Trailing>
          <span data-testid="trailing">T</span>
        </GhostButton.Trailing>
      </GhostButton>
    )
    expect(screen.getByText('중앙')).toBeInTheDocument()
    expect(screen.getByTestId('trailing')).toBeInTheDocument()
  })

  test('TextButton alias는 GhostButton과 같다', () => {
    expect(TextButton).toBe(GhostButton)
  })
})
