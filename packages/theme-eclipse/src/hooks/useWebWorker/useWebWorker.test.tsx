import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWebWorker } from './useWebWorker'

describe('useWebWorker', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('초기 status는 idle이다', () => {
    const { result } = renderHook(() => useWebWorker((x: unknown) => x))
    expect(result.current.status).toBe('idle')
    expect(result.current.result).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('run()을 호출하면 Worker가 생성되고 status가 running이 된다', () => {
    let capturedPostMessage: unknown[] = []

    class MockWorker {
      onmessage: ((e: MessageEvent) => void) | null = null
      onerror: ((e: ErrorEvent) => void) | null = null

      postMessage(data: unknown) {
        capturedPostMessage.push(data)
        // status를 running으로 유지하기 위해 응답하지 않음
      }

      terminate() {}
    }

    vi.stubGlobal('Worker', MockWorker)
    vi.stubGlobal('URL', {
      createObjectURL: () => 'blob:mock',
      revokeObjectURL: () => {},
    })
    vi.stubGlobal('Blob', class MockBlob {
      constructor(public parts: unknown[], public options?: unknown) {}
    })

    const { result } = renderHook(() => useWebWorker((x: unknown) => x))

    act(() => {
      result.current.run(42)
    })

    expect(result.current.status).toBe('running')
  })

  it('terminate()를 호출하면 status가 terminated가 된다', () => {
    class MockWorker {
      onmessage: ((e: MessageEvent) => void) | null = null
      onerror: ((e: ErrorEvent) => void) | null = null
      postMessage(_data: unknown) {}
      terminate() {}
    }

    vi.stubGlobal('Worker', MockWorker)
    vi.stubGlobal('URL', {
      createObjectURL: () => 'blob:mock',
      revokeObjectURL: () => {},
    })
    vi.stubGlobal('Blob', class MockBlob {
      constructor(public parts: unknown[], public options?: unknown) {}
    })

    const { result } = renderHook(() => useWebWorker((x: unknown) => x))

    act(() => {
      result.current.run(1)
    })

    act(() => {
      result.current.terminate()
    })

    expect(result.current.status).toBe('terminated')
  })
})
