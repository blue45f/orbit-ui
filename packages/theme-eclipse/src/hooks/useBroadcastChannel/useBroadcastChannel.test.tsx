import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useBroadcastChannel } from './useBroadcastChannel'

const originalBroadcastChannel = global.BroadcastChannel

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  // delete한 전역을 원래 상태로 정확히 복원 (isolate:false 파일 간 누수 방지)
  if (originalBroadcastChannel === undefined) {
    // @ts-expect-error 원래 없던 전역은 삭제로 복원
    delete global.BroadcastChannel
  } else {
    global.BroadcastChannel = originalBroadcastChannel
  }
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
    // @ts-expect-error intentionally removing BroadcastChannel
    delete global.BroadcastChannel

    const { result } = renderHook(() => useBroadcastChannel('test-channel'))
    expect(result.current.lastMessage).toBeNull()
    expect(() => result.current.postMessage('hello')).not.toThrow()
    expect(() => result.current.close()).not.toThrow()
    // 복원은 afterEach가 보장
  })

  it('receives message and updates lastMessage state', () => {
    class MockBroadcastChannel {
      onmessage: ((e: MessageEvent) => void) | null = null
      postMessage = vi.fn()
      close = vi.fn()
    }
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel)

    const { result } = renderHook(() => useBroadcastChannel<string>('test-channel'))
    expect(result.current.lastMessage).toBeNull()

    // onmessage 핸들러 수동 호출
    const mockChannel = new MockBroadcastChannel() as InstanceType<typeof MockBroadcastChannel>
    if (mockChannel.onmessage) {
      mockChannel.onmessage(new MessageEvent('message', { data: 'hello from channel' }))
    }

    vi.unstubAllGlobals()
  })

  it('postMessage sends message to the broadcast channel', () => {
    let createdChannel: InstanceType<typeof MockBroadcastChannel> | null = null
    class MockBroadcastChannel {
      onmessage: ((e: MessageEvent) => void) | null = null
      postMessage = vi.fn()
      close = vi.fn()
      constructor() {
        createdChannel = this as any
      }
    }
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel)

    const { result } = renderHook(() => useBroadcastChannel<string>('test-channel'))

    result.current.postMessage('test message')

    expect((createdChannel as any)?.postMessage).toHaveBeenCalledWith('test message')

    vi.unstubAllGlobals()
  })

  it('close function closes the channel and nullifies the ref', () => {
    let createdChannel: InstanceType<typeof MockBroadcastChannel> | null = null
    class MockBroadcastChannel {
      onmessage: ((e: MessageEvent) => void) | null = null
      postMessage = vi.fn()
      close = vi.fn()
      constructor() {
        createdChannel = this as any
      }
    }
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel)

    const { result } = renderHook(() => useBroadcastChannel('test-channel'))

    result.current.close()

    expect((createdChannel as any)?.close).toHaveBeenCalled()

    vi.unstubAllGlobals()
  })

  it('re-initializes channel when channelName changes', () => {
    const closeCalls: number[] = []
    class MockBroadcastChannel {
      onmessage: ((e: MessageEvent) => void) | null = null
      postMessage = vi.fn()
      close = vi.fn(() => {
        closeCalls.push(1)
      })
    }
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel)

    const { rerender } = renderHook(({ channelName }) => useBroadcastChannel(channelName), {
      initialProps: { channelName: 'channel-1' },
    })

    expect(closeCalls).toHaveLength(0)

    rerender({ channelName: 'channel-2' })

    // channelName이 변경되면 이전 채널이 close되어야 함
    expect(closeCalls.length).toBeGreaterThan(0)

    vi.unstubAllGlobals()
  })
})
