import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { SolidButton, FilledButton } from './SolidButton'

afterEach(() => cleanup())

describe('SolidButton', () => {
  test('children을 포함하여 렌더된다', () => {
    render(
      <SolidButton color="black" size="medium">
        <SolidButton.Center>버튼</SolidButton.Center>
      </SolidButton>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('버튼')).toBeInTheDocument()
  })

  test('color/size variant 별로 다르게 렌더된다', () => {
    const { rerender } = render(
      <SolidButton color="black" size="small">
        <SolidButton.Center>small</SolidButton.Center>
      </SolidButton>
    )

    const small = screen.getByRole('button')
    const smallHtml = small.outerHTML

    rerender(
      <SolidButton color="primary" size="large">
        <SolidButton.Center>large</SolidButton.Center>
      </SolidButton>
    )

    const large = screen.getByRole('button')
    expect(large.outerHTML).not.toBe(smallHtml)
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <SolidButton ref={ref} color="black" size="medium">
        <SolidButton.Center>버튼</SolidButton.Center>
      </SolidButton>
    )

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  test('클릭 핸들러가 호출된다', () => {
    const onClick = vi.fn()
    render(
      <SolidButton color="black" size="medium" onClick={onClick}>
        <SolidButton.Center>클릭</SolidButton.Center>
      </SolidButton>
    )

    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('disabled 상태에서는 클릭 핸들러가 호출되지 않는다', () => {
    const onClick = vi.fn()
    render(
      <SolidButton color="black" size="medium" disabled onClick={onClick}>
        <SolidButton.Center>비활성</SolidButton.Center>
      </SolidButton>
    )

    const btn = screen.getByRole('button')
    btn.click()
    expect(onClick).not.toHaveBeenCalled()
    expect(btn).toBeDisabled()
  })

  test('Leading/Trailing 서브컴포넌트가 렌더된다', () => {
    render(
      <SolidButton color="black" size="medium">
        <SolidButton.Leading>
          <span data-testid="leading">L</span>
        </SolidButton.Leading>
        <SolidButton.Center>중앙</SolidButton.Center>
        <SolidButton.Trailing>
          <span data-testid="trailing">T</span>
        </SolidButton.Trailing>
      </SolidButton>
    )

    expect(screen.getByTestId('leading')).toBeInTheDocument()
    expect(screen.getByTestId('trailing')).toBeInTheDocument()
    expect(screen.getByText('중앙')).toBeInTheDocument()
  })

  test('FilledButton alias는 SolidButton과 같다', () => {
    expect(FilledButton).toBe(SolidButton)
  })
})
