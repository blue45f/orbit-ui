import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, fireEvent, render, screen } from '../../test-utils'

import { TextField } from './TextField'

describe('TextField (eclipse)', () => {
  afterEach(() => cleanup())

  test('placeholder와 함께 렌더링된다', () => {
    render(<TextField placeholder="이름을 입력하세요" />)
    expect(screen.getByPlaceholderText('이름을 입력하세요')).toBeInTheDocument()
  })

  test('value prop으로 controlled 입력값을 표시할 수 있다', () => {
    render(<TextField value="orbit" onChange={() => null} placeholder="value 테스트" />)
    expect(screen.getByPlaceholderText('value 테스트')).toHaveValue('orbit')
  })

  test('사용자 입력 시 onChange가 호출된다', async () => {
    const onChange = vi.fn()
    render(<TextField defaultValue="" onChange={onChange} placeholder="입력 테스트" />)

    const input = screen.getByPlaceholderText('입력 테스트') as HTMLInputElement
    await userEvent.type(input, 'hi')

    expect(onChange).toHaveBeenCalled()
    expect(input.value).toBe('hi')
  })

  test('disabled prop이 input에 적용된다', () => {
    render(<TextField disabled placeholder="비활성" />)
    expect(screen.getByPlaceholderText('비활성')).toBeDisabled()
  })

  test('label 요소와 id로 연결할 수 있다', () => {
    render(
      <>
        <label htmlFor="my-text">레이블</label>
        <TextField id="my-text" />
      </>
    )

    expect(screen.getByLabelText('레이블')).toBeInTheDocument()
  })

  test('ref가 input 요소에 부착된다', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextField ref={ref} placeholder="ref" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  test('children을 center 슬롯에 렌더링한다', () => {
    render(
      <TextField placeholder="center">
        <span>커스텀 콘텐츠</span>
      </TextField>
    )

    expect(screen.getByText('커스텀 콘텐츠')).toBeInTheDocument()
  })

  test('error prop이 true여도 정상 렌더링된다', () => {
    render(<TextField error placeholder="에러 상태" />)
    expect(screen.getByPlaceholderText('에러 상태')).toBeInTheDocument()
  })

  test('fireEvent.change로 onChange의 value를 검증할 수 있다', () => {
    const onChange = vi.fn()
    render(<TextField defaultValue="" onChange={onChange} placeholder="change" />)

    const input = screen.getByPlaceholderText('change')
    fireEvent.change(input, { target: { value: '안녕' } })

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].target.value).toBe('안녕')
  })
})
