import { StarFillIcon, CheckIcon, TimeLineIcon, AlertLineIcon, ArrowUpIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'

import { AnimatedBadge } from './AnimatedBadge'

AnimatedBadge.displayName = 'AnimatedBadge'

const meta = {
  title: 'eclipse/Data Display/AnimatedBadge',
  component: AnimatedBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "AnimatedBadge는 숫자/텍스트 배지에 등장 애니메이션을 추가하는 컴포넌트입니다. 알림 카운트, 새 항목 표시 등 동적 배지에 활용합니다.",
      },
    },
  },
  args: {},
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'large'],
    },
    color: {
      control: 'inline-radio',
      options: ['white', 'club', 'sale'],
    },
  },
} satisfies Meta<typeof AnimatedBadge>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render(args) {
    return (
      <AnimatedBadge {...args}>
        <AnimatedBadge.Leading>
          <StarFillIcon />
        </AnimatedBadge.Leading>
        <AnimatedBadge.Label>Trailing</AnimatedBadge.Label>
      </AnimatedBadge>
    )
  },
} satisfies Story

export const 테마_재정의 = {
  render(args) {
    return (
      <AnimatedBadge {...args} color="white" size="large">
        <AnimatedBadge.Leading>
          <CheckIcon />
        </AnimatedBadge.Leading>
        <AnimatedBadge.Label>Trailing</AnimatedBadge.Label>
      </AnimatedBadge>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    size: 'large',
    visual: true,
    label: true,
    text: '뱃지 텍스트',
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    visual: {
      control: 'boolean',
    },
    label: {
      control: 'boolean',
    },
    text: {
      control: 'text',
    },
  },

  // eslint-disable-next-line
  render: ({ visual, label, text, ...rest }: any) => {
    return (
      <AnimatedBadge {...rest}>
        {visual && (
          <AnimatedBadge.Leading>
            <CheckIcon size={rest.size === 'large' ? 12 : 10} />
          </AnimatedBadge.Leading>
        )}
        {label && <AnimatedBadge.Label>{text || 'Trailing'}</AnimatedBadge.Label>}
      </AnimatedBadge>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear 스타일: 이슈 상태 뱃지 세트
   Linear의 이슈 트래커에서 볼 수 있는 컴팩트 상태 표시 패턴
-------------------------------------------------------------------------- */
export const Linear_이슈_상태: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Issue Status Badges
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <AnimatedBadge color="white" size="small">
            <AnimatedBadge.Leading>
              <TimeLineIcon size={10} />
            </AnimatedBadge.Leading>
            <AnimatedBadge.Label>Backlog</AnimatedBadge.Label>
          </AnimatedBadge>
          <AnimatedBadge color="club" size="small">
            <AnimatedBadge.Leading>
              <ArrowUpIcon size={10} />
            </AnimatedBadge.Leading>
            <AnimatedBadge.Label>In Progress</AnimatedBadge.Label>
          </AnimatedBadge>
          <AnimatedBadge color="sale" size="small">
            <AnimatedBadge.Leading>
              <CheckIcon size={10} />
            </AnimatedBadge.Leading>
            <AnimatedBadge.Label>Done</AnimatedBadge.Label>
          </AnimatedBadge>
          <AnimatedBadge color="white" size="small">
            <AnimatedBadge.Leading>
              <AlertLineIcon size={10} />
            </AnimatedBadge.Leading>
            <AnimatedBadge.Label>Cancelled</AnimatedBadge.Label>
          </AnimatedBadge>
        </div>
      </div>

      <div>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Large Variants
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <AnimatedBadge color="white" size="large">
            <AnimatedBadge.Leading>
              <TimeLineIcon size={14} />
            </AnimatedBadge.Leading>
            <AnimatedBadge.Label>Backlog</AnimatedBadge.Label>
          </AnimatedBadge>
          <AnimatedBadge color="club" size="large">
            <AnimatedBadge.Leading>
              <ArrowUpIcon size={14} />
            </AnimatedBadge.Leading>
            <AnimatedBadge.Label>In Progress</AnimatedBadge.Label>
          </AnimatedBadge>
          <AnimatedBadge color="sale" size="large">
            <AnimatedBadge.Leading>
              <CheckIcon size={14} />
            </AnimatedBadge.Leading>
            <AnimatedBadge.Label>Done</AnimatedBadge.Label>
          </AnimatedBadge>
        </div>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Linear 스타일: 이슈 목록 컨텍스트 패턴
   실제 Linear 이슈 목록에서 상태 뱃지가 어떻게 사용되는지 보여주는 패턴
-------------------------------------------------------------------------- */
const IssueListItem = ({
  title,
  id,
  badgeColor,
  badgeLabel,
  priority,
}: {
  title: string
  id: string
  badgeColor: 'white' | 'club' | 'sale'
  badgeLabel: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
}) => {
  const priorityColors: Record<string, string> = {
    urgent: '#ef4444',
    high: '#f59e0b',
    medium: '#6366f1',
    low: '#94a3b8',
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        borderBottom: '1px solid #f1f5f9',
        background: '#fff',
        transition: 'background 0.1s',
      }}
    >
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: priorityColors[priority],
          flexShrink: 0,
        }}
      />
      <AnimatedBadge color={badgeColor} size="small" style={{ flexShrink: 0 }}>
        <AnimatedBadge.Label>{badgeLabel}</AnimatedBadge.Label>
      </AnimatedBadge>
      <span style={{ fontSize: '13px', color: '#1e293b', flex: 1, fontWeight: 400 }}>{title}</span>
      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500, fontFamily: 'monospace' }}>{id}</span>
    </div>
  )
}

export const Linear_이슈_목록_패턴: Story = {
  render: () => (
    <div style={{ maxWidth: '560px', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <div
        style={{
          padding: '12px 16px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          fontSize: '12px',
          fontWeight: 700,
          color: '#64748b',
          letterSpacing: '-0.01em',
        }}
      >
        My Issues
      </div>
      <IssueListItem title="다크 모드 토글 구현" id="ORB-142" badgeColor="club" badgeLabel="In Progress" priority="high" />
      <IssueListItem title="접근성 WCAG AA 검토" id="ORB-139" badgeColor="white" badgeLabel="Backlog" priority="medium" />
      <IssueListItem title="컴포넌트 토큰 시스템 고도화" id="ORB-135" badgeColor="sale" badgeLabel="Done" priority="urgent" />
      <IssueListItem title="Storybook 테마 커스터마이징" id="ORB-133" badgeColor="sale" badgeLabel="Done" priority="low" />
      <IssueListItem title="모바일 터치 영역 최적화" id="ORB-128" badgeColor="white" badgeLabel="Backlog" priority="medium" />
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Linear 스타일: 사이클 뱃지 애니메이션 데모
   뱃지 상태가 동적으로 전환되는 Linear 스타일 인터랙션
-------------------------------------------------------------------------- */
const CyclingBadgeDemo = () => {
  const statuses: Array<{ color: 'white' | 'club' | 'sale'; label: string }> = [
    { color: 'white', label: 'Backlog' },
    { color: 'club', label: 'In Progress' },
    { color: 'sale', label: 'Done' },
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % statuses.length)
    }, 1800)
    return () => clearInterval(id)
  }, [statuses.length])

  const current = statuses[index]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '32px' }}>
      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em' }}>
        STATUS CYCLES AUTOMATICALLY
      </p>
      <AnimatedBadge color={current.color} size="large">
        <AnimatedBadge.Leading>
          {index === 0 && <TimeLineIcon size={14} />}
          {index === 1 && <ArrowUpIcon size={14} />}
          {index === 2 && <CheckIcon size={14} />}
        </AnimatedBadge.Leading>
        <AnimatedBadge.Label>{current.label}</AnimatedBadge.Label>
      </AnimatedBadge>
      <div style={{ display: 'flex', gap: '6px' }}>
        {statuses.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === index ? '#6366f1' : '#e2e8f0',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export const 사이클_애니메이션: Story = {
  render: () => <CyclingBadgeDemo />,
}

// ─── shadcn/ui: 프로젝트 대시보드 상태 뱃지 ──────────────────────────────────
// shadcn/ui의 Card + Badge 조합 패턴:
// 대시보드에서 프로젝트 상태를 한 눈에 파악할 수 있는 카드 그리드 레이아웃
const projects = [
  { name: 'Orbit UI', status: 'club', label: 'In Progress', progress: 72, team: 3, issues: 5 },
  { name: 'Admin Panel', status: 'sale', label: 'Done', progress: 100, team: 2, issues: 0 },
  { name: 'Design System v2', status: 'white', label: 'Backlog', progress: 15, team: 4, issues: 12 },
  { name: 'Mobile App', status: 'club', label: 'In Progress', progress: 48, team: 5, issues: 3 },
] as const

export const shadcn_프로젝트_대시보드: Story = {
  name: 'shadcn/ui — 프로젝트 대시보드 상태 카드',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '580px' }}>
      {projects.map((proj) => (
        <div
          key={proj.name}
          style={{ padding: '16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#fff', display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{proj.name}</span>
            <AnimatedBadge color={proj.status} size="small">
              <AnimatedBadge.Leading>
                {proj.status === 'club' && <ArrowUpIcon size={10} />}
                {proj.status === 'sale' && <CheckIcon size={10} />}
                {proj.status === 'white' && <TimeLineIcon size={10} />}
              </AnimatedBadge.Leading>
              <AnimatedBadge.Label>{proj.label}</AnimatedBadge.Label>
            </AnimatedBadge>
          </div>

          {/* 진행률 바 */}
          <div>
            <div style={{ height: '4px', borderRadius: '2px', background: '#f1f5f9', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${proj.progress}%`,
                  borderRadius: '2px',
                  background: proj.status === 'sale' ? '#10b981' : proj.status === 'club' ? '#6366f1' : '#cbd5e1',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span>진행률</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{proj.progress}%</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>팀원 <strong style={{ color: '#64748b' }}>{proj.team}</strong></span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>이슈 <strong style={{ color: proj.issues > 0 ? '#f59e0b' : '#10b981' }}>{proj.issues}</strong></span>
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Linear: 우선순위 × 상태 매트릭스 ────────────────────────────────────────
// Linear의 이슈 보드 패턴: 우선순위와 상태를 2축으로 표현하는 매트릭스 뷰
// tabular-nums 패턴으로 숫자 정렬 최적화 (Linear 스타일)
const matrix = [
  { priority: 'Urgent', issues: [
    { id: 'ORB-301', status: 'club' as const, label: 'In Progress', title: '인증 토큰 만료 버그' },
    { id: 'ORB-298', status: 'sale' as const, label: 'Done', title: '결제 오류 핫픽스' },
  ]},
  { priority: 'High', issues: [
    { id: 'ORB-287', status: 'white' as const, label: 'Backlog', title: '다크모드 토큰 정의' },
    { id: 'ORB-283', status: 'club' as const, label: 'In Progress', title: 'TypeScript 5.7 마이그레이션' },
  ]},
  { priority: 'Medium', issues: [
    { id: 'ORB-271', status: 'white' as const, label: 'Backlog', title: 'Storybook 8.6 업데이트' },
    { id: 'ORB-268', status: 'sale' as const, label: 'Done', title: '접근성 WCAG AA 검토' },
  ]},
]

export const Linear_우선순위_매트릭스: Story = {
  name: 'Linear — 우선순위 × 상태 매트릭스 뷰',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', maxWidth: '520px' }}>
      {/* 헤더 */}
      <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>우선순위</div>
        <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>이슈</div>
      </div>
      {matrix.map((row, ri) => (
        <div
          key={row.priority}
          style={{ display: 'grid', gridTemplateColumns: '100px 1fr', borderBottom: ri < matrix.length - 1 ? '1px solid #f1f5f9' : 'none' }}
        >
          <div style={{ padding: '12px', borderRight: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: ri === 0 ? '#ef4444' : ri === 1 ? '#f59e0b' : '#94a3b8' }}>{row.priority}</span>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {row.issues.map((issue) => (
              <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AnimatedBadge color={issue.status} size="small">
                  <AnimatedBadge.Label>{issue.label}</AnimatedBadge.Label>
                </AnimatedBadge>
                <span style={{ fontSize: '12px', color: '#475569', flex: 1 }}>{issue.title}</span>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>{issue.id}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── shadcn/ui + Linear: 활동 피드 실시간 상태 뱃지 ──────────────────────────
// shadcn과 Linear 모두에서 사용하는 실시간 활동 피드 패턴:
// 이벤트 발생 시 뱃지 색상과 레이블이 전환되는 인터랙티브 데모
const activityEvents = [
  { type: 'created', label: 'Backlog', color: 'white' as const, message: '새 이슈가 생성되었습니다' },
  { type: 'started', label: 'In Progress', color: 'club' as const, message: '작업이 시작되었습니다' },
  { type: 'review', label: 'In Review', color: 'club' as const, message: '코드 리뷰가 요청되었습니다' },
  { type: 'done', label: 'Done', color: 'sale' as const, message: '이슈가 완료되었습니다' },
]

const ActivityFeedBadgeDemo = () => {
  const [eventIdx, setEventIdx] = useState(0)
  const [log, setLog] = useState<typeof activityEvents>([activityEvents[0]])

  const trigger = () => {
    const next = (eventIdx + 1) % activityEvents.length
    setEventIdx(next)
    setLog((prev) => [activityEvents[next], ...prev].slice(0, 4))
  }

  return (
    <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '2px' }}>ORB-247 현재 상태</div>
          <AnimatedBadge color={activityEvents[eventIdx].color} size="large">
            {activityEvents[eventIdx].color === 'club' && (
              <AnimatedBadge.Leading><ArrowUpIcon size={14} /></AnimatedBadge.Leading>
            )}
            {activityEvents[eventIdx].color === 'sale' && (
              <AnimatedBadge.Leading><CheckIcon size={14} /></AnimatedBadge.Leading>
            )}
            {activityEvents[eventIdx].color === 'white' && (
              <AnimatedBadge.Leading><TimeLineIcon size={14} /></AnimatedBadge.Leading>
            )}
            <AnimatedBadge.Label>{activityEvents[eventIdx].label}</AnimatedBadge.Label>
          </AnimatedBadge>
        </div>
        <button
          onClick={trigger}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366f1', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
        >
          상태 전환
        </button>
      </div>

      {/* 활동 로그 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>활동 로그</div>
        {log.map((event, i) => (
          <div key={`${event.type}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', background: i === 0 ? '#eff6ff' : '#f8fafc', border: `1px solid ${i === 0 ? '#c7d2fe' : '#f1f5f9'}`, transition: 'all 0.2s' }}>
            <AnimatedBadge color={event.color} size="small">
              <AnimatedBadge.Label>{event.label}</AnimatedBadge.Label>
            </AnimatedBadge>
            <span style={{ fontSize: '12px', color: i === 0 ? '#1e293b' : '#94a3b8' }}>{event.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const shadcn_Linear_활동_피드_뱃지: Story = {
  name: 'shadcn/ui + Linear — 활동 피드 실시간 상태 뱃지',
  render: () => <ActivityFeedBadgeDemo />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 알림 센터 뱃지 그룹 패턴
   Mantine Notification + Badge 조합 — 카테고리별 읽음/안읽음 분리
-------------------------------------------------------------------------- */
type NotifEntry = {
  id: string
  cat: 'info' | 'success' | 'warning'
  title: string
  body: string
  read: boolean
}

const MANTINE_NOTIFS_INIT: NotifEntry[] = [
  { id: 'n1', cat: 'info', title: '새 PR 리뷰 요청', body: 'ORB-312: TextField 접근성 개선', read: false },
  { id: 'n2', cat: 'success', title: '배포 성공', body: 'Storybook v2.14.0 배포 완료', read: false },
  { id: 'n3', cat: 'warning', title: '번들 크기 경고', body: 'axe-core 청크 600kB 초과', read: false },
  { id: 'n4', cat: 'info', title: '코드 리뷰 완료', body: 'ORB-305: Calendar 스토리 승인', read: true },
  { id: 'n5', cat: 'success', title: '테스트 통과', body: '전체 94개 테스트 통과', read: true },
]

const NOTIF_COLOR: Record<NotifEntry['cat'], 'white' | 'club' | 'sale'> = {
  info: 'club',
  success: 'sale',
  warning: 'white',
}

const NOTIF_LABEL: Record<NotifEntry['cat'], string> = {
  info: 'Info',
  success: 'Done',
  warning: 'Alert',
}

function MantineNotifCenterRender() {
  const [notifs, setNotifs] = useState<NotifEntry[]>(MANTINE_NOTIFS_INIT)
  const unread = notifs.filter((n) => !n.read)

  const markRead = (id: string) =>
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))

  const markAll = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))

  return (
    <div style={{ width: 380, border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>알림</span>
          {unread.length > 0 && (
            <AnimatedBadge color="club" size="small">
              <AnimatedBadge.Label>{String(unread.length)}</AnimatedBadge.Label>
            </AnimatedBadge>
          )}
        </div>
        {unread.length > 0 && (
          <button
            onClick={markAll}
            style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: 'none', color: '#6366f1', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
          >
            모두 읽음
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {notifs.map((n) => (
          <div
            key={n.id}
            onClick={() => markRead(n.id)}
            style={{
              display: 'flex', gap: 12, padding: '12px 16px',
              borderBottom: '1px solid #f8fafc',
              background: n.read ? '#fff' : '#f8f8ff',
              cursor: n.read ? 'default' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            <div style={{ paddingTop: 2, flexShrink: 0 }}>
              <AnimatedBadge color={NOTIF_COLOR[n.cat]} size="small">
                <AnimatedBadge.Label>{NOTIF_LABEL[n.cat]}</AnimatedBadge.Label>
              </AnimatedBadge>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: n.read ? 500 : 700, color: n.read ? '#64748b' : '#1e293b', lineHeight: 1.4 }}>
                  {n.title}
                </span>
                {!n.read && (
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', flexShrink: 0, marginTop: 4 }} />
                )}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{n.body}</div>
            </div>
          </div>
        ))}
      </div>
      {unread.length === 0 && (
        <div style={{ padding: '16px', textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>
          모든 알림을 확인했습니다
        </div>
      )}
    </div>
  )
}

export const Mantine_알림_센터_뱃지: Story = {
  name: 'Mantine - 알림 센터 뱃지 그룹 패턴',
  render: () => <MantineNotifCenterRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: CI/CD 파이프라인 상태 뱃지 패턴
   Ant Design Steps + Tag 패턴 — 빌드 파이프라인 단계별 상태 시각화
-------------------------------------------------------------------------- */
type PipelineStatus = 'pending' | 'running' | 'success' | 'failed'

type PipelineStep = {
  id: string
  name: string
  status: PipelineStatus
  duration: string
}

const STATUS_TO_BADGE: Record<PipelineStatus, { color: 'white' | 'club' | 'sale'; label: string }> = {
  pending: { color: 'white', label: 'Pending' },
  running: { color: 'club', label: 'Running' },
  success: { color: 'sale', label: 'Pass' },
  failed: { color: 'white', label: 'Failed' },
}

const PIPELINE_STEPS_INIT: PipelineStep[] = [
  { id: 's1', name: 'Install', status: 'success', duration: '12s' },
  { id: 's2', name: 'Typecheck', status: 'success', duration: '8s' },
  { id: 's3', name: 'Lint', status: 'success', duration: '5s' },
  { id: 's4', name: 'Test', status: 'running', duration: '...' },
  { id: 's5', name: 'Build', status: 'pending', duration: '-' },
  { id: 's6', name: 'Deploy', status: 'pending', duration: '-' },
]

function AntCIPipelineRender() {
  const [steps, setSteps] = useState<PipelineStep[]>(PIPELINE_STEPS_INIT)

  const advancePipeline = () => {
    setSteps((prev) => {
      const runIdx = prev.findIndex((s) => s.status === 'running')
      if (runIdx === -1) return prev
      const next = [...prev]
      const durations = ['22s', '17s', '45s', '8s', '31s', '12s']
      next[runIdx] = { ...next[runIdx], status: 'success', duration: durations[runIdx] ?? '5s' }
      if (runIdx + 1 < next.length) {
        next[runIdx + 1] = { ...next[runIdx + 1], status: 'running' }
      }
      return next
    })
  }

  const reset = () => setSteps(PIPELINE_STEPS_INIT)

  const allDone = steps.every((s) => s.status === 'success')
  const hasFailed = steps.some((s) => s.status === 'failed')

  return (
    <div style={{ width: 400, border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>ORB CI Pipeline</div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>main branch · commit 26ed273</div>
        </div>
        <AnimatedBadge color={allDone ? 'sale' : 'club'} size="small">
          <AnimatedBadge.Label>{allDone ? 'Passed' : 'Running'}</AnimatedBadge.Label>
        </AnimatedBadge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((step, i) => (
          <div
            key={step.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px',
              borderBottom: i < steps.length - 1 ? '1px solid #f8fafc' : 'none',
              background: step.status === 'running' ? '#eff6ff' : '#fff',
            }}
          >
            <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', width: 16, textAlign: 'right', flexShrink: 0 }}>
              {i + 1}
            </span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: step.status === 'running' ? 700 : 500, color: step.status === 'pending' ? '#94a3b8' : '#1e293b' }}>
              {step.name}
            </span>
            <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', width: 32, textAlign: 'right' }}>
              {step.duration}
            </span>
            <AnimatedBadge color={STATUS_TO_BADGE[step.status].color} size="small">
              <AnimatedBadge.Label>{STATUS_TO_BADGE[step.status].label}</AnimatedBadge.Label>
            </AnimatedBadge>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8 }}>
        {!allDone && !hasFailed && (
          <button
            onClick={advancePipeline}
            style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
          >
            다음 단계 진행
          </button>
        )}
        <button
          onClick={reset}
          style={{ flex: allDone ? 1 : 0, padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
        >
          초기화
        </button>
      </div>
    </div>
  )
}

export const Ant_CI_배포_파이프라인: Story = {
  name: 'Ant Design - CI/CD 배포 파이프라인 상태 뱃지 패턴',
  render: () => <AntCIPipelineRender />,
}

/* --------------------------------------------------------------------------
   Vercel 벤치마크: 배포 상태 대시보드 패턴
   Vercel Dashboard 스타일 — 다크 배경 + 배포 이력 뱃지 피드
-------------------------------------------------------------------------- */
type DeployRow = {
  id: string
  branch: string
  commit: string
  status: 'success' | 'running' | 'pending'
  ago: string
}

const DEPLOY_ROWS: DeployRow[] = [
  { id: 'd1', branch: 'main', commit: '26ed273 feat(cycle-58): MUI + Chakra UI', status: 'success', ago: '2분 전' },
  { id: 'd2', branch: 'reconstruct-history', commit: '9e700f4 fix: 스토리북 Switch 참조', status: 'success', ago: '1시간 전' },
  { id: 'd3', branch: 'feat/calendar', commit: 'd5fd051 feat: 3단계 토큰 시스템', status: 'running', ago: '방금' },
  { id: 'd4', branch: 'main', commit: '125b89f fix: 렌더링 오류 수정', status: 'pending', ago: '3시간 전' },
]

const DEPLOY_BADGE: Record<DeployRow['status'], { color: 'white' | 'club' | 'sale'; label: string }> = {
  success: { color: 'sale', label: 'Ready' },
  running: { color: 'club', label: 'Building' },
  pending: { color: 'white', label: 'Queued' },
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 이슈 사이클 상태 배지 패턴
   Linear의 Cycles 섹션 — 사이클(스프린트) 전환 시 상태 배지 변화 시뮬레이션
-------------------------------------------------------------------------- */
type LinearCycleBadge94 = { id: string; title: string; status: 'active' | 'upcoming' | 'completed'; period: string; issueCount: number }

const LINEAR_CYCLE_DATA94: LinearCycleBadge94[] = [
  { id: 'c14', title: 'Cycle 14', status: 'active',    period: '04/07 - 04/20', issueCount: 8  },
  { id: 'c15', title: 'Cycle 15', status: 'upcoming',  period: '04/21 - 05/04', issueCount: 6  },
  { id: 'c16', title: 'Cycle 16', status: 'upcoming',  period: '05/05 - 05/18', issueCount: 4  },
  { id: 'c13', title: 'Cycle 13', status: 'completed', period: '03/24 - 04/06', issueCount: 11 },
  { id: 'c12', title: 'Cycle 12', status: 'completed', period: '03/10 - 03/23', issueCount: 9  },
]

const CYCLE_BADGE94: Record<LinearCycleBadge94['status'], { color: 'white' | 'club' | 'sale'; label: string }> = {
  active:    { color: 'club',  label: 'Active'    },
  upcoming:  { color: 'white', label: 'Upcoming'  },
  completed: { color: 'sale',  label: 'Done'      },
}

export const Linear_사이클_상태_배지: Story = {
  name: 'Linear - Cycles 스프린트 상태 배지 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear Cycles 패턴. 활성(club)/예정(white)/완료(sale) 세 가지 색상으로 사이클 상태를 표현합니다. ' +
          '각 행에 기간, 이슈 수, 상태 배지를 함께 배치하는 이슈 트래커 뷰 패턴입니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 380, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', fontFamily: 'system-ui, sans-serif', background: '#fff' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
        Cycles
      </div>
      {LINEAR_CYCLE_DATA94.map((c, i) => {
        const badge = CYCLE_BADGE94[c.status]
        return (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: i < LINEAR_CYCLE_DATA94.length - 1 ? '1px solid #f8fafc' : 'none', cursor: 'pointer' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: c.status === 'active' ? 700 : 500, color: c.status === 'completed' ? '#94a3b8' : '#0f172a' }}>{c.title}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{c.period} · {c.issueCount}개 이슈</div>
            </div>
            <AnimatedBadge color={badge.color} size="small">
              <AnimatedBadge.Label>{badge.label}</AnimatedBadge.Label>
            </AnimatedBadge>
          </div>
        )
      })}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 프로젝트 헬스 배지 패턴
   Linear의 Projects — 프로젝트 건강도를 실시간 상태 배지로 표시
-------------------------------------------------------------------------- */
type ProjectHealth94 = 'on-track' | 'at-risk' | 'off-track'

const LINEAR_PROJECTS94: Array<{ id: string; name: string; health: ProjectHealth94; progress: number; team: string }> = [
  { id: 'p1', name: 'Orbit UI Design System v2', health: 'on-track',   progress: 68, team: 'Engineering' },
  { id: 'p2', name: 'Figma 컴포넌트 동기화',     health: 'at-risk',   progress: 40, team: 'Design'      },
  { id: 'p3', name: '접근성 감사 대응',           health: 'off-track', progress: 15, team: 'Engineering' },
  { id: 'p4', name: 'Storybook 배포 자동화',      health: 'on-track',  progress: 92, team: 'Infra'       },
]

const HEALTH_BADGE94: Record<ProjectHealth94, { color: 'white' | 'club' | 'sale'; label: string; barColor: string }> = {
  'on-track':  { color: 'sale',  label: 'On Track',  barColor: '#10b981' },
  'at-risk':   { color: 'club',  label: 'At Risk',   barColor: '#f59e0b' },
  'off-track': { color: 'white', label: 'Off Track', barColor: '#ef4444' },
}

export const Linear_프로젝트_헬스_배지: Story = {
  name: 'Linear - 프로젝트 건강도 상태 배지 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear Projects 패턴. On Track(sale)/At Risk(club)/Off Track(white)로 프로젝트 건강도를 표현하고 ' +
          '진행률 바와 함께 실시간 상태를 직관적으로 전달합니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Projects</div>
      {LINEAR_PROJECTS94.map((p) => {
        const h = HEALTH_BADGE94[p.health]
        return (
          <div key={p.id} style={{ padding: '14px 16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{p.team}</div>
              </div>
              <AnimatedBadge color={h.color} size="small">
                <AnimatedBadge.Label>{h.label}</AnimatedBadge.Label>
              </AnimatedBadge>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: '#64748b' }}>진행률</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: h.barColor }}>{p.progress}%</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: '#f1f5f9', overflow: 'hidden' }}>
                <div style={{ width: `${p.progress}%`, height: '100%', borderRadius: 2, background: h.barColor, transition: 'width 0.3s' }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 실시간 이슈 활동 피드 배지
   Linear의 Activity — 이슈 상태 변경을 실시간 배지 피드로 표현
-------------------------------------------------------------------------- */
type ActivityEvent94 = { id: number; user: string; action: string; issue: string; status: 'white' | 'club' | 'sale'; statusLabel: string; ago: string }

function LinearActivityFeedRender94() {
  const [events, setEvents] = useState<ActivityEvent94[]>([
    { id: 1, user: '김희준', action: '완료로 변경',       issue: 'ORB-201 스켈레톤 스토리 추가', status: 'sale',  statusLabel: 'Done',        ago: '방금'   },
    { id: 2, user: '이서연', action: '진행 중으로 변경',   issue: 'ORB-202 TextField 접근성',    status: 'club',  statusLabel: 'In Progress', ago: '3분 전' },
    { id: 3, user: '박지호', action: '새 이슈 생성',       issue: 'ORB-205 Motion 토큰 정의',    status: 'white', statusLabel: 'Todo',        ago: '7분 전' },
    { id: 4, user: '최은아', action: '완료로 변경',         issue: 'ORB-198 Calendar 문서화',     status: 'sale',  statusLabel: 'Done',        ago: '12분 전'},
  ])

  const addEvent = () => {
    const newId = Math.max(...events.map((e) => e.id)) + 1
    const statusCycle: Array<'club' | 'sale' | 'white'> = ['club', 'sale', 'white']
    const st = statusCycle[newId % 3]
    const labels: Record<'club' | 'sale' | 'white', string> = { club: 'In Progress', sale: 'Done', white: 'Todo' }
    const actions = ['진행 중으로 변경', '완료로 변경', '새 이슈 생성']
    const users = ['김희준', '이서연', '박지호']
    const newEvent: ActivityEvent94 = {
      id: newId,
      user: users[newId % 3],
      action: actions[newId % 3],
      issue: `ORB-${200 + newId} 새 작업 항목`,
      status: st,
      statusLabel: labels[st],
      ago: '방금',
    }
    setEvents((prev) => [newEvent, ...prev].slice(0, 6))
  }

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Activity</div>
        <button
          onClick={addEvent}
          style={{ padding: '4px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 11, fontWeight: 600, color: '#6366f1', cursor: 'pointer' }}
        >
          + 이벤트 추가
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {events.map((ev) => (
          <div key={ev.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fafafa' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {ev.user[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{ev.user}</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>{ev.action}</span>
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>{ev.issue}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
              <AnimatedBadge color={ev.status} size="small">
                <AnimatedBadge.Label>{ev.statusLabel}</AnimatedBadge.Label>
              </AnimatedBadge>
              <span style={{ fontSize: 10, color: '#94a3b8' }}>{ev.ago}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_활동_피드_배지: Story = {
  name: 'Linear - 이슈 활동 피드 실시간 배지 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear Activity 패턴. 이슈 상태 변경 이벤트를 시간순 피드로 보여주고 AnimatedBadge로 상태를 강조합니다. ' +
          '"이벤트 추가" 버튼으로 새 활동을 시뮬레이션합니다.',
      },
    },
  },
  render: () => <LinearActivityFeedRender94 />,
}

export const Vercel_배포_상태_대시보드: Story = {
  name: 'Vercel - 배포 상태 대시보드 다크 패턴',
  render: () => (
    <div style={{ width: 420, border: '1px solid #27272a', borderRadius: 14, overflow: 'hidden', background: '#09090b' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#fafafa' }}>Deployments</span>
        <AnimatedBadge color="sale" size="small">
          <AnimatedBadge.Label>Live</AnimatedBadge.Label>
        </AnimatedBadge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {DEPLOY_ROWS.map((row, i) => (
          <div
            key={row.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px',
              borderBottom: i < DEPLOY_ROWS.length - 1 ? '1px solid #18181b' : 'none',
              background: row.status === 'running' ? '#1c1917' : 'transparent',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#e4e4e7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {row.commit.slice(0, 36)}
              </div>
              <div style={{ fontSize: 10, color: '#52525b', marginTop: 2 }}>
                {row.branch} · {row.ago}
              </div>
            </div>
            <AnimatedBadge color={DEPLOY_BADGE[row.status].color} size="small">
              <AnimatedBadge.Label>{DEPLOY_BADGE[row.status].label}</AnimatedBadge.Label>
            </AnimatedBadge>
          </div>
        ))}
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Cycle 123 — shadcn/ui + Linear Design 벤치마크
-------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   shadcn/ui: 알림 카운터 배지 패턴
   shadcn/ui Badge + 카운트 애니메이션 — 알림 센터 실시간 업데이트
-------------------------------------------------------------------------- */
export const Shadcn_알림_카운터_배지: Story = {
  name: 'shadcn/ui - 알림 카운터 배지 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Badge 컴포넌트의 알림 카운터 패턴. 버튼 클릭으로 카운트를 증가/리셋하며 ' +
          'AnimatedBadge 의 등장 애니메이션으로 신규 알림을 강조합니다.',
      },
    },
  },
  render: function Render() {
    const [counts, setCounts] = useState({ messages: 3, mentions: 1, updates: 7 })

    const add = (key: keyof typeof counts) =>
      setCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }))

    const CHANNELS = [
      { key: 'messages' as const, label: '메시지', icon: '💬', color: 'club' as const },
      { key: 'mentions' as const, label: '멘션', icon: '@', color: 'sale' as const },
      { key: 'updates' as const, label: '업데이트', icon: '🔔', color: 'white' as const },
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>알림 채널</div>
        {CHANNELS.map((ch) => (
          <div key={ch.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fff' }}>
            <span style={{ fontSize: 18 }}>{ch.icon}</span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{ch.label}</span>
            {counts[ch.key] > 0 ? (
              <AnimatedBadge color={ch.color} size="small">
                <AnimatedBadge.Label>{counts[ch.key]}</AnimatedBadge.Label>
              </AnimatedBadge>
            ) : (
              <span style={{ fontSize: 11, color: '#cbd5e1' }}>—</span>
            )}
            <button
              onClick={() => add(ch.key)}
              style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 11, cursor: 'pointer', color: '#64748b' }}
            >
              +1
            </button>
          </div>
        ))}
        <button
          onClick={() => setCounts({ messages: 0, mentions: 0, updates: 0 })}
          style={{ padding: '8px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, color: '#94a3b8', cursor: 'pointer' }}
        >
          모두 읽음 처리
        </button>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Linear: 이슈 워크플로 상태 배지
   Linear 이슈 상태 라이프사이클 — Todo→In Progress→Done 전환 배지
-------------------------------------------------------------------------- */
export const Linear_이슈_워크플로_배지: Story = {
  name: 'Linear - 이슈 워크플로 상태 배지 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 이슈 상태 전환 라이프사이클 패턴. Todo → In Progress → In Review → Done 순서로 ' +
          '상태를 전환하며 AnimatedBadge 로 현재 상태를 표시합니다.',
      },
    },
  },
  render: function Render() {
    type WorkflowStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
    const STATUSES: WorkflowStatus[] = ['backlog', 'todo', 'in_progress', 'in_review', 'done', 'cancelled']
    const STATUS_META: Record<WorkflowStatus, { label: string; color: 'white' | 'club' | 'sale'; icon: string }> = {
      backlog: { label: 'Backlog', color: 'white', icon: '○' },
      todo: { label: 'Todo', color: 'white', icon: '◻' },
      in_progress: { label: 'In Progress', color: 'club', icon: '◑' },
      in_review: { label: 'In Review', color: 'club', icon: '⊙' },
      done: { label: 'Done', color: 'sale', icon: '✓' },
      cancelled: { label: 'Cancelled', color: 'white', icon: '✕' },
    }

    const [issues, setIssues] = useState<{ id: string; title: string; status: WorkflowStatus }[]>([
      { id: 'LIN-001', title: '검색 자동완성 개선', status: 'in_progress' },
      { id: 'LIN-002', title: '모바일 터치 이벤트', status: 'todo' },
      { id: 'LIN-003', title: 'SSR 하이드레이션 오류', status: 'in_review' },
      { id: 'LIN-004', title: '디자인 토큰 문서화', status: 'done' },
      { id: 'LIN-005', title: '접근성 audit 반영', status: 'backlog' },
    ])

    const advance = (id: string) => {
      setIssues((prev) => prev.map((issue) => {
        if (issue.id !== id) return issue
        const idx = STATUSES.indexOf(issue.status)
        return { ...issue, status: STATUSES[Math.min(idx + 1, STATUSES.length - 1)] }
      }))
    }

    return (
      <div style={{ width: 400 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>이슈 워크플로</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {issues.map((issue) => {
            const meta = STATUS_META[issue.status]
            return (
              <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fff' }}>
                <span style={{ fontSize: 14, color: '#64748b', width: 20, textAlign: 'center' }}>{meta.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{issue.id}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{issue.title}</div>
                </div>
                <AnimatedBadge color={meta.color} size="small">
                  <AnimatedBadge.Label>{meta.label}</AnimatedBadge.Label>
                </AnimatedBadge>
                {issue.status !== 'done' && issue.status !== 'cancelled' && (
                  <button
                    onClick={() => advance(issue.id)}
                    style={{ padding: '3px 8px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 11, cursor: 'pointer', color: '#64748b' }}
                  >
                    →
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   shadcn + Linear: 실시간 활동 피드 배지
   두 시스템의 실시간 업데이트 + 상태 배지 패턴 결합
-------------------------------------------------------------------------- */
export const Shadcn_Linear_실시간_활동_배지: Story = {
  name: 'shadcn/ui + Linear - 실시간 활동 피드 배지 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui + Linear 실시간 활동 피드 패턴. useEffect로 1초마다 새 활동을 생성하고 ' +
          'AnimatedBadge 로 활동 유형을 표시합니다. "Live" 배지로 실시간 상태를 표현합니다.',
      },
    },
  },
  render: function Render() {
    type ActivityType = 'commit' | 'deploy' | 'review' | 'issue' | 'merge'
    const ACTIVITY_META: Record<ActivityType, { label: string; color: 'white' | 'club' | 'sale'; icon: string }> = {
      commit: { label: 'Commit', color: 'white', icon: '◆' },
      deploy: { label: 'Deploy', color: 'club', icon: '🚀' },
      review: { label: 'Review', color: 'white', icon: '👁' },
      issue: { label: 'Issue', color: 'sale', icon: '!' },
      merge: { label: 'Merged', color: 'sale', icon: '↗' },
    }

    type FeedTemplate = { type: ActivityType; msg: string; author: string }
    const INITIAL_FEED: (FeedTemplate & { id: number; ago: string })[] = [
      { type: 'commit', msg: 'fix: Toggle onChange 타입 오류 수정', author: '김민준', id: 0, ago: '6분 전' },
      { type: 'deploy', msg: 'orbit-ui v2.1.0 → production', author: 'CI/CD', id: 1, ago: '4분 전' },
      { type: 'review', msg: 'PR #142 코드리뷰 요청', author: '이서연', id: 2, ago: '2분 전' },
    ]

    const [feed, setFeed] = useState(INITIAL_FEED)
    const [live, setLive] = useState(true)

    useEffect(() => {
      if (!live) return
      const pool: FeedTemplate[] = [
        { type: 'commit', msg: 'refactor: Calendar 범위 선택 개선', author: '박준혁' },
        { type: 'issue', msg: 'BUG: AnimatedBadge 색상 불일치', author: '최유진' },
        { type: 'merge', msg: 'feat: Calendar 다중선택 지원', author: '김민준' },
        { type: 'deploy', msg: 'orbit-ui v2.1.1 → preview', author: 'CI/CD' },
        { type: 'review', msg: 'PR #143 코드리뷰 완료', author: '이서연' },
      ]
      const timer = setInterval(() => {
        const tpl = pool[Math.floor(Math.random() * pool.length)]
        setFeed((prev) => [{ ...tpl, id: Date.now(), ago: '방금' }, ...prev.slice(0, 4)])
      }, 3000)
      return () => clearInterval(timer)
    }, [live])

    return (
      <div style={{ width: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>활동 피드</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {live && (
              <AnimatedBadge color="sale" size="small">
                <AnimatedBadge.Label>Live</AnimatedBadge.Label>
              </AnimatedBadge>
            )}
            <button
              onClick={() => setLive((v) => !v)}
              style={{ padding: '3px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 11, cursor: 'pointer', color: '#64748b' }}
            >
              {live ? '일시정지' : '재개'}
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {feed.map((item) => {
            const meta = ACTIVITY_META[item.type]
            return (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fff' }}>
                <span style={{ fontSize: 14, width: 22, textAlign: 'center' }}>{meta.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.msg}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{item.author} · {item.ago}</div>
                </div>
                <AnimatedBadge color={meta.color} size="small">
                  <AnimatedBadge.Label>{meta.label}</AnimatedBadge.Label>
                </AnimatedBadge>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
}
