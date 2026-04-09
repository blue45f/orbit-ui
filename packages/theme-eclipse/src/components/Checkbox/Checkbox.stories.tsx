import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { Checkbox } from './Checkbox'

Checkbox.displayName = 'Checkbox'

const meta = {
  title: 'eclipse/Inputs/Selection/Checkbox',
  component: Checkbox,
  args: {
    disabled: false,
    iconName: 'check',
  },
  argTypes: {
    iconName: {
      control: 'inline-radio',
      options: ['check', 'minus'],
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render(args) {
    return <Checkbox {...args} />
  },
} satisfies Story

export const 테마_재정의 = {
  render(args) {
    return (
      <Checkbox
        {...args}
        theme={{
          enabledCheckedForegroundColor: 'red',
          enabledCheckedBorderColor: 'transparent',
          focusedCheckedBorderColor: 'transparent',
        }}
      />
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    disabled: false,
    checked: false,
    iconName: 'check',
  },
  argTypes: {
    iconName: {
      control: 'inline-radio',
      options: ['check', 'minus'],
    },
  },
  // eslint-disable-next-line
  render: function RenderComponent(args: any) {
    const [isChecked, setIsChecked] = useState(args.checked)

    useEffect(() => {
      setIsChecked(args.checked)
    }, [args.checked])

    return <Checkbox {...args} checked={isChecked} onChange={(checked) => setIsChecked(checked)} />
  },
} satisfies Story
