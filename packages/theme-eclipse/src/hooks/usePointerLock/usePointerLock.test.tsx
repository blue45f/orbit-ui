import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { usePointerLock } from './usePointerLock'

describe('usePointerLock', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('초기 isLocked는 false이다', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => usePointerLock(ref))
    expect(result.current.isLocked).toBe(false)
  })

  it('lock과 unlock 함수가 존재한다', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => usePointerLock(ref))
    expect(typeof result.current.lock).toBe('function')
    expect(typeof result.current.unlock).toBe('function')
  })

  it('pointerlockchange 이벤트 발생 시 isLocked가 갱신된다', () => {
    const el = document.createElement('div')
    const ref = { current: el }

    // pointerLockElement를 el로 mock
    Object.defineProperty(document, 'pointerLockElement', {
      configurable: true,
      get: () => el,
    })

    const { result } = renderHook(() => usePointerLock(ref))

    act(() => {
      document.dispatchEvent(new Event('pointerlockchange'))
    })

    expect(result.current.isLocked).toBe(true)

    // pointerLockElement를 null로 복원
    Object.defineProperty(document, 'pointerLockElement', {
      configurable: true,
      get: () => null,
    })

    act(() => {
      document.dispatchEvent(new Event('pointerlockchange'))
    })

    expect(result.current.isLocked).toBe(false)
  })
})
