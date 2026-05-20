import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '../../../test-utils'

import {
  BorderLayer,
  ContainerLayer,
  ContentLayer,
  ShapeLayer,
  StateLayer,
  layerThemeToStyle,
} from './Layer'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Layer', () => {
  describe('ContainerLayer', () => {
    it('기본 렌더링되어야 한다', () => {
      render(
        <ContainerLayer data-testid="container">
          <span>Content</span>
        </ContainerLayer>
      )

      expect(screen.getByTestId('container')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('as prop으로 다른 HTML 요소로 렌더링할 수 있어야 한다', () => {
      render(
        <ContainerLayer as="section" data-testid="container-section">
          Content
        </ContainerLayer>
      )

      const el = screen.getByTestId('container-section')
      expect(el.tagName.toLowerCase()).toBe('section')
    })

    it('ref를 전달할 수 있어야 한다', () => {
      const ref = createRef<HTMLElement>()

      render(
        <ContainerLayer ref={ref} data-testid="container-ref">
          Content
        </ContainerLayer>
      )

      expect(ref.current).not.toBeNull()
    })

    it('custom className이 적용되어야 한다', () => {
      render(
        <ContainerLayer className="custom-container" data-testid="container-class">
          Content
        </ContainerLayer>
      )

      expect(screen.getByTestId('container-class')).toHaveClass('custom-container')
    })
  })

  describe('ContentLayer', () => {
    it('기본 렌더링되어야 한다', () => {
      render(
        <ContentLayer data-testid="content">
          <span>Inner</span>
        </ContentLayer>
      )

      expect(screen.getByTestId('content')).toBeInTheDocument()
      expect(screen.getByText('Inner')).toBeInTheDocument()
    })

    it('direction="vertical"이면 flex-direction이 column이어야 한다', () => {
      render(
        <ContentLayer direction="vertical" data-testid="content-vertical">
          <span>A</span>
        </ContentLayer>
      )

      const el = screen.getByTestId('content-vertical')
      expect(el).toHaveStyle({ flexDirection: 'column' })
    })

    it('arrangement="space-between"이면 justifyContent가 space-between이어야 한다', () => {
      render(
        <ContentLayer arrangement="space-between" data-testid="content-arrangement">
          <span>A</span>
        </ContentLayer>
      )

      const el = screen.getByTestId('content-arrangement')
      expect(el).toHaveStyle({ justifyContent: 'space-between' })
      expect(el).toHaveAttribute('data-arrangement', 'space-between')
    })

    it('ref를 전달할 수 있어야 한다', () => {
      const ref = createRef<HTMLDivElement>()

      render(
        <ContentLayer ref={ref} data-testid="content-ref">
          <span>X</span>
        </ContentLayer>
      )

      expect(ref.current).not.toBeNull()
    })
  })

  describe('BorderLayer', () => {
    it('기본 렌더링되어야 한다', () => {
      const { container } = render(<BorderLayer className="custom-border" />)

      const border = container.querySelector('.custom-border')
      expect(border).toBeInTheDocument()
    })
  })

  describe('StateLayer', () => {
    it('기본 렌더링되어야 한다', () => {
      const { container } = render(<StateLayer className="custom-state" />)

      const state = container.querySelector('.custom-state')
      expect(state).toBeInTheDocument()
    })
  })

  describe('ShapeLayer', () => {
    it('기본 렌더링되어야 한다', () => {
      render(<ShapeLayer data-testid="shape" />)

      expect(screen.getByTestId('shape')).toBeInTheDocument()
    })
  })

  describe('layerThemeToStyle', () => {
    it('theme이 없으면 빈 객체를 반환해야 한다', () => {
      expect(layerThemeToStyle()).toEqual({})
    })

    it('borderWidth, borderColor 등을 CSS variable로 변환해야 한다', () => {
      const style = layerThemeToStyle({
        borderWidth: '1px',
        borderColor: 'red',
        fill: 'blue',
      }) as Record<string, string>

      expect(style['--layer-border-width']).toBe('1px')
      expect(style['--layer-border-color']).toBe('red')
      expect(style['--layer-fill']).toBe('blue')
    })

    it('elevation은 zIndex로 변환되어야 한다', () => {
      const style = layerThemeToStyle({ elevation: '10' }) as Record<string, string>
      expect(style.zIndex).toBe('10')
    })

    it('falsy 값은 포함되지 않아야 한다', () => {
      const style = layerThemeToStyle({ borderWidth: undefined, fill: 'red' }) as Record<
        string,
        string
      >
      expect('--layer-border-width' in style).toBe(false)
      expect(style['--layer-fill']).toBe('red')
    })
  })

  describe('스택 동작', () => {
    it('ContainerLayer 안에 여러 Layer를 중첩할 수 있어야 한다', () => {
      render(
        <ContainerLayer data-testid="stack-container">
          <BorderLayer className="border-x" />
          <StateLayer className="state-x" />
          <ContentLayer data-testid="stack-content">
            <span>Hello</span>
          </ContentLayer>
        </ContainerLayer>
      )

      const container = screen.getByTestId('stack-container')
      expect(container).toBeInTheDocument()
      expect(container.querySelector('.border-x')).toBeInTheDocument()
      expect(container.querySelector('.state-x')).toBeInTheDocument()
      expect(screen.getByText('Hello')).toBeInTheDocument()
    })
  })
})
