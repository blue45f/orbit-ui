import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'foundation/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    axis: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    maximumLine: {
      control: 'number',
    },
    minimumLine: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const excludeProps = ['value', 'defaultValue', 'theme', 'className', 'style', 'as', 'axis', 'type']

export const 기본: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
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
      exclude: [...excludeProps, 'maximumLine', 'minimumLine'],
    },
  },
  render: function Render(args) {
    const { leading, trailing, ...textFieldProps } = args as typeof args & { leading?: boolean; trailing?: boolean }

    return (
      <TextField {...textFieldProps} style={{ width: '300px' }}>
        {leading && <TextField.Leading>🔍</TextField.Leading>}
        {trailing && <TextField.Trailing>👁️</TextField.Trailing>}
      </TextField>
    )
  },
}

export const 다중줄: Story = {
  args: {
    placeholder: '여러 줄 텍스트를 입력하세요',
    axis: 'vertical',
    minimumLine: 3,
    maximumLine: 6,
  },
  parameters: {
    controls: {
      exclude: excludeProps,
    },
  },
  render: function Render(args) {
    return <TextField {...args} style={{ width: '400px' }} />
  },
}

export const 지우기버튼: Story = {
  args: {
    placeholder: 'Clear 버튼 테스트',
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
      exclude: [...excludeProps, 'maximumLine', 'minimumLine'],
    },
  },
  render: function Render(args) {
    const { visibility, ...textFieldProps } = args as typeof args & { visibility?: 'onFocused' | 'onPopulated' }

    return (
      <TextField {...textFieldProps} style={{ width: '300px' }}>
        <TextField.ClearButton visibility={visibility || 'onFocused'} />
      </TextField>
    )
  },
}

export const 커스텀지우기버튼: Story = {
  args: {
    placeholder: '커스텀 Clear 버튼',
  },
  parameters: {
    controls: {
      exclude: [...excludeProps, 'maximumLine', 'minimumLine'],
    },
  },
  render: function Render(args) {
    return (
      <TextField {...args} style={{ width: '300px' }}>
        <TextField.Leading>🔍</TextField.Leading>
        <TextField.ClearButton visibility='onPopulated'>🗑️</TextField.ClearButton>
      </TextField>
    )
  },
}
