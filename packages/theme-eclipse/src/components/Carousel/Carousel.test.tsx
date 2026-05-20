import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Carousel } from './Carousel'

beforeEach(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
  // embla-carousel는 IntersectionObserver/MatchMedia를 사용할 수 있음
  global.IntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
  })) as unknown as typeof IntersectionObserver
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Carousel', () => {
  test('region 역할로 렌더링된다', () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>1</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    )

    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  test('aria-roledescription=carousel을 가진다', () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>Slide</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    )

    expect(screen.getByRole('region')).toHaveAttribute('aria-roledescription', 'carousel')
  })

  test('여러 슬라이드가 렌더링된다', () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>1</Carousel.Item>
          <Carousel.Item>2</Carousel.Item>
          <Carousel.Item>3</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  test('각 Item은 aria-roledescription=slide를 가진다', () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>Slide 1</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    )

    const slide = screen.getByText('Slide 1')
    expect(slide).toHaveAttribute('aria-roledescription', 'slide')
  })

  test('Previous/Next 버튼이 렌더링된다', () => {
    render(
      <Carousel>
        <Carousel.Content>
          <Carousel.Item>1</Carousel.Item>
          <Carousel.Item>2</Carousel.Item>
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
    )

    expect(screen.getByText('Previous slide')).toBeInTheDocument()
    expect(screen.getByText('Next slide')).toBeInTheDocument()
  })

  test('ref를 전달할 수 있다', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Carousel ref={ref}>
        <Carousel.Content>
          <Carousel.Item>1</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    )

    expect(ref.current).not.toBeNull()
  })

  test('orientation=vertical을 전달할 수 있다 (스모크 테스트)', () => {
    render(
      <Carousel orientation="vertical">
        <Carousel.Content>
          <Carousel.Item>V1</Carousel.Item>
        </Carousel.Content>
      </Carousel>
    )

    expect(screen.getByText('V1')).toBeInTheDocument()
  })
})
