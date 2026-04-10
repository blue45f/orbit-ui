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

// --- Cycle 73: Mantine + Raycast benchmark ---

const MantineSettingsGroupRender = () => {
  const [vals, setVals] = useState<Record<string, boolean>>({
    email_digest: true,
    push_mobile: false,
    slack_sync: true,
    auto_archive: false,
    two_fa: true,
    api_access: false,
  })

  const GROUPS = [
    {
      title: '알림',
      desc: '수신 방법과 빈도를 제어합니다',
      items: [
        { id: 'email_digest', label: '이메일 다이제스트', desc: '매주 활동 요약을 이메일로 받기' },
        { id: 'push_mobile', label: '모바일 푸시', desc: '모바일 앱 알림 허용' },
        { id: 'slack_sync', label: 'Slack 동기화', desc: 'Slack 채널로 알림 전달' },
      ],
    },
    {
      title: '자동화',
      desc: '워크플로우 자동화 설정',
      items: [
        { id: 'auto_archive', label: '자동 보관', desc: '30일 미사용 항목 자동 보관' },
      ],
    },
    {
      title: '보안',
      desc: '계정 보안을 강화합니다',
      items: [
        { id: 'two_fa', label: '2단계 인증', desc: '로그인 시 OTP 인증 요구' },
        { id: 'api_access', label: 'API 키 접근', desc: '외부 API 요청 허용' },
      ],
    },
  ]

  const toggle = (id: string) => setVals((prev) => ({ ...prev, [id]: !prev[id] }))
  const activeCount = Object.values(vals).filter(Boolean).length

  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>환경설정</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{activeCount}개 활성화됨</div>
        </div>
        <button
          onClick={() => setVals(Object.fromEntries(Object.keys(vals).map((k) => [k, false])))}
          style={{ fontSize: 11, color: '#64748b', background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
        >
          모두 끄기
        </button>
      </div>
      {GROUPS.map((g) => (
        <div key={g.title} style={{ marginBottom: 16, background: '#fff', borderRadius: 10, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #f8fafc', background: '#f8fafc' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{g.title}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{g.desc}</div>
          </div>
          {g.items.map((item, idx) => (
            <div
              key={item.id}
              style={{
                padding: '12px 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: idx < g.items.length - 1 ? '1px solid #f8fafc' : 'none',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{item.desc}</div>
              </div>
              <Toggle checked={vals[item.id]} onCheckedChange={() => toggle(item.id)} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export const Mantine_설정_그룹_패널: Story = {
  name: 'Mantine - 설정 그룹 패널 (카드 구조)',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Switch + Card 조합 패턴 벤치마크. 카드로 묶인 설정 그룹, 그룹별 제목/설명, 전체 비활성화 버튼, 활성화 카운터 포함.',
      },
    },
  },
  render: () => <MantineSettingsGroupRender />,
}

const RaycastExtensionTogglesRender = () => {
  const [extensions, setExtensions] = useState<Record<string, boolean>>({
    clipboard: true,
    window_mgr: true,
    browser_hist: false,
    calculator: true,
    file_search: false,
    snippets: true,
  })

  const EXTENSIONS = [
    { id: 'clipboard', name: '클립보드 히스토리', author: 'Raycast', category: '생산성', color: '#f59e0b' },
    { id: 'window_mgr', name: '창 관리', author: 'Raycast', category: '유틸리티', color: '#6366f1' },
    { id: 'browser_hist', name: '브라우저 히스토리', author: 'Community', category: '브라우저', color: '#0ea5e9' },
    { id: 'calculator', name: '계산기', author: 'Raycast', category: '유틸리티', color: '#22c55e' },
    { id: 'file_search', name: '파일 검색', author: 'Community', category: '파일', color: '#ec4899' },
    { id: 'snippets', name: '텍스트 스니펫', author: 'Raycast', category: '생산성', color: '#8b5cf6' },
  ]

  const toggle = (id: string) => setExtensions((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div style={{
      width: 400, fontFamily: 'system-ui, sans-serif',
      background: '#1c1c1e', borderRadius: 12, overflow: 'hidden',
      border: '1px solid #2c2c2e', padding: '0 0 8px',
    }}>
      <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #2c2c2e' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#f5f5f7' }}>확장 프로그램</div>
        <div style={{ fontSize: 11, color: '#636366', marginTop: 2 }}>
          {Object.values(extensions).filter(Boolean).length} / {EXTENSIONS.length} 활성화
        </div>
      </div>
      {EXTENSIONS.map((ext) => (
        <div
          key={ext.id}
          style={{
            padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            borderBottom: '1px solid #2c2c2e',
            opacity: extensions[ext.id] ? 1 : 0.5,
            transition: 'opacity 0.2s',
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: extensions[ext.id] ? ext.color : '#3a3a3c',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, transition: 'background 0.2s',
          }}>
            {ext.name[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#f5f5f7' }}>{ext.name}</div>
            <div style={{ fontSize: 10, color: '#636366', marginTop: 1 }}>
              {ext.category} · {ext.author}
            </div>
          </div>
          <Toggle checked={extensions[ext.id]} onCheckedChange={() => toggle(ext.id)} />
        </div>
      ))}
    </div>
  )
}

export const Raycast_확장_토글_패널: Story = {
  name: 'Raycast - 확장 프로그램 토글 패널 (다크)',
  parameters: {
    docs: {
      description: {
        story:
          'Raycast Extensions 토글 패널 벤치마크. 다크 배경, 컬러 아이콘 아바타, 비활성화 시 투명도 처리, 작성자/카테고리 메타 정보 패턴.',
      },
    },
  },
  render: () => <RaycastExtensionTogglesRender />,
}

const MantineFeatureFlagsDashRender = () => {
  const [flags, setFlags] = useState<Record<string, boolean>>({
    new_dashboard: true,
    beta_editor: false,
    ai_suggestions: true,
    bulk_actions: false,
    dark_mode_v2: true,
    analytics_v3: false,
  })
  const [filter, setFilter] = useState<'all' | 'on' | 'off'>('all')

  const FLAG_DEFS = [
    { id: 'new_dashboard', label: '새 대시보드', env: 'production', risk: 'low' as const, rollout: 100 },
    { id: 'beta_editor', label: '베타 에디터', env: 'staging', risk: 'high' as const, rollout: 10 },
    { id: 'ai_suggestions', label: 'AI 제안', env: 'production', risk: 'medium' as const, rollout: 50 },
    { id: 'bulk_actions', label: '일괄 작업', env: 'staging', risk: 'medium' as const, rollout: 25 },
    { id: 'dark_mode_v2', label: '다크모드 v2', env: 'production', risk: 'low' as const, rollout: 80 },
    { id: 'analytics_v3', label: '애널리틱스 v3', env: 'development', risk: 'high' as const, rollout: 5 },
  ]

  const RISK_COLOR = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' } as const

  const toggle = (id: string) => setFlags((prev) => ({ ...prev, [id]: !prev[id] }))
  const filtered = FLAG_DEFS.filter((f) =>
    filter === 'all' ? true : filter === 'on' ? flags[f.id] : !flags[f.id]
  )

  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>기능 플래그</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['all', 'on', 'off'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '3px 10px', borderRadius: 6, border: '1px solid #e2e8f0',
                background: filter === f ? '#0f172a' : '#fff',
                color: filter === f ? '#fff' : '#64748b',
                fontSize: 11, cursor: 'pointer', fontWeight: filter === f ? 600 : 400,
              }}
            >
              {f === 'all' ? '전체' : f === 'on' ? '활성' : '비활성'}
            </button>
          ))}
        </div>
      </div>
      <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {filtered.map((f, idx) => (
          <div
            key={f.id}
            style={{
              padding: '11px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: idx < filtered.length - 1 ? '1px solid #f1f5f9' : 'none',
              background: flags[f.id] ? '#fff' : '#fafafa',
            }}
          >
            <div style={{
              width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
              background: flags[f.id] ? '#22c55e' : '#e2e8f0',
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{f.label}</span>
                <span style={{
                  fontSize: 9, padding: '1px 5px', borderRadius: 3,
                  background: RISK_COLOR[f.risk] + '20', color: RISK_COLOR[f.risk], fontWeight: 600,
                }}>
                  {f.risk}
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>
                {f.env} · rollout {f.rollout}%
              </div>
            </div>
            <Toggle checked={flags[f.id]} onCheckedChange={() => toggle(f.id)} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>
        {Object.values(flags).filter(Boolean).length}개 활성 / {FLAG_DEFS.length}개 전체
      </div>
    </div>
  )
}

export const Mantine_기능_플래그_대시보드: Story = {
  name: 'Mantine - 기능 플래그 대시보드 (risk + rollout)',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Switch 기반 Feature Flag 관리 패턴. risk 레벨 배지(low/medium/high), rollout 비율, 환경 태그, 활성/비활성 필터 포함.',
      },
    },
  },
  render: () => <MantineFeatureFlagsDashRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 위젯 가시성 컨트롤
   Tailwind UI의 dashboard customization 패턴 — 대시보드에 표시할 위젯을
   사용자가 직접 Toggle로 켜고 끄는 설정 패널 패턴.
-------------------------------------------------------------------------- */
const WIDGET_DEFS = [
  { id: 'w1', label: '방문자 통계', desc: '실시간 방문자 수 및 세션 데이터', icon: '📈', category: '애널리틱스' },
  { id: 'w2', label: '매출 현황', desc: '일/주/월별 매출 차트', icon: '💰', category: '애널리틱스' },
  { id: 'w3', label: '최근 주문', desc: '최신 주문 목록 및 상태', icon: '📦', category: '운영' },
  { id: 'w4', label: '지원 티켓', desc: '미해결 고객 지원 요청', icon: '🎧', category: '운영' },
  { id: 'w5', label: '팀 활동', desc: '팀원 최근 커밋 및 활동', icon: '👥', category: '팀' },
  { id: 'w6', label: '시스템 상태', desc: 'API 및 서비스 헬스 체크', icon: '🖥', category: '시스템' },
]

const TailwindWidgetControlRender = () => {
  const [widgets, setWidgets] = useState<Record<string, boolean>>(
    Object.fromEntries(WIDGET_DEFS.map((w, i) => [w.id, i < 4]))
  )

  const toggle = (id: string) => {
    setWidgets((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const activeCount = Object.values(widgets).filter(Boolean).length
  const categories = Array.from(new Set(WIDGET_DEFS.map((w) => w.category)))

  return (
    <div style={{ maxWidth: 420 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>대시보드 위젯</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>표시할 위젯을 선택하세요</div>
        </div>
        <div style={{
          padding: '3px 10px', borderRadius: 20,
          background: '#eff6ff', fontSize: 12, fontWeight: 700, color: '#6366f1',
        }}>
          {activeCount}/{WIDGET_DEFS.length}
        </div>
      </div>

      {categories.map((cat) => (
        <div key={cat} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            {cat}
          </div>
          <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            {WIDGET_DEFS.filter((w) => w.category === cat).map((widget, i, arr) => (
              <div
                key={widget.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px',
                  borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none',
                  background: widgets[widget.id] ? '#fafafa' : '#fff',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{widget.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 600,
                    color: widgets[widget.id] ? '#1e293b' : '#94a3b8',
                    transition: 'color 0.15s',
                  }}>
                    {widget.label}
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{widget.desc}</div>
                </div>
                <Toggle checked={widgets[widget.id]} onCheckedChange={() => toggle(widget.id)} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ padding: '10px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b' }}>
        변경 사항은 대시보드에 즉시 반영됩니다.
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Tailwind UI Dashboard Customization 패턴 — 위젯 가시성 Toggle
      </div>
    </div>
  )
}

export const Tailwind_위젯_가시성_컨트롤: Story = {
  name: 'Tailwind UI - 대시보드 위젯 가시성 컨트롤',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI dashboard customization 패턴. 카테고리별로 그룹화된 위젯 목록에서 Toggle로 표시/숨김을 제어합니다. 활성화된 위젯 개수를 상단에 표시합니다.',
      },
    },
  },
  render: () => <TailwindWidgetControlRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 알림 채널별 설정
   Mantine의 notification settings 패턴 — 이벤트 유형별로 채널(이메일/푸시/SMS)
   조합을 개별 Toggle로 제어하는 매트릭스 패턴.
-------------------------------------------------------------------------- */
type NotifCategory = 'security' | 'billing' | 'updates' | 'team'
type NotifChannel = 'email' | 'push' | 'sms'

const NOTIF_CATEGORIES: Array<{ id: NotifCategory; label: string; desc: string; icon: string }> = [
  { id: 'security', label: '보안 알림', desc: '로그인, 비밀번호 변경', icon: '🔐' },
  { id: 'billing', label: '결제 알림', desc: '청구서, 결제 실패', icon: '💳' },
  { id: 'updates', label: '업데이트', desc: '새 기능, 배포 완료', icon: '🔔' },
  { id: 'team', label: '팀 활동', desc: '멘션, 댓글, 초대', icon: '👥' },
]

const NOTIF_CHANNELS: Array<{ id: NotifChannel; label: string; icon: string }> = [
  { id: 'email', label: '이메일', icon: '✉' },
  { id: 'push', label: '푸시', icon: '📱' },
  { id: 'sms', label: 'SMS', icon: '💬' },
]

const MantineNotifChannelRender = () => {
  type SettingsState = Record<NotifCategory, Record<NotifChannel, boolean>>
  const [settings, setSettings] = useState<SettingsState>({
    security: { email: true, push: true, sms: true },
    billing:  { email: true, push: true, sms: false },
    updates:  { email: true, push: false, sms: false },
    team:     { email: false, push: true, sms: false },
  })

  const toggleNotif = (cat: NotifCategory, ch: NotifChannel) => {
    setSettings((prev) => ({
      ...prev,
      [cat]: { ...prev[cat], [ch]: !prev[cat][ch] },
    }))
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>알림 설정</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>채널별로 수신할 알림을 선택하세요</div>
      </div>

      {/* 테이블 헤더 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 64px)', gap: 0, marginBottom: 4 }}>
        <div />
        {NOTIF_CHANNELS.map((ch) => (
          <div key={ch.id} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#64748b' }}>
            <div>{ch.icon}</div>
            <div>{ch.label}</div>
          </div>
        ))}
      </div>

      <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {NOTIF_CATEGORIES.map((cat, i) => (
          <div
            key={cat.id}
            style={{
              display: 'grid', gridTemplateColumns: '1fr repeat(3, 64px)',
              padding: '12px 16px', alignItems: 'center',
              borderBottom: i < NOTIF_CATEGORIES.length - 1 ? '1px solid #f1f5f9' : 'none',
              background: cat.id === 'security' ? '#fffbeb' : '#fff',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>{cat.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{cat.label}</span>
                {cat.id === 'security' && (
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: '#fef3c7', color: '#92400e' }}>
                    필수
                  </span>
                )}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, paddingLeft: 20 }}>{cat.desc}</div>
            </div>
            {NOTIF_CHANNELS.map((ch) => (
              <div key={ch.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <Toggle
                  checked={settings[cat.id][ch.id]}
                  onCheckedChange={() => toggleNotif(cat.id, ch.id)}
                  disabled={cat.id === 'security'}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Mantine Notification Settings 패턴 — 이벤트 × 채널 매트릭스 Toggle
      </div>
    </div>
  )
}

export const Mantine_알림_채널_설정: Story = {
  name: 'Mantine - 알림 채널별 설정 매트릭스',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine의 notification settings 패턴. 이벤트 카테고리(행) × 채널(열) 매트릭스로 알림을 세밀하게 제어합니다. 보안 알림은 disabled 처리해 필수 항목임을 명시합니다.',
      },
    },
  },
  render: () => <MantineNotifChannelRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: API 키 권한 스코프 토글
   Tailwind UI의 API key permissions 패턴 — 읽기/쓰기/삭제 권한을 범주별로
   Toggle로 부여하는 접근 제어 UI. Linear, GitHub 설정에서 흔히 볼 수 있는 패턴.
-------------------------------------------------------------------------- */
type ApiScope = {
  id: string
  resource: string
  read: boolean
  write: boolean
  delete: boolean
  risk: 'low' | 'medium' | 'high'
}

const INITIAL_SCOPES: ApiScope[] = [
  { id: 's1', resource: 'Projects', read: true, write: true, delete: false, risk: 'low' },
  { id: 's2', resource: 'Issues', read: true, write: true, delete: false, risk: 'low' },
  { id: 's3', resource: 'Members', read: true, write: false, delete: false, risk: 'medium' },
  { id: 's4', resource: 'Billing', read: false, write: false, delete: false, risk: 'high' },
  { id: 's5', resource: 'Webhooks', read: true, write: false, delete: false, risk: 'medium' },
]

const SCOPE_RISK_COLOR = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' } as const

const TailwindApiScopeRender = () => {
  const [scopes, setScopes] = useState(INITIAL_SCOPES)

  const toggleScope = (id: string, perm: 'read' | 'write' | 'delete') => {
    setScopes((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        const next = { ...s, [perm]: !s[perm] }
        if (perm === 'read' && !next.read) {
          next.write = false
          next.delete = false
        }
        if (perm === 'write' && next.write && !next.read) {
          next.read = true
        }
        if (perm === 'delete' && next.delete && !next.read) {
          next.read = true
        }
        return next
      })
    )
  }

  const totalPermissions = scopes.reduce((s, scope) => {
    return s + (scope.read ? 1 : 0) + (scope.write ? 1 : 0) + (scope.delete ? 1 : 0)
  }, 0)

  return (
    <div style={{ maxWidth: 520 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>API 키 권한</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>이 키에 부여할 접근 범위를 선택하세요</div>
        </div>
        <div style={{ fontSize: 12, color: '#64748b' }}>
          <span style={{ fontWeight: 700, color: '#6366f1' }}>{totalPermissions}</span>개 권한 활성
        </div>
      </div>

      <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: 12 }}>
        {/* 헤더 */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr repeat(3, 80px)',
          padding: '8px 16px', background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>리소스</span>
          {['읽기', '쓰기', '삭제'].map((perm) => (
            <span key={perm} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textAlign: 'center' }}>{perm}</span>
          ))}
        </div>

        {scopes.map((scope, i) => (
          <div
            key={scope.id}
            style={{
              display: 'grid', gridTemplateColumns: '1fr repeat(3, 80px)',
              padding: '12px 16px', alignItems: 'center',
              borderBottom: i < scopes.length - 1 ? '1px solid #f1f5f9' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{scope.resource}</span>
              <span style={{
                fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 3,
                background: SCOPE_RISK_COLOR[scope.risk] + '14',
                color: SCOPE_RISK_COLOR[scope.risk],
              }}>
                {scope.risk}
              </span>
            </div>
            {(['read', 'write', 'delete'] as const).map((perm) => (
              <div key={perm} style={{ display: 'flex', justifyContent: 'center' }}>
                <Toggle
                  checked={scope[perm]}
                  onCheckedChange={() => toggleScope(scope.id, perm)}
                  disabled={scope.risk === 'high' && perm !== 'read'}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 14px', borderRadius: 10, background: '#fef3c7', border: '1px solid #fde68a', fontSize: 12, color: '#92400e' }}>
        쓰기/삭제 권한 활성화 시 읽기 권한이 자동으로 활성화됩니다. Billing 리소스는 읽기만 허용됩니다.
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Tailwind UI API Key Permissions 패턴 — 리소스 × 권한 레벨 Toggle
      </div>
    </div>
  )
}

export const Tailwind_API_권한_스코프: Story = {
  name: 'Tailwind UI - API 키 권한 스코프 토글',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI API key permissions 패턴. 리소스(행) × 권한 레벨(읽기/쓰기/삭제) 매트릭스로 접근 제어를 구성합니다. 쓰기/삭제 활성화 시 읽기를 자동으로 활성화하는 종속 로직을 포함합니다.',
      },
    },
  },
  render: () => <TailwindApiScopeRender />,
}

// ============================================================
// Cycle 139 — shadcn/ui + Notion Design 벤치마크 반영
// ============================================================

// shadcn/ui 스타일 — 텍스트 서식 도구바 (Bold/Italic/Underline/Strike)
type FormatKey139 = 'bold' | 'italic' | 'underline' | 'strike' | 'code'

export const Shadcn_텍스트_서식_도구바: Story = {
  name: 'shadcn/ui — 텍스트 서식 도구바 (Cycle 139)',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui ToggleGroup 텍스트 서식 도구바 패턴. Bold/Italic/Underline/Strike/Code 독립 토글. ' +
          '미리보기 영역에 실시간 서식 반영. 활성 토글은 배경 강조.',
      },
    },
  },
  render: function ShadcnFormatToolbarRender() {
    const [formats, setFormats] = useState<Record<FormatKey139, boolean>>({
      bold: false, italic: false, underline: false, strike: false, code: false,
    })
    const [text, setText] = useState('Orbit UI 디자인 시스템 — 3-tier 토큰 아키텍처로 완전한 커스터마이징 지원')

    function toggleFormat(key: FormatKey139) {
      setFormats((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const TOOLS: { key: FormatKey139; label: string; title: string }[] = [
      { key: 'bold', label: 'B', title: '굵게' },
      { key: 'italic', label: 'I', title: '기울임' },
      { key: 'underline', label: 'U', title: '밑줄' },
      { key: 'strike', label: 'S', title: '취소선' },
      { key: 'code', label: '<>', title: '코드' },
    ]

    const previewStyle: React.CSSProperties = {
      fontWeight: formats.bold ? 700 : 400,
      fontStyle: formats.italic ? 'italic' : 'normal',
      textDecoration: [formats.underline ? 'underline' : '', formats.strike ? 'line-through' : ''].filter(Boolean).join(' ') || 'none',
      fontFamily: formats.code ? 'monospace' : 'system-ui, sans-serif',
      fontSize: formats.code ? 13 : 15,
      background: formats.code ? '#f1f5f9' : 'transparent',
      padding: formats.code ? '2px 6px' : 0,
      borderRadius: formats.code ? 4 : 0,
    }

    return (
      <div style={{ width: 400, fontFamily: 'system-ui, sans-serif' }}>
        {/* 도구바 */}
        <div style={{ display: 'flex', gap: 2, padding: '6px 8px', background: '#f8fafc', borderRadius: '10px 10px 0 0', border: '1px solid #e2e8f0', borderBottom: 'none' }}>
          {TOOLS.map((t) => (
            <Toggle
              key={t.key}
              checked={formats[t.key]}
              onCheckedChange={() => toggleFormat(t.key)}
            >
              <span style={{ fontWeight: t.key === 'bold' ? 800 : 400, fontStyle: t.key === 'italic' ? 'italic' : 'normal', fontSize: 13, color: '#0f172a', minWidth: 24, textAlign: 'center' }} title={t.title}>
                {t.label}
              </span>
            </Toggle>
          ))}
          <div style={{ width: 1, background: '#e2e8f0', margin: '4px 4px' }} />
          <span style={{ fontSize: 11, color: '#94a3b8', alignSelf: 'center', marginLeft: 2 }}>
            {Object.values(formats).filter(Boolean).length > 0
              ? `${Object.entries(formats).filter(([, v]) => v).map(([k]) => k).join(', ')} 활성`
              : '서식 없음'
            }
          </span>
        </div>
        {/* 에디터 영역 */}
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '0 0 10px 10px', minHeight: 80 }}>
          <span style={previewStyle}>{text}</span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: 12, padding: '6px 8px', border: '1px solid #f1f5f9', borderRadius: 6, fontSize: 12, color: '#94a3b8', outline: 'none', boxSizing: 'border-box' }}
            placeholder="미리보기 텍스트를 수정하세요..."
          />
        </div>
      </div>
    )
  },
}

// Notion 스타일 — 블록 뷰 전환 토글 (Table/Board/Gallery/List)
type NotionView139 = 'table' | 'board' | 'gallery' | 'list'

const NOTION_VIEWS_139: { key: NotionView139; label: string; desc: string }[] = [
  { key: 'table', label: '표', desc: '모든 속성을 열로 표시' },
  { key: 'board', label: '보드', desc: '그룹별 카드 레이아웃' },
  { key: 'gallery', label: '갤러리', desc: '카드 이미지 그리드' },
  { key: 'list', label: '목록', desc: '인라인 속성 라인' },
]

const NOTION_ITEMS_139 = [
  { id: 1, title: 'SolidButton 스토리 추가', status: '완료', priority: '높음' },
  { id: 2, title: 'DataTable 컬럼 필터링', status: '진행 중', priority: '높음' },
  { id: 3, title: 'ThemeGuide.mdx 업데이트', status: '대기', priority: '보통' },
  { id: 4, title: 'Toggle 스토리 3개', status: '완료', priority: '보통' },
]

export const Notion_데이터베이스_뷰_전환: Story = {
  name: 'Notion — 데이터베이스 뷰 전환 Toggle (Cycle 139)',
  parameters: {
    docs: {
      description: {
        story:
          'Notion Database View Switcher 패턴. 표/보드/갤러리/목록 4가지 뷰를 Toggle로 전환. ' +
          '선택된 뷰에 따라 데이터 레이아웃이 실시간으로 변경. 뷰 이름 + 설명 서브텍스트.',
      },
    },
  },
  render: function NotionViewSwitcherRender() {
    const [view, setView] = useState<NotionView139>('table')

    return (
      <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
        {/* 뷰 탭 */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 14, padding: '0 2px' }}>
          {NOTION_VIEWS_139.map((v) => (
            <Toggle
              key={v.key}
              checked={view === v.key}
              onCheckedChange={() => setView(v.key)}
            >
              <span style={{ fontSize: 12, fontWeight: view === v.key ? 700 : 400, padding: '2px 8px', color: view === v.key ? '#0f172a' : '#64748b' }}>
                {v.label}
              </span>
            </Toggle>
          ))}
        </div>

        {/* 선택된 뷰 설명 */}
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10 }}>
          {NOTION_VIEWS_139.find((v) => v.key === view)?.desc}
        </div>

        {/* 데이터 렌더링 */}
        {view === 'table' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['제목', '상태', '우선순위'].map((h) => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NOTION_ITEMS_139.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 12px', color: '#0f172a' }}>{item.title}</td>
                  <td style={{ padding: '8px 12px', color: '#64748b' }}>{item.status}</td>
                  <td style={{ padding: '8px 12px', color: '#64748b' }}>{item.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {view === 'board' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {NOTION_ITEMS_139.map((item) => (
              <div key={item.id} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{item.title}</div>
                <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
                  <span style={{ color: '#64748b' }}>{item.status}</span>
                  <span style={{ color: '#94a3b8' }}>·</span>
                  <span style={{ color: '#64748b' }}>{item.priority}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {view === 'gallery' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {NOTION_ITEMS_139.map((item) => (
              <div key={item.id} style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ height: 64, background: `hsl(${item.id * 70}, 60%, 92%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {item.id === 1 ? '◈' : item.id === 2 ? '◉' : item.id === 3 ? '◎' : '◆'}
                </div>
                <div style={{ padding: '8px 10px', fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{item.title}</div>
              </div>
            ))}
          </div>
        )}
        {view === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NOTION_ITEMS_139.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', borderRadius: 6, background: '#f8fafc' }}>
                <span style={{ fontSize: 11, color: '#94a3b8', width: 16, textAlign: 'right', flexShrink: 0 }}>{item.id}.</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#0f172a', flex: 1 }}>{item.title}</span>
                <span style={{ fontSize: 11, color: '#64748b' }}>{item.status}</span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.priority}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
}

// shadcn/ui + Notion — 에디터 레이아웃 패널 토글 (사이드바 + 아웃라인 + 미리보기)
export const Shadcn_Notion_에디터_패널_토글: Story = {
  name: 'shadcn/ui + Notion — 에디터 패널 토글 (Cycle 139)',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui + Notion 에디터 레이아웃 패널 토글. 사이드바/아웃라인/미리보기를 독립 토글로 제어. ' +
          '활성 패널 수에 따라 에디터 너비가 동적으로 조정되는 시뮬레이션.',
      },
    },
  },
  render: function ShadcnNotionEditorPanelRender() {
    const [sidebar, setSidebar] = useState(true)
    const [outline, setOutline] = useState(false)
    const [preview, setPreview] = useState(false)

    const panelCount = [sidebar, outline, preview].filter(Boolean).length
    const editorWidth = panelCount === 0 ? '100%' : panelCount === 1 ? '70%' : '50%'

    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', width: 520 }}>
        {/* 툴바 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f8fafc', borderRadius: '10px 10px 0 0', border: '1px solid #e2e8f0', borderBottom: 'none' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginRight: 4 }}>패널:</span>
          {[
            { label: '사이드바', value: sidebar, set: setSidebar },
            { label: '아웃라인', value: outline, set: setOutline },
            { label: '미리보기', value: preview, set: setPreview },
          ].map((p) => (
            <Toggle key={p.label} checked={p.value} onCheckedChange={() => p.set((v) => !v)}>
              <span style={{ fontSize: 11, fontWeight: p.value ? 700 : 400, padding: '2px 8px', color: p.value ? '#0f172a' : '#94a3b8' }}>
                {p.label}
              </span>
            </Toggle>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>에디터 {editorWidth}</span>
        </div>

        {/* 에디터 레이아웃 시뮬레이션 */}
        <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '0 0 10px 10px', overflow: 'hidden', height: 180 }}>
          {sidebar && (
            <div style={{ width: '20%', background: '#f1f5f9', borderRight: '1px solid #e2e8f0', padding: '10px 8px', fontSize: 11, color: '#64748b' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>사이드바</div>
              {['소개', '설치', '컴포넌트', '토큰', 'MDX 문서'].map((item) => (
                <div key={item} style={{ padding: '4px 6px', borderRadius: 4, marginBottom: 2, cursor: 'pointer' }}>{item}</div>
              ))}
            </div>
          )}
          <div style={{ flex: 1, padding: '12px', background: '#fff', fontSize: 12, color: '#0f172a', lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Orbit UI 문서</div>
            <div style={{ color: '#475569', fontSize: 12 }}>이 영역에서 마크다운 콘텐츠를 편집합니다. 좌측 패널은 문서 탐색, 우측은 아웃라인과 미리보기를 제공합니다.</div>
          </div>
          {outline && (
            <div style={{ width: '18%', background: '#f8fafc', borderLeft: '1px solid #e2e8f0', padding: '10px 8px', fontSize: 11, color: '#64748b' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>아웃라인</div>
              {['# 소개', '## 설치', '### pnpm', '## 사용법'].map((h) => (
                <div key={h} style={{ padding: '2px 4px', paddingLeft: h.startsWith('###') ? 16 : h.startsWith('##') ? 8 : 0, color: '#64748b', cursor: 'pointer' }}>{h}</div>
              ))}
            </div>
          )}
          {preview && (
            <div style={{ width: '28%', background: '#fff7ed', borderLeft: '1px solid #fed7aa', padding: '10px 8px', fontSize: 11 }}>
              <div style={{ fontWeight: 700, color: '#c2410c', marginBottom: 8 }}>미리보기</div>
              <div style={{ color: '#9a3412', lineHeight: 1.6 }}>렌더링된 결과가 이 영역에 표시됩니다.</div>
            </div>
          )}
        </div>
      </div>
    )
  },
}
