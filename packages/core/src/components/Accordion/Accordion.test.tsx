import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Accordion } from './Accordion'

beforeEach(() => {
  // Radix Accordion uses ResizeObserver internally for collapsible animations
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

describe('Accordion', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>섹션 1</Accordion.Trigger>
          <Accordion.Content>섹션 1 컨텐츠</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    expect(screen.getByText('섹션 1')).toBeInTheDocument()
  })

  test('Trigger는 button role을 가진다.', () => {
    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>섹션 1</Accordion.Trigger>
          <Accordion.Content>컨텐츠</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    expect(screen.getByRole('button', { name: /섹션 1/ })).toBeInTheDocument()
  })

  test('초기에는 컨텐츠가 보이지 않는다.', () => {
    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>섹션 1</Accordion.Trigger>
          <Accordion.Content>섹션 1 컨텐츠</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    // Radix Accordion uses Presence which unmounts closed items
    expect(screen.queryByText('섹션 1 컨텐츠')).not.toBeInTheDocument()
  })

  test('defaultValue로 초기에 열린 항목을 지정할 수 있다.', () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>섹션 1</Accordion.Trigger>
          <Accordion.Content>섹션 1 컨텐츠</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    expect(screen.getByText('섹션 1 컨텐츠')).toBeInTheDocument()
  })

  test('Trigger 클릭 시 컨텐츠가 열린다.', async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>섹션 1</Accordion.Trigger>
          <Accordion.Content>섹션 1 컨텐츠</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    const trigger = screen.getByRole('button', { name: /섹션 1/ })
    await user.click(trigger)

    expect(screen.getByText('섹션 1 컨텐츠')).toBeInTheDocument()
  })

  test('onValueChange 콜백이 호출된다.', async () => {
    const handler = vi.fn()
    const user = userEvent.setup()

    render(
      <Accordion type="single" collapsible onValueChange={handler}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>섹션 1</Accordion.Trigger>
          <Accordion.Content>섹션 1 컨텐츠</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    await user.click(screen.getByRole('button', { name: /섹션 1/ }))

    expect(handler).toHaveBeenCalledWith('item-1')
  })

  test('multiple type에서 여러 항목을 동시에 열 수 있다.', async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="multiple">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>섹션 1</Accordion.Trigger>
          <Accordion.Content>컨텐츠 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>섹션 2</Accordion.Trigger>
          <Accordion.Content>컨텐츠 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    await user.click(screen.getByRole('button', { name: /섹션 1/ }))
    await user.click(screen.getByRole('button', { name: /섹션 2/ }))

    expect(screen.getByText('컨텐츠 1')).toBeInTheDocument()
    expect(screen.getByText('컨텐츠 2')).toBeInTheDocument()
  })

  test('Item ref가 전달된다.', () => {
    const ref = createRef<HTMLDivElement>()

    render(
      <Accordion type="single" collapsible>
        <Accordion.Item ref={ref} value="item-1" data-testid="item">
          <Accordion.Trigger>섹션</Accordion.Trigger>
          <Accordion.Content>컨텐츠</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    expect(ref.current).toBe(screen.getByTestId('item'))
  })

  test('Trigger의 aria-expanded가 상태에 따라 변경된다.', async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>섹션 1</Accordion.Trigger>
          <Accordion.Content>섹션 1 컨텐츠</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    const trigger = screen.getByRole('button', { name: /섹션 1/ })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  test('collapsible 모드에서 동일 항목 재클릭 시 닫힌다.', async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>섹션 1</Accordion.Trigger>
          <Accordion.Content>섹션 1 컨텐츠</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    expect(screen.getByText('섹션 1 컨텐츠')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /섹션 1/ }))

    expect(screen.queryByText('섹션 1 컨텐츠')).not.toBeInTheDocument()
  })
})
