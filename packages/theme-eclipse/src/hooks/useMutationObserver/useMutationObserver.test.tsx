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

  trigger(mutations: Partial<MutationRecord>[]) {
    this.callback(mutations as MutationRecord[], this as unknown as MutationObserver)
  }
}

describe('useMutationObserver', () => {
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
