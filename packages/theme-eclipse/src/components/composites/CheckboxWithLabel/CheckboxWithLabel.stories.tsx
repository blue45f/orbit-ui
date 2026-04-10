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
