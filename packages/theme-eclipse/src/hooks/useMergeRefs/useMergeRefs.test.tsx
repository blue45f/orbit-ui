import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render } from '../../test-utils'

import { useMergeRefs } from './useMergeRefs'

describe('useMergeRefs', () => {
  afterEach(() => cleanup())

  it('RefObject에 노드가 할당된다', () => {
    const ref = { current: null } as React.MutableRefObject<HTMLDivElement | null>
    const { result } = renderHook(() => useMergeRefs<HTMLDivElement>(ref))

    const div = document.createElement('div')
    result.current(div)

    expect(ref.current).toBe(div)
  })

  it('RefCallback이 노드와 함께 호출된다', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useMergeRefs<HTMLDivElement>(callback))

    const div = document.createElement('div')
    result.current(div)

    expect(callback).toHaveBeenCalledWith(div)
  })

  it('null/undefined ref가 있어도 크래시 없이 동작한다', () => {
    const ref = { current: null } as React.MutableRefObject<HTMLDivElement | null>
    const { result } = renderHook(() =>
      useMergeRefs<HTMLDivElement>(null, undefined, ref),
    )

    const div = document.createElement('div')
    expect(() => result.current(div)).not.toThrow()
    expect(ref.current).toBe(div)
  })

  it('RefObject.current와 RefCallback이 동시에 할당된다', () => {
    const ref = { current: null } as React.MutableRefObject<HTMLDivElement | null>
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useMergeRefs<HTMLDivElement>(ref, callback),
    )

    const div = document.createElement('div')
    result.current(div)

    expect(ref.current).toBe(div)
    expect(callback).toHaveBeenCalledWith(div)
  })

  it('노드가 detach될 때 null이 전달된다', () => {
    const ref = { current: null } as React.MutableRefObject<HTMLDivElement | null>
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useMergeRefs<HTMLDivElement>(ref, callback),
    )

    const div = document.createElement('div')
    result.current(div)
    expect(ref.current).toBe(div)

    result.current(null)
    expect(ref.current).toBeNull()
    expect(callback).toHaveBeenLastCalledWith(null)
  })

  it('refs가 변경되면 새 콜백을 반환하고, 동일하면 안정적이다', () => {
    const refA = { current: null } as React.MutableRefObject<HTMLDivElement | null>
    const refB = { current: null } as React.MutableRefObject<HTMLDivElement | null>

    const { result, rerender } = renderHook(
      ({ refs }: { refs: React.MutableRefObject<HTMLDivElement | null>[] }) =>
        useMergeRefs<HTMLDivElement>(...refs),
      { initialProps: { refs: [refA] } },
    )

    const firstCallback = result.current

    // Same ref — callback should be stable
    rerender({ refs: [refA] })
    expect(result.current).toBe(firstCallback)

    // Different ref — callback should change
    rerender({ refs: [refB] })
    expect(result.current).not.toBe(firstCallback)
  })

  it('DOM 컴포넌트에서 forwardRef와 내부 ref를 병합한다', () => {
    const internalRef = { current: null } as React.MutableRefObject<HTMLButtonElement | null>
    const externalRef = { current: null } as React.MutableRefObject<HTMLButtonElement | null>

    function TestComponent() {
      const mergedRef = useMergeRefs<HTMLButtonElement>(internalRef, externalRef)
      return <button ref={mergedRef}>click</button>
    }

    render(<TestComponent />)

    expect(internalRef.current).toBeInstanceOf(HTMLButtonElement)
    expect(externalRef.current).toBeInstanceOf(HTMLButtonElement)
    expect(internalRef.current).toBe(externalRef.current)
  })
})
