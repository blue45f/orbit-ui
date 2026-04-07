import { Meta, StoryObj } from '@storybook/react'

import { Flex, FlexItem } from './Flex'
import * as styles from './Flex.stories.css'

Flex.displayName = 'Flex'

const meta = {
  title: 'utils/Flex',
  component: Flex,
  args: {
    justifyContent: 'normal',
    alignItems: 'normal',
    flexDirection: 'row',
    alignContent: 'normal',
    flexWrap: 'nowrap',
    children: '안녕하세요',
    inline: false,
  },
  argTypes: {
    flexDirection: {
      control: 'inline-radio',
      options: ['column', 'row', 'row-reverse', 'column-reverse'],
    },
    justifyContent: {
      control: 'inline-radio',
      options: [
        'normal',
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
        'stretch',
      ],
    },
    alignItems: {
      control: 'inline-radio',
      options: ['normal', 'flex-start', 'center', 'flex-end', 'stretch'],
    },
    alignContent: {
      control: 'inline-radio',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'stretch'],
    },
    flexWrap: {
      control: 'inline-radio',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
  },
  parameters: {
    controls: {
      exclude: ['gap'],
    },
  },
} satisfies Meta<typeof Flex>

type Story = StoryObj<typeof meta>

export default meta

const COLORS = ['#83E8E2', '#A396FF', '#77BBFF']

export const 기본 = {
  render: (args) => (
    <Flex {...args} className={styles.container}>
      {COLORS.map((color, i) => (
        <div
          key={color}
          className={styles.content}
          style={{
            backgroundColor: color,
          }}
        >
          Box{i + 1}
        </div>
      ))}
    </Flex>
  ),
} satisfies Story

export const 중첩 = {
  render: () => (
    <>
      <style>
        {`.outer {
          background: lime;
          padding: 10px;
          position: relative;
        }
        .outer::before {
          content: '';
          height: 1px;
          background: red;
          display: block;
          position: absolute;
          top: 9px;
          right: 0;
          left: 0;
        }
        .inner {
          background: aliceblue;
        }
        `}
      </style>
      <Flex className="outer" flexDirection="column" rowGap="6px" columnGap="6px">
        <Flex className="inner" flexDirection="column" rowGap="12px" columnGap="12px">
          <div>01</div>
          <div>02</div>
          <div>03</div>
        </Flex>
        <Flex className="inner" flexDirection="column" rowGap="12px" columnGap="12px">
          <div>04</div>
          <div>05</div>
          <div>06</div>
        </Flex>
      </Flex>
      <div style={{ height: '30px' }} />
      <Flex className="outer" flexDirection="column" rowGap="6px" columnGap="6px">
        <Flex className="inner" flexDirection="column" rowGap="12px" columnGap="12px">
          <div>01 (구버전)</div>
          <div>02</div>
          <div>03</div>
        </Flex>
        <Flex className="inner" flexDirection="column" rowGap="12px" columnGap="12px">
          <div>04</div>
          <div>05</div>
          <div>06</div>
        </Flex>
      </Flex>
    </>
  ),
} satisfies Story

export const 아이템 = {
  render: (args) => {
    return (
      <Flex {...args} className={styles.container}>
        <FlexItem style={{ background: 'blue' }}>아이템 1</FlexItem>
        <FlexItem style={{ background: 'red' }} flexGrow={1}>
          아이템 2
        </FlexItem>
        <FlexItem style={{ background: 'yellow' }} flexGrow={2}>
          아이템 3
        </FlexItem>
      </Flex>
    )
  },
} satisfies Story
