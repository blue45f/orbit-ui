import userEvent from '@testing-library/user-event'
import React from 'react'
import { afterEach, beforeAll, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Checkbox } from './Checkbox'

beforeAll(() => {
  console.error = vi.fn() // 서브컴포넌트 누락 에러메시지 출력 방지
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

test('클릭 시 change event 핸들러가 호출된다..', async () => {
  const changeHandler = vi.fn()

  render(
    <Checkbox data-testid='checkbox' onChange={changeHandler}>
      <Checkbox.Icon>
        <span />
      </Checkbox.Icon>
    </Checkbox>,
  )

  await userEvent.click(screen.getByTestId('checkbox'))
  await userEvent.click(screen.getByTestId('checkbox'))

  expect(changeHandler).toHaveBeenCalledTimes(2)
})

test('disabled일 경우, 클릭해도 change event 핸들러가 호출되지 않는다.', async () => {
  const changeHandler = vi.fn()

  render(
    <Checkbox disabled data-testid='checkbox' onChange={changeHandler}>
      <Checkbox.Icon>
        <span />
      </Checkbox.Icon>
    </Checkbox>,
  )

  await userEvent.click(screen.getByTestId('checkbox'))

  expect(changeHandler).not.toHaveBeenCalled()
})

test('하위요소에 ref를 전달했을 때 정상적으로 하위요소에 부착이 된다.', () => {
  const ref = React.createRef<HTMLInputElement>()
  const changeHandler = vi.fn()

  render(
    <Checkbox ref={ref} data-testid='checkbox' onChange={changeHandler}>
      <Checkbox.Icon>
        <span />
      </Checkbox.Icon>
    </Checkbox>,
  )

  expect(ref.current).toBe(screen.getByTestId('checkbox'))
})
