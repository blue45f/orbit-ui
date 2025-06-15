import userEvent from '@testing-library/user-event'
import React from 'react'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Toggle } from './Toggle'

beforeAll(() => {
  console.error = vi.fn() // 서브컴포넌트 누락 에러메시지 출력 방지
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Toggle', () => {
  test('ref를 연결할 수 있다.', () => {
    const ref = React.createRef<HTMLInputElement>()

    render(
      <Toggle ref={ref}>
        <Toggle.Thumb />
      </Toggle>
    )

    const inputElement = screen.getByRole('switch')
    expect(ref.current).toBe(inputElement)
  })

  test('클릭 시 change event 핸들러가 호출된다.', async () => {
    const handler = vi.fn()
    render(
      <Toggle onChange={handler}>
        <Toggle.Thumb />
      </Toggle>
    )

    const inputElement = screen.getByRole('switch')
    await userEvent.click(inputElement)

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('disabled일 경우, 클릭해도 change event 핸들러가 호출되지 않는다.', async () => {
    const handler = vi.fn()
    render(
      <Toggle data-testid="my-switch" disabled onChange={handler}>
        <Toggle.Thumb />
      </Toggle>
    )

    const root = screen.getByTestId('my-switch')
    await userEvent.click(root)

    expect(handler).not.toBeCalled()
  })
})

describe('Toggle.Thumb', () => {
  test('Toggle.Thumb 누락 시, 에러를 발생시킨다', () => {
    render(
      <Toggle>
        <div />
      </Toggle>
    )

    expect(console.error).toBeCalledWith('Toggle.Thumb 서브컴포넌트를 전달해주세요.')
  })
})
