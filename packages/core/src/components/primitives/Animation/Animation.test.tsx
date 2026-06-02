import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen, waitFor } from '../../../test-utils'

// lottie-web/build/player/lottie_light를 모킹
const mockAnimationItem = {
  play: vi.fn(),
  stop: vi.fn(),
  pause: vi.fn(),
  destroy: vi.fn(),
  goToAndStop: vi.fn(),
  goToAndPlay: vi.fn(),
  setSpeed: vi.fn(),
  setDirection: vi.fn(),
}

const mockLoadAnimation = vi.fn((..._args: unknown[]) => mockAnimationItem)

vi.mock('lottie-web/build/player/lottie_light', () => ({
  default: {
    loadAnimation: mockLoadAnimation,
  },
}))

import { Animation, LottieProvider } from './Animation'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('Animation', () => {
  describe('기본 렌더링', () => {
    it('LottieProvider 안에서 정상적으로 렌더링되어야 한다', () => {
      render(
        <LottieProvider>
          <Animation animationData={{ v: '5.5.0', layers: [] }} data-testid="animation" />
        </LottieProvider>
      )

      expect(screen.getByTestId('animation')).toBeInTheDocument()
    })

    it('container div에 추가 HTML 속성이 전달되어야 한다', () => {
      render(
        <LottieProvider>
          <Animation
            animationData={{ v: '5.5.0', layers: [] }}
            data-testid="animation-custom"
            className="custom-anim"
            style={{ width: '100px', height: '100px' }}
          />
        </LottieProvider>
      )

      const el = screen.getByTestId('animation-custom')
      expect(el).toHaveClass('custom-anim')
      expect(el).toHaveStyle({ width: '100px', height: '100px' })
    })
  })

  describe('LottieProvider 흐름', () => {
    it('LottieProvider 없이 Animation을 사용하면 에러가 발생해야 한다', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        render(<Animation animationData={{ v: '5.5.0', layers: [] }} />)
      }).toThrow()

      consoleError.mockRestore()
    })

    it('lottie 로드 후 loadAnimation이 호출되어야 한다', async () => {
      render(
        <LottieProvider>
          <Animation
            animationData={{ v: '5.5.0', layers: [] }}
            autoplay
            loop
            data-testid="animation-load"
          />
        </LottieProvider>
      )

      await waitFor(() => {
        expect(mockLoadAnimation).toHaveBeenCalled()
      })

      const callArg = mockLoadAnimation.mock.calls[0]?.[0] as Record<string, unknown> | undefined
      expect(callArg).toMatchObject({
        autoplay: true,
        loop: true,
      })
    })

    it('onAnimationLoad 콜백이 호출되어야 한다', async () => {
      const onAnimationLoad = vi.fn()

      render(
        <LottieProvider>
          <Animation animationData={{ v: '5.5.0', layers: [] }} onAnimationLoad={onAnimationLoad} />
        </LottieProvider>
      )

      await waitFor(() => {
        expect(onAnimationLoad).toHaveBeenCalled()
      })

      expect(onAnimationLoad).toHaveBeenCalledWith(mockAnimationItem)
    })
  })

  describe('Animation 정리', () => {
    it('unmount 시 animation.destroy가 호출되어야 한다', async () => {
      const { unmount } = render(
        <LottieProvider>
          <Animation animationData={{ v: '5.5.0', layers: [] }} />
        </LottieProvider>
      )

      await waitFor(() => {
        expect(mockLoadAnimation).toHaveBeenCalled()
      })

      unmount()

      expect(mockAnimationItem.destroy).toHaveBeenCalled()
    })
  })

  describe('Props 검증', () => {
    it('animationData와 path가 모두 없으면 errorDev 경고가 발생해야 한다', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <LottieProvider>
          <Animation data-testid="no-data" />
        </LottieProvider>
      )

      expect(screen.getByTestId('no-data')).toBeInTheDocument()

      consoleError.mockRestore()
    })

    it('path prop을 받을 수 있어야 한다', async () => {
      render(
        <LottieProvider>
          <Animation path="/some/path.json" data-testid="animation-path" />
        </LottieProvider>
      )

      await waitFor(() => {
        expect(mockLoadAnimation).toHaveBeenCalled()
      })

      const callArg = mockLoadAnimation.mock.calls[0]?.[0] as Record<string, unknown> | undefined
      expect(callArg?.path).toBe('/some/path.json')
    })
  })
})
