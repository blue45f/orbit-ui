import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { JSX, useState } from 'react'

import { TextFieldWithLabelAnimation } from './FloatingTextField'

const meta: Meta<typeof TextFieldWithLabelAnimation> = {
  title: 'Foundation/TextFieldWithLabelAnimation',
  component: TextFieldWithLabelAnimation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    disabled: false,
    type: 'text',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: '라벨로 표시될 플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'tel', 'url'],
      description: 'input type',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const excludeProps = ['value', 'defaultValue', 'theme', 'className', 'style', 'type']

export const 기본: Story = {
  args: {
    placeholder: '이메일을 입력하세요',
    leading: false,
    trailing: false,
  },
  argTypes: {
    leading: {
      control: 'boolean',
      description: 'Leading 슬롯 표시 여부',
    },
    trailing: {
      control: 'boolean',
      description: 'Trailing 슬롯 표시 여부',
    },
  },
  parameters: {
    controls: {
      exclude: excludeProps,
    },
  },
  render: function Render(args) {
    const { leading, trailing, ...textFieldProps } = args as typeof args & { leading?: boolean; trailing?: boolean }

    return (
      <TextFieldWithLabelAnimation {...textFieldProps} style={{ width: '300px' }}>
        {leading && <TextFieldWithLabelAnimation.Leading>@</TextFieldWithLabelAnimation.Leading>}
        {trailing && <TextFieldWithLabelAnimation.Trailing>.com</TextFieldWithLabelAnimation.Trailing>}
      </TextFieldWithLabelAnimation>
    )
  },
}

function ControlledExample(args: React.ComponentProps<typeof TextFieldWithLabelAnimation>): JSX.Element {
  const [value, setValue] = useState('')

  return (
    <div>
      <TextFieldWithLabelAnimation {...args} value={value} onChange={(e) => setValue(e.target.value)} />
      <div style={{ marginTop: '1rem' }}>Current value: {value}</div>
    </div>
  )
}

export const 제어: Story = {
  render: ControlledExample,
  args: {
    placeholder: '제어되는 입력',
  },
  parameters: {
    controls: {
      exclude: ['value', 'defaultValue', 'onChange'],
    },
  },
}

export const 지우기버튼: Story = {
  args: {
    placeholder: 'Clear 버튼 테스트',
    defaultValue: 'user@example.com',
  },
  argTypes: {
    visibility: {
      control: 'select',
      options: ['onFocused', 'onPopulated'],
      description: 'Clear Button 표시 조건',
    },
  },
  parameters: {
    controls: {
      exclude: excludeProps,
    },
  },
  render: function Render(args) {
    const { visibility, ...textFieldProps } = args as typeof args & { visibility?: 'onFocused' | 'onPopulated' }

    return (
      <TextFieldWithLabelAnimation {...textFieldProps} style={{ width: '300px' }}>
        <TextFieldWithLabelAnimation.ClearButton visibility={visibility || 'onFocused'} />
      </TextFieldWithLabelAnimation>
    )
  },
}

export const 커스텀지우기버튼: Story = {
  args: {
    placeholder: '커스텀 Clear 버튼',
    defaultValue: 'user@example.com',
  },
  parameters: {
    controls: {
      exclude: excludeProps,
    },
  },
  render: function Render(args) {
    return (
      <TextFieldWithLabelAnimation {...args} style={{ width: '300px' }}>
        <TextFieldWithLabelAnimation.Leading>@</TextFieldWithLabelAnimation.Leading>
        <TextFieldWithLabelAnimation.ClearButton visibility='onPopulated'>
          🗑️
        </TextFieldWithLabelAnimation.ClearButton>
      </TextFieldWithLabelAnimation>
    )
  },
}
