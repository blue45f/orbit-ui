import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useDocumentTitle } from './useDocumentTitle'

describe('useDocumentTitle', () => {
  let originalTitle: string

  beforeEach(() => {
    originalTitle = document.title
    document.title = 'Default Title'
  })

  afterEach(() => {
    cleanup()
    document.title = originalTitle
  })

  test('마운트 시 document.title이 설정된다', () => {
    renderHook(() => useDocumentTitle('Page Title'))
    expect(document.title).toBe('Page Title')
  })

  test('rerender로 title이 변경되면 document.title도 갱신된다', () => {
    const { rerender } = renderHook(({ t }: { t: string }) => useDocumentTitle(t), {
      initialProps: { t: 'A' },
    })
    expect(document.title).toBe('A')

    rerender({ t: 'B' })
    expect(document.title).toBe('B')
  })

  test('unmount 시 이전 title로 복원된다 (기본)', () => {
    const { unmount } = renderHook(() => useDocumentTitle('Temp'))
    expect(document.title).toBe('Temp')

    unmount()
    expect(document.title).toBe('Default Title')
  })

  test('restoreOnUnmount=false면 복원되지 않는다', () => {
    const { unmount } = renderHook(() => useDocumentTitle('Sticky', { restoreOnUnmount: false }))
    expect(document.title).toBe('Sticky')

    unmount()
    expect(document.title).toBe('Sticky')
  })
})
