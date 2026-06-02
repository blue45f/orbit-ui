import { act, renderHook, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render } from '../../test-utils'

import { useFocusWithin } from './useFocusWithin'

import React, { useRef } from 'react'

describe('useFocusWithin', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('returns false initially', () => {
    const ref = { current: null }
    const { result } = renderHook(() => useFocusWithin(ref))
    expect(result.current).toBe(false)
  })

  test('returns true when an input inside the container is focused', () => {
    let containerRef!: React.RefObject<HTMLDivElement | null>

    const Component = () => {
      containerRef = useRef<HTMLDivElement>(null)
      const isFocusWithin = useFocusWithin(containerRef)
      return (
        <div ref={containerRef} data-testid="container" data-focus-within={isFocusWithin}>
          <input data-testid="input" />
        </div>
      )
    }

    const { getByTestId } = render(<Component />)
    const container = getByTestId('container')
    const input = getByTestId('input')

    expect(container.getAttribute('data-focus-within')).toBe('false')

    act(() => {
      fireEvent.focusIn(input)
    })

    expect(container.getAttribute('data-focus-within')).toBe('true')
  })

  test('returns false when focus leaves the container', () => {
    let containerRef!: React.RefObject<HTMLDivElement | null>

    const Component = () => {
      containerRef = useRef<HTMLDivElement>(null)
      const isFocusWithin = useFocusWithin(containerRef)
      return (
        <div ref={containerRef} data-testid="container" data-focus-within={isFocusWithin}>
          <input data-testid="input" />
        </div>
      )
    }

    const { getByTestId } = render(<Component />)
    const container = getByTestId('container')
    const input = getByTestId('input')

    act(() => {
      fireEvent.focusIn(input)
    })
    expect(container.getAttribute('data-focus-within')).toBe('true')

    const outsideEl = document.createElement('button')
    document.body.appendChild(outsideEl)

    act(() => {
      fireEvent.focusOut(input, { relatedTarget: outsideEl })
    })

    expect(container.getAttribute('data-focus-within')).toBe('false')

    document.body.removeChild(outsideEl)
  })

  test('stays true when focus moves between children', () => {
    let containerRef!: React.RefObject<HTMLDivElement | null>

    const Component = () => {
      containerRef = useRef<HTMLDivElement>(null)
      const isFocusWithin = useFocusWithin(containerRef)
      return (
        <div ref={containerRef} data-testid="container" data-focus-within={isFocusWithin}>
          <input data-testid="input-1" />
          <input data-testid="input-2" />
        </div>
      )
    }

    const { getByTestId } = render(<Component />)
    const container = getByTestId('container')
    const input1 = getByTestId('input-1')
    const input2 = getByTestId('input-2')

    act(() => {
      fireEvent.focusIn(input1)
    })
    expect(container.getAttribute('data-focus-within')).toBe('true')

    // Focus moves from input1 to input2 — relatedTarget is inside container
    act(() => {
      fireEvent.focusOut(input1, { relatedTarget: input2 })
      fireEvent.focusIn(input2)
    })

    expect(container.getAttribute('data-focus-within')).toBe('true')
  })
})
