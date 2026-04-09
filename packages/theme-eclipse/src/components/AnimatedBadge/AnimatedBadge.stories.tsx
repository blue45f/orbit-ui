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
