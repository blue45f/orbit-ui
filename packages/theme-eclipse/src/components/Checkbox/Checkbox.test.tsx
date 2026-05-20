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
})
