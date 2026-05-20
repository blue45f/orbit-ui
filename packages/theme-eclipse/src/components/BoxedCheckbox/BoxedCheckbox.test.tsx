import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { BoxedCheckbox } from './BoxedCheckbox'

beforeAll(() => {
  console.error = vi.fn()
})

describe('BoxedCheckbox (eclipse)', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('checkbox role로 렌더링된다', () => {
    render(<BoxedCheckbox data-testid="bcb" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  test('checked prop이 true이면 aria-checked가 true다', () => {
    render(<BoxedCheckbox data-testid="bcb" checked />)
    expect(screen.getByTestId('bcb')).toHaveAttribute('aria-checked', 'true')
  })

  test('checked prop이 false이면 aria-checked가 false다', () => {
    render(<BoxedCheckbox data-testid="bcb" checked={false} />)
    expect(screen.getByTestId('bcb')).toHaveAttribute('aria-checked', 'false')
  })

  test('클릭 시 onChange 핸들러가 호출된다', async () => {
    const onChange = vi.fn()
    render(<BoxedCheckbox data-testid="bcb" onChange={onChange} />)

    await userEvent.click(screen.getByTestId('bcb'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  test('disabled이면 클릭해도 onChange가 호출되지 않는다', async () => {
    const onChange = vi.fn()
    render(<BoxedCheckbox data-testid="bcb" disabled onChange={onChange} />)

    await userEvent.click(screen.getByTestId('bcb'))

    expect(onChange).not.toHaveBeenCalled()
  })

  test('label 요소와 id로 연결할 수 있다', () => {
    render(
      <>
        <label htmlFor="bcb-1">선택</label>
        <BoxedCheckbox id="bcb-1" />
      </>
    )

    expect(screen.getByLabelText('선택')).toBeInTheDocument()
  })

  test('ref가 button 요소에 부착된다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<BoxedCheckbox ref={ref} data-testid="bcb" />)

    expect(ref.current).toBe(screen.getByTestId('bcb'))
  })

  test('iconName="minus"일 때도 렌더링된다', () => {
    render(<BoxedCheckbox data-testid="bcb" iconName="minus" checked />)
    expect(screen.getByTestId('bcb')).toBeInTheDocument()
  })
})
