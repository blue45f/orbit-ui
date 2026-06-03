import type { Meta, StoryObj } from '@storybook/react'

import { CommandComponent as Command } from './Command'

const meta = {
  title: 'core/Navigation/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Command
      {...args}
      className="w-80 rounded-lg border border-[var(--sem-eclipse-color-borderTertiary)]"
    >
      <Command.Input placeholder="명령을 검색하세요..." />
      <Command.List>
        <Command.Empty>결과가 없습니다.</Command.Empty>
        <Command.Group heading="추천">
          <Command.Item value="calendar">캘린더</Command.Item>
          <Command.Item value="search">검색</Command.Item>
          <Command.Item value="settings">설정</Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="계정">
          <Command.Item value="profile">프로필</Command.Item>
          <Command.Item value="billing">결제</Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  ),
}
