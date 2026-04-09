import type { Meta, StoryObj } from '@storybook/react'

import { HoverCard } from './HoverCard'
import { Avatar } from '../Avatar'
import { Typography } from '../Text'

const meta = {
  title: 'eclipse/4. Feedback/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <HoverCard>
        <HoverCard.Trigger asChild>
          <a
            href="https://github.com/blue45f/ui-forge"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold underline underline-offset-4 hover:text-slate-500"
          >
            @orbit-ui
          </a>
        </HoverCard.Trigger>
        <HoverCard.Content className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <Avatar.Image src="https://github.com/github.png" />
              <Avatar.Fallback>GH</Avatar.Fallback>
            </Avatar>
            <div className="space-y-1">
              <Typography textStyle="subheadingSmall">Orbit UI</Typography>
              <Typography textStyle="descriptionLarge" className="text-slate-500">
                2026년을 위한 모던 React 디자인 시스템 프레임워크입니다.
              </Typography>
              <div className="flex items-center pt-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Joined December 2024
                </span>
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard>
    </div>
  ),
}
