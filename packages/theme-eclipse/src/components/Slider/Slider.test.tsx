import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Slider } from './Slider'

// Radix Slider는 layout/pointer 측정을 위해 getBoundingClientRect와 ResizeObserver를 사용합니다.
beforeAll(() => {
  // ResizeObserver는 test-utils에서 모킹되어 있음
  // 추가로 일부 환경에서 필요한 폴리필
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = vi.fn(() => false) as unknown as Element['hasPointerCapture']
  }
})

describe('Slider (eclipse)', () => {
  afterEach(() => cleanup())

  test('slider role로 렌더링된다', () => {
    render(<Slider defaultValue={[50]} max={100} />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  test('defaultValue로 초기 aria-valuenow가 설정된다', () => {
    render(<Slider defaultValue={[30]} max={100} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30')
  })

  test('value prop으로 controlled aria-valuenow가 설정된다', () => {
    render(<Slider value={[70]} onValueChange={() => null} max={100} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '70')
  })

  test('범위 슬라이더는 thumb이 2개 렌더링된다', () => {
    render(<Slider defaultValue={[20, 80]} max={100} />)
    expect(screen.getAllByRole('slider')).toHaveLength(2)
  })

  test('disabled prop이 적용된다', () => {
    render(<Slider defaultValue={[50]} max={100} disabled />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('data-disabled')
  })

  test('aria-label을 통해 슬라이더 컨테이너에 라벨을 부여할 수 있다', () => {
    const { container } = render(
      <Slider defaultValue={[50]} max={100} aria-label="볼륨" data-testid="slider" />
    )
    // Radix Slider Root는 role="slider"가 아닌 일반 span. aria-label은 root에 전달된다.
    expect(container.querySelector('[aria-label="볼륨"]')).toBeTruthy()
  })

  test('ref가 슬라이더 root에 부착된다', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Slider ref={ref} defaultValue={[50]} max={100} />)
    expect(ref.current).not.toBeNull()
  })

  test('키보드(오른쪽 화살표)로 onValueChange가 호출된다', async () => {
    const onValueChange = vi.fn()
    render(<Slider defaultValue={[50]} max={100} step={1} onValueChange={onValueChange} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(onValueChange).toHaveBeenCalled()
  })
})
