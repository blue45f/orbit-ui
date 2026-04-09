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
