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
