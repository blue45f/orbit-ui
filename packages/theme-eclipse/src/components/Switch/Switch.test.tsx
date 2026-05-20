import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Switch } from './Switch'

describe('Switch (eclipse)', () => {
  afterEach(() => cleanup())

  test('switch role로 렌더링된다', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  test('checked prop이 true이면 data-state="checked"가 적용된다', () => {
    render(<Switch checked onCheckedChange={() => null} />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked')
  })

  test('checked prop이 false이면 data-state="unchecked"가 적용된다', () => {
    render(<Switch checked={false} onCheckedChange={() => null} />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked')
  })

  test('클릭 시 onCheckedChange 핸들러가 호출된다', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch onCheckedChange={onCheckedChange} />)

    await userEvent.click(screen.getByRole('switch'))

    expect(onCheckedChange).toHaveBeenCalledTimes(1)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  test('disabled이면 클릭해도 onCheckedChange가 호출되지 않는다', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch disabled onCheckedChange={onCheckedChange} />)

    await userEvent.click(screen.getByRole('switch'))

    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  test('label 요소와 id로 연결할 수 있다', () => {
    render(
      <>
        <label htmlFor="switch-1">알림</label>
        <Switch id="switch-1" />
      </>
    )

    expect(screen.getByLabelText('알림')).toBeInTheDocument()
  })

  test('ref가 button 요소에 부착된다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Switch ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  test('Space 키로 토글된다', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch onCheckedChange={onCheckedChange} />)

    const sw = screen.getByRole('switch')
    sw.focus()
    await userEvent.keyboard(' ')

    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })
})
