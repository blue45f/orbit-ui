import userEvent from '@testing-library/user-event'
import React from 'react'
import { afterEach, beforeAll, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Checkbox } from './Checkbox'

beforeAll(() => {
  console.error = vi.fn()
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
  const ref = React.createRef<HTMLButtonElement>()
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

test('Space 키로 체크 상태가 토글된다.', async () => {
  const changeHandler = vi.fn()

  render(
    <Checkbox data-testid='checkbox' onChange={changeHandler}>
      <Checkbox.Icon>
        <span />
      </Checkbox.Icon>
    </Checkbox>,
  )

  const checkbox = screen.getByTestId('checkbox')
  checkbox.focus()
  await userEvent.keyboard(' ')

  expect(changeHandler).toHaveBeenCalledTimes(1)
  expect(changeHandler).toHaveBeenCalledWith(true)
})

test('aria-checked 속성이 올바르게 설정된다.', () => {
  render(
    <Checkbox data-testid='checkbox' checked>
      <Checkbox.Icon>
        <span />
      </Checkbox.Icon>
    </Checkbox>,
  )

  const checkbox = screen.getByTestId('checkbox')
  expect(checkbox).toHaveAttribute('aria-checked', 'true')
})

test('checkbox role이 설정된다.', () => {
  render(
    <Checkbox data-testid='checkbox'>
      <Checkbox.Icon>
        <span />
      </Checkbox.Icon>
    </Checkbox>,
  )

  expect(screen.getByRole('checkbox')).toBeInTheDocument()
})
