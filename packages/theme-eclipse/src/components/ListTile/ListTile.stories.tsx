import { Flex } from '@heejun-com/core'
import {
  ChevronRightLineIcon,
  CheckIcon,
  ChevronDownLineIcon,
  StarFillIcon,
  MoreHorizontalIcon,
  SettingLineIcon,
  PeopleLineIcon,
  NotificationLineIcon,
  HomeLineIcon,
  DeleteLineIcon,
  CopyLineIcon,
  ShareIcon,
} from '@heejun-com/icons'
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { ContainedCheckbox } from '../BoxedCheckbox'
import { CounterBadge } from '../CounterBadge'
import { LabelBadge } from '../LabelBadge'
import { Radio } from '../RadioButton'
import { Switch } from '../Switch'

import { ListTile } from './ListTile'

ListTile.displayName = 'ListTile'
ListTile.Leading.displayName = 'ListTile.Leading'
ListTile.Title.displayName = 'ListTile.Title'
ListTile.Description.displayName = 'ListTile.Description'
ListTile.Trailing.displayName = 'ListTile.Trailing'

const meta = {
  title: 'eclipse/Data Display/ListTile',
  component: ListTile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
} satisfies Meta<typeof ListTile>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
      </ListTile>
    </div>
  ),
}

export const Leading_Trailing: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile as="button" onClick={() => alert('clicked')}>
        <ListTile.Leading>
          <div
            style={{
              width: 45,
              height: 45,
              borderRadius: 8,
              background: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            IMG
          </div>
        </ListTile.Leading>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
        <ListTile.Trailing>
          <ChevronRightLineIcon size={18} color="#222" />
        </ListTile.Trailing>
      </ListTile>
    </div>
  ),
}

export const 인터랙티브: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile as="button" onClick={() => alert('clicked')}>
        <ListTile.Leading>
          <CheckIcon size={18} />
        </ListTile.Leading>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
      </ListTile>
    </div>
  ),
}

export const 비활성화: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile as="button" disabled>
        <ListTile.Leading>
          <CheckIcon size={18} />
        </ListTile.Leading>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
      </ListTile>
    </div>
  ),
}

export const Trailing만: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile as="button" onClick={() => alert('clicked')}>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
        <ListTile.Trailing>
          <div>
            <div style={{ fontSize: 13, color: '#666', textAlign: 'right' }}>Detail</div>
            <div style={{ fontSize: 12, color: '#999', textAlign: 'right', marginTop: 2 }}>
              <ChevronRightLineIcon size={12} />
            </div>
          </div>
        </ListTile.Trailing>
      </ListTile>
    </div>
  ),
}

export const 디자인_QA: Story = {
  render: () => (
    <Flex flexDirection="column" gap="20px">
      <ListTile>
        <ListTile.Title>일반 리스트 아이템</ListTile.Title>
        <ListTile.Description>단순 리스트 형태 (인터렉션 불가, 터치 없음)</ListTile.Description>
      </ListTile>

      {/* @ts-expect-error htmlFor is valid when as='label' but polymorphic types don't narrow correctly */}
      <ListTile as="label" htmlFor="checkbox-list-item">
        <ListTile.Leading>
          <ContainedCheckbox id="checkbox-list-item" />
        </ListTile.Leading>
        <ListTile.Title>체크박스 리스트 아이템</ListTile.Title>
        <ListTile.Description>
          인터랙티브 리스트 형태 (인터렉션 가능, 전체가 터치영역)
        </ListTile.Description>
      </ListTile>

      {/* @ts-expect-error htmlFor is valid when as='label' but polymorphic types don't narrow correctly */}
      <ListTile as="label" htmlFor="radio-list-item">
        <ListTile.Leading>
          <Radio id="radio-list-item" value="ryu" />
        </ListTile.Leading>
        <ListTile.Title>라디오 리스트 아이템</ListTile.Title>
        <ListTile.Description>
          인터랙티브 리스트 형태 (인터렉션 가능, 전체가 터치영역)
        </ListTile.Description>
      </ListTile>

      <ListTile as="a" href="#">
        <ListTile.Title>링크 리스트 아이템</ListTile.Title>
        <ListTile.Description>
          인터랙티브 리스트 형태 (인터렉션 가능, 전체가 터치영역)
        </ListTile.Description>
        <ListTile.Trailing>
          <ChevronRightLineIcon />
        </ListTile.Trailing>
      </ListTile>

      <ListTile as="button">
        <ListTile.Title>아코디언 리스트 아이템</ListTile.Title>
        <ListTile.Description>
          인터랙티브 리스트 형태 (인터렉션 가능, 전체가 터치영역)
        </ListTile.Description>
        <ListTile.Trailing>
          <ChevronDownLineIcon />
        </ListTile.Trailing>
      </ListTile>

      <ListTile as="li">
        <ListTile.Title>스위치 리스트 아이템</ListTile.Title>
        <ListTile.Description>단순 리스트 형태 (액션 요소만 터치 영역)</ListTile.Description>
        <ListTile.Trailing>
          <Switch />
        </ListTile.Trailing>
      </ListTile>
    </Flex>
  ),
}

// ── Linear-style benchmark stories ──────────────────────────────────────────

// Linear compact density: 32px row height, icon + title + metadata + badge
const issueColors: Record<string, string> = {
  Todo: '#94a3b8',
  'In Progress': '#6366f1',
  Done: '#10b981',
  Cancelled: '#ef4444',
}

const priorityConfig: Record<string, { label: string; color: 'gray' | 'benefit' | 'sale' }> = {
  urgent: { label: 'Urgent', color: 'sale' },
  high: { label: 'High', color: 'benefit' },
  medium: { label: 'Medium', color: 'gray' },
  low: { label: 'Low', color: 'gray' },
}

type Issue = {
  id: string
  title: string
  status: 'Todo' | 'In Progress' | 'Done' | 'Cancelled'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  assignee: string
  shortcut?: string
}

const demoIssues: Issue[] = [
  { id: 'ORB-101', title: 'Update design token hierarchy', status: 'In Progress', priority: 'urgent', assignee: 'HJ', shortcut: 'I' },
  { id: 'ORB-102', title: 'Add keyboard shortcut hints to Command palette', status: 'Todo', priority: 'high', assignee: 'KJ', shortcut: 'N' },
  { id: 'ORB-103', title: 'Implement compact density mode for ListTile', status: 'Done', priority: 'medium', assignee: 'LY' },
  { id: 'ORB-104', title: 'Migrate CounterBadge to semantic tokens', status: 'Todo', priority: 'low', assignee: 'PM' },
  { id: 'ORB-105', title: 'Fix Popover z-index in Modal context', status: 'In Progress', priority: 'high', assignee: 'HJ', shortcut: 'F' },
  { id: 'ORB-106', title: 'Write MigrationGuide for Chakra users', status: 'Cancelled', priority: 'low', assignee: 'CD' },
]

// Status dot indicator (Vercel-style compact status)
const StatusDot: React.FC<{ status: Issue['status'] }> = ({ status }) => (
  <div style={{
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: issueColors[status],
    flexShrink: 0,
  }} />
)

// Keyboard shortcut badge (Linear-style)
const ShortcutBadge: React.FC<{ char: string }> = ({ char }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
    borderRadius: 4,
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    fontSize: 11,
    fontWeight: 600,
    color: '#64748b',
    fontFamily: 'monospace',
    flexShrink: 0,
  }}>
    {char}
  </div>
)

// Compact avatar (Linear assignee chip)
const AssigneeChip: React.FC<{ initials: string }> = ({ initials }) => (
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
    {initials}
  </div>
)

// Linear-style compact issue row (32px height)
const LinearCompactIssueList = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
      <div style={{ width: 560 }}>
        {/* Section header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 12px',
          borderBottom: '1px solid #f1f5f9',
          marginBottom: 2,
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Issues</span>
          <CounterBadge>{demoIssues.length}</CounterBadge>
        </div>

        {/* Compact rows — 32px height, Linear-density */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {demoIssues.map((issue) => {
            const isSelected = selectedId === issue.id
            const priority = priorityConfig[issue.priority]

            return (
              <ListTile
                key={issue.id}
                as="button"
                onClick={() => setSelectedId(isSelected ? null : issue.id)}
                style={{
                  minHeight: 32,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 12,
                  paddingRight: 12,
                  background: isSelected ? 'rgba(99,102,241,0.06)' : 'transparent',
                  borderLeft: isSelected ? '2px solid #6366f1' : '2px solid transparent',
                  transition: 'background 0.12s, border-color 0.12s',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <ListTile.Leading>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <StatusDot status={issue.status} />
                    <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', fontWeight: 500 }}>
                      {issue.id}
                    </span>
                  </div>
                </ListTile.Leading>
                <ListTile.Title>{issue.title}</ListTile.Title>
                <ListTile.Trailing>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <LabelBadge color={priority.color}>
                      <LabelBadge.Label>{priority.label}</LabelBadge.Label>
                    </LabelBadge>
                    <AssigneeChip initials={issue.assignee} />
                    {issue.shortcut && <ShortcutBadge char={issue.shortcut} />}
                  </div>
                </ListTile.Trailing>
              </ListTile>
            )
          })}
        </div>
      </div>
    )
}

export const Linear_컴팩트_이슈목록: Story = {
  render: () => <LinearCompactIssueList />,
}

// Linear-style drag-handle + checkbox list
const LinearDragCheckbox = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set())

    const items = [
      { id: 'a', label: 'Design token audit', sub: 'Due today' },
      { id: 'b', label: 'Update Storybook stories', sub: 'Due tomorrow' },
      { id: 'c', label: 'Write migration guide', sub: 'Due this week' },
      { id: 'd', label: 'Run typecheck CI', sub: 'Ongoing' },
    ]

    const toggle = (id: string) => {
      setChecked((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    return (
      <div style={{ width: 420 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', padding: '4px 12px 6px', borderBottom: '1px solid #f1f5f9', marginBottom: 2 }}>
          Backlog
        </div>
        {items.map((item) => {
          const done = checked.has(item.id)
          return (
            <ListTile
              key={item.id}
              style={{
                minHeight: 36,
                padding: '0 12px',
                cursor: 'pointer',
                opacity: done ? 0.5 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              <ListTile.Leading>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="3" cy="4" r="1.2" fill="#cbd5e1" />
                    <circle cx="7" cy="4" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="8" r="1.2" fill="#cbd5e1" />
                    <circle cx="7" cy="8" r="1.2" fill="#cbd5e1" />
                    <circle cx="3" cy="12" r="1.2" fill="#cbd5e1" />
                    <circle cx="7" cy="12" r="1.2" fill="#cbd5e1" />
                  </svg>
                  <input
                    id={`drag-cb-${item.id}`}
                    type="checkbox"
                    checked={done}
                    onChange={() => toggle(item.id)}
                    style={{ width: 14, height: 14, accentColor: '#6366f1', cursor: 'pointer' }}
                  />
                </div>
              </ListTile.Leading>
              <ListTile.Title fontWeight={done ? 'regular' : 'bold'}>
                <span style={{ textDecoration: done ? 'line-through' : 'none' }}>
                  {item.label}
                </span>
              </ListTile.Title>
              <ListTile.Trailing>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.sub}</span>
              </ListTile.Trailing>
            </ListTile>
          )
        })}
      </div>
    )
}

export const Linear_드래그핸들_체크박스: Story = {
  render: () => <LinearDragCheckbox />,
}

// Project list with icon + title + metadata (Linear project list pattern)
const LinearProjectList = () => {
  const [active, setActive] = useState('design-system')

  const projects = [
    { id: 'design-system', name: 'Design System', desc: '14 open issues', color: '#6366f1', icon: 'DS', count: 14 },
    { id: 'mobile-app', name: 'Mobile App', desc: '7 open issues', color: '#10b981', icon: 'MA', count: 7 },
    { id: 'web-platform', name: 'Web Platform', desc: '23 open issues', color: '#f59e0b', icon: 'WP', count: 23 },
    { id: 'infra', name: 'Infrastructure', desc: '3 open issues', color: '#ef4444', icon: 'IN', count: 3 },
  ]

  return (
      <div style={{ width: 280 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px 6px' }}>
          Projects
        </div>
        {projects.map((p) => {
          const isActive = active === p.id
          return (
            <ListTile
              key={p.id}
              as="button"
              onClick={() => setActive(p.id)}
              style={{
                minHeight: 36,
                padding: '0 8px 0 12px',
                background: isActive ? 'rgba(99,102,241,0.07)' : 'transparent',
                borderRadius: 6,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              <ListTile.Leading>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: p.color,
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {p.icon}
                </div>
              </ListTile.Leading>
              <ListTile.Title fontWeight={isActive ? 'bold' : 'regular'}>{p.name}</ListTile.Title>
              <ListTile.Trailing>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{p.count}</span>
                  <StarFillIcon size={12} color={isActive ? '#f59e0b' : '#e2e8f0'} />
                </div>
              </ListTile.Trailing>
            </ListTile>
          )
        })}
      </div>
    )
}

export const Linear_프로젝트목록: Story = {
  render: () => <LinearProjectList />,
}

// Context menu row with keyboard shortcut hints (Linear command bar pattern)
export const Linear_단축키_힌트: Story = {
  render: () => {
    const commands = [
      { label: 'New Issue', keys: ['C'], icon: '+', desc: 'Create a new issue' },
      { label: 'My Issues', keys: ['M', 'Y'], icon: 'me', desc: 'View issues assigned to me' },
      { label: 'Search', keys: ['/'], icon: 'S', desc: 'Open global search' },
      { label: 'Settings', keys: ['G', 'S'], icon: 'set', desc: 'Open settings' },
      { label: 'Toggle Theme', keys: ['D'], icon: 'th', desc: 'Switch dark/light mode' },
    ]

    return (
      <div style={{ width: 400, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid #f1f5f9', fontSize: 12, fontWeight: 600, color: '#64748b' }}>
          Keyboard Shortcuts
        </div>
        {commands.map((cmd, i) => (
          <ListTile
            key={i}
            as="button"
            style={{ minHeight: 36, padding: '0 12px', textAlign: 'left', width: '100%', cursor: 'pointer' }}
          >
            <ListTile.Leading>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: '#f1f5f9',
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
              }}>
                {cmd.icon}
              </div>
            </ListTile.Leading>
            <ListTile.Title>{cmd.label}</ListTile.Title>
            <ListTile.Trailing>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {cmd.keys.map((k) => (
                  <ShortcutBadge key={k} char={k} />
                ))}
                <MoreHorizontalIcon size={14} color="#cbd5e1" />
              </div>
            </ListTile.Trailing>
          </ListTile>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: ListItem + ListItemIcon + ListItemText 조합
   MUI의 다단계 내비게이션 패턴 — 아이콘 + 라벨 + 서브라벨 + 뱃지 조합
-------------------------------------------------------------------------- */
const MUINavMenuRender = () => {
  const [active, setActive] = useState('home')

  const navItems: Array<{
    id: string
    label: string
    sub: string
    icon: React.FC<{ size?: number; color?: string }>
    badge?: number
  }> = [
    { id: 'home', label: '홈', sub: '메인 대시보드', icon: HomeLineIcon },
    { id: 'people', label: '팀원', sub: '멤버 관리', icon: PeopleLineIcon, badge: 3 },
    { id: 'notifications', label: '알림', sub: '미확인 알림', icon: NotificationLineIcon, badge: 12 },
    { id: 'settings', label: '설정', sub: '계정 및 환경설정', icon: SettingLineIcon },
  ]

  return (
    <div
      style={{
        width: 300,
        borderRadius: 12,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <div
        style={{
          padding: '12px 16px 8px',
          borderBottom: '1px solid #f1f5f9',
          fontSize: 11,
          fontWeight: 700,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        Navigation
      </div>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = active === item.id
        return (
          <ListTile
            key={item.id}
            as="button"
            onClick={() => setActive(item.id)}
            style={{
              padding: '10px 16px',
              background: isActive ? 'rgba(99,102,241,0.06)' : 'transparent',
              borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'background 0.12s, border-color 0.12s',
            }}
          >
            <ListTile.Leading>
              <Icon size={18} color={isActive ? '#6366f1' : '#94a3b8'} />
            </ListTile.Leading>
            <ListTile.Title fontWeight={isActive ? 'bold' : 'regular'}>
              <span style={{ color: isActive ? '#6366f1' : '#1e293b' }}>{item.label}</span>
            </ListTile.Title>
            <ListTile.Description>{item.sub}</ListTile.Description>
            {item.badge !== undefined && (
              <ListTile.Trailing>
                <div
                  style={{
                    minWidth: 20,
                    height: 20,
                    borderRadius: 10,
                    background: isActive ? '#6366f1' : '#e2e8f0',
                    color: isActive ? '#fff' : '#64748b',
                    fontSize: 10,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 5px',
                  }}
                >
                  {item.badge}
                </div>
              </ListTile.Trailing>
            )}
          </ListTile>
        )
      })}
    </div>
  )
}

export const MUI_내비게이션_메뉴: Story = {
  render: () => <MUINavMenuRender />,
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 폼 validation 상태 (error/success/warning helperText)
   MUI FormControl + helperText 조합을 ListTile로 구현
   설정 폼의 필드별 상태 표시 패턴
-------------------------------------------------------------------------- */
type ValidationStatus = 'idle' | 'success' | 'error' | 'warning'

const statusConfig: Record<
  ValidationStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  idle: { label: '입력 대기', color: '#94a3b8', bg: '#f8fafc', border: '#e2e8f0' },
  success: { label: '확인 완료', color: '#10b981', bg: '#f0fdf4', border: '#bbf7d0' },
  error: { label: '오류 발생', color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
  warning: { label: '주의 필요', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
}

const MUIFormValidationRender = () => {
  const [statuses, setStatuses] = useState<Record<string, ValidationStatus>>({
    username: 'success',
    email: 'error',
    password: 'warning',
    phone: 'idle',
  })

  const fields: Array<{ key: string; label: string; helperText: Record<ValidationStatus, string> }> = [
    {
      key: 'username',
      label: '사용자명',
      helperText: {
        idle: '영문, 숫자 조합 4-20자',
        success: 'orbit_user_1234 사용 가능합니다',
        error: '이미 사용 중인 이름입니다',
        warning: '특수문자는 사용할 수 없습니다',
      },
    },
    {
      key: 'email',
      label: '이메일',
      helperText: {
        idle: '유효한 이메일 주소를 입력하세요',
        success: '사용 가능한 이메일입니다',
        error: '이미 가입된 이메일입니다',
        warning: '인증이 완료되지 않은 이메일입니다',
      },
    },
    {
      key: 'password',
      label: '비밀번호',
      helperText: {
        idle: '8자 이상, 특수문자 포함',
        success: '안전한 비밀번호입니다',
        error: '비밀번호가 너무 짧습니다',
        warning: '더 강력한 비밀번호를 권장합니다',
      },
    },
    {
      key: 'phone',
      label: '전화번호',
      helperText: {
        idle: '010-0000-0000 형식',
        success: '인증 완료',
        error: '잘못된 번호 형식입니다',
        warning: '인증 코드를 다시 확인하세요',
      },
    },
  ]

  const cycleStatus = (key: string) => {
    const order: ValidationStatus[] = ['idle', 'success', 'error', 'warning']
    setStatuses((prev) => {
      const current = prev[key]
      const next = order[(order.indexOf(current) + 1) % order.length]
      return { ...prev, [key]: next }
    })
  }

  return (
    <div style={{ width: 380 }}>
      <div
        style={{
          fontSize: 13,
          color: '#94a3b8',
          padding: '0 0 8px',
          marginBottom: 4,
        }}
      >
        클릭하면 상태가 전환됩니다 (idle / success / error / warning)
      </div>
      <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {fields.map((field, i) => {
          const status = statuses[field.key]
          const cfg = statusConfig[status]
          return (
            <ListTile
              key={field.key}
              as="button"
              onClick={() => cycleStatus(field.key)}
              style={{
                padding: '12px 16px',
                borderBottom: i < fields.length - 1 ? '1px solid #f1f5f9' : 'none',
                background: cfg.bg,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.15s',
                borderLeft: `3px solid ${cfg.border}`,
              }}
            >
              <ListTile.Title>{field.label}</ListTile.Title>
              <ListTile.Description>
                <span style={{ color: cfg.color }}>{field.helperText[status]}</span>
              </ListTile.Description>
              <ListTile.Trailing>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 100,
                    background: cfg.border,
                    color: cfg.color,
                    fontSize: 10,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cfg.label}
                </span>
              </ListTile.Trailing>
            </ListTile>
          )
        })}
      </div>
    </div>
  )
}

export const MUI_폼_유효성_상태: Story = {
  render: () => <MUIFormValidationRender />,
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 컨텍스트 메뉴 액션 패턴
   MUI MenuItem + ListItemIcon + ListItemText — 우클릭 컨텍스트 메뉴,
   Dropdown 메뉴 내 아이콘 + 레이블 + 단축키 조합
-------------------------------------------------------------------------- */
export const MUI_컨텍스트_메뉴_액션: Story = {
  name: 'MUI — 컨텍스트 메뉴 액션 패턴',
  render: () => {
    const actions: Array<{
      label: string
      sub?: string
      icon: React.FC<{ size?: number; color?: string }>
      shortcut?: string
      danger?: boolean
      divider?: boolean
    }> = [
      { label: '복사', sub: '클립보드에 복사', icon: CopyLineIcon, shortcut: 'Ctrl+C' },
      { label: '공유', sub: '링크로 공유하기', icon: ShareIcon, shortcut: 'Ctrl+Shift+S', divider: true },
      { label: '삭제', sub: '영구적으로 삭제', icon: DeleteLineIcon, danger: true },
    ]

    return (
      <div
        style={{
          width: 280,
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          background: '#fff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {actions.map((action, i) => {
          const Icon = action.icon
          return (
            <React.Fragment key={action.label}>
              <ListTile
                as="button"
                style={{
                  padding: '10px 14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  background: 'transparent',
                  transition: 'background 0.1s',
                }}
              >
                <ListTile.Leading>
                  <Icon
                    size={16}
                    color={action.danger ? '#ef4444' : '#64748b'}
                  />
                </ListTile.Leading>
                <ListTile.Title>
                  <span style={{ color: action.danger ? '#ef4444' : '#1e293b' }}>
                    {action.label}
                  </span>
                </ListTile.Title>
                <ListTile.Description>{action.sub}</ListTile.Description>
                {action.shortcut && (
                  <ListTile.Trailing>
                    <span
                      style={{
                        fontSize: 10,
                        color: '#94a3b8',
                        fontFamily: 'monospace',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {action.shortcut}
                    </span>
                  </ListTile.Trailing>
                )}
              </ListTile>
              {action.divider && i < actions.length - 1 && (
                <div style={{ height: 1, background: '#f1f5f9', margin: '2px 0' }} />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 페이지 속성 패널
   Notion Page Properties — 키/값 속성 인라인 편집 ListTile 패턴
-------------------------------------------------------------------------- */
type NotionPropType = { key: string; label: string; value: string; icon: string; editable: boolean }

const NOTION_PAGE_PROPS: NotionPropType[] = [
  { key: 'status', label: '상태', value: '진행 중', icon: '●', editable: true },
  { key: 'assignee', label: '담당자', value: '김지수', icon: '👤', editable: true },
  { key: 'due', label: '마감일', value: '2026-04-30', icon: '📅', editable: true },
  { key: 'priority', label: '우선순위', value: '높음', icon: '↑', editable: true },
  { key: 'created', label: '생성일', value: '2026-04-01', icon: '⊕', editable: false },
  { key: 'tags', label: '태그', value: 'Design System, UI', icon: '#', editable: true },
]

const NOTION_STATUS_COLOR: Record<string, string> = {
  '진행 중': '#3b82f6',
  '완료': '#10b981',
  '검토 중': '#f59e0b',
  '중단': '#ef4444',
}

export const Notion_페이지_속성_패널: Story = {
  name: 'Notion — 페이지 속성 인라인 편집 패널',
  parameters: {
    docs: {
      description: {
        story:
          'Notion Page Properties 패턴. 속성 키/값을 ListTile로 표현하고, ' +
          '편집 가능 항목 클릭 시 인라인 입력 전환. 상태 속성은 색상 점으로 구분, ' +
          '읽기 전용 속성은 비활성화 스타일 적용.',
      },
    },
  },
  render: function NotionPagePropsPanel() {
    const [editingKey, setEditingKey] = useState<string | null>(null)
    const [propValues, setPropValues] = useState<Record<string, string>>(
      Object.fromEntries(NOTION_PAGE_PROPS.map((p) => [p.key, p.value]))
    )

    return (
      <div style={{ width: 340, borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.5, textTransform: 'uppercase' }}>
          페이지 속성
        </div>

        {NOTION_PAGE_PROPS.map((prop) => (
          <ListTile
            key={prop.key}
            as={prop.editable ? 'button' : 'div'}
            disabled={!prop.editable}
            onClick={() => {
              if (prop.editable) {
                setEditingKey(editingKey === prop.key ? null : prop.key)
              }
            }}
            style={{
              padding: '9px 16px',
              cursor: prop.editable ? 'pointer' : 'default',
              textAlign: 'left',
              width: '100%',
              background: editingKey === prop.key ? '#f8fafc' : 'transparent',
              borderBottom: '1px solid #f8fafc',
              transition: 'background 0.1s',
            }}
          >
            <ListTile.Leading>
              <span style={{ fontSize: 14, width: 20, textAlign: 'center' }}>{prop.icon}</span>
            </ListTile.Leading>
            <ListTile.Title>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{prop.label}</span>
            </ListTile.Title>
            <ListTile.Trailing>
              {editingKey === prop.key ? (
                <input
                  autoFocus
                  value={propValues[prop.key]}
                  onChange={(e) => setPropValues((prev) => ({ ...prev, [prop.key]: e.target.value }))}
                  onBlur={() => setEditingKey(null)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: 12, border: 'none', outline: 'none', background: 'transparent', color: '#0f172a', width: 120, textAlign: 'right' }}
                />
              ) : (
                <span style={{
                  fontSize: 12, color: prop.editable ? '#0f172a' : '#94a3b8',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  {prop.key === 'status' && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: NOTION_STATUS_COLOR[propValues[prop.key]] ?? '#94a3b8', display: 'inline-block' }} />
                  )}
                  {propValues[prop.key]}
                </span>
              )}
            </ListTile.Trailing>
          </ListTile>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Raycast 벤치마크: 확장 프로그램 목록
   Raycast Extensions List — 확장명 + 설명 + 활성화 토글 패턴
-------------------------------------------------------------------------- */
type RaycastExt = { id: string; name: string; desc: string; author: string; enabled: boolean; category: string }

const RAYCAST_EXTENSIONS: RaycastExt[] = [
  { id: 'github', name: 'GitHub', desc: 'PR, 이슈, 알림 빠른 접근', author: 'Raycast', enabled: true, category: '개발' },
  { id: 'linear', name: 'Linear', desc: '이슈 생성 및 검색', author: 'Linear', enabled: true, category: '개발' },
  { id: 'figma', name: 'Figma', desc: 'Figma 파일 빠른 열기', author: 'Figma', enabled: false, category: '디자인' },
  { id: 'notion', name: 'Notion', desc: '페이지 검색 및 생성', author: 'Notion', enabled: true, category: '생산성' },
  { id: 'slack', name: 'Slack', desc: '채널 및 DM 빠른 열기', author: 'Slack', enabled: false, category: '커뮤니케이션' },
  { id: 'vercel', name: 'Vercel', desc: '배포 현황 모니터링', author: 'Vercel', enabled: true, category: '개발' },
]

export const Raycast_확장_프로그램_목록: Story = {
  name: 'Raycast — 확장 프로그램 관리 목록',
  parameters: {
    docs: {
      description: {
        story:
          'Raycast Extensions List 패턴. 확장 프로그램명/설명/제작자 + 활성화 Switch 토글. ' +
          '카테고리별 그룹, 활성/비활성 상태 시각적 구분.',
      },
    },
  },
  render: function RaycastExtList() {
    const [extensions, setExtensions] = useState(RAYCAST_EXTENSIONS)

    const toggle = (id: string) => {
      setExtensions((prev) =>
        prev.map((ext) => ext.id === id ? { ...ext, enabled: !ext.enabled } : ext)
      )
    }

    const categories = Array.from(new Set(extensions.map((e) => e.category)))

    return (
      <div style={{ width: 360, borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: '12px 16px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>확장 프로그램</span>
          <span style={{ fontSize: 11, color: '#64748b' }}>{extensions.filter((e) => e.enabled).length}/{extensions.length} 활성화</span>
        </div>

        {categories.map((category) => (
          <React.Fragment key={category}>
            <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.5, textTransform: 'uppercase', background: '#f8fafc' }}>
              {category}
            </div>
            {extensions.filter((e) => e.category === category).map((ext) => (
              <ListTile
                key={ext.id}
                style={{
                  padding: '10px 16px',
                  opacity: ext.enabled ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                  borderBottom: '1px solid #f8fafc',
                }}
              >
                <ListTile.Leading>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: ext.enabled ? '#0f172a' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: ext.enabled ? '#f8fafc' : '#94a3b8', flexShrink: 0, transition: 'background 0.2s' }}>
                    {ext.name[0]}
                  </div>
                </ListTile.Leading>
                <ListTile.Title>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{ext.name}</span>
                </ListTile.Title>
                <ListTile.Description>
                  {ext.desc} · <span style={{ color: '#94a3b8' }}>{ext.author}</span>
                </ListTile.Description>
                <ListTile.Trailing>
                  <Switch
                    checked={ext.enabled}
                    onCheckedChange={() => toggle(ext.id)}
                  />
                </ListTile.Trailing>
              </ListTile>
            ))}
          </React.Fragment>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 사이드바 페이지 트리
   Notion Sidebar — 페이지 계층 구조, 중첩 들여쓰기, 즐겨찾기 패턴
-------------------------------------------------------------------------- */
type NotionPageNode = {
  id: string
  title: string
  icon: string
  depth: number
  hasChildren: boolean
  pinned: boolean
}

const NOTION_PAGES: NotionPageNode[] = [
  { id: 'root1', title: 'Orbit UI 설계', icon: '📐', depth: 0, hasChildren: true, pinned: true },
  { id: 'child1', title: '컴포넌트 목록', icon: '📋', depth: 1, hasChildren: false, pinned: false },
  { id: 'child2', title: '토큰 시스템', icon: '🎨', depth: 1, hasChildren: true, pinned: false },
  { id: 'child2a', title: '색상 팔레트', icon: '○', depth: 2, hasChildren: false, pinned: false },
  { id: 'child2b', title: '타이포그래피', icon: '○', depth: 2, hasChildren: false, pinned: false },
  { id: 'root2', title: '스프린트 노트', icon: '📝', depth: 0, hasChildren: false, pinned: true },
  { id: 'root3', title: '팀 회의록', icon: '👥', depth: 0, hasChildren: true, pinned: false },
  { id: 'child3', title: '2026-04 킥오프', icon: '○', depth: 1, hasChildren: false, pinned: false },
]

export const Notion_사이드바_페이지_트리: Story = {
  name: 'Notion — 사이드바 페이지 트리 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Notion Sidebar 페이지 계층 트리 패턴. depth에 따른 들여쓰기, 즐겨찾기(pinned) 별 표시, ' +
          '하위 항목 보유 여부 chevron 표시. ListTile의 padding + Leading 조합으로 계층 구현.',
      },
    },
  },
  render: function NotionSidebarTree() {
    const [pinnedMap, setPinnedMap] = useState<Record<string, boolean>>(
      Object.fromEntries(NOTION_PAGES.map((p) => [p.id, p.pinned]))
    )
    const [activeId, setActiveId] = useState<string>('root1')

    const togglePin = (id: string) => {
      setPinnedMap((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
      <div style={{ width: 260, borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Orbit UI 워크스페이스</span>
        </div>

        {NOTION_PAGES.map((page) => (
          <ListTile
            key={page.id}
            as="button"
            onClick={() => setActiveId(page.id)}
            style={{
              padding: `8px 12px 8px ${12 + page.depth * 16}px`,
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              background: activeId === page.id ? '#eff6ff' : 'transparent',
              borderLeft: `2px solid ${activeId === page.id ? '#6366f1' : 'transparent'}`,
              transition: 'background 0.1s, border-color 0.1s',
            }}
          >
            <ListTile.Leading>
              <span style={{ fontSize: 13, width: 18, textAlign: 'center' }}>
                {page.hasChildren ? <ChevronRightLineIcon /> : page.icon}
              </span>
            </ListTile.Leading>
            <ListTile.Title>
              <span style={{ fontSize: 13, color: activeId === page.id ? '#4f46e5' : '#374151', fontWeight: activeId === page.id ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {!page.hasChildren && page.depth > 0 ? '' : ''}{page.title}
              </span>
            </ListTile.Title>
            <ListTile.Trailing>
              <button
                onClick={(e) => { e.stopPropagation(); togglePin(page.id) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: pinnedMap[page.id] ? 1 : 0.2, fontSize: 11, transition: 'opacity 0.15s', color: '#f59e0b' }}
              >
                ★
              </button>
            </ListTile.Trailing>
          </ListTile>
        ))}
      </div>
    )
  },
}

// ============================================================
// Cycle 136 — Tailwind UI + Material UI 벤치마크 반영
// ============================================================

// Tailwind UI 스타일 — 연락처 목록 (밀도 높은 dense 패턴)
const CONTACTS_136 = [
  { id: 1, name: '김희준', role: '디자인 시스템 리드', dept: 'Engineering', avatar: 'HJ', color: '#6366f1', online: true },
  { id: 2, name: '이재성', role: '프론트엔드 개발', dept: 'Engineering', avatar: 'JS', color: '#0ea5e9', online: true },
  { id: 3, name: '박민주', role: 'UI/UX 디자이너', dept: 'Design', avatar: 'MJ', color: '#10b981', online: false },
  { id: 4, name: '최수현', role: '프로덕트 매니저', dept: 'Product', avatar: 'SH', color: '#f59e0b', online: true },
  { id: 5, name: '정다은', role: 'QA 엔지니어', dept: 'QA', avatar: 'DE', color: '#ec4899', online: false },
]

export const Tailwind_연락처_Dense_목록: Story = {
  name: 'Tailwind UI — 연락처 Dense 목록 (Cycle 136)',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI Contact List 패턴. 온라인 상태 인디케이터 + 역할/부서 이중 서브텍스트. ' +
          '클릭 시 활성 행 하이라이트. 밀도 있는 dense 레이아웃으로 많은 항목을 효율적으로 표시.',
      },
    },
  },
  render: function TailwindContactListRender() {
    const [activeId, setActiveId] = useState<number | null>(null)
    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>팀 연락처</span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{CONTACTS_136.filter((c) => c.online).length}명 온라인</span>
        </div>
        {CONTACTS_136.map((c) => (
          <ListTile
            key={c.id}
            onClick={() => setActiveId(c.id)}
            style={{ background: activeId === c.id ? c.color + '10' : '#fff', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}
          >
            <ListTile.Leading>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                  {c.avatar}
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: c.online ? '#22c55e' : '#cbd5e1', border: '2px solid #fff' }} />
              </div>
            </ListTile.Leading>
            <ListTile.Title style={{ fontWeight: activeId === c.id ? 700 : 500, color: '#0f172a', fontSize: 13 }}>
              {c.name}
            </ListTile.Title>
            <ListTile.Description style={{ fontSize: 11, color: '#64748b' }}>
              {c.role} · {c.dept}
            </ListTile.Description>
            <ListTile.Trailing>
              <ChevronRightLineIcon style={{ color: activeId === c.id ? c.color : '#cbd5e1', transition: 'color 200ms' }} />
            </ListTile.Trailing>
          </ListTile>
        ))}
      </div>
    )
  },
}

// MUI 스타일 — 알림 센터 목록 (읽음/안읽음 + 중요도)
const NOTIFICATIONS_136 = [
  { id: 1, type: 'deploy', title: 'orbit-ui 배포 완료', body: 'orbit-gtzymhbdp Production → Ready (2분 46초)', time: '방금 전', unread: true, level: 'success', color: '#22c55e' },
  { id: 2, type: 'review', title: 'PR #48 리뷰 요청', body: 'feat(DataTable): 컬럼 핀고정 기능 추가', time: '5분 전', unread: true, level: 'info', color: '#3b82f6' },
  { id: 3, type: 'warn', title: 'TypeScript 경고 발생', body: '3개 파일에서 unused import 경고 감지됨', time: '12분 전', unread: true, level: 'warning', color: '#f59e0b' },
  { id: 4, type: 'mention', title: '@김희준 님이 언급했습니다', body: 'Templates.stories.tsx 리뷰 요청', time: '1시간 전', unread: false, level: 'info', color: '#6366f1' },
  { id: 5, type: 'merge', title: 'main 브랜치 병합 완료', body: 'Cycle 135 스토리 22개 파일 → main', time: '2시간 전', unread: false, level: 'success', color: '#10b981' },
]

export const MUI_알림_센터_목록: Story = {
  name: 'MUI — 알림 센터 목록 (Cycle 136)',
  parameters: {
    docs: {
      description: {
        story:
          'Material UI Notification Center 패턴. 읽음/안읽음 상태별 배경 강조, 알림 유형별 색상 인디케이터. ' +
          '클릭 시 읽음 처리(배경 리셋). 안읽은 알림 배지 카운터.',
      },
    },
  },
  render: function MuiNotificationCenterRender() {
    const [items, setItems] = useState(NOTIFICATIONS_136)
    const unreadCount = items.filter((n) => n.unread).length

    function markRead(id: number) {
      setItems((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n))
    }

    function markAllRead() {
      setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
    }

    return (
      <div style={{ width: 400, fontFamily: 'system-ui, sans-serif', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ padding: '14px 16px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>알림</span>
            {unreadCount > 0 && (
              <CounterBadge color="primary">{unreadCount}</CounterBadge>
            )}
          </div>
          <button onClick={markAllRead} style={{ fontSize: 11, color: '#6366f1', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer' }}>모두 읽음</button>
        </div>
        {items.map((n) => (
          <ListTile
            key={n.id}
            onClick={() => markRead(n.id)}
            style={{ background: n.unread ? n.color + '08' : '#fff', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 200ms' }}
          >
            <ListTile.Leading>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: n.unread ? n.color : 'transparent', marginTop: 4, flexShrink: 0 }} />
            </ListTile.Leading>
            <ListTile.Title style={{ fontSize: 13, fontWeight: n.unread ? 700 : 500, color: '#0f172a' }}>
              {n.title}
            </ListTile.Title>
            <ListTile.Description style={{ fontSize: 11, color: '#64748b' }}>
              {n.body}
            </ListTile.Description>
            <ListTile.Trailing>
              <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>{n.time}</span>
            </ListTile.Trailing>
          </ListTile>
        ))}
      </div>
    )
  },
}

// Tailwind UI + MUI — 검색 결과 목록 (하이라이트 + 카테고리 구분)
const SEARCH_RESULTS_136 = [
  { id: 1, title: 'SolidButton', category: '컴포넌트', desc: '기본 CTA 버튼. color / size / width / loading 지원', match: 'Solid' },
  { id: 2, title: 'SolidIconButton', category: '컴포넌트', desc: '아이콘 전용 원형 버튼. 툴팁 연동 권장', match: 'Solid' },
  { id: 3, title: 'OutlineButton', category: '컴포넌트', desc: '외곽선 스타일 보조 액션 버튼', match: 'Button' },
  { id: 4, title: 'solidFill', category: '토큰', desc: 'Component Token — Solid 버튼 채움 색상', match: 'solid' },
  { id: 5, title: 'SolidButton 사용 가이드', category: '문서', desc: 'Do/Dont, 조합 패턴, 접근성 체크리스트', match: 'Solid' },
]

export const Tailwind_MUI_검색_결과_목록: Story = {
  name: 'Tailwind UI + MUI — 검색 결과 목록 (Cycle 136)',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI + MUI Autocomplete 통합 검색 결과 패턴. 카테고리 구분선 + 매칭 키워드 볼드 하이라이트. ' +
          '입력값 변경 시 실시간 필터링. 클릭 시 활성 항목 표시.',
      },
    },
  },
  render: function TailwindMuiSearchResultsRender() {
    const [query, setQuery] = useState('Solid')
    const [activeId, setActiveId] = useState<number | null>(null)

    const filtered = SEARCH_RESULTS_136.filter(
      (r) => query === '' || r.title.toLowerCase().includes(query.toLowerCase()) || r.desc.toLowerCase().includes(query.toLowerCase())
    )

    const categories = Array.from(new Set(filtered.map((r) => r.category)))

    function highlight(text: string) {
      if (!query) return text
      const idx = text.toLowerCase().indexOf(query.toLowerCase())
      if (idx === -1) return text
      return (
        <>
          {text.slice(0, idx)}
          <span style={{ background: '#fef9c3', color: '#854d0e', fontWeight: 700, borderRadius: 2 }}>{text.slice(idx, idx + query.length)}</span>
          {text.slice(idx + query.length)}
        </>
      )
    }

    return (
      <div style={{ width: 420, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ marginBottom: 12, padding: '0 2px' }}>
          <input
            value={query}
            onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
            placeholder="컴포넌트/토큰/문서 검색..."
            style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {filtered.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>검색 결과 없음</div>
          )}
          {categories.map((cat) => (
            <div key={cat}>
              <div style={{ padding: '8px 16px', background: '#f8fafc', fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: 0.5, borderBottom: '1px solid #f1f5f9' }}>
                {cat}
              </div>
              {filtered.filter((r) => r.category === cat).map((r) => (
                <ListTile
                  key={r.id}
                  onClick={() => setActiveId(r.id)}
                  style={{ background: activeId === r.id ? '#eff6ff' : '#fff', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}
                >
                  <ListTile.Title style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                    {highlight(r.title)}
                  </ListTile.Title>
                  <ListTile.Description style={{ fontSize: 11, color: '#64748b' }}>
                    {highlight(r.desc)}
                  </ListTile.Description>
                  <ListTile.Trailing>
                    <ChevronRightLineIcon style={{ color: activeId === r.id ? '#3b82f6' : '#cbd5e1' }} />
                  </ListTile.Trailing>
                </ListTile>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>{filtered.length}개 결과</div>
      </div>
    )
  },
}
