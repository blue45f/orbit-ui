import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { Checkbox } from './Checkbox'

Checkbox.displayName = 'Checkbox'

const meta = {
  title: 'eclipse/Inputs/Selection/Checkbox',
  component: Checkbox,
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
