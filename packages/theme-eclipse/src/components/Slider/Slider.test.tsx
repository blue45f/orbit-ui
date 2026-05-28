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

  test('Home 키로 최소값(min)으로 점프한다', async () => {
    const onValueChange = vi.fn()
    render(<Slider defaultValue={[50]} min={0} max={100} step={1} onValueChange={onValueChange} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{Home}')

    expect(onValueChange).toHaveBeenCalledWith([0])
  })

  test('End 키로 최대값(max)으로 점프한다', async () => {
    const onValueChange = vi.fn()
    render(<Slider defaultValue={[50]} min={0} max={100} step={1} onValueChange={onValueChange} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{End}')

    expect(onValueChange).toHaveBeenCalledWith([100])
  })

  test('PageUp 키로 큰 폭 step 증가가 발생한다', async () => {
    const onValueChange = vi.fn()
    render(<Slider defaultValue={[50]} min={0} max={100} step={1} onValueChange={onValueChange} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{PageUp}')

    expect(onValueChange).toHaveBeenCalled()
    const calledWith = onValueChange.mock.calls.at(-1)?.[0] as number[]
    expect(calledWith[0]).toBeGreaterThan(50)
  })

  test('PageDown 키로 큰 폭 step 감소가 발생한다', async () => {
    const onValueChange = vi.fn()
    render(<Slider defaultValue={[50]} min={0} max={100} step={1} onValueChange={onValueChange} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{PageDown}')

    expect(onValueChange).toHaveBeenCalled()
    const calledWith = onValueChange.mock.calls.at(-1)?.[0] as number[]
    expect(calledWith[0]).toBeLessThan(50)
  })

  test('왼쪽 화살표로 step 만큼 감소한다', async () => {
    const onValueChange = vi.fn()
    render(<Slider defaultValue={[50]} min={0} max={100} step={1} onValueChange={onValueChange} />)

    const slider = screen.getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{ArrowLeft}')

    expect(onValueChange).toHaveBeenCalledWith([49])
  })

  test('range 슬라이더에서 두 thumb 모두 키보드 조작이 가능하다', async () => {
    const onValueChange = vi.fn()
    render(<Slider defaultValue={[20, 80]} min={0} max={100} step={1} onValueChange={onValueChange} />)

    const thumbs = screen.getAllByRole('slider')
    expect(thumbs).toHaveLength(2)

    thumbs[1].focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(onValueChange).toHaveBeenCalled()
    const calledWith = onValueChange.mock.calls.at(-1)?.[0] as number[]
    expect(calledWith[1]).toBeGreaterThan(80)
  })

  test('disabled 슬라이더는 키보드 입력을 무시한다', async () => {
    const onValueChange = vi.fn()
    render(
      <Slider
        defaultValue={[50]}
        min={0}
        max={100}
        step={1}
        disabled
        onValueChange={onValueChange}
      />,
    )

    const slider = screen.getByRole('slider')
    slider.focus()
    await userEvent.keyboard('{Home}{End}{ArrowRight}')

    expect(onValueChange).not.toHaveBeenCalled()
  })
})
