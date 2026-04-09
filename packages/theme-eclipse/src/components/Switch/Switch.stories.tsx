import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from './Switch'
import { Typography } from '../Text'

const meta = {
  title: 'eclipse/Inputs/Selection/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Switch id="airplane-mode" />
      <Typography as="label" htmlFor="airplane-mode" textStyle="descriptionLarge">
        비행기 모드
      </Typography>
    </div>
  ),
}
