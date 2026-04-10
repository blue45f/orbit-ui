import { CheckIcon, HomeLineIcon, PeopleLineIcon, SettingLineIcon, NotificationLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { CounterBadge } from '../CounterBadge'
import { LabelBadge } from '../LabelBadge'
import { SolidButton } from '../SolidButton'

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

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 컴포넌트 문서 탭 패턴
   shadcn/ui의 Preview/Code/CLI 3탭 패턴 — 컴포넌트 설치·미리보기·코드 전환
-------------------------------------------------------------------------- */
type ShadcnDocTab = 'preview' | 'code' | 'cli'

const SHADCN_DOC_TABS: Array<{ id: ShadcnDocTab; label: string }> = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'cli', label: 'CLI' },
]

const CODE_SNIPPET = `import { SolidButton } from '@heejun-com/theme-eclipse'

export function Example() {
  return (
    <SolidButton variant="primary">
      Click me
    </SolidButton>
  )
}`

const CLI_SNIPPET = `# pnpm
pnpm add @heejun-com/theme-eclipse

# npm
npm install @heejun-com/theme-eclipse

# yarn
yarn add @heejun-com/theme-eclipse`

function ShadcnDocTabsRender() {
  const [activeIdx, setActiveIdx] = useState(0)
  const tabs: ShadcnDocTab[] = ['preview', 'code', 'cli']
  const activeId = tabs[activeIdx]

  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>SolidButton</div>
        <div style={{ fontSize: 12, color: '#64748b' }}>Displays a button or a component that looks like a button.</div>
      </div>
      <div style={{ borderBottom: '1px solid #e2e8f0', padding: '0 16px' }}>
        <FixedTabs selectedIndex={activeIdx} onTabChange={setActiveIdx}>
          {SHADCN_DOC_TABS.map((tab) => (
            <FixedTabs.Tab key={tab.id} value={tab.id}>
              <FixedTabs.TabCenter>{tab.label}</FixedTabs.TabCenter>
            </FixedTabs.Tab>
          ))}
        </FixedTabs>
      </div>
      <div style={{ padding: 20, minHeight: 140 }}>
        {activeId === 'preview' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 100, background: 'repeating-linear-gradient(45deg,#f8fafc,#f8fafc 10px,#fff 10px,#fff 20px)', borderRadius: 8, border: '1px solid #f1f5f9' }}>
            <LabelBadge color="benefit">Primary</LabelBadge>
          </div>
        )}
        {activeId === 'code' && (
          <pre style={{ margin: 0, padding: '14px 16px', background: '#0f172a', borderRadius: 8, fontSize: 12, color: '#e2e8f0', overflowX: 'auto', lineHeight: 1.7 }}>
            <code>{CODE_SNIPPET}</code>
          </pre>
        )}
        {activeId === 'cli' && (
          <pre style={{ margin: 0, padding: '14px 16px', background: '#0f172a', borderRadius: 8, fontSize: 12, color: '#e2e8f0', overflowX: 'auto', lineHeight: 1.7 }}>
            <code>{CLI_SNIPPET}</code>
          </pre>
        )}
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid #f1f5f9', background: '#fafafa', fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>
        shadcn/ui docs 패턴 — Preview / Code / CLI 전환 탭
      </div>
    </div>
  )
}

export const Shadcn_컴포넌트_문서_탭: Story = {
  name: 'shadcn/ui - 컴포넌트 문서 Preview/Code/CLI 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui 공식 문서의 컴포넌트 페이지 패턴. Preview·Code·CLI 세 탭으로 ' +
          '컴포넌트 미리보기, 소스코드, 설치 CLI 명령어를 전환합니다. ' +
          'FixedTabs로 탭을 구현하고 탭별로 다른 콘텐츠 렌더링 유형을 보여줍니다.',
      },
    },
  },
  render: () => <ShadcnDocTabsRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 인증 탭 패턴
   shadcn/ui의 Card + Tabs 조합 — 로그인/회원가입 탭 전환
-------------------------------------------------------------------------- */
type ShadcnAuthTab = 'login' | 'signup'

function ShadcnAuthTabsRender() {
  const [activeIdx, setActiveIdx] = useState(0)
  const tabs: ShadcnAuthTab[] = ['login', 'signup']
  const activeId = tabs[activeIdx]

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1.5px solid #e2e8f0',
    fontSize: 13,
    color: '#0f172a',
    outline: 'none',
    boxSizing: 'border-box',
    background: '#fff',
  }

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Orbit UI</div>
        <div style={{ fontSize: 13, color: '#64748b' }}>계정에 로그인하거나 새 계정을 만드세요.</div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '0 16px', borderBottom: '1px solid #e2e8f0' }}>
          <FixedTabs selectedIndex={activeIdx} onTabChange={setActiveIdx}>
            <FixedTabs.Tab value="login">
              <FixedTabs.TabCenter>로그인</FixedTabs.TabCenter>
            </FixedTabs.Tab>
            <FixedTabs.Tab value="signup">
              <FixedTabs.TabCenter>회원가입</FixedTabs.TabCenter>
            </FixedTabs.Tab>
          </FixedTabs>
        </div>
        <div style={{ padding: 20 }}>
          {activeId === 'login' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>이메일</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>비밀번호</label>
                  <span style={{ fontSize: 11, color: '#6366f1', cursor: 'pointer' }}>비밀번호 찾기</span>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <button
                onClick={handleSubmit}
                style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', background: submitted ? '#10b981' : '#0f172a', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', marginTop: 4 }}
              >
                {submitted ? '로그인 완료!' : '로그인'}
              </button>
            </div>
          )}
          {activeId === 'signup' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>이름</label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm((p) => ({ ...p, name: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>이메일</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm((p) => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>비밀번호</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm((p) => ({ ...p, password: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <button
                onClick={handleSubmit}
                style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', background: submitted ? '#10b981' : '#6366f1', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', marginTop: 4 }}
              >
                {submitted ? '가입 완료!' : '계정 만들기'}
              </button>
              <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', lineHeight: 1.5 }}>
                가입 시 이용약관 및 개인정보처리방침에 동의합니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Shadcn_인증_탭: Story = {
  name: 'shadcn/ui - 로그인/회원가입 Card + Tabs 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui의 Authentication Card + Tabs 패턴. FixedTabs로 로그인/회원가입을 전환하며 ' +
          '각 탭마다 독립적인 폼 상태를 유지합니다. 제출 버튼 클릭 시 2초간 완료 상태로 전환됩니다.',
      },
    },
  },
  render: () => <ShadcnAuthTabsRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 메트릭 대시보드 탭
   shadcn/ui의 Dashboard Overview 패턴 — 기간별 지표를 탭으로 전환
-------------------------------------------------------------------------- */
type ShadcnPeriod = '7d' | '30d' | '90d'

const SHADCN_PERIODS: Array<{ id: ShadcnPeriod; label: string }> = [
  { id: '7d', label: '7일' },
  { id: '30d', label: '30일' },
  { id: '90d', label: '90일' },
]

const SHADCN_METRICS: Record<ShadcnPeriod, Array<{ label: string; value: string; change: string; up: boolean }>> = {
  '7d':  [
    { label: '총 방문자', value: '12,340', change: '+8.2%', up: true },
    { label: '신규 가입', value: '284', change: '+12.1%', up: true },
    { label: '이탈률', value: '42.3%', change: '-2.4%', up: false },
    { label: '전환율', value: '3.1%', change: '+0.5%', up: true },
  ],
  '30d': [
    { label: '총 방문자', value: '48,921', change: '+5.7%', up: true },
    { label: '신규 가입', value: '1,042', change: '+9.3%', up: true },
    { label: '이탈률', value: '39.8%', change: '-4.1%', up: false },
    { label: '전환율', value: '3.6%', change: '+0.8%', up: true },
  ],
  '90d': [
    { label: '총 방문자', value: '142,087', change: '+14.5%', up: true },
    { label: '신규 가입', value: '3,289', change: '+22.4%', up: true },
    { label: '이탈률', value: '37.2%', change: '-6.7%', up: false },
    { label: '전환율', value: '4.1%', change: '+1.4%', up: true },
  ],
}

function ShadcnMetricDashboardRender() {
  const [activeIdx, setActiveIdx] = useState(0)
  const periods: ShadcnPeriod[] = ['7d', '30d', '90d']
  const metrics = SHADCN_METRICS[periods[activeIdx]]

  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Analytics Overview</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>서비스 핵심 지표를 기간별로 확인합니다.</div>
        </div>
        <FixedTabs selectedIndex={activeIdx} onTabChange={setActiveIdx}>
          {SHADCN_PERIODS.map((p) => (
            <FixedTabs.Tab key={p.id} value={p.id}>
              <FixedTabs.TabCenter>{p.label}</FixedTabs.TabCenter>
            </FixedTabs.Tab>
          ))}
        </FixedTabs>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{m.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: m.up ? '#10b981' : '#ef4444' }}>
                {m.up ? '▲' : '▼'}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: m.up ? '#10b981' : '#ef4444' }}>{m.change}</span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>vs 이전 기간</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9', fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        shadcn/ui Dashboard Overview 패턴 — 기간 탭으로 지표 데이터 전환
      </div>
    </div>
  )
}

export const Shadcn_메트릭_대시보드_탭: Story = {
  name: 'shadcn/ui - Analytics 기간 필터 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Dashboard Overview 패턴. FixedTabs를 상단 우측에 배치해 7일/30일/90일 기간을 전환하고, ' +
          '2×2 그리드 메트릭 카드에 증감률과 방향 표시를 포함합니다. 기간 변경 시 모든 지표가 즉시 업데이트됩니다.',
      },
    },
  },
  render: () => <ShadcnMetricDashboardRender />,
}

/* --------------------------------------------------------------------------
   Vercel — 프로젝트 탭 네비게이션 (Cycle 120)
   Vercel Design의 compact project navigation 패턴
-------------------------------------------------------------------------- */
function VercelProjectNavRender() {
  const [tab, setTab] = React.useState(0)

  const tabs = [
    { label: '개요', count: null },
    { label: '배포', count: 119 },
    { label: '도메인', count: 2 },
    { label: '로그', count: null },
    { label: '설정', count: null },
  ]

  const panels = [
    <div key="overview" style={{ padding: '16px 0' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 8 }}>orbit-ui</div>
      <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
        프레임워크: Vite + React · 마지막 배포: 방금 전
      </div>
    </div>,
    <div key="deploys" style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {[{ id: 'dpl_119', status: 'ready', time: '방금 전' }, { id: 'dpl_118', status: 'ready', time: '3시간 전' }, { id: 'dpl_117', status: 'error', time: '어제' }].map((d) => (
        <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.status === 'ready' ? '#10b981' : '#ef4444' }} />
          <code style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', fontFamily: 'monospace' }}>{d.id}</code>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{d.time}</span>
        </div>
      ))}
    </div>,
    <div key="domains" style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['storybook-static.vercel.app', 'orbit-ui.vercel.app'].map((domain) => (
        <div key={domain} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
          {domain}
        </div>
      ))}
    </div>,
    <div key="logs" style={{ padding: '16px 0', fontFamily: 'monospace', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
      <div>[2026-04-10 11:32:12] Build completed in 27.5s</div>
      <div>[2026-04-10 11:31:44] Installing dependencies...</div>
      <div>[2026-04-10 11:31:30] Cloning repository...</div>
    </div>,
    <div key="settings" style={{ padding: '16px 0', fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
      프로젝트 설정: 빌드 명령, 출력 디렉토리, 환경 변수를 관리합니다.
    </div>,
  ]

  return (
    <div style={{ width: 480 }}>
      <FixedTabs selectedIndex={tab} onTabChange={setTab}>
        {tabs.map((t) => (
          <FixedTabs.Tab key={t.label}>
            <FixedTabs.TabCenter>{t.label}</FixedTabs.TabCenter>
            {t.count !== null && (
              <FixedTabs.TabTrailing>
                <CounterBadge>{t.count}</CounterBadge>
              </FixedTabs.TabTrailing>
            )}
          </FixedTabs.Tab>
        ))}
      </FixedTabs>
      {panels[tab]}
    </div>
  )
}

export const Vercel_프로젝트_탭_네비게이션: Story = {
  name: 'Vercel — 프로젝트 탭 네비게이션 (Cycle 120)',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Design의 project navigation 탭 패턴. 배포/도메인에 CounterBadge 카운트 표시, 각 탭별 실제 콘텐츠 패널 전환.',
      },
    },
  },
  render: () => <VercelProjectNavRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui — 문서 사이드 탭 (Cycle 120)
   shadcn의 docs page tab 패턴 — 코드/미리보기 전환
-------------------------------------------------------------------------- */
function ShadcnDocsTabRender() {
  const [tab, setTab] = React.useState(0)
  const [copied, setCopied] = React.useState(false)

  const codeSnippet = `import { SolidButton } from '@heejun-com/theme-eclipse'

export function Example() {
  return (
    <SolidButton color="primary" size="medium">
      <SolidButton.Center>Click me</SolidButton.Center>
    </SolidButton>
  )
}`

  function handleCopy() {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ width: 500, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 10, overflow: 'hidden' }}>
      <FixedTabs selectedIndex={tab} onTabChange={setTab}>
        <FixedTabs.Tab>
          <FixedTabs.TabCenter>미리보기</FixedTabs.TabCenter>
        </FixedTabs.Tab>
        <FixedTabs.Tab>
          <FixedTabs.TabCenter>코드</FixedTabs.TabCenter>
        </FixedTabs.Tab>
      </FixedTabs>
      {tab === 0 ? (
        <div style={{ padding: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100, background: 'var(--sem-eclipse-color-backgroundSecondary)' }}>
          <SolidButton color="primary" size="medium">
            <SolidButton.Center>Click me</SolidButton.Center>
          </SolidButton>
        </div>
      ) : (
        <div style={{ position: 'relative', background: '#0f172a' }}>
          <pre style={{ margin: 0, padding: '20px 16px', fontSize: 12, color: '#e2e8f0', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.6 }}>
            {codeSnippet}
          </pre>
          <button
            onClick={handleCopy}
            style={{ position: 'absolute', top: 10, right: 10, padding: '4px 10px', fontSize: 11, borderRadius: 5, border: 'none', background: copied ? '#10b981' : '#334155', color: '#e2e8f0', cursor: 'pointer', fontWeight: 600 }}
          >
            {copied ? '복사됨' : '복사'}
          </button>
        </div>
      )}
    </div>
  )
}

export const shadcn_문서_코드_프리뷰_탭: Story = {
  name: 'shadcn/ui — 문서 코드/미리보기 탭 (Cycle 120)',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui의 docs page preview/code 탭 패턴. 미리보기와 코드 스니펫 전환, 복사 버튼 포함.',
      },
    },
  },
  render: () => <ShadcnDocsTabRender />,
}

/* --------------------------------------------------------------------------
   Vercel + shadcn — 설정 카테고리 탭 (Cycle 120)
   프로젝트 설정을 카테고리 탭으로 구성하는 패턴
-------------------------------------------------------------------------- */
function VercelShadcnSettingsTabRender() {
  const [tab, setTab] = React.useState(0)
  const [saved, setSaved] = React.useState(false)

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const settingGroups = [
    {
      label: '일반',
      icon: <SettingLineIcon style={{ width: 13, height: 13 }} />,
      fields: [
        { label: '프로젝트 이름', value: 'orbit-ui', type: 'text' },
        { label: '설명', value: 'React 디자인 시스템', type: 'text' },
        { label: '공개 여부', value: '공개', type: 'select' },
      ],
    },
    {
      label: '알림',
      icon: <NotificationLineIcon style={{ width: 13, height: 13 }} />,
      fields: [
        { label: '배포 성공 알림', value: '활성화', type: 'toggle' },
        { label: '배포 실패 알림', value: '활성화', type: 'toggle' },
        { label: '이메일 수신 주소', value: 'admin@orbit-ui.dev', type: 'text' },
      ],
    },
    {
      label: '팀',
      icon: <PeopleLineIcon style={{ width: 13, height: 13 }} />,
      fields: [
        { label: '팀 이름', value: 'blue45fs-projects', type: 'text' },
        { label: '멤버 수', value: '3명', type: 'readonly' },
        { label: '플랜', value: 'Hobby (Free)', type: 'readonly' },
      ],
    },
  ]

  const group = settingGroups[tab]

  return (
    <div style={{ width: 480 }}>
      <FixedTabs selectedIndex={tab} onTabChange={setTab}>
        {settingGroups.map((g) => (
          <FixedTabs.Tab key={g.label}>
            <FixedTabs.TabLeading>{g.icon}</FixedTabs.TabLeading>
            <FixedTabs.TabCenter>{g.label}</FixedTabs.TabCenter>
          </FixedTabs.Tab>
        ))}
      </FixedTabs>
      <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {group.fields.map((f) => (
          <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)', width: 140, flexShrink: 0 }}>{f.label}</span>
            {f.type === 'readonly' ? (
              <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', fontStyle: 'italic' }}>{f.value}</span>
            ) : (
              <input
                defaultValue={f.value}
                readOnly={f.type === 'select'}
                style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid var(--sem-eclipse-color-borderDefault)', fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)', background: 'var(--sem-eclipse-color-backgroundPrimary)', outline: 'none' }}
              />
            )}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
          <SolidButton color="primary" size="small" onClick={save}>
            <SolidButton.Center>{saved ? '저장됨' : '변경사항 저장'}</SolidButton.Center>
          </SolidButton>
        </div>
      </div>
    </div>
  )
}

export const Vercel_shadcn_설정_카테고리_탭: Story = {
  name: 'Vercel + shadcn — 설정 카테고리 탭 (Cycle 120)',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Design + shadcn/ui의 project settings 탭 패턴. 일반/알림/팀 카테고리 탭, 아이콘 + 텍스트 조합, 인라인 입력 필드 + 저장 버튼.',
      },
    },
  },
  render: () => <VercelShadcnSettingsTabRender />,
}

/* --------------------------------------------------------------------------
   Radix UI — 접근성 강화 탭 (키보드 네비게이션 가이드 + ARIA 레이블)
-------------------------------------------------------------------------- */
function RadixA11yTabGroupRender() {
  const [selected, setSelected] = useState(0)
  const [keyHint, setKeyHint] = useState('')

  const panels = [
    {
      tab: '사용 방법',
      content: 'Tab 키로 탭 그룹에 진입 후 화살표 키로 탭 간 이동, Enter/Space로 선택합니다. 스크린 리더는 각 탭의 상태(선택됨/선택 안 됨)를 자동 안내합니다.',
    },
    {
      tab: 'Props 참조',
      content: 'selectedIndex: 선택된 탭 인덱스 / onTabChange: 탭 변경 콜백 / children: FixedTabs.Tab 서브컴포넌트 배열',
    },
    {
      tab: '접근성 패턴',
      content: 'WAI-ARIA Tabs 패턴을 준수합니다. role="tablist", role="tab", role="tabpanel", aria-selected, aria-controls 속성이 자동으로 적용됩니다.',
    },
  ]

  return (
    <div style={{ maxWidth: 520, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>접근성 탭 패턴</p>
        {keyHint && (
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: 'var(--sem-eclipse-color-fillPrimarySubtle)', color: 'var(--sem-eclipse-color-fillPrimary)', fontWeight: 600 }}>{keyHint}</span>
        )}
      </div>
      <div
        role="presentation"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { setSelected((s) => (s + 1) % panels.length); setKeyHint('→ 키 이동') }
          if (e.key === 'ArrowLeft') { setSelected((s) => (s - 1 + panels.length) % panels.length); setKeyHint('← 키 이동') }
        }}
      >
        <FixedTabs selectedIndex={selected} onTabChange={setSelected}>
          {panels.map((p, idx) => (
            <FixedTabs.Tab key={idx} value={String(idx)}>
              <FixedTabs.TabCenter>{p.tab}</FixedTabs.TabCenter>
            </FixedTabs.Tab>
          ))}
        </FixedTabs>
      </div>
      <div style={{ padding: '16px', borderRadius: '0 0 10px 10px', border: '1px solid var(--sem-eclipse-color-borderSubtle)', borderTop: 'none', background: 'var(--sem-eclipse-color-surfaceDefault)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)', lineHeight: 1.7 }}>
        {panels[selected].content}
      </div>
      <p style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundDisabled)', marginTop: 8, textAlign: 'center' }}>Radix UI Tabs 접근성 패턴 — WAI-ARIA 준수</p>
    </div>
  )
}

export const Radix_접근성_강화_탭: Story = {
  name: 'Radix UI — 접근성 강화 탭 (키보드 네비게이션)',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI Tabs 컴포넌트의 접근성 패턴을 Orbit UI로 구현. WAI-ARIA tablist/tab/tabpanel 패턴, 화살표 키 네비게이션, aria-selected 상태 관리. 키보드 조작 시 힌트 표시.',
      },
    },
  },
  render: () => <RadixA11yTabGroupRender />,
}

/* --------------------------------------------------------------------------
   Vercel Design — 배포 로그 탭 (실시간 로그 + 상태 뱃지)
-------------------------------------------------------------------------- */
function VercelDeployLogTabRender() {
  const [selected, setSelected] = useState(0)
  const [running, setRunning] = useState(false)
  const [logCount, setLogCount] = useState(12)

  const startDeploy = () => {
    setRunning(true)
    setLogCount(12)
    const interval = setInterval(() => {
      setLogCount((c) => {
        if (c >= 28) { clearInterval(interval); setRunning(false); return 28 }
        return c + 1
      })
    }, 200)
  }

  const buildLogs = [
    '[00:01] Installing dependencies...',
    '[00:03] Running build...',
    '[00:05] Compiling TypeScript...',
    '[00:08] Bundling assets...',
    '[00:11] Optimizing output...',
    '[00:14] Generating static files...',
    '[00:16] Uploading to edge network...',
    '[00:18] Deployment complete',
  ]

  const functionLogs = [
    'GET /api/health 200 23ms',
    'POST /api/deploy 201 145ms',
    'GET /api/projects 200 67ms',
    'DELETE /api/cache 204 12ms',
  ]

  const tabs = [
    { label: 'Build', badge: running ? 'running' : 'ready' },
    { label: 'Functions', badge: 'ready' },
    { label: 'Runtime Logs', badge: null },
  ]

  const badgeColor = { running: '#f59e0b', ready: '#10b981', error: '#ef4444' }

  return (
    <div style={{ maxWidth: 560, fontFamily: 'monospace, system-ui', background: '#0f172a', borderRadius: 12, overflow: 'hidden', border: '1px solid #1e293b' }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <FixedTabs selectedIndex={selected} onTabChange={setSelected}>
          {tabs.map((t, idx) => (
            <FixedTabs.Tab key={idx} value={String(idx)}>
              <FixedTabs.TabLeading>
                {t.badge && <span style={{ width: 6, height: 6, borderRadius: '50%', background: badgeColor[t.badge as keyof typeof badgeColor], display: 'inline-block' }} />}
              </FixedTabs.TabLeading>
              <FixedTabs.TabCenter>
                <span style={{ fontSize: 12, color: selected === idx ? '#f1f5f9' : '#64748b' }}>{t.label}</span>
              </FixedTabs.TabCenter>
            </FixedTabs.Tab>
          ))}
        </FixedTabs>
        <button onClick={startDeploy} disabled={running} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 6, border: 'none', background: running ? '#334155' : '#6366f1', color: running ? '#94a3b8' : '#fff', cursor: running ? 'not-allowed' : 'pointer', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
          {running ? '배포 중...' : '재배포'}
        </button>
      </div>
      <div style={{ padding: '12px 16px', height: 180, overflowY: 'auto', fontSize: 11, lineHeight: 1.8 }}>
        {selected === 0 && buildLogs.slice(0, Math.max(1, Math.round((logCount / 28) * buildLogs.length))).map((log, i) => (
          <div key={i} style={{ color: i === Math.round((logCount / 28) * buildLogs.length) - 1 && running ? '#fbbf24' : '#94a3b8' }}>
            {log}
          </div>
        ))}
        {selected === 1 && functionLogs.map((log, i) => <div key={i} style={{ color: '#94a3b8' }}>{log}</div>)}
        {selected === 2 && <div style={{ color: '#475569' }}>런타임 로그가 없습니다.</div>}
      </div>
    </div>
  )
}

export const Vercel_배포_로그_탭: Story = {
  name: 'Vercel Design — 배포 로그 탭 (실시간 로그 + 상태 뱃지)',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 배포 대시보드의 Build/Functions/Runtime Logs 탭 패턴. 탭 앞 상태 도트 뱃지, 다크 배경 로그 뷰어, 재배포 버튼 클릭 시 로그가 순차적으로 표시됩니다.',
      },
    },
  },
  render: () => <VercelDeployLogTabRender />,
}

/* --------------------------------------------------------------------------
   Radix + Vercel — API 키 관리 탭 (타입별 필터 + 카운트)
-------------------------------------------------------------------------- */
function RadixVercelApiKeyTabRender() {
  const [selected, setSelected] = useState(0)

  const keys = [
    { name: 'Production API Key', type: 'prod', created: '2024-01-15', lastUsed: '방금 전', scopes: ['read', 'write', 'deploy'] },
    { name: 'CI/CD Pipeline Key', type: 'prod', created: '2024-02-20', lastUsed: '3시간 전', scopes: ['read', 'deploy'] },
    { name: 'Dev Testing Key', type: 'dev', created: '2024-03-10', lastUsed: '어제', scopes: ['read'] },
    { name: 'Staging Key', type: 'dev', created: '2024-04-05', lastUsed: '1주 전', scopes: ['read', 'write'] },
    { name: 'Revoked Key', type: 'revoked', created: '2023-12-01', lastUsed: '-', scopes: [] },
  ]

  const tabs = [
    { label: '전체', filter: () => true },
    { label: 'Production', filter: (k: typeof keys[0]) => k.type === 'prod' },
    { label: 'Development', filter: (k: typeof keys[0]) => k.type === 'dev' },
    { label: '만료됨', filter: (k: typeof keys[0]) => k.type === 'revoked' },
  ]

  const filtered = keys.filter(tabs[selected].filter)
  const scopeColors: Record<string, string> = { read: '#10b981', write: '#6366f1', deploy: '#f59e0b' }

  return (
    <div style={{ maxWidth: 560, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>API 키 관리</p>
        <button style={{ fontSize: 11, padding: '5px 12px', borderRadius: 8, border: 'none', background: 'var(--sem-eclipse-color-fillPrimary)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>+ 새 API 키</button>
      </div>
      <FixedTabs selectedIndex={selected} onTabChange={setSelected}>
        {tabs.map((t, idx) => {
          const count = keys.filter(t.filter).length
          return (
            <FixedTabs.Tab key={idx} value={String(idx)}>
              <FixedTabs.TabCenter>{t.label}</FixedTabs.TabCenter>
              <FixedTabs.TabTrailing>
                <CounterBadge>{count}</CounterBadge>
              </FixedTabs.TabTrailing>
            </FixedTabs.Tab>
          )
        })}
      </FixedTabs>
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--sem-eclipse-color-foregroundDisabled)', fontSize: 12 }}>해당 유형의 API 키가 없습니다.</div>
        ) : filtered.map((key) => (
          <div key={key.name} style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderSubtle)', background: key.type === 'revoked' ? 'var(--sem-eclipse-color-surfaceSubtle)' : 'var(--sem-eclipse-color-surfaceDefault)', opacity: key.type === 'revoked' ? 0.7 : 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', fontFamily: 'monospace' }}>{key.name}</span>
              <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 10, background: key.type === 'revoked' ? '#f1f5f9' : key.type === 'prod' ? '#fef3c7' : '#eff6ff', color: key.type === 'revoked' ? '#94a3b8' : key.type === 'prod' ? '#92400e' : '#1d4ed8', fontWeight: 600 }}>{key.type === 'prod' ? 'Production' : key.type === 'dev' ? 'Development' : '만료됨'}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>생성: {key.created}</span>
              <span style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>마지막 사용: {key.lastUsed}</span>
              <div style={{ display: 'flex', gap: 3, marginLeft: 'auto' }}>
                {key.scopes.map((s) => (
                  <span key={s} style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4, background: `${scopeColors[s]}18`, color: scopeColors[s], fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Radix_Vercel_API키_관리_탭: Story = {
  name: 'Radix + Vercel — API 키 관리 탭 (타입별 필터 + 카운트)',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI Tabs + Vercel API 키 관리 패턴. 전체/Production/Development/만료됨 탭 필터링, 탭에 CounterBadge로 개수 표시, 스코프별 컬러 뱃지.',
      },
    },
  },
  render: () => <RadixVercelApiKeyTabRender />,
}
