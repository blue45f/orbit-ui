import { act, fireEvent, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useFocusVisible } from './useFocusVisible'

describe('useFocusVisible', () => {
  afterEach(() => cleanup())

  test('초기 상태는 false', () => {
    const { result } = renderHook(() => useFocusVisible())
    expect(result.current.isFocusVisible).toBe(false)
  })

  test('keydown → focusin 순서면 isFocusVisible=true', () => {
    const { result } = renderHook(() => useFocusVisible())

    act(() => {
      fireEvent.keyDown(document, { key: 'Tab' })
      fireEvent.focusIn(document)
    })

    expect(result.current.isFocusVisible).toBe(true)
  })

  test('mousedown → focusin 순서면 isFocusVisible=false', () => {
    const { result } = renderHook(() => useFocusVisible())

    act(() => {
      fireEvent.mouseDown(document)
      fireEvent.focusIn(document)
    })

    expect(result.current.isFocusVisible).toBe(false)
  })

  test('focusout 시 isFocusVisible이 false로 리셋된다', () => {
    const { result } = renderHook(() => useFocusVisible())

    act(() => {
      fireEvent.keyDown(document, { key: 'Tab' })
      fireEvent.focusIn(document)
    })
    expect(result.current.isFocusVisible).toBe(true)

    act(() => {
      fireEvent.focusOut(document)
    })

    expect(result.current.isFocusVisible).toBe(false)
  })

  test('modifier 키 단독으로는 모드를 키보드로 바꾸지 않는다 (Cmd+Tab 등)', () => {
    const { result } = renderHook(() => useFocusVisible())

    act(() => {
      fireEvent.keyDown(document, { key: 'Tab', metaKey: true })
      fireEvent.focusIn(document)
    })

    expect(result.current.isFocusVisible).toBe(false)
  })

  test('touchstart도 pointer modality로 인식한다', () => {
    const { result } = renderHook(() => useFocusVisible())

    act(() => {
      fireEvent.keyDown(document, { key: 'Tab' })
    })

    act(() => {
      fireEvent.touchStart(document)
      fireEvent.focusIn(document)
    })

    expect(result.current.isFocusVisible).toBe(false)
  })

  test('ctrlKey 단독으로는 키보드 모드를 설정하지 않는다', () => {
    const { result } = renderHook(() => useFocusVisible())

    act(() => {
      fireEvent.keyDown(document, { key: 'Control', ctrlKey: true })
      fireEvent.focusIn(document)
    })

    expect(result.current.isFocusVisible).toBe(false)
  })

  test('altKey 단독으로는 키보드 모드를 설정하지 않는다', () => {
    const { result } = renderHook(() => useFocusVisible())

    act(() => {
      fireEvent.keyDown(document, { key: 'Alt', altKey: true })
      fireEvent.focusIn(document)
    })

    expect(result.current.isFocusVisible).toBe(false)
  })

  test('pointerdown 이벤트는 키보드 모드를 초기화한다', () => {
    const { result } = renderHook(() => useFocusVisible())

    act(() => {
      fireEvent.keyDown(document, { key: 'Tab' })
    })
    expect(result.current.isFocusVisible).toBe(false) // No focus yet

    act(() => {
      fireEvent.pointerDown(document)
      fireEvent.focusIn(document)
    })

    expect(result.current.isFocusVisible).toBe(false)
  })
})
