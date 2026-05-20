import { afterEach, describe, expect, test, vi } from 'vitest'

import { render, cleanup } from '../../test-utils'

import { Space } from './Space'

afterEach(() => cleanup())

describe('Space', () => {
  test('x prop을 지정하면 렌더된다', () => {
    const { container } = render(<Space x="200" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('y prop을 지정하면 렌더된다', () => {
    const { container } = render(<Space y="200" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('x와 y 둘다 없으면 null을 반환하고 dev 에러를 출력한다', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { container } = render(<Space />)
    expect(container.firstChild).toBeNull()
    errorSpy.mockRestore()
  })

  test('x prop과 y prop 결과의 outerHTML이 다르다', () => {
    const { container, rerender } = render(<Space x="200" />)
    const before = (container.firstChild as HTMLElement)?.outerHTML

    rerender(<Space y="200" />)
    const after = (container.firstChild as HTMLElement)?.outerHTML
    expect(after).not.toBe(before)
  })
})
