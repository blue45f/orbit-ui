import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { Loading } from './Loading'

afterEach(() => cleanup())

describe('Loading', () => {
  test('렌더된다', () => {
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('children 메시지가 렌더된다', () => {
    render(<Loading>로딩 중...</Loading>)
    expect(screen.getByText('로딩 중...')).toBeInTheDocument()
  })

  test('size variants 모두 충돌 없이 렌더된다', () => {
    const sizes = ['small', 'large'] as const
    sizes.forEach((size) => {
      const { unmount, container } = render(<Loading size={size}>x</Loading>)
      expect(container.firstChild).toBeInTheDocument()
      unmount()
    })
  })

  test('fullScreen prop이 fixed 클래스를 추가한다', () => {
    const { container } = render(<Loading fullScreen>로딩</Loading>)
    expect(container.firstChild).toHaveClass('fixed')
  })

  test('className이 병합된다', () => {
    const { container } = render(<Loading className="custom-loader" />)
    expect(container.firstChild).toHaveClass('custom-loader')
  })
})
