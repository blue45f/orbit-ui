import type { Meta, StoryObj } from '@storybook/react'

import { Command } from './Command'
import { SettingLineIcon, StarLineIcon, NotificationLineIcon } from '@orbit-ui/icons'

const meta = {
  title: 'eclipse/Navigation/Command',
  component: Command,
  tags: ['autodocs'],
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md dark:border-slate-800 max-w-md mx-auto">
      <Command.Input placeholder="무엇이든 입력해 보세요..." />
      <Command.List>
        <Command.Empty>검색 결과가 없습니다.</Command.Empty>
        <Command.Group heading="제안">
          <Command.Item>
            <StarLineIcon className="mr-2 h-4 w-4" />
            <span>즐겨찾기</span>
          </Command.Item>
          <Command.Item>
            <NotificationLineIcon className="mr-2 h-4 w-4" />
            <span>알림</span>
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="설정">
          <Command.Item>
            <SettingLineIcon className="mr-2 h-4 w-4" />
            <span>환경설정</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  ),
}
