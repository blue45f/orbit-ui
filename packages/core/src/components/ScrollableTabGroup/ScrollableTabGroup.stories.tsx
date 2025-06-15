import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { ScrollableTabGroup } from '../..'

ScrollableTabGroup.displayName = 'ScrollableTabGroup'
ScrollableTabGroup.TabLeading.displayName = 'ScrollableTabGroupTabLeading'
ScrollableTabGroup.TabCenter.displayName = 'ScrollableTabGroupTabCenter'
ScrollableTabGroup.TabTrailing.displayName = 'ScrollableTabGroupTabTrailing'

const meta = {
  title: 'foundation/ScrollableTabGroup',
  component: ScrollableTabGroup,
  tags: ['autodocs'],
  argTypes: {
    onTabChange: { action: 'changed' },
  },
} satisfies Meta<typeof ScrollableTabGroup>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  args: {
    selectedIndex: 3,
  },
  argTypes: {
    selectedIndex: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  },
  render: (args) => (
    <div style={{ width: '320px', height: '700px', border: '1px solid #ccc' }}>
      <ScrollableTabGroup {...args}>
        <ScrollableTabGroup.ActiveIndicator />
        <ScrollableTabGroup.Tab value="tab1">
          <ScrollableTabGroup.TabLeading>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0L16 8L14 10L8 4L2 10L0 8L8 0Z" />
              <path d="M2 8V16H6V12H10V16H14V8L8 2L2 8Z" />
            </svg>
          </ScrollableTabGroup.TabLeading>
          <ScrollableTabGroup.TabCenter>Home</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="tab2">
          <ScrollableTabGroup.TabCenter>Something Special Products</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="tab3">
          <ScrollableTabGroup.TabCenter>About</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="tab4">
          <ScrollableTabGroup.TabCenter>Contact</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="tab5">
          <ScrollableTabGroup.TabCenter>Food</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="tab6">
          <ScrollableTabGroup.TabCenter>Commerce</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="tab7">
          <ScrollableTabGroup.TabCenter>Sample Store</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="tab8">
          <ScrollableTabGroup.TabCenter>Shop</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="tab9">
          <ScrollableTabGroup.TabLeading>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </ScrollableTabGroup.TabLeading>
          <ScrollableTabGroup.TabCenter>Shopping</ScrollableTabGroup.TabCenter>
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
        </ScrollableTabGroup.Tab>
        <ScrollableTabGroup.Tab value="tab10">
          <ScrollableTabGroup.TabCenter>Growth</ScrollableTabGroup.TabCenter>
        </ScrollableTabGroup.Tab>
      </ScrollableTabGroup>
    </div>
  ),
}

export const 제어: Story = {
  render: function Controlled(args) {
    const [selectedIndex, setSelectedIndex] = useState(1)

    const handleTabChange = (newIndex: number) => {
      setSelectedIndex(newIndex)
      args.onTabChange?.(newIndex)
    }

    return (
      <div style={{ width: '320px', height: '700px', border: '1px solid #ccc' }}>
        <ScrollableTabGroup {...args} selectedIndex={selectedIndex} onTabChange={handleTabChange}>
          <ScrollableTabGroup.ActiveIndicator />
          <ScrollableTabGroup.Tab value="tab1">
            <ScrollableTabGroup.TabCenter>Tab 1</ScrollableTabGroup.TabCenter>
          </ScrollableTabGroup.Tab>
          <ScrollableTabGroup.Tab value="tab2">
            <ScrollableTabGroup.TabCenter>Tab 2</ScrollableTabGroup.TabCenter>
          </ScrollableTabGroup.Tab>
          <ScrollableTabGroup.Tab value="tab3">
            <ScrollableTabGroup.TabCenter>Tab 3</ScrollableTabGroup.TabCenter>
          </ScrollableTabGroup.Tab>
        </ScrollableTabGroup>

        <div style={{ fontSize: '14px', color: '#666' }}>Selected index: {selectedIndex}</div>
      </div>
    )
  },
}
