import { Meta, StoryObj } from '@storybook/react'

import { CounterBadge } from './CounterBadge'

CounterBadge.displayName = 'CounterBadge'

const meta = {
  title: 'eclipse/Data Display/CounterBadge',
  component: CounterBadge,
  args: {
    children: 99,
  },
} satisfies Meta<typeof CounterBadge>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => <CounterBadge {...args} />,
} satisfies Story

export const 디자인_QA = {
  args: {
    children: 99,
  },
  argTypes: {
    children: {
      control: { type: 'number', min: 0, max: 200 },
    },
  },
  render: (args) => <CounterBadge {...args} />,
} satisfies Story

// ── Vercel/Linear benchmark stories ────────────────────────────────────────

// Vercel notification bell + counter — nav badge pattern
export const 네비게이션_알림_배지: Story = {
  render: () => {
    const navItems = [
      { label: 'Issues', count: 12 },
      { label: 'PRs', count: 3 },
      { label: 'Notifications', count: 99 },
      { label: 'Mentions', count: 100 },
      { label: 'Archived', count: 0 },
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 220 }}>
        {navItems.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 10px',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background 0.12s',
            }}
          >
            <span style={{ fontSize: 13, color: '#0f172a' }}>{item.label}</span>
            {item.count > 0 && <CounterBadge>{item.count}</CounterBadge>}
          </div>
        ))}
      </div>
    )
  },
}

// Kanban column header with counter (Linear-style board header)
export const 칸반_컬럼_헤더: Story = {
  render: () => {
    const columns = [
      { title: 'Todo', count: 8, color: '#94a3b8' },
      { title: 'In Progress', count: 3, color: '#6366f1' },
      { title: 'Review', count: 5, color: '#f59e0b' },
      { title: 'Done', count: 24, color: '#10b981' },
    ]

    return (
      <div style={{ display: 'flex', gap: 24 }}>
        {columns.map((col) => (
          <div key={col.title} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{col.title}</span>
            <CounterBadge>{col.count}</CounterBadge>
          </div>
        ))}
      </div>
    )
  },
}

// Overflow counter — 99+ edge case
export const 숫자_오버플로우_처리: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Count overflow handling
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {[1, 9, 50, 99, 100, 200].map((n) => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <CounterBadge>{n}</CounterBadge>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}
