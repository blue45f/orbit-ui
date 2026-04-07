import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { Sheet } from './Sheet'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Sheet', () => {
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링되어야 한다', () => {
      render(
        <Sheet defaultIsPresented={true} data-testid="sheet-basic">
          <Sheet.Header>
            <div>Header Content</div>
          </Sheet.Header>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
          <Sheet.Footer>
            <div>Footer Content</div>
          </Sheet.Footer>
        </Sheet>
      )

      expect(screen.getByText('Header Content')).toBeInTheDocument()
      expect(screen.getByText('Body Content')).toBeInTheDocument()
      expect(screen.getByText('Footer Content')).toBeInTheDocument()
    })

    it('isPresented가 false일 때는 Sheet가 렌더링되지 않아야 한다', () => {
      render(
        <Sheet isPresented={false}>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      expect(screen.queryByText('Body Content')).not.toBeInTheDocument()
    })

    it('isPresented가 true일 때는 Sheet가 렌더링되어야 한다', () => {
      render(
        <Sheet isPresented={true}>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      expect(screen.getByText('Body Content')).toBeInTheDocument()
    })
  })

  describe('제어 모드', () => {
    it('isPresented prop으로 Sheet의 표시 여부를 제어할 수 있어야 한다', () => {
      const { rerender } = render(
        <Sheet isPresented={false}>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      expect(screen.queryByText('Body Content')).not.toBeInTheDocument()

      rerender(
        <Sheet isPresented={true}>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      expect(screen.getByText('Body Content')).toBeInTheDocument()
    })

    it('onIsPresentedChange 콜백이 호출되어야 한다', async () => {
      const onIsPresentedChange = vi.fn()
      const user = userEvent.setup()

      render(
        <Sheet isPresented={true} onIsPresentedChange={onIsPresentedChange}>
          <Sheet.Footer>
            <Sheet.Close>
              <button type="button">닫기</button>
            </Sheet.Close>
          </Sheet.Footer>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      const closeButton = screen.getByText('닫기')
      await user.click(closeButton)

      await waitFor(() => {
        expect(onIsPresentedChange).toHaveBeenCalled()
        expect(onIsPresentedChange.mock.calls[0][0]).toMatchObject({
          newValue: false,
          when: 'before',
        })
      })
    })
  })

  describe('비제어 모드', () => {
    it('defaultIsPresented로 초기 상태를 설정할 수 있어야 한다', () => {
      render(
        <Sheet defaultIsPresented={true}>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      expect(screen.getByText('Body Content')).toBeInTheDocument()
    })

    it('defaultIsPresented가 false일 때는 초기에 Sheet가 닫혀있어야 한다', () => {
      render(
        <Sheet defaultIsPresented={false}>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      expect(screen.queryByText('Body Content')).not.toBeInTheDocument()
    })
  })

  describe('Trigger 기능', () => {
    it('Trigger를 클릭하면 Sheet가 열려야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Sheet defaultIsPresented={false}>
          <Sheet.Trigger>
            <button type="button">열기</button>
          </Sheet.Trigger>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      expect(screen.queryByText('Body Content')).not.toBeInTheDocument()

      const triggerButton = screen.getByText('열기')
      await user.click(triggerButton)

      await waitFor(() => {
        expect(screen.getByText('Body Content')).toBeInTheDocument()
      })
    })

    it('Trigger에 aria-haspopup, aria-controls, aria-expanded 속성이 설정되어야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Sheet defaultIsPresented={false} id="test-sheet">
          <Sheet.Trigger>
            <button type="button">열기</button>
          </Sheet.Trigger>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      const triggerButton = screen.getByText('열기')

      expect(triggerButton).toHaveAttribute('aria-haspopup', 'dialog')
      expect(triggerButton).toHaveAttribute('aria-controls', 'test-sheet')
      expect(triggerButton).toHaveAttribute('aria-expanded', 'false')

      await user.click(triggerButton)

      await waitFor(() => {
        expect(triggerButton).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('Trigger가 button이 아닌 요소일 때도 aria 속성이 설정되어야 한다', () => {
      render(
        <Sheet defaultIsPresented={false}>
          <Sheet.Trigger>
            <div>열기</div>
          </Sheet.Trigger>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      const trigger = screen.getByText('열기')

      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Close 기능', () => {
    it('Close를 클릭하면 Sheet가 닫혀야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Sheet defaultIsPresented={true}>
          <Sheet.Footer>
            <Sheet.Close>
              <button type="button">닫기</button>
            </Sheet.Close>
          </Sheet.Footer>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      expect(screen.getByText('Body Content')).toBeInTheDocument()

      const closeButton = screen.getByText('닫기')
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByText('Body Content')).not.toBeInTheDocument()
      })
    })

    it('Close의 onClick 핸들러가 기존 핸들러와 함께 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const existingOnClick = vi.fn()

      render(
        <Sheet defaultIsPresented={true}>
          <Sheet.Footer>
            <Sheet.Close>
              <button type="button" onClick={existingOnClick}>
                닫기
              </button>
            </Sheet.Close>
          </Sheet.Footer>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      const closeButton = screen.getByText('닫기')
      await user.click(closeButton)

      await waitFor(() => {
        expect(existingOnClick).toHaveBeenCalled()
      })
    })
  })

  describe('ESC 키로 닫기 기능', () => {
    it('ESC 키를 누르면 Sheet가 닫혀야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Sheet defaultIsPresented={true}>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      expect(screen.getByText('Body Content')).toBeInTheDocument()

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByText('Body Content')).not.toBeInTheDocument()
      })
    })
  })

  describe('외부 클릭으로 닫기 기능', () => {
    it('외부 영역을 클릭하면 Sheet가 닫혀야 한다', async () => {
      const user = userEvent.setup()

      render(
        <div>
          <button type="button" data-testid="outside-button">
            외부 버튼
          </button>
          <Sheet defaultIsPresented={true}>
            <Sheet.Content>
              <div>Body Content</div>
            </Sheet.Content>
          </Sheet>
        </div>
      )

      expect(screen.getByText('Body Content')).toBeInTheDocument()

      const outsideButton = screen.getByTestId('outside-button')
      await user.click(outsideButton)

      await waitFor(() => {
        expect(screen.queryByText('Body Content')).not.toBeInTheDocument()
      })
    })
  })

  describe('외부 포커스로 닫기 기능', () => {
    it('외부로 포커스가 이동하면 Sheet가 닫혀야 한다', async () => {
      render(
        <div>
          <button type="button" data-testid="outside-button-focus">
            외부 버튼
          </button>
          <Sheet defaultIsPresented={true}>
            <Sheet.Content>
              <input data-testid="inside-input" />
            </Sheet.Content>
          </Sheet>
        </div>
      )

      expect(screen.getByText('외부 버튼')).toBeInTheDocument()

      const insideInput = screen.getByTestId('inside-input')
      const outsideButton = screen.getByTestId('outside-button-focus')

      insideInput.focus()
      outsideButton.focus()

      await waitFor(() => {
        expect(screen.queryByTestId('inside-input')).not.toBeInTheDocument()
      })
    })
  })

  describe('onIsPresentedChange 콜백', () => {
    it('Sheet가 열릴 때 when: "before"로 콜백이 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onIsPresentedChange = vi.fn()

      render(
        <Sheet defaultIsPresented={false} onIsPresentedChange={onIsPresentedChange}>
          <Sheet.Trigger>
            <button type="button">열기</button>
          </Sheet.Trigger>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      const triggerButton = screen.getByText('열기')
      await user.click(triggerButton)

      await waitFor(() => {
        expect(onIsPresentedChange).toHaveBeenCalled()
        const callArgs = onIsPresentedChange.mock.calls.find((call) => call[0].when === 'before')
        expect(callArgs).toBeDefined()
        expect(callArgs?.[0]).toMatchObject({
          newValue: true,
          when: 'before',
        })
      })
    })

    it('Sheet가 닫힐 때 when: "before"와 "after"로 콜백이 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onIsPresentedChange = vi.fn()

      render(
        <Sheet defaultIsPresented={true} onIsPresentedChange={onIsPresentedChange}>
          <Sheet.Footer>
            <Sheet.Close>
              <button type="button">닫기</button>
            </Sheet.Close>
          </Sheet.Footer>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
        </Sheet>
      )

      const closeButton = screen.getByText('닫기')
      await user.click(closeButton)

      await waitFor(() => {
        expect(onIsPresentedChange).toHaveBeenCalled()
        const beforeCall = onIsPresentedChange.mock.calls.find((call) => call[0].when === 'before')
        const afterCall = onIsPresentedChange.mock.calls.find((call) => call[0].when === 'after')

        expect(beforeCall).toBeDefined()
        expect(beforeCall?.[0]).toMatchObject({
          newValue: false,
          when: 'before',
        })

        expect(afterCall).toBeDefined()
        expect(afterCall?.[0]).toMatchObject({
          newValue: false,
          when: 'after',
        })
      })
    })
  })

  describe('슬롯 렌더링', () => {
    it('Header, Body, Footer 슬롯이 모두 렌더링되어야 한다', () => {
      render(
        <Sheet defaultIsPresented={true}>
          <Sheet.Header>
            <div>Header Content</div>
          </Sheet.Header>
          <Sheet.Content>
            <div>Body Content</div>
          </Sheet.Content>
          <Sheet.Footer>
            <div>Footer Content</div>
          </Sheet.Footer>
        </Sheet>
      )

      expect(screen.getByText('Header Content')).toBeInTheDocument()
      expect(screen.getByText('Body Content')).toBeInTheDocument()
      expect(screen.getByText('Footer Content')).toBeInTheDocument()
    })

    it('슬롯이 없어도 정상적으로 렌더링되어야 한다', () => {
      render(<Sheet defaultIsPresented={true} data-testid="sheet-empty" />)

      expect(screen.getByTestId('sheet-empty')).toBeInTheDocument()
    })
  })

  describe('Portal 렌더링', () => {
    it('Sheet가 Portal을 통해 렌더링되어야 한다', () => {
      render(
        <div data-testid="root-container">
          <Sheet defaultIsPresented={true} data-testid="sheet-portal">
            <Sheet.Content>
              <div>Body Content</div>
            </Sheet.Content>
          </Sheet>
        </div>
      )

      const rootContainer = screen.getByTestId('root-container')
      const sheet = screen.getByTestId('sheet-portal')

      expect(rootContainer).not.toContainElement(sheet)
      expect(sheet).toBeInTheDocument()
    })
  })

  describe('기본값 동작', () => {
    it('기본적으로 모든 dismiss 옵션이 활성화되어야 한다', async () => {
      const user = userEvent.setup()
      const onIsPresentedChange = vi.fn()

      render(
        <div>
          <button type="button" data-testid="outside-default">
            외부 버튼
          </button>
          <Sheet defaultIsPresented={true} onIsPresentedChange={onIsPresentedChange}>
            <Sheet.Content>
              <div>Body Content</div>
            </Sheet.Content>
          </Sheet>
        </div>
      )

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(onIsPresentedChange).toHaveBeenCalled()
      })

      render(
        <div>
          <button type="button" data-testid="outside-default-2">
            외부 버튼
          </button>
          <Sheet defaultIsPresented={true}>
            <Sheet.Content>
              <div>Body Content</div>
            </Sheet.Content>
          </Sheet>
        </div>
      )

      const outsideButton = screen.getByTestId('outside-default-2')
      await user.click(outsideButton)

      await waitFor(() => {
        expect(screen.queryByText('Body Content')).not.toBeInTheDocument()
      })
    })
  })
})
