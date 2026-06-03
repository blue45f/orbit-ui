import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { Progress } from './Progress'

const meta = {
  title: 'core/Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    value: 60,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Progress {...args} className="w-72" />,
}

const AnimatedExample = () => {
  const [value, setValue] = useState(10)
  useEffect(() => {
    const id = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 10))
    }, 700)
    return () => clearInterval(id)
  }, [])
  return <Progress value={value} className="w-72" />
}

export const Animated: Story = {
  render: () => <AnimatedExample />,
}
