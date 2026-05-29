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
})
