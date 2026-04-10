import { Flex } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { CheckboxWithLabel } from './CheckboxWithLabel'

CheckboxWithLabel.displayName = 'CheckboxWithLabel'

const meta = {
  title: 'eclipse/Inputs/Selection/CheckboxWithLabel',
  component: CheckboxWithLabel,
  args: {
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof CheckboxWithLabel>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => {
    return (
      <Flex rowGap="25px" flexDirection={'column'}>
        <CheckboxWithLabel {...args} value="blue" alignItems="center">
          인디고
        </CheckboxWithLabel>
        <CheckboxWithLabel {...args} value="foundation" disabled>
          파운데이션
        </CheckboxWithLabel>
        <CheckboxWithLabel {...args} value="primary">
          에메랄드
        </CheckboxWithLabel>
      </Flex>
    )
  },
} satisfies Story

/* ── shadcn/ui: 설명 있는 알림 설정 그룹 ── */
const NotificationGroupDemo = () => {
  type NotifKey = 'email' | 'push' | 'sms' | 'digest'
  const [checked, setChecked] = useState<Set<NotifKey>>(new Set(['email', 'push']))

  const toggle = (key: NotifKey) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      return next
    })

  const items: { key: NotifKey; label: string; desc: string }[] = [
    { key: 'email', label: '이메일 알림', desc: '새 댓글, 멘션, 워크스페이스 업데이트를 이메일로 받아요.' },
    { key: 'push', label: '푸시 알림', desc: '중요 이벤트 발생 시 즉시 브라우저 알림을 받아요.' },
    { key: 'sms', label: 'SMS 알림', desc: '보안 인증 코드 및 긴급 공지를 문자로 받아요.' },
    { key: 'digest', label: '주간 다이제스트', desc: '이번 주 활동 요약을 매주 월요일 아침 받아요.', },
  ]

  return (
    <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>알림 환경설정</div>
        <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>받고 싶은 알림 채널을 선택하세요.</div>
      </div>
      {items.map((item, i) => (
        <div
          key={item.key}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            padding: '14px 16px',
            borderRadius: i === 0 ? '8px 8px 0 0' : i === items.length - 1 ? '0 0 8px 8px' : '0',
            border: '1px solid var(--sem-eclipse-color-borderSubtle)',
            borderTop: i === 0 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none',
            background: checked.has(item.key) ? 'var(--sem-eclipse-color-backgroundSecondary)' : 'var(--sem-eclipse-color-backgroundPrimary)',
            cursor: 'pointer',
            transition: 'background 0.15s ease',
          }}
          onClick={() => toggle(item.key)}
        >
          <div style={{ paddingTop: 2 }}>
            <CheckboxWithLabel
              value={item.key}
              checked={checked.has(item.key)}
              onChange={() => toggle(item.key)}
              alignItems="center"
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 2 }}>{item.label}</div>
            <div style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundTertiary)', lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const Shadcn_설명있는_알림_설정: Story = {
  name: 'shadcn — 설명 있는 알림 설정 그룹',
  render: () => <NotificationGroupDemo />,
}

/* ── shadcn/ui: 전체 선택 + indeterminate 패턴 ── */
const SelectAllDemo = () => {
  const ITEMS = ['TypeScript 5.7 업그레이드', 'Storybook 8 마이그레이션', 'vanilla-extract 최적화', 'TipTap 에디터 통합', 'Dark mode 전환'] as const
  type Item = (typeof ITEMS)[number]
  const [selected, setSelected] = useState<Set<Item>>(new Set())

  const allChecked = selected.size === ITEMS.length
  const someChecked = selected.size > 0 && !allChecked

  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(ITEMS))
  const toggle = (item: Item) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(item)) { next.delete(item) } else { next.add(item) }
      return next
    })

  return (
    <div style={{ maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '8px 8px 0 0',
          border: '1px solid var(--sem-eclipse-color-borderDefault)',
          background: 'var(--sem-eclipse-color-backgroundSecondary)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <CheckboxWithLabel
          value="all"
          checked={allChecked}
          data-indeterminate={someChecked}
          onChange={toggleAll}
          alignItems="center"
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>
            전체 선택 ({selected.size}/{ITEMS.length})
          </span>
        </CheckboxWithLabel>
      </div>
      {ITEMS.map((item, i) => (
        <div
          key={item}
          style={{
            padding: '10px 16px 10px 32px',
            border: '1px solid var(--sem-eclipse-color-borderSubtle)',
            borderTop: 'none',
            borderRadius: i === ITEMS.length - 1 ? '0 0 8px 8px' : '0',
            background: selected.has(item) ? 'color-mix(in srgb, var(--sem-eclipse-color-fillPrimary) 5%, var(--sem-eclipse-color-backgroundPrimary))' : 'var(--sem-eclipse-color-backgroundPrimary)',
          }}
        >
          <CheckboxWithLabel
            value={item}
            checked={selected.has(item)}
            onChange={() => toggle(item)}
            alignItems="center"
            fullWidth
          >
            <span style={{ fontSize: 14, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{item}</span>
          </CheckboxWithLabel>
        </div>
      ))}
      {selected.size > 0 && (
        <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 6, background: 'var(--sem-eclipse-color-backgroundSecondary)', fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
          {selected.size}개 항목이 선택되었습니다.
        </div>
      )}
    </div>
  )
}

export const Shadcn_전체선택_패턴: Story = {
  name: 'shadcn — 전체 선택 / indeterminate 패턴',
  render: () => <SelectAllDemo />,
}

/* ── shadcn/ui: 폼 유효성 검사 ── */
const FormValidationDemo = () => {
  const [submitted, setSubmitted] = useState(false)
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const missingTerms = submitted && !terms
  const missingPrivacy = submitted && !privacy

  return (
    <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>약관 동의</div>

      {[
        { label: '[필수] 서비스 이용약관 동의', state: terms, set: setTerms, error: missingTerms, errorMsg: '서비스 이용약관에 동의해 주세요.', required: true },
        { label: '[필수] 개인정보 수집 및 이용 동의', state: privacy, set: setPrivacy, error: missingPrivacy, errorMsg: '개인정보 처리방침에 동의해 주세요.', required: true },
        { label: '[선택] 마케팅 수신 동의', state: marketing, set: setMarketing, error: false, errorMsg: '', required: false },
      ].map((item) => (
        <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <CheckboxWithLabel
            value={item.label}
            checked={item.state}
            onChange={() => item.set((v) => !v)}
            alignItems="center"
          >
            <span style={{
              fontSize: 14,
              color: item.error ? 'var(--sem-eclipse-color-systemError)' : 'var(--sem-eclipse-color-foregroundPrimary)',
            }}>{item.label}</span>
          </CheckboxWithLabel>
          {item.error && (
            <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-systemError)', paddingLeft: 28 }}>{item.errorMsg}</span>
          )}
        </div>
      ))}

      <button
        onClick={() => setSubmitted(true)}
        style={{
          marginTop: 4,
          padding: '10px 0',
          borderRadius: 8,
          border: 'none',
          background: 'var(--sem-eclipse-color-fillPrimary)',
          color: 'var(--sem-eclipse-color-backgroundPrimary)',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
        }}
      >
        가입 완료
      </button>
      {submitted && terms && privacy && (
        <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--sem-eclipse-color-systemSuccess)20', border: '1px solid var(--sem-eclipse-color-systemSuccess)', fontSize: 13, color: 'var(--sem-eclipse-color-systemSuccess)' }}>
          회원가입이 완료되었습니다.
        </div>
      )}
    </div>
  )
}

export const Shadcn_폼_유효성_검사: Story = {
  name: 'shadcn — 폼 유효성 검사 (필수/선택 동의)',
  render: () => <FormValidationDemo />,
}

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
          <CheckboxWithLabel {...args} value="blue" />
        </Flex>
        <Flex columnGap="10px">
          <CheckboxWithLabel
            {...args}
            value="foundation"
            disabled={args.disabledSecond}
            labelText={args.labelText}
          >
            파운데이션
          </CheckboxWithLabel>
        </Flex>
        <Flex columnGap="10px">
          <CheckboxWithLabel {...args} value="primary">
            에메랄드
          </CheckboxWithLabel>
        </Flex>
      </Flex>
    </>
  ),
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 컨테이너 색상 역할 패턴
   M3의 Primary Container + On Primary Container 이중 색상 역할.
   선택된 체크박스 항목에 컨테이너 배경색을 적용해 강조합니다.
-------------------------------------------------------------------------- */
const M3ContainerColorRoleDemo = () => {
  type ColorRole = 'primary' | 'secondary' | 'tertiary'
  const [selected, setSelected] = useState<Set<string>>(new Set(['design']))

  const COLOR_ROLES: Record<ColorRole, { container: string; onContainer: string; label: string }> = {
    primary:   { container: '#eef2ff', onContainer: '#4338ca', label: 'Primary Container' },
    secondary: { container: '#f0fdf4', onContainer: '#15803d', label: 'Secondary Container' },
    tertiary:  { container: '#fff7ed', onContainer: '#c2410c', label: 'Tertiary Container' },
  }

  const ITEMS: { key: string; label: string; desc: string; role: ColorRole }[] = [
    { key: 'design', label: '디자인 시스템', desc: '3단계 토큰 아키텍처 적용', role: 'primary' },
    { key: 'a11y', label: '접근성', desc: 'WCAG AA 대비비 준수', role: 'secondary' },
    { key: 'motion', label: '모션 디자인', desc: '150-300ms 자연스러운 트랜지션', role: 'tertiary' },
    { key: 'dark', label: '다크모드', desc: '시스템 테마 자동 감지', role: 'primary' },
    { key: 'icons', label: '아이콘 시스템', desc: '일관된 선형 아이콘 세트', role: 'secondary' },
  ]

  const toggle = (key: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      return next
    })

  return (
    <div style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>M3 컨테이너 색상 역할</div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', padding: '6px 10px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
          {`// M3: PrimaryContainer + OnPrimaryContainer 이중 색상 역할`}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {ITEMS.map((item) => {
          const role = COLOR_ROLES[item.role]
          const isChecked = selected.has(item.key)
          return (
            <div
              key={item.key}
              onClick={() => toggle(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 8,
                border: `1px solid ${isChecked ? role.onContainer : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: isChecked ? role.container : 'var(--sem-eclipse-color-backgroundPrimary)',
                cursor: 'pointer',
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              <CheckboxWithLabel
                value={item.key}
                checked={isChecked}
                onChange={() => toggle(item.key)}
                alignItems="center"
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: isChecked ? role.onContainer : 'var(--sem-eclipse-color-foregroundPrimary)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: isChecked ? role.onContainer + 'aa' : 'var(--sem-eclipse-color-foregroundTertiary)' }}>{item.desc}</div>
              </div>
              {isChecked && (
                <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 10, background: role.onContainer, color: '#fff', fontWeight: 700 }}>{role.label}</span>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {(Object.entries(COLOR_ROLES) as [ColorRole, typeof COLOR_ROLES[ColorRole]][]).map(([key, role]) => (
          <div key={key} style={{ flex: 1, padding: '6px 8px', borderRadius: 6, background: role.container, border: `1px solid ${role.onContainer}40`, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: role.onContainer }}>{role.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const M3_컨테이너_색상_역할: Story = {
  name: 'Material 3 — 컨테이너 색상 역할 (Primary/Secondary/Tertiary Container)',
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3의 이중 색상 역할 시스템. ' +
          'Primary/Secondary/Tertiary Container는 배경색, On*Container는 텍스트/아이콘 색으로 짝을 이룹니다. ' +
          '선택된 항목이 컨테이너 역할에 따라 시맨틱하게 강조됩니다.',
      },
    },
  },
  render: () => <M3ContainerColorRoleDemo />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 상태 레이어 오버레이 패턴
   M3의 state layer는 별도 hover 색상 토큰 없이 반투명 오버레이로 상태 표현.
   체크박스가 상태(idle/hover/pressed/focused)를 오버레이로 시각화합니다.
-------------------------------------------------------------------------- */
const M3StateLayerDemo = () => {
  const [activeStates, setActiveStates] = useState<Record<string, string>>({})

  const STACK_ITEMS = [
    { key: 'notifications', label: '푸시 알림 허용', desc: '새 메시지와 업데이트를 즉시 받아요' },
    { key: 'analytics', label: '사용 데이터 수집', desc: '서비스 개선에 사용됩니다' },
    { key: 'personalize', label: '개인화 추천', desc: '관심사 기반 콘텐츠 추천' },
    { key: 'backup', label: '자동 백업', desc: 'Wi-Fi 연결 시 매일 백업됩니다' },
  ]

  const [checked, setChecked] = useState<Set<string>>(new Set(['notifications']))

  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      return next
    })

  return (
    <div style={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>M3 상태 레이어 오버레이</div>
        <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 8 }}>
          호버 시 8% 오버레이, 프레스 시 12% 오버레이 — 별도 색상 토큰 불필요
        </div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', padding: '6px 10px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
          {`// state layer = base-color + rgba(onSurface, 0.08|0.12)`}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {STACK_ITEMS.map((item) => {
          const isHovered = activeStates[item.key] === 'hover'
          const isPressed = activeStates[item.key] === 'pressed'
          const isFocused = activeStates[item.key] === 'focused'
          const isChecked = checked.has(item.key)

          const stateOverlay = isPressed
            ? 'rgba(99,102,241,0.12)'
            : isHovered
            ? 'rgba(99,102,241,0.08)'
            : isFocused
            ? 'rgba(99,102,241,0.10)'
            : 'transparent'

          return (
            <div
              key={item.key}
              onMouseEnter={() => setActiveStates((s) => ({ ...s, [item.key]: 'hover' }))}
              onMouseLeave={() => setActiveStates((s) => ({ ...s, [item.key]: 'idle' }))}
              onMouseDown={() => setActiveStates((s) => ({ ...s, [item.key]: 'pressed' }))}
              onMouseUp={() => setActiveStates((s) => ({ ...s, [item.key]: 'hover' }))}
              onFocus={() => setActiveStates((s) => ({ ...s, [item.key]: 'focused' }))}
              onBlur={() => setActiveStates((s) => ({ ...s, [item.key]: 'idle' }))}
              onClick={() => toggle(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 8,
                background: `var(--sem-eclipse-color-backgroundPrimary)`,
                boxShadow: `inset 0 0 0 1000px ${stateOverlay}`,
                cursor: 'pointer',
                transition: 'box-shadow 0.1s ease',
                userSelect: 'none',
              }}
            >
              <CheckboxWithLabel
                value={item.key}
                checked={isChecked}
                onChange={() => {}}
                alignItems="center"
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{item.desc}</div>
              </div>
              <span style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundQuaternary)', fontFamily: 'monospace', minWidth: 50, textAlign: 'right' }}>
                {activeStates[item.key] === 'hover' ? '+8%' : activeStates[item.key] === 'pressed' ? '+12%' : activeStates[item.key] === 'focused' ? '+10%' : '0%'}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
        {[
          { label: 'Idle', overlay: 'transparent', text: '0%' },
          { label: 'Hover', overlay: 'rgba(99,102,241,0.08)', text: '+8%' },
          { label: 'Focus', overlay: 'rgba(99,102,241,0.10)', text: '+10%' },
          { label: 'Press', overlay: 'rgba(99,102,241,0.12)', text: '+12%' },
        ].map((s) => (
          <div key={s.label} style={{ padding: '6px 8px', borderRadius: 6, background: s.overlay === 'transparent' ? 'var(--sem-eclipse-color-backgroundSecondary)' : s.overlay, border: '1px solid var(--sem-eclipse-color-borderSubtle)', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>{s.label}</div>
            <div style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundTertiary)', fontFamily: 'monospace' }}>{s.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const M3_상태_레이어_오버레이: Story = {
  name: 'Material 3 — 상태 레이어 오버레이 (hover +8%, pressed +12%)',
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3의 상태 레이어 시스템. hover/pressed 상태를 별도 색상 토큰 없이 ' +
          '반투명 오버레이(8%/12%)로 표현합니다. boxShadow inset으로 구현했으며, ' +
          '각 상태별 오버레이 강도가 실시간으로 표시됩니다.',
      },
    },
  },
  render: () => <M3StateLayerDemo />,
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 에러 컨테이너 폼 유효성 검사 패턴
   M3의 Error Container(#FFDAD6) + On Error Container(#410002) 색상 역할로
   폼 에러 상태를 시맨틱하게 표현합니다.
-------------------------------------------------------------------------- */
const M3ErrorContainerDemo = () => {
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState({ terms: false, age: false, privacy: false })

  const errors = submitted
    ? {
        terms: !values.terms,
        age: !values.age,
        privacy: !values.privacy,
      }
    : { terms: false, age: false, privacy: false }

  const allValid = values.terms && values.age && values.privacy

  const ITEMS: { key: keyof typeof values; label: string; required: boolean }[] = [
    { key: 'terms', label: '서비스 이용약관에 동의합니다 (필수)', required: true },
    { key: 'age', label: '만 14세 이상입니다 (필수)', required: true },
    { key: 'privacy', label: '개인정보 처리방침에 동의합니다 (필수)', required: true },
  ]

  return (
    <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>M3 에러 컨테이너 패턴</div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', padding: '6px 10px', borderRadius: 4, background: 'var(--sem-eclipse-color-backgroundSecondary)', color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
          {`// M3: ErrorContainer(#FFDAD6) + OnErrorContainer(#410002)`}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ITEMS.map((item) => {
          const hasError = errors[item.key]
          return (
            <div
              key={item.key}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: `1px solid ${hasError ? '#ef4444' : 'var(--sem-eclipse-color-borderSubtle)'}`,
                background: hasError ? '#fef2f2' : 'var(--sem-eclipse-color-backgroundPrimary)',
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              <CheckboxWithLabel
                value={item.key}
                checked={values[item.key]}
                onChange={() => setValues((v) => ({ ...v, [item.key]: !v[item.key] }))}
                alignItems="center"
              >
                <span style={{ fontSize: 13, color: hasError ? '#b91c1c' : 'var(--sem-eclipse-color-foregroundPrimary)', fontWeight: hasError ? 600 : 400 }}>
                  {item.label}
                </span>
              </CheckboxWithLabel>
              {hasError && (
                <div style={{ marginTop: 6, marginLeft: 28, fontSize: 11, color: '#b91c1c', fontWeight: 600 }}>
                  이 항목은 필수입니다
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button
        onClick={() => setSubmitted(true)}
        disabled={submitted && allValid}
        style={{
          padding: '10px 0',
          borderRadius: 8,
          border: 'none',
          background: 'var(--sem-eclipse-color-fillPrimary)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
        }}
      >
        가입 완료
      </button>

      {submitted && allValid && (
        <div style={{ padding: '10px 14px', borderRadius: 8, background: '#ecfdf5', border: '1px solid #10b981', fontSize: 13, fontWeight: 600, color: '#065f46' }}>
          가입이 완료되었습니다.
        </div>
      )}
      {submitted && !allValid && (
        <div style={{ padding: '10px 14px', borderRadius: 8, background: '#fef2f2', border: '1px solid #ef4444', fontSize: 13, color: '#b91c1c' }}>
          필수 항목을 모두 체크해주세요.
        </div>
      )}
    </div>
  )
}

export const M3_에러_컨테이너_폼_검증: Story = {
  name: 'Material 3 — 에러 컨테이너 폼 유효성 검사 (ErrorContainer + OnErrorContainer)',
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3의 Error Container 색상 역할. ' +
          '에러 상태 항목에 ErrorContainer 배경(#fef2f2)과 OnErrorContainer 텍스트(#b91c1c)를 적용합니다. ' +
          '별도 에러 컴포넌트 없이 색상 역할만으로 시맨틱 에러 UX를 구현합니다.',
      },
    },
  },
  render: () => <M3ErrorContainerDemo />,
}

/* ── Linear Design: 이슈 필터 다중 선택 ── */
const IssueFilterDemo = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(['bug', 'urgent']))

  const filters = [
    { value: 'bug', label: '버그', count: 14, color: '#ef4444' },
    { value: 'feature', label: '기능 요청', count: 8, color: '#6366f1' },
    { value: 'urgent', label: '긴급', count: 3, color: '#f59e0b' },
    { value: 'improvement', label: '개선', count: 21, color: '#10b981' },
    { value: 'docs', label: '문서', count: 6, color: '#0ea5e9' },
  ]

  const toggle = (v: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(v)) next.delete(v)
      else next.add(v)
      return next
    })

  return (
    <div style={{ maxWidth: 280 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>레이블 필터</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {filters.map((f) => (
          <div
            key={f.value}
            onClick={() => toggle(f.value)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 5, background: selected.has(f.value) ? 'var(--sem-eclipse-color-backgroundSecondary)' : 'transparent', cursor: 'pointer', transition: 'background 0.1s' }}
          >
            <CheckboxWithLabel value={f.value} checked={selected.has(f.value)} onChange={() => toggle(f.value)} alignItems="center" />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: f.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{f.label}</span>
            <span style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', fontVariantNumeric: 'tabular-nums' }}>{f.count}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, padding: '6px 8px', fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
        {selected.size}개 필터 적용 중 — <button onClick={() => setSelected(new Set())} style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, padding: 0 }}>초기화</button>
      </div>
    </div>
  )
}

export const Linear_이슈_레이블_필터: Story = {
  name: 'Linear — 이슈 레이블 다중 필터',
  render: () => <IssueFilterDemo />,
}

/* ── Linear Design: 스프린트 목표 체크리스트 ── */
const SprintGoalDemo = () => {
  const [items, setItems] = useState([
    { id: 'g1', label: 'Button 컴포넌트 loading 상태 추가', done: true, priority: 'high' },
    { id: 'g2', label: 'TextField 유효성 검사 에러 상태 스토리', done: true, priority: 'high' },
    { id: 'g3', label: 'RadioGroup 접근성 aria 보강', done: false, priority: 'medium' },
    { id: 'g4', label: 'HoverCard 애니메이션 개선', done: false, priority: 'medium' },
    { id: 'g5', label: 'DataTable 정렬 인터랙션 스토리', done: false, priority: 'low' },
  ])

  const priorityColor: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#94a3b8' }

  const toggle = (id: string) =>
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)))

  const done = items.filter((i) => i.done).length
  const pct = Math.round((done / items.length) * 100)

  return (
    <div style={{ maxWidth: 360 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>스프린트 #12 목표</div>
        <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{done}/{items.length} 완료</div>
      </div>
      {/* Progress bar */}
      <div style={{ height: 4, borderRadius: 2, background: 'var(--sem-eclipse-color-borderSubtle)', marginBottom: 12, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: '#6366f1', borderRadius: 2, transition: 'width 0.3s ease' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggle(item.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', cursor: 'pointer', borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)' }}
          >
            <CheckboxWithLabel value={item.id} checked={item.done} onChange={() => toggle(item.id)} alignItems="center" />
            <span style={{ flex: 1, fontSize: 13, color: item.done ? 'var(--sem-eclipse-color-foregroundTertiary)' : 'var(--sem-eclipse-color-foregroundPrimary)', textDecoration: item.done ? 'line-through' : 'none', transition: 'color 0.15s' }}>{item.label}</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: priorityColor[item.priority], flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_스프린트_목표_체크리스트: Story = {
  name: 'Linear — 스프린트 목표 체크리스트',
  render: () => <SprintGoalDemo />,
}

/* ── Linear Design: 팀 알림 채널 설정 ── */
const TeamNotifDemo = () => {
  const [settings, setSettings] = useState({
    comments: true,
    mentions: true,
    statusChange: false,
    newIssues: false,
    completions: true,
  })

  const toggle = (k: keyof typeof settings) => setSettings((prev) => ({ ...prev, [k]: !prev[k] }))

  const items: { key: keyof typeof settings; label: string; desc: string }[] = [
    { key: 'comments', label: '댓글', desc: '이슈에 새 댓글이 달렸을 때' },
    { key: 'mentions', label: '멘션', desc: '내가 @태그되었을 때' },
    { key: 'statusChange', label: '상태 변경', desc: '이슈 상태가 바뀌었을 때' },
    { key: 'newIssues', label: '새 이슈', desc: '팀에 새 이슈가 생성될 때' },
    { key: 'completions', label: '완료', desc: '할당된 이슈가 완료될 때' },
  ]

  return (
    <div style={{ maxWidth: 340 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>알림 설정 (Linear 패턴)</div>
      <div style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 12 }}>슬랙 채널 #orbit-ui-dev로 알림 받기</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {items.map((item, i) => (
          <div
            key={item.key}
            onClick={() => toggle(item.key)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < items.length - 1 ? '1px solid var(--sem-eclipse-color-borderSubtle)' : 'none', cursor: 'pointer' }}
          >
            <CheckboxWithLabel value={item.key} checked={settings[item.key]} onChange={() => toggle(item.key)} alignItems="center" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: settings[item.key] ? 600 : 400, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{item.label}</div>
              <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginTop: 1 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button onClick={() => setSettings({ comments: true, mentions: true, statusChange: true, newIssues: true, completions: true })} style={{ fontSize: 12, fontWeight: 600, color: '#6366f1', background: 'none', border: '1px solid #6366f1', borderRadius: 5, padding: '5px 10px', cursor: 'pointer' }}>모두 선택</button>
        <button onClick={() => setSettings({ comments: false, mentions: false, statusChange: false, newIssues: false, completions: false })} style={{ fontSize: 12, fontWeight: 500, color: 'var(--sem-eclipse-color-foregroundTertiary)', background: 'none', border: '1px solid var(--sem-eclipse-color-borderDefault)', borderRadius: 5, padding: '5px 10px', cursor: 'pointer' }}>모두 해제</button>
      </div>
    </div>
  )
}

export const Linear_팀_알림_설정: Story = {
  name: 'Linear — 팀 알림 채널 설정',
  render: () => <TeamNotifDemo />,
}
