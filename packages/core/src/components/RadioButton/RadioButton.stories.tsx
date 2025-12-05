import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Flex } from '../primitives'

import { RadioButton } from './RadioButton'

RadioButton.displayName = 'RadioButton'

const meta = {
  component: RadioButton,
  title: 'foundation/RadioButton',
} satisfies Meta<typeof RadioButton>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  args: {
    children: '',
  },
  render: function Render(args) {
    const [selected, setSelected] = useState('1')

    return (
      <fieldset role='radiogroup'>
        <RadioButton
          {...args}
          value='1'
          name='test'
          checked={selected === '1'}
          onChange={(e) => setSelected(e.target.value)}
        >
          <RadioButton.Indicator height={24} width={24} />
        </RadioButton>
        <RadioButton
          {...args}
          value='2'
          name='test'
          checked={selected === '2'}
          onChange={(e) => setSelected(e.target.value)}
        >
          <RadioButton.Indicator height={24} width={24} />
        </RadioButton>
      </fieldset>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    children: '커스텀',
    disabled: false,
  },
  argTypes: {},
  // eslint-disable-next-line
  render: function Render({ disabled }: any) {
    const [selected, setSelected] = useState('햄버거')

    return (
      <Flex columnGap='8px'>
        <RadioButton
          name='food'
          disabled={disabled}
          value='햄버거'
          checked={selected === '햄버거'}
          onChange={(e) => setSelected(e.target.value)}
          borderWidth={2}
          width={48}
          height={48}
        >
          <RadioButton.Indicator height={24} width={24} style={{ backgroundColor: 'red' }} />
        </RadioButton>
        <RadioButton
          name='food'
          disabled={disabled}
          value='피자'
          checked={selected === '피자'}
          onChange={(e) => setSelected(e.target.value)}
          borderWidth={2}
          width={48}
          height={48}
        >
          <RadioButton.Indicator height={24} width={24} />
        </RadioButton>
        <RadioButton
          name='food'
          disabled={disabled}
          value='치킨'
          checked={selected === '치킨'}
          onChange={(e) => setSelected(e.target.value)}
          borderWidth={2}
          width={48}
          height={48}
        >
          <RadioButton.Indicator height={24} width={24} />
        </RadioButton>
        <RadioButton
          name='food'
          disabled={disabled}
          value='막걸리'
          checked={selected === '막걸리'}
          onChange={(e) => setSelected(e.target.value)}
          borderWidth={2}
          width={48}
          height={48}
        >
          <RadioButton.Indicator height={24} width={24} />
        </RadioButton>
        <RadioButton
          name='food'
          disabled={disabled}
          value='위스키'
          checked={selected === '위스키'}
          onChange={(e) => setSelected(e.target.value)}
          borderWidth={2}
          width={48}
          height={48}
        >
          <RadioButton.Indicator height={24} width={24} />
        </RadioButton>
      </Flex>
    )
  },
}
