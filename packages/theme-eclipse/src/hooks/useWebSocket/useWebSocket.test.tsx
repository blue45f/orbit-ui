import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWebSocket } from './useWebSocket'

const originalWebSocket = global.WebSocket

// 인스턴스를 캡처해 onopen/onmessage/onclose/onerror를 수동으로 트리거하기 위한 mock
const sockets: MockWS[] = []
class MockWS {
  readyState = 0
  onopen: (() => void) | null = null
  onmessage: ((e: MessageEvent) => void) | null = null
  onclose: (() => void) | null = null
  onerror: (() => void) | null = null
  send = vi.fn()
  close = vi.fn()
  constructor(public url: string) {
    sockets.push(this)
  }
}
const lastSocket = () => sockets[sockets.length - 1]

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

  it('onopen sets status to open and invokes onOpen', () => {
    const onOpen = vi.fn()
    vi.stubGlobal('WebSocket', MockWS)

    const { result } = renderHook(() => useWebSocket('ws://x', { onOpen }))
    act(() => {
      lastSocket().readyState = 1
      lastSocket().onopen?.()
    })

    expect(result.current.status).toBe('open')
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('onmessage forwards the event to onMessage', () => {
    const onMessage = vi.fn()
    vi.stubGlobal('WebSocket', MockWS)

    renderHook(() => useWebSocket('ws://x', { onMessage }))
    const event = new MessageEvent('message', { data: 'hello' })
    act(() => {
      lastSocket().onmessage?.(event)
    })

    expect(onMessage).toHaveBeenCalledWith(event)
  })

  it('onclose sets status to closed and invokes onClose', () => {
    const onClose = vi.fn()
    vi.stubGlobal('WebSocket', MockWS)

    const { result } = renderHook(() => useWebSocket('ws://x', { onClose }))
    act(() => {
      lastSocket().onclose?.()
    })

    expect(result.current.status).toBe('closed')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('onerror sets status to error and invokes onError', () => {
    const onError = vi.fn()
    vi.stubGlobal('WebSocket', MockWS)

    const { result } = renderHook(() => useWebSocket('ws://x', { onError }))
    act(() => {
      lastSocket().onerror?.()
    })

    expect(result.current.status).toBe('error')
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('send forwards data when the socket is open (readyState 1)', () => {
    vi.stubGlobal('WebSocket', MockWS)

    const { result } = renderHook(() => useWebSocket('ws://x'))
    act(() => {
      lastSocket().readyState = 1
      lastSocket().onopen?.()
    })
    result.current.send('payload')

    expect(lastSocket().send).toHaveBeenCalledWith('payload')
  })

  it('reconnects to connecting after reconnectDelay when closed', () => {
    vi.useFakeTimers()
    vi.stubGlobal('WebSocket', MockWS)

    const { result } = renderHook(() =>
      useWebSocket('ws://x', { reconnect: true, reconnectDelay: 1000 })
    )
    act(() => {
      lastSocket().onclose?.()
    })
    expect(result.current.status).toBe('closed')

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.status).toBe('connecting')

    vi.useRealTimers()
  })

  it('does not reconnect when the connection is closed explicitly', () => {
    vi.useFakeTimers()
    vi.stubGlobal('WebSocket', MockWS)

    const { result } = renderHook(() =>
      useWebSocket('ws://x', { reconnect: true, reconnectDelay: 1000 })
    )
    act(() => {
      result.current.close()
      lastSocket().onclose?.()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.status).toBe('closed')

    vi.useRealTimers()
  })
})
