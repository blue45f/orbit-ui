import { afterEach, describe, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Skeleton } from './Skeleton'

afterEach(() => cleanup())

describe('Skeleton', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<Skeleton data-testid="skeleton" />)

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  test('자식 요소를 렌더링한다.', () => {
    render(
      <Skeleton data-testid="skeleton">
        <span>로딩 중</span>
      </Skeleton>
    )

    expect(screen.getByText('로딩 중')).toBeInTheDocument()
  })

  test('전달된 className이 적용된다.', () => {
    render(<Skeleton data-testid="skeleton" className="custom-class" />)

    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class')
  })

  test('HTML attributes가 전달된다.', () => {
    render(<Skeleton data-testid="skeleton" role="status" aria-label="loading" />)

    const el = screen.getByTestId('skeleton')
    expect(el).toHaveAttribute('role', 'status')
    expect(el).toHaveAttribute('aria-label', 'loading')
  })

  test('style 속성이 적용된다.', () => {
    render(<Skeleton data-testid="skeleton" style={{ width: '100px', height: '20px' }} />)

    const el = screen.getByTestId('skeleton')
    expect(el).toHaveStyle({ width: '100px', height: '20px' })
  })
})
