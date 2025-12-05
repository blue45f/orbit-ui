import { createRef } from 'react'
import { describe, expect, test, vi, afterEach } from 'vitest'

import { screen, render, fireEvent, cleanup } from '../../test-utils'

import { PasswordField } from './PasswordField'

describe('PasswordField', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders with placeholder', () => {
    render(<PasswordField placeholder='비밀번호를 입력하세요' />)
    expect(screen.getByPlaceholderText('비밀번호를 입력하세요')).toBeInTheDocument()
  })

  test('renders as password input', () => {
    render(<PasswordField placeholder='비밀번호' />)
    const input = screen.getByPlaceholderText('비밀번호')
    expect(input).toHaveAttribute('type', 'password')
  })

  test('handles value changes', () => {
    const handleChange = vi.fn()
    render(<PasswordField defaultValue='' onChange={handleChange} placeholder='비밀번호 입력' />)

    const input = screen.getByPlaceholderText('비밀번호 입력')
    fireEvent.change(input, { target: { value: 'secret123' } })

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange.mock.calls[0][0].target.value).toBe('secret123')
  })

  test('renders as disabled when disabled prop is true', () => {
    render(<PasswordField disabled placeholder='비활성화된 필드' />)
    const input = screen.getByPlaceholderText('비활성화된 필드')
    expect(input).toBeDisabled()
  })

  test('ref is attached to input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<PasswordField ref={ref} placeholder='ref 테스트' />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('password')
  })

  test('can focus input element using ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<PasswordField ref={ref} placeholder='포커스 테스트' />)

    ref.current?.focus()

    expect(ref.current).toHaveFocus()
  })

  test('renders with default value', () => {
    render(<PasswordField defaultValue='default password' placeholder='기본값 테스트' />)
    const input = screen.getByPlaceholderText('기본값 테스트')
    expect(input).toHaveValue('default password')
  })
})
