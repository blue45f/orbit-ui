import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useHotkey } from './useHotkey'

function dispatchKey(
  key: string,
  modifiers: { ctrl?: boolean; meta?: boolean; shift?: boolean; alt?: boolean } = {},
  target: EventTarget = window
) {
  const event = new KeyboardEvent('keydown', {
    key,
    ctrlKey: modifiers.ctrl,
    metaKey: modifiers.meta,
    shiftKey: modifiers.shift,
    altKey: modifiers.alt,
    bubbles: true,
    cancelable: true,
  })
  target.dispatchEvent(event)
  return event
}

describe('useHotkey', () => {
  afterEach(() => cleanup())

  test('단일 키 매치 시 핸들러가 호출된다', () => {
    const handler = vi.fn()
    renderHook(() => useHotkey('escape', handler))

    dispatchKey('Escape')

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('수정자 키만 다르면 매치되지 않는다', () => {
    const handler = vi.fn()
    renderHook(() => useHotkey('escape', handler))

    dispatchKey('Escape', { shift: true })

    expect(handler).not.toHaveBeenCalled()
  })

  test('shift+enter 같은 조합이 정확히 매치된다', () => {
    const handler = vi.fn()
    renderHook(() => useHotkey('shift+enter', handler))

    dispatchKey('Enter', { shift: true })
    expect(handler).toHaveBeenCalledTimes(1)

    dispatchKey('Enter')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('ctrl+k가 ctrl 없이 호출되면 매치되지 않는다', () => {
    const handler = vi.fn()
    renderHook(() => useHotkey('ctrl+k', handler))

    dispatchKey('k')
    expect(handler).not.toHaveBeenCalled()

    dispatchKey('k', { ctrl: true })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('disabled=true면 매치해도 무시한다', () => {
    const handler = vi.fn()
    renderHook(() => useHotkey('escape', handler, { disabled: true }))

    dispatchKey('Escape')

    expect(handler).not.toHaveBeenCalled()
  })

  test('input에 포커스 있을 때는 기본 무시한다', () => {
    const handler = vi.fn()
    const input = document.createElement('input')
    document.body.appendChild(input)
    renderHook(() => useHotkey('escape', handler))

    dispatchKey('Escape', {}, input)
    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(input)
  })

  test('textarea에 포커스 있을 때도 기본 무시한다', () => {
    const handler = vi.fn()
    const ta = document.createElement('textarea')
    document.body.appendChild(ta)
    renderHook(() => useHotkey('escape', handler))

    dispatchKey('Escape', {}, ta)
    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(ta)
  })

  test('ignoreInputs=false면 input에서도 호출된다', () => {
    const handler = vi.fn()
    const input = document.createElement('input')
    document.body.appendChild(input)
    renderHook(() => useHotkey('escape', handler, { ignoreInputs: false }))

    dispatchKey('Escape', {}, input)
    expect(handler).toHaveBeenCalledTimes(1)

    document.body.removeChild(input)
  })

  test('preventDefault=true(기본)이면 이벤트가 cancel된다', () => {
    const handler = vi.fn()
    renderHook(() => useHotkey('escape', handler))

    const event = dispatchKey('Escape')

    expect(event.defaultPrevented).toBe(true)
  })

  test('preventDefault=false면 이벤트가 cancel되지 않는다', () => {
    const handler = vi.fn()
    renderHook(() => useHotkey('escape', handler, { preventDefault: false }))

    const event = dispatchKey('Escape')

    expect(event.defaultPrevented).toBe(false)
  })

  test('handler 갱신 시 항상 최신 함수가 호출된다', () => {
    let received: KeyboardEvent | null = null
    const { rerender } = renderHook(
      ({ id }: { id: number }) => {
        useHotkey('escape', () => {
          received = { ...({} as KeyboardEvent), key: `id-${id}` }
        })
      },
      { initialProps: { id: 1 } }
    )

    dispatchKey('Escape')
    expect((received as KeyboardEvent | null)?.key).toBe('id-1')

    rerender({ id: 2 })

    dispatchKey('Escape')
    expect((received as KeyboardEvent | null)?.key).toBe('id-2')
  })

  // 수정자 별칭/매핑 분기: cmd→meta, alt/option/opt→alt, control→ctrl, mod→ctrl(비-Mac)
  test.each<[string, { ctrl?: boolean; meta?: boolean; shift?: boolean; alt?: boolean }]>([
    ['cmd+k', { meta: true }],
    ['alt+k', { alt: true }],
    ['option+k', { alt: true }],
    ['opt+k', { alt: true }],
    ['control+k', { ctrl: true }],
    ['mod+k', { ctrl: true }],
  ])('수정자 별칭 조합 %s 가 올바른 수정자로 매치된다', (combo, mods) => {
    const handler = vi.fn()
    renderHook(() => useHotkey(combo, handler))

    dispatchKey('k', mods)

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('select 요소에 포커스 있을 때는 기본 무시한다', () => {
    const handler = vi.fn()
    const select = document.createElement('select')
    document.body.appendChild(select)
    renderHook(() => useHotkey('escape', handler))

    dispatchKey('Escape', {}, select)
    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(select)
  })

  test('contentEditable 요소에 포커스 있을 때는 기본 무시한다', () => {
    const handler = vi.fn()
    const div = document.createElement('div')
    Object.defineProperty(div, 'isContentEditable', { value: true, configurable: true })
    document.body.appendChild(div)
    renderHook(() => useHotkey('escape', handler))

    dispatchKey('Escape', {}, div)
    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(div)
  })
})
