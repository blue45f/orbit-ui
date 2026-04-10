import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Switch } from './Switch'
import { Typography } from '../Text'

const meta = {
  title: 'eclipse/Inputs/Selection/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Switch id="airplane-mode" />
      <Typography as="label" htmlFor="airplane-mode" textStyle="descriptionLarge">
        비행기 모드
      </Typography>
    </div>
  ),
}

// ─── Apple HIG: 설정 화면 패턴 ───────────────────────────────────────────────
// Apple HIG에서 Switch(Toggle)는 설정 항목의 즉각적인 On/Off를 나타냅니다.
// 레이블은 항상 좌측, 스위치는 우측에 배치하고 전체 행이 탭 타겟이 되어야 합니다.
const SettingsListRender = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    locationAccess: true,
    autoUpdate: false,
    analytics: true,
  })

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const items = [
    { key: 'notifications' as const, label: '알림', description: '앱 푸시 알림을 허용합니다' },
    { key: 'darkMode' as const, label: '다크 모드', description: '어두운 색상 테마를 사용합니다' },
    { key: 'locationAccess' as const, label: '위치 접근', description: '현재 위치 기반 서비스를 사용합니다' },
    { key: 'autoUpdate' as const, label: '자동 업데이트', description: 'Wi-Fi 연결 시 자동으로 업데이트합니다' },
    { key: 'analytics' as const, label: '사용 분석', description: '앱 개선을 위한 익명 데이터를 수집합니다' },
  ]

  return (
    <div
      style={{
        width: '360px',
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <Typography textStyle="labelLarge" style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.08em' }}>
          개인 정보 및 설정
        </Typography>
      </div>
      {items.map((item, idx) => (
        <button
          key={item.key}
          onClick={() => toggle(item.key)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '14px 16px',
            background: 'transparent',
            border: 'none',
            borderBottom: idx < items.length - 1 ? '1px solid #f1f5f9' : 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Typography textStyle="bodyLarge" style={{ color: '#0f172a', fontWeight: 500 }}>
              {item.label}
            </Typography>
            <Typography textStyle="descriptionMedium" style={{ color: '#94a3b8' }}>
              {item.description}
            </Typography>
          </div>
          <Switch
            checked={settings[item.key]}
            onCheckedChange={() => toggle(item.key)}
            onClick={(e) => e.stopPropagation()}
          />
        </button>
      ))}
    </div>
  )
}

export const Apple_HIG_설정_화면: Story = {
  name: 'Apple HIG - 설정 화면 패턴 (전체 행이 탭 타겟)',
  render: () => <SettingsListRender />,
}

// ─── Apple HIG: 즉각 피드백 + 상태 설명 패턴 ─────────────────────────────────
// Apple HIG 지침: 스위치 변경은 즉각 적용되며, 현재 상태를 텍스트로 보조 설명합니다.
const ImmediateFeedbackRender = () => {
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false)
  const [airplaneMode, setAirplaneMode] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '320px' }}>
      <Typography textStyle="titleMedium" style={{ color: '#0f172a', marginBottom: '4px' }}>
        연결
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {[
          { label: 'Wi-Fi', state: wifiEnabled, setState: setWifiEnabled, enabledText: '연결됨', disabledText: '꺼짐' },
          { label: 'Bluetooth', state: bluetoothEnabled, setState: setBluetoothEnabled, enabledText: '켜짐', disabledText: '꺼짐' },
          { label: '비행기 모드', state: airplaneMode, setState: setAirplaneMode, enabledText: '활성화됨 - 통신 차단 중', disabledText: '꺼짐' },
        ].map((item, idx, arr) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              background: '#fff',
              borderBottom: idx < arr.length - 1 ? '1px solid #f1f5f9' : 'none',
            }}
          >
            <div>
              <Typography textStyle="bodyLarge" style={{ fontWeight: 500, color: '#0f172a' }}>
                {item.label}
              </Typography>
              <Typography textStyle="descriptionMedium" style={{ color: item.state ? '#6366f1' : '#94a3b8' }}>
                {item.state ? item.enabledText : item.disabledText}
              </Typography>
            </div>
            <Switch
              checked={item.state}
              onCheckedChange={(checked) => item.setState(checked)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export const Apple_HIG_즉각_피드백: Story = {
  name: 'Apple HIG - 즉각 피드백 + 상태 설명 패턴',
  render: () => <ImmediateFeedbackRender />,
}

// ─── 실전: 마케팅 수신 동의 설정 ────────────────────────────────────────────
const PrivacySettingRender = () => {
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [thirdPartyConsent, setThirdPartyConsent] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '360px' }}>
      <div>
        <Typography textStyle="titleMedium" style={{ color: '#0f172a', marginBottom: '4px' }}>
          마케팅 수신 동의
        </Typography>
        <Typography textStyle="descriptionMedium" style={{ color: '#64748b' }}>
          개인 정보 처리 방침에 따라 설정됩니다.
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Typography textStyle="bodyLarge" style={{ fontWeight: 500 }}>이메일 마케팅</Typography>
            <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>프로모션 및 이벤트 정보</Typography>
          </div>
          <Switch checked={marketingConsent} onCheckedChange={setMarketingConsent} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Typography textStyle="bodyLarge" style={{ fontWeight: 500 }}>제3자 정보 제공</Typography>
            <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>파트너사 서비스 활용</Typography>
          </div>
          <Switch checked={thirdPartyConsent} onCheckedChange={setThirdPartyConsent} />
        </div>
      </div>
      <div style={{
        padding: '10px 14px',
        borderRadius: '8px',
        background: 'rgba(99,102,241,0.05)',
        border: '1px solid rgba(99,102,241,0.15)',
        fontSize: '12px',
        color: '#6366f1',
      }}>
        {marketingConsent || thirdPartyConsent
          ? `동의 항목: ${[marketingConsent && '이메일 마케팅', thirdPartyConsent && '제3자 정보 제공'].filter(Boolean).join(', ')}`
          : '아직 동의한 항목이 없습니다'}
      </div>
    </div>
  )
}

export const 마케팅_동의_설정: Story = {
  name: '마케팅 동의 설정 (실전 패턴)',
  render: () => <PrivacySettingRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 앱 설정 패널 패턴
   Mantine Switch 그룹 — 알림/외관/기능 설정 토글 목록
-------------------------------------------------------------------------- */
type SettingItem = {
  id: string
  label: string
  desc: string
  group: string
  defaultOn: boolean
}

const SETTINGS: SettingItem[] = [
  { id: 'notif_push', label: '푸시 알림', desc: '앱에서 실시간 알림 수신', group: '알림', defaultOn: true },
  { id: 'notif_email', label: '이메일 알림', desc: '주간 요약 이메일 수신', group: '알림', defaultOn: false },
  { id: 'notif_sound', label: '알림 소리', desc: '새 알림 수신 시 소리 재생', group: '알림', defaultOn: true },
  { id: 'ui_dark', label: '다크 모드', desc: '시스템 설정에 따라 자동 전환', group: '외관', defaultOn: false },
  { id: 'ui_compact', label: '컴팩트 보기', desc: '항목 간격을 줄여 더 많은 내용 표시', group: '외관', defaultOn: false },
  { id: 'feat_beta', label: '베타 기능', desc: '실험적 기능 미리 체험', group: '기능', defaultOn: false },
]

function AppSettingsPanelRender() {
  const [values, setValues] = useState<Record<string, boolean>>(
    Object.fromEntries(SETTINGS.map((s) => [s.id, s.defaultOn]))
  )

  const toggle = (id: string) => setValues((prev) => ({ ...prev, [id]: !prev[id] }))

  const groups = [...new Set(SETTINGS.map((s) => s.group))]

  return (
    <div style={{ maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {groups.map((group) => (
        <div key={group}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            {group}
          </div>
          <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff' }}>
            {SETTINGS.filter((s) => s.group === group).map((setting, i, arr) => (
              <div
                key={setting.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none',
                }}
              >
                <div>
                  <Typography textStyle="descriptionLarge" style={{ fontWeight: 600, color: '#1e293b' }}>
                    {setting.label}
                  </Typography>
                  <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>
                    {setting.desc}
                  </Typography>
                </div>
                <Switch
                  checked={values[setting.id]}
                  onCheckedChange={() => toggle(setting.id)}
                  aria-label={setting.label}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Mantine Switch 그룹 패턴 — 카테고리별 설정 토글 ({Object.values(values).filter(Boolean).length}/{SETTINGS.length} 활성)
      </div>
    </div>
  )
}

export const Mantine_앱_설정_패널 = {
  name: 'Mantine - 앱 설정 패널 패턴',
  render: () => <AppSettingsPanelRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 알림 채널 설정 패턴
   Ant Design Form + Switch 조합 — 채널 활성화 시 하위 옵션 표시
-------------------------------------------------------------------------- */
function NotificationChannelRender() {
  const [channels, setChannels] = useState({
    email: true,
    sms: false,
    push: true,
    inapp: true,
  })
  const [emailFreq, setEmailFreq] = useState<'daily' | 'weekly' | 'realtime'>('weekly')

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>
        알림 채널 설정
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {([
          { id: 'email', label: '이메일', desc: '이메일로 알림 수신' },
          { id: 'sms', label: 'SMS', desc: '문자로 알림 수신' },
          { id: 'push', label: '푸시 알림', desc: '브라우저/앱 푸시' },
          { id: 'inapp', label: '인앱 알림', desc: '앱 내 알림 센터' },
        ] as const).map((ch) => (
          <div key={ch.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: channels[ch.id] ? '#fff' : '#f8fafc',
                transition: 'background 0.15s',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: channels[ch.id] ? '#1e293b' : '#94a3b8' }}>
                  {ch.label}
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{ch.desc}</div>
              </div>
              <Switch
                checked={channels[ch.id]}
                onCheckedChange={(v) => setChannels((prev) => ({ ...prev, [ch.id]: v }))}
                aria-label={ch.label}
              />
            </div>
            {ch.id === 'email' && channels.email && (
              <div
                style={{
                  marginTop: 6,
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid #e8f0fe',
                  background: 'rgba(99,102,241,0.04)',
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 12, color: '#475569', flexShrink: 0 }}>수신 빈도:</span>
                {(['realtime', 'daily', 'weekly'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setEmailFreq(f)}
                    style={{
                      padding: '3px 10px',
                      borderRadius: 20,
                      border: '1px solid',
                      borderColor: emailFreq === f ? '#6366f1' : '#e2e8f0',
                      background: emailFreq === f ? '#6366f1' : '#fff',
                      color: emailFreq === f ? '#fff' : '#64748b',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {{ realtime: '실시간', daily: '일간', weekly: '주간' }[f]}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
        Ant Design Form + Switch 패턴 — 채널 활성화 시 하위 설정 조건부 표시
      </div>
    </div>
  )
}

export const Ant_알림_채널_설정 = {
  name: 'Ant Design - 알림 채널 설정 패턴',
  render: () => <NotificationChannelRender />,
}

/* --------------------------------------------------------------------------
   온보딩 기능 선택 패턴
   기능 선택 + 최소 1개 이상 선택 시 버튼 활성화
-------------------------------------------------------------------------- */
const ONBOARDING_FEATURES = [
  { id: 'analytics', label: '사용 통계 수집', desc: '제품 개선을 위한 익명 통계', default: true },
  { id: 'personalize', label: '개인화 추천', desc: '사용 패턴 기반 맞춤 콘텐츠', default: true },
  { id: 'notifications', label: '서비스 알림', desc: '새 기능 및 공지사항 수신', default: true },
  { id: 'beta', label: '베타 프로그램 참여', desc: '출시 전 기능 미리 체험', default: false },
  { id: 'data', label: '데이터 동기화', desc: '여러 기기에서 설정 동기화', default: false },
]

function OnboardingFeaturesRender() {
  const [features, setFeatures] = useState<Record<string, boolean>>(
    Object.fromEntries(ONBOARDING_FEATURES.map((f) => [f.id, f.default]))
  )
  const [done, setDone] = useState(false)
  const activeCount = Object.values(features).filter(Boolean).length

  if (done) {
    return (
      <div style={{ maxWidth: 360, textAlign: 'center', padding: 32 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#fff', fontSize: 24, fontWeight: 700 }}>
            ✓
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>설정 완료!</div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
          {activeCount}개 기능이 활성화되었습니다.
        </div>
        <button
          onClick={() => setDone(false)}
          style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: 'pointer' }}
        >
          다시 설정
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 360 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>기능 선택</div>
      <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
        원하는 기능을 켜거나 끄세요. 나중에 설정에서 변경할 수 있습니다.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {ONBOARDING_FEATURES.map((feat) => (
          <div
            key={feat.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: 8,
              border: `1px solid ${features[feat.id] ? '#c7d2fe' : '#e2e8f0'}`,
              background: features[feat.id] ? 'rgba(99,102,241,0.04)' : '#fff',
              transition: 'all 0.15s',
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{feat.label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{feat.desc}</div>
            </div>
            <Switch
              checked={features[feat.id]}
              onCheckedChange={(v) => setFeatures((prev) => ({ ...prev, [feat.id]: v }))}
              aria-label={feat.label}
            />
          </div>
        ))}
      </div>
      <button
        disabled={activeCount === 0}
        onClick={() => setDone(true)}
        style={{
          width: '100%',
          padding: '11px',
          borderRadius: 8,
          border: 'none',
          background: activeCount > 0 ? '#6366f1' : '#e2e8f0',
          color: activeCount > 0 ? '#fff' : '#94a3b8',
          fontSize: 14,
          fontWeight: 600,
          cursor: activeCount > 0 ? 'pointer' : 'not-allowed',
          transition: 'background 0.15s',
        }}
      >
        시작하기 ({activeCount}개 선택됨)
      </button>
    </div>
  )
}

export const 온보딩_기능_선택 = {
  name: '온보딩 기능 선택 패턴',
  render: () => <OnboardingFeaturesRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 테마 전환 스위치 패턴
   Mantine의 ColorSchemeProvider + Switch 조합 — 테마 선택 시 미리보기 반영
-------------------------------------------------------------------------- */
type ThemeMode = 'light' | 'dark' | 'system'

function ThemeSwitcherRender() {
  const [mode, setMode] = useState<ThemeMode>('light')
  const isDark = mode === 'dark' || (mode === 'system' && false)

  const themeOptions: { key: ThemeMode; label: string; desc: string }[] = [
    { key: 'light', label: '라이트 모드', desc: '밝은 배경의 기본 테마' },
    { key: 'dark', label: '다크 모드', desc: '어두운 배경의 고대비 테마' },
    { key: 'system', label: '시스템 설정 따르기', desc: 'OS 설정에 맞게 자동 전환' },
  ]

  const bg = isDark ? '#1e293b' : '#ffffff'
  const cardBg = isDark ? '#0f172a' : '#f8fafc'
  const fg = isDark ? '#f1f5f9' : '#0f172a'
  const fgSub = isDark ? '#94a3b8' : '#64748b'
  const border = isDark ? '#334155' : '#e2e8f0'

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
        Mantine ColorSchemeProvider 패턴
      </div>

      {/* Preview card */}
      <div style={{
        borderRadius: 12,
        border: `1px solid ${border}`,
        background: bg,
        padding: 16,
        marginBottom: 16,
        transition: 'all 0.2s',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: fg, marginBottom: 8 }}>미리보기</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ padding: '10px 12px', borderRadius: 8, background: cardBg, border: `1px solid ${border}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: fg }}>컴포넌트 카드</div>
            <div style={{ fontSize: 11, color: fgSub, marginTop: 2 }}>현재 {mode === 'light' ? '라이트' : mode === 'dark' ? '다크' : '시스템'} 테마 적용 중</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Primary', 'Secondary', 'Ghost'].map((label) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  padding: '6px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  textAlign: 'center',
                  background: label === 'Primary' ? '#6366f1' : label === 'Secondary' ? 'transparent' : 'transparent',
                  border: label === 'Ghost' ? 'none' : `1px solid ${label === 'Primary' ? '#6366f1' : border}`,
                  color: label === 'Primary' ? '#fff' : fg,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Theme options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {themeOptions.map((opt) => (
          <div
            key={opt.key}
            onClick={() => setMode(opt.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 10,
              border: `1.5px solid ${mode === opt.key ? '#6366f1' : '#e2e8f0'}`,
              background: mode === opt.key ? 'rgba(99,102,241,0.04)' : '#fff',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{opt.label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{opt.desc}</div>
            </div>
            <Switch
              checked={mode === opt.key}
              onCheckedChange={() => setMode(opt.key)}
              aria-label={opt.label}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Mantine ColorSchemeProvider — 테마 선택 + 실시간 미리보기 패턴
      </div>
    </div>
  )
}

export const Mantine_테마_전환_스위치 = {
  name: 'Mantine - 테마 전환 스위치 (미리보기 반영)',
  render: () => <ThemeSwitcherRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 역할 기반 접근 제어 패턴
   Ant Design Form + Switch — 역할에 따라 스위치 활성화/비활성화
-------------------------------------------------------------------------- */
type RoleType = 'admin' | 'editor' | 'viewer'

const PERMISSION_MATRIX: Record<string, { admin: boolean; editor: boolean; viewer: boolean; locked?: RoleType[] }> = {
  '콘텐츠 작성': { admin: true, editor: true, viewer: false, locked: ['admin'] },
  '콘텐츠 수정': { admin: true, editor: true, viewer: false },
  '콘텐츠 삭제': { admin: true, editor: false, viewer: false, locked: ['admin'] },
  '사용자 관리': { admin: true, editor: false, viewer: false, locked: ['admin'] },
  '설정 변경': { admin: true, editor: false, viewer: false, locked: ['admin'] },
  '통계 조회': { admin: true, editor: true, viewer: true },
}

function RoleBasedAccessRender() {
  const [role, setRole] = useState<RoleType>('editor')
  const [overrides, setOverrides] = useState<Record<string, boolean>>({})

  const roles: { key: RoleType; label: string; color: string }[] = [
    { key: 'admin', label: '관리자', color: '#ef4444' },
    { key: 'editor', label: '편집자', color: '#6366f1' },
    { key: 'viewer', label: '열람자', color: '#94a3b8' },
  ]

  const getPermission = (perm: string): boolean => {
    if (perm in overrides) return overrides[perm]
    return PERMISSION_MATRIX[perm]?.[role] ?? false
  }

  const isLocked = (perm: string): boolean => {
    const matrix = PERMISSION_MATRIX[perm]
    return matrix?.locked?.includes(role) ?? false
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
        Ant Design Form + Switch — 역할 기반 접근 제어
      </div>

      {/* Role selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {roles.map((r) => (
          <button
            key={r.key}
            onClick={() => { setRole(r.key); setOverrides({}) }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 8,
              border: `1.5px solid ${role === r.key ? r.color : '#e2e8f0'}`,
              background: role === r.key ? `${r.color}12` : '#fff',
              color: role === r.key ? r.color : '#64748b',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Permission list */}
      <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff' }}>
        {Object.keys(PERMISSION_MATRIX).map((perm, i, arr) => {
          const locked = isLocked(perm)
          const checked = getPermission(perm)
          return (
            <div
              key={perm}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none',
                background: locked ? '#fafafa' : '#fff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {locked && (
                  <div style={{
                    fontSize: 9, padding: '1px 5px', borderRadius: 4,
                    background: '#fef2f2', color: '#ef4444', fontWeight: 700,
                  }}>
                    LOCK
                  </div>
                )}
                <span style={{ fontSize: 13, fontWeight: 500, color: locked ? '#94a3b8' : '#1e293b' }}>
                  {perm}
                </span>
              </div>
              <Switch
                checked={locked ? true : checked}
                disabled={locked}
                onCheckedChange={(v) => !locked && setOverrides((prev) => ({ ...prev, [perm]: v }))}
                aria-label={perm}
              />
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Ant Design — 역할별 권한 자동 설정 + 잠금 항목은 변경 불가
      </div>
    </div>
  )
}

export const Ant_역할_기반_접근_제어 = {
  name: 'Ant Design - 역할 기반 접근 제어 (권한 매트릭스)',
  render: () => <RoleBasedAccessRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 전체 선택 스위치 패턴
   Mantine Checkbox.Group의 "전체 선택" 패턴을 Switch로 구현
-------------------------------------------------------------------------- */
const FEATURE_LIST = [
  { id: 'realtime', label: '실시간 동기화', group: '데이터' },
  { id: 'backup', label: '자동 백업', group: '데이터' },
  { id: 'compress', label: '데이터 압축', group: '데이터' },
  { id: 'email_notif', label: '이메일 알림', group: '알림' },
  { id: 'push_notif', label: '푸시 알림', group: '알림' },
  { id: 'sms_notif', label: 'SMS 알림', group: '알림' },
]

function BulkToggleRender() {
  const [enabled, setEnabled] = useState<Set<string>>(new Set(['realtime', 'email_notif']))

  const allOn = enabled.size === FEATURE_LIST.length
  const someOn = enabled.size > 0 && !allOn

  const toggleAll = (on: boolean) => {
    if (on) setEnabled(new Set(FEATURE_LIST.map((f) => f.id)))
    else setEnabled(new Set())
  }

  const toggleOne = (id: string) => {
    setEnabled((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const groups = [...new Set(FEATURE_LIST.map((f) => f.group))]

  return (
    <div style={{ maxWidth: 380 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
        Mantine Checkbox.Group — 전체 선택 패턴을 Switch로
      </div>

      {/* Global toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        borderRadius: 10,
        border: '1.5px solid #6366f1',
        background: 'rgba(99,102,241,0.04)',
        marginBottom: 12,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>전체 기능 활성화</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>
            {allOn ? '모두 켜짐' : someOn ? `${enabled.size}/${FEATURE_LIST.length}개 켜짐` : '모두 꺼짐'}
          </div>
        </div>
        <Switch
          checked={allOn}
          onCheckedChange={toggleAll}
          aria-label="전체 선택"
        />
      </div>

      {/* Per group */}
      {groups.map((group) => (
        <div key={group} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, paddingLeft: 4 }}>
            {group}
          </div>
          <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff' }}>
            {FEATURE_LIST.filter((f) => f.group === group).map((feat, i, arr) => (
              <div
                key={feat.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none',
                }}
              >
                <span style={{ fontSize: 13, color: enabled.has(feat.id) ? '#1e293b' : '#94a3b8', fontWeight: enabled.has(feat.id) ? 500 : 400 }}>
                  {feat.label}
                </span>
                <Switch
                  checked={enabled.has(feat.id)}
                  onCheckedChange={() => toggleOne(feat.id)}
                  aria-label={feat.label}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Mantine — 전체 선택 마스터 토글 + 개별 항목 동기화 패턴
      </div>
    </div>
  )
}

export const Mantine_전체_선택_토글 = {
  name: 'Mantine - 전체 선택 토글 (마스터 Switch + 개별 동기화)',
  render: () => <BulkToggleRender />,
}
