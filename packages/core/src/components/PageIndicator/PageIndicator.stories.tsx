import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { PageIndicator } from './PageIndicator'

PageIndicator.displayName = 'PageIndicator'

/** Simple dot element for stories */
const Dot: React.FC<{ selected?: boolean; onClick?: () => void; style?: React.CSSProperties }> = ({
  selected,
  onClick,
  style,
}) => (
  <button
    type="button"
    role="tab"
    aria-selected={selected}
    onClick={onClick}
    style={{
      width: 6,
      height: 6,
      borderRadius: '50%',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      backgroundColor: selected ? '#333' : '#ccc',
      transition: 'background-color 0.2s',
      ...style,
    }}
  />
)

function createDots(count: number, dotSize?: number) {
  return Array.from({ length: count }, (_, i) => (
    <Dot key={i} style={dotSize ? { width: dotSize, height: dotSize } : undefined} />
  ))
}

const meta = {
  title: 'foundation/PageIndicator',
  component: PageIndicator,
  args: {
    currentPage: 0,
  },
  argTypes: {
    onPageChange: { action: 'page changed' },
  },
} satisfies Meta<typeof PageIndicator>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: function Basic({ onPageChange, ...rest }) {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator
        {...rest}
        currentPage={currentPage}
        onPageChange={(page) => {
          onPageChange?.(page)
          setCurrentPage(page)
        }}
      >
        {createDots(5)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 페이지_3개 = {
  render: function ThreePages({ onPageChange, ...rest }) {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator
        {...rest}
        currentPage={currentPage}
        onPageChange={(page) => {
          onPageChange?.(page)
          setCurrentPage(page)
        }}
      >
        {createDots(3)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 페이지_10개 = {
  render: function TenPages({ onPageChange, ...rest }) {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator
        {...rest}
        currentPage={currentPage}
        onPageChange={(page) => {
          onPageChange?.(page)
          setCurrentPage(page)
        }}
      >
        {createDots(10)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 첫_페이지 = {
  args: {
    currentPage: 0,
  },
  render: (args) => <PageIndicator {...args}>{createDots(5)}</PageIndicator>,
} satisfies Story

export const 중간_페이지 = {
  args: {
    currentPage: 2,
  },
  render: (args) => <PageIndicator {...args}>{createDots(5)}</PageIndicator>,
} satisfies Story

export const 마지막_페이지 = {
  args: {
    currentPage: 4,
  },
  render: (args) => <PageIndicator {...args}>{createDots(5)}</PageIndicator>,
} satisfies Story

export const Dot_크기_변경 = {
  render: function DotSizeVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <div>Size 6 (default)</div>
          <PageIndicator currentPage={2}>{createDots(5, 6)}</PageIndicator>
        </div>
        <div>
          <div>Size 9</div>
          <PageIndicator currentPage={2}>{createDots(5, 9)}</PageIndicator>
        </div>
        <div>
          <div>Size 12</div>
          <PageIndicator currentPage={2}>{createDots(5, 12)}</PageIndicator>
        </div>
      </div>
    )
  },
} satisfies Story

export const 자동_페이징 = {
  render: function AutoPaging() {
    const [currentPage, setCurrentPage] = useState(0)
    const total = 5

    // Auto-advance page every second for demo
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % total)
      }, 1000)
      return () => clearInterval(interval)
    }, [])

    return (
      <div>
        <div>
          Current Page: {currentPage + 1}/{total}
        </div>
        <PageIndicator currentPage={currentPage}>{createDots(total)}</PageIndicator>
      </div>
    )
  },
} satisfies Story
