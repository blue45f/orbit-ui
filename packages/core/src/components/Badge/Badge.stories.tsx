import { CheckIcon } from '@orbit-ui/icons'
import { Meta, StoryObj } from '@storybook/react'

import { Badge } from './Badge'

Badge.displayName = 'Badge'

const meta = {
  title: 'foundation/Badges/Badge',
  component: Badge,
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'div'],
    },
  },
} satisfies Meta<typeof Badge>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => (
    <Badge {...args}>
      <Badge.Leading>
        <CheckIcon />
      </Badge.Leading>
      <Badge.Trailing>필수</Badge.Trailing>
    </Badge>
  ),
} satisfies Story
