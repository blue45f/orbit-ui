import { AwesomeIcon } from '@ui-forge/icons'
import { Meta, StoryObj } from '@storybook/react'

import { Tab } from './Tab'

Tab.displayName = 'Tab'
Tab.Leading.displayName = 'Tab.Leading'
Tab.Center.displayName = 'Tab.Center'
Tab.Trailing.displayName = 'Tab.Trailing'

const meta = {
  title: 'mint/Tabs/Tab',
  component: Tab,
  tags: ['autodocs'],
  args: {
    selected: false,
  },
} satisfies Meta<typeof Tab>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  args: {
    value: '기본탭',
  },
  render: (args) => {
    return (
      <Tab {...args}>
        <Tab.Leading>
          <AwesomeIcon size={24} />
        </Tab.Leading>
        <Tab.Center>{args.value}</Tab.Center>
      </Tab>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    value: '기본탭',
    leading: true,
    trailing: true,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ leading, trailing, ...args }: any) => {
    return (
      <Tab {...args}>
        {leading && (
          <Tab.Leading>
            <AwesomeIcon size={24} />
          </Tab.Leading>
        )}
        <Tab.Center>{args.value}</Tab.Center>
        {trailing && (
          <Tab.Trailing>
            <AwesomeIcon size={24} />
          </Tab.Trailing>
        )}
      </Tab>
    )
  },
}
