import { createRef } from 'react'
import { describe, expect, it, vi, afterEach } from 'vitest'

import { render, screen, fireEvent, cleanup } from '../../test-utils'

import { TextFieldWithLabelAnimation } from './FloatingTextField'

describe('TextFieldWithLabelAnimation', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with placeholder as label', () => {
    render(<TextFieldWithLabelAnimation placeholder='이메일을 입력하세요' />)

    const label = screen.getByText('이메일을 입력하세요')
    expect(label).toBeInTheDocument()
  })

  it('label is initially inactive (centered)', () => {
    render(<TextFieldWithLabelAnimation placeholder='라벨' />)

    const label = screen.getByText('라벨')
    expect(label).toHaveAttribute('data-active', 'false')
  })

  it('label becomes active when focused', () => {
    render(<TextFieldWithLabelAnimation placeholder='라벨' />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('라벨')

    fireEvent.focus(input)

    expect(label).toHaveAttribute('data-active', 'true')
    expect(label).toHaveAttribute('data-focused', 'true')
  })

  it('label remains active when populated', () => {
    render(<TextFieldWithLabelAnimation placeholder='라벨' />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('라벨')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(label).toHaveAttribute('data-active', 'true')
  })

  it('label stays active after blur when populated', () => {
    render(<TextFieldWithLabelAnimation placeholder='라벨' />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('라벨')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.blur(input)

    expect(label).toHaveAttribute('data-active', 'true')
    expect(label).toHaveAttribute('data-focused', 'false')
  })

  it('label becomes inactive after blur when empty', () => {
    render(<TextFieldWithLabelAnimation placeholder='라벨' />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('라벨')

    fireEvent.focus(input)
    expect(label).toHaveAttribute('data-active', 'true')

    fireEvent.blur(input)
    expect(label).toHaveAttribute('data-active', 'false')
  })

  it('label is active initially when defaultValue is provided', () => {
    render(<TextFieldWithLabelAnimation placeholder='라벨' defaultValue='initial value' />)

    const label = screen.getByText('라벨')
    expect(label).toHaveAttribute('data-active', 'true')
  })

  it('handles onChange event', () => {
    const handleChange = vi.fn()
    render(<TextFieldWithLabelAnimation placeholder='라벨' onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'a' } })

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange.mock.calls[0][0].target.value).toBe('a')
  })

  it('applies disabled state to label', () => {
    render(<TextFieldWithLabelAnimation placeholder='라벨' disabled />)

    const label = screen.getByText('라벨')
    expect(label).toHaveAttribute('data-disabled', 'true')
  })

  it('forwards ref to input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextFieldWithLabelAnimation ref={ref} placeholder='라벨' />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.tagName).toBe('INPUT')
  })

  it('renders with leading slot', () => {
    render(
      <TextFieldWithLabelAnimation placeholder='라벨'>
        <TextFieldWithLabelAnimation.Leading>@</TextFieldWithLabelAnimation.Leading>
      </TextFieldWithLabelAnimation>,
    )

    const leading = screen.getByText('@')
    expect(leading).toBeInTheDocument()
  })

  it('renders with trailing slot', () => {
    render(
      <TextFieldWithLabelAnimation placeholder='라벨'>
        <TextFieldWithLabelAnimation.Trailing>.com</TextFieldWithLabelAnimation.Trailing>
      </TextFieldWithLabelAnimation>,
    )

    const trailing = screen.getByText('.com')
    expect(trailing).toBeInTheDocument()
  })

  it('supports controlled mode', () => {
    const handleChange = vi.fn()
    const { rerender } = render(<TextFieldWithLabelAnimation placeholder='라벨' value='' onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'a' } })

    expect(handleChange).toHaveBeenCalled()

    rerender(<TextFieldWithLabelAnimation placeholder='라벨' value='a' onChange={handleChange} />)

    expect(input).toHaveValue('a')
  })
})
