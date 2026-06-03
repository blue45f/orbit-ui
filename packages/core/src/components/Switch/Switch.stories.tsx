import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from './Switch'

const meta = {
  title: 'core/Data Entry/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': '알림 사용',
  },
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
    'aria-label': '알림 사용',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': '비활성 스위치',
  },
}

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm text-[var(--sem-eclipse-color-foregroundPrimary)]">
      <Switch defaultChecked />
      비행기 모드
    </label>
  ),
}
