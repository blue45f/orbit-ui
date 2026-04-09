import { Flex } from '@heejun-com/core'
import { ChatLineIcon, ChevronRightLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'

import { SolidButton, SolidButtonProps } from '.'

SolidButton.displayName = 'SolidButton'
SolidButton.Leading.displayName = 'SolidButton.Leading'
SolidButton.Center.displayName = 'SolidButton.Center'
SolidButton.Trailing.displayName = 'SolidButton.Trailing'

const iconSize: Record<SolidButtonProps['size'], number> = {
  small: 12,
  medium: 14,
  large: 16,
}

const meta = {
  title: 'eclipse/Actions/Buttons/SolidButton',
  component: SolidButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'primary', 'gray', 'white'],
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
} satisfies Meta<typeof SolidButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  args: {
    size: 'large',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Brand Colors</h4>
        <Flex columnGap="24px" alignItems="center" flexWrap="wrap" rowGap="16px">
          <SolidButton {...prop} color="black">
            <SolidButton.Center>Black</SolidButton.Center>
          </SolidButton>
          <SolidButton {...prop} color="primary">
            <SolidButton.Center>Primary</SolidButton.Center>
          </SolidButton>
          <SolidButton {...prop} color="gray">
            <SolidButton.Center>Gray</SolidButton.Center>
          </SolidButton>
          <SolidButton {...prop} color="white">
            <SolidButton.Center>White</SolidButton.Center>
          </SolidButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 사이즈 = {
  args: {
    color: 'black',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Button Sizes</h4>
        <Flex columnGap="24px" alignItems="flex-end" flexWrap="wrap" rowGap="16px">
          <SolidButton {...prop} size="small">
            <SolidButton.Leading>
              <ChatLineIcon />
            </SolidButton.Leading>
            <SolidButton.Center>Small</SolidButton.Center>
            <SolidButton.Trailing>
              <ChevronRightLineIcon size={iconSize.small} />
            </SolidButton.Trailing>
          </SolidButton>
          <SolidButton {...prop} size="medium">
            <SolidButton.Leading>
              <ChatLineIcon />
            </SolidButton.Leading>
            <SolidButton.Center>Medium</SolidButton.Center>
            <SolidButton.Trailing>
              <ChevronRightLineIcon size={iconSize.medium} />
            </SolidButton.Trailing>
          </SolidButton>
          <SolidButton {...prop} size="large">
            <SolidButton.Leading>
              <ChatLineIcon />
            </SolidButton.Leading>
            <SolidButton.Center>Large</SolidButton.Center>
            <SolidButton.Trailing>
              <ChevronRightLineIcon size={iconSize.large} />
            </SolidButton.Trailing>
          </SolidButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 로딩 = {
  args: {
    loading: true,
    color: 'black',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Loading State</h4>
        <SolidButton {...prop}>
          <SolidButton.Leading>
            <ChatLineIcon />
          </SolidButton.Leading>
          <SolidButton.Center>불러오는 중...</SolidButton.Center>
          <SolidButton.Trailing>
            <ChevronRightLineIcon size={iconSize[prop.size]} />
          </SolidButton.Trailing>
        </SolidButton>
      </div>
    )
  },
} satisfies Story

export const 전체너비 = {
  args: {
    size: 'medium',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Full Width</h4>
        <Flex flexDirection="column" gap="12px" style={{ width: '100%', maxWidth: '400px' }}>
          <SolidButton {...prop} color="black" width="100%">
            <SolidButton.Center>Primary Action</SolidButton.Center>
          </SolidButton>
          <SolidButton {...prop} color="gray" width="100%">
            <SolidButton.Center>Secondary Action</SolidButton.Center>
          </SolidButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    color: 'primary',
    size: 'medium',
    text: '디자인 확인용 버튼',
    leading: true,
    trailing: true,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ color, size, text, leading, trailing, ...rest }: any) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Interactive Playground</h4>
        <SolidButton color={color} size={size} {...rest}>
          {leading && (
            <SolidButton.Leading>
              <ChatLineIcon />
            </SolidButton.Leading>
          )}
          <SolidButton.Center>{text}</SolidButton.Center>
          {trailing && (
            <SolidButton.Trailing>
              <ChevronRightLineIcon size={iconSize[size as SolidButtonProps['size']]} />
            </SolidButton.Trailing>
          )}
        </SolidButton>
      </div>
    )
  },
}
