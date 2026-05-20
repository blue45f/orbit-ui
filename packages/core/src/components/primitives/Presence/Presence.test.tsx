import { forwardRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../../test-utils'

import { Presence } from './Presence'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Presence', () => {
  describe('기본 렌더링', () => {
    it('present=true이면 children이 렌더링되어야 한다', () => {
      render(
        <Presence present={true}>
          <div data-testid="child">Visible</div>
        </Presence>
      )

      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(screen.getByTestId('child')).toHaveAttribute('data-present', 'true')
    })

    it('present=false이고 자식 요소에 애니메이션이 없으면 트리에서 제거되어야 한다', () => {
      render(
        <Presence present={false}>
          <div data-testid="child">Hidden</div>
        </Presence>
      )

      // Without an animation, Radix Presence removes child immediately
      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
    })
  })

  describe('data-present 속성', () => {
    it('present=true일 때 data-present="true"가 설정되어야 한다', () => {
      render(
        <Presence present={true}>
          <div data-testid="presentable">Content</div>
        </Presence>
      )

      const el = screen.getByTestId('presentable')
      expect(el).toHaveAttribute('data-present', 'true')
    })

    it('aria-hidden은 present=true일 때 설정되지 않아야 한다', () => {
      render(
        <Presence present={true}>
          <div data-testid="aria-true">Content</div>
        </Presence>
      )

      const el = screen.getByTestId('aria-true')
      expect(el).not.toHaveAttribute('aria-hidden')
    })
  })

  describe('onChange 콜백', () => {
    it('present가 변경될 때 onChange가 호출되어야 한다', async () => {
      const onChange = vi.fn()

      const { rerender } = render(
        <Presence present={true} onChange={onChange}>
          <div data-testid="toggle">Content</div>
        </Presence>
      )

      // After mount, onChange should not be called for initial value (useIsMounted gate)
      // Trigger change to false (no animation so it unmounts)
      rerender(
        <Presence present={false} onChange={onChange}>
          <div data-testid="toggle">Content</div>
        </Presence>
      )

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(false)
      })
    })

    it('onChange가 없어도 정상 동작해야 한다', () => {
      const { rerender } = render(
        <Presence present={true}>
          <div data-testid="no-change">Content</div>
        </Presence>
      )

      expect(screen.getByTestId('no-change')).toBeInTheDocument()

      rerender(
        <Presence present={false}>
          <div data-testid="no-change">Content</div>
        </Presence>
      )

      expect(screen.queryByTestId('no-change')).not.toBeInTheDocument()
    })
  })

  describe('자식 요소', () => {
    it('forwardRef 컴포넌트도 자식 요소로 받을 수 있어야 한다', () => {
      const Forwarded = forwardRef<HTMLDivElement, { 'data-testid'?: string }>((props, ref) => (
        <div ref={ref} {...props}>
          Forwarded Child
        </div>
      ))
      Forwarded.displayName = 'Forwarded'

      render(
        <Presence present={true}>
          <Forwarded data-testid="forwarded" />
        </Presence>
      )

      expect(screen.getByTestId('forwarded')).toBeInTheDocument()
    })

    it('children이 여러 개일 때는 에러가 발생해야 한다', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      // Presence는 React.Children.only를 사용하므로 자식이 2개 이상이면 에러를 던집니다.
      // (TypeScript는 단일 자식만 허용하므로 런타임 검증을 위해 캐스팅한다)
      const MultiChildren = Presence as unknown as React.FC<{
        present: boolean
        children: React.ReactNode
      }>
      expect(() => {
        render(
          <MultiChildren present={true}>
            <div>A</div>
            <div>B</div>
          </MultiChildren>
        )
      }).toThrow()

      consoleError.mockRestore()
    })
  })

  describe('present 전환', () => {
    it('true에서 false로 전환 시 자식의 data-present가 변경되어야 한다', () => {
      const { rerender } = render(
        <Presence present={true}>
          <div data-testid="transition">Content</div>
        </Presence>
      )

      expect(screen.getByTestId('transition')).toHaveAttribute('data-present', 'true')

      rerender(
        <Presence present={false}>
          <div data-testid="transition">Content</div>
        </Presence>
      )

      // No animation -> immediately removed
      expect(screen.queryByTestId('transition')).not.toBeInTheDocument()
    })
  })
})
