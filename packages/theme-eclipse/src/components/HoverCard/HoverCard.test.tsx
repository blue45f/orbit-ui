import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { HoverCard } from './HoverCard'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('HoverCard', () => {
  test('Trigger 요소가 렌더링된다', () => {
    render(
      <HoverCard>
        <HoverCard.Trigger>Hover Me</HoverCard.Trigger>
        <HoverCard.Content>Hidden Body</HoverCard.Content>
      </HoverCard>
    )

    expect(screen.getByText('Hover Me')).toBeInTheDocument()
  })

  test('초기 상태에서는 Content가 표시되지 않는다', () => {
    render(
      <HoverCard>
        <HoverCard.Trigger>Hover Me</HoverCard.Trigger>
        <HoverCard.Content>Hidden Body</HoverCard.Content>
      </HoverCard>
    )

    expect(screen.queryByText('Hidden Body')).not.toBeInTheDocument()
  })

  test('open=true이면 Content가 표시된다', async () => {
    render(
      <HoverCard open={true}>
        <HoverCard.Trigger>Trigger</HoverCard.Trigger>
        <HoverCard.Content>Visible Card</HoverCard.Content>
      </HoverCard>
    )

    await waitFor(() => {
      expect(screen.getByText('Visible Card')).toBeInTheDocument()
    })
  })

  test('open prop으로 외부 제어가 가능하다', async () => {
    const { rerender } = render(
      <HoverCard open={false}>
        <HoverCard.Trigger>Trigger</HoverCard.Trigger>
        <HoverCard.Content>Body</HoverCard.Content>
      </HoverCard>
    )

    expect(screen.queryByText('Body')).not.toBeInTheDocument()

    rerender(
      <HoverCard open={true}>
        <HoverCard.Trigger>Trigger</HoverCard.Trigger>
        <HoverCard.Content>Body</HoverCard.Content>
      </HoverCard>
    )

    await waitFor(() => {
      expect(screen.getByText('Body')).toBeInTheDocument()
    })
  })

  test('Content에 ref를 전달할 수 있다', async () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <HoverCard open={true}>
        <HoverCard.Trigger>Trigger</HoverCard.Trigger>
        <HoverCard.Content ref={ref}>Content</HoverCard.Content>
      </HoverCard>
    )

    await waitFor(() => {
      expect(ref.current).not.toBeNull()
    })
  })

  test('onOpenChange는 함수로 전달할 수 있다 (스모크 테스트)', () => {
    const onOpenChange = vi.fn()
    render(
      <HoverCard onOpenChange={onOpenChange}>
        <HoverCard.Trigger>Trigger</HoverCard.Trigger>
        <HoverCard.Content>Body</HoverCard.Content>
      </HoverCard>
    )

    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })
})
