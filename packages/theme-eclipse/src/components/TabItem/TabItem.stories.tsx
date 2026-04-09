import { AwesomeIcon, HomeLineIcon, PeopleLineIcon, SettingLineIcon, NotificationLineIcon, StarLineIcon, FilterIcon, GridViewLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { CounterBadge } from '../CounterBadge'
import { LabelBadge } from '../LabelBadge'

import { Tab } from './TabItem'

Tab.displayName = 'Tab'
Tab.Leading.displayName = 'Tab.Leading'
Tab.Center.displayName = 'Tab.Center'
Tab.Trailing.displayName = 'Tab.Trailing'

const meta = {
  title: 'eclipse/Actions/Tabs/Tab',
  component: Tab,
  tags: ['autodocs'],
  args: {
    selected: false,
  },
} satisfies Meta<typeof Tab>

type Story = StoryObj<typeof meta>

export default meta

const navTabs = [
  { value: 'home', label: 'Home', Icon: HomeLineIcon },
  { value: 'people', label: 'People', Icon: PeopleLineIcon },
  { value: 'notif', label: 'Alerts', Icon: NotificationLineIcon },
  { value: 'settings', label: 'Settings', Icon: SettingLineIcon },
]

const tabContent: Record<string, React.ReactNode> = {
  home: (
    <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', minHeight: '80px' }}>
      <div style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>🏠 Home</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)' }}>{'Welcome to your dashboard. Check out what\'s new today.'}</div>
    </div>
  ),
  people: (
    <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', minHeight: '80px' }}>
      <div style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>👥 People</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)' }}>Manage your team members and collaborators here.</div>
    </div>
  ),
  notif: (
    <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', minHeight: '80px' }}>
      <div style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>🔔 Alerts</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)' }}>You have 3 unread notifications. Tap to view them.</div>
    </div>
  ),
  settings: (
    <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--sem-eclipse-color-surfaceContainer, #f8fafc)', minHeight: '80px' }}>
      <div style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>⚙️ Settings</div>
      <div style={{ fontSize: '13px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)' }}>Customize your preferences, theme, and account details.</div>
    </div>
  ),
}

const TabInteractiveDemo = () => {
  const [active, setActive] = useState('home')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--sem-eclipse-color-borderSecondary, #f1f5f9)' }}>
        {navTabs.map(({ value, label, Icon }) => (
          <Tab
            key={value}
            value={value}
            selected={active === value}
            onClick={() => setActive(value)}
          >
            <Tab.Leading>
              <Icon size={18} />
            </Tab.Leading>
            <Tab.Center>{label}</Tab.Center>
          </Tab>
        ))}
      </div>
      <div style={{ minHeight: '80px' }}>
        {tabContent[active]}
      </div>
    </div>
  )
}

export const 기본 = {
  render: (_args: React.ComponentProps<typeof Tab>) => {
    return <TabInteractiveDemo />
  },
} satisfies Story

export const 디자인QA = {
  args: {
    value: '기본탭',
    leading: true,
    trailing: true,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ leading, trailing, ...args }: any) => {
    return (
      <Tab {...args}>
        {leading && (
          <Tab.Leading>
            <AwesomeIcon size={24} />
          </Tab.Leading>
        )}
        <Tab.Center>{args.value}</Tab.Center>
        {trailing && (
          <Tab.Trailing>
            <AwesomeIcon size={24} />
          </Tab.Trailing>
        )}
      </Tab>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 아이콘 + 텍스트 + 카운터 배지 탭 패턴
   Linear의 사이드바 네비게이션 탭 스타일 (icon + label + count)
-------------------------------------------------------------------------- */
type NavItem = {
  value: string
  label: string
  icon: React.ReactNode
  count?: number
  badge?: 'urgent'
}

const linearNavItems: NavItem[] = [
  { value: 'home', label: 'My Issues', icon: <HomeLineIcon size={16} />, count: 5, badge: 'urgent' },
  { value: 'team', label: 'Team', icon: <PeopleLineIcon size={16} />, count: 12 },
  { value: 'starred', label: 'Starred', icon: <StarLineIcon size={16} /> },
  { value: 'notifications', label: 'Inbox', icon: <NotificationLineIcon size={16} />, count: 3 },
  { value: 'settings', label: 'Settings', icon: <SettingLineIcon size={16} /> },
]

const linearPanelContent: Record<string, { title: string; items: string[] }> = {
  home: { title: 'My Issues', items: ['Fix Popover z-index', 'Update design tokens', 'Write migration guide', 'Implement compact density', 'Run typecheck CI'] },
  team: { title: 'Team Issues', items: Array.from({ length: 12 }, (_, i) => `Team task #${i + 1}`) },
  starred: { title: 'Starred', items: ['Design System Audit', 'Token Hierarchy v3'] },
  notifications: { title: 'Inbox', items: ['@heejun mentioned you in ORB-201', 'PR merged: feat/compact-tabs', 'Issue closed: ORB-198'] },
  settings: { title: 'Settings', items: ['Account', 'Notifications', 'Appearance', 'Integrations'] },
}

const LinearIconNavTabs = () => {
  const [active, setActive] = useState('home')
  const panel = linearPanelContent[active] ?? { title: '', items: [] }

  return (
    <div style={{ width: 500, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Navigation"
        style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}
      >
        {linearNavItems.map((item) => (
          <Tab
            key={item.value}
            value={item.value}
            selected={active === item.value}
            onClick={() => setActive(item.value)}
          >
            <Tab.Leading>{item.icon}</Tab.Leading>
            <Tab.Center>{item.label}</Tab.Center>
            {item.count !== undefined && (
              <Tab.Trailing>
                <CounterBadge>{item.count}</CounterBadge>
              </Tab.Trailing>
            )}
          </Tab>
        ))}
      </div>

      {/* Content panel */}
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>{panel.title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {panel.items.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 8, background: '#f8fafc', fontSize: 13, color: '#1e293b', cursor: 'pointer' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Linear_아이콘_네비게이션탭: Story = {
  render: () => <LinearIconNavTabs />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 제어 컴포넌트 (value + onValueChange) 패턴
   명확한 접근성 (aria-selected, aria-controls, role="tabpanel")
   Filter + View 전환 탭
-------------------------------------------------------------------------- */
const filterViews = [
  { value: 'grid', label: 'Grid', icon: <GridViewLineIcon size={15} /> },
  { value: 'filter', label: 'Filter', icon: <FilterIcon size={15} /> },
  { value: 'people', label: 'Assignees', icon: <PeopleLineIcon size={15} /> },
]

const filterContent: Record<string, React.ReactNode> = {
  grid: (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
            background: `hsl(${(i * 47 + 230) % 360}, 60%, 90%)`,
            border: `1px solid hsl(${(i * 47 + 230) % 360}, 40%, 80%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 600,
            color: `hsl(${(i * 47 + 230) % 360}, 60%, 35%)`,
          }}
        >
          Item {i + 1}
        </div>
      ))}
    </div>
  ),
  filter: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['Priority', 'Status', 'Assignee', 'Label'].map((f) => (
        <div key={f} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fafafa' }}>
          <span style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{f}</span>
          <LabelBadge color="gray">
            <LabelBadge.Label>Any</LabelBadge.Label>
          </LabelBadge>
        </div>
      ))}
    </div>
  ),
  people: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['heejun.kim', 'minji.park', 'dongwook.lee', 'soyeon.choi'].map((person, _i) => (
        <div key={person} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            {person.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: 13, color: '#1e293b', flex: 1 }}>{person}</span>
          <LabelBadge color="benefit">
            <LabelBadge.Label>Active</LabelBadge.Label>
          </LabelBadge>
        </div>
      ))}
    </div>
  ),
}

const RadixControlledTabs = () => {
  const [value, setValue] = useState('grid')

  return (
    <div style={{ width: 420, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', flex: 1 }}>Project View</span>
        <LabelBadge color="gray">
          <LabelBadge.Label>Controlled</LabelBadge.Label>
        </LabelBadge>
      </div>

      {/* Controlled tab strip (Radix pattern: value + onValueChange) */}
      <div
        role="tablist"
        aria-label="Project view tabs"
        style={{ display: 'flex', borderBottom: '1px solid #f1f5f9' }}
      >
        {filterViews.map((view) => (
          <Tab
            key={view.value}
            value={view.value}
            selected={value === view.value}
            onClick={() => setValue(view.value)}
            aria-selected={value === view.value}
            aria-controls={`panel-${view.value}`}
            id={`tab-${view.value}`}
          >
            <Tab.Leading>{view.icon}</Tab.Leading>
            <Tab.Center>{view.label}</Tab.Center>
          </Tab>
        ))}
      </div>

      {/* Tab panel */}
      {filterViews.map((view) => (
        <div
          key={view.value}
          role="tabpanel"
          id={`panel-${view.value}`}
          aria-labelledby={`tab-${view.value}`}
          hidden={value !== view.value}
          style={{ padding: 16 }}
        >
          {filterContent[view.value]}
        </div>
      ))}
    </div>
  )
}

export const Radix_제어컴포넌트_탭패턴: Story = {
  render: () => <RadixControlledTabs />,
}

/* --------------------------------------------------------------------------
   Linear 단축키 힌트 탭 (cmd palette 내 카테고리 탭)
   탭 내 키보드 단축키 힌트 배지 표시
-------------------------------------------------------------------------- */
const shortcutTabs = [
  { value: 'issues', label: 'Issues', key: 'I', count: 8 },
  { value: 'projects', label: 'Projects', key: 'P', count: 4 },
  { value: 'views', label: 'Views', key: 'V', count: 3 },
  { value: 'members', label: 'Members', key: 'M' },
]

const shortcutTabContent: Record<string, string[]> = {
  issues: ['ORB-201 Implement Radix Tabs API', 'ORB-202 Add Linear compact density', 'ORB-203 Accessibility audit', 'ORB-204 Token migration'],
  projects: ['Design System', 'Mobile App', 'Web Platform', 'Infrastructure'],
  views: ['All Issues', 'My Issues', 'Active Sprint'],
  members: ['heejun.kim', 'minji.park', 'dongwook.lee', 'soyeon.choi'],
}

const ShortcutKeyBadge = ({ char }: { char: string }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    borderRadius: 3,
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    fontSize: 10,
    fontWeight: 700,
    color: '#94a3b8',
    fontFamily: 'monospace',
  }}>
    {char}
  </div>
)

const LinearShortcutTabs = () => {
  const [active, setActive] = useState('issues')
  const content = shortcutTabContent[active] ?? []

  return (
    <div style={{ width: 480, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      {/* Search header */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#94a3b8" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 13, color: '#94a3b8' }}>Search or jump to...</span>
      </div>

      {/* Shortcut hint tabs */}
      <div role="tablist" style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
        {shortcutTabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            selected={active === tab.value}
            onClick={() => setActive(tab.value)}
          >
            <Tab.Center>{tab.label}</Tab.Center>
            <Tab.Trailing>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {tab.count !== undefined && <CounterBadge>{tab.count}</CounterBadge>}
                <ShortcutKeyBadge char={tab.key} />
              </div>
            </Tab.Trailing>
          </Tab>
        ))}
      </div>

      {/* Results */}
      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
        {content.map((item, _i) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 14px',
              cursor: 'pointer',
              fontSize: 13,
              color: '#1e293b',
              borderBottom: '1px solid #f8fafc',
              transition: 'background 0.1s',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 14px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 12 }}>
        {[{ key: 'Tab', label: '탭 전환' }, { key: 'Enter', label: '선택' }, { key: 'Esc', label: '닫기' }].map((hint) => (
          <div key={hint.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <kbd style={{ padding: '2px 6px', borderRadius: 4, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 10, color: '#64748b', fontFamily: 'monospace' }}>
              {hint.key}
            </kbd>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>{hint.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_단축키힌트_탭: Story = {
  render: () => <LinearShortcutTabs />,
}
