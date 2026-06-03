import type { Meta, StoryObj } from '@storybook/react'

import { Popover } from './Popover'

const meta = {
  title: 'core/Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-[var(--sem-eclipse-color-borderTertiary)] px-4 py-2 text-sm text-[var(--sem-eclipse-color-foregroundPrimary)]"
        >
          Popover 열기
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="space-y-2">
          <p className="text-sm font-semibold">치수</p>
          <p className="text-sm text-[var(--sem-eclipse-color-foregroundSecondary)]">
            레이어의 치수를 설정하세요.
          </p>
        </div>
      </Popover.Content>
    </Popover>
  ),
}
