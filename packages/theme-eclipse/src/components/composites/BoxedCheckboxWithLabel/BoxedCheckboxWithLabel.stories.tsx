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

/* ── Vercel Design: 컴팩트 환경 변수 선택 ── */
const EnvVarScopeDemo = () => {
  const [scopes, setScopes] = useState<Set<string>>(new Set(['production', 'preview']))

  const envScopes = [
    { value: 'production', label: 'Production', desc: 'prod 브랜치 배포에 적용', color: '#16a34a' },
    { value: 'preview', label: 'Preview', desc: '모든 브랜치 미리보기에 적용', color: '#6366f1' },
    { value: 'development', label: 'Development', desc: '로컬 dev 환경에만 적용', color: '#f59e0b' },
  ]

  const toggle = (v: string) =>
    setScopes((prev) => {
      const next = new Set(prev)
      if (next.has(v)) next.delete(v)
      else next.add(v)
      return next
    })

  return (
    <div style={{ maxWidth: 380 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>환경 범위</div>
      <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 10 }}>이 환경 변수가 적용될 환경을 선택하세요.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, overflow: 'hidden' }}>
        {envScopes.map((s, i) => (
          <div
            key={s.value}
            onClick={() => toggle(s.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderBottom: i < envScopes.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none',
              background: scopes.has(s.value) ? `${s.color}08` : 'var(--sem-eclipse-color-backgroundPrimary)',
              cursor: 'pointer',
              transition: 'background 0.12s',
            }}
          >
            <BoxedCheckboxWithLabel value={s.value} checked={scopes.has(s.value)} onChange={() => toggle(s.value)} alignItems="center" />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: s.color }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 1 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
        선택됨: {scopes.size === 0 ? '없음' : Array.from(scopes).join(', ')}
      </div>
    </div>
  )
}

export const Vercel_환경_변수_범위_선택: Story = {
  name: 'Vercel — 환경 변수 범위 선택',
  render: () => <EnvVarScopeDemo />,
}

/* ── Vercel Design: 빌드 최적화 옵션 ── */
const BuildOptimizeDemo = () => {
  const [opts, setOpts] = useState<Set<string>>(new Set(['minify', 'treeshake']))

  const options = [
    { value: 'minify', label: 'Minify', desc: 'JS/CSS 압축으로 번들 크기 최소화', impact: '~30%' },
    { value: 'treeshake', label: 'Tree Shaking', desc: '미사용 코드 제거', impact: '~20%' },
    { value: 'compress', label: 'Gzip 압축', desc: '서버 전송 압축 활성화', impact: '~60%' },
    { value: 'cache', label: '빌드 캐시', desc: '이전 빌드 결과물 재사용', impact: '속도' },
    { value: 'sourcemap', label: 'Source Map', desc: '디버깅용 소스맵 생성 (배포 크기 증가)', impact: '+맵' },
  ]

  const toggle = (v: string) =>
    setOpts((prev) => {
      const next = new Set(prev)
      if (next.has(v)) next.delete(v)
      else next.add(v)
      return next
    })

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 12 }}>빌드 최적화 (Vercel 컴팩트 체크 패턴)</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => toggle(opt.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 6,
              border: `1px solid ${opts.has(opt.value) ? 'var(--sem-eclipse-color-fillPrimary)' : 'var(--sem-eclipse-color-borderSubtle)'}`,
              background: opts.has(opt.value) ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 5%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
              cursor: 'pointer',
              transition: 'border-color 0.12s, background 0.12s',
            }}
          >
            <BoxedCheckboxWithLabel value={opt.value} checked={opts.has(opt.value)} onChange={() => toggle(opt.value)} alignItems="center" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{opt.label}</span>
              <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginLeft: 8 }}>{opt.desc}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{opt.impact}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', display: 'flex', justifyContent: 'space-between' }}>
        <span>활성화: {opts.size}개 옵션</span>
        <button onClick={() => setOpts(new Set(['minify', 'treeshake', 'compress', 'cache']))} style={{ fontSize: 11, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>권장 설정</button>
      </div>
    </div>
  )
}

export const Vercel_빌드_최적화_옵션: Story = {
  name: 'Vercel — 빌드 최적화 옵션',
  render: () => <BuildOptimizeDemo />,
}

/* ── Vercel Design: 모노크롬 배포 채널 선택 ── */
const DeployChannelDemo = () => {
  const [channels, setChannels] = useState<Set<string>>(new Set(['github']))

  const channelGroups = [
    {
      group: 'Git 연동',
      items: [
        { value: 'github', label: 'GitHub', desc: 'main/master 푸시 시 자동 배포' },
        { value: 'gitlab', label: 'GitLab', desc: 'CI/CD 파이프라인 연동' },
        { value: 'bitbucket', label: 'Bitbucket', desc: 'Pipelines 통합 배포' },
      ],
    },
    {
      group: '알림',
      items: [
        { value: 'slack', label: 'Slack 알림', desc: '배포 성공/실패 Slack 채널 알림' },
        { value: 'webhook', label: 'Webhook', desc: 'HTTP POST로 외부 서비스 연동' },
      ],
    },
  ]

  const toggle = (v: string) =>
    setChannels((prev) => {
      const next = new Set(prev)
      if (next.has(v)) next.delete(v)
      else next.add(v)
      return next
    })

  return (
    <div style={{ maxWidth: 380 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 12 }}>배포 채널 (Vercel 모노크롬 그룹 체크 패턴)</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {channelGroups.map((grp) => (
          <div key={grp.group}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{grp.group}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 8, overflow: 'hidden' }}>
              {grp.items.map((item, i) => (
                <div
                  key={item.value}
                  onClick={() => toggle(item.value)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 12px',
                    borderBottom: i < grp.items.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none',
                    background: 'var(--sem-eclipse-color-backgroundPrimary)',
                    cursor: 'pointer',
                  }}
                >
                  <BoxedCheckboxWithLabel value={item.value} checked={channels.has(item.value)} onChange={() => toggle(item.value)} alignItems="center" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Vercel_배포_채널_선택: Story = {
  name: 'Vercel — 배포 채널 선택 (그룹 체크)',
  render: () => <DeployChannelDemo />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: Checkbox.Group 기능 선택 그리드
   Mantine의 Checkbox.Group — 관련 기능 옵션을 카드 그리드로 선택하는 패턴
-------------------------------------------------------------------------- */
const MANTINE_FEATURES = [
  { value: 'analytics', label: '고급 분석', desc: '데이터 인사이트 및 리포트', icon: '📊' },
  { value: 'collab', label: '실시간 협업', desc: '팀 동시 편집 지원', icon: '👥' },
  { value: 'api', label: 'API 접근', desc: 'REST/GraphQL 연동', icon: '🔌' },
  { value: 'export', label: '내보내기', desc: 'CSV/PDF/Excel 출력', icon: '📤' },
  { value: 'sso', label: 'SSO 인증', desc: 'SAML·OIDC 지원', icon: '🔐' },
  { value: 'audit', label: '감사 로그', desc: '활동 기록 90일 보관', icon: '📋' },
]

function MantineFeatureGridDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['analytics']))

  const toggle = (v: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(v)) next.delete(v)
      else next.add(v)
      return next
    })

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>추가 기능 선택</div>
      <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>
        {selected.size > 0 ? `${selected.size}개 선택됨` : '기능을 선택하세요'}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {MANTINE_FEATURES.map((f) => {
          const isSelected = selected.has(f.value)
          return (
            <div
              key={f.value}
              onClick={() => toggle(f.value)}
              style={{
                padding: '14px',
                borderRadius: 10,
                border: `2px solid ${isSelected ? '#6366f1' : 'var(--sem-eclipse-color-borderDefault)'}`,
                background: isSelected ? 'rgba(99,102,241,0.04)' : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'all 0.12s',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                <BoxedCheckboxWithLabel
                  value={f.value}
                  checked={isSelected}
                  onChange={() => toggle(f.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{f.label}</div>
                <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 2 }}>{f.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
      {selected.size > 0 && (
        <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 8, background: 'rgba(99,102,241,0.08)', border: '1.5px solid rgba(99,102,241,0.2)', fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
          선택: {Array.from(selected).map((v) => MANTINE_FEATURES.find((f) => f.value === v)?.label).join(', ')}
        </div>
      )}
    </div>
  )
}

export const Mantine_기능_선택_카드_그리드: Story = {
  name: 'Mantine — Checkbox.Group 기능 선택 카드 그리드',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Checkbox.Group 패턴. 기능 옵션을 카드 그리드로 표시하고 BoxedCheckboxWithLabel로 선택 상태를 관리합니다. ' +
          '카드 전체 클릭으로 선택/해제가 가능합니다.',
      },
    },
  },
  render: () => <MantineFeatureGridDemo />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 조건부 추가 옵션 표시
   Mantine의 Checkbox + Collapse 패턴 — 체크 시 하위 설정 펼치기
-------------------------------------------------------------------------- */
function MantineConditionalOptionsDemo() {
  const [backupEnabled, setBackupEnabled] = useState(false)
  const [notifyEnabled, setNotifyEnabled] = useState(false)
  const [backupOptions, setBackupOptions] = useState<Set<string>>(new Set())
  const [notifyChannels, setNotifyChannels] = useState<Set<string>>(new Set())

  const toggleSet = (set: Set<string>, setter: (s: Set<string>) => void, v: string) => {
    const next = new Set(set)
    if (next.has(v)) next.delete(v)
    else next.add(v)
    setter(next)
  }

  return (
    <div style={{ maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>
        고급 설정
      </div>

      {/* 백업 설정 */}
      <div style={{ border: '1.5px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--sem-eclipse-color-backgroundPrimary)', cursor: 'pointer' }} onClick={() => setBackupEnabled((v) => !v)}>
          <BoxedCheckboxWithLabel value="backup" checked={backupEnabled} onChange={(c) => setBackupEnabled(c)} onClick={(e) => e.stopPropagation()} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>자동 백업 활성화</div>
            <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>활성화하면 백업 주기를 설정할 수 있습니다</div>
          </div>
        </div>
        {backupEnabled && (
          <div style={{ padding: '10px 14px 14px', borderTop: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-backgroundSecondary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>백업 주기</div>
            {['매일', '매주', '매월'].map((opt) => (
              <div key={opt} onClick={() => toggleSet(backupOptions, setBackupOptions, opt)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <BoxedCheckboxWithLabel value={opt} checked={backupOptions.has(opt)} onChange={() => toggleSet(backupOptions, setBackupOptions, opt)} onClick={(e) => e.stopPropagation()} />
                <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{opt}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 알림 설정 */}
      <div style={{ border: '1.5px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--sem-eclipse-color-backgroundPrimary)', cursor: 'pointer' }} onClick={() => setNotifyEnabled((v) => !v)}>
          <BoxedCheckboxWithLabel value="notify" checked={notifyEnabled} onChange={(c) => setNotifyEnabled(c)} onClick={(e) => e.stopPropagation()} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>알림 채널 설정</div>
            <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>알림받을 채널을 선택합니다</div>
          </div>
        </div>
        {notifyEnabled && (
          <div style={{ padding: '10px 14px 14px', borderTop: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-backgroundSecondary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>채널</div>
            {['이메일', 'Slack', 'SMS'].map((ch) => (
              <div key={ch} onClick={() => toggleSet(notifyChannels, setNotifyChannels, ch)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <BoxedCheckboxWithLabel value={ch} checked={notifyChannels.has(ch)} onChange={() => toggleSet(notifyChannels, setNotifyChannels, ch)} onClick={(e) => e.stopPropagation()} />
                <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{ch}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const Mantine_조건부_하위_옵션_표시: Story = {
  name: 'Mantine — Checkbox + Collapse 조건부 하위 옵션',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Checkbox + Collapse 패턴. 체크박스를 선택하면 하위 추가 설정이 펼쳐집니다. ' +
          '백업 주기와 알림 채널 두 그룹으로 구성됩니다.',
      },
    },
  },
  render: () => <MantineConditionalOptionsDemo />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 팀 역할별 권한 설정 매트릭스
   Mantine의 Table + Checkbox 패턴 — 역할×권한 이중 축 체크박스 매트릭스
-------------------------------------------------------------------------- */
const MANTINE_ROLES = ['뷰어', '편집자', '관리자'] as const
const MANTINE_PERMS = [
  { id: 'read', label: '읽기' },
  { id: 'write', label: '쓰기' },
  { id: 'delete', label: '삭제' },
  { id: 'export', label: '내보내기' },
  { id: 'manage', label: '권한 관리' },
]

type MantineRole = typeof MANTINE_ROLES[number]

const DEFAULT_MATRIX: Record<MantineRole, Set<string>> = {
  '뷰어': new Set(['read']),
  '편집자': new Set(['read', 'write', 'export']),
  '관리자': new Set(['read', 'write', 'delete', 'export', 'manage']),
}

function MantinePermissionMatrixDemo() {
  const [matrix, setMatrix] = useState<Record<MantineRole, Set<string>>>(DEFAULT_MATRIX)

  const toggle = (role: MantineRole, perm: string) => {
    setMatrix((prev) => {
      const next = new Set(prev[role])
      if (next.has(perm)) next.delete(perm)
      else next.add(perm)
      return { ...prev, [role]: next }
    })
  }

  return (
    <div style={{ maxWidth: 460 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 16 }}>역할별 권한 설정</div>
      <div style={{ borderRadius: 10, border: '1.5px solid var(--sem-eclipse-color-borderDefault)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sem-eclipse-color-backgroundSecondary)' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', borderBottom: '1.5px solid var(--sem-eclipse-color-borderDefault)' }}>권한</th>
              {MANTINE_ROLES.map((role) => (
                <th key={role} style={{ padding: '10px 14px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundSecondary)', borderBottom: '1.5px solid var(--sem-eclipse-color-borderDefault)' }}>{role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MANTINE_PERMS.map((perm, i) => (
              <tr key={perm.id} style={{ borderBottom: i < MANTINE_PERMS.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none' }}>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)', fontWeight: 500 }}>{perm.label}</td>
                {MANTINE_ROLES.map((role) => (
                  <td key={role} style={{ padding: '10px 14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <BoxedCheckboxWithLabel
                        value={perm.id}
                        checked={matrix[role].has(perm.id)}
                        onChange={() => toggle(role, perm.id)}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
        관리자: {matrix['관리자'].size}개 · 편집자: {matrix['편집자'].size}개 · 뷰어: {matrix['뷰어'].size}개 권한
      </div>
    </div>
  )
}

export const Mantine_권한_매트릭스: Story = {
  name: 'Mantine — Table + Checkbox 역할별 권한 매트릭스',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine Table + Checkbox 패턴. 역할(행) × 권한(열) 이중 축 매트릭스로 권한을 설정합니다. ' +
          '관리자/편집자/뷰어 세 역할의 권한을 독립적으로 체크할 수 있습니다.',
      },
    },
  },
  render: () => <MantinePermissionMatrixDemo />,
}
