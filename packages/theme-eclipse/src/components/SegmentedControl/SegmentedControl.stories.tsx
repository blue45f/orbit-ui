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

// ─── Linear Design: 뷰 전환 + 컨텐츠 필터 통합 패턴 ──────────────────────────
// Linear의 All Issues 뷰에서 그룹핑 방식과 레이아웃을 동시에 제어하는 
// SegmentedControl 패턴. 선택 상태에 따라 하단 컨텐츠가 변경됩니다.
function LinearGroupByRender() {
  const [groupBy, setGroupBy] = useState(0)
  const [layout, setLayout] = useState(0)

  const groupOptions = [
    { value: 'status', label: 'Status' },
    { value: 'priority', label: 'Priority' },
    { value: 'assignee', label: 'Assignee' },
    { value: 'label', label: 'Label' },
  ] as const

  const layoutOptions = [
    { value: 'list', label: 'List' },
    { value: 'board', label: 'Board' },
  ] as const

  const issueGroups: Record<string, { title: string; color: string; issues: string[] }[]> = {
    status: [
      { title: 'In Progress', color: '#f59e0b', issues: ['[ORB-142] Carousel 고도화', '[ORB-141] TabGroup M3 패턴'] },
      { title: 'Todo', color: '#6366f1', issues: ['[ORB-143] SearchBar 개선', '[ORB-144] Toast 접근성'] },
      { title: 'Done', color: '#10b981', issues: ['[ORB-140] AlertDialog 스토리'] },
    ],
    priority: [
      { title: 'Urgent', color: '#ef4444', issues: ['[ORB-142] Carousel 고도화'] },
      { title: 'High', color: '#f59e0b', issues: ['[ORB-143] SearchBar 개선', '[ORB-141] TabGroup M3 패턴'] },
      { title: 'Medium', color: '#6366f1', issues: ['[ORB-144] Toast 접근성', '[ORB-140] AlertDialog 스토리'] },
    ],
    assignee: [
      { title: 'Kim Heejun', color: '#6366f1', issues: ['[ORB-142] Carousel 고도화', '[ORB-143] SearchBar 개선'] },
      { title: 'Unassigned', color: '#94a3b8', issues: ['[ORB-141] TabGroup M3 패턴', '[ORB-144] Toast 접근성'] },
    ],
    label: [
      { title: 'Component', color: '#8b5cf6', issues: ['[ORB-142] Carousel 고도화', '[ORB-141] TabGroup M3 패턴'] },
      { title: 'Docs', color: '#10b981', issues: ['[ORB-143] SearchBar 개선'] },
      { title: 'Bug', color: '#ef4444', issues: ['[ORB-144] Toast 접근성'] },
    ],
  }

  const currentGroup = groupOptions[groupBy].value
  const groups = issueGroups[currentGroup]

  return (
    <div style={{ width: 560, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* 툴바 */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8, background: '#fafafa' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', flex: 1 }}>All Issues</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>Group by</span>
            <SegmentedControl selectedIndex={groupBy} onTabChange={setGroupBy}>
              {groupOptions.map((opt) => (
                <SegmentedControl.Tab key={opt.value} value={opt.value}>
                  <SegmentedControl.TabCenter>{opt.label}</SegmentedControl.TabCenter>
                </SegmentedControl.Tab>
              ))}
            </SegmentedControl>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>Layout</span>
            <SegmentedControl selectedIndex={layout} onTabChange={setLayout}>
              {layoutOptions.map((opt) => (
                <SegmentedControl.Tab key={opt.value} value={opt.value}>
                  <SegmentedControl.TabCenter>{opt.label}</SegmentedControl.TabCenter>
                </SegmentedControl.Tab>
              ))}
            </SegmentedControl>
          </div>
        </div>
      </div>

      {/* 이슈 목록 */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: layout === 0 ? 'column' : 'row', gap: 12, overflowX: 'auto' }}>
        {groups.map((group) => (
          <div key={group.title} style={{ flex: layout === 1 ? '0 0 160px' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: group.color }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>{group.title}</span>
              <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 2 }}>{group.issues.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {group.issues.map((issue) => (
                <div key={issue} style={{
                  padding: '7px 10px', borderRadius: 7, fontSize: 12, color: '#374151',
                  background: '#f8fafc', border: '1px solid #f1f5f9',
                }}>
                  {issue}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_그룹핑_레이아웃_전환: Story = {
  name: 'Linear - 이슈 그룹핑 + 레이아웃 동시 제어 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 All Issues 뷰 패턴. Group By와 Layout 두 개의 SegmentedControl을 조합해 콘텐츠 구성 방식을 제어합니다. 하나의 UI에 복수 SegmentedControl을 사용하는 실무 패턴입니다.',
      },
    },
  },
  render: () => <LinearGroupByRender />,
}

// ─── shadcn/ui: 다크/라이트 + 사이즈 동시 제어 패턴 ─────────────────────────
// shadcn/ui의 ThemeToggle 패턴 응용 — appearance와 density를 
// 두 개의 독립 SegmentedControl로 동시에 제어, 라이브 미리보기 연동
function ShadcnAppearanceRender() {
  const [appearance, setAppearance] = useState(0)
  const [density, setDensity] = useState(1)
  const [radius, setRadius] = useState(1)

  const appearances = [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'system', label: 'System' }]
  const densities = [{ value: 'compact', label: 'Compact' }, { value: 'default', label: 'Default' }, { value: 'comfortable', label: 'Comfortable' }]
  const radii = [{ value: 'none', label: 'None' }, { value: 'md', label: 'MD' }, { value: 'lg', label: 'LG' }, { value: 'full', label: 'Full' }]

  const isDark = appearance === 1
  const padding = density === 0 ? '6px 10px' : density === 1 ? '10px 16px' : '14px 20px'
  const borderRadius = radius === 0 ? 2 : radius === 1 ? 8 : radius === 2 ? 12 : 24

  return (
    <div style={{ width: 520, fontFamily: 'system-ui, sans-serif' }}>
      {/* 설정 패널 */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
          Appearance Settings
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Theme', control: appearances, selected: appearance, onChange: setAppearance },
            { label: 'Density', control: densities, selected: density, onChange: setDensity },
            { label: 'Radius', control: radii, selected: radius, onChange: setRadius },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: '#475569', minWidth: 64, fontWeight: 500 }}>{row.label}</span>
              <SegmentedControl selectedIndex={row.selected} onTabChange={row.onChange}>
                {row.control.map((opt) => (
                  <SegmentedControl.Tab key={opt.value} value={opt.value}>
                    <SegmentedControl.TabCenter>{opt.label}</SegmentedControl.TabCenter>
                  </SegmentedControl.Tab>
                ))}
              </SegmentedControl>
            </div>
          ))}
        </div>
      </div>

      {/* 라이브 미리보기 */}
      <div style={{
        padding: 20, borderRadius: 12,
        background: isDark ? '#0f172a' : '#fff',
        border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
        transition: 'all 0.2s ease',
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: isDark ? '#64748b' : '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Preview
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Primary', 'Secondary', 'Ghost'].map((label, i) => (
            <button
              key={label}
              style={{
                padding, borderRadius, border: i === 1 ? `1px solid ${isDark ? '#475569' : '#e2e8f0'}` : 'none',
                background: i === 0 ? '#6366f1' : i === 1 ? 'transparent' : 'transparent',
                color: i === 0 ? '#fff' : isDark ? '#e2e8f0' : '#475569',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const shadcn_외관_설정_제어: Story = {
  name: 'shadcn/ui - Theme/Density/Radius 다중 설정 패턴',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui의 ThemeToggle + Appearance 설정 패턴. 여러 SegmentedControl로 외관(다크/라이트), 밀도, 모서리 반경을 독립적으로 제어하고 라이브 미리보기로 즉각 피드백을 제공합니다.',
      },
    },
  },
  render: () => <ShadcnAppearanceRender />,
}

// ─── Notion: 블록 타입 선택 / 텍스트 정렬 패턴 ──────────────────────────────
// Notion의 인라인 툴바 패턴 — SegmentedControl을 소형 아이콘 모드로 사용
// 텍스트 정렬, 제목 레벨, 색상 등을 한 줄 툴바로 제어
function NotionToolbarRender() {
  const [align, setAlign] = useState(0)
  const [heading, setHeading] = useState(0)

  const alignLabels = ['L', 'C', 'R']
  const headingLabels = ['Body', 'H1', 'H2', 'H3']

  const sampleText = 'Orbit UI는 3-tier 아키텍처로 설계된 React 디자인 시스템입니다.'
  const textAlign = (['left', 'center', 'right'] as const)[align]
  const fontSize = [14, 28, 22, 18][heading]
  const fontWeight = heading === 0 ? 400 : 700

  return (
    <div style={{ width: 500, fontFamily: 'system-ui, sans-serif' }}>
      {/* 인라인 툴바 */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 10px',
        borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 16,
      }}>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em' }}>TYPE</span>
        <SegmentedControl selectedIndex={heading} onTabChange={setHeading}>
          {headingLabels.map((label) => (
            <SegmentedControl.Tab key={label} value={label}>
              <SegmentedControl.TabCenter>{label}</SegmentedControl.TabCenter>
            </SegmentedControl.Tab>
          ))}
        </SegmentedControl>
        <div style={{ width: 1, height: 20, background: '#e2e8f0' }} />
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em' }}>ALIGN</span>
        <SegmentedControl selectedIndex={align} onTabChange={setAlign}>
          {alignLabels.map((label) => (
            <SegmentedControl.Tab key={label} value={label}>
              <SegmentedControl.TabCenter>{label}</SegmentedControl.TabCenter>
            </SegmentedControl.Tab>
          ))}
        </SegmentedControl>
      </div>

      {/* 에디터 미리보기 */}
      <div style={{
        padding: '24px', borderRadius: 10, border: '1px solid #e2e8f0',
        background: '#fafafa', minHeight: 80,
      }}>
        <p style={{
          fontSize, fontWeight, textAlign, color: '#1e293b', margin: 0,
          lineHeight: heading === 0 ? 1.7 : 1.25, transition: 'all 0.2s ease',
          letterSpacing: heading === 0 ? '0' : '-0.02em',
        }}>
          {sampleText}
        </p>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        Notion 인라인 블록 툴바 패턴 — 텍스트 타입 + 정렬 SegmentedControl 조합
      </div>
    </div>
  )
}

export const Notion_인라인_블록_툴바: Story = {
  name: 'Notion - 인라인 블록 타입/정렬 툴바 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Notion의 인라인 툴바 패턴. SegmentedControl을 소형 아이콘/텍스트 모드로 사용해 텍스트 유형과 정렬을 한 줄에 제어합니다. 두 컨트롤이 조합되어 에디터 블록 속성을 즉시 반영합니다.',
      },
    },
  },
  render: () => <NotionToolbarRender />,
}

// ─── Cycle 62: Tailwind UI + MUI ───────────────────────────────────────────

const TAILWIND_SORT_OPTIONS = [
  { value: 'newest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'price-asc', label: '낮은가격' },
  { value: 'price-desc', label: '높은가격' },
]

type TailwindSortValue = 'newest' | 'popular' | 'price-asc' | 'price-desc'

const TAILWIND_PRODUCTS = [
  { id: 1, name: 'React UI Kit', price: 89000, sales: 1240 },
  { id: 2, name: 'Figma Plugin', price: 29000, sales: 3820 },
  { id: 3, name: 'Tailwind 템플릿', price: 59000, sales: 780 },
  { id: 4, name: 'Icon Pack', price: 19000, sales: 5100 },
  { id: 5, name: 'Motion Preset', price: 45000, sales: 430 },
  { id: 6, name: 'Dark Theme Kit', price: 39000, sales: 2200 },
]

const TailwindSortTableRender = () => {
  const [sort, setSort] = useState<TailwindSortValue>('newest')
  const sortIdx = TAILWIND_SORT_OPTIONS.findIndex(o => o.value === sort)

  const sorted = [...TAILWIND_PRODUCTS].sort((a, b) => {
    if (sort === 'newest') return b.id - a.id
    if (sort === 'popular') return b.sales - a.sales
    if (sort === 'price-asc') return a.price - b.price
    return b.price - a.price
  })

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>상품 목록</div>
        <SegmentedControl
          selectedIndex={sortIdx}
          onTabChange={(i) => setSort(TAILWIND_SORT_OPTIONS[i].value as TailwindSortValue)}
        >
          {TAILWIND_SORT_OPTIONS.map((o) => (
            <SegmentedControl.Tab key={o.value} value={o.value}>
              <SegmentedControl.TabCenter>{o.label}</SegmentedControl.TabCenter>
            </SegmentedControl.Tab>
          ))}
        </SegmentedControl>
      </div>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
        {sorted.map((p, i) => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 16px', borderBottom: i < sorted.length - 1 ? '1px solid #f1f5f9' : 'none', background: '#fff', fontSize: 13, color: '#1e293b' }}>
            <div style={{ fontWeight: 500 }}>{p.name}</div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#64748b' }}>
              <span>{p.price.toLocaleString()}원</span>
              <span style={{ color: '#94a3b8' }}>판매 {p.sales.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Tailwind_상품_정렬_컨트롤: Story = {
  name: 'Tailwind UI - 상품 목록 정렬 SegmentedControl',
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI의 정렬 필터 패턴. SegmentedControl로 최신/인기/가격 정렬 기준을 전환하면 아래 상품 목록이 즉시 재정렬됩니다. 컴팩트한 헤더 영역에 정렬 컨트롤을 배치합니다.',
      },
    },
  },
  render: () => <TailwindSortTableRender />,
}

const MUI_TIME_RANGES = [
  { value: '1d', label: '1D' },
  { value: '1w', label: '1W' },
  { value: '1m', label: '1M' },
  { value: '3m', label: '3M' },
  { value: '1y', label: '1Y' },
]

type MuiTimeRange = '1d' | '1w' | '1m' | '3m' | '1y'

const MUI_CHART_SEED: Record<MuiTimeRange, number[]> = {
  '1d':  [42, 45, 41, 50, 48, 52, 49],
  '1w':  [210, 195, 230, 218, 245, 260, 240],
  '1m':  [820, 910, 875, 950, 1020, 980, 1100],
  '3m':  [2400, 2650, 2500, 2800, 3100, 2950, 3200],
  '1y':  [9800, 10500, 11200, 10800, 12000, 11500, 13000],
}

const MuiChartRangeRender = () => {
  const [range, setRange] = useState<MuiTimeRange>('1m')
  const rangeIdx = MUI_TIME_RANGES.findIndex(r => r.value === range)
  const data = MUI_CHART_SEED[range]
  const max = Math.max(...data)
  const min = Math.min(...data)
  const current = data[data.length - 1]
  const prev = data[0]
  const isUp = current >= prev

  return (
    <div style={{ width: 340, border: '1px solid #e2e8f0', borderRadius: 14, padding: 20, background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>ORBIT 토큰 지수</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>{current.toLocaleString()}</div>
          <div style={{ fontSize: 12, color: isUp ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
            {isUp ? '+' : ''}{(((current - prev) / prev) * 100).toFixed(1)}%
          </div>
        </div>
        <SegmentedControl
          selectedIndex={rangeIdx}
          onTabChange={(i) => setRange(MUI_TIME_RANGES[i].value as MuiTimeRange)}
        >
          {MUI_TIME_RANGES.map((r) => (
            <SegmentedControl.Tab key={r.value} value={r.value}>
              <SegmentedControl.TabCenter>{r.label}</SegmentedControl.TabCenter>
            </SegmentedControl.Tab>
          ))}
        </SegmentedControl>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 80 }}>
        {data.map((val, i) => {
          const h = ((val - min) / (max - min + 1)) * 70 + 10
          const isLast = i === data.length - 1
          return (
            <div key={i} style={{ flex: 1, height: h, borderRadius: 4, background: isLast ? '#6366f1' : '#e0e7ff', transition: 'height 0.3s ease' }} />
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#cbd5e1', marginTop: 6 }}>
        <span>시작</span><span>현재</span>
      </div>
    </div>
  )
}

export const MUI_차트_기간_전환: Story = {
  name: 'MUI - 차트 기간 선택 SegmentedControl',
  parameters: {
    docs: {
      description: {
        story: 'MUI Tabs의 기간 선택 패턴을 SegmentedControl로 구현. 1D/1W/1M/3M/1Y 탭 전환으로 바 차트 데이터와 등락률이 즉시 업데이트됩니다. 금융/분석 대시보드에서 자주 쓰이는 패턴입니다.',
      },
    },
  },
  render: () => <MuiChartRangeRender />,
}

const APPLE_LAYOUT_OPTIONS = [
  { value: 'grid', label: '격자' },
  { value: 'list', label: '목록' },
  { value: 'compact', label: '컴팩트' },
]

type AppleLayout = 'grid' | 'list' | 'compact'

const APPLE_ITEMS = ['Figma 파일', 'Sketch 프로젝트', 'Adobe XD', 'Framer 사이트', 'Canva 디자인', 'Principle 프로토']

const AppleLayoutSwitcherRender = () => {
  const [layout, setLayout] = useState<AppleLayout>('grid')
  const layoutIdx = APPLE_LAYOUT_OPTIONS.findIndex(o => o.value === layout)

  return (
    <div style={{ width: 360, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, padding: '0 4px' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1c1c1e' }}>디자인 파일</div>
        <SegmentedControl
          selectedIndex={layoutIdx}
          onTabChange={(i) => setLayout(APPLE_LAYOUT_OPTIONS[i].value as AppleLayout)}
        >
          {APPLE_LAYOUT_OPTIONS.map((o) => (
            <SegmentedControl.Tab key={o.value} value={o.value}>
              <SegmentedControl.TabCenter>{o.label}</SegmentedControl.TabCenter>
            </SegmentedControl.Tab>
          ))}
        </SegmentedControl>
      </div>
      {layout === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {APPLE_ITEMS.map((item, i) => (
            <div key={i} style={{ height: 80, borderRadius: 12, background: '#f2f2f7', border: '1px solid #e5e5ea', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1c1c1e' }}>{item}</div>
            </div>
          ))}
        </div>
      )}
      {layout === 'list' && (
        <div style={{ border: '1px solid #e5e5ea', borderRadius: 12, overflow: 'hidden' }}>
          {APPLE_ITEMS.map((item, i) => (
            <div key={i} style={{ padding: '13px 16px', borderBottom: i < APPLE_ITEMS.length - 1 ? '1px solid #f2f2f7' : 'none', background: '#fff', fontSize: 14, color: '#1c1c1e', display: 'flex', justifyContent: 'space-between' }}>
              <span>{item}</span>
              <span style={{ color: '#c7c7cc' }}>{'>'}</span>
            </div>
          ))}
        </div>
      )}
      {layout === 'compact' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {APPLE_ITEMS.map((item, i) => (
            <div key={i} style={{ padding: '8px 12px', borderRadius: 8, background: '#f2f2f7', fontSize: 12, color: '#3a3a3c', fontWeight: 500 }}>{item}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Apple_HIG_레이아웃_전환: Story = {
  name: 'Apple HIG - 레이아웃 전환 SegmentedControl',
  parameters: {
    docs: {
      description: {
        story: 'Apple HIG의 세그먼티드 컨트롤 레이아웃 전환 패턴. 격자/목록/컴팩트 세 가지 보기 방식을 전환하면 동일 데이터가 다른 레이아웃으로 렌더링됩니다. iOS Files/Photos 앱에서 활용하는 패턴입니다.',
      },
    },
  },
  render: () => <AppleLayoutSwitcherRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: useToggle 순환 모드 패턴
   Mantine의 useToggle([a, b, c]) → type-safe cycling.
   SegmentedControl 변경 시 const assertion 기반 순환 상태가 업데이트됩니다.
-------------------------------------------------------------------------- */
const VIEW_MODES = ['list', 'grid', 'kanban'] as const
type _ViewMode = (typeof VIEW_MODES)[number]

const MantineToggleCycleRender = () => {
  const [modeIdx, setModeIdx] = useState(0)
  const mode = VIEW_MODES[modeIdx]

  // Mantine useToggle pattern: [value, toggle] — cycling through const-asserted tuple
  const cycleMode = () => setModeIdx((prev) => (prev + 1) % VIEW_MODES.length)

  const ITEMS = ['디자인 토큰 구조', '컴포넌트 계층', '상태 관리 패턴', '접근성 체크리스트', '스타일 가이드', '테스트 전략']

  return (
    <div style={{ maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
          문서 뷰어
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SegmentedControl selectedIndex={modeIdx} onTabChange={setModeIdx}>
            <SegmentedControl.Tab value="list"><SegmentedControl.TabCenter>목록</SegmentedControl.TabCenter></SegmentedControl.Tab>
            <SegmentedControl.Tab value="grid"><SegmentedControl.TabCenter>격자</SegmentedControl.TabCenter></SegmentedControl.Tab>
            <SegmentedControl.Tab value="kanban"><SegmentedControl.TabCenter>칸반</SegmentedControl.TabCenter></SegmentedControl.Tab>
          </SegmentedControl>
          <button
            onClick={cycleMode}
            style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundSecondary)', cursor: 'pointer' }}
          >
            순환 →
          </button>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundQuaternary)', fontFamily: 'monospace', padding: '6px 10px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
        {`const [mode, cycleMode] = useToggle(['list', 'grid', 'kanban'] as const)`}
        <br />
        {`// mode: '${mode}' — type: ViewMode`}
      </div>

      {mode === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {ITEMS.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: i % 2 === 0 ? 'var(--sem-eclipse-color-backgroundPrimary)' : 'var(--sem-eclipse-color-backgroundSecondary)', borderRadius: 6, fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
              <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundQuaternary)', minWidth: 18 }}>{i + 1}</span>
              {item}
            </div>
          ))}
        </div>
      )}

      {mode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {ITEMS.map((item, i) => (
            <div key={i} style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-backgroundPrimary)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundPrimary)', fontWeight: 500 }}>
              {item}
            </div>
          ))}
        </div>
      )}

      {mode === 'kanban' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {(['할 일', '진행 중', '완료'] as const).map((col, ci) => (
            <div key={col} style={{ borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderSubtle)', overflow: 'hidden' }}>
              <div style={{ padding: '8px 10px', fontSize: 11, fontWeight: 700, color: ['#f59e0b', '#6366f1', '#10b981'][ci], background: 'var(--sem-eclipse-color-backgroundSecondary)', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>{col}</div>
              {ITEMS.slice(ci * 2, ci * 2 + 2).map((item) => (
                <div key={item} style={{ padding: '8px 10px', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundPrimary)', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Mantine_useToggle_순환_뷰_모드: Story = {
  name: 'Mantine - useToggle 순환 뷰 모드 (list/grid/kanban)',
  parameters: {
    docs: {
      description: {
        story: 'Mantine의 useToggle([...values] as const) 패턴. const assertion으로 타입 안전한 순환 상태를 구현합니다. "순환 →" 버튼이 useToggle()의 toggle() 호출을 시뮬레이션합니다.',
      },
    },
  },
  render: () => <MantineToggleCycleRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: useCounter 이산 증감 패턴
   Mantine의 useCounter(initial, { min, max }) → [count, { increment, decrement, set, reset }]
   SegmentedControl로 페이지 단위(5/10/20/50)를 선택, 페이지네이션 상태와 연동합니다.
-------------------------------------------------------------------------- */
const MantineCounterPaginationRender = () => {
  const PAGE_SIZES = [5, 10, 20, 50] as const
  const [pageSizeIdx, setPageSizeIdx] = useState(1)
  const pageSize = PAGE_SIZES[pageSizeIdx]
  const [page, setPage] = useState(1)
  const TOTAL = 87
  const totalPages = Math.ceil(TOTAL / pageSize)

  // Mantine useCounter handlers (simulated)
  const increment = () => setPage((p) => Math.min(p + 1, totalPages))
  const decrement = () => setPage((p) => Math.max(p - 1, 1))
  const reset = () => setPage(1)
  const set = (n: number) => setPage(Math.max(1, Math.min(n, totalPages)))

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, TOTAL)

  return (
    <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>사용자 목록</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>페이지당</span>
          <SegmentedControl selectedIndex={pageSizeIdx} onTabChange={(idx) => { setPageSizeIdx(idx); reset() }}>
            {PAGE_SIZES.map((s) => (
              <SegmentedControl.Tab key={s} value={String(s)}>
                <SegmentedControl.TabCenter>{s}</SegmentedControl.TabCenter>
              </SegmentedControl.Tab>
            ))}
          </SegmentedControl>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundQuaternary)', fontFamily: 'monospace', padding: '6px 10px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
        {`const [page, { increment, decrement, set, reset }] = useCounter(1, { min: 1, max: ${totalPages} })`}
      </div>

      <div style={{ borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderSubtle)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '8px 14px', background: 'var(--sem-eclipse-color-backgroundSecondary)', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', gap: 8 }}>
          <span>이름</span><span>역할</span><span>상태</span>
        </div>
        {Array.from({ length: pageSize }, (_, i) => {
          const n = from + i
          if (n > TOTAL) return null
          const roles = ['관리자', '편집자', '뷰어', '기여자']
          const statuses = [{ label: '활성', color: '#10b981' }, { label: '휴면', color: '#f59e0b' }]
          const role = roles[(n * 3 + 7) % roles.length]
          const status = statuses[n % statuses.length]
          return (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '10px 14px', borderBottom: n < to ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundPrimary)', gap: 8, alignItems: 'center' }}>
              <span>user_{String(n).padStart(3, '0')}</span>
              <span style={{ color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>{role}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: status.color }}>{status.label}</span>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{from}–{to} / {TOTAL}개</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { label: '«', action: reset, disabled: page === 1 },
            { label: '‹', action: decrement, disabled: page === 1 },
            { label: String(page), action: () => {}, disabled: true, active: true },
            { label: '›', action: increment, disabled: page === totalPages },
            { label: '»', action: () => set(totalPages), disabled: page === totalPages },
          ].map(({ label, action, disabled, active }, i) => (
            <button
              key={i}
              onClick={action}
              disabled={disabled}
              style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${active ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderDefault)'}`, background: active ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-backgroundPrimary)', color: active ? '#fff' : disabled ? 'var(--sem-eclipse-color-foregroundQuaternary)' : 'var(--sem-eclipse-color-foregroundPrimary)', fontSize: 12, fontWeight: 600, cursor: disabled ? 'default' : 'pointer' }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Mantine_useCounter_페이지네이션: Story = {
  name: 'Mantine - useCounter 이산 증감 페이지네이션 (min/max/reset)',
  parameters: {
    docs: {
      description: {
        story: 'Mantine의 useCounter(initial, { min, max }) 패턴. [count, { increment, decrement, set, reset }] 튜플을 반환하며, 각 핸들러가 이산적인 상태 전환을 담당합니다.',
      },
    },
  },
  render: () => <MantineCounterPaginationRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: useListState 필터 파이프라인 패턴
   Mantine의 useListState([]) → [state, handlers] — append/remove/filter 이산 핸들러.
   SegmentedControl로 활성 필터 카테고리를 선택하고, 칩 형태로 누적 관리합니다.
-------------------------------------------------------------------------- */
const MantineListStateFilterRender = () => {
  type Category = '상태' | '우선순위' | '담당자' | '기간'
  const [activeCategory, setActiveCategory] = useState<Category>('상태')
  const [filters, setFilters] = useState<{ id: string; label: string; category: Category }[]>([])

  const FILTER_OPTIONS: Record<Category, { id: string; label: string }[]> = {
    '상태': [{ id: 's1', label: '진행 중' }, { id: 's2', label: '검토 중' }, { id: 's3', label: '완료' }, { id: 's4', label: '보류' }],
    '우선순위': [{ id: 'p1', label: '긴급' }, { id: 'p2', label: '높음' }, { id: 'p3', label: '보통' }, { id: 'p4', label: '낮음' }],
    '담당자': [{ id: 'a1', label: '김철수' }, { id: 'a2', label: '이영희' }, { id: 'a3', label: '박민준' }],
    '기간': [{ id: 'd1', label: '오늘' }, { id: 'd2', label: '이번 주' }, { id: 'd3', label: '이번 달' }],
  }

  // Mantine useListState handlers (simulated)
  const append = (item: { id: string; label: string; category: Category }) =>
    setFilters((prev) => (prev.find((f) => f.id === item.id) ? prev : [...prev, item]))
  const remove = (id: string) => setFilters((prev) => prev.filter((f) => f.id !== id))
  const clearAll = () => setFilters([])

  const categories: Category[] = ['상태', '우선순위', '담당자', '기간']

  return (
    <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>필터 파이프라인</span>
        {filters.length > 0 && (
          <button onClick={clearAll} style={{ fontSize: 11, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            전체 초기화
          </button>
        )}
      </div>

      <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundQuaternary)', fontFamily: 'monospace', padding: '6px 10px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
        {`const [filters, { append, remove }] = useListState([])`}
        <br />
        {`// filters.length: ${filters.length}`}
      </div>

      <SegmentedControl selectedIndex={categories.indexOf(activeCategory)} onTabChange={(idx) => setActiveCategory(categories[idx])}>
        {categories.map((cat) => (
          <SegmentedControl.Tab key={cat} value={cat}>
            <SegmentedControl.TabCenter>{cat}</SegmentedControl.TabCenter>
          </SegmentedControl.Tab>
        ))}
      </SegmentedControl>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {FILTER_OPTIONS[activeCategory].map((opt) => {
          const active = filters.some((f) => f.id === opt.id)
          return (
            <button
              key={opt.id}
              onClick={() => active ? remove(opt.id) : append({ ...opt, category: activeCategory })}
              style={{
                padding: '5px 12px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: active ? 700 : 400,
                border: `1px solid ${active ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderDefault)'}`,
                background: active ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 10%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
                color: active ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-foregroundSecondary)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {active ? '✓ ' : ''}{opt.label}
            </button>
          )
        })}
      </div>

      {filters.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '10px 12px', borderRadius: 8, background: 'var(--sem-eclipse-color-backgroundSecondary)', border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
          <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', alignSelf: 'center', marginRight: 4 }}>적용 중:</span>
          {filters.map((f) => (
            <span key={f.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 12, background: 'var(--sem-eclipse-color-fillPrimary)', color: '#fff', fontSize: 11, fontWeight: 600 }}>
              {f.category}/{f.label}
              <button onClick={() => remove(f.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 12, padding: 0, lineHeight: 1 }}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export const Mantine_useListState_필터_파이프라인: Story = {
  name: 'Mantine - useListState 필터 파이프라인 (append/remove)',
  parameters: {
    docs: {
      description: {
        story: 'Mantine의 useListState([]) 패턴. [state, { append, remove, filter, ... }] 튜플로 이산적인 리스트 조작을 담당합니다. SegmentedControl로 카테고리를 전환하며 필터를 누적합니다.',
      },
    },
  },
  render: () => <MantineListStateFilterRender />,
}
