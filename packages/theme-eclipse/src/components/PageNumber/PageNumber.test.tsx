import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { PageNumber } from './PageNumber'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('PageNumber', () => {
  test('current/total을 "1 / 3" 형태로 표시한다', () => {
    render(<PageNumber current={1} total={3} data-testid="counter" />)

    expect(screen.getByTestId('counter')).toBeInTheDocument()
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  test('다양한 페이지 값을 표시할 수 있다', () => {
    render(<PageNumber current={5} total={10} />)

    expect(screen.getByText('5 / 10')).toBeInTheDocument()
  })

  test('Trailing 슬롯이 렌더링된다', () => {
    render(
      <PageNumber current={2} total={5}>
        <PageNumber.Trailing>
          <span data-testid="trailing-icon">X</span>
        </PageNumber.Trailing>
      </PageNumber>
    )

    expect(screen.getByText('2 / 5')).toBeInTheDocument()
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument()
  })

  test('Trailing 없이도 정상 렌더링된다', () => {
    render(<PageNumber current={1} total={1} data-testid="no-trailing" />)

    expect(screen.getByTestId('no-trailing')).toBeInTheDocument()
  })

  test('ref를 전달할 수 있다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<PageNumber ref={ref} current={1} total={3} />)

    expect(ref.current).not.toBeNull()
  })
})
