import { createRef } from 'react'
import { describe, expect, test, vi, afterEach } from 'vitest'

import { screen, render, fireEvent, cleanup } from '../../test-utils'

import { TextField } from './TextField'

describe('TextField', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders with placeholder', () => {
    render(<TextField placeholder='테스트 플레이스홀더' />)
    expect(screen.getByPlaceholderText('테스트 플레이스홀더')).toBeInTheDocument()
  })

  test('handles value changes', () => {
    const handleChange = vi.fn()
    render(<TextField defaultValue='' onChange={handleChange} placeholder='변경 테스트' />)

    const input = screen.getByPlaceholderText('변경 테스트')
    fireEvent.change(input, { target: { value: '새로운 값' } })

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange.mock.calls[0][0].target.value).toBe('새로운 값')
  })

  test('renders as disabled when disabled prop is true', () => {
    render(<TextField disabled placeholder='비활성화된 필드' />)
    const input = screen.getByPlaceholderText('비활성화된 필드')
    expect(input).toBeDisabled()
  })

  test('renders as textarea when multiline is true', () => {
    render(<TextField axis='vertical' placeholder='다중 줄 입력' />)
    const textarea = screen.getByPlaceholderText('다중 줄 입력')
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  test('renders clear button when ClearButton component is provided and value exists', () => {
    render(
      <TextField value='테스트 값' placeholder='클리어 테스트'>
        <TextField.ClearButton visibility='onPopulated' />
      </TextField>,
    )
    expect(screen.getByLabelText('입력 내용 지우기')).toBeInTheDocument()
  })

  test('calls onClick when clear button is clicked', () => {
    const handleClick = vi.fn()
    const handleChange = vi.fn()
    render(
      <TextField defaultValue='테스트 값' onChange={handleChange} placeholder='클리어 클릭 테스트'>
        <TextField.ClearButton visibility='onPopulated' onClick={handleClick} />
      </TextField>,
    )

    const clearButton = screen.getByLabelText('입력 내용 지우기')
    fireEvent.click(clearButton)

    expect(handleClick).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalled()
    expect(handleChange.mock.calls[0][0].target.value).toBe('')
  })

  test('renders leading slot content', () => {
    render(
      <TextField placeholder='리딩 테스트'>
        <TextField.Leading>🔍</TextField.Leading>
      </TextField>,
    )
    expect(screen.getByText('🔍')).toBeInTheDocument()
  })

  test('renders trailing slot content', () => {
    render(
      <TextField placeholder='트레일링 테스트'>
        <TextField.Trailing>✓</TextField.Trailing>
      </TextField>,
    )
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  test('ref is attached to input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextField ref={ref} placeholder='ref 테스트' />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.tagName).toBe('INPUT')
  })

  test('ref is attached to textarea element when axis is vertical', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<TextField ref={ref} axis='vertical' placeholder='ref 테스트' />)

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    expect(ref.current?.tagName).toBe('TEXTAREA')
  })

  test('can focus input element using ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextField ref={ref} placeholder='포커스 테스트' />)

    ref.current?.focus()

    expect(ref.current).toHaveFocus()
  })
})
