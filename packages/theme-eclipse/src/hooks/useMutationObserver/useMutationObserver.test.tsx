import { act, renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useMutationObserver } from './useMutationObserver'

type MutationObserverCallback = (mutations: MutationRecord[], observer: MutationObserver) => void

class MockMutationObserver {
  static instances: MockMutationObserver[] = []
  callback: MutationObserverCallback
  observed: Element | null = null
  disconnected = false

  constructor(callback: MutationObserverCallback) {
    this.callback = callback
    MockMutationObserver.instances.push(this)
  }

  observe(node: Element) {
    this.observed = node
  }

  disconnect() {
    this.disconnected = true
    this.observed = null
  }

  takeRecords(): MutationRecord[] {
    return []
  }

  trigger(mutations: Partial<MutationRecord>[]) {
    this.callback(mutations as MutationRecord[], this as unknown as MutationObserver)
  }
}

describe('useMutationObserver', () => {
  const originalMutationObserver = globalThis.MutationObserver

  beforeEach(() => {
    MockMutationObserver.instances = []
    Object.defineProperty(globalThis, 'MutationObserver', {
      writable: true,
      configurable: true,
      value: MockMutationObserver,
    })
  })

  afterEach(() => {
    cleanup()
    // 전역 MutationObserver를 원복한다. vi.restoreAllMocks()는 defineProperty로
    // 교체한 전역을 되돌리지 못하므로, isolate:false 환경에서 이 모의 객체가
    // 다른 테스트 파일(예: ProseMirror 기반 Editor)로 새어 나가 takeRecords 호출 시
    // 깨지는 것을 막는다.
    Object.defineProperty(globalThis, 'MutationObserver', {
      writable: true,
      configurable: true,
      value: originalMutationObserver,
    })
    vi.restoreAllMocks()
  })

  it('ref element에 observer를 연결한다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      useMutationObserver(ref, vi.fn())
    })

    expect(MockMutationObserver.instances).toHaveLength(1)
    expect(MockMutationObserver.instances[0].observed).toBe(el)

    document.body.removeChild(el)
  })

  it('mutation 발생 시 callback을 호출한다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const callback = vi.fn()

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      useMutationObserver(ref, callback)
    })

    const fakeMutation = { type: 'childList', addedNodes: [] } as unknown as MutationRecord

    act(() => {
      MockMutationObserver.instances[0].trigger([fakeMutation])
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith([fakeMutation], expect.anything())

    document.body.removeChild(el)
  })

  it('unmount 시 observer가 disconnect된다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      useMutationObserver(ref, vi.fn())
    })

    expect(MockMutationObserver.instances[0].disconnected).toBe(false)

    unmount()

    expect(MockMutationObserver.instances[0].disconnected).toBe(true)

    document.body.removeChild(el)
  })
})
