import React, { useState, useEffect, useRef, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from './Carousel'

const meta = {
  title: 'eclipse/Data Display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

/* --------------------------------------------------------------------------
   기본
-------------------------------------------------------------------------- */
export const 기본: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <Carousel className="w-full max-w-xs">
        <Carousel.Content>
          {Array.from({ length: 5 }).map((_, index) => (
            <Carousel.Item key={index}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-slate-100 p-6 dark:bg-slate-800">
                  <span className="text-4xl font-semibold text-slate-900 dark:text-slate-50">
                    {index + 1}
                  </span>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Arco Design 스타일 카드 캐러셀
   컴팩트한 카드 슬라이더 + 인디케이터 도트 + 현재 슬라이드 표시
-------------------------------------------------------------------------- */
const cardItems = [
  {
    title: 'Component Architecture',
    desc: '3-tier design system: Base, Theme, Custom',
    tag: 'Architecture',
    color: '#6366f1',
    bg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
  },
  {
    title: 'Design Tokens',
    desc: 'Reference → Semantic → Component token hierarchy',
    tag: 'Tokens',
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
  },
  {
    title: 'Accessibility',
    desc: 'WAI-ARIA patterns, keyboard navigation',
    tag: 'a11y',
    color: '#10b981',
    bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  },
  {
    title: 'Storybook Docs',
    desc: 'Interactive stories and design QA',
    tag: 'Docs',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
  },
]

const CardCarouselRender = () => {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<Parameters<NonNullable<React.ComponentProps<typeof Carousel>['setApi']>>[0]>()

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '40px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Orbit UI Design Principles
      </div>

      <div style={{ position: 'relative', width: '340px' }}>
        <Carousel setApi={setApi} className="w-full">
          <Carousel.Content>
            {cardItems.map((item, index) => (
              <Carousel.Item key={index}>
                <div style={{ padding: '4px' }}>
                  <div
                    style={{
                      borderRadius: '20px',
                      padding: '32px 28px',
                      background: item.bg,
                      border: `1.5px solid ${item.color}22`,
                      minHeight: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        background: `${item.color}18`,
                        color: item.color,
                        width: 'fit-content',
                      }}
                    >
                      {item.tag}
                    </span>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', lineHeight: 1.3 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel>
      </div>

      {/* 인디케이터 도트 */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {cardItems.map((item, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            style={{
              width: i === current ? '20px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: i === current ? cardItems[current].color : '#e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      <div style={{ fontSize: '12px', color: '#94a3b8' }}>
        {current + 1} / {cardItems.length}
      </div>
    </div>
  )
}

export const 카드캐러셀: Story = {
  render: () => <CardCarouselRender />,
}

/* --------------------------------------------------------------------------
   Arco Design 이미지 갤러리 캐러셀
   썸네일 네비게이션 + 슬라이드 카운터 + 풀너비 레이아웃
-------------------------------------------------------------------------- */
const gallerySlides = [
  { label: 'Orbit UI Core', sub: 'Base components without styles', icon: 'C', accentColor: '#6366f1' },
  { label: 'Eclipse Theme', sub: 'Themed component wrappers', icon: 'E', accentColor: '#8b5cf6' },
  { label: 'Icon Library', sub: '200+ SVG icons', icon: 'I', accentColor: '#10b981' },
  { label: 'Vite Plugin', sub: 'CSS ordering automation', icon: 'V', accentColor: '#f59e0b' },
  { label: 'Generator', sub: 'Component scaffolding CLI', icon: 'G', accentColor: '#ef4444' },
]

const GalleryCarouselRender = () => {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<Parameters<NonNullable<React.ComponentProps<typeof Carousel>['setApi']>>[0]>()

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div style={{ width: '480px', display: 'flex', flexDirection: 'column', gap: '16px', padding: '32px' }}>
      {/* 메인 슬라이드 */}
      <div style={{ position: 'relative' }}>
        <Carousel setApi={setApi} className="w-full">
          <Carousel.Content>
            {gallerySlides.map((slide, index) => (
              <Carousel.Item key={index}>
                <div
                  style={{
                    height: '220px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    background: `linear-gradient(145deg, ${slide.accentColor}18 0%, ${slide.accentColor}08 100%)`,
                    border: `1.5px solid ${slide.accentColor}22`,
                  }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '20px',
                      background: `linear-gradient(135deg, ${slide.accentColor} 0%, ${slide.accentColor}bb 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 900,
                      color: '#fff',
                      boxShadow: `0 8px 24px ${slide.accentColor}44`,
                    }}
                  >
                    {slide.icon}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>{slide.label}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{slide.sub}</div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel>

        {/* 카운터 뱃지 */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.45)',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '20px',
            backdropFilter: 'blur(4px)',
          }}
        >
          {current + 1} / {gallerySlides.length}
        </div>
      </div>

      {/* 썸네일 네비게이션 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {gallerySlides.map((slide, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            style={{
              flex: 1,
              height: '52px',
              borderRadius: '10px',
              border: `2px solid ${i === current ? slide.accentColor : '#e2e8f0'}`,
              background: i === current ? `${slide.accentColor}12` : '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 800,
              color: i === current ? slide.accentColor : '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0,
            }}
          >
            {slide.icon}
          </button>
        ))}
      </div>
    </div>
  )
}

export const 이미지갤러리: Story = {
  render: () => <GalleryCarouselRender />,
}

/* --------------------------------------------------------------------------
   자동재생 캐러셀 (Arco Design autoplay 패턴)
   setInterval 기반 자동 슬라이드 + 정지/재생 토글
-------------------------------------------------------------------------- */
const autoplayItems = [
  { label: '최신 컴포넌트', desc: '새로 추가된 Carousel, Toast, Command', color: '#6366f1' },
  { label: '디자인 토큰', desc: '3단계 토큰 시스템으로 일관된 스타일 관리', color: '#8b5cf6' },
  { label: 'Storybook 연동', desc: '인터랙티브 스토리와 디자인 QA 통합', color: '#10b981' },
]

const AutoplayCarouselRender = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<Parameters<NonNullable<React.ComponentProps<typeof Carousel>['setApi']>>[0]>()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    if (!api) return
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext()
        } else {
          api.scrollTo(0)
        }
      }, 2500)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [api, isPlaying])

  const handleToggle = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  return (
    <div style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '16px', padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>업데이트 소식</div>
        <button
          onClick={handleToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '20px',
            border: '1.5px solid #e2e8f0',
            background: '#fff',
            fontSize: '12px',
            fontWeight: 600,
            color: isPlaying ? '#6366f1' : '#94a3b8',
            cursor: 'pointer',
          }}
        >
          {isPlaying ? (
            <>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#6366f1' }} />
              정지
            </>
          ) : (
            <>
              <span style={{ width: 0, height: 0, borderLeft: '8px solid #10b981', borderTop: '5px solid transparent', borderBottom: '5px solid transparent' }} />
              재생
            </>
          )}
        </button>
      </div>

      <Carousel
        setApi={setApi}
        className="w-full"
      >
        <Carousel.Content>
          {autoplayItems.map((item, index) => (
            <Carousel.Item key={index}>
              <div
                style={{
                  padding: '28px 24px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${item.color}12 0%, ${item.color}06 100%)`,
                  border: `1.5px solid ${item.color}22`,
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel>

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
        {autoplayItems.map((item, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: i === current ? autoplayItems[current].color : '#e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export const 자동재생: Story = {
  render: () => <AutoplayCarouselRender />,
}
