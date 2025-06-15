import userEvent from '@testing-library/user-event'
import { afterEach, expect, test, vi } from 'vitest'

import { screen, render, cleanup } from '../../test-utils'

import { RadioButton } from './RadioButton'

afterEach(() => cleanup())

test('`RadioButton` 컴포넌트를 렌더링한다', () => {
  render(
    <RadioButton width={10} height={10} borderWidth={1}>
      My Component
    </RadioButton>
  )

  expect(screen.getByText('My Component')).toBeInTheDocument()
})

test('radio role이 설정된다.', () => {
  render(
    <RadioButton data-testid="radio" value="test">
      <RadioButton.Indicator width={8} height={8} />
    </RadioButton>
  )

  expect(screen.getByRole('radio')).toBeInTheDocument()
})

test('클릭 시 onChange 핸들러가 호출된다.', async () => {
  const changeHandler = vi.fn()

  render(
    <RadioButton data-testid="radio" value="test" onChange={changeHandler}>
      <RadioButton.Indicator width={8} height={8} />
    </RadioButton>
  )

  await userEvent.click(screen.getByTestId('radio'))

  expect(changeHandler).toHaveBeenCalledTimes(1)
  expect(changeHandler).toHaveBeenCalledWith(true)
})

test('disabled일 경우 클릭해도 onChange 핸들러가 호출되지 않는다.', async () => {
  const changeHandler = vi.fn()

  render(
    <RadioButton disabled data-testid="radio" value="test" onChange={changeHandler}>
      <RadioButton.Indicator width={8} height={8} />
    </RadioButton>
  )

  await userEvent.click(screen.getByTestId('radio'))

  expect(changeHandler).not.toHaveBeenCalled()
})
