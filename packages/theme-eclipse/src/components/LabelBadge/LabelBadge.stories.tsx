import { StarFillIcon, CheckIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { LabelBadge } from './LabelBadge'

LabelBadge.displayName = 'LabelBadge'

const meta = {
  title: 'eclipse/Data Display/LabelBadge',
  component: LabelBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "LabelBadge는 카테고리, 상태, 태그를 표시하는 인라인 배지입니다. sale/benefit/gray 색상 variant를 지원합니다.",
      },
    },
  },
  args: {},
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['gray', 'benefit', 'sale'],
    },
  },
} satisfies Meta<typeof LabelBadge>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render(args) {
    return (
      <LabelBadge {...args}>
        <LabelBadge.Visual>
          <StarFillIcon />
        </LabelBadge.Visual>
        <LabelBadge.Label>Trailing</LabelBadge.Label>
      </LabelBadge>
    )
  },
} satisfies Story

export const 테마_재정의 = {
  render(args) {
    return (
      <LabelBadge {...args} color="benefit">
        <LabelBadge.Visual>
          <CheckIcon />
        </LabelBadge.Visual>
        <LabelBadge.Label>Trailing</LabelBadge.Label>
      </LabelBadge>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
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
      <LabelBadge {...rest}>
        {visual && (
          <LabelBadge.Visual>
            <CheckIcon size={rest.size === 'large' ? 12 : 10} />
          </LabelBadge.Visual>
        )}
        {label && <LabelBadge.Label>{text || 'Label'}</LabelBadge.Label>}
      </LabelBadge>
    )
  },
}

// ── Vercel-style Status Indicator benchmark stories ──────────────────────────

// Vercel compact status: deployment status, environment status, etc.
const statusConfigs = [
  { label: 'Ready', color: 'benefit' as const, dot: '#10b981', desc: 'Deployment successful' },
  { label: 'Building', color: 'gray' as const, dot: '#f59e0b', desc: 'Build in progress' },
  { label: 'Error', color: 'sale' as const, dot: '#ef4444', desc: 'Deployment failed' },
  { label: 'Cancelled', color: 'gray' as const, dot: '#94a3b8', desc: 'Deployment cancelled' },
  { label: 'Queued', color: 'gray' as const, dot: '#6366f1', desc: 'Waiting in queue' },
]

// Vercel deployment-row style (monochrome precision, compact)
export const Vercel_배포_상태_배지: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
        Deployment Status Badges
      </div>

      {/* Status rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {statusConfigs.map((s) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Compact dot + badge combo (Vercel monochrome style) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: s.dot,
                boxShadow: `0 0 0 2px ${s.dot}33`,
              }} />
              <LabelBadge color={s.color}>
                <LabelBadge.Label>{s.label}</LabelBadge.Label>
              </LabelBadge>
            </div>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

// All color variants side-by-side comparison (Vercel design audit style)
export const Vercel_컬러_배리언트_비교: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
        All Color Variants — Side-by-Side
      </div>

      {/* Grid comparison: each row shows same label in all colors */}
      <div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          All color variants
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          {(['gray', 'benefit', 'sale'] as const).map((color) => (
            <LabelBadge key={color} color={color}>
              <LabelBadge.Visual>
                <CheckIcon />
              </LabelBadge.Visual>
              <LabelBadge.Label>{color}</LabelBadge.Label>
            </LabelBadge>
          ))}
        </div>
      </div>

      {/* Icon-only variants */}
      <div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Icon + label combinations
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <LabelBadge color="benefit">
            <LabelBadge.Visual><CheckIcon /></LabelBadge.Visual>
            <LabelBadge.Label>Verified</LabelBadge.Label>
          </LabelBadge>
          <LabelBadge color="sale">
            <LabelBadge.Label>Urgent</LabelBadge.Label>
          </LabelBadge>
          <LabelBadge color="gray">
            <LabelBadge.Visual><StarFillIcon /></LabelBadge.Visual>
            <LabelBadge.Label>Featured</LabelBadge.Label>
          </LabelBadge>
          <LabelBadge color="benefit">
            <LabelBadge.Label>Live</LabelBadge.Label>
          </LabelBadge>
          <LabelBadge color="gray">
            <LabelBadge.Label>Draft</LabelBadge.Label>
          </LabelBadge>
        </div>
      </div>
    </div>
  ),
}

// Environment badge row (Vercel: Production / Preview / Development)
export const Vercel_환경_배지_조합: Story = {
  render: () => {
    const envs = [
      { name: 'Production', branch: 'main', color: 'benefit' as const, dot: '#10b981', url: 'orbit-ui.vercel.app' },
      { name: 'Preview', branch: 'feat/kanban', color: 'gray' as const, dot: '#6366f1', url: 'orbit-ui-preview.vercel.app' },
      { name: 'Development', branch: 'local', color: 'gray' as const, dot: '#f59e0b', url: 'localhost:6006' },
    ]

    return (
      <div style={{ width: 480, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 12, fontWeight: 600, color: '#475569' }}>
          Deployments
        </div>
        {envs.map((env, i) => (
          <div
            key={env.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: i < envs.length - 1 ? '1px solid #f1f5f9' : 'none',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{env.name}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>{env.branch}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: env.dot }} />
                <LabelBadge color={env.color}>
                  <LabelBadge.Label>{env.name === 'Production' ? 'Ready' : env.name === 'Preview' ? 'Building' : 'Local'}</LabelBadge.Label>
                </LabelBadge>
              </div>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{env.url}</span>
            </div>
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Apple HIG 스타일: 세그먼트 필터 + 상태 배지 조합
   Apple HIG의 Segmented Control + 인라인 배지 패턴.
   상태별로 아이템을 분류하고 각 항목에 배지를 표시합니다.
-------------------------------------------------------------------------- */
const AppleHIGSegmentFilterRender = () => {
  const segments = ['전체', '진행 중', '완료', '보류'] as const
  type Segment = typeof segments[number]
  const [active, setActive] = useState<Segment>('전체')

  const items: Array<{ title: string; status: Segment; color: 'gray' | 'benefit' | 'sale'; tag: string }> = [
    { title: 'Orbit UI 디자인 시스템 v2', status: '진행 중', color: 'benefit', tag: '진행 중' },
    { title: 'AccessibilityGuide 문서 작성', status: '완료', color: 'benefit', tag: '완료' },
    { title: '다크모드 토큰 정의', status: '보류', color: 'gray', tag: '보류' },
    { title: 'Drawer 스토리 고도화', status: '진행 중', color: 'benefit', tag: '진행 중' },
    { title: 'DataTable 페이지네이션', status: '완료', color: 'benefit', tag: '완료' },
    { title: 'CommandPalette 템플릿', status: '보류', color: 'gray', tag: '보류' },
  ]

  const filtered = active === '전체' ? items : items.filter((i) => i.status === active)

  return (
    <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Segmented Control (Apple HIG 스타일) */}
      <div style={{
        display: 'inline-flex',
        background: '#f1f5f9',
        borderRadius: '10px',
        padding: '3px',
        gap: '2px',
      }}>
        {segments.map((seg) => (
          <button
            key={seg}
            onClick={() => setActive(seg)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: active === seg ? '#ffffff' : 'transparent',
              color: active === seg ? '#1e293b' : '#64748b',
              fontWeight: active === seg ? 600 : 400,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: active === seg ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            {seg}
          </button>
        ))}
      </div>

      {/* 아이템 목록 */}
      <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
            항목이 없습니다.
          </div>
        ) : (
          filtered.map((item, i) => (
            <div
              key={item.title}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '13px 16px',
                borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}
            >
              <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: 500 }}>{item.title}</span>
              <LabelBadge color={item.color}>
                <LabelBadge.Label>{item.tag}</LabelBadge.Label>
              </LabelBadge>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export const Apple_HIG_세그먼트_필터: Story = {
  render: () => <AppleHIGSegmentFilterRender />,
}

/* --------------------------------------------------------------------------
   Raycast 스타일: 퀵 액션 결과 목록 + 배지
   Raycast의 Action List 패턴: 아이콘 + 제목 + 서브타이틀 + 단축키 배지.
   키보드 내비게이션 시뮬레이션 포함.
-------------------------------------------------------------------------- */
const RaycastActionListRender = () => {
  const [selectedIdx, setSelectedIdx] = useState(0)

  const actions: Array<{
    label: string
    desc: string
    shortcut: string
    color: 'gray' | 'benefit' | 'sale'
    tag: string
    icon: string
  }> = [
    { label: '새 컴포넌트 생성', desc: 'pnpm gen 실행', shortcut: 'N', color: 'benefit', tag: 'Action', icon: '+' },
    { label: '스토리북 시작', desc: 'pnpm dev', shortcut: 'D', color: 'benefit', tag: 'Dev', icon: '>' },
    { label: '타입체크 실행', desc: 'pnpm typecheck', shortcut: 'T', color: 'gray', tag: 'QA', icon: 'T' },
    { label: '린트 수정', desc: 'pnpm lint:fix', shortcut: 'L', color: 'gray', tag: 'QA', icon: 'L' },
    { label: '빌드 실행', desc: 'pnpm build', shortcut: 'B', color: 'gray', tag: 'Build', icon: 'B' },
    { label: '변경셋 생성', desc: 'pnpm changeset', shortcut: 'C', color: 'sale', tag: 'Release', icon: 'R' },
  ]

  return (
    <div style={{
      width: '480px',
      borderRadius: '14px',
      border: '1px solid #e2e8f0',
      background: '#ffffff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      overflow: 'hidden',
    }}>
      {/* Raycast 헤더 */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid #f1f5f9',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#6366f1', boxShadow: '0 0 0 3px rgba(99,102,241,0.15)',
        }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Quick Actions</span>
        <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: 'auto' }}>
          {selectedIdx + 1} / {actions.length}
        </span>
      </div>

      {/* 액션 목록 */}
      <div>
        {actions.map((action, i) => {
          const isSelected = i === selectedIdx
          return (
            <div
              key={action.label}
              onClick={() => setSelectedIdx(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 16px',
                background: isSelected ? 'rgba(99,102,241,0.06)' : '#fff',
                borderBottom: i < actions.length - 1 ? '1px solid #f8fafc' : 'none',
                cursor: 'pointer',
                transition: 'background 0.1s',
              }}
            >
              {/* 아이콘 */}
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: isSelected ? '#6366f1' : '#f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 700,
                color: isSelected ? '#fff' : '#64748b',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                {action.icon}
              </div>

              {/* 텍스트 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{action.label}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{action.desc}</div>
              </div>

              {/* 태그 + 단축키 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <LabelBadge color={action.color}>
                  <LabelBadge.Label>{action.tag}</LabelBadge.Label>
                </LabelBadge>
                {action.shortcut && (
                  <kbd style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '20px',
                    height: '20px',
                    padding: '0 5px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#64748b',
                    fontFamily: 'monospace',
                  }}>
                    {action.shortcut}
                  </kbd>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 하단 힌트 */}
      <div style={{
        padding: '8px 16px',
        background: '#f8fafc',
        borderTop: '1px solid #f1f5f9',
        display: 'flex',
        gap: '16px',
      }}>
        {[
          { key: 'Enter', label: '실행' },
          { key: 'Esc', label: '닫기' },
        ].map(({ key, label }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <kbd style={{
              padding: '2px 6px', borderRadius: '4px',
              border: '1px solid #e2e8f0', background: '#fff',
              fontSize: '10px', fontWeight: 700, color: '#64748b', fontFamily: 'monospace',
            }}>{key}</kbd>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Raycast_퀵액션_목록: Story = {
  render: () => <RaycastActionListRender />,
}

/* --------------------------------------------------------------------------
   Apple HIG + Linear 조합: 이슈 우선순위 배지 목록
   Apple HIG의 List 패턴 + Linear의 Priority indicator 조합.
   각 이슈 항목에 우선순위, 상태, 레이블 배지를 복합적으로 표시합니다.
-------------------------------------------------------------------------- */
export const Apple_HIG_이슈_우선순위_목록: Story = {
  render: () => {
    const issues: Array<{
      id: string
      title: string
      priority: string
      status: 'benefit' | 'gray' | 'sale'
      statusLabel: string
      label: string
      labelColor: 'gray' | 'benefit' | 'sale'
      dot: string
    }> = [
      { id: 'ORB-101', title: 'DataTable 정렬 버그 수정', priority: 'Urgent', status: 'sale', statusLabel: 'In Progress', label: 'Bug', labelColor: 'sale', dot: '#ef4444' },
      { id: 'ORB-102', title: 'Dark mode 토큰 보완', priority: 'High', status: 'benefit', statusLabel: 'In Review', label: 'Enhancement', labelColor: 'benefit', dot: '#f59e0b' },
      { id: 'ORB-103', title: 'LabelBadge 접근성 개선', priority: 'Medium', status: 'gray', statusLabel: 'Todo', label: 'A11y', labelColor: 'gray', dot: '#6366f1' },
      { id: 'ORB-104', title: 'CommandPalette 키보드 내비게이션', priority: 'Medium', status: 'gray', statusLabel: 'Todo', label: 'Feature', labelColor: 'gray', dot: '#6366f1' },
      { id: 'ORB-105', title: 'Progress 애니메이션 성능 최적화', priority: 'Low', status: 'benefit', statusLabel: 'Done', label: 'Perf', labelColor: 'benefit', dot: '#10b981' },
    ]

    return (
      <div style={{ maxWidth: '560px', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{
          padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Issues</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '18px', height: '18px', borderRadius: '50%',
            background: '#6366f1', color: '#fff', fontSize: '10px', fontWeight: 700,
          }}>
            {issues.length}
          </span>
        </div>
        {issues.map((issue, i) => (
          <div
            key={issue.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderBottom: i < issues.length - 1 ? '1px solid #f8fafc' : 'none',
            }}
          >
            {/* 우선순위 dot */}
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: issue.dot, flexShrink: 0 }} />

            {/* ID + Title */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', fontFamily: 'monospace' }}>
                  {issue.id}
                </span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {issue.title}
              </div>
            </div>

            {/* 배지 그룹 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <LabelBadge color={issue.labelColor}>
                <LabelBadge.Label>{issue.label}</LabelBadge.Label>
              </LabelBadge>
              <LabelBadge color={issue.status}>
                <LabelBadge.Label>{issue.statusLabel}</LabelBadge.Label>
              </LabelBadge>
            </div>
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 뱃지 그룹 상태 대시보드
   MUI Badge + Chip 조합 패턴 — 서비스 상태를 LabelBadge로 시각화
-------------------------------------------------------------------------- */

const MUI_SERVICES = [
  { name: 'API Gateway', status: 'benefit' as const, uptime: '99.98%', latency: '12ms', region: 'ap-northeast-2' },
  { name: 'Database (RDS)', status: 'benefit' as const, uptime: '99.95%', latency: '4ms', region: 'ap-northeast-2' },
  { name: 'CDN', status: 'sale' as const, uptime: '97.20%', latency: '89ms', region: 'global' },
  { name: 'Auth Service', status: 'benefit' as const, uptime: '99.99%', latency: '8ms', region: 'ap-northeast-2' },
  { name: 'Cache (Redis)', status: 'gray' as const, uptime: 'N/A', latency: 'N/A', region: 'ap-northeast-2' },
]

const STATUS_LABEL: Record<'benefit' | 'sale' | 'gray', string> = {
  benefit: '정상',
  sale: '지연',
  gray: '점검',
}

export const MUI_서비스_상태_대시보드: Story = {
  name: 'MUI - 서비스 상태 배지 대시보드 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Badge 상태 표시 패턴. LabelBadge color를 benefit(정상)/sale(지연)/gray(점검)로 ' +
          '매핑해 서비스 상태를 시각화합니다. 각 서비스의 가동률과 레이턴시를 함께 표시합니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>서비스 상태 (MUI Badge 패턴)</div>
      {MUI_SERVICES.map((svc) => (
        <div key={svc.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fff' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 2 }}>{svc.name}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{svc.region}</div>
          </div>
          <div style={{ textAlign: 'right', marginRight: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{svc.uptime}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{svc.latency}</div>
          </div>
          <LabelBadge color={svc.status}>
            <LabelBadge.Visual>
              <StarFillIcon />
            </LabelBadge.Visual>
            <LabelBadge.Label>{STATUS_LABEL[svc.status]}</LabelBadge.Label>
          </LabelBadge>
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 알림 유형 분류 배지
   Chakra Badge colorScheme 패턴 — 알림 종류별 LabelBadge + 읽음 상태 관리
-------------------------------------------------------------------------- */
type NotifItem = { id: number; title: string; desc: string; type: 'benefit' | 'sale' | 'gray'; time: string; read: boolean }

function ChakraNotifBadgeRender() {
  const [notifs, setNotifs] = useState<NotifItem[]>([
    { id: 1, title: '배포 완료', desc: 'production 브랜치 배포가 성공적으로 완료되었습니다.', type: 'benefit', time: '5분 전', read: false },
    { id: 2, title: '빌드 실패', desc: 'main 브랜치 PR #143 빌드가 실패했습니다.', type: 'sale', time: '23분 전', read: false },
    { id: 3, title: '정기 점검', desc: '2026-04-15 02:00 ~ 04:00 서버 점검이 예정되어 있습니다.', type: 'gray', time: '2시간 전', read: true },
    { id: 4, title: '보안 업데이트', desc: '중요 보안 패치가 적용되었습니다. 즉시 재시작이 필요합니다.', type: 'benefit', time: '3시간 전', read: false },
  ])

  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))

  const unreadCount = notifs.filter((n) => !n.read).length
  const TYPE_LABEL: Record<NotifItem['type'], string> = { benefit: '성공', sale: '오류', gray: '정보' }

  return (
    <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>알림</span>
          {unreadCount > 0 && (
            <LabelBadge color="sale">
              <LabelBadge.Label>{unreadCount}</LabelBadge.Label>
            </LabelBadge>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#6366f1', fontWeight: 600 }}>모두 읽음</button>
        )}
      </div>
      {notifs.map((notif) => (
        <div
          key={notif.id}
          onClick={() => markRead(notif.id)}
          style={{
            padding: '12px 14px',
            borderRadius: 10,
            border: `1.5px solid ${notif.read ? '#f1f5f9' : '#e0e7ff'}`,
            background: notif.read ? '#fff' : '#f5f3ff',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {!notif.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />}
              <span style={{ fontSize: 13, fontWeight: notif.read ? 500 : 700, color: '#1e293b' }}>{notif.title}</span>
            </div>
            <LabelBadge color={notif.type}>
              <LabelBadge.Label>{TYPE_LABEL[notif.type]}</LabelBadge.Label>
            </LabelBadge>
          </div>
          <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, marginBottom: 4, paddingLeft: notif.read ? 0 : 14 }}>{notif.desc}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', paddingLeft: notif.read ? 0 : 14 }}>{notif.time}</div>
        </div>
      ))}
    </div>
  )
}

export const Chakra_알림_유형_배지: Story = {
  name: 'Chakra UI - 알림 유형 분류 배지 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Badge colorScheme 패턴. LabelBadge color(benefit/sale/gray)로 알림 유형을 분류합니다. ' +
          '읽지 않은 알림에 보라색 도트를 표시하고 클릭 시 읽음 처리합니다.',
      },
    },
  },
  render: () => <ChakraNotifBadgeRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 카테고리 멀티 배지 필터
   Chakra의 Wrap + Badge 패턴 — 선택한 카테고리를 배지로 표시하는 필터 UI
-------------------------------------------------------------------------- */
const CHAKRA_CATEGORIES = [
  { id: 'design', label: 'Design', color: 'benefit' as const },
  { id: 'frontend', label: 'Frontend', color: 'benefit' as const },
  { id: 'backend', label: 'Backend', color: 'gray' as const },
  { id: 'devops', label: 'DevOps', color: 'gray' as const },
  { id: 'security', label: 'Security', color: 'sale' as const },
  { id: 'data', label: 'Data', color: 'gray' as const },
  { id: 'mobile', label: 'Mobile', color: 'benefit' as const },
  { id: 'ai', label: 'AI/ML', color: 'sale' as const },
]

const CHAKRA_ARTICLES = [
  { title: 'React 18 Concurrent Features', cats: ['frontend'] },
  { title: 'Figma Auto Layout 심화', cats: ['design'] },
  { title: 'Terraform으로 AWS 인프라 관리', cats: ['devops', 'backend'] },
  { title: 'OWASP Top 10 실전 방어', cats: ['security', 'backend'] },
  { title: 'LLM Fine-tuning 가이드', cats: ['ai'] },
  { title: 'Flutter vs React Native 2026', cats: ['mobile', 'frontend'] },
]

function ChakraCategoryBadgeFilterRender() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const filtered = selected.size === 0
    ? CHAKRA_ARTICLES
    : CHAKRA_ARTICLES.filter((a) => a.cats.some((c) => selected.has(c)))

  return (
    <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>카테고리 배지 필터 (Chakra Wrap + Badge)</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {CHAKRA_CATEGORIES.map((cat) => {
          const isOn = selected.has(cat.id)
          return (
            <div
              key={cat.id}
              onClick={() => toggle(cat.id)}
              style={{ cursor: 'pointer', opacity: !isOn && selected.size > 0 ? 0.5 : 1, transform: isOn ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.15s' }}
            >
              <LabelBadge color={isOn ? cat.color : 'gray'}>
                {isOn && (
                  <LabelBadge.Visual>
                    <CheckIcon />
                  </LabelBadge.Visual>
                )}
                <LabelBadge.Label>{cat.label}</LabelBadge.Label>
              </LabelBadge>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map((article) => (
          <div key={article.title} style={{ padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{article.title}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {article.cats.map((c) => {
                const cat = CHAKRA_CATEGORIES.find((x) => x.id === c)
                return cat ? (
                  <LabelBadge key={c} color={cat.color}>
                    <LabelBadge.Label>{cat.label}</LabelBadge.Label>
                  </LabelBadge>
                ) : null
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Chakra_카테고리_멀티_배지_필터: Story = {
  name: 'Chakra UI - 카테고리 멀티 배지 필터 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Wrap + Badge 패턴. LabelBadge를 클릭 가능한 필터로 활용합니다. ' +
          '선택한 카테고리에 해당하는 아티클만 필터링하여 보여주는 실무 패턴입니다.',
      },
    },
  },
  render: () => <ChakraCategoryBadgeFilterRender />,
}

const LINEAR_ISSUE_STATUS = [
  { id: 'backlog', label: 'Backlog', color: 'gray' as const },
  { id: 'todo', label: 'Todo', color: 'gray' as const },
  { id: 'inprogress', label: 'In Progress', color: 'benefit' as const },
  { id: 'done', label: 'Done', color: 'benefit' as const },
  { id: 'cancelled', label: 'Cancelled', color: 'gray' as const },
]

const LINEAR_ISSUES_DATA = [
  { id: 'ENG-101', title: '버튼 컴포넌트 호버 상태 수정', status: 'inprogress', priority: 'high' },
  { id: 'ENG-102', title: 'DataTable 정렬 버그 수정', status: 'todo', priority: 'urgent' },
  { id: 'ENG-103', title: 'Toast 자동 닫힘 타이밍 조정', status: 'done', priority: 'medium' },
  { id: 'ENG-104', title: '다크모드 색상 토큰 적용', status: 'backlog', priority: 'low' },
  { id: 'ENG-105', title: '접근성 키보드 탐색 개선', status: 'inprogress', priority: 'high' },
]

const PRIORITY_META: Record<string, { label: string; color: 'sale' | 'benefit' | 'gray' }> = {
  urgent: { label: 'Urgent', color: 'sale' },
  high: { label: 'High', color: 'benefit' },
  medium: { label: 'Medium', color: 'gray' },
  low: { label: 'Low', color: 'gray' },
}

const LinearIssueStatusBadgeRender = () => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filtered = LINEAR_ISSUES_DATA.filter(i => filterStatus === null || i.status === filterStatus)

  return (
    <div style={{ width: 440, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        <button
          onClick={() => setFilterStatus(null)}
          style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: filterStatus === null ? '#111' : '#fff', color: filterStatus === null ? '#fff' : '#6b7280', cursor: 'pointer', fontWeight: 600 }}
        >
          전체
        </button>
        {LINEAR_ISSUE_STATUS.map(s => (
          <button
            key={s.id}
            onClick={() => setFilterStatus(filterStatus === s.id ? null : s.id)}
            style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: filterStatus === s.id ? '#111' : '#fff', color: filterStatus === s.id ? '#fff' : '#6b7280', cursor: 'pointer' }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {filtered.map(issue => {
          const statusMeta = LINEAR_ISSUE_STATUS.find(s => s.id === issue.status)
          const priorityMeta = PRIORITY_META[issue.priority]
          return (
            <div key={issue.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: '#f9fafb', border: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#9ca3af', flexShrink: 0 }}>{issue.id}</span>
              <span style={{ flex: 1, fontSize: 13, color: '#111', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{issue.title}</span>
              <LabelBadge color={priorityMeta.color}>
                <LabelBadge.Label>{priorityMeta.label}</LabelBadge.Label>
              </LabelBadge>
              <LabelBadge color={statusMeta?.color ?? 'gray'}>
                <LabelBadge.Label>{statusMeta?.label ?? issue.status}</LabelBadge.Label>
              </LabelBadge>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#9ca3af' }}>Linear 이슈 상태 + 우선순위 배지 패턴</div>
    </div>
  )
}

export const Linear_이슈_상태_우선순위_배지: Story = {
  name: 'Linear - 이슈 상태 + 우선순위 배지 필터 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Linear 이슈 목록의 상태(Backlog/Todo/In Progress/Done)와 우선순위(Urgent/High/Medium/Low) 배지 패턴. 필터 버튼으로 상태별 이슈를 필터링하며 LabelBadge 색상으로 중요도를 시각화합니다.',
      },
    },
  },
  render: () => <LinearIssueStatusBadgeRender />,
}

const ARCO_TECH_TAGS = [
  { id: 'react', label: 'React', group: 'frontend' },
  { id: 'vue', label: 'Vue', group: 'frontend' },
  { id: 'angular', label: 'Angular', group: 'frontend' },
  { id: 'node', label: 'Node.js', group: 'backend' },
  { id: 'python', label: 'Python', group: 'backend' },
  { id: 'go', label: 'Go', group: 'backend' },
  { id: 'mysql', label: 'MySQL', group: 'database' },
  { id: 'redis', label: 'Redis', group: 'database' },
]

const ARCO_GROUP_COLOR: Record<string, 'gray' | 'benefit' | 'sale'> = {
  frontend: 'benefit',
  backend: 'sale',
  database: 'gray',
}

const ArcoTagGroupRender = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(['react', 'node']))

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const groups = ['frontend', 'backend', 'database']

  return (
    <div style={{ width: 380, fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px', background: '#fff' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 12 }}>기술 스택 선택</div>
      {groups.map(group => (
        <div key={group} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{group}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {ARCO_TECH_TAGS.filter(t => t.group === group).map(tag => (
              <div
                key={tag.id}
                onClick={() => toggle(tag.id)}
                style={{ cursor: 'pointer', opacity: selected.has(tag.id) ? 1 : 0.4, transition: 'opacity 0.15s', transform: selected.has(tag.id) ? 'scale(1.05)' : 'scale(1)', display: 'inline-block' }}
              >
                <LabelBadge color={ARCO_GROUP_COLOR[group]}>
                  <LabelBadge.Label>{tag.label}</LabelBadge.Label>
                </LabelBadge>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 8, fontSize: 11, color: '#9ca3af' }}>
        {selected.size}개 선택됨 — Arco Design Tag Group 패턴
      </div>
    </div>
  )
}

export const Arco_기술스택_태그_그룹: Story = {
  name: 'Arco Design - 기술 스택 태그 그룹 선택 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Arco Design Tag Group 패턴. Frontend/Backend/Database 카테고리별로 기술 스택 LabelBadge를 그룹핑하고 클릭 선택/해제를 지원합니다. 선택 상태는 opacity와 scale 트랜지션으로 시각화합니다.',
      },
    },
  },
  render: () => <ArcoTagGroupRender />,
}

const LINEAR_PROJECT_HEALTH = [
  { id: 'p1', name: 'Eclipse Theme v2', health: 'on_track', progress: 72, lead: 'HJ', color: '#7c3aed' },
  { id: 'p2', name: 'Core Components', health: 'at_risk', progress: 43, lead: 'SJ', color: '#ef4444' },
  { id: 'p3', name: 'Storybook 고도화', health: 'on_track', progress: 91, lead: 'MJ', color: '#10b981' },
  { id: 'p4', name: 'Design Token 정리', health: 'off_track', progress: 18, lead: 'YH', color: '#f59e0b' },
]

const HEALTH_BADGE: Record<string, { label: string; color: 'sale' | 'benefit' | 'gray' }> = {
  on_track: { label: 'On Track', color: 'benefit' },
  at_risk: { label: 'At Risk', color: 'sale' },
  off_track: { label: 'Off Track', color: 'gray' },
}

const LinearProjectHealthRender = () => (
  <div style={{ width: 400, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>프로젝트 헬스</div>
    {LINEAR_PROJECT_HEALTH.map(proj => {
      const health = HEALTH_BADGE[proj.health]
      return (
        <div key={proj.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid #f0f0f0', background: '#fff' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: proj.color, flexShrink: 0 }} />
          <span style={{ flex: 1, fontSize: 13, color: '#111', fontWeight: 500 }}>{proj.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 60, height: 4, borderRadius: 2, background: '#f0f0f0', overflow: 'hidden' }}>
              <div style={{ width: `${proj.progress}%`, height: '100%', background: proj.color, transition: 'width 0.3s' }} />
            </div>
            <span style={{ fontSize: 10, color: '#9ca3af', minWidth: 28 }}>{proj.progress}%</span>
          </div>
          <LabelBadge color={health.color}>
            <LabelBadge.Label>{health.label}</LabelBadge.Label>
          </LabelBadge>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: proj.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: proj.color }}>{proj.lead}</div>
        </div>
      )
    })}
    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Linear 프로젝트 헬스 배지 패턴</div>
  </div>
)

export const Linear_프로젝트_헬스_대시보드: Story = {
  name: 'Linear - 프로젝트 헬스 대시보드 배지',
  parameters: {
    docs: {
      description: {
        story: 'Linear 프로젝트 상태 대시보드 패턴. On Track/At Risk/Off Track 헬스를 LabelBadge로 표시하고, 진행률 바와 담당자 아바타를 함께 배치합니다. 각 프로젝트의 건강 상태를 한눈에 파악할 수 있는 복합 UI입니다.',
      },
    },
  },
  render: () => <LinearProjectHealthRender />,
}

/* --------------------------------------------------------------------------
   Linear Design 벤치마크: 사이클 스프린트 진행상태 배지 시스템
   Linear Cycle 배지 — 스프린트 상태(진행중/완료/취소) 인라인 표시
-------------------------------------------------------------------------- */
const SPRINT_CYCLES = [
  { id: 1, name: 'Cycle 24', items: 12, done: 12, status: 'completed' as const },
  { id: 2, name: 'Cycle 25', items: 18, done: 14, status: 'active' as const },
  { id: 3, name: 'Cycle 26', items: 8, done: 0, status: 'upcoming' as const },
  { id: 4, name: 'Cycle 27', items: 0, done: 0, status: 'draft' as const },
]

const CYCLE_BADGE: Record<string, { label: string; color: 'gray' | 'benefit' | 'sale' }> = {
  completed: { label: 'Completed', color: 'benefit' },
  active: { label: 'Active', color: 'gray' },
  upcoming: { label: 'Upcoming', color: 'gray' },
  draft: { label: 'Draft', color: 'gray' },
}

export const Linear_스프린트_사이클_배지: Story = {
  name: 'Linear Design - 스프린트 사이클 배지 시스템',
  parameters: {
    docs: {
      description: {
        story:
          'Linear Design 사이클(스프린트) 상태 배지 패턴. Completed/Active/Upcoming/Draft 4단계 상태를 ' +
          '색상 코드된 LabelBadge로 구분하고, 진행률 바와 조합해 대시보드형 스프린트 현황을 제공합니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 380, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
        스프린트 사이클
      </div>
      {SPRINT_CYCLES.map(cycle => {
        const badge = CYCLE_BADGE[cycle.status]
        const pct = cycle.items > 0 ? Math.round((cycle.done / cycle.items) * 100) : 0
        return (
          <div key={cycle.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, border: '1px solid #f0f0f0', background: '#fff' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111', flex: 1 }}>{cycle.name}</span>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>{cycle.done}/{cycle.items}</span>
            {cycle.items > 0 && (
              <div style={{ width: 48, height: 4, borderRadius: 2, background: '#f0f0f0', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: cycle.status === 'completed' ? '#22c55e' : '#3b82f6' }} />
              </div>
            )}
            <LabelBadge color={badge.color}>
              <LabelBadge.Label>{badge.label}</LabelBadge.Label>
            </LabelBadge>
          </div>
        )
      })}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Vercel Design 벤치마크: 배포 체크 상태 배지 목록
   Vercel Checks 패턴 — CI 체크 항목별 상태 배지 열거
-------------------------------------------------------------------------- */
const VERCEL_CHECKS = [
  { name: 'pnpm typecheck', status: 'pass' as const, duration: '12s' },
  { name: 'pnpm test', status: 'pass' as const, duration: '38s' },
  { name: 'pnpm lint', status: 'fail' as const, duration: '7s' },
  { name: 'pnpm build', status: 'running' as const, duration: '—' },
  { name: 'E2E Tests', status: 'skipped' as const, duration: '—' },
]

const CHECK_BADGE: Record<string, { label: string; color: 'gray' | 'benefit' | 'sale' }> = {
  pass: { label: 'Pass', color: 'benefit' },
  fail: { label: 'Fail', color: 'sale' },
  running: { label: 'Running', color: 'gray' },
  skipped: { label: 'Skipped', color: 'gray' },
}

export const Vercel_CI_체크_상태_배지_목록: Story = {
  name: 'Vercel Design - CI 체크 상태 배지 목록',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Deployment Checks 패턴. CI 파이프라인 각 단계(typecheck/test/lint/build/e2e)의 ' +
          '실행 결과를 Pass/Fail/Running/Skipped 배지로 구분합니다. 실패 항목은 눈에 띄게 강조됩니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 340, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 12, fontWeight: 700, color: '#475569' }}>
        배포 체크
      </div>
      {VERCEL_CHECKS.map((check, i) => {
        const badge = CHECK_BADGE[check.status]
        return (
          <div key={check.name} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
            borderBottom: i < VERCEL_CHECKS.length - 1 ? '1px solid #f8fafc' : 'none',
            background: check.status === 'fail' ? '#fef2f2' : '#fff',
          }}>
            <span style={{ fontSize: 13, color: '#1e293b', flex: 1 }}>{check.name}</span>
            <span style={{ fontSize: 11, color: '#94a3b8', minWidth: 28 }}>{check.duration}</span>
            <LabelBadge color={badge.color}>
              <LabelBadge.Label>{badge.label}</LabelBadge.Label>
            </LabelBadge>
          </div>
        )
      })}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Linear + Vercel 복합: 릴리즈 노트 배지 그룹 패턴
   커밋 유형(feat/fix/docs/chore) + 영향도(breaking/minor/patch) 배지 조합
-------------------------------------------------------------------------- */
const RELEASE_ITEMS = [
  { commit: 'feat(stories): Cycle 127 스토리 추가', type: 'feat', impact: 'minor' },
  { commit: 'fix(toast): 타입 에러 수정', type: 'fix', impact: 'patch' },
  { commit: 'docs(benchmark): 분석 기록 업데이트', type: 'docs', impact: 'patch' },
  { commit: 'feat(template): 커맨드팔레트 신규', type: 'feat', impact: 'minor' },
  { commit: 'chore: pnpm lock 업데이트', type: 'chore', impact: 'patch' },
]

const TYPE_BADGE: Record<string, { label: string; color: 'gray' | 'benefit' | 'sale' }> = {
  feat: { label: 'feat', color: 'gray' },
  fix: { label: 'fix', color: 'sale' },
  docs: { label: 'docs', color: 'gray' },
  chore: { label: 'chore', color: 'gray' },
}

const IMPACT_BADGE: Record<string, { label: string; color: 'gray' | 'benefit' | 'sale' }> = {
  minor: { label: 'minor', color: 'gray' },
  patch: { label: 'patch', color: 'benefit' },
  breaking: { label: 'breaking', color: 'sale' },
}

export const Linear_Vercel_릴리즈_노트_배지: Story = {
  name: 'Linear + Vercel - 릴리즈 노트 커밋 배지 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear changelog + Vercel release 복합 배지 패턴. 커밋 유형(feat/fix/docs/chore)과 ' +
          '영향도(minor/patch/breaking) 두 가지 배지를 조합해 릴리즈 노트의 각 항목을 시각적으로 분류합니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 420, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 12, fontWeight: 700, color: '#475569' }}>
        릴리즈 노트 — v2.0.1
      </div>
      {RELEASE_ITEMS.map((item, i) => {
        const tb = TYPE_BADGE[item.type]
        const ib = IMPACT_BADGE[item.impact]
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderBottom: i < RELEASE_ITEMS.length - 1 ? '1px solid #f8fafc' : 'none' }}>
            <LabelBadge color={tb.color}><LabelBadge.Label>{tb.label}</LabelBadge.Label></LabelBadge>
            <span style={{ flex: 1, fontSize: 12, color: '#1e293b', fontFamily: 'monospace' }}>{item.commit}</span>
            <LabelBadge color={ib.color}><LabelBadge.Label>{ib.label}</LabelBadge.Label></LabelBadge>
          </div>
        )
      })}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Cycle 158 — Radix UI + Tailwind UI
   Radix: 콘텐츠 상태 배지 그룹 패턴 (Content Status Badges)
-------------------------------------------------------------------------- */
const RADIX_CONTENT_ITEMS = [
  { title: 'Dialog 컴포넌트', status: 'sale', label: 'NEW' },
  { title: 'Popover 컴포넌트', status: 'benefit', label: 'PRO' },
  { title: 'Tooltip 컴포넌트', status: 'gray', label: 'STABLE' },
  { title: 'DropdownMenu', status: 'sale', label: 'UPDATED' },
  { title: 'AlertDialog', status: 'gray', label: 'STABLE' },
  { title: 'ContextMenu', status: 'benefit', label: 'BETA' },
] as const

function RadixContentStatusRender() {
  return (
    <div style={{ width: 320, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Radix UI — 컴포넌트 상태 배지</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {RADIX_CONTENT_ITEMS.map(item => (
          <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fff' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.status === 'sale' ? '#ef4444' : item.status === 'benefit' ? '#6366f1' : '#94a3b8', flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{item.title}</span>
            <LabelBadge color={item.status}>
              <LabelBadge.Label>{item.label}</LabelBadge.Label>
            </LabelBadge>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Radix_컴포넌트_상태_배지: Story = {
  name: 'Radix UI — 컴포넌트 상태 배지 목록 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI 컴포넌트 목록 스타일. LabelBadge로 NEW/PRO/STABLE/UPDATED/BETA 상태를 색상 코딩하여 표시합니다.',
      },
    },
  },
  render: () => <RadixContentStatusRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI: 제품 카드 프로모션 배지 패턴
-------------------------------------------------------------------------- */
const TAILWIND_PRODUCTS = [
  { name: 'Starter Kit', price: '무료', badge: 'FREE', color: 'gray' as const, desc: '개인 프로젝트용 기본 스타터' },
  { name: 'Pro Bundle', price: '₩29,000/월', badge: 'SALE', color: 'sale' as const, desc: '팀 전용 Pro 컴포넌트 포함' },
  { name: 'Enterprise', price: '문의', badge: '혜택', color: 'benefit' as const, desc: '무제한 라이선스 + 전용 지원' },
]

function TailwindProductBadgeRender() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Tailwind UI 제품 카드 배지</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TAILWIND_PRODUCTS.map(product => (
          <div
            key={product.name}
            onClick={() => setSelected(product.name === selected ? null : product.name)}
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              border: `1.5px solid ${selected === product.name ? '#6366f1' : '#e2e8f0'}`,
              background: selected === product.name ? '#f5f3ff' : '#fff',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{product.name}</span>
              <LabelBadge color={product.color}>
                <LabelBadge.Label>{product.badge}</LabelBadge.Label>
              </LabelBadge>
              <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: '#6366f1' }}>{product.price}</span>
            </div>
            <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{product.desc}</p>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ marginTop: 12, padding: '8px 14px', borderRadius: 8, background: '#f0eeff', fontSize: 11, color: '#6366f1', fontWeight: 600 }}>
          선택: {selected}
        </div>
      )}
    </div>
  )
}

export const Tailwind_제품_프로모션_배지: Story = {
  name: 'Tailwind UI — 제품 카드 프로모션 배지 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI의 Pricing Card 패턴. LabelBadge로 FREE/SALE/혜택 뱃지를 카드 헤더에 배치해 프로모션 정보를 강조합니다.',
      },
    },
  },
  render: () => <TailwindProductBadgeRender />,
}

/* --------------------------------------------------------------------------
   Radix + Tailwind: PR 리뷰 상태 배지 대시보드 패턴
-------------------------------------------------------------------------- */
const PR_REVIEWS = [
  { pr: '#1241', title: 'BoxedCheckbox 접근성', reviewer: 'AK', status: 'APPROVED', color: 'benefit' as const, time: '5분 전' },
  { pr: '#1242', title: 'SpeechBadge 다크모드', reviewer: 'SJ', status: 'REVIEW', color: 'sale' as const, time: '12분 전' },
  { pr: '#1243', title: 'Tooltip 애니메이션', reviewer: 'MH', status: 'WIP', color: 'gray' as const, time: '1시간 전' },
  { pr: '#1244', title: 'Token 정리', reviewer: 'AK', status: 'MERGED', color: 'benefit' as const, time: '2시간 전' },
]

function RadixTailwindPRDashboardRender() {
  const [filter, setFilter] = useState<string | null>(null)
  const filtered = filter ? PR_REVIEWS.filter(p => p.status === filter) : PR_REVIEWS

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>PR 리뷰 현황</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>{PR_REVIEWS.length}개</span>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {['APPROVED', 'REVIEW', 'WIP', 'MERGED'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(filter === s ? null : s)}
            style={{ padding: '4px 8px', borderRadius: 6, border: `1px solid ${filter === s ? '#6366f1' : '#e2e8f0'}`, background: filter === s ? '#f0eeff' : '#fff', fontSize: 11, fontWeight: filter === s ? 700 : 400, color: filter === s ? '#6366f1' : '#64748b', cursor: 'pointer' }}
          >
            {s}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map(pr => (
          <div key={pr.pr} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fff' }}>
            <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', flexShrink: 0 }}>{pr.pr}</span>
            <span style={{ flex: 1, fontSize: 12, color: '#1e293b', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pr.title}</span>
            <LabelBadge color={pr.color}>
              <LabelBadge.Label>{pr.status}</LabelBadge.Label>
            </LabelBadge>
            <span style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>{pr.time}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 14, textAlign: 'center', fontSize: 11, color: '#94a3b8', background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0' }}>해당 상태 없음</div>
        )}
      </div>
    </div>
  )
}

export const Radix_Tailwind_PR_리뷰_배지_대시보드: Story = {
  name: 'Radix + Tailwind UI — PR 리뷰 상태 배지 대시보드 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Radix + Tailwind UI 복합 패턴. LabelBadge로 PR 리뷰 상태(APPROVED/REVIEW/WIP/MERGED)를 시각화하고 상태별 필터링을 제공합니다.',
      },
    },
  },
  render: () => <RadixTailwindPRDashboardRender />,
}
