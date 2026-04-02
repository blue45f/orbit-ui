import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { AlertDialog } from './AlertDialog'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('AlertDialog', () => {
  describe('기본 렌더링', () => {
    it('defaultIsPresented가 true일 때 컴포넌트가 정상적으로 렌더링되어야 한다', () => {
      render(
        <AlertDialog defaultIsPresented={true}>
          <AlertDialog.Top>
            <div>제목</div>
          </AlertDialog.Top>
          <AlertDialog.Bottom>
            <button type='button'>확인</button>
          </AlertDialog.Bottom>
        </AlertDialog>,
      )

      expect(screen.getByText('제목')).toBeInTheDocument()
      expect(screen.getByText('확인')).toBeInTheDocument()
    })

    it('isPresented가 false일 때 다이얼로그가 렌더링되지 않아야 한다', () => {
      render(
        <AlertDialog isPresented={false}>
          <AlertDialog.Top>
            <div>제목</div>
          </AlertDialog.Top>
        </AlertDialog>,
      )

      expect(screen.queryByText('제목')).not.toBeInTheDocument()
    })

    it('isPresented가 true일 때 다이얼로그가 렌더링되어야 한다', () => {
      render(
        <AlertDialog isPresented={true}>
          <AlertDialog.Top>
            <div>제목</div>
          </AlertDialog.Top>
        </AlertDialog>,
      )

      expect(screen.getByText('제목')).toBeInTheDocument()
    })
  })

  describe('제어 모드', () => {
    it('isPresented prop으로 다이얼로그 표시 여부를 제어할 수 있어야 한다', () => {
      const { rerender } = render(
        <AlertDialog isPresented={false}>
          <AlertDialog.Top>
            <div>내용</div>
          </AlertDialog.Top>
        </AlertDialog>,
      )

      expect(screen.queryByText('내용')).not.toBeInTheDocument()

      rerender(
        <AlertDialog isPresented={true}>
          <AlertDialog.Top>
            <div>내용</div>
          </AlertDialog.Top>
        </AlertDialog>,
      )

      expect(screen.getByText('내용')).toBeInTheDocument()
    })

    it('onIsPresentedChange 콜백이 호출되어야 한다', async () => {
      const onIsPresentedChange = vi.fn()
      const user = userEvent.setup()

      render(
        <AlertDialog defaultIsPresented={true} onIsPresentedChange={onIsPresentedChange}>
          <AlertDialog.Top>내용</AlertDialog.Top>
          <AlertDialog.Bottom>
            <AlertDialog.Close>
              <button type='button'>닫기</button>
            </AlertDialog.Close>
          </AlertDialog.Bottom>
        </AlertDialog>,
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

  describe('Trigger 기능', () => {
    it('Trigger를 클릭하면 다이얼로그가 열려야 한다', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog defaultIsPresented={false}>
          <AlertDialog.Trigger>
            <button type='button'>열기</button>
          </AlertDialog.Trigger>
          <AlertDialog.Top>
            <div>다이얼로그 내용</div>
          </AlertDialog.Top>
        </AlertDialog>,
      )

      expect(screen.queryByText('다이얼로그 내용')).not.toBeInTheDocument()

      const triggerButton = screen.getByText('열기')
      await user.click(triggerButton)

      await waitFor(() => {
        expect(screen.getByText('다이얼로그 내용')).toBeInTheDocument()
      })
    })

    it('Trigger에 aria-haspopup, aria-controls, aria-expanded 속성이 설정되어야 한다', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog defaultIsPresented={false} id='test-alert'>
          <AlertDialog.Trigger>
            <button type='button'>열기</button>
          </AlertDialog.Trigger>
          <AlertDialog.Top>내용</AlertDialog.Top>
        </AlertDialog>,
      )

      const triggerButton = screen.getByText('열기')

      expect(triggerButton).toHaveAttribute('aria-haspopup', 'dialog')
      expect(triggerButton).toHaveAttribute('aria-controls', 'test-alert')
      expect(triggerButton).toHaveAttribute('aria-expanded', 'false')

      await user.click(triggerButton)

      await waitFor(() => {
        expect(triggerButton).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('Trigger가 button이 아닌 요소일 때 role="button"과 tabIndex가 설정되어야 한다', () => {
      render(
        <AlertDialog defaultIsPresented={false}>
          <AlertDialog.Trigger>
            <div>열기</div>
          </AlertDialog.Trigger>
          <AlertDialog.Top>내용</AlertDialog.Top>
        </AlertDialog>,
      )

      const trigger = screen.getByText('열기')

      expect(trigger).toHaveAttribute('role', 'button')
      expect(trigger).toHaveAttribute('tabindex', '0')
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('Trigger가 비대화형 요소일 때 Enter/Space 키로 열 수 있어야 한다', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog defaultIsPresented={false}>
          <AlertDialog.Trigger>
            <div>열기</div>
          </AlertDialog.Trigger>
          <AlertDialog.Top>
            <div>다이얼로그 내용</div>
          </AlertDialog.Top>
        </AlertDialog>,
      )

      const trigger = screen.getByText('열기')
      trigger.focus()
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(screen.getByText('다이얼로그 내용')).toBeInTheDocument()
      })
    })
  })

  describe('Close 기능', () => {
    it('Close를 클릭하면 다이얼로그가 닫혀야 한다', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog defaultIsPresented={true}>
          <AlertDialog.Top>
            <div>다이얼로그 내용</div>
          </AlertDialog.Top>
          <AlertDialog.Bottom>
            <AlertDialog.Close>
              <button type='button'>닫기</button>
            </AlertDialog.Close>
          </AlertDialog.Bottom>
        </AlertDialog>,
      )

      expect(screen.getByText('다이얼로그 내용')).toBeInTheDocument()

      const closeButton = screen.getByText('닫기')
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByText('다이얼로그 내용')).not.toBeInTheDocument()
      })
    })

    it('Close의 기존 onClick 핸들러도 함께 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const existingOnClick = vi.fn()

      render(
        <AlertDialog defaultIsPresented={true}>
          <AlertDialog.Top>내용</AlertDialog.Top>
          <AlertDialog.Bottom>
            <AlertDialog.Close>
              <button type='button' onClick={existingOnClick}>
                닫기
              </button>
            </AlertDialog.Close>
          </AlertDialog.Bottom>
        </AlertDialog>,
      )

      const closeButton = screen.getByText('닫기')
      await user.click(closeButton)

      await waitFor(() => {
        expect(existingOnClick).toHaveBeenCalled()
      })
    })
  })

  describe('onIsPresentedChange 콜백', () => {
    it('다이얼로그가 열릴 때 when: "before"로 콜백이 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onIsPresentedChange = vi.fn()

      render(
        <AlertDialog defaultIsPresented={false} onIsPresentedChange={onIsPresentedChange}>
          <AlertDialog.Trigger>
            <button type='button'>열기</button>
          </AlertDialog.Trigger>
          <AlertDialog.Top>내용</AlertDialog.Top>
        </AlertDialog>,
      )

      const triggerButton = screen.getByText('열기')
      await user.click(triggerButton)

      await waitFor(() => {
        expect(onIsPresentedChange).toHaveBeenCalled()
        const callArgs = onIsPresentedChange.mock.calls.find(
          (call: any) => call[0].when === 'before',
        )
        expect(callArgs).toBeDefined()
        expect(callArgs?.[0]).toMatchObject({
          newValue: true,
          when: 'before',
        })
      })
    })

    it('다이얼로그가 닫힐 때 when: "before"와 "after"로 콜백이 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onIsPresentedChange = vi.fn()

      render(
        <AlertDialog defaultIsPresented={true} onIsPresentedChange={onIsPresentedChange}>
          <AlertDialog.Top>내용</AlertDialog.Top>
          <AlertDialog.Bottom>
            <AlertDialog.Close>
              <button type='button'>닫기</button>
            </AlertDialog.Close>
          </AlertDialog.Bottom>
        </AlertDialog>,
      )

      const closeButton = screen.getByText('닫기')
      await user.click(closeButton)

      await waitFor(() => {
        const beforeCall = onIsPresentedChange.mock.calls.find(
          (call: any) => call[0].when === 'before',
        )
        const afterCall = onIsPresentedChange.mock.calls.find(
          (call: any) => call[0].when === 'after',
        )

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
    it('Top과 Bottom 슬롯이 모두 렌더링되어야 한다', () => {
      render(
        <AlertDialog defaultIsPresented={true}>
          <AlertDialog.Top>
            <div>상단 내용</div>
          </AlertDialog.Top>
          <AlertDialog.Bottom>
            <div>하단 내용</div>
          </AlertDialog.Bottom>
        </AlertDialog>,
      )

      expect(screen.getByText('상단 내용')).toBeInTheDocument()
      expect(screen.getByText('하단 내용')).toBeInTheDocument()
    })
  })

  describe('Portal 렌더링', () => {
    it('AlertDialog가 Portal을 통해 렌더링되어야 한다', () => {
      render(
        <div data-testid='root-container'>
          <AlertDialog defaultIsPresented={true} data-testid='alert-portal'>
            <AlertDialog.Top>내용</AlertDialog.Top>
          </AlertDialog>
        </div>,
      )

      const rootContainer = screen.getByTestId('root-container')
      const alertDialog = screen.getByTestId('alert-portal')

      expect(rootContainer).not.toContainElement(alertDialog)
      expect(alertDialog).toBeInTheDocument()
    })
  })
})
