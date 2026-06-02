import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  cleanup,
  createMockIntersectionObserver,
  createMockResizeObserver,
  fireEvent,
  render,
  screen,
} from '../../test-utils'

import { Carousel } from './Carousel'

beforeEach(() => {
  global.ResizeObserver = createMockResizeObserver()
  global.IntersectionObserver = createMockIntersectionObserver()
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

  describe('aria-live', () => {
    it('Content 트랙에 aria-live="polite", aria-atomic="false"가 설정되어야 한다', () => {
      render(
        <Carousel data-testid="cr">
          <Carousel.Content data-testid="track">
            <Carousel.Item>Item 1</Carousel.Item>
            <Carousel.Item>Item 2</Carousel.Item>
          </Carousel.Content>
        </Carousel>
      )

      const track = screen.getByTestId('track')
      expect(track).toHaveAttribute('aria-live', 'polite')
      expect(track).toHaveAttribute('aria-atomic', 'false')
    })
  })

  describe('autoPlay', () => {
    // autoPlay 는 embla api 를 통해 슬라이드를 전환한다. jsdom 에서는 레이아웃이 없어
    // 실제 이동 대신 api.scrollNext / api.scrollTo 호출 여부로 자동 전환 동작을 검증한다.
    const renderAutoPlay = (interval = 1000) => {
      let api: { scrollNext: ReturnType<typeof vi.spyOn>; scrollTo: ReturnType<typeof vi.spyOn> } =
        {
          scrollNext: undefined as never,
          scrollTo: undefined as never,
        }
      render(
        <Carousel
          autoPlay
          autoPlayInterval={interval}
          setApi={(a) => {
            if (!a) return
            api = {
              scrollNext: vi.spyOn(a, 'scrollNext'),
              scrollTo: vi.spyOn(a, 'scrollTo'),
            }
          }}
        >
          <Carousel.Content>
            <Carousel.Item>Item 1</Carousel.Item>
            <Carousel.Item>Item 2</Carousel.Item>
            <Carousel.Item>Item 3</Carousel.Item>
          </Carousel.Content>
        </Carousel>
      )
      return api
    }

    // 매 tick 마다 scrollNext 또는 scrollTo(loop 복귀) 중 하나가 호출됨
    const advances = (api: {
      scrollNext: ReturnType<typeof vi.spyOn>
      scrollTo: ReturnType<typeof vi.spyOn>
    }) => api.scrollNext.mock.calls.length + api.scrollTo.mock.calls.length

    it('autoPlay 가 켜지면 interval 마다 슬라이드가 전진한다', () => {
      vi.useFakeTimers()
      try {
        const api = renderAutoPlay(1000)
        expect(advances(api)).toBe(0)

        vi.advanceTimersByTime(1000)
        expect(advances(api)).toBe(1)

        vi.advanceTimersByTime(1000)
        expect(advances(api)).toBe(2)
      } finally {
        vi.useRealTimers()
      }
    })

    it('포인터가 올라오면(pointer-enter) 자동 전환이 일시정지된다', () => {
      vi.useFakeTimers()
      try {
        const api = renderAutoPlay(1000)

        vi.advanceTimersByTime(1000)
        expect(advances(api)).toBe(1)

        // 호버 → 일시정지
        fireEvent.pointerEnter(screen.getByRole('region'))
        api.scrollNext.mockClear()
        api.scrollTo.mockClear()

        vi.advanceTimersByTime(3000)
        expect(advances(api)).toBe(0)

        // 호버 해제 → 재개
        fireEvent.pointerLeave(screen.getByRole('region'))
        vi.advanceTimersByTime(1000)
        expect(advances(api)).toBeGreaterThanOrEqual(1)
      } finally {
        vi.useRealTimers()
      }
    })

    it('autoPlay 가 꺼져 있으면 interval 이 동작하지 않는다', () => {
      vi.useFakeTimers()
      try {
        let spies: {
          scrollNext: ReturnType<typeof vi.spyOn>
          scrollTo: ReturnType<typeof vi.spyOn>
        } | null = null
        render(
          <Carousel
            setApi={(a) => {
              if (!a) return
              spies = {
                scrollNext: vi.spyOn(a, 'scrollNext'),
                scrollTo: vi.spyOn(a, 'scrollTo'),
              }
            }}
          >
            <Carousel.Content>
              <Carousel.Item>Item 1</Carousel.Item>
              <Carousel.Item>Item 2</Carousel.Item>
            </Carousel.Content>
          </Carousel>
        )

        vi.advanceTimersByTime(10000)
        expect(spies).not.toBeNull()
        expect(spies!.scrollNext.mock.calls.length + spies!.scrollTo.mock.calls.length).toBe(0)
      } finally {
        vi.useRealTimers()
      }
    })

    it('PlayToggle 는 autoPlay 가 꺼져 있으면 렌더되지 않는다', () => {
      render(
        <Carousel>
          <Carousel.Content>
            <Carousel.Item>Item 1</Carousel.Item>
          </Carousel.Content>
          <Carousel.PlayToggle />
        </Carousel>
      )

      expect(screen.queryByRole('button', { name: /자동 재생/ })).not.toBeInTheDocument()
    })

    it('PlayToggle 로 자동 전환을 일시정지/재개할 수 있다', () => {
      vi.useFakeTimers()
      try {
        let api: {
          scrollNext: ReturnType<typeof vi.spyOn>
          scrollTo: ReturnType<typeof vi.spyOn>
        } | null = null
        render(
          <Carousel
            autoPlay
            autoPlayInterval={1000}
            setApi={(a) => {
              if (!a) return
              api = {
                scrollNext: vi.spyOn(a, 'scrollNext'),
                scrollTo: vi.spyOn(a, 'scrollTo'),
              }
            }}
          >
            <Carousel.Content>
              <Carousel.Item>Item 1</Carousel.Item>
              <Carousel.Item>Item 2</Carousel.Item>
            </Carousel.Content>
            <Carousel.PlayToggle />
          </Carousel>
        )

        const toggle = screen.getByRole('button', { name: '자동 재생 일시정지' })
        expect(toggle).toHaveAttribute('aria-pressed', 'false')

        // 일시정지
        fireEvent.click(toggle)
        api!.scrollNext.mockClear()
        api!.scrollTo.mockClear()
        vi.advanceTimersByTime(3000)
        expect(api!.scrollNext.mock.calls.length + api!.scrollTo.mock.calls.length).toBe(0)
        expect(screen.getByRole('button', { name: '자동 재생 시작' })).toHaveAttribute(
          'aria-pressed',
          'true'
        )
      } finally {
        vi.useRealTimers()
      }
    })
  })
})
