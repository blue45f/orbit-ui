import { ChevronRightLineIcon, CancelIcon } from '@prism-ui/icons'
import { Meta, StoryObj } from '@storybook/react'

import { PageNumber } from './PageNumber'

PageNumber.displayName = 'PageNumber'
PageNumber.Trailing.displayName = 'PageNumber.Trailing'

const meta = {
  title: 'foundation/PageNumber',
  component: PageNumber,
  args: {
    current: 1,
    total: 3,
  },
} satisfies Meta<typeof PageNumber>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {} satisfies Story

export const 첫_페이지 = {
  args: {
    current: 1,
    total: 5,
  },
} satisfies Story

export const 중간_페이지 = {
  args: {
    current: 3,
    total: 5,
  },
} satisfies Story

export const 마지막_페이지 = {
  args: {
    current: 5,
    total: 5,
  },
} satisfies Story

export const 큰_숫자 = {
  args: {
    current: 42,
    total: 100,
  },
} satisfies Story

export const Trailing_아이콘 = {
  render: function WithTrailing(args) {
    return (
      <PageNumber {...args}>
        <PageNumber.Trailing>
          <ChevronRightLineIcon />
        </PageNumber.Trailing>
      </PageNumber>
    )
  },
} satisfies Story

export const Trailing_다른_아이콘 = {
  render: function WithDifferentIcon(args) {
    return (
      <PageNumber {...args}>
        <PageNumber.Trailing>
          <CancelIcon />
        </PageNumber.Trailing>
      </PageNumber>
    )
  },
} satisfies Story

export const Trailing_크기_변경 = {
  render: function TrailingSizeVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div>Size 12</div>
          <PageNumber current={1} total={3}>
            <PageNumber.Trailing>
              <ChevronRightLineIcon size={12} />
            </PageNumber.Trailing>
          </PageNumber>
        </div>
        <div>
          <div>Size 16 (default)</div>
          <PageNumber current={1} total={3}>
            <PageNumber.Trailing>
              <ChevronRightLineIcon size={16} />
            </PageNumber.Trailing>
          </PageNumber>
        </div>
        <div>
          <div>Size 20</div>
          <PageNumber current={1} total={3}>
            <PageNumber.Trailing>
              <ChevronRightLineIcon size={20} />
            </PageNumber.Trailing>
          </PageNumber>
        </div>
      </div>
    )
  },
} satisfies Story

export const 여러_페이지_카운터 = {
  render: function MultipleCounters() {
    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <PageNumber current={1} total={3} />
        <PageNumber current={2} total={3} />
        <PageNumber current={3} total={3} />
      </div>
    )
  },
} satisfies Story

export const 테마_커스터마이징 = {
  render: function CustomTheme(args) {
    return (
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <PageNumber {...args} />
        <PageNumber
          {...args}
          theme={{
            fillColor: 'rgba(0, 128, 255, 0.8)',
            foregroundColor: 'white',
          }}
        />
        <PageNumber
          {...args}
          theme={{
            fillColor: 'rgba(255, 0, 128, 0.8)',
            foregroundColor: 'white',
          }}
        />
      </div>
    )
  },
} satisfies Story
