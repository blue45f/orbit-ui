import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup, createMockResizeObserver, render, screen } from '../../test-utils'

import { Tooltip } from './Tooltip'

beforeEach(() => {
  global.ResizeObserver = createMockResizeObserver()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Tooltip', () => {
  describe('기본 렌더링', () => {
    it('Trigger 요소가 렌더링되어야 한다', () => {
      render(
        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger>호버 영역</Tooltip.Trigger>
            <Tooltip.Content>툴팁 내용</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      )

      expect(screen.getByText('호버 영역')).toBeInTheDocument()
    })

    it('open이 false일 때 툴팁 내용이 렌더링되지 않아야 한다', () => {
      render(
        <Tooltip.Provider>
          <Tooltip open={false}>
            <Tooltip.Trigger>호버 영역</Tooltip.Trigger>
            <Tooltip.Content>툴팁 내용</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      )

      expect(screen.queryByText('툴팁 내용')).not.toBeInTheDocument()
    })
  })

  describe('Compound 컴포넌트', () => {
    it('Provider가 렌더링되어야 한다', () => {
      render(
        <Tooltip.Provider>
          <div data-testid="provider-child">child</div>
        </Tooltip.Provider>
      )

      expect(screen.getByTestId('provider-child')).toBeInTheDocument()
    })

    it('open=true이면 Content가 표시되어야 한다', () => {
      render(
        <Tooltip.Provider>
          <Tooltip open={true}>
            <Tooltip.Trigger>호버 영역</Tooltip.Trigger>
            <Tooltip.Content>툴팁 내용</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      )

      // Radix renders multiple copies for accessibility; use getAllByText
      const tips = screen.getAllByText('툴팁 내용')
      expect(tips.length).toBeGreaterThan(0)
    })
  })

  describe('제어 모드', () => {
    it('open prop 변경에 따라 툴팁이 표시/숨김 처리되어야 한다', () => {
      const { rerender } = render(
        <Tooltip.Provider>
          <Tooltip open={false}>
            <Tooltip.Trigger>Trigger</Tooltip.Trigger>
            <Tooltip.Content>Hidden</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      )

      expect(screen.queryByText('Hidden')).not.toBeInTheDocument()

      rerender(
        <Tooltip.Provider>
          <Tooltip open={true}>
            <Tooltip.Trigger>Trigger</Tooltip.Trigger>
            <Tooltip.Content>Hidden</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      )

      expect(screen.getAllByText('Hidden').length).toBeGreaterThan(0)
    })

    it('onOpenChange는 함수로 받을 수 있어야 한다 (스모크 테스트)', () => {
      const onOpenChange = vi.fn()
      render(
        <Tooltip.Provider>
          <Tooltip defaultOpen={false} onOpenChange={onOpenChange}>
            <Tooltip.Trigger>Trigger</Tooltip.Trigger>
            <Tooltip.Content>Content</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      )

      expect(screen.getByText('Trigger')).toBeInTheDocument()
    })
  })

  describe('Ref 전달', () => {
    it('Content에 ref를 전달할 수 있어야 한다', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <Tooltip.Provider>
          <Tooltip open={true}>
            <Tooltip.Trigger>Trigger</Tooltip.Trigger>
            <Tooltip.Content ref={ref}>Content</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      )

      expect(ref.current).not.toBeNull()
    })
  })

  describe('스타일/클래스', () => {
    it('custom className이 전달되어야 한다', () => {
      render(
        <Tooltip.Provider>
          <Tooltip open={true}>
            <Tooltip.Trigger>Trigger</Tooltip.Trigger>
            <Tooltip.Content className="custom-tooltip">Content</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      )

      const contents = screen.getAllByText('Content')
      const customContent = contents.find((c) => c.className.includes('custom-tooltip'))
      expect(customContent).toBeDefined()
    })
  })
})
