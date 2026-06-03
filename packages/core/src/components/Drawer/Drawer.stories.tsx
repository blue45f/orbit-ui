import type { Meta, StoryObj } from '@storybook/react'

import { Drawer } from './Drawer'

const meta = {
  title: 'core/Overlay/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

const TriggerButton = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-md border border-[var(--sem-eclipse-color-borderTertiary)] px-4 py-2 text-sm text-[var(--sem-eclipse-color-foregroundPrimary)]">
    {children}
  </span>
)

export const Default: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Drawer.Trigger asChild>
        <button type="button">
          <TriggerButton>Drawer 열기</TriggerButton>
        </button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>설정</Drawer.Title>
          <Drawer.Description>알림 및 표시 환경설정을 변경하세요.</Drawer.Description>
        </Drawer.Header>
        <div className="py-4 text-sm text-[var(--sem-eclipse-color-foregroundSecondary)]">
          패널 본문 콘텐츠
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <button type="button">
              <TriggerButton>닫기</TriggerButton>
            </button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
}

export const LeftSide: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <button type="button">
          <TriggerButton>왼쪽에서 열기</TriggerButton>
        </button>
      </Drawer.Trigger>
      <Drawer.Content side="left">
        <Drawer.Header>
          <Drawer.Title>메뉴</Drawer.Title>
          <Drawer.Description>왼쪽에서 슬라이드되는 Drawer 입니다.</Drawer.Description>
        </Drawer.Header>
      </Drawer.Content>
    </Drawer>
  ),
}
