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

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 스위치 설정 목록 (M3 Switch List)
   M3의 ListItem + Switch 조합 — 설정 화면의 토글 목록 패턴
-------------------------------------------------------------------------- */
const M3_SETTINGS = [
  {
    group: '개인정보 보호',
    items: [
      { key: 'location', label: '위치 서비스', desc: '앱이 위치 정보에 접근하도록 허용', defaultOn: true },
      { key: 'analytics', label: '사용 데이터 공유', desc: '제품 개선을 위해 익명 데이터 전송', defaultOn: false },
      { key: 'crashReport', label: '충돌 보고서', desc: '오류 발생 시 자동으로 보고서 제출', defaultOn: true },
    ],
  },
  {
    group: '알림',
    items: [
      { key: 'push', label: '푸시 알림', desc: '중요 업데이트 및 알림 수신', defaultOn: true },
      { key: 'email', label: '이메일 다이제스트', desc: '주간 활동 요약 이메일', defaultOn: false },
    ],
  },
]

function Material3SwitchListRender() {
  const [states, setStates] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    M3_SETTINGS.forEach((g) => g.items.forEach((i) => { init[i.key] = i.defaultOn }))
    return init
  })

  const toggle = (key: string) => setStates((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      {M3_SETTINGS.map((group) => (
        <div key={group.group} style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: '#6366f1',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '0 16px', marginBottom: 4,
          }}>
            {group.group}
          </div>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            {group.items.map((item, i) => (
              <div
                key={item.key}
                onClick={() => toggle(item.key)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', cursor: 'pointer',
                  borderBottom: i < group.items.length - 1 ? '1px solid #f1f5f9' : 'none',
                  background: states[item.key] ? 'rgba(99,102,241,0.02)' : '#fff',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ flex: 1, marginRight: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2, lineHeight: 1.4 }}>{item.desc}</div>
                </div>
                <Toggle
                  checked={states[item.key]}
                  onCheckedChange={() => toggle(item.key)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
        Google Material 3 Switch List 패턴 — 그룹핑된 토글 설정 목록
      </div>
    </div>
  )
}

export const Material3_스위치_설정_목록: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3의 Switch List 패턴. 설정 항목을 카테고리별로 그룹핑하고, 각 행 전체가 클릭 영역이 되어 Toggle 제어가 가능합니다.',
      },
    },
  },
  render: () => <Material3SwitchListRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 권한 토글 매트릭스
   Chakra UI의 Table + Switch 조합 — 역할별 권한 설정
-------------------------------------------------------------------------- */
type Permission = 'view' | 'edit' | 'delete' | 'admin'
type Role = 'viewer' | 'editor' | 'manager' | 'owner'

const ROLES: Role[] = ['viewer', 'editor', 'manager', 'owner']
const PERMISSIONS: Permission[] = ['view', 'edit', 'delete', 'admin']

const ROLE_LABELS: Record<Role, string> = {
  viewer: '뷰어', editor: '편집자', manager: '매니저', owner: '소유자',
}

const PERM_LABELS: Record<Permission, string> = {
  view: '보기', edit: '편집', delete: '삭제', admin: '관리',
}

const INITIAL_PERMS: Record<Role, Record<Permission, boolean>> = {
  viewer: { view: true, edit: false, delete: false, admin: false },
  editor: { view: true, edit: true, delete: false, admin: false },
  manager: { view: true, edit: true, delete: true, admin: false },
  owner: { view: true, edit: true, delete: true, admin: true },
}

function ChakraPermissionMatrixRender() {
  const [perms, setPerms] = useState<Record<Role, Record<Permission, boolean>>>(INITIAL_PERMS)

  const toggle = (role: Role, perm: Permission) => {
    if (role === 'owner') return
    setPerms((prev) => ({
      ...prev,
      [role]: { ...prev[role], [perm]: !prev[role][perm] },
    }))
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 14 }}>역할별 권한 설정</div>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(4, 1fr)', background: '#f8fafc', padding: '10px 16px', borderBottom: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>역할</div>
          {PERMISSIONS.map((p) => (
            <div key={p} style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textAlign: 'center' }}>{PERM_LABELS[p]}</div>
          ))}
        </div>
        {/* Rows */}
        {ROLES.map((role, ri) => (
          <div
            key={role}
            style={{
              display: 'grid', gridTemplateColumns: '120px repeat(4, 1fr)',
              padding: '12px 16px', alignItems: 'center',
              background: ri % 2 === 0 ? '#fff' : '#fafafa',
              borderBottom: ri < ROLES.length - 1 ? '1px solid #f1f5f9' : 'none',
              opacity: role === 'owner' ? 0.75 : 1,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{ROLE_LABELS[role]}</div>
              {role === 'owner' && <div style={{ fontSize: 10, color: '#94a3b8' }}>변경 불가</div>}
            </div>
            {PERMISSIONS.map((perm) => (
              <div key={perm} style={{ display: 'flex', justifyContent: 'center' }}>
                <Toggle
                  checked={perms[role][perm]}
                  onCheckedChange={() => toggle(role, perm)}
                  disabled={role === 'owner'}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10, textAlign: 'center' }}>
        Chakra UI Table + Switch 패턴 — 역할별 권한 매트릭스 (소유자 권한은 고정)
      </div>
    </div>
  )
}

export const Chakra_권한_토글_매트릭스: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI의 Table + Switch 조합 패턴. 역할별로 권한을 행/열 매트릭스로 시각화합니다. 소유자(owner) 역할은 모든 권한이 고정되어 편집 불가 처리됩니다.',
      },
    },
  },
  render: () => <ChakraPermissionMatrixRender />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 온보딩 기능 토글 선택
   M3의 Feature highlight + Switch 패턴 — 앱 기능 활성화 선택
-------------------------------------------------------------------------- */
const M3_FEATURES = [
  { key: 'darkMode', icon: '◑', title: '다크 모드 자동 전환', desc: '시스템 설정에 따라 자동으로 테마를 변경합니다', color: '#8b5cf6' },
  { key: 'haptic', icon: '◈', title: '햅틱 피드백', desc: '버튼 클릭 시 진동으로 응답합니다', color: '#6366f1' },
  { key: 'biometric', icon: '◉', title: '생체 인증', desc: '지문/Face ID로 빠르게 로그인합니다', color: '#06b6d4' },
  { key: 'sync', icon: '⟳', title: '백그라운드 동기화', desc: '앱이 닫혀있을 때도 데이터를 업데이트합니다', color: '#10b981' },
]

function M3OnboardingFeaturesRender() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    darkMode: true, haptic: true, biometric: false, sync: false,
  })

  const toggle = (key: string) => setEnabled((prev) => ({ ...prev, [key]: !prev[key] }))
  const enabledCount = Object.values(enabled).filter(Boolean).length

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>기능 설정</div>
      <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20, lineHeight: 1.5 }}>
        원하는 기능을 활성화하세요. 언제든지 설정에서 변경할 수 있습니다.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {M3_FEATURES.map((feat) => (
          <div
            key={feat.key}
            onClick={() => toggle(feat.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
              border: `1.5px solid ${enabled[feat.key] ? feat.color + '60' : '#e2e8f0'}`,
              background: enabled[feat.key] ? feat.color + '08' : '#fff',
              transition: 'all 0.2s',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: enabled[feat.key] ? feat.color : '#e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#fff', fontWeight: 700,
              transition: 'background 0.2s',
            }}>
              {feat.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{feat.title}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, lineHeight: 1.4 }}>{feat.desc}</div>
            </div>
            <Toggle
              checked={enabled[feat.key]}
              onCheckedChange={() => toggle(feat.key)}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b', textAlign: 'center' }}>
        {enabledCount}개 기능 활성화됨
      </div>
    </div>
  )
}

export const Material3_온보딩_기능_토글: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3 Feature highlight + Switch 패턴. 아이콘 카드에 Toggle을 내장해 카드 전체를 클릭하거나 Toggle을 직접 클릭해 기능을 활성화합니다.',
      },
    },
  },
  render: () => <M3OnboardingFeaturesRender />,
}
