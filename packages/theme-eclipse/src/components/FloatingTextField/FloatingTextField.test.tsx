import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, fireEvent, render, screen } from '../../test-utils'

import { FloatingTextField } from './FloatingTextField'

describe('FloatingTextField (eclipse)', () => {
  afterEach(() => cleanup())

  test('placeholder와 함께 렌더링된다', () => {
    // FloatingTextField는 placeholder를 라벨로 표시하므로 input의 textbox role만 확인한다.
    render(<FloatingTextField placeholder="이메일" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('value prop으로 controlled 입력값을 표시할 수 있다', () => {
    render(<FloatingTextField placeholder="라벨" value="hello" onChange={() => null} />)
    expect(screen.getByRole('textbox')).toHaveValue('hello')
  })

  test('사용자 입력 시 onChange가 호출된다', async () => {
    const onChange = vi.fn()
    render(<FloatingTextField placeholder="라벨" defaultValue="" onChange={onChange} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, 'ab')

    expect(onChange).toHaveBeenCalled()
    expect(input.value).toBe('ab')
  })

  test('disabled prop이 input에 적용된다', () => {
    render(<FloatingTextField placeholder="라벨" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  test('ref가 input 요소에 부착된다', () => {
    const ref = createRef<HTMLInputElement>()
    render(<FloatingTextField ref={ref} placeholder="라벨" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  test('error prop이 true여도 정상 렌더링된다', () => {
    render(<FloatingTextField placeholder="라벨" error />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('fireEvent.change로 onChange를 검증할 수 있다', () => {
    const onChange = vi.fn()
    render(<FloatingTextField placeholder="라벨" defaultValue="" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '값' } })

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].target.value).toBe('값')
  })

  test('defaultValue prop으로 초기 값을 설정할 수 있다', () => {
    render(<FloatingTextField placeholder="라벨" defaultValue="초기값" />)
    expect(screen.getByRole('textbox')).toHaveValue('초기값')
  })
})
