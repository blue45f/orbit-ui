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

/* --------------------------------------------------------------------------
   Linear 스타일: 컴팩트 뷰 옵션 패널
   Linear의 Display settings 패널에서 영감받은 컴팩트 토글 그룹
-------------------------------------------------------------------------- */
const CompactViewOptionsRender = () => {
  const [options, setOptions] = useState({
    groupByPriority: true,
    showSubIssues: false,
    showEmptyGroups: false,
    showCompletedIssues: true,
    compactMode: false,
  })

  const toggle = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const groups: Array<{
    title: string
    items: Array<{ key: keyof typeof options; label: string }>
  }> = [
    {
      title: 'Grouping',
      items: [
        { key: 'groupByPriority', label: 'Group by priority' },
        { key: 'showEmptyGroups', label: 'Show empty groups' },
      ],
    },
    {
      title: 'Display',
      items: [
        { key: 'showSubIssues', label: 'Show sub-issues' },
        { key: 'showCompletedIssues', label: 'Show completed' },
        { key: 'compactMode', label: 'Compact mode' },
      ],
    },
  ]

  return (
    <div
      style={{
        width: '240px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        background: '#fff',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px 14px',
          borderBottom: '1px solid #f1f5f9',
          fontSize: '12px',
          fontWeight: 700,
          color: '#0f172a',
          letterSpacing: '-0.01em',
        }}
      >
        Display
      </div>
      {groups.map((group, gi) => (
        <div key={group.title}>
          <div
            style={{
              padding: '8px 14px 4px',
              fontSize: '10px',
              fontWeight: 700,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {group.title}
          </div>
          {group.items.map(({ key, label }) => (
            <div
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 14px',
                cursor: 'pointer',
              }}
              onClick={() => toggle(key)}
            >
              <span style={{ fontSize: '12px', color: '#1e293b', fontWeight: 400 }}>{label}</span>
              <Toggle
                checked={options[key]}
                onCheckedChange={() => toggle(key)}
              />
            </div>
          ))}
          {gi < groups.length - 1 && (
            <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />
          )}
        </div>
      ))}
    </div>
  )
}

export const Linear_뷰_옵션_패널: Story = {
  render: () => <CompactViewOptionsRender />,
}

/* --------------------------------------------------------------------------
   Linear 스타일: 프로젝트 기능 플래그 토글
   Linear의 프로젝트 설정에서 볼 수 있는 기능 활성화 토글 패턴
-------------------------------------------------------------------------- */
const FeatureFlagsRender = () => {
  const [flags, setFlags] = useState({
    cycles: true,
    modules: false,
    githubSync: true,
    slackNotify: false,
    aiSummary: false,
    roadmap: true,
  })

  const toggle = (key: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const features: Array<{
    key: keyof typeof flags
    label: string
    desc: string
    badge?: string
  }> = [
    { key: 'cycles', label: 'Cycles', desc: '스프린트 단위 이슈 관리를 활성화합니다.' },
    { key: 'modules', label: 'Modules', desc: '이슈를 모듈별로 그룹화합니다.' },
    { key: 'githubSync', label: 'GitHub Sync', desc: 'PR과 이슈를 자동으로 연결합니다.' },
    { key: 'slackNotify', label: 'Slack Notifications', desc: 'Slack 채널에 알림을 전송합니다.' },
    { key: 'aiSummary', label: 'AI Summary', desc: '이슈 내용을 AI가 자동 요약합니다.', badge: 'Beta' },
    { key: 'roadmap', label: 'Roadmap', desc: '타임라인 뷰에서 로드맵을 확인합니다.' },
  ]

  const activeCount = Object.values(flags).filter(Boolean).length

  return (
    <div style={{ maxWidth: '480px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>기능 설정</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
            {activeCount}개 활성화
          </div>
        </div>
      </div>
      <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {features.map(({ key, label, desc, badge }, i) => (
          <div
            key={key}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 18px',
              borderBottom: i < features.length - 1 ? '1px solid #f8fafc' : 'none',
              background: flags[key] ? 'rgba(99,102,241,0.02)' : '#fff',
              transition: 'background 0.15s',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{label}</span>
                {badge && (
                  <span
                    style={{
                      padding: '1px 6px',
                      borderRadius: '4px',
                      background: '#f0f0ff',
                      color: '#6366f1',
                      fontSize: '10px',
                      fontWeight: 700,
                    }}
                  >
                    {badge}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{desc}</div>
            </div>
            <Toggle
              checked={flags[key]}
              onCheckedChange={() => toggle(key)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_기능_플래그: Story = {
  render: () => <FeatureFlagsRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: useColorMode 패턴
   Chakra UI의 useColorMode hook + ColorModeButton 패턴에 대응하는
   Toggle 기반 테마/다크모드 전환 UI — EclipseProvider와 연동되는 시뮬레이션
-------------------------------------------------------------------------- */
const ColorModeToggleRender = () => {
  const [isDark, setIsDark] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const bg = isDark ? '#0f172a' : '#fff'
  const surface = isDark ? '#1e293b' : '#f8fafc'
  const fg = isDark ? '#f1f5f9' : '#1e293b'
  const fgSub = isDark ? '#94a3b8' : '#64748b'
  const border = isDark ? '#334155' : '#e2e8f0'
  const borderSub = isDark ? '#1e293b' : '#f1f5f9'
  const accent = '#6366f1'

  const modes = [
    {
      key: 'dark',
      label: '다크 모드',
      desc: isDark ? '다크 테마가 적용되어 있습니다' : '라이트 테마가 적용되어 있습니다',
      value: isDark,
      onChange: setIsDark,
    },
    {
      key: 'contrast',
      label: '고대비 모드',
      desc: highContrast ? '텍스트 대비가 강화되었습니다' : 'WCAG AA 기본 대비 적용',
      value: highContrast,
      onChange: setHighContrast,
    },
    {
      key: 'motion',
      label: '애니메이션 줄이기',
      desc: reducedMotion ? '애니메이션이 최소화됩니다' : '일반 애니메이션 효과 사용',
      value: reducedMotion,
      onChange: setReducedMotion,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '420px' }}>
      {/* 미리보기 카드 */}
      <div
        style={{
          borderRadius: '16px',
          border: `1.5px solid ${border}`,
          background: bg,
          overflow: 'hidden',
          transition: 'all 0.25s ease',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${borderSub}`,
            background: surface,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 700, color: fg }}>테마 미리보기</span>
          <div
            style={{
              padding: '4px 10px',
              borderRadius: '100px',
              background: isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)',
              color: accent,
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            {isDark ? 'Dark' : 'Light'}
          </div>
        </div>
        {/* 본문 */}
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: fg }}>Orbit UI Eclipse Theme</div>
          <div style={{ fontSize: '12px', color: fgSub, lineHeight: '1.6' }}>
            Chakra UI의 <code style={{ background: surface, padding: '1px 5px', borderRadius: '4px', fontFamily: 'monospace', color: accent }}>useColorMode</code> 패턴에 대응하여
            Toggle 컴포넌트로 테마 전환 UI를 구현한 예시입니다.
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
            {['Primary', 'Secondary', 'Muted'].map((label, _i) => (
              <div
                key={label}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${border}`,
                  background: _i === 0 ? accent : surface,
                  color: _i === 0 ? '#fff' : fg,
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 접근성 설정 토글 패널 */}
      <div
        style={{
          borderRadius: '12px',
          border: '1.5px solid #e2e8f0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #f1f5f9',
            background: '#f8fafc',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>접근성 설정</div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
            Chakra UI colorMode + accessibility 통합 패턴
          </div>
        </div>
        {modes.map(({ key, label, desc, value, onChange }) => (
          <div
            key={key}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              borderBottom: '1px solid #f8fafc',
              background: value ? 'rgba(99,102,241,0.03)' : '#fff',
              transition: 'background 0.15s',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{label}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{desc}</div>
            </div>
            <Toggle checked={value} onCheckedChange={onChange} />
          </div>
        ))}
      </div>
    </div>
  )
}

export const Chakra_컬러모드_토글: Story = {
  render: () => <ColorModeToggleRender />,
}
