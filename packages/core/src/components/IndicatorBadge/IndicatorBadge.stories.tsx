import { CheckIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'

import { IndicatorBadge } from './IndicatorBadge'

IndicatorBadge.displayName = 'IndicatorBadge'

const meta = {
  title: 'foundation/Badges/IndicatorBadge',
  component: IndicatorBadge,
  args: {
    width: 40,
    height: 24,
    children: '99+',
  },
} satisfies Meta<typeof IndicatorBadge>

type Story = StoryObj<typeof meta>

export default meta

export const 텍스트 = {
  render: (args) => <IndicatorBadge {...args} />,
} satisfies Story

export const Shape = {
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
  render: ({ children: _children, ...rest }) => (
    <IndicatorBadge {...rest}>
      <CheckIcon />
    </IndicatorBadge>
  ),
} satisfies Story
