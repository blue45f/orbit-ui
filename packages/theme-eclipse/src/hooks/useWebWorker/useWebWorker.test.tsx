import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useWebWorker } from './useWebWorker'

// 인스턴스를 캡처해 onmessage/onerror를 수동으로 트리거하는 mock (this 별칭 없이 push)
const workers: MockWorker[] = []
class MockWorker {
  onmessage: ((e: MessageEvent) => void) | null = null
  onerror: ((e: unknown) => void) | null = null
  postMessage = vi.fn()
  terminate = vi.fn()
  constructor(public url: string) {
    workers.push(this)
  }
}
const lastWorker = () => workers[workers.length - 1]
const installWorkerMocks = () => {
  vi.stubGlobal('Worker', MockWorker)
  vi.stubGlobal('URL', {
    createObjectURL: () => 'blob:mock',
    revokeObjectURL: () => {},
  })
  vi.stubGlobal(
    'Blob',
    class {
      constructor(public parts: unknown[]) {}
    }
  )
}

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
    vi.stubGlobal(
      'Blob',
      class MockBlob {
        constructor(
          public parts: unknown[],
          public options?: unknown
        ) {}
      }
    )

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
    vi.stubGlobal(
      'Blob',
      class MockBlob {
        constructor(
          public parts: unknown[],
          public options?: unknown
        ) {}
      }
    )

    const { result } = renderHook(() => useWebWorker((x: unknown) => x))

    act(() => {
      result.current.run(1)
    })

    act(() => {
      result.current.terminate()
    })

    expect(result.current.status).toBe('terminated')
  })

  it('onmessage 성공 응답 시 result와 status=success', () => {
    installWorkerMocks()
    const { result } = renderHook(() => useWebWorker((x: unknown) => x))

    act(() => {
      result.current.run(21)
    })
    act(() => {
      lastWorker().onmessage?.({ data: { result: 42, error: null } } as MessageEvent)
    })

    expect(result.current.status).toBe('success')
    expect(result.current.result).toBe(42)
  })

  it('onmessage 에러 응답 시 status=error', () => {
    installWorkerMocks()
    const { result } = renderHook(() => useWebWorker((x: unknown) => x))

    act(() => {
      result.current.run(1)
    })
    act(() => {
      lastWorker().onmessage?.({ data: { result: null, error: 'boom' } } as MessageEvent)
    })

    expect(result.current.status).toBe('error')
    expect(result.current.error?.message).toBe('boom')
  })

  it('worker.onerror 발생 시 status=error', () => {
    installWorkerMocks()
    const { result } = renderHook(() => useWebWorker((x: unknown) => x))

    act(() => {
      result.current.run(1)
    })
    act(() => {
      lastWorker().onerror?.(new Event('error'))
    })

    expect(result.current.status).toBe('error')
    expect(result.current.error?.message).toBe('Worker error')
  })

  it('unmount 시 cleanup이 worker를 종료한다', () => {
    installWorkerMocks()
    const { result, unmount } = renderHook(() => useWebWorker((x: unknown) => x))

    act(() => {
      result.current.run(1)
    })
    const worker = lastWorker()

    unmount()

    expect(worker.terminate).toHaveBeenCalled()
  })

  it('Worker가 지원되지 않으면 run()은 no-op이다', () => {
    vi.stubGlobal('Worker', undefined)
    const { result } = renderHook(() => useWebWorker((x: unknown) => x))

    act(() => {
      result.current.run(1)
    })

    expect(result.current.status).toBe('idle')
  })
})
