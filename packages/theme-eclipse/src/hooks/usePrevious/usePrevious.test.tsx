import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { usePrevious } from './usePrevious'

describe('usePrevious', () => {
  afterEach(() => cleanup())

  test('첫 렌더에서는 undefined를 반환한다', () => {
    const { result } = renderHook(() => usePrevious('a'))
    expect(result.current).toBeUndefined()
  })

  test('값이 변하면 직전 값을 반환한다', () => {
    const { result, rerender } = renderHook(({ v }: { v: string }) => usePrevious(v), {
      initialProps: { v: 'a' },
    })

    rerender({ v: 'b' })
    expect(result.current).toBe('a')

    rerender({ v: 'c' })
    expect(result.current).toBe('b')
  })

  test('같은 값으로 rerender해도 직전 값은 그대로 유지된다', () => {
    const { result, rerender } = renderHook(({ v }: { v: number }) => usePrevious(v), {
      initialProps: { v: 1 },
    })

    rerender({ v: 2 })
    expect(result.current).toBe(1)

    rerender({ v: 2 })
    expect(result.current).toBe(2)
  })

  test('객체 reference도 정상 추적된다', () => {
    const a = { id: 1 }
    const b = { id: 2 }
    const { result, rerender } = renderHook(({ v }: { v: { id: number } }) => usePrevious(v), {
      initialProps: { v: a },
    })

    rerender({ v: b })
    expect(result.current).toBe(a)
  })
})
