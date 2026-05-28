import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useControllableState } from './useControllableState'

describe('useControllableState', () => {
  afterEach(() => cleanup())

  it('uncontrolled 모드에서 defaultValue를 초기값으로 사용한다', () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 'hello' }),
    )
    expect(result.current[0]).toBe('hello')
  })

  it('uncontrolled 모드에서 setState 로 내부 상태가 변경된다', () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 'initial' }),
    )

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
  })

  it('controlled 모드에서 setState 는 내부 상태를 변경하지 않고 onChange를 호출한다', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ value: 'controlled', onChange }),
    )

    act(() => {
      result.current[1]('new-value')
    })

    // controlled 모드이므로 외부 value가 그대로 반환됨
    expect(result.current[0]).toBe('controlled')
    expect(onChange).toHaveBeenCalledWith('new-value')
  })

  it('onChange 는 controlled · uncontrolled 양쪽에서 모두 호출된다', () => {
    const onChangeControlled = vi.fn()
    const { result: controlled } = renderHook(() =>
      useControllableState({ value: 'ctrl', onChange: onChangeControlled }),
    )

    act(() => {
      controlled.current[1]('next')
    })
    expect(onChangeControlled).toHaveBeenCalledWith('next')

    const onChangeUncontrolled = vi.fn()
    const { result: uncontrolled } = renderHook(() =>
      useControllableState({ defaultValue: 'start', onChange: onChangeUncontrolled }),
    )

    act(() => {
      uncontrolled.current[1]('next')
    })
    expect(onChangeUncontrolled).toHaveBeenCalledWith('next')
  })
})
