import { fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { useLongPress } from './useLongPress'

function Probe({
  onLongPress,
  delay,
  movementThreshold,
}: {
  onLongPress: () => void
  delay?: number
  movementThreshold?: number
}) {
  const handlers = useLongPress(onLongPress, { delay, movementThreshold })
  return (
    <button type="button" {...handlers}>
      target
    </button>
  )
}

const pointerEvent = (clientX = 10, clientY = 10) => ({
  clientX,
  clientY,
  pointerId: 1,
  pointerType: 'mouse',
})

// jsdom's PointerEvent constructor silently drops clientX/Y from the event
// init dict, so for tests that need real coordinates we build the event by
// hand and stamp the props on after construction.
const dispatchPointerEvent = (
  target: Element,
  type: 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel',
  clientX: number,
  clientY: number,
) => {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'clientX', { value: clientX })
  Object.defineProperty(event, 'clientY', { value: clientY })
  Object.defineProperty(event, 'pointerId', { value: 1 })
  Object.defineProperty(event, 'pointerType', { value: 'mouse' })
  target.dispatchEvent(event)
}

describe('useLongPress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('지정한 delay 동안 누르고 있으면 콜백을 호출한다', () => {
    const onLongPress = vi.fn()
    render(<Probe onLongPress={onLongPress} delay={500} />)
    const target = screen.getByRole('button')

    fireEvent.pointerDown(target, pointerEvent())
    expect(onLongPress).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)
    expect(onLongPress).toHaveBeenCalledTimes(1)
  })

  test('delay 이전에 손을 떼면 콜백이 호출되지 않는다', () => {
    const onLongPress = vi.fn()
    render(<Probe onLongPress={onLongPress} delay={500} />)
    const target = screen.getByRole('button')

    fireEvent.pointerDown(target, pointerEvent())
    vi.advanceTimersByTime(300)
    fireEvent.pointerUp(target, pointerEvent())
    vi.advanceTimersByTime(500)

    expect(onLongPress).not.toHaveBeenCalled()
  })

  test('손가락이 임계값 이상 움직이면 long-press가 취소된다', () => {
    const onLongPress = vi.fn()
    render(<Probe onLongPress={onLongPress} delay={500} movementThreshold={8} />)
    const target = screen.getByRole('button')

    dispatchPointerEvent(target, 'pointerdown', 10, 10)
    dispatchPointerEvent(target, 'pointermove', 30, 30) // ~28px diagonal, > 8
    vi.advanceTimersByTime(500)

    expect(onLongPress).not.toHaveBeenCalled()
  })

  test('임계값보다 작은 미세 움직임은 취소하지 않는다', () => {
    const onLongPress = vi.fn()
    render(<Probe onLongPress={onLongPress} delay={500} movementThreshold={8} />)
    const target = screen.getByRole('button')

    dispatchPointerEvent(target, 'pointerdown', 10, 10)
    dispatchPointerEvent(target, 'pointermove', 13, 12) // ~3.6px, < 8
    vi.advanceTimersByTime(500)

    expect(onLongPress).toHaveBeenCalledTimes(1)
  })

  test('pointercancel 도 long-press를 취소한다', () => {
    const onLongPress = vi.fn()
    render(<Probe onLongPress={onLongPress} delay={500} />)
    const target = screen.getByRole('button')

    fireEvent.pointerDown(target, pointerEvent())
    fireEvent.pointerCancel(target, pointerEvent())
    vi.advanceTimersByTime(500)

    expect(onLongPress).not.toHaveBeenCalled()
  })

  test('unmount 시 타이머가 정리된다', () => {
    const onLongPress = vi.fn()
    const { unmount } = render(<Probe onLongPress={onLongPress} delay={500} />)
    const target = screen.getByRole('button')

    fireEvent.pointerDown(target, pointerEvent())
    unmount()
    vi.advanceTimersByTime(500)

    expect(onLongPress).not.toHaveBeenCalled()
  })

  test('long-press 발화 후에는 contextmenu 기본 동작을 막는다', () => {
    const onLongPress = vi.fn()
    render(<Probe onLongPress={onLongPress} delay={500} />)
    const target = screen.getByRole('button')

    fireEvent.pointerDown(target, pointerEvent())
    vi.advanceTimersByTime(500)
    expect(onLongPress).toHaveBeenCalledTimes(1) // fired → firedRef=true

    const ctx = new MouseEvent('contextmenu', { bubbles: true, cancelable: true })
    target.dispatchEvent(ctx)
    expect(ctx.defaultPrevented).toBe(true)
  })

  test('long-press 발화 없이는 contextmenu를 막지 않는다', () => {
    render(<Probe onLongPress={vi.fn()} delay={500} />)
    const target = screen.getByRole('button')

    const ctx = new MouseEvent('contextmenu', { bubbles: true, cancelable: true })
    target.dispatchEvent(ctx)
    expect(ctx.defaultPrevented).toBe(false)
  })
})
