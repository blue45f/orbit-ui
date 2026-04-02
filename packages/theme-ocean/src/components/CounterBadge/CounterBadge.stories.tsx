import { Meta, StoryObj } from '@storybook/react'

import { CounterBadge } from './CounterBadge'

CounterBadge.displayName = 'CounterBadge'

const meta = {
  title: 'ocean/Badges/CounterBadge',
  component: CounterBadge,
  args: {
    children: 99,
  },
} satisfies Meta<typeof CounterBadge>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => <CounterBadge {...args} />,
} satisfies Story

export const 디자인_QA = {
  args: {
    children: 99,
  },
  argTypes: {
    children: {
      control: { type: 'number', min: 0, max: 200 },
    },
  },
  render: (args) => <CounterBadge {...args} />,
} satisfies Story
