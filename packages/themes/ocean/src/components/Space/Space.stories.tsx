/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { utils } from '@prism-ui/core'
import { Meta } from '@storybook/react'

import { OutlinedButton } from '../OutlineButton'

import { Space, SpaceProps } from './Space'

Space.displayName = 'Space'

const meta = {
  title: 'mint/Space',
  component: Space,
  args: {},
  argTypes: {
    x: { control: 'select', options: utils.tokenKeysOf('spacing') },
    y: { control: 'select', options: utils.tokenKeysOf('spacing') },
  },
} satisfies Meta<typeof Space>

export default meta

export const 가로_간격 = {
  args: {
    x: utils.tokenKeysOf('spacing')[1],
  },
  render: (args: SpaceProps) => (
    <div style={{ display: 'flex' }}>
      <OutlinedButton color='black' size='medium'>
        버튼1
      </OutlinedButton>
      <Space {...args} />
      <OutlinedButton color='black' size='medium'>
        버튼2
      </OutlinedButton>
    </div>
  ),
}

export const 세로_간격 = {
  args: {
    y: utils.tokenKeysOf('spacing')[1],
  },
  render: (args: SpaceProps) => (
    <div>
      <OutlinedButton color='black' size='medium'>
        버튼1
      </OutlinedButton>
      <Space {...args} />
      <OutlinedButton color='black' size='medium'>
        버튼2
      </OutlinedButton>
    </div>
  ),
}

export const 디자인_QA = {
  args: {
    y: utils.tokenKeysOf('spacing')[1],
  },
  render: (args: SpaceProps) => {
    if (args.x) {
      return (
        <div style={{ display: 'flex' }}>
          <OutlinedButton color='black' size='medium'>
            버튼1
          </OutlinedButton>
          <Space {...args} />
          <OutlinedButton color='black' size='medium'>
            버튼2
          </OutlinedButton>
        </div>
      )
    }

    return (
      <div>
        <OutlinedButton color='black' size='medium'>
          버튼1
        </OutlinedButton>
        <Space {...args} />
        <OutlinedButton color='black' size='medium'>
          버튼2
        </OutlinedButton>
      </div>
    )
  },
}
