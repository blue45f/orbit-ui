import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@heejun-com/core'

import { Progress } from './Progress'

const meta = {
  title: 'eclipse/Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 50,
    size: 'medium',
    color: 'primary',
    indeterminate: false,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', letterSpacing: '-0.01em' }}>
    {children}
  </div>
)

const InteractiveProgress = (args: any) => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Flex flexDirection="column" gap="2.5rem" style={{ width: '100%', maxWidth: '480px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Interactive (Auto-animate)</SectionLabel>
        <Progress {...args} value={progress} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Sizes</SectionLabel>
        <Flex flexDirection="column" gap="16px">
          <Progress size="small" value={30} />
          <Progress size="medium" value={50} />
          <Progress size="large" value={80} />
        </Flex>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Colors</SectionLabel>
        <Flex flexDirection="column" gap="16px">
          <Progress color="primary" value={70} />
          <Progress color="success" value={90} />
          <Progress color="warning" value={40} />
        </Flex>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionLabel>Indeterminate (Loading)</SectionLabel>
        <Progress indeterminate />
      </div>
    </Flex>
  )
}

export const 기본: Story = {
  render: (args) => <InteractiveProgress {...args} />,
}

export const 사이즈: Story = {
  render: () => (
    <Flex flexDirection="column" gap="16px" style={{ width: '100%', maxWidth: '480px' }}>
      <Progress size="small" value={40} />
      <Progress size="medium" value={60} />
      <Progress size="large" value={80} />
    </Flex>
  ),
}

export const 색상: Story = {
  render: () => (
    <Flex flexDirection="column" gap="16px" style={{ width: '100%', maxWidth: '480px' }}>
      <Progress color="primary" value={60} />
      <Progress color="success" value={80} />
      <Progress color="warning" value={45} />
    </Flex>
  ),
}

export const 로딩: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      <Progress indeterminate />
    </div>
  ),
}
