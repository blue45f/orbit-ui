import type { Meta, StoryObj } from '@storybook/react'

import { AvatarComponent as Avatar } from './Avatar'

const meta = {
  title: 'core/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <Avatar.Image src="https://i.pravatar.cc/80?img=12" alt="사용자 프로필" />
      <Avatar.Fallback>OU</Avatar.Fallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      {/* 이미지 로드 실패 시 Fallback 이 표시된다. */}
      <Avatar.Image src="https://example.invalid/missing.png" alt="" />
      <Avatar.Fallback>HJ</Avatar.Fallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar className="h-8 w-8">
        <Avatar.Fallback>S</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>M</Avatar.Fallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <Avatar.Fallback>L</Avatar.Fallback>
      </Avatar>
    </div>
  ),
}
