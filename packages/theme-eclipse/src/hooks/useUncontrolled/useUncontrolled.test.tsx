import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useUncontrolled } from './useUncontrolled'

describe('useUncontrolled', () => {
  afterEach(() => cleanup())

  test('uncontrolled 모드는 defaultValue 로 시작한다', () => {
    const { result } = renderHook(() => useUncontrolled<string>({ defaultValue: 'a' }))
    expect(result.current[0]).toBe('a')
    expect(result.current[2]).toBe(false)
  })

  test('uncontrolled 모드에서 set 은 내부 state를 갱신한다', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() => useUncontrolled<string>({ defaultValue: 'a', onChange }))
    act(() => result.current[1]('b'))
    expect(result.current[0]).toBe('b')
    expect(onChange).toHaveBeenCalledWith('b')
  })

  test('controlled 모드는 prop value 를 그대로 반환한다', () => {
    const { result, rerender } = renderHook(
      ({ v }: { v: string }) => useUncontrolled<string>({ value: v }),
      { initialProps: { v: 'a' } }
    )
    expect(result.current[0]).toBe('a')
    expect(result.current[2]).toBe(true)

    rerender({ v: 'b' })
    expect(result.current[0]).toBe('b')
  })

  test('controlled 모드에서 set 은 내부 state를 갱신하지 않고 onChange 만 호출', () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ v }: { v: string }) => useUncontrolled<string>({ value: v, onChange }),
      { initialProps: { v: 'a' } }
    )
    act(() => result.current[1]('b'))
    expect(onChange).toHaveBeenCalledWith('b')
    // value didn't actually change because parent didn't rerender with new value
    expect(result.current[0]).toBe('a')

    rerender({ v: 'b' })
    expect(result.current[0]).toBe('b')
  })

  test('value·defaultValue 둘 다 undefined 면 finalValue 사용', () => {
    const { result } = renderHook(() => useUncontrolled<boolean>({ finalValue: false }))
    expect(result.current[0]).toBe(false)
  })

  test('controlled → uncontrolled 전환 시에도 onChange는 계속 호출된다', () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ v }: { v?: string }) => useUncontrolled<string>({ value: v, defaultValue: 'd', onChange }),
      { initialProps: { v: 'a' as string | undefined } }
    )
    expect(result.current[0]).toBe('a')

    rerender({ v: undefined }) // dropping to uncontrolled
    expect(result.current[2]).toBe(false)

    act(() => result.current[1]('e'))
    expect(onChange).toHaveBeenLastCalledWith('e')
  })
})
