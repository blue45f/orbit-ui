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

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 제어/비제어 이중 API 패턴
   Radix의 defaultChecked(비제어) + checked/onCheckedChange(제어) 이중 지원 패턴.
   동일 컴포넌트가 제어/비제어 모드로 사이드 바이 사이드 렌더링됩니다.
-------------------------------------------------------------------------- */
const RadixDualApiDemo = () => {
  const [controlled, setControlled] = useState<Set<string>>(new Set(['design']))

  const features = [
    { key: 'design', label: '디자인 토큰', desc: '3단계 시맨틱 토큰 시스템' },
    { key: 'a11y', label: '접근성', desc: 'WAI-ARIA 완전 준수' },
    { key: 'dark', label: '다크모드', desc: '시스템 테마 자동 감지' },
  ]

  return (
    <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
        Radix 이중 API 패턴: 제어 vs 비제어
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* 비제어 (Uncontrolled) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            비제어 (defaultChecked)
          </div>
          <div style={{ fontSize: 10, fontFamily: 'monospace', padding: '6px 8px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
            {`<BoxedCheckbox defaultChecked />`}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {features.map((f) => (
              <BoxedCheckboxWithLabel key={f.key} value={f.key} defaultChecked={f.key === 'design'} alignItems="center">
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{f.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{f.desc}</div>
                </div>
              </BoxedCheckboxWithLabel>
            ))}
          </div>
          <div style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundQuaternary)' }}>
            내부 상태 → 외부 참조 불필요
          </div>
        </div>

        {/* 제어 (Controlled) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            제어 (checked + onChange)
          </div>
          <div style={{ fontSize: 10, fontFamily: 'monospace', padding: '6px 8px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
            {`<BoxedCheckbox checked={state} onChange={...} />`}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {features.map((f) => (
              <BoxedCheckboxWithLabel
                key={f.key}
                value={f.key}
                checked={controlled.has(f.key)}
                onChange={() =>
                  setControlled((prev) => {
                    const next = new Set(prev)
                    if (next.has(f.key)) { next.delete(f.key) } else { next.add(f.key) }
                    return next
                  })
                }
                alignItems="center"
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{f.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{f.desc}</div>
                </div>
              </BoxedCheckboxWithLabel>
            ))}
          </div>
          <div style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundQuaternary)' }}>
            선택됨: {[...controlled].join(', ') || '없음'}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Radix_제어_비제어_이중_API: Story = {
  name: 'Radix UI — 제어/비제어 이중 API 패턴 (defaultChecked vs controlled)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI의 defaultChecked(비제어)와 checked+onChange(제어) 이중 API 패턴. ' +
          '동일 컴포넌트가 두 모드로 렌더링됩니다. 비제어는 내부 상태로 동작하고, ' +
          '제어는 외부 상태와 동기화됩니다.',
      },
    },
  },
  render: () => <RadixDualApiDemo />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 데이터 속성(data-state) 기반 접근성 패턴
   Radix는 data-state="checked|unchecked", data-disabled, data-highlighted 등
   데이터 속성으로 상태를 표현해 CSS 선택자와 스크린리더 모두 지원합니다.
-------------------------------------------------------------------------- */
const RadixDataStateDemo = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const ROLES: { key: string; label: string; scope: string; ariaDesc: string }[] = [
    { key: 'admin', label: 'Admin', scope: '전체 접근', ariaDesc: '모든 리소스에 접근하고 수정할 수 있습니다' },
    { key: 'editor', label: 'Editor', scope: '콘텐츠 편집', ariaDesc: '콘텐츠를 생성하고 편집할 수 있습니다' },
    { key: 'viewer', label: 'Viewer', scope: '읽기 전용', ariaDesc: '콘텐츠를 읽을 수만 있습니다' },
    { key: 'billing', label: 'Billing', scope: '결제 관리', ariaDesc: '결제 정보를 관리할 수 있습니다' },
  ]

  const toggle = (key: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      return next
    })

  return (
    <div style={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>팀 멤버 역할 선택</div>
        <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
          {'Radix data-state 기반 접근성 패턴 — aria-checked, role="checkbox"'}
        </div>
      </div>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontSize: 11, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 8 }}>
          {'역할 (role="group" aria-label="역할 선택")'}
        </legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} role="group" aria-label="역할 선택">
          {ROLES.map((role) => {
            const isChecked = selected.has(role.key)
            return (
              <div
                key={role.key}
                data-state={isChecked ? 'checked' : 'unchecked'}
                aria-checked={isChecked}
                role="checkbox"
                tabIndex={0}
                onClick={() => toggle(role.key)}
                onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(role.key) } }}
                style={{ cursor: 'pointer' }}
              >
                <BoxedCheckboxWithLabel
                  value={role.key}
                  checked={isChecked}
                  onChange={() => toggle(role.key)}
                  alignItems="center"
                  aria-describedby={`desc-${role.key}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{role.label}</span>
                      <span id={`desc-${role.key}`} style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginLeft: 8 }}>{role.ariaDesc}</span>
                    </div>
                    <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)', fontWeight: 600, marginLeft: 8, whiteSpace: 'nowrap' }}>
                      {role.scope}
                    </span>
                  </div>
                </BoxedCheckboxWithLabel>
              </div>
            )
          })}
        </div>
      </fieldset>

      <div style={{ padding: '8px 12px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
        <span style={{ fontWeight: 600 }}>선택된 역할:</span>{' '}
        {selected.size > 0 ? ROLES.filter((r) => selected.has(r.key)).map((r) => r.label).join(', ') : '없음'}
      </div>

      <div style={{ fontSize: 10, fontFamily: 'monospace', padding: '8px 10px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundQuaternary)', lineHeight: 1.8 }}>
        {`data-state="${selected.size > 0 ? 'checked' : 'unchecked'}" // Radix 패턴`}<br />
        {`aria-checked={${selected.size > 0}} // 스크린리더 지원`}<br />
        {`role="group" aria-label="역할 선택" // 그룹 접근성`}
      </div>
    </div>
  )
}

export const Radix_data_state_접근성_패턴: Story = {
  name: 'Radix UI — data-state 기반 접근성 패턴 (aria-checked, role, fieldset)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI의 data-state="checked|unchecked" 패턴. aria-checked, role="checkbox", ' +
          'aria-describedby로 스크린리더를 완전히 지원합니다. ' +
          'fieldset/legend로 그룹 컨텍스트를 제공하고, 키보드(Space/Enter) 인터랙션을 지원합니다.',
      },
    },
  },
  render: () => <RadixDataStateDemo />,
}

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 조합(Compound) 패턴 — 요금제 선택
   Radix의 Root/Item/Indicator 조합 패턴에 대응하는
   BoxedCheckboxWithLabel 기반 플랜 비교 + 기능 매트릭스 UI
-------------------------------------------------------------------------- */
const RadixCompoundPricingDemo = () => {
  const [plan, setPlan] = useState<'starter' | 'pro' | 'enterprise'>('pro')

  const PLANS = [
    {
      key: 'starter' as const,
      label: 'Starter',
      price: '무료',
      features: ['컴포넌트 50개', '프로젝트 1개', '커뮤니티 지원'],
      color: '#94a3b8',
    },
    {
      key: 'pro' as const,
      label: 'Pro',
      price: '₩29,000/월',
      features: ['컴포넌트 전체', '프로젝트 무제한', '우선 지원', '다크모드 토큰'],
      color: '#6366f1',
      recommended: true,
    },
    {
      key: 'enterprise' as const,
      label: 'Enterprise',
      price: '문의',
      features: ['커스텀 토큰', 'SSO', '전담 지원', 'SLA 보장', '소스 접근'],
      color: '#0f172a',
    },
  ]

  const ALL_FEATURES = ['컴포넌트 50개', '컴포넌트 전체', '프로젝트 1개', '프로젝트 무제한', '커뮤니티 지원', '우선 지원', '다크모드 토큰', '커스텀 토큰', 'SSO', '전담 지원', 'SLA 보장', '소스 접근']
  const selectedPlan = PLANS.find((p) => p.key === plan)!

  return (
    <div style={{ maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>요금제 선택</div>

      {/* 요금제 카드 그룹 — Radix RadioGroup.Root 패턴 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }} role="radiogroup" aria-label="요금제 선택">
        {PLANS.map((p) => (
          <div
            key={p.key}
            onClick={() => setPlan(p.key)}
            style={{
              position: 'relative',
              borderRadius: 10,
              border: `2px solid ${plan === p.key ? p.color : 'var(--sem-eclipse-color-borderSubtle)'}`,
              padding: '12px 12px 10px',
              background: plan === p.key ? `${p.color}08` : 'var(--sem-eclipse-color-backgroundPrimary)',
              cursor: 'pointer',
              transition: 'border-color 0.15s, background 0.15s',
            }}
            role="radio"
            aria-checked={plan === p.key}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setPlan(p.key) } }}
          >
            {p.recommended && (
              <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, padding: '1px 8px', borderRadius: 10, background: p.color, color: '#fff', whiteSpace: 'nowrap' }}>
                권장
              </div>
            )}
            <BoxedCheckboxWithLabel
              value={p.key}
              checked={plan === p.key}
              onChange={() => setPlan(p.key)}
              alignItems="center"
            />
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{p.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: p.color, marginTop: 2 }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 기능 매트릭스 */}
      <div style={{ borderRadius: 8, border: '1px solid var(--sem-eclipse-color-borderSubtle)', overflow: 'hidden' }}>
        <div style={{ padding: '8px 12px', background: 'var(--sem-eclipse-color-backgroundSecondary)', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
          {selectedPlan.label} 플랜 포함 기능
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {ALL_FEATURES.map((feat, i) => {
            const included = selectedPlan.features.includes(feat)
            return (
              <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderBottom: i < ALL_FEATURES.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none', background: included ? 'var(--sem-eclipse-color-backgroundPrimary)' : 'var(--sem-eclipse-color-backgroundSecondary)' }}>
                <span style={{ fontSize: 12, color: included ? '#10b981' : 'var(--sem-eclipse-color-foregroundQuaternary)', fontWeight: 700, minWidth: 14 }}>{included ? '✓' : '—'}</span>
                <span style={{ fontSize: 12, color: included ? 'var(--sem-eclipse-color-foregroundPrimary)' : 'var(--sem-eclipse-color-foregroundQuaternary)', textDecoration: included ? 'none' : 'line-through' }}>{feat}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const Radix_조합_요금제_선택: Story = {
  name: 'Radix UI — 조합 패턴 요금제 선택 (RadioGroup.Root/Item 대응)',
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI의 RadioGroup.Root/Item/Indicator 조합 패턴을 BoxedCheckboxWithLabel로 구현. ' +
          'role="radiogroup", aria-checked, 키보드 내비게이션으로 완전한 접근성을 갖추고, ' +
          '선택된 플랜에 따라 기능 매트릭스가 동적으로 업데이트됩니다.',
      },
    },
  },
  render: () => <RadixCompoundPricingDemo />,
}
