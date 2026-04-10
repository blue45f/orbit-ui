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

// ─── Linear Design 벤치마크: 이슈 보드 상태별 카운터 ─────────────────────────
// Linear의 사이드바는 각 상태(Todo/In Progress/Done)별 이슈 수를 CounterBadge로 표시합니다.
// 호버 시 배경색이 바뀌는 컴팩트한 행 레이아웃이 특징입니다.

const LINEAR_STATUSES = [
  { key: 'backlog', label: 'Backlog', count: 14, color: '#94a3b8', dot: '#94a3b8' },
  { key: 'todo', label: 'Todo', count: 8, color: '#6366f1', dot: '#6366f1' },
  { key: 'inprogress', label: 'In Progress', count: 3, color: '#f59e0b', dot: '#f59e0b' },
  { key: 'review', label: 'In Review', count: 5, color: '#8b5cf6', dot: '#8b5cf6' },
  { key: 'done', label: 'Done', count: 47, color: '#10b981', dot: '#10b981' },
  { key: 'cancelled', label: 'Cancelled', count: 2, color: '#ef4444', dot: '#ef4444' },
]

export const Linear_이슈_상태_카운터: Story = {
  name: 'Linear Design - 이슈 상태별 카운터 사이드바',
  render: () => (
    <div
      style={{
        width: 220,
        background: '#111',
        borderRadius: 10,
        padding: '12px 6px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#475569',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0 8px 8px',
        }}
      >
        Issues
      </div>
      {LINEAR_STATUSES.map((status) => (
        <div
          key={status.key}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px 8px',
            borderRadius: 6,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#1e1e2e' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: status.dot,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 13, color: '#c4c4c4', fontWeight: 400 }}>{status.label}</span>
          </div>
          <CounterBadge>{status.count}</CounterBadge>
        </div>
      ))}
      <div
        style={{
          marginTop: 8,
          padding: '8px',
          borderTop: '1px solid #1e1e2e',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 11, color: '#475569' }}>전체</span>
        <CounterBadge>{LINEAR_STATUSES.reduce((s, st) => s + st.count, 0)}</CounterBadge>
      </div>
    </div>
  ),
}

// ─── Arco Design 벤치마크: 데이터 집계 배지 ─────────────────────────────────
// Arco Design Statistic + Badge 조합 패턴:
// 대시보드 상단 KPI 카드에 CounterBadge를 부착해 변화량을 표시합니다.

const ARCO_KPI_CARDS = [
  {
    label: '총 사용자',
    value: '48,291',
    change: 12,
    changeLabel: '어제 대비 신규',
    color: '#6366f1',
    bg: '#eff6ff',
  },
  {
    label: '이번 달 주문',
    value: '3,842',
    change: 7,
    changeLabel: '처리 대기 중',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    label: '미해결 이슈',
    value: '24',
    change: 5,
    changeLabel: '오늘 신규',
    color: '#ef4444',
    bg: '#fef2f2',
  },
]

export const Arco_KPI_카드_배지: Story = {
  name: 'Arco Design - KPI 카드 집계 배지 패턴',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {ARCO_KPI_CARDS.map((card) => (
        <div
          key={card.label}
          style={{
            position: 'relative',
            padding: '18px 20px',
            borderRadius: 12,
            border: `1px solid ${card.color}22`,
            background: card.bg,
            minWidth: 160,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -8,
              right: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span style={{ fontSize: 10, color: card.color, fontWeight: 600 }}>
              +{card.changeLabel}
            </span>
            <CounterBadge>{card.change}</CounterBadge>
          </div>
          <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>
            {card.label}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Linear Design 벤치마크: 프로젝트 진행률 카운터 ─────────────────────────
// Linear 프로젝트 뷰: 각 마일스톤 완료 수 / 전체 수를 한 행에 표시합니다.
// 작은 카운터 배지가 진행 상황을 직관적으로 나타냅니다.

const LINEAR_PROJECTS = [
  {
    name: 'Orbit UI v3.0',
    milestones: [
      { label: '완료', count: 8, color: '#10b981' },
      { label: '진행중', count: 3, color: '#6366f1' },
      { label: '예정', count: 5, color: '#94a3b8' },
    ],
    dueDate: '2026-05-01',
    progress: 50,
  },
  {
    name: 'Eclipse Theme v2',
    milestones: [
      { label: '완료', count: 12, color: '#10b981' },
      { label: '진행중', count: 1, color: '#6366f1' },
      { label: '예정', count: 2, color: '#94a3b8' },
    ],
    dueDate: '2026-04-20',
    progress: 80,
  },
  {
    name: 'Icon Set v5',
    milestones: [
      { label: '완료', count: 2, color: '#10b981' },
      { label: '진행중', count: 4, color: '#6366f1' },
      { label: '예정', count: 10, color: '#94a3b8' },
    ],
    dueDate: '2026-06-15',
    progress: 25,
  },
]

export const Linear_프로젝트_진행_카운터: Story = {
  name: 'Linear Design - 프로젝트 마일스톤 진행 카운터',
  render: () => (
    <div
      style={{
        width: 480,
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid #f1f5f9',
          fontSize: 11,
          fontWeight: 700,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          display: 'grid',
          gridTemplateColumns: '1fr 180px 80px',
          gap: 8,
        }}
      >
        <span>프로젝트</span>
        <span>마일스톤</span>
        <span>마감일</span>
      </div>
      {LINEAR_PROJECTS.map((proj, i) => (
        <div
          key={proj.name}
          style={{
            padding: '12px 16px',
            borderBottom: i < LINEAR_PROJECTS.length - 1 ? '1px solid #f8fafc' : 'none',
            display: 'grid',
            gridTemplateColumns: '1fr 180px 80px',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
              {proj.name}
            </div>
            <div
              style={{
                height: 3,
                background: '#f1f5f9',
                borderRadius: 4,
                overflow: 'hidden',
                width: '80%',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${proj.progress}%`,
                  background: '#6366f1',
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {proj.milestones.map((ms) => (
              <div key={ms.label} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: ms.color,
                    flexShrink: 0,
                  }}
                />
                <CounterBadge>{ms.count}</CounterBadge>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>{proj.dueDate}</div>
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   MUI — 탭 배지 패턴
   MUI Tabs + Badge 조합으로 탭마다 미확인 항목 수 표시
-------------------------------------------------------------------------- */
const MUI_TABS = [
  { id: 'inbox', label: '받은편지함', count: 12 },
  { id: 'sent', label: '보낸편지함', count: 0 },
  { id: 'draft', label: '임시저장', count: 3 },
  { id: 'spam', label: '스팸', count: 47 },
  { id: 'trash', label: '휴지통', count: 0 },
]

const MuiTabBadgeDemo = () => {
  const [activeTab, setActiveTab] = useState('inbox')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 480 }}>
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0' }}>
        {MUI_TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? '#6366f1' : '#64748b', borderBottom: `2px solid ${activeTab === tab.id ? '#6366f1' : 'transparent'}`, marginBottom: -2, transition: 'all 0.2s' }}>
            {tab.label}
            {tab.count > 0 && <CounterBadge>{tab.count}</CounterBadge>}
          </button>
        ))}
      </div>
      <div style={{ padding: '24px', color: '#64748b', fontSize: 14 }}>
        {MUI_TABS.find((t) => t.id === activeTab)?.label} 내용 영역
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', padding: '0 24px 16px' }}>
        MUI Tabs + Badge — 탭별 미확인 항목 카운트 표시
      </div>
    </div>
  )
}

export const MUI_탭_배지_패턴: Story = {
  name: 'MUI - 탭 배지 패턴 (미확인 항목 카운트)',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Tabs + Badge 조합 패턴. 각 탭에 미확인 항목 수를 CounterBadge로 표시하며, 0인 탭은 배지를 숨깁니다. 선택된 탭 강조와 배지 색상을 일관되게 유지합니다.',
      },
    },
  },
  render: () => <MuiTabBadgeDemo />,
}

/* --------------------------------------------------------------------------
   Figma Plugin UI — 레이어 패널 오브젝트 카운트
   Figma의 레이어 패널에서 그룹 내 오브젝트 수를 배지로 표시
-------------------------------------------------------------------------- */
const FIGMA_LAYERS = [
  { name: 'Components', type: 'frame', count: 24, color: '#6366f1', expanded: true },
  { name: 'Icons', type: 'group', count: 156, color: '#10b981', expanded: false },
  { name: 'Typography', type: 'frame', count: 8, color: '#f59e0b', expanded: false },
  { name: 'Colors', type: 'group', count: 32, color: '#ec4899', expanded: false },
  { name: 'Layout', type: 'frame', count: 6, color: '#3b82f6', expanded: true },
]

const FigmaLayerPanelDemo = () => {
  const [selected, setSelected] = useState('Components')
  return (
    <div style={{ width: 220, background: '#1e1e1e', borderRadius: 10, padding: '12px 0', color: '#fff' }}>
      <div style={{ padding: '4px 12px 10px', fontSize: 11, color: '#888', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Layers
      </div>
      {FIGMA_LAYERS.map((layer) => (
        <div key={layer.name} onClick={() => setSelected(layer.name)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', cursor: 'pointer', background: selected === layer.name ? 'rgba(99,102,241,0.2)' : 'transparent', borderLeft: `2px solid ${selected === layer.name ? layer.color : 'transparent'}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: layer.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: selected === layer.name ? '#e2e8f0' : '#aaa' }}>{layer.name}</span>
          </div>
          <CounterBadge>{layer.count}</CounterBadge>
        </div>
      ))}
      <div style={{ padding: '10px 12px 4px', fontSize: 10, color: '#555' }}>
        Figma Layer Panel — 오브젝트 수 배지
      </div>
    </div>
  )
}

export const Figma_레이어_패널_카운트: Story = {
  name: 'Figma Plugin UI - 레이어 패널 오브젝트 카운트',
  parameters: {
    docs: {
      description: {
        story:
          'Figma 레이어 패널 패턴. 그룹/프레임마다 내부 오브젝트 수를 CounterBadge로 표시하고, 다크 배경 + 컬러 점으로 레이어 타입을 구분합니다.',
      },
    },
  },
  render: () => <FigmaLayerPanelDemo />,
}

/* --------------------------------------------------------------------------
   MUI + Figma — 쇼핑카트 / 장바구니 배지 시스템
   MUI AppBar Badge + 실시간 카트 업데이트 패턴
-------------------------------------------------------------------------- */
const SHOP_ITEMS = [
  { id: 'p1', name: 'Orbit UI Pro', price: 29 },
  { id: 'p2', name: 'Icon Pack 500+', price: 15 },
  { id: 'p3', name: 'Template Bundle', price: 49 },
  { id: 'p4', name: 'Design Tokens Kit', price: 19 },
]

const ShoppingCartBadgeDemo = () => {
  const [cart, setCart] = useState<string[]>([])
  const addItem = (id: string) => setCart((prev) => [...prev, id])
  const removeItem = () => setCart((prev) => prev.slice(0, -1))
  const cartCount = cart.length
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#0f172a', borderRadius: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Store</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative' }}>
          <button onClick={removeItem} disabled={cartCount === 0} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: cartCount > 0 ? 'pointer' : 'default', fontSize: 18, padding: '4px 8px' }}>
            [cart]
          </button>
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: -2, right: -4 }}>
              <CounterBadge>{cartCount}</CounterBadge>
            </span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SHOP_ITEMS.map((item) => {
          const inCart = cart.filter((id) => id === item.id).length
          return (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{item.name}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>${item.price}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {inCart > 0 && <CounterBadge>{inCart}</CounterBadge>}
                <button onClick={() => addItem(item.id)} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 6, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  추가
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        MUI AppBar Badge + 실시간 카트 카운트 패턴
      </div>
    </div>
  )
}

export const MUI_Figma_장바구니_배지: Story = {
  name: 'MUI AppBar + Figma - 장바구니 배지 시스템',
  parameters: {
    docs: {
      description: {
        story:
          'MUI AppBar Badge 패턴. 아이콘 버튼 우상단에 CounterBadge를 오버레이하여 장바구니 수량을 실시간으로 표시합니다. 99+ 오버플로우, 0일 때 숨김 처리가 포함됩니다.',
      },
    },
  },
  render: () => <ShoppingCartBadgeDemo />,
}
