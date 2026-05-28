import { afterEach, expect, test, vi } from 'vitest'

import { screen, render, cleanup, fireEvent } from '../../test-utils'

import { Button } from './Button'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const TestButton: React.FC<{ disabled?: boolean; onClick?: React.MouseEventHandler }> = ({
  disabled,
  onClick,
}) => (
  <Button as="button" disabled={disabled} data-testid="button" onClick={onClick}>
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

test('`Button` 컴포넌트를 클릭하면 클릭 이벤트 핸들러가 호출된다.', () => {
  // 각 테스트가 독립된 mock을 사용해 호출 횟수가 테스트 간에 새지 않도록 한다.
  const clickHandler = vi.fn()
  render(<TestButton onClick={clickHandler} />)

  fireEvent.click(screen.getByTestId('button'))

  expect(clickHandler).toHaveBeenCalledTimes(1)
})

test('disabled가 true인 `Button` 컴포넌트를 클릭하면 클릭 이벤트 핸들러가 호출되지 않는다.', () => {
  const clickHandler = vi.fn()
  render(<TestButton disabled onClick={clickHandler} />)

  fireEvent.click(screen.getByTestId('button'))

  expect(clickHandler).not.toHaveBeenCalled()
})
