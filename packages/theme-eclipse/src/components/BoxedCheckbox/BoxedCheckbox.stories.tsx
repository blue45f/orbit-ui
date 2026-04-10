import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, useState } from 'react'

import { BoxedCheckbox } from './BoxedCheckbox'

BoxedCheckbox.displayName = 'BoxedCheckbox'

const meta = {
  title: 'eclipse/Inputs/Selection/BoxedCheckbox',
  component: BoxedCheckbox,
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
} satisfies Meta<typeof BoxedCheckbox>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render(args) {
    return <BoxedCheckbox {...args} />
  },
} satisfies Story

export const 테마_재정의 = {
  render(args) {
    return (
      <BoxedCheckbox
        {...args}
        theme={{
          enabledCheckedBorderColor: 'red',
          enabledCheckedFillColor: 'yellow',
          enabledCheckedForegroundColor: 'red',
          enabledUncheckedBorderColor: 'red',
          focusedUncheckedBorderColor: 'red',
          focusedCheckedBorderColor: 'red',
        }}
      />
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

    return (
      <BoxedCheckbox {...args} checked={isChecked} onChange={(checked) => setIsChecked(checked)} />
    )
  },
} satisfies Story

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 권한 매트릭스 패턴
   shadcn/ui Checkbox 그룹 패턴 — 역할별 권한 설정 UI
   실무에서 어드민 패널의 역할/권한 설정에 자주 사용되는 패턴입니다.
-------------------------------------------------------------------------- */
type Permission = 'read' | 'write' | 'delete'
type Role = 'admin' | 'editor' | 'viewer'

const PERMISSIONS: { key: Permission; label: string }[] = [
  { key: 'read', label: '읽기' },
  { key: 'write', label: '쓰기' },
  { key: 'delete', label: '삭제' },
]

const ROLES: { key: Role; label: string; color: string }[] = [
  { key: 'admin', label: 'Admin', color: '#6366f1' },
  { key: 'editor', label: 'Editor', color: '#f59e0b' },
  { key: 'viewer', label: 'Viewer', color: '#64748b' },
]

function PermissionMatrixRender() {
  const [matrix, setMatrix] = useState<Record<Role, Record<Permission, boolean>>>({
    admin: { read: true, write: true, delete: true },
    editor: { read: true, write: true, delete: false },
    viewer: { read: true, write: false, delete: false },
  })

  const toggle = (role: Role, perm: Permission) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: { ...prev[role], [perm]: !prev[role][perm] },
    }))
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>
        역할별 권한 설정
      </div>
      <div
        style={{
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '120px repeat(3, 1fr)',
            background: '#f8fafc',
            padding: '10px 16px',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
            역할
          </div>
          {PERMISSIONS.map((p) => (
            <div
              key={p.key}
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#94a3b8',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              {p.label}
            </div>
          ))}
        </div>
        {ROLES.map((role, i) => (
          <div
            key={role.key}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px repeat(3, 1fr)',
              padding: '12px 16px',
              borderBottom: i < ROLES.length - 1 ? '1px solid #f1f5f9' : 'none',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: role.color,
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{role.label}</span>
            </div>
            {PERMISSIONS.map((perm) => (
              <div key={perm.key} style={{ display: 'flex', justifyContent: 'center' }}>
                <BoxedCheckbox
                  checked={matrix[role.key][perm.key]}
                  onChange={() => toggle(role.key, perm.key)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8' }}>
        shadcn/ui Checkbox 그룹 패턴 응용 — 역할별 권한 매트릭스
      </div>
    </div>
  )
}

export const shadcn_권한_매트릭스 = {
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Checkbox Group 패턴. 역할(Role) × 권한(Permission) 매트릭스로 구성된 어드민 권한 설정 UI입니다.',
      },
    },
  },
  render: () => <PermissionMatrixRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 약관 동의 그룹 패턴
   Radix Checkbox primitive의 indeterminate 상태 활용
   "전체 동의" 체크박스가 하위 항목의 상태를 반영하는 패턴입니다.
-------------------------------------------------------------------------- */
const TERMS = [
  { id: 'service', label: '서비스 이용약관 동의', required: true },
  { id: 'privacy', label: '개인정보 수집 및 이용 동의', required: true },
  { id: 'age', label: '만 14세 이상 확인', required: true },
  { id: 'marketing', label: '마케팅 정보 수신 동의 (선택)', required: false },
  { id: 'thirdparty', label: '제3자 정보 제공 동의 (선택)', required: false },
]

function TermsAgreementRender() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(TERMS.map((t) => [t.id, false]))
  )
  const allChecked = TERMS.every((t) => checked[t.id])
  const someChecked = TERMS.some((t) => checked[t.id]) && !allChecked
  const allRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (allRef.current) {
      allRef.current.indeterminate = someChecked
    }
  }, [someChecked])

  const toggleAll = (val: boolean) => {
    setChecked(Object.fromEntries(TERMS.map((t) => [t.id, val])))
  }

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const requiredAllChecked = TERMS.filter((t) => t.required).every((t) => checked[t.id])

  return (
    <div style={{ maxWidth: 380 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>
        약관 동의
      </div>
      <div
        style={{
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
          <BoxedCheckbox
            checked={allChecked}
            iconName={someChecked ? 'minus' : 'check'}
            onChange={() => toggleAll(!allChecked)}
          />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>전체 동의</span>
        </div>
        {TERMS.map((term) => (
          <div key={term.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BoxedCheckbox checked={checked[term.id]} onChange={() => toggle(term.id)} />
            <span style={{ fontSize: 13, color: checked[term.id] ? '#1e293b' : '#64748b' }}>
              {term.label}
              {term.required && (
                <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <button
          disabled={!requiredAllChecked}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: 8,
            border: 'none',
            background: requiredAllChecked ? '#6366f1' : '#e2e8f0',
            color: requiredAllChecked ? '#fff' : '#94a3b8',
            fontSize: 14,
            fontWeight: 600,
            cursor: requiredAllChecked ? 'pointer' : 'not-allowed',
            transition: 'background 0.15s',
          }}
        >
          동의하고 시작하기
        </button>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
        Radix Checkbox indeterminate 패턴 — 필수(*) 모두 동의 시 버튼 활성화
      </div>
    </div>
  )
}

export const Radix_약관_동의_그룹 = {
  parameters: {
    docs: {
      description: {
        story:
          'Radix Checkbox primitive의 indeterminate 상태 응용. iconName="minus"로 부분 선택 상태를 표현하고, 필수 항목 전체 동의 시 제출 버튼이 활성화됩니다.',
      },
    },
  },
  render: () => <TermsAgreementRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 폼 유효성 검사 패턴
   Ant Design Form.Item 유효성 검사 UX — 미선택 항목 시각적 오류 표시
-------------------------------------------------------------------------- */
const REQUIRED_ITEMS = [
  { id: 'privacy', label: '개인정보 처리방침에 동의합니다.' },
  { id: 'age', label: '만 14세 이상임을 확인합니다.' },
]

function FormValidationRender() {
  const [checked, setChecked] = useState<Record<string, boolean>>({ privacy: false, age: false })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    if (REQUIRED_ITEMS.every((item) => checked[item.id])) {
      alert('제출 완료!')
      setSubmitted(false)
    }
  }

  return (
    <div style={{ maxWidth: 380 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>
        회원가입 폼 (Ant Design 유효성 검사 패턴)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          placeholder="이메일"
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            fontSize: 14,
            outline: 'none',
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            fontSize: 14,
            outline: 'none',
          }}
        />
        <div
          style={{
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {REQUIRED_ITEMS.map((item) => {
            const hasError = submitted && !checked[item.id]
            return (
              <div key={item.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      borderRadius: 4,
                      outline: hasError ? '2px solid #ef4444' : 'none',
                      outlineOffset: 1,
                    }}
                  >
                    <BoxedCheckbox
                      checked={checked[item.id]}
                      onChange={(val) => {
                        setChecked((prev) => ({ ...prev, [item.id]: val }))
                        if (submitted) setSubmitted(false)
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 13, color: hasError ? '#ef4444' : '#475569' }}>
                    {item.label}
                  </span>
                </div>
                {hasError && (
                  <div style={{ marginTop: 4, marginLeft: 28, fontSize: 11, color: '#ef4444' }}>
                    필수 항목입니다.
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px',
            borderRadius: 8,
            border: 'none',
            background: '#6366f1',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          가입하기
        </button>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
        Ant Design Form 유효성 검사 패턴 — 미선택 시 빨간 아웃라인 + 에러 메시지
      </div>
    </div>
  )
}

export const Ant_폼_유효성_검사 = {
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Form.Item 유효성 검사 UX. 제출 시 미선택 필수 항목에 빨간 테두리와 에러 메시지를 표시합니다.',
      },
    },
  },
  render: () => <FormValidationRender />,
}

/* --------------------------------------------------------------------------
   Tailwind UI 벤치마크: 알림 설정 패널
   Tailwind UI Form pattern — 카테고리별 알림 설정 체크박스 그룹
-------------------------------------------------------------------------- */
const NOTIFICATION_GROUPS = [
  {
    category: '이메일 알림',
    items: [
      { id: 'email_deploy', label: '배포 성공/실패', desc: '배포가 완료되거나 실패할 때 이메일을 받습니다.' },
      { id: 'email_pr', label: 'PR 리뷰 요청', desc: '코드 리뷰가 요청되었을 때 알림을 받습니다.' },
      { id: 'email_mention', label: '멘션', desc: '댓글에서 멘션되면 알림을 받습니다.' },
    ],
  },
  {
    category: '푸시 알림',
    items: [
      { id: 'push_security', label: '보안 경고', desc: '계정 보안 관련 중요 알림입니다.' },
      { id: 'push_update', label: '시스템 업데이트', desc: '새 버전이 출시될 때 알림을 받습니다.' },
    ],
  },
]

function NotificationSettingsRender() {
  const [enabled, setEnabled] = useState<Set<string>>(new Set(['email_deploy', 'push_security']))

  const toggle = (id: string) => {
    setEnabled((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ maxWidth: 480, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>알림 설정</div>
      <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
        수신할 알림 종류를 선택하세요.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {NOTIFICATION_GROUPS.map((group) => (
          <div key={group.category}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
              {group.category}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              {group.items.map((item, idx) => (
                <label
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '14px 16px',
                    borderBottom: idx < group.items.length - 1 ? '1px solid #f1f5f9' : 'none',
                    cursor: 'pointer',
                    background: enabled.has(item.id) ? 'rgba(99,102,241,0.03)' : '#fff',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{ paddingTop: 2 }}>
                    <BoxedCheckbox
                      checked={enabled.has(item.id)}
                      onChange={() => toggle(item.id)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 2 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
        <button
          style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          저장
        </button>
        <button
          style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 13, cursor: 'pointer' }}
          onClick={() => setEnabled(new Set())}
        >
          전체 해제
        </button>
      </div>
    </div>
  )
}

export const Tailwind_알림_설정 = {
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI Form 패턴 — 카테고리별 알림 설정 체크박스 그룹. 선택 시 배경 강조로 상태를 명확히 표현합니다.',
      },
    },
  },
  render: () => <NotificationSettingsRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 선택 카드 그룹
   Chakra UI checkbox-inside-card 패턴 — 플랜/옵션 선택 카드 UI
-------------------------------------------------------------------------- */
const PLAN_CARDS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '무료',
    features: ['컴포넌트 50개+', 'Storybook 문서', '커뮤니티 지원'],
    color: '#64748b',
    bg: '#f8fafc',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '월 ₩29,000',
    features: ['컴포넌트 200개+', '피그마 키트', '우선 지원', '테마 빌더'],
    color: '#6366f1',
    bg: '#f0f4ff',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '문의',
    features: ['무제한 컴포넌트', '전용 슬랙 채널', 'SLA 보장', '커스텀 테마'],
    color: '#0ea5e9',
    bg: '#f0f9ff',
  },
]

function PlanCardGroupRender() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['pro']))

  return (
    <div style={{ maxWidth: 560, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>플랜 선택</div>
      <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>필요한 플랜을 복수 선택할 수 있습니다.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PLAN_CARDS.map((plan) => {
          const isSelected = selected.has(plan.id)
          return (
            <label
              key={plan.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '16px 20px',
                borderRadius: 14,
                border: `2px solid ${isSelected ? plan.color : '#e2e8f0'}`,
                background: isSelected ? plan.bg : '#fff',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ paddingTop: 2, flexShrink: 0 }}>
                <BoxedCheckbox
                  checked={isSelected}
                  onChange={() => {
                    setSelected((prev) => {
                      const next = new Set(prev)
                      if (next.has(plan.id)) next.delete(plan.id)
                      else next.add(plan.id)
                      return next
                    })
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: isSelected ? plan.color : '#1e293b' }}>
                    {plan.name}
                  </span>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{plan.price}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {plan.features.map((feat) => (
                    <span
                      key={feat}
                      style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 99,
                        background: isSelected ? `${plan.color}18` : '#f1f5f9',
                        color: isSelected ? plan.color : '#64748b',
                        fontWeight: 500,
                      }}
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </label>
          )
        })}
      </div>

      <div style={{ marginTop: 16, fontSize: 12, color: '#94a3b8' }}>
        Chakra UI checkbox-inside-card 패턴 — {selected.size > 0 ? `${selected.size}개 플랜 선택됨` : '선택 없음'}
      </div>
    </div>
  )
}

export const Chakra_선택_카드_그룹 = {
  parameters: {
    docs: {
      description: {
        story: 'Chakra UI의 checkbox-inside-card 패턴. 카드 전체를 클릭 영역으로 사용하며, 선택 시 테두리·배경·배지 색상이 연동 변경됩니다.',
      },
    },
  },
  render: () => <PlanCardGroupRender />,
}

/* --------------------------------------------------------------------------
   Tailwind + Chakra 벤치마크: 데이터 테이블 행 선택
   전체 선택(indeterminate) + 행별 체크박스 — 일괄 작업 패턴
-------------------------------------------------------------------------- */
const TABLE_ROWS = [
  { id: 'r1', name: 'Button', category: 'Actions', status: 'stable', version: '2.4.0' },
  { id: 'r2', name: 'TextField', category: 'Inputs', status: 'stable', version: '2.4.0' },
  { id: 'r3', name: 'Modal', category: 'Feedback', status: 'beta', version: '2.3.1' },
  { id: 'r4', name: 'Calendar', category: 'Navigation', status: 'beta', version: '2.3.0' },
  { id: 'r5', name: 'DataTable', category: 'Data Display', status: 'stable', version: '2.4.0' },
]

function TableRowSelectionRender() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const allSelected = TABLE_ROWS.every((r) => selected.has(r.id))
  const someSelected = TABLE_ROWS.some((r) => selected.has(r.id)) && !allSelected

  const toggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(TABLE_ROWS.map((r) => r.id)))
  }

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ maxWidth: 620, fontFamily: 'system-ui, sans-serif' }}>
      {selected.size > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 16px',
          borderRadius: 10,
          background: '#eef2ff',
          border: '1px solid #c7d2fe',
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#6366f1' }}>{selected.size}개 선택됨</span>
          <button style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #6366f1', background: '#fff', color: '#6366f1', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
            내보내기
          </button>
          <button style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #ef4444', background: '#fff', color: '#ef4444', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
            삭제
          </button>
          <button
            style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setSelected(new Set())}
          >
            선택 해제
          </button>
        </div>
      )}

      <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', width: 40 }}>
                <BoxedCheckbox
                  checked={allSelected}
                  iconName={someSelected ? 'minus' : 'check'}
                  onChange={toggleAll}
                />
              </th>
              {['컴포넌트', '카테고리', '상태', '버전'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row, idx) => {
              const isSelected = selected.has(row.id)
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: idx < TABLE_ROWS.length - 1 ? '1px solid #f1f5f9' : 'none',
                    background: isSelected ? 'rgba(99,102,241,0.04)' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                  onClick={() => toggleRow(row.id)}
                >
                  <td style={{ padding: '10px 14px' }}>
                    <BoxedCheckbox checked={isSelected} onChange={() => toggleRow(row.id)} />
                  </td>
                  <td style={{ padding: '10px 14px', fontWeight: isSelected ? 600 : 400, color: '#0f172a' }}>{row.name}</td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>{row.category}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{
                      fontSize: 11, padding: '2px 8px', borderRadius: 99, fontWeight: 600,
                      background: row.status === 'stable' ? '#dcfce7' : '#fef9c3',
                      color: row.status === 'stable' ? '#15803d' : '#a16207',
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#94a3b8', fontFamily: 'monospace', fontSize: 12 }}>{row.version}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
        Tailwind + Chakra 테이블 행 선택 패턴 — indeterminate 전체 선택 + 행 클릭 토글
      </div>
    </div>
  )
}

export const Tailwind_테이블_행_선택 = {
  parameters: {
    docs: {
      description: {
        story: 'Tailwind UI + Chakra UI 테이블 행 선택 패턴. 전체 선택 체크박스는 indeterminate 상태를 지원하고, 선택 시 일괄 작업 액션 바가 표시됩니다.',
      },
    },
  },
  render: () => <TableRowSelectionRender />,
}
