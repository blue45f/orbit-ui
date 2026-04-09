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
