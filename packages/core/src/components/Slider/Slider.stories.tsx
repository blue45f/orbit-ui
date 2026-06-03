import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './Slider'

const meta = {
  title: 'core/Data Entry/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    'aria-label': '값',
  },
  render: (args) => <Slider {...args} className="w-72" />,
}

export const Range: Story = {
  args: {
    defaultValue: [20, 80],
    max: 100,
    step: 1,
  },
  render: (args) => <Slider {...args} className="w-72" />,
}

export const Disabled: Story = {
  args: {
    defaultValue: [40],
    max: 100,
    disabled: true,
    'aria-label': '비활성 값',
  },
  render: (args) => <Slider {...args} className="w-72" />,
}
