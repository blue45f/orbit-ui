import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Progress } from './Progress'

afterEach(() => cleanup())

describe('Progress', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<Progress value={50} data-testid="progress" />)

    expect(screen.getByTestId('progress')).toBeInTheDocument()
  })

  test('progressbar role을 가진다.', () => {
    render(<Progress value={50} />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('ref가 root 요소에 전달된다.', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Progress ref={ref} value={50} data-testid="progress" />)

    expect(ref.current).toBe(screen.getByTestId('progress'))
  })

  test('value prop이 aria-valuenow에 반영된다.', () => {
    render(<Progress value={75} />)

    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '75')
  })

  test('value가 0일 때 정상 렌더링된다.', () => {
    render(<Progress value={0} data-testid="progress" />)

    expect(screen.getByTestId('progress')).toBeInTheDocument()
  })

  test('value가 100일 때 정상 렌더링된다.', () => {
    render(<Progress value={100} data-testid="progress" />)

    expect(screen.getByTestId('progress')).toBeInTheDocument()
  })

  test('전달된 className이 적용된다.', () => {
    render(<Progress value={50} data-testid="progress" className="custom-progress" />)

    expect(screen.getByTestId('progress')).toHaveClass('custom-progress')
  })
})
