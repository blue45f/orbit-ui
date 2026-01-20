import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Calendar } from './Calendar'

const meta = {
  title: 'eclipse/Inputs/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border border-slate-200 dark:border-slate-800"
        />
        <p className="text-sm text-slate-500">선택된 날짜: {date?.toLocaleDateString()}</p>
      </div>
    )
  },
}
