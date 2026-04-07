import type { Meta, StoryObj } from '@storybook/react'

import { Accordion } from './Accordion'

const meta = {
  title: 'eclipse/Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>신청 취소는 어떻게 진행되나요?</Accordion.Trigger>
        <Accordion.Content>
          관리자가 요청을 승인하기 전이라면, [이용내역]에서 취소할 수 있습니다. 이미 서비스 처리가
          시작되었다면 고객센터를 통해 문의해주세요.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>서비스 이용료 기준이 궁금해요.</Accordion.Trigger>
        <Accordion.Content>
          거리, 시간대, 지역, 서비스 방식, 할인, 혜택, 사용하는 요금제 등에 따라 서비스 정책에 따라
          차이가 있을 수 있습니다. 최종 결제 전 최종 이용료을 확인할 수 있습니다.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>등록된 수단을 변경할 수 있나요?</Accordion.Trigger>
        <Accordion.Content>
          처리가 완료된 후에는 수단을 변경할 수 없습니다. 주문을 취소한 뒤 새로운 결제 수단으로 다시
          신청해 주세요.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}
