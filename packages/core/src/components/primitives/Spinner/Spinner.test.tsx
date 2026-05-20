import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../../test-utils'

import { Spinner } from './Spinner'

// Animation 컴포넌트를 모킹하여 LottieProvider 의존성 제거
// Animation 전용 props(animationData, autoplay, loop, name, path, onAnimationLoad)는
// DOM으로 흘러가지 않도록 필터링
vi.mock('../Animation', () => ({
  Animation: ({
    children,
    animationData: _animationData,
    autoplay: _autoplay,
    loop: _loop,
    name: _name,
    path: _path,
    onAnimationLoad: _onAnimationLoad,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & {
    animationData?: unknown
    autoplay?: boolean
    loop?: boolean | number
    name?: string
    path?: string
    onAnimationLoad?: (animation: unknown) => void
  }) => <div {...props}>{children}</div>,
}))

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Spinner', () => {
  describe('기본 렌더링', () => {
    it('기본 aria-label이 설정되어야 한다', async () => {
      render(<Spinner />)

      await waitFor(() => {
        const spinner = screen.getByLabelText('화면을 불러오는 중입니다.')
        expect(spinner).toBeInTheDocument()
      })
    })

    it('커스텀 aria-label을 설정할 수 있어야 한다', async () => {
      render(<Spinner aria-label="로딩 중" />)

      await waitFor(() => {
        const spinner = screen.getByLabelText('로딩 중')
        expect(spinner).toBeInTheDocument()
      })
    })

    it('aria-live="polite" 속성이 설정되어야 한다', async () => {
      render(<Spinner data-testid="spinner" />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner')
        expect(spinner).toHaveAttribute('aria-live', 'polite')
      })
    })
  })

  describe('크기', () => {
    it('기본 크기가 28px이어야 한다', async () => {
      render(<Spinner data-testid="spinner-default" />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner-default')
        expect(spinner).toHaveStyle({ width: '28px', height: '28px' })
      })
    })

    it('커스텀 크기를 설정할 수 있어야 한다', async () => {
      render(<Spinner size={48} data-testid="spinner-custom" />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner-custom')
        expect(spinner).toHaveStyle({ width: '48px', height: '48px' })
      })
    })
  })

  describe('색상', () => {
    it('기본 색상은 primary이어야 한다', async () => {
      render(<Spinner data-testid="spinner-primary" />)

      await waitFor(() => {
        expect(screen.getByTestId('spinner-primary')).toBeInTheDocument()
      })
    })

    it('purple 색상을 설정할 수 있어야 한다', async () => {
      render(<Spinner color="purple" data-testid="spinner-purple" />)

      await waitFor(() => {
        expect(screen.getByTestId('spinner-purple')).toBeInTheDocument()
      })
    })
  })

  describe('추가 props', () => {
    it('추가 HTML 속성을 전달할 수 있어야 한다', async () => {
      render(<Spinner data-testid="spinner-extra" className="custom-class" />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner-extra')
        expect(spinner).toBeInTheDocument()
      })
    })

    it('커스텀 style을 전달할 수 있어야 한다', async () => {
      render(<Spinner data-testid="spinner-style" style={{ opacity: 0.5 }} />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner-style')
        expect(spinner).toHaveStyle({ opacity: '0.5' })
      })
    })
  })
})
