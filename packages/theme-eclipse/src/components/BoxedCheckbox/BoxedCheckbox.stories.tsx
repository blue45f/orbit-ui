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
