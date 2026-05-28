import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { cleanup } from '../../test-utils'

import { useFavicon } from './useFavicon'

const findLink = (rel: string) => document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

describe('useFavicon', () => {
  beforeEach(() => {
    document.head.querySelectorAll('link').forEach((l) => l.remove())
  })

  afterEach(() => {
    cleanup()
    document.head.querySelectorAll('link').forEach((l) => l.remove())
  })

  test('rel=icon 인 link 가 없으면 새로 생성한다', () => {
    renderHook(() => useFavicon('/favicon.svg'))
    const link = findLink('icon')
    expect(link).not.toBeNull()
    expect(link?.href).toContain('/favicon.svg')
  })

  test('기존 link 가 있으면 href만 교체한다', () => {
    const existing = document.createElement('link')
    existing.rel = 'icon'
    existing.href = '/old.svg'
    document.head.appendChild(existing)

    renderHook(() => useFavicon('/new.svg'))
    expect(findLink('icon')?.href).toContain('/new.svg')
    // Should be the same node, not a duplicate
    expect(document.querySelectorAll('link[rel="icon"]')).toHaveLength(1)
  })

  test('rel 옵션을 명시하면 그 rel 의 link 를 갱신한다', () => {
    renderHook(() => useFavicon('/apple.png', { rel: 'apple-touch-icon' }))
    expect(findLink('apple-touch-icon')?.href).toContain('/apple.png')
    expect(findLink('icon')).toBeNull()
  })

  test('type 옵션이 link.type 으로 반영된다', () => {
    renderHook(() => useFavicon('/favicon.svg', { type: 'image/svg+xml' }))
    expect(findLink('icon')?.type).toBe('image/svg+xml')
  })

  test('href 가 바뀌면 link 가 다시 업데이트된다', () => {
    const { rerender } = renderHook(({ href }: { href: string }) => useFavicon(href), {
      initialProps: { href: '/a.svg' },
    })
    expect(findLink('icon')?.href).toContain('/a.svg')

    rerender({ href: '/b.svg' })
    expect(findLink('icon')?.href).toContain('/b.svg')
    expect(document.querySelectorAll('link[rel="icon"]')).toHaveLength(1)
  })
})
