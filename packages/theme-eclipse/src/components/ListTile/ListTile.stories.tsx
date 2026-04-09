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
