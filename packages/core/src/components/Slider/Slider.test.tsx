import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, createMockResizeObserver, render, screen } from '../../test-utils'

import { Slider } from './Slider'

beforeEach(() => {
  // Radix Slider uses ResizeObserver internally
  global.ResizeObserver = createMockResizeObserver()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Slider', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />)

    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  test('ref가 root 요소에 전달된다.', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Slider ref={ref} defaultValue={[50]} max={100} step={1} data-testid="slider" />)

    expect(ref.current).toBe(screen.getByTestId('slider'))
  })

  test('value prop이 aria-valuenow에 반영된다.', () => {
    render(<Slider value={[30]} max={100} step={1} />)

    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30')
  })

  test('aria-valuemin, aria-valuemax가 설정된다.', () => {
    render(<Slider defaultValue={[50]} min={0} max={100} step={1} />)

    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '100')
  })

  test('disabled일 경우 data-disabled 속성이 설정된다.', () => {
    render(<Slider disabled defaultValue={[50]} max={100} step={1} data-testid="slider" />)

    // Radix Slider는 disabled 시 root에 data-disabled를 부여한다.
    expect(screen.getByTestId('slider')).toHaveAttribute('data-disabled')
  })

  test('키보드로 값을 변경할 수 있다.', async () => {
    const handler = vi.fn()
    render(<Slider defaultValue={[50]} max={100} step={1} onValueChange={handler} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith([51])
  })

  test('disabled일 경우 키보드로 값이 변경되지 않는다.', async () => {
    const handler = vi.fn()
    render(<Slider disabled defaultValue={[50]} max={100} step={1} onValueChange={handler} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(handler).not.toHaveBeenCalled()
  })

  test('전달된 className이 적용된다.', () => {
    render(
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className="custom-slider"
        data-testid="slider"
      />
    )

    expect(screen.getByTestId('slider')).toHaveClass('custom-slider')
  })

  test('multiple thumbs를 지원한다.', () => {
    render(<Slider defaultValue={[20, 80]} max={100} step={1} />)

    expect(screen.getAllByRole('slider')).toHaveLength(2)
  })
})
