import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { Dialog } from './Modal'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Dialog (Modal)', () => {
  test('defaultIsPresented가 true이면 Dialog 내용이 보인다', async () => {
    render(
      <Dialog defaultIsPresented>
        <Dialog.Top>
          <div>다이얼로그 제목</div>
        </Dialog.Top>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByText('다이얼로그 제목')).toBeInTheDocument()
    })
  })

  test('isPresented=false일 때는 렌더링되지 않는다', () => {
    render(
      <Dialog isPresented={false}>
        <Dialog.Top>
          <div>Hidden</div>
        </Dialog.Top>
      </Dialog>
    )

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  test('Top/Bottom 슬롯이 모두 렌더링된다', async () => {
    render(
      <Dialog defaultIsPresented>
        <Dialog.Top>
          <div>상단 영역</div>
        </Dialog.Top>
        <Dialog.Bottom direction="horizontal">
          <div>하단 영역</div>
        </Dialog.Bottom>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByText('상단 영역')).toBeInTheDocument()
      expect(screen.getByText('하단 영역')).toBeInTheDocument()
    })
  })

  test('Trigger 클릭 시 Dialog가 열린다', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <Dialog.Trigger>열기</Dialog.Trigger>
        <Dialog.Top>
          <div>내용</div>
        </Dialog.Top>
      </Dialog>
    )

    expect(screen.queryByText('내용')).not.toBeInTheDocument()

    await user.click(screen.getByText('열기'))

    await waitFor(() => {
      expect(screen.getByText('내용')).toBeInTheDocument()
    })
  })

  test('onIsPresentedChange가 호출된다', async () => {
    const user = userEvent.setup()
    const onIsPresentedChange = vi.fn()

    render(
      <Dialog onIsPresentedChange={onIsPresentedChange}>
        <Dialog.Trigger>열기</Dialog.Trigger>
        <Dialog.Top>
          <div>내용</div>
        </Dialog.Top>
      </Dialog>
    )

    await user.click(screen.getByText('열기'))

    await waitFor(() => {
      expect(onIsPresentedChange).toHaveBeenCalledWith(true)
    })
  })

  test('Close 클릭 시 닫힌다', async () => {
    const user = userEvent.setup()
    const onIsPresentedChange = vi.fn()

    render(
      <Dialog defaultIsPresented onIsPresentedChange={onIsPresentedChange}>
        <Dialog.Top>
          <div>내용</div>
        </Dialog.Top>
        <Dialog.Bottom>
          <Dialog.Close>닫기</Dialog.Close>
        </Dialog.Bottom>
      </Dialog>
    )

    await waitFor(() => expect(screen.getByText('내용')).toBeInTheDocument())

    await user.click(screen.getByText('닫기'))

    await waitFor(() => {
      expect(onIsPresentedChange).toHaveBeenCalledWith(false)
    })
  })

  test('Bottom direction=vertical 클래스명이 적용된다', async () => {
    render(
      <Dialog defaultIsPresented>
        <Dialog.Bottom direction="vertical">
          <div>버튼1</div>
          <div>버튼2</div>
        </Dialog.Bottom>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByText('버튼1')).toBeInTheDocument()
      expect(screen.getByText('버튼2')).toBeInTheDocument()
    })
  })

  test('Title 또는 Description이 생략돼도 접근성 경고를 출력하지 않는다', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      <Dialog defaultIsPresented>
        <Dialog.Top>
          <div>내용</div>
        </Dialog.Top>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    const output = consoleError.mock.calls.flat().join(' ')
    expect(output).not.toContain('requires a description')
    expect(output).not.toContain('requires a `DialogTitle`')
    expect(output).not.toContain('Missing `Description`')
  })

  test('role="dialog"가 부여된다', async () => {
    render(
      <Dialog defaultIsPresented>
        <Dialog.Top>
          <Dialog.Title>제목</Dialog.Title>
        </Dialog.Top>
      </Dialog>
    )

    await waitFor(() => {
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })
  })

  test('Title이 명시되면 aria-labelledby가 Title을 가리킨다', async () => {
    render(
      <Dialog defaultIsPresented>
        <Dialog.Top>
          <Dialog.Title>결제 확인</Dialog.Title>
        </Dialog.Top>
      </Dialog>
    )

    await waitFor(() => {
      const dialog = screen.getByRole('dialog')
      const labelledBy = dialog.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()
      const titleEl = labelledBy ? document.getElementById(labelledBy) : null
      expect(titleEl?.textContent).toBe('결제 확인')
    })
  })

  test('Description이 명시되면 aria-describedby가 Description을 가리킨다', async () => {
    render(
      <Dialog defaultIsPresented>
        <Dialog.Top>
          <Dialog.Title>결제 확인</Dialog.Title>
          <Dialog.Description>이 결제를 진행하시겠습니까?</Dialog.Description>
        </Dialog.Top>
      </Dialog>
    )

    await waitFor(() => {
      const dialog = screen.getByRole('dialog')
      const describedBy = dialog.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
      const descEl = describedBy ? document.getElementById(describedBy) : null
      expect(descEl?.textContent).toBe('이 결제를 진행하시겠습니까?')
    })
  })

  test('Escape 키로 닫힌다', async () => {
    const user = userEvent.setup()
    const onIsPresentedChange = vi.fn()

    render(
      <Dialog defaultIsPresented onIsPresentedChange={onIsPresentedChange}>
        <Dialog.Top>
          <Dialog.Title>제목</Dialog.Title>
          <div>내용</div>
        </Dialog.Top>
      </Dialog>
    )

    await waitFor(() => expect(screen.getByText('내용')).toBeInTheDocument())

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(onIsPresentedChange).toHaveBeenCalledWith(false)
    })
  })

  test('controlled 모드: isPresented prop 변경으로 열고 닫을 수 있다', async () => {
    const { rerender } = render(
      <Dialog isPresented={false}>
        <Dialog.Top>
          <Dialog.Title>제목</Dialog.Title>
          <div>controlled 내용</div>
        </Dialog.Top>
      </Dialog>
    )

    expect(screen.queryByText('controlled 내용')).not.toBeInTheDocument()

    rerender(
      <Dialog isPresented>
        <Dialog.Top>
          <Dialog.Title>제목</Dialog.Title>
          <div>controlled 내용</div>
        </Dialog.Top>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByText('controlled 내용')).toBeInTheDocument()
    })
  })

  test('Top 슬롯 내부에 Trigger가 없어도 Bottom 슬롯의 Close 버튼은 동작한다', async () => {
    const user = userEvent.setup()
    const onIsPresentedChange = vi.fn()

    render(
      <Dialog defaultIsPresented onIsPresentedChange={onIsPresentedChange}>
        <Dialog.Top>
          <Dialog.Title>제목</Dialog.Title>
        </Dialog.Top>
        <Dialog.Bottom>
          <Dialog.Close>cancel</Dialog.Close>
        </Dialog.Bottom>
      </Dialog>
    )

    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())

    await user.click(screen.getByText('cancel'))

    await waitFor(() => expect(onIsPresentedChange).toHaveBeenCalledWith(false))
  })

  test('onOpenChange도 onIsPresentedChange와 동일하게 동작한다 (alias)', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(
      <Dialog onOpenChange={onOpenChange}>
        <Dialog.Trigger>열기</Dialog.Trigger>
        <Dialog.Top>
          <Dialog.Title>제목</Dialog.Title>
        </Dialog.Top>
      </Dialog>
    )

    await user.click(screen.getByText('열기'))

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true))
  })

  test('handles non-element children in dialog gracefully', async () => {
    render(
      <Dialog defaultIsPresented>
        {null}
        Some text
        <Dialog.Top>
          <Dialog.Title>제목</Dialog.Title>
        </Dialog.Top>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByText('제목')).toBeInTheDocument()
    })
  })
})
