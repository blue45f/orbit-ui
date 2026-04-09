import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Toggle } from './Toggle'

Toggle.displayName = 'Toggle'

const meta = {
  title: 'eclipse/Inputs/Selection/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      <Toggle {...args} />
      <span style={{ fontSize: '14px' }}>기본 토글</span>
    </label>
  ),
}

export const 디자인_QA: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <label htmlFor="toggle-basic" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <Toggle id="toggle-basic" />
        <span style={{ fontSize: '14px' }}>기본</span>
      </label>

      <label htmlFor="toggle-checked" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <Toggle id="toggle-checked" defaultChecked />
        <span style={{ fontSize: '14px' }}>기본 체크됨</span>
      </label>

      <label htmlFor="toggle-disabled" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', opacity: 0.5 }}>
        <Toggle id="toggle-disabled" disabled />
        <span style={{ fontSize: '14px' }}>비활성화</span>
      </label>

      <label htmlFor="toggle-disabled-checked" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', opacity: 0.5 }}>
        <Toggle id="toggle-disabled-checked" disabled defaultChecked />
        <span style={{ fontSize: '14px' }}>비활성화 (체크됨)</span>
      </label>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   설정 패널 패턴
   Ant Design Form 패턴: 여러 토글을 설정 항목으로 구성
-------------------------------------------------------------------------- */
const SettingsPanelRender = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false,
    emailDigest: true,
  })

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const items: Array<{ key: keyof typeof settings; label: string; desc: string }> = [
    { key: 'notifications', label: '푸시 알림', desc: '앱 내 이벤트 알림을 받습니다.' },
    { key: 'darkMode', label: '다크 모드', desc: '어두운 테마를 적용합니다.' },
    { key: 'autoSave', label: '자동 저장', desc: '편집 내용을 자동으로 저장합니다.' },
    { key: 'analytics', label: '사용 통계 수집', desc: '서비스 개선을 위한 익명 데이터를 전송합니다.' },
    { key: 'emailDigest', label: '이메일 다이제스트', desc: '주간 요약 이메일을 받습니다.' },
  ]

  return (
    <div style={{ maxWidth: '440px', borderRadius: '16px', border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>알림 및 개인정보</div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>설정을 변경하면 즉시 반영됩니다.</div>
      </div>
      {items.map(({ key, label, desc }, i) => (
        <div
          key={key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: i < items.length - 1 ? '1px solid #f1f5f9' : 'none',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>{label}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{desc}</div>
          </div>
          <Toggle
            checked={settings[key]}
            onCheckedChange={() => toggle(key)}
          />
        </div>
      ))}
    </div>
  )
}

export const 설정패널: Story = {
  render: () => <SettingsPanelRender />,
}

/* --------------------------------------------------------------------------
   인터랙티브 상태 표시
   토글 상태에 따라 UI가 변화하는 패턴 (Mantine controlled example)
-------------------------------------------------------------------------- */
const ControlledRender = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '320px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <Toggle checked={enabled} onCheckedChange={setEnabled} />
        <span style={{ fontSize: '14px', fontWeight: 500 }}>
          알림 활성화
        </span>
      </label>
      <div
        style={{
          padding: '16px',
          borderRadius: '12px',
          background: enabled ? 'rgba(99,102,241,0.08)' : '#f8fafc',
          border: `1.5px solid ${enabled ? '#6366f1' : '#e2e8f0'}`,
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: 600, color: enabled ? '#6366f1' : '#94a3b8' }}>
          {enabled ? '알림이 활성화되었습니다' : '알림이 꺼져 있습니다'}
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
          {enabled
            ? '새 이벤트가 발생하면 실시간으로 알림을 받습니다.'
            : '토글을 켜면 실시간 알림을 받을 수 있습니다.'}
        </div>
      </div>
    </div>
  )
}

export const 제어컴포넌트: Story = {
  render: () => <ControlledRender />,
}
