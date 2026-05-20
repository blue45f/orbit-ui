import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl (eclipse)', () => {
  afterEach(() => cleanup())

  test('tablist role로 렌더링되고 tabs가 자식으로 포함된다', () => {
    render(
      <SegmentedControl>
        <SegmentedControl.Tab value="a">
          <SegmentedControl.TabCenter>탭 A</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="b">
          <SegmentedControl.TabCenter>탭 B</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )

    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(2)
  })

  test('tab center의 콘텐츠를 렌더링한다', () => {
    render(
      <SegmentedControl>
        <SegmentedControl.Tab value="a">
          <SegmentedControl.TabCenter>Indigo</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="b">
          <SegmentedControl.TabCenter>Foundation</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )

    expect(screen.getByText('Indigo')).toBeInTheDocument()
    expect(screen.getByText('Foundation')).toBeInTheDocument()
  })

  test('selectedIndex prop으로 선택된 탭의 aria-selected가 true가 된다', () => {
    render(
      <SegmentedControl selectedIndex={1}>
        <SegmentedControl.Tab value="a">
          <SegmentedControl.TabCenter>A</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="b">
          <SegmentedControl.TabCenter>B</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )

    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
  })

  test('탭 클릭 시 onTabChange가 해당 인덱스와 함께 호출된다', async () => {
    const onTabChange = vi.fn()
    render(
      <SegmentedControl selectedIndex={0} onTabChange={onTabChange}>
        <SegmentedControl.Tab value="a">
          <SegmentedControl.TabCenter>A</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="b">
          <SegmentedControl.TabCenter>B</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="c">
          <SegmentedControl.TabCenter>C</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )

    await userEvent.click(screen.getAllByRole('tab')[2])

    expect(onTabChange).toHaveBeenCalledWith(2)
  })

  test('disabled 탭은 클릭해도 onTabChange가 호출되지 않는다', async () => {
    const onTabChange = vi.fn()
    render(
      <SegmentedControl selectedIndex={0} onTabChange={onTabChange}>
        <SegmentedControl.Tab value="a">
          <SegmentedControl.TabCenter>A</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="b" disabled>
          <SegmentedControl.TabCenter>B</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )

    await userEvent.click(screen.getAllByRole('tab')[1])

    expect(onTabChange).not.toHaveBeenCalled()
  })

  test('ArrowRight 키로 다음 탭으로 이동한다', async () => {
    const onTabChange = vi.fn()
    render(
      <SegmentedControl selectedIndex={0} onTabChange={onTabChange}>
        <SegmentedControl.Tab value="a">
          <SegmentedControl.TabCenter>A</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="b">
          <SegmentedControl.TabCenter>B</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )

    // 선택된 첫 번째 탭에서 ArrowRight를 눌러야 키보드 핸들러가 동작한다.
    const firstTab = screen.getAllByRole('tab')[0]
    firstTab.focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(onTabChange).toHaveBeenCalledWith(1)
  })

  test('ref가 tablist 요소에 부착된다', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <SegmentedControl ref={ref}>
        <SegmentedControl.Tab value="a">
          <SegmentedControl.TabCenter>A</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )

    expect(ref.current).not.toBeNull()
  })

  test('Leading과 Trailing 콘텐츠도 함께 렌더링된다', () => {
    render(
      <SegmentedControl>
        <SegmentedControl.Tab value="a">
          <SegmentedControl.TabLeading>L</SegmentedControl.TabLeading>
          <SegmentedControl.TabCenter>탭</SegmentedControl.TabCenter>
          <SegmentedControl.TabTrailing>T</SegmentedControl.TabTrailing>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )

    expect(screen.getByText('L')).toBeInTheDocument()
    expect(screen.getByText('탭')).toBeInTheDocument()
    expect(screen.getByText('T')).toBeInTheDocument()
  })
})
