import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { ScrollableTabGroup } from './ScrollableTabGroup'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('ScrollableTabGroup', () => {
  test('Tab들의 Center 텍스트가 렌더링된다', () => {
    render(
      <ScrollableTabGroup>
        <ScrollableTabGroup.Tab value="a">
          <ScrollableTabGroup.TabCenter>Tab A</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="b">
          <ScrollableTabGroup.TabCenter>Tab B</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="c">
          <ScrollableTabGroup.TabCenter>Tab C</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
      </ScrollableTabGroup>
    )

    expect(screen.getByText('Tab A')).toBeInTheDocument()
    expect(screen.getByText('Tab B')).toBeInTheDocument()
    expect(screen.getByText('Tab C')).toBeInTheDocument()
  })

  test('Tab Leading/Center/Trailing 슬롯이 모두 렌더링된다', () => {
    render(
      <ScrollableTabGroup>
        <ScrollableTabGroup.Tab value="x">
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

  test('selectedIndex prop을 전달할 수 있다', () => {
    render(
      <ScrollableTabGroup selectedIndex={2}>
        <ScrollableTabGroup.Tab value="a">
          <ScrollableTabGroup.TabCenter>A</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="b">
          <ScrollableTabGroup.TabCenter>B</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="c">
          <ScrollableTabGroup.TabCenter>C</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
      </ScrollableTabGroup>
    )

    expect(screen.getByText('C')).toBeInTheDocument()
  })

  test('ref를 전달할 수 있다', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <ScrollableTabGroup ref={ref}>
        <ScrollableTabGroup.Tab value="a">
          <ScrollableTabGroup.TabCenter>A</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
      </ScrollableTabGroup>
    )

    expect(ref.current).not.toBeNull()
  })

  test('각 Tab은 tab 역할로 렌더링된다', () => {
    render(
      <ScrollableTabGroup>
        <ScrollableTabGroup.Tab value="a">
          <ScrollableTabGroup.TabCenter>A</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="b">
          <ScrollableTabGroup.TabCenter>B</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
      </ScrollableTabGroup>
    )

    expect(screen.getAllByRole('tab').length).toBe(2)
  })
})
