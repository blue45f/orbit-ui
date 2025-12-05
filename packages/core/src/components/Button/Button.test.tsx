import { afterEach, expect, test, vi } from 'vitest'

import { screen, render, cleanup } from '../../test-utils'

import { Button } from './Button'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

const clickHandler = vi.fn()

const TestButton: React.FC<{ disabled?: boolean }> = ({ disabled }) => (
  <Button as='button' disabled={disabled} data-testid='button' onClick={clickHandler}>
    <Button.Leading>Left</Button.Leading>
    <Button.Center>Center</Button.Center>
    <Button.Trailing>Right</Button.Trailing>
  </Button>
)

test('Left, Center, Right 모두 렌더링된다.', () => {
  render(<TestButton />)

  expect(screen.getByText('Left')).toBeInTheDocument()
  expect(screen.getByText('Center')).toBeInTheDocument()
  expect(screen.getByText('Right')).toBeInTheDocument()
})

test('`Button` 컴포넌트를 클릭하면 클릭 이벤트 핸들러가 호출된다.', async () => {
  render(<TestButton />)

  await screen.findByTestId('button').then((el) => el.click())
  expect(clickHandler).toHaveBeenCalledTimes(1)
})

test.skip('disabled가 true인 `Button` 컴포넌트를 클릭하면 클릭 이벤트 핸들러가 호출되지 않는다.', async () => {
  render(<TestButton disabled />)

  await screen.findByTestId('button').then((el) => el.click())
  expect(clickHandler).not.toBeCalled()
})
