import { Flex } from '@heejun-com/core'
import { ChevronRightLineIcon, CheckIcon, ChevronDownLineIcon, StarFillIcon, MoreHorizontalIcon } from '@heejun-com/icons'
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
