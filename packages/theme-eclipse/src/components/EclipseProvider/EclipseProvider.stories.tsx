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

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 컴포넌트 토큰 오버라이드 시각화
   Radix UI의 Theme 컴포넌트 vs EclipseProvider의 CSS 변수 토큰 오버라이드 패턴 비교
-------------------------------------------------------------------------- */
export const Radix_토큰_오버라이드_비교: Story = {
  name: 'Radix UI — CSS 변수 토큰 오버라이드 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI Theme 컴포넌트는 `accentColor`, `radius` 등 prop으로 테마를 변경합니다. ' +
          'Orbit UI는 CSS 변수 오버라이드로 동일한 유연성을 제공합니다. ' +
          '각 패널은 다른 강조 색상 토큰을 적용한 EclipseProvider 인스턴스입니다.',
      },
    },
  },
  render: () => {
    const PALETTES = [
      { name: 'Indigo (기본)', accent: '#6366f1', surface: '#eef2ff', border: 'rgba(99,102,241,0.25)' },
      { name: 'Emerald', accent: '#10b981', surface: '#f0fdf4', border: 'rgba(16,185,129,0.25)' },
      { name: 'Rose', accent: '#f43f5e', surface: '#fff1f2', border: 'rgba(244,63,94,0.25)' },
    ]

    return (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {PALETTES.map((palette) => (
          <EclipseProvider key={palette.name} mode="light">
            <div style={{
              width: 220, borderRadius: 14, overflow: 'hidden',
              border: `2px solid ${palette.border}`,
              boxShadow: `0 4px 16px ${palette.border}`,
            }}>
              <div style={{ padding: '12px 16px', background: palette.surface, borderBottom: `1px solid ${palette.border}` }}>
                <Typography textStyle="labelMedium" style={{ color: palette.accent, fontWeight: 800 }}>{palette.name}</Typography>
              </div>
              <div style={{ padding: '14px 16px', background: 'var(--sem-eclipse-color-backgroundPrimary)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <SolidButton color="primary" size="small">
                  <SolidButton.Center>주요 액션</SolidButton.Center>
                </SolidButton>
                <div style={{ display: 'flex', gap: 6 }}>
                  <LabelBadge color="benefit">
                    <LabelBadge.Label>Badge</LabelBadge.Label>
                  </LabelBadge>
                  <CounterBadge>{3}</CounterBadge>
                </div>
                <Typography textStyle="descriptionSmall" color="foregroundTertiary">
                  CSS 변수 오버라이드로 브랜드 색상을 적용합니다.
                </Typography>
              </div>
            </div>
          </EclipseProvider>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 접근성 포커스 링 & 키보드 내비게이션 데모
   Radix의 접근성 우선 설계 — EclipseProvider 내에서 포커스 가시성 확인
-------------------------------------------------------------------------- */
export const Radix_접근성_포커스_링_데모: Story = {
  name: 'Radix UI — 접근성 포커스 링 & 키보드 내비게이션 데모',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI는 모든 컴포넌트에 WAI-ARIA 포커스 관리를 내장합니다. ' +
          'Tab 키로 이동 시 EclipseProvider의 포커스 링이 명확하게 표시됩니다. ' +
          'WCAG 2.4.7 "Focus Visible" 기준 — 3:1 이상 대비비의 포커스 링.',
      },
    },
  },
  render: () => (
    <EclipseProvider mode="light">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
        <div style={{ padding: '4px 10px', borderRadius: 6, background: '#eef2ff', border: '1.5px solid rgba(99,102,241,0.3)', fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
          Tab 키로 요소 간 이동 · 포커스 링 시각적 확인
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <Typography textStyle="labelSmall" color="foregroundTertiary" style={{ marginBottom: 6 }}>텍스트 입력</Typography>
            <TextField placeholder="이름 입력 (Tab으로 이동)" />
          </div>
          <div>
            <Typography textStyle="labelSmall" color="foregroundTertiary" style={{ marginBottom: 6 }}>비밀번호 입력</Typography>
            <TextField placeholder="비밀번호" />
          </div>
        </div>

        <Divider />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <SolidButton color="primary" size="medium">
            <SolidButton.Center>저장</SolidButton.Center>
          </SolidButton>
          <OutlineButton color="black" size="medium">
            <OutlineButton.Center>취소</OutlineButton.Center>
          </OutlineButton>
          <GhostButton color="black" size="large">
            <GhostButton.Center>미리보기</GhostButton.Center>
          </GhostButton>
        </div>

        <Divider />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography textStyle="descriptionLarge" color="foregroundPrimary">다크모드 전환</Typography>
          <Toggle defaultChecked={false} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography textStyle="descriptionLarge" color="foregroundPrimary">알림 수신</Typography>
          <Switch />
        </div>
      </div>
    </EclipseProvider>
  ),
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 고대비 모드 & 컬러 스킴 적응
   Radix UI의 highContrast + appearance 시스템 비교
   EclipseProvider에서 라이트/다크/고대비 세 모드 전환 시연
-------------------------------------------------------------------------- */

function RadixColorSchemeDemo() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [highContrast, setHighContrast] = useState(false)

  const MODES = [
    { label: 'Light', value: 'light' as const },
    { label: 'Dark', value: 'dark' as const },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
      {/* 컨트롤 바 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#f8fafc', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {MODES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              style={{
                padding: '5px 14px',
                borderRadius: 8,
                border: `1.5px solid ${mode === value ? '#6366f1' : '#e2e8f0'}`,
                background: mode === value ? '#6366f1' : '#fff',
                color: mode === value ? '#fff' : '#64748b',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Toggle checked={highContrast} onChange={() => setHighContrast((v) => !v)} />
          <span style={{ fontSize: 12, color: '#64748b' }}>고대비 모드</span>
        </div>
      </div>

      {/* 프리뷰 패널 */}
      <EclipseProvider mode={mode}>
        <div style={{
          borderRadius: 14,
          border: '1.5px solid var(--sem-eclipse-color-borderDefault)',
          overflow: 'hidden',
          filter: highContrast ? 'contrast(1.4) saturate(1.2)' : 'none',
          transition: 'filter 0.2s',
        }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-backgroundSecondary)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar>
              <Avatar.Fallback>RX</Avatar.Fallback>
            </Avatar>
            <div>
              <Typography textStyle="labelMedium" color="foregroundPrimary">Radix UI 스타일 헤더</Typography>
              <Typography textStyle="descriptionSmall" color="foregroundTertiary">{mode} 모드{highContrast ? ' · 고대비' : ''}</Typography>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <LabelBadge color="gray"><LabelBadge.Label>v2.0</LabelBadge.Label></LabelBadge>
              <CounterBadge>{5}</CounterBadge>
            </div>
          </div>
          <div style={{ padding: '16px 18px', background: 'var(--sem-eclipse-color-backgroundPrimary)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <TextField placeholder="Radix Primitives 검색..." />
            <div style={{ display: 'flex', gap: 8 }}>
              <SolidButton color="primary" size="small">
                <SolidButton.Center>확인</SolidButton.Center>
              </SolidButton>
              <OutlineButton color="black" size="small">
                <OutlineButton.Center>취소</OutlineButton.Center>
              </OutlineButton>
            </div>
            <Divider />
            <Typography textStyle="descriptionSmall" color="foregroundTertiary">
              EclipseProvider mode=&quot;{mode}&quot; — 모든 시맨틱 토큰이 자동으로 조정됩니다.
            </Typography>
          </div>
        </div>
      </EclipseProvider>
    </div>
  )
}

export const Radix_컬러_스킴_적응_데모: Story = {
  name: 'Radix UI — 고대비 모드 & 컬러 스킴 적응 데모',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI의 `highContrast` + `appearance` 시스템 비교. ' +
          'EclipseProvider의 mode prop으로 라이트/다크를 전환하고 CSS filter로 고대비 시뮬레이션합니다. ' +
          '모든 시맨틱 토큰이 자동으로 적응하는 것을 실시간으로 확인합니다.',
      },
    },
  },
  render: () => <RadixColorSchemeDemo />,
}

/* --------------------------------------------------------------------------
   Raycast — 커맨드 팔레트 테마 프리뷰
   Raycast Extensions의 compact dark UI 패턴 — 테마 전환 미리보기
-------------------------------------------------------------------------- */
function RaycastCommandPaletteThemeRender() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const commands = [
    { icon: '🔍', label: '파일 검색', shortcut: '⌘F', category: 'Search' },
    { icon: '📋', label: '클립보드 히스토리', shortcut: '⌘⇧V', category: 'Clipboard' },
    { icon: '🎨', label: '컬러 피커', shortcut: '⌘⇧C', category: 'Tools' },
    { icon: '🔖', label: '즐겨찾기 열기', shortcut: '⌘⇧B', category: 'Browser' },
    { icon: '⚡', label: '빠른 메모', shortcut: '⌘N', category: 'Notes' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <SolidButton color="primary" size="small" onClick={() => setMode('light')}>
          <SolidButton.Center>라이트</SolidButton.Center>
        </SolidButton>
        <SolidButton color="black" size="small" onClick={() => setMode('dark')}>
          <SolidButton.Center>다크</SolidButton.Center>
        </SolidButton>
      </div>
      <EclipseProvider mode={mode}>
        <div style={{
          width: 480,
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid var(--sem-eclipse-color-borderDefault)',
          background: mode === 'dark' ? '#1c1c1e' : '#ffffff',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', background: mode === 'dark' ? '#2c2c2e' : '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>⌘</span>
              <TextField placeholder="명령어 검색..." />
            </div>
          </div>
          <div style={{ padding: '8px 0' }}>
            {commands.map((cmd, i) => (
              <div key={cmd.label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 16px',
                background: i === 0 ? (mode === 'dark' ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.08)') : 'transparent',
                cursor: 'default',
              }}>
                <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{cmd.icon}</span>
                <div style={{ flex: 1 }}>
                  <Typography textStyle="labelSmall" color="foregroundPrimary">{cmd.label}</Typography>
                  <Typography textStyle="descriptionSmall" color="foregroundTertiary">{cmd.category}</Typography>
                </div>
                <kbd style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, border: '1px solid var(--sem-eclipse-color-borderDefault)', color: 'var(--sem-eclipse-color-foregroundTertiary)', background: 'var(--sem-eclipse-color-backgroundSecondary)', fontFamily: 'monospace' }}>{cmd.shortcut}</kbd>
              </div>
            ))}
          </div>
        </div>
      </EclipseProvider>
    </div>
  )
}

export const Raycast_커맨드_팔레트_테마: Story = {
  name: 'Raycast — 커맨드 팔레트 테마 프리뷰',
  parameters: {
    docs: {
      description: {
        story: 'Raycast Extensions의 compact 커맨드 팔레트 UI. EclipseProvider로 라이트/다크 테마를 전환하며 모든 토큰이 자동 적응하는 것을 확인합니다.',
      },
    },
  },
  render: () => <RaycastCommandPaletteThemeRender />,
}

/* --------------------------------------------------------------------------
   Figma Plugin UI — 디자인 토큰 프리뷰어
   Figma Plugin의 compact tool palette 패턴 — 토큰 시스템 시각화
-------------------------------------------------------------------------- */
function FigmaTokenPreviewerRender() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [selected, setSelected] = useState<string>('primary')
  const tokens = [
    { key: 'primary', label: '프라이머리', color: '#6366f1', hex: '#6366f1' },
    { key: 'secondary', label: '세컨더리', color: '#8b5cf6', hex: '#8b5cf6' },
    { key: 'success', label: '성공', color: '#10b981', hex: '#10b981' },
    { key: 'warning', label: '경고', color: '#f59e0b', hex: '#f59e0b' },
    { key: 'danger', label: '위험', color: '#ef4444', hex: '#ef4444' },
  ]
  return (
    <EclipseProvider mode={mode}>
      <div style={{ width: 300, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, overflow: 'hidden', background: 'var(--sem-eclipse-color-backgroundPrimary)' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-backgroundSecondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography textStyle="labelMedium" color="foregroundPrimary">Design Tokens</Typography>
          <div style={{ display: 'flex', gap: 4 }}>
            <SolidButton color="primary" size="small" onClick={() => setMode('light')}>
              <SolidButton.Center>☀</SolidButton.Center>
            </SolidButton>
            <SolidButton color="black" size="small" onClick={() => setMode('dark')}>
              <SolidButton.Center>🌙</SolidButton.Center>
            </SolidButton>
          </div>
        </div>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tokens.map((t) => (
            <div
              key={t.key}
              onClick={() => setSelected(t.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                borderRadius: 6, cursor: 'pointer',
                background: selected === t.key ? `${t.color}15` : 'transparent',
                border: `1.5px solid ${selected === t.key ? t.color : 'transparent'}`,
              }}
            >
              <div style={{ width: 20, height: 20, borderRadius: 4, background: t.color, flexShrink: 0 }} />
              <Typography textStyle="labelSmall" color="foregroundPrimary">{t.label}</Typography>
              <code style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', fontFamily: 'monospace' }}>{t.hex}</code>
            </div>
          ))}
        </div>
        <Divider />
        <div style={{ padding: '10px 14px' }}>
          <Typography textStyle="descriptionSmall" color="foregroundTertiary">
            mode=&quot;{mode}&quot; · 선택됨: {tokens.find(t => t.key === selected)?.label}
          </Typography>
        </div>
      </div>
    </EclipseProvider>
  )
}

export const Figma_디자인_토큰_프리뷰어: Story = {
  name: 'Figma Plugin — 디자인 토큰 프리뷰어',
  parameters: {
    docs: {
      description: {
        story: 'Figma Plugin UI의 compact tool palette 패턴. 디자인 토큰을 시각적으로 탐색하며 EclipseProvider 테마 전환을 실시간으로 확인합니다.',
      },
    },
  },
  render: () => <FigmaTokenPreviewerRender />,
}

/* --------------------------------------------------------------------------
   Raycast + Figma — 확장 설정 패널
   앱 설정 UI 패턴 — 테마·밀도·폰트 크기 제어
-------------------------------------------------------------------------- */
function RaycastFigmaSettingsPanelRender() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [compact, setCompact] = useState(false)
  const [notif, setNotif] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  return (
    <EclipseProvider mode={mode}>
      <div style={{
        width: 360,
        background: 'var(--sem-eclipse-color-backgroundPrimary)',
        border: '1px solid var(--sem-eclipse-color-borderDefault)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-backgroundSecondary)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <CounterBadge>{3}</CounterBadge>
          <Typography textStyle="subheadingSmall" color="foregroundPrimary">확장 설정</Typography>
        </div>
        <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Typography textStyle="labelMedium" color="foregroundPrimary">다크 모드</Typography>
              <Typography textStyle="descriptionSmall" color="foregroundTertiary">인터페이스 색상 테마</Typography>
            </div>
            <Toggle checked={mode === 'dark'} onChange={() => setMode((m) => m === 'dark' ? 'light' : 'dark')} />
          </div>
          <Divider />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Typography textStyle="labelMedium" color="foregroundPrimary">컴팩트 모드</Typography>
              <Typography textStyle="descriptionSmall" color="foregroundTertiary">UI 밀도를 높여 더 많은 정보 표시</Typography>
            </div>
            <Toggle checked={compact} onChange={() => setCompact((v) => !v)} />
          </div>
          <Divider />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Typography textStyle="labelMedium" color="foregroundPrimary">알림 허용</Typography>
              <Typography textStyle="descriptionSmall" color="foregroundTertiary">작업 완료 시 알림 표시</Typography>
            </div>
            <Toggle checked={notif} onChange={() => setNotif((v) => !v)} />
          </div>
          <Divider />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Typography textStyle="labelMedium" color="foregroundPrimary">자동 저장</Typography>
              <Typography textStyle="descriptionSmall" color="foregroundTertiary">변경 사항 자동 저장</Typography>
            </div>
            <Toggle checked={autoSave} onChange={() => setAutoSave((v) => !v)} />
          </div>
        </div>
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--sem-eclipse-color-borderSubtle)', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <OutlineButton color="black" size="small">
            <OutlineButton.Center>초기화</OutlineButton.Center>
          </OutlineButton>
          <SolidButton color="primary" size="small">
            <SolidButton.Center>저장</SolidButton.Center>
          </SolidButton>
        </div>
      </div>
    </EclipseProvider>
  )
}

export const Raycast_Figma_확장_설정_패널: Story = {
  name: 'Raycast + Figma — 확장 설정 패널',
  parameters: {
    docs: {
      description: {
        story: 'Raycast Extensions + Figma Plugin UI의 앱 설정 패턴. 다크 모드, 컴팩트 모드, 알림, 자동 저장을 Toggle로 제어하며 EclipseProvider 테마가 실시간으로 전환됩니다.',
      },
    },
  },
  render: () => <RaycastFigmaSettingsPanelRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui — 컴포넌트 쇼케이스 카드 갤러리
   shadcn의 "preview + code" 패턴 — 테마 전환 시 모든 컴포넌트 동시 변경
-------------------------------------------------------------------------- */
function ShadcnComponentGalleryRender() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const isDark = mode === 'dark'
  return (
    <EclipseProvider mode={mode}>
      <div style={{ width: 480, background: 'var(--sem-eclipse-color-backgroundPrimary)', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-backgroundSecondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography textStyle="subheadingSmall" color="foregroundPrimary">컴포넌트 미리보기</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Typography textStyle="descriptionSmall" color="foregroundTertiary">{isDark ? '다크' : '라이트'}</Typography>
            <Toggle checked={isDark} onChange={() => setMode(isDark ? 'light' : 'dark')} />
          </div>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* 버튼 행 */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <SolidButton color="primary" size="small"><SolidButton.Center>Primary</SolidButton.Center></SolidButton>
            <OutlineButton color="black" size="small"><OutlineButton.Center>Outline</OutlineButton.Center></OutlineButton>
            <GhostButton color="black" size="small"><GhostButton.Center>Ghost</GhostButton.Center></GhostButton>
          </div>
          <Divider />
          {/* 배지 행 */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <LabelBadge color="benefit"><LabelBadge.Label>New</LabelBadge.Label></LabelBadge>
            <LabelBadge color="gray"><LabelBadge.Label>Active</LabelBadge.Label></LabelBadge>
            <LabelBadge color="sale"><LabelBadge.Label>Error</LabelBadge.Label></LabelBadge>
            <CounterBadge>{7}</CounterBadge>
          </div>
          <Divider />
          {/* 인풋 행 */}
          <TextField placeholder="검색어를 입력하세요..." />
          <Divider />
          {/* 아바타 + 텍스트 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar style={{ width: 36, height: 36 }}>
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <div>
              <Typography textStyle="labelMedium" color="foregroundPrimary">Jane Doe</Typography>
              <Typography textStyle="descriptionSmall" color="foregroundTertiary">jane@example.com</Typography>
            </div>
            <Switch style={{ marginLeft: 'auto' }} />
          </div>
        </div>
      </div>
    </EclipseProvider>
  )
}

export const Shadcn_컴포넌트_갤러리_테마_스위처: Story = {
  name: 'shadcn/ui — 컴포넌트 갤러리 테마 스위처',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui의 "preview + code" 패턴. Toggle 하나로 전체 컴포넌트 테마 동시 전환. Button/Badge/TextField/Avatar/Switch 조합 갤러리.',
      },
    },
  },
  render: () => <ShadcnComponentGalleryRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI — 알림 센터 패널
   Tailwind UI의 notification panel 패턴 — 읽음/안읽음 상태 관리
-------------------------------------------------------------------------- */
const NOTIF_ITEMS = [
  { id: 1, title: 'PR #142 병합 완료', body: 'feat/onboarding 브랜치가 main에 병합되었습니다.', time: '2분 전', read: false, type: 'success' },
  { id: 2, title: '빌드 실패', body: 'prod-deploy 파이프라인이 실패했습니다.', time: '15분 전', read: false, type: 'error' },
  { id: 3, title: '새 멤버 초대', body: 'kim@example.com이 팀에 합류했습니다.', time: '1시간 전', read: true, type: 'info' },
  { id: 4, title: '월간 리포트 준비됨', body: '3월 사용량 리포트를 확인하세요.', time: '3시간 전', read: true, type: 'info' },
]

function TailwindNotificationPanelRender() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [notifs, setNotifs] = useState(NOTIF_ITEMS)
  const unread = notifs.filter((n) => !n.read).length

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))

  const TYPE_COLOR: Record<string, string> = { success: '#10b981', error: '#ef4444', info: '#6366f1' }

  return (
    <EclipseProvider mode={mode}>
      <div style={{ width: 360, background: 'var(--sem-eclipse-color-backgroundPrimary)', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Typography textStyle="subheadingSmall" color="foregroundPrimary">알림</Typography>
          {unread > 0 && <CounterBadge>{unread}</CounterBadge>}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <GhostButton color="black" size="small" onClick={markAllRead}>
              <GhostButton.Center>모두 읽음</GhostButton.Center>
            </GhostButton>
            <Toggle checked={mode === 'dark'} onChange={() => setMode((m) => m === 'dark' ? 'light' : 'dark')} />
          </div>
        </div>
        <div style={{ maxHeight: 320, overflowY: 'auto' }}>
          {notifs.map((n, idx) => (
            <div key={n.id} onClick={() => markRead(n.id)} style={{ padding: '12px 18px', borderBottom: idx < notifs.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none', background: n.read ? 'transparent' : 'var(--sem-eclipse-color-backgroundSecondary)', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start', transition: 'background 0.15s' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? 'transparent' : TYPE_COLOR[n.type], flexShrink: 0, marginTop: 6 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <Typography textStyle="labelSmall" color={n.read ? 'foregroundSecondary' : 'foregroundPrimary'}>{n.title}</Typography>
                  <Typography textStyle="descriptionSmall" color="foregroundQuaternary">{n.time}</Typography>
                </div>
                <Typography textStyle="descriptionSmall" color="foregroundTertiary">{n.body}</Typography>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 18px', borderTop: '1px solid var(--sem-eclipse-color-borderSubtle)', textAlign: 'center' }}>
          <GhostButton color="black" size="small">
            <GhostButton.Center>모든 알림 보기</GhostButton.Center>
          </GhostButton>
        </div>
      </div>
    </EclipseProvider>
  )
}

export const Tailwind_알림_센터_패널: Story = {
  name: 'Tailwind UI — 알림 센터 패널 (읽음/안읽음 관리)',
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI notification panel 패턴. 읽음/안읽음 상태 점(dot) 표시, 클릭 시 읽음 처리, "모두 읽음" 일괄 처리. CounterBadge로 미읽음 수 표시.',
      },
    },
  },
  render: () => <TailwindNotificationPanelRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui + Tailwind UI — 사용자 프로필 카드
   shadcn Avatar + Tailwind stat 패턴 — 팀원 프로필 카드
-------------------------------------------------------------------------- */
function ShadcnTailwindProfileCardRender() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [followed, setFollowed] = useState(false)
  const STATS = [
    { label: '커밋', value: '1,284' },
    { label: 'PR', value: '237' },
    { label: '리뷰', value: '892' },
  ]
  return (
    <EclipseProvider mode={mode}>
      <div style={{ width: 320, background: 'var(--sem-eclipse-color-backgroundPrimary)', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 16, overflow: 'hidden' }}>
        {/* 헤더 배너 */}
        <div style={{ height: 80, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <Toggle checked={mode === 'dark'} onChange={() => setMode((m) => m === 'dark' ? 'light' : 'dark')} />
          </div>
        </div>
        {/* 프로필 섹션 */}
        <div style={{ padding: '0 20px 20px', marginTop: -28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
            <Avatar style={{ width: 56, height: 56, border: '3px solid var(--sem-eclipse-color-backgroundPrimary)' }}>
              <Avatar.Fallback>HK</Avatar.Fallback>
            </Avatar>
            {followed ? (
              <OutlineButton color="black" size="small" onClick={() => setFollowed(false)}>
                <OutlineButton.Center>팔로잉</OutlineButton.Center>
              </OutlineButton>
            ) : (
              <SolidButton color="primary" size="small" onClick={() => setFollowed(true)}>
                <SolidButton.Center>팔로우</SolidButton.Center>
              </SolidButton>
            )}
          </div>
          <Typography textStyle="subheadingMedium" color="foregroundPrimary">Heejun Kim</Typography>
          <Typography textStyle="descriptionSmall" color="foregroundTertiary">@blue45f · Senior Frontend Engineer</Typography>
          <Divider style={{ margin: '14px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <Typography textStyle="subheadingSmall" color="foregroundPrimary">{s.value}</Typography>
                <Typography textStyle="descriptionSmall" color="foregroundTertiary">{s.label}</Typography>
              </div>
            ))}
          </div>
          <Divider style={{ margin: '14px 0' }} />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <LabelBadge color="benefit"><LabelBadge.Label>React</LabelBadge.Label></LabelBadge>
            <LabelBadge color="gray"><LabelBadge.Label>TypeScript</LabelBadge.Label></LabelBadge>
            <LabelBadge color="sale"><LabelBadge.Label>Design Systems</LabelBadge.Label></LabelBadge>
          </div>
        </div>
      </div>
    </EclipseProvider>
  )
}

export const Shadcn_Tailwind_사용자_프로필_카드: Story = {
  name: 'shadcn/ui + Tailwind UI — 사용자 프로필 카드',
  parameters: {
    docs: {
      description: {
        story: 'shadcn Avatar + Tailwind stat 패턴 조합. 팔로우/팔로잉 토글, 통계(커밋/PR/리뷰), 기술 배지. EclipseProvider 다크모드 전환.',
      },
    },
  },
  render: () => <ShadcnTailwindProfileCardRender />,
}

/* --------------------------------------------------------------------------
   Cycle 162 — Raycast Extensions + Notion Design
   Raycast: 확장 설정 패널 테마 전환 패턴
-------------------------------------------------------------------------- */
const RAYCAST_PANELS = [
  { id: 'general', label: '일반', icon: '⚙️' },
  { id: 'appearance', label: '외관', icon: '🎨' },
  { id: 'shortcuts', label: '단축키', icon: '⌨️' },
  { id: 'advanced', label: '고급', icon: '🔧' },
]

const RAYCAST_ACCENT_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
]

function RaycastExtensionSettingRender() {
  const [dark, setDark] = useState(false)
  const [panel, setPanel] = useState('appearance')
  const [accent, setAccent] = useState('#3b82f6')
  const [density, setDensity] = useState<'compact' | 'comfortable'>('comfortable')
  const [animEnabled, setAnimEnabled] = useState(true)

  const bg = dark ? '#1c1c1e' : '#f5f5f7'
  const cardBg = dark ? '#2c2c2e' : '#ffffff'
  const border = dark ? '#3a3a3c' : '#e5e7eb'
  const text = dark ? '#f5f5f7' : '#1c1c1e'
  const sub = dark ? '#98989d' : '#6b7280'
  const sidebarBg = dark ? '#252527' : '#f0f0f2'

  return (
    <EclipseProvider mode={dark ? 'dark' : 'light'}>
      <div style={{ width: 560, height: 420, display: 'flex', borderRadius: 14, overflow: 'hidden', border: `1px solid ${border}`, background: bg, fontFamily: 'system-ui, sans-serif', boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.08)' }}>
        {/* Sidebar */}
        <div style={{ width: 140, background: sidebarBg, borderRight: `1px solid ${border}`, display: 'flex', flexDirection: 'column', padding: '16px 8px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: sub, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>Raycast</div>
          {RAYCAST_PANELS.map(p => (
            <button key={p.id} onClick={() => setPanel(p.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 7, border: 'none', background: panel === p.id ? accent + '22' : 'transparent', cursor: 'pointer', textAlign: 'left', width: '100%', marginBottom: 2 }}>
              <span style={{ fontSize: 14 }}>{p.icon}</span>
              <span style={{ fontSize: 12, fontWeight: panel === p.id ? 600 : 400, color: panel === p.id ? accent : text }}>{p.label}</span>
            </button>
          ))}
          <div style={{ marginTop: 'auto', padding: '0 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: sub }}>다크</span>
              <Toggle checked={dark} onCheckedChange={(c) => setDark(c)} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: cardBg }}>
          {panel === 'appearance' ? (
            <>
              <div style={{ fontSize: 14, fontWeight: 700, color: text, marginBottom: 16 }}>외관 설정</div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: sub, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>강조 색상</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {RAYCAST_ACCENT_COLORS.map(c => (
                    <button key={c.name} onClick={() => setAccent(c.value)} style={{ width: 28, height: 28, borderRadius: '50%', background: c.value, border: accent === c.value ? `3px solid ${text}` : '3px solid transparent', cursor: 'pointer', padding: 0, transition: 'border 150ms' }} title={c.name} />
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: sub, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>밀도</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['compact', 'comfortable'] as const).map(d => (
                    <button key={d} onClick={() => setDensity(d)} style={{ padding: '5px 14px', fontSize: 11, borderRadius: 7, border: `1.5px solid ${density === d ? accent : border}`, background: density === d ? accent + '15' : 'transparent', color: density === d ? accent : sub, cursor: 'pointer', fontWeight: density === d ? 600 : 400, transition: 'all 150ms' }}>{d === 'compact' ? '컴팩트' : '편안함'}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: `1px solid ${border}` }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: text }}>애니메이션</div>
                  <div style={{ fontSize: 11, color: sub, marginTop: 2 }}>전환 효과 활성화</div>
                </div>
                <Switch checked={animEnabled} onCheckedChange={(c) => setAnimEnabled(c)} />
              </div>
            </>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontSize: 28 }}>{RAYCAST_PANELS.find(p => p.id === panel)?.icon}</span>
              <div style={{ fontSize: 13, color: sub }}>{RAYCAST_PANELS.find(p => p.id === panel)?.label} 설정</div>
            </div>
          )}
        </div>
      </div>
    </EclipseProvider>
  )
}

export const Raycast_확장_설정_패널_테마: Story = {
  name: 'Raycast Extensions — 확장 설정 패널 테마 전환',
  parameters: {
    docs: {
      description: {
        story: 'Raycast Extension API의 설정 패널 패턴. 사이드바 탭 탐색, 강조 색상 선택, 밀도 설정, Switch/Toggle 조합. EclipseProvider 다크/라이트 전환.',
      },
    },
  },
  render: () => <RaycastExtensionSettingRender />,
}

/* --------------------------------------------------------------------------
   Notion Design: 블록 편집기 테마 미리보기 패턴
-------------------------------------------------------------------------- */
const NOTION_THEMES = [
  { id: 'default', label: '기본', bg: '#ffffff', sidebar: '#f7f7f5', text: '#37352f', accent: '#2eaadc' },
  { id: 'dark', label: '다크', bg: '#191919', sidebar: '#252525', text: '#e8e8e6', accent: '#5c9fcb' },
  { id: 'system', label: '시스템', bg: '#f5f4ef', sidebar: '#eceae4', text: '#37352f', accent: '#d9730d' },
]

const NOTION_BLOCKS = [
  { type: 'heading', content: '프로젝트 개요' },
  { type: 'text', content: 'Orbit UI는 3계층 아키텍처 기반의 React 디자인 시스템입니다.' },
  { type: 'bullet', content: 'Base 컴포넌트 — 스타일 없는 접근성 기초' },
  { type: 'bullet', content: 'Theme 컴포넌트 — vanilla-extract 토큰 시스템' },
  { type: 'bullet', content: 'Custom 컴포넌트 — 프로젝트 맞춤 확장' },
  { type: 'callout', content: 'EclipseProvider로 전체 앱에 테마를 적용하세요.' },
]

function NotionBlockEditorThemeRender() {
  const [themeId, setThemeId] = useState('default')
  const theme = NOTION_THEMES.find(t => t.id === themeId) ?? NOTION_THEMES[0]
  const isDark = themeId === 'dark'

  return (
    <EclipseProvider mode={isDark ? 'dark' : 'light'}>
      <div style={{ width: 580, borderRadius: 10, overflow: 'hidden', border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
        {/* Header */}
        <div style={{ background: theme.sidebar, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${isDark ? '#333' : '#e5e7eb'}` }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', marginRight: 2 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', marginRight: 12 }} />
          <span style={{ fontSize: 12, color: theme.text, opacity: 0.5 }}>orbit-ui / docs / overview</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
            {NOTION_THEMES.map(t => (
              <button key={t.id} onClick={() => setThemeId(t.id)} style={{ padding: '3px 10px', fontSize: 10, borderRadius: 5, border: `1.5px solid ${themeId === t.id ? theme.accent : 'transparent'}`, background: themeId === t.id ? theme.accent + '18' : 'transparent', color: themeId === t.id ? theme.accent : theme.text, cursor: 'pointer', fontWeight: themeId === t.id ? 600 : 400, opacity: themeId === t.id ? 1 : 0.6 }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* Editor area */}
        <div style={{ display: 'flex', background: theme.bg, minHeight: 240 }}>
          {/* Sidebar */}
          <div style={{ width: 60, background: theme.sidebar, borderRight: `1px solid ${isDark ? '#333' : '#e5e7eb'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, gap: 10 }}>
            {['📄', '🔖', '⭐', '🗑️'].map((icon, i) => (
              <div key={i} style={{ fontSize: 14, opacity: 0.5, cursor: 'pointer', padding: 4 }}>{icon}</div>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '24px 32px' }}>
            {NOTION_BLOCKS.map((block, i) => {
              if (block.type === 'heading') return (
                <div key={i} style={{ fontSize: 22, fontWeight: 700, color: theme.text, marginBottom: 12, letterSpacing: '-0.02em' }}>{block.content}</div>
              )
              if (block.type === 'bullet') return (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4, color: theme.text, fontSize: 13, opacity: 0.85 }}>
                  <span style={{ color: theme.accent }}>•</span>
                  <span>{block.content}</span>
                </div>
              )
              if (block.type === 'callout') return (
                <div key={i} style={{ marginTop: 12, padding: '10px 14px', borderRadius: 6, background: theme.accent + '15', border: `1px solid ${theme.accent}33`, fontSize: 12, color: theme.text, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span>💡</span>
                  <span>{block.content}</span>
                </div>
              )
              return (
                <div key={i} style={{ fontSize: 13, color: theme.text, lineHeight: 1.7, marginBottom: 8, opacity: 0.85 }}>{block.content}</div>
              )
            })}
          </div>
        </div>
      </div>
    </EclipseProvider>
  )
}

export const Notion_블록_편집기_테마_미리보기: Story = {
  name: 'Notion Design — 블록 편집기 테마 미리보기',
  parameters: {
    docs: {
      description: {
        story: 'Notion의 페이지 편집기 레이아웃 패턴. 사이드바 + 에디터 영역, 3가지 테마(기본/다크/시스템) 전환, 블록 타입(헤딩/텍스트/불릿/콜아웃) 렌더링. EclipseProvider colorScheme 연동.',
      },
    },
  },
  render: () => <NotionBlockEditorThemeRender />,
}

/* --------------------------------------------------------------------------
   Raycast + Notion: 통합 워크스페이스 테마 컨트롤 패널
-------------------------------------------------------------------------- */
const WORKSPACE_MEMBERS = [
  { name: '김희준', role: '관리자', color: '#6366f1' },
  { name: '박지수', role: '개발자', color: '#22c55e' },
  { name: '이민영', role: '디자이너', color: '#f59e0b' },
  { name: '최성원', role: '뷰어', color: '#ec4899' },
]

function RaycastNotionWorkspaceRender() {
  const [dark, setDark] = useState(false)
  const [accent, setAccent] = useState('#6366f1')
  const [notifs, setNotifs] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')

  const bg = dark ? '#191919' : '#f8fafc'
  const cardBg = dark ? '#252525' : '#ffffff'
  const border = dark ? '#333' : '#e5e7eb'
  const text = dark ? '#e8e8e6' : '#1e293b'
  const sub = dark ? '#888' : '#64748b'

  return (
    <EclipseProvider mode={dark ? 'dark' : 'light'}>
      <div style={{ width: 540, background: bg, borderRadius: 14, border: `1px solid ${border}`, fontFamily: 'system-ui, sans-serif', overflow: 'hidden', boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.06)' }}>
        {/* Title bar */}
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${border}`, background: cardBg, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: text, letterSpacing: '-0.02em' }}>워크스페이스 설정</span>
          <span style={{ marginLeft: 4, fontSize: 10, padding: '2px 8px', borderRadius: 999, background: accent + '22', color: accent, fontWeight: 700 }}>Raycast + Notion</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: sub }}>다크모드</span>
            <Toggle checked={dark} onCheckedChange={(c) => setDark(c)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {/* Left */}
          <div style={{ padding: '18px 20px', borderRight: `1px solid ${border}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: sub, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>외관 설정</div>

            {/* Accent */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: sub, marginBottom: 6 }}>강조 색상</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#6366f1', '#22c55e', '#f97316', '#ec4899', '#14b8a6'].map(c => (
                  <button key={c} onClick={() => setAccent(c)} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: accent === c ? `3px solid ${text}` : '3px solid transparent', cursor: 'pointer', padding: 0, transition: 'border 150ms' }} />
                ))}
              </div>
            </div>

            {/* Font size */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: sub, marginBottom: 6 }}>텍스트 크기 (Notion 패턴)</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['small', 'medium', 'large'] as const).map(s => (
                  <button key={s} onClick={() => setFontSize(s)} style={{ flex: 1, padding: '4px 0', fontSize: 10, borderRadius: 6, border: `1.5px solid ${fontSize === s ? accent : border}`, background: fontSize === s ? accent + '18' : 'transparent', color: fontSize === s ? accent : sub, cursor: 'pointer', fontWeight: fontSize === s ? 700 : 400 }}>{s === 'small' ? '소' : s === 'medium' ? '중' : '대'}</button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: '알림 (Raycast)', state: notifs, set: setNotifs },
                { label: '자동 저장 (Notion)', state: autoSave, set: setAutoSave },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${border}` }}>
                  <span style={{ fontSize: 11, color: text }}>{item.label}</span>
                  <Switch checked={item.state} onCheckedChange={(c) => item.set(c)} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Members */}
          <div style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: sub, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>팀 멤버</div>
            {WORKSPACE_MEMBERS.map(m => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${border}` }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: m.color + '22', border: `1.5px solid ${m.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: m.color }}>{m.name[0]}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: text }}>{m.name}</div>
                  <div style={{ fontSize: 10, color: sub }}>{m.role}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <LabelBadge color={m.role === '관리자' ? 'sale' : m.role === '개발자' ? 'benefit' : 'gray'}>
                    <LabelBadge.Label>{m.role === '관리자' ? 'admin' : m.role === '개발자' ? 'dev' : m.role === '디자이너' ? 'design' : 'view'}</LabelBadge.Label>
                  </LabelBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EclipseProvider>
  )
}

export const Raycast_Notion_워크스페이스_테마_패널: Story = {
  name: 'Raycast + Notion — 워크스페이스 테마 컨트롤 패널',
  parameters: {
    docs: {
      description: {
        story: 'Raycast 강조 색상 선택 + Notion 텍스트 크기 패턴 조합. 팀 멤버 목록, 알림/자동저장 토글, 다크모드 전환. EclipseProvider 테마 컨텍스트 실시간 반영.',
      },
    },
  },
  render: () => <RaycastNotionWorkspaceRender />,
}
