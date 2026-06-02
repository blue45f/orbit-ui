import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useUnmount } from './useUnmount'

describe('useUnmount', () => {
  afterEach(() => cleanup())

  test('마운트 중에는 실행되지 않는다', () => {
    const callback = vi.fn()
    renderHook(() => useUnmount(callback))

    expect(callback).not.toHaveBeenCalled()
  })

  test('unmount 시 한 번 실행된다', () => {
    const callback = vi.fn()
    const { unmount } = renderHook(() => useUnmount(callback))

    unmount()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('콜백 갱신 시 unmount는 최신 함수를 호출한다', () => {
    const first = vi.fn()
    const second = vi.fn()
    const { rerender, unmount } = renderHook(({ cb }: { cb: () => void }) => useUnmount(cb), {
      initialProps: { cb: first },
    })

    rerender({ cb: second })
    unmount()

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })
})
