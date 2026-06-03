import type { Meta, StoryObj } from '@storybook/react'

import { Tooltip } from './Tooltip'

const meta = {
  title: 'core/Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Tooltip.Provider>
      <Tooltip {...args}>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-[var(--sem-eclipse-color-borderTertiary)] px-4 py-2 text-sm text-[var(--sem-eclipse-color-foregroundPrimary)]"
          >
            마우스를 올려보세요
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>도움말 텍스트입니다.</Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  ),
}

export const Sides: Story = {
  render: () => (
    <Tooltip.Provider>
      <div className="flex gap-6">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip key={side}>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-[var(--sem-eclipse-color-borderTertiary)] px-3 py-2 text-sm text-[var(--sem-eclipse-color-foregroundPrimary)]"
              >
                {side}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content side={side}>{side} 방향</Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </Tooltip.Provider>
  ),
}
