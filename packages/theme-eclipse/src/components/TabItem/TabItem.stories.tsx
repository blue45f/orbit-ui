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

/* --------------------------------------------------------------------------
   Tailwind UI 언더라인 탭 패턴
   Tailwind UI "Simple on dark" 스타일: 선택 탭 하단 2px 언더라인 + 상단 배경색 없음
-------------------------------------------------------------------------- */
const tailwindTabs = [
  { value: 'overview', label: 'Overview', badge: null },
  { value: 'repositories', label: 'Repositories', badge: '42' },
  { value: 'projects', label: 'Projects', badge: '8' },
  { value: 'packages', label: 'Packages', badge: null },
  { value: 'stars', label: 'Stars', badge: '1.2k' },
]

const contentMap: Record<string, React.ReactNode> = {
  overview: (
    <div style={{ padding: '20px 0' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>활동 요약</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: '커밋', value: '1,247', color: '#6366f1' },
          { label: 'PR', value: '89', color: '#10b981' },
          { label: '이슈', value: '34', color: '#f59e0b' },
          { label: '리뷰', value: '312', color: '#8b5cf6' },
        ].map((stat) => (
          <div key={stat.label} style={{ padding: '12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  repositories: (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['orbit-ui', 'react-hooks', 'design-tokens', 'storybook-addon'].map((repo) => (
        <div key={repo} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, color: '#1e293b', fontWeight: 500 }}>
          {repo}
        </div>
      ))}
    </div>
  ),
  projects: (
    <div style={{ padding: '16px 0', fontSize: 13, color: '#94a3b8' }}>8개의 프로젝트</div>
  ),
  packages: (
    <div style={{ padding: '16px 0', fontSize: 13, color: '#94a3b8' }}>패키지 없음</div>
  ),
  stars: (
    <div style={{ padding: '16px 0', fontSize: 13, color: '#94a3b8' }}>1,200개의 즐겨찾기 리포지토리</div>
  ),
}

const TailwindUnderlineTabs = () => {
  const [active, setActive] = useState('overview')

  return (
    <div style={{ width: 520, background: '#fff' }}>
      {/* Tailwind UI "pills on gray" variant */}
      <div style={{ borderBottom: '1px solid #e2e8f0' }}>
        <div role="tablist" style={{ display: 'flex', gap: 0 }}>
          {tailwindTabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              selected={active === tab.value}
              onClick={() => setActive(tab.value)}
            >
              <Tab.Center>{tab.label}</Tab.Center>
              {tab.badge && (
                <Tab.Trailing>
                  <span style={{
                    padding: '1px 6px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                    background: active === tab.value ? '#6366f1' : '#f1f5f9',
                    color: active === tab.value ? '#fff' : '#64748b',
                  }}>
                    {tab.badge}
                  </span>
                </Tab.Trailing>
              )}
            </Tab>
          ))}
        </div>
      </div>
      <div style={{ minHeight: 120 }}>
        {contentMap[active]}
      </div>
    </div>
  )
}

export const TailwindUI_언더라인_탭: Story = {
  name: 'Tailwind UI - 언더라인 + 카운트 뱃지 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI "Simple" 탭 패턴. 하단 언더라인 선택 표시 + 카운트 뱃지. ' +
          'GitHub 프로필 네비게이션과 동일한 UX 패턴입니다.',
      },
    },
  },
  render: () => <TailwindUnderlineTabs />,
}

/* --------------------------------------------------------------------------
   Apple HIG 세그먼트형 탭 패턴
   iOS의 UISegmentedControl처럼 동작: 컨테이너 내부에서 활성 탭이 흰색 카드로 부상
-------------------------------------------------------------------------- */
const appleSegments = [
  { value: 'all', label: '전체' },
  { value: 'unread', label: '읽지 않음' },
  { value: 'mentions', label: '멘션' },
]

const appleSegmentContent: Record<string, string[]> = {
  all: ['Orbit UI PR 머지됨', 'Token 시스템 업데이트', '새 스토리 15개 추가', 'Vercel 배포 완료'],
  unread: ['Token 시스템 업데이트', 'Vercel 배포 완료'],
  mentions: ['@heejun Token migration 리뷰 요청'],
}

const AppleSegmentTabs = () => {
  const [active, setActive] = useState('all')
  const items = appleSegmentContent[active] ?? []

  return (
    <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Apple HIG Segmented Control wrapper */}
      <div
        style={{
          display: 'flex',
          background: '#f1f5f9',
          borderRadius: 10,
          padding: 3,
          gap: 2,
        }}
        role="tablist"
        aria-label="알림 필터"
      >
        {appleSegments.map((seg) => (
          <button
            key={seg.value}
            role="tab"
            aria-selected={active === seg.value}
            onClick={() => setActive(seg.value)}
            style={{
              flex: 1,
              padding: '7px 12px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: active === seg.value ? 700 : 500,
              color: active === seg.value ? '#1e293b' : '#64748b',
              background: active === seg.value ? '#fff' : 'transparent',
              boxShadow: active === seg.value ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
              transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {seg.label}
            {seg.value === 'unread' && (
              <span style={{
                marginLeft: 5,
                padding: '0 5px',
                borderRadius: 20,
                background: '#ef4444',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                verticalAlign: 'middle',
              }}>2</span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.length > 0 ? items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid #f1f5f9',
              background: '#fafafa',
              fontSize: 13,
              color: '#1e293b',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: i < 2 ? '#6366f1' : '#e2e8f0', flexShrink: 0 }} />
            {item}
          </div>
        )) : (
          <div style={{ padding: '20px 0', textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
            알림이 없습니다
          </div>
        )}
      </div>

      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        Apple HIG UISegmentedControl 패턴 — 흰 카드 부상 효과
      </div>
    </div>
  )
}

export const AppleHIG_세그먼트_탭: Story = {
  name: 'Apple HIG - UISegmentedControl 스타일 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Apple HIG UISegmentedControl 패턴. 활성 탭이 흰 카드로 부상하는 iOS 스타일. ' +
          '150ms cubic-bezier 트랜지션으로 자연스러운 전환을 구현합니다.',
      },
    },
  },
  render: () => <AppleSegmentTabs />,
}

/* --------------------------------------------------------------------------
   Vercel 콤팩트 탭 패턴
   Vercel Dashboard의 소형 탭: Deployments / Settings / Logs 전환
-------------------------------------------------------------------------- */
const vercelTabs = [
  { value: 'deployments', label: 'Deployments', count: 47 },
  { value: 'settings', label: 'Settings' },
  { value: 'logs', label: 'Logs' },
  { value: 'analytics', label: 'Analytics' },
]

const vercelContent: Record<string, React.ReactNode> = {
  deployments: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {[
        { branch: 'main', status: 'READY', time: '2분 전', color: '#10b981', bg: '#f0fdf4' },
        { branch: 'feat/tokens', status: 'BUILDING', time: '8분 전', color: '#f59e0b', bg: '#fffbeb' },
        { branch: 'fix/lint', status: 'READY', time: '1시간 전', color: '#10b981', bg: '#f0fdf4' },
        { branch: 'feat/docs', status: 'ERROR', time: '2시간 전', color: '#ef4444', bg: '#fef2f2' },
      ].map((dep) => (
        <div
          key={dep.branch}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 12px',
            borderRadius: 6,
            border: `1px solid ${dep.color}22`,
            background: dep.bg,
            fontSize: 12,
          }}
        >
          <span style={{ fontWeight: 600, color: '#1e293b', flex: 1 }}>{dep.branch}</span>
          <span style={{ fontWeight: 700, color: dep.color, fontSize: 10, letterSpacing: '0.04em' }}>
            {dep.status}
          </span>
          <span style={{ color: '#94a3b8' }}>{dep.time}</span>
        </div>
      ))}
    </div>
  ),
  settings: <div style={{ fontSize: 13, color: '#94a3b8', paddingTop: 8 }}>프로젝트 설정</div>,
  logs: <div style={{ fontSize: 13, color: '#94a3b8', paddingTop: 8 }}>빌드 로그</div>,
  analytics: <div style={{ fontSize: 13, color: '#94a3b8', paddingTop: 8 }}>웹 애널리틱스</div>,
}

const VercelCompactTabs = () => {
  const [active, setActive] = useState('deployments')

  return (
    <div style={{ width: 460, border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#111827', flex: 1 }}>orbit-ui</span>
        <LabelBadge color="benefit">
          <LabelBadge.Label>Production</LabelBadge.Label>
        </LabelBadge>
      </div>
      <div role="tablist" style={{ display: 'flex', borderBottom: '1px solid #f3f4f6', background: '#fafafa' }}>
        {vercelTabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            selected={active === tab.value}
            onClick={() => setActive(tab.value)}
          >
            <Tab.Center>{tab.label}</Tab.Center>
            {tab.count !== undefined && (
              <Tab.Trailing>
                <CounterBadge>{tab.count}</CounterBadge>
              </Tab.Trailing>
            )}
          </Tab>
        ))}
      </div>
      <div style={{ padding: 16 }}>
        {vercelContent[active]}
      </div>
    </div>
  )
}

export const Vercel_콤팩트_대시보드_탭: Story = {
  name: 'Vercel - 콤팩트 배포 대시보드 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Dashboard 탭 패턴. 배포 상태(READY/BUILDING/ERROR)를 색상으로 표현하고 ' +
          '카운트 배지로 항목 수를 표시합니다.',
      },
    },
  },
  render: () => <VercelCompactTabs />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 배지 카운터 탭 그룹 패턴
   shadcn Tabs: 각 탭에 CounterBadge로 항목 수를 표시하는 실무 패턴
-------------------------------------------------------------------------- */
type ShadcnTabId = 'open' | 'in-review' | 'merged' | 'closed'

const SHADCN_TAB_DATA: { id: ShadcnTabId; label: string; count: number; color: string }[] = [
  { id: 'open', label: 'Open', count: 12, color: '#10b981' },
  { id: 'in-review', label: 'In Review', count: 5, color: '#f59e0b' },
  { id: 'merged', label: 'Merged', count: 48, color: '#6366f1' },
  { id: 'closed', label: 'Closed', count: 7, color: '#94a3b8' },
]

const SHADCN_MOCK_PRS: Record<ShadcnTabId, string[]> = {
  open: ['feat: Calendar Radix 접근성 패턴', 'feat: GhostButton Raycast 팔레트', 'fix: Chip size prop 제거'],
  'in-review': ['feat: Template TravelBooking', 'docs: BenchmarkComparison Mantine'],
  merged: ['feat: cycle-59 완료 (Mantine+Ant)', 'feat: cycle-58 MUI+Chakra', 'feat: cycle-57 M3+Figma'],
  closed: ['fix: PasswordField onChange 타입', 'fix: OutlineIconButton Story annotation'],
}

function ShadcnBadgeTabsRender() {
  const [active, setActive] = useState<ShadcnTabId>('open')
  const items = SHADCN_MOCK_PRS[active]

  return (
    <div style={{ width: 480, border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
      {/* Tab row */}
      <div style={{ display: 'flex', padding: '0 12px', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
        {SHADCN_TAB_DATA.map((tab) => (
          <Tab
            key={tab.id}
            selected={active === tab.id}
            onClick={() => setActive(tab.id)}
          >
            <Tab.Center>{tab.label}</Tab.Center>
            <Tab.Trailing>
              <span style={{
                padding: '1px 7px', borderRadius: 10,
                background: active === tab.id ? tab.color : '#f1f5f9',
                color: active === tab.id ? '#fff' : '#64748b',
                fontSize: 10, fontWeight: 700,
                transition: 'all 0.15s',
              }}>
                {tab.count}
              </span>
            </Tab.Trailing>
          </Tab>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((pr) => (
          <div key={pr} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: SHADCN_TAB_DATA.find((t) => t.id === active)?.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#1e293b' }}>{pr}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Shadcn_배지_카운터_탭_그룹: Story = {
  name: 'shadcn/ui - 배지 카운터 탭 그룹 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Tabs + Badge 조합 패턴. 각 탭의 Trailing 슬롯에 카운터 배지를 삽입, ' +
          '선택 시 배지 배경색이 탭 고유 색상으로 전환됩니다. PR/이슈 목록 분류에 적합.',
      },
    },
  },
  render: () => <ShadcnBadgeTabsRender />,
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 사이드바 페이지 탭 네비게이션 패턴
   Notion 좌측 사이드바의 페이지 계층 탭 — depth에 따른 들여쓰기, 호버 액션
-------------------------------------------------------------------------- */
type NotionPage = {
  id: string
  title: string
  icon: string
  depth: number
  hasChildren: boolean
  unread: boolean
}

const NOTION_PAGES: NotionPage[] = [
  { id: 'p1', title: 'Orbit UI 문서', icon: 'O', depth: 0, hasChildren: true, unread: false },
  { id: 'p2', title: 'GettingStarted', icon: 'G', depth: 1, hasChildren: false, unread: true },
  { id: 'p3', title: 'ThemeGuide', icon: 'T', depth: 1, hasChildren: false, unread: false },
  { id: 'p4', title: 'BenchmarkComparison', icon: 'B', depth: 1, hasChildren: false, unread: true },
  { id: 'p5', title: 'Components', icon: 'C', depth: 0, hasChildren: true, unread: false },
  { id: 'p6', title: 'Button 계열', icon: 'b', depth: 1, hasChildren: false, unread: false },
  { id: 'p7', title: 'Form 계열', icon: 'f', depth: 1, hasChildren: false, unread: false },
]

function NotionSidebarTabsRender() {
  const [activePage, setActivePage] = useState<string>('p1')
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{ width: 240, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '10px 8px', borderBottom: '1px solid #f1f5f9', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        워크스페이스
      </div>
      <div style={{ padding: '6px 4px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {NOTION_PAGES.map((page) => (
          <div
            key={page.id}
            style={{ paddingLeft: page.depth * 16 }}
            onMouseEnter={() => setHovered(page.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <Tab
              selected={activePage === page.id}
              onClick={() => setActivePage(page.id)}
              
            >
              <Tab.Leading>
                <span style={{
                  width: 20, height: 20, borderRadius: 4,
                  background: activePage === page.id ? '#ede9fe' : '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: activePage === page.id ? '#6366f1' : '#64748b',
                  flexShrink: 0,
                }}>
                  {page.icon}
                </span>
              </Tab.Leading>
              <Tab.Center>
                <span style={{ fontSize: 13, fontWeight: page.unread ? 700 : 400 }}>
                  {page.title}
                </span>
              </Tab.Center>
              <Tab.Trailing>
                {page.unread && hovered !== page.id && (
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
                )}
                {hovered === page.id && (
                  <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 700, lineHeight: 1 }}>+</span>
                )}
              </Tab.Trailing>
            </Tab>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Notion_사이드바_페이지_탭: Story = {
  name: 'Notion - 사이드바 페이지 탭 네비게이션 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Notion 좌측 사이드바 페이지 탭 패턴. depth에 따른 들여쓰기, 호버 시 "+" 액션 표시, ' +
          '미읽음 페이지 파란 점 + 굵은 글씨, Leading 슬롯에 페이지 아이콘.',
      },
    },
  },
  render: () => <NotionSidebarTabsRender />,
}

/* --------------------------------------------------------------------------
   Raycast 벤치마크: 검색 결과 카테고리 탭 패턴
   Raycast Search: 검색 결과를 카테고리별로 분류하는 수평 탭 패턴
-------------------------------------------------------------------------- */
type RaycastCategory = 'all' | 'apps' | 'files' | 'commands' | 'web'

const RAYCAST_CATEGORIES: { id: RaycastCategory; label: string; count: number; icon: string }[] = [
  { id: 'all', label: 'All', count: 18, icon: '*' },
  { id: 'apps', label: 'Apps', count: 4, icon: 'A' },
  { id: 'files', label: 'Files', count: 6, icon: 'F' },
  { id: 'commands', label: 'Commands', count: 5, icon: 'C' },
  { id: 'web', label: 'Web', count: 3, icon: 'W' },
]

const RAYCAST_RESULTS: Record<RaycastCategory, string[]> = {
  all: ['Storybook Dev', 'orbit-ui/packages', 'pnpm typecheck', 'Mantine Docs', 'Linear Issue ORB-312'],
  apps: ['Storybook Dev', 'WebStorm', 'Terminal', 'Figma'],
  files: ['Templates.stories.tsx', 'GhostButton.stories.tsx', 'BenchmarkComparison.mdx', 'CLAUDE.md', 'pnpm-lock.yaml', 'tsconfig.json'],
  commands: ['pnpm typecheck', 'pnpm lint', 'git commit', 'vercel deploy', 'pnpm build:storybook'],
  web: ['Mantine Docs', 'Linear Issue ORB-312', 'Vercel Dashboard'],
}

function RaycastSearchTabsRender() {
  const [activeTab, setActiveTab] = useState<RaycastCategory>('all')
  const results = RAYCAST_RESULTS[activeTab]

  return (
    <div style={{
      width: 440, borderRadius: 16, overflow: 'hidden',
      border: '1px solid #27272a', background: '#09090b',
      boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
    }}>
      {/* Search */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth={2.5}>
          <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
        </svg>
        <span style={{ flex: 1, fontSize: 14, color: '#e4e4e7' }}>orbit</span>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', padding: '0 8px', borderBottom: '1px solid #27272a', background: '#0c0c0e' }}>
        {RAYCAST_CATEGORIES.map((cat) => (
          <Tab
            key={cat.id}
            selected={activeTab === cat.id}
            onClick={() => setActiveTab(cat.id)}
          >
            <Tab.Center>
              <span style={{ fontSize: 12 }}>{cat.label}</span>
            </Tab.Center>
            <Tab.Trailing>
              <span style={{
                fontSize: 10, fontWeight: 700,
                padding: '1px 5px', borderRadius: 8,
                background: activeTab === cat.id ? '#27272a' : 'transparent',
                color: activeTab === cat.id ? '#a1a1aa' : '#3f3f46',
              }}>
                {cat.count}
              </span>
            </Tab.Trailing>
          </Tab>
        ))}
      </div>

      {/* Results */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {results.map((result, i) => (
          <div
            key={result}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 16px',
              background: i === 0 ? '#18181b' : 'transparent',
              borderBottom: i < results.length - 1 ? '1px solid #18181b' : 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{
              width: 24, height: 24, borderRadius: 5, background: '#27272a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, color: '#71717a', fontWeight: 700, flexShrink: 0,
            }}>
              {RAYCAST_CATEGORIES.find((c) => c.id === activeTab)?.icon ?? '*'}
            </span>
            <span style={{ fontSize: 13, color: i === 0 ? '#e4e4e7' : '#a1a1aa' }}>{result}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 16px', borderTop: '1px solid #27272a', fontSize: 10, color: '#3f3f46', display: 'flex', gap: 12 }}>
        <span><kbd style={{ padding: '1px 4px', background: '#18181b', borderRadius: 3, border: '1px solid #27272a', color: '#71717a' }}>Enter</kbd> 열기</span>
        <span><kbd style={{ padding: '1px 4px', background: '#18181b', borderRadius: 3, border: '1px solid #27272a', color: '#71717a' }}>Tab</kbd> 미리보기</span>
      </div>
    </div>
  )
}

export const Raycast_검색_결과_카테고리_탭: Story = {
  name: 'Raycast - 검색 결과 카테고리 탭 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Raycast 검색 결과 카테고리 탭 패턴. 다크 배경, 탭별 결과 수 카운트, ' +
          '선택된 첫 번째 결과 하이라이트, 키보드 단축키 힌트 푸터.',
      },
    },
  },
  render: () => <RaycastSearchTabsRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 키보드 접근성 탭 패널
   Radix Tabs — 좌우 화살표키 탭 이동, aria-controls/aria-labelledby 패턴
-------------------------------------------------------------------------- */
const RADIX_DOCS_TABS = [
  {
    id: 'overview',
    label: '개요',
    content: [
      { title: 'Radix Tabs vs Orbit Tab', body: 'Radix UI는 TabsPrimitive 기반으로 WAI-ARIA 1.1 Tabs 패턴을 완전히 구현합니다. Orbit UI는 동일한 접근성을 Tab 컴포넌트로 제공합니다.' },
      { title: '키보드 내비게이션', body: '← / → 화살표로 탭 이동, Home/End로 처음/마지막 탭으로 이동, Enter/Space로 활성화합니다.' },
    ],
  },
  {
    id: 'api',
    label: 'API 레퍼런스',
    content: [
      { title: 'Tab Props', body: 'selected: boolean — 탭 활성화 상태\nleading: ReactNode — 아이콘 슬롯\ntrailing: ReactNode — 카운터 배지 슬롯' },
      { title: '비교: Radix vs Orbit', body: 'Radix: <Tabs.Trigger value="x" />\nOrbit: <Tab selected={active === "x"} />' },
    ],
  },
  {
    id: 'examples',
    label: '예제',
    content: [
      { title: '기본 사용법', body: '각 탭에 value prop을 부여하고 onChange로 상태를 관리합니다.' },
      { title: '아이콘 탭', body: 'Tab.Leading에 아이콘을 배치하고 Tab.Center에 레이블을 넣습니다.' },
      { title: '카운터 탭', body: 'Tab.Trailing에 CounterBadge를 배치해 알림 수를 표시합니다.' },
    ],
  },
]

function RadixA11yTabPanelRender() {
  const [active, setActive] = useState('overview')

  return (
    <div style={{ maxWidth: 520 }} role="region" aria-label="Radix 접근성 탭 패널 예제">
      {/* Tab list */}
      <div role="tablist" aria-label="문서 섹션" style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', gap: 0 }}>
        {RADIX_DOCS_TABS.map((tab) => (
          <Tab
            key={tab.id}
            selected={active === tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => {
              const idx = RADIX_DOCS_TABS.findIndex((t) => t.id === tab.id)
              if (e.key === 'ArrowRight') setActive(RADIX_DOCS_TABS[(idx + 1) % RADIX_DOCS_TABS.length].id)
              if (e.key === 'ArrowLeft') setActive(RADIX_DOCS_TABS[(idx - 1 + RADIX_DOCS_TABS.length) % RADIX_DOCS_TABS.length].id)
              if (e.key === 'Home') setActive(RADIX_DOCS_TABS[0].id)
              if (e.key === 'End') setActive(RADIX_DOCS_TABS[RADIX_DOCS_TABS.length - 1].id)
            }}
          >
            <Tab.Center>{tab.label}</Tab.Center>
          </Tab>
        ))}
      </div>

      {/* Tab panels */}
      {RADIX_DOCS_TABS.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={active !== tab.id}
          style={{ padding: '16px 0', display: active === tab.id ? 'flex' : 'none', flexDirection: 'column', gap: 12 }}
        >
          {tab.content.map((item) => (
            <div key={item.title} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fafafa' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>{item.title}</div>
              <pre style={{ margin: 0, fontSize: 12, color: '#64748b', lineHeight: 1.6, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{item.body}</pre>
            </div>
          ))}
        </div>
      ))}
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>← / → 화살표키로 탭 이동 · Home/End로 처음/마지막 이동</div>
    </div>
  )
}

export const Radix_WAI_ARIA_키보드_탭_패널: Story = {
  name: 'Radix UI — WAI-ARIA Tabs 키보드 접근성 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI Tabs의 WAI-ARIA 1.1 구현 패턴. role="tablist/tab/tabpanel", aria-selected, aria-controls, ' +
          'aria-labelledby를 완전히 구현합니다. ← / → 화살표키, Home, End 키보드 내비게이션을 지원합니다.',
      },
    },
  },
  render: () => <RadixA11yTabPanelRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 제어/비제어 탭 상태 패턴
   Radix의 defaultValue(비제어) vs value(제어) 이중 API — Orbit Tab으로 구현
-------------------------------------------------------------------------- */
function RadixControlledTabDemo() {
  const [controlled, setControlled] = useState<string | null>('activity')
  const [history, setHistory] = useState<string[]>(['activity'])

  const CTRL_TABS = [
    { id: 'activity', label: '활동', icon: <HomeLineIcon size={14} /> },
    { id: 'projects', label: '프로젝트', icon: <GridViewLineIcon size={14} /> },
    { id: 'team', label: '팀', icon: <PeopleLineIcon size={14} /> },
    { id: 'settings', label: '설정', icon: <SettingLineIcon size={14} /> },
  ]

  const navigate = (id: string) => {
    setControlled(id)
    setHistory((prev) => [...prev.slice(-4), id])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 460 }}>
      <div style={{ padding: '8px 12px', borderRadius: 8, background: '#eef2ff', border: '1.5px solid rgba(99,102,241,0.2)', fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
        제어 컴포넌트: 상태가 외부에서 관리됩니다 (value: &quot;{controlled}&quot;)
      </div>

      {/* 제어 탭 */}
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0' }}>
        {CTRL_TABS.map((tab) => (
          <Tab key={tab.id} selected={controlled === tab.id} onClick={() => navigate(tab.id)}>
            <Tab.Leading>{tab.icon}</Tab.Leading>
            <Tab.Center>{tab.label}</Tab.Center>
          </Tab>
        ))}
      </div>

      {/* 콘텐츠 */}
      <div style={{ padding: '14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fafafa', minHeight: 60 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
          현재: {CTRL_TABS.find((t) => t.id === controlled)?.label ?? '없음'}
        </div>
        <div style={{ fontSize: 12, color: '#64748b' }}>
          Radix value prop으로 외부에서 탭을 완전히 제어합니다.
        </div>
      </div>

      {/* 히스토리 */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>탭 이동 히스토리</div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {history.map((id, i) => (
            <span key={i} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 8, background: i === history.length - 1 ? '#eef2ff' : '#f1f5f9', color: i === history.length - 1 ? '#6366f1' : '#94a3b8', fontWeight: i === history.length - 1 ? 700 : 400 }}>
              {CTRL_TABS.find((t) => t.id === id)?.label}
            </span>
          ))}
        </div>
      </div>

      {/* 외부 제어 버튼 */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: '#94a3b8', alignSelf: 'center' }}>외부 제어:</span>
        {CTRL_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.id)}
            style={{
              padding: '4px 10px', borderRadius: 6, border: `1.5px solid ${controlled === tab.id ? '#6366f1' : '#e2e8f0'}`,
              background: controlled === tab.id ? '#eef2ff' : '#fff',
              color: controlled === tab.id ? '#6366f1' : '#64748b',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export const Radix_제어_비제어_탭_API: Story = {
  name: 'Radix UI — 제어/비제어 탭 상태 이중 API 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix Tabs의 defaultValue(비제어)/value(제어) 이중 API 패턴. ' +
          '외부 버튼으로 탭을 직접 제어하고 이동 히스토리를 기록합니다. ' +
          '라우터 연동이나 URL 동기화 시 제어 컴포넌트 패턴이 필수입니다.',
      },
    },
  },
  render: () => <RadixControlledTabDemo />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 탭 콘텐츠 지연 로딩 패턴
   Radix Tabs의 forceMount + LazyMount — 탭 전환 시 콘텐츠 지연 마운트
-------------------------------------------------------------------------- */
function RadixLazyTabRender() {
  const [active, setActive] = useState('summary')
  const [loaded, setLoaded] = useState<Set<string>>(new Set(['summary']))

  const LAZY_TABS = [
    { id: 'summary', label: '요약', delay: 0 },
    { id: 'details', label: '상세 데이터', delay: 1200 },
    { id: 'audit', label: '감사 로그', delay: 800 },
    { id: 'settings', label: '설정', delay: 300 },
  ]

  const [loading, setLoading] = useState<Set<string>>(new Set())
  const [content, setContent] = useState<Record<string, string>>({ summary: '요약 데이터가 로드되었습니다.' })

  const switchTab = (id: string) => {
    setActive(id)
    if (!loaded.has(id)) {
      const tab = LAZY_TABS.find((t) => t.id === id)
      if (!tab) return
      setLoading((prev) => new Set([...prev, id]))
      setTimeout(() => {
        setContent((prev) => ({ ...prev, [id]: `${tab.label} 콘텐츠가 지연 로드되었습니다. (${tab.delay}ms)` }))
        setLoaded((prev) => new Set([...prev, id]))
        setLoading((prev) => { const next = new Set(prev); next.delete(id); return next })
      }, tab.delay)
    }
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0' }}>
        {LAZY_TABS.map((tab) => (
          <Tab key={tab.id} selected={active === tab.id} onClick={() => switchTab(tab.id)}>
            <Tab.Center>{tab.label}</Tab.Center>
            {!loaded.has(tab.id) && (
              <Tab.Trailing>
                <LabelBadge color="sale"><LabelBadge.Label>NEW</LabelBadge.Label></LabelBadge>
              </Tab.Trailing>
            )}
          </Tab>
        ))}
      </div>
      <div style={{ padding: '16px 0', minHeight: 80 }}>
        {loading.has(active) ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: 13 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #e2e8f0', borderTopColor: '#6366f1', animation: 'spin 0.8s linear infinite' }} />
            콘텐츠 로드 중...
          </div>
        ) : (
          <div style={{ padding: '14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fafafa' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: 4 }}>로드 완료</div>
            <div style={{ fontSize: 13, color: '#334155' }}>{content[active] ?? '...'}</div>
            <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
              로드된 탭: {Array.from(loaded).join(', ')}
            </div>
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>각 탭은 첫 방문 시 한 번만 로드됩니다 (Lazy Mount)</div>
    </div>
  )
}

export const Radix_탭_콘텐츠_지연_로딩: Story = {
  name: 'Radix UI — 탭 콘텐츠 지연 로딩(Lazy Mount) 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix Tabs forceMount/LazyMount 패턴. 탭을 처음 클릭할 때만 콘텐츠를 로드합니다. ' +
          '이후 전환 시에는 캐시된 콘텐츠를 즉시 표시합니다. ' +
          '미방문 탭에는 NEW 배지를 표시합니다.',
      },
    },
  },
  render: () => <RadixLazyTabRender />,
}

/* --------------------------------------------------------------------------
   Cycle 123 — shadcn/ui + Linear Design 벤치마크
-------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   shadcn/ui: 필터 탭 바 패턴
   shadcn Tabs 의 underline 스타일 + 검색 가능한 탭 필터 조합
-------------------------------------------------------------------------- */
function ShadcnFilterTabRender() {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const FILTER_TABS = [
    { id: 'all', label: '전체', count: 24 },
    { id: 'open', label: 'Open', count: 8 },
    { id: 'in_review', label: 'In Review', count: 5 },
    { id: 'closed', label: 'Closed', count: 11 },
  ]

  const ITEMS = [
    { id: 1, title: '로그인 페이지 리디자인', status: 'open', author: '김민준', date: '2일 전' },
    { id: 2, title: 'API 응답 캐싱 구현', status: 'in_review', author: '이서연', date: '4시간 전' },
    { id: 3, title: '다크모드 토큰 정리', status: 'closed', author: '박준혁', date: '3일 전' },
    { id: 4, title: '접근성 audit 반영', status: 'open', author: '최유진', date: '1일 전' },
    { id: 5, title: 'Storybook 7→8 마이그레이션', status: 'in_review', author: '김민준', date: '1시간 전' },
    { id: 6, title: '번들 사이즈 최적화', status: 'closed', author: '이서연', date: '5일 전' },
    { id: 7, title: '컴포넌트 테스트 커버리지', status: 'open', author: '박준혁', date: '6시간 전' },
    { id: 8, title: 'CI 파이프라인 속도 개선', status: 'closed', author: '최유진', date: '1주 전' },
  ]

  const STATUS_COLOR: Record<string, string> = {
    open: '#10b981', in_review: '#f59e0b', closed: '#94a3b8',
  }
  const STATUS_LABEL: Record<string, string> = {
    open: 'Open', in_review: 'In Review', closed: 'Closed',
  }

  const filtered = ITEMS.filter((it) => {
    const matchTab = active === 'all' || it.status === active
    const matchQuery = it.title.includes(query) || it.author.includes(query)
    return matchTab && matchQuery
  })

  return (
    <div style={{ width: 480 }}>
      {/* Search */}
      <div style={{ marginBottom: 14 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이슈 또는 담당자 검색..."
          style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: 16 }}>
        {FILTER_TABS.map((tab) => (
          <Tab
            key={tab.id}
            selected={active === tab.id}
            onClick={() => setActive(tab.id)}
          >
            <Tab.Center>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {tab.label}
                <span style={{
                  minWidth: 18, height: 18, borderRadius: 9, padding: '0 5px',
                  background: active === tab.id ? '#6366f1' : '#e2e8f0',
                  color: active === tab.id ? '#fff' : '#64748b',
                  fontSize: 11, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {tab.count}
                </span>
              </span>
            </Tab.Center>
          </Tab>
        ))}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fff' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[item.status], flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{item.title}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{item.author} · {item.date}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: STATUS_COLOR[item.status], padding: '2px 8px', borderRadius: 20, background: `${STATUS_COLOR[item.status]}18` }}>
              {STATUS_LABEL[item.status]}
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 14, padding: '24px 0' }}>결과 없음</div>
        )}
      </div>
    </div>
  )
}

export const Shadcn_필터_탭_바: Story = {
  name: 'shadcn/ui - 필터 탭 바 + 검색 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Tabs 언더라인 스타일 + 검색 입력 조합 패턴. 탭별 아이템 카운트 배지와 ' +
          '검색어 필터를 결합하여 GitHub 이슈 목록과 유사한 인터페이스를 구현합니다.',
      },
    },
  },
  render: () => <ShadcnFilterTabRender />,
}

/* --------------------------------------------------------------------------
   Linear: 뷰 전환 탭 패턴
   Linear 의 List/Board/Timeline 뷰 전환 — 탭 클릭으로 레이아웃 모드 변경
-------------------------------------------------------------------------- */
function LinearViewSwitchTabRender() {
  const [view, setView] = useState<'list' | 'board' | 'timeline'>('list')

  const ISSUES = [
    { id: 'ENG-001', title: '폼 유효성 검사 개선', priority: 'high', status: 'in_progress', team: 'FE' },
    { id: 'ENG-002', title: 'WebSocket 연결 안정화', priority: 'urgent', status: 'todo', team: 'BE' },
    { id: 'ENG-003', title: '대시보드 성능 최적화', priority: 'medium', status: 'in_review', team: 'FE' },
    { id: 'ENG-004', title: 'e2e 테스트 커버리지', priority: 'low', status: 'todo', team: 'QA' },
    { id: 'ENG-005', title: '로그인 세션 갱신', priority: 'high', status: 'done', team: 'BE' },
    { id: 'ENG-006', title: '다국어 지원 추가', priority: 'medium', status: 'todo', team: 'FE' },
  ]

  const PRIORITY_COLOR: Record<string, string> = { urgent: '#ef4444', high: '#f59e0b', medium: '#6366f1', low: '#94a3b8' }
  const STATUS_GROUPS: Record<string, typeof ISSUES> = {
    Todo: ISSUES.filter((i) => i.status === 'todo'),
    'In Progress': ISSUES.filter((i) => i.status === 'in_progress'),
    'In Review': ISSUES.filter((i) => i.status === 'in_review'),
    Done: ISSUES.filter((i) => i.status === 'done'),
  }

  return (
    <div style={{ width: 560 }}>
      {/* View tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Engineering 이슈</span>
        <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0' }}>
          {(['list', 'board', 'timeline'] as const).map((v) => (
            <Tab key={v} selected={view === v} onClick={() => setView(v)}>
              <Tab.Center>
                {v === 'list' ? '목록' : v === 'board' ? '보드' : '타임라인'}
              </Tab.Center>
            </Tab>
          ))}
        </div>
      </div>

      {/* List view */}
      {view === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {ISSUES.map((issue) => (
            <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fff' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: PRIORITY_COLOR[issue.priority], flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, minWidth: 56 }}>{issue.id}</span>
              <span style={{ flex: 1, fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{issue.title}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: '#f1f5f9', color: '#64748b' }}>{issue.team}</span>
            </div>
          ))}
        </div>
      )}

      {/* Board view */}
      {view === 'board' && (
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {Object.entries(STATUS_GROUPS).map(([col, items]) => (
            <div key={col} style={{ minWidth: 160, flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                {col} <span style={{ fontWeight: 400, color: '#94a3b8' }}>({items.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {items.map((issue) => (
                  <div key={issue.id} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12 }}>
                    <div style={{ color: '#1e293b', fontWeight: 600, marginBottom: 4 }}>{issue.title}</div>
                    <span style={{ color: '#94a3b8' }}>{issue.id}</span>
                  </div>
                ))}
                {items.length === 0 && <div style={{ padding: '10px', borderRadius: 8, border: '1px dashed #e2e8f0', fontSize: 11, color: '#cbd5e1', textAlign: 'center' }}>없음</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timeline view */}
      {view === 'timeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ISSUES.map((issue, i) => (
            <div key={issue.id} style={{ display: 'flex', gap: 14, paddingBottom: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: PRIORITY_COLOR[issue.priority], flexShrink: 0, marginTop: 3 }} />
                {i < ISSUES.length - 1 && <span style={{ width: 2, flex: 1, background: '#f1f5f9', marginTop: 4 }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{issue.title}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{issue.id} · {issue.team}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Linear_뷰_전환_탭: Story = {
  name: 'Linear - 뷰 전환 탭 패턴 (List/Board/Timeline)',
  parameters: {
    docs: {
      description: {
        story:
          'Linear의 이슈 뷰 전환 탭 패턴. List/Board/Timeline 3가지 뷰를 Tab으로 전환하며 ' +
          '각 뷰에서 동일한 데이터를 다른 레이아웃으로 렌더링합니다.',
      },
    },
  },
  render: () => <LinearViewSwitchTabRender />,
}

/* --------------------------------------------------------------------------
   shadcn + Linear: 설정 탭 패널 패턴
   두 시스템의 설정 화면 탭 패턴 결합 — 아이콘 탭 + 상세 설정 패널
-------------------------------------------------------------------------- */
function ShadcnLinearSettingsTabRender() {
  const [active, setActive] = useState('general')

  const SETTINGS_TABS = [
    { id: 'general', label: '일반', icon: <SettingLineIcon size={14} /> },
    { id: 'notifications', label: '알림', icon: <NotificationLineIcon size={14} /> },
    { id: 'team', label: '팀', icon: <PeopleLineIcon size={14} /> },
    { id: 'billing', label: '결제', icon: <StarLineIcon size={14} /> },
  ]

  const PANELS: Record<string, React.ReactNode> = {
    general: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SettingRow label="워크스페이스 이름" description="팀에 표시되는 이름입니다.">
          <input defaultValue="Orbit UI Team" style={{ padding: '7px 10px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, width: 200 }} />
        </SettingRow>
        <SettingRow label="슬러그" description="URL에 사용되는 고유 식별자입니다.">
          <input defaultValue="orbit-ui" style={{ padding: '7px 10px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, width: 200 }} />
        </SettingRow>
        <SettingRow label="타임존" description="회의 및 일정에 사용됩니다.">
          <select style={{ padding: '7px 10px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, width: 200, background: '#fff' }}>
            <option>Asia/Seoul (UTC+9)</option>
            <option>UTC</option>
          </select>
        </SettingRow>
      </div>
    ),
    notifications: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['이슈 할당됨', '멘션', '댓글', '상태 변경', '마감일 임박'].map((item) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 8, border: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: 13, color: '#1e293b' }}>{item}</span>
            <ToggleSwitch />
          </div>
        ))}
      </div>
    ),
    team: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { name: '김민준', role: 'Admin', avatar: '#6366f1' },
          { name: '이서연', role: 'Member', avatar: '#10b981' },
          { name: '박준혁', role: 'Member', avatar: '#f59e0b' },
          { name: '최유진', role: 'Guest', avatar: '#ef4444' },
        ].map((m) => (
          <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, border: '1px solid #f1f5f9' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: m.avatar, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>
              {m.name[0]}
            </div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{m.name}</div>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: '#f1f5f9', color: '#64748b' }}>{m.role}</span>
          </div>
        ))}
      </div>
    ),
    billing: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ padding: '16px', borderRadius: 10, border: '2px solid #6366f1', background: '#f0f0ff' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#4338ca' }}>Pro 플랜 (현재)</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', margin: '8px 0 4px' }}>₩19,000<span style={{ fontSize: 13, fontWeight: 400, color: '#64748b' }}> / 월</span></div>
          <div style={{ fontSize: 12, color: '#64748b' }}>최대 20명 · 무제한 프로젝트 · 우선 지원</div>
        </div>
        <button style={{ padding: '10px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, color: '#64748b', cursor: 'pointer' }}>
          플랜 변경 →
        </button>
      </div>
    ),
  }

  return (
    <div style={{ width: 500 }}>
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: 20 }}>
        {SETTINGS_TABS.map((tab) => (
          <Tab key={tab.id} selected={active === tab.id} onClick={() => setActive(tab.id)}>
            <Tab.Leading>{tab.icon}</Tab.Leading>
            <Tab.Center>{tab.label}</Tab.Center>
          </Tab>
        ))}
      </div>
      {PANELS[active]}
    </div>
  )
}

function SettingRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{description}</div>
      </div>
      {children}
    </div>
  )
}

function ToggleSwitch() {
  const [on, setOn] = useState(true)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      style={{
        width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer',
        background: on ? '#6366f1' : '#e2e8f0', position: 'relative', transition: 'background 0.2s',
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: on ? 19 : 3,
        width: 14, height: 14, borderRadius: '50%', background: '#fff',
        transition: 'left 0.2s',
      }} />
    </button>
  )
}

export const Shadcn_Linear_설정_탭_패널: Story = {
  name: 'shadcn/ui + Linear - 설정 탭 패널 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Settings 레이아웃 + Linear 워크스페이스 설정 패턴. 아이콘이 있는 탭으로 ' +
          '섹션(일반/알림/팀/결제)을 전환하고 각 패널에 맞는 설정 UI를 표시합니다.',
      },
    },
  },
  render: () => <ShadcnLinearSettingsTabRender />,
}

/* --------------------------------------------------------------------------
   MUI — 아이콘 + 텍스트 탭 아이템 (수직 아이콘 레이아웃)
-------------------------------------------------------------------------- */
function MUIIconVerticalTabRender() {
  const [selected, setSelected] = useState(0)

  const tabs = [
    { icon: HomeLineIcon, label: '홈', badge: null },
    { icon: StarLineIcon, label: '즐겨찾기', badge: 3 },
    { icon: PeopleLineIcon, label: '팀', badge: null },
    { icon: SettingLineIcon, label: '설정', badge: null },
    { icon: NotificationLineIcon, label: '알림', badge: 12 },
  ]

  return (
    <div style={{ maxWidth: 480, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 10 }}>MUI Icon Tabs 패턴 — 아이콘 + 레이블 조합</p>
      <div style={{ display: 'flex', gap: 4 }}>
        {tabs.map((t, idx) => {
          const Icon = t.icon
          const isActive = selected === idx
          return (
            <div key={idx} style={{ position: 'relative' }}>
              <Tab
                value={String(idx)}
                selected={isActive}
                onClick={() => setSelected(idx)}

              >
                <Tab.Leading><Icon style={{ width: 16, height: 16 }} /></Tab.Leading>
                <Tab.Center>{t.label}</Tab.Center>
              </Tab>
              {t.badge !== null && (
                <span style={{ position: 'absolute', top: 2, right: 4, fontSize: 9, fontWeight: 700, background: '#ef4444', color: '#fff', borderRadius: 10, padding: '0 4px', minWidth: 14, textAlign: 'center', lineHeight: '14px', display: 'block' }}>{t.badge}</span>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 12, padding: '12px', borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-surfaceDefault)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
        선택됨: {tabs[selected].label}
      </div>
    </div>
  )
}

export const MUI_아이콘_텍스트_탭: Story = {
  name: 'MUI — 아이콘 + 텍스트 조합 탭 아이템',
  parameters: {
    docs: {
      description: {
        story: 'MUI Icon Tabs 패턴. Tab.Leading 아이콘 + Tab.Center 텍스트 조합으로 의미 있는 탭 구성. 알림 카운트는 Tab 외부에 절대 포지션 뱃지로 오버레이.',
      },
    },
  },
  render: () => <MUIIconVerticalTabRender />,
}

/* --------------------------------------------------------------------------
   Arco Design — 필터 칩 스타일 탭 (색상 상태 + 선택 누적)
-------------------------------------------------------------------------- */
function ArcoFilterChipTabRender() {
  const [selected, setSelected] = useState<number[]>([0])

  const filters = [
    { value: 0, label: '전체', color: '#6366f1' },
    { value: 1, label: '디자인', color: '#ec4899' },
    { value: 2, label: '개발', color: '#0ea5e9' },
    { value: 3, label: '기획', color: '#f59e0b' },
    { value: 4, label: '마케팅', color: '#10b981' },
    { value: 5, label: '운영', color: '#8b5cf6' },
  ]

  const toggle = (val: number) => {
    if (val === 0) { setSelected([0]); return }
    setSelected((prev) => {
      const next = prev.filter((v) => v !== 0)
      if (next.includes(val)) {
        const removed = next.filter((v) => v !== val)
        return removed.length === 0 ? [0] : removed
      }
      return [...next, val]
    })
  }

  const activeFilters = selected.includes(0) ? filters.slice(1) : filters.filter((f) => selected.includes(f.value))

  return (
    <div style={{ maxWidth: 480, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {filters.map((f) => {
          const isActive = selected.includes(f.value)
          return (
            <Tab
              key={f.value}
              value={String(f.value)}
              selected={isActive}
              onClick={() => toggle(f.value)}
            >
              <Tab.Center>
                <span style={{ color: isActive ? f.color : 'var(--sem-eclipse-color-foregroundTertiary)', fontWeight: isActive ? 600 : 400, transition: 'color 0.15s' }}>{f.label}</span>
              </Tab.Center>
            </Tab>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {activeFilters.map((f) => (
          <span key={f.value} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: `${f.color}18`, color: f.color, fontWeight: 600, border: `1px solid ${f.color}30` }}>{f.label}</span>
        ))}
      </div>
    </div>
  )
}

export const Arco_필터_칩_탭: Story = {
  name: 'Arco Design — 필터 칩 스타일 탭 (다중 선택)',
  parameters: {
    docs: {
      description: {
        story: 'Arco Design 필터 탭 패턴. Tab을 필터 칩처럼 활용해 다중 선택을 지원. "전체" 선택 시 나머지 해제, 개별 항목 선택 시 "전체" 해제. 선택된 필터를 하단에 뱃지로 표시.',
      },
    },
  },
  render: () => <ArcoFilterChipTabRender />,
}

/* --------------------------------------------------------------------------
   MUI + Arco — 코드 에디터 파일 탭 (수정 표시 + 닫기)
-------------------------------------------------------------------------- */
function MUIArcoFileTabRender() {
  const [files, setFiles] = useState([
    { id: 1, name: 'SolidButton.tsx', modified: true, lang: 'tsx' },
    { id: 2, name: 'SolidButton.stories.tsx', modified: false, lang: 'tsx' },
    { id: 3, name: 'SolidButton.styles.ts', modified: true, lang: 'ts' },
    { id: 4, name: 'index.ts', modified: false, lang: 'ts' },
  ])
  const [activeId, setActiveId] = useState(1)

  const closeFile = (id: number) => {
    const newFiles = files.filter((f) => f.id !== id)
    if (newFiles.length === 0) return
    setFiles(newFiles)
    if (activeId === id) setActiveId(newFiles[0].id)
  }

  const activeFile = files.find((f) => f.id === activeId)

  const langColors: Record<string, string> = { tsx: '#3178c6', ts: '#0ea5e9' }

  return (
    <div style={{ maxWidth: 560, fontFamily: 'monospace, system-ui', background: '#0f172a', borderRadius: 10, overflow: 'hidden', border: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #1e293b', overflowX: 'auto' }}>
        {files.map((file) => {
          const isActive = file.id === activeId
          return (
            <div
              key={file.id}
              onClick={() => setActiveId(file.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', cursor: 'pointer', background: isActive ? '#1e293b' : 'transparent', borderRight: '1px solid #0f172a', borderBottom: isActive ? '2px solid #6366f1' : '2px solid transparent', whiteSpace: 'nowrap', minWidth: 0 }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 2, background: langColors[file.lang], flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: isActive ? '#f1f5f9' : '#64748b' }}>{file.name}</span>
              {file.modified && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />}
              <button
                onClick={(e) => { e.stopPropagation(); closeFile(file.id) }}
                style={{ marginLeft: 2, width: 14, height: 14, borderRadius: 3, border: 'none', background: 'transparent', color: '#475569', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
      <div style={{ padding: '12px 16px', fontSize: 11, color: '#94a3b8', lineHeight: 1.8 }}>
        <div style={{ color: '#64748b', marginBottom: 6 }}>{'//'} {activeFile?.name}</div>
        {activeFile?.lang === 'tsx' ? (
          <>
            <div><span style={{ color: '#818cf8' }}>import</span> <span style={{ color: '#34d399' }}>{'{ forwardRef }'}</span> <span style={{ color: '#818cf8' }}>from</span> <span style={{ color: '#fbbf24' }}>&#39;react&#39;</span></div>
            <div><span style={{ color: '#818cf8' }}>export const</span> <span style={{ color: '#60a5fa' }}>SolidButton</span> = <span style={{ color: '#34d399' }}>forwardRef</span>((props, ref) {'=> { ... }'})</div>
          </>
        ) : (
          <>
            <div><span style={{ color: '#818cf8' }}>export</span> <span style={{ color: '#818cf8' }}>type</span> <span style={{ color: '#60a5fa' }}>SolidButtonTheme</span> = {'{ ... }'}</div>
            <div><span style={{ color: '#818cf8' }}>export</span> {'{'} SolidButton {'}'} <span style={{ color: '#818cf8' }}>from</span> <span style={{ color: '#fbbf24' }}>&#39;./SolidButton&#39;</span></div>
          </>
        )}
        {activeFile?.modified && <div style={{ marginTop: 8, fontSize: 10, color: '#f59e0b' }}>• 저장되지 않은 변경 사항</div>}
      </div>
    </div>
  )
}

export const MUI_Arco_파일_탭_에디터: Story = {
  name: 'MUI + Arco — 코드 에디터 파일 탭 (수정 표시 + 닫기)',
  parameters: {
    docs: {
      description: {
        story: 'MUI 탭 닫기 패턴 + Arco 파일 상태 표시 조합. 파일 탭에 수정 여부 노란 점, 언어별 색상 아이콘, 닫기 버튼을 배치. VS Code 스타일 파일 탭 패턴을 Orbit UI Tab으로 구현.',
      },
    },
  },
  render: () => <MUIArcoFileTabRender />,
}
