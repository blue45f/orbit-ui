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
