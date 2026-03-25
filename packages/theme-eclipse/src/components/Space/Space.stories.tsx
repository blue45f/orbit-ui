/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Meta } from '@storybook/react'

import { vars } from '../../styles/theme.css'
import { OutlinedButton } from '../OutlineButton'

import { Space, SpaceProps, Spacing } from './Space'

Space.displayName = 'Space'

const spacingKeys = Object.keys(vars.ref.spacing) as Spacing[]

const meta = {
  title: 'eclipse/Layout/Space',
  component: Space,
  args: {},
  argTypes: {
    x: { control: 'select', options: spacingKeys },
    y: { control: 'select', options: spacingKeys },
  },
} satisfies Meta<typeof Space>

export default meta

export const 가로_간격 = {
  args: {
    x: spacingKeys[1],
  },
  render: (args: SpaceProps) => (
    <div style={{ display: 'flex' }}>
      <OutlinedButton color="black" size="medium">
        버튼1
      </OutlinedButton>
      <Space {...args} />
      <OutlinedButton color="black" size="medium">
        버튼2
      </OutlinedButton>
    </div>
  ),
}

export const 세로_간격 = {
  args: {
    y: spacingKeys[1],
  },
  render: (args: SpaceProps) => (
    <div>
      <OutlinedButton color="black" size="medium">
        버튼1
      </OutlinedButton>
      <Space {...args} />
      <OutlinedButton color="black" size="medium">
        버튼2
      </OutlinedButton>
    </div>
  ),
}

export const 디자인_QA = {
  args: {
    y: spacingKeys[1],
  },
  render: (args: SpaceProps) => {
    if (args.x) {
      return (
        <div style={{ display: 'flex' }}>
          <OutlinedButton color="black" size="medium">
            버튼1
          </OutlinedButton>
          <Space {...args} />
          <OutlinedButton color="black" size="medium">
            버튼2
          </OutlinedButton>
        </div>
      )
    }

    return (
      <div>
        <OutlinedButton color="black" size="medium">
          버튼1
        </OutlinedButton>
        <Space {...args} />
        <OutlinedButton color="black" size="medium">
          버튼2
        </OutlinedButton>
      </div>
    )
  },
}
