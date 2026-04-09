import { Flex } from '@orbit-ui/core'
import { PlusIcon } from '@orbit-ui/icons'
import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

import { SolidIconButton } from '.'

SolidIconButton.displayName = 'SolidIconButton'

const meta = {
  title: 'eclipse/Actions/Buttons/SolidIconButton',
  component: SolidIconButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'white'],
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
} satisfies Meta<typeof SolidIconButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  render: (prop: ComponentProps<typeof SolidIconButton>) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <SolidIconButton {...prop} color="black" size="large">
          <PlusIcon />
        </SolidIconButton>
        <SolidIconButton {...prop} color="white" size="large">
          <PlusIcon />
        </SolidIconButton>
        <SolidIconButton
          {...prop}
          color="white"
          size="large"
          theme={{ enabledFillColor: 'transparent' }}
        >
          <PlusIcon />
        </SolidIconButton>
      </Flex>
    )
  },
} as unknown as Story

export const 사이즈 = {
  render: (prop: ComponentProps<typeof SolidIconButton>) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <SolidIconButton {...prop} color="black" size="small">
          <PlusIcon />
        </SolidIconButton>
        <SolidIconButton {...prop} color="black" size="medium">
          <PlusIcon />
        </SolidIconButton>
        <SolidIconButton {...prop} color="black" size="large">
          <PlusIcon />
        </SolidIconButton>
      </Flex>
    )
  },
} as unknown as Story

export const 디자인QA = {
  args: {
    color: 'black',
    size: 'large',
  },
  parameters: {
    controls: {
      exclude: ['as', 'children', 'onClick'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ color, size, ...rest }: any) => {
    return (
      <SolidIconButton {...rest} color={color} size={size}>
        <PlusIcon />
      </SolidIconButton>
    )
  },
}
