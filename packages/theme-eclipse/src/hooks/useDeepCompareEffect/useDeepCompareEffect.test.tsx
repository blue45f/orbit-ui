import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useDeepCompareEffect } from './useDeepCompareEffect'

describe('useDeepCompareEffect', () => {
  afterEach(() => {
    cleanup()
  })

  it('마운트 시 effect가 실행된다', () => {
    const effect = vi.fn()
    renderHook(() => useDeepCompareEffect(effect, [{ a: 1 }]))
    expect(effect).toHaveBeenCalledTimes(1)
  })

  it('동일한 내용의 객체 deps로 재렌더해도 effect가 재실행되지 않는다', () => {
    const effect = vi.fn()
    const { rerender } = renderHook(
      ({ deps }: { deps: object[] }) => useDeepCompareEffect(effect, deps),
      { initialProps: { deps: [{ a: 1, b: 2 }] } },
    )

    rerender({ deps: [{ a: 1, b: 2 }] })
    rerender({ deps: [{ a: 1, b: 2 }] })

    expect(effect).toHaveBeenCalledTimes(1)
  })

  it('객체 내용이 변경되면 effect가 재실행된다', () => {
    const effect = vi.fn()
    const { rerender } = renderHook(
      ({ deps }: { deps: object[] }) => useDeepCompareEffect(effect, deps),
      { initialProps: { deps: [{ a: 1 }] } },
    )

    rerender({ deps: [{ a: 2 }] })

    expect(effect).toHaveBeenCalledTimes(2)
  })

  it('배열 deps도 깊은 비교로 판단한다', () => {
    const effect = vi.fn()
    const { rerender } = renderHook(
      ({ deps }: { deps: unknown[][] }) => useDeepCompareEffect(effect, deps),
      { initialProps: { deps: [[1, 2, 3]] } },
    )

    rerender({ deps: [[1, 2, 3]] })
    expect(effect).toHaveBeenCalledTimes(1)

    rerender({ deps: [[1, 2, 4]] })
    expect(effect).toHaveBeenCalledTimes(2)
  })

  it('cleanup 함수가 호출된다', () => {
    const cleanup_fn = vi.fn()
    const effect = vi.fn(() => cleanup_fn)

    const { unmount } = renderHook(() => useDeepCompareEffect(effect, [{ x: 1 }]))

    unmount()

    expect(cleanup_fn).toHaveBeenCalled()
  })
})
