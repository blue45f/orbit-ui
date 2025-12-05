import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'

import { AlertDialog } from './AlertDialog'

const meta = {
  title: 'foundation/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  args: {
    defaultIsPresented: false,
  },
  argTypes: {},
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialog.Trigger>
        <Button>열기</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Top>상단 영역입니다</AlertDialog.Top>
      <AlertDialog.Bottom>
        <AlertDialog.Close>
          <Button>확인</Button>
        </AlertDialog.Close>
      </AlertDialog.Bottom>
    </AlertDialog>
  ),
}
