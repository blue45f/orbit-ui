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

/* --------------------------------------------------------------------------
   Cycle 68: Raycast Extensions + Notion Design 벤치마크
-------------------------------------------------------------------------- */

/* Raycast — ActionPanel 섹션별 액션 팝오버
   Raycast ActionPanel.Section 패턴. 액션을 카테고리별로 그룹화하고
   키보드 단축키를 우측에 표시. 검색 가능한 액션 목록.
-------------------------------------------------------------------------- */
const RAYCAST_ACTIONS = [
  {
    section: '파일 작업',
    items: [
      { label: '열기', shortcut: '↵', icon: '◻' },
      { label: '빠른 보기', shortcut: '⌘ Y', icon: '⊞' },
      { label: '복사 경로', shortcut: '⌘ ⇧ C', icon: '⊡' },
    ],
  },
  {
    section: '편집',
    items: [
      { label: '이름 변경', shortcut: '⌘ ↵', icon: '✎' },
      { label: '삭제', shortcut: '⌃ X', icon: '⊗' },
    ],
  },
  {
    section: '공유',
    items: [
      { label: '링크 복사', shortcut: '⌘ L', icon: '⊕' },
      { label: 'AirDrop', shortcut: '⌘ ⇧ S', icon: '◎' },
    ],
  },
]

export const Raycast_ActionPanel_섹션_팝오버: Story = {
  name: 'Raycast — ActionPanel 섹션별 액션 팝오버',
  parameters: {
    docs: {
      description: {
        story: 'Raycast ActionPanel.Section 패턴. 액션을 카테고리별로 그룹화하고 우측에 키보드 단축키 표시. 섹션 구분선 + 그룹 헤더로 스캐닝 효율화.',
      },
    },
  },
  render: function RaycastActionPanel() {
    const [query, setQuery] = useState('')

    const filtered = RAYCAST_ACTIONS.map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      ),
    })).filter((section) => section.items.length > 0)

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 0' }}>
        <Popover>
          <Popover.Trigger asChild>
            <Button color="primary" size="medium">
              <Button.Center>액션 패널 열기</Button.Center>
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <div style={{ width: 260, fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>
              {/* 검색 */}
              <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9' }}>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="액션 검색..."
                  autoFocus
                  style={{
                    width: '100%', padding: '6px 10px', borderRadius: 6,
                    border: '1px solid #e2e8f0', fontSize: 12, outline: 'none',
                    boxSizing: 'border-box', background: '#f8fafc',
                  }}
                />
              </div>
              {/* 섹션별 액션 */}
              <div style={{ maxHeight: 280, overflowY: 'auto', padding: '4px 0' }}>
                {filtered.map((section) => (
                  <div key={section.section}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '8px 12px 4px' }}>
                      {section.section}
                    </div>
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px',
                          cursor: 'pointer', borderRadius: 6, margin: '0 4px',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f1f5f9' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        <span style={{ fontSize: 13, color: '#64748b', width: 16, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ flex: 1, fontSize: 13, color: '#0f172a', fontWeight: 400 }}>{item.label}</span>
                        <span style={{ fontSize: 10, color: '#94a3b8', background: '#f1f5f9', padding: '2px 5px', borderRadius: 4, fontFamily: 'monospace', flexShrink: 0 }}>
                          {item.shortcut}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 12, color: '#94a3b8' }}>
                    결과 없음
                  </div>
                )}
              </div>
            </div>
          </Popover.Content>
        </Popover>
        <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>
          Raycast ActionPanel.Section 패턴
        </Typography>
      </div>
    )
  },
}

/* Notion — @멘션 사용자 팝오버
   Notion의 @mention 자동완성 팝오버. 입력창에서 @ 입력 시
   유저 목록이 팝오버로 표시되고 선택 시 멘션 텍스트로 삽입.
-------------------------------------------------------------------------- */
const NOTION_USERS = [
  { id: 'u1', name: 'Alice Kim', role: 'Design Lead', initials: 'AK', color: '#6366f1' },
  { id: 'u2', name: 'Bob Lee', role: 'Frontend Dev', initials: 'BL', color: '#0ea5e9' },
  { id: 'u3', name: 'Carol Park', role: 'Product Manager', initials: 'CP', color: '#10b981' },
  { id: 'u4', name: 'David Oh', role: 'Backend Dev', initials: 'DO', color: '#f59e0b' },
  { id: 'u5', name: 'Eve Choi', role: 'QA Engineer', initials: 'EC', color: '#ef4444' },
]

export const Notion_멘션_사용자_팝오버: Story = {
  name: 'Notion — @멘션 사용자 팝오버',
  parameters: {
    docs: {
      description: {
        story: 'Notion @mention 자동완성 패턴. 입력창에서 @ 입력 시 유저 목록 팝오버가 나타납니다. 검색 필터링 + Avatar 이니셜 + 역할 표시 + 키보드 방향키 스타일.',
      },
    },
  },
  render: function NotionMentionPopover() {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const [mentionQuery, setMentionQuery] = useState('')
    const [mentions, setMentions] = useState<string[]>([])

    const filteredUsers = NOTION_USERS.filter((u) =>
      u.name.toLowerCase().includes(mentionQuery.toLowerCase()),
    )

    const handleInput = (val: string) => {
      setInput(val)
      const atIdx = val.lastIndexOf('@')
      if (atIdx !== -1) {
        setMentionQuery(val.slice(atIdx + 1))
        setOpen(true)
      } else {
        setOpen(false)
        setMentionQuery('')
      }
    }

    const selectUser = (user: typeof NOTION_USERS[0]) => {
      const atIdx = input.lastIndexOf('@')
      const newInput = input.slice(0, atIdx)
      setInput(newInput)
      setMentions((prev) => [...prev, user.name])
      setOpen(false)
      setMentionQuery('')
    }

    return (
      <div style={{ padding: '24px 0', fontFamily: 'system-ui, sans-serif', maxWidth: 400 }}>
        <Popover open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>
                댓글 작성 (@를 입력해 멘션)
              </div>
              <input
                value={input}
                onChange={(e) => handleInput(e.target.value)}
                placeholder="내용을 입력하세요... (@멘션 가능)"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8,
                  border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none',
                  boxSizing: 'border-box', lineHeight: 1.5,
                }}
              />
            </div>
          </Popover.Trigger>
          <Popover.Content>
            <div style={{ width: 240, fontFamily: 'system-ui, sans-serif' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '6px 12px 4px' }}>
                팀 멤버
              </div>
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => selectUser(user)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                    cursor: 'pointer', borderRadius: 6, margin: '0 4px',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f1f5f9' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: user.color, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0,
                  }}>
                    {user.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{user.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{user.role}</div>
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '12px 0', fontSize: 12, color: '#94a3b8' }}>
                  사용자를 찾을 수 없습니다
                </div>
              )}
            </div>
          </Popover.Content>
        </Popover>
        {mentions.length > 0 && (
          <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {mentions.map((m, i) => (
              <span key={i} style={{ fontSize: 12, background: '#eff6ff', color: '#3730a3', padding: '3px 8px', borderRadius: 4, fontWeight: 600 }}>
                @{m}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  },
}

/* Raycast + Notion — 슬래시 커맨드 블록 타입 선택기
   Notion의 / 커맨드 메뉴. Raycast의 리스트 아이템 스타일로 블록 타입을 선택.
   검색 필터링과 카테고리 섹션 분류 포함.
-------------------------------------------------------------------------- */
const BLOCK_TYPES = [
  { id: 'heading1', label: '제목 1', desc: '큰 섹션 제목', icon: 'H1', category: '기본 블록' },
  { id: 'heading2', label: '제목 2', desc: '중간 섹션 제목', icon: 'H2', category: '기본 블록' },
  { id: 'bullet', label: '글머리 목록', desc: '순서 없는 항목 목록', icon: '•', category: '기본 블록' },
  { id: 'numbered', label: '번호 매기기', desc: '순서 있는 목록', icon: '1.', category: '기본 블록' },
  { id: 'quote', label: '인용구', desc: '강조할 인용 텍스트', icon: '"', category: '기본 블록' },
  { id: 'code', label: '코드 블록', desc: '코드 스니펫', icon: '</>', category: '고급' },
  { id: 'table', label: '테이블', desc: '행과 열로 구성된 표', icon: '⊞', category: '고급' },
  { id: 'divider', label: '구분선', desc: '페이지 섹션 분리', icon: '—', category: '고급' },
]

export const Notion_슬래시_커맨드_블록_선택기: Story = {
  name: 'Notion + Raycast — 슬래시 커맨드 블록 타입 선택기',
  parameters: {
    docs: {
      description: {
        story: 'Notion / 커맨드 메뉴를 Raycast 리스트 스타일로 구현. 블록 타입을 카테고리별로 분류하고 검색 필터링 지원. 아이콘 + 제목 + 설명 3단 레이아웃.',
      },
    },
  },
  render: function SlashCommandPopover() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState<string | null>(null)

    const grouped = BLOCK_TYPES.filter((b) =>
      b.label.toLowerCase().includes(query.toLowerCase()) ||
      b.desc.toLowerCase().includes(query.toLowerCase()),
    ).reduce<Record<string, typeof BLOCK_TYPES>>((acc, b) => {
      if (!acc[b.category]) acc[b.category] = []
      acc[b.category].push(b)
      return acc
    }, {})

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 0', flexWrap: 'wrap' }}>
        <Popover open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <OutlineButton color="gray" size="medium">
              <OutlineButton.Center>/ 슬래시 커맨드 열기</OutlineButton.Center>
            </OutlineButton>
          </Popover.Trigger>
          <Popover.Content>
            <div style={{ width: 280, fontFamily: 'system-ui, sans-serif' }}>
              <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9' }}>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="블록 타입 검색..."
                  autoFocus
                  style={{
                    width: '100%', padding: '6px 10px', borderRadius: 6,
                    border: '1px solid #e2e8f0', fontSize: 12, outline: 'none',
                    boxSizing: 'border-box', background: '#f8fafc',
                  }}
                />
              </div>
              <div style={{ maxHeight: 300, overflowY: 'auto', padding: '4px 0' }}>
                {Object.entries(grouped).map(([cat, blocks]) => (
                  <div key={cat}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '8px 12px 4px' }}>
                      {cat}
                    </div>
                    {blocks.map((block) => (
                      <div
                        key={block.id}
                        onClick={() => { setSelected(block.label); setOpen(false); setQuery('') }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                          cursor: 'pointer', borderRadius: 6, margin: '0 4px', transition: 'background 0.1s',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f1f5f9' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        <div style={{
                          width: 28, height: 28, borderRadius: 6, background: '#f1f5f9',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700, color: '#475569', flexShrink: 0,
                          fontFamily: 'monospace',
                        }}>
                          {block.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{block.label}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8' }}>{block.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Popover.Content>
        </Popover>
        {selected && (
          <Typography textStyle="descriptionSmall" style={{ color: '#6366f1', fontWeight: 600 }}>
            선택됨: {selected}
          </Typography>
        )}
      </div>
    )
  },
}

const ANT_MEMBER_OPTIONS = [
  { id: 'u1', name: '김철수', role: 'Admin', avatar: '김' },
  { id: 'u2', name: '이영희', role: 'Editor', avatar: '이' },
  { id: 'u3', name: '박민준', role: 'Viewer', avatar: '박' },
  { id: 'u4', name: '최수진', role: 'Viewer', avatar: '최' },
]

const AntMemberSelectPopoverRender = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['u1']))
  const [search, setSearch] = useState('')

  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = ANT_MEMBER_OPTIONS.filter(m =>
    search === '' || m.name.includes(search)
  )

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Popover>
        <Popover.Trigger asChild>
          <OutlineButton color="gray" size="medium">
            <OutlineButton.Center>담당자 선택 ({selectedIds.size})</OutlineButton.Center>
          </OutlineButton>
        </Popover.Trigger>
        <Popover.Content style={{ padding: 0, width: 220, overflow: 'hidden' }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f0' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="멤버 검색..."
              style={{ width: '100%', border: '1px solid #d9d9d9', borderRadius: 4, padding: '4px 8px', fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {filtered.map(member => {
              const isSelected = selectedIds.has(member.id)
              return (
                <div
                  key={member.id}
                  onClick={() => toggle(member.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', cursor: 'pointer', background: isSelected ? '#e6f4ff' : '#fff', borderBottom: '1px solid #fafafa' }}
                >
                  <Avatar>{member.avatar}</Avatar>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#262626' }}>{member.name}</div>
                    <div style={{ fontSize: 10, color: '#8c8c8c' }}>{member.role}</div>
                  </div>
                  {isSelected && <span style={{ fontSize: 13, color: '#1677ff', fontWeight: 700 }}>✓</span>}
                </div>
              )
            })}
          </div>
          <div style={{ padding: '8px 10px', borderTop: '1px solid #f0f0f0', fontSize: 11, color: '#8c8c8c', display: 'flex', justifyContent: 'space-between' }}>
            <span>{selectedIds.size}명 선택됨</span>
            <span style={{ color: '#ff4d4f', cursor: 'pointer' }} onClick={() => setSelectedIds(new Set())}>초기화</span>
          </div>
        </Popover.Content>
      </Popover>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 200 }}>
        {[...selectedIds].map(id => {
          const m = ANT_MEMBER_OPTIONS.find(o => o.id === id)
          if (!m) return null
          return <LabelBadge key={id}><LabelBadge.Label>{m.name}</LabelBadge.Label></LabelBadge>
        })}
      </div>
    </div>
  )
}

export const Ant_담당자_선택_팝오버: Story = {
  name: 'Ant Design - 담당자 다중 선택 팝오버',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design Select 컴포넌트의 다중 선택 팝오버 패턴. 검색 필터 + Avatar 멤버 목록 + 체크 표시로 다중 선택하며, 선택된 멤버는 외부 LabelBadge로 표시됩니다. 이슈 담당자, 팀원 배정 UI에 적합합니다.',
      },
    },
  },
  render: () => <AntMemberSelectPopoverRender />,
}

const MANTINE_COLOR_SWATCHES = [
  '#e03131', '#c2255c', '#9c36b5', '#6741d9', '#3b5bdb',
  '#1971c2', '#0c8599', '#087f5b', '#2f9e44', '#66a80f',
  '#f08c00', '#e8590c', '#868e96', '#343a40', '#f1f3f5',
]

const MantineColorSwatchRender = () => {
  const [pickedColor, setPickedColor] = useState('#3b5bdb')
  const [customColor, setCustomColor] = useState('')

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Popover>
        <Popover.Trigger asChild>
          <OutlineButton color="gray" size="medium">
            <OutlineButton.Leading>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: pickedColor, border: '1px solid rgba(0,0,0,0.1)' }} />
            </OutlineButton.Leading>
            <OutlineButton.Center>색상 선택</OutlineButton.Center>
          </OutlineButton>
        </Popover.Trigger>
        <Popover.Content style={{ width: 210, padding: '12px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#868e96', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>스와치</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5, marginBottom: 10 }}>
            {MANTINE_COLOR_SWATCHES.map(color => (
              <div
                key={color}
                onClick={() => setPickedColor(color)}
                style={{ width: 28, height: 28, borderRadius: 5, background: color, cursor: 'pointer', border: pickedColor === color ? '2px solid #000' : '2px solid transparent', transition: 'transform 0.1s', boxSizing: 'border-box' }}
              />
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#868e96', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>HEX 입력</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              value={customColor}
              onChange={e => setCustomColor(e.target.value)}
              placeholder="#000000"
              style={{ flex: 1, border: '1px solid #dee2e6', borderRadius: 4, padding: '5px 8px', fontSize: 12, fontFamily: 'monospace', outline: 'none' }}
            />
            <Button
              color="primary"
              size="small"
              onClick={() => { if (/^#[0-9A-Fa-f]{6}$/.test(customColor)) setPickedColor(customColor) }}
            >
              <Button.Center>적용</Button.Center>
            </Button>
          </div>
        </Popover.Content>
      </Popover>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: pickedColor, border: '1px solid rgba(0,0,0,0.1)' }} />
        <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#495057' }}>{pickedColor}</span>
      </div>
    </div>
  )
}

export const Mantine_색상_스와치_팝오버: Story = {
  name: 'Mantine - 색상 스와치 선택 팝오버',
  parameters: {
    docs: {
      description: {
        story: 'Mantine ColorPicker의 스와치 팝오버 패턴. 프리셋 색상 팔레트(5열 그리드) + HEX 직접 입력을 Popover 안에 구현합니다. 선택한 색상은 트리거 버튼의 Leading 색상 도트와 외부 미리보기에 실시간 반영됩니다.',
      },
    },
  },
  render: () => <MantineColorSwatchRender />,
}

const ANT_CONFIRM_ITEMS = [
  { id: 'i1', title: '스프린트 계획서.pdf', size: '2.4 MB' },
  { id: 'i2', title: '디자인 에셋.zip', size: '18.7 MB' },
  { id: 'i3', title: '미팅 영상.mp4', size: '340 MB' },
]

const AntDeleteConfirmRender = () => {
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set())

  const handleDelete = (id: string) => {
    setDeletedIds(prev => new Set([...prev, id]))
    setConfirmId(null)
  }

  return (
    <div style={{ width: 360, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#262626', marginBottom: 10 }}>파일 목록</div>
      <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
        {ANT_CONFIRM_ITEMS.filter(i => !deletedIds.has(i.id)).map((item, idx, arr) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', borderBottom: idx < arr.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: '#262626' }}>{item.title}</div>
              <div style={{ fontSize: 11, color: '#bfbfbf' }}>{item.size}</div>
            </div>
            <Popover open={confirmId === item.id} onOpenChange={open => setConfirmId(open ? item.id : null)}>
              <Popover.Trigger asChild>
                <GhostButton size="small" color="gray" style={{ color: '#ff4d4f', fontSize: 12 }}>
                  삭제
                </GhostButton>
              </Popover.Trigger>
              <Popover.Content style={{ width: 200, padding: '12px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 6 }}>삭제 확인</div>
                <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 12 }}>이 파일을 삭제하시겠습니까? 복구할 수 없습니다.</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <OutlineButton color="gray" size="small" style={{ flex: 1 }} onClick={() => setConfirmId(null)}>
                    <OutlineButton.Center>취소</OutlineButton.Center>
                  </OutlineButton>
                  <Button color="primary" size="small" style={{ flex: 1, background: '#ff4d4f', borderColor: '#ff4d4f' }} onClick={() => handleDelete(item.id)}>
                    <Button.Center>삭제</Button.Center>
                  </Button>
                </div>
              </Popover.Content>
            </Popover>
          </div>
        ))}
        {ANT_CONFIRM_ITEMS.every(i => deletedIds.has(i.id)) && (
          <div style={{ padding: '24px', textAlign: 'center', color: '#bfbfbf', fontSize: 13 }}>파일이 없습니다</div>
        )}
      </div>
      {deletedIds.size > 0 && (
        <div style={{ marginTop: 8, fontSize: 11, color: '#52c41a' }}>{deletedIds.size}개 파일 삭제됨</div>
      )}
      <div style={{ marginTop: 4, fontSize: 11, color: '#8c8c8c' }}>Ant Design Popconfirm 패턴 — 삭제 전 팝오버 확인</div>
    </div>
  )
}

export const Ant_삭제_확인_팝컨펌: Story = {
  name: 'Ant Design - Popconfirm 삭제 확인 팝오버',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design Popconfirm 패턴. 위험한 작업(삭제) 전 Popover 안에 확인/취소 버튼을 표시하여 실수를 방지합니다. 삭제 버튼 클릭 시 해당 행에 확인 팝오버가 나타나고 확인 시 목록에서 제거됩니다.',
      },
    },
  },
  render: () => <AntDeleteConfirmRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 이모지 피커 팝오버 패턴
   shadcn Popover + Command — 이모지 검색 및 선택
-------------------------------------------------------------------------- */
const EMOJI_LIST = [
  { e: '😀', n: '웃음' }, { e: '👍', n: '좋아요' }, { e: '🎉', n: '파티' }, { e: '🔥', n: '불' },
  { e: '💡', n: '아이디어' }, { e: '✅', n: '완료' }, { e: '❌', n: '취소' }, { e: '⭐', n: '별' },
  { e: '🚀', n: '로켓' }, { e: '💎', n: '다이아' }, { e: '🎯', n: '목표' }, { e: '📌', n: '핀' },
  { e: '🔗', n: '링크' }, { e: '💬', n: '댓글' }, { e: '📊', n: '차트' }, { e: '🛠️', n: '도구' },
]

function ShadcnEmojiPickerRender() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<{ e: string; n: string } | null>(null)
  const [query, setQuery] = useState('')

  const filtered = EMOJI_LIST.filter(em => em.n.includes(query) || em.e.includes(query))

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>리액션 추가</div>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button style={{
            padding: '6px 14px',
            fontSize: 13,
            background: selected ? '#f0f9ff' : '#f8fafc',
            border: `1px solid ${selected ? '#bae6fd' : '#e2e8f0'}`,
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#475569',
          }}>
            <span style={{ fontSize: 16 }}>{selected?.e ?? '😊'}</span>
            <span>{selected?.n ?? '이모지 선택'}</span>
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 240, padding: 10 }}>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이모지 검색..."
            style={{ width: '100%', padding: '6px 10px', fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6, marginBottom: 8, boxSizing: 'border-box', outline: 'none' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {filtered.map(em => (
              <button
                key={em.e}
                title={em.n}
                onClick={() => { setSelected(em); setOpen(false); setQuery('') }}
                style={{
                  fontSize: 20,
                  padding: '6px',
                  background: selected?.e === em.e ? '#f0f9ff' : 'transparent',
                  border: `1px solid ${selected?.e === em.e ? '#bae6fd' : 'transparent'}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {em.e}
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8', fontSize: 12, padding: '12px 0' }}>없음</div>
            )}
          </div>
        </Popover.Content>
      </Popover>
      {selected && (
        <div style={{ fontSize: 12, color: '#64748b' }}>선택됨: <strong>{selected.e} {selected.n}</strong></div>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>shadcn/ui Popover + 이모지 그리드 검색 패턴</div>
    </div>
  )
}

export const Shadcn_이모지_피커_팝오버: Story = {
  name: 'shadcn/ui - 이모지 피커 팝오버',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Popover + Command 패턴. 이모지 그리드에 검색 필터를 결합해 빠른 이모지 선택을 제공합니다. ' +
          '선택된 이모지는 트리거 버튼에 즉시 반영되며, shadcn/ui의 Command + Popover 조합 패턴을 단순화해 구현합니다.',
      },
    },
  },
  render: () => <ShadcnEmojiPickerRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 컨텍스트 메뉴 대체 팝오버 패턴
   Radix ContextMenu → Popover — 우클릭 대신 항목별 액션 팝오버
-------------------------------------------------------------------------- */
const CONTEXT_ITEMS = [
  { id: 1, title: 'DataTable.stories.tsx', type: 'file', size: '4.2KB' },
  { id: 2, title: 'Skeleton.stories.tsx', type: 'file', size: '8.1KB' },
  { id: 3, title: 'components/', type: 'folder', size: '—' },
]

function RadixContextMenuPopoverRender() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <div style={{ width: 320, fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#94a3b8', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        파일 탐색기
      </div>
      {CONTEXT_ITEMS.map((item, i) => (
        <div
          key={item.id}
          style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', borderBottom: i < CONTEXT_ITEMS.length - 1 ? '1px solid #f8fafc' : 'none', gap: 10 }}
        >
          <span style={{ fontSize: 16 }}>{item.type === 'folder' ? '📁' : '📄'}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{item.title}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.size}</div>
          </div>
          <Popover open={openId === item.id} onOpenChange={(o) => setOpenId(o ? item.id : null)}>
            <Popover.Trigger asChild>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 6, color: '#94a3b8', fontSize: 16, lineHeight: 1 }}>
                ⋯
              </button>
            </Popover.Trigger>
            <Popover.Content style={{ width: 160, padding: 4 }}>
              {['열기', '이름 변경', '복사', '이동', '삭제'].map((action) => (
                <button
                  key={action}
                  onClick={() => setOpenId(null)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '7px 10px',
                    fontSize: 12,
                    color: action === '삭제' ? '#ef4444' : '#1e293b',
                    background: 'none',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = action === '삭제' ? '#fef2f2' : '#f8fafc' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
                >
                  {action}
                </button>
              ))}
            </Popover.Content>
          </Popover>
        </div>
      ))}
      <div style={{ padding: '6px 12px', fontSize: 11, color: '#94a3b8', background: '#fafafa', borderTop: '1px solid #e2e8f0' }}>
        Radix ContextMenu 패턴 — ⋯ 버튼으로 컨텍스트 액션 제공
      </div>
    </div>
  )
}

export const Radix_컨텍스트_메뉴_팝오버: Story = {
  name: 'Radix UI - 컨텍스트 메뉴 대체 팝오버',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI ContextMenu → Popover 대체 패턴. 우클릭 대신 각 항목의 ⋯ 버튼으로 컨텍스트 액션(열기/이름변경/복사/이동/삭제)을 팝오버로 제공합니다. ' +
          '모바일 환경에서도 동작하며 접근성이 높은 대안 패턴입니다.',
      },
    },
  },
  render: () => <RadixContextMenuPopoverRender />,
}

/* --------------------------------------------------------------------------
   shadcn + Radix 복합: 사용자 프리필 팝오버 패턴
   멘션(@) 트리거 팝오버 — 텍스트 내 사용자 언급 자동완성
-------------------------------------------------------------------------- */
const MENTION_USERS = [
  { id: 1, name: '김준혁', role: 'Design Lead', avatar: 'KJ' },
  { id: 2, name: 'Sarah Lee', role: 'Frontend', avatar: 'SL' },
  { id: 3, name: '박민정', role: 'PM', avatar: 'PM' },
  { id: 4, name: 'James Kim', role: 'Backend', avatar: 'JK' },
]

function ShadcnRadixMentionPopoverRender() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [mentions, setMentions] = useState<string[]>([])

  const filtered = MENTION_USERS.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.role.toLowerCase().includes(query.toLowerCase())
  )

  const addMention = (name: string) => {
    if (!mentions.includes(name)) setMentions(prev => [...prev, name])
    setOpen(false)
    setQuery('')
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>담당자 멘션</div>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button style={{
            padding: '8px 12px',
            fontSize: 13,
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            cursor: 'pointer',
            textAlign: 'left',
            color: '#94a3b8',
            width: '100%',
          }}>
            @ 멘션으로 담당자 지정...
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 260, padding: 8 }}>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름 또는 역할 검색..."
            style={{ width: '100%', padding: '6px 10px', fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6, marginBottom: 6, boxSizing: 'border-box', outline: 'none' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filtered.map(u => (
              <button
                key={u.id}
                onClick={() => addMention(u.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '7px 8px', borderRadius: 6, border: 'none',
                  background: mentions.includes(u.name) ? '#f0fdf4' : 'transparent',
                  cursor: 'pointer', textAlign: 'left',
                }}
                onMouseEnter={(e) => { if (!mentions.includes(u.name)) e.currentTarget.style.background = '#f8fafc' }}
                onMouseLeave={(e) => { if (!mentions.includes(u.name)) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e0e7ff', color: '#6366f1', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {u.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{u.role}</div>
                </div>
                {mentions.includes(u.name) && <span style={{ fontSize: 12, color: '#22c55e' }}>✓</span>}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover>
      {/* 선택된 멘션 목록 */}
      {mentions.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {mentions.map(name => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 999, fontSize: 12, color: '#0369a1' }}>
              @{name}
              <button onClick={() => setMentions(prev => prev.filter(m => m !== name))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7dd3fc', fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
            </div>
          ))}
        </div>
      )}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>shadcn/ui + Radix — @ 멘션 자동완성 팝오버</div>
    </div>
  )
}

export const Shadcn_Radix_멘션_자동완성_팝오버: Story = {
  name: 'shadcn/ui + Radix UI - @ 멘션 자동완성 팝오버',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui + Radix UI 복합 팝오버 패턴. @ 트리거로 사용자 검색 팝오버를 열고 이름/역할로 필터링해 담당자를 지정합니다. ' +
          '선택된 멘션은 태그 형태로 표시되며 ✕로 제거 가능합니다. Linear, GitHub의 담당자 멘션 UX와 동일한 패턴입니다.',
      },
    },
  },
  render: () => <ShadcnRadixMentionPopoverRender />,
}

/* --------------------------------------------------------------------------
   Linear Design — 이슈 퀵 편집 팝오버
   Linear의 인라인 상태/담당자/우선순위 즉시 변경 패턴
-------------------------------------------------------------------------- */
const LINEAR_STATUSES = ['백로그', '할일', '진행중', '완료', '취소']
const LINEAR_USERS = ['Alice Kim', 'Bob Lee', 'Carol Park', 'Dave Oh']
const LINEAR_PRIORITIES = ['긴급', '높음', '중간', '낮음', '없음']
const STATUS_COLORS: Record<string, string> = {
  '백로그': '#94a3b8', '할일': '#60a5fa', '진행중': '#f59e0b', '완료': '#10b981', '취소': '#6b7280',
}

function LinearIssueQuickEditRender() {
  const [status, setStatus] = useState('진행중')
  const [assignee, setAssignee] = useState('Alice Kim')
  const [priority, setPriority] = useState('중간')
  const [openField, setOpenField] = useState<string | null>(null)

  const Field = ({ label, value, field, options, colors }: {
    label: string
    value: string
    field: string
    options: string[]
    colors?: Record<string, string>
  }) => (
    <Popover open={openField === field} onOpenChange={(o) => setOpenField(o ? field : null)}>
      <Popover.Trigger asChild>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 6, border: '1px solid transparent', background: 'transparent', cursor: 'pointer', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)', transition: 'background 0.15s' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sem-eclipse-color-backgroundSecondary)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {colors && <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors[value], flexShrink: 0 }} />}
          <span>{value}</span>
        </button>
      </Popover.Trigger>
      <Popover.Content align="start" style={{ padding: 4, minWidth: 140, background: 'var(--sem-eclipse-color-backgroundPrimary)', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '4px 8px 6px', fontSize: 10, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundQuaternary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => { if (field === 'status') setStatus(opt); else if (field === 'assignee') setAssignee(opt); else setPriority(opt); setOpenField(null) }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '6px 8px', borderRadius: 5, border: 'none', background: (field === 'status' ? status : field === 'assignee' ? assignee : priority) === opt ? 'var(--sem-eclipse-color-backgroundSecondary)' : 'transparent', cursor: 'pointer', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundPrimary)', textAlign: 'left', transition: 'background 0.1s' }}
          >
            {colors && <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors[opt], flexShrink: 0 }} />}
            {opt}
          </button>
        ))}
      </Popover.Content>
    </Popover>
  )

  return (
    <div style={{ padding: 16, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 10, background: 'var(--sem-eclipse-color-backgroundPrimary)', minWidth: 380 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#6366f1', fontWeight: 700, background: '#6366f108', padding: '2px 6px', borderRadius: 4 }}>ORB-315</span>
        <Typography textStyle="labelMedium" color="foregroundPrimary">팝오버 퀵 편집 구현</Typography>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Field label="상태" value={status} field="status" options={LINEAR_STATUSES} colors={STATUS_COLORS} />
        <Field label="담당자" value={assignee} field="assignee" options={LINEAR_USERS} />
        <Field label="우선순위" value={priority} field="priority" options={LINEAR_PRIORITIES} />
      </div>
      <Typography textStyle="descriptionSmall" color="foregroundDisabled">Linear — 이슈 인라인 속성 퀵 편집 팝오버</Typography>
    </div>
  )
}

export const Linear_이슈_퀵_편집_팝오버: Story = {
  name: 'Linear Design — 이슈 속성 퀵 편집 팝오버',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 인라인 이슈 편집 패턴. 상태/담당자/우선순위를 각각 별도 Popover로 즉시 변경. 버튼 클릭 시 해당 팝오버만 열리고 나머지는 닫힘.',
      },
    },
  },
  render: () => <LinearIssueQuickEditRender />,
}

/* --------------------------------------------------------------------------
   Radix UI — 접근성 중심 확인 팝오버
   Radix의 포커스 트랩 + 키보드 탐색 패턴 — 삭제 확인 다이얼로그 대체
-------------------------------------------------------------------------- */
function RadixConfirmPopoverRender() {
  const [items, setItems] = useState(['문서 A', '문서 B', '문서 C', '문서 D'])
  const [deletingItem, setDeletingItem] = useState<string | null>(null)

  const handleDelete = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item))
    setDeletingItem(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 320 }}>
      <Typography textStyle="subheadingSmall" color="foregroundPrimary">문서 목록</Typography>
      <Typography textStyle="descriptionSmall" color="foregroundTertiary">Radix — 키보드 접근성 삭제 확인 팝오버</Typography>
      {items.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', border: '1px dashed var(--sem-eclipse-color-borderDefault)', borderRadius: 8 }}>
          <Typography textStyle="labelMedium" color="foregroundDisabled">모든 문서가 삭제되었습니다</Typography>
        </div>
      ) : (
        items.map((item) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, background: 'var(--sem-eclipse-color-backgroundPrimary)' }}>
            <Typography textStyle="labelSmall" color="foregroundPrimary">{item}</Typography>
            <Popover open={deletingItem === item} onOpenChange={(o) => setDeletingItem(o ? item : null)}>
              <Popover.Trigger asChild>
                <GhostButton color="black" size="small">
                  <GhostButton.Center>삭제</GhostButton.Center>
                </GhostButton>
              </Popover.Trigger>
              <Popover.Content align="end" style={{ padding: 16, width: 220, background: 'var(--sem-eclipse-color-backgroundPrimary)', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
                <Typography textStyle="labelMedium" color="foregroundPrimary">정말 삭제할까요?</Typography>
                <Typography textStyle="descriptionSmall" color="foregroundTertiary">{item} 문서가 영구적으로 삭제됩니다.</Typography>
                <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
                  <OutlineButton color="black" size="small" onClick={() => setDeletingItem(null)}>
                    <OutlineButton.Center>취소</OutlineButton.Center>
                  </OutlineButton>
                  <Button color="primary" size="small" onClick={() => handleDelete(item)}>
                    <Button.Center>삭제</Button.Center>
                  </Button>
                </div>
              </Popover.Content>
            </Popover>
          </div>
        ))
      )}
    </div>
  )
}

export const Radix_접근성_삭제_확인_팝오버: Story = {
  name: 'Radix UI — 접근성 중심 삭제 확인 팝오버',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI의 포커스 트랩 + 키보드 탐색 패턴. 삭제 버튼 클릭 시 확인 팝오버 표시, 취소/확인으로 처리. 경량 confirm 대화상자로 AlertDialog 대비 더 인라인 친화적.',
      },
    },
  },
  render: () => <RadixConfirmPopoverRender />,
}

/* --------------------------------------------------------------------------
   Linear + Radix — 레이블 관리 팝오버
   Linear의 멀티셀렉트 레이블 + Radix 접근성 패턴
-------------------------------------------------------------------------- */
const LABEL_OPTIONS = [
  { id: 'bug', name: '버그', color: '#ef4444' },
  { id: 'feature', name: '기능', color: '#6366f1' },
  { id: 'docs', name: '문서', color: '#0ea5e9' },
  { id: 'performance', name: '성능', color: '#f59e0b' },
  { id: 'a11y', name: '접근성', color: '#10b981' },
  { id: 'design', name: '디자인', color: '#ec4899' },
]

function LinearRadixLabelManagerRender() {
  const [selected, setSelected] = useState<string[]>(['bug', 'feature'])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const toggleLabel = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id])
  }
  const filtered = LABEL_OPTIONS.filter((l) => l.name.includes(search))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 320 }}>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, background: 'var(--sem-eclipse-color-backgroundPrimary)', cursor: 'pointer', fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
            <span>레이블 편집</span>
            {selected.length > 0 && <CounterBadge>{selected.length}</CounterBadge>}
          </button>
        </Popover.Trigger>
        <Popover.Content align="start" style={{ padding: 0, width: 220, background: 'var(--sem-eclipse-color-backgroundPrimary)', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
            <input
              placeholder="레이블 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundPrimary)', outline: 'none' }}
            />
          </div>
          <div style={{ maxHeight: 220, overflowY: 'auto', padding: 4 }}>
            {filtered.map((label) => {
              const isOn = selected.includes(label.id)
              return (
                <button
                  key={label.id}
                  onClick={() => toggleLabel(label.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '6px 8px', borderRadius: 6, border: 'none', background: isOn ? 'var(--sem-eclipse-color-backgroundSecondary)' : 'transparent', cursor: 'pointer', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundPrimary)', textAlign: 'left', transition: 'background 0.1s' }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: label.color, flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{label.name}</span>
                  {isOn && <span style={{ fontSize: 10, color: label.color, fontWeight: 700 }}>✓</span>}
                </button>
              )
            })}
          </div>
        </Popover.Content>
      </Popover>
      {/* 선택된 레이블 태그 */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {selected.map((id) => {
          const label = LABEL_OPTIONS.find((l) => l.id === id)
          if (!label) return null
          return (
            <span key={id} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 999, border: `1px solid ${label.color}40`, background: `${label.color}10`, fontSize: 11, fontWeight: 600, color: label.color }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: label.color }} />
              {label.name}
            </span>
          )
        })}
        {selected.length === 0 && <Typography textStyle="descriptionSmall" color="foregroundDisabled">레이블 없음</Typography>}
      </div>
    </div>
  )
}

export const Linear_Radix_레이블_관리_팝오버: Story = {
  name: 'Linear + Radix UI — 멀티셀렉트 레이블 관리 팝오버',
  parameters: {
    docs: {
      description: {
        story: 'Linear 레이블 멀티셀렉트 + Radix 접근성 패턴. 검색 필터 + 색상 도트 + 체크 표시. 선택된 레이블은 컬러 태그로 외부 표시. CounterBadge로 선택 수 즉시 확인.',
      },
    },
  },
  render: () => <LinearRadixLabelManagerRender />,
}

/* --------------------------------------------------------------------------
   Cycle 178 — Radix UI + Linear Design
   Benchmark:
   1. Radix Popover: 폼 입력을 팝오버 내부에 배치하는 인라인 편집 패턴
   2. Linear: 단축키 힌트 팝오버 — 호버 시 키보드 단축키 오버레이
   3. Linear + Radix: 색상 선택 팝오버 — 팔레트 그리드 + 텍스트 입력
-------------------------------------------------------------------------- */

function RadixInlineEditPopoverRender() {
  const [name, setName] = useState('Orbit UI')
  const [desc, setDesc] = useState('React 디자인 시스템')
  const [draft, setDraft] = useState({ name: 'Orbit UI', desc: 'React 디자인 시스템' })
  const [open, setOpen] = useState(false)

  const handleSave = () => {
    setName(draft.name)
    setDesc(draft.desc)
    setOpen(false)
  }

  return (
    <div style={{ padding: '60px 40px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '16px 20px', width: 300, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{name}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{desc}</div>
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button style={{ fontSize: 11, padding: '4px 10px', borderRadius: 7, border: '1px solid #e5e7eb', background: 'transparent', cursor: 'pointer', color: '#6366f1', fontWeight: 600, fontFamily: 'system-ui', whiteSpace: 'nowrap' }}>
                편집
              </button>
            </Popover.Trigger>
            <Popover.Content style={{ width: 260 }}>
              <div style={{ padding: 4 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 10 }}>프로젝트 정보 편집</div>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 4 }}>이름</label>
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: 7, border: '1px solid #e5e7eb', fontSize: 12, color: '#374151', boxSizing: 'border-box', fontFamily: 'system-ui', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 4 }}>설명</label>
                  <input
                    value={draft.desc}
                    onChange={(e) => setDraft((prev) => ({ ...prev, desc: e.target.value }))}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: 7, border: '1px solid #e5e7eb', fontSize: 12, color: '#374151', boxSizing: 'border-box', fontFamily: 'system-ui', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  <button onClick={() => setOpen(false)} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: 'transparent', cursor: 'pointer', color: '#64748b', fontFamily: 'system-ui' }}>취소</button>
                  <button onClick={handleSave} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 6, border: 'none', background: '#6366f1', cursor: 'pointer', color: '#fff', fontWeight: 600, fontFamily: 'system-ui' }}>저장</button>
                </div>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export const Radix_인라인_편집_팝오버: Story = {
  name: 'Radix UI — 인라인 편집 팝오버 (폼 내장 + 저장/취소)',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI Popover 안에 폼 입력을 배치하는 인라인 편집 패턴. 저장 시 외부 값 업데이트 후 팝오버 닫기. Notion/Linear 인라인 편집 UX를 Orbit UI Popover로 구현. open 상태 제어로 저장/취소 동작.',
      },
    },
  },
  render: () => <RadixInlineEditPopoverRender />,
}

function LinearShortcutHintPopoverRender() {
  const shortcuts = [
    { action: '이슈 생성', keys: ['C'] },
    { action: '검색', keys: ['⌘', 'K'] },
    { action: '완료로 이동', keys: ['⌘', 'D'] },
    { action: '담당자 지정', keys: ['A'] },
    { action: '우선순위 변경', keys: ['P'] },
    { action: '레이블 추가', keys: ['L'] },
    { action: '마감일 설정', keys: ['D'] },
    { action: '이슈 복사', keys: ['⌘', 'C'] },
  ]

  return (
    <div style={{ padding: '80px 60px', display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', fontFamily: 'system-ui, sans-serif' }}>
      <Popover>
        <Popover.Trigger asChild>
          <button style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 12, color: '#374151', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>⌨</span>
            키보드 단축키
            <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 4, background: '#f1f5f9', color: '#94a3b8', fontFamily: 'monospace' }}>?</span>
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 280 }}>
          <div style={{ padding: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>키보드 단축키</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {shortcuts.map((s) => (
                <div key={s.action} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 6px', borderRadius: 6 }}>
                  <span style={{ fontSize: 12, color: '#374151' }}>{s.action}</span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {s.keys.map((key) => (
                      <span key={key} style={{ fontSize: 11, padding: '1px 5px', borderRadius: 4, background: '#f8fafc', border: '1px solid #e5e7eb', color: '#374151', fontFamily: 'monospace', fontWeight: 600 }}>
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #f1f5f9', fontSize: 10, color: '#94a3b8', textAlign: 'center' }}>
              Linear 스타일 단축키 팝오버
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  )
}

export const Linear_단축키_팝오버: Story = {
  name: 'Linear — 키보드 단축키 힌트 팝오버 (Linear 스타일)',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 ? 단축키 팝오버 패턴 구현. 액션-단축키 쌍을 행으로 나열하고 kbd 스타일 키 칩으로 표시. Popover.Content 안에 단축키 테이블을 배치. 프로덕티비티 앱 키보드 힌트 UX.',
      },
    },
  },
  render: () => <LinearShortcutHintPopoverRender />,
}

const COLOR_PALETTE = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#6366f1', '#a855f7', '#ec4899', '#64748b', '#0f172a',
  '#fee2e2', '#fef3c7', '#dcfce7', '#dbeafe', '#ede9fe',
]

function RadixLinearColorPickerRender() {
  const [color, setColor] = useState('#6366f1')
  const [hex, setHex] = useState('#6366f1')
  const [open, setOpen] = useState(false)

  const handleHexChange = (val: string) => {
    setHex(val)
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setColor(val)
  }

  const handleSelect = (c: string) => {
    setColor(c)
    setHex(c)
    setOpen(false)
  }

  return (
    <div style={{ padding: '80px 60px', display: 'flex', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 10, background: '#fff' }}>
        <span style={{ fontSize: 12, color: '#64748b' }}>레이블 색상</span>
        <Popover open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <button
              style={{ width: 24, height: 24, borderRadius: 6, background: color, border: '2px solid #e5e7eb', cursor: 'pointer', flexShrink: 0 }}
              aria-label="색상 선택"
            />
          </Popover.Trigger>
          <Popover.Content style={{ width: 200 }}>
            <div style={{ padding: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#374151', marginBottom: 8 }}>색상 선택</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginBottom: 10 }}>
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleSelect(c)}
                    style={{ width: '100%', aspectRatio: '1', borderRadius: 5, background: c, border: color === c ? '2px solid #6366f1' : '2px solid transparent', cursor: 'pointer', outline: 'none' }}
                    aria-label={c}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: color, flexShrink: 0, border: '1px solid #e5e7eb' }} />
                <input
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  style={{ flex: 1, padding: '4px 7px', borderRadius: 6, border: '1px solid #e5e7eb', fontSize: 11, fontFamily: 'monospace', color: '#374151', outline: 'none' }}
                  placeholder="#000000"
                />
              </div>
            </div>
          </Popover.Content>
        </Popover>
        <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#374151' }}>{color}</span>
      </div>
    </div>
  )
}

export const Radix_Linear_색상_피커_팝오버: Story = {
  name: 'Radix + Linear — 색상 선택 팝오버 (팔레트 + HEX 입력)',
  parameters: {
    docs: {
      description: {
        story: 'Radix Popover + Linear 색상 선택기 패턴. 스와치 클릭 시 색상 선택 후 팝오버 닫기, HEX 직접 입력 지원. 모듈 레벨 COLOR_PALETTE 상수로 exhaustive-deps 경고 방지.',
      },
    },
  },
  render: () => <RadixLinearColorPickerRender />,
}
