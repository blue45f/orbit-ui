import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Calendar } from './Calendar'

const meta = {
  title: 'eclipse/Inputs/Pickers/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

const StoryWrapper = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: 'fit-content' }}>
    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'inherit', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {title}
    </h4>
    {children}
  </div>
)

export const 기본: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
        <StoryWrapper title="Single Select">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
          />
          <p style={{ fontSize: '14px', marginTop: '0.5rem', fontWeight: 500 }}>
            Selected: <span style={{ color: 'var(--sem-eclipse-color-systemMainPrimary)' }}>{date?.toLocaleDateString() || 'None'}</span>
          </p>
        </StoryWrapper>

        <StoryWrapper title="Multiple Select">
          <Calendar
            mode="multiple"
          />
        </StoryWrapper>
      </div>
    )
  },
}

export const 범위선택: Story = {
  render: function Render() {
    return (
      <StoryWrapper title="Range Selection">
        <Calendar
          mode="range"
          numberOfMonths={2}
        />
      </StoryWrapper>
    )
  }
}
