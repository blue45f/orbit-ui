import { Meta, StoryObj } from '@storybook/react'

import { VisuallyHidden } from './VisuallyHidden'

const meta = {
  title: 'foundation/VisuallyHidden',
  component: VisuallyHidden,
  args: {
    children: '스크린 리더 전용 텍스트',
  },
} satisfies Meta<typeof VisuallyHidden>

type Story = StoryObj<typeof meta>

export default meta

export const 기본: Story = {
  render: (args) => (
    <p>
      이 문장 뒤에는 시각적으로 보이지 않는 텍스트가 있어요.
      <VisuallyHidden {...args} />
    </p>
  ),
}

export const 아이콘_버튼_라벨: Story = {
  render: () => (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        border: '1px solid #d0d0d0',
        borderRadius: 8,
      }}
    >
      <span aria-hidden style={{ fontSize: 18 }}>
        🗑️
      </span>
      {/* 보조기기 사용자에게만 노출되는 접근 가능한 이름 */}
      <VisuallyHidden>항목 삭제</VisuallyHidden>
    </button>
  ),
}
