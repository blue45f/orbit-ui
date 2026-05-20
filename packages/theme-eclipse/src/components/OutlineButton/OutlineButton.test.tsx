import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { OutlineButton, OutlinedButton } from './OutlineButton'

afterEach(() => cleanup())

describe('OutlineButton', () => {
  test('children을 포함하여 렌더된다', () => {
    render(
      <OutlineButton color="black" size="medium">
        <OutlineButton.Center>버튼</OutlineButton.Center>
      </OutlineButton>
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('버튼')).toBeInTheDocument()
  })

  test('color/size에 따라 다르게 렌더된다', () => {
    const { rerender } = render(
      <OutlineButton color="black" size="small">
        <OutlineButton.Center>small</OutlineButton.Center>
      </OutlineButton>
    )
    const before = screen.getByRole('button').outerHTML

    rerender(
      <OutlineButton color="gray" size="large">
        <OutlineButton.Center>large</OutlineButton.Center>
      </OutlineButton>
    )
    expect(screen.getByRole('button').outerHTML).not.toBe(before)
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <OutlineButton ref={ref} color="black" size="medium">
        <OutlineButton.Center>버튼</OutlineButton.Center>
      </OutlineButton>
    )
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  test('클릭 시 onClick이 호출된다', () => {
    const onClick = vi.fn()
    render(
      <OutlineButton color="black" size="medium" onClick={onClick}>
        <OutlineButton.Center>클릭</OutlineButton.Center>
      </OutlineButton>
    )
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })

  test('disabled 상태에서 클릭 핸들러가 호출되지 않는다', () => {
    const onClick = vi.fn()
    render(
      <OutlineButton color="black" size="medium" disabled onClick={onClick}>
        <OutlineButton.Center>비활성</OutlineButton.Center>
      </OutlineButton>
    )
    screen.getByRole('button').click()
    expect(onClick).not.toHaveBeenCalled()
  })

  test('Leading/Trailing 서브컴포넌트가 렌더된다', () => {
    render(
      <OutlineButton color="black" size="medium">
        <OutlineButton.Leading>
          <span data-testid="leading">L</span>
        </OutlineButton.Leading>
        <OutlineButton.Center>중앙</OutlineButton.Center>
        <OutlineButton.Trailing>
          <span data-testid="trailing">T</span>
        </OutlineButton.Trailing>
      </OutlineButton>
    )
    expect(screen.getByTestId('leading')).toBeInTheDocument()
    expect(screen.getByTestId('trailing')).toBeInTheDocument()
    expect(screen.getByText('중앙')).toBeInTheDocument()
  })

  test('OutlinedButton alias는 OutlineButton과 같다', () => {
    expect(OutlinedButton).toBe(OutlineButton)
  })
})
