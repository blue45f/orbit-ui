import { CancelIcon, CheckIcon, MinusIcon } from '@prism-ui/icons'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Chip, ChipPropsAsButton } from './Chip'

Chip.displayName = 'Chip'
Chip.Leading.displayName = 'Chip.Leading'
Chip.Trailing.displayName = 'Chip.Trailing'

const meta = {
  title: 'foundation/Chip',
  component: Chip,
  args: {
    disabled: false,
    children: '',
    as: 'button',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof Chip>

type Story = StoryObj<typeof meta>

export default meta

export const 제어 = {
  render: function Controlled({ ...rest }) {
    const [selected, setSelected] = useState(false)
    const args = rest as ChipPropsAsButton

    return (
      <Chip
        {...args}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          args.onClick?.(e)
          setSelected(!selected)
        }}
        selected={selected}
      >
        Chip
        <Chip.Trailing size={20}>
          <CheckIcon />
        </Chip.Trailing>
      </Chip>
    )
  },
} satisfies Story

export const 비제어 = {
  render: function Uncontrolled(args) {
    return (
      <Chip {...args}>
        Chip
        <Chip.Trailing size={20}>
          <CheckIcon />
        </Chip.Trailing>
      </Chip>
    )
  },
} satisfies Story

export const 선택_상태_없음 = {
  render: function Unselectable(args) {
    return (
      <Chip {...args} selected={false}>
        <Chip.Leading size={20}>
          <MinusIcon />
        </Chip.Leading>
        Chip
        <Chip.Trailing size={20}>
          <CheckIcon />
        </Chip.Trailing>
      </Chip>
    )
  },
} satisfies Story

export const 복합_상호작용 = {
  render: function Composite(args) {
    return (
      <Chip {...args}>
        Chip
        <Chip.Trailing size={20}>
          <button
            type='button'
            className='appearance-none bg-transparent border-0 p-0 m-0 cursor-pointer outline-none'
            style={{ display: 'inline-flex' }}
            onClick={() => window.alert('trailing button clicked')}
          >
            <CancelIcon />
          </button>
        </Chip.Trailing>
      </Chip>
    )
  },
} satisfies Story
