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
})
