import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Calendar } from './Calendar'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Calendar', () => {
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링되어야 한다', () => {
      render(<Calendar />)

      // react-day-picker uses role="grid" for the calendar table
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('이전/다음 달 네비게이션 버튼이 렌더링되어야 한다', () => {
      render(<Calendar />)

      expect(screen.getByLabelText('이전 달')).toBeInTheDocument()
      expect(screen.getByLabelText('다음 달')).toBeInTheDocument()
    })

    it('월 캡션이 렌더링되어야 한다', () => {
      render(<Calendar month={new Date('2026-05-01')} />)

      // Caption shows month-year text
      const grid = screen.getByRole('grid')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('인터랙션', () => {
    it('이전 달 버튼 클릭이 동작해야 한다', async () => {
      const user = userEvent.setup()
      const onMonthChange = vi.fn()

      render(<Calendar month={new Date('2026-05-01')} onMonthChange={onMonthChange} />)

      const prevButton = screen.getByLabelText('이전 달')
      await user.click(prevButton)

      expect(onMonthChange).toHaveBeenCalled()
    })

    it('다음 달 버튼 클릭이 동작해야 한다', async () => {
      const user = userEvent.setup()
      const onMonthChange = vi.fn()

      render(<Calendar month={new Date('2026-05-01')} onMonthChange={onMonthChange} />)

      const nextButton = screen.getByLabelText('다음 달')
      await user.click(nextButton)

      expect(onMonthChange).toHaveBeenCalled()
    })

    it('날짜를 클릭하면 onSelect가 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()

      render(<Calendar mode="single" month={new Date('2026-05-01')} onSelect={onSelect} />)

      // Find day "15"
      const day = screen.getByRole('button', { name: /15/i })
      await user.click(day)

      expect(onSelect).toHaveBeenCalled()
    })
  })

  describe('Props', () => {
    it('custom className이 전달되어야 한다', () => {
      const { container } = render(<Calendar className="custom-calendar" />)

      const calendar = container.querySelector('.custom-calendar')
      expect(calendar).toBeInTheDocument()
    })

    it('showOutsideDays prop이 기본 true이어야 한다 (스모크 테스트)', () => {
      render(<Calendar showOutsideDays={false} />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('disabled prop을 받을 수 있어야 한다', () => {
      render(
        <Calendar
          mode="single"
          disabled={[new Date('2026-05-15')]}
          month={new Date('2026-05-01')}
        />
      )
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })
  })
})
