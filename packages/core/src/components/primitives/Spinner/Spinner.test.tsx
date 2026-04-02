import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../../test-utils'

import { Spinner } from './Spinner'

// Animation 컴포넌트를 모킹하여 LottieProvider 의존성 제거
vi.mock('../Animation', () => ({
  Animation: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>{children}</div>
  ),
}))

// Spinner는 lottie JSON을 동적 import하므로 모킹이 필요
vi.mock('./lottie/circle-mint.json', () => ({
  default: { v: '5.5.7', fr: 30, ip: 0, op: 60, w: 100, h: 100, layers: [] },
}))

vi.mock('./lottie/circle-purple.json', () => ({
  default: { v: '5.5.7', fr: 30, ip: 0, op: 60, w: 100, h: 100, layers: [] },
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
      render(<Spinner aria-label='로딩 중' />)

      await waitFor(() => {
        const spinner = screen.getByLabelText('로딩 중')
        expect(spinner).toBeInTheDocument()
      })
    })

    it('aria-live="polite" 속성이 설정되어야 한다', async () => {
      render(<Spinner data-testid='spinner' />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner')
        expect(spinner).toHaveAttribute('aria-live', 'polite')
      })
    })
  })

  describe('크기', () => {
    it('기본 크기가 28px이어야 한다', async () => {
      render(<Spinner data-testid='spinner-default' />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner-default')
        expect(spinner).toHaveStyle({ width: '28px', height: '28px' })
      })
    })

    it('커스텀 크기를 설정할 수 있어야 한다', async () => {
      render(<Spinner size={48} data-testid='spinner-custom' />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner-custom')
        expect(spinner).toHaveStyle({ width: '48px', height: '48px' })
      })
    })
  })

  describe('색상', () => {
    it('기본 색상은 mint이어야 한다', async () => {
      render(<Spinner data-testid='spinner-mint' />)

      await waitFor(() => {
        expect(screen.getByTestId('spinner-mint')).toBeInTheDocument()
      })
    })

    it('purple 색상을 설정할 수 있어야 한다', async () => {
      render(<Spinner color='purple' data-testid='spinner-purple' />)

      await waitFor(() => {
        expect(screen.getByTestId('spinner-purple')).toBeInTheDocument()
      })
    })
  })

  describe('추가 props', () => {
    it('추가 HTML 속성을 전달할 수 있어야 한다', async () => {
      render(<Spinner data-testid='spinner-extra' className='custom-class' />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner-extra')
        expect(spinner).toBeInTheDocument()
      })
    })

    it('커스텀 style을 전달할 수 있어야 한다', async () => {
      render(<Spinner data-testid='spinner-style' style={{ opacity: 0.5 }} />)

      await waitFor(() => {
        const spinner = screen.getByTestId('spinner-style')
        expect(spinner).toHaveStyle({ opacity: '0.5' })
      })
    })
  })
})
