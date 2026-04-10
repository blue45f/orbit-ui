import { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'

import { PageDots } from './PageDots'

const meta = {
  title: 'eclipse/Navigation/PageDots',
  component: PageDots,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "PageDots는 슬라이더/캐러셀의 현재 페이지를 나타내는 단일 dot 컴포넌트입니다. PageIndicator 내부에서 사용됩니다.",
      },
    },
  },
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

/* --------------------------------------------------------------------------
   Cycle 66: shadcn/ui + Vercel Design 벤치마크
-------------------------------------------------------------------------- */

/* shadcn/ui Carousel — 이미지 갤러리 캐러셀 인디케이터
   shadcn의 Carousel 컴포넌트처럼 아래 점 인디케이터로 슬라이드 위치 표시.
   클릭으로 슬라이드 이동 + 자동 재생 토글.
-------------------------------------------------------------------------- */
const GALLERY_SLIDES = [
  { title: '대시보드 메인', bg: '#e0f2fe', accent: '#0284c7' },
  { title: '컴포넌트 라이브러리', bg: '#f0fdf4', accent: '#16a34a' },
  { title: '디자인 토큰 시스템', bg: '#faf5ff', accent: '#7c3aed' },
  { title: '테마 커스터마이저', bg: '#fff7ed', accent: '#ea580c' },
  { title: '접근성 가이드', bg: '#fef2f2', accent: '#dc2626' },
]

export const shadcn_이미지_갤러리_캐러셀: Story = {
  name: 'shadcn/ui — 이미지 갤러리 캐러셀',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui Carousel 패턴. PageDots를 슬라이드 인디케이터로 활용. 클릭 이동 + 좌우 화살표 + 자동재생 토글. 5개 슬라이드 갤러리.',
      },
    },
  },
  render: function ShadcnGalleryCarousel() {
    const [current, setCurrent] = useState(0)
    const [autoPlay, setAutoPlay] = useState(false)
    const total = GALLERY_SLIDES.length

    useEffect(() => {
      if (!autoPlay) return
      const id = setInterval(() => setCurrent((c) => (c + 1) % total), 2000)
      return () => clearInterval(id)
    }, [autoPlay, total])

    const slide = GALLERY_SLIDES[current]

    return (
      <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
        {/* 슬라이드 영역 */}
        <div style={{
          height: 200, borderRadius: 16, background: slide.bg, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          border: `2px solid ${slide.accent}22`, marginBottom: 16, transition: 'background 0.3s',
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>
            {['bar_chart', 'grid_view', 'palette', 'tune', 'accessibility'][current].split('').map((c, i) => <span key={i}>{c}</span>)}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: slide.accent }}>{slide.title}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{current + 1} / {total}</div>
        </div>

        {/* 컨트롤 영역 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setCurrent((c) => (c - 1 + total) % total)}
            style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 12 }}
          >
            이전
          </button>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {GALLERY_SLIDES.map((_, i) => (
              <PageDots key={i} selected={i === current} onClick={() => setCurrent(i)} />
            ))}
          </div>

          <button
            onClick={() => setCurrent((c) => (c + 1) % total)}
            style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 12 }}
          >
            다음
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button
            onClick={() => setAutoPlay((a) => !a)}
            style={{
              padding: '5px 14px', borderRadius: 99, border: 'none', fontSize: 11, fontWeight: 600, cursor: 'pointer',
              background: autoPlay ? '#6366f1' : '#f1f5f9', color: autoPlay ? '#fff' : '#64748b',
              transition: 'all 0.2s',
            }}
          >
            {autoPlay ? '자동재생 중' : '자동재생 시작'}
          </button>
        </div>
      </div>
    )
  },
}

/* Vercel — 온보딩 스텝 플로우
   Vercel 신규 가입 온보딩 패턴. 4단계 설정 마법사.
   PageDots로 현재 단계 표시, 각 단계마다 실질적인 입력 UI 포함.
-------------------------------------------------------------------------- */
const ONBOARDING_STEPS = [
  {
    title: '팀 이름 설정',
    desc: '팀 또는 회사 이름을 입력하세요.',
    placeholder: 'Acme Corp',
  },
  {
    title: '프레임워크 선택',
    desc: '주로 사용하는 프레임워크를 선택하세요.',
    options: ['Next.js', 'Vite', 'Remix', 'Astro'],
  },
  {
    title: '레포지토리 연결',
    desc: 'Git 레포지토리를 연결합니다.',
    placeholder: 'github.com/username/repo',
  },
  {
    title: '설정 완료',
    desc: '모든 준비가 완료되었습니다!',
  },
]

export const Vercel_온보딩_스텝_플로우: Story = {
  name: 'Vercel — 온보딩 스텝 플로우',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 신규 사용자 온보딩 패턴. 4단계 설정 마법사에 PageDots를 스텝 인디케이터로 활용. 각 단계마다 실질적 입력 UI와 이전/다음 내비게이션.',
      },
    },
  },
  render: function VercelOnboarding() {
    const [step, setStep] = useState(0)
    const [values, setValues] = useState({ team: '', framework: '', repo: '' })
    const total = ONBOARDING_STEPS.length
    const current = ONBOARDING_STEPS[step]

    return (
      <div style={{
        width: 400, padding: 32, fontFamily: 'system-ui, sans-serif',
        background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0',
        boxShadow: '0 4px 24px #0000000a',
      }}>
        {/* 상단 스텝 인디케이터 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
          {ONBOARDING_STEPS.map((_, i) => (
            <PageDots key={i} selected={i <= step} onClick={() => i < step && setStep(i)} />
          ))}
        </div>

        {/* 콘텐츠 */}
        <div style={{ minHeight: 140 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
            {current.title}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20, lineHeight: 1.6 }}>
            {current.desc}
          </div>

          {step === 0 && (
            <input
              value={values.team}
              onChange={(e) => setValues((v) => ({ ...v, team: e.target.value }))}
              placeholder={current.placeholder}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
            />
          )}
          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {current.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setValues((v) => ({ ...v, framework: opt }))}
                  style={{
                    padding: '10px 0', borderRadius: 8,
                    border: `2px solid ${values.framework === opt ? '#6366f1' : '#e2e8f0'}`,
                    background: values.framework === opt ? '#eff6ff' : '#fff',
                    fontSize: 13, fontWeight: values.framework === opt ? 700 : 400,
                    color: values.framework === opt ? '#3730a3' : '#374151',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
          {step === 2 && (
            <input
              value={values.repo}
              onChange={(e) => setValues((v) => ({ ...v, repo: e.target.value }))}
              placeholder={current.placeholder}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
            />
          )}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>
                <span style={{ color: '#16a34a', fontWeight: 800, fontSize: 28 }}>✓</span>
              </div>
              <div style={{ fontSize: 14, color: '#166534', fontWeight: 600 }}>배포 준비 완료!</div>
            </div>
          )}
        </div>

        {/* 하단 내비게이션 */}
        <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: 'pointer' }}
            >
              이전
            </button>
          )}
          <button
            onClick={() => step < total - 1 ? setStep((s) => s + 1) : setStep(0)}
            style={{
              flex: 2, padding: '10px 0', borderRadius: 8, border: 'none',
              background: step === total - 1 ? '#6366f1' : '#0f172a',
              color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {step === total - 1 ? '대시보드로 이동' : '다음'}
          </button>
        </div>
      </div>
    )
  },
}

/* Vercel — 기능 투어 슬라이더
   Vercel 신기능 소개 패턴. 수평 슬라이더로 주요 기능을 순서대로 소개.
   PageDots를 하단 위치 인디케이터로 사용.
-------------------------------------------------------------------------- */
const FEATURE_SLIDES = [
  {
    title: 'Edge Runtime',
    desc: '전 세계 엣지 노드에서 실행되는 초고속 런타임. 평균 응답 시간 < 10ms.',
    color: '#0f172a',
    bg: '#f8fafc',
    tag: 'PERFORMANCE',
  },
  {
    title: 'ISR & Streaming',
    desc: '점진적 정적 재생성과 React 스트리밍으로 사용자 체감 속도 극대화.',
    color: '#1e40af',
    bg: '#eff6ff',
    tag: 'DX',
  },
  {
    title: 'Preview Deployments',
    desc: 'PR마다 자동 생성되는 공유 가능한 미리보기 URL. 코드 리뷰를 시각적으로.',
    color: '#5b21b6',
    bg: '#faf5ff',
    tag: 'COLLABORATION',
  },
  {
    title: 'Analytics & Vitals',
    desc: 'Core Web Vitals를 실시간 추적. 실사용자 성능 데이터 기반 최적화.',
    color: '#065f46',
    bg: '#ecfdf5',
    tag: 'OBSERVABILITY',
  },
]

export const Vercel_기능_투어_슬라이더: Story = {
  name: 'Vercel — 기능 투어 슬라이더',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 신기능 소개 슬라이더 패턴. 4가지 주요 기능을 카드 형태로 순차 소개. PageDots로 현재 위치 표시.',
      },
    },
  },
  render: function VercelFeatureTour() {
    const [current, setCurrent] = useState(0)
    const total = FEATURE_SLIDES.length
    const slide = FEATURE_SLIDES[current]

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif', userSelect: 'none' }}>
        <div style={{
          padding: 28, borderRadius: 16, background: slide.bg,
          border: `1px solid ${slide.color}22`, minHeight: 180,
          transition: 'background 0.25s, border-color 0.25s',
        }}>
          <div style={{
            display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            color: slide.color, background: `${slide.color}18`, padding: '3px 8px',
            borderRadius: 4, marginBottom: 14,
          }}>
            {slide.tag}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: slide.color, marginBottom: 12, lineHeight: 1.2 }}>
            {slide.title}
          </div>
          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>
            {slide.desc}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            style={{
              padding: '7px 16px', borderRadius: 8, border: '1px solid #e2e8f0',
              background: '#fff', fontSize: 12, cursor: current === 0 ? 'not-allowed' : 'pointer',
              opacity: current === 0 ? 0.4 : 1,
            }}
          >
            이전
          </button>

          <div style={{ display: 'flex', gap: 6 }}>
            {FEATURE_SLIDES.map((_, i) => (
              <PageDots key={i} selected={i === current} onClick={() => setCurrent(i)} />
            ))}
          </div>

          <button
            onClick={() => current < total - 1 ? setCurrent((c) => c + 1) : setCurrent(0)}
            style={{
              padding: '7px 16px', borderRadius: 8, border: 'none',
              background: '#0f172a', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {current === total - 1 ? '다시 보기' : '다음'}
          </button>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 다이얼로그 스텝 인디케이터
   Radix Dialog 내 멀티스텝 플로우 — PageDots로 진행 단계 표시
-------------------------------------------------------------------------- */
const RADIX_DIALOG_STEPS = [
  { title: '사용 목적', desc: '어떤 용도로 사용하실 예정인가요?' },
  { title: '팀 규모', desc: '팀원이 몇 명인가요?' },
  { title: '플랜 선택', desc: '적합한 플랜을 선택하세요.' },
  { title: '결제 정보', desc: '카드 또는 청구 정보를 입력하세요.' },
  { title: '완료', desc: '설정이 완료되었습니다!' },
]

const RADIX_PURPOSE_OPTIONS = ['개인 프로젝트', '스타트업', '엔터프라이즈', '오픈소스']
const RADIX_TEAM_SIZES = ['1~5명', '6~20명', '21~100명', '100명+']
const RADIX_PLANS = [
  { name: 'Free', price: '₩0/월', highlight: false },
  { name: 'Pro', price: '₩29,000/월', highlight: true },
  { name: 'Team', price: '₩79,000/월', highlight: false },
]

export const Radix_다이얼로그_스텝_인디케이터: Story = {
  name: 'Radix UI - 다이얼로그 멀티스텝 인디케이터',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI Dialog 내 멀티스텝 플로우 패턴. ' +
          'PageDots로 현재 단계 표시, 각 단계별 선택 UI 포함. ' +
          '가입/온보딩 플로우에 활용됩니다.',
      },
    },
  },
  render: function RadixDialogSteps() {
    const [step, setStep] = useState(0)
    const [selections, setSelections] = useState({ purpose: '', size: '', plan: '' })
    const total = RADIX_DIALOG_STEPS.length
    const current = RADIX_DIALOG_STEPS[step]

    return (
      <div style={{
        width: 420, padding: '28px 32px', borderRadius: 20, border: '1px solid #e2e8f0',
        background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', fontFamily: 'system-ui, sans-serif',
      }}>
        {/* 스텝 도트 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {RADIX_DIALOG_STEPS.map((_, i) => (
            <PageDots key={i} selected={i <= step} onClick={() => i < step && setStep(i)} />
          ))}
        </div>

        {/* 헤더 */}
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{current.title}</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>{current.desc}</div>
        </div>

        {/* 콘텐츠 */}
        <div style={{ minHeight: 120, marginBottom: 24 }}>
          {step === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {RADIX_PURPOSE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelections((s) => ({ ...s, purpose: opt }))}
                  style={{
                    padding: '10px 8px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    border: `2px solid ${selections.purpose === opt ? '#6366f1' : '#e2e8f0'}`,
                    background: selections.purpose === opt ? '#eff6ff' : '#fff',
                    color: selections.purpose === opt ? '#3730a3' : '#475569',
                    transition: 'all 0.15s',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {RADIX_TEAM_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelections((s) => ({ ...s, size }))}
                  style={{
                    padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                    border: `2px solid ${selections.size === size ? '#6366f1' : '#e2e8f0'}`,
                    background: selections.size === size ? '#eff6ff' : '#fff',
                    color: selections.size === size ? '#3730a3' : '#374151',
                    transition: 'all 0.15s',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {RADIX_PLANS.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => setSelections((s) => ({ ...s, plan: plan.name }))}
                  style={{
                    padding: '12px 16px', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    border: `2px solid ${selections.plan === plan.name ? '#6366f1' : plan.highlight ? '#e0e7ff' : '#e2e8f0'}`,
                    background: selections.plan === plan.name ? '#eff6ff' : plan.highlight ? '#f5f3ff' : '#fff',
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{plan.name}</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{plan.price}</span>
                </button>
              ))}
            </div>
          )}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input placeholder="카드 번호" style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <input placeholder="만료일 MM/YY" style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none' }} />
                <input placeholder="CVC" style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none' }} />
              </div>
            </div>
          )}
          {step === 4 && (
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <span style={{ fontSize: 24, color: '#22c55e', fontWeight: 800 }}>✓</span>
              </div>
              <div style={{ fontSize: 13, color: '#64748b' }}>
                {selections.plan || 'Free'} 플랜으로 시작합니다.
              </div>
            </div>
          )}
        </div>

        {/* 내비게이션 */}
        <div style={{ display: 'flex', gap: 8 }}>
          {step > 0 && step < total - 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: 'pointer' }}
            >
              이전
            </button>
          )}
          <button
            onClick={() => step < total - 1 ? setStep((s) => s + 1) : setStep(0)}
            style={{ flex: 2, padding: '10px 0', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
          >
            {step === total - 1 ? '처음으로' : step === total - 2 ? '완료' : '다음'}
          </button>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 이슈 상태 전환 흐름 표시
   Linear 이슈 상세 — 상태 전환 히스토리를 dot으로 시각화
-------------------------------------------------------------------------- */
const LINEAR_STATES = [
  { label: '접수', color: '#94a3b8', done: true },
  { label: '검토 중', color: '#6366f1', done: true },
  { label: '개발 중', color: '#f59e0b', done: false },
  { label: '리뷰', color: '#8b5cf6', done: false },
  { label: '완료', color: '#22c55e', done: false },
]

export const Linear_이슈_상태_플로우: Story = {
  name: 'Linear - 이슈 상태 전환 흐름',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 이슈 상태 전환 히스토리 패턴. ' +
          'PageDots로 이슈의 현재 상태와 이전/이후 상태를 시각화합니다. ' +
          '완료된 단계는 활성 dot, 미완료 단계는 비활성으로 표시됩니다.',
      },
    },
  },
  render: function LinearIssueFlow() {
    const [activeStep, setActiveStep] = useState(1)

    return (
      <div style={{ width: 420, fontFamily: 'system-ui, sans-serif', padding: '20px 0' }}>
        {/* 이슈 헤더 */}
        <div style={{ padding: '14px 16px', borderRadius: 12, border: '1px solid #f1f5f9', background: '#fff', marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', marginBottom: 4 }}>ORB-412</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
            Tooltip 다크모드 배경색 토큰 누락 수정
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: '#fef9c3', color: '#92400e', fontWeight: 600 }}>Bug</span>
            <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: '#eff6ff', color: '#1d4ed8', fontWeight: 600 }}>P1</span>
          </div>
        </div>

        {/* 상태 흐름 */}
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          상태 전환 이력
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 20 }}>
          {LINEAR_STATES.map((state, i) => (
            <div key={state.label} style={{ display: 'flex', alignItems: 'center', flex: i < LINEAR_STATES.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <PageDots
                  selected={i <= activeStep}
                  onClick={() => setActiveStep(i)}
                />
                <div style={{ fontSize: 10, fontWeight: i === activeStep ? 700 : 400, color: i <= activeStep ? state.color : '#cbd5e1', whiteSpace: 'nowrap' }}>
                  {state.label}
                </div>
              </div>
              {i < LINEAR_STATES.length - 1 && (
                <div style={{ flex: 1, height: 2, margin: '0 4px', marginBottom: 18, background: i < activeStep ? '#e2e8f0' : '#f1f5f9' }} />
              )}
            </div>
          ))}
        </div>

        {/* 현재 상태 카드 */}
        <div style={{
          padding: '14px 16px', borderRadius: 10, border: `1.5px solid ${LINEAR_STATES[activeStep].color}33`,
          background: `${LINEAR_STATES[activeStep].color}0a`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: LINEAR_STATES[activeStep].color, marginBottom: 4 }}>
            현재: {LINEAR_STATES[activeStep].label}
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>
            {activeStep < LINEAR_STATES.length - 1
              ? `다음 단계: ${LINEAR_STATES[activeStep + 1].label}`
              : '이슈가 완료되었습니다.'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button
            onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
            disabled={activeStep === 0}
            style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: activeStep === 0 ? 'not-allowed' : 'pointer', opacity: activeStep === 0 ? 0.4 : 1 }}
          >
            이전 상태
          </button>
          <button
            onClick={() => setActiveStep((s) => Math.min(LINEAR_STATES.length - 1, s + 1))}
            disabled={activeStep === LINEAR_STATES.length - 1}
            style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: 'none', background: activeStep < LINEAR_STATES.length - 1 ? '#0f172a' : '#e2e8f0', color: activeStep < LINEAR_STATES.length - 1 ? '#fff' : '#94a3b8', fontSize: 12, fontWeight: 600, cursor: activeStep === LINEAR_STATES.length - 1 ? 'not-allowed' : 'pointer' }}
          >
            다음 상태
          </button>
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 툴팁 포지셔닝 데모 인디케이터
   LinearUI 문서 스타일 — 인터랙티브 예제 슬라이드 내비게이션
-------------------------------------------------------------------------- */
const LINEAR_EXAMPLES = [
  { title: '기본 PageDot', desc: 'selected=false/true 두 가지 상태', bg: '#f8fafc' },
  { title: '캐러셀 인디케이터', desc: '콘텐츠 슬라이더의 현재 위치 표시', bg: '#f0f9ff' },
  { title: '스텝 인디케이터', desc: '멀티스텝 폼/온보딩 진행률 표시', bg: '#faf5ff' },
]

export const Linear_문서_예제_슬라이드: Story = {
  name: 'Linear - 문서 인터랙티브 예제 슬라이드',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 컴포넌트 문서 스타일. 예제 카드들을 슬라이드로 순환하며 PageDots로 위치를 나타냅니다. ' +
          '컴포넌트 사용법 문서의 인터랙티브 예제 패턴입니다.',
      },
    },
  },
  render: function LinearDocSlides() {
    const [current, setCurrent] = useState(0)
    const example = LINEAR_EXAMPLES[current]

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
        {/* 예제 카드 */}
        <div style={{
          padding: '28px 24px', borderRadius: 14, background: example.bg,
          border: '1px solid #e2e8f0', marginBottom: 16, minHeight: 120,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          transition: 'background 0.2s',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            예제 {current + 1} / {LINEAR_EXAMPLES.length}
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
            {example.title}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
            {example.desc}
          </div>
          {/* 실제 PageDots 데모 */}
          <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
            {LINEAR_EXAMPLES.map((_, i) => (
              <PageDots key={i} selected={i === current} />
            ))}
          </div>
        </div>

        {/* 외부 컨트롤 도트 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {LINEAR_EXAMPLES.map((_, i) => (
            <PageDots key={i} selected={i === current} onClick={() => setCurrent(i)} />
          ))}
        </div>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 8 }}>
          dot을 클릭해 전환하세요
        </div>
      </div>
    )
  },
}
