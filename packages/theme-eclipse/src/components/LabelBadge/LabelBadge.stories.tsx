import { StarFillIcon, CheckIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'

import { LabelBadge } from './LabelBadge'

LabelBadge.displayName = 'LabelBadge'

const meta = {
  title: 'eclipse/Data Display/LabelBadge',
  component: LabelBadge,
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
