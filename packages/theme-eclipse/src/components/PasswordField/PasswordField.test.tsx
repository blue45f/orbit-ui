import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, fireEvent, render, screen } from '../../test-utils'

import { PasswordField } from './PasswordField'

describe('PasswordField (eclipse)', () => {
  afterEach(() => cleanup())

  test('placeholder와 함께 password input으로 렌더링된다', () => {
    render(<PasswordField placeholder="비밀번호" />)
    const input = screen.getByPlaceholderText('비밀번호')
    expect(input).toHaveAttribute('type', 'password')
  })

  test('value prop으로 controlled 입력값을 표시할 수 있다', () => {
    render(<PasswordField value="secret" onChange={() => null} placeholder="value" />)
    expect(screen.getByPlaceholderText('value')).toHaveValue('secret')
  })

  test('사용자 입력 시 onChange가 호출된다', async () => {
    const onChange = vi.fn()
    render(<PasswordField defaultValue="" onChange={onChange} placeholder="입력" />)

    const input = screen.getByPlaceholderText('입력') as HTMLInputElement
    await userEvent.type(input, 'pw')

    expect(onChange).toHaveBeenCalled()
    expect(input.value).toBe('pw')
  })

  test('disabled prop이 input에 적용된다', () => {
    render(<PasswordField disabled placeholder="비활성" />)
    expect(screen.getByPlaceholderText('비활성')).toBeDisabled()
  })

  test('label 요소와 id로 연결할 수 있다', () => {
    render(
      <>
        <label htmlFor="password-field">비밀번호</label>
        <PasswordField id="password-field" />
      </>
    )

    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument()
  })

  test('ref가 input 요소에 부착된다', () => {
    const ref = createRef<HTMLInputElement>()
    render(<PasswordField ref={ref} placeholder="ref" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.type).toBe('password')
  })

  test('error prop이 true여도 정상 렌더링된다', () => {
    render(<PasswordField error placeholder="에러" />)
    expect(screen.getByPlaceholderText('에러')).toBeInTheDocument()
  })

  test('fireEvent.change로 onChange를 검증할 수 있다', () => {
    const onChange = vi.fn()
    render(<PasswordField defaultValue="" onChange={onChange} placeholder="입력" />)

    const input = screen.getByPlaceholderText('입력')
    fireEvent.change(input, { target: { value: 'newpw' } })

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].target.value).toBe('newpw')
  })
})
