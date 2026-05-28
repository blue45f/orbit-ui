import { act, renderHook } from '@testing-library/react'
import { type RefObject, useRef } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useIntersectionObserver } from './useIntersectionObserver'

type Callback = (entries: IntersectionObserverEntry[]) => void

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  callback: Callback
  observed: Element[] = []
  options: IntersectionObserverInit

  constructor(callback: Callback, options: IntersectionObserverInit = {}) {
    this.callback = callback
    this.options = options
    MockIntersectionObserver.instances.push(this)
  }

  observe(node: Element) {
    this.observed.push(node)
  }

  unobserve() {}

  disconnect() {
    this.observed = []
  }

  trigger(isIntersecting: boolean) {
    const entry = {
      isIntersecting,
      target: this.observed[0],
      intersectionRatio: isIntersecting ? 1 : 0,
      time: 0,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
    } as IntersectionObserverEntry
    this.callback([entry])
  }
}

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = []
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('초기 상태는 isIntersecting=false, entry=null', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useIntersectionObserver(ref as RefObject<HTMLDivElement | null>)
    })

    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.entry).toBeNull()
    document.body.removeChild(el)
  })

  test('교차 시 isIntersecting=true가 되고 entry가 채워진다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useIntersectionObserver(ref as RefObject<HTMLDivElement | null>)
    })

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true)
    })

    expect(result.current.isIntersecting).toBe(true)
    expect(result.current.entry).not.toBeNull()

    document.body.removeChild(el)
  })

  test('freezeOnceVisible=true이면 한 번 보인 후 변경되지 않는다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useIntersectionObserver(ref as RefObject<HTMLDivElement | null>, {
        freezeOnceVisible: true,
      })
    })

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true)
    })
    expect(result.current.isIntersecting).toBe(true)

    act(() => {
      // 다음 인스턴스는 새로 만들어지지 않아야 (frozen) — 기존 인스턴스에 다시 트리거해도 effect가 더 이상 안 듣음
      // 단, disconnect가 호출되었는지 검증
    })

    expect(MockIntersectionObserver.instances[0].observed.length).toBe(0)

    document.body.removeChild(el)
  })

  test('enabled=false이면 observer를 만들지 않는다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useIntersectionObserver(ref as RefObject<HTMLDivElement | null>, { enabled: false })
    })

    expect(MockIntersectionObserver.instances.length).toBe(0)

    document.body.removeChild(el)
  })

  test('IntersectionObserver가 없는 환경에서도 throw 하지 않는다', () => {
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: undefined,
    })

    const el = document.createElement('div')
    document.body.appendChild(el)

    expect(() => {
      renderHook(() => {
        const ref = useRef<HTMLDivElement>(el)
        return useIntersectionObserver(ref as RefObject<HTMLDivElement | null>)
      })
    }).not.toThrow()

    document.body.removeChild(el)
  })

  test('options(rootMargin, threshold)가 IntersectionObserver에 전달된다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useIntersectionObserver(ref as RefObject<HTMLDivElement | null>, {
        rootMargin: '100px',
        threshold: 0.75,
      })
    })

    expect(MockIntersectionObserver.instances[0].options.rootMargin).toBe('100px')
    expect(MockIntersectionObserver.instances[0].options.threshold).toBe(0.75)

    document.body.removeChild(el)
  })

  test('unmount 시 observer가 disconnect된다', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(el)
      return useIntersectionObserver(ref as RefObject<HTMLDivElement | null>)
    })

    expect(MockIntersectionObserver.instances[0].observed.length).toBe(1)

    unmount()

    expect(MockIntersectionObserver.instances[0].observed.length).toBe(0)

    document.body.removeChild(el)
  })
})
