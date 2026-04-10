import { CheckIcon, HomeLineIcon, PeopleLineIcon, SettingLineIcon, NotificationLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { CounterBadge } from '../CounterBadge'
import { LabelBadge } from '../LabelBadge'

import { FixedTabs } from './TabGroup'

const meta = {
  title: 'eclipse/Actions/Tabs/FixedTabs',
  component: FixedTabs,
  tags: ['autodocs'],
} satisfies Meta<typeof FixedTabs>

type Story = StoryObj<typeof meta>

export default meta

const contentByIndex: Record<number, React.ReactNode> = {
  0: (
    <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)' }}>
      <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '8px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>Overview</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)', lineHeight: '1.6' }}>
        This tab shows the general overview. View key metrics, recent updates, and project summaries.
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
        {[{ label: 'Total', value: '48' }, { label: 'Done', value: '32' }, { label: 'Active', value: '10' }].map((s) => (
          <div key={s.label} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--sem-eclipse-color-backgroundPrimary, #fff)', border: '1px solid var(--sem-eclipse-color-borderPrimary, #e2e8f0)', textAlign: 'center' }}>
            <div style={{ fontWeight: '800', fontSize: '20px', color: '#6366f1' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--sem-eclipse-color-foregroundTertiary, #94a3b8)', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  1: (
    <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)' }}>
      <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '10px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>Components</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['Button', 'TextField', 'Modal', 'Dropdown', 'Calendar', 'DataTable', 'Slider', 'Progress', 'Accordion', 'Chip'].map((name) => (
          <span key={name} style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', background: 'rgba(99,102,241,0.1)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>{name}</span>
        ))}
      </div>
    </div>
  ),
  2: (
    <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)' }}>
      <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '12px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>Settings</div>
      {['Dark Mode', 'Compact Layout', 'Analytics', 'Notifications'].map((setting, i) => (
        <div key={setting} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < 3 ? '1px solid var(--sem-eclipse-color-borderSecondary, #f1f5f9)' : 'none' }}>
          <span style={{ fontSize: '14px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>{setting}</span>
          <div style={{ width: '38px', height: '20px', borderRadius: '10px', background: '#6366f1', position: 'relative', cursor: 'pointer' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff', position: 'absolute', right: '2px', top: '2px' }} />
          </div>
        </div>
      ))}
    </div>
  ),
}

const FixedTabsInteractiveDemo = () => {
  const [selected, setSelected] = useState(0)
  return (
    <div style={{ width: '100%', maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <FixedTabs selectedIndex={selected} onTabChange={setSelected}>
        <FixedTabs.Tab value="overview">
          <FixedTabs.TabCenter>Overview</FixedTabs.TabCenter>
        </FixedTabs.Tab>
        <FixedTabs.Tab value="components">
          <FixedTabs.TabCenter>Components</FixedTabs.TabCenter>
        </FixedTabs.Tab>
        <FixedTabs.Tab value="settings">
          <FixedTabs.TabCenter>Settings</FixedTabs.TabCenter>
        </FixedTabs.Tab>
      </FixedTabs>
      <div style={{ minHeight: '140px', transition: 'all 0.2s ease' }}>
        {contentByIndex[selected]}
      </div>
    </div>
  )
}

export const 기본 = {
  render() {
    return <FixedTabsInteractiveDemo />
  },
} satisfies Story

export const 디자인QA = {
  args: {
    tabCount: 3,
    defaultValue: 'tab-0',
  },
  argTypes: {
    tabCount: {
      control: 'number',
      min: 1,
      max: 5,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  render({ tabCount, defaultValue }: any) {
    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <FixedTabs defaultValue={defaultValue}>
          {Array.from({ length: tabCount }).map((_, index) => (
            <FixedTabs.Tab key={index} value={`tab-${index}`}>
              <FixedTabs.TabCenter>Tab {index + 1}</FixedTabs.TabCenter>
            </FixedTabs.Tab>
          ))}
        </FixedTabs>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear Design 벤치마크: 이슈 분류 탭 패턴
   Linear의 뷰 전환 탭 (All Issues / Active / Backlog / Done)
   컨트롤/비제어 혼합 패턴 (Radix UI 스타일)
-------------------------------------------------------------------------- */
type LinearIssue = {
  id: string
  title: string
  status: 'active' | 'backlog' | 'done' | 'cancelled'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  assignee: string
}

const linearIssues: LinearIssue[] = [
  { id: 'ORB-201', title: 'Implement Radix Tabs controlled/uncontrolled API', status: 'active', priority: 'urgent', assignee: 'HJ' },
  { id: 'ORB-202', title: 'Add Linear-style compact density to FixedTabs', status: 'active', priority: 'high', assignee: 'KJ' },
  { id: 'ORB-203', title: 'Write accessibility audit for Tab navigation', status: 'backlog', priority: 'medium', assignee: 'LY' },
  { id: 'ORB-204', title: 'Migrate TabGroup to semantic design tokens', status: 'done', priority: 'low', assignee: 'PM' },
  { id: 'ORB-205', title: 'Fix tab indicator animation on resize', status: 'active', priority: 'high', assignee: 'HJ' },
  { id: 'ORB-206', title: 'Document compound component API for TabGroup', status: 'backlog', priority: 'medium', assignee: 'CD' },
  { id: 'ORB-207', title: 'Add keyboard shortcut: G+I for Issues tab', status: 'done', priority: 'low', assignee: 'HJ' },
  { id: 'ORB-208', title: 'Remove deprecated tab height prop', status: 'cancelled', priority: 'low', assignee: 'KJ' },
]

const statusDotColor: Record<LinearIssue['status'], string> = {
  active: '#6366f1',
  backlog: '#94a3b8',
  done: '#10b981',
  cancelled: '#ef4444',
}

const priorityBadgeColor: Record<LinearIssue['priority'], 'gray' | 'benefit' | 'sale'> = {
  urgent: 'sale',
  high: 'benefit',
  medium: 'gray',
  low: 'gray',
}

const LinearIssueTab = ({
  issues,
  label,
}: {
  issues: LinearIssue[]
  label: string
}) => (
  <div style={{ padding: '8px 0' }}>
    <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px 8px' }}>
      {label}
    </div>
    {issues.length === 0 && (
      <div style={{ padding: '24px 12px', textAlign: 'center', fontSize: '12px', color: '#cbd5e1' }}>
        No issues found
      </div>
    )}
    {issues.map((issue) => (
      <div
        key={issue.id}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 12px',
          minHeight: 32,
          cursor: 'pointer',
          transition: 'background 0.1s',
        }}
        role="row"
        aria-label={issue.title}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: statusDotColor[issue.status],
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', fontWeight: 500, flexShrink: 0 }}>
          {issue.id}
        </span>
        <span style={{ fontSize: 13, color: '#1e293b', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {issue.title}
        </span>
        <LabelBadge color={priorityBadgeColor[issue.priority]}>
          <LabelBadge.Label>{issue.priority}</LabelBadge.Label>
        </LabelBadge>
        <div style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff',
          fontSize: 9,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {issue.assignee}
        </div>
      </div>
    ))}
  </div>
)

const LinearIssueTabs = () => {
  const [selected, setSelected] = useState(0)
  const tabs = [
    { label: 'All Issues', issues: linearIssues },
    { label: 'Active', issues: linearIssues.filter((i) => i.status === 'active') },
    { label: 'Backlog', issues: linearIssues.filter((i) => i.status === 'backlog') },
    { label: 'Done', issues: linearIssues.filter((i) => i.status === 'done') },
  ]

  return (
    <div style={{ width: 560, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Issues</span>
        <CounterBadge>{linearIssues.length}</CounterBadge>
      </div>

      {/* Tabs */}
      <FixedTabs selectedIndex={selected} onTabChange={setSelected}>
        {tabs.map((tab, i) => (
          <FixedTabs.Tab key={i} value={`tab-${i}`}>
            <FixedTabs.TabCenter>{tab.label}</FixedTabs.TabCenter>
          </FixedTabs.Tab>
        ))}
      </FixedTabs>

      {/* Content */}
      <div style={{ minHeight: 200 }}>
        <LinearIssueTab
          issues={tabs[selected]?.issues ?? []}
          label={tabs[selected]?.label ?? ''}
        />
      </div>
    </div>
  )
}

export const Linear_이슈_분류탭: Story = {
  render: () => <LinearIssueTabs />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 비제어/제어 혼합 패턴 (defaultValue + value)
   aria-selected, role="tab" 명확한 접근성 속성 적용.
   Settings 페이지 탭 패턴
-------------------------------------------------------------------------- */
type SettingsSection = {
  id: string
  label: string
  icon: React.ReactNode
  description: string
  content: React.ReactNode
}

const settingsSections: SettingsSection[] = [
  {
    id: 'account',
    label: 'Account',
    icon: <PeopleLineIcon size={16} />,
    description: 'Manage your account settings and preferences.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { label: 'Display Name', value: 'heejun.kim', type: 'text' as const },
          { label: 'Email', value: 'heejun@orbit-ui.dev', type: 'email' as const },
        ].map((field) => (
          <div key={field.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{field.label}</label>
            <input
              type={field.type}
              defaultValue={field.value}
              readOnly
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1.5px solid #e2e8f0',
                fontSize: 13,
                color: '#0f172a',
                background: '#f8fafc',
                outline: 'none',
              }}
            />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <NotificationLineIcon size={16} />,
    description: 'Configure how you receive notifications.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { label: 'Issue assigned to me', enabled: true },
          { label: 'Comments on my issues', enabled: true },
          { label: 'Project updates', enabled: false },
          { label: 'Weekly digest', enabled: false },
        ].map((item, _i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: 13, color: '#1e293b' }}>{item.label}</span>
            <div style={{
              width: 36,
              height: 20,
              borderRadius: 10,
              background: item.enabled ? '#6366f1' : '#e2e8f0',
              position: 'relative',
              cursor: 'pointer',
              flexShrink: 0,
            }}>
              <div style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#fff',
                position: 'absolute',
                top: 2,
                left: item.enabled ? 18 : 2,
                transition: 'left 0.15s',
              }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: <SettingLineIcon size={16} />,
    description: 'Customize the look and feel of the interface.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Theme</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Light', 'Dark', 'System'].map((t) => (
            <button
              key={t}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 8,
                border: `1.5px solid ${t === 'Light' ? '#6366f1' : '#e2e8f0'}`,
                background: t === 'Light' ? 'rgba(99,102,241,0.06)' : '#fff',
                color: t === 'Light' ? '#6366f1' : '#475569',
                fontSize: 12,
                fontWeight: t === 'Light' ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginTop: 8, marginBottom: 4 }}>Density</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'Compact', desc: '32px rows' },
            { label: 'Default', desc: '44px rows' },
            { label: 'Comfortable', desc: '56px rows' },
          ].map((d, _i) => (
            <button
              key={d.label}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 8,
                border: `1.5px solid ${d.label === 'Default' ? '#6366f1' : '#e2e8f0'}`,
                background: d.label === 'Default' ? 'rgba(99,102,241,0.06)' : '#fff',
                color: d.label === 'Default' ? '#6366f1' : '#475569',
                fontSize: 11,
                fontWeight: d.label === 'Default' ? 700 : 400,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div>{d.label}</div>
              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{d.desc}</div>
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: <HomeLineIcon size={16} />,
    description: 'Connect third-party tools and services.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { name: 'GitHub', desc: 'Sync issues and pull requests', connected: true },
          { name: 'Figma', desc: 'Attach design files to issues', connected: true },
          { name: 'Slack', desc: 'Get notifications in Slack', connected: false },
        ].map((integration) => (
          <div key={integration.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fafafa' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{integration.name}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{integration.desc}</div>
            </div>
            {integration.connected ? (
              <LabelBadge color="benefit">
                <LabelBadge.Visual><CheckIcon /></LabelBadge.Visual>
                <LabelBadge.Label>Connected</LabelBadge.Label>
              </LabelBadge>
            ) : (
              <LabelBadge color="gray">
                <LabelBadge.Label>Connect</LabelBadge.Label>
              </LabelBadge>
            )}
          </div>
        ))}
      </div>
    ),
  },
]

const RadixSettingsTabs = () => {
  const [activeId, setActiveId] = useState('account')
  const activeSection = settingsSections.find((s) => s.id === activeId) ?? settingsSections[0]

  return (
    <div style={{ width: 640, display: 'flex', gap: 0, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      {/* Vertical sidebar nav (Radix-style controlled tabs) */}
      <div
        role="tablist"
        aria-label="Settings sections"
        style={{ width: 180, borderRight: '1px solid #f1f5f9', padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 2, background: '#f8fafc', flexShrink: 0 }}
      >
        {settingsSections.map((section) => {
          const isActive = activeId === section.id
          return (
            <button
              key={section.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${section.id}`}
              id={`tab-${section.id}`}
              onClick={() => setActiveId(section.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                borderRadius: 8,
                border: 'none',
                background: isActive ? '#fff' : 'transparent',
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                color: isActive ? '#6366f1' : '#475569',
                fontWeight: isActive ? 600 : 400,
                fontSize: 13,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ flexShrink: 0, color: isActive ? '#6366f1' : '#94a3b8' }}>{section.icon}</span>
              {section.label}
            </button>
          )
        })}
      </div>

      {/* Content panel */}
      <div
        role="tabpanel"
        id={`panel-${activeSection.id}`}
        aria-labelledby={`tab-${activeSection.id}`}
        style={{ flex: 1, padding: 24 }}
      >
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{activeSection.label}</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>{activeSection.description}</div>
        </div>
        {activeSection.content}
      </div>
    </div>
  )
}

export const Radix_설정_사이드탭: Story = {
  render: () => <RadixSettingsTabs />,
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 수평 고정 탭 + 콘텐츠 패널 with 개수 배지
   "Views" 탭 패턴 (Board / List / Timeline) with CounterBadge
-------------------------------------------------------------------------- */
const LinearViewTabs = () => {
  const [selected, setSelected] = useState(0)

  const views = [
    {
      id: 'board',
      label: 'Board',
      count: 24,
      content: (
        <div style={{ display: 'flex', gap: 12, padding: '16px 0', overflowX: 'auto' }}>
          {[
            { col: 'Todo', color: '#94a3b8', items: ['Update auth flow', 'Add dark mode'] },
            { col: 'In Progress', color: '#6366f1', items: ['Design system audit', 'Token migration'] },
            { col: 'Done', color: '#10b981', items: ['Release v1.4', 'Fix modal z-index', 'Update docs'] },
          ].map((col) => (
            <div key={col.col} style={{ width: 180, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{col.col}</span>
                <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>{col.items.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {col.items.map((item) => (
                  <div key={item} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, color: '#1e293b', background: '#fff', cursor: 'pointer' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'list',
      label: 'List',
      count: 24,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, paddingTop: 8 }}>
          {linearIssues.slice(0, 5).map((issue) => (
            <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid #f8fafc' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusDotColor[issue.status], flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', flexShrink: 0 }}>{issue.id}</span>
              <span style={{ fontSize: 13, color: '#1e293b', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{issue.title}</span>
              <LabelBadge color={priorityBadgeColor[issue.priority]}>
                <LabelBadge.Label>{issue.priority}</LabelBadge.Label>
              </LabelBadge>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'timeline',
      label: 'Timeline',
      count: 8,
      content: (
        <div style={{ paddingTop: 12 }}>
          <div style={{ position: 'relative', paddingLeft: 20 }}>
            <div style={{ position: 'absolute', left: 7, top: 4, bottom: 4, width: 2, background: '#e2e8f0', borderRadius: 2 }} />
            {[
              { date: 'Apr 10', event: 'Cycle 17 started', color: '#6366f1' },
              { date: 'Apr 8', event: 'Token system v3 merged', color: '#10b981' },
              { date: 'Apr 5', event: 'Storybook 8 upgrade', color: '#f59e0b' },
              { date: 'Apr 1', event: 'v1.4 released', color: '#8b5cf6' },
            ].map((ev) => (
              <div key={ev.date} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16, position: 'relative' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: ev.color, border: '2px solid #fff', flexShrink: 0, zIndex: 1, marginLeft: -15 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{ev.event}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{ev.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div style={{ width: 560, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Orbit UI</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Grid', 'Filter'].map((btn) => (
            <button
              key={btn}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid #e2e8f0',
                background: '#fff',
                fontSize: 11,
                color: '#64748b',
                cursor: 'pointer',
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs with CounterBadge */}
      <FixedTabs selectedIndex={selected} onTabChange={setSelected}>
        {views.map((view, i) => (
          <FixedTabs.Tab key={i} value={view.id}>
            <FixedTabs.TabCenter>{view.label}</FixedTabs.TabCenter>
            <FixedTabs.TabTrailing>
              <CounterBadge>{view.count}</CounterBadge>
            </FixedTabs.TabTrailing>
          </FixedTabs.Tab>
        ))}
      </FixedTabs>

      {/* Content */}
      <div style={{ padding: '0 16px 16px' }}>
        {views[selected]?.content}
      </div>
    </div>
  )
}

export const Linear_뷰_전환탭: Story = {
  render: () => <LinearViewTabs />,
}

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 통계 대시보드 탭
   Arco Design의 Tabs + 데이터 카드 패턴 — 탭 전환 시 집계 지표 변경
   B2B 대시보드에서 기간/카테고리 전환에 널리 쓰이는 패턴
-------------------------------------------------------------------------- */
const periodData = {
  day: { visits: '2,841', bounce: '34.2%', duration: '2m 18s', conversions: '127', trend: '+12%' },
  week: { visits: '18,294', bounce: '31.7%', duration: '2m 44s', conversions: '891', trend: '+8%' },
  month: { visits: '74,120', bounce: '29.5%', duration: '3m 02s', conversions: '3,412', trend: '+21%' },
  quarter: { visits: '218,540', bounce: '28.1%', duration: '3m 18s', conversions: '10,247', trend: '+35%' },
}

type PeriodKey = keyof typeof periodData

const ArcoDashboardTabsRender = () => {
  const [period, setPeriod] = useState<PeriodKey>('week')
  const data = periodData[period]

  const tabs: { id: PeriodKey; label: string }[] = [
    { id: 'day', label: '오늘' },
    { id: 'week', label: '주간' },
    { id: 'month', label: '월간' },
    { id: 'quarter', label: '분기' },
  ]

  const metrics = [
    { label: '총 방문자', value: data.visits, sub: data.trend + ' vs 이전 기간', color: '#6366f1' },
    { label: '이탈률', value: data.bounce, sub: '평균 대비 -4.2%', color: '#ef4444' },
    { label: '평균 세션', value: data.duration, sub: '페이지 체류 시간', color: '#10b981' },
    { label: '전환수', value: data.conversions, sub: '목표 달성 횟수', color: '#f59e0b' },
  ]

  return (
    <div style={{ width: 560, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '16px 20px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>트래픽 분석</div>
        <FixedTabs
          selectedIndex={tabs.findIndex((t) => t.id === period)}
          onTabChange={(i) => setPeriod(tabs[i].id)}
        >
          {tabs.map((tab) => (
            <FixedTabs.Tab key={tab.id} value={tab.id}>
              <FixedTabs.TabCenter>{tab.label}</FixedTabs.TabCenter>
            </FixedTabs.Tab>
          ))}
        </FixedTabs>
      </div>

      <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{
            padding: '16px', borderRadius: 10,
            border: '1px solid #f1f5f9', background: '#f8fafc',
          }}>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              {m.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: m.color, letterSpacing: '-0.02em' }}>{m.value}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{m.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Arco_통계_대시보드_탭: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design의 Tabs + 데이터 카드 패턴. 기간 탭 전환 시 집계 지표가 변경됩니다. ' +
          'B2B 어드민/대시보드에서 날짜 범위 필터 역할로 자주 쓰이는 패턴입니다.',
      },
    },
  },
  render: () => <ArcoDashboardTabsRender />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: Secondary Tabs (아이콘 + 레이블)
   M3의 Secondary Tab 패턴 — 아이콘과 텍스트를 수직 배치하는 
   탐색형 탭 UI, 하단 인디케이터와 Surface variant 색상
-------------------------------------------------------------------------- */
const M3SecondaryTabsRender = () => {
  const [selected, setSelected] = useState(0)

  const tabs = [
    { icon: <HomeLineIcon className="h-5 w-5" />, label: '홈' },
    { icon: <PeopleLineIcon className="h-5 w-5" />, label: '팀' },
    { icon: <NotificationLineIcon className="h-5 w-5" />, label: '알림' },
    { icon: <SettingLineIcon className="h-5 w-5" />, label: '설정' },
  ]

  const contents = [
    {
      title: '최근 활동',
      items: ['Orbit UI v2.0 배포 완료', 'AlertDialog 스토리 3개 추가', 'Vercel 자동 배포 설정 완료'],
    },
    {
      title: '팀 멤버',
      items: ['Kim Heejun (FE Lead)', 'Park Jisoo (Designer)', 'Lee Minjae (BE)'],
    },
    {
      title: '읽지 않은 알림',
      items: ['빌드 성공 — main branch', '코드 리뷰 요청 — feat/cycle-35', '이슈 #124 할당됨'],
    },
    {
      title: '환경 설정',
      items: ['다크 모드: 시스템 설정 따름', '언어: 한국어', '알림: 켜짐'],
    },
  ]

  return (
    <div style={{ width: 400, background: '#FFFBFE', borderRadius: 16, overflow: 'hidden', border: '1px solid #E6E1E5' }}>
      {/* M3 Secondary Tabs */}
      <div style={{ background: '#ECE6F0', borderBottom: '1px solid #CAC4D0' }}>
        <div style={{ display: 'flex' }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                flex: 1, padding: '12px 8px', border: 'none', background: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                position: 'relative',
                color: i === selected ? '#6750A4' : '#49454F',
                transition: 'color 0.2s ease',
              }}
            >
              {tab.icon}
              <span style={{ fontSize: 11, fontWeight: i === selected ? 700 : 500, letterSpacing: '0.04em' }}>
                {tab.label}
              </span>
              {/* M3 하단 인디케이터 */}
              <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                height: 3, borderRadius: '3px 3px 0 0', background: '#6750A4',
                width: i === selected ? '100%' : 0, transition: 'width 0.25s ease',
              }} />
            </button>
          ))}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: '#1C1B1F', marginBottom: 12, letterSpacing: '0.015em' }}>
          {contents[selected].title}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {contents[selected].items.map((item, i) => (
            <div key={i} style={{
              padding: '10px 14px', borderRadius: 10,
              background: '#F7F2FA', border: '1px solid #E6E1E5',
              fontSize: 13, color: '#49454F', lineHeight: 1.5,
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 16px', fontSize: 11, color: '#79747E', letterSpacing: '0.04em' }}>
        Material Design 3 · Secondary Tabs · Surface Container Low
      </div>
    </div>
  )
}

export const Material3_세컨더리_탭: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3의 Secondary Tabs 패턴. 아이콘과 레이블을 수직 배치하고 하단 인디케이터(3px, 보라색)로 선택 상태를 표시합니다. ' +
          'Surface Container Low(#ECE6F0) 배경을 사용하는 M3 가이드라인 준수 구현입니다.',
      },
    },
  },
  render: () => <M3SecondaryTabsRender />,
}

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 스크롤 가능한 콘텐츠 카테고리 탭
   Arco Design의 Tabs + 리스트 패턴 — 많은 카테고리를 가진 콘텐츠 탐색
   e커머스/뉴스 앱에서 카테고리 필터링에 사용되는 패턴
-------------------------------------------------------------------------- */
const categories = ['전체', '컴포넌트', '테마', '접근성', '성능', '타입스크립트', '스토리북', '배포', '마이그레이션']

const categoryContent: Record<string, { title: string; count: number; latest: string }[]> = {
  '전체': [
    { title: 'Orbit UI v2.0 출시', count: 48, latest: '2시간 전' },
    { title: '새 AlertDialog 스토리 추가', count: 12, latest: '3시간 전' },
    { title: 'Vercel 자동 배포 수정', count: 7, latest: '5시간 전' },
  ],
  '컴포넌트': [
    { title: 'Carousel 3종 스토리 추가', count: 31, latest: '방금 전' },
    { title: 'TabGroup M3 패턴 반영', count: 18, latest: '1시간 전' },
  ],
  '테마': [
    { title: 'Eclipse 다크 토큰 업데이트', count: 9, latest: '1일 전' },
    { title: 'CSS 변수 오버라이드 가이드', count: 5, latest: '2일 전' },
  ],
  '접근성': [
    { title: 'WAI-ARIA 가이드 MDX 추가', count: 14, latest: '3일 전' },
  ],
  '성능': [
    { title: '번들 사이즈 최적화', count: 6, latest: '1주 전' },
  ],
  '타입스크립트': [
    { title: 'forwardRef 타입 개선', count: 3, latest: '5일 전' },
  ],
  '스토리북': [
    { title: '자동 배포 MDX 설정', count: 11, latest: '4일 전' },
  ],
  '배포': [
    { title: 'Vercel vercel.json 추가', count: 8, latest: '오늘' },
  ],
  '마이그레이션': [
    { title: 'Ant Design 마이그레이션 가이드', count: 22, latest: '오늘' },
  ],
}

const ArcoScrollableTabsRender = () => {
  const [selected, setSelected] = useState('전체')
  const items = categoryContent[selected] ?? categoryContent['전체']

  return (
    <div style={{ width: 520, border: '1px solid #e2e8f0', borderRadius: 12, background: '#fff', overflow: 'hidden' }}>
      {/* 스크롤 가능한 카테고리 탭 */}
      <div style={{
        display: 'flex', gap: 0,
        overflowX: 'auto', padding: '12px 16px 0',
        borderBottom: '1px solid #f1f5f9',
        scrollbarWidth: 'none',
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            style={{
              flexShrink: 0, padding: '8px 14px', border: 'none', background: 'none',
              fontSize: 13, fontWeight: selected === cat ? 700 : 500, cursor: 'pointer',
              color: selected === cat ? '#6366f1' : '#64748b',
              borderBottom: selected === cat ? '2px solid #6366f1' : '2px solid transparent',
              transition: 'all 0.2s ease', whiteSpace: 'nowrap',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 콘텐츠 리스트 */}
      <div style={{ padding: '16px' }}>
        {items.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            이 카테고리에는 아직 게시물이 없습니다.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map((item, i) => (
              <div key={i} style={{
                padding: '14px 16px', borderRadius: 10,
                border: '1px solid #f1f5f9', background: '#f8fafc',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.latest}</div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 11, color: '#6366f1', fontWeight: 700,
                }}>
                  <span>{item.count}</span>
                  <span style={{ color: '#94a3b8', fontWeight: 400 }}>댓글</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '0 16px 14px', fontSize: 11, color: '#94a3b8' }}>
        Arco Design Tabs + List 패턴 · 카테고리 필터 탐색
      </div>
    </div>
  )
}

export const Arco_카테고리_필터_탭: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design의 Tabs + 리스트 패턴. overflowX: auto로 많은 카테고리를 가로 스크롤 가능하게 처리합니다. ' +
          'e커머스, 뉴스, 커뮤니티 앱의 카테고리 필터링 탐색에 널리 사용되는 실무 패턴입니다.',
      },
    },
  },
  render: () => <ArcoScrollableTabsRender />,
}

// ─── Cycle 63: Chakra UI + Google Material 3 ───────────────────────────────

const CHAKRA_PROFILE_TABS = [
  {
    id: 'posts',
    label: '게시물',
    count: 42,
    content: [
      { title: 'Orbit UI 릴리즈 v2.0', date: '2시간 전', views: 312 },
      { title: 'vanilla-extract 마이그레이션 후기', date: '1일 전', views: 891 },
      { title: '디자인 토큰 시스템 구축기', date: '3일 전', views: 1240 },
    ],
  },
  {
    id: 'comments',
    label: '댓글',
    count: 128,
    content: [
      { title: '"정말 유용한 글이네요. 감사합니다!"', date: '5분 전', views: null },
      { title: '"vanilla-extract 예제 더 부탁드려요"', date: '2시간 전', views: null },
      { title: '"탁월한 접근 방식입니다"', date: '어제', views: null },
    ],
  },
  {
    id: 'saved',
    label: '저장됨',
    count: 19,
    content: [
      { title: 'React 19 신기능 정리', date: '저장: 2일 전', views: 4500 },
      { title: 'Storybook 8 마이그레이션', date: '저장: 1주 전', views: 2100 },
      { title: 'pnpm workspaces 완전 가이드', date: '저장: 2주 전', views: 3800 },
    ],
  },
  {
    id: 'following',
    label: '팔로잉',
    count: 7,
    content: [
      { title: '@shadcn', date: '팔로우: 1개월 전', views: null },
      { title: '@t3dotgg', date: '팔로우: 2개월 전', views: null },
      { title: '@leeerob', date: '팔로우: 3개월 전', views: null },
    ],
  },
]

const ChakraUserProfileTabsRender = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = CHAKRA_PROFILE_TABS[activeIdx]

  return (
    <div style={{ width: 400, fontFamily: 'system-ui, sans-serif' }}>
      {/* Profile header */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, padding: '0 4px' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 22 }}>HJ</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>hjunkim</div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>UI 엔지니어 · Orbit UI 메인테이너</div>
        </div>
      </div>
      {/* Tabs */}
      <FixedTabs selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {CHAKRA_PROFILE_TABS.map((tab) => (
          <FixedTabs.Tab key={tab.id} value={tab.id}>
            <FixedTabs.TabCenter>{tab.label}</FixedTabs.TabCenter>
            <FixedTabs.TabTrailing>
              <CounterBadge>{tab.count}</CounterBadge>
            </FixedTabs.TabTrailing>
          </FixedTabs.Tab>
        ))}
      </FixedTabs>
      {/* Content */}
      <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {current.content.map((item, i) => (
          <div key={i} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{item.title}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>{item.date}</div>
            </div>
            {item.views !== null && (
              <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 700 }}>{item.views.toLocaleString()} 뷰</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export const Chakra_유저_프로필_탭: Story = {
  name: 'Chakra UI - 유저 프로필 섹션 탭',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI의 Tabs 컴포넌트를 벤치마크한 유저 프로필 탭 패턴. ' +
          '게시물/댓글/저장/팔로잉 탭에 CounterBadge를 함께 표시하며 활성 탭 콘텐츠가 즉시 전환됩니다.',
      },
    },
  },
  render: () => <ChakraUserProfileTabsRender />,
}

type M3TabId = 'home' | 'explore' | 'library' | 'profile'

const M3_TABS: Array<{ id: M3TabId; label: string; icon: string }> = [
  { id: 'home', label: 'Home', icon: 'H' },
  { id: 'explore', label: 'Explore', icon: 'E' },
  { id: 'library', label: 'Library', icon: 'L' },
  { id: 'profile', label: 'Profile', icon: 'P' },
]

const M3_CONTENT: Record<M3TabId, { headline: string; items: string[] }> = {
  home:    { headline: '추천 콘텐츠', items: ['Design Tokens Deep Dive', 'React 19 Actions', 'CSS Layers 완전 이해'] },
  explore: { headline: '탐색하기', items: ['Figma 플러그인 모음', 'Storybook 8 신기능', 'Tailwind v4 미리보기'] },
  library: { headline: '내 라이브러리', items: ['북마크 24개', '다운로드 8개', '최근 열람 12개'] },
  profile: { headline: '내 프로필', items: ['작성 게시물 42개', '팔로워 320명', '팔로잉 17명'] },
}

const Material3SecondaryTabsRender = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeId = M3_TABS[activeIdx].id
  const content = M3_CONTENT[activeId]

  return (
    <div style={{ width: 380, border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', background: '#fffbfe', fontFamily: 'system-ui, sans-serif' }}>
      {/* M3 Top app bar */}
      <div style={{ padding: '16px 20px 12px', background: '#fffbfe', borderBottom: '1px solid #e7e0ec' }}>
        <div style={{ fontSize: 22, fontWeight: 400, color: '#1c1b1f', letterSpacing: 0 }}>Orbit Library</div>
      </div>
      {/* M3 Secondary Tabs — filled indicator */}
      <div style={{ borderBottom: '1px solid #e7e0ec' }}>
        <FixedTabs selectedIndex={activeIdx} onTabChange={setActiveIdx}>
          {M3_TABS.map((tab) => (
            <FixedTabs.Tab key={tab.id} value={tab.id}>
              <FixedTabs.TabLeading>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: '#6750a4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{tab.icon}</div>
              </FixedTabs.TabLeading>
              <FixedTabs.TabCenter>{tab.label}</FixedTabs.TabCenter>
            </FixedTabs.Tab>
          ))}
        </FixedTabs>
      </div>
      {/* Content */}
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#6750a4', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{content.headline}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {content.items.map((item, i) => (
            <div key={i} style={{ padding: '12px 14px', borderRadius: 12, background: '#f4eff4', fontSize: 13, color: '#1c1b1f', fontWeight: 500 }}>{item}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 20px 14px', fontSize: 11, color: '#79747e' }}>
        Material 3 Secondary Tabs — filled indicator + leading icon 패턴
      </div>
    </div>
  )
}

export const Material3_세컨더리_아이콘_탭: Story = {
  name: 'Google Material 3 - Secondary Tabs with Icon',
  parameters: {
    docs: {
      description: {
        story:
          'Google Material Design 3의 Secondary Tabs 패턴. ' +
          'Leading 아이콘 슬롯에 M3 색상 역할(primary) 아이콘을 배치하고, ' +
          '#fffbfe 서피스와 #6750a4 primary 팔레트로 M3 컬러 시스템을 표현합니다.',
      },
    },
  },
  render: () => <Material3SecondaryTabsRender />,
}

type ChakraSettingSection = 'account' | 'notifications' | 'privacy' | 'integrations'

const CHAKRA_SETTING_TABS: Array<{ id: ChakraSettingSection; label: string; desc: string }> = [
  { id: 'account', label: '계정', desc: '프로필, 이메일, 비밀번호를 관리합니다.' },
  { id: 'notifications', label: '알림', desc: '이메일, 푸시, 인앱 알림 설정을 조정합니다.' },
  { id: 'privacy', label: '개인정보', desc: '공개 범위와 데이터 수집 동의를 설정합니다.' },
  { id: 'integrations', label: '연동', desc: '외부 서비스와의 연동을 관리합니다.' },
]

const CHAKRA_SETTINGS_FIELDS: Record<ChakraSettingSection, Array<{ label: string; value: string; type: 'text' | 'toggle' | 'select' }>> = {
  account:       [{ label: '이름', value: 'Heejun Kim', type: 'text' }, { label: '이메일', value: 'hjunkim@orbit.dev', type: 'text' }, { label: '언어', value: '한국어', type: 'select' }],
  notifications: [{ label: '이메일 알림', value: 'on', type: 'toggle' }, { label: '푸시 알림', value: 'off', type: 'toggle' }, { label: '주간 요약', value: 'on', type: 'toggle' }],
  privacy:       [{ label: '프로필 공개', value: 'on', type: 'toggle' }, { label: '활동 공개', value: 'off', type: 'toggle' }, { label: '광고 개인화', value: 'off', type: 'toggle' }],
  integrations:  [{ label: 'GitHub', value: '연결됨', type: 'select' }, { label: 'Figma', value: '미연결', type: 'select' }, { label: 'Slack', value: '연결됨', type: 'select' }],
}

const ChakraSettingsPanelRender = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeId = CHAKRA_SETTING_TABS[activeIdx].id
  const fields = CHAKRA_SETTINGS_FIELDS[activeId]
  const [toggles, setToggles] = useState<Record<string, boolean>>({ '이메일 알림': true, '주간 요약': true, '프로필 공개': true })

  return (
    <div style={{ width: 420, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 16, padding: '0 4px' }}>설정</div>
      {/* Vertical-style fixed tabs */}
      <FixedTabs selectedIndex={activeIdx} onTabChange={setActiveIdx}>
        {CHAKRA_SETTING_TABS.map((tab) => (
          <FixedTabs.Tab key={tab.id} value={tab.id}>
            <FixedTabs.TabCenter>{tab.label}</FixedTabs.TabCenter>
          </FixedTabs.Tab>
        ))}
      </FixedTabs>
      <div style={{ marginTop: 20, padding: '0 2px' }}>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16, lineHeight: 1.5 }}>
          {CHAKRA_SETTING_TABS[activeIdx].desc}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fields.map((field) => (
            <div key={field.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{field.label}</span>
              {field.type === 'toggle' ? (
                <div
                  onClick={() => setToggles(prev => ({ ...prev, [field.label]: !prev[field.label] }))}
                  style={{ width: 36, height: 20, borderRadius: 10, background: toggles[field.label] ? '#6366f1' : '#e2e8f0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}
                >
                  <div style={{ position: 'absolute', top: 2, left: toggles[field.label] ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              ) : (
                <span style={{ fontSize: 12, color: '#64748b', background: '#f8fafc', padding: '3px 10px', borderRadius: 6, border: '1px solid #e2e8f0' }}>{field.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Chakra_설정_패널_탭: Story = {
  name: 'Chakra UI - 설정 패널 섹션 탭',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI의 설정 페이지 탭 패턴. 계정/알림/개인정보/연동 탭 전환으로 설정 영역을 분리하고, ' +
          '토글/텍스트/선택 세 가지 설정 필드 유형을 인라인으로 관리할 수 있습니다.',
      },
    },
  },
  render: () => <ChakraSettingsPanelRender />,
}
