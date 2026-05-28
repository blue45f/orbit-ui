import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useMount } from './useMount'

describe('useMount', () => {
  afterEach(() => cleanup())

  test('마운트 시 한 번 실행된다', () => {
    const effect = vi.fn()
    renderHook(() => useMount(effect))
    expect(effect).toHaveBeenCalledTimes(1)
  })

  test('rerender 해도 다시 실행되지 않는다', () => {
    const effect = vi.fn()
    const { rerender } = renderHook(() => useMount(effect))

    rerender()
    rerender()

    expect(effect).toHaveBeenCalledTimes(1)
  })

  test('unmount 시 cleanup이 호출된다', () => {
    const cleanupFn = vi.fn()
    const { unmount } = renderHook(() =>
      useMount(() => cleanupFn),
    )

    expect(cleanupFn).not.toHaveBeenCalled()

    unmount()
    expect(cleanupFn).toHaveBeenCalledTimes(1)
  })
})
