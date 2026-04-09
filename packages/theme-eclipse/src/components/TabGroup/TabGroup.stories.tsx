import { Meta, StoryObj } from '@storybook/react'

import { FixedTabs } from './TabGroup'

const meta = {
  title: 'eclipse/1. Actions/Tabs/FixedTabs',
  component: FixedTabs,
  tags: ['autodocs'],
} satisfies Meta<typeof FixedTabs>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render() {
    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <FixedTabs defaultValue="blue">
          <FixedTabs.Tab value="blue">
            <FixedTabs.TabCenter>Blue</FixedTabs.TabCenter>
          </FixedTabs.Tab>
          <FixedTabs.Tab value="foundation">
            <FixedTabs.TabCenter>Foundation</FixedTabs.TabCenter>
          </FixedTabs.Tab>
          <FixedTabs.Tab value="eclipse">
            <FixedTabs.TabCenter>Eclipse</FixedTabs.TabCenter>
          </FixedTabs.Tab>
        </FixedTabs>
      </div>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    tabCount: 3,
    defaultValue: 'tab-0',
  },
  argTypes: {
    tabCount: {
      control: 'number',
      min: 1,
      max: 5,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  render({ tabCount, defaultValue }: any) {
    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <FixedTabs defaultValue={defaultValue}>
          {Array.from({ length: tabCount }).map((_, index) => (
            <FixedTabs.Tab key={index} value={`tab-${index}`}>
              <FixedTabs.TabCenter>Tab {index + 1}</FixedTabs.TabCenter>
            </FixedTabs.Tab>
          ))}
        </FixedTabs>
      </div>
    )
  },
}
