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
