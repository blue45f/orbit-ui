import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '../../../test-utils'
import { ContentLayer } from '../Layer'

import { OverlayContainerLayer } from './OverlayContainerLayer'

describe('OverlayContainerLayer', () => {
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링되어야 한다', () => {
      render(
        <OverlayContainerLayer data-testid='overlay-basic'>
          <ContentLayer>Overlay Content</ContentLayer>
        </OverlayContainerLayer>,
      )

      expect(screen.getByTestId('overlay-basic')).toBeInTheDocument()
      expect(screen.getByText('Overlay Content')).toBeInTheDocument()
    })
  })

  describe('ESC 키로 닫기 기능', () => {
    it('ESC 키를 누르면 onDismiss가 호출되어야 한다', async () => {
      const onDismiss = vi.fn()
      const user = userEvent.setup()

      render(
        <OverlayContainerLayer dismissOnEscape onDismiss={onDismiss} data-testid='overlay-escape'>
          <ContentLayer>
            <div>Overlay Content</div>
          </ContentLayer>
        </OverlayContainerLayer>,
      )

      await user.keyboard('{Escape}')

      expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('dismissOnEscape가 false이면 ESC 키로 닫히지 않아야 한다', async () => {
      const onDismiss = vi.fn()
      const user = userEvent.setup()

      render(
        <OverlayContainerLayer dismissOnEscape={false} onDismiss={onDismiss} data-testid='overlay-escape-disabled'>
          <ContentLayer>
            <div>Overlay Content</div>
          </ContentLayer>
        </OverlayContainerLayer>,
      )

      await user.keyboard('{Escape}')

      expect(onDismiss).not.toHaveBeenCalled()
    })

    it('onDismiss가 없으면 ESC 키 이벤트가 기본 동작을 해야 한다', async () => {
      const user = userEvent.setup()

      render(
        <OverlayContainerLayer data-testid='overlay-no-dismiss'>
          <ContentLayer>
            <div>Overlay Content</div>
          </ContentLayer>
        </OverlayContainerLayer>,
      )

      await user.keyboard('{Escape}')

      expect(document.activeElement).toHaveFocus()
    })
  })

  describe('외부 클릭으로 닫기 기능', () => {
    it('외부 영역을 클릭하면 onDismiss가 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onDismiss = vi.fn()

      render(
        <div>
          <button type='button' data-testid='outside-click'>
            Outside Content
          </button>
          <OverlayContainerLayer dismissOnClickOutside onDismiss={onDismiss} data-testid='overlay-click'>
            <ContentLayer>
              <div>Overlay Content</div>
            </ContentLayer>
          </OverlayContainerLayer>
        </div>,
      )

      await user.click(screen.getByTestId('outside-click'))

      expect(onDismiss).toHaveBeenCalled()
    })

    it('dismissOnClickOutside가 false이면 외부 클릭으로 닫히지 않아야 한다', async () => {
      const user = userEvent.setup()
      const onDismiss = vi.fn()

      render(
        <OverlayContainerLayer dismissOnClickOutside={false} onDismiss={onDismiss} data-testid='overlay-click-disabled'>
          <ContentLayer>
            <div>Overlay Content</div>
          </ContentLayer>
        </OverlayContainerLayer>,
      )

      await user.pointer({ target: screen.getByTestId('overlay-click-disabled') })

      expect(onDismiss).not.toHaveBeenCalled()
    })

    it('Protected 영역을 클릭하면 닫히지 않아야 한다', async () => {
      const user = userEvent.setup()
      const onDismiss = vi.fn()

      render(
        <div>
          <OverlayContainerLayer.Protected data-testid='protected-click'>
            Protected Content
          </OverlayContainerLayer.Protected>
          <OverlayContainerLayer onDismiss={onDismiss} data-testid='overlay-protected'>
            <ContentLayer>
              <div>Overlay Content</div>
            </ContentLayer>
          </OverlayContainerLayer>
        </div>,
      )

      await user.pointer({ target: screen.getByTestId('protected-click') })

      expect(onDismiss).not.toHaveBeenCalled()
    })
  })

  describe('외부 포커스로 닫기 기능', () => {
    it('외부로 포커스가 이동하면 onDismiss가 호출되어야 한다', () => {
      const onDismiss = vi.fn()

      render(
        <div>
          <button type='button' data-testid='outside-button-focus'>
            Outside Button
          </button>
          <OverlayContainerLayer dismissOnFocusOutside onDismiss={onDismiss} data-testid='overlay-focus'>
            <ContentLayer>
              <input data-testid='inside-input-focus' />
            </ContentLayer>
          </OverlayContainerLayer>
        </div>,
      )

      const insideInput = screen.getByTestId('inside-input-focus')
      const outsideButton = screen.getByTestId('outside-button-focus')

      insideInput.focus()
      outsideButton.focus()

      expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('dismissOnFocusOutside가 false이면 외부 포커스로 닫히지 않아야 한다', () => {
      const onDismiss = vi.fn()
      render(
        <div>
          <button type='button' data-testid='outside-button-focus-disabled'>
            Outside Button
          </button>
          <OverlayContainerLayer
            dismissOnFocusOutside={false}
            onDismiss={onDismiss}
            data-testid='overlay-focus-disabled'
          >
            <ContentLayer>
              <input data-testid='inside-input-focus-disabled' />
            </ContentLayer>
          </OverlayContainerLayer>
        </div>,
      )

      const insideInput = screen.getByTestId('inside-input-focus-disabled')
      const outsideButton = screen.getByTestId('outside-button-focus-disabled')

      insideInput.focus()
      outsideButton.focus()

      expect(onDismiss).not.toHaveBeenCalled()
    })

    it('Protected 영역으로 포커스가 이동하면 닫히지 않아야 한다', () => {
      const onDismiss = vi.fn()

      render(
        <div>
          <OverlayContainerLayer onDismiss={onDismiss} data-testid='overlay-focus-protected'>
            <ContentLayer>
              <input data-testid='inside-input-focus-protected' />
            </ContentLayer>
          </OverlayContainerLayer>
          <OverlayContainerLayer.Protected data-testid='protected-focus'>
            <input data-testid='protected-input-focus' />
          </OverlayContainerLayer.Protected>
        </div>,
      )

      const insideInput = screen.getByTestId('inside-input-focus-protected')
      const protectedInput = screen.getByTestId('protected-input-focus')

      insideInput.focus()
      protectedInput.focus()

      expect(onDismiss).not.toHaveBeenCalled()
    })
  })

  describe('레이어 관리', () => {
    it('여러 레이어가 있을 때 가장 최근 렌더링된 레이어부터 순서대로 ESC 키로 닫히도록 해야 한다', async () => {
      const user = userEvent.setup()
      const OverlayBox = ({ children }: React.PropsWithChildren) => {
        const [open, setOpen] = useState(true)

        if (!open) return null

        return (
          <OverlayContainerLayer dismissOnEscape onDismiss={() => setOpen(false)} data-testid='overlay-box'>
            <ContentLayer>{children}</ContentLayer>
          </OverlayContainerLayer>
        )
      }

      render(
        <div data-testid='overlay-container-multiple'>
          <OverlayBox>
            <div>First Overlay</div>
          </OverlayBox>
          <OverlayBox>
            <div>Second Overlay</div>
          </OverlayBox>
        </div>,
      )

      expect(screen.getByText('Second Overlay')).toBeInTheDocument()
      expect(screen.getByText('First Overlay')).toBeInTheDocument()

      await user.keyboard('{Escape}')

      expect(screen.queryByText('Second Overlay')).not.toBeInTheDocument()
      expect(screen.getByText('First Overlay')).toBeInTheDocument()

      await user.keyboard('{Escape}')

      expect(screen.queryByText('First Overlay')).not.toBeInTheDocument()
      expect(screen.queryByText('Second Overlay')).not.toBeInTheDocument()
    })
  })

  describe('기본값 동작', () => {
    it('기본적으로 모든 dismiss 옵션이 활성화되어야 한다', async () => {
      const user = userEvent.setup()
      const onDismiss = vi.fn()

      render(
        <div>
          <div data-testid='outside-default'>Outside Content</div>

          <OverlayContainerLayer onDismiss={onDismiss} data-testid='overlay-default'>
            <ContentLayer>
              <div>Overlay Content</div>
            </ContentLayer>
          </OverlayContainerLayer>
        </div>,
      )

      await user.keyboard('{Escape}')
      expect(onDismiss).toHaveBeenCalledTimes(1)

      await user.click(screen.getByTestId('outside-default'))
      expect(onDismiss).toHaveBeenCalledTimes(2)
    })
  })

  describe('접근성', () => {
    it('컴포넌트가 포커스를 받을 수 있어야 한다', () => {
      render(
        <OverlayContainerLayer data-testid='overlay-accessibility' tabIndex={0}>
          <ContentLayer>
            <div>Overlay Content</div>
          </ContentLayer>
        </OverlayContainerLayer>,
      )

      const overlay = screen.getByTestId('overlay-accessibility')

      overlay.focus()
      expect(overlay).toHaveFocus()
    })

    it('이벤트 핸들러가 올바르게 연결되어야 한다', () => {
      const onFocusCapture = vi.fn()
      const onBlurCapture = vi.fn()
      const onPointerDownCapture = vi.fn()

      render(
        <OverlayContainerLayer
          data-testid='overlay-events'
          onFocusCapture={onFocusCapture}
          onBlurCapture={onBlurCapture}
          onPointerDownCapture={onPointerDownCapture}
        >
          <ContentLayer>
            <div>Overlay Content</div>
          </ContentLayer>
        </OverlayContainerLayer>,
      )

      const overlay = screen.getByTestId('overlay-events')

      fireEvent.focus(overlay)
      expect(onFocusCapture).toHaveBeenCalled()

      fireEvent.blur(overlay)
      expect(onBlurCapture).toHaveBeenCalled()

      fireEvent.pointerDown(overlay)
      expect(onPointerDownCapture).toHaveBeenCalled()
    })
  })
})
