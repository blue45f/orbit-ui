import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../test-utils'

import { HoverCard } from './HoverCard'

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

describe('HoverCard', () => {
  describe('기본 렌더링', () => {
    it('Trigger가 렌더링되어야 한다', () => {
      render(
        <HoverCard>
          <HoverCard.Trigger>호버</HoverCard.Trigger>
          <HoverCard.Content>카드 내용</HoverCard.Content>
        </HoverCard>
      )

      expect(screen.getByText('호버')).toBeInTheDocument()
    })

    it('defaultOpen이 true일 때 Content가 표시되어야 한다', async () => {
      render(
        <HoverCard defaultOpen>
          <HoverCard.Trigger>호버</HoverCard.Trigger>
          <HoverCard.Content>카드 내용</HoverCard.Content>
        </HoverCard>
      )

      await waitFor(() => {
        expect(screen.getByText('카드 내용')).toBeInTheDocument()
      })
    })

    it('open=false일 때는 Content가 렌더링되지 않아야 한다', () => {
      render(
        <HoverCard open={false}>
          <HoverCard.Trigger>호버</HoverCard.Trigger>
          <HoverCard.Content>카드 내용</HoverCard.Content>
        </HoverCard>
      )

      expect(screen.queryByText('카드 내용')).not.toBeInTheDocument()
    })
  })

  describe('제어 모드', () => {
    it('open prop으로 제어할 수 있어야 한다', () => {
      const { rerender } = render(
        <HoverCard open={false}>
          <HoverCard.Trigger>호버</HoverCard.Trigger>
          <HoverCard.Content>카드 내용</HoverCard.Content>
        </HoverCard>
      )

      expect(screen.queryByText('카드 내용')).not.toBeInTheDocument()

      rerender(
        <HoverCard open={true}>
          <HoverCard.Trigger>호버</HoverCard.Trigger>
          <HoverCard.Content>카드 내용</HoverCard.Content>
        </HoverCard>
      )

      expect(screen.getByText('카드 내용')).toBeInTheDocument()
    })

    it('onOpenChange를 prop으로 받을 수 있어야 한다', () => {
      const onOpenChange = vi.fn()

      render(
        <HoverCard onOpenChange={onOpenChange}>
          <HoverCard.Trigger>호버</HoverCard.Trigger>
          <HoverCard.Content>카드 내용</HoverCard.Content>
        </HoverCard>
      )

      expect(screen.getByText('호버')).toBeInTheDocument()
    })
  })

  describe('Ref 전달', () => {
    it('Content에 ref를 전달할 수 있어야 한다', async () => {
      const ref = createRef<HTMLDivElement>()

      render(
        <HoverCard defaultOpen>
          <HoverCard.Trigger>호버</HoverCard.Trigger>
          <HoverCard.Content ref={ref}>카드</HoverCard.Content>
        </HoverCard>
      )

      await waitFor(() => {
        expect(ref.current).not.toBeNull()
      })
    })
  })

  describe('스타일/클래스', () => {
    it('custom className이 적용되어야 한다', async () => {
      render(
        <HoverCard defaultOpen>
          <HoverCard.Trigger>호버</HoverCard.Trigger>
          <HoverCard.Content className="custom-hover">카드</HoverCard.Content>
        </HoverCard>
      )

      await waitFor(() => {
        const content = screen.getByText('카드')
        expect(content.className).toContain('custom-hover')
      })
    })
  })
})
