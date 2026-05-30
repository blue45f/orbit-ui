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

  it('lock()을 호출하면 ref.current에서 requestPointerLock을 호출한다', async () => {
    const requestPointerLockSpy = vi.fn().mockResolvedValue(undefined)

    const el = document.createElement('div')
    ;(el as any).requestPointerLock = requestPointerLockSpy

    const ref = { current: el }
    const { result } = renderHook(() => usePointerLock(ref))

    await act(async () => {
      await result.current.lock()
    })

    expect(requestPointerLockSpy).toHaveBeenCalled()
  })

  it('lock()은 ref.current가 null이면 실행하지 않는다', async () => {
    const ref = { current: null }
    const { result } = renderHook(() => usePointerLock(ref))

    await act(async () => {
      await result.current.lock()
    })
  })

  it('unlock()을 호출하면 document.exitPointerLock을 호출한다', () => {
    const exitPointerLockSpy = vi.fn()

    const el = document.createElement('div')
    Object.defineProperty(document, 'pointerLockElement', {
      configurable: true,
      get: () => el,
    })
    Object.defineProperty(document, 'exitPointerLock', {
      value: exitPointerLockSpy,
      configurable: true,
    })

    const ref = { current: el }
    const { result } = renderHook(() => usePointerLock(ref))

    act(() => {
      result.current.unlock()
    })

    expect(exitPointerLockSpy).toHaveBeenCalled()
  })

  it('unlock()은 pointerLockElement가 없으면 exitPointerLock을 호출하지 않는다', () => {
    const exitPointerLockSpy = vi.fn()

    Object.defineProperty(document, 'pointerLockElement', {
      configurable: true,
      get: () => null,
    })
    Object.defineProperty(document, 'exitPointerLock', {
      value: exitPointerLockSpy,
      configurable: true,
    })

    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => usePointerLock(ref))

    act(() => {
      result.current.unlock()
    })

    expect(exitPointerLockSpy).not.toHaveBeenCalled()
  })

  it('pointerlockerror 이벤트 발생 시 isLocked가 false가 된다', () => {
    const el = document.createElement('div')
    Object.defineProperty(document, 'pointerLockElement', {
      configurable: true,
      get: () => el,
    })

    const ref = { current: el }
    const { result } = renderHook(() => usePointerLock(ref))

    act(() => {
      document.dispatchEvent(new Event('pointerlockchange'))
    })

    expect(result.current.isLocked).toBe(true)

    Object.defineProperty(document, 'pointerLockElement', {
      configurable: true,
      get: () => null,
    })

    act(() => {
      document.dispatchEvent(new Event('pointerlockerror'))
    })

    expect(result.current.isLocked).toBe(false)
  })
})
