import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Checkbox } from './Checkbox'

beforeAll(() => {
  console.error = vi.fn()
})

describe('Checkbox (eclipse)', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('checkbox role로 렌더링된다', () => {
    render(<Checkbox data-testid="cb" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  test('checked prop이 true이면 aria-checked가 true다', () => {
    render(<Checkbox data-testid="cb" checked />)
    expect(screen.getByTestId('cb')).toHaveAttribute('aria-checked', 'true')
  })

  test('checked prop이 false이면 aria-checked가 false다', () => {
    render(<Checkbox data-testid="cb" checked={false} />)
    expect(screen.getByTestId('cb')).toHaveAttribute('aria-checked', 'false')
  })

  test('클릭 시 onChange 핸들러가 호출된다', async () => {
    const onChange = vi.fn()
    render(<Checkbox data-testid="cb" onChange={onChange} />)

    await userEvent.click(screen.getByTestId('cb'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  test('disabled이면 클릭해도 onChange가 호출되지 않는다', async () => {
    const onChange = vi.fn()
    render(<Checkbox data-testid="cb" disabled onChange={onChange} />)

    await userEvent.click(screen.getByTestId('cb'))

    expect(onChange).not.toHaveBeenCalled()
  })

  test('label 요소와 id로 연결할 수 있다', () => {
    render(
      <>
        <label htmlFor="cb-1">동의</label>
        <Checkbox id="cb-1" />
      </>
    )

    expect(screen.getByLabelText('동의')).toBeInTheDocument()
  })

  test('ref가 button 요소에 부착된다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Checkbox ref={ref} data-testid="cb" />)

    expect(ref.current).toBe(screen.getByTestId('cb'))
  })

  test('iconName="minus"일 때도 렌더링된다', () => {
    render(<Checkbox data-testid="cb" iconName="minus" checked />)
    expect(screen.getByTestId('cb')).toBeInTheDocument()
  })

  test('Space 키로 onChange가 호출된다', async () => {
    const onChange = vi.fn()
    render(<Checkbox data-testid="cb" onChange={onChange} />)

    const cb = screen.getByTestId('cb')
    cb.focus()
    await userEvent.keyboard(' ')

    expect(onChange).toHaveBeenCalledWith(true)
  })

  test('disabled이면 Space 키 입력도 무시한다', async () => {
    const onChange = vi.fn()
    render(<Checkbox data-testid="cb" disabled onChange={onChange} />)

    const cb = screen.getByTestId('cb')
    cb.focus()
    await userEvent.keyboard(' ')

    expect(onChange).not.toHaveBeenCalled()
  })

  test('focus가 button 요소에 적용된다', () => {
    render(<Checkbox data-testid="cb" />)
    const cb = screen.getByTestId('cb')

    cb.focus()
    expect(document.activeElement).toBe(cb)
  })

  test('aria-label로 시각 라벨 없이도 접근성 이름을 부여할 수 있다', () => {
    render(<Checkbox data-testid="cb" aria-label="이메일 알림 동의" />)
    expect(screen.getByTestId('cb')).toHaveAttribute('aria-label', '이메일 알림 동의')
  })

  test('aria-labelledby로 외부 요소를 라벨로 참조할 수 있다', () => {
    render(
      <>
        <span id="cb-label">개인정보 수집 동의</span>
        <Checkbox data-testid="cb" aria-labelledby="cb-label" />
      </>,
    )
    expect(screen.getByTestId('cb')).toHaveAttribute('aria-labelledby', 'cb-label')
  })

  test('uncontrolled에서 클릭 시 aria-checked 상태가 토글된다', async () => {
    render(<Checkbox data-testid="cb" />)
    const cb = screen.getByTestId('cb')

    expect(cb).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(cb)
    expect(cb).toHaveAttribute('aria-checked', 'true')

    await userEvent.click(cb)
    expect(cb).toHaveAttribute('aria-checked', 'false')
  })
})
