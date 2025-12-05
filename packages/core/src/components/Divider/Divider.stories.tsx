import { Meta, StoryObj } from '@storybook/react'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import { Flex } from '../primitives'

import { Divider } from './Divider'
import * as styles from './Divider.css'
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
    const style = assignInlineVars({
      [styles.dividerVars.borderColor]: 'gray',
    })

    return (
      <>
        <Flex flexDirection='column' rowGap='15px'>
          <Divider thickness={1} style={style} />
          <Divider thickness={3} style={style} />
          <Divider thickness={2} style={style} />
        </Flex>
        <Flex columnGap='15px' style={{ height: 40, marginTop: 40 }}>
          <Divider orientation='vertical' thickness={1} style={style} />
          <Divider orientation='vertical' thickness={3} style={style} />
          <Divider orientation='vertical' thickness={2} style={style} />
        </Flex>
      </>
    )
  },
}
