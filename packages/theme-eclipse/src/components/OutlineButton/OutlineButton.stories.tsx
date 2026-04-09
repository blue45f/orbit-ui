import { Flex } from '@heejun-com/core'
import { ChatLineIcon, ChevronRightLineIcon } from '@heejun-com/icons'
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
  title: 'eclipse/Actions/Buttons/OutlineButton',
  component: OutlineButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'primary', 'gray'],
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Outline Colors</h4>
        <Flex columnGap="24px" alignItems="center" flexWrap="wrap" rowGap="16px">
          <OutlineButton {...prop} color="black">
            <OutlineButton.Center>Black</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton {...prop} color="primary">
            <OutlineButton.Center>Primary</OutlineButton.Center>
          </OutlineButton>
          <OutlineButton {...prop} color="gray">
            <OutlineButton.Center>Gray</OutlineButton.Center>
          </OutlineButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 사이즈 = {
  args: {
    color: 'black',
  },
  render: (prop: OutlineButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Outline Sizes</h4>
        <Flex columnGap="24px" alignItems="flex-end" flexWrap="wrap" rowGap="16px">
          <OutlineButton {...prop} size="small">
            <OutlineButton.Leading>
              <ChatLineIcon />
            </OutlineButton.Leading>
            <OutlineButton.Center>Small</OutlineButton.Center>
            <OutlineButton.Trailing>
              <ChevronRightLineIcon size={iconSize.small} />
            </OutlineButton.Trailing>
          </OutlineButton>
          <OutlineButton {...prop} size="medium">
            <OutlineButton.Leading>
              <ChatLineIcon />
            </OutlineButton.Leading>
            <OutlineButton.Center>Medium</OutlineButton.Center>
            <OutlineButton.Trailing>
              <ChevronRightLineIcon size={iconSize.medium} />
            </OutlineButton.Trailing>
          </OutlineButton>
          <OutlineButton {...prop} size="large">
            <OutlineButton.Leading>
              <ChatLineIcon />
            </OutlineButton.Leading>
            <OutlineButton.Center>Large</OutlineButton.Center>
            <OutlineButton.Trailing>
              <ChevronRightLineIcon size={iconSize.large} />
            </OutlineButton.Trailing>
          </OutlineButton>
        </Flex>
      </div>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Interactive Playground</h4>
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
      </div>
    )
  },
}
