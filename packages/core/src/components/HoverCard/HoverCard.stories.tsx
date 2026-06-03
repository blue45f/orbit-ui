import type { Meta, StoryObj } from '@storybook/react'

import { HoverCard } from './HoverCard'

const meta = {
  title: 'core/Overlay/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <HoverCard {...args} openDelay={100}>
      <HoverCard.Trigger asChild>
        <a
          href="#"
          className="underline text-[var(--sem-eclipse-color-foregroundPrimary)]"
          onClick={(e) => e.preventDefault()}
        >
          @orbit-ui
        </a>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <div className="space-y-1">
          <p className="text-sm font-semibold">Orbit UI</p>
          <p className="text-sm text-[var(--sem-eclipse-color-foregroundSecondary)]">
            3계층 아키텍처 기반 React 디자인 시스템입니다.
          </p>
        </div>
      </HoverCard.Content>
    </HoverCard>
  ),
}
