import { afterEach, expect, test, vi } from 'vitest'

import { screen, render, cleanup, fireEvent } from '../../../test-utils'

import { RadioGroup, useRadioGroupContext } from './RadioGroup'

afterEach(cleanup)

test('radiogroup role을 가진 요소에 레이블을 연결할 수 있다', () => {
  // Arrange
  render(
    <>
      <span id="radio-group-label">라디오 그룹 레이블</span>
      <RadioGroup
        name="pkg"
        defaultValue="blue"
        onChange={() => null}
        aria-labelledby="radio-group-label"
      >
        <input type="radio" value="blue" />
        <input type="radio" value="foundation" />
      </RadioGroup>
    </>
  )

  // Assert
  expect(screen.getByRole('radiogroup')).toHaveAccessibleName('라디오 그룹 레이블')
})

const Radio = ({ id, value }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { disabled } = useRadioGroupContext('Radio')

  return <input id={id} type="radio" value={value} disabled={disabled} />
}

test('disabled prop으로 전체 라디오 요소를 비활성화할 수 있다', () => {
  render(
    <RadioGroup name="radio-group" disabled>
      <label htmlFor="radio1">라디오 1</label>
      <Radio id="radio1" value="radio1" />
      <label htmlFor="radio2">라디오 2</label>
      <Radio id="radio2" value="radio2" />
    </RadioGroup>
  )

  expect(screen.getByLabelText('라디오 1')).toBeDisabled()
  expect(screen.getByLabelText('라디오 2')).toBeDisabled()
})

test('자식 라디오 변경 시 fieldset onChange가 해당 값으로 onChange를 호출한다', () => {
  const onChange = vi.fn()
  render(
    <RadioGroup name="pkg" defaultValue="blue" onChange={onChange}>
      <input type="radio" value="blue" aria-label="blue" />
      <input type="radio" value="green" aria-label="green" />
    </RadioGroup>
  )

  fireEvent.click(screen.getByLabelText('green'))

  expect(onChange).toHaveBeenCalled()
  expect(onChange.mock.calls[0][0].target.value).toBe('green')
})

const SelectButton = ({ value }: { value: string }) => {
  const { select } = useRadioGroupContext('SelectButton')
  return <button onClick={() => select?.(value)}>pick {value}</button>
}

test('자식이 context.select를 이벤트 없이 호출하면 합성 이벤트로 onChange가 호출된다', () => {
  const onChange = vi.fn()
  render(
    <RadioGroup name="pkg" defaultValue="blue" onChange={onChange}>
      <SelectButton value="green" />
    </RadioGroup>
  )

  fireEvent.click(screen.getByText('pick green'))

  expect(onChange).toHaveBeenCalled()
  // select가 event 없이 호출되면 RadioGroup이 target.value=nextValue 합성 이벤트를 만든다
  expect(onChange.mock.calls[0][0].target.value).toBe('green')
})
