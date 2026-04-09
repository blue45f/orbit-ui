import { Meta, StoryObj } from '@storybook/react'

import { LottieProvider } from '../Animation'

import { Spinner } from './Spinner'

Spinner.displayName = 'Spinner'

const meta = {
  title: 'Utils/Spinner',
  component: Spinner,
  decorators: [
    (Story) => (
      <LottieProvider>
        <Story />
      </LottieProvider>
    ),
  ],
  args: {
    color: 'primary',
  },
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['primary', 'purple', 'white', 'orange'],
    },
  },
} satisfies Meta<typeof Spinner>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => <Spinner {...args} />,
} satisfies Story

export const 디자인_QA = {
  render: (args) => {
    return (
      <div style={{ backgroundColor: 'unset', height: 100, display: 'flex' }}>
        <Spinner {...args} />
      </div>
    )
  },
} satisfies Story
