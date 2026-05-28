import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useBroadcastChannel } from './useBroadcastChannel'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('useBroadcastChannel', () => {
  it('returns lastMessage as null initially with mocked BroadcastChannel', () => {
    class MockBroadcastChannel {
      onmessage: ((e: MessageEvent) => void) | null = null
      postMessage = vi.fn()
      close = vi.fn()
    }
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel)

    const { result } = renderHook(() => useBroadcastChannel('test-channel'))
    expect(result.current.lastMessage).toBeNull()

    vi.unstubAllGlobals()
  })

  it('returns no-op functions when BroadcastChannel is unsupported', () => {
    const original = global.BroadcastChannel
    // @ts-expect-error intentionally removing BroadcastChannel
    delete global.BroadcastChannel

    const { result } = renderHook(() => useBroadcastChannel('test-channel'))
    expect(result.current.lastMessage).toBeNull()
    expect(() => result.current.postMessage('hello')).not.toThrow()
    expect(() => result.current.close()).not.toThrow()

    global.BroadcastChannel = original
  })
})
