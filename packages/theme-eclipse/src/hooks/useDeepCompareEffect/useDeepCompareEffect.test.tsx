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

  it('키 순서만 다른 동일 내용 객체로 재렌더해도 재실행되지 않는다', () => {
    // JSON.stringify 기반 비교는 키 순서가 다르면 다른 문자열이 되어 재실행되지만,
    // 깊은 비교는 내용이 같으므로 재실행하지 않아야 한다.
    const effect = vi.fn()
    const { rerender } = renderHook(
      ({ deps }: { deps: object[] }) => useDeepCompareEffect(effect, deps),
      { initialProps: { deps: [{ a: 1, b: 2 }] } },
    )

    rerender({ deps: [{ b: 2, a: 1 }] })

    expect(effect).toHaveBeenCalledTimes(1)
  })

  it('함수·undefined 등 직렬화 불가능한 값도 깊은 비교로 판단한다', () => {
    // JSON.stringify는 함수/undefined를 누락시켜 잘못 비교하지만,
    // 깊은 비교는 참조 동일 함수/동일 값이면 재실행하지 않는다.
    const effect = vi.fn()
    const fn = () => {}
    const { rerender } = renderHook(
      ({ deps }: { deps: object[] }) => useDeepCompareEffect(effect, deps),
      { initialProps: { deps: [{ fn, value: undefined }] } },
    )

    rerender({ deps: [{ fn, value: undefined }] })
    expect(effect).toHaveBeenCalledTimes(1)

    rerender({ deps: [{ fn: () => {}, value: undefined }] })
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
