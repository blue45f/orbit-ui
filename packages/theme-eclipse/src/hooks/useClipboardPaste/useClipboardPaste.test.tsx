import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useClipboardPaste } from './useClipboardPaste'

function dispatchPasteEvent(text: string, files: File[] = []) {
  const dataTransfer = {
    getData: (type: string) => (type === 'text/plain' ? text : ''),
    files: {
      [Symbol.iterator]: function* () {
        yield* files
      },
      length: files.length,
    },
  }

  const event = new Event('paste') as ClipboardEvent
  Object.defineProperty(event, 'clipboardData', {
    value: dataTransfer,
    writable: false,
  })

  act(() => {
    document.dispatchEvent(event)
  })
}

describe('useClipboardPaste', () => {
  afterEach(() => cleanup())

  it('초기 상태는 빈 text와 빈 files 배열이다', () => {
    const { result } = renderHook(() => useClipboardPaste())
    expect(result.current.text).toBe('')
    expect(result.current.files).toEqual([])
  })

  it('paste 이벤트 발생 시 text 를 업데이트한다', () => {
    const { result } = renderHook(() => useClipboardPaste())

    dispatchPasteEvent('hello world')

    expect(result.current.text).toBe('hello world')
    expect(result.current.files).toEqual([])
  })

  it('paste 이벤트 발생 시 onPaste 콜백을 호출한다', () => {
    const onPaste = vi.fn()
    renderHook(() => useClipboardPaste({ onPaste }))

    dispatchPasteEvent('test text')

    expect(onPaste).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'test text' }),
    )
  })

  it('paste 이벤트의 파일을 추출한다', () => {
    const file = new File(['content'], 'image.png', { type: 'image/png' })
    const { result } = renderHook(() => useClipboardPaste())

    dispatchPasteEvent('caption', [file])

    expect(result.current.files).toHaveLength(1)
    expect(result.current.files[0].name).toBe('image.png')
    expect(result.current.text).toBe('caption')
  })

  it('clipboardData가 없으면 빈 text/files로 처리한다', () => {
    const { result } = renderHook(() => useClipboardPaste())

    act(() => {
      const event = new Event('paste') as ClipboardEvent
      Object.defineProperty(event, 'clipboardData', { value: null, writable: false })
      document.dispatchEvent(event)
    })

    expect(result.current.text).toBe('')
    expect(result.current.files).toEqual([])
  })
})
