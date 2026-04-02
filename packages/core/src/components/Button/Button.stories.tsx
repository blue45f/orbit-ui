import { ChatLineIcon, MinusIcon } from '@prism-ui/icons'
import { Meta, StoryObj } from '@storybook/react'

import { Button, ButtonProps } from './Button'

Button.displayName = 'Button'
Button.Leading.displayName = 'ButtonLeading'
Button.Center.displayName = 'ButtonCenter'
Button.Trailing.displayName = 'ButtonTrailing'
Button.Loading.displayName = 'ButtonLoading'

const meta = {
  title: 'foundation/Button',
  component: Button,
  args: {
    disabled: false,
    loading: false,
    children: '',
    as: 'button',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['button', 'a'],
    },
    arrangement: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'equal-weight'],
    },
  },
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => <Button {...args}>작성</Button>,
} satisfies Story

export const 아이콘 = {
  render: (args: ButtonProps) => (
    <Button {...args}>
      <Button.Leading>
        <ChatLineIcon size={16} />
      </Button.Leading>
      <Button.Center>Button</Button.Center>
      <Button.Trailing>
        <MinusIcon size={16} />
      </Button.Trailing>
    </Button>
  ),
} satisfies Story

export const 정렬테스트 = {
  args: {
    width: '500px',
    arrangement: 'center',
  },
  argTypes: {
    arrangement: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'equal-weight'],
    },
  },
  render: (args: ButtonProps) => (
    <Button {...args}>
      <Button.Leading>
        <ChatLineIcon size={16} />
      </Button.Leading>
      <Button.Center>Button</Button.Center>
      <Button.Trailing>
        <MinusIcon size={16} />
      </Button.Trailing>
    </Button>
  ),
} satisfies Story

export const 로딩 = {
  args: {
    loading: true,
  },
  render: (args: ButtonProps) => (
    <Button {...args}>
      <Button.Leading>
        <ChatLineIcon size={16} />
      </Button.Leading>
      <Button.Center>Button</Button.Center>
      <Button.Trailing>
        <MinusIcon size={16} />
      </Button.Trailing>
      <Button.Loading>로딩 중</Button.Loading>
    </Button>
  ),
} satisfies Story
