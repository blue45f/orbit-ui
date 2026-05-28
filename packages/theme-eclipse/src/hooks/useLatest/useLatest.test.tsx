import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useLatest } from './useLatest'

describe('useLatest', () => {
  afterEach(() => cleanup())

  test('초기값을 반영한다', () => {
    const { result } = renderHook(() => useLatest('a'))
    expect(result.current.current).toBe('a')
  })

  test('rerender 시 ref.current가 최신 값으로 갱신된다', () => {
    const { result, rerender } = renderHook(({ v }: { v: string }) => useLatest(v), {
      initialProps: { v: 'a' },
    })

    expect(result.current.current).toBe('a')

    rerender({ v: 'b' })
    expect(result.current.current).toBe('b')

    rerender({ v: 'c' })
    expect(result.current.current).toBe('c')
  })

  test('rerender 시 같은 ref 객체를 유지한다', () => {
    const { result, rerender } = renderHook(({ v }: { v: string }) => useLatest(v), {
      initialProps: { v: 'a' },
    })
    const firstRef = result.current

    rerender({ v: 'b' })

    expect(result.current).toBe(firstRef)
  })
})
