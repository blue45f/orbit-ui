import { CheckIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'

import { SegmentedControl } from './SegmentedControl'

SegmentedControl.displayName = 'SegmentedControl'
SegmentedControl.Tab.displayName = 'SegmentedControl.Tab'
SegmentedControl.TabLeading.displayName = 'SegmentedControl.TabLeading'
SegmentedControl.TabCenter.displayName = 'SegmentedControl.TabCenter'
SegmentedControl.TabTrailing.displayName = 'SegmentedControl.TabTrailing'

const meta = {
  title: 'eclipse/Inputs/Selection/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedControl>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render() {
    return (
      <SegmentedControl defaultValue="blue">
        <SegmentedControl.Tab value="blue">
          <SegmentedControl.TabCenter>Indigo</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="foundation">
          <SegmentedControl.TabCenter>Foundation</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
        <SegmentedControl.Tab value="eclipse">
          <SegmentedControl.TabCenter>Eclipse</SegmentedControl.TabCenter>
        </SegmentedControl.Tab>
      </SegmentedControl>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    defaultValue: 'blue',
    tabCount: 3,
    hasLeading: false,
    hasCenter: true,
    hasTrailing: false,
  },
  argTypes: {
    tabCount: {
      control: 'radio',
      options: [1, 2, 3, 4],
    },
    hasLeading: {
      control: 'boolean',
    },
    hasCenter: {
      control: 'boolean',
    },
    hasTrailing: {
      control: 'boolean',
    },
  },
  // eslint-disable-next-line
  render: ({ tabCount, hasLeading, hasCenter, hasTrailing, defaultValue, ...rest }: any) => {
    const tabs = Array.from({ length: tabCount || 3 }, (_, i) => {
      const value = ['blue', 'foundation', 'ocean', 'green'][i] || `tab${i}`
      const label = ['Indigo', 'Foundation', 'Eclipse', 'Green'][i] || `Tab ${i + 1}`

      return (
        <SegmentedControl.Tab key={value} value={value}>
          {hasLeading && (
            <SegmentedControl.TabLeading>
              <CheckIcon size={16} />
            </SegmentedControl.TabLeading>
          )}
          {hasCenter && <SegmentedControl.TabCenter>{label}</SegmentedControl.TabCenter>}
          {hasTrailing && (
            <SegmentedControl.TabTrailing>
              <CheckIcon size={16} />
            </SegmentedControl.TabTrailing>
          )}
        </SegmentedControl.Tab>
      )
    })

    return (
      <SegmentedControl {...rest} defaultValue={defaultValue || 'blue'}>
        {tabs}
      </SegmentedControl>
    )
  },
}
