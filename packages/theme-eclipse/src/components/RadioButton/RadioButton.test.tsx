import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { RadioButton } from './RadioButton'

describe('RadioButton (eclipse)', () => {
  afterEach(() => cleanup())

  test('radio role로 렌더링된다', () => {
    render(<RadioButton data-testid="rb" value="a" />)
    expect(screen.getByRole('radio')).toBeInTheDocument()
  })

  test('checked prop이 true이면 aria-checked가 true다', () => {
    render(<RadioButton data-testid="rb" value="a" checked />)
    expect(screen.getByTestId('rb')).toHaveAttribute('aria-checked', 'true')
  })

  test('checked prop이 false이면 aria-checked가 false다', () => {
    render(<RadioButton data-testid="rb" value="a" checked={false} />)
    expect(screen.getByTestId('rb')).toHaveAttribute('aria-checked', 'false')
  })

  test('클릭 시 onChange 핸들러가 true와 함께 호출된다', async () => {
    const onChange = vi.fn()
    render(<RadioButton data-testid="rb" value="a" onChange={onChange} />)

    await userEvent.click(screen.getByTestId('rb'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  test('disabled이면 클릭해도 onChange가 호출되지 않는다', async () => {
    const onChange = vi.fn()
    render(<RadioButton data-testid="rb" value="a" disabled onChange={onChange} />)

    await userEvent.click(screen.getByTestId('rb'))

    expect(onChange).not.toHaveBeenCalled()
  })

  test('label 요소와 id로 연결할 수 있다', () => {
    render(
      <>
        <label htmlFor="rb-1">옵션 1</label>
        <RadioButton id="rb-1" value="a" />
      </>
    )

    expect(screen.getByLabelText('옵션 1')).toBeInTheDocument()
  })

  test('ref가 button 요소에 부착된다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<RadioButton ref={ref} data-testid="rb" value="a" />)

    expect(ref.current).toBe(screen.getByTestId('rb'))
  })

  test('name prop을 전달해도 정상 렌더링된다', () => {
    // 단일 RadioButton은 자체 Radix Root를 가지므로 form input이 렌더되지 않을 수 있다.
    // name이 그룹 컨텍스트와 함께 사용되는 시나리오는 RadioGroup 테스트에서 검증한다.
    render(<RadioButton data-testid="rb" value="a" name="grp" />)
    expect(screen.getByTestId('rb')).toBeInTheDocument()
  })
})
