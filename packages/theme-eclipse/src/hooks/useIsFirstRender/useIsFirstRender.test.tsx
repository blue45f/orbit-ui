import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { cleanup } from '../../test-utils'

import { useIsFirstRender } from './useIsFirstRender'

describe('useIsFirstRender', () => {
  afterEach(() => {
    cleanup()
  })

  it('첫 번째 렌더링에서 true를 반환한다', () => {
    const { result } = renderHook(() => useIsFirstRender())
    expect(result.current).toBe(true)
  })

  it('업데이트 후에는 false를 반환한다', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender())

    expect(result.current).toBe(true)
    rerender()
    expect(result.current).toBe(false)
  })

  it('여러 번 업데이트가 있어도 false를 유지한다', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender())

    rerender()
    rerender()
    rerender()

    expect(result.current).toBe(false)
  })
})
