import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { IndicatorBadge } from './IndicatorBadge'

afterEach(() => cleanup())

describe('IndicatorBadge', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<IndicatorBadge data-testid="indicator" />)

    expect(screen.getByTestId('indicator')).toBeInTheDocument()
  })

  test('ref가 root 요소에 전달된다.', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<IndicatorBadge ref={ref} data-testid="indicator" />)

    expect(ref.current).toBe(screen.getByTestId('indicator'))
  })

  test('width와 height가 style에 반영된다.', () => {
    render(<IndicatorBadge data-testid="indicator" width={16} height={16} />)

    const el = screen.getByTestId('indicator')
    expect(el).toHaveStyle({ width: '16px', height: '16px' })
  })

  test('문자열 단위 width/height도 적용된다.', () => {
    render(<IndicatorBadge data-testid="indicator" width="2rem" height="2rem" />)

    const el = screen.getByTestId('indicator')
    expect(el).toHaveStyle({ width: '2rem', height: '2rem' })
  })

  test('borderWidth가 있으면 borderStyle이 solid로 설정된다.', () => {
    render(<IndicatorBadge data-testid="indicator" borderWidth={2} />)

    const el = screen.getByTestId('indicator')
    expect(el).toHaveStyle({ 'border-style': 'solid' })
  })

  test('borderWidth가 0이면 borderStyle이 none이다.', () => {
    render(<IndicatorBadge data-testid="indicator" borderWidth={0} />)

    const el = screen.getByTestId('indicator')
    expect(el).toHaveStyle({ 'border-style': 'none' })
  })

  test('theme prop으로 색상을 커스터마이징할 수 있다.', () => {
    render(
      <IndicatorBadge
        data-testid="indicator"
        theme={{
          fillColor: 'rgb(255, 0, 0)',
          foregroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(0, 0, 0)',
        }}
        borderWidth={1}
      />
    )

    const el = screen.getByTestId('indicator')
    expect(el).toHaveStyle({
      'background-color': 'rgb(255, 0, 0)',
      color: 'rgb(255, 255, 255)',
      'border-color': 'rgb(0, 0, 0)',
    })
  })

  test('children을 렌더링한다.', () => {
    render(
      <IndicatorBadge>
        <span>5</span>
      </IndicatorBadge>
    )

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  test('as prop으로 element 타입을 변경할 수 있다.', () => {
    render(<IndicatorBadge data-testid="indicator" as="div" />)

    const el = screen.getByTestId('indicator')
    expect(el.tagName).toBe('DIV')
  })
})
