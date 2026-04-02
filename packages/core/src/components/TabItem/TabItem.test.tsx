import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { TabItem } from './TabItem'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('TabItem', () => {
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링되어야 한다', () => {
      render(<TabItem>탭 1</TabItem>)

      expect(screen.getByRole('tab')).toBeInTheDocument()
      expect(screen.getByText('탭 1')).toBeInTheDocument()
    })

    it('role="tab" 속성이 설정되어야 한다', () => {
      render(<TabItem>탭</TabItem>)

      expect(screen.getByRole('tab')).toBeInTheDocument()
    })
  })

  describe('selected 상태', () => {
    it('selected가 true일 때 aria-selected="true"가 설정되어야 한다', () => {
      render(<TabItem selected>선택된 탭</TabItem>)

      expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true')
    })

    it('selected가 false일 때 aria-selected="false"가 설정되어야 한다', () => {
      render(<TabItem selected={false}>선택되지 않은 탭</TabItem>)

      expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'false')
    })

    it('기본값은 selected=false이어야 한다', () => {
      render(<TabItem>기본 탭</TabItem>)

      expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'false')
    })

    it('selected 상태에 따라 data-selected 속성이 설정되어야 한다', () => {
      const { rerender } = render(<TabItem selected={false}>탭</TabItem>)

      expect(screen.getByRole('tab').closest('[data-selected]')).toHaveAttribute(
        'data-selected',
        'false',
      )

      rerender(<TabItem selected={true}>탭</TabItem>)

      expect(screen.getByRole('tab').closest('[data-selected]')).toHaveAttribute(
        'data-selected',
        'true',
      )
    })
  })

  describe('disabled 상태', () => {
    it('disabled가 true일 때 aria-disabled="true"가 설정되어야 한다', () => {
      render(<TabItem disabled>비활성 탭</TabItem>)

      expect(screen.getByRole('tab')).toHaveAttribute('aria-disabled', 'true')
    })

    it('disabled가 true일 때 button이 disabled 상태여야 한다', () => {
      render(<TabItem disabled>비활성 탭</TabItem>)

      expect(screen.getByRole('tab')).toBeDisabled()
    })

    it('disabled 상태에서 클릭 이벤트가 발생하지 않아야 한다', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()

      render(
        <TabItem disabled onClick={onClick}>
          비활성 탭
        </TabItem>,
      )

      await user.click(screen.getByRole('tab'))

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('클릭 이벤트', () => {
    it('클릭하면 onClick 핸들러가 호출되어야 한다', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()

      render(<TabItem onClick={onClick}>탭</TabItem>)

      await user.click(screen.getByRole('tab'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('compound 컴포넌트', () => {
    it('Leading, Center, Trailing 슬롯이 모두 렌더링되어야 한다', () => {
      render(
        <TabItem>
          <TabItem.Leading>아이콘</TabItem.Leading>
          <TabItem.Center>탭 이름</TabItem.Center>
          <TabItem.Trailing>뱃지</TabItem.Trailing>
        </TabItem>,
      )

      expect(screen.getByText('아이콘')).toBeInTheDocument()
      expect(screen.getByText('탭 이름')).toBeInTheDocument()
      expect(screen.getByText('뱃지')).toBeInTheDocument()
    })
  })

  describe('테마 커스터마이징', () => {
    it('theme prop으로 스타일이 인라인으로 적용되어야 한다', () => {
      render(
        <TabItem
          selected
          theme={{
            enabledSelectedFillColor: 'blue',
            enabledSelectedForegroundColor: 'white',
            paddingHorizontal: '24px',
            paddingVertical: '12px',
          }}
        >
          테마 탭
        </TabItem>,
      )

      const tabContainer = screen.getByRole('tab').closest('[data-selected]')!
      const style = tabContainer.getAttribute('style') || ''
      expect(style).toContain('background-color: blue')
      expect(style).toContain('color: white')
      // padding은 shorthand로 합쳐질 수 있으므로 값이 포함되는지만 확인
      expect(style).toContain('24px')
      expect(style).toContain('12px')
    })
  })

  describe('높이 설정', () => {
    it('height prop으로 높이를 설정할 수 있어야 한다', () => {
      render(
        <TabItem height={48}>
          높이 탭
        </TabItem>,
      )

      const tabContainer = screen.getByRole('tab').closest('[data-selected]')!
      expect(tabContainer).toHaveStyle({ height: '48px' })
    })
  })

  describe('접근성', () => {
    it('type="button" 속성이 설정되어야 한다', () => {
      render(<TabItem>탭</TabItem>)

      expect(screen.getByRole('tab')).toHaveAttribute('type', 'button')
    })
  })
})
