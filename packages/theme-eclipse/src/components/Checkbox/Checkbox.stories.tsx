import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { Checkbox } from './Checkbox'

Checkbox.displayName = 'Checkbox'

const meta = {
  title: 'eclipse/Inputs/Selection/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "Checkbox는 Radix UI 기반 접근성 체크박스 컴포넌트입니다. 제어/비제어 모드를 모두 지원하며 키보드 네비게이션을 완벽하게 지원합니다.",
      },
    },
  },
  args: {
    disabled: false,
    iconName: 'check',
  },
  argTypes: {
    iconName: {
      control: 'inline-radio',
      options: ['check', 'minus'],
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render(args) {
    return <Checkbox {...args} />
  },
} satisfies Story

export const 테마_재정의 = {
  render(args) {
    return (
      <Checkbox
        {...args}
        theme={{
          enabledCheckedForegroundColor: 'red',
          enabledCheckedBorderColor: 'transparent',
          focusedCheckedBorderColor: 'transparent',
        }}
      />
    )
  },
} satisfies Story

// Mantine 권한 관리 — 역할별 접근 권한 체크박스 매트릭스
export const 권한_관리_매트릭스 = {
  render: function Render() {
    type PermissionKey = 'view' | 'edit' | 'delete' | 'admin'
    type RoleKey = 'viewer' | 'editor' | 'manager'

    const [permissions, setPermissions] = useState<Record<RoleKey, Record<PermissionKey, boolean>>>({
      viewer: { view: true, edit: false, delete: false, admin: false },
      editor: { view: true, edit: true, delete: false, admin: false },
      manager: { view: true, edit: true, delete: true, admin: false },
    })

    const roles: { key: RoleKey; label: string; color: string }[] = [
      { key: 'viewer', label: '뷰어', color: '#64748b' },
      { key: 'editor', label: '편집자', color: '#6366f1' },
      { key: 'manager', label: '관리자', color: '#8b5cf6' },
    ]
    const permList: { key: PermissionKey; label: string }[] = [
      { key: 'view', label: '조회' },
      { key: 'edit', label: '편집' },
      { key: 'delete', label: '삭제' },
      { key: 'admin', label: '관리자 설정' },
    ]

    const toggle = (role: RoleKey, perm: PermissionKey) => {
      setPermissions((prev) => ({
        ...prev,
        [role]: { ...prev[role], [perm]: !prev[role][perm] },
      }))
    }

    return (
      <div style={{ width: 480, padding: 28, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>권한 관리</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 20 }}>역할별로 접근 가능한 기능을 설정하세요.</div>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1.5px solid #e2e8f0' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr repeat(4, 80px)',
            padding: '10px 16px', background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>역할</div>
            {permList.map((p) => (
              <div key={p.key} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textAlign: 'center', textTransform: 'uppercase' }}>{p.label}</div>
            ))}
          </div>
          {roles.map((r, idx) => (
            <div
              key={r.key}
              style={{
                display: 'grid', gridTemplateColumns: '1fr repeat(4, 80px)',
                padding: '14px 16px', borderBottom: idx < roles.length - 1 ? '1px solid #f1f5f9' : 'none',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{r.label}</span>
              </div>
              {permList.map((p) => (
                <div key={p.key} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Checkbox
                    checked={permissions[r.key][p.key]}
                    onChange={() => toggle(r.key, p.key)}
                    disabled={p.key === 'view'}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 11, color: '#94a3b8' }}>
          조회 권한은 모든 역할에 기본으로 부여됩니다.
        </div>
      </div>
    )
  },
} satisfies Story

// Mantine 할 일 목록 — 완료 처리 인터랙션 패턴
export const 할일_목록 = {
  render: function Render() {
    type Task = { id: number; label: string; tag: string; tagColor: string; done: boolean }
    const [tasks, setTasks] = useState<Task[]>([
      { id: 1, label: 'RadioButton 카드형 스토리 추가', tag: 'Storybook', tagColor: '#6366f1', done: true },
      { id: 2, label: 'Checkbox 권한 매트릭스 구현', tag: 'Storybook', tagColor: '#6366f1', done: true },
      { id: 3, label: 'Popover 필터 패널 스토리 작성', tag: 'Storybook', tagColor: '#6366f1', done: false },
      { id: 4, label: 'ComponentOverview.mdx 접근성 섹션 추가', tag: 'Docs', tagColor: '#10b981', done: false },
      { id: 5, label: 'TypeScript 에러 점검', tag: 'QA', tagColor: '#f59e0b', done: false },
    ])

    const toggle = (id: number) => {
      setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t))
    }

    const doneCount = tasks.filter((t) => t.done).length
    const progress = Math.round((doneCount / tasks.length) * 100)

    return (
      <div style={{ width: 420, padding: 28, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>오늘의 작업</div>
          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{doneCount} / {tasks.length}</span>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ height: 4, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99, width: `${progress}%`,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {tasks.map((task, _idx) => (
            <div
              key={task.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderRadius: 10, cursor: 'pointer',
                background: task.done ? '#f8fafc' : '#fff',
                border: '1px solid', borderColor: task.done ? '#f1f5f9' : '#e2e8f0',
                transition: 'all 0.15s',
              }}
              onClick={() => toggle(task.id)}
            >
              <Checkbox
                checked={task.done}
                onChange={() => toggle(task.id)}
              />
              <span style={{
                flex: 1, fontSize: 13, fontWeight: task.done ? 400 : 500,
                color: task.done ? '#94a3b8' : '#0f172a',
                textDecoration: task.done ? 'line-through' : 'none',
                transition: 'all 0.15s',
              }}>
                {task.label}
              </span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                background: `${task.tagColor}18`, color: task.tagColor,
              }}>
                {task.tag}
              </span>
            </div>
          ))}
        </div>
        {doneCount === tasks.length && (
          <div style={{
            marginTop: 16, padding: '12px', borderRadius: 10, textAlign: 'center',
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
            fontSize: 13, fontWeight: 700, color: '#10b981',
          }}>
            모든 작업 완료
          </div>
        )}
      </div>
    )
  },
} satisfies Story

// Tailwind UI 다중 선택 필터 — 카테고리 필터링
export const 카테고리_다중_선택 = {
  render: function Render() {
    const categories = [
      { value: 'actions', label: 'Actions', count: 7 },
      { value: 'inputs', label: 'Inputs', count: 10 },
      { value: 'data', label: 'Data Display', count: 8 },
      { value: 'feedback', label: 'Feedback', count: 9 },
      { value: 'navigation', label: 'Navigation', count: 6 },
      { value: 'layout', label: 'Layout', count: 5 },
    ]
    const [selected, setSelected] = useState<string[]>(['actions', 'inputs'])

    const toggle = (val: string) => {
      setSelected((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val])
    }
    const isAll = selected.length === categories.length
    const toggleAll = () => setSelected(isAll ? [] : categories.map((c) => c.value))

    return (
      <div style={{ width: 380, padding: 28, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>컴포넌트 카테고리</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>표시할 컴포넌트 카테고리를 선택하세요.</div>

        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
            borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0',
            marginBottom: 8, cursor: 'pointer',
          }}
          onClick={toggleAll}
        >
          <Checkbox
            checked={isAll}
            iconName={selected.length > 0 && !isAll ? 'minus' : 'check'}
            onChange={toggleAll}
          />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', flex: 1 }}>전체 선택</span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{selected.length} / {categories.length}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {categories.map((cat) => (
            <div
              key={cat.value}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                borderRadius: 10, border: '1px solid', borderColor: selected.includes(cat.value) ? 'rgba(99,102,241,0.25)' : '#f1f5f9',
                background: selected.includes(cat.value) ? 'rgba(99,102,241,0.04)' : '#fff',
                cursor: 'pointer', transition: 'all 0.1s',
              }}
              onClick={() => toggle(cat.value)}
            >
              <Checkbox
                checked={selected.includes(cat.value)}
                onChange={() => toggle(cat.value)}
              />
              <span style={{ flex: 1, fontSize: 13, fontWeight: selected.includes(cat.value) ? 600 : 400, color: '#0f172a' }}>
                {cat.label}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                background: selected.includes(cat.value) ? 'rgba(99,102,241,0.1)' : '#f1f5f9',
                color: selected.includes(cat.value) ? '#6366f1' : '#94a3b8',
              }}>
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  },
} satisfies Story

// 약관 동의 체크박스 그룹 (Chakra UI 실무 폼 패턴)
export const 약관동의그룹 = {
  render: function Render() {
    const [agreed, setAgreed] = useState({
      all: false,
      terms: false,
      privacy: false,
      marketing: false,
    })

    const handleAll = (checked: boolean) => {
      setAgreed({ all: checked, terms: checked, privacy: checked, marketing: checked })
    }

    const handleSingle = (key: 'terms' | 'privacy' | 'marketing') => (checked: boolean) => {
      const next = { ...agreed, [key]: checked }
      setAgreed({ ...next, all: next.terms && next.privacy && next.marketing })
    }

    const canSubmit = agreed.terms && agreed.privacy

    const items = [
      { key: 'terms' as const, label: '이용약관 동의', required: true },
      { key: 'privacy' as const, label: '개인정보 처리방침 동의', required: true },
      { key: 'marketing' as const, label: '마케팅 정보 수신 동의 (선택)', required: false },
    ]

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '0px',
        width: '360px', padding: '28px', background: '#fff',
        borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>약관 동의</h3>

        {/* 전체 동의 */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '14px 16px', borderRadius: '10px',
          background: agreed.all ? 'rgba(99,102,241,0.05)' : '#f8fafc',
          border: `1.5px solid ${agreed.all ? 'rgba(99,102,241,0.3)' : '#e2e8f0'}`,
          marginBottom: '16px',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }} onClick={() => handleAll(!agreed.all)}>
          <Checkbox
            checked={agreed.all}
            iconName={agreed.terms || agreed.privacy || agreed.marketing ? (agreed.all ? 'check' : 'minus') : 'check'}
            onChange={handleAll}
          />
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', userSelect: 'none' }}>
            전체 동의
          </span>
        </div>

        {/* 개별 항목 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {items.map((item, idx) => (
            <div
              key={item.key}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 4px',
                borderBottom: idx < items.length - 1 ? '1px solid #f1f5f9' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleSingle(item.key)(!agreed[item.key])}
            >
              <Checkbox
                checked={agreed[item.key]}
                onChange={handleSingle(item.key)}
              />
              <span style={{ flex: 1, fontSize: '13px', color: '#374151', userSelect: 'none' }}>
                {item.label}
              </span>
              {item.required && (
                <span style={{ fontSize: '10px', color: '#6366f1', fontWeight: 700, background: 'rgba(99,102,241,0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                  필수
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          style={{
            marginTop: '20px', padding: '14px', borderRadius: '12px', border: 'none',
            background: canSubmit ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
            color: canSubmit ? '#fff' : '#94a3b8',
            fontSize: '14px', fontWeight: '700', cursor: canSubmit ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
          disabled={!canSubmit}
        >
          동의하고 가입하기
        </button>
      </div>
    )
  },
} satisfies Story

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 플랜 선택 카드 (feature list + checkbox)
   Tailwind UI의 체크박스 카드 그리드 패턴 — 각 옵션에 설명 포함
-------------------------------------------------------------------------- */
const PLAN_FEATURES = [
  { key: 'sso', label: 'SSO / SAML', desc: '엔터프라이즈 인증 연동', premium: false },
  { key: 'api', label: 'API 접근', desc: 'REST/GraphQL 전체 접근', premium: false },
  { key: 'analytics', label: '고급 Analytics', desc: '팀별 상세 리포트', premium: true },
  { key: 'support', label: '전용 지원', desc: '24/7 전담 계정 매니저', premium: true },
  { key: 'custom', label: '커스텀 도메인', desc: '브랜드 도메인 설정', premium: false },
  { key: 'audit', label: '감사 로그', desc: '활동 이력 90일 보관', premium: true },
]

function TailwindPlanFeaturesRender() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['sso', 'api', 'custom']))

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '20px', maxWidth: 480 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>
        플랜 기능 선택
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {PLAN_FEATURES.map((feat) => {
          const isOn = selected.has(feat.key)
          return (
            <label
              key={feat.key}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '12px 14px', borderRadius: '10px', cursor: 'pointer',
                border: `2px solid ${isOn ? '#6366f1' : '#e2e8f0'}`,
                background: isOn ? '#f5f3ff' : '#fff',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ marginTop: 2, flexShrink: 0 }}>
                <Checkbox
                  checked={isOn}
                  onChange={() => toggle(feat.key)}
                />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{feat.label}</span>
                  {feat.premium && (
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: '#fef9c3', color: '#b45309' }}>
                      PRO
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{feat.desc}</div>
              </div>
            </label>
          )
        })}
      </div>
      <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
        {selected.size}개 기능 선택됨
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Tailwind UI 체크박스 카드 그리드 패턴 — 기능 설명 포함 선택
      </div>
    </div>
  )
}

export const Tailwind_플랜_기능_선택: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI의 체크박스 카드 그리드 패턴. 각 기능에 레이블 + 설명 + 프리미엄 배지를 포함하며, 선택 상태에 따라 카드 테두리와 배경이 변합니다.',
      },
    },
  },
  render: () => <TailwindPlanFeaturesRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 컬럼 표시 설정 (DataTable 컬럼 토글)
   Mantine DataTable columnVisibility 패턴 — 표시할 컬럼 선택
-------------------------------------------------------------------------- */
const DATA_COLUMNS = [
  { key: 'name', label: '이름', required: true },
  { key: 'email', label: '이메일', required: false },
  { key: 'role', label: '역할', required: false },
  { key: 'status', label: '상태', required: false },
  { key: 'createdAt', label: '가입일', required: false },
  { key: 'lastLogin', label: '최근 로그인', required: false },
  { key: 'plan', label: '플랜', required: false },
]

function ManitneColumnVisibilityRender() {
  const [visible, setVisible] = useState<Set<string>>(new Set(['name', 'email', 'role', 'status']))

  const toggleCol = (key: string) => {
    setVisible((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const allOn = DATA_COLUMNS.filter((c) => !c.required).every((c) => visible.has(c.key))

  const toggleAll = () => {
    if (allOn) {
      setVisible(new Set(DATA_COLUMNS.filter((c) => c.required).map((c) => c.key)))
    } else {
      setVisible(new Set(DATA_COLUMNS.map((c) => c.key)))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '20px', maxWidth: 320 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>컬럼 표시 설정</div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
          <Checkbox
            checked={allOn}
            iconName={allOn ? 'check' : 'minus'}
            onChange={toggleAll}
          />
          전체 선택
        </label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {DATA_COLUMNS.map((col) => (
          <label
            key={col.key}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px', borderRadius: '8px', cursor: col.required ? 'not-allowed' : 'pointer',
              background: '#f8fafc',
            }}
          >
            <Checkbox
              checked={visible.has(col.key)}
              disabled={col.required}
              onChange={() => !col.required && toggleCol(col.key)}
            />
            <span style={{ fontSize: 13, color: col.required ? '#94a3b8' : '#1e293b', fontWeight: col.required ? 400 : 500 }}>
              {col.label}
            </span>
            {col.required && (
              <span style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8' }}>필수</span>
            )}
          </label>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Mantine DataTable columnVisibility 패턴 — {visible.size}/{DATA_COLUMNS.length} 컬럼 표시
      </div>
    </div>
  )
}

export const Mantine_컬럼_표시_설정: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Mantine DataTable의 columnVisibility 패턴. 필수 컬럼은 disabled 처리하고, 전체 선택/해제 제어와 개별 토글을 동시에 지원합니다.',
      },
    },
  },
  render: () => <ManitneColumnVisibilityRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 비교 체크리스트 (pricing 페이지 패턴)
   Tailwind UI pricing table — Orbit UI vs 경쟁 시스템 기능 비교
-------------------------------------------------------------------------- */
const COMPARE_ITEMS = [
  { feature: 'TypeScript 완전 지원', orbitUI: true, shadcn: true, mui: true },
  { feature: '3-Tier 토큰 시스템', orbitUI: true, shadcn: false, mui: false },
  { feature: '빌드타임 CSS (0 런타임)', orbitUI: true, shadcn: false, mui: false },
  { feature: 'Compound 컴포넌트 API', orbitUI: true, shadcn: true, mui: false },
  { feature: 'theme prop 오버라이드', orbitUI: true, shadcn: false, mui: true },
  { feature: 'Storybook 자동 문서화', orbitUI: true, shadcn: false, mui: true },
]

export const Tailwind_비교_체크리스트: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI pricing table 비교 패턴. 체크박스를 읽기 전용 상태로 활용해 기능 지원 여부를 시각적으로 비교합니다.',
      },
    },
  },
  render: () => (
    <div style={{ padding: '20px', maxWidth: 500 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>
        디자인 시스템 기능 비교
      </div>
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>기능</div>
          {['Orbit UI', 'shadcn', 'MUI'].map((name) => (
            <div key={name} style={{ fontSize: 11, fontWeight: 700, color: name === 'Orbit UI' ? '#6366f1' : '#64748b', textAlign: 'center' }}>{name}</div>
          ))}
        </div>
        {/* Rows */}
        {COMPARE_ITEMS.map((item, i) => (
          <div
            key={item.feature}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px',
              padding: '10px 16px', alignItems: 'center',
              background: i % 2 === 0 ? '#fff' : '#fafafa',
              borderBottom: i < COMPARE_ITEMS.length - 1 ? '1px solid #f1f5f9' : 'none',
            }}
          >
            <div style={{ fontSize: 12, color: '#374151' }}>{item.feature}</div>
            {[item.orbitUI, item.shadcn, item.mui].map((val, ci) => (
              <div key={ci} style={{ display: 'flex', justifyContent: 'center' }}>
                <Checkbox
                  checked={val}
                  disabled
                  onChange={() => {}}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10 }}>
        Tailwind UI pricing 비교 패턴 — 읽기 전용 체크박스로 기능 지원 표시
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 접근성 설정 그룹
   Radix UI WAI-ARIA role="group" + aria-labelledby 패턴
   키보드 포커스 이동 시 그룹 레이블이 스크린리더에 읽히도록 구성
-------------------------------------------------------------------------- */
export const Radix_접근성_설정_그룹: Story = {
  name: 'Radix UI - 접근성 알림 설정 그룹',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI의 WAI-ARIA `role="group"` + `aria-labelledby` 패턴. 각 체크박스가 그룹 레이블과 연결되어 스크린리더에서 "알림 설정, 이메일 알림, 체크됨" 순으로 읽힙니다.',
      },
    },
  },
  render: function Render() {
    const [settings, setSettings] = useState({
      email: true,
      push: false,
      sms: false,
      digest: true,
    })

    const toggle = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const enabledCount = Object.values(settings).filter(Boolean).length

    return (
      <div style={{ maxWidth: 380 }}>
        <div
          role="group"
          aria-labelledby="notification-group-label"
          style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}
        >
          <div
            id="notification-group-label"
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>알림 설정</span>
            <span
              style={{
                fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
                background: enabledCount > 0 ? '#eff6ff' : '#f8fafc',
                color: enabledCount > 0 ? '#3b82f6' : '#94a3b8',
              }}
            >
              {enabledCount}개 활성
            </span>
          </div>

          {[
            { key: 'email' as const, label: '이메일 알림', desc: '중요 업데이트를 이메일로 수신', tag: '권장' },
            { key: 'push' as const, label: '푸시 알림', desc: '브라우저 푸시 알림 허용', tag: null },
            { key: 'sms' as const, label: 'SMS 알림', desc: '긴급 알림을 문자로 수신', tag: null },
            { key: 'digest' as const, label: '주간 다이제스트', desc: '매주 월요일 요약 이메일 발송', tag: '권장' },
          ].map(({ key, label, desc, tag }) => (
            <div
              key={key}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
                borderBottom: '1px solid #f8fafc', cursor: 'pointer',
                background: settings[key] ? '#fafbff' : '#fff',
                transition: 'background 0.1s',
              }}
              onClick={() => toggle(key)}
            >
              <div style={{ paddingTop: 2 }}>
                <Checkbox
                  checked={settings[key]}
                  onChange={() => toggle(key)}
                  aria-label={label}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: settings[key] ? 700 : 500, color: '#1e293b' }}>
                    {label}
                  </span>
                  {tag && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4,
                      background: '#eff6ff', color: '#3b82f6',
                    }}>
                      {tag}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.4 }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
          {'Radix UI WAI-ARIA role="group" + aria-labelledby 패턴'}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 색상 역할 선택 체크박스
   MUI의 color prop 시스템 — primary/success/error/warning 시맨틱 색상 역할
   각 체크박스가 의미론적 색상으로 상태를 표현하는 엔터프라이즈 패턴
-------------------------------------------------------------------------- */
export const MUI_색상_역할_권한_선택: Story = {
  name: 'MUI - 색상 역할 권한 선택 (시맨틱 color prop 패턴)',
  parameters: {
    docs: {
      description: {
        story:
          'MUI의 `color` prop 시스템을 theme override로 재현. primary/success/warning/error 역할별 색상으로 권한 등급을 구분합니다.',
      },
    },
  },
  render: function Render() {
    const roles = [
      {
        id: 'admin',
        label: '관리자',
        desc: '모든 리소스에 대한 완전한 접근 권한',
        level: 'error' as const,
        color: '#ef4444',
        bg: '#fee2e2',
        borderColor: '#fca5a5',
      },
      {
        id: 'editor',
        label: '편집자',
        desc: '콘텐츠 생성 및 수정 가능',
        level: 'warning' as const,
        color: '#f59e0b',
        bg: '#fef3c7',
        borderColor: '#fde68a',
      },
      {
        id: 'member',
        label: '멤버',
        desc: '콘텐츠 조회 및 댓글 작성',
        level: 'primary' as const,
        color: '#6366f1',
        bg: '#eef2ff',
        borderColor: '#c7d2fe',
      },
      {
        id: 'viewer',
        label: '뷰어',
        desc: '공개 콘텐츠 조회만 가능',
        level: 'success' as const,
        color: '#10b981',
        bg: '#d1fae5',
        borderColor: '#6ee7b7',
      },
    ]

    const [selected, setSelected] = useState<string[]>(['member'])
    const toggle = (id: string) =>
      setSelected((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id])

    return (
      <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
          역할 할당 <span style={{ fontSize: 11, fontWeight: 400, color: '#94a3b8' }}>(복수 선택 가능)</span>
        </div>
        {roles.map((role) => {
          const isChecked = selected.includes(role.id)
          return (
            <div
              key={role.id}
              onClick={() => toggle(role.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                borderRadius: 10,
                border: `1.5px solid ${isChecked ? role.borderColor : '#e2e8f0'}`,
                background: isChecked ? role.bg : '#fff',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <Checkbox
                checked={isChecked}
                onChange={() => toggle(role.id)}
                theme={isChecked ? {
                  enabledCheckedFillColor: role.color,
                } : undefined}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: isChecked ? role.color : '#1e293b' }}>
                    {role.label}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{role.desc}</div>
              </div>
              {isChecked && (
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                  background: role.color, color: '#fff',
                }}>
                  선택됨
                </span>
              )}
            </div>
          )
        })}
        <div style={{ fontSize: 11, color: '#94a3b8' }}>
          MUI color prop 패턴 — primary/success/warning/error 시맨틱 색상 역할
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Radix + MUI 조합: 온보딩 체크리스트
   Radix의 WAI-ARIA 완성도 + MUI의 시각적 완료 상태 패턴
   사용자가 완료할수록 프로그레스 바가 채워지는 온보딩 체크리스트
-------------------------------------------------------------------------- */
export const Radix_MUI_온보딩_체크리스트: Story = {
  name: 'Radix + MUI - 온보딩 체크리스트',
  parameters: {
    docs: {
      description: {
        story:
          'Radix WAI-ARIA + MUI 시각적 완료 상태 패턴. 각 항목 완료 시 색상이 변하고 완료율 Progress가 업데이트됩니다.',
      },
    },
  },
  render: function Render() {
    const steps = [
      { id: 'profile', label: '프로필 사진 업로드', detail: '96×96px 이상의 이미지 권장' },
      { id: 'team', label: '팀 초대', detail: '이메일로 팀원 초대' },
      { id: 'project', label: '첫 프로젝트 생성', detail: '프로젝트명과 설명 입력' },
      { id: 'token', label: 'API 토큰 발급', detail: '개발 환경 연동에 필요' },
      { id: 'docs', label: '시작 가이드 읽기', detail: '핵심 개념 5분 학습' },
    ]
    const [done, setDone] = useState<Set<string>>(new Set(['profile']))
    const toggle = (id: string) =>
      setDone((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })

    const pct = Math.round((done.size / steps.length) * 100)
    const isDone = pct === 100

    return (
      <div style={{ maxWidth: 400 }}>
        <div
          style={{
            background: isDone ? '#f0fdf4' : '#fff',
            borderRadius: 14,
            border: `1px solid ${isDone ? '#bbf7d0' : '#e2e8f0'}`,
            overflow: 'hidden',
            transition: 'all 0.3s',
          }}
        >
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${isDone ? '#bbf7d0' : '#f1f5f9'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: isDone ? '#16a34a' : '#0f172a' }}>
                {isDone ? '모든 단계 완료!' : '시작하기'}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: isDone ? '#16a34a' : '#6366f1' }}>
                {pct}%
              </span>
            </div>
            <div style={{
              height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${pct}%`,
                borderRadius: 3,
                background: isDone ? '#10b981' : '#6366f1',
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>

          <div role="group" aria-label="온보딩 체크리스트">
            {steps.map((step, idx) => {
              const isChecked = done.has(step.id)
              return (
                <div
                  key={step.id}
                  onClick={() => toggle(step.id)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '12px 20px',
                    borderBottom: idx < steps.length - 1 ? '1px solid #f8fafc' : 'none',
                    cursor: 'pointer',
                    background: isChecked ? '#f0fdf4' : '#fff',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{ paddingTop: 2 }}>
                    <Checkbox
                      checked={isChecked}
                      onChange={() => toggle(step.id)}
                      aria-label={step.label}
                    />
                  </div>
                  <div>
                    <div style={{
                      fontSize: 13, fontWeight: 600,
                      color: isChecked ? '#16a34a' : '#1e293b',
                      textDecoration: isChecked ? 'line-through' : 'none',
                      transition: 'all 0.2s',
                    }}>
                      {step.label}
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{step.detail}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
          Radix WAI-ARIA + MUI 완료 상태 패턴
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Apple HIG 벤치마크: 계층형 그룹 체크박스
   Apple Settings-style 그룹 헤더 + 들여쓰기 + 부모/자식 체크박스
-------------------------------------------------------------------------- */
type HigAppGroup = { id: string; label: string; items: { id: string; label: string; desc: string }[] }

const HIG_APP_GROUPS: HigAppGroup[] = [
  {
    id: 'productivity', label: '생산성 앱',
    items: [
      { id: 'notion', label: 'Notion', desc: '문서, 데이터베이스, 페이지' },
      { id: 'linear', label: 'Linear', desc: '이슈 트래킹, 프로젝트 관리' },
      { id: 'figma', label: 'Figma', desc: 'UI 디자인, 프로토타이핑' },
    ],
  },
  {
    id: 'developer', label: '개발자 도구',
    items: [
      { id: 'vscode', label: 'VS Code', desc: '코드 편집기' },
      { id: 'webstorm', label: 'WebStorm', desc: 'JavaScript IDE' },
    ],
  },
]

export const Apple_HIG_계층형_그룹_체크박스: Story = {
  name: 'Apple HIG — 계층형 그룹 선택 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Apple HIG Settings 화면의 그룹 체크박스 패턴. 상위 그룹 체크박스로 하위 항목 일괄 선택/해제, ' +
          '부분 선택 시 상위 체크박스 indeterminate 상태(minus 아이콘), 그룹 간 명확한 시각적 구분.',
      },
    },
  },
  render: function AppleHIGGroupCheckbox() {
    const [checked, setChecked] = useState<Record<string, boolean>>({
      notion: true, linear: false, figma: true, vscode: true, webstorm: false,
    })

    const getGroupState = (group: HigAppGroup): { allChecked: boolean; someChecked: boolean } => {
      const groupItems = group.items.map((i) => checked[i.id])
      const allChecked = groupItems.every(Boolean)
      const someChecked = groupItems.some(Boolean) && !allChecked
      return { allChecked, someChecked }
    }

    const toggleGroup = (group: HigAppGroup) => {
      const { allChecked } = getGroupState(group)
      const next = { ...checked }
      group.items.forEach((item) => { next[item.id] = !allChecked })
      setChecked(next)
    }

    const toggleItem = (id: string) => {
      setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const totalSelected = Object.values(checked).filter(Boolean).length

    return (
      <div style={{ width: 340, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: '10px 16px', borderRadius: '10px 10px 0 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>동기화할 앱 선택</span>
          <span style={{ fontSize: 11, color: '#6366f1' }}>{totalSelected}개 선택됨</span>
        </div>

        {HIG_APP_GROUPS.map((group, gi) => {
          const { allChecked, someChecked } = getGroupState(group)
          return (
            <div key={group.id} style={{ borderBottom: gi < HIG_APP_GROUPS.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
              {/* 그룹 헤더 */}
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: '#f1f5f9', cursor: 'pointer' }}
                onClick={() => toggleGroup(group)}
              >
                <Checkbox
                  checked={allChecked || someChecked}
                  iconName={someChecked && !allChecked ? 'minus' : 'check'}
                  onChange={() => toggleGroup(group)}
                  aria-label={group.label}
                />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#475569', letterSpacing: 0.3 }}>{group.label}</span>
              </div>

              {/* 하위 항목 */}
              {group.items.map((item) => (
                <div
                  key={item.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px 9px 36px', borderTop: '1px solid #f8fafc', cursor: 'pointer' }}
                  onClick={() => toggleItem(item.id)}
                >
                  <Checkbox
                    checked={checked[item.id]}
                    onChange={() => toggleItem(item.id)}
                    aria-label={item.label}
                  />
                  <div>
                    <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 500 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 필터 칩 체크박스
   M3 Filter Chip — 체크 상태가 Chip 배경 채워짐으로 시각화
-------------------------------------------------------------------------- */
type M3FilterTag = { id: string; label: string; count: number }

const M3_FILTER_TAGS: M3FilterTag[] = [
  { id: 'bug', label: '버그', count: 12 },
  { id: 'feature', label: '기능 요청', count: 8 },
  { id: 'docs', label: '문서', count: 5 },
  { id: 'performance', label: '성능', count: 3 },
  { id: 'accessibility', label: '접근성', count: 4 },
  { id: 'design', label: '디자인', count: 7 },
  { id: 'test', label: '테스트', count: 6 },
]

export const Material3_필터_칩_체크박스: Story = {
  name: 'Google Material 3 — 필터 칩 체크박스 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'M3 Filter Chip 패턴. Checkbox 상태가 Chip 배경 채워짐(tonal)으로 시각화. ' +
          '선택 시 체크 아이콘 + 색상 전환으로 명확한 선택 상태 표시. 이슈/태그 필터에 활용.',
      },
    },
  },
  render: function M3FilterChips() {
    const [selected, setSelected] = useState<string[]>(['bug', 'feature'])

    const toggle = (id: string) => {
      if (selected.includes(id)) {
        setSelected(selected.filter((s) => s !== id))
      } else {
        setSelected([...selected, id])
      }
    }

    const totalIssues = M3_FILTER_TAGS
      .filter((t) => selected.includes(t.id))
      .reduce((sum, t) => sum + t.count, 0)

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
          이슈 필터
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {M3_FILTER_TAGS.map((tag) => {
            const isSelected = selected.includes(tag.id)
            return (
              <div
                key={tag.id}
                onClick={() => toggle(tag.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
                  border: `1.5px solid ${isSelected ? '#6366f1' : '#e2e8f0'}`,
                  background: isSelected ? '#eff6ff' : '#fff',
                  transition: 'all 0.15s',
                }}
              >
                <Checkbox
                  checked={isSelected}
                  onChange={() => toggle(tag.id)}
                  aria-label={tag.label}
                />
                <span style={{ fontSize: 13, fontWeight: isSelected ? 600 : 400, color: isSelected ? '#4f46e5' : '#374151' }}>
                  {tag.label}
                </span>
                <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 10, background: isSelected ? '#c7d2fe' : '#f1f5f9', color: isSelected ? '#4338ca' : '#94a3b8', fontWeight: 600 }}>
                  {tag.count}
                </span>
              </div>
            )
          })}
        </div>

        <div style={{ padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
          <span>{selected.length}개 카테고리 선택됨</span>
          <span style={{ fontWeight: 600, color: '#4f46e5' }}>{totalIssues}개 이슈</span>
        </div>

        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            style={{ marginTop: 8, fontSize: 11, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            필터 초기화
          </button>
        )}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 개인정보 설정 체크리스트
   M3 Settings list — 데이터 수집 항목 체크박스 + 중요도 뱃지
-------------------------------------------------------------------------- */
type M3PrivacySetting = { id: string; title: string; desc: string; required: boolean; importance: 'high' | 'medium' | 'low' }

const M3_PRIVACY_SETTINGS: M3PrivacySetting[] = [
  { id: 'essential', title: '필수 쿠키', desc: '서비스 운영에 필수적인 데이터', required: true, importance: 'high' },
  { id: 'analytics', title: '분석 데이터', desc: '서비스 개선을 위한 사용 패턴 분석', required: false, importance: 'medium' },
  { id: 'marketing', title: '마케팅', desc: '개인화된 광고 및 추천', required: false, importance: 'low' },
  { id: 'personalize', title: '개인화', desc: '사용자 경험 맞춤 설정', required: false, importance: 'medium' },
  { id: 'thirdparty', title: '서드파티 공유', desc: '파트너사 데이터 공유', required: false, importance: 'low' },
]

const M3_IMPORTANCE_STYLE: Record<M3PrivacySetting['importance'], { label: string; color: string; bg: string }> = {
  high: { label: '필수', color: '#dc2626', bg: '#fee2e2' },
  medium: { label: '권장', color: '#d97706', bg: '#fef3c7' },
  low: { label: '선택', color: '#64748b', bg: '#f1f5f9' },
}

export const Material3_개인정보_설정_체크리스트: Story = {
  name: 'Google Material 3 — 개인정보 설정 체크리스트',
  parameters: {
    docs: {
      description: {
        story:
          'M3 Settings 화면의 Privacy 체크리스트 패턴. 항목별 중요도 뱃지(필수/권장/선택), ' +
          '필수 항목 disabled + 항상 체크 처리, 수락 시 설명 영역 색상 전환.',
      },
    },
  },
  render: function M3PrivacyChecklist() {
    const [accepted, setAccepted] = useState<Record<string, boolean>>({
      essential: true, analytics: true, marketing: false, personalize: true, thirdparty: false,
    })

    const toggleAccept = (id: string) => {
      setAccepted((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const acceptedCount = Object.values(accepted).filter(Boolean).length

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>개인정보 및 쿠키 설정</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>수집 및 활용할 데이터 항목을 선택하세요</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {M3_PRIVACY_SETTINGS.map((setting) => {
            const isAccepted = accepted[setting.id]
            const style = M3_IMPORTANCE_STYLE[setting.importance]
            return (
              <div
                key={setting.id}
                onClick={() => { if (!setting.required) { toggleAccept(setting.id) } }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
                  borderRadius: 10, border: `1px solid ${isAccepted ? '#c7d2fe' : '#e2e8f0'}`,
                  background: isAccepted ? '#f5f3ff' : '#fff',
                  cursor: setting.required ? 'default' : 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <Checkbox
                  checked={isAccepted ? true : false}
                  disabled={setting.required}
                  onChange={() => { if (!setting.required) { toggleAccept(setting.id) } }}
                  aria-label={setting.title}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{setting.title}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, color: style.color, background: style.bg }}>
                      {style.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{setting.desc}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{acceptedCount}/{M3_PRIVACY_SETTINGS.length}개 항목 동의</span>
          <button
            onClick={() => setAccepted(Object.fromEntries(M3_PRIVACY_SETTINGS.map((s) => [s.id, true])))}
            style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            전체 동의
          </button>
        </div>
      </div>
    )
  },
}

export const 디자인_QA = {
  args: {
    disabled: false,
    checked: false,
    iconName: 'check',
  },
  argTypes: {
    iconName: {
      control: 'inline-radio',
      options: ['check', 'minus'],
    },
  },
  // eslint-disable-next-line
  render: function RenderComponent(args: any) {
    const [isChecked, setIsChecked] = useState(args.checked)

    useEffect(() => {
      setIsChecked(args.checked)
    }, [args.checked])

    return <Checkbox {...args} checked={isChecked} onChange={(checked) => setIsChecked(checked)} />
  },
} satisfies Story

// ============================================================
// Cycle 137 — Linear Design + Radix UI 벤치마크 반영
// ============================================================

// Linear 스타일 — 이슈 레이블 필터 체크박스 (컴팩트 인라인)
const LINEAR_LABELS_137 = [
  { id: 'bug', label: 'Bug', color: '#ef4444' },
  { id: 'feature', label: 'Feature', color: '#6366f1' },
  { id: 'improvement', label: 'Improvement', color: '#0ea5e9' },
  { id: 'design', label: 'Design', color: '#ec4899' },
  { id: 'docs', label: 'Documentation', color: '#f59e0b' },
  { id: 'chore', label: 'Chore', color: '#94a3b8' },
]

export const Linear_이슈_레이블_필터: Story = {
  name: 'Linear — 이슈 레이블 필터 체크박스 (Cycle 137)',
  parameters: {
    docs: {
      description: {
        story:
          'Linear Issue Label Filter 패턴. 색상 도트 + 레이블명 + 선택 개수 배지. ' +
          '복수 선택 가능하며 선택된 항목은 배경 강조. Linear의 컴팩트 밀도감 반영.',
      },
    },
  },
  render: function LinearLabelFilterRender() {
    const [selected, setSelected] = useState<string[]>(['bug', 'feature'])

    function toggle(id: string) {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      )
    }

    return (
      <div style={{ width: 260, fontFamily: 'system-ui, sans-serif', background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>레이블</span>
          {selected.length > 0 && (
            <span style={{ fontSize: 11, color: '#6366f1', fontWeight: 600 }}>{selected.length}개 선택</span>
          )}
        </div>
        {LINEAR_LABELS_137.map((l) => {
          const checked = selected.includes(l.id)
          return (
            <div
              key={l.id}
              onClick={() => toggle(l.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
                background: checked ? l.color + '0a' : '#fff',
                borderBottom: '1px solid #f8fafc', cursor: 'pointer', transition: 'background 150ms',
              }}
            >
              <Checkbox
                checked={checked}
                onChange={() => toggle(l.id)}
              />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: checked ? 600 : 400, color: '#0f172a', flex: 1 }}>{l.label}</span>
            </div>
          )
        })}
        <div style={{ padding: '8px 14px', borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={() => setSelected([])}
            style={{ fontSize: 11, color: '#94a3b8', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
          >
            선택 초기화
          </button>
        </div>
      </div>
    )
  },
}

// Radix UI 스타일 — 권한 설정 매트릭스 체크박스
const RADIX_PERMISSIONS_137 = [
  { resource: '컴포넌트', read: true, write: false, delete: false },
  { resource: '스토리북', read: true, write: true, delete: false },
  { resource: '디자인 토큰', read: true, write: true, delete: true },
  { resource: '배포 설정', read: false, write: false, delete: false },
]

type PermRow = { resource: string; read: boolean; write: boolean; delete: boolean }
type PermKey = 'read' | 'write' | 'delete'

export const Radix_권한_설정_매트릭스: Story = {
  name: 'Radix UI — 권한 설정 매트릭스 체크박스 (Cycle 137)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI CheckboxGroup 권한 매트릭스 패턴. 리소스 × 권한 타입(Read/Write/Delete) 2차원 그리드. ' +
          '열 헤더 클릭으로 해당 열 전체 선택/해제(indeterminate 상태 포함). 접근성 완전 지원.',
      },
    },
  },
  render: function RadixPermissionMatrixRender() {
    const [perms, setPerms] = useState<PermRow[]>(RADIX_PERMISSIONS_137)

    function toggleCell(idx: number, key: PermKey) {
      setPerms((prev) => prev.map((r, i) => i === idx ? { ...r, [key]: !r[key] } : r))
    }

    function getColState(key: PermKey): boolean {
      const all = perms.every((r) => r[key])
      const none = perms.every((r) => !r[key])
      if (all) return true
      if (none) return false
      return false
    }

    function toggleCol(key: PermKey) {
      const state = getColState(key)
      const next = state !== true
      setPerms((prev) => prev.map((r) => ({ ...r, [key]: next })))
    }

    const cols: PermKey[] = ['read', 'write', 'delete']
    const colLabels = { read: '읽기', write: '쓰기', delete: '삭제' }

    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', width: 380 }}>
        <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
          리소스 권한 설정
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafbfc' }}>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748b', width: '45%' }}>리소스</th>
              {cols.map((col) => (
                <th key={col} style={{ padding: '10px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#64748b' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <Checkbox
                      checked={getColState(col)}
                      onChange={() => toggleCol(col)}
                    />
                    <span>{colLabels[col]}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {perms.map((row, idx) => (
              <tr key={row.resource} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 16px', fontSize: 13, color: '#0f172a', fontWeight: 500 }}>{row.resource}</td>
                {cols.map((col) => (
                  <td key={col} style={{ padding: '10px', textAlign: 'center' }}>
                    <Checkbox
                      checked={row[col]}
                      onChange={() => toggleCell(idx, col)}
                      disabled={col === 'delete' && !row.write}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
}

// Linear + Radix — 스프린트 완료 체크리스트 (애니메이션 취소선)
const SPRINT_TASKS_137 = [
  { id: 1, title: 'Checkbox 스토리 3개 추가', priority: 'high', done: false },
  { id: 2, title: 'Switch 스토리 3개 추가', priority: 'high', done: false },
  { id: 3, title: 'Templates Cycle 137 추가', priority: 'medium', done: false },
  { id: 4, title: 'pnpm typecheck 통과', priority: 'high', done: false },
  { id: 5, title: 'ESLint max-warnings 0', priority: 'high', done: false },
  { id: 6, title: 'git push & 배포', priority: 'medium', done: false },
]

const PRIORITY_COLOR_137: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#64748b' }

export const Linear_Radix_스프린트_체크리스트: Story = {
  name: 'Linear + Radix — 스프린트 완료 체크리스트 (Cycle 137)',
  parameters: {
    docs: {
      description: {
        story:
          'Linear Issue + Radix Checkbox 통합 패턴. 완료 시 취소선 애니메이션 + 체크 표시. ' +
          '전체 완료 시 진행 바가 초록으로 변하고 완료 메시지 표시. 우선순위 색상 도트.',
      },
    },
  },
  render: function LinearSprintChecklistRender() {
    const [tasks, setTasks] = useState(SPRINT_TASKS_137)

    function toggle(id: number) {
      setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t))
    }

    const doneCount = tasks.filter((t) => t.done).length
    const total = tasks.length
    const allDone = doneCount === total
    const progress = Math.round((doneCount / total) * 100)

    return (
      <div style={{ width: 340, fontFamily: 'system-ui, sans-serif', background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Cycle 137 스프린트</span>
            <span style={{ fontSize: 11, color: allDone ? '#22c55e' : '#94a3b8', fontWeight: 600 }}>{doneCount}/{total}</span>
          </div>
          <div style={{ height: 4, background: '#f1f5f9', borderRadius: 99 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: allDone ? '#22c55e' : '#6366f1', borderRadius: 99, transition: 'width 300ms ease, background 300ms' }} />
          </div>
        </div>
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggle(task.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
              borderBottom: '1px solid #f8fafc', cursor: 'pointer',
              background: task.done ? '#f8fafc' : '#fff', transition: 'background 150ms',
            }}
          >
            <Checkbox
              checked={task.done}
              onChange={() => toggle(task.id)}
            />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: PRIORITY_COLOR_137[task.priority], flexShrink: 0 }} />
            <span style={{
              fontSize: 12, color: task.done ? '#94a3b8' : '#0f172a',
              textDecoration: task.done ? 'line-through' : 'none',
              transition: 'all 200ms', flex: 1,
            }}>
              {task.title}
            </span>
          </div>
        ))}
        {allDone && (
          <div style={{ padding: '12px 16px', background: '#f0fdf4', borderTop: '1px solid #dcfce7', fontSize: 12, color: '#16a34a', fontWeight: 600, textAlign: 'center' }}>
            스프린트 완료! 모든 작업이 완료되었습니다.
          </div>
        )}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Cycle 161 — Chakra UI + Arco Design
   Chakra: 중첩 체크박스 그룹 패턴 (Nested Checkbox Group)
-------------------------------------------------------------------------- */
type TreeNode = { id: string; label: string; children?: TreeNode[] }

const CHAKRA_TREE: TreeNode[] = [
  {
    id: 'frontend', label: '프론트엔드', children: [
      { id: 'react', label: 'React' },
      { id: 'ts', label: 'TypeScript' },
      { id: 'css', label: 'CSS/Tailwind' },
    ]
  },
  {
    id: 'backend', label: '백엔드', children: [
      { id: 'node', label: 'Node.js' },
      { id: 'go', label: 'Go' },
      { id: 'db', label: 'Database' },
    ]
  },
  {
    id: 'devops', label: 'DevOps', children: [
      { id: 'docker', label: 'Docker' },
      { id: 'k8s', label: 'Kubernetes' },
    ]
  },
]

function ChakraNestedCheckboxRender() {
  const [checked, setChecked] = useState<Set<string>>(new Set(['react', 'ts']))

  const toggleLeaf = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const toggleGroup = (node: TreeNode) => {
    const leafIds = (node.children ?? []).map(c => c.id)
    const allChecked = leafIds.every(id => checked.has(id))
    setChecked(prev => {
      const next = new Set(prev)
      if (allChecked) { leafIds.forEach(id => next.delete(id)) } else { leafIds.forEach(id => next.add(id)) }
      return next
    })
  }

  const getGroupState = (node: TreeNode): 'checked' | 'indeterminate' | 'unchecked' => {
    const leafIds = (node.children ?? []).map(c => c.id)
    const checkedCount = leafIds.filter(id => checked.has(id)).length
    if (checkedCount === 0) { return 'unchecked' }
    if (checkedCount === leafIds.length) { return 'checked' }
    return 'indeterminate'
  }

  return (
    <div style={{ width: 280, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>기술 스택 선택</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CHAKRA_TREE.map(group => {
          const state = getGroupState(group)
          return (
            <div key={group.id} style={{ border: '1px solid #f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#f8fafc', cursor: 'pointer' }} onClick={() => toggleGroup(group)}>
                <Checkbox
                  checked={state === 'checked'}
                  iconName={state === 'indeterminate' ? 'minus' : 'check'}
                  onChange={() => toggleGroup(group)}
                  onClick={e => e.stopPropagation()}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{group.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8' }}>
                  {(group.children ?? []).filter(c => checked.has(c.id)).length}/{(group.children ?? []).length}
                </span>
              </div>
              <div style={{ padding: '6px 12px 10px 36px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(group.children ?? []).map(child => (
                  <div key={child.id} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => toggleLeaf(child.id)}>
                    <Checkbox checked={checked.has(child.id)} onChange={() => toggleLeaf(child.id)} onClick={e => e.stopPropagation()} />
                    <span style={{ fontSize: 12, color: '#475569' }}>{child.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: '#f0eeff', fontSize: 11, color: '#6366f1', fontWeight: 600 }}>
        {checked.size}개 선택됨
      </div>
    </div>
  )
}

export const Chakra_중첩_체크박스_그룹: Story = {
  name: 'Chakra UI — 중첩 트리 체크박스 그룹 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Chakra UI의 Nested Checkbox Group 패턴. 부모-자식 계층 구조에서 부분 선택(indeterminate)을 iconName="minus"로 표현합니다.',
      },
    },
  },
  render: () => <ChakraNestedCheckboxRender />,
}

/* --------------------------------------------------------------------------
   Arco Design: 데이터 테이블 행 선택 체크박스 패턴
-------------------------------------------------------------------------- */
const ARCO_ROWS = [
  { id: '1', name: '사용자_분석_보고서.csv', size: '2.4 MB', type: 'CSV', modified: '오늘' },
  { id: '2', name: '컴포넌트_디자인_v2.fig', size: '18.7 MB', type: 'Figma', modified: '어제' },
  { id: '3', name: '온보딩_플로우.pdf', size: '1.2 MB', type: 'PDF', modified: '2일 전' },
  { id: '4', name: 'orbit-ui-theme.ts', size: '45 KB', type: 'TypeScript', modified: '3일 전' },
  { id: '5', name: '스프린트_회고.md', size: '12 KB', type: 'Markdown', modified: '1주 전' },
]

const FILE_TYPE_COLOR: Record<string, string> = { CSV: '#22c55e', Figma: '#8b5cf6', PDF: '#ef4444', TypeScript: '#3b82f6', Markdown: '#64748b' }

function ArcoTableRowSelectRender() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const allSelected = selected.size === ARCO_ROWS.length
  const someSelected = selected.size > 0 && !allSelected

  const toggleAll = () => {
    if (allSelected) { setSelected(new Set()) } else { setSelected(new Set(ARCO_ROWS.map(r => r.id))) }
  }

  const toggleRow = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  return (
    <div style={{ width: 460, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>파일 목록</span>
        {selected.size > 0 && (
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: '#f0eeff', color: '#6366f1', fontWeight: 700 }}>{selected.size}개 선택됨</span>
        )}
        {selected.size > 0 && (
          <button onClick={() => setSelected(new Set())} style={{ marginLeft: 'auto', padding: '4px 10px', fontSize: 11, borderRadius: 6, border: '1px solid #fca5a5', background: '#fff', color: '#ef4444', cursor: 'pointer' }}>선택 항목 삭제</button>
        )}
      </div>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ width: 40, padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                <Checkbox
                  checked={allSelected}
                  iconName={someSelected ? 'minus' : 'check'}
                  onChange={toggleAll}
                />
              </th>
              {['이름', '크기', '형식', '수정일'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ARCO_ROWS.map(row => (
              <tr key={row.id} onClick={() => toggleRow(row.id)} style={{ borderBottom: '1px solid #f1f5f9', background: selected.has(row.id) ? '#f5f3ff' : '#fff', cursor: 'pointer', transition: 'background 0.1s' }}>
                <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                  <Checkbox checked={selected.has(row.id)} onChange={() => toggleRow(row.id)} onClick={e => e.stopPropagation()} />
                </td>
                <td style={{ padding: '8px 12px', fontSize: 12, color: '#1e293b', fontWeight: 500 }}>{row.name}</td>
                <td style={{ padding: '8px 12px', fontSize: 11, color: '#94a3b8' }}>{row.size}</td>
                <td style={{ padding: '8px 12px' }}>
                  <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: `${FILE_TYPE_COLOR[row.type]}15`, color: FILE_TYPE_COLOR[row.type], fontWeight: 600 }}>{row.type}</span>
                </td>
                <td style={{ padding: '8px 12px', fontSize: 11, color: '#94a3b8' }}>{row.modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const Arco_테이블_행_선택_체크박스: Story = {
  name: 'Arco Design — 파일 목록 테이블 행 선택 체크박스 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Arco Design의 Table Row Selection 패턴. 헤더 체크박스로 전체 선택/해제, 부분 선택 시 indeterminate(iconName="minus") 상태 표현.',
      },
    },
  },
  render: () => <ArcoTableRowSelectRender />,
}

/* --------------------------------------------------------------------------
   Chakra + Arco: 권한 설정 매트릭스 + 역할별 체크박스 패턴
-------------------------------------------------------------------------- */
const ROLES_161 = ['관리자', '개발자', '디자이너', '뷰어']
const PERMISSIONS_161 = [
  { id: 'read', label: '읽기', desc: '데이터 조회' },
  { id: 'write', label: '쓰기', desc: '데이터 수정' },
  { id: 'delete', label: '삭제', desc: '데이터 삭제' },
  { id: 'admin', label: '관리', desc: '설정 변경' },
  { id: 'deploy', label: '배포', desc: '프로덕션 배포' },
]

type Matrix = Record<string, Record<string, boolean>>

const DEFAULT_MATRIX: Matrix = {
  '관리자': { read: true, write: true, delete: true, admin: true, deploy: true },
  '개발자': { read: true, write: true, delete: false, admin: false, deploy: true },
  '디자이너': { read: true, write: true, delete: false, admin: false, deploy: false },
  '뷰어': { read: true, write: false, delete: false, admin: false, deploy: false },
}

function ChakraArcoPermissionMatrixRender() {
  const [matrix, setMatrix] = useState<Matrix>(DEFAULT_MATRIX)
  const [saved, setSaved] = useState(false)

  const toggle = (role: string, perm: string) => {
    setMatrix(prev => ({
      ...prev,
      [role]: { ...prev[role], [perm]: !prev[role][perm] }
    }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 480 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>역할별 권한 설정</span>
        <span style={{ marginLeft: 'auto' }}>
          <button onClick={handleSave} style={{ padding: '6px 14px', fontSize: 12, borderRadius: 8, border: 'none', background: saved ? '#22c55e' : '#6366f1', color: '#fff', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}>{saved ? '저장 완료' : '저장'}</button>
        </span>
      </div>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>권한</th>
              {ROLES_161.map(role => (
                <th key={role} style={{ padding: '10px 12px', fontSize: 11, fontWeight: 700, color: '#64748b', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>{role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS_161.map(perm => (
              <tr key={perm.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{perm.label}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>{perm.desc}</div>
                </td>
                {ROLES_161.map(role => (
                  <td key={role} style={{ padding: '10px 12px', textAlign: 'center', background: matrix[role][perm.id] ? '#f5f3ff' : 'transparent' }}>
                    <Checkbox
                      checked={matrix[role][perm.id]}
                      onChange={() => toggle(role, perm.id)}
                      disabled={role === '관리자'}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 10, color: '#94a3b8', marginTop: 8 }}>관리자 역할의 권한은 변경할 수 없습니다</p>
    </div>
  )
}

export const Chakra_Arco_권한_매트릭스_체크박스: Story = {
  name: 'Chakra + Arco Design — 역할별 권한 매트릭스 체크박스 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Chakra UI + Arco Design 복합 패턴. 역할-권한 2차원 매트릭스를 Checkbox 그리드로 구현하며 관리자 역할은 disabled 처리합니다.',
      },
    },
  },
  render: () => <ChakraArcoPermissionMatrixRender />,
}
