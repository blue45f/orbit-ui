import { ChevronRightLineIcon } from '@prism-ui/icons'
import { Meta, StoryObj } from '@storybook/react'

import { PageNumber } from './PageNumber'

const meta = {
  title: 'mint/PageNumber',
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

export const 두_자리_숫자 = {
  args: {
    current: 12,
    total: 24,
  },
} satisfies Story

export const Trailing_슬롯 = {
  render: function WithTrailing() {
    // Mock icon using a simple SVG
    const MockIcon = () => (
      <svg width='13' height='13' viewBox='0 0 13 13' fill='none'>
        <path
          d='M2 2L11 11M11 2L2 11'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )

    return (
      <PageNumber current={1} total={3}>
        <PageNumber.Trailing>
          <MockIcon />
        </PageNumber.Trailing>
      </PageNumber>
    )
  },
} satisfies Story

export const 배경과_함께 = {
  render: function WithBackground() {
    return (
      <div
        style={{
          padding: '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          display: 'inline-block',
        }}
      >
        <PageNumber current={1} total={5} />
      </div>
    )
  },
} satisfies Story

export const 여러_상태 = {
  render: function MultipleStates() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>기본</p>
          <PageNumber current={1} total={3} />
        </div>

        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>큰 숫자</p>
          <PageNumber current={99} total={100} />
        </div>

        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Trailing 포함</p>
          <PageNumber current={2} total={5}>
            <PageNumber.Trailing>
              <svg width='13' height='13' viewBox='0 0 13 13' fill='none'>
                <path
                  d='M2 2L11 11M11 2L2 11'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </PageNumber.Trailing>
          </PageNumber>
        </div>
      </div>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    current: 1,
    total: 3,
    trailing: false,
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 1 },
    },
    total: {
      control: { type: 'number', min: 1 },
    },
    trailing: {
      control: 'boolean',
    },
  },
  // eslint-disable-next-line
  render: function RenderComponent({ trailing, children: _children, ...rest }: any) {
    return (
      <PageNumber {...rest}>
        {trailing && (
          <PageNumber.Trailing>
            <ChevronRightLineIcon size={14} />
          </PageNumber.Trailing>
        )}
      </PageNumber>
    )
  },
}
