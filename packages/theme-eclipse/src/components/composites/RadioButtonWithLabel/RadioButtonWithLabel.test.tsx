import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../../test-utils'
import { RadioGroup } from '../RadioGroup'

import { RadioButtonWithLabel } from './RadioButtonWithLabel'

beforeAll(() => {
  console.error = vi.fn()
})

describe('RadioButtonWithLabel (eclipse)', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('RadioGroup 안에서 label과 함께 radio role로 렌더링된다', () => {
    render(
      <RadioGroup name="color" defaultValue="blue">
        <RadioButtonWithLabel value="blue">블루</RadioButtonWithLabel>
        <RadioButtonWithLabel value="green">그린</RadioButtonWithLabel>
      </RadioGroup>
    )

    expect(screen.getAllByRole('radio')).toHaveLength(2)
    expect(screen.getByText('블루')).toBeInTheDocument()
    expect(screen.getByText('그린')).toBeInTheDocument()
  })

  test('label htmlFor가 radio id와 연결되어 있다', () => {
    render(
      <RadioGroup name="color" defaultValue="blue">
        <RadioButtonWithLabel value="blue">블루</RadioButtonWithLabel>
      </RadioGroup>
    )

    expect(screen.getByLabelText('블루')).toBeInTheDocument()
  })

  test('defaultValue와 일치하는 radio가 aria-checked="true"가 된다', () => {
    render(
      <RadioGroup name="color" defaultValue="blue">
        <RadioButtonWithLabel value="blue">블루</RadioButtonWithLabel>
        <RadioButtonWithLabel value="green">그린</RadioButtonWithLabel>
      </RadioGroup>
    )

    expect(screen.getByLabelText('블루')).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByLabelText('그린')).toHaveAttribute('aria-checked', 'false')
  })

  test('다른 radio 클릭 시 선택 상태가 변경된다 (비제어)', async () => {
    render(
      <RadioGroup name="color" defaultValue="blue">
        <RadioButtonWithLabel value="blue">블루</RadioButtonWithLabel>
        <RadioButtonWithLabel value="green">그린</RadioButtonWithLabel>
      </RadioGroup>
    )

    await userEvent.click(screen.getByLabelText('그린'))

    expect(screen.getByLabelText('블루')).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText('그린')).toHaveAttribute('aria-checked', 'true')
  })

  test('RadioGroup이 disabled이면 모든 radio가 disabled가 된다', () => {
    render(
      <RadioGroup name="color" defaultValue="blue" disabled>
        <RadioButtonWithLabel value="blue">블루</RadioButtonWithLabel>
        <RadioButtonWithLabel value="green">그린</RadioButtonWithLabel>
      </RadioGroup>
    )

    expect(screen.getByLabelText('블루')).toBeDisabled()
    expect(screen.getByLabelText('그린')).toBeDisabled()
  })

  test('RadioGroup의 onChange가 선택된 value와 함께 호출된다', async () => {
    const onChange = vi.fn()
    render(
      <RadioGroup name="color" defaultValue="blue" onChange={onChange}>
        <RadioButtonWithLabel value="blue">블루</RadioButtonWithLabel>
        <RadioButtonWithLabel value="green">그린</RadioButtonWithLabel>
      </RadioGroup>
    )

    await userEvent.click(screen.getByLabelText('그린'))

    expect(onChange).toHaveBeenCalled()
    // onChange는 native change event를 받는다. event.target.value === 'green'
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0]
    expect(lastCall.target.value).toBe('green')
  })

  test('controlled 모드 (checked prop)로도 동작한다', () => {
    render(
      <RadioButtonWithLabel value="a" name="grp" checked>
        옵션 A
      </RadioButtonWithLabel>
    )

    expect(screen.getByLabelText('옵션 A')).toHaveAttribute('aria-checked', 'true')
  })

  test('ref가 button 요소에 부착된다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <RadioGroup name="color" defaultValue="blue">
        <RadioButtonWithLabel ref={ref} value="blue">
          블루
        </RadioButtonWithLabel>
      </RadioGroup>
    )

    expect(ref.current).toBe(screen.getByLabelText('블루'))
  })

  test('id를 명시적으로 전달하면 label htmlFor와 일치한다', () => {
    render(
      <RadioGroup name="color" defaultValue="blue">
        <RadioButtonWithLabel id="rb-blue" value="blue">
          블루
        </RadioButtonWithLabel>
      </RadioGroup>
    )

    const label = screen.getByText('블루').closest('label')
    expect(label).toHaveAttribute('for', 'rb-blue')
  })

  test('calls errorDev when checked undefined and not in RadioGroup', () => {
    render(
      <RadioButtonWithLabel value="a" name="grp">
        옵션 A
      </RadioButtonWithLabel>
    )

    expect(console.error).toHaveBeenCalled()
    const errorMsg = (console.error as ReturnType<typeof vi.fn>).mock.calls.flat().join(' ')
    expect(errorMsg).toContain('Radio')
  })
})
