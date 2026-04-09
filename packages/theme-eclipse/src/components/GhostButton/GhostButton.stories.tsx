import { Flex } from '@heejun-com/core'
import { ChevronRightLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

import { GhostButton, GhostButtonProps } from '.'

const iconSize: Record<GhostButtonProps['size'], number> = {
  small: 12,
  large: 14,
}

GhostButton.displayName = 'GhostButton'
GhostButton.Center.displayName = 'GhostButton.Center'
GhostButton.Trailing.displayName = 'GhostButton.Trailing'

const meta = {
  title: 'eclipse/Actions/Buttons/GhostButton',
  component: GhostButton,
  args: { color: 'black', size: 'large', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'gray'],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof GhostButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  args: {
    size: 'large',
  },
  render: (prop: ComponentProps<typeof GhostButton>) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Ghost Colors</h4>
        <Flex columnGap="24px" alignItems="center" flexWrap="wrap" rowGap="16px">
          <GhostButton {...prop} color="black">
            <GhostButton.Center>Black</GhostButton.Center>
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize[prop.size]} />
            </GhostButton.Trailing>
          </GhostButton>
          <GhostButton {...prop} color="gray">
            <GhostButton.Center>Gray</GhostButton.Center>
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize[prop.size]} />
            </GhostButton.Trailing>
          </GhostButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 사이즈 = {
  args: {
    color: 'black',
  },
  render: (prop: ComponentProps<typeof GhostButton>) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Ghost Sizes</h4>
        <Flex columnGap="24px" alignItems="center" flexWrap="wrap" rowGap="16px">
          <GhostButton {...prop} size="small">
            <GhostButton.Center>Small</GhostButton.Center>
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize.small} />
            </GhostButton.Trailing>
          </GhostButton>
          <GhostButton {...prop} size="large">
            <GhostButton.Center>Large</GhostButton.Center>
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize.large} />
            </GhostButton.Trailing>
          </GhostButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    color: 'black',
    size: 'large',
    trailing: true,
    text: 'Ghost Action',
    disabled: false,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ leading: _leading, trailing, text, ...args }: any) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Interactive Playground</h4>
        <GhostButton {...args}>
          <GhostButton.Center>{text}</GhostButton.Center>
          {trailing && (
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize[args.size as GhostButtonProps['size']]} />
            </GhostButton.Trailing>
          )}
        </GhostButton>
      </div>
    )
  },
}
