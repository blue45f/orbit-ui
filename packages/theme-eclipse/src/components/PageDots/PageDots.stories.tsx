import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { PageDots } from './PageDots'

const meta = {
  title: 'eclipse/Navigation/PageDots',
  component: PageDots,
  args: {
    selected: false,
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof PageDots>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {} satisfies Story

export const 선택됨 = {
  args: {
    selected: true,
  },
} satisfies Story

export const 제어 = {
  render: function Controlled({ onClick, ...rest }) {
    const [selected, setSelected] = useState(false)

    return (
      <PageDots
        {...rest}
        selected={selected}
        onClick={(e) => {
          onClick?.(e)
          setSelected(!selected)
        }}
      />
    )
  },
} satisfies Story

export const 여러_개 = {
  render: function Multiple() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const total = 5

    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, index) => (
          <PageDots
            key={index}
            selected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    )
  },
} satisfies Story

export const 상태_비교 = {
  render: function StateComparison() {
    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Unselected</p>
          <PageDots selected={false} />
        </div>

        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Selected</p>
          <PageDots selected={true} />
        </div>
      </div>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    selected: false,
    disabled: false,
  },
  // eslint-disable-next-line
  render: (args: any) => {
    return <PageDots {...args} />
  },
} satisfies Story
