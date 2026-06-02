import { act, renderHook } from '@testing-library/react'
import { type RefObject, useRef } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useResizeObserver } from './useResizeObserver'

type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void

class MockResizeObserver {
  static instances: MockResizeObserver[] = []
  callback: ResizeObserverCallback
  observed: Element[] = []

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
    MockResizeObserver.instances.push(this)
  }

  observe(node: Element) {
    this.observed.push(node)
  }

  unobserve() {}

  disconnect() {
    this.observed = []
  }

  trigger(size: { width: number; height: number }) {
    const entry = {
      contentRect: {
        ...size,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: size.width,
        bottom: size.height,
      } as DOMRectReadOnly,
      target: this.observed[0],
      borderBoxSize: [],
      contentBoxSize: [],
      devicePixelContentBoxSize: [],
    } as ResizeObserverEntry
    this.callback([entry])
  }
}

describe('useResizeObserver', () => {
  beforeEach(() => {
    MockResizeObserver.instances = []
    Object.defineProperty(globalThis, 'ResizeObserver', {
      writable: true,
      configurable: true,
      value: MockResizeObserver,
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('초기 size는 null', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useResizeObserver(ref as RefObject<HTMLDivElement | null>)
    })

    expect(result.current.size).toBeNull()
    expect(result.current.entry).toBeNull()

    document.body.removeChild(el)
  })

  test('resize 발생 시 size가 갱신된다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useResizeObserver(ref as RefObject<HTMLDivElement | null>)
    })

    act(() => {
      MockResizeObserver.instances[0].trigger({ width: 320, height: 240 })
    })

    expect(result.current.size).toEqual({ width: 320, height: 240 })
    expect(result.current.entry).not.toBeNull()

    document.body.removeChild(el)
  })

  test('연속 resize에서 최신 값이 반영된다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useResizeObserver(ref as RefObject<HTMLDivElement | null>)
    })

    act(() => {
      MockResizeObserver.instances[0].trigger({ width: 100, height: 100 })
    })
    act(() => {
      MockResizeObserver.instances[0].trigger({ width: 200, height: 150 })
    })

    expect(result.current.size).toEqual({ width: 200, height: 150 })

    document.body.removeChild(el)
  })

  test('ResizeObserver 미지원 환경에서 throw 하지 않는다', () => {
    Object.defineProperty(globalThis, 'ResizeObserver', {
      writable: true,
      configurable: true,
      value: undefined,
    })
    const el = document.createElement('div')
    document.body.appendChild(el)

    expect(() => {
      renderHook(() => {
        const ref = useRef<HTMLDivElement>(el)
        return useResizeObserver(ref as RefObject<HTMLDivElement | null>)
      })
    }).not.toThrow()

    document.body.removeChild(el)
  })

  test('unmount 시 observer가 disconnect된다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useResizeObserver(ref as RefObject<HTMLDivElement | null>)
    })

    expect(MockResizeObserver.instances[0].observed.length).toBe(1)

    unmount()

    expect(MockResizeObserver.instances[0].observed.length).toBe(0)

    document.body.removeChild(el)
  })
})
