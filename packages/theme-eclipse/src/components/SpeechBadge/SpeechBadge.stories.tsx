import { Meta, StoryObj } from '@storybook/react'

import { SpeechBadge } from './SpeechBadge'

SpeechBadge.displayName = 'SpeechBadge'

const meta = {
  title: 'eclipse/Badges/SpeechBadge',
  component: SpeechBadge,
  args: {},
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['pink', 'blue'],
    },
    tailPosition: {
      control: 'inline-radio',
      options: ['leading', 'trailing'],
    },
  },
} satisfies Meta<typeof SpeechBadge>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render(args) {
    return <SpeechBadge {...args}>SpeechBadge</SpeechBadge>
  },
} satisfies Story

export const 테마_재정의 = {
  render(args) {
    return (
      <SpeechBadge {...args} color="blue">
        SpeechBadge
      </SpeechBadge>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    text: '뱃지 텍스트',
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
  argTypes: {
    text: {
      control: 'text',
    },
  },

  // eslint-disable-next-line
  render: ({ text, ...rest }: any) => {
    return <SpeechBadge {...rest}>{text || 'SpeechBadge'}</SpeechBadge>
  },
}
