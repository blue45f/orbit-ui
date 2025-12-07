import { CancelIcon, CircleInfoFillIcon } from '@prism-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
import { TextField } from '../TextField'
import { Text } from '../Text/Text'

import { Toast } from './Toast'

const meta = {
  title: 'foundation/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    defaultIsPresented: false,
  },
  argTypes: {},
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args) => (
    <Toast {...args}>
      <Toast.Trigger>
        <Button>열기</Button>
      </Toast.Trigger>
      <Toast.Center alignment='center'>
        <div>타이틀메세지입니다</div>
      </Toast.Center>
    </Toast>
  ),
}

export const 모든_슬롯: Story = {
  render: (args) => (
    <>
      <TextField placeholder='Toast 가 열려있어도 상호작용이 되는지 확인해보세요.' />
      <Toast {...args}>
        <Toast.Trigger>
          <Button>열기</Button>
        </Toast.Trigger>
        <Toast.Leading>
          <CircleInfoFillIcon size={24} />
        </Toast.Leading>
        <Toast.Center>
          <Text>타이틀메세지입니다</Text>
          <Text>설명메세지입니다</Text>
        </Toast.Center>
        <Toast.Trailing>
          <Toast.Close>
            <Button>
              <CancelIcon size={20} />
            </Button>
          </Toast.Close>
        </Toast.Trailing>
      </Toast>
    </>
  ),
}
