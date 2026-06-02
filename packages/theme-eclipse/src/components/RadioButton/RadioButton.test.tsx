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

  test('Space 키로 onChange가 호출된다', async () => {
    const onChange = vi.fn()
    render(<RadioButton data-testid="rb" value="a" onChange={onChange} />)

    const rb = screen.getByTestId('rb')
    rb.focus()
    await userEvent.keyboard(' ')

    expect(onChange).toHaveBeenCalledWith(true)
  })

  test('focus가 button 요소에 적용된다', () => {
    render(<RadioButton data-testid="rb" value="a" />)
    const rb = screen.getByTestId('rb')

    rb.focus()
    expect(document.activeElement).toBe(rb)
  })

  test('aria-label로 시각 라벨 없이도 접근성 이름을 부여할 수 있다', () => {
    render(<RadioButton data-testid="rb" value="a" aria-label="기본 옵션" />)
    expect(screen.getByTestId('rb')).toHaveAttribute('aria-label', '기본 옵션')
  })

  test('aria-labelledby로 외부 요소를 라벨로 참조할 수 있다', () => {
    render(
      <>
        <span id="rb-label">결제 방식 A</span>
        <RadioButton data-testid="rb" value="a" aria-labelledby="rb-label" />
      </>
    )
    expect(screen.getByTestId('rb')).toHaveAttribute('aria-labelledby', 'rb-label')
  })

  test('value prop이 다른 두 RadioButton은 독립적으로 동작한다', async () => {
    const onChangeA = vi.fn()
    const onChangeB = vi.fn()
    render(
      <>
        <RadioButton data-testid="rb-a" value="a" onChange={onChangeA} />
        <RadioButton data-testid="rb-b" value="b" onChange={onChangeB} />
      </>
    )

    await userEvent.click(screen.getByTestId('rb-a'))

    expect(onChangeA).toHaveBeenCalledWith(true)
    expect(onChangeB).not.toHaveBeenCalled()
  })

  test('disabled 상태에서 focus는 가능하지만 키보드 입력은 무시한다', async () => {
    const onChange = vi.fn()
    render(<RadioButton data-testid="rb" value="a" disabled onChange={onChange} />)

    const rb = screen.getByTestId('rb')
    rb.focus()
    await userEvent.keyboard(' ')

    expect(onChange).not.toHaveBeenCalled()
  })
})
