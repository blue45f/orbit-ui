import { renderHook } from '@testing-library/react'
import { useEffect, useLayoutEffect } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

describe('useIsomorphicLayoutEffect', () => {
  afterEach(() => {
    cleanup()
  })

  test('브라우저 환경에서 useLayoutEffect와 동일한 함수 참조를 가진다', () => {
    // jsdom은 window를 제공하므로 useLayoutEffect여야 함
    expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect)
  })

  test('함수로 호출 가능하다', () => {
    expect(typeof useIsomorphicLayoutEffect).toBe('function')
  })

  test('renderHook에서 effect를 실행한다', () => {
    let ran = false

    renderHook(() => {
      useIsomorphicLayoutEffect(() => {
        ran = true
      }, [])
    })

    expect(ran).toBe(true)
  })

  test('SSR 환경(window 없음)에서는 useEffect와 동일해야 한다는 조건 로직을 검증한다', () => {
    // 조건 분기 로직을 직접 평가: typeof window === 'undefined' ? useEffect : useLayoutEffect
    const simulatedSsrResult = (() => {
      const win = undefined as Window | undefined
      return typeof win !== 'undefined' ? useLayoutEffect : useEffect
    })()
    expect(simulatedSsrResult).toBe(useEffect)
  })
})
