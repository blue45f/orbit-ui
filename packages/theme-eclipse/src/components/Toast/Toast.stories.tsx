import type { Meta, StoryObj } from '@storybook/react'

import { Toaster, toast } from './Toast'
import { FilledButton as Button } from '../SolidButton'

const meta = {
  title: 'eclipse/Feedback/Toast',
  component: Toaster,
  tags: ['autodocs'],
  args: {
    position: 'bottom-center',
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args) => (
    <div
      style={{
        padding: '2rem',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Toaster {...args} />
      <Button color="primary" size="medium" onClick={() => toast('기본 토스트입니다.')}>
        <Button.Center>기본 토스트 띄우기</Button.Center>
      </Button>
      <div style={{ height: 16 }} />
      <Button
        color="black"
        size="medium"
        onClick={() =>
          toast('성공적으로 저장되었습니다.', {
            description: '일요일 오후 2시 예약이 확정되었습니다.',
            action: {
              label: '취소',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        <Button.Center>액션 토스트 띄우기</Button.Center>
      </Button>
    </div>
  ),
}
