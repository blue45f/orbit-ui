import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup, createMockResizeObserver, render, screen, waitFor } from '../../test-utils'

import { Drawer } from './Drawer'

beforeEach(() => {
  // Radix Dialog uses ResizeObserver internally
  global.ResizeObserver = createMockResizeObserver()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Drawer', () => {
  describe('기본 렌더링', () => {
    it('defaultOpen이 true이면 Drawer 내용이 보여야 한다', async () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Title>제목</Drawer.Title>
            <Drawer.Description>설명</Drawer.Description>
            <div>Body Content</div>
          </Drawer.Content>
        </Drawer>
      )

      await waitFor(() => {
        expect(screen.getByText('Body Content')).toBeInTheDocument()
        expect(screen.getByText('제목')).toBeInTheDocument()
        expect(screen.getByText('설명')).toBeInTheDocument()
      })
    })

    it('open=false일 때는 Drawer가 렌더링되지 않아야 한다', () => {
      render(
        <Drawer open={false}>
          <Drawer.Content>
            <div>Hidden Body</div>
          </Drawer.Content>
        </Drawer>
      )

      expect(screen.queryByText('Hidden Body')).not.toBeInTheDocument()
    })
  })

  describe('Compound 컴포넌트', () => {
    it('Header, Footer 슬롯이 렌더링되어야 한다', async () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>타이틀</Drawer.Title>
              <Drawer.Description>설명</Drawer.Description>
            </Drawer.Header>
            <div>Body</div>
            <Drawer.Footer>푸터 내용</Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      )

      await waitFor(() => {
        expect(screen.getByText('타이틀')).toBeInTheDocument()
        expect(screen.getByText('설명')).toBeInTheDocument()
        expect(screen.getByText('푸터 내용')).toBeInTheDocument()
        expect(screen.getByText('Body')).toBeInTheDocument()
      })
    })

    it('side prop을 받을 수 있어야 한다 (스모크 테스트)', async () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content side="left" data-testid="drawer-left">
            <div>Left Drawer</div>
          </Drawer.Content>
        </Drawer>
      )

      await waitFor(() => {
        expect(screen.getByTestId('drawer-left')).toBeInTheDocument()
      })
    })
  })

  describe('Trigger 인터랙션', () => {
    it('Trigger 클릭 시 Drawer가 열려야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Drawer>
          <Drawer.Trigger>열기</Drawer.Trigger>
          <Drawer.Content>
            <div>Body Content</div>
          </Drawer.Content>
        </Drawer>
      )

      expect(screen.queryByText('Body Content')).not.toBeInTheDocument()

      await user.click(screen.getByText('열기'))

      await waitFor(() => {
        expect(screen.getByText('Body Content')).toBeInTheDocument()
      })
    })

    it('Trigger에 aria-expanded, aria-haspopup이 설정되어야 한다', () => {
      render(
        <Drawer>
          <Drawer.Trigger>열기</Drawer.Trigger>
          <Drawer.Content>
            <div>Body</div>
          </Drawer.Content>
        </Drawer>
      )

      const trigger = screen.getByText('열기')
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Close 동작', () => {
    it('onOpenChange 콜백이 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <Drawer defaultOpen onOpenChange={onOpenChange}>
          <Drawer.Content>
            <div>Body</div>
            <Drawer.Close>닫기</Drawer.Close>
          </Drawer.Content>
        </Drawer>
      )

      await waitFor(() => expect(screen.getByText('Body')).toBeInTheDocument())

      const closeButtons = screen.getAllByRole('button')
      const customCloseButton = closeButtons.find((b) => b.textContent === '닫기')
      if (customCloseButton) {
        await user.click(customCloseButton)
        await waitFor(() => {
          expect(onOpenChange).toHaveBeenCalledWith(false)
        })
      }
    })

    it('Escape 키를 누르면 Drawer가 닫혀야 한다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <Drawer defaultOpen onOpenChange={onOpenChange}>
          <Drawer.Content>
            <div>Body</div>
          </Drawer.Content>
        </Drawer>
      )

      await waitFor(() => expect(screen.getByText('Body')).toBeInTheDocument())

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('제어 모드', () => {
    it('open prop으로 외부에서 제어할 수 있어야 한다', () => {
      const { rerender } = render(
        <Drawer open={false}>
          <Drawer.Content>
            <div>Body</div>
          </Drawer.Content>
        </Drawer>
      )

      expect(screen.queryByText('Body')).not.toBeInTheDocument()

      rerender(
        <Drawer open={true}>
          <Drawer.Content>
            <div>Body</div>
          </Drawer.Content>
        </Drawer>
      )

      expect(screen.getByText('Body')).toBeInTheDocument()
    })
  })
})
