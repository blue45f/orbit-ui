import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { PageIndicator } from './PageIndicator'

PageIndicator.displayName = 'PageIndicator'

const meta = {
  title: 'foundation/PageIndicator',
  component: PageIndicator,
  args: {
    total: 5,
    current: 0,
  },
  argTypes: {
    onPageChange: { action: 'page changed' },
  },
} satisfies Meta<typeof PageIndicator>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: function Basic({ onPageChange, ...rest }) {
    const [current, setCurrent] = useState(0)

    return (
      <PageIndicator
        {...rest}
        current={current}
        onPageChange={(page) => {
          onPageChange?.(page)
          setCurrent(page)
        }}
      />
    )
  },
} satisfies Story

export const 페이지_3개 = {
  render: function ThreePages({ onPageChange, ...rest }) {
    const [current, setCurrent] = useState(0)

    return (
      <PageIndicator
        {...rest}
        total={3}
        current={current}
        onPageChange={(page) => {
          onPageChange?.(page)
          setCurrent(page)
        }}
      />
    )
  },
} satisfies Story

export const 페이지_10개 = {
  render: function TenPages({ onPageChange, ...rest }) {
    const [current, setCurrent] = useState(0)

    return (
      <PageIndicator
        {...rest}
        total={10}
        current={current}
        onPageChange={(page) => {
          onPageChange?.(page)
          setCurrent(page)
        }}
      />
    )
  },
} satisfies Story

export const 첫_페이지 = {
  args: {
    total: 5,
    current: 0,
  },
} satisfies Story

export const 중간_페이지 = {
  args: {
    total: 5,
    current: 2,
  },
} satisfies Story

export const 마지막_페이지 = {
  args: {
    total: 5,
    current: 4,
  },
} satisfies Story

export const Dot_크기_변경 = {
  render: function DotSizeVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <div>Size 6 (default)</div>
          <PageIndicator total={5} current={2} dotSize={6} />
        </div>
        <div>
          <div>Size 9</div>
          <PageIndicator total={5} current={2} dotSize={9} />
        </div>
        <div>
          <div>Size 12</div>
          <PageIndicator total={5} current={2} dotSize={12} />
        </div>
      </div>
    )
  },
} satisfies Story

export const 자동_페이징 = {
  render: function AutoPaging() {
    const [current, setCurrent] = useState(0)
    const total = 5

    // Auto-advance page every second for demo
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % total)
      }, 1000)
      return () => clearInterval(interval)
    }, [])

    return (
      <div>
        <div>
          Current Page: {current + 1}/{total}
        </div>
        <PageIndicator total={total} current={current} />
      </div>
    )
  },
} satisfies Story
