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

/* --------------------------------------------------------------------------
   MUI — FormControlLabel 패턴
   Switch + 라벨 + 설명을 FormGroup으로 묶는 MUI 패턴
-------------------------------------------------------------------------- */
const MUI_FORM_SWITCHES = [
  { id: 'sw-email', label: '이메일 알림', desc: '새 메시지, 댓글, 언급 시 이메일 수신', defaultChecked: true },
  { id: 'sw-push', label: '푸시 알림', desc: '모바일 기기로 실시간 알림 수신', defaultChecked: true },
  { id: 'sw-weekly', label: '주간 요약', desc: '매주 월요일 활동 요약 리포트', defaultChecked: false },
  { id: 'sw-marketing', label: '마케팅 수신', desc: '신규 기능, 할인, 이벤트 소식 수신', defaultChecked: false },
]

const MuiFormControlRender = () => {
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(MUI_FORM_SWITCHES.map((s) => [s.id, s.defaultChecked]))
  )
  const toggle = (id: string) => setStates((prev) => ({ ...prev, [id]: !prev[id] }))
  const activeCount = Object.values(states).filter(Boolean).length
  return (
    <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>알림 설정</span>
        <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>{activeCount}개 활성화</span>
      </div>
      {MUI_FORM_SWITCHES.map((item, i) => (
        <div key={item.id}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div style={{ flex: 1, paddingRight: 16 }}>
              <label htmlFor={item.id} style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', cursor: 'pointer', display: 'block', marginBottom: 2 }}>
                {item.label}
              </label>
              <span style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>{item.desc}</span>
            </div>
            <Switch
              id={item.id}
              checked={states[item.id]}
              onCheckedChange={() => toggle(item.id)}
            />
          </div>
          {i < MUI_FORM_SWITCHES.length - 1 && (
            <div style={{ height: 1, background: '#f1f5f9' }} />
          )}
        </div>
      ))}
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
        MUI FormControlLabel 패턴 — Switch + 라벨 + description 그룹
      </div>
    </div>
  )
}

export const MUI_FormControlLabel_알림설정: Story = {
  name: 'MUI - FormControlLabel 알림 설정 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'MUI의 FormControlLabel 패턴. Switch, 라벨, 설명 텍스트를 하나의 행으로 묶고, 전체 행에서 탭 포커스와 클릭을 지원합니다. 활성화된 항목 수를 헤더에 실시간 표시합니다.',
      },
    },
  },
  render: () => <MuiFormControlRender />,
}

/* --------------------------------------------------------------------------
   Figma Plugin UI — 속성 패널 컴팩트 토글
   Figma 플러그인에서 자주 쓰이는 고밀도 토글 행 패턴
-------------------------------------------------------------------------- */
const FIGMA_TOGGLES = [
  { id: 'ft-grid', label: 'Show Grid', icon: '#' },
  { id: 'ft-rulers', label: 'Rulers', icon: '|' },
  { id: 'ft-snap', label: 'Snap to Grid', icon: '+' },
  { id: 'ft-guides', label: 'Guides', icon: '-' },
  { id: 'ft-outline', label: 'Outline Mode', icon: 'O' },
  { id: 'ft-proto', label: 'Prototyping', icon: 'P' },
]

const FigmaPluginToggleRender = () => {
  const [active, setActive] = useState<Record<string, boolean>>({
    'ft-grid': true, 'ft-snap': true, 'ft-guides': false, 'ft-rulers': false, 'ft-outline': false, 'ft-proto': true,
  })
  return (
    <div style={{ width: 200, background: '#2c2c2c', borderRadius: 10, padding: '12px 0', color: '#fff', fontFamily: 'monospace' }}>
      <div style={{ padding: '4px 12px 10px', fontSize: 11, color: '#888', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        View Options
      </div>
      {FIGMA_TOGGLES.map((t) => (
        <div key={t.id} onClick={() => setActive((p) => ({ ...p, [t.id]: !p[t.id] }))} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 12px', cursor: 'pointer', background: active[t.id] ? 'rgba(99,102,241,0.15)' : 'transparent', transition: 'background 0.15s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 16, height: 16, borderRadius: 3, background: active[t.id] ? '#6366f1' : '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', flexShrink: 0 }}>{t.icon}</span>
            <span style={{ fontSize: 12, color: active[t.id] ? '#e2e8f0' : '#888' }}>{t.label}</span>
          </div>
          <Switch
            id={t.id}
            checked={active[t.id]}
            onCheckedChange={() => setActive((p) => ({ ...p, [t.id]: !p[t.id] }))}
          />
        </div>
      ))}
      <div style={{ padding: '10px 12px 4px', fontSize: 10, color: '#555' }}>
        Figma Plugin UI — 고밀도 뷰 옵션 토글 패널
      </div>
    </div>
  )
}

export const Figma_플러그인_뷰_옵션_패널: Story = {
  name: 'Figma Plugin UI - 컴팩트 뷰 옵션 토글 패널',
  parameters: {
    docs: {
      description: {
        story:
          'Figma 플러그인 UI 패턴. 다크 배경 + 아이콘 + 컴팩트 행 높이(30px)로 고밀도 토글 패널을 구현합니다. 전체 행 클릭으로 토글 가능하며 활성 항목은 강조색 배경으로 구분됩니다.',
      },
    },
  },
  render: () => <FigmaPluginToggleRender />,
}

/* --------------------------------------------------------------------------
   MUI + Figma — 데이터 시각화 레이어 토글
   MUI DataGrid 컬럼 표시/숨김 + Figma 레이어 토글 조합
-------------------------------------------------------------------------- */
const DATA_COLUMNS = [
  { id: 'col-name', label: '이름', required: true },
  { id: 'col-email', label: '이메일', required: true },
  { id: 'col-role', label: '역할', required: false },
  { id: 'col-join', label: '가입일', required: false },
  { id: 'col-last', label: '마지막 로그인', required: false },
  { id: 'col-status', label: '상태', required: false },
  { id: 'col-plan', label: '플랜', required: false },
]

const ColumnVisibilityRender = () => {
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(DATA_COLUMNS.map((c) => [c.id, true]))
  )
  const visibleCount = Object.values(visible).filter(Boolean).length
  const toggleAll = () => {
    const allVisible = DATA_COLUMNS.filter((c) => !c.required).every((c) => visible[c.id])
    setVisible((prev) => {
      const next = { ...prev }
      DATA_COLUMNS.filter((c) => !c.required).forEach((c) => { next[c.id] = !allVisible })
      return next
    })
  }
  return (
    <div style={{ width: 280, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>컬럼 표시 ({visibleCount}/{DATA_COLUMNS.length})</span>
        <button onClick={toggleAll} style={{ fontSize: 12, color: '#6366f1', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}>
          {DATA_COLUMNS.filter((c) => !c.required).every((c) => visible[c.id]) ? '선택 해제' : '전체 선택'}
        </button>
      </div>
      {DATA_COLUMNS.map((col) => (
        <div key={col.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#0f172a' }}>{col.label}</span>
            {col.required && (
              <span style={{ fontSize: 10, color: '#94a3b8', background: '#f1f5f9', padding: '1px 6px', borderRadius: 4 }}>필수</span>
            )}
          </div>
          <Switch
            id={col.id}
            checked={visible[col.id]}
            disabled={col.required}
            onCheckedChange={() => !col.required && setVisible((p) => ({ ...p, [col.id]: !p[col.id] }))}
          />
        </div>
      ))}
      <div style={{ padding: '10px 16px', fontSize: 11, color: '#94a3b8' }}>
        MUI DataGrid + Figma Layer — 컬럼 가시성 토글 패턴
      </div>
    </div>
  )
}

export const MUI_Figma_컬럼_가시성_토글: Story = {
  name: 'MUI DataGrid + Figma Layer - 컬럼 가시성 토글',
  parameters: {
    docs: {
      description: {
        story:
          'MUI DataGrid의 컬럼 표시/숨김 패널 + Figma의 레이어 토글 패턴 조합. 필수 컬럼은 disabled 처리하고, 전체 선택/해제 버튼으로 일괄 처리가 가능합니다.',
      },
    },
  },
  render: () => <ColumnVisibilityRender />,
}

/* --------------------------------------------------------------------------
   Apple HIG 벤치마크: 세부 설정 그룹 스위치
   Apple Settings Detail Screen — 그룹별 Switch 목록 + 그룹 설명 푸터
-------------------------------------------------------------------------- */
type HigSwitchGroup = { title: string; footer: string; items: { id: string; label: string; desc?: string }[] }

const HIG_SWITCH_GROUPS: HigSwitchGroup[] = [
  {
    title: '사생활 보호',
    footer: '이 설정은 앱이 기기 데이터에 접근하는 방식을 제어합니다.',
    items: [
      { id: 'location', label: '위치 서비스', desc: '백그라운드 위치 추적 허용' },
      { id: 'contacts', label: '연락처 접근', desc: '주소록 데이터 읽기 허용' },
      { id: 'camera', label: '카메라', desc: '사진 촬영 및 동영상 녹화' },
    ],
  },
  {
    title: '알림',
    footer: '알림 배지는 앱 아이콘에 표시됩니다.',
    items: [
      { id: 'push', label: '푸시 알림' },
      { id: 'badge', label: '배지 표시' },
      { id: 'sound', label: '알림 소리' },
    ],
  },
]

export const Apple_HIG_세부_설정_그룹: Story = {
  name: 'Apple HIG — 세부 설정 화면 그룹 스위치',
  parameters: {
    docs: {
      description: {
        story:
          'Apple HIG Settings Detail 화면 패턴. 그룹 제목 + Switch 목록 + 그룹 설명 푸터로 구성. ' +
          '각 항목은 레이블/설명 2줄 구조, 그룹 간 명확한 시각적 구분.',
      },
    },
  },
  render: function AppleHIGDetailSettings() {
    const [switches, setSwitches] = useState<Record<string, boolean>>({
      location: true, contacts: false, camera: true,
      push: true, badge: true, sound: false,
    })

    const toggle = (id: string) => {
      setSwitches((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
      <div style={{ width: 320, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f2f2f7', borderRadius: 16, overflow: 'hidden' }}>
        {HIG_SWITCH_GROUPS.map((group, gi) => (
          <div key={group.title} style={{ marginBottom: gi < HIG_SWITCH_GROUPS.length - 1 ? 16 : 0 }}>
            <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 600, color: '#6d6d72', textTransform: 'uppercase', letterSpacing: 0.4 }}>
              {group.title}
            </div>
            <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', margin: '0 0' }}>
              {group.items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '12px 16px',
                    borderTop: idx === 0 ? 'none' : '1px solid #f2f2f7',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggle(item.id)}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: '#000', fontWeight: 400 }}>{item.label}</div>
                    {item.desc && <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 1 }}>{item.desc}</div>}
                  </div>
                  <Switch
                    checked={switches[item.id]}
                    onCheckedChange={() => toggle(item.id)}
                  />
                </div>
              ))}
            </div>
            <div style={{ padding: '4px 16px 8px', fontSize: 12, color: '#8e8e93', lineHeight: 1.5 }}>
              {group.footer}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 기기 권한 토글 패널
   M3 Permission Settings — 아이콘 + 권한명 + 상태 설명 + Switch 패턴
-------------------------------------------------------------------------- */
type M3Permission = { id: string; icon: string; name: string; desc: string; risk: 'high' | 'medium' | 'low' }

const M3_PERMISSIONS: M3Permission[] = [
  { id: 'location', icon: 'LOC', name: '위치', desc: '앱이 기기 위치에 접근합니다', risk: 'high' },
  { id: 'camera', icon: 'CAM', name: '카메라', desc: '사진 및 동영상 촬영을 허용합니다', risk: 'medium' },
  { id: 'microphone', icon: 'MIC', name: '마이크', desc: '오디오 녹음을 허용합니다', risk: 'medium' },
  { id: 'contacts', icon: 'CON', name: '연락처', desc: '주소록 데이터를 읽습니다', risk: 'high' },
  { id: 'storage', icon: 'STO', name: '저장소', desc: '파일 읽기/쓰기를 허용합니다', risk: 'low' },
  { id: 'notifications', icon: 'NTF', name: '알림', desc: '앱 알림을 표시합니다', risk: 'low' },
]

const M3_RISK_COLOR: Record<M3Permission['risk'], string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
}

export const Material3_기기_권한_토글: Story = {
  name: 'Google Material 3 — 기기 권한 토글 패널',
  parameters: {
    docs: {
      description: {
        story:
          'M3 App Permission Settings 패턴. 권한별 아이콘 + 이름 + 설명 + 위험도 색상 + Switch. ' +
          '위험도(high/medium/low)를 색상 배지로 표시해 권한 민감도를 직관적으로 안내.',
      },
    },
  },
  render: function M3PermissionPanel() {
    const [permissions, setPermissions] = useState<Record<string, boolean>>(
      Object.fromEntries(M3_PERMISSIONS.map((p) => [p.id, p.risk === 'low']))
    )

    const toggle = (id: string) => {
      setPermissions((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const grantedCount = Object.values(permissions).filter(Boolean).length

    return (
      <div style={{ width: 360, borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: '14px 16px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc' }}>앱 권한</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Orbit UI — {grantedCount}/{M3_PERMISSIONS.length} 허용됨</div>
          </div>
          <button
            onClick={() => setPermissions(Object.fromEntries(M3_PERMISSIONS.map((p) => [p.id, false])))}
            style={{ fontSize: 11, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            전체 거부
          </button>
        </div>

        {M3_PERMISSIONS.map((perm, idx) => (
          <div
            key={perm.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
              borderTop: idx === 0 ? 'none' : '1px solid #f1f5f9',
              background: permissions[perm.id] ? '#f0fdf4' : '#fff',
              transition: 'background 0.15s', cursor: 'pointer',
            }}
            onClick={() => toggle(perm.id)}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: M3_RISK_COLOR[perm.risk] + '18',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 800, color: M3_RISK_COLOR[perm.risk],
              flexShrink: 0, letterSpacing: -0.5,
            }}>
              {perm.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{perm.name}</span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: M3_RISK_COLOR[perm.risk], display: 'inline-block' }} />
              </div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{perm.desc}</div>
            </div>
            <Switch
              checked={permissions[perm.id]}
              onCheckedChange={() => toggle(perm.id)}
            />
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Apple HIG 벤치마크: 빠른 설정 패널
   Apple Control Center — 기능별 아이콘 타일 + Switch 토글 패턴
-------------------------------------------------------------------------- */
type HigQuickSetting = { id: string; label: string; icon: string; color: string }

const HIG_QUICK_SETTINGS: HigQuickSetting[] = [
  { id: 'wifi', label: 'Wi-Fi', icon: 'WIFI', color: '#3b82f6' },
  { id: 'bluetooth', label: 'Bluetooth', icon: 'BT', color: '#3b82f6' },
  { id: 'dnd', label: '방해 금지', icon: 'DND', color: '#8b5cf6' },
  { id: 'darkmode', label: '다크 모드', icon: 'DARK', color: '#1e293b' },
  { id: 'lowpower', label: '저전력 모드', icon: 'PWR', color: '#f59e0b' },
  { id: 'focusmode', label: '집중 모드', icon: 'FOCUS', color: '#10b981' },
]

export const Apple_HIG_빠른_설정_패널: Story = {
  name: 'Apple HIG — 빠른 설정 Control Center 패널',
  parameters: {
    docs: {
      description: {
        story:
          'Apple Control Center 빠른 설정 패턴. 아이콘 타일 + Switch 토글을 격자로 배치. ' +
          '활성화 시 타일 배경 채워짐 + 아이콘 색상 전환으로 즉각적인 피드백.',
      },
    },
  },
  render: function AppleQuickSettings() {
    const [settings, setSettings] = useState<Record<string, boolean>>(
      { wifi: true, bluetooth: true, dnd: false, darkmode: false, lowpower: false, focusmode: false }
    )

    const toggle = (id: string) => {
      setSettings((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
      <div style={{ width: 280, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>빠른 설정</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {HIG_QUICK_SETTINGS.map((setting) => {
            const isOn = settings[setting.id]
            return (
              <div
                key={setting.id}
                onClick={() => toggle(setting.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 8px', borderRadius: 14, cursor: 'pointer',
                  background: isOn ? setting.color : '#f1f5f9',
                  transition: 'background 0.2s',
                  minHeight: 72,
                }}
              >
                <div style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: -0.5,
                  color: isOn ? '#fff' : '#64748b',
                  background: isOn ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                  borderRadius: 8, padding: '5px 7px',
                }}>
                  {setting.icon}
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: isOn ? '#fff' : '#374151', textAlign: 'center', marginBottom: 4 }}>
                    {setting.label}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Switch
                      checked={isOn}
                      onCheckedChange={() => toggle(setting.id)}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
}

// ============================================================
// Cycle 137 — Linear Design + Radix UI 벤치마크 반영
// ============================================================

// Linear 스타일 — 알림 환경설정 스위치 패널 (컴팩트)
const LINEAR_NOTIF_SETTINGS_137 = [
  { id: 'issue_assigned', label: '이슈 담당자 지정', desc: '내가 담당자로 지정될 때', on: true },
  { id: 'issue_mentioned', label: '이슈 멘션', desc: '댓글에서 @멘션될 때', on: true },
  { id: 'pr_review', label: 'PR 리뷰 요청', desc: '리뷰어로 지정될 때', on: true },
  { id: 'deploy_done', label: '배포 완료', desc: 'Production 배포가 완료될 때', on: false },
  { id: 'cycle_update', label: '사이클 업데이트', desc: '사이클 목표가 변경될 때', on: false },
]

export const Linear_알림_환경설정_패널: Story = {
  name: 'Linear — 알림 환경설정 스위치 패널 (Cycle 137)',
  parameters: {
    docs: {
      description: {
        story:
          'Linear Notification Settings 패턴. 알림 항목별 on/off 스위치 + 설명 서브텍스트. ' +
          '상단 "전체 알림" 마스터 스위치로 일괄 제어. 변경 즉시 하단 저장 버튼 활성화.',
      },
    },
  },
  render: function LinearNotifSettingsRender() {
    const [settings, setSettings] = useState(LINEAR_NOTIF_SETTINGS_137)
    const [saved, setSaved] = useState(true)

    function toggleItem(id: string) {
      setSettings((prev) => prev.map((s) => s.id === id ? { ...s, on: !s.on } : s))
      setSaved(false)
    }

    const allOn = settings.every((s) => s.on)
    const masterState = allOn ? true : settings.some((s) => s.on) ? 'indeterminate' : false

    function toggleAll() {
      setSettings((prev) => prev.map((s) => ({ ...s, on: !allOn })))
      setSaved(false)
    }

    return (
      <div style={{ width: 360, fontFamily: 'system-ui, sans-serif', background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {/* 마스터 스위치 */}
        <div style={{ padding: '14px 18px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>전체 알림</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>모든 알림을 한번에 제어합니다</div>
          </div>
          <Switch
            checked={masterState === true}
            onCheckedChange={toggleAll}
          />
        </div>
        {/* 개별 알림 설정 */}
        {settings.map((s) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid #f8fafc' }}>
            <div style={{ opacity: masterState === false ? 0.4 : 1, transition: 'opacity 200ms' }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#0f172a' }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{s.desc}</div>
            </div>
            <Switch
              checked={s.on}
              onCheckedChange={() => toggleItem(s.id)}
              disabled={masterState === false}
            />
          </div>
        ))}
        {/* 저장 버튼 */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            disabled={saved}
            onClick={() => setSaved(true)}
            style={{
              padding: '6px 16px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600,
              background: saved ? '#f1f5f9' : '#0f172a', color: saved ? '#94a3b8' : '#fff',
              cursor: saved ? 'default' : 'pointer', transition: 'all 200ms',
            }}
          >
            {saved ? '저장됨' : '저장'}
          </button>
        </div>
      </div>
    )
  },
}

// Radix UI 스타일 — 테마 / 접근성 설정 (고대비, 모션 감소)
const RADIX_A11Y_SETTINGS_137 = [
  { id: 'high_contrast', label: '고대비 모드', desc: '색상 대비를 높여 가독성을 개선합니다 (WCAG AA 기준)', on: false, badge: 'AA' },
  { id: 'reduce_motion', label: '모션 감소', desc: '애니메이션과 전환 효과를 최소화합니다', on: false, badge: null },
  { id: 'large_text', label: '큰 텍스트', desc: '기본 폰트 크기를 18px로 설정합니다', on: false, badge: null },
  { id: 'focus_ring', label: '포커스 링 강조', desc: '키보드 탐색 시 포커스 인디케이터를 강하게 표시합니다', on: true, badge: null },
]

export const Radix_접근성_설정_스위치: Story = {
  name: 'Radix UI — 접근성 설정 스위치 (Cycle 137)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI AccessibilitySettings 패턴. 고대비/모션감소/큰텍스트/포커스링 등 접근성 옵션. ' +
          '각 항목 설명 + 뱃지(WCAG 기준 표시). 토글 시 미리보기 영역에 즉시 반영.',
      },
    },
  },
  render: function RadixA11ySettingsRender() {
    const [settings, setSettings] = useState(RADIX_A11Y_SETTINGS_137)

    function toggle(id: string) {
      setSettings((prev) => prev.map((s) => s.id === id ? { ...s, on: !s.on } : s))
    }

    const highContrast = settings.find((s) => s.id === 'high_contrast')?.on
    const largeText = settings.find((s) => s.id === 'large_text')?.on

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
        {/* 미리보기 */}
        <div style={{
          padding: '16px', borderRadius: 12, border: `2px solid ${highContrast ? '#000' : '#e2e8f0'}`,
          background: highContrast ? '#000' : '#f8fafc', marginBottom: 14, transition: 'all 300ms',
        }}>
          <div style={{ fontSize: largeText ? 18 : 14, fontWeight: 600, color: highContrast ? '#fff' : '#0f172a', transition: 'all 300ms' }}>
            접근성 미리보기
          </div>
          <div style={{ fontSize: largeText ? 15 : 12, color: highContrast ? '#e2e8f0' : '#64748b', marginTop: 4, transition: 'all 300ms' }}>
            설정 변경 시 즉시 반영됩니다.
          </div>
        </div>
        {/* 설정 목록 */}
        <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {settings.map((s) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #f1f5f9', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.label}</span>
                  {s.badge && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: '#dbeafe', color: '#1d4ed8' }}>{s.badge}</span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
              <Switch
                checked={s.on}
                onCheckedChange={() => toggle(s.id)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  },
}

// Linear + Radix — 기능 플래그 토글 (개발자 도구 패턴)
const FEATURE_FLAGS_137 = [
  { id: 'dark_mode', label: 'Dark Mode', env: 'beta', on: true, risk: 'low' },
  { id: 'new_datatable', label: 'New DataTable v2', env: 'alpha', on: false, risk: 'medium' },
  { id: 'ai_suggest', label: 'AI Token Suggest', env: 'experimental', on: false, risk: 'high' },
  { id: 'perf_monitor', label: 'Performance Monitor', env: 'beta', on: true, risk: 'low' },
  { id: 'mdx_live', label: 'MDX Live Preview', env: 'stable', on: true, risk: 'low' },
]

const RISK_STYLE_137: Record<string, { bg: string; color: string }> = {
  low: { bg: '#f0fdf4', color: '#16a34a' },
  medium: { bg: '#fffbeb', color: '#d97706' },
  high: { bg: '#fef2f2', color: '#dc2626' },
}

const ENV_STYLE_137: Record<string, string> = {
  stable: '#64748b',
  beta: '#6366f1',
  alpha: '#0ea5e9',
  experimental: '#ec4899',
}

export const Linear_Radix_기능_플래그_토글: Story = {
  name: 'Linear + Radix — 기능 플래그 토글 패널 (Cycle 137)',
  parameters: {
    docs: {
      description: {
        story:
          'Linear Feature Flags + Radix Switch 통합 개발자 도구 패턴. ' +
          '환경(stable/beta/alpha/experimental) 배지 + 리스크 레벨(low/medium/high) 표시. ' +
          'high risk 플래그 활성화 시 경고 텍스트 인라인 표시.',
      },
    },
  },
  render: function LinearRadixFeatureFlagsRender() {
    const [flags, setFlags] = useState(FEATURE_FLAGS_137)

    function toggle(id: string) {
      setFlags((prev) => prev.map((f) => f.id === id ? { ...f, on: !f.on } : f))
    }

    return (
      <div style={{ width: 420, fontFamily: 'monospace, system-ui, sans-serif', background: '#0f172a', borderRadius: 14, overflow: 'hidden', border: '1px solid #1e293b' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 1 }}>FEATURE FLAGS</span>
          <span style={{ fontSize: 11, color: '#475569' }}>{flags.filter((f) => f.on).length}/{flags.length} 활성</span>
        </div>
        {flags.map((f) => {
          const risk = RISK_STYLE_137[f.risk]
          return (
            <div key={f.id} style={{ padding: '12px 18px', borderBottom: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', fontFamily: 'monospace' }}>{f.label}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: ENV_STYLE_137[f.env] + '22', color: ENV_STYLE_137[f.env] }}>{f.env}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 4, background: risk.bg + '22', color: risk.color }}>{f.risk}</span>
                  </div>
                  {f.on && f.risk === 'high' && (
                    <div style={{ fontSize: 11, color: '#fca5a5', marginTop: 4 }}>주의: 실험적 기능입니다. 예기치 않은 동작이 발생할 수 있습니다.</div>
                  )}
                </div>
                <Switch
                  checked={f.on}
                  onCheckedChange={() => toggle(f.id)}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  },
}

// ──────────────────────────────────────────────────────────────────────────────
// Cycle 165: Ant Design + Radix UI
// ──────────────────────────────────────────────────────────────────────────────

export const AntDesign_시스템_알림_설정_토글: Story = {
  name: 'Ant Design — 시스템 알림 설정 토글 (Cycle 165)',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Switch 패턴. 알림 채널별 on/off 설정 패널. ' +
          '이메일/푸시/SMS/Slack 알림을 개별 스위치로 제어.',
      },
    },
  },
  render: function AntNotificationSettingsRender() {
    const [settings, setSettings] = useState({
      email: true,
      push: true,
      sms: false,
      slack: true,
      marketing: false,
      digest: true,
    })

    const toggle = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const channels = [
      { key: 'email' as const, label: '이메일 알림', desc: '중요 업데이트 및 보안 알림', icon: '✉️' },
      { key: 'push' as const, label: '푸시 알림', desc: '실시간 앱 알림', icon: '🔔' },
      { key: 'sms' as const, label: 'SMS 알림', desc: '긴급 보안 코드', icon: '💬' },
      { key: 'slack' as const, label: 'Slack 연동', desc: '팀 채널 알림 전송', icon: '⚡' },
      { key: 'marketing' as const, label: '마케팅 수신', desc: '뉴스레터 및 프로모션', icon: '📢' },
      { key: 'digest' as const, label: '주간 다이제스트', desc: '매주 월요일 요약 리포트', icon: '📊' },
    ]

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>알림 설정</div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
            {Object.values(settings).filter(Boolean).length}개 채널 활성
          </div>
        </div>
        {channels.map((ch) => (
          <div
            key={ch.key}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #f9fafb' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>{ch.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{ch.label}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{ch.desc}</div>
              </div>
            </div>
            <Switch checked={settings[ch.key]} onCheckedChange={() => toggle(ch.key)} />
          </div>
        ))}
      </div>
    )
  },
}

export const RadixUI_개발자_환경_설정_스위치: Story = {
  name: 'Radix UI — 개발자 환경 설정 스위치 (Cycle 165)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI Switch 패턴. IDE/개발 환경 설정 패널. ' +
          '실험적 기능 토글 + 위험도 경고 + 그룹별 설정 구성.',
      },
    },
  },
  render: function RadixDevSettingsRender() {
    const [config, setConfig] = useState({
      typescript: true,
      eslint: true,
      prettier: true,
      hotReload: true,
      sourceMap: false,
      experimental: false,
      telemetry: false,
      debugMode: false,
    })

    const toggle = (key: keyof typeof config) => {
      setConfig((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const groups = [
      {
        title: '언어 & 린팅',
        items: [
          { key: 'typescript' as const, label: 'TypeScript 엄격 모드', danger: false },
          { key: 'eslint' as const, label: 'ESLint 자동 수정', danger: false },
          { key: 'prettier' as const, label: 'Prettier 포맷팅', danger: false },
        ],
      },
      {
        title: '빌드 옵션',
        items: [
          { key: 'hotReload' as const, label: 'Hot Module Reload', danger: false },
          { key: 'sourceMap' as const, label: 'Source Map 생성', danger: false },
        ],
      },
      {
        title: '실험적 기능',
        items: [
          { key: 'experimental' as const, label: 'Experimental Features', danger: true },
          { key: 'debugMode' as const, label: 'Debug Mode', danger: true },
          { key: 'telemetry' as const, label: '사용 통계 수집', danger: false },
        ],
      },
    ]

    return (
      <div style={{ width: 360, fontFamily: 'monospace, system-ui', background: '#1e1e2e', borderRadius: 14, overflow: 'hidden', border: '1px solid #313244' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #313244' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#cdd6f4' }}>개발자 설정</span>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <div style={{ padding: '10px 18px 6px', fontSize: 10, fontWeight: 700, color: '#585b70', letterSpacing: 1 }}>
              {group.title.toUpperCase()}
            </div>
            {group.items.map((item) => (
              <div
                key={item.key}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', borderBottom: '1px solid #181825' }}
              >
                <div>
                  <span style={{ fontSize: 13, color: item.danger ? '#f38ba8' : '#cdd6f4' }}>{item.label}</span>
                  {item.danger && config[item.key] && (
                    <div style={{ fontSize: 10, color: '#fab387', marginTop: 2 }}>⚠ 프로덕션 환경에서 비활성화 권장</div>
                  )}
                </div>
                <Switch checked={config[item.key]} onCheckedChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  },
}

export const Ant_Radix_권한_관리_토글_패널: Story = {
  name: 'Ant Design + Radix UI — 권한 관리 토글 패널 (Cycle 165)',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design + Radix Switch 통합 RBAC 패턴. 역할별 기능 권한을 스위치로 일괄/개별 제어. ' +
          '역할(Admin/Editor/Viewer) 선택 + 권한 그룹별 토글.',
      },
    },
  },
  render: function AntRadixRBACRender() {
    type Role = 'admin' | 'editor' | 'viewer'
    const [role, setRole] = useState<Role>('editor')
    const [perms, setPerms] = useState<Record<string, boolean>>({
      read: true,
      write: true,
      delete: false,
      publish: false,
      manageUsers: false,
      viewAnalytics: true,
      exportData: false,
      manageSettings: false,
    })

    const ROLE_DEFAULTS: Record<Role, Record<string, boolean>> = {
      admin: { read: true, write: true, delete: true, publish: true, manageUsers: true, viewAnalytics: true, exportData: true, manageSettings: true },
      editor: { read: true, write: true, delete: false, publish: false, manageUsers: false, viewAnalytics: true, exportData: false, manageSettings: false },
      viewer: { read: true, write: false, delete: false, publish: false, manageUsers: false, viewAnalytics: false, exportData: false, manageSettings: false },
    }

    const selectRole = (r: Role) => {
      setRole(r)
      setPerms(ROLE_DEFAULTS[r])
    }

    const permGroups = [
      { label: '콘텐츠', keys: ['read', 'write', 'delete', 'publish'] },
      { label: '관리', keys: ['manageUsers', 'manageSettings'] },
      { label: '데이터', keys: ['viewAnalytics', 'exportData'] },
    ]

    const permLabels: Record<string, string> = {
      read: '읽기', write: '쓰기', delete: '삭제', publish: '게시',
      manageUsers: '사용자 관리', viewAnalytics: '분석 보기', exportData: '데이터 내보내기', manageSettings: '설정 관리',
    }

    const roleColors: Record<Role, string> = { admin: '#ef4444', editor: '#3b82f6', viewer: '#6b7280' }

    return (
      <div style={{ width: 400, fontFamily: 'system-ui, sans-serif', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 10 }}>권한 관리</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['admin', 'editor', 'viewer'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => selectRole(r)}
                style={{
                  padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  background: role === r ? roleColors[r] : '#e5e7eb',
                  color: role === r ? '#fff' : '#6b7280',
                }}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {permGroups.map((group) => (
          <div key={group.label}>
            <div style={{ padding: '10px 20px 4px', fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: 1 }}>
              {group.label.toUpperCase()}
            </div>
            {group.keys.map((key) => (
              <div
                key={key}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #f9fafb' }}
              >
                <span style={{ fontSize: 13, color: '#374151' }}>{permLabels[key]}</span>
                <Switch
                  checked={perms[key]}
                  onCheckedChange={() => setPerms((p) => ({ ...p, [key]: !p[key] }))}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  },
}
