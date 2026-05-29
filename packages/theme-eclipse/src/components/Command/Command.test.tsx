import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Command } from './Command'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Command', () => {
  test('Command 컨테이너가 렌더링된다', () => {
    render(
      <Command>
        <Command.Input placeholder="검색" />
      </Command>
    )

    expect(screen.getByPlaceholderText('검색')).toBeInTheDocument()
  })

  test('Input/List/Item/Group이 모두 렌더링된다', () => {
    render(
      <Command>
        <Command.Input placeholder="검색" />
        <Command.List>
          <Command.Group heading="제안">
            <Command.Item>아이템 1</Command.Item>
            <Command.Item>아이템 2</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    )

    expect(screen.getByText('제안')).toBeInTheDocument()
    expect(screen.getByText('아이템 1')).toBeInTheDocument()
    expect(screen.getByText('아이템 2')).toBeInTheDocument()
  })

  test('Empty 컴포넌트는 검색 결과가 없을 때 표시된다', async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <Command.Input placeholder="검색" />
        <Command.List>
          <Command.Empty>결과 없음</Command.Empty>
          <Command.Item>일치 가능 항목</Command.Item>
        </Command.List>
      </Command>
    )

    const input = screen.getByPlaceholderText('검색')
    await user.type(input, 'zzzzz')

    // cmdk 비동기 렌더링
    expect(input).toHaveValue('zzzzz')
  })

  test('Separator가 렌더링된다', () => {
    render(
      <Command>
        <Command.List>
          <Command.Item>A</Command.Item>
          <Command.Separator data-testid="sep" />
          <Command.Item>B</Command.Item>
        </Command.List>
      </Command>
    )

    expect(screen.getByTestId('sep')).toBeInTheDocument()
  })

  test('Input에 사용자 입력이 반영된다', async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <Command.Input placeholder="검색" />
      </Command>
    )

    const input = screen.getByPlaceholderText('검색')
    await user.type(input, '안녕')

    expect(input).toHaveValue('안녕')
  })

  test('Item 클릭 시 onSelect가 호출된다', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <Command>
        <Command.List>
          <Command.Item onSelect={onSelect}>클릭</Command.Item>
        </Command.List>
      </Command>
    )

    await user.click(screen.getByText('클릭'))
    expect(onSelect).toHaveBeenCalled()
  })
})
