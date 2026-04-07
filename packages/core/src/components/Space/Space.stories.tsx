import { Meta, StoryObj } from '@storybook/react'

import { Space } from './Space'

const meta = {
  title: 'foundation/Space',
  component: Space,
  args: {
    x: '30px',
    y: '45px',
  },
} satisfies Meta<typeof Space>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => {
    const border = '2px solid rgb(253, 124, 124)'
    return (
      <div style={{ display: 'flex', flexDirection: 'column', margin: 12 }}>
        <h3>Case 1. 가로 간격 예시</h3>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ backgroundColor: '#f6f6f6', width: '100%' }} />
          <div style={{ border }}>
            <Space {...args} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f6f6f6',
              width: '100%',
            }}
          >
            각 요소와 {args.x} 간격이에요
          </div>
          <div style={{ border }}>
            <Space {...args} />
          </div>
          <div style={{ backgroundColor: '#f6f6f6', width: '100%' }} />
        </div>
        <h3 style={{ marginTop: 36 }}>Case 2. 세로 간격 예시</h3>
        <div
          style={{
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f6f6f6',
            height: '100%',
          }}
        >
          행의 요소와 {args.y} 간격을 가져요
        </div>
        <div style={{ border }}>
          <Space {...args} />
        </div>
        <div
          style={{
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f6f6f6',
            height: '100%',
          }}
        >
          행의 요소와 {args.y} 간격을 가져요
        </div>
      </div>
    )
  },
} satisfies StoryObj<typeof meta>

export const 디자인_QA: Story = {
  // eslint-disable-next-line
  render: (args) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid red' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ backgroundColor: 'lightgreen', width: '100%' }}>
            우측 요소와 {args.x} 간격이에요
          </div>
          <Space {...args} />
          <div style={{ backgroundColor: 'green', width: '100%' }} />
        </div>
        <Space {...args} />
        <div style={{ backgroundColor: 'lightblue', height: '100%' }}>
          위의 행의 요소와 {args.y} 간격을 가져요
        </div>
      </div>
    )
  },
} satisfies StoryObj<typeof meta>
