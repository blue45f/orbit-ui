import { Flex } from '@orbit-ui/core'
import { PlusIcon } from '@orbit-ui/icons'
import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

import { OutlineIconButton } from '.'

OutlineIconButton.displayName = 'OutlineIconButton'

const meta = {
  title: 'eclipse/1. Actions/Buttons/OutlineIconButton',
  component: OutlineIconButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'gray'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof OutlineIconButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  render: (prop: ComponentProps<typeof OutlineIconButton>) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <OutlineIconButton {...prop} color="black" size="large">
          <PlusIcon />
        </OutlineIconButton>
        <OutlineIconButton {...prop} color="gray" size="large">
          <PlusIcon />
        </OutlineIconButton>
      </Flex>
    )
  },
} as unknown as Story

export const 사이즈 = {
  render: (prop: ComponentProps<typeof OutlineIconButton>) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <OutlineIconButton {...prop} color="black" size="small">
          <PlusIcon />
        </OutlineIconButton>
        <OutlineIconButton {...prop} color="black" size="medium">
          <PlusIcon />
        </OutlineIconButton>
        <OutlineIconButton {...prop} color="black" size="large">
          <PlusIcon />
        </OutlineIconButton>
      </Flex>
    )
  },
} as unknown as Story

export const 디자인QA = {
  args: {
    color: 'black',
    size: 'medium',
    disabled: false,
  },
  parameters: {
    controls: {
      exclude: ['as', 'children', 'onClick'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ color, size, ...rest }: any) => {
    return (
      <OutlineIconButton {...rest} color={color} size={size}>
        <PlusIcon />
      </OutlineIconButton>
    )
  },
}
