import type { Meta, StoryObj } from '@storybook/react'

import { Popover } from './Popover'
import { FilledButton as Button } from '../SolidButton'
import { Typography } from '../Text'

const meta = {
  title: 'eclipse/Feedback/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
      <Popover>
        <Popover.Trigger asChild>
          <Button color="primary" size="medium">
            <Button.Center>정보 확인</Button.Center>
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Typography textStyle="subheadingSmall">서비스 정책 안내</Typography>
              <Typography textStyle="descriptionLarge" className="text-slate-500">
                본 서비스의 이용 정책은 매달 업데이트되며, 자세한 내용은 공지사항을 확인해 주세요.
              </Typography>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
}
