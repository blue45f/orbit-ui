import { StarFillIcon, CheckIcon } from '@prism-ui/icons'
import { Meta, StoryObj } from '@storybook/react'

import { LabelBadge } from './LabelBadge'

LabelBadge.displayName = 'LabelBadge'

const meta = {
  title: 'mint/Badges/LabelBadge',
  component: LabelBadge,
  args: {},
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['gray', 'benefit', 'sale'],
    },
  },
} satisfies Meta<typeof LabelBadge>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render(args) {
    return (
      <LabelBadge {...args}>
        <LabelBadge.Visual>
          <StarFillIcon />
        </LabelBadge.Visual>
        <LabelBadge.Label>Trailing</LabelBadge.Label>
      </LabelBadge>
    )
  },
} satisfies Story

export const 테마_재정의 = {
  render(args) {
    return (
      <LabelBadge {...args} color='benefit'>
        <LabelBadge.Visual>
          <CheckIcon />
        </LabelBadge.Visual>
        <LabelBadge.Label>Trailing</LabelBadge.Label>
      </LabelBadge>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    visual: true,
    label: true,
    text: '뱃지 텍스트',
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    visual: {
      control: 'boolean',
    },
    label: {
      control: 'boolean',
    },
    text: {
      control: 'text',
    },
  },

  // eslint-disable-next-line
  render: ({ visual, label, text, ...rest }: any) => {
    return (
      <LabelBadge {...rest}>
        {visual && (
          <LabelBadge.Visual>
            <CheckIcon size={rest.size === 'large' ? 12 : 10} />
          </LabelBadge.Visual>
        )}
        {label && <LabelBadge.Label>{text || 'Label'}</LabelBadge.Label>}
      </LabelBadge>
    )
  },
}
