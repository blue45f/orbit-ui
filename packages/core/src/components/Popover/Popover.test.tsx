import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { Popover } from './Popover'

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

describe('Popover', () => {
  describe('기본 렌더링', () => {
    it('Trigger가 렌더링되어야 한다', () => {
      render(
        <Popover>
          <Popover.Trigger>열기</Popover.Trigger>
          <Popover.Content>팝오버 내용</Popover.Content>
        </Popover>
      )

      expect(screen.getByText('열기')).toBeInTheDocument()
    })

    it('defaultOpen이 true이면 Content가 표시되어야 한다', async () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Content>팝오버 내용</Popover.Content>
        </Popover>
      )

      await waitFor(() => {
        expect(screen.getByText('팝오버 내용')).toBeInTheDocument()
      })
    })

    it('open=false일 때 Content가 렌더링되지 않아야 한다', () => {
      render(
        <Popover open={false}>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Content>팝오버 내용</Popover.Content>
        </Popover>
      )

      expect(screen.queryByText('팝오버 내용')).not.toBeInTheDocument()
    })
  })

  describe('Trigger 인터랙션', () => {
    it('Trigger 클릭 시 Popover가 열려야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Popover>
          <Popover.Trigger>열기</Popover.Trigger>
          <Popover.Content>팝오버 내용</Popover.Content>
        </Popover>
      )

      await user.click(screen.getByText('열기'))

      await waitFor(() => {
        expect(screen.getByText('팝오버 내용')).toBeInTheDocument()
      })
    })

    it('Trigger에 aria-expanded, aria-haspopup이 설정되어야 한다', () => {
      render(
        <Popover>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      )

      const trigger = screen.getByText('Trigger')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    })
  })

  describe('제어 모드', () => {
    it('open prop과 onOpenChange로 제어할 수 있어야 한다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <Popover open={true} onOpenChange={onOpenChange}>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      )

      await waitFor(() => expect(screen.getByText('Content')).toBeInTheDocument())

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('키보드', () => {
    it('Escape를 누르면 Popover가 닫혀야 한다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <Popover defaultOpen onOpenChange={onOpenChange}>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      )

      await waitFor(() => expect(screen.getByText('Content')).toBeInTheDocument())

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('Ref 전달', () => {
    it('Content에 ref를 전달할 수 있어야 한다', async () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Content ref={ref}>Content</Popover.Content>
        </Popover>
      )

      await waitFor(() => {
        expect(ref.current).not.toBeNull()
      })
    })
  })

  describe('Portal 렌더링', () => {
    it('Content가 Portal을 통해 렌더링되어야 한다', async () => {
      render(
        <div data-testid="root-container">
          <Popover defaultOpen>
            <Popover.Trigger>Trigger</Popover.Trigger>
            <Popover.Content>팝오버</Popover.Content>
          </Popover>
        </div>
      )

      await waitFor(() => {
        const root = screen.getByTestId('root-container')
        const content = screen.getByText('팝오버')
        expect(content).toBeInTheDocument()
        expect(root).not.toContainElement(content)
      })
    })
  })
})
