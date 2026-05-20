import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { PageDots } from './PageDots'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('PageDots', () => {
  test('button 역할로 렌더링된다', () => {
    render(<PageDots />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('selected 상태를 전달할 수 있다', () => {
    render(<PageDots selected data-testid="dot" />)

    expect(screen.getByTestId('dot')).toBeInTheDocument()
  })

  test('defaultSelected로 초기 선택 상태를 지정한다', () => {
    render(<PageDots defaultSelected data-testid="dot" />)

    expect(screen.getByTestId('dot')).toBeInTheDocument()
  })

  test('클릭 시 onClick이 호출된다', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<PageDots onClick={onClick} />)

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })

  test('disabled 상태에서는 클릭이 발생하지 않는다', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<PageDots disabled onClick={onClick} />)

    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  test('ref를 전달할 수 있다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<PageDots ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('BUTTON')
  })
})
