import { useUniqueID } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { RadioGroup, useRadioGroupContext } from './RadioGroup'

RadioGroup.displayName = 'RadioGroup'

const meta = {
  title: 'eclipse/Inputs/Selection/RadioGroup',
  component: RadioGroup,
  args: {
    name: '',
    children: '',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioGroup>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => (
    <RadioGroup {...args}>
      <input type="radio" />
    </RadioGroup>
  ),
} satisfies Story

const Radio: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { id: idProp, name: nameProp, value, children, ...rest } = props
  const { name, checkedValue } = useRadioGroupContext('Radio')
  const id = useUniqueID(idProp)
  const checked = checkedValue === value

  return (
    <>
      <input
        type="radio"
        {...rest}
        id={id}
        value={value}
        name={name || nameProp}
        checked={checked}
        readOnly
      />
      <label htmlFor={id}>{children}</label>
    </>
  )
}

export const 제어 = {
  render: function Controlled(args) {
    const [value, setValue] = useState('blue')

    return (
      <RadioGroup
        name="pkg"
        value={value}
        onChange={(e) => {
          args.onChange?.(e)
          setValue(e.target.value)
        }}
      >
        <Radio id="controlled-1" value="blue">
          인디고
        </Radio>
        <Radio id="controlled-2" value="foundation">
          코어
        </Radio>
        <Radio id="controlled-3" value="primary">
          에메랄드
        </Radio>
      </RadioGroup>
    )
  },
} satisfies Story

export const 비제어 = {
  render: function Uncontrolled(args) {
    return (
      <RadioGroup name="pkg" defaultValue="blue" onChange={args.onChange}>
        <Radio id="uncontrolled-1" value="blue">
          인디고
        </Radio>
        <Radio id="uncontrolled-2" value="foundation">
          코어
        </Radio>
        <Radio id="uncontrolled-3" value="primary">
          에메랄드
        </Radio>
      </RadioGroup>
    )
  },
} satisfies Story
