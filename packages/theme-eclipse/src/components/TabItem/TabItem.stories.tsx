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
