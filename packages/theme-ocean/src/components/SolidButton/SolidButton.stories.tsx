import { Flex } from '@prism-ui/core'
import { ChatLineIcon, ChevronRightLineIcon } from '@prism-ui/icons'
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
  title: 'mint/Buttons/SolidButton',
  component: SolidButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'mint', 'gray', 'white'],
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
      <Flex columnGap='20px' alignItems='center'>
        <SolidButton {...prop} color='black'>
          <SolidButton.Center>Black</SolidButton.Center>
        </SolidButton>
        <SolidButton {...prop} color='mint'>
          <SolidButton.Center>Mint</SolidButton.Center>
        </SolidButton>
        <SolidButton {...prop} color='gray'>
          <SolidButton.Center>Gray</SolidButton.Center>
        </SolidButton>
        <SolidButton {...prop} color='white'>
          <SolidButton.Center>White</SolidButton.Center>
        </SolidButton>
      </Flex>
    )
  },
} satisfies Story

export const 사이즈 = {
  args: {
    color: 'black',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <Flex columnGap='20px' alignItems='center'>
        <SolidButton {...prop} size='small'>
          <SolidButton.Leading>
            <ChatLineIcon />
          </SolidButton.Leading>
          <SolidButton.Center>Small Button</SolidButton.Center>
          <SolidButton.Trailing>
            <ChevronRightLineIcon size={iconSize.small} />
          </SolidButton.Trailing>
        </SolidButton>
        <SolidButton {...prop} size='medium'>
          <SolidButton.Leading>
            <ChatLineIcon />
          </SolidButton.Leading>
          <SolidButton.Center>Medium Button</SolidButton.Center>
          <SolidButton.Trailing>
            <ChevronRightLineIcon size={iconSize.medium} />
          </SolidButton.Trailing>
        </SolidButton>
        <SolidButton {...prop} size='large'>
          <SolidButton.Leading>
            <ChatLineIcon />
          </SolidButton.Leading>
          <SolidButton.Center>Large Button</SolidButton.Center>
          <SolidButton.Trailing>
            <ChevronRightLineIcon size={iconSize.large} />
          </SolidButton.Trailing>
        </SolidButton>
      </Flex>
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
      <SolidButton {...prop}>
        <SolidButton.Leading>
          <ChatLineIcon />
        </SolidButton.Leading>
        <SolidButton.Center>버튼입니다</SolidButton.Center>
        <SolidButton.Trailing>
          <ChevronRightLineIcon size={iconSize[prop.size]} />
        </SolidButton.Trailing>
      </SolidButton>
    )
  },
} satisfies Story

export const 전체너비 = {
  args: {
    size: 'medium',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <Flex columnGap='8px' style={{ width: '400px' }}>
        <SolidButton {...prop} color='black' width='100%'>
          <SolidButton.Center>첫 번째 버튼</SolidButton.Center>
        </SolidButton>
        <SolidButton {...prop} color='mint' width='100%'>
          <SolidButton.Center>두 번째 버튼</SolidButton.Center>
        </SolidButton>
        <SolidButton {...prop} color='gray' width='100%'>
          <SolidButton.Center>세 번째 버튼</SolidButton.Center>
        </SolidButton>
      </Flex>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    color: 'mint',
    size: 'medium',
    text: '버튼입니다',
    leading: true,
    trailing: true,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ color, size, text, leading, trailing, ...rest }: any) => {
    return (
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
    )
  },
}
