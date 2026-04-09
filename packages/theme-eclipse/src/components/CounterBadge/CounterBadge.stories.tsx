import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

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

/* --------------------------------------------------------------------------
   메일함 배지 (Gmail / Outlook 스타일)
   폴더별 미읽음 수 표시
-------------------------------------------------------------------------- */
export const 메일함_배지: Story = {
  render: () => {
    const folders = [
      { name: '받은편지함', count: 24, icon: '📥' },
      { name: '중요', count: 3, icon: '⭐' },
      { name: '보낸편지함', count: 0, icon: '📤' },
      { name: '임시보관함', count: 1, icon: '📝' },
      { name: '스팸', count: 102, icon: '🚫' },
      { name: '휴지통', count: 0, icon: '🗑️' },
    ]

    return (
      <div style={{ width: 220, background: 'white', borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>메일</span>
        </div>
        {folders.map((folder) => (
          <div
            key={folder.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 14px',
              cursor: 'pointer',
              transition: 'background 0.1s',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>{folder.icon}</span>
              <span style={{ fontSize: 13, color: folder.count > 0 ? '#0f172a' : '#64748b', fontWeight: folder.count > 0 ? 600 : 400 }}>
                {folder.name}
              </span>
            </div>
            {folder.count > 0 && <CounterBadge>{folder.count}</CounterBadge>}
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   실시간 업데이트 패턴 (setInterval로 카운터 증가)
   알림 도착 시뮬레이션
-------------------------------------------------------------------------- */
const RealtimeBadgeComponent = () => {
  const [notifCount, setNotifCount] = useState(0)
  const [msgCount, setMsgCount] = useState(2)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setNotifCount((prev) => (prev >= 99 ? prev : prev + 1))
      if (Math.random() > 0.6) {
        setMsgCount((prev) => (prev >= 99 ? prev : prev + 1))
      }
    }, 1200)
    return () => clearInterval(interval)
  }, [isRunning])

  const handleReset = () => {
    setIsRunning(false)
    setNotifCount(0)
    setMsgCount(2)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 20 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type="button"
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          style={{
            padding: '6px 14px', borderRadius: 6, border: 'none',
            background: isRunning ? '#e2e8f0' : '#6366f1', color: isRunning ? '#94a3b8' : 'white',
            fontSize: 13, cursor: isRunning ? 'not-allowed' : 'pointer',
          }}
        >
          시작
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0',
            background: 'white', color: '#475569', fontSize: 13, cursor: 'pointer',
          }}
        >
          초기화
        </button>
      </div>

      <div style={{ display: 'flex', gap: 28 }}>
        {/* 알림 아이콘 */}
        <div style={{ position: 'relative', display: 'inline-flex', cursor: 'pointer' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 20 }}>🔔</span>
          </div>
          {notifCount > 0 && (
            <span style={{ position: 'absolute', top: -6, right: -6 }}>
              <CounterBadge>{notifCount}</CounterBadge>
            </span>
          )}
        </div>

        {/* 메시지 아이콘 */}
        <div style={{ position: 'relative', display: 'inline-flex', cursor: 'pointer' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 20 }}>💬</span>
          </div>
          {msgCount > 0 && (
            <span style={{ position: 'absolute', top: -6, right: -6 }}>
              <CounterBadge>{msgCount}</CounterBadge>
            </span>
          )}
        </div>
      </div>

      <div style={{ fontSize: 12, color: '#94a3b8' }}>
        {isRunning ? '1.2초마다 새 알림이 도착합니다...' : '시작 버튼을 눌러 실시간 업데이트를 확인하세요.'}
      </div>
    </div>
  )
}

export const 실시간_업데이트: Story = {
  render: () => <RealtimeBadgeComponent />,
}
