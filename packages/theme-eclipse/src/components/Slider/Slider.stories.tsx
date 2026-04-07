import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './Slider'

const meta = {
  title: 'eclipse/Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Slider {...args} />
    </div>
  ),
}
