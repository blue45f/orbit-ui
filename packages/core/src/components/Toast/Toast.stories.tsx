import type { Meta, StoryObj } from '@storybook/react'

import { Toaster, toast } from './Toast'

const meta = {
  title: 'core/Feedback/Toast',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

const TriggerButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center rounded-md border border-[var(--sem-eclipse-color-borderTertiary)] px-4 py-2 text-sm text-[var(--sem-eclipse-color-foregroundPrimary)]"
  >
    {label}
  </button>
)

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <TriggerButton label="토스트 띄우기" onClick={() => toast('저장되었습니다.')} />
    </>
  ),
}

export const Variants: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <TriggerButton label="기본" onClick={() => toast('기본 메시지')} />
        <TriggerButton label="성공" onClick={() => toast.success('성공했습니다.')} />
        <TriggerButton label="오류" onClick={() => toast.error('오류가 발생했습니다.')} />
        <TriggerButton
          label="설명 포함"
          onClick={() =>
            toast('업데이트 완료', { description: '최신 버전으로 업데이트되었습니다.' })
          }
        />
      </div>
    </>
  ),
}
