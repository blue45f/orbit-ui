import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useSelection } from './useSelection'

describe('useSelection', () => {
  let mockGetSelection: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockGetSelection = vi.fn()
    vi.stubGlobal('getSelection', mockGetSelection)
    Object.defineProperty(window, 'getSelection', {
      writable: true,
      configurable: true,
      value: mockGetSelection,
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('초기값은 빈 text와 rects이다', () => {
    const { result } = renderHook(() => useSelection())
    expect(result.current.text).toBe('')
    expect(result.current.rects).toEqual([])
  })

  it('selectionchange 이벤트 시 선택 상태를 업데이트한다', () => {
    const mockRect = {
      x: 0,
      y: 0,
      width: 100,
      height: 20,
      top: 0,
      left: 0,
      right: 100,
      bottom: 20,
    } as DOMRect
    const mockRange = {
      getClientRects: () => ({
        length: 1,
        0: mockRect,
        [Symbol.iterator]: function* () {
          yield mockRect
        },
      }),
    }

    mockGetSelection.mockReturnValue({
      isCollapsed: false,
      rangeCount: 1,
      getRangeAt: (_i: number) => mockRange,
      toString: () => 'hello world',
    })

    const { result } = renderHook(() => useSelection())

    act(() => {
      document.dispatchEvent(new Event('selectionchange'))
    })

    expect(result.current.text).toBe('hello world')
    expect(result.current.rects).toHaveLength(1)
    expect(result.current.rects[0]).toBe(mockRect)
  })

  it('선택이 해제되면 빈 상태로 초기화된다', () => {
    const mockRect = {
      x: 0,
      y: 0,
      width: 100,
      height: 20,
      top: 0,
      left: 0,
      right: 100,
      bottom: 20,
    } as DOMRect
    const mockRange = {
      getClientRects: () => ({
        length: 1,
        0: mockRect,
        [Symbol.iterator]: function* () {
          yield mockRect
        },
      }),
    }

    mockGetSelection.mockReturnValue({
      isCollapsed: false,
      rangeCount: 1,
      getRangeAt: (_i: number) => mockRange,
      toString: () => 'selected text',
    })

    const { result } = renderHook(() => useSelection())

    act(() => {
      document.dispatchEvent(new Event('selectionchange'))
    })

    expect(result.current.text).toBe('selected text')

    // Clear selection
    mockGetSelection.mockReturnValue({
      isCollapsed: true,
      rangeCount: 0,
      toString: () => '',
    })

    act(() => {
      document.dispatchEvent(new Event('selectionchange'))
    })

    expect(result.current.text).toBe('')
    expect(result.current.rects).toEqual([])
  })

  it('window.getSelection()이 null이면 빈 상태를 유지한다', () => {
    mockGetSelection.mockReturnValue(null)

    const { result } = renderHook(() => useSelection())

    act(() => {
      document.dispatchEvent(new Event('selectionchange'))
    })

    expect(result.current.text).toBe('')
    expect(result.current.rects).toEqual([])
  })

  it('unmount 시 이벤트 리스너가 해제된다', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')

    const { unmount } = renderHook(() => useSelection())

    expect(addSpy).toHaveBeenCalledWith('selectionchange', expect.any(Function))

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('selectionchange', expect.any(Function))
  })
})
