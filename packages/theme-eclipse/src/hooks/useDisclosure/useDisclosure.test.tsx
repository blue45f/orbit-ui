import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useDisclosure } from './useDisclosure'

describe('useDisclosure', () => {
  afterEach(() => cleanup())

  test('기본값은 닫힘(false) 상태다', () => {
    const { result } = renderHook(() => useDisclosure())
    expect(result.current.isOpen).toBe(false)
  })

  test('defaultIsOpen=true이면 초기 상태가 열림이다', () => {
    const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }))
    expect(result.current.isOpen).toBe(true)
  })

  test('onOpen은 열림으로, onClose는 닫힘으로 전환한다', () => {
    const { result } = renderHook(() => useDisclosure())

    act(() => result.current.onOpen())
    expect(result.current.isOpen).toBe(true)

    act(() => result.current.onClose())
    expect(result.current.isOpen).toBe(false)
  })

  test('onToggle은 현재 상태를 반전한다', () => {
    const { result } = renderHook(() => useDisclosure())

    act(() => result.current.onToggle())
    expect(result.current.isOpen).toBe(true)

    act(() => result.current.onToggle())
    expect(result.current.isOpen).toBe(false)
  })

  test('onOpenChange 콜백이 상태 변경마다 호출된다', () => {
    const onOpenChange = vi.fn()
    const { result } = renderHook(() => useDisclosure({ onOpenChange }))

    act(() => result.current.onOpen())
    expect(onOpenChange).toHaveBeenCalledWith(true)

    act(() => result.current.onClose())
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  test('onOpen·onClose 콜백이 의미별로 호출된다', () => {
    const onOpen = vi.fn()
    const onClose = vi.fn()
    const { result } = renderHook(() => useDisclosure({ onOpen, onClose }))

    act(() => result.current.onOpen())
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()

    act(() => result.current.onClose())
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('제어 모드: isOpen 외부 값이 우선하고 내부 상태는 무시된다', () => {
    const onOpenChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ isOpen }: { isOpen: boolean }) => useDisclosure({ isOpen, onOpenChange }),
      { initialProps: { isOpen: false } }
    )

    expect(result.current.isOpen).toBe(false)

    rerender({ isOpen: true })
    expect(result.current.isOpen).toBe(true)
  })

  test('제어 모드에서 onOpen 호출 시 내부 상태는 변경되지 않고 콜백만 호출된다', () => {
    const onOpenChange = vi.fn()
    const { result } = renderHook(() => useDisclosure({ isOpen: false, onOpenChange }))

    act(() => result.current.onOpen())

    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(result.current.isOpen).toBe(false) // 부모가 isOpen을 갱신하지 않으면 그대로
  })

  test('getTriggerProps가 aria-expanded와 onClick을 반환한다', () => {
    const { result } = renderHook(() => useDisclosure())

    const triggerProps = result.current.getTriggerProps()
    expect(triggerProps['aria-expanded']).toBe(false)
    expect(triggerProps.onClick).toBeTypeOf('function')
    expect(triggerProps['aria-controls']).toBeUndefined()

    act(() => triggerProps.onClick())
    expect(result.current.isOpen).toBe(true)
  })

  test('getTriggerProps에 id 전달 시 aria-controls가 포함된다', () => {
    const { result } = renderHook(() => useDisclosure())

    const triggerProps = result.current.getTriggerProps('panel-1')
    expect(triggerProps['aria-controls']).toBe('panel-1')
  })

  test('getDisclosureProps는 닫힘 상태에서 hidden=true를 반환한다', () => {
    const { result } = renderHook(() => useDisclosure())

    expect(result.current.getDisclosureProps().hidden).toBe(true)

    act(() => result.current.onOpen())
    expect(result.current.getDisclosureProps().hidden).toBe(false)
  })

  test('getDisclosureProps에 id 전달 시 id가 포함된다', () => {
    const { result } = renderHook(() => useDisclosure())

    expect(result.current.getDisclosureProps('panel-1').id).toBe('panel-1')
  })

  test('연속 상태 변경이 안정적으로 반영된다', () => {
    const { result } = renderHook(() => useDisclosure())

    act(() => {
      result.current.onOpen()
    })
    act(() => {
      result.current.onClose()
    })
    act(() => {
      result.current.onToggle()
    })

    expect(result.current.isOpen).toBe(true)
  })
})
