import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useClipboard } from './useClipboard'

describe('useClipboard', () => {
  let writeText: ReturnType<typeof vi.fn>

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  test('초기값: hasCopied=false, value=null', () => {
    const { result } = renderHook(() => useClipboard())
    expect(result.current.hasCopied).toBe(false)
    expect(result.current.value).toBeNull()
  })

  test('onCopy 호출 시 navigator.clipboard.writeText가 호출된다', async () => {
    const { result } = renderHook(() => useClipboard())

    await act(async () => {
      await result.current.onCopy('hello')
    })

    expect(writeText).toHaveBeenCalledWith('hello')
  })

  test('복사 성공 시 hasCopied=true, value=text가 된다', async () => {
    const { result } = renderHook(() => useClipboard())

    await act(async () => {
      await result.current.onCopy('test value')
    })

    expect(result.current.hasCopied).toBe(true)
    expect(result.current.value).toBe('test value')
  })

  test('onCopy는 성공 시 true, 실패 시 false를 반환한다', async () => {
    const { result } = renderHook(() => useClipboard())

    let ok: boolean | undefined
    await act(async () => {
      ok = await result.current.onCopy('ok')
    })
    expect(ok).toBe(true)

    writeText.mockRejectedValueOnce(new Error('denied'))
    const originalExecCommand = document.execCommand
    document.execCommand = vi.fn(() => false) as typeof document.execCommand

    await act(async () => {
      ok = await result.current.onCopy('fail')
    })
    expect(ok).toBe(false)

    document.execCommand = originalExecCommand
  })

  test('timeout 후 hasCopied가 자동으로 false로 리셋된다', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const { result } = renderHook(() => useClipboard({ timeout: 1000 }))

    await act(async () => {
      await result.current.onCopy('value')
    })
    expect(result.current.hasCopied).toBe(true)

    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.hasCopied).toBe(false)
  })

  test('timeout=0이면 자동 리셋이 일어나지 않는다', async () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useClipboard({ timeout: 0 }))

    await act(async () => {
      await result.current.onCopy('persistent')
    })
    expect(result.current.hasCopied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(10000)
    })
    expect(result.current.hasCopied).toBe(true)
  })

  test('reset()으로 수동 리셋이 가능하다', async () => {
    const { result } = renderHook(() => useClipboard())

    await act(async () => {
      await result.current.onCopy('value')
    })
    expect(result.current.hasCopied).toBe(true)

    act(() => {
      result.current.reset()
    })
    expect(result.current.hasCopied).toBe(false)
  })

  test('연속 복사 시 마지막 텍스트가 value에 반영된다', async () => {
    const { result } = renderHook(() => useClipboard())

    await act(async () => {
      await result.current.onCopy('first')
    })
    await act(async () => {
      await result.current.onCopy('second')
    })

    expect(result.current.value).toBe('second')
  })

  test('writeText 실패 시 execCommand 폴백을 시도한다', async () => {
    writeText.mockRejectedValueOnce(new Error('blocked'))
    const execCommand = vi.fn(() => true) as typeof document.execCommand
    document.execCommand = execCommand

    const { result } = renderHook(() => useClipboard())
    let ok: boolean | undefined
    await act(async () => {
      ok = await result.current.onCopy('fallback')
    })

    expect(execCommand).toHaveBeenCalledWith('copy')
    expect(ok).toBe(true)
    expect(result.current.value).toBe('fallback')
  })
})
