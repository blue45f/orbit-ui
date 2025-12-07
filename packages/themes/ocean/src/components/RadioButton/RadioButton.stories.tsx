import { Flex } from '@prism-ui/core'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { RadioButton } from './RadioButton'

RadioButton.displayName = 'RadioButton'

const meta = {
  title: 'mint/RadioButton',
  component: RadioButton,
  args: {
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioButton>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: function Render(args) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role='radiogroup'>
        <RadioButton
          {...args}
          value='blue'
          name='color'
          checked={selected === 'blue'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <RadioButton
          {...args}
          value='foundation'
          name='color'
          checked={selected === 'foundation'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <RadioButton {...args} value='mint' checked={selected === 'mint'} onChange={(e) => setSelected(e.target.value)} />
      </fieldset>
    )
  },
} satisfies Story

export const 테마_재정의 = {
  render: function Render(args) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role='radiogroup'>
        <RadioButton
          {...args}
          checked={selected === 'blue'}
          onChange={(e) => setSelected(e.target.value)}
          theme={{
            enabledSelectedForegroundColor: 'red',
          }}
          value='blue'
        />
        <RadioButton
          {...args}
          value='foundation'
          checked={selected === 'foundation'}
          onChange={(e) => setSelected(e.target.value)}
          theme={{
            enabledSelectedForegroundColor: 'red',
          }}
        />
        <RadioButton
          {...args}
          value='mint'
          checked={selected === 'mint'}
          onChange={(e) => setSelected(e.target.value)}
          theme={{
            enabledSelectedForegroundColor: 'red',
          }}
        />
      </fieldset>
    )
  },
} satisfies Story

export const 라벨_추가 = {
  render: function Render(args) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role='radiogroup'>
        <Flex rowGap='25px' flexDirection={'column'}>
          <Flex columnGap='10px'>
            <RadioButton
              {...args}
              value='blue'
              id='blue'
              checked={selected === 'blue'}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label htmlFor='blue'>블루</label>
          </Flex>
          <Flex columnGap='10px'>
            <RadioButton
              {...args}
              value='foundation'
              disabled
              id='foundation'
              checked={selected === 'foundation'}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label htmlFor='foundation'>파운데이션</label>
          </Flex>
          <Flex columnGap='10px'>
            <RadioButton
              {...args}
              value='mint'
              id='mint'
              checked={selected === 'mint'}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label htmlFor='mint'>민트</label>
          </Flex>
        </Flex>
      </fieldset>
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
  render: function Render(args: any) {
    const [selected, setSelected] = useState('blue')
    return (
      <fieldset role='radiogroup'>
        <div style={{ marginBottom: '25px' }}>첫 번째 라디오는 라벨이 없어요</div>
        <Flex rowGap={args.rowGap} columnGap={args.columnGap} flexDirection={args.flexDirection}>
          <Flex columnGap='10px'>
            <RadioButton
              {...args}
              name='color'
              value='blue'
              checked={selected === 'blue'}
              onChange={(e) => setSelected(e.target.value)}
            />
          </Flex>
          <Flex columnGap='10px'>
            <RadioButton
              {...args}
              name='color'
              id='foundation'
              value='foundation'
              disabled={args.disabledSecond}
              checked={selected === 'foundation'}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label htmlFor='foundation'>{args.labelText}</label>
          </Flex>
          <Flex columnGap='10px'>
            <RadioButton
              {...args}
              id='mint'
              name='color'
              value='mint'
              checked={selected === 'mint'}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label htmlFor='mint'>민트</label>
          </Flex>
        </Flex>
      </fieldset>
    )
  },
}
