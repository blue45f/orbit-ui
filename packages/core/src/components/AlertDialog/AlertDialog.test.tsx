import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup, createMockResizeObserver, render, screen, waitFor } from '../../test-utils'

import { AlertDialog } from './AlertDialog'

beforeEach(() => {
  global.ResizeObserver = createMockResizeObserver()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('AlertDialog', () => {
  describe('기본 렌더링', () => {
    it('defaultOpen이 true이면 다이얼로그가 렌더링되어야 한다', async () => {
      render(
        <AlertDialog defaultOpen>
          <AlertDialog.Content>
            <AlertDialog.Title>제목</AlertDialog.Title>
            <AlertDialog.Description>설명</AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog>
      )

      await waitFor(() => {
        expect(screen.getByText('제목')).toBeInTheDocument()
        expect(screen.getByText('설명')).toBeInTheDocument()
      })
    })

    it('open=false일 때는 다이얼로그가 렌더링되지 않아야 한다', () => {
      render(
        <AlertDialog open={false}>
          <AlertDialog.Content>
            <AlertDialog.Title>제목</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog>
      )

      expect(screen.queryByText('제목')).not.toBeInTheDocument()
    })
  })

  describe('Compound 컴포넌트', () => {
    it('Header, Footer, Title, Description이 렌더링되어야 한다', async () => {
      render(
        <AlertDialog defaultOpen>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>경고</AlertDialog.Title>
              <AlertDialog.Description>설명</AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>취소</AlertDialog.Cancel>
              <AlertDialog.Action>확인</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      )

      await waitFor(() => {
        expect(screen.getByText('경고')).toBeInTheDocument()
        expect(screen.getByText('설명')).toBeInTheDocument()
        expect(screen.getByText('취소')).toBeInTheDocument()
        expect(screen.getByText('확인')).toBeInTheDocument()
      })
    })
  })

  describe('Trigger 인터랙션', () => {
    it('Trigger 클릭 시 다이얼로그가 열려야 한다', async () => {
      const user = userEvent.setup()

      render(
        <AlertDialog>
          <AlertDialog.Trigger>열기</AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>알림</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog>
      )

      expect(screen.queryByText('알림')).not.toBeInTheDocument()

      await user.click(screen.getByText('열기'))

      await waitFor(() => {
        expect(screen.getByText('알림')).toBeInTheDocument()
      })
    })
  })

  describe('Cancel/Action 동작', () => {
    it('Cancel 클릭 시 다이얼로그가 닫혀야 한다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <AlertDialog defaultOpen onOpenChange={onOpenChange}>
          <AlertDialog.Content>
            <AlertDialog.Title>알림</AlertDialog.Title>
            <AlertDialog.Cancel>취소</AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog>
      )

      await waitFor(() => expect(screen.getByText('취소')).toBeInTheDocument())

      await user.click(screen.getByText('취소'))

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })

    it('Action 클릭 시 다이얼로그가 닫혀야 한다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <AlertDialog defaultOpen onOpenChange={onOpenChange}>
          <AlertDialog.Content>
            <AlertDialog.Title>알림</AlertDialog.Title>
            <AlertDialog.Action>확인</AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog>
      )

      await waitFor(() => expect(screen.getByText('확인')).toBeInTheDocument())

      await user.click(screen.getByText('확인'))

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('ARIA', () => {
    it('Content가 alertdialog 역할을 가져야 한다', async () => {
      render(
        <AlertDialog defaultOpen>
          <AlertDialog.Content>
            <AlertDialog.Title>제목</AlertDialog.Title>
            <AlertDialog.Description>설명</AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog>
      )

      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })
    })
  })

  describe('Ref 전달', () => {
    it('Content에 ref를 전달할 수 있어야 한다', async () => {
      const ref = createRef<HTMLDivElement>()

      render(
        <AlertDialog defaultOpen>
          <AlertDialog.Content ref={ref}>
            <AlertDialog.Title>제목</AlertDialog.Title>
          </AlertDialog.Content>
        </AlertDialog>
      )

      await waitFor(() => {
        expect(ref.current).not.toBeNull()
      })
    })
  })

  describe('Portal 렌더링', () => {
    it('Content가 Portal을 통해 렌더링되어야 한다', async () => {
      render(
        <div data-testid="root-alert">
          <AlertDialog defaultOpen>
            <AlertDialog.Content>
              <AlertDialog.Title>제목</AlertDialog.Title>
            </AlertDialog.Content>
          </AlertDialog>
        </div>
      )

      await waitFor(() => {
        const root = screen.getByTestId('root-alert')
        const dialog = screen.getByRole('alertdialog')
        expect(root).not.toContainElement(dialog)
      })
    })
  })
})
