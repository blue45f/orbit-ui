import { cleanup, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test, vitest } from 'vitest'

import { useControllableState } from './useControllableState'

afterEach(() => cleanup())

const ControllableInput: React.FC<{
  defaultValue?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}> = ({ defaultValue, value: valueProp, onChange }) => {
  const [value, handleChange] = useControllableState({ defaultValue, value: valueProp, onChange })

  return (
    <>
      <input
        data-testid="input"
        value={value}
        onChange={(e) => {
          handleChange({ changeParams: [e], value: e.target.value })
        }}
      />
      {/* 밖에서는 비제어로 보이더라도, 안에서는 제어하는가? */}
      <output data-testid="output">{value}</output>
    </>
  )
}

test('상태를 제어할 수 있다', async () => {
  // Arrange
  const user = userEvent.setup()
  const handler = vitest.fn()

  const screen = render(<ControllableInput value="foo" onChange={handler} />)
  const input = (await screen.findByTestId('input')) as HTMLInputElement
  const output = (await screen.findByTestId('output')) as HTMLOutputElement

  // Act
  await user.type(input, 'bar')

  // Assert
  expect(handler).toBeCalledTimes(3) // 'b' 'a' 'r'이므로 3회임에 주의
  // 제어했으므로 그대로여야 함
  expect(input.value).toBe('foo')
  expect(output.value).toBe('foo')
})

test('상태를 제어하지 않을 수 있다', async () => {
  // Arrange
  const user = userEvent.setup()
  const handler = vitest.fn()

  const screen = render(<ControllableInput defaultValue="foo" onChange={handler} />)
  const input = (await screen.findByTestId('input')) as HTMLInputElement
  const output = (await screen.findByTestId('output')) as HTMLOutputElement

  // Act
  await user.type(input, 'bar')

  // Assert
  expect(handler).toBeCalledTimes(3) // 'b' 'a' 'r'이므로 3회임에 주의
  // 제어하지 않았으므로 변해야 함
  expect(input.value).toBe('foobar')
  expect(output.value).toBe('foobar')
})
