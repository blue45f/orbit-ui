import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { CommandComponent as Command } from './Command'

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
})
