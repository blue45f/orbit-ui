import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useNotification } from './useNotification'

describe('useNotification', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('isSupported is false when Notification is not defined', () => {
    const original = globalThis.Notification
    // @ts-expect-error intentionally removing Notification
    delete globalThis.Notification

    const { result } = renderHook(() => useNotification())
    expect(result.current.isSupported).toBe(false)

    globalThis.Notification = original
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
})
