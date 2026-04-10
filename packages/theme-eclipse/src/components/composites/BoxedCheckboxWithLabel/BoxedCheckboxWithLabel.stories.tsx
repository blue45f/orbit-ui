import { Flex } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { BoxedCheckboxWithLabel } from './BoxedCheckboxWithLabel'

BoxedCheckboxWithLabel.displayName = 'BoxedCheckboxWithLabel'

const meta = {
  title: 'eclipse/Inputs/Selection/BoxedCheckboxWithLabel',
  component: BoxedCheckboxWithLabel,
  args: {
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof BoxedCheckboxWithLabel>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => {
    return (
      <Flex rowGap="25px" flexDirection={'column'}>
        <BoxedCheckboxWithLabel {...args} value="blue" alignItems="center">
          인디고
        </BoxedCheckboxWithLabel>
        <BoxedCheckboxWithLabel {...args} value="foundation" disabled>
          파운데이션
        </BoxedCheckboxWithLabel>
        <BoxedCheckboxWithLabel {...args} value="primary">
          에메랄드
        </BoxedCheckboxWithLabel>
      </Flex>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    disabledAll: false,
    disabledSecond: false,
    flexDirection: 'column',
    rowGap: '25px',
    columnGap: '25px',
    labelText: '파운데이션',
  },
  argTypes: {
    disabled: {
      control: 'never',
    },
    flexDirection: {
      control: 'select',
      options: ['row', 'column'],
      description: '체크박스 배치 방식',
    },
    rowGap: {
      control: 'text',
      description: '체크박스 간격',
    },
    columnGap: {
      control: 'text',
      description: '체크박스 간격',
    },
    labelText: {
      control: 'text',
      description: '두 번째 체크박스 라벨 텍스트',
    },
    disabledAll: {
      control: 'boolean',
      description: '전체 비활성화 여부',
    },
    disabledSecond: {
      control: 'boolean',
      description: '두 번째 체크박스 비활성화 여부',
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <>
      <div style={{ marginBottom: '25px' }}>첫 번째 체크박스는 라벨이 없어요</div>
      <Flex rowGap={args.rowGap} columnGap={args.columnGap} flexDirection={args.flexDirection}>
        <Flex columnGap="10px">
          <BoxedCheckboxWithLabel {...args} value="blue" />
        </Flex>
        <Flex columnGap="10px">
          <BoxedCheckboxWithLabel
            {...args}
            value="foundation"
            disabled={args.disabledSecond}
            labelText={args.labelText}
          >
            파운데이션
          </BoxedCheckboxWithLabel>
        </Flex>
        <Flex columnGap="10px">
          <BoxedCheckboxWithLabel {...args} value="primary">
            에메랄드
          </BoxedCheckboxWithLabel>
        </Flex>
      </Flex>
    </>
  ),
}

/* ── shadcn/ui: 플랜 기능 선택 (카드형 다중 선택) ── */
const PlanFeatureDemo = () => {
  type Feature = 'analytics' | 'api' | 'sso' | 'audit' | 'support'
  const [selected, setSelected] = useState<Set<Feature>>(new Set(['analytics']))

  const toggle = (key: Feature) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      return next
    })

  const features: { key: Feature; label: string; desc: string; price: string }[] = [
    { key: 'analytics', label: 'Advanced Analytics', desc: '상세 사용량 지표와 팀 리포트', price: '+₩9,900/월' },
    { key: 'api', label: 'API Access', desc: 'REST API + Webhook 완전 지원', price: '+₩19,900/월' },
    { key: 'sso', label: 'SSO 통합', desc: 'SAML 2.0, Google Workspace 연동', price: '+₩29,900/월' },
    { key: 'audit', label: 'Audit Log', desc: '전체 활동 로그 90일 보관', price: '+₩9,900/월' },
    { key: 'support', label: '전담 지원', desc: '평일 4시간 이내 응답 SLA', price: '+₩49,900/월' },
  ]

  const total = selected.size * 9900

  return (
    <div style={{ maxWidth: 440 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>추가 기능 선택</div>
        <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>필요한 기능만 선택해 비용을 최적화하세요.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {features.map((feat) => {
          const isOn = selected.has(feat.key)
          return (
            <div
              key={feat.key}
              onClick={() => toggle(feat.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 8,
                border: `1.5px solid ${isOn ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: isOn ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 6%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background 0.15s ease',
              }}
            >
              <BoxedCheckboxWithLabel
                value={feat.key}
                checked={isOn}
                onChange={() => toggle(feat.key)}
                alignItems="center"
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{feat.label}</div>
                <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{feat.desc}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: isOn ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-foregroundQuaternary)', whiteSpace: 'nowrap' }}>{feat.price}</span>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 8, background: 'var(--sem-eclipse-color-backgroundSecondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>{selected.size}개 선택됨</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>추가 {total.toLocaleString()}원/월</span>
      </div>
    </div>
  )
}

export const Shadcn_플랜_기능_선택: Story = {
  name: 'shadcn — 플랜 기능 선택 (카드형)',
  render: () => <PlanFeatureDemo />,
}

/* ── shadcn/ui: 권한 설정 그룹 ── */
const PermissionsDemo = () => {
  type Perm = 'read' | 'write' | 'delete' | 'admin' | 'export'
  const ROLES: { label: string; default: Perm[] }[] = [
    { label: '뷰어', default: ['read'] },
    { label: '편집자', default: ['read', 'write'] },
    { label: '관리자', default: ['read', 'write', 'delete', 'export', 'admin'] },
  ]
  const PERMS: { key: Perm; label: string; desc: string }[] = [
    { key: 'read', label: '읽기', desc: '데이터 조회' },
    { key: 'write', label: '쓰기', desc: '데이터 생성 및 수정' },
    { key: 'delete', label: '삭제', desc: '데이터 영구 제거' },
    { key: 'export', label: '내보내기', desc: 'CSV/Excel 다운로드' },
    { key: 'admin', label: '관리자', desc: '팀 멤버 초대 및 설정' },
  ]
  const [role, setRole] = useState<string>('편집자')
  const [perms, setPerms] = useState<Set<Perm>>(new Set(['read', 'write']))

  const applyRole = (label: string) => {
    setRole(label)
    const found = ROLES.find((r) => r.label === label)
    setPerms(new Set(found?.default ?? []))
  }
  const toggle = (key: Perm) =>
    setPerms((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      setRole('커스텀')
      return next
    })

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 10 }}>권한 설정</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {ROLES.map((r) => (
            <button
              key={r.label}
              onClick={() => applyRole(r.label)}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                border: `1px solid ${role === r.label ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: role === r.label ? 'var(--sem-eclipse-color-fillPrimary)' : 'transparent',
                color: role === r.label ? 'var(--sem-eclipse-color-backgroundPrimary)' : 'var(--sem-eclipse-color-foregroundSecondary)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {r.label}
            </button>
          ))}
          {role === '커스텀' && (
            <span style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid var(--sem-eclipse-color-fillPrimary)', background: 'var(--sem-eclipse-color-fillPrimary)', color: 'var(--sem-eclipse-color-backgroundPrimary)', fontSize: 12, fontWeight: 600 }}>커스텀</span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--sem-eclipse-color-borderSubtle)', borderRadius: 8, overflow: 'hidden' }}>
        {PERMS.map((p, i) => (
          <div
            key={p.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderBottom: i < PERMS.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none',
              background: perms.has(p.key) ? 'var(--sem-eclipse-color-backgroundSecondary)' : 'var(--sem-eclipse-color-backgroundPrimary)',
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{p.label}</div>
              <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{p.desc}</div>
            </div>
            <BoxedCheckboxWithLabel
              value={p.key}
              checked={perms.has(p.key)}
              onChange={() => toggle(p.key)}
              alignItems="center"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export const Shadcn_권한_설정: Story = {
  name: 'shadcn — 권한 설정 그룹',
  render: () => <PermissionsDemo />,
}
