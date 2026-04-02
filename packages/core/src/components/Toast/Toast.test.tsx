import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { Toast } from './Toast'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Toast', () => {
  describe('기본 렌더링', () => {
    it('defaultIsPresented가 true일 때 컴포넌트가 정상적으로 렌더링되어야 한다', () => {
      render(
        <Toast defaultIsPresented={true}>
          <Toast.Leading>아이콘</Toast.Leading>
          <Toast.Center>메시지입니다</Toast.Center>
          <Toast.Trailing>닫기</Toast.Trailing>
        </Toast>,
      )

      expect(screen.getByText('아이콘')).toBeInTheDocument()
      expect(screen.getByText('메시지입니다')).toBeInTheDocument()
      expect(screen.getByText('닫기')).toBeInTheDocument()
    })

    it('isPresented가 false일 때 Toast가 렌더링되지 않아야 한다', () => {
      render(
        <Toast isPresented={false}>
          <Toast.Center>메시지</Toast.Center>
        </Toast>,
      )

      expect(screen.queryByText('메시지')).not.toBeInTheDocument()
    })

    it('isPresented가 true일 때 Toast가 렌더링되어야 한다', () => {
      render(
        <Toast isPresented={true}>
          <Toast.Center>메시지</Toast.Center>
        </Toast>,
      )

      expect(screen.getByText('메시지')).toBeInTheDocument()
    })
  })

  describe('접근성', () => {
    it('role="status"와 aria-live="polite" 속성이 설정되어야 한다', () => {
      render(
        <Toast defaultIsPresented={true} data-testid='toast-a11y'>
          <Toast.Center>알림 메시지</Toast.Center>
        </Toast>,
      )

      const toast = screen.getByTestId('toast-a11y')
      expect(toast).toHaveAttribute('role', 'status')
      expect(toast).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('제어 모드', () => {
    it('isPresented prop으로 Toast 표시 여부를 제어할 수 있어야 한다', () => {
      const { rerender } = render(
        <Toast isPresented={false}>
          <Toast.Center>메시지</Toast.Center>
        </Toast>,
      )

      expect(screen.queryByText('메시지')).not.toBeInTheDocument()

      rerender(
        <Toast isPresented={true}>
          <Toast.Center>메시지</Toast.Center>
        </Toast>,
      )

      expect(screen.getByText('메시지')).toBeInTheDocument()
    })

    it('onIsPresentedChange 콜백이 호출되어야 한다', async () => {
      const onIsPresentedChange = vi.fn()
      const user = userEvent.setup()

      render(
        <Toast defaultIsPresented={true} onIsPresentedChange={onIsPresentedChange}>
          <Toast.Center>메시지</Toast.Center>
          <Toast.Trailing>
            <Toast.Close>
              <button type='button'>닫기</button>
            </Toast.Close>
          </Toast.Trailing>
        </Toast>,
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
        <Toast defaultIsPresented={true}>
          <Toast.Center>메시지</Toast.Center>
        </Toast>,
      )

      expect(screen.getByText('메시지')).toBeInTheDocument()
    })

    it('defaultIsPresented가 false일 때 초기에 Toast가 닫혀있어야 한다', () => {
      render(
        <Toast defaultIsPresented={false}>
          <Toast.Center>메시지</Toast.Center>
        </Toast>,
      )

      expect(screen.queryByText('메시지')).not.toBeInTheDocument()
    })
  })

  describe('Trigger 기능', () => {
    it('Trigger를 클릭하면 Toast가 열려야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Toast defaultIsPresented={false}>
          <Toast.Trigger>
            <button type='button'>알림 표시</button>
          </Toast.Trigger>
          <Toast.Center>알림 메시지</Toast.Center>
        </Toast>,
      )

      expect(screen.queryByText('알림 메시지')).not.toBeInTheDocument()

      const triggerButton = screen.getByText('알림 표시')
      await user.click(triggerButton)

      await waitFor(() => {
        expect(screen.getByText('알림 메시지')).toBeInTheDocument()
      })
    })

    it('Trigger가 button일 때 aria-controls와 aria-expanded 속성이 설정되어야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Toast defaultIsPresented={false} id='test-toast'>
          <Toast.Trigger>
            <button type='button'>알림 표시</button>
          </Toast.Trigger>
          <Toast.Center>메시지</Toast.Center>
        </Toast>,
      )

      const triggerButton = screen.getByText('알림 표시')

      expect(triggerButton).toHaveAttribute('aria-controls', 'test-toast')
      expect(triggerButton).toHaveAttribute('aria-expanded', 'false')

      await user.click(triggerButton)

      await waitFor(() => {
        expect(triggerButton).toHaveAttribute('aria-expanded', 'true')
      })
    })
  })

  describe('Close 기능', () => {
    it('Close를 클릭하면 Toast가 닫혀야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Toast defaultIsPresented={true}>
          <Toast.Center>메시지</Toast.Center>
          <Toast.Trailing>
            <Toast.Close>
              <button type='button'>닫기</button>
            </Toast.Close>
          </Toast.Trailing>
        </Toast>,
      )

      expect(screen.getByText('메시지')).toBeInTheDocument()

      const closeButton = screen.getByText('닫기')
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByText('메시지')).not.toBeInTheDocument()
      })
    })

    it('Close의 기존 onClick 핸들러도 함께 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const existingOnClick = vi.fn()

      render(
        <Toast defaultIsPresented={true}>
          <Toast.Center>메시지</Toast.Center>
          <Toast.Trailing>
            <Toast.Close>
              <button type='button' onClick={existingOnClick}>
                닫기
              </button>
            </Toast.Close>
          </Toast.Trailing>
        </Toast>,
      )

      const closeButton = screen.getByText('닫기')
      await user.click(closeButton)

      await waitFor(() => {
        expect(existingOnClick).toHaveBeenCalled()
      })
    })
  })

  describe('슬롯 렌더링', () => {
    it('Leading, Center, Trailing 슬롯이 모두 렌더링되어야 한다', () => {
      render(
        <Toast defaultIsPresented={true}>
          <Toast.Leading>왼쪽</Toast.Leading>
          <Toast.Center>중앙</Toast.Center>
          <Toast.Trailing>오른쪽</Toast.Trailing>
        </Toast>,
      )

      expect(screen.getByText('왼쪽')).toBeInTheDocument()
      expect(screen.getByText('중앙')).toBeInTheDocument()
      expect(screen.getByText('오른쪽')).toBeInTheDocument()
    })

    it('Center만 있어도 정상적으로 렌더링되어야 한다', () => {
      render(
        <Toast defaultIsPresented={true}>
          <Toast.Center>메시지만</Toast.Center>
        </Toast>,
      )

      expect(screen.getByText('메시지만')).toBeInTheDocument()
    })
  })

  describe('테마 커스터마이징', () => {
    it('theme prop으로 스타일이 인라인으로 적용되어야 한다', () => {
      render(
        <Toast
          defaultIsPresented={true}
          data-testid='themed-toast'
          theme={{
            fillColor: 'red',
            foregroundColor: 'white',
            radius: '16px',
          }}
        >
          <Toast.Center>테마 메시지</Toast.Center>
        </Toast>,
      )

      const toast = screen.getByTestId('themed-toast')
      const style = toast.getAttribute('style') || ''
      expect(style).toContain('background-color: red')
      expect(style).toContain('color: white')
      expect(style).toContain('border-radius: 16px')
    })
  })
})
