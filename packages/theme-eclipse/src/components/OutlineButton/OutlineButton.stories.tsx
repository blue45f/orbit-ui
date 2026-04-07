import { Flex } from '@orbit-ui/core'
import { ChatLineIcon, ChevronRightLineIcon } from '@orbit-ui/icons'
import { Meta, StoryObj } from '@storybook/react'

import { OutlineButton, OutlineButtonProps } from '.'

const iconSize: Record<OutlineButtonProps['size'], number> = {
  small: 12,
  medium: 14,
  large: 16,
}

OutlineButton.displayName = 'OutlineButton'
OutlineButton.Leading.displayName = 'OutlineButton.Leading'
OutlineButton.Center.displayName = 'OutlineButton.Center'
OutlineButton.Trailing.displayName = 'OutlineButton.Trailing'

const meta = {
  title: 'eclipse/Buttons/OutlineButton',
  component: OutlineButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'mint', 'gray'],
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
} satisfies Meta<typeof OutlineButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  args: {
    size: 'large',
  },
  render: (prop: OutlineButtonProps) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <OutlineButton {...prop} color="black">
          <OutlineButton.Center>Black</OutlineButton.Center>
        </OutlineButton>
        <OutlineButton {...prop} color="mint">
          <OutlineButton.Center>Mint</OutlineButton.Center>
        </OutlineButton>
        <OutlineButton {...prop} color="gray">
          <OutlineButton.Center>Gray</OutlineButton.Center>
        </OutlineButton>
      </Flex>
    )
  },
} satisfies Story

export const 사이즈 = {
  args: {
    color: 'black',
  },
  render: (prop: OutlineButtonProps) => {
    return (
      <Flex columnGap="20px" alignItems="center">
        <OutlineButton {...prop} size="small">
          <OutlineButton.Leading>
            <ChatLineIcon />
          </OutlineButton.Leading>
          <OutlineButton.Center>Small Button</OutlineButton.Center>
          <OutlineButton.Trailing>
            <ChevronRightLineIcon size={iconSize.small} />
          </OutlineButton.Trailing>
        </OutlineButton>
        <OutlineButton {...prop} size="medium">
          <OutlineButton.Leading>
            <ChatLineIcon />
          </OutlineButton.Leading>
          <OutlineButton.Center>Medium Button</OutlineButton.Center>
          <OutlineButton.Trailing>
            <ChevronRightLineIcon size={iconSize.medium} />
          </OutlineButton.Trailing>
        </OutlineButton>
        <OutlineButton {...prop} size="large">
          <OutlineButton.Leading>
            <ChatLineIcon />
          </OutlineButton.Leading>
          <OutlineButton.Center>Large Button</OutlineButton.Center>
          <OutlineButton.Trailing>
            <ChevronRightLineIcon size={iconSize.large} />
          </OutlineButton.Trailing>
        </OutlineButton>
      </Flex>
    )
  },
} satisfies Story

export const 로딩 = {
  args: {
    loading: true,
    color: 'black',
    size: 'medium',
  },
  render: (prop: OutlineButtonProps) => {
    return (
      <OutlineButton {...prop}>
        <OutlineButton.Leading>
          <ChatLineIcon />
        </OutlineButton.Leading>
        <OutlineButton.Center>버튼입니다</OutlineButton.Center>
        <OutlineButton.Trailing>
          <ChevronRightLineIcon size={iconSize[prop.size]} />
        </OutlineButton.Trailing>
      </OutlineButton>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    leading: true,
    trailing: true,
    loading: false,
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
  render: ({ leading, trailing, color, size, loading, ...rest }: any) => {
    return (
      <OutlineButton {...rest} color={color} size={size} loading={loading}>
        {leading && (
          <OutlineButton.Leading>
            <ChatLineIcon />
          </OutlineButton.Leading>
        )}
        <OutlineButton.Center>Black</OutlineButton.Center>
        {trailing && (
          <OutlineButton.Trailing>
            <ChevronRightLineIcon size={iconSize[size as OutlineButtonProps['size']]} />
          </OutlineButton.Trailing>
        )}
      </OutlineButton>
    )
  },
}
