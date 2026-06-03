import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { RadioButton } from '../RadioButton'

import { RadioGroup } from './RadioGroup'

RadioGroup.displayName = 'RadioGroup'

const meta = {
  component: RadioGroup,
  title: 'foundation/RadioGroup',
} satisfies Meta<typeof RadioGroup>

type Story = StoryObj<typeof meta>

export default meta

const labelStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  fontSize: 15,
}

export const 기본: Story = {
  args: {
    'aria-label': '음식 선택',
    defaultValue: '피자',
  },
  render: (args) => (
    <RadioGroup {...args}>
      {['피자', '치킨', '햄버거'].map((food) => (
        <label key={food} style={labelStyle}>
          <RadioGroup.Item value={food}>
            <RadioButton.Indicator width={10} height={10} style={{ backgroundColor: '#2563eb' }} />
          </RadioGroup.Item>
          {food}
        </label>
      ))}
    </RadioGroup>
  ),
}

export const 수평_배치: Story = {
  args: {
    'aria-label': '크기 선택',
    orientation: 'horizontal',
    defaultValue: 'M',
  },
  render: (args) => (
    <RadioGroup {...args}>
      {['S', 'M', 'L', 'XL'].map((size) => (
        <label key={size} style={labelStyle}>
          <RadioGroup.Item value={size}>
            <RadioButton.Indicator width={10} height={10} style={{ backgroundColor: '#2563eb' }} />
          </RadioGroup.Item>
          {size}
        </label>
      ))}
    </RadioGroup>
  ),
}

export const 비활성_항목: Story = {
  args: {
    'aria-label': '플랜 선택',
    defaultValue: 'free',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <label style={labelStyle}>
        <RadioGroup.Item value="free">
          <RadioButton.Indicator width={10} height={10} style={{ backgroundColor: '#2563eb' }} />
        </RadioGroup.Item>
        무료
      </label>
      <label style={labelStyle}>
        <RadioGroup.Item value="pro">
          <RadioButton.Indicator width={10} height={10} style={{ backgroundColor: '#2563eb' }} />
        </RadioGroup.Item>
        프로
      </label>
      <label style={{ ...labelStyle, opacity: 0.5 }}>
        <RadioGroup.Item value="enterprise" disabled>
          <RadioButton.Indicator width={10} height={10} style={{ backgroundColor: '#2563eb' }} />
        </RadioGroup.Item>
        엔터프라이즈 (준비중)
      </label>
    </RadioGroup>
  ),
}

export const 제어_컴포넌트: Story = {
  args: { 'aria-label': '결제 수단' },
  render: function Render(args) {
    const [value, setValue] = useState('card')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RadioGroup {...args} value={value} onChange={setValue}>
          {[
            { v: 'card', label: '신용카드' },
            { v: 'bank', label: '계좌이체' },
            { v: 'phone', label: '휴대폰 결제' },
          ].map(({ v, label }) => (
            <label key={v} style={labelStyle}>
              <RadioGroup.Item value={v}>
                <RadioButton.Indicator
                  width={10}
                  height={10}
                  style={{ backgroundColor: '#2563eb' }}
                />
              </RadioGroup.Item>
              {label}
            </label>
          ))}
        </RadioGroup>
        <p style={{ fontSize: 13, color: '#6b7280' }}>선택된 값: {value}</p>
      </div>
    )
  },
}
