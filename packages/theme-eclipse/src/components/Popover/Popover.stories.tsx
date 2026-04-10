import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

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

// Color picker popover — Mantine ColorPicker pattern
export const 컬러_피커_팝오버: Story = {
  render: function Render() {
    const [selectedColor, setSelectedColor] = useState('#6366f1')
    const palette = [
      '#ef4444', '#f97316', '#f59e0b', '#10b981',
      '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
      '#ec4899', '#64748b', '#0f172a', '#ffffff',
    ]
    return (
      <div style={{ padding: '100px 80px', display: 'flex', justifyContent: 'center', gap: 24, alignItems: 'center' }}>
        <Popover>
          <Popover.Trigger asChild>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 14px', borderRadius: 10,
                border: '1.5px solid #e2e8f0', background: '#fff',
                cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151',
              }}
            >
              <div style={{ width: 20, height: 20, borderRadius: 5, background: selectedColor, border: '1.5px solid rgba(0,0,0,0.1)' }} />
              색상 선택
            </button>
          </Popover.Trigger>
          <Popover.Content style={{ width: 220 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Typography textStyle="subheadingSmall" style={{ color: '#0f172a' }}>색상 팔레트</Typography>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {palette.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: '100%', aspectRatio: '1', borderRadius: 8,
                      background: color, border: selectedColor === color ? '3px solid #6366f1' : '2px solid rgba(0,0,0,0.08)',
                      cursor: 'pointer', transition: 'transform 0.1s',
                    }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 0', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: selectedColor, border: '1.5px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
                <code style={{ fontSize: 12, color: '#6366f1', fontFamily: 'monospace', flex: 1 }}>{selectedColor}</code>
              </div>
            </div>
          </Popover.Content>
        </Popover>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>선택됨:</div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedColor, border: '2px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
      </div>
    )
  },
}

// Advanced filter panel — Tailwind UI filter pattern
export const 고급_필터_패널: Story = {
  render: function Render() {
    const [status, setStatus] = useState<string[]>(['active'])
    const [sortBy, setSortBy] = useState('newest')
    const [activeCount, setActiveCount] = useState(0)

    const statusOptions = [
      { value: 'active', label: '활성', color: '#10b981' },
      { value: 'pending', label: '대기 중', color: '#f59e0b' },
      { value: 'inactive', label: '비활성', color: '#94a3b8' },
      { value: 'archived', label: '보관됨', color: '#ef4444' },
    ]
    const sortOptions = [
      { value: 'newest', label: '최신순' },
      { value: 'oldest', label: '오래된순' },
      { value: 'name', label: '이름순' },
      { value: 'activity', label: '활동순' },
    ]

    const toggleStatus = (val: string) => {
      setStatus((prev) => prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val])
    }

    const totalFilters = status.length + (sortBy !== 'newest' ? 1 : 0)

    return (
      <div style={{ padding: '100px 80px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Popover>
            <Popover.Trigger asChild>
              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px', borderRadius: 10,
                  border: `1.5px solid ${totalFilters > 0 ? '#6366f1' : '#e2e8f0'}`,
                  background: totalFilters > 0 ? 'rgba(99,102,241,0.04)' : '#fff',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  color: totalFilters > 0 ? '#6366f1' : '#374151',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                필터
                {totalFilters > 0 && (
                  <span style={{ background: '#6366f1', color: '#fff', fontSize: 10, fontWeight: 800, padding: '1px 6px', borderRadius: 99 }}>
                    {totalFilters}
                  </span>
                )}
              </button>
            </Popover.Trigger>
            <Popover.Content style={{ width: 280 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography textStyle="subheadingSmall" style={{ color: '#0f172a' }}>필터 설정</Typography>
                  {totalFilters > 0 && (
                    <button
                      onClick={() => { setStatus([]); setSortBy('newest') }}
                      style={{ fontSize: 11, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                    >
                      초기화
                    </button>
                  )}
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>상태</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => toggleStatus(opt.value)}
                        style={{
                          padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                          border: `1.5px solid ${status.includes(opt.value) ? opt.color : '#e2e8f0'}`,
                          background: status.includes(opt.value) ? `${opt.color}18` : '#fff',
                          color: status.includes(opt.value) ? opt.color : '#64748b',
                          transition: 'all 0.1s',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>정렬</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '8px 10px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                          border: 'none', textAlign: 'left',
                          background: sortBy === opt.value ? 'rgba(99,102,241,0.06)' : 'transparent',
                          color: sortBy === opt.value ? '#6366f1' : '#374151', fontWeight: sortBy === opt.value ? 600 : 400,
                        }}
                      >
                        <div style={{
                          width: 14, height: 14, borderRadius: '50%', border: `2px solid ${sortBy === opt.value ? '#6366f1' : '#d1d5db'}`,
                          background: sortBy === opt.value ? '#6366f1' : 'transparent', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {sortBy === opt.value && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />}
                        </div>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button color="primary" size="small" onClick={() => setActiveCount(totalFilters)}>
                  <Button.Center>필터 적용</Button.Center>
                </Button>
              </div>
            </Popover.Content>
          </Popover>
          {activeCount > 0 && (
            <Typography textStyle="descriptionLarge" style={{ color: '#94a3b8' }}>
              {activeCount}개 필터 적용됨
            </Typography>
          )}
        </div>
      </div>
    )
  },
}

// Quick action popover — Mantine floating action style
export const 빠른_액션_팝오버: Story = {
  render: function Render() {
    const actions = [
      { label: '댓글 달기', icon: 'M 3 3 h 18 v 14 H 3 z M 7 11 h 10 M 7 7 h 10', color: '#6366f1' },
      { label: '공유하기', icon: 'M 4 12 v 8 h 16 v -8 M 12 15 V 3 M 8 7 l 4 -4 4 4', color: '#10b981' },
      { label: '북마크', icon: 'M 19 21 l -7 -5 -7 5 V 5 a 2 2 0 0 1 2 -2 h 10 a 2 2 0 0 1 2 2 z', color: '#f59e0b' },
      { label: '링크 복사', icon: 'M 10 13 a 5 5 0 0 0 7.54.54 l 3 -3 a 5 5 0 0 0 -7.07 -7.07 l -1.72 1.71 M 14 11 a 5 5 0 0 0 -7.54 -.54 l -3 3 a 5 5 0 0 0 7.07 7.07 l 1.71 -1.71', color: '#3b82f6' },
      { label: '신고하기', icon: 'M 10.29 3.86 L 1.82 18 a 2 2 0 0 0 1.71 3 h 16.94 a 2 2 0 0 0 1.71 -3 L 13.71 3.86 a 2 2 0 0 0 -3.42 0 z M 12 9 v 4 M 12 17 h .01', color: '#ef4444' },
    ]
    return (
      <div style={{ padding: '100px 80px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', padding: '24px 28px', borderRadius: 14, border: '1.5px solid #e2e8f0', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <Typography textStyle="descriptionLarge" style={{ color: '#374151', lineHeight: 1.6 }}>
            Orbit UI는 Figma 기반의 React 디자인 시스템입니다. 3단계 토큰 아키텍처로 일관된 UI를 빠르게 구축할 수 있습니다.
          </Typography>
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <Popover>
              <Popover.Trigger asChild>
                <button
                  style={{
                    width: 28, height: 28, borderRadius: 8, border: '1.5px solid #e2e8f0',
                    background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94a3b8', fontSize: 16, fontWeight: 700, lineHeight: 1,
                  }}
                >
                  ...
                </button>
              </Popover.Trigger>
              <Popover.Content side="left" style={{ width: 180, padding: '6px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {actions.map((action) => (
                    <button
                      key={action.label}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '8px 10px', borderRadius: 8, border: 'none',
                        background: 'transparent', cursor: 'pointer', textAlign: 'left',
                        fontSize: 13, color: action.label === '신고하기' ? '#ef4444' : '#374151', fontWeight: 500,
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={action.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={action.icon} />
                      </svg>
                      {action.label}
                    </button>
                  ))}
                </div>
              </Popover.Content>
            </Popover>
          </div>
        </div>
      </div>
    )
  },
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

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 공유 옵션 팝오버
   Tailwind UI Share/Export popover 패턴 — 링크 복사 + 권한 설정
-------------------------------------------------------------------------- */
export const Tailwind_공유_팝오버: Story = {
  render: function Render() {
    const [copied, setCopied] = useState(false)
    const [access, setAccess] = useState<'private' | 'team' | 'public'>('team')

    const shareUrl = 'https://orbit-ui.vercel.app/story/eclipse-actions'

    const handleCopy = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const accessOptions: { value: 'private' | 'team' | 'public'; label: string; desc: string }[] = [
      { value: 'private', label: '비공개', desc: '나만 볼 수 있음' },
      { value: 'team', label: '팀 공유', desc: '팀원만 볼 수 있음' },
      { value: 'public', label: '전체 공개', desc: '링크 있는 누구나' },
    ]

    return (
      <div style={{ padding: '100px 80px', display: 'flex', justifyContent: 'center' }}>
        <Popover>
          <Popover.Trigger asChild>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 10,
              border: '1.5px solid #e2e8f0', background: '#fff',
              cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              공유
            </button>
          </Popover.Trigger>
          <Popover.Content style={{ width: 300 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Typography textStyle="subheadingSmall" style={{ color: '#0f172a' }}>공유 설정</Typography>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
                  접근 권한
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {accessOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAccess(opt.value)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '8px 10px', borderRadius: 8, border: 'none',
                        background: access === opt.value ? 'rgba(99,102,241,0.07)' : 'transparent',
                        cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <div style={{
                        width: 14, height: 14, borderRadius: '50%',
                        border: `2px solid ${access === opt.value ? '#6366f1' : '#d1d5db'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {access === opt.value && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#6366f1' }} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{opt.label}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
                  링크
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    readOnly
                    value={shareUrl}
                    style={{ flex: 1, padding: '7px 10px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b', background: '#f8fafc', outline: 'none', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  />
                  <button
                    onClick={handleCopy}
                    style={{
                      padding: '7px 12px', borderRadius: 8,
                      border: `1px solid ${copied ? '#10b981' : '#6366f1'}`,
                      background: copied ? '#10b981' : '#6366f1',
                      color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      whiteSpace: 'nowrap', transition: 'all 0.2s',
                    }}
                  >
                    {copied ? '복사됨!' : '복사'}
                  </button>
                </div>
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 단축키 참조 팝오버
   Chakra UI Popover 활용 패턴 — 인라인 도움말, 키보드 단축키 목록
-------------------------------------------------------------------------- */
const SHORTCUT_GROUPS = [
  {
    category: '편집',
    shortcuts: [
      { keys: ['⌘', 'Z'], label: '실행 취소' },
      { keys: ['⌘', '⇧', 'Z'], label: '다시 실행' },
      { keys: ['⌘', 'D'], label: '복제' },
    ],
  },
  {
    category: '보기',
    shortcuts: [
      { keys: ['⌘', '+'], label: '확대' },
      { keys: ['⌘', '-'], label: '축소' },
      { keys: ['⌘', '0'], label: '비율 초기화' },
    ],
  },
]

export const Chakra_단축키_팝오버: Story = {
  render: () => (
    <div style={{ padding: '100px 80px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <Typography textStyle="descriptionLarge" style={{ color: '#475569' }}>
        캔버스를 편집할 수 있습니다.
      </Typography>
      <Popover>
        <Popover.Trigger asChild>
          <button style={{
            width: 22, height: 22, borderRadius: '50%',
            border: '1.5px solid #d1d5db', background: '#fff',
            cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#94a3b8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            ?
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 260 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Typography textStyle="subheadingSmall" style={{ color: '#0f172a' }}>키보드 단축키</Typography>

            {SHORTCUT_GROUPS.map((group) => (
              <div key={group.category}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
                  {group.category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {group.shortcuts.map((sc) => (
                    <div key={sc.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, color: '#374151' }}>{sc.label}</span>
                      <div style={{ display: 'flex', gap: 3 }}>
                        {sc.keys.map((key) => (
                          <kbd
                            key={key}
                            style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              minWidth: 22, height: 22, padding: '0 6px',
                              borderRadius: 5, border: '1px solid #d1d5db',
                              background: '#f8fafc', fontSize: 11, fontWeight: 700,
                              color: '#374151', fontFamily: 'system-ui',
                              boxShadow: '0 1px 0 #d1d5db',
                            }}
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ fontSize: 11, color: '#94a3b8', paddingTop: 8, borderTop: '1px solid #f1f5f9' }}>
              Chakra UI Popover 도움말 패턴 — 인라인 ?버튼으로 컨텍스트 도움말 제공
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Tailwind + Chakra 벤치마크: 인라인 태그 편집 팝오버
   콘텐츠 인라인 편집 패턴 — 클릭 시 팝오버로 태그 추가/제거
-------------------------------------------------------------------------- */
const ALL_TAGS = ['디자인', 'React', 'TypeScript', 'UI', '접근성', 'Storybook', '토큰', '피그마']

export const Tailwind_태그_편집_팝오버: Story = {
  render: function Render() {
    const [tags, setTags] = useState<string[]>(['디자인', 'React'])

    const toggleTag = (tag: string) => {
      setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
    }

    return (
      <div style={{ padding: '100px 60px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
            Orbit UI 소개
          </div>
          <div style={{ fontSize: 13, color: '#475569', marginBottom: 16, lineHeight: 1.6 }}>
            React 기반 3-tier 아키텍처 디자인 시스템. vanilla-extract로 타입 안전한 스타일링을 제공합니다.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <LabelBadge key={tag} color="gray">
                <LabelBadge.Label>{tag}</LabelBadge.Label>
              </LabelBadge>
            ))}

            <Popover>
              <Popover.Trigger asChild>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '3px 10px', borderRadius: 99,
                  border: '1.5px dashed #d1d5db', background: 'transparent',
                  cursor: 'pointer', fontSize: 12, color: '#94a3b8', fontWeight: 500,
                }}>
                  + 태그 편집
                </button>
              </Popover.Trigger>
              <Popover.Content style={{ width: 260 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Typography textStyle="subheadingSmall" style={{ color: '#0f172a' }}>태그 선택</Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {ALL_TAGS.map((tag) => {
                      const selected = tags.includes(tag)
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          style={{
                            padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                            border: `1.5px solid ${selected ? '#6366f1' : '#e2e8f0'}`,
                            background: selected ? 'rgba(99,102,241,0.08)' : '#fff',
                            color: selected ? '#6366f1' : '#64748b',
                            transition: 'all 0.1s',
                          }}
                        >
                          {selected && <span style={{ marginRight: 4 }}>✓</span>}
                          {tag}
                        </button>
                      )
                    })}
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: 8 }}>
                    {tags.length}개 선택됨 · 클릭으로 토글
                  </div>
                </div>
              </Popover.Content>
            </Popover>
          </div>
        </div>
      </div>
    )
  },
}
