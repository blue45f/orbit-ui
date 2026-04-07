import { afterEach, expect, test } from 'vitest'

import { screen, render, cleanup } from '../../../test-utils'

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
