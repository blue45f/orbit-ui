import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { Alert } from './AlertDialog'

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

describe('Alert (AlertDialog)', () => {
  test('defaultIsPresented가 true이면 Alert 내용이 보인다', async () => {
    render(
      <Alert defaultIsPresented>
        <Alert.Top>
          <Alert.Title>경고</Alert.Title>
          <Alert.Description>설명</Alert.Description>
        </Alert.Top>
      </Alert>
    )

    await waitFor(() => {
      expect(screen.getByText('경고')).toBeInTheDocument()
      expect(screen.getByText('설명')).toBeInTheDocument()
    })
  })

  test('isPresented=false일 때는 렌더링되지 않는다', () => {
    render(
      <Alert isPresented={false}>
        <Alert.Top>
          <Alert.Title>Hidden</Alert.Title>
        </Alert.Top>
      </Alert>
    )

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  test('Top/Bottom 슬롯이 렌더링된다', async () => {
    render(
      <Alert defaultIsPresented>
        <Alert.Top>
          <Alert.Title>제목</Alert.Title>
        </Alert.Top>
        <Alert.Bottom direction="horizontal">
          <Alert.Close>취소</Alert.Close>
          <Alert.Action>확인</Alert.Action>
        </Alert.Bottom>
      </Alert>
    )

    await waitFor(() => {
      expect(screen.getByText('제목')).toBeInTheDocument()
      expect(screen.getByText('취소')).toBeInTheDocument()
      expect(screen.getByText('확인')).toBeInTheDocument()
    })
  })

  test('Trigger 클릭 시 Alert가 열린다', async () => {
    const user = userEvent.setup()

    render(
      <Alert>
        <Alert.Trigger>열기</Alert.Trigger>
        <Alert.Top>
          <Alert.Title>알림</Alert.Title>
        </Alert.Top>
      </Alert>
    )

    expect(screen.queryByText('알림')).not.toBeInTheDocument()

    await user.click(screen.getByText('열기'))

    await waitFor(() => {
      expect(screen.getByText('알림')).toBeInTheDocument()
    })
  })

  test('Close 클릭 시 onIsPresentedChange(false)가 호출된다', async () => {
    const user = userEvent.setup()
    const onIsPresentedChange = vi.fn()

    render(
      <Alert defaultIsPresented onIsPresentedChange={onIsPresentedChange}>
        <Alert.Top>
          <Alert.Title>알림</Alert.Title>
        </Alert.Top>
        <Alert.Bottom>
          <Alert.Close>취소</Alert.Close>
        </Alert.Bottom>
      </Alert>
    )

    await waitFor(() => expect(screen.getByText('취소')).toBeInTheDocument())

    await user.click(screen.getByText('취소'))

    await waitFor(() => {
      expect(onIsPresentedChange).toHaveBeenCalledWith(false)
    })
  })

  test('Action 클릭 시 onIsPresentedChange(false)가 호출된다', async () => {
    const user = userEvent.setup()
    const onIsPresentedChange = vi.fn()

    render(
      <Alert defaultIsPresented onIsPresentedChange={onIsPresentedChange}>
        <Alert.Top>
          <Alert.Title>알림</Alert.Title>
        </Alert.Top>
        <Alert.Bottom>
          <Alert.Action>확인</Alert.Action>
        </Alert.Bottom>
      </Alert>
    )

    await waitFor(() => expect(screen.getByText('확인')).toBeInTheDocument())

    await user.click(screen.getByText('확인'))

    await waitFor(() => {
      expect(onIsPresentedChange).toHaveBeenCalledWith(false)
    })
  })

  test('alertdialog 역할로 렌더링된다', async () => {
    render(
      <Alert defaultIsPresented>
        <Alert.Top>
          <Alert.Title>경고</Alert.Title>
        </Alert.Top>
      </Alert>
    )

    await waitFor(() => {
      expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    })
  })

  test('Title 또는 Description이 생략돼도 접근성 경고를 출력하지 않는다', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      <Alert defaultIsPresented>
        <Alert.Top>
          <Alert.Title>경고</Alert.Title>
        </Alert.Top>
      </Alert>
    )

    await waitFor(() => {
      expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    })

    expect(consoleError.mock.calls.flat().join(' ')).not.toContain('requires a description')
    expect(consoleError.mock.calls.flat().join(' ')).not.toContain('Missing `Description`')
  })
})
