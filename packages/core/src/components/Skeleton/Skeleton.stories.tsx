import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton } from './Skeleton'

const meta = {
  title: 'core/Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Skeleton {...args} className="h-4 w-48" />,
}

export const Card: Story = {
  render: () => (
    <div className="flex w-72 items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  ),
}
