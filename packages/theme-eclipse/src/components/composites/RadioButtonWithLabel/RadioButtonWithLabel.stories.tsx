import { Flex } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from '../RadioGroup'

import { RadioButtonWithLabel } from './RadioButtonWithLabel'

RadioButtonWithLabel.displayName = 'RadioButtonWithLabel'

const meta = {
  title: 'eclipse/Inputs/Selection/RadioButtonWithLabel',
  component: RadioButtonWithLabel,
  args: {
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioButtonWithLabel>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => {
    return (
      <RadioGroup defaultValue="foundation" name="color">
        <Flex rowGap="25px" flexDirection={'column'}>
          <RadioButtonWithLabel {...args} value="blue" alignItems="center">
            인디고
          </RadioButtonWithLabel>
          <RadioButtonWithLabel {...args} value="foundation" disabled>
            파운데이션
          </RadioButtonWithLabel>
          <RadioButtonWithLabel {...args} value="primary">
            에메랄드
          </RadioButtonWithLabel>
        </Flex>
      </RadioGroup>
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
      description: '라디오 그룹 내부 라디오 배치 방식',
    },
    rowGap: {
      control: 'text',
      description: '라디오 그룹 내부 라디오 간격',
    },
    columnGap: {
      control: 'text',
      description: '라디오 그룹 내부 라디오 간격',
    },
    labelText: {
      control: 'text',
      description: '두 번째 라디오 라벨 텍스트',
    },
    disabledAll: {
      control: 'boolean',
      description: '라디오 그룹 전체 비활성화 여부',
    },
    disabledSecond: {
      control: 'boolean',
      description: '두 번째 라디오 비활성화 여부',
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <RadioGroup defaultValue="blue" name="color" {...args} disabled={args.disabledAll}>
      <div style={{ marginBottom: '25px' }}>첫 번째 라디오는 라벨이 없어요</div>
      <Flex rowGap={args.rowGap} columnGap={args.columnGap} flexDirection={args.flexDirection}>
        <Flex columnGap="10px">
          <RadioButtonWithLabel {...args} value="blue" />
        </Flex>
        <Flex columnGap="10px">
          <RadioButtonWithLabel {...args} value="foundation" disabled={args.disabledSecond}>
            {args.labelText}
          </RadioButtonWithLabel>
        </Flex>
        <Flex columnGap="10px">
          <RadioButtonWithLabel {...args} value="primary">
            에메랄드
          </RadioButtonWithLabel>
        </Flex>
      </Flex>
    </RadioGroup>
  ),
}
