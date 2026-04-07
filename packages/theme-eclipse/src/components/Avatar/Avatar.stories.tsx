import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './Avatar'

const meta = {
  title: 'eclipse/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Avatar>
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
    </div>
  ),
}
