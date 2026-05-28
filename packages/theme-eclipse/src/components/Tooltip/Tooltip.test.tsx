import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Tooltip } from './Tooltip'

beforeEach(() => {
  global.ResizeObserver = class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    constructor(_cb: ResizeObserverCallback) {}
  } as unknown as typeof ResizeObserver
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Tooltip', () => {
  test('Trigger 요소가 렌더링된다', () => {
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

  test('open=false면 Content가 렌더링되지 않는다', () => {
    render(
      <Tooltip.Provider>
        <Tooltip open={false}>
          <Tooltip.Trigger>Trigger</Tooltip.Trigger>
          <Tooltip.Content>Hidden</Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    )

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  test('open=true면 Content가 표시된다', () => {
    render(
      <Tooltip.Provider>
        <Tooltip open={true}>
          <Tooltip.Trigger>Trigger</Tooltip.Trigger>
          <Tooltip.Content>툴팁 내용</Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    )

    expect(screen.getAllByText('툴팁 내용').length).toBeGreaterThan(0)
  })

  test('open prop 변경으로 표시/숨김이 전환된다', () => {
    const { rerender } = render(
      <Tooltip.Provider>
        <Tooltip open={false}>
          <Tooltip.Trigger>Trigger</Tooltip.Trigger>
          <Tooltip.Content>Content</Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    )

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    rerender(
      <Tooltip.Provider>
        <Tooltip open={true}>
          <Tooltip.Trigger>Trigger</Tooltip.Trigger>
          <Tooltip.Content>Content</Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    )

    expect(screen.getAllByText('Content').length).toBeGreaterThan(0)
  })

  test('Provider 단독으로도 렌더링된다', () => {
    render(
      <Tooltip.Provider>
        <div data-testid="provider-child">자식</div>
      </Tooltip.Provider>
    )

    expect(screen.getByTestId('provider-child')).toBeInTheDocument()
  })

  test('Content에 ref를 전달할 수 있다', () => {
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
