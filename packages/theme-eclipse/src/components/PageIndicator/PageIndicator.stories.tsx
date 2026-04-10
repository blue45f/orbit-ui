import { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useState } from 'react'

import { PageIndicator } from './PageIndicator'

/**
 * Helper to generate dot children for PageIndicator.
 * The core PageIndicator uses children (PageDots) to represent pages,
 * with `currentPage` controlling which is selected.
 */
const generateDots = (count: number) => Array.from({ length: count }, (_, i) => <span key={i} />)

const meta = {
  title: 'eclipse/Navigation/PageIndicator',
  component: PageIndicator,
  argTypes: {
    onPageChange: { action: 'page changed' },
  },
} satisfies Meta<typeof PageIndicator>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: function Basic({ onPageChange, ...rest }) {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator
        {...rest}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          onPageChange?.(page)
          setCurrentPage(page)
        }}
      >
        {generateDots(5)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 페이지_3개 = {
  render: function ThreePages() {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator currentPage={currentPage} onPageChange={setCurrentPage}>
        {generateDots(3)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 페이지_5개 = {
  render: function FivePages() {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator currentPage={currentPage} onPageChange={setCurrentPage}>
        {generateDots(5)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 페이지_10개 = {
  render: function TenPages() {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator currentPage={currentPage} onPageChange={setCurrentPage}>
        {generateDots(10)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 자동_페이징 = {
  render: function AutoPaging() {
    const [currentPage, setCurrentPage] = useState(0)
    const total = 5

    // Auto-advance page every second for demo
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % total)
      }, 1000)
      return () => clearInterval(interval)
    }, [])

    return (
      <div>
        <PageIndicator currentPage={currentPage}>{generateDots(total)}</PageIndicator>
        <p style={{ marginTop: '16px', fontSize: '14px' }}>
          페이지 {currentPage + 1} / {total}
        </p>
      </div>
    )
  },
} satisfies Story

export const 배경과_함께 = {
  render: function WithBackground() {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <div
        style={{
          padding: '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
        }}
      >
        <PageIndicator currentPage={currentPage} onPageChange={setCurrentPage}>
          {generateDots(5)}
        </PageIndicator>
      </div>
    )
  },
} satisfies Story

// ─── MUI 벤치마크: Stepper 위자드 패턴 ─────────────────────────────────────
// MUI Stepper는 다단계 폼의 진행 상태를 표시합니다.
// PageIndicator를 Stepper처럼 활용해 단계별 콘텐츠를 전환합니다.

const WIZARD_STEPS = [
  { title: '프로젝트 정보', desc: '기본 정보를 입력하세요', content: '프로젝트 이름, 설명, 카테고리를 설정합니다.' },
  { title: '팀 구성', desc: '팀원을 초대하세요', content: '이메일을 입력해 팀원을 초대합니다. 역할을 지정할 수 있습니다.' },
  { title: '권한 설정', desc: '접근 수준을 정하세요', content: '각 팀원의 읽기/쓰기/관리자 권한을 설정합니다.' },
  { title: '확인', desc: '설정을 검토하세요', content: '모든 설정을 확인하고 프로젝트를 생성합니다.' },
]

function MuiStepperRender() {
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState<Set<number>>(new Set())

  const handleNext = () => {
    setCompleted((prev) => new Set([...prev, step]))
    setStep((s) => Math.min(s + 1, WIZARD_STEPS.length - 1))
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      {/* Step labels */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        {WIZARD_STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
              onClick={() => setStep(i)}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  background: completed.has(i) ? '#10b981' : i === step ? '#6366f1' : '#f1f5f9',
                  color: completed.has(i) || i === step ? '#fff' : '#94a3b8',
                  transition: 'background 0.2s',
                }}
              >
                {completed.has(i) ? '✓' : i + 1}
              </div>
              <div style={{ fontSize: 11, color: i === step ? '#6366f1' : '#94a3b8', fontWeight: i === step ? 600 : 400, textAlign: 'center' }}>
                {s.title}
              </div>
            </div>
            {i < WIZARD_STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  marginBottom: 20,
                  background: completed.has(i) ? '#10b981' : '#e2e8f0',
                  transition: 'background 0.2s',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '20px 24px',
          background: '#f8fafc',
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          minHeight: 100,
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
          {WIZARD_STEPS[step].title}
        </div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>{WIZARD_STEPS[step].desc}</div>
        <div style={{ fontSize: 13, color: '#475569' }}>{WIZARD_STEPS[step].content}</div>
      </div>

      {/* PageIndicator as dot progress */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <PageIndicator currentPage={step} onPageChange={setStep}>
          {generateDots(WIZARD_STEPS.length)}
        </PageIndicator>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          onClick={handleBack}
          disabled={step === 0}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid #e2e8f0',
            background: '#fff',
            fontSize: 13,
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            color: step === 0 ? '#94a3b8' : '#374151',
          }}
        >
          이전
        </button>
        <button
          onClick={handleNext}
          disabled={step === WIZARD_STEPS.length - 1}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            background: step === WIZARD_STEPS.length - 1 ? '#e2e8f0' : '#6366f1',
            color: step === WIZARD_STEPS.length - 1 ? '#94a3b8' : '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: step === WIZARD_STEPS.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          {step === WIZARD_STEPS.length - 1 ? '완료' : '다음'}
        </button>
      </div>
    </div>
  )
}

export const MUI_스텝퍼_위자드: Story = {
  name: 'MUI Stepper - 단계별 위자드 패턴',
  render: () => <MuiStepperRender />,
}

// ─── Raycast 벤치마크: 온보딩 피처 플로우 ──────────────────────────────────
// Raycast의 온보딩 화면: 각 기능을 슬라이드 형태로 소개하고
// PageIndicator로 현재 위치를 표시합니다. 키보드로 탐색 가능합니다.

const RAYCAST_FEATURES = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#5e6ad2" strokeWidth="1.5" />
        <path d="m21 21-4.35-4.35" stroke="#5e6ad2" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: '빠른 검색',
    sub: 'Raycast Extension 스타일',
    desc: '키보드 단축키 하나로 즉시 검색을 시작하고, 최근 항목과 즐겨찾기를 먼저 표시합니다.',
    color: '#5e6ad2',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#10b981" strokeWidth="1.5" />
        <path d="M8 12l3 3 5-5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: '커맨드 팔레트',
    sub: '글로벌 액션 허브',
    desc: '어디서든 호출 가능한 커맨드 팔레트. 섹션별로 그룹화된 명령어를 탭과 화살표로 탐색합니다.',
    color: '#10b981',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: '즉각 실행',
    sub: '지연 없는 UX',
    desc: '명령 실행이 50ms 이내에 완료됩니다. 로딩 스피너 없이 즉각적인 피드백을 제공합니다.',
    color: '#f59e0b',
  },
]

function RaycastOnboardingRender() {
  const [current, setCurrent] = useState(0)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') setCurrent((c) => Math.min(c + 1, RAYCAST_FEATURES.length - 1))
    if (e.key === 'ArrowLeft') setCurrent((c) => Math.max(c - 1, 0))
  }

  const feature = RAYCAST_FEATURES[current]

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        width: 380,
        background: '#1c1c27',
        borderRadius: 16,
        border: '1px solid #2a2a3e',
        overflow: 'hidden',
        outline: 'none',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ padding: '40px 32px 24px', textAlign: 'center' }}>
        <div style={{ marginBottom: 20 }}>{feature.icon}</div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: feature.color,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}
        >
          {feature.sub}
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#e2e8f0', marginBottom: 10, letterSpacing: '-0.02em' }}>
          {feature.title}
        </div>
        <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>
          {feature.desc}
        </div>
      </div>
      <div
        style={{
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          borderTop: '1px solid #2a2a3e',
          background: '#161620',
        }}
      >
        <PageIndicator currentPage={current} onPageChange={setCurrent}>
          {generateDots(RAYCAST_FEATURES.length)}
        </PageIndicator>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
            style={{
              padding: '7px 16px',
              borderRadius: 6,
              border: '1px solid #2a2a3e',
              background: 'transparent',
              color: current === 0 ? '#3a3a4e' : '#94a3b8',
              fontSize: 12,
              cursor: current === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            이전
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(c + 1, RAYCAST_FEATURES.length - 1))}
            style={{
              padding: '7px 16px',
              borderRadius: 6,
              border: 'none',
              background: feature.color,
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {current === RAYCAST_FEATURES.length - 1 ? '시작하기' : '다음'}
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#3a3a4e' }}>
          ← → 키로 탐색
        </div>
      </div>
    </div>
  )
}

export const Raycast_온보딩_피처_플로우: Story = {
  name: 'Raycast - 온보딩 피처 플로우 (키보드 탐색)',
  render: () => <RaycastOnboardingRender />,
}

// ─── MUI 벤치마크: 이미지 갤러리 슬라이더 패턴 ──────────────────────────────
// MUI Mobile Stepper 패턴: 이미지 캐러셀 하단에 도트 인디케이터를 배치합니다.
// 자동 재생 + 수동 제어를 함께 제공하는 패턴입니다.

const GALLERY_SLIDES = [
  { bg: '#eff6ff', title: 'Button 컴포넌트', sub: '5가지 variant · 3가지 사이즈', accent: '#6366f1' },
  { bg: '#f0fdf4', title: 'Toggle & Switch', sub: '접근성 완벽 지원 · onCheckedChange', accent: '#10b981' },
  { bg: '#fffbeb', title: 'Data Table', sub: '정렬 · 필터 · 페이지네이션', accent: '#f59e0b' },
  { bg: '#fdf4ff', title: 'Form Components', sub: 'TextField · Checkbox · RadioButton', accent: '#8b5cf6' },
]

function MuiGallerySliderRender() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % GALLERY_SLIDES.length), 2800)
    return () => clearInterval(timer)
  }, [])

  const slide = GALLERY_SLIDES[current]

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <div
        style={{
          height: 160,
          background: slide.bg,
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.4s',
          border: `1px solid ${slide.accent}22`,
          borderBottom: 'none',
        }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 12, background: slide.accent, marginBottom: 12, opacity: 0.15 + 0.1 * current }} />
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{slide.title}</div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{slide.sub}</div>
      </div>
      <div
        style={{
          background: '#fff',
          borderRadius: '0 0 12px 12px',
          border: '1px solid #e2e8f0',
          borderTop: 'none',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
          disabled={current === 0}
          style={{
            background: 'none',
            border: 'none',
            cursor: current === 0 ? 'not-allowed' : 'pointer',
            color: current === 0 ? '#e2e8f0' : '#94a3b8',
            fontSize: 18,
          }}
        >
          ‹
        </button>
        <PageIndicator currentPage={current} onPageChange={setCurrent}>
          {generateDots(GALLERY_SLIDES.length)}
        </PageIndicator>
        <button
          onClick={() => setCurrent((c) => Math.min(c + 1, GALLERY_SLIDES.length - 1))}
          disabled={current === GALLERY_SLIDES.length - 1}
          style={{
            background: 'none',
            border: 'none',
            cursor: current === GALLERY_SLIDES.length - 1 ? 'not-allowed' : 'pointer',
            color: current === GALLERY_SLIDES.length - 1 ? '#e2e8f0' : '#94a3b8',
            fontSize: 18,
          }}
        >
          ›
        </button>
      </div>
    </div>
  )
}

export const MUI_갤러리_슬라이더: Story = {
  name: 'MUI Mobile Stepper - 갤러리 슬라이더 패턴 (자동 재생)',
  render: () => <MuiGallerySliderRender />,
}

export const 디자인_QA = {
  args: {
    currentPage: 0,
  },
  argTypes: {
    currentPage: {
      control: { type: 'range', min: 0, max: 9, step: 1 },
    },
  },
  render: function Controlled({ currentPage: currentPageProp, onPageChange, ...rest }) {
    const [currentPage, setCurrentPage] = useState(currentPageProp || 0)

    useEffect(() => {
      setCurrentPage(currentPageProp || 0)
    }, [currentPageProp])

    return (
      <PageIndicator
        {...rest}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          onPageChange?.(page)
          setCurrentPage(page)
        }}
      >
        {generateDots(10)}
      </PageIndicator>
    )
  },
} satisfies Story
