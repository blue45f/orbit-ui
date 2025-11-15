import type { Meta, StoryObj } from '@storybook/react'

import { Progress } from './Progress'

const meta = {
  title: 'eclipse/Indicators/Progress',
  component: Progress,
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  args: {
    value: 60,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Progress {...args} />
    </div>
  ),
}
