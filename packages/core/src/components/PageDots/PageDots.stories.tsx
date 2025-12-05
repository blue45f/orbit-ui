import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { PageDots } from './PageDots'

PageDots.displayName = 'PageDots'

const meta = {
  title: 'foundation/PageDots',
  component: PageDots,
  args: {
    disabled: false,
    size: 6,
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof PageDots>

type Story = StoryObj<typeof meta>

export default meta

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

export const 비제어 = {
  render: function Uncontrolled(args) {
    return <PageDots {...args} />
  },
} satisfies Story

export const 선택됨 = {
  args: {
    selected: true,
  },
} satisfies Story

export const 선택안됨 = {
  args: {
    selected: false,
  },
} satisfies Story

export const 비활성화_선택됨 = {
  args: {
    selected: true,
    disabled: true,
  },
} satisfies Story

export const 비활성화_선택안됨 = {
  args: {
    selected: false,
    disabled: true,
  },
} satisfies Story

export const 크기_변경 = {
  render: function SizeVariants(args) {
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <PageDots {...args} size={6} selected />
        <PageDots {...args} size={9} selected />
        <PageDots {...args} size={12} selected />
        <PageDots {...args} size={16} selected />
      </div>
    )
  },
} satisfies Story

export const 모든_상태 = {
  render: function AllStates() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3>Unselected</h3>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div>
              <div>Enabled</div>
              <PageDots selected={false} />
            </div>
            <div>
              <div>Disabled</div>
              <PageDots selected={false} disabled />
            </div>
          </div>
        </div>
        <div>
          <h3>Selected</h3>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div>
              <div>Enabled</div>
              <PageDots selected={true} />
            </div>
            <div>
              <div>Disabled</div>
              <PageDots selected={true} disabled />
            </div>
          </div>
        </div>
      </div>
    )
  },
} satisfies Story
