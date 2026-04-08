import type { Meta, StoryObj } from '@storybook/react'

import { Drawer } from './Drawer'
import { FilledButton as Button } from '../SolidButton'
import { Typography } from '../Text'

const meta = {
  title: 'eclipse/Feedback/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button color="mint" size="medium">
          <Button.Center>서랍 열기</Button.Center>
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side="right">
        <Drawer.Header>
          <Drawer.Title>계정 설정</Drawer.Title>
          <Drawer.Description>
            여기서 프로필 정보와 보안 설정을 변경할 수 있습니다.
          </Drawer.Description>
        </Drawer.Header>
        <div className="py-4">
          <Typography textStyle="bodyMedium">
            여기에 다양한 설정 폼이나 리스트가 들어갑니다.
          </Typography>
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button color="black" size="medium">
              <Button.Center>저장하기</Button.Center>
            </Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
}
