import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { PageNumber } from './PageNumber'

afterEach(() => cleanup())

describe('PageNumber', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<PageNumber current={1} total={10} data-testid="page-number" />)

    expect(screen.getByTestId('page-number')).toBeInTheDocument()
  })

  test('current와 total을 텍스트로 표시한다.', () => {
    render(<PageNumber current={3} total={10} />)

    expect(screen.getByText('3 / 10')).toBeInTheDocument()
  })

  test('ref가 root 요소에 전달된다.', () => {
    const ref = createRef<HTMLDivElement>()
    render(<PageNumber ref={ref} current={1} total={5} data-testid="page-number" />)

    expect(ref.current).toBe(screen.getByTestId('page-number'))
  })

  test('trailing prop을 렌더링한다.', () => {
    render(<PageNumber current={2} total={5} trailing={<span data-testid="trailing">→</span>} />)

    expect(screen.getByTestId('trailing')).toBeInTheDocument()
  })

  test('theme prop으로 색상을 커스터마이징할 수 있다.', () => {
    render(
      <PageNumber
        data-testid="page-number"
        current={1}
        total={5}
        theme={{
          fillColor: 'rgb(50, 50, 50)',
          foregroundColor: 'rgb(200, 200, 200)',
        }}
      />
    )

    const el = screen.getByTestId('page-number')
    expect(el).toHaveStyle({
      'background-color': 'rgb(50, 50, 50)',
      color: 'rgb(200, 200, 200)',
    })
  })

  test('전달된 className이 적용된다.', () => {
    render(<PageNumber data-testid="page-number" current={1} total={5} className="custom-page" />)

    expect(screen.getByTestId('page-number')).toHaveClass('custom-page')
  })

  test('PageNumber.Trailing 서브 컴포넌트가 렌더링된다.', () => {
    render(
      <PageNumber.Trailing>
        <span data-testid="custom-trailing">↗</span>
      </PageNumber.Trailing>
    )

    expect(screen.getByTestId('custom-trailing')).toBeInTheDocument()
  })
})
