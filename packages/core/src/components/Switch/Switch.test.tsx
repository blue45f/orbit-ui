import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Switch } from './Switch'

afterEach(() => cleanup())

describe('Switch', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<Switch />)

    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  test('ref가 button 요소에 전달된다.', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Switch ref={ref} />)

    expect(ref.current).toBe(screen.getByRole('switch'))
  })

  test('클릭 시 onCheckedChange 핸들러가 호출된다.', async () => {
    const handler = vi.fn()
    render(<Switch onCheckedChange={handler} />)

    await userEvent.click(screen.getByRole('switch'))

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(true)
  })

  test('checked prop이 aria-checked에 반영된다.', () => {
    render(<Switch checked />)

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  test('checked가 false인 경우 aria-checked가 false이다.', () => {
    render(<Switch checked={false} />)

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  })

  test('disabled일 경우 클릭해도 onCheckedChange가 호출되지 않는다.', async () => {
    const handler = vi.fn()
    render(<Switch disabled onCheckedChange={handler} />)

    await userEvent.click(screen.getByRole('switch'))

    expect(handler).not.toHaveBeenCalled()
  })

  test('disabled 속성이 button에 적용된다.', () => {
    render(<Switch disabled />)

    expect(screen.getByRole('switch')).toBeDisabled()
  })

  test('Space 키로 토글된다.', async () => {
    const handler = vi.fn()
    render(<Switch onCheckedChange={handler} />)

    const sw = screen.getByRole('switch')
    sw.focus()
    await userEvent.keyboard(' ')

    expect(handler).toHaveBeenCalledWith(true)
  })

  test('전달된 className이 적용된다.', () => {
    render(<Switch className="custom-switch" />)

    expect(screen.getByRole('switch')).toHaveClass('custom-switch')
  })
})
