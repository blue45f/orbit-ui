import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup, createMockResizeObserver, render, screen, waitFor } from '../../test-utils'

import { CommandComponent as Command } from './Command'

beforeEach(() => {
  global.ResizeObserver = createMockResizeObserver()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Command', () => {
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링되어야 한다', () => {
      render(
        <Command>
          <Command.Input placeholder="검색..." />
          <Command.List>
            <Command.Empty>결과 없음</Command.Empty>
            <Command.Group heading="항목">
              <Command.Item value="apple">사과</Command.Item>
              <Command.Item value="banana">바나나</Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      )

      expect(screen.getByPlaceholderText('검색...')).toBeInTheDocument()
      expect(screen.getByText('사과')).toBeInTheDocument()
      expect(screen.getByText('바나나')).toBeInTheDocument()
    })

    it('Group heading이 렌더링되어야 한다', () => {
      render(
        <Command>
          <Command.List>
            <Command.Group heading="과일">
              <Command.Item value="apple">사과</Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      )

      expect(screen.getByText('과일')).toBeInTheDocument()
    })
  })

  describe('Compound 컴포넌트', () => {
    it('Separator가 렌더링되어야 한다', () => {
      render(
        <Command>
          <Command.List>
            <Command.Group heading="A">
              <Command.Item value="a">A</Command.Item>
            </Command.Group>
            <Command.Separator data-testid="separator" />
            <Command.Group heading="B">
              <Command.Item value="b">B</Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      )

      expect(screen.getByTestId('separator')).toBeInTheDocument()
    })

    it('Empty 컴포넌트가 검색 결과 없을 때 표시되어야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Command>
          <Command.Input placeholder="search" />
          <Command.List>
            <Command.Empty>결과 없음</Command.Empty>
            <Command.Group>
              <Command.Item value="apple">apple</Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      )

      const input = screen.getByPlaceholderText('search')
      await user.type(input, 'zzz존재하지않는검색어')

      await waitFor(() => {
        expect(screen.getByText('결과 없음')).toBeInTheDocument()
      })
    })
  })

  describe('인터랙션', () => {
    it('Item 클릭 시 onSelect가 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()

      render(
        <Command>
          <Command.List>
            <Command.Group>
              <Command.Item value="apple" onSelect={onSelect}>
                사과
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      )

      await user.click(screen.getByText('사과'))

      expect(onSelect).toHaveBeenCalled()
    })

    it('Input에 타이핑하면 필터링되어야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Command>
          <Command.Input placeholder="search" />
          <Command.List>
            <Command.Group>
              <Command.Item value="apple">apple</Command.Item>
              <Command.Item value="banana">banana</Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      )

      const input = screen.getByPlaceholderText('search')
      await user.type(input, 'app')

      await waitFor(() => {
        expect(screen.getByText('apple')).toBeInTheDocument()
      })
    })
  })

  describe('Ref 전달', () => {
    it('Command에 ref를 전달할 수 있어야 한다', () => {
      const ref = createRef<HTMLDivElement>()

      render(
        <Command ref={ref}>
          <Command.List>
            <Command.Item value="x">x</Command.Item>
          </Command.List>
        </Command>
      )

      expect(ref.current).not.toBeNull()
    })
  })

  describe('Command.Dialog', () => {
    const DialogContent = () => (
      <>
        <Command.Input placeholder="명령 검색..." />
        <Command.List>
          <Command.Empty>결과 없음</Command.Empty>
          <Command.Group heading="작업">
            <Command.Item value="new">새로 만들기</Command.Item>
            <Command.Item value="open">열기</Command.Item>
          </Command.Group>
        </Command.List>
      </>
    )

    it('닫혀 있으면 아무것도 렌더링하지 않아야 한다', () => {
      render(
        <Command.Dialog open={false} onOpenChange={() => {}}>
          <DialogContent />
        </Command.Dialog>
      )

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(screen.queryByPlaceholderText('명령 검색...')).not.toBeInTheDocument()
    })

    it('열려 있으면 role=dialog 와 항목들이 렌더링되어야 한다', async () => {
      render(
        <Command.Dialog open onOpenChange={() => {}}>
          <DialogContent />
        </Command.Dialog>
      )

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      expect(screen.getByText('새로 만들기')).toBeInTheDocument()
      expect(screen.getByText('열기')).toBeInTheDocument()
    })

    it('접근 가능한 이름(기본값 "명령 팔레트")을 가져야 한다', async () => {
      render(
        <Command.Dialog open onOpenChange={() => {}}>
          <DialogContent />
        </Command.Dialog>
      )

      await waitFor(() => {
        expect(screen.getByRole('dialog', { name: '명령 팔레트' })).toBeInTheDocument()
      })
    })

    it('열리면 Input 에 포커스가 가야 한다', async () => {
      render(
        <Command.Dialog open onOpenChange={() => {}}>
          <DialogContent />
        </Command.Dialog>
      )

      const input = await screen.findByPlaceholderText('명령 검색...')
      await waitFor(() => {
        expect(input).toHaveFocus()
      })
    })

    it('enableShortcut 가 켜지면 ⌘K 로 열림 상태가 토글되어야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Command.Dialog enableShortcut>
          <DialogContent />
        </Command.Dialog>
      )

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      // Cmd+K (macOS) 로 열기
      await user.keyboard('{Meta>}k{/Meta}')
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Cmd+K 다시 눌러 닫기
      await user.keyboard('{Meta>}k{/Meta}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('Ctrl+K 로도 열 수 있어야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Command.Dialog enableShortcut>
          <DialogContent />
        </Command.Dialog>
      )

      await user.keyboard('{Control>}k{/Control}')
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('Esc 키로 닫혀야 한다 (Radix)', async () => {
      const user = userEvent.setup()

      const Harness = () => {
        const [open, setOpen] = useState(true)

        return (
          <Command.Dialog open={open} onOpenChange={setOpen}>
            <DialogContent />
          </Command.Dialog>
        )
      }

      render(<Harness />)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('enableShortcut 가 꺼져 있으면 ⌘K 가 동작하지 않아야 한다', async () => {
      const user = userEvent.setup()

      render(
        <Command.Dialog>
          <DialogContent />
        </Command.Dialog>
      )

      await user.keyboard('{Meta>}k{/Meta}')

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
