import { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useState } from 'react'

import { PageIndicator } from './PageIndicator'

const meta = {
  title: 'mint/PageIndicator',
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
  render: function ThreePages() {
    const [current, setCurrent] = useState(0)

    return <PageIndicator total={3} current={current} onPageChange={setCurrent} />
  },
} satisfies Story

export const 페이지_5개 = {
  render: function FivePages() {
    const [current, setCurrent] = useState(0)

    return <PageIndicator total={5} current={current} onPageChange={setCurrent} />
  },
} satisfies Story

export const 페이지_10개 = {
  render: function TenPages() {
    const [current, setCurrent] = useState(0)

    return <PageIndicator total={10} current={current} onPageChange={setCurrent} />
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
        <PageIndicator total={total} current={current} />
        <p style={{ marginTop: '16px', fontSize: '14px' }}>
          페이지 {current + 1} / {total}
        </p>
      </div>
    )
  },
} satisfies Story

export const 배경과_함께 = {
  render: function WithBackground() {
    const [current, setCurrent] = useState(0)

    return (
      <div
        style={{
          padding: '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
        }}
      >
        <PageIndicator total={5} current={current} onPageChange={setCurrent} />
      </div>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    total: 5,
    current: 0,
  },
  argTypes: {
    total: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    current: {
      control: { type: 'range', min: 0, max: 9, step: 1 },
    },
  },
  render: function Controlled({ current: currentProp, onPageChange, ...rest }) {
    const [current, setCurrent] = useState(currentProp || 0)

    useEffect(() => {
      setCurrent(currentProp || 0)
    }, [currentProp])

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
