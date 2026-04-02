import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { TabItems } from '../..'

const meta = {
  title: 'foundation/TabItems',
  component: TabItems,
  tags: ['autodocs'],
  argTypes: {
    onTabChange: { action: 'changed' },
  },
} satisfies Meta<typeof TabItems>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args) => (
    <div style={{ width: '100%' }}>
      <TabItems {...args}>
        <TabItems.ActiveIndicator />
        <TabItems.Tab value='tab1'>
          <TabItems.TabCenter>Home</TabItems.TabCenter>
        </TabItems.Tab>
        <TabItems.Tab value='tab2'>
          <TabItems.TabCenter>
            Products Products Products Products Products Products Products Products Products Products
          </TabItems.TabCenter>
        </TabItems.Tab>
        <TabItems.Tab value='tab3'>
          <TabItems.TabCenter>About</TabItems.TabCenter>
        </TabItems.Tab>
        <TabItems.Tab value='tab4'>
          <TabItems.TabCenter>Contact</TabItems.TabCenter>
        </TabItems.Tab>
      </TabItems>
    </div>
  ),
}

export const 제어: Story = {
  render: function Controlled(args) {
    const [selectedIndex, setSelectedIndex] = useState(1)

    const handleTabChange = (index: number) => {
      setSelectedIndex(index)
      args.onTabChange?.(index)
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TabItems {...args} selectedIndex={selectedIndex} onTabChange={handleTabChange}>
          <TabItems.ActiveIndicator />
          <TabItems.Tab value='tab1'>
            <TabItems.TabCenter>Tab 1</TabItems.TabCenter>
          </TabItems.Tab>
          <TabItems.Tab value='tab2'>
            <TabItems.TabCenter>Tab 2</TabItems.TabCenter>
          </TabItems.Tab>
          <TabItems.Tab value='tab3'>
            <TabItems.TabCenter>Tab 3</TabItems.TabCenter>
          </TabItems.Tab>
        </TabItems>

        <div style={{ fontSize: '14px', color: '#666' }}>Selected index: {selectedIndex}</div>
      </div>
    )
  },
}

export const 아이콘: Story = {
  render: (args) => (
    <TabItems {...args}>
      <TabItems.ActiveIndicator />
      <TabItems.Tab value='home'>
        <TabItems.TabLeading>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
            <path d='M8 0L16 8L14 10L8 4L2 10L0 8L8 0Z' />
            <path d='M2 8V16H6V12H10V16H14V8L8 2L2 8Z' />
          </svg>
        </TabItems.TabLeading>
        <TabItems.TabCenter>Home</TabItems.TabCenter>
      </TabItems.Tab>

      <TabItems.Tab value='search'>
        <TabItems.TabLeading>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
          </svg>
        </TabItems.TabLeading>
        <TabItems.TabCenter>Search</TabItems.TabCenter>
      </TabItems.Tab>

      <TabItems.Tab value='profile'>
        <TabItems.TabLeading>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
          </svg>
        </TabItems.TabLeading>
        <TabItems.TabCenter>Profile</TabItems.TabCenter>
      </TabItems.Tab>
    </TabItems>
  ),
}

export const 배지: Story = {
  render: (args) => (
    <TabItems {...args}>
      <TabItems.ActiveIndicator />
      <TabItems.Tab value='messages'>
        <TabItems.TabCenter>Messages</TabItems.TabCenter>
        <TabItems.TabTrailing>
          <span
            style={{
              backgroundColor: '#ff4444',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          >
            5
          </span>
        </TabItems.TabTrailing>
      </TabItems.Tab>

      <TabItems.Tab value='notifications'>
        <TabItems.TabCenter>Notifications</TabItems.TabCenter>
        <TabItems.TabTrailing>
          <span
            style={{
              backgroundColor: '#ff4444',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          >
            12
          </span>
        </TabItems.TabTrailing>
      </TabItems.Tab>

      <TabItems.Tab value='settings'>
        <TabItems.TabCenter>Settings</TabItems.TabCenter>
      </TabItems.Tab>
    </TabItems>
  ),
}
