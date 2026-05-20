import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Dropdown } from './Dropdown'

beforeEach(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Dropdown', () => {
  test('Trigger 버튼이 렌더링된다', () => {
    render(<Dropdown placeholder="선택" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('placeholder가 표시된다', () => {
    render(<Dropdown placeholder="옵션을 선택하세요" />)

    expect(screen.getByText('옵션을 선택하세요')).toBeInTheDocument()
  })

  test('value가 있으면 placeholder 대신 value를 표시한다', () => {
    render(<Dropdown value="옵션 1" placeholder="선택" />)

    expect(screen.getByText('옵션 1')).toBeInTheDocument()
    expect(screen.queryByText('선택')).not.toBeInTheDocument()
  })

  test('클릭 시 onClick이 호출된다', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Dropdown placeholder="선택" onClick={onClick} />)

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })

  test('disabled 상태에서는 클릭이 발생하지 않는다', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Dropdown placeholder="선택" disabled onClick={onClick} />)

    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  test('Leading 슬롯이 렌더링된다', () => {
    render(
      <Dropdown placeholder="검색">
        <Dropdown.Leading>
          <span data-testid="leading-icon">L</span>
        </Dropdown.Leading>
      </Dropdown>
    )

    expect(screen.getByTestId('leading-icon')).toBeInTheDocument()
  })

  test('Trailing 슬롯이 렌더링된다', () => {
    render(
      <Dropdown placeholder="검색">
        <Dropdown.Trailing>
          <span data-testid="trailing-icon">T</span>
        </Dropdown.Trailing>
      </Dropdown>
    )

    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument()
  })

  test('ref를 button 요소로 전달할 수 있다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Dropdown ref={ref} placeholder="선택" />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('BUTTON')
  })

  test('error prop을 전달해도 정상 렌더링된다', () => {
    render(<Dropdown placeholder="선택" error />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
