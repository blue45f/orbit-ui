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

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 제품 온보딩 캐러셀
   Arco Design의 Carousel + steps 패턴 — 프로그레스바 + 단계 안내
   온보딩/튜토리얼 흐름에서 각 단계 컨텐츠 + 완료 CTA
-------------------------------------------------------------------------- */
const onboardingSteps = [
  {
    step: 1,
    icon: '🎯',
    title: '프로젝트 설정',
    desc: '패키지를 설치하고 EclipseProvider로 앱을 감싸주세요.',
    hint: 'pnpm add @heejun-com/theme-eclipse',
    color: '#6366f1',
  },
  {
    step: 2,
    icon: '🎨',
    title: '테마 커스터마이징',
    desc: '디자인 토큰으로 브랜드 색상과 타이포그래피를 설정합니다.',
    hint: 'baseTextSize, mode 프롭 조합',
    color: '#8b5cf6',
  },
  {
    step: 3,
    icon: '🧩',
    title: '컴포넌트 조합',
    desc: '50+ 컴포넌트를 조합해 실무 UI를 빠르게 구성합니다.',
    hint: 'Button + TextField + Toggle 조합',
    color: '#10b981',
  },
  {
    step: 4,
    icon: '🚀',
    title: '배포 준비',
    desc: 'SSR 지원 getTheme()으로 Next.js 플래시 문제를 해결합니다.',
    hint: 'import from @heejun-com/theme-eclipse/server',
    color: '#f59e0b',
  },
]

const OnboardingCarouselRender = () => {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<Parameters<NonNullable<React.ComponentProps<typeof Carousel>['setApi']>>[0]>()
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const isLast = current === onboardingSteps.length - 1
  const progress = ((current + 1) / onboardingSteps.length) * 100

  if (completed) {
    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
          boxShadow: '0 12px 32px #10b98140',
        }}>
          {'✓'}
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1e293b' }}>설정 완료!</div>
        <div style={{ fontSize: 13, color: '#64748b', textAlign: 'center' }}>Orbit UI를 사용할 준비가 되었습니다.</div>
        <button
          onClick={() => { setCompleted(false); setCurrent(0); api?.scrollTo(0) }}
          style={{ padding: '8px 20px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: 'pointer', color: '#64748b' }}
        >
          다시 보기
        </button>
      </div>
    )
  }

  return (
    <div style={{ width: 380, padding: '32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 프로그레스바 */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>시작하기</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: onboardingSteps[current].color }}>
            {current + 1} / {onboardingSteps.length}
          </span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: '#f1f5f9', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: `linear-gradient(90deg, ${onboardingSteps[current].color} 0%, ${onboardingSteps[current].color}aa 100%)`,
            width: `${progress}%`, transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* 슬라이드 */}
      <Carousel setApi={setApi} className="w-full">
        <Carousel.Content>
          {onboardingSteps.map((step, index) => (
            <Carousel.Item key={index}>
              <div style={{
                padding: '28px 24px', borderRadius: 16, minHeight: 200,
                background: `linear-gradient(145deg, ${step.color}10 0%, ${step.color}06 100%)`,
                border: `1.5px solid ${step.color}22`,
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <div style={{ fontSize: 40 }}>{step.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#1e293b' }}>{step.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{step.desc}</div>
                <div style={{
                  marginTop: 8, padding: '8px 12px', borderRadius: 8,
                  background: `${step.color}0f`, fontFamily: 'monospace',
                  fontSize: 12, color: step.color, fontWeight: 600,
                }}>
                  {step.hint}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel>

      {/* 네비게이션 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          onClick={() => api?.scrollPrev()}
          disabled={current === 0}
          style={{
            padding: '8px 16px', borderRadius: 8, border: '1.5px solid #e2e8f0',
            background: '#fff', fontSize: 13, cursor: current === 0 ? 'default' : 'pointer',
            color: current === 0 ? '#cbd5e1' : '#475569', fontWeight: 600,
          }}
        >
          이전
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 4, justifyContent: 'center' }}>
          {onboardingSteps.map((step, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              style={{
                width: i === current ? 20 : 8, height: 8, borderRadius: 4, border: 'none', padding: 0,
                background: i === current ? step.color : '#e2e8f0',
                cursor: 'pointer', transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>
        {isLast ? (
          <button
            onClick={() => setCompleted(true)}
            style={{
              padding: '8px 16px', borderRadius: 8, border: 'none',
              background: onboardingSteps[current].color, fontSize: 13,
              cursor: 'pointer', color: '#fff', fontWeight: 700,
            }}
          >
            완료
          </button>
        ) : (
          <button
            onClick={() => api?.scrollNext()}
            style={{
              padding: '8px 16px', borderRadius: 8, border: 'none',
              background: onboardingSteps[current].color, fontSize: 13,
              cursor: 'pointer', color: '#fff', fontWeight: 700,
            }}
          >
            다음
          </button>
        )}
      </div>
    </div>
  )
}

export const Arco_온보딩_단계형: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design의 Carousel + steps 패턴. 프로그레스바로 진행 상태를 표시하고 마지막 단계에서 완료 CTA로 전환됩니다. ' +
          '온보딩/튜토리얼 흐름에 최적화된 단계형 캐러셀입니다.',
      },
    },
  },
  render: () => <OnboardingCarouselRender />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 미디어 카드 캐러셀
   M3의 Card + Carousel 패턴 — 엘리베이션 그림자, filled 카드 스타일,
   aspect-ratio 기반 이미지 영역, 리플 효과 시뮬레이션
-------------------------------------------------------------------------- */
const m3MediaItems = [
  { title: 'SolidButton', category: 'Actions', lines: 248, contributors: 3, updated: '2일 전', accent: '#6750A4' },
  { title: 'DataTable', category: 'Data Display', lines: 512, contributors: 5, updated: '5일 전', accent: '#006E1C' },
  { title: 'TextField', category: 'Forms', lines: 186, contributors: 2, updated: '1일 전', accent: '#984061' },
  { title: 'Command', category: 'Navigation', lines: 324, contributors: 4, updated: '3일 전', accent: '#7B4800' },
  { title: 'Toast', category: 'Feedback', lines: 142, contributors: 2, updated: '7일 전', accent: '#006A6A' },
]

const M3MediaCarouselRender = () => {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<Parameters<NonNullable<React.ComponentProps<typeof Carousel>['setApi']>>[0]>()

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const item = m3MediaItems[current]

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#49454F', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Component Library
      </div>

      <div style={{ width: 360 }}>
        <Carousel setApi={setApi} className="w-full">
          <Carousel.Content>
            {m3MediaItems.map((m, index) => (
              <Carousel.Item key={index}>
                <div style={{ padding: '4px' }}>
                  {/* M3 Filled Card */}
                  <div style={{
                    borderRadius: 12, overflow: 'hidden',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
                    background: '#FFFBFE',
                  }}>
                    {/* M3 컬러 헤더 (이미지 영역 대체) */}
                    <div style={{
                      height: 160, background: m.accent,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{
                        fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.9)',
                        fontFamily: '"Roboto", system-ui, sans-serif', letterSpacing: '-0.02em',
                      }}>
                        {m.title[0]}
                      </div>
                    </div>
                    {/* M3 카드 바디 */}
                    <div style={{ padding: '16px' }}>
                      <div style={{ fontSize: 16, fontWeight: 500, color: '#1C1B1F', marginBottom: 4, letterSpacing: '0.015em' }}>
                        {m.title}
                      </div>
                      <div style={{ fontSize: 12, color: '#49454F', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 12 }}>
                        {m.category}
                      </div>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <div>
                          <div style={{ fontSize: 11, color: '#79747E', letterSpacing: '0.04em' }}>Lines</div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1B1F' }}>{m.lines}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: '#79747E', letterSpacing: '0.04em' }}>Contributors</div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1B1F' }}>{m.contributors}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                          <div style={{ fontSize: 11, color: '#79747E', letterSpacing: '0.04em' }}>Updated</div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1B1F' }}>{m.updated}</div>
                        </div>
                      </div>
                    </div>
                    {/* M3 액션 영역 */}
                    <div style={{
                      padding: '0 8px 8px',
                      display: 'flex', justifyContent: 'flex-end', gap: 4,
                    }}>
                      {['상세 보기', '편집'].map((label) => (
                        <button
                          key={label}
                          style={{
                            padding: '8px 16px', borderRadius: 20, border: 'none',
                            background: 'transparent', fontSize: 13, fontWeight: 600,
                            color: m.accent, cursor: 'pointer',
                            letterSpacing: '0.01em',
                          }}
                        >
                          {label}
                        </button>
                      ))}
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

      {/* M3 인디케이터 (선형) */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {m3MediaItems.map((m, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            style={{
              width: i === current ? 28 : 8, height: 8, borderRadius: 4, border: 'none', padding: 0,
              background: i === current ? item.accent : '#E6E1E5',
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#79747E', fontFamily: '"Roboto", system-ui, sans-serif', letterSpacing: '0.04em' }}>
        {current + 1} of {m3MediaItems.length} · Material Design 3 Card
      </div>
    </div>
  )
}

export const Material3_미디어_카드: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3의 Filled Card 패턴. 엘리베이션 그림자(0 1px 2px + 0 1px 3px 1px), 12px 모서리, ' +
          '상단 이미지 영역, 바디, 액션 영역의 3단 레이아웃을 M3 가이드라인에 따라 구현합니다.',
      },
    },
  },
  render: () => <M3MediaCarouselRender />,
}

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 후기/리뷰 캐러셀
   Arco Design testimonial 패턴 — 아바타 + 별점 + 리뷰 텍스트
   실무 랜딩페이지에서 자주 쓰이는 소셜 프루프 UI
-------------------------------------------------------------------------- */
const testimonials = [
  {
    name: 'Kim Heejun',
    role: 'Frontend Engineer',
    avatar: 'KH',
    avatarColor: '#6366f1',
    rating: 5,
    text: 'Orbit UI의 3-tier 토큰 시스템 덕분에 디자이너와 협업이 훨씬 원활해졌습니다. 컴포넌트 API도 직관적이에요.',
  },
  {
    name: 'Park Jisoo',
    role: 'Product Designer',
    avatar: 'PJ',
    avatarColor: '#10b981',
    rating: 5,
    text: 'Storybook 연동이 완벽합니다. 디자인 QA 스토리 덕분에 픽셀 단위 검수가 훨씬 빨라졌어요.',
  },
  {
    name: 'Lee Minjae',
    role: 'Tech Lead',
    avatar: 'LM',
    avatarColor: '#f59e0b',
    rating: 4,
    text: 'TypeScript 지원이 뛰어나고 forwardRef 패턴이 일관적입니다. 팀 전체에 도입해 생산성이 향상됐어요.',
  },
]

const TestimonialCarouselRender = () => {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<Parameters<NonNullable<React.ComponentProps<typeof Carousel>['setApi']>>[0]>()

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
          Social Proof
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#1e293b' }}>개발자 후기</div>
      </div>

      <div style={{ width: 400 }}>
        <Carousel setApi={setApi} className="w-full">
          <Carousel.Content>
            {testimonials.map((t, index) => (
              <Carousel.Item key={index}>
                <div style={{ padding: '4px' }}>
                  <div style={{
                    borderRadius: 20, padding: '28px 24px',
                    background: '#fff', border: '1.5px solid #e2e8f0',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    display: 'flex', flexDirection: 'column', gap: 16,
                  }}>
                    {/* 별점 */}
                    <div style={{ display: 'flex', gap: 3 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ fontSize: 16, color: i < t.rating ? '#f59e0b' : '#e2e8f0' }}>
                          {'★'}
                        </span>
                      ))}
                    </div>
                    {/* 인용 */}
                    <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, fontStyle: 'italic' }}>
                      {'"'}{t.text}{'"'}
                    </div>
                    {/* 프로필 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8, borderTop: '1px solid #f1f5f9' }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: t.avatarColor, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0,
                      }}>
                        {t.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{t.role}</div>
                      </div>
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

      {/* 인디케이터 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            style={{
              width: 8, height: 8, borderRadius: '50%', border: 'none', padding: 0,
              background: i === current ? '#6366f1' : '#e2e8f0',
              cursor: 'pointer', transition: 'background 0.2s ease',
              transform: i === current ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export const Arco_리뷰_캐러셀: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design의 testimonial 패턴. 별점 + 인용 텍스트 + 아바타 프로필로 소셜 프루프를 구성합니다. ' +
          '랜딩페이지나 마케팅 섹션에서 자주 사용되는 실무 패턴입니다.',
      },
    },
  },
  render: () => <TestimonialCarouselRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 피처 하이라이트 캐러셀
   shadcn/ui 랜딩페이지 feature showcase 패턴 — 아이콘 + 제목 + 설명
-------------------------------------------------------------------------- */
const FEATURES = [
  {
    icon: '★',
    title: '3-Tier 토큰 시스템',
    desc: 'Reference → Semantic → Component 3단계 토큰 구조로 브랜드 일관성과 커스터마이징 유연성을 동시에 달성합니다.',
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    icon: '◈',
    title: 'vanilla-extract 기반',
    desc: '빌드 타임 CSS 생성으로 런타임 오버헤드 없이 완전한 타입 안전성을 제공합니다.',
    color: '#06b6d4',
    bg: '#ecfeff',
  },
  {
    icon: '◉',
    title: 'Compound 컴포넌트',
    desc: 'Button.Leading, Button.Center 등 서브 컴포넌트로 유연한 조합 API를 제공합니다.',
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
  {
    icon: '⬡',
    title: 'WAI-ARIA 완전 지원',
    desc: 'aria-*, role, keyboard navigation을 기본 내장해 접근성을 추가 작업 없이 달성합니다.',
    color: '#10b981',
    bg: '#ecfdf5',
  },
]

function FeatureCarouselRender() {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<Parameters<NonNullable<React.ComponentProps<typeof Carousel>['setApi']>>[0] | null>(null)

  useEffect(() => {
    if (!api) return
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '20px' }}>
      <Carousel
        className="w-full"
        style={{ maxWidth: 380 }}
        setApi={setApi}
      >
        <Carousel.Content>
          {FEATURES.map((f) => (
            <Carousel.Item key={f.title}>
              <div style={{
                margin: '0 8px', padding: '32px 24px',
                background: f.bg, borderRadius: '16px',
                border: `1px solid ${f.color}30`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                textAlign: 'center', minHeight: 200,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '14px',
                  background: f.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', fontWeight: 700,
                }}>
                  {f.icon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{f.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 6 }}>
        {FEATURES.map((f, i) => (
          <button
            key={f.title}
            onClick={() => api?.scrollTo(i)}
            style={{
              width: i === current ? 20 : 8, height: 8, borderRadius: 4, border: 'none', padding: 0,
              background: i === current ? FEATURES[current].color : '#e2e8f0',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        shadcn/ui feature showcase 패턴 — {current + 1}/{FEATURES.length}
      </div>
    </div>
  )
}

export const shadcn_피처_하이라이트: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui 랜딩페이지 feature showcase 패턴. 아이콘 + 제목 + 설명으로 제품의 핵심 가치를 순서대로 소개합니다. 도트 인디케이터는 현재 슬라이드 색상에 맞게 동적으로 변경됩니다.',
      },
    },
  },
  render: () => <FeatureCarouselRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 수직 스크롤 스텝 캐러셀
   Radix ScrollArea + Carousel 조합 패턴 — 단계별 가이드 플로우
-------------------------------------------------------------------------- */
const STEPS = [
  { step: 1, title: '패키지 설치', code: 'pnpm add @heejun-com/theme-eclipse', color: '#6366f1' },
  { step: 2, title: 'Provider 설정', code: 'import { EclipseProvider } from "@heejun-com/theme-eclipse"', color: '#8b5cf6' },
  { step: 3, title: '컴포넌트 임포트', code: 'import { SolidButton } from "@heejun-com/theme-eclipse"', color: '#06b6d4' },
  { step: 4, title: '완료!', code: '<SolidButton color="primary">시작하기</SolidButton>', color: '#10b981' },
]

function StepCarouselRender() {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<Parameters<NonNullable<React.ComponentProps<typeof Carousel>['setApi']>>[0] | null>(null)
  const [completed, setCompleted] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (!api) return
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const handleNext = () => {
    setCompleted((prev) => new Set([...prev, current]))
    api?.scrollNext()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '20px', maxWidth: 420 }}>
      {/* Step progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s.step}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              background: completed.has(i) ? '#10b981' : i === current ? s.color : '#e2e8f0',
              color: completed.has(i) || i === current ? '#fff' : '#94a3b8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 700, transition: 'all 0.2s',
            }}>
              {completed.has(i) ? '✓' : s.step}
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 2,
                background: completed.has(i) ? '#10b981' : '#e2e8f0',
                transition: 'background 0.3s',
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <Carousel setApi={setApi} className="w-full">
        <Carousel.Content>
          {STEPS.map((s) => (
            <Carousel.Item key={s.step}>
              <div style={{
                margin: '0 4px', padding: '20px',
                background: '#fff', borderRadius: '12px',
                border: `1px solid ${s.color}30`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '8px',
                    background: s.color, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 700, flexShrink: 0,
                  }}>
                    {s.step}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{s.title}</div>
                </div>
                <pre style={{
                  margin: 0, padding: '12px 14px', borderRadius: '8px',
                  background: '#0f172a', color: '#e2e8f0',
                  fontSize: '12px', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                  fontFamily: 'monospace',
                }}>
                  {s.code}
                </pre>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => api?.scrollPrev()}
          disabled={current === 0}
          style={{
            flex: 1, padding: '9px', borderRadius: '8px',
            border: '1px solid #e2e8f0', background: '#fff', color: '#374151',
            fontSize: '13px', fontWeight: 500, cursor: current === 0 ? 'not-allowed' : 'pointer',
            opacity: current === 0 ? 0.4 : 1,
          }}
        >
          이전
        </button>
        {current < STEPS.length - 1 ? (
          <button
            onClick={handleNext}
            style={{
              flex: 2, padding: '9px', borderRadius: '8px',
              border: 'none', background: STEPS[current].color, color: '#fff',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            다음 단계
          </button>
        ) : (
          <button
            onClick={() => setCompleted((prev) => new Set([...prev, current]))}
            style={{
              flex: 2, padding: '9px', borderRadius: '8px',
              border: 'none', background: '#10b981', color: '#fff',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            완료!
          </button>
        )}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        Radix ScrollArea + Carousel 조합 — 단계별 온보딩 가이드
      </div>
    </div>
  )
}

export const Radix_스텝_가이드_캐러셀: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI ScrollArea + Carousel 조합 패턴. 설치/설정을 단계별로 안내하는 온보딩 가이드입니다. 상단 진행 바가 완료된 단계를 시각적으로 추적합니다.',
      },
    },
  },
  render: () => <StepCarouselRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui + Radix 벤치마크: 제품 이미지 갤러리 (썸네일 네비게이션)
   shadcn/ui Carousel + 썸네일 트랙 패턴 — 이커머스 제품 상세 이미지
-------------------------------------------------------------------------- */
const PRODUCT_SLIDES = [
  { id: 1, bg: 'linear-gradient(135deg, #6366f1, #8b5cf6)', label: 'Front View', caption: '전면' },
  { id: 2, bg: 'linear-gradient(135deg, #06b6d4, #0284c7)', label: 'Side View', caption: '측면' },
  { id: 3, bg: 'linear-gradient(135deg, #10b981, #059669)', label: 'Back View', caption: '후면' },
  { id: 4, bg: 'linear-gradient(135deg, #f59e0b, #d97706)', label: 'Detail View', caption: '디테일' },
]

function ProductGalleryRender() {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<Parameters<NonNullable<React.ComponentProps<typeof Carousel>['setApi']>>[0] | null>(null)

  useEffect(() => {
    if (!api) return
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const handleThumbClick = (i: number) => {
    api?.scrollTo(i)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '20px', maxWidth: 360 }}>
      {/* Main carousel */}
      <Carousel setApi={setApi} className="w-full">
        <Carousel.Content>
          {PRODUCT_SLIDES.map((slide) => (
            <Carousel.Item key={slide.id}>
              <div style={{
                margin: '0 4px', height: 220, borderRadius: '12px',
                background: slide.bg,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>
                  {slide.label}
                </div>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '30px',
                }}>
                  ◈
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>

      {/* Thumbnail track */}
      <div style={{ display: 'flex', gap: 8 }}>
        {PRODUCT_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => handleThumbClick(i)}
            style={{
              flex: 1, height: 52, borderRadius: '8px',
              background: slide.bg, border: 'none', cursor: 'pointer', padding: 0,
              outline: i === current ? '2px solid #1e293b' : '2px solid transparent',
              outlineOffset: '2px',
              opacity: i === current ? 1 : 0.55,
              transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
              {slide.caption}
            </div>
          </button>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        shadcn/ui 제품 갤러리 패턴 — 썸네일 트랙으로 빠른 이미지 전환
      </div>
    </div>
  )
}

export const shadcn_제품_갤러리: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Carousel의 제품 이미지 갤러리 패턴. 메인 슬라이드 + 하단 썸네일 트랙으로 이커머스 제품 상세 이미지 탐색 UX를 구현합니다.',
      },
    },
  },
  render: () => <ProductGalleryRender />,
}
