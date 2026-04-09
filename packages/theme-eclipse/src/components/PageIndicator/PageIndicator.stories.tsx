import { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useState } from 'react'

import { PageIndicator } from './PageIndicator'

/**
 * Helper to generate dot children for PageIndicator.
 * The core PageIndicator uses children (PageDots) to represent pages,
 * with `currentPage` controlling which is selected.
 */
const generateDots = (count: number) => Array.from({ length: count }, (_, i) => <span key={i} />)

const meta = {
  title: 'eclipse/5. Navigation/PageIndicator',
  component: PageIndicator,
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
        onPageChange={(page: number) => {
          onPageChange?.(page)
          setCurrentPage(page)
        }}
      >
        {generateDots(5)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 페이지_3개 = {
  render: function ThreePages() {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator currentPage={currentPage} onPageChange={setCurrentPage}>
        {generateDots(3)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 페이지_5개 = {
  render: function FivePages() {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator currentPage={currentPage} onPageChange={setCurrentPage}>
        {generateDots(5)}
      </PageIndicator>
    )
  },
} satisfies Story

export const 페이지_10개 = {
  render: function TenPages() {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <PageIndicator currentPage={currentPage} onPageChange={setCurrentPage}>
        {generateDots(10)}
      </PageIndicator>
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
        <PageIndicator currentPage={currentPage}>{generateDots(total)}</PageIndicator>
        <p style={{ marginTop: '16px', fontSize: '14px' }}>
          페이지 {currentPage + 1} / {total}
        </p>
      </div>
    )
  },
} satisfies Story

export const 배경과_함께 = {
  render: function WithBackground() {
    const [currentPage, setCurrentPage] = useState(0)

    return (
      <div
        style={{
          padding: '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
        }}
      >
        <PageIndicator currentPage={currentPage} onPageChange={setCurrentPage}>
          {generateDots(5)}
        </PageIndicator>
      </div>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    currentPage: 0,
  },
  argTypes: {
    currentPage: {
      control: { type: 'range', min: 0, max: 9, step: 1 },
    },
  },
  render: function Controlled({ currentPage: currentPageProp, onPageChange, ...rest }) {
    const [currentPage, setCurrentPage] = useState(currentPageProp || 0)

    useEffect(() => {
      setCurrentPage(currentPageProp || 0)
    }, [currentPageProp])

    return (
      <PageIndicator
        {...rest}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          onPageChange?.(page)
          setCurrentPage(page)
        }}
      >
        {generateDots(10)}
      </PageIndicator>
    )
  },
} satisfies Story
