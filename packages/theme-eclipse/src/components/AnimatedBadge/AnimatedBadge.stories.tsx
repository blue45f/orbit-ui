import { StarFillIcon, CheckIcon, TimeLineIcon, AlertLineIcon, ArrowUpIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'

import { AnimatedBadge } from './AnimatedBadge'

AnimatedBadge.displayName = 'AnimatedBadge'

const meta = {
  title: 'eclipse/Data Display/AnimatedBadge',
  component: AnimatedBadge,
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
