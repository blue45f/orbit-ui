import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { UniqueIDProvider } from '../primitives/UniqueIDProvider'

import { Field } from './Field'

Field.displayName = 'Field'

const meta = {
  component: Field,
  title: 'foundation/Field',
  decorators: [
    (Story) => (
      <UniqueIDProvider>
        <div style={{ maxWidth: 320 }}>
          <Story />
        </div>
      </UniqueIDProvider>
    ),
  ],
} satisfies Meta<typeof Field>

type Story = StoryObj<typeof meta>

export default meta

const inputStyle: React.CSSProperties = {
  height: 40,
  padding: '0 12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  fontSize: 15,
}

export const 기본: Story = {
  render: () => (
    <Field>
      <Field.Label style={{ fontWeight: 600, fontSize: 14 }}>이름</Field.Label>
      <Field.Control>
        <input style={inputStyle} placeholder="홍길동" />
      </Field.Control>
    </Field>
  ),
}

export const 설명_포함: Story = {
  render: () => (
    <Field>
      <Field.Label style={{ fontWeight: 600, fontSize: 14 }}>비밀번호</Field.Label>
      <Field.Control>
        <input type="password" style={inputStyle} placeholder="••••••••" />
      </Field.Control>
      <Field.Description style={{ color: '#6b7280' }}>
        8자 이상, 숫자와 특수문자를 포함하세요.
      </Field.Description>
    </Field>
  ),
}

export const 필수_입력: Story = {
  render: () => (
    <Field required>
      <Field.Label style={{ fontWeight: 600, fontSize: 14 }}>이메일</Field.Label>
      <Field.Control>
        <input type="email" style={inputStyle} placeholder="you@company.com" />
      </Field.Control>
      <Field.Description style={{ color: '#6b7280' }}>회사 이메일을 입력하세요.</Field.Description>
    </Field>
  ),
}

export const 에러_상태: Story = {
  render: () => (
    <Field invalid>
      <Field.Label style={{ fontWeight: 600, fontSize: 14 }}>이메일</Field.Label>
      <Field.Control>
        <input
          type="email"
          defaultValue="not-an-email"
          style={{ ...inputStyle, borderColor: '#ef4444' }}
        />
      </Field.Control>
      <Field.Error style={{ color: '#ef4444' }}>올바른 이메일 형식이 아니에요.</Field.Error>
    </Field>
  ),
}

export const 라이브_검증: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    const invalid = value.length > 0 && !value.includes('@')

    return (
      <Field invalid={invalid} required>
        <Field.Label style={{ fontWeight: 600, fontSize: 14 }}>이메일</Field.Label>
        <Field.Control>
          <input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="you@company.com"
            style={{ ...inputStyle, borderColor: invalid ? '#ef4444' : '#d1d5db' }}
          />
        </Field.Control>
        {invalid ? (
          <Field.Error style={{ color: '#ef4444' }}>@ 를 포함한 이메일을 입력하세요.</Field.Error>
        ) : (
          <Field.Description style={{ color: '#6b7280' }}>
            회사 이메일을 입력하세요.
          </Field.Description>
        )}
      </Field>
    )
  },
}
