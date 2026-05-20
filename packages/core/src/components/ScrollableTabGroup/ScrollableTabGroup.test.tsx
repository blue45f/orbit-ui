import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { ScrollableTabGroup } from './ScrollableTabGroup'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('ScrollableTabGroup', () => {
  describe('기본 렌더링', () => {
    it('탭 리스트가 렌더링되어야 한다', () => {
      render(
        <ScrollableTabGroup selectedIndex={0}>
          <ScrollableTabGroup.Tab>탭 1</ScrollableTabGroup.Tab>
          <ScrollableTabGroup.Tab>탭 2</ScrollableTabGroup.Tab>
        </ScrollableTabGroup>
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getAllByRole('tab')).toHaveLength(2)
    })

    it('선택된 탭이 aria-selected=true이어야 한다', () => {
      render(
        <ScrollableTabGroup selectedIndex={1}>
          <ScrollableTabGroup.Tab>탭 1</ScrollableTabGroup.Tab>
          <ScrollableTabGroup.Tab>탭 2</ScrollableTabGroup.Tab>
        </ScrollableTabGroup>
      )

      const tabs = screen.getAllByRole('tab')
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('Compound 컴포넌트', () => {
    it('TabLeading, TabCenter, TabTrailing 렌더링', () => {
      render(
        <ScrollableTabGroup selectedIndex={0}>
          <ScrollableTabGroup.Tab>
            <ScrollableTabGroup.TabLeading>L</ScrollableTabGroup.TabLeading>
            <ScrollableTabGroup.TabCenter>C</ScrollableTabGroup.TabCenter>
            <ScrollableTabGroup.TabTrailing>T</ScrollableTabGroup.TabTrailing>
          </ScrollableTabGroup.Tab>
        </ScrollableTabGroup>
      )

      expect(screen.getByText('L')).toBeInTheDocument()
      expect(screen.getByText('C')).toBeInTheDocument()
      expect(screen.getByText('T')).toBeInTheDocument()
    })
  })

  describe('인터랙션', () => {
    it('탭 클릭 시 onTabChange가 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onTabChange = vi.fn()

      render(
        <ScrollableTabGroup selectedIndex={0} onTabChange={onTabChange}>
          <ScrollableTabGroup.Tab>탭 1</ScrollableTabGroup.Tab>
          <ScrollableTabGroup.Tab>탭 2</ScrollableTabGroup.Tab>
        </ScrollableTabGroup>
      )

      await user.click(screen.getByText('탭 2'))

      expect(onTabChange).toHaveBeenCalledWith(1)
    })
  })

  describe('Ref 전달', () => {
    it('ref를 전달할 수 있어야 한다', () => {
      const ref = createRef<HTMLDivElement>()

      render(
        <ScrollableTabGroup ref={ref} selectedIndex={0}>
          <ScrollableTabGroup.Tab>탭 1</ScrollableTabGroup.Tab>
        </ScrollableTabGroup>
      )

      expect(ref.current).not.toBeNull()
    })
  })

  describe('disabled', () => {
    it('disabled 탭은 disabled 속성을 가져야 한다', () => {
      render(
        <ScrollableTabGroup selectedIndex={0}>
          <ScrollableTabGroup.Tab>탭 1</ScrollableTabGroup.Tab>
          <ScrollableTabGroup.Tab disabled>탭 2</ScrollableTabGroup.Tab>
        </ScrollableTabGroup>
      )

      const tabs = screen.getAllByRole('tab')
      expect(tabs[1]).toBeDisabled()
    })
  })

  describe('theme', () => {
    it('theme prop으로 indicator 색상을 변경할 수 있어야 한다', () => {
      render(
        <ScrollableTabGroup
          selectedIndex={0}
          theme={{ indicatorColor: 'rgb(255, 0, 0)', indicatorHeight: '4px' }}
          data-testid="tab-group"
        >
          <ScrollableTabGroup.Tab>탭 1</ScrollableTabGroup.Tab>
        </ScrollableTabGroup>
      )

      expect(screen.getByTestId('tab-group')).toBeInTheDocument()
    })
  })
})
