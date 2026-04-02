import { Meta, StoryObj } from '@storybook/react'

import { Flex } from '../primitives'

import { Divider } from './Divider'
Divider.displayName = 'Divider'

const meta = {
  title: 'foundation/Divider',
  component: Divider,
  args: {},
} satisfies Meta<typeof Divider>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => <Divider {...args} />,
} satisfies Story

export const 디자인_QA = {
  args: {
    children: '커스텀',
  },
  // eslint-disable-next-line
  render: ({ children }: any) => {
    return (
      <>
        <Flex flexDirection='column' rowGap='15px'>
          <Divider thickness={1} color='gray' />
          <Divider thickness={3} color='gray' />
          <Divider thickness={2} color='gray' />
        </Flex>
        <Flex columnGap='15px' style={{ height: 40, marginTop: 40 }}>
          <Divider orientation='vertical' thickness={1} color='gray' />
          <Divider orientation='vertical' thickness={3} color='gray' />
          <Divider orientation='vertical' thickness={2} color='gray' />
        </Flex>
      </>
    )
  },
}
