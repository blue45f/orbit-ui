import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { Accordion } from './Accordion'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Accordion', () => {
  test('Trigger들이 렌더링된다', () => {
    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>첫번째 질문</Accordion.Trigger>
          <Accordion.Content>첫번째 답변</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>두번째 질문</Accordion.Trigger>
          <Accordion.Content>두번째 답변</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    expect(screen.getByText('첫번째 질문')).toBeInTheDocument()
    expect(screen.getByText('두번째 질문')).toBeInTheDocument()
  })

  test('초기 상태에서 Content는 보이지 않는다 (closed)', () => {
    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>질문</Accordion.Trigger>
          <Accordion.Content>답변</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    const trigger = screen.getByText('질문')
    // Radix Accordion 헤더의 aria-expanded는 false
    const button = trigger.closest('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  test('Trigger 클릭 시 펼쳐진다 (aria-expanded=true)', async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>질문</Accordion.Trigger>
          <Accordion.Content>답변</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    const trigger = screen.getByText('질문').closest('button')!
    await user.click(trigger)

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })
  })

  test('defaultValue로 초기에 열려있는 아이템을 지정할 수 있다', () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>질문</Accordion.Trigger>
          <Accordion.Content>답변</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    const trigger = screen.getByText('질문').closest('button')!
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  test('type=multiple에서는 여러 아이템이 동시에 열릴 수 있다', async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="multiple">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Q1</Accordion.Trigger>
          <Accordion.Content>A1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Q2</Accordion.Trigger>
          <Accordion.Content>A2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    const t1 = screen.getByText('Q1').closest('button')!
    const t2 = screen.getByText('Q2').closest('button')!

    await user.click(t1)
    await user.click(t2)

    await waitFor(() => {
      expect(t1).toHaveAttribute('aria-expanded', 'true')
      expect(t2).toHaveAttribute('aria-expanded', 'true')
    })
  })

  test('onValueChange가 호출된다', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <Accordion type="single" collapsible onValueChange={onValueChange}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Q1</Accordion.Trigger>
          <Accordion.Content>A1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )

    await user.click(screen.getByText('Q1').closest('button')!)

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('item-1')
    })
  })
})
