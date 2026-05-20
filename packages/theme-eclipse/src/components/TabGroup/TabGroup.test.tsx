import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { FixedTabs } from './TabGroup'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('FixedTabs', () => {
  test('Tab들의 Center 텍스트가 렌더링된다', () => {
    render(
      <FixedTabs>
        <FixedTabs.Tab value="a">
          <FixedTabs.TabCenter>Tab A</FixedTabs.TabCenter>
        </FixedTabs.Tab>
        <FixedTabs.Tab value="b">
          <FixedTabs.TabCenter>Tab B</FixedTabs.TabCenter>
        </FixedTabs.Tab>
      </FixedTabs>
    )

    expect(screen.getByText('Tab A')).toBeInTheDocument()
    expect(screen.getByText('Tab B')).toBeInTheDocument()
  })

  test('Tab Leading/Center/Trailing 슬롯이 모두 렌더링된다', () => {
    render(
      <FixedTabs>
        <FixedTabs.Tab value="x">
          <FixedTabs.TabLeading>L</FixedTabs.TabLeading>
          <FixedTabs.TabCenter>C</FixedTabs.TabCenter>
          <FixedTabs.TabTrailing>T</FixedTabs.TabTrailing>
        </FixedTabs.Tab>
      </FixedTabs>
    )

    expect(screen.getByText('L')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  test('각 Tab은 tab 역할로 렌더링된다', () => {
    render(
      <FixedTabs>
        <FixedTabs.Tab value="a">
          <FixedTabs.TabCenter>A</FixedTabs.TabCenter>
        </FixedTabs.Tab>
        <FixedTabs.Tab value="b">
          <FixedTabs.TabCenter>B</FixedTabs.TabCenter>
        </FixedTabs.Tab>
        <FixedTabs.Tab value="c">
          <FixedTabs.TabCenter>C</FixedTabs.TabCenter>
        </FixedTabs.Tab>
      </FixedTabs>
    )

    expect(screen.getAllByRole('tab').length).toBe(3)
  })

  test('selectedIndex prop을 전달할 수 있다', () => {
    render(
      <FixedTabs selectedIndex={1}>
        <FixedTabs.Tab value="a">
          <FixedTabs.TabCenter>A</FixedTabs.TabCenter>
        </FixedTabs.Tab>
        <FixedTabs.Tab value="b">
          <FixedTabs.TabCenter>B</FixedTabs.TabCenter>
        </FixedTabs.Tab>
      </FixedTabs>
    )

    expect(screen.getByText('B')).toBeInTheDocument()
  })

  test('ref를 전달할 수 있다', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <FixedTabs ref={ref}>
        <FixedTabs.Tab value="a">
          <FixedTabs.TabCenter>A</FixedTabs.TabCenter>
        </FixedTabs.Tab>
      </FixedTabs>
    )

    expect(ref.current).not.toBeNull()
  })
})
