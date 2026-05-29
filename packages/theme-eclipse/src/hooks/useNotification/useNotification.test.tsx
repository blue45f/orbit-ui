import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useNotification } from './useNotification'

const originalNotification = globalThis.Notification

describe('useNotification', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    // delete/대입한 전역 Notification을 원래 상태로 정확히 복원 (isolate:false 누수 방지).
    // 원래 없던(undefined) 경우엔 delete로 복원해 `'Notification' in window` 체크까지 보존한다.
    if (originalNotification === undefined) {
      // @ts-expect-error 원래 없던 전역은 삭제로 복원
      delete globalThis.Notification
    } else {
      globalThis.Notification = originalNotification
    }
  })

  it('isSupported is false when Notification is not defined', () => {
    // @ts-expect-error intentionally removing Notification
    delete globalThis.Notification

    const { result } = renderHook(() => useNotification())
    expect(result.current.isSupported).toBe(false)
    // 복원은 afterEach가 보장
  })

  it('permission reads from Notification.permission when supported', () => {
    const MockNotification = vi.fn() as unknown as typeof Notification
    Object.defineProperty(MockNotification, 'permission', {
      configurable: true,
      value: 'granted',
    })
    globalThis.Notification = MockNotification

    const { result } = renderHook(() => useNotification())
    expect(result.current.permission).toBe('granted')
  })

  it('notify() returns null when permission is not granted', () => {
    const MockNotification = vi.fn() as unknown as typeof Notification
    Object.defineProperty(MockNotification, 'permission', {
      configurable: true,
      value: 'denied',
    })
    globalThis.Notification = MockNotification

    const { result } = renderHook(() => useNotification())
    const notification = result.current.notify('Test')
    expect(notification).toBeNull()
  })

  it('notify() creates a Notification when permission is granted', () => {
    const MockNotification = vi.fn() as unknown as typeof Notification
    Object.defineProperty(MockNotification, 'permission', { configurable: true, value: 'granted' })
    globalThis.Notification = MockNotification

    const { result } = renderHook(() => useNotification())
    const notification = result.current.notify('Hello', { body: 'world' })

    expect(MockNotification).toHaveBeenCalledWith('Hello', { body: 'world' })
    expect(notification).not.toBeNull()
  })

  it('requestPermission requests and updates the permission when supported', async () => {
    const requestSpy = vi.fn().mockResolvedValue('granted')
    const MockNotification = vi.fn() as unknown as typeof Notification
    Object.defineProperty(MockNotification, 'permission', { configurable: true, value: 'default' })
    Object.defineProperty(MockNotification, 'requestPermission', {
      configurable: true,
      value: requestSpy,
    })
    globalThis.Notification = MockNotification

    const { result } = renderHook(() => useNotification())

    let returned: string | undefined
    await act(async () => {
      returned = await result.current.requestPermission()
    })

    expect(requestSpy).toHaveBeenCalled()
    expect(returned).toBe('granted')
    expect(result.current.permission).toBe('granted')
  })

  it('requestPermission returns default when unsupported', async () => {
    // @ts-expect-error intentionally removing Notification
    delete globalThis.Notification

    const { result } = renderHook(() => useNotification())

    let returned: string | undefined
    await act(async () => {
      returned = await result.current.requestPermission()
    })

    expect(returned).toBe('default')
  })
})
