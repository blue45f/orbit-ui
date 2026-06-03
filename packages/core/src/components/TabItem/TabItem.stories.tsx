import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { TabItem } from './TabItem'

const meta = {
  title: 'core/Navigation/TabItem',
  component: TabItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TabItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '탭',
    selected: true,
  },
}

export const States: Story = {
  render: () => (
    <div role="tablist" className="flex gap-2">
      <TabItem selected>선택됨</TabItem>
      <TabItem>기본</TabItem>
      <TabItem disabled>비활성</TabItem>
    </div>
  ),
}

const InteractiveExample = () => {
  const tabs = ['홈', '검색', '프로필']
  const [active, setActive] = useState(0)
  return (
    <div role="tablist" className="flex gap-2">
      {tabs.map((label, index) => (
        <TabItem key={label} selected={active === index} onClick={() => setActive(index)}>
          {label}
        </TabItem>
      ))}
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveExample />,
}
