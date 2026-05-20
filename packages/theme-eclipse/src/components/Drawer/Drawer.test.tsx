import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { Drawer } from './Drawer'

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

describe('Drawer', () => {
  test('defaultOpen이 true이면 Drawer 내용이 보인다', async () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content>
          <Drawer.Title>타이틀</Drawer.Title>
          <Drawer.Description>설명</Drawer.Description>
          <div>Body</div>
        </Drawer.Content>
      </Drawer>
    )

    await waitFor(() => {
      expect(screen.getByText('타이틀')).toBeInTheDocument()
      expect(screen.getByText('설명')).toBeInTheDocument()
      expect(screen.getByText('Body')).toBeInTheDocument()
    })
  })

  test('open=false일 때는 렌더링되지 않는다', () => {
    render(
      <Drawer open={false}>
        <Drawer.Content>
          <div>Hidden</div>
        </Drawer.Content>
      </Drawer>
    )

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  test('Header/Footer 슬롯이 렌더링된다', async () => {
    render(
      <Drawer defaultOpen>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>T</Drawer.Title>
          </Drawer.Header>
          <div>Body</div>
          <Drawer.Footer>푸터</Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    )

    await waitFor(() => {
      expect(screen.getByText('T')).toBeInTheDocument()
      expect(screen.getByText('Body')).toBeInTheDocument()
      expect(screen.getByText('푸터')).toBeInTheDocument()
    })
  })

  test('Trigger 클릭 시 Drawer가 열린다', async () => {
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

  test('Escape 키를 누르면 닫힌다', async () => {
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

  test('open prop으로 외부 제어가 가능하다', () => {
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

  test('Trigger는 aria-haspopup=dialog를 가진다', () => {
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
  })
})
