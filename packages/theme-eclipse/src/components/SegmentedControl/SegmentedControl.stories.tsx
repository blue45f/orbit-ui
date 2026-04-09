import { CheckIcon, GridViewLineIcon, ListLineIcon, CalendarLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { SegmentedControl } from './SegmentedControl'

SegmentedControl.displayName = 'SegmentedControl'
SegmentedControl.Tab.displayName = 'SegmentedControl.Tab'
SegmentedControl.TabLeading.displayName = 'SegmentedControl.TabLeading'
SegmentedControl.TabCenter.displayName = 'SegmentedControl.TabCenter'
SegmentedControl.TabTrailing.displayName = 'SegmentedControl.TabTrailing'

const meta = {
  title: 'eclipse/Inputs/Selection/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedControl>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render() {
    return (
      <SegmentedControl defaultValue="blue">
        <SegmentedControl.Tab value="blue">
          <SegmentedControl.TabCenter>Indigo</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="foundation">
          <SegmentedControl.TabCenter>Foundation</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="eclipse">
          <SegmentedControl.TabCenter>Eclipse</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    defaultValue: 'blue',
    tabCount: 3,
    hasLeading: false,
    hasCenter: true,
    hasTrailing: false,
  },
  argTypes: {
    tabCount: {
      control: 'radio',
      options: [1, 2, 3, 4],
    },
    hasLeading: {
      control: 'boolean',
    },
    hasCenter: {
      control: 'boolean',
    },
    hasTrailing: {
      control: 'boolean',
    },
  },
  // eslint-disable-next-line
  render: ({ tabCount, hasLeading, hasCenter, hasTrailing, defaultValue, ...rest }: any) => {
    const tabs = Array.from({ length: tabCount || 3 }, (_, i) => {
      const value = ['blue', 'foundation', 'ocean', 'green'][i] || `tab${i}`
      const label = ['Indigo', 'Foundation', 'Eclipse', 'Green'][i] || `Tab ${i + 1}`

      return (
        <SegmentedControl.Tab key={value} value={value}>
          {hasLeading && (
            <SegmentedControl.TabLeading>
              <CheckIcon size={16} />
            </SegmentedControl.TabLeading>
          )}
          {hasCenter && <SegmentedControl.TabCenter>{label}</SegmentedControl.TabCenter>}
          {hasTrailing && (
            <SegmentedControl.TabTrailing>
              <CheckIcon size={16} />
            </SegmentedControl.TabTrailing>
          )}
        </SegmentedControl.Tab>
      )
    })

    return (
      <SegmentedControl {...rest} defaultValue={defaultValue || 'blue'}>
        {tabs}
      </SegmentedControl>
    )
  },
}

// ─── Arco Design: 뷰 전환 패턴 ──────────────────────────────────────────────
// Arco Design의 Radio.Group buttonStyle="solid" 패턴을 참고했습니다.
// 대시보드에서 목록/그리드/캘린더 뷰를 전환할 때 활용됩니다.
function ViewSwitcherRender() {
  const [viewIndex, setViewIndex] = useState(0)

  const views = ['list', 'grid', 'calendar'] as const
  const viewContent: Record<string, string> = {
    list: '리스트 뷰: 항목을 세로로 나열하여 상세 정보를 표시합니다.',
    grid: '그리드 뷰: 카드 형태로 시각적으로 풍부하게 표시합니다.',
    calendar: '캘린더 뷰: 날짜 기반으로 일정을 확인합니다.',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px' }}>
      <SegmentedControl selectedIndex={viewIndex} onTabChange={setViewIndex}>
        <SegmentedControl.Tab value="list">
          <SegmentedControl.TabLeading>
            <ListLineIcon size={15} />
          </SegmentedControl.TabLeading>
          <SegmentedControl.TabCenter>목록</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="grid">
          <SegmentedControl.TabLeading>
            <GridViewLineIcon size={15} />
          </SegmentedControl.TabLeading>
          <SegmentedControl.TabCenter>그리드</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="calendar">
          <SegmentedControl.TabLeading>
            <CalendarLineIcon size={15} />
          </SegmentedControl.TabLeading>
          <SegmentedControl.TabCenter>캘린더</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>

      <div
        style={{
          alignItems: 'center',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          color: '#475569',
          display: 'flex',
          fontSize: '14px',
          minHeight: '56px',
          padding: '16px',
        }}
      >
        {viewContent[views[viewIndex]]}
      </div>
    </div>
  )
}

export const Arco_뷰_전환: Story = {
  name: 'Arco Design - 뷰 전환 패턴 (목록/그리드/캘린더)',
  render: () => <ViewSwitcherRender />,
}

// ─── Arco Design: 통계 카드 기간 선택 패턴 ──────────────────────────────────
// Arco Design Statistic 컴포넌트와 Radio.Group을 결합한 기간 필터 패턴입니다.
function StatsPeriodRender() {
  const [periodIndex, setPeriodIndex] = useState(1)

  const periods = ['day', 'week', 'month', 'year'] as const
  const statsData: Record<string, { value: string; change: string; positive: boolean }> = {
    day: { value: '1,204', change: '+3.2%', positive: true },
    week: { value: '8,941', change: '+12.5%', positive: true },
    month: { value: '38,420', change: '-2.1%', positive: false },
    year: { value: '412,800', change: '+28.4%', positive: true },
  }

  const stat = statsData[periods[periodIndex]]

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '360px',
        padding: '24px',
      }}
    >
      <div style={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div
            style={{
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              marginBottom: '4px',
              textTransform: 'uppercase',
            }}
          >
            방문자 수
          </div>
          <div
            style={{
              color: '#0f172a',
              fontSize: '32px',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {stat.value}
          </div>
        </div>
        <div
          style={{
            background: stat.positive ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
            borderRadius: '6px',
            color: stat.positive ? '#10b981' : '#ef4444',
            fontSize: '13px',
            fontWeight: 700,
            padding: '4px 8px',
          }}
        >
          {stat.change}
        </div>
      </div>

      <SegmentedControl selectedIndex={periodIndex} onTabChange={setPeriodIndex}>
        <SegmentedControl.Tab value="day">
          <SegmentedControl.TabCenter>일간</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="week">
          <SegmentedControl.TabCenter>주간</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="month">
          <SegmentedControl.TabCenter>월간</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="year">
          <SegmentedControl.TabCenter>연간</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    </div>
  )
}

export const Arco_통계_기간_선택: Story = {
  name: 'Arco Design - 통계 카드 기간 선택 패턴',
  render: () => <StatsPeriodRender />,
}

// ─── Tailwind UI: 폼 내부 요금제 선택 패턴 ──────────────────────────────────
// Tailwind UI Radio Group과 유사한 플랜 선택 UI에서 활용됩니다.
function PlanSelectorRender() {
  const [planIndex, setPlanIndex] = useState(1)

  const plans = [
    { value: 'starter', label: 'Starter', price: '무료' },
    { value: 'pro', label: 'Pro', price: '9,900원' },
    { value: 'enterprise', label: 'Enterprise', price: '문의' },
  ] as const

  const descriptions: Record<string, string> = {
    starter: '개인 프로젝트 및 학습용. 월 1,000 API 호출 포함.',
    pro: '소규모 팀을 위한 플랜. 무제한 API + 우선 지원.',
    enterprise: '대규모 조직에 최적화. 전담 매니저 + SLA 보장.',
  }

  const currentPlan = plans[planIndex]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '440px' }}>
      <div>
        <div style={{ color: '#0f172a', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
          요금제 선택
        </div>
        <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px' }}>
          필요에 맞는 플랜을 선택하세요. 언제든지 변경 가능합니다.
        </div>
      </div>

      <SegmentedControl selectedIndex={planIndex} onTabChange={setPlanIndex}>
        {plans.map((p) => (
          <SegmentedControl.Tab key={p.value} value={p.value}>
            <SegmentedControl.TabCenter>{p.label}</SegmentedControl.TabCenter>
          </SegmentedControl.Tab>
        ))}
      </SegmentedControl>

      <div
        style={{
          alignItems: 'center',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '14px 16px',
        }}
      >
        <div style={{ color: '#475569', fontSize: '13px' }}>{descriptions[currentPlan.value]}</div>
        <div
          style={{
            color: '#0f172a',
            flexShrink: 0,
            fontSize: '15px',
            fontWeight: '700',
            marginLeft: '12px',
          }}
        >
          {currentPlan.price}
        </div>
      </div>
    </div>
  )
}

export const Tailwind_폼_옵션_선택: Story = {
  name: 'Tailwind UI - 폼 내 요금제/옵션 선택 패턴',
  render: () => <PlanSelectorRender />,
}
