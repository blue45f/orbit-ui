import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWebSocket } from './useWebSocket'

const originalWebSocket = global.WebSocket

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  // delete한 전역을 원래 상태로 정확히 복원 (isolate:false 파일 간 누수 방지)
  if (originalWebSocket === undefined) {
    // @ts-expect-error 원래 없던 전역은 삭제로 복원
    delete global.WebSocket
  } else {
    global.WebSocket = originalWebSocket
  }
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
    // @ts-expect-error intentionally removing WebSocket
    delete global.WebSocket

    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'))
    expect(result.current.status).toBe('closed')

    expect(() => {
      result.current.send('hello')
    }).not.toThrow()
    // 복원은 afterEach가 보장
  })
})
