import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { Skeleton } from './Skeleton'

afterEach(() => cleanup())

describe('Skeleton', () => {
  test('div가 렌더된다', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  test('width/height prop이 style에 적용된다', () => {
    render(<Skeleton data-testid="skeleton" width="200px" height="40px" />)
    const el = screen.getByTestId('skeleton')
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('40px')
  })

  test('숫자형 width도 적용된다', () => {
    render(<Skeleton data-testid="skeleton" width={100} height={20} />)
    const el = screen.getByTestId('skeleton')
    expect(el.style.width).toBe('100px')
    expect(el.style.height).toBe('20px')
  })

  test('className이 병합된다', () => {
    render(<Skeleton data-testid="skeleton" className="custom" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('custom')
  })

  test('기본 aria-hidden="true"가 적용된다', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true')
  })

  test('aria-hidden을 명시적으로 false로 덮어쓸 수 있다', () => {
    render(<Skeleton data-testid="skeleton" aria-hidden={false} />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'false')
  })

  test('role을 지정하면 그대로 전달된다 (예: status)', () => {
    render(<Skeleton role="status" aria-label="로딩 중" data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el).toHaveAttribute('role', 'status')
    expect(el).toHaveAttribute('aria-label', '로딩 중')
  })
})
