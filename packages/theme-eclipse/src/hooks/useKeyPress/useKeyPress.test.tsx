import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useKeyPress } from './useKeyPress'

const fireKey = (type: 'keydown' | 'keyup', key: string, target: EventTarget = window) => {
  const event = new KeyboardEvent(type, { key })
  if (target === window) {
    window.dispatchEvent(event)
  } else {
    target.dispatchEvent(event)
  }
}

describe('useKeyPress', () => {
  afterEach(() => cleanup())

  test('초기값은 false', () => {
    const { result } = renderHook(() => useKeyPress('Shift'))
    expect(result.current).toBe(false)
  })

  test('대상 키 keydown 시 true, keyup 시 false', () => {
    const { result } = renderHook(() => useKeyPress('Shift'))

    act(() => fireKey('keydown', 'Shift'))
    expect(result.current).toBe(true)

    act(() => fireKey('keyup', 'Shift'))
    expect(result.current).toBe(false)
  })

  test('다른 키는 무시한다', () => {
    const { result } = renderHook(() => useKeyPress('Shift'))

    act(() => fireKey('keydown', 'Control'))
    expect(result.current).toBe(false)
  })

  test('단일 문자 키는 대소문자 무관하게 매칭', () => {
    const { result } = renderHook(() => useKeyPress('a'))

    act(() => fireKey('keydown', 'A'))
    expect(result.current).toBe(true)

    act(() => fireKey('keyup', 'a'))
    expect(result.current).toBe(false)
  })

  test('blur 이벤트가 발생하면 강제로 false', () => {
    const { result } = renderHook(() => useKeyPress('Shift'))

    act(() => fireKey('keydown', 'Shift'))
    expect(result.current).toBe(true)

    act(() => window.dispatchEvent(new Event('blur')))
    expect(result.current).toBe(false)
  })

  test('ignoreInputs (기본 true) 면 input 안에서는 무시', () => {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    const { result } = renderHook(() => useKeyPress('Enter'))

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      input.dispatchEvent(event)
    })
    expect(result.current).toBe(false)
    document.body.removeChild(input)
  })

  test('ignoreInputs: false 면 input 안에서도 감지', () => {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    const { result } = renderHook(() => useKeyPress('Enter', { ignoreInputs: false }))

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      input.dispatchEvent(event)
    })
    expect(result.current).toBe(true)
    document.body.removeChild(input)
  })

  test('unmount 시 리스너가 해제된다', () => {
    const { unmount } = renderHook(() => useKeyPress('Shift'))
    unmount()
    // After unmount, firing key should not throw or update anything.
    expect(() => fireKey('keydown', 'Shift')).not.toThrow()
  })

  test('ignoreInputs면 contentEditable 요소 안에서도 무시한다', () => {
    const div = document.createElement('div')
    // jsdom은 isContentEditable을 완전히 구현하지 않으므로 명시적으로 정의한다
    Object.defineProperty(div, 'isContentEditable', { value: true, configurable: true })
    document.body.appendChild(div)

    const { result } = renderHook(() => useKeyPress('Enter'))
    act(() => {
      div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    })

    expect(result.current).toBe(false)
    document.body.removeChild(div)
  })
})
