import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useUpdateEffect } from './useUpdateEffect'

describe('useUpdateEffect', () => {
  afterEach(() => cleanup())

  test('마운트 시 effect는 실행되지 않는다', () => {
    const effect = vi.fn()
    renderHook(() => useUpdateEffect(effect, []))

    expect(effect).not.toHaveBeenCalled()
  })

  test('deps 변경 시 effect가 실행된다', () => {
    const effect = vi.fn()
    const { rerender } = renderHook(({ v }: { v: number }) => useUpdateEffect(effect, [v]), {
      initialProps: { v: 1 },
    })

    expect(effect).not.toHaveBeenCalled()

    rerender({ v: 2 })
    expect(effect).toHaveBeenCalledTimes(1)

    rerender({ v: 3 })
    expect(effect).toHaveBeenCalledTimes(2)
  })

  test('같은 deps로 rerender 시 effect는 실행되지 않는다', () => {
    const effect = vi.fn()
    const { rerender } = renderHook(({ v }: { v: number }) => useUpdateEffect(effect, [v]), {
      initialProps: { v: 1 },
    })

    rerender({ v: 1 })
    rerender({ v: 1 })

    expect(effect).not.toHaveBeenCalled()
  })

  test('cleanup 함수가 정상 호출된다', () => {
    const cleanupFn = vi.fn()
    const effect = vi.fn(() => cleanupFn)

    const { rerender } = renderHook(({ v }: { v: number }) => useUpdateEffect(effect, [v]), {
      initialProps: { v: 1 },
    })

    rerender({ v: 2 })
    expect(effect).toHaveBeenCalledTimes(1)
    expect(cleanupFn).not.toHaveBeenCalled()

    rerender({ v: 3 })
    expect(cleanupFn).toHaveBeenCalledTimes(1)
  })
})
