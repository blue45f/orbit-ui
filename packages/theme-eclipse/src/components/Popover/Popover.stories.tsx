import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '../Avatar'
import { CounterBadge } from '../CounterBadge'
import { LabelBadge } from '../LabelBadge'
import { GhostButton } from '../GhostButton'
import { OutlineButton } from '../OutlineButton'
import { FilledButton as Button } from '../SolidButton'
import { Typography } from '../Text'

import { Popover } from './Popover'

const meta = {
  title: 'eclipse/Feedback/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
      <Popover>
        <Popover.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>정보 확인</Button.Center>
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Typography textStyle="subheadingSmall">서비스 정책 안내</Typography>
              <Typography textStyle="descriptionLarge" className="text-slate-500">
                본 서비스의 이용 정책은 매달 업데이트되며, 자세한 내용은 공지사항을 확인해 주세요.
              </Typography>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
}

// User profile card popover — Vercel/GitHub hover profile pattern
export const 사용자_프로필_카드: Story = {
  render: () => (
    <div style={{ padding: '120px 60px', display: 'flex', justifyContent: 'center', gap: 32 }}>
      {/* Trigger: avatar */}
      <Popover>
        <Popover.Trigger asChild>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', borderRadius: '50%' }}>
            <Avatar>
              <Avatar.Fallback>HJ</Avatar.Fallback>
            </Avatar>
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 300 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Header: avatar + name + role */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <Avatar style={{ width: 48, height: 48 }}>
                <Avatar.Fallback>HJ</Avatar.Fallback>
              </Avatar>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>Heejun Kim</div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>@heejun</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <LabelBadge color="benefit">
                    <LabelBadge.Label>Admin</LabelBadge.Label>
                  </LabelBadge>
                  <LabelBadge color="gray">
                    <LabelBadge.Label>Seoul</LabelBadge.Label>
                  </LabelBadge>
                </div>
              </div>
            </div>

            {/* Bio */}
            <Typography textStyle="descriptionLarge" style={{ color: '#475569', fontSize: 12 }}>
              Building Orbit UI design system. Passionate about component architecture and developer experience.
            </Typography>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 16, paddingTop: 4, borderTop: '1px solid #f1f5f9' }}>
              {[
                { label: 'Following', count: 42 },
                { label: 'Followers', count: 128 },
                { label: 'Projects', count: 7 },
              ].map((stat) => (
                <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{stat.count}</span>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <Button color="primary" size="small" style={{ flex: 1 }}>
                <Button.Center>Follow</Button.Center>
              </Button>
              <OutlineButton color="black" size="small">Message</OutlineButton>
            </div>
          </div>
        </Popover.Content>
      </Popover>

      {/* Trigger: text link */}
      <Popover>
        <Popover.Trigger asChild>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 13, color: '#6366f1', textDecoration: 'underline', textUnderlineOffset: 3 }}>
            @orbit-ui
          </a>
        </Popover.Trigger>
        <Popover.Content style={{ width: 260 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Orbit UI</div>
            <Typography textStyle="descriptionLarge" style={{ color: '#475569', fontSize: 12 }}>
              Open-source React design system. 3-tier token architecture: Reference → Semantic → Component.
            </Typography>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <CounterBadge>{24}</CounterBadge>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>open issues</span>
            </div>
          </div>
        </Popover.Content>
      </Popover>

      {/* Trigger: icon button */}
      <Popover>
        <Popover.Trigger asChild>
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            ...
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 200 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {['Edit profile', 'Copy link', 'Share', 'Report'].map((action, i) => (
              <GhostButton
                key={action}
                color="black"
                size="small"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  color: i === 3 ? '#ef4444' : '#0f172a',
                }}
              >
                {action}
              </GhostButton>
            ))}
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
}

// Notification detail popover (Vercel deployment notification style)
export const 알림_상세_팝오버: Story = {
  render: () => (
    <div style={{ padding: '100px 80px', display: 'flex', justifyContent: 'center' }}>
      <Popover>
        <Popover.Trigger asChild>
          <button
            style={{
              position: 'relative',
              background: 'none',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: 13,
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Notifications
            <CounterBadge>{3}</CounterBadge>
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 320 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', padding: '0 0 10px', borderBottom: '1px solid #f1f5f9', marginBottom: 4 }}>
              Recent Notifications
            </div>
            {[
              { title: 'Deployment succeeded', sub: 'orbit-ui — main branch', time: '2m ago', status: 'Ready', statusColor: 'benefit' as const },
              { title: 'Build failed', sub: 'orbit-ui — feat/kanban', time: '15m ago', status: 'Error', statusColor: 'sale' as const },
              { title: 'New comment on PR #42', sub: 'Review requested by heejun', time: '1h ago', status: 'Queued', statusColor: 'gray' as const },
            ].map((n, i) => (
              <div key={i} style={{
                padding: '10px 0',
                borderBottom: i < 2 ? '1px solid #f8fafc' : 'none',
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{n.sub}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <LabelBadge color={n.statusColor}>
                      <LabelBadge.Label>{n.status}</LabelBadge.Label>
                    </LabelBadge>
                    <span style={{ fontSize: 11, color: '#cbd5e1' }}>{n.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <GhostButton color="black" size="small" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              View all notifications
            </GhostButton>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
}
