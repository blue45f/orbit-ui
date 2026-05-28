import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWebSocket } from './useWebSocket'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('useWebSocket', () => {
  it('status starts as connecting when WebSocket is available', () => {
    class MockWebSocket {
      onopen: (() => void) | null = null
      onmessage: ((e: MessageEvent) => void) | null = null
      onclose: (() => void) | null = null
      onerror: (() => void) | null = null
      readyState = 0
      send = vi.fn()
      close = vi.fn()
    }
    vi.stubGlobal('WebSocket', MockWebSocket)

    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'))
    expect(result.current.status).toBe('connecting')

    vi.unstubAllGlobals()
  })

  it('send is a no-op when status is closed (no WebSocket global)', () => {
    const originalWebSocket = global.WebSocket
    // @ts-expect-error intentionally removing WebSocket
    delete global.WebSocket

    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'))
    expect(result.current.status).toBe('closed')

    expect(() => {
      result.current.send('hello')
    }).not.toThrow()

    global.WebSocket = originalWebSocket
  })
})
