import { createRef } from 'react'
import { describe, expect, it, vi, afterEach } from 'vitest'

import { render, screen, fireEvent, cleanup } from '../../test-utils'

import { TextFieldWithLabelAnimation } from './FloatingTextField'

describe('TextFieldWithLabelAnimation', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with label', () => {
    render(<TextFieldWithLabelAnimation label='이메일을 입력하세요' />)

    const label = screen.getByText('이메일을 입력하세요')
    expect(label).toBeInTheDocument()
  })

  it('label is initially inactive (centered)', () => {
    render(<TextFieldWithLabelAnimation label='라벨' />)

    const label = screen.getByText('라벨')
    // When not focused and not populated, label is centered (has -translate-y-1/2 class)
    expect(label).toHaveClass('top-1/2')
  })

  it('label becomes active when focused', () => {
    render(<TextFieldWithLabelAnimation label='라벨' />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('라벨')

    fireEvent.focus(input)

    // When focused, label floats to top
    expect(label).toHaveClass('top-0')
    expect(label).toHaveClass('text-xs')
  })

  it('label remains active when populated', () => {
    render(<TextFieldWithLabelAnimation label='라벨' />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('라벨')

    fireEvent.change(input, { target: { value: 'test' } })

    // When populated, label floats to top
    expect(label).toHaveClass('top-0')
    expect(label).toHaveClass('text-xs')
  })

  it('label stays active after blur when populated', () => {
    render(<TextFieldWithLabelAnimation label='라벨' />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('라벨')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.blur(input)

    // When populated (even after blur), label stays floated
    expect(label).toHaveClass('top-0')
    expect(label).toHaveClass('text-xs')
  })

  it('label becomes inactive after blur when empty', () => {
    render(<TextFieldWithLabelAnimation label='라벨' />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('라벨')

    fireEvent.focus(input)
    expect(label).toHaveClass('top-0')

    fireEvent.blur(input)
    // When empty and not focused, label returns to center
    expect(label).toHaveClass('top-1/2')
  })

  it('label is active initially when defaultValue is provided', () => {
    render(<TextFieldWithLabelAnimation label='라벨' defaultValue='initial value' />)

    const label = screen.getByText('라벨')
    expect(label).toHaveClass('top-0')
    expect(label).toHaveClass('text-xs')
  })

  it('handles onChange event', () => {
    const handleChange = vi.fn()
    render(<TextFieldWithLabelAnimation label='라벨' onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'a' } })

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange.mock.calls[0][0].target.value).toBe('a')
  })

  it('applies disabled state', () => {
    render(<TextFieldWithLabelAnimation label='라벨' disabled />)

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('forwards ref to input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextFieldWithLabelAnimation ref={ref} label='라벨' />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.tagName).toBe('INPUT')
  })

  it('renders with leading slot', () => {
    render(
      <TextFieldWithLabelAnimation label='라벨'>
        <TextFieldWithLabelAnimation.Leading>@</TextFieldWithLabelAnimation.Leading>
      </TextFieldWithLabelAnimation>,
    )

    const leading = screen.getByText('@')
    expect(leading).toBeInTheDocument()
  })

  it('renders with trailing slot', () => {
    render(
      <TextFieldWithLabelAnimation label='라벨'>
        <TextFieldWithLabelAnimation.Trailing>.com</TextFieldWithLabelAnimation.Trailing>
      </TextFieldWithLabelAnimation>,
    )

    const trailing = screen.getByText('.com')
    expect(trailing).toBeInTheDocument()
  })

  it('supports controlled mode', () => {
    const handleChange = vi.fn()
    const { rerender } = render(<TextFieldWithLabelAnimation label='라벨' value='' onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'a' } })

    expect(handleChange).toHaveBeenCalled()

    rerender(<TextFieldWithLabelAnimation label='라벨' value='a' onChange={handleChange} />)

    expect(input).toHaveValue('a')
  })
})
