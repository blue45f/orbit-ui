import { Flex } from '@orbit-ui/core'
import { Meta, StoryObj } from '@storybook/react'

import { CheckboxWithLabel } from './CheckboxWithLabel'

CheckboxWithLabel.displayName = 'CheckboxWithLabel'

const meta = {
  title: 'eclipse/Composites/CheckboxWithLabel',
  component: CheckboxWithLabel,
  args: {
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof CheckboxWithLabel>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => {
    return (
      <Flex rowGap="25px" flexDirection={'column'}>
        <CheckboxWithLabel {...args} value="blue" alignItems="center">
          블루
        </CheckboxWithLabel>
        <CheckboxWithLabel {...args} value="foundation" disabled>
          파운데이션
        </CheckboxWithLabel>
        <CheckboxWithLabel {...args} value="mint">
          민트
        </CheckboxWithLabel>
      </Flex>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    disabledAll: false,
    disabledSecond: false,
    flexDirection: 'column',
    rowGap: '25px',
    columnGap: '25px',
    labelText: '파운데이션',
  },
  argTypes: {
    disabled: {
      control: 'never',
    },
    flexDirection: {
      control: 'select',
      options: ['row', 'column'],
      description: '체크박스 배치 방식',
    },
    rowGap: {
      control: 'text',
      description: '체크박스 간격',
    },
    columnGap: {
      control: 'text',
      description: '체크박스 간격',
    },
    labelText: {
      control: 'text',
      description: '두 번째 체크박스 라벨 텍스트',
    },
    disabledAll: {
      control: 'boolean',
      description: '전체 비활성화 여부',
    },
    disabledSecond: {
      control: 'boolean',
      description: '두 번째 체크박스 비활성화 여부',
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <>
      <div style={{ marginBottom: '25px' }}>첫 번째 체크박스는 라벨이 없어요</div>
      <Flex rowGap={args.rowGap} columnGap={args.columnGap} flexDirection={args.flexDirection}>
        <Flex columnGap="10px">
          <CheckboxWithLabel {...args} value="blue" />
        </Flex>
        <Flex columnGap="10px">
          <CheckboxWithLabel
            {...args}
            value="foundation"
            disabled={args.disabledSecond}
            labelText={args.labelText}
          >
            파운데이션
          </CheckboxWithLabel>
        </Flex>
        <Flex columnGap="10px">
          <CheckboxWithLabel {...args} value="mint">
            민트
          </CheckboxWithLabel>
        </Flex>
      </Flex>
    </>
  ),
}
