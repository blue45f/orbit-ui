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

  test('role="status"와 aria-live="polite", aria-busy="true"가 부여된다', () => {
    render(<Loading />)
    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status).toHaveAttribute('aria-busy', 'true')
  })

  test('children 없이 기본 aria-label "불러오는 중"이 부여된다', () => {
    render(<Loading />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', '불러오는 중')
  })

  test('aria-label 커스텀이 적용된다', () => {
    render(<Loading aria-label="결제 진행 중" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', '결제 진행 중')
  })

  test('children이 있으면 aria-label은 부여하지 않는다 (시각 라벨이 우선)', () => {
    render(<Loading>업로드 중</Loading>)
    expect(screen.getByRole('status')).not.toHaveAttribute('aria-label')
  })

  test('aria-labelledby 지정 시 외부 라벨을 참조한다', () => {
    render(
      <>
        <span id="loader-label">처리 중</span>
        <Loading aria-labelledby="loader-label" />
      </>
    )
    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-labelledby', 'loader-label')
    expect(status).not.toHaveAttribute('aria-label')
  })
})
