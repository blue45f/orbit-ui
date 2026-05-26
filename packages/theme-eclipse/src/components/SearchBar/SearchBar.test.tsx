import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, fireEvent, render, screen } from '../../test-utils'

import { SearchBar } from './SearchBar'

describe('SearchBar (eclipse)', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('placeholder와 함께 렌더링된다', () => {
    render(<SearchBar placeholder="검색어 입력" />)
    expect(screen.getByPlaceholderText('검색어 입력')).toBeInTheDocument()
  })

  test('value prop으로 controlled 입력값을 표시할 수 있다', () => {
    render(<SearchBar value="orbit" onChange={() => null} placeholder="value" />)
    expect(screen.getByPlaceholderText('value')).toHaveValue('orbit')
  })

  test('사용자 입력 시 onChange가 호출된다', async () => {
    const onChange = vi.fn()
    render(<SearchBar defaultValue="" onChange={onChange} placeholder="검색" />)

    const input = screen.getByPlaceholderText('검색') as HTMLInputElement
    await userEvent.type(input, 'ui')

    expect(onChange).toHaveBeenCalled()
    expect(input.value).toBe('ui')
  })

  test('disabled prop이 input에 적용된다', () => {
    render(<SearchBar disabled placeholder="비활성" />)
    expect(screen.getByPlaceholderText('비활성')).toBeDisabled()
  })

  test('label 요소와 id로 연결할 수 있다', () => {
    render(
      <>
        <label htmlFor="search">검색</label>
        <SearchBar id="search" />
      </>
    )

    expect(screen.getByLabelText('검색')).toBeInTheDocument()
  })

  test('ref가 input 요소에 부착된다', () => {
    const ref = createRef<HTMLInputElement>()
    render(<SearchBar ref={ref} placeholder="ref" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  test('fireEvent.change로 onChange를 검증할 수 있다', () => {
    const onChange = vi.fn()
    render(<SearchBar defaultValue="" onChange={onChange} placeholder="검색" />)

    const input = screen.getByPlaceholderText('검색')
    fireEvent.change(input, { target: { value: '쿼리' } })

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].target.value).toBe('쿼리')
  })

  test('caption은 포커스 없이 값이 있을 때 노출된다', () => {
    render(<SearchBar defaultValue="abc" caption="3개의 결과" placeholder="검색" />)

    expect(screen.getByText('3개의 결과')).toBeInTheDocument()
  })

  test('focus helper 함수를 DOM prop으로 전달하지 않는다', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(<SearchBar placeholder="검색" />)

    const errorOutput = consoleError.mock.calls.flat().join(' ')
    expect(errorOutput).not.toContain('focusElement')
    expect(errorOutput).not.toContain('preventElementBlur')

    consoleError.mockRestore()
  })

  test('clear button 내부에 또 다른 button을 중첩하지 않는다', () => {
    render(<SearchBar defaultValue="abc" placeholder="검색" />)

    const clearButton = screen.getByRole('button', { name: '입력 내용 지우기' })
    expect(clearButton.querySelector('button')).toBeNull()
  })
})
