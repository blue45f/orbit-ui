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
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "PageIndicator는 슬라이더, 캐러셀, 스텝 위자드의 현재 위치를 dot으로 표시하는 컴포넌트입니다. shadcn/ui Steps, MUI Stepper 패턴을 지원합니다.",
      },
    },
  },
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

// --- Cycle 75: shadcn/ui + Vercel Design 벤치마크 ---

const ShadcnStepperRender = () => {
  const [step, setStep] = useState(0)

  const STEPS = [
    { title: '계정 정보', desc: '이메일과 비밀번호 설정' },
    { title: '프로필 설정', desc: '이름, 아바타, 역할 선택' },
    { title: '팀 구성', desc: '멤버 초대 또는 건너뛰기' },
    { title: '완료', desc: '시작하기' },
  ]

  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 20 }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div
                  onClick={() => setStep(i)}
                  style={{
                    width: 32, height: 32, borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: i < step ? '#22c55e' : i === step ? '#0f172a' : '#f1f5f9',
                    color: i <= step ? '#fff' : '#94a3b8',
                    fontSize: 13, fontWeight: 600, flexShrink: 0,
                    border: i === step ? '2px solid #0f172a' : '2px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: 10, color: i === step ? '#0f172a' : '#94a3b8', fontWeight: i === step ? 600 : 400, textAlign: 'center', width: 70 }}>
                  {s.title}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  flex: 1, height: 2, marginBottom: 18,
                  background: i < step ? '#22c55e' : '#f1f5f9',
                  transition: 'background 0.3s',
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{STEPS[step].title}</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>{STEPS[step].desc}</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PageIndicator
          currentPage={step}
          onPageChange={(p) => setStep(p)}
        >
          {generateDots(STEPS.length)}
        </PageIndicator>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <button
          onClick={() => setStep((p) => Math.max(0, p - 1))}
          disabled={step === 0}
          style={{
            padding: '8px 20px', borderRadius: 7, border: '1px solid #e2e8f0',
            background: '#fff', color: step === 0 ? '#cbd5e1' : '#0f172a',
            fontSize: 13, cursor: step === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          이전
        </button>
        <button
          onClick={() => setStep((p) => Math.min(STEPS.length - 1, p + 1))}
          disabled={step === STEPS.length - 1}
          style={{
            padding: '8px 20px', borderRadius: 7, border: 'none',
            background: step === STEPS.length - 1 ? '#f1f5f9' : '#0f172a',
            color: step === STEPS.length - 1 ? '#94a3b8' : '#fff',
            fontSize: 13, fontWeight: 600, cursor: step === STEPS.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          {step === STEPS.length - 1 ? '완료' : '다음'}
        </button>
      </div>
      <p style={{ marginTop: 12, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        shadcn/ui Stepper — 단계 완료 체크, 연결선 컬러, PageIndicator 연동
      </p>
    </div>
  )
}

export const shadcn_스텝퍼_온보딩: Story = {
  name: 'shadcn/ui - Stepper 온보딩 위자드',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Steps 컴포넌트 벤치마크. 완료 체크마크, 단계 연결선 색상 변화, PageIndicator 하단 dot과 동기화. 이전/다음 버튼 연동.',
      },
    },
  },
  render: () => <ShadcnStepperRender />,
}

const VercelDeploymentIndicatorRender = () => {
  const [activeIdx, setActiveIdx] = useState(2)

  const DEPLOYMENTS = [
    { env: 'Production', branch: 'main', status: 'ready', time: '2분 전', commit: 'a3f2c1' },
    { env: 'Preview', branch: 'feat/nav', status: 'building', time: '5분 전', commit: 'b7e4d2' },
    { env: 'Preview', branch: 'fix/modal', status: 'ready', time: '12분 전', commit: 'c9a1f0' },
    { env: 'Preview', branch: 'chore/deps', status: 'error', time: '1시간 전', commit: 'd2b5e3' },
    { env: 'Preview', branch: 'test/a11y', status: 'ready', time: '3시간 전', commit: 'e6c8a4' },
  ]

  const STATUS_CFG = {
    ready: { dot: '#22c55e', label: 'Ready' },
    building: { dot: '#f59e0b', label: 'Building...' },
    error: { dot: '#ef4444', label: 'Error' },
  } as const

  type DeployStatus = keyof typeof STATUS_CFG
  const active = DEPLOYMENTS[activeIdx]

  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 700, color: '#0f172a' }}>배포 히스토리</div>
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: 12 }}>
        {DEPLOYMENTS.map((d, i) => (
          <div
            key={i}
            onClick={() => setActiveIdx(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
              borderBottom: i < DEPLOYMENTS.length - 1 ? '1px solid #f8fafc' : 'none',
              cursor: 'pointer',
              background: activeIdx === i ? '#f8fafc' : '#fff',
            }}
          >
            <div style={{
              width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
              background: STATUS_CFG[d.status as DeployStatus].dot,
              boxShadow: d.status === 'building' ? `0 0 0 3px ${STATUS_CFG.building.dot}30` : 'none',
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{d.branch}</span>
                <span style={{ fontSize: 9, background: '#f1f5f9', color: '#64748b', padding: '1px 5px', borderRadius: 3 }}>{d.env}</span>
              </div>
              <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>
                {d.commit} · {d.time}
              </div>
            </div>
            <span style={{ fontSize: 11, color: STATUS_CFG[d.status as DeployStatus].dot }}>
              {STATUS_CFG[d.status as DeployStatus].label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <PageIndicator currentPage={activeIdx} onPageChange={setActiveIdx}>
          {generateDots(DEPLOYMENTS.length)}
        </PageIndicator>
      </div>
      <div style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fafafa', fontSize: 12 }}>
        <span style={{ color: '#64748b' }}>선택된 배포: </span>
        <span style={{ fontWeight: 600, color: '#0f172a' }}>{active.branch}</span>
        <span style={{ color: '#94a3b8' }}>  · {STATUS_CFG[active.status as DeployStatus].label}</span>
      </div>
      <p style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
        Vercel 배포 히스토리 — 상태 dot + PageIndicator 연동
      </p>
    </div>
  )
}

export const Vercel_배포_히스토리_인디케이터: Story = {
  name: 'Vercel - 배포 히스토리 인디케이터',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Dashboard 배포 목록 벤치마크. 상태 dot(Ready/Building/Error), 브랜치·환경 태그, PageIndicator로 현재 선택 동기화. 컴팩트 모노크롬 레이아웃.',
      },
    },
  },
  render: () => <VercelDeploymentIndicatorRender />,
}

const ShadcnVercelProgressRender = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [running, setRunning] = useState(false)

  const PIPELINE = [
    { label: '코드 분석', icon: '◎', color: '#6366f1' },
    { label: '빌드', icon: '⚙', color: '#f59e0b' },
    { label: '테스트', icon: '✓', color: '#22c55e' },
    { label: '배포', icon: '→', color: '#0ea5e9' },
    { label: '헬스체크', icon: '♥', color: '#ef4444' },
  ]

  const startPipeline = () => {
    if (running) return
    setRunning(true)
    setCurrentStep(0)
    let s = 0
    const iv = setInterval(() => {
      s += 1
      setCurrentStep(s)
      if (s >= PIPELINE.length - 1) {
        clearInterval(iv)
        setRunning(false)
      }
    }, 800)
  }

  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>CI/CD 파이프라인</div>
          <button
            onClick={startPipeline}
            disabled={running}
            style={{
              padding: '5px 14px', borderRadius: 6, border: 'none',
              background: running ? '#f1f5f9' : '#0f172a', color: running ? '#94a3b8' : '#fff',
              fontSize: 12, cursor: running ? 'not-allowed' : 'pointer', fontWeight: 600,
            }}
          >
            {running ? '실행 중...' : '다시 실행'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 0 }}>
          {PIPELINE.map((p, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                  background: i <= currentStep ? p.color : '#f1f5f9',
                  color: i <= currentStep ? '#fff' : '#94a3b8',
                  transition: 'all 0.3s', fontWeight: 700,
                }}>
                  {p.icon}
                </div>
                <div style={{ fontSize: 10, color: i <= currentStep ? p.color : '#94a3b8', fontWeight: i === currentStep ? 700 : 400, width: 56, textAlign: 'center' }}>
                  {p.label}
                </div>
              </div>
              {i < PIPELINE.length - 1 && (
                <div style={{
                  flex: 1, height: 2, marginTop: 17, marginBottom: 18,
                  background: i < currentStep ? '#22c55e' : '#f1f5f9',
                  transition: 'background 0.3s',
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <PageIndicator currentPage={currentStep} onPageChange={setCurrentStep}>
          {generateDots(PIPELINE.length)}
        </PageIndicator>
      </div>
      <div style={{ padding: '8px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b', textAlign: 'center' }}>
        {running ? `${PIPELINE[currentStep].label} 진행 중...` : currentStep === PIPELINE.length - 1 ? '모든 단계 완료' : `${PIPELINE[currentStep].label} 단계`}
      </div>
      <p style={{ marginTop: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        shadcn + Vercel — CI/CD 파이프라인 진행 표시 (자동 재생)
      </p>
    </div>
  )
}

export const shadcn_Vercel_파이프라인_진행: Story = {
  name: 'shadcn + Vercel - CI/CD 파이프라인 진행 표시',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn Steps + Vercel Build Log 패턴 조합. 파이프라인 단계 아이콘, 연결선 완료 색상, PageIndicator 동기화, 자동 재생 애니메이션(800ms 인터벌).',
      },
    },
  },
  render: () => <ShadcnVercelProgressRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui — 설문 스텝 위자드
   단계별 질문 + 진행률 PageIndicator 패턴
-------------------------------------------------------------------------- */
const SURVEY_STEPS = [
  { q: 'Orbit UI를 어떤 용도로 사용하시나요?', opts: ['개인 프로젝트', '팀 프로젝트', '프리랜서 작업', '기업 서비스'] },
  { q: '현재 사용 중인 다른 디자인 시스템은?', opts: ['shadcn/ui', 'MUI', 'Ant Design', '직접 구현'] },
  { q: '가장 중요한 기능은 무엇인가요?', opts: ['접근성', '커스터마이징', '문서 품질', '컴포넌트 수'] },
  { q: 'Orbit UI를 추천할 의향이 있으신가요?', opts: ['매우 그렇다', '그렇다', '보통', '아니다'] },
]

function ShadcnSurveyWizardRender() {
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<number, string>>({})
  const [done, setDone] = React.useState(false)

  const select = (opt: string) => {
    setAnswers((prev) => ({ ...prev, [step]: opt }))
    if (step < SURVEY_STEPS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 300)
    } else {
      setTimeout(() => setDone(true), 300)
    }
  }

  if (done) {
    return (
      <div style={{ width: 360, textAlign: 'center', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <div style={{ fontSize: 32 }}>✓</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>응답 완료!</div>
        <div style={{ fontSize: 13, color: '#64748b' }}>소중한 피드백 감사합니다.</div>
        <button onClick={() => { setStep(0); setAnswers({}); setDone(false) }} style={{ marginTop: 8, padding: '8px 20px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: 'pointer', color: '#0f172a' }}>다시 시작</button>
      </div>
    )
  }

  const current = SURVEY_STEPS[step]

  return (
    <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <PageIndicator currentPage={step} onPageChange={setStep}>
          {generateDots(SURVEY_STEPS.length)}
        </PageIndicator>
        <div style={{ fontSize: 11, color: '#94a3b8' }}>{step + 1} / {SURVEY_STEPS.length}</div>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', textAlign: 'center', lineHeight: 1.4 }}>{current.q}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {current.opts.map((opt) => (
          <button
            key={opt}
            onClick={() => select(opt)}
            style={{ padding: '12px 16px', borderRadius: 8, border: `1.5px solid ${answers[step] === opt ? '#6366f1' : '#e2e8f0'}`, background: answers[step] === opt ? '#6366f108' : '#fff', fontSize: 13, color: '#0f172a', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', fontWeight: answers[step] === opt ? 600 : 400 }}
          >
            {opt}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, color: step === 0 ? '#cbd5e1' : '#64748b', cursor: step === 0 ? 'not-allowed' : 'pointer' }}>이전</button>
        <button onClick={() => setStep((s) => Math.min(SURVEY_STEPS.length - 1, s + 1))} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, color: '#64748b', cursor: 'pointer' }}>건너뛰기</button>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>shadcn/ui 설문 위자드 패턴 — PageIndicator 스텝 탐색</div>
    </div>
  )
}

export const shadcn_설문_스텝_위자드: Story = {
  name: 'shadcn/ui — 설문 스텝 위자드',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui Steps 패턴의 설문 위자드. PageIndicator로 현재 단계를 표시하고, 답변 선택 시 자동으로 다음 단계로 이동합니다. 마지막 단계에서 완료 화면으로 전환.',
      },
    },
  },
  render: () => <ShadcnSurveyWizardRender />,
}

/* --------------------------------------------------------------------------
   Linear Design — 프로젝트 마일스톤 진행
   분기별 마일스톤 + 완료율 PageIndicator 패턴
-------------------------------------------------------------------------- */
const LINEAR_MILESTONES = [
  { name: 'Q1 알파', date: '2026-03-31', status: 'done', tasks: 12, done: 12 },
  { name: 'Q2 베타', date: '2026-06-30', status: 'done', tasks: 18, done: 16 },
  { name: 'Q3 RC', date: '2026-09-30', status: 'current', tasks: 22, done: 9 },
  { name: 'Q4 출시', date: '2026-12-31', status: 'upcoming', tasks: 15, done: 0 },
]

function LinearMilestoneRender() {
  const [active, setActive] = React.useState(2)
  const m = LINEAR_MILESTONES[active]
  const pct = Math.round((m.done / m.tasks) * 100)

  return (
    <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Orbit UI 2026 로드맵</div>
      {/* 마일스톤 타임라인 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {LINEAR_MILESTONES.map((ml, i) => (
          <React.Fragment key={ml.name}>
            <button
              onClick={() => setActive(i)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
            >
              <div style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${ml.status === 'done' ? '#10b981' : ml.status === 'current' ? '#6366f1' : '#e2e8f0'}`, background: ml.status === 'done' ? '#10b981' : active === i ? '#6366f1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                {ml.status === 'done' && <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>✓</span>}
                {ml.status === 'current' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />}
              </div>
              <span style={{ fontSize: 10, fontWeight: active === i ? 700 : 400, color: active === i ? '#0f172a' : '#94a3b8', whiteSpace: 'nowrap' }}>{ml.name}</span>
            </button>
            {i < LINEAR_MILESTONES.length - 1 && <div style={{ flex: 1, height: 2, background: i < active ? '#10b981' : '#e2e8f0', transition: 'background 0.3s', marginBottom: 16 }} />}
          </React.Fragment>
        ))}
      </div>
      {/* PageIndicator */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PageIndicator currentPage={active} onPageChange={setActive}>
          {generateDots(LINEAR_MILESTONES.length)}
        </PageIndicator>
      </div>
      {/* 마일스톤 상세 */}
      <div style={{ padding: '16px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{m.name}</span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{m.date}</span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: '#e2e8f0', overflow: 'hidden', marginBottom: 6 }}>
          <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: m.status === 'done' ? '#10b981' : m.status === 'current' ? '#6366f1' : '#e2e8f0', transition: 'width 0.3s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
          <span>{m.done} / {m.tasks} 태스크 완료</span>
          <span style={{ fontWeight: 700, color: m.status === 'done' ? '#10b981' : '#6366f1' }}>{pct}%</span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>Linear 마일스톤 진행 패턴 — 분기별 로드맵 + PageIndicator</div>
    </div>
  )
}

export const Linear_마일스톤_진행_인디케이터: Story = {
  name: 'Linear Design — 프로젝트 마일스톤 진행',
  parameters: {
    docs: {
      description: {
        story: 'Linear 로드맵 마일스톤 UI에서 영감을 받은 패턴. 분기별 마일스톤 타임라인 + PageIndicator 동기화, 완료/진행중/예정 상태 시각화, 선택된 마일스톤 태스크 진행률 표시.',
      },
    },
  },
  render: () => <LinearMilestoneRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui + Linear — 이미지 업로드 스텝
   파일 선택 → 편집 → 완료 3단계 업로드 위자드
-------------------------------------------------------------------------- */
type UploadStep = 'select' | 'preview' | 'done'

const UPLOAD_STEPS: { step: UploadStep; label: string }[] = [
  { step: 'select', label: '파일 선택' },
  { step: 'preview', label: '미리보기' },
  { step: 'done', label: '업로드 완료' },
]

function ShadcnLinearUploadStepRender() {
  const [currentStep, setCurrentStep] = React.useState<UploadStep>('select')
  const [uploading, setUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const stepIndex = UPLOAD_STEPS.findIndex((s) => s.step === currentStep)

  const simulateUpload = async () => {
    setUploading(true)
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 80))
      setProgress(i)
    }
    setUploading(false)
    setCurrentStep('done')
  }

  const reset = () => {
    setCurrentStep('select')
    setProgress(0)
  }

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      {/* 스텝 레이블 */}
      <div style={{ display: 'flex', gap: 0, width: '100%' }}>
        {UPLOAD_STEPS.map((s, i) => (
          <React.Fragment key={s.step}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: stepIndex >= i ? 700 : 400, color: stepIndex >= i ? '#6366f1' : '#94a3b8', transition: 'color 0.2s' }}>{s.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <PageIndicator currentPage={stepIndex} onPageChange={(idx) => setCurrentStep(UPLOAD_STEPS[idx].step)}>
        {generateDots(UPLOAD_STEPS.length)}
      </PageIndicator>

      {/* 스텝별 콘텐츠 */}
      {currentStep === 'select' && (
        <div style={{ width: '100%', padding: '32px 20px', borderRadius: 12, border: '2px dashed #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 32, color: '#cbd5e1' }}>↑</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>파일을 드래그하거나 클릭하세요</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>PNG, JPG, SVG · 최대 5MB</div>
          <button onClick={() => setCurrentStep('preview')} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            파일 선택
          </button>
        </div>
      )}

      {currentStep === 'preview' && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ width: '100%', height: 140, borderRadius: 10, background: 'linear-gradient(135deg, #6366f120, #a855f720)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ textAlign: 'center', color: '#6366f1' }}>
              <div style={{ fontSize: 28 }}>◻</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>orbit-logo.svg</div>
            </div>
          </div>
          {uploading && (
            <div style={{ height: 4, borderRadius: 2, background: '#e2e8f0', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: '#6366f1', transition: 'width 0.08s' }} />
            </div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setCurrentStep('select')} style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: 'pointer' }}>다시 선택</button>
            <button onClick={simulateUpload} disabled={uploading} style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', background: '#0f172a', color: '#fff', fontSize: 13, fontWeight: 600, cursor: uploading ? 'not-allowed' : 'pointer' }}>
              {uploading ? `${progress}%` : '업로드'}
            </button>
          </div>
        </div>
      )}

      {currentStep === 'done' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#10b98115', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#10b981' }}>✓</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>업로드 완료</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>orbit-logo.svg가 성공적으로 업로드되었습니다.</div>
          <button onClick={reset} style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: 'pointer', color: '#0f172a' }}>새 파일 업로드</button>
        </div>
      )}

      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>shadcn/ui + Linear — 파일 업로드 스텝 위자드 + PageIndicator</div>
    </div>
  )
}

export const shadcn_Linear_파일_업로드_스텝: Story = {
  name: 'shadcn/ui + Linear — 파일 업로드 스텝 위자드',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui Dropzone + Linear 진행률 패턴 조합. PageIndicator로 선택→미리보기→완료 3단계를 표시하고, 업로드 진행률 바와 단계 전환 애니메이션을 연출합니다.',
      },
    },
  },
  render: () => <ShadcnLinearUploadStepRender />,
}

// Cycle 142 - Apple HIG + Google Material 3 benchmark
function AppleHIGPageControl142Render() {
  const [current, setCurrent] = useState(0)
  const slides = [
    { title: '모든 기기에서 이어서', desc: 'iPhone, iPad, Mac 어디서나 끊김없이 이어서 작업하세요. iCloud가 자동으로 동기화합니다.', bg: '#1d4ed8' },
    { title: '집중 모드', desc: '업무 집중, 개인 시간, 취침 등 상황에 맞게 알림을 자동으로 조절하세요.', bg: '#7c3aed' },
    { title: '프라이버시 우선', desc: '앱이 카메라, 마이크, 위치에 접근할 때 언제나 투명하게 알려드립니다.', bg: '#0f766e' },
    { title: '시작하기', desc: '지금 바로 시작해보세요. 설정은 언제든지 변경할 수 있습니다.', bg: '#b45309' },
  ]

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1))

  const slide = slides[current]

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: slide.bg, borderRadius: 20, padding: '32px 28px 24px', marginBottom: 20, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transition: 'background 0.4s ease' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>{slide.title}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{slide.desc}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <PageIndicator currentPage={current} onPageChange={setCurrent}>
          {generateDots(slides.length)}
        </PageIndicator>
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button onClick={prev} disabled={current === 0} style={{ flex: 1, padding: '11px 0', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', fontSize: 14, fontWeight: 600, cursor: current === 0 ? 'not-allowed' : 'pointer', color: current === 0 ? '#94a3b8' : '#0f172a', opacity: current === 0 ? 0.5 : 1 }}>
            이전
          </button>
          <button onClick={next} disabled={current === slides.length - 1} style={{ flex: 1, padding: '11px 0', borderRadius: 12, border: 'none', background: slide.bg, fontSize: 14, fontWeight: 600, cursor: current === slides.length - 1 ? 'not-allowed' : 'pointer', color: '#fff', opacity: current === slides.length - 1 ? 0.5 : 1, transition: 'background 0.4s ease' }}>
            {current === slides.length - 2 ? '시작' : '다음'}
          </button>
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8' }}>Apple HIG — Page Control 온보딩 패턴</div>
      </div>
    </div>
  )
}

export const Apple_HIG_온보딩_페이지_컨트롤: Story = {
  name: 'Apple HIG — 온보딩 페이지 컨트롤 (Cycle 142)',
  parameters: {
    docs: {
      description: {
        story: 'Apple HIG Page Control 온보딩 패턴. 슬라이드 배경색 전환, dot 클릭 직접 이동, 이전/다음 버튼. 마지막 슬라이드 전 버튼 "시작"으로 전환.',
      },
    },
  },
  render: () => <AppleHIGPageControl142Render />,
}

function M3StepperIndicator142Render() {
  const [step, setStep] = useState(0)
  const steps = ['계정 생성', '프로필 설정', '알림 설정', '완료']
  const [completed, setCompleted] = useState<boolean[]>([false, false, false, false])

  const advance = () => {
    if (step >= steps.length - 1) return
    setCompleted((c) => { const n = [...c]; n[step] = true; return n })
    setStep((s) => s + 1)
  }

  const goTo = (i: number) => {
    if (completed[i] || i === 0 || completed[i - 1]) setStep(i)
  }

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 10, fontSize: 11, color: '#64748b' }}>Google Material 3 — Stepper + PageIndicator</div>

      {/* M3 스타일 스텝 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            <button
              onClick={() => goTo(i)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: completed[i] ? '#10b981' : i === step ? '#6750a4' : '#f1f5f9', color: completed[i] || i === step ? '#fff' : '#94a3b8', transition: 'all 0.2s', border: `2px solid ${i === step ? '#6750a4' : 'transparent'}` }}>
                {completed[i] ? '✓' : i + 1}
              </div>
              <div style={{ fontSize: 10, fontWeight: i === step ? 600 : 400, color: i === step ? '#6750a4' : '#94a3b8', whiteSpace: 'nowrap' }}>{s}</div>
            </button>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: completed[i] ? '#10b981' : '#e2e8f0', margin: '0 4px', marginBottom: 14, transition: 'background 0.3s' }} />
            )}
          </div>
        ))}
      </div>

      {/* PageIndicator 동기화 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <PageIndicator currentPage={step} onPageChange={(i) => goTo(i)}>
          {generateDots(steps.length)}
        </PageIndicator>
        <div style={{ width: '100%', padding: '20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{steps[step]}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>단계 {step + 1} / {steps.length}</div>
        </div>
        <button
          onClick={advance}
          disabled={step >= steps.length - 1}
          style={{ width: '100%', padding: '11px 0', borderRadius: 20, border: 'none', background: step >= steps.length - 1 ? '#e2e8f0' : '#6750a4', color: step >= steps.length - 1 ? '#94a3b8' : '#fff', fontSize: 13, fontWeight: 600, cursor: step >= steps.length - 1 ? 'not-allowed' : 'pointer', letterSpacing: 0.3 }}
        >
          {step === steps.length - 1 ? '완료됨' : '다음 단계'}
        </button>
      </div>
    </div>
  )
}

export const M3_스텝퍼_인디케이터: Story = {
  name: 'Material 3 — Stepper + PageIndicator 연동 (Cycle 142)',
  parameters: {
    docs: {
      description: {
        story: 'Google Material 3 Stepper 패턴 + PageIndicator 동기화. 완료 단계 체크 표시, M3 보라색 팔레트, 스텝 연결선 완료 시 그린 전환.',
      },
    },
  },
  render: () => <M3StepperIndicator142Render />,
}

function AppleM3MediaCarousel142Render() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const runRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const items = [
    { label: 'Orbit UI v2.0', sub: '컴포넌트 라이브러리', icon: '◈', color: '#3b82f6' },
    { label: 'Design Tokens', sub: '3단계 토큰 시스템', icon: '◇', color: '#8b5cf6' },
    { label: 'Storybook 8', sub: '컴포넌트 문서화', icon: '◉', color: '#10b981' },
    { label: 'Vanilla Extract', sub: '타입 안전 CSS', icon: '◆', color: '#f59e0b' },
    { label: 'Tailwind CSS', sub: '유틸리티 퍼스트', icon: '◎', color: '#06b6d4' },
  ]

  const toggleAuto = () => {
    if (autoPlay) {
      if (runRef.current) clearInterval(runRef.current)
      runRef.current = null
      setAutoPlay(false)
    } else {
      setAutoPlay(true)
      runRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % items.length)
      }, 1200)
    }
  }

  useEffect(() => () => { if (runRef.current) clearInterval(runRef.current) }, [])

  const item = items[current]

  return (
    <div style={{ width: 340, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 10, fontSize: 11, color: '#64748b' }}>Apple HIG + M3 — 미디어 캐러셀 PageIndicator</div>
      <div style={{ borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '40px 24px', textAlign: 'center', background: `${item.color}0f`, borderBottom: '1px solid #f1f5f9', transition: 'background 0.3s' }}>
          <div style={{ fontSize: 48, color: item.color, marginBottom: 12 }}>{item.icon}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{item.label}</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>{item.sub}</div>
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: '#fff' }}>
          <PageIndicator currentPage={current} onPageChange={setCurrent}>
            {generateDots(items.length)}
          </PageIndicator>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: 'pointer', color: '#374151' }}>
              이전
            </button>
            <button
              onClick={toggleAuto}
              style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: autoPlay ? item.color : '#f1f5f9', fontSize: 12, cursor: 'pointer', color: autoPlay ? '#fff' : '#374151', fontWeight: autoPlay ? 600 : 400, transition: 'background 0.3s' }}
            >
              {autoPlay ? '정지' : '자동'}
            </button>
            <button onClick={() => setCurrent((c) => Math.min(items.length - 1, c + 1))} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: 'pointer', color: '#374151' }}>
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Apple_M3_미디어_캐러셀_인디케이터: Story = {
  name: 'Apple HIG + Material 3 — 미디어 캐러셀 (Cycle 142)',
  parameters: {
    docs: {
      description: {
        story: 'Apple HIG 카드 캐러셀 + M3 색상 역할 시스템. 자동 재생 토글, PageIndicator dot 직접 클릭, 아이템 색상 동적 변환 (배경/버튼).',
      },
    },
  },
  render: () => <AppleM3MediaCarousel142Render />,
}

// ──────────────────────────────────────────────────────────────────────────────
// Cycle 169: Chakra UI + Arco Design
// ──────────────────────────────────────────────────────────────────────────────

export const Chakra_튜토리얼_진행_인디케이터: Story = {
  name: 'Chakra UI — 튜토리얼 진행 인디케이터 (Cycle 169)',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Steps 패턴. 튜토리얼 단계별 PageIndicator + 이전/다음 탐색. ' +
          '완료된 단계 표시 + 현재 단계 레이블 표시.',
      },
    },
  },
  render: function ChakraTutorialIndicatorRender() {
    const steps = [
      { title: '환경 설정', desc: 'Node.js, pnpm 설치' },
      { title: '패키지 설치', desc: 'npm install @heejun-com/core' },
      { title: '테마 적용', desc: 'EclipseProvider 설정' },
      { title: '컴포넌트 사용', desc: 'Button, Input 등 임포트' },
      { title: '완료', desc: '첫 번째 컴포넌트 렌더링 성공' },
    ]

    const [current, setCurrent] = useState(0)

    const prev = () => setCurrent((p) => Math.max(0, p - 1))
    const next = () => setCurrent((p) => Math.min(steps.length - 1, p + 1))

    const step = steps[current]

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            {steps.map((s, i) => (
              <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  onClick={() => setCurrent(i)}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    background: i < current ? '#10b981' : i === current ? '#3b82f6' : '#e5e7eb',
                    color: i <= current ? '#fff' : '#9ca3af',
                  }}
                >
                  {i < current ? '✓' : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 2, width: 24, background: i < current ? '#10b981' : '#e5e7eb' }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{step.title}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{step.desc}</div>
          </div>
          <PageIndicator
            currentPage={current}
            onPageChange={setCurrent}
          >
            {generateDots(steps.length)}
          </PageIndicator>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button
              onClick={prev}
              disabled={current === 0}
              style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: current === 0 ? '#9ca3af' : '#374151', fontSize: 12, fontWeight: 600, cursor: current === 0 ? 'default' : 'pointer' }}
            >
              이전
            </button>
            <button
              onClick={next}
              disabled={current === steps.length - 1}
              style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', background: current === steps.length - 1 ? '#e5e7eb' : '#3b82f6', color: current === steps.length - 1 ? '#9ca3af' : '#fff', fontSize: 12, fontWeight: 600, cursor: current === steps.length - 1 ? 'default' : 'pointer' }}
            >
              {current === steps.length - 1 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </div>
    )
  },
}

export const Arco_이미지_뷰어_페이지_닷: Story = {
  name: 'Arco Design — 이미지 뷰어 페이지 닷 (Cycle 169)',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Carousel 패턴. 이미지 뷰어 슬라이드 + 하단 PageIndicator 닷. ' +
          '자동 재생 + 수동 조작 가능.',
      },
    },
  },
  render: function ArcoImageViewerRender() {
    const slides = [
      { label: '컴포넌트 라이브러리', bg: 'linear-gradient(135deg, #1d4ed8, #7c3aed)', text: 'Button, TextField, Modal...' },
      { label: '디자인 토큰 시스템', bg: 'linear-gradient(135deg, #7c3aed, #ec4899)', text: '3-tier 토큰 아키텍처' },
      { label: 'Storybook 문서화', bg: 'linear-gradient(135deg, #ec4899, #f59e0b)', text: '650+ 인터랙티브 스토리' },
      { label: 'Vercel 자동 배포', bg: 'linear-gradient(135deg, #f59e0b, #10b981)', text: 'git push → Production' },
    ]

    const [current, setCurrent] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)

    useEffect(() => {
      if (!autoPlay) return
      const id = setInterval(() => {
        setCurrent((p) => (p + 1) % slides.length)
      }, 2000)
      return () => clearInterval(id)
    }, [autoPlay, slides.length])

    return (
      <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{ height: 180, borderRadius: 14, background: slides[current].bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'background 300ms', cursor: 'pointer', marginBottom: 12 }}
          onClick={() => setAutoPlay((p) => !p)}
        >
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{slides[current].label}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{slides[current].text}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            {autoPlay ? '클릭하여 일시정지' : '클릭하여 재생'}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PageIndicator
            currentPage={current}
            onPageChange={(p) => { setCurrent(p); setAutoPlay(false) }}
          >
            {generateDots(slides.length)}
          </PageIndicator>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: '#9ca3af' }}>
          <span>{current + 1} / {slides.length}</span>
          <span style={{ color: autoPlay ? '#10b981' : '#9ca3af', fontWeight: autoPlay ? 600 : 400 }}>
            {autoPlay ? '자동 재생 중' : '일시정지'}
          </span>
        </div>
      </div>
    )
  },
}

export const Chakra_Arco_제품_온보딩_마법사: Story = {
  name: 'Chakra UI + Arco Design — 제품 온보딩 마법사 (Cycle 169)',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI + Arco Design Wizard 패턴. 온보딩 폼 스텝 + PageIndicator 위치 표시. ' +
          '각 단계별 입력 + 최종 완료 화면.',
      },
    },
  },
  render: function ChakraArcoOnboardingRender() {
    const [step, setStep] = useState(0)
    const [form, setForm] = useState({ name: '', company: '', role: '', useCase: '' })

    const steps = [
      { title: '이름을 알려주세요', field: 'name' as const, placeholder: '홍길동', label: '이름' },
      { title: '어느 회사인가요?', field: 'company' as const, placeholder: 'Acme Corp', label: '회사' },
      { title: '직무가 무엇인가요?', field: 'role' as const, placeholder: 'Frontend Engineer', label: '직무' },
      { title: '주요 사용 목적은?', field: 'useCase' as const, placeholder: '디자인 시스템 구축', label: '사용 목적' },
    ]

    const canNext = step < steps.length && form[steps[step].field].trim().length > 0
    const isDone = step >= steps.length

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
        {isDone ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 8 }}>환영합니다, {form.name}님!</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>설정이 완료되었습니다.</div>
            <div style={{ background: '#f9fafb', borderRadius: 10, padding: 14, textAlign: 'left', fontSize: 12 }}>
              {steps.map((s) => (
                <div key={s.field} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#9ca3af' }}>{s.label}</span>
                  <span style={{ fontWeight: 600, color: '#374151' }}>{form[s.field]}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setStep(0); setForm({ name: '', company: '', role: '', useCase: '' }) }} style={{ marginTop: 14, padding: '8px 20px', borderRadius: 8, border: 'none', background: '#3b82f6', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              다시 시작
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{steps[step].title}</div>
              <input
                value={form[steps[step].field]}
                onChange={(e) => setForm((prev) => ({ ...prev, [steps[step].field]: e.target.value }))}
                placeholder={steps[step].placeholder}
                onKeyDown={(e) => { if (e.key === 'Enter' && canNext) setStep((p) => p + 1) }}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <PageIndicator
                currentPage={step}
                onPageChange={setStep}
              >
                {generateDots(steps.length)}
              </PageIndicator>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep((p) => Math.max(0, p - 1))} disabled={step === 0} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: step === 0 ? '#9ca3af' : '#374151', fontSize: 12, cursor: step === 0 ? 'default' : 'pointer' }}>
                이전
              </button>
              <button onClick={() => setStep((p) => p + 1)} disabled={!canNext} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: canNext ? '#3b82f6' : '#e5e7eb', color: canNext ? '#fff' : '#9ca3af', fontSize: 12, fontWeight: 600, cursor: canNext ? 'pointer' : 'default' }}>
                {step === steps.length - 1 ? '완료' : '다음'}
              </button>
            </div>
          </>
        )}
      </div>
    )
  },
}
