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
