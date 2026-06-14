import { useState } from 'react'

import { Calendar } from './Calendar'

import type { Meta, StoryObj } from '@storybook/react'
import type { DateRange } from 'react-day-picker'

const meta = {
  title: 'core/Data Entry/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'single',
  },
}

const SingleSelectExample = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={selected} onSelect={setSelected} />
}

export const SingleSelection: Story = {
  render: () => <SingleSelectExample />,
}

const RangeSelectExample = () => {
  const [range, setRange] = useState<DateRange | undefined>()
  return <Calendar mode="range" selected={range} onSelect={setRange} />
}

export const RangeSelection: Story = {
  render: () => <RangeSelectExample />,
}
