import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, fireEvent, render, screen } from '../../test-utils'

import { TextArea } from './TextArea'

describe('TextArea (eclipse)', () => {
  afterEach(() => cleanup())

  test('placeholder와 함께 textarea로 렌더링된다', () => {
    render(<TextArea placeholder="내용을 입력하세요" />)
    const input = screen.getByPlaceholderText('내용을 입력하세요')
    expect(input.tagName).toBe('TEXTAREA')
  })

  test('value prop으로 controlled 입력값을 표시할 수 있다', () => {
    render(<TextArea value="여러 줄 입력" onChange={() => null} placeholder="value" />)
    expect(screen.getByPlaceholderText('value')).toHaveValue('여러 줄 입력')
  })

  test('사용자 입력 시 onChange가 호출된다', async () => {
    const onChange = vi.fn()
    render(<TextArea defaultValue="" onChange={onChange} placeholder="입력" />)

    const input = screen.getByPlaceholderText('입력') as HTMLTextAreaElement
    await userEvent.type(input, 'abc')

    expect(onChange).toHaveBeenCalled()
    expect(input.value).toBe('abc')
  })

  test('disabled prop이 textarea에 적용된다', () => {
    render(<TextArea disabled placeholder="비활성" />)
    expect(screen.getByPlaceholderText('비활성')).toBeDisabled()
  })

  test('label 요소와 id로 연결할 수 있다', () => {
    render(
      <>
        <label htmlFor="my-area">레이블</label>
        <TextArea id="my-area" />
      </>
    )

    expect(screen.getByLabelText('레이블')).toBeInTheDocument()
  })

  test('ref가 textarea 요소에 부착된다', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<TextArea ref={ref} placeholder="ref" />)

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  test('error prop이 true여도 정상 렌더링된다', () => {
    render(<TextArea error placeholder="에러 상태" />)
    expect(screen.getByPlaceholderText('에러 상태')).toBeInTheDocument()
  })

  test('fireEvent.change로 onChange의 value를 검증할 수 있다', () => {
    const onChange = vi.fn()
    render(<TextArea defaultValue="" onChange={onChange} placeholder="change" />)

    const input = screen.getByPlaceholderText('change')
    fireEvent.change(input, { target: { value: 'multi\nline' } })

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].target.value).toBe('multi\nline')
  })
})
