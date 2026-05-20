import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { SpeechBadge } from './SpeechBadge'

afterEach(() => cleanup())

describe('SpeechBadge', () => {
  test('children을 포함하여 렌더된다', () => {
    render(<SpeechBadge>안녕하세요</SpeechBadge>)
    expect(screen.getByText('안녕하세요')).toBeInTheDocument()
  })

  test('color variants 모두 충돌 없이 렌더된다', () => {
    const colors = ['pink', 'blue'] as const
    colors.forEach((color) => {
      const { unmount } = render(<SpeechBadge color={color}>msg</SpeechBadge>)
      expect(screen.getByText('msg')).toBeInTheDocument()
      unmount()
    })
  })

  test('tailPosition variants 모두 충돌 없이 렌더된다', () => {
    const positions = ['leading', 'trailing'] as const
    positions.forEach((pos) => {
      const { unmount } = render(
        <SpeechBadge color="pink" tailPosition={pos}>
          hello
        </SpeechBadge>
      )
      expect(screen.getByText('hello')).toBeInTheDocument()
      unmount()
    })
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<SpeechBadge ref={ref}>msg</SpeechBadge>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
