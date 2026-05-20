import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { CounterBadge } from './CounterBadge'

afterEach(() => cleanup())

describe('CounterBadge', () => {
  test('숫자를 표시한다', () => {
    render(<CounterBadge>{5}</CounterBadge>)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  test('99 이하 숫자를 그대로 표시한다', () => {
    render(<CounterBadge>{42}</CounterBadge>)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  test('99보다 큰 숫자는 99+로 표시된다', () => {
    render(<CounterBadge>{150}</CounterBadge>)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  test('경계값(99)에서는 99+가 아닌 99로 표시된다', () => {
    render(<CounterBadge>{99}</CounterBadge>)
    expect(screen.getByText('99')).toBeInTheDocument()
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<CounterBadge ref={ref}>{1}</CounterBadge>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
