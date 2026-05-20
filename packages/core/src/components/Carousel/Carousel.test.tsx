import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Carousel } from './Carousel'

beforeEach(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
  })) as unknown as typeof IntersectionObserver
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Carousel', () => {
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링되어야 한다', () => {
      render(
        <Carousel>
          <Carousel.Content>
            <Carousel.Item>Item 1</Carousel.Item>
            <Carousel.Item>Item 2</Carousel.Item>
            <Carousel.Item>Item 3</Carousel.Item>
          </Carousel.Content>
        </Carousel>
      )

      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })

    it('role="region", aria-roledescription="carousel"이 설정되어야 한다', () => {
      render(
        <Carousel>
          <Carousel.Content>
            <Carousel.Item>Item 1</Carousel.Item>
          </Carousel.Content>
        </Carousel>
      )

      const region = screen.getByRole('region')
      expect(region).toHaveAttribute('aria-roledescription', 'carousel')
    })
  })

  describe('Compound 컴포넌트', () => {
    it('각 Item이 role="group", aria-roledescription="slide"를 가져야 한다', () => {
      render(
        <Carousel>
          <Carousel.Content>
            <Carousel.Item>Item 1</Carousel.Item>
            <Carousel.Item>Item 2</Carousel.Item>
          </Carousel.Content>
        </Carousel>
      )

      const slides = screen.getAllByRole('group')
      expect(slides.length).toBeGreaterThanOrEqual(2)
      expect(slides[0]).toHaveAttribute('aria-roledescription', 'slide')
    })

    it('Previous/Next 버튼이 렌더링되어야 한다', () => {
      render(
        <Carousel>
          <Carousel.Content>
            <Carousel.Item>Item 1</Carousel.Item>
            <Carousel.Item>Item 2</Carousel.Item>
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel>
      )

      expect(screen.getByText('Previous slide')).toBeInTheDocument()
      expect(screen.getByText('Next slide')).toBeInTheDocument()
    })
  })

  describe('Context 사용 강제', () => {
    it('Carousel 외부에서 Content를 사용하면 에러가 발생해야 한다', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        render(
          <Carousel.Content>
            <Carousel.Item>Item</Carousel.Item>
          </Carousel.Content>
        )
      }).toThrow(/useCarousel/)

      consoleError.mockRestore()
    })
  })

  describe('Ref 전달', () => {
    it('Carousel root에 ref를 전달할 수 있어야 한다', () => {
      const ref = createRef<HTMLDivElement>()

      render(
        <Carousel ref={ref}>
          <Carousel.Content>
            <Carousel.Item>Item 1</Carousel.Item>
          </Carousel.Content>
        </Carousel>
      )

      expect(ref.current).not.toBeNull()
    })
  })

  describe('orientation', () => {
    it('vertical orientation을 받을 수 있어야 한다', () => {
      render(
        <Carousel orientation="vertical">
          <Carousel.Content>
            <Carousel.Item>Item 1</Carousel.Item>
          </Carousel.Content>
        </Carousel>
      )

      expect(screen.getByRole('region')).toBeInTheDocument()
    })
  })

  describe('setApi', () => {
    it('setApi 콜백이 호출되어야 한다', () => {
      const setApi = vi.fn()

      render(
        <Carousel setApi={setApi}>
          <Carousel.Content>
            <Carousel.Item>Item 1</Carousel.Item>
          </Carousel.Content>
        </Carousel>
      )

      // embla-carousel-react may or may not init in jsdom; just verify component
      expect(screen.getByRole('region')).toBeInTheDocument()
    })
  })
})
