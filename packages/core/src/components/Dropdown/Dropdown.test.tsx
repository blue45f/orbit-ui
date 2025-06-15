import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Dropdown } from './Dropdown'

afterEach(() => {
  cleanup()
})

describe('Dropdown', () => {
  it('should render correctly', () => {
    render(<Dropdown value="Option 1" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('should show placeholder when value is not provided', () => {
    render(<Dropdown placeholder="Select an option" />)
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('should forward ref to button element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Dropdown ref={ref} value="Option 1" />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Dropdown value="Option 1" onClick={handleClick} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith(expect.anything())
  })

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Dropdown value="Option 1" disabled onClick={handleClick} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should apply disabled attribute', () => {
    render(<Dropdown value="Option 1" disabled />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should show default chevron when trailing slot is not provided', () => {
    render(<Dropdown value="Option 1" />)
    const svg = screen.getByRole('button').querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should not show default chevron when trailing slot is provided', () => {
    render(
      <Dropdown value="Option 1">
        <Dropdown.Trailing>
          <div data-testid="custom-trailing">Custom</div>
        </Dropdown.Trailing>
      </Dropdown>
    )
    const customTrailing = screen.getByTestId('custom-trailing')
    expect(customTrailing).toBeInTheDocument()

    // Default chevron이 없어야 함
    const button = screen.getByRole('button')
    const svgs = button.querySelectorAll('svg')
    // custom-trailing의 svg만 있어야 함 (기본 chevron은 없음)
    expect(svgs.length).toBe(0) // custom-trailing은 div만 있음
  })

  it('should render leading slot', () => {
    render(
      <Dropdown value="Option 1">
        <Dropdown.Leading>
          <div data-testid="custom-leading">Leading</div>
        </Dropdown.Leading>
      </Dropdown>
    )
    const customLeading = screen.getByTestId('custom-leading')
    expect(customLeading).toBeInTheDocument()
  })

  it('should not render leading slot when not provided', () => {
    render(<Dropdown value="Option 1" />)
    const button = screen.getByRole('button')
    const leadingElements = button.querySelectorAll('[data-testid="custom-leading"]')
    expect(leadingElements.length).toBe(0)
  })

  it('should apply data attributes based on state', () => {
    const { rerender } = render(<Dropdown value="Option 1" activated={false} disabled={false} />)
    const container = screen.getByRole('button').parentElement

    expect(container).toHaveAttribute('data-selected', 'true') // value가 있으므로 selected
    expect(container).toHaveAttribute('data-activated', 'false')
    expect(container).toHaveAttribute('data-disabled', 'false')

    rerender(<Dropdown placeholder="Empty" activated={true} disabled={true} />)

    expect(container).toHaveAttribute('data-selected', 'false') // value가 없으므로 unselected
    expect(container).toHaveAttribute('data-activated', 'true')
    expect(container).toHaveAttribute('data-disabled', 'true')
  })

  it('should determine selected state based on value prop', () => {
    const { rerender } = render(<Dropdown placeholder="Empty" />)
    const container = screen.getByRole('button').parentElement

    expect(container).toHaveAttribute('data-selected', 'false')

    rerender(<Dropdown value="Option 1" />)
    expect(container).toHaveAttribute('data-selected', 'true')
  })

  it('should handle click on trailing slot (chevron)', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Dropdown value="Option 1" onClick={handleClick} />)

    const button = screen.getByRole('button')
    const svg = button.querySelector('svg')
    expect(svg).toBeInTheDocument()

    // Chevron을 클릭해도 button의 onClick이 호출되어야 함
    if (svg?.parentElement) {
      await user.click(svg.parentElement)
      expect(handleClick).toHaveBeenCalledTimes(1)
    }
  })
})
