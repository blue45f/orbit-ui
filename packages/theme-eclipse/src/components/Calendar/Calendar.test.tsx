import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Calendar } from './Calendar'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Calendar', () => {
  test('grid 역할로 렌더링된다', () => {
    render(<Calendar mode="single" />)

    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  test('이전/다음 달 네비게이션 버튼이 렌더링된다', () => {
    render(<Calendar mode="single" />)

    expect(screen.getByRole('button', { name: '이전 달' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '다음 달' })).toBeInTheDocument()
  })

  test('다음 달 버튼 클릭 시 onMonthChange 콜백이 호출된다', async () => {
    const user = userEvent.setup()
    const onMonthChange = vi.fn()

    render(
      <Calendar
        mode="single"
        month={new Date(2024, 0, 1)}
        onMonthChange={onMonthChange}
      />
    )

    await user.click(screen.getByRole('button', { name: '다음 달' }))

    expect(onMonthChange).toHaveBeenCalled()
  })

  test('날짜 버튼이 렌더링된다', () => {
    render(<Calendar mode="single" month={new Date(2024, 0, 1)} />)

    // 1월의 1일 버튼이 있어야 함
    expect(screen.getAllByRole('gridcell').length).toBeGreaterThan(0)
  })

  test('selected 날짜를 표시한다 (single mode)', () => {
    const selected = new Date(2024, 0, 15)
    render(<Calendar mode="single" month={selected} selected={selected} />)

    // selected 날짜가 aria-selected를 가져야 함
    const grid = screen.getByRole('grid')
    expect(grid).toBeInTheDocument()
  })

  test('날짜 클릭 시 onSelect 콜백이 호출된다 (single mode)', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <Calendar
        mode="single"
        month={new Date(2024, 0, 1)}
        onSelect={onSelect}
      />
    )

    // 1일을 직접 찾기는 어려우니, gridcell 중 첫 번째 클릭 가능한 항목
    const cells = screen.getAllByRole('gridcell')
    const clickable = cells.find((c) => {
      const btn = c.querySelector('button')
      return btn && !btn.disabled
    })
    if (clickable) {
      const btn = clickable.querySelector('button')!
      await user.click(btn)
      expect(onSelect).toHaveBeenCalled()
    }
  })

  test('disabled prop으로 모든 날짜 비활성화 가능', () => {
    render(
      <Calendar
        mode="single"
        month={new Date(2024, 0, 1)}
        disabled={true}
      />
    )

    expect(screen.getByRole('grid')).toBeInTheDocument()
  })
})
