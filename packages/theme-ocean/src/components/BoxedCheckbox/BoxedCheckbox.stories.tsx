import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { BoxedCheckbox } from './BoxedCheckbox'

BoxedCheckbox.displayName = 'BoxedCheckbox'

const meta = {
  title: 'mint/Checkbox/BoxedCheckbox',
  component: BoxedCheckbox,
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
} satisfies Meta<typeof BoxedCheckbox>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render(args) {
    return <BoxedCheckbox {...args} />
  },
} satisfies Story

export const 테마_재정의 = {
  render(args) {
    return (
      <BoxedCheckbox
        {...args}
        theme={{
          enabledCheckedBorderColor: 'red',
          enabledCheckedFillColor: 'yellow',
          enabledCheckedForegroundColor: 'red',
          enabledUncheckedBorderColor: 'red',
          focusedUncheckedBorderColor: 'red',
          focusedCheckedBorderColor: 'red',
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

    return <BoxedCheckbox {...args} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
  },
} satisfies Story
