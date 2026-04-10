import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { EclipseProvider } from './EclipseProvider'
import { SolidButton } from '../SolidButton'
import { OutlineButton } from '../OutlineButton'
import { GhostButton } from '../GhostButton'
import { Typography } from '../Text'
import { TextField } from '../TextField'
import { Toggle } from '../Toggle'
import { Switch } from '../Switch'
import { CounterBadge } from '../CounterBadge'
import { LabelBadge } from '../LabelBadge'
import { Avatar } from '../Avatar'
import { Divider } from '../Divider'

const meta = {
  title: 'eclipse/EclipseProvider',
  component: EclipseProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EclipseProvider>

export default meta
type Story = StoryObj<typeof meta>

/* --------------------------------------------------------------------------
   기본 사용법 — 라이트 모드
   EclipseProvider로 래핑하면 아래 모든 컴포넌트에 토큰이 적용됩니다.
-------------------------------------------------------------------------- */
export const 라이트모드: Story = {
  render: () => (
    <EclipseProvider mode="light">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '320px', padding: '24px' }}>
        <Typography textStyle="subheadingSmall">라이트 모드 기본 컴포넌트</Typography>
        <TextField placeholder="이름을 입력하세요" />
        <div style={{ display: 'flex', gap: '8px' }}>
          <SolidButton color="primary" size="medium">
            <SolidButton.Center>저장</SolidButton.Center>
          </SolidButton>
          <OutlineButton color="black" size="medium">
            <OutlineButton.Center>취소</OutlineButton.Center>
          </OutlineButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Toggle />
          <Typography textStyle="descriptionLarge">알림 수신</Typography>
        </div>
      </div>
    </EclipseProvider>
  ),
}

/* --------------------------------------------------------------------------
   다크 모드 — Radix UI darkTheme 패턴
   mode="dark"로 전환하면 모든 컴포넌트가 다크 토큰을 사용합니다.
-------------------------------------------------------------------------- */
export const 다크모드: Story = {
  render: () => (
    <EclipseProvider mode="dark">
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '20px',
        width: '320px', padding: '24px',
        background: '#0f172a', borderRadius: '12px',
      }}>
        <Typography textStyle="subheadingSmall">다크 모드 기본 컴포넌트</Typography>
        <TextField placeholder="이름을 입력하세요" />
        <div style={{ display: 'flex', gap: '8px' }}>
          <SolidButton color="primary" size="medium">
            <SolidButton.Center>저장</SolidButton.Center>
          </SolidButton>
          <OutlineButton color="black" size="medium">
            <OutlineButton.Center>취소</OutlineButton.Center>
          </OutlineButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Toggle defaultChecked />
          <Typography textStyle="descriptionLarge">알림 수신</Typography>
        </div>
      </div>
    </EclipseProvider>
  ),
}

/* --------------------------------------------------------------------------
   라이트/다크 모드 인터랙티브 전환 데모
   실제 앱에서 사용자가 테마를 전환하는 시나리오를 데모합니다.
-------------------------------------------------------------------------- */
const ThemeSwitcherRender = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const isDark = mode === 'dark'

  return (
    <div style={{
      padding: '32px',
      background: isDark ? '#0f172a' : '#f8fafc',
      borderRadius: '16px',
      transition: 'background 0.3s ease',
      minWidth: '360px',
    }}>
      <EclipseProvider mode={mode}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography textStyle="subheadingSmall">Orbit UI 테마 전환</Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Typography textStyle="descriptionLarge" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                {isDark ? '다크' : '라이트'}
              </Typography>
              <Switch
                checked={isDark}
                onCheckedChange={(checked) => setMode(checked ? 'dark' : 'light')}
              />
            </div>
          </div>

          <Divider />

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <TextField placeholder="검색어 입력..." />

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <SolidButton color="primary" size="small">
                <SolidButton.Center>Primary</SolidButton.Center>
              </SolidButton>
              <SolidButton color="black" size="small">
                <SolidButton.Center>Black</SolidButton.Center>
              </SolidButton>
              <SolidButton color="gray" size="small">
                <SolidButton.Center>Gray</SolidButton.Center>
              </SolidButton>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <LabelBadge color="benefit">
                <LabelBadge.Label>benefit</LabelBadge.Label>
              </LabelBadge>
              <LabelBadge color="sale">
                <LabelBadge.Label>sale</LabelBadge.Label>
              </LabelBadge>
              <LabelBadge color="gray">
                <LabelBadge.Label>gray</LabelBadge.Label>
              </LabelBadge>
              <CounterBadge>{7}</CounterBadge>
            </div>
          </div>
        </div>
      </EclipseProvider>
    </div>
  )
}

export const 테마전환_인터랙티브: Story = {
  render: () => <ThemeSwitcherRender />,
}

/* --------------------------------------------------------------------------
   baseTextSize 비교 데모
   'small' | 'medium' | 'large' 기준으로 전체 타이포그래피 스케일이 변합니다.
-------------------------------------------------------------------------- */
export const 텍스트크기_스케일: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <EclipseProvider key={size} mode="light" baseTextSize={size}>
          <div style={{
            padding: '20px', borderRadius: '12px',
            border: '1px solid #e2e8f0', background: '#fff',
          }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              baseTextSize: {size}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <Typography textStyle="subheadingSmall">서비스 알림 설정</Typography>
              <Typography textStyle="descriptionLarge">마케팅 및 서비스 안내 메일 수신 여부를 설정합니다.</Typography>
              <Typography textStyle="descriptionSmall">언제든지 설정을 변경할 수 있습니다.</Typography>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <SolidButton color="primary" size="medium">
                <SolidButton.Center>저장</SolidButton.Center>
              </SolidButton>
              <GhostButton color="black" size="large">
                취소
              </GhostButton>
            </div>
          </div>
        </EclipseProvider>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   platform 모드 비교 데모
   'mobile' vs 'pc' 플랫폼에 따라 터치 타겟 및 여백이 달라집니다.
-------------------------------------------------------------------------- */
export const 플랫폼_비교: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {(['mobile', 'pc'] as const).map((platform) => (
        <EclipseProvider key={platform} mode="light" platform={platform}>
          <div style={{
            padding: '20px', borderRadius: '12px',
            border: '1px solid #e2e8f0', background: '#fff',
            width: platform === 'mobile' ? '320px' : '480px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              platform: {platform}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextField placeholder="검색어를 입력하세요" />
              <div style={{ display: 'flex', gap: '8px' }}>
                <SolidButton color="primary" size="medium" style={{ flex: 1 }}>
                  <SolidButton.Center>확인</SolidButton.Center>
                </SolidButton>
                <OutlineButton color="black" size="medium" style={{ flex: 1 }}>
                  <OutlineButton.Center>취소</OutlineButton.Center>
                </OutlineButton>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography textStyle="descriptionLarge">알림 설정</Typography>
                <Toggle />
              </div>
            </div>
          </div>
        </EclipseProvider>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   shadcn/ui 패턴: 중첩 Provider 컨텍스트 데모
   여러 섹션에 서로 다른 테마를 적용하는 시나리오를 데모합니다.
   (예: 라이트 메인 + 다크 사이드바)
-------------------------------------------------------------------------- */
export const 중첩_Provider_패턴: Story = {
  render: () => (
    <div style={{ display: 'flex', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', width: '600px' }}>
      {/* Dark sidebar */}
      <EclipseProvider mode="dark">
        <aside style={{
          width: '180px', padding: '20px 16px',
          background: '#0f172a',
          display: 'flex', flexDirection: 'column', gap: '4px',
          borderRight: '1px solid #1e293b',
        }}>
          <Typography textStyle="descriptionSmall" style={{ color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Navigation
          </Typography>
          {['Dashboard', 'Users', 'Settings', 'Billing'].map((item, i) => (
            <GhostButton
              key={item}
              color="black"
              size="small"
              style={{
                width: '100%', justifyContent: 'flex-start', fontWeight: i === 0 ? '600' : '400',
                color: i === 0 ? '#fff' : '#64748b',
                background: i === 0 ? 'rgba(99,102,241,0.2)' : 'transparent',
              }}
            >
              {item}
            </GhostButton>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar style={{ width: '28px', height: '28px' }}>
                <Avatar.Fallback>U</Avatar.Fallback>
              </Avatar>
              <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>user@orbit.io</Typography>
            </div>
          </div>
        </aside>
      </EclipseProvider>

      {/* Light main content */}
      <EclipseProvider mode="light">
        <main style={{ flex: 1, padding: '20px', background: '#fff' }}>
          <Typography textStyle="subheadingSmall" style={{ marginBottom: '16px' }}>Dashboard</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <CounterBadge>{3}</CounterBadge>
              <Typography textStyle="descriptionLarge">미처리 알림</Typography>
            </div>
            <TextField placeholder="빠른 검색..." />
            <div style={{ display: 'flex', gap: '8px' }}>
              <SolidButton color="primary" size="small">
                <SolidButton.Center>새 항목 추가</SolidButton.Center>
              </SolidButton>
              <OutlineButton color="black" size="small">
                <OutlineButton.Center>내보내기</OutlineButton.Center>
              </OutlineButton>
            </div>
          </div>
        </main>
      </EclipseProvider>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Next.js App Router 사용 패턴 데모
   실제 Next.js 앱에서의 EclipseProvider 설정 방법을 시각화합니다.
-------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   Vercel 벤치마크: 다크 대시보드 레이아웃 패턴
   Vercel Dashboard의 어두운 카드 + 모노크롬 팔레트를 EclipseProvider로 구현
-------------------------------------------------------------------------- */
const VercelDarkDashboardRender = () => {
  const metrics = [
    { label: 'Total Deployments', value: '2,847', change: '+12%', up: true },
    { label: 'Error Rate', value: '0.04%', change: '-0.01%', up: false },
    { label: 'Avg. Build Time', value: '42s', change: '-8s', up: false },
    { label: 'Active Users', value: '1,204', change: '+204', up: true },
  ]

  return (
    <EclipseProvider mode="dark">
      <div style={{
        background: '#000',
        borderRadius: 16,
        padding: 24,
        width: 560,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              Vercel Design — Dark Dashboard
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>orbit-ui</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #333', background: '#111', fontSize: 11, color: '#888', cursor: 'pointer' }}>
              Overview
            </div>
            <div style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #333', background: '#111', fontSize: 11, color: '#888', cursor: 'pointer' }}>
              Deployments
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
          {metrics.map((m) => (
            <div key={m.label} style={{
              padding: '16px',
              borderRadius: 10,
              border: '1px solid #222',
              background: '#111',
            }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: m.up ? '#10b981' : '#ef4444' }}>
                {m.change} from last month
              </div>
            </div>
          ))}
        </div>

        {/* Recent deploys */}
        <div style={{ borderRadius: 10, border: '1px solid #222', background: '#111', overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #222', fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Recent Deployments
          </div>
          {[
            { name: 'main', commit: 'feat: add ReviewPortal', status: 'READY', time: '2m ago' },
            { name: 'feat/cycle-54', commit: 'feat: Command stories', status: 'BUILDING', time: '12m ago' },
            { name: 'fix/lint', commit: 'fix: ESLint errors', status: 'READY', time: '1h ago' },
          ].map((deploy, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px',
              borderBottom: i < 2 ? '1px solid #1a1a1a' : 'none',
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                background: deploy.status === 'READY' ? '#10b981' : '#f59e0b',
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{deploy.name}</div>
                <div style={{ fontSize: 11, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deploy.commit}</div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: deploy.status === 'READY' ? '#10b981' : '#f59e0b' }}>
                {deploy.status}
              </div>
              <div style={{ fontSize: 11, color: '#555', marginLeft: 8 }}>{deploy.time}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, fontSize: 11, color: '#444' }}>
          Vercel Design — 모노크롬 다크 팔레트 + 배포 상태 인디케이터 패턴
        </div>
      </div>
    </EclipseProvider>
  )
}

export const Vercel_다크_대시보드: Story = {
  name: 'Vercel Design - 다크 대시보드 레이아웃 패턴',
  render: () => <VercelDarkDashboardRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 시맨틱 토큰 레이어 시각화
   shadcn/ui의 CSS 변수 기반 토큰 시스템을 Orbit UI 토큰으로 대조 표시
-------------------------------------------------------------------------- */
export const shadcn_토큰_레이어_비교: Story = {
  name: 'shadcn/ui - CSS 변수 토큰 레이어 비교',
  render: () => (
    <div style={{ maxWidth: 600, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
        shadcn/ui CSS Variables vs Orbit UI Token System
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* shadcn side */}
        <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', background: '#18181b', borderBottom: '1px solid #333' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>shadcn/ui</span>
            <span style={{ marginLeft: 8, fontSize: 11, color: '#666' }}>globals.css</span>
          </div>
          <div style={{ padding: '12px 14px', background: '#0c0c0c', fontFamily: 'monospace' }}>
            {[
              { name: '--background', value: '0 0% 100%', role: 'bg' },
              { name: '--foreground', value: '222.2 84% 4.9%', role: 'fg' },
              { name: '--primary', value: '222.2 47.4% 11.2%', role: 'accent' },
              { name: '--muted', value: '210 40% 96.1%', role: 'muted' },
              { name: '--border', value: '214.3 31.8% 91.4%', role: 'border' },
            ].map(({ name, value }) => (
              <div key={name} style={{ fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: '#60a5fa' }}>{name}</span>
                <span style={{ color: '#666' }}>: </span>
                <span style={{ color: '#4ade80' }}>{value}</span>
                <span style={{ color: '#666' }}>;</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orbit UI side */}
        <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', background: '#1e293b', borderBottom: '1px solid #334155' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Orbit UI</span>
            <span style={{ marginLeft: 8, fontSize: 11, color: '#64748b' }}>reference-token.ts</span>
          </div>
          <div style={{ padding: '12px 14px', background: '#0f172a', fontFamily: 'monospace' }}>
            {[
              { name: 'colorSlate50', value: '"#f8fafc"', role: 'bg' },
              { name: 'colorSlate950', value: '"#020617"', role: 'fg' },
              { name: 'colorIndigo600', value: '"#4f46e5"', role: 'accent' },
              { name: 'colorSlate100', value: '"#f1f5f9"', role: 'muted' },
              { name: 'colorSlate200', value: '"#e2e8f0"', role: 'border' },
            ].map(({ name, value }) => (
              <div key={name} style={{ fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: '#818cf8' }}>{name}</span>
                <span style={{ color: '#475569' }}>: </span>
                <span style={{ color: '#34d399' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Token mapping table */}
      <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#f8fafc', padding: '8px 14px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e2e8f0' }}>
          <span>역할</span>
          <span>shadcn/ui</span>
          <span>Orbit UI</span>
        </div>
        {[
          { role: '배경', shadcn: '--background', orbit: 'colorSlate50 → surfacePrimary' },
          { role: '전경', shadcn: '--foreground', orbit: 'colorSlate950 → textPrimary' },
          { role: '강조색', shadcn: '--primary', orbit: 'colorIndigo600 → fillPrimary' },
          { role: '보조 배경', shadcn: '--muted', orbit: 'colorSlate100 → surfaceSecondary' },
          { role: '테두리', shadcn: '--border', orbit: 'colorSlate200 → strokeDefault' },
        ].map(({ role, shadcn, orbit }, i) => (
          <div key={role} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '9px 14px', borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none', fontSize: 12, background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
            <span style={{ fontWeight: 600, color: '#1e293b' }}>{role}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#6366f1' }}>{shadcn}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#10b981' }}>{orbit}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
        shadcn/ui CSS 변수 레이어 vs Orbit UI 3단계 토큰 계층 비교
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Vercel 벤치마크: 시스템 테마 자동 감지 패턴
   Vercel Dashboard의 prefers-color-scheme 감지 + 수동 오버라이드 패턴
-------------------------------------------------------------------------- */
const SystemThemeRender = () => {
  const [override, setOverride] = useState<'auto' | 'light' | 'dark'>('auto')
  const [systemPref] = useState<'light' | 'dark'>('light')

  const resolvedMode = override === 'auto' ? systemPref : override

  return (
    <div style={{ maxWidth: 520, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#000', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
        Vercel — 시스템 테마 자동 감지 + 수동 오버라이드 패턴
      </div>

      {/* Theme selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, padding: '12px 16px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginRight: 8, display: 'flex', alignItems: 'center' }}>
          테마 설정:
        </div>
        {(['auto', 'light', 'dark'] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setOverride(opt)}
            style={{
              padding: '5px 12px', borderRadius: 6,
              border: `1.5px solid ${override === opt ? '#6366f1' : '#e2e8f0'}`,
              background: override === opt ? '#f0f1ff' : '#fff',
              color: override === opt ? '#6366f1' : '#64748b',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {opt === 'auto' ? '시스템 자동' : opt === 'light' ? '라이트' : '다크'}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
          시스템: <span style={{ fontWeight: 700, color: '#374151' }}>{systemPref}</span>
          {override === 'auto' && <span style={{ color: '#10b981' }}>(자동 적용 중)</span>}
        </div>
      </div>

      {/* Preview */}
      <EclipseProvider mode={resolvedMode}>
        <div style={{
          borderRadius: 14,
          background: resolvedMode === 'dark' ? '#0f172a' : '#fff',
          border: '1px solid',
          borderColor: resolvedMode === 'dark' ? '#1e293b' : '#e2e8f0',
          overflow: 'hidden',
          transition: 'all 0.25s',
        }}>
          <div style={{
            padding: '12px 16px',
            background: resolvedMode === 'dark' ? '#1e293b' : '#f8fafc',
            borderBottom: `1px solid ${resolvedMode === 'dark' ? '#334155' : '#f1f5f9'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <Typography textStyle="descriptionLarge" style={{ color: resolvedMode === 'dark' ? '#e2e8f0' : '#1e293b', fontWeight: 600 }}>
              설정 패널 미리보기
            </Typography>
            <div style={{
              padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
              background: resolvedMode === 'dark' ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
              color: '#6366f1',
            }}>
              {resolvedMode === 'dark' ? 'DARK' : 'LIGHT'}
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <TextField placeholder="검색어 입력..." />
              <div style={{ display: 'flex', gap: 8 }}>
                <SolidButton color="primary" size="small">
                  <SolidButton.Center>확인</SolidButton.Center>
                </SolidButton>
                <OutlineButton color="black" size="small">
                  <OutlineButton.Center>취소</OutlineButton.Center>
                </OutlineButton>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: resolvedMode === 'dark' ? '#1e293b' : '#f8fafc', border: `1px solid ${resolvedMode === 'dark' ? '#334155' : '#e2e8f0'}` }}>
                <Typography textStyle="descriptionLarge" style={{ color: resolvedMode === 'dark' ? '#e2e8f0' : '#1e293b' }}>
                  다크 모드 알림
                </Typography>
                <Toggle defaultChecked={resolvedMode === 'dark'} />
              </div>
            </div>
          </div>
        </div>
      </EclipseProvider>
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
        Vercel — prefers-color-scheme 자동 감지 + 수동 오버라이드 패턴
      </div>
    </div>
  )
}

export const Vercel_시스템_테마_자동감지: Story = {
  name: 'Vercel Design - 시스템 테마 자동 감지 + 수동 오버라이드',
  render: () => <SystemThemeRender />,
}

export const NextJS_앱_라우터_패턴: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        fontSize: '11px', fontWeight: '700', color: '#6366f1',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px',
      }}>
        Next.js 13+ App Router 설정 가이드
      </div>

      {[
        {
          file: 'app/layout.tsx',
          description: '루트 레이아웃에서 EclipseProvider 적용',
          code: `import { EclipseProvider } from '@heejun-com/theme-eclipse'
import { getTheme } from '@heejun-com/theme-eclipse/server'
import '@heejun-com/theme-eclipse/style.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={getTheme()}>
        <EclipseProvider mode="light" platform="pc">
          {children}
        </EclipseProvider>
      </body>
    </html>
  )
}`,
        },
        {
          file: 'app/providers.tsx (동적 테마)',
          description: '클라이언트 컴포넌트에서 테마 동적 전환',
          code: `'use client'

import { useState } from 'react'
import { EclipseProvider } from '@heejun-com/theme-eclipse'

export function ThemeProviders({
  children
}: {
  children: React.ReactNode
}) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  return (
    <EclipseProvider mode={mode}>
      {children}
    </EclipseProvider>
  )
}`,
        },
      ].map((example) => (
        <div key={example.file} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{
            padding: '8px 16px', background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>{example.file}</span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{example.description}</span>
          </div>
          <pre style={{
            margin: 0, padding: '16px',
            background: '#0f172a', color: '#e2e8f0',
            fontSize: '12px', lineHeight: '1.7',
            fontFamily: '"JetBrains Mono", monospace',
            overflow: 'auto',
          }}>
            {example.code}
          </pre>
        </div>
      ))}
    </div>
  ),
}
