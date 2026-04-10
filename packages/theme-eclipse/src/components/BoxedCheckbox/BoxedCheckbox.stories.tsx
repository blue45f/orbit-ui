import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, useState } from 'react'

import { BoxedCheckbox } from './BoxedCheckbox'

BoxedCheckbox.displayName = 'BoxedCheckbox'

const meta = {
  title: 'eclipse/Inputs/Selection/BoxedCheckbox',
  component: BoxedCheckbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "BoxedCheckbox는 카드 스타일의 체크박스 컴포넌트입니다. 선택 시 전체 카드가 강조되어 시각적 피드백이 명확합니다.",
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

// ─── Cycle 63: Chakra UI + Google Material 3 ───────────────────────────────

const CHAKRA_PLAN_FEATURES = [
  { id: 'components', label: '무제한 컴포넌트', desc: '모든 Orbit UI 컴포넌트 접근', included: true },
  { id: 'themes', label: '커스텀 테마', desc: '브랜드 토큰 시스템 커스터마이즈', included: true },
  { id: 'icons', label: 'Icon 라이브러리', desc: '500+ SVG 아이콘 제공', included: false },
  { id: 'figma', label: 'Figma 파일', desc: '컴포넌트 원본 Figma 소스', included: false },
  { id: 'priority', label: '우선 지원', desc: '24시간 내 응답 보장', included: false },
]

const ChakraPlanFeatureRender = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(['components', 'themes']))
  const total = selected.size

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>플랜 기능 선택</div>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>필요한 기능만 골라 플랜을 구성하세요.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {CHAKRA_PLAN_FEATURES.map((feat) => {
          const checked = selected.has(feat.id)
          return (
            <div
              key={feat.id}
              onClick={() => toggle(feat.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${checked ? '#6366f1' : '#e2e8f0'}`, background: checked ? '#fafaff' : '#fff', cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s' }}
            >
              <BoxedCheckbox checked={checked} onChange={() => toggle(feat.id)} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {feat.label}
                  {feat.included && <span style={{ fontSize: 10, background: '#dcfce7', color: '#15803d', padding: '1px 6px', borderRadius: 100, fontWeight: 700 }}>기본 포함</span>}
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{feat.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#64748b' }}>선택된 기능</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#6366f1' }}>{total}개</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: '#94a3b8' }}>Chakra UI Checkbox 카드 선택 패턴</div>
    </div>
  )
}

export const Chakra_플랜_기능_선택 = {
  parameters: {
    docs: {
      description: {
        story: 'Chakra UI의 CheckboxGroup 카드 패턴. 각 항목이 체크박스 + 설명 카드로 표현되며, 선택 시 보더와 배경이 즉시 변경됩니다. SaaS 플랜 기능 선택, 옵션 구성 화면에 활용됩니다.',
      },
    },
  },
  render: () => <ChakraPlanFeatureRender />,
}

const M3_CONSENT_ITEMS = [
  { id: 'service', label: '[필수] 서비스 이용약관 동의', required: true },
  { id: 'privacy', label: '[필수] 개인정보 수집 및 이용 동의', required: true },
  { id: 'marketing', label: '[선택] 마케팅 정보 수신 동의', required: false },
  { id: 'thirdparty', label: '[선택] 제3자 정보 제공 동의', required: false },
]

const Material3ConsentRender = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({ service: false, privacy: false, marketing: false, thirdparty: false })
  const allChecked = Object.values(checked).every(Boolean)
  const someChecked = Object.values(checked).some(Boolean)
  const allRequiredChecked = checked.service && checked.privacy

  const toggleAll = () => {
    const next = !allChecked
    setChecked({ service: next, privacy: next, marketing: next, thirdparty: next })
  }

  const toggle = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif', background: '#fffbfe', borderRadius: 16, padding: 20, border: '1px solid #e7e0ec' }}>
      <div style={{ fontSize: 16, fontWeight: 500, color: '#1c1b1f', marginBottom: 4 }}>약관 동의</div>
      <div style={{ fontSize: 13, color: '#49454f', marginBottom: 16 }}>서비스 이용을 위해 아래 약관에 동의해 주세요.</div>
      {/* 전체 동의 */}
      <div
        onClick={toggleAll}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: '#f4eff4', marginBottom: 12, cursor: 'pointer' }}
      >
        <BoxedCheckbox
          checked={allChecked}
          iconName={someChecked && !allChecked ? 'minus' : 'check'}
          onChange={toggleAll}
        />
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1c1b1f' }}>전체 동의</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {M3_CONSENT_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => toggle(item.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', cursor: 'pointer' }}
          >
            <BoxedCheckbox checked={checked[item.id]} onChange={() => toggle(item.id)} />
            <span style={{ fontSize: 13, color: item.required ? '#1c1b1f' : '#49454f' }}>{item.label}</span>
          </div>
        ))}
      </div>
      <button
        disabled={!allRequiredChecked}
        style={{ width: '100%', padding: '12px', borderRadius: 100, border: 'none', background: allRequiredChecked ? '#6750a4' : '#e7e0ec', color: allRequiredChecked ? '#fff' : '#79747e', fontSize: 14, fontWeight: 600, cursor: allRequiredChecked ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
      >
        동의하고 시작하기
      </button>
      <div style={{ marginTop: 10, fontSize: 11, color: '#79747e', textAlign: 'center' }}>Material 3 Checkbox + 전체 동의 패턴</div>
    </div>
  )
}

export const Material3_약관_동의_체크박스 = {
  parameters: {
    docs: {
      description: {
        story: 'Google Material 3 디자인의 약관 동의 체크박스 패턴. 전체 동의 체크박스는 indeterminate(minus) 상태를 지원하고, 필수 항목이 모두 선택되어야 확인 버튼이 활성화됩니다.',
      },
    },
  },
  render: () => <Material3ConsentRender />,
}

const M3_FILTER_TAGS = [
  { id: 'react', label: 'React', color: '#61dafb' },
  { id: 'typescript', label: 'TypeScript', color: '#3178c6' },
  { id: 'tailwind', label: 'Tailwind', color: '#38bdf8' },
  { id: 'figma', label: 'Figma', color: '#f24e1e' },
  { id: 'storybook', label: 'Storybook', color: '#ff4785' },
  { id: 'vite', label: 'Vite', color: '#bd34fe' },
]

const Material3FilterChipRender = () => {
  const [active, setActive] = useState<Set<string>>(new Set(['react', 'typescript']))

  const toggle = (id: string) => {
    setActive(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#49454f', marginBottom: 12 }}>기술 스택 필터</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {M3_FILTER_TAGS.map((tag) => {
          const isOn = active.has(tag.id)
          return (
            <div
              key={tag.id}
              onClick={() => toggle(tag.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: isOn ? '#f4f0ff' : '#fafafa', border: `1px solid ${isOn ? '#6750a4' : '#e7e0ec'}`, cursor: 'pointer', transition: 'all 0.15s' }}
            >
              <BoxedCheckbox checked={isOn} onChange={() => toggle(tag.id)} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: tag.color, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: isOn ? 600 : 400, color: isOn ? '#4a3f9f' : '#1c1b1f', flex: 1 }}>{tag.label}</span>
              {isOn && <span style={{ fontSize: 10, background: '#6750a4', color: '#fff', borderRadius: 100, padding: '1px 7px', fontWeight: 700 }}>ON</span>}
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: '#49454f', textAlign: 'right' }}>
        {active.size}개 선택됨
      </div>
      <div style={{ marginTop: 4, fontSize: 11, color: '#79747e' }}>Material 3 Filter Chip 패턴 — BoxedCheckbox 조합</div>
    </div>
  )
}

export const Material3_기술스택_필터_칩 = {
  parameters: {
    docs: {
      description: {
        story: 'Google Material 3의 Filter Chip 패턴을 BoxedCheckbox로 구현. 기술 스택 색상 도트와 ON/OFF 배지로 선택 상태를 시각화합니다. M3 팔레트(#6750a4 primary, #fffbfe surface)를 적용합니다.',
      },
    },
  },
  render: () => <Material3FilterChipRender />,
}

const FIGMA_LAYERS = [
  { id: 'frame1', name: 'Card Component', type: 'frame', depth: 0 },
  { id: 'group1', name: 'Content Group', type: 'group', depth: 1 },
  { id: 'text1', name: 'Title Text', type: 'text', depth: 2 },
  { id: 'text2', name: 'Body Text', type: 'text', depth: 2 },
  { id: 'rect1', name: 'Background', type: 'rectangle', depth: 1 },
  { id: 'icon1', name: 'Icon / Arrow', type: 'component', depth: 1 },
]

const FIGMA_TYPE_ICON: Record<string, string> = {
  frame: '▣',
  group: '◱',
  text: 'T',
  rectangle: '□',
  component: '◈',
}

const FigmaLayerVisibilityRender = () => {
  const [visible, setVisible] = useState<Set<string>>(new Set(FIGMA_LAYERS.map(l => l.id)))

  const toggle = (id: string) => {
    setVisible(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ width: 260, fontFamily: 'Inter, system-ui, sans-serif', background: '#2c2c2c', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #3d3d3d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Layers</span>
        <span style={{ fontSize: 10, color: '#666' }}>{visible.size}/{FIGMA_LAYERS.length} visible</span>
      </div>
      <div style={{ padding: '4px 0' }}>
        {FIGMA_LAYERS.map((layer) => {
          const isVisible = visible.has(layer.id)
          return (
            <div
              key={layer.id}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: `6px 12px 6px ${12 + layer.depth * 16}px`, cursor: 'pointer', background: 'transparent', opacity: isVisible ? 1 : 0.4, transition: 'opacity 0.15s' }}
              onClick={() => toggle(layer.id)}
            >
              <BoxedCheckbox checked={isVisible} onChange={() => toggle(layer.id)} />
              <span style={{ fontSize: 11, color: '#a78bfa', minWidth: 14, textAlign: 'center' }}>{FIGMA_TYPE_ICON[layer.type]}</span>
              <span style={{ fontSize: 12, color: isVisible ? '#e5e5e5' : '#888', flex: 1 }}>{layer.name}</span>
              {!isVisible && <span style={{ fontSize: 9, color: '#555', fontStyle: 'italic' }}>hidden</span>}
            </div>
          )
        })}
      </div>
      <div style={{ padding: '8px 12px', borderTop: '1px solid #3d3d3d', fontSize: 11, color: '#666', textAlign: 'center' }}>
        Figma Layers Panel 패턴
      </div>
    </div>
  )
}

export const Figma_레이어_가시성_패널 = {
  parameters: {
    docs: {
      description: {
        story: 'Figma 레이어 패널의 가시성 토글 패턴. 다크 테마 UI에서 레이어별 BoxedCheckbox로 표시/숨김을 제어합니다. 중첩 depth에 따른 들여쓰기와 레이어 타입 아이콘을 포함합니다.',
      },
    },
  },
  render: () => <FigmaLayerVisibilityRender />,
}

const FIGMA_EXPORT_FORMATS = [
  { id: 'png1x', label: 'PNG 1x', desc: '일반 해상도', selected: true },
  { id: 'png2x', label: 'PNG 2x', desc: 'Retina 디스플레이', selected: true },
  { id: 'svg', label: 'SVG', desc: '벡터 포맷', selected: false },
  { id: 'pdf', label: 'PDF', desc: '인쇄용', selected: false },
  { id: 'webp', label: 'WebP', desc: '웹 최적화', selected: false },
]

const FigmaExportSettingsRender = () => {
  const [formats, setFormats] = useState(FIGMA_EXPORT_FORMATS)
  const [includeBackground, setIncludeBackground] = useState(false)
  const [trimWhitespace, setTrimWhitespace] = useState(true)

  const toggleFormat = (id: string) => {
    setFormats(prev => prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f))
  }

  const selectedCount = formats.filter(f => f.selected).length

  return (
    <div style={{ width: 300, fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#f9fafb' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>내보내기 설정</div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>포맷을 선택하세요 ({selectedCount}개 선택됨)</div>
      </div>
      <div style={{ padding: '8px 0' }}>
        {formats.map((fmt) => (
          <div
            key={fmt.id}
            onClick={() => toggleFormat(fmt.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', cursor: 'pointer', background: fmt.selected ? '#f5f3ff' : 'transparent', transition: 'background 0.1s' }}
          >
            <BoxedCheckbox checked={fmt.selected} onChange={() => toggleFormat(fmt.id)} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: fmt.selected ? '#7c3aed' : '#374151' }}>{fmt.label}</div>
              <div style={{ fontSize: 10, color: '#9ca3af' }}>{fmt.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div onClick={() => setIncludeBackground(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <BoxedCheckbox checked={includeBackground} onChange={() => setIncludeBackground(p => !p)} />
          <span style={{ fontSize: 12, color: '#374151' }}>배경 포함</span>
        </div>
        <div onClick={() => setTrimWhitespace(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <BoxedCheckbox checked={trimWhitespace} onChange={() => setTrimWhitespace(p => !p)} />
          <span style={{ fontSize: 12, color: '#374151' }}>여백 자르기</span>
        </div>
      </div>
      <div style={{ padding: '10px 16px', background: '#f9fafb', borderTop: '1px solid #f0f0f0' }}>
        <button
          disabled={selectedCount === 0}
          style={{ width: '100%', padding: '8px', borderRadius: 6, border: 'none', background: selectedCount > 0 ? '#7c3aed' : '#e5e7eb', color: selectedCount > 0 ? '#fff' : '#9ca3af', fontSize: 12, fontWeight: 600, cursor: selectedCount > 0 ? 'pointer' : 'not-allowed' }}
        >
          {selectedCount > 0 ? `${selectedCount}개 포맷 내보내기` : '포맷을 선택하세요'}
        </button>
      </div>
    </div>
  )
}

export const Figma_내보내기_설정 = {
  parameters: {
    docs: {
      description: {
        story: 'Figma 내보내기 패널 패턴. 다양한 이미지 포맷(PNG 1x/2x, SVG, PDF, WebP)을 BoxedCheckbox로 다중 선택하고, 배경 포함/여백 자르기 옵션을 추가로 설정합니다.',
      },
    },
  },
  render: () => <FigmaExportSettingsRender />,
}

const FIGMA_PROPERTIES = [
  { id: 'auto_layout', label: 'Auto Layout', category: 'layout', active: true },
  { id: 'constraints', label: 'Constraints', category: 'layout', active: false },
  { id: 'fill', label: 'Fill', category: 'design', active: true },
  { id: 'stroke', label: 'Stroke', category: 'design', active: false },
  { id: 'effects', label: 'Effects', category: 'design', active: true },
  { id: 'prototype', label: 'Prototype Links', category: 'prototype', active: false },
]

const FigmaComponentPropertiesRender = () => {
  const [props, setProps] = useState(FIGMA_PROPERTIES)
  const [viewMode, setViewMode] = useState<'all' | 'active'>('all')

  const toggleProp = (id: string) => {
    setProps(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  const displayed = viewMode === 'all' ? props : props.filter(p => p.active)
  const categories = [...new Set(displayed.map(p => p.category))]

  return (
    <div style={{ width: 280, fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '10px 14px', background: '#1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Component Properties</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['all', 'active'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: 'none', background: viewMode === mode ? '#7c3aed' : '#3d3d3d', color: viewMode === mode ? '#fff' : '#aaa', cursor: 'pointer' }}
            >
              {mode === 'all' ? '전체' : '활성'}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '6px 0' }}>
        {categories.map(cat => (
          <div key={cat}>
            <div style={{ padding: '4px 14px 2px', fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cat}</div>
            {displayed.filter(p => p.category === cat).map(prop => (
              <div
                key={prop.id}
                onClick={() => toggleProp(prop.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', cursor: 'pointer', background: prop.active ? '#f5f3ff' : 'transparent' }}
              >
                <BoxedCheckbox checked={prop.active} onChange={() => toggleProp(prop.id)} />
                <span style={{ fontSize: 12, color: prop.active ? '#7c3aed' : '#374151', fontWeight: prop.active ? 600 : 400 }}>{prop.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding: '8px 14px', borderTop: '1px solid #f0f0f0', fontSize: 11, color: '#9ca3af' }}>
        {props.filter(p => p.active).length}개 속성 활성화됨
      </div>
    </div>
  )
}

export const Figma_컴포넌트_속성_설정 = {
  parameters: {
    docs: {
      description: {
        story: 'Figma 컴포넌트 속성 패널 패턴. Layout/Design/Prototype 카테고리별로 속성을 BoxedCheckbox로 활성화/비활성화하고, 전체/활성 뷰 전환을 지원합니다.',
      },
    },
  },
  render: () => <FigmaComponentPropertiesRender />,
}

/* --------------------------------------------------------------------------
   Cycle 124 — Vercel Design + Radix UI 벤치마크
-------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Vercel: 배포 알림 채널 설정 패턴
   Vercel Notifications 설정 화면 — 이벤트별 알림 채널 체크박스
-------------------------------------------------------------------------- */
export const Vercel_배포_알림_설정 = {
  name: 'Vercel - 배포 알림 채널 설정 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Notifications 설정 화면 패턴. 배포/도메인/팀 이벤트별로 ' +
          'Email/Slack/Webhook 채널을 BoxedCheckbox로 개별 설정하는 인터페이스입니다.',
      },
    },
  },
  render: function Render() {
    type Channel = 'email' | 'slack' | 'webhook'
    type EventKey = 'deploy_success' | 'deploy_fail' | 'domain_error' | 'team_invite'

    const EVENT_LABELS: Record<EventKey, { label: string; desc: string }> = {
      deploy_success: { label: '배포 성공', desc: '새 배포가 완료될 때' },
      deploy_fail: { label: '배포 실패', desc: '빌드 또는 배포 오류 발생 시' },
      domain_error: { label: '도메인 오류', desc: 'DNS 또는 SSL 문제 발생 시' },
      team_invite: { label: '팀 초대', desc: '새 팀원이 초대될 때' },
    }

    const CHANNELS: Channel[] = ['email', 'slack', 'webhook']
    const CHANNEL_LABELS: Record<Channel, string> = { email: 'Email', slack: 'Slack', webhook: 'Webhook' }

    const [settings, setSettings] = useState<Record<EventKey, Set<Channel>>>({
      deploy_success: new Set(['email']),
      deploy_fail: new Set(['email', 'slack']),
      domain_error: new Set(['email', 'webhook']),
      team_invite: new Set(['email']),
    })

    const toggle = (event: EventKey, channel: Channel) => {
      setSettings((prev) => {
        const next = new Set(prev[event])
        if (next.has(channel)) next.delete(channel)
        else next.add(channel)
        return { ...prev, [event]: next }
      })
    }

    return (
      <div style={{ width: 500, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>알림 설정</div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>이벤트별 알림 채널을 선택하세요.</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 80px)', gap: 8, padding: '8px 12px', borderRadius: 8, background: '#f8fafc', marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>이벤트</span>
          {CHANNELS.map((ch) => (
            <span key={ch} style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
              {CHANNEL_LABELS[ch]}
            </span>
          ))}
        </div>

        {(Object.keys(EVENT_LABELS) as EventKey[]).map((ev) => (
          <div key={ev} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 80px)', gap: 8, padding: '12px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fff', marginBottom: 6, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{EVENT_LABELS[ev].label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{EVENT_LABELS[ev].desc}</div>
            </div>
            {CHANNELS.map((ch) => (
              <div key={ch} style={{ display: 'flex', justifyContent: 'center' }}>
                <BoxedCheckbox
                  checked={settings[ev].has(ch)}
                  onChange={() => toggle(ev, ch)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Radix: 폼 권한 그룹 체크박스 패턴
   Radix CheckboxGroup 아이디어 — role=group + indeterminate 상태
-------------------------------------------------------------------------- */
export const Radix_폼_권한_그룹_체크박스 = {
  name: 'Radix UI - 폼 권한 그룹 체크박스 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI CheckboxGroup 접근성 패턴. role="group" + aria-labelledby로 그룹화하고 ' +
          '권한 카테고리별로 분리된 체크박스 그룹과 indeterminate(minus) 상태를 지원합니다.',
      },
    },
  },
  render: function Render() {
    const PERMISSION_GROUPS = [
      {
        id: 'read', label: '읽기 권한',
        items: ['프로젝트 조회', '이슈 조회', '댓글 조회', '대시보드 조회'],
      },
      {
        id: 'write', label: '쓰기 권한',
        items: ['이슈 생성', '댓글 작성', '라벨 추가', '마일스톤 설정'],
      },
      {
        id: 'admin', label: '관리자 권한',
        items: ['멤버 초대', '권한 변경', '프로젝트 삭제', 'API 키 발급'],
      },
    ]

    const [checked, setChecked] = useState<Set<string>>(
      new Set(['프로젝트 조회', '이슈 조회', '댓글 조회'])
    )

    const toggleItem = (item: string) => {
      setChecked((prev) => {
        const next = new Set(prev)
        if (next.has(item)) next.delete(item)
        else next.add(item)
        return next
      })
    }

    const toggleGroup = (items: string[]) => {
      const allChecked = items.every((i) => checked.has(i))
      setChecked((prev) => {
        const next = new Set(prev)
        if (allChecked) items.forEach((i) => next.delete(i))
        else items.forEach((i) => next.add(i))
        return next
      })
    }

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }} role="form">
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>역할 권한 설정</div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>이 역할에 부여할 권한을 선택하세요.</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {PERMISSION_GROUPS.map((group) => {
            const allChecked = group.items.every((i) => checked.has(i))
            const someChecked = group.items.some((i) => checked.has(i)) && !allChecked
            return (
              <div key={group.id} role="group" aria-labelledby={`group-${group.id}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <BoxedCheckbox
                    checked={allChecked}
                    iconName={someChecked ? 'minus' : 'check'}
                    onChange={() => toggleGroup(group.items)}
                  />
                  <span id={`group-${group.id}`} style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
                    {group.label}
                  </span>
                  <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>
                    {group.items.filter((i) => checked.has(i)).length}/{group.items.length}
                  </span>
                </div>
                <div style={{ paddingLeft: 30, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {group.items.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <BoxedCheckbox checked={checked.has(item)} onChange={() => toggleItem(item)} />
                      <span style={{ fontSize: 13, color: '#475569' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 10, background: '#f0f9ff', border: '1px solid #bae6fd', fontSize: 12, color: '#0369a1' }}>
          {checked.size}개 권한 선택됨
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Vercel + Radix: CI/CD 파이프라인 단계 설정
   두 시스템의 카드형 체크박스 + 그룹화 패턴 결합
-------------------------------------------------------------------------- */
export const Vercel_Radix_파이프라인_단계_설정 = {
  name: 'Vercel + Radix UI - CI/CD 파이프라인 단계 설정',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Build Settings + Radix CheckboxGroup 패턴 결합. 빌드 파이프라인 각 단계를 ' +
          'BoxedCheckbox 카드로 활성화/비활성화하고 의존 관계를 시각적으로 표현합니다.',
      },
    },
  },
  render: function Render() {
    type StepId = 'lint' | 'test' | 'type_check' | 'build' | 'e2e' | 'deploy'
    const STEPS: { id: StepId; label: string; desc: string; deps: StepId[]; required: boolean }[] = [
      { id: 'lint', label: 'ESLint', desc: '코드 스타일 및 오류 검사', deps: [], required: true },
      { id: 'type_check', label: 'TypeScript', desc: '타입 오류 검사', deps: [], required: true },
      { id: 'test', label: 'Unit Test', desc: 'Vitest 단위 테스트', deps: ['lint', 'type_check'], required: false },
      { id: 'build', label: 'Build', desc: 'Vite 프로덕션 빌드', deps: ['lint', 'type_check'], required: true },
      { id: 'e2e', label: 'E2E Test', desc: 'Playwright 통합 테스트', deps: ['build'], required: false },
      { id: 'deploy', label: 'Deploy', desc: 'Vercel 프리뷰 배포', deps: ['build'], required: false },
    ]

    const [enabled, setEnabled] = useState<Set<StepId>>(
      new Set(['lint', 'type_check', 'build'])
    )

    const toggle = (id: StepId, required: boolean) => {
      if (required) return
      setEnabled((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    return (
      <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>파이프라인 단계 설정</div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>각 단계를 활성화하여 CI/CD 워크플로를 구성하세요.</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STEPS.map((step) => {
            const depsOk = step.deps.every((d) => enabled.has(d))
            const isActive = enabled.has(step.id) && depsOk

            return (
              <div
                key={step.id}
                onClick={() => !step.required && depsOk && toggle(step.id, step.required)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  borderRadius: 10, cursor: step.required || !depsOk ? 'not-allowed' : 'pointer',
                  border: `1.5px solid ${isActive ? '#6366f1' : '#e2e8f0'}`,
                  background: isActive ? '#f0f0ff' : '#fff',
                  opacity: !depsOk && !step.required ? 0.5 : 1,
                  transition: 'all 0.15s',
                }}
              >
                <BoxedCheckbox
                  checked={isActive}
                  disabled={step.required || !depsOk}
                  onChange={() => toggle(step.id, step.required)}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{step.label}</span>
                    {step.required && (
                      <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', fontWeight: 700 }}>필수</span>
                    )}
                    {!depsOk && !step.required && (
                      <span style={{ fontSize: 10, color: '#f59e0b' }}>의존성 미충족</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{step.desc}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? '#6366f1' : '#cbd5e1' }}>
                  {isActive ? '활성' : '비활성'}
                </span>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b' }}>
          {enabled.size}개 단계 활성화 · 예상 소요: {enabled.size * 90}초
        </div>
      </div>
    )
  },
}
