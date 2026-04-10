import { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'

import { PageDots } from './PageDots'

const meta = {
  title: 'eclipse/Navigation/PageDots',
  component: PageDots,
  args: {
    selected: false,
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof PageDots>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {} satisfies Story

export const 선택됨 = {
  args: {
    selected: true,
  },
} satisfies Story

export const 제어 = {
  render: function Controlled({ onClick, ...rest }) {
    const [selected, setSelected] = useState(false)

    return (
      <PageDots
        {...rest}
        selected={selected}
        onClick={(e) => {
          onClick?.(e)
          setSelected(!selected)
        }}
      />
    )
  },
} satisfies Story

export const 여러_개 = {
  render: function Multiple() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const total = 5

    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, index) => (
          <PageDots
            key={index}
            selected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    )
  },
} satisfies Story

export const 상태_비교 = {
  render: function StateComparison() {
    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Unselected</p>
          <PageDots selected={false} />
        </div>

        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Selected</p>
          <PageDots selected={true} />
        </div>
      </div>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    selected: false,
    disabled: false,
  },
  // eslint-disable-next-line
  render: (args: any) => {
    return <PageDots {...args} />
  },
} satisfies Story

/* --------------------------------------------------------------------------
   Mantine 스타일 스텝 위저드
   단계별 완료 상태와 레이블이 있는 멀티스텝 인디케이터 패턴
-------------------------------------------------------------------------- */
const WIZARD_STEPS = [
  { label: '계정 정보', desc: '이메일 및 비밀번호' },
  { label: '프로필 설정', desc: '이름 및 아바타' },
  { label: '팀 초대', desc: '멤버 추가' },
  { label: '완료', desc: '설정 완료' },
]

export const Mantine_스텝_위저드: Story = {
  render: function MantineStepWizard() {
    const [currentStep, setCurrentStep] = useState(1)

    return (
      <div style={{ maxWidth: 480, padding: 32, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>
            계정 설정
          </div>
          <div style={{ fontSize: 13, color: '#64748b' }}>
            단계 {currentStep + 1} / {WIZARD_STEPS.length}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
          {WIZARD_STEPS.map((step, index) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: index < WIZARD_STEPS.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <PageDots
                  selected={index === currentStep}
                  disabled={index > currentStep}
                  onClick={() => index <= currentStep && setCurrentStep(index)}
                />
                <div style={{ fontSize: 10, fontWeight: index === currentStep ? 700 : 400, color: index === currentStep ? '#6366f1' : index < currentStep ? '#22c55e' : '#94a3b8', whiteSpace: 'nowrap' }}>
                  {index < currentStep ? '완료' : step.label}
                </div>
              </div>
              {index < WIZARD_STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, margin: '0 8px', marginBottom: 20, background: index < currentStep ? '#22c55e' : '#e2e8f0' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: '20px 24px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: 20, minHeight: 80 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
            {WIZARD_STEPS[currentStep].label}
          </div>
          <div style={{ fontSize: 13, color: '#64748b' }}>
            {WIZARD_STEPS[currentStep].desc}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: currentStep === 0 ? 'not-allowed' : 'pointer', color: currentStep === 0 ? '#94a3b8' : '#374151' }}
          >
            이전
          </button>
          <button
            onClick={() => setCurrentStep((s) => Math.min(WIZARD_STEPS.length - 1, s + 1))}
            disabled={currentStep === WIZARD_STEPS.length - 1}
            style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 13, cursor: currentStep === WIZARD_STEPS.length - 1 ? 'not-allowed' : 'pointer' }}
          >
            다음
          </button>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Arco Design 스타일 캐러셀 자동 재생
   타이머 기반 자동 슬라이드 전환과 수동 제어가 결합된 캐러셀 패턴
-------------------------------------------------------------------------- */
const CAROUSEL_SLIDES = [
  { title: 'Design System 소개', subtitle: '3-tier 아키텍처로 확장 가능한 UI', color: '#6366f1', bg: '#eef2ff' },
  { title: 'Eclipse 테마', subtitle: 'vanilla-extract 기반 타입 안전 스타일링', color: '#0ea5e9', bg: '#f0f9ff' },
  { title: '토큰 시스템', subtitle: 'Reference → Semantic → Component 3단계', color: '#10b981', bg: '#f0fdf4' },
  { title: 'Storybook 문서화', subtitle: '모든 컴포넌트의 인터랙티브 플레이그라운드', color: '#f59e0b', bg: '#fffbeb' },
]

export const Arco_캐러셀_자동재생: Story = {
  render: function ArcoCarousel() {
    const [current, setCurrent] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
      if (paused) return
      const timer = setInterval(() => {
        setCurrent((c) => (c + 1) % CAROUSEL_SLIDES.length)
      }, 2000)
      return () => clearInterval(timer)
    }, [paused])

    const slide = CAROUSEL_SLIDES[current]

    return (
      <div style={{ width: 420, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{ padding: '48px 32px', borderRadius: 16, background: slide.bg, border: `2px solid ${slide.color}20`, textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer', marginBottom: 16 }}
          onClick={() => setPaused((p) => !p)}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: slide.color, marginBottom: 8 }}>
            {slide.title}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
            {slide.subtitle}
          </div>
          <div style={{ fontSize: 11, color: slide.color, fontWeight: 600 }}>
            {paused ? '클릭하여 재개' : '클릭하여 일시정지'}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          {CAROUSEL_SLIDES.map((_, index) => (
            <PageDots
              key={index}
              selected={index === current}
              onClick={() => { setCurrent(index); setPaused(true) }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 12 }}>
          {CAROUSEL_SLIDES.map((_, index) => (
            <div
              key={index}
              style={{ fontSize: 10, fontVariantNumeric: 'tabular-nums', color: index === current ? '#6366f1' : '#94a3b8', fontWeight: index === current ? 700 : 400 }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Mantine 스타일 온보딩 진행률
   완료/진행 중/미완료 세 가지 상태가 있는 온보딩 체크리스트 패턴
-------------------------------------------------------------------------- */
const ONBOARDING_ITEMS = [
  { id: 'install', label: 'npm install 완료', done: true },
  { id: 'config', label: 'tailwind.config 설정', done: true },
  { id: 'import', label: '첫 컴포넌트 import', done: false },
  { id: 'theme', label: '테마 커스터마이징', done: false },
  { id: 'deploy', label: '프로덕션 배포', done: false },
]

export const Mantine_온보딩_진행률: Story = {
  render: function MantineOnboarding() {
    const [doneSet, setDoneSet] = useState<Set<string>>(new Set(['install', 'config']))

    const completedCount = doneSet.size
    const totalCount = ONBOARDING_ITEMS.length
    const progressPct = Math.round((completedCount / totalCount) * 100)

    return (
      <div style={{ maxWidth: 360, padding: 28, fontFamily: 'system-ui, sans-serif', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
            시작 가이드
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
            {completedCount}/{totalCount} 완료 ({progressPct}%)
          </div>
          <div style={{ height: 4, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPct}%`, background: '#6366f1', borderRadius: 2, transition: 'width 0.3s ease' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
          {ONBOARDING_ITEMS.map((item) => (
            <PageDots
              key={item.id}
              selected={doneSet.has(item.id)}
              onClick={() => {
                setDoneSet((prev) => {
                  const next = new Set(prev)
                  if (next.has(item.id)) next.delete(item.id)
                  else next.add(item.id)
                  return next
                })
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ONBOARDING_ITEMS.map((item, index) => (
            <div
              key={item.id}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, background: doneSet.has(item.id) ? '#f0fdf4' : '#f8fafc', cursor: 'pointer', transition: 'background 0.2s' }}
              onClick={() => {
                setDoneSet((prev) => {
                  const next = new Set(prev)
                  if (next.has(item.id)) next.delete(item.id)
                  else next.add(item.id)
                  return next
                })
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: doneSet.has(item.id) ? '#22c55e' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {doneSet.has(item.id) && <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>✓</span>}
              </div>
              <div style={{ fontSize: 13, color: doneSet.has(item.id) ? '#166534' : '#374151', fontWeight: doneSet.has(item.id) ? 600 : 400, textDecoration: doneSet.has(item.id) ? 'line-through' : 'none' }}>
                {item.label}
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8', fontVariantNumeric: 'tabular-nums' }}>
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
