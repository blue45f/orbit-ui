import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useScrollLock } from './useScrollLock'

describe('useScrollLock', () => {
  beforeEach(() => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })

  afterEach(() => {
    cleanup()
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })

  test('마운트 시 body overflow가 hidden으로 설정된다', () => {
    renderHook(() => useScrollLock())
    expect(document.body.style.overflow).toBe('hidden')
  })

  test('unmount 시 원래 overflow가 복원된다', () => {
    document.body.style.overflow = 'auto'
    const { unmount } = renderHook(() => useScrollLock())

    expect(document.body.style.overflow).toBe('hidden')

    unmount()

    expect(document.body.style.overflow).toBe('auto')
  })

  test('enabled=false이면 overflow를 건드리지 않는다', () => {
    document.body.style.overflow = 'visible'
    renderHook(() => useScrollLock({ enabled: false }))

    expect(document.body.style.overflow).toBe('visible')
  })

  test('preserveScrollbarGap=false면 padding-right를 적용하지 않는다', () => {
    renderHook(() => useScrollLock({ preserveScrollbarGap: false }))

    expect(document.body.style.paddingRight).toBe('')
  })

  test('enabled toggle 시 잠금이 켜졌다 꺼졌다 한다', () => {
    document.body.style.overflow = 'scroll'

    const { rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useScrollLock({ enabled }),
      { initialProps: { enabled: true } },
    )
    expect(document.body.style.overflow).toBe('hidden')

    rerender({ enabled: false })
    expect(document.body.style.overflow).toBe('scroll')

    rerender({ enabled: true })
    expect(document.body.style.overflow).toBe('hidden')
  })

  test('원래 paddingRight 값이 복원된다', () => {
    document.body.style.paddingRight = '12px'
    const { unmount } = renderHook(() => useScrollLock())

    unmount()

    expect(document.body.style.paddingRight).toBe('12px')
  })
})
