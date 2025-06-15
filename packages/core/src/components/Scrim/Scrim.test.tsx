import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Scrim } from './Scrim'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Scrim', () => {
  describe('기본 렌더링', () => {
    it('isPresented가 true일 때 렌더링되어야 한다', () => {
      render(<Scrim isPresented={true} data-testid="scrim" />)

      expect(screen.getByTestId('scrim')).toBeInTheDocument()
    })

    it('isPresented가 false일 때 렌더링되지 않아야 한다', () => {
      render(<Scrim isPresented={false} data-testid="scrim" />)

      expect(screen.queryByTestId('scrim')).not.toBeInTheDocument()
    })

    it('defaultIsPresented가 true일 때 렌더링되어야 한다', () => {
      render(<Scrim defaultIsPresented={true} data-testid="scrim-default" />)

      expect(screen.getByTestId('scrim-default')).toBeInTheDocument()
    })

    it('defaultIsPresented가 false일 때 렌더링되지 않아야 한다', () => {
      render(<Scrim defaultIsPresented={false} data-testid="scrim-default" />)

      expect(screen.queryByTestId('scrim-default')).not.toBeInTheDocument()
    })
  })

  describe('제어 모드', () => {
    it('isPresented prop으로 표시 여부를 제어할 수 있어야 한다', () => {
      const { rerender } = render(<Scrim isPresented={false} data-testid="scrim-ctrl" />)

      expect(screen.queryByTestId('scrim-ctrl')).not.toBeInTheDocument()

      rerender(<Scrim isPresented={true} data-testid="scrim-ctrl" />)

      expect(screen.getByTestId('scrim-ctrl')).toBeInTheDocument()
    })
  })

  describe('테마 커스터마이징', () => {
    it('theme.fillColor로 배경색을 커스터마이징할 수 있어야 한다', () => {
      render(
        <Scrim
          isPresented={true}
          data-testid="scrim-themed"
          theme={{ fillColor: 'rgba(0, 0, 0, 0.8)' }}
        />
      )

      const scrim = screen.getByTestId('scrim-themed')
      expect(scrim).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0.8)' })
    })
  })

  describe('스타일 props', () => {
    it('width와 height를 설정할 수 있어야 한다', () => {
      render(<Scrim isPresented={true} data-testid="scrim-size" width={500} height={300} />)

      const scrim = screen.getByTestId('scrim-size')
      expect(scrim).toHaveStyle({ width: '500px', height: '300px' })
    })

    it('elevation으로 z-index를 설정할 수 있어야 한다', () => {
      render(<Scrim isPresented={true} data-testid="scrim-elevation" elevation={'500'} />)

      const scrim = screen.getByTestId('scrim-elevation')
      expect(scrim).toHaveStyle({ zIndex: '500' })
    })

    it('커스텀 style을 전달할 수 있어야 한다', () => {
      render(<Scrim isPresented={true} data-testid="scrim-style" style={{ opacity: 0.7 }} />)

      const scrim = screen.getByTestId('scrim-style')
      expect(scrim).toHaveStyle({ opacity: '0.7' })
    })

    it('커스텀 className을 전달할 수 있어야 한다', () => {
      render(<Scrim isPresented={true} data-testid="scrim-class" className="custom-scrim" />)

      const scrim = screen.getByTestId('scrim-class')
      expect(scrim).toHaveClass('custom-scrim')
    })
  })

  describe('ref 전달', () => {
    it('forwardRef를 통해 ref를 전달할 수 있어야 한다', () => {
      const ref = { current: null }

      render(<Scrim isPresented={true} ref={ref} data-testid="scrim-ref" />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
