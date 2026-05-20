import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { PageDots } from './PageDots'

afterEach(() => cleanup())

describe('PageDots', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<PageDots data-testid="dot" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('ref가 button 요소에 전달된다.', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<PageDots ref={ref} />)

    expect(ref.current).toBe(screen.getByRole('button'))
  })

  test('클릭 시 onClick 핸들러가 호출된다.', async () => {
    const handler = vi.fn()
    render(<PageDots onClick={handler} />)

    await userEvent.click(screen.getByRole('button'))

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('selected prop에 따라 aria-pressed가 설정된다.', () => {
    render(<PageDots selected />)

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  test('selected가 false인 경우 aria-pressed가 false이다.', () => {
    render(<PageDots selected={false} />)

    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  test('disabled일 경우 클릭해도 onClick이 호출되지 않는다.', async () => {
    const handler = vi.fn()
    render(<PageDots disabled onClick={handler} />)

    await userEvent.click(screen.getByRole('button'))

    expect(handler).not.toHaveBeenCalled()
  })

  test('disabled일 경우 aria-disabled가 true이다.', () => {
    render(<PageDots disabled />)

    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })

  test('비제어 모드에서 클릭 시 selected 상태가 토글된다.', async () => {
    render(<PageDots defaultSelected={false} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(button)

    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  test('size prop이 width/height style에 반영된다.', () => {
    render(<PageDots data-testid="dot" size={12} />)

    const button = screen.getByRole('button')
    // ContainerLayer wraps the button, find the parent with style
    const container = button.parentElement
    expect(container).toHaveStyle({ width: '12px', height: '12px' })
  })
})
