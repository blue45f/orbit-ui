import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Toaster, toast } from './Toast'

beforeEach(() => {
  global.ResizeObserver = class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    constructor(_cb: ResizeObserverCallback) {}
  } as unknown as typeof ResizeObserver
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Toaster', () => {
  test('Toaster가 region 역할로 렌더링된다', () => {
    render(<Toaster />)

    // Sonner 는 ol region을 mount함
    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  test('position prop을 전달할 수 있다', () => {
    render(<Toaster position="top-right" />)

    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  test('toast 함수를 import 할 수 있다', () => {
    expect(typeof toast).toBe('function')
  })

  test('빈 prop으로 렌더링되어도 에러가 발생하지 않는다', () => {
    expect(() => render(<Toaster />)).not.toThrow()
  })
})
