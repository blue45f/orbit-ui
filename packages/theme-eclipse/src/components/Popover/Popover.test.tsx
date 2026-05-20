import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

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
  test('Trigger 요소가 렌더링된다', () => {
    render(
      <Popover>
        <Popover.Trigger>열기</Popover.Trigger>
        <Popover.Content>Hidden</Popover.Content>
      </Popover>
    )

    expect(screen.getByText('열기')).toBeInTheDocument()
  })

  test('초기 상태에서는 Content가 표시되지 않는다', () => {
    render(
      <Popover>
        <Popover.Trigger>열기</Popover.Trigger>
        <Popover.Content>Hidden</Popover.Content>
      </Popover>
    )

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  test('defaultOpen이 true면 Content가 표시된다', async () => {
    render(
      <Popover defaultOpen>
        <Popover.Trigger>Trigger</Popover.Trigger>
        <Popover.Content>Visible Content</Popover.Content>
      </Popover>
    )

    await waitFor(() => {
      expect(screen.getByText('Visible Content')).toBeInTheDocument()
    })
  })

  test('Trigger 클릭 시 Popover가 열린다', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <Popover.Trigger>열기</Popover.Trigger>
        <Popover.Content>Body</Popover.Content>
      </Popover>
    )

    await user.click(screen.getByText('열기'))

    await waitFor(() => {
      expect(screen.getByText('Body')).toBeInTheDocument()
    })
  })

  test('onOpenChange가 호출된다', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(
      <Popover onOpenChange={onOpenChange}>
        <Popover.Trigger>열기</Popover.Trigger>
        <Popover.Content>Body</Popover.Content>
      </Popover>
    )

    await user.click(screen.getByText('열기'))

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  test('Escape 키를 누르면 닫힌다', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(
      <Popover defaultOpen onOpenChange={onOpenChange}>
        <Popover.Trigger>열기</Popover.Trigger>
        <Popover.Content>Body</Popover.Content>
      </Popover>
    )

    await waitFor(() => expect(screen.getByText('Body')).toBeInTheDocument())
    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  test('Content에 ref를 전달할 수 있다', async () => {
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
