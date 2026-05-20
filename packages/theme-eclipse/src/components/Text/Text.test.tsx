import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { Text, Typography } from './'

afterEach(() => cleanup())

describe('Text', () => {
  test('children 텍스트를 렌더한다', () => {
    render(<Text>Hello</Text>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  test('as prop으로 태그를 변경할 수 있다', () => {
    render(<Text as="p">Paragraph</Text>)
    const el = screen.getByText('Paragraph')
    expect(el.tagName.toLowerCase()).toBe('p')
  })

  test('textStyle prop에 따라 outerHTML이 달라진다', () => {
    const { rerender } = render(<Text textStyle="bodyMedium">x</Text>)
    const before = screen.getByText('x').outerHTML

    rerender(<Text textStyle="titleLarge">x</Text>)
    const after = screen.getByText('x').outerHTML
    expect(after).not.toBe(before)
  })

  test('Typography는 Text의 별칭이다', () => {
    expect(Typography).toBe(Text)
  })
})
