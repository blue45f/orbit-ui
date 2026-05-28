import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useCallbackRef } from './useCallbackRef'

describe('useCallbackRef', () => {
  afterEach(() => {
    cleanup()
  })

  it('렌더링 간에 안정적인 참조를 반환한다', () => {
    const callback = vi.fn()
    const { result, rerender } = renderHook(
      ({ cb }: { cb: typeof callback }) => useCallbackRef(cb),
      { initialProps: { cb: callback } },
    )

    const first = result.current
    rerender({ cb: vi.fn() })
    const second = result.current

    expect(first).toBe(second)
  })

  it('항상 최신 콜백을 호출한다', () => {
    const callback1 = vi.fn().mockReturnValue('v1')
    const callback2 = vi.fn().mockReturnValue('v2')

    const { result, rerender } = renderHook(
      ({ cb }: { cb: (...args: unknown[]) => unknown }) => useCallbackRef(cb),
      { initialProps: { cb: callback1 as (...args: unknown[]) => unknown } },
    )

    result.current()
    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback2).not.toHaveBeenCalled()

    rerender({ cb: callback2 as (...args: unknown[]) => unknown })

    result.current()
    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })

  it('undefined 콜백을 에러 없이 처리한다', () => {
    const { result } = renderHook(() => useCallbackRef(undefined))

    expect(() => result.current()).not.toThrow()
  })
})
