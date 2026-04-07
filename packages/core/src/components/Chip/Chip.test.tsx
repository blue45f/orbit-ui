import userEvent from '@testing-library/user-event'
import { afterEach, beforeAll, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Chip } from './Chip'

beforeAll(() => {
  console.error = vi.fn() // 서브컴포넌트 누락 에러메시지 출력 방지
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

test('클릭 시 핸들러가 호출된다..', async () => {
  const clickHandler = vi.fn()

  render(<Chip onClick={clickHandler}>Chip</Chip>)

  await userEvent.click(screen.getByRole('button'))
  await userEvent.click(screen.getByRole('button'))

  expect(clickHandler).toHaveBeenCalledTimes(2)
})

test('disabled일 경우, 클릭해도 핸들러가 호출되지 않는다.', async () => {
  const clickHandler = vi.fn()

  render(
    <Chip disabled onClick={clickHandler}>
      Chip
    </Chip>
  )

  await userEvent.click(screen.getByRole('button'))

  expect(clickHandler).not.toHaveBeenCalled()
})
