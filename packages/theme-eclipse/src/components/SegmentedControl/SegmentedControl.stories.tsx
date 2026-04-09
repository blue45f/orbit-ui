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
