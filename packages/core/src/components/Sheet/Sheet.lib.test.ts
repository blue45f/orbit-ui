import { renderHook, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { useResizable } from './Sheet.lib'

const mockUseDrag = vi.fn()

vi.mock('@use-gesture/react', () => ({
  useDrag: (
    callback: Parameters<typeof mockUseDrag>[0],
    config: Parameters<typeof mockUseDrag>[1]
  ) => {
    mockUseDrag(callback, config)
  },
}))

describe('useResizable', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  const getDragCallback = () => {
    const calls = mockUseDrag.mock.calls
    return calls.length > 0 ? calls[calls.length - 1][0] : null
  }

  const simulateDrag = (params: {
    movement: [number, number]
    first?: boolean
    last?: boolean
    dragging?: boolean
  }) => {
    const callback = getDragCallback()
    if (callback) {
      callback({
        movement: params.movement,
        first: params.first ?? false,
        last: params.last ?? false,
        dragging: params.dragging ?? false,
      })
    }
  }

  describe('ref 반환', () => {
    test('grabberElementRef와 containerElementRef가 반환되어야 한다', () => {
      const { result } = renderHook(() => useResizable({ enabled: true }))

      expect(result.current.grabberElementRef).toBeDefined()
      expect(result.current.containerElementRef).toBeDefined()
      expect(typeof result.current.grabberElementRef).toBe('function')
      expect(typeof result.current.containerElementRef).toBe('function')
    })

    test('ref 함수를 통해 엘리먼트를 설정할 수 있어야 한다', () => {
      const { result } = renderHook(() => useResizable({ enabled: true }))
      const grabberElement = document.createElement('div')
      const containerElement = document.createElement('div')

      act(() => {
        if (typeof result.current.grabberElementRef === 'function') {
          result.current.grabberElementRef(grabberElement)
        }
        if (typeof result.current.containerElementRef === 'function') {
          result.current.containerElementRef(containerElement)
        }
      })

      expect(grabberElement).toBeInstanceOf(HTMLElement)
      expect(containerElement).toBeInstanceOf(HTMLElement)
    })
  })

  describe('enabled 옵션', () => {
    test('enabled가 false일 때도 ref는 정상적으로 반환되어야 한다', () => {
      const { result } = renderHook(() => useResizable({ enabled: false }))

      expect(result.current.grabberElementRef).toBeDefined()
      expect(result.current.containerElementRef).toBeDefined()
    })

    test('enabled가 true일 때 ref는 정상적으로 반환되어야 한다', () => {
      const { result } = renderHook(() => useResizable({ enabled: true }))

      expect(result.current.grabberElementRef).toBeDefined()
      expect(result.current.containerElementRef).toBeDefined()
    })
  })

  describe('breakpoints 기능', () => {
    test('breakpoints가 없으면 현재 높이 비율을 그대로 반환해야 한다', () => {
      const onChangeHeight = vi.fn()
      const { result } = renderHook(() =>
        useResizable({
          enabled: true,
          onChangeHeight,
        })
      )
      const grabberElement = document.createElement('div')
      const containerElement = document.createElement('div')
      containerElement.style.height = '500px'
      Object.defineProperty(containerElement, 'offsetHeight', {
        configurable: true,
        value: 500,
      })

      act(() => {
        if (typeof result.current.grabberElementRef === 'function') {
          result.current.grabberElementRef(grabberElement)
        }
        if (typeof result.current.containerElementRef === 'function') {
          result.current.containerElementRef(containerElement)
        }
      })

      act(() => {
        simulateDrag({
          movement: [0, 100],
          first: true,
          dragging: true,
        })
        simulateDrag({
          movement: [0, 100],
          last: true,
          dragging: false,
        })
      })

      expect(onChangeHeight).toHaveBeenCalledWith(40)
    })

    test('breakpoints 중 가장 가까운 값으로 스냅되어야 한다', () => {
      const onChangeHeight = vi.fn()
      const { result } = renderHook(() =>
        useResizable({
          enabled: true,
          breakpoints: [25, 50, 75],
          onChangeHeight,
        })
      )
      const grabberElement = document.createElement('div')
      const containerElement = document.createElement('div')
      containerElement.style.height = '500px'
      Object.defineProperty(containerElement, 'offsetHeight', {
        configurable: true,
        value: 500,
      })

      act(() => {
        if (typeof result.current.grabberElementRef === 'function') {
          result.current.grabberElementRef(grabberElement)
        }
        if (typeof result.current.containerElementRef === 'function') {
          result.current.containerElementRef(containerElement)
        }
      })

      act(() => {
        simulateDrag({
          movement: [0, 200],
          first: true,
          dragging: true,
        })
        simulateDrag({
          movement: [0, 200],
          last: true,
          dragging: false,
        })
      })

      expect(onChangeHeight).toHaveBeenCalledWith(25)
    })

    test('HIDDEN breakpoint는 0으로 처리되어야 한다', () => {
      const onChangeHeight = vi.fn()
      const { result } = renderHook(() =>
        useResizable({
          enabled: true,
          breakpoints: [25, 'HIDDEN', 75],
          onChangeHeight,
        })
      )
      const grabberElement = document.createElement('div')
      const containerElement = document.createElement('div')
      containerElement.style.height = '500px'
      Object.defineProperty(containerElement, 'offsetHeight', {
        configurable: true,
        value: 500,
      })

      act(() => {
        if (typeof result.current.grabberElementRef === 'function') {
          result.current.grabberElementRef(grabberElement)
        }
        if (typeof result.current.containerElementRef === 'function') {
          result.current.containerElementRef(containerElement)
        }
      })

      act(() => {
        simulateDrag({
          movement: [0, 450],
          first: true,
          dragging: true,
        })
        simulateDrag({
          movement: [0, 450],
          last: true,
          dragging: false,
        })
      })

      expect(onChangeHeight).toHaveBeenCalledWith(0)
    })
  })

  describe('onChangeHeight 콜백', () => {
    test('드래그가 끝날 때 onChangeHeight가 호출되어야 한다', () => {
      const onChangeHeight = vi.fn()
      const { result } = renderHook(() =>
        useResizable({
          enabled: true,
          breakpoints: [50],
          onChangeHeight,
        })
      )
      const grabberElement = document.createElement('div')
      const containerElement = document.createElement('div')
      containerElement.style.height = '500px'
      Object.defineProperty(containerElement, 'offsetHeight', {
        configurable: true,
        value: 500,
      })

      act(() => {
        if (typeof result.current.grabberElementRef === 'function') {
          result.current.grabberElementRef(grabberElement)
        }
        if (typeof result.current.containerElementRef === 'function') {
          result.current.containerElementRef(containerElement)
        }
      })

      act(() => {
        simulateDrag({
          movement: [0, 0],
          first: true,
          dragging: false,
        })
        simulateDrag({
          movement: [0, 100],
          first: false,
          dragging: true,
          last: false,
        })
        simulateDrag({
          movement: [0, 100],
          first: false,
          dragging: false,
          last: true,
        })
      })

      expect(onChangeHeight).toHaveBeenCalledTimes(1)
    })

    test('onChangeHeight가 없어도 에러가 발생하지 않아야 한다', () => {
      const { result } = renderHook(() =>
        useResizable({
          enabled: true,
        })
      )
      const grabberElement = document.createElement('div')
      const containerElement = document.createElement('div')
      containerElement.style.height = '500px'
      Object.defineProperty(containerElement, 'offsetHeight', {
        configurable: true,
        value: 500,
      })

      expect(() => {
        act(() => {
          if (typeof result.current.grabberElementRef === 'function') {
            result.current.grabberElementRef(grabberElement)
          }
          if (typeof result.current.containerElementRef === 'function') {
            result.current.containerElementRef(containerElement)
          }
        })

        act(() => {
          simulateDrag({
            movement: [0, 100],
            first: true,
            last: true,
            dragging: false,
          })
        })
      }).not.toThrow()
    })
  })

  describe('드래그 동작', () => {
    test('드래그 중에는 컨테이너 높이가 실시간으로 변경되어야 한다', () => {
      const { result } = renderHook(() =>
        useResizable({
          enabled: true,
        })
      )
      const grabberElement = document.createElement('div')
      const containerElement = document.createElement('div')
      containerElement.style.height = '500px'
      Object.defineProperty(containerElement, 'offsetHeight', {
        configurable: true,
        value: 500,
      })

      act(() => {
        if (typeof result.current.grabberElementRef === 'function') {
          result.current.grabberElementRef(grabberElement)
        }
        if (typeof result.current.containerElementRef === 'function') {
          result.current.containerElementRef(containerElement)
        }
      })

      act(() => {
        simulateDrag({
          movement: [0, 0],
          first: true,
          dragging: false,
        })
        simulateDrag({
          movement: [0, 100],
          first: false,
          dragging: true,
          last: false,
        })
      })

      expect(containerElement.style.height).toBe('400px')
    })

    test('드래그 종료 시 transition이 설정되어야 한다', () => {
      const { result } = renderHook(() =>
        useResizable({
          enabled: true,
        })
      )
      const grabberElement = document.createElement('div')
      const containerElement = document.createElement('div')
      containerElement.style.height = '500px'
      containerElement.style.transition = 'none'
      Object.defineProperty(containerElement, 'offsetHeight', {
        configurable: true,
        value: 500,
      })

      const transitionEndHandler = vi.fn()
      containerElement.addEventListener('transitionend', transitionEndHandler)

      act(() => {
        if (typeof result.current.grabberElementRef === 'function') {
          result.current.grabberElementRef(grabberElement)
        }
        if (typeof result.current.containerElementRef === 'function') {
          result.current.containerElementRef(containerElement)
        }
      })

      act(() => {
        simulateDrag({
          movement: [0, 100],
          first: true,
          last: true,
          dragging: false,
        })
      })

      expect(containerElement.style.transition).toBe('height 0.1s ease-in-out')

      act(() => {
        containerElement.dispatchEvent(new Event('transitionend'))
      })

      expect(containerElement.style.transition).toBe('none')
    })
  })
})
