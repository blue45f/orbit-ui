import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { PasswordField } from './PasswordField'

const meta: Meta<typeof PasswordField> = {
  title: 'foundation/PasswordField',
  component: PasswordField,
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
  },
}

export default meta
type Story = StoryObj<typeof meta>

const excludeProps = ['value', 'defaultValue', 'theme', 'className', 'style']

export const 기본: Story = {
  args: {
    placeholder: '비밀번호를 입력하세요',
  },
  parameters: {
    controls: {
      exclude: excludeProps,
    },
  },
}

export const 기본값: Story = {
  args: {
    placeholder: '비밀번호를 입력하세요',
    defaultValue: 'default password',
  },
  parameters: {
    controls: {
      exclude: excludeProps,
    },
  },
}
