import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { cleanup } from '../../test-utils'

import { useSafeState } from './useSafeState'

describe('useSafeState', () => {
  afterEach(() => cleanup())

  it('초기 상태를 반환한다', () => {
    const { result } = renderHook(() => useSafeState('initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('마운트 상태에서 setState 로 상태가 변경된다', () => {
    const { result } = renderHook(() => useSafeState('start'))

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
  })

  it('언마운트 후 setState 호출을 무시한다', () => {
    const { result, unmount } = renderHook(() => useSafeState('before'))

    // 상태 변경 함수를 캡처
    const setState = result.current[1]

    unmount()

    // 언마운트 후 호출해도 에러가 발생하지 않아야 함
    expect(() => {
      act(() => {
        setState('after-unmount')
      })
    }).not.toThrow()
  })
})
