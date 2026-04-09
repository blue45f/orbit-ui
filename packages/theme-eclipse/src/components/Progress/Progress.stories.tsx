import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@orbit-ui/core'

import { Progress } from './Progress'

const meta = {
  title: 'eclipse/4. Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 50,
    size: 'medium',
    color: 'primary',
    indeterminate: false
  }
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

const StoryWrapper = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '500px' }}>
    <h4 style={{ margin: 0, fontSize: '14px', opacity: 0.6, fontWeight: 600 }}>{title}</h4>
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
    <Flex flexDirection="column" gap="3rem" width="100%">
      <StoryWrapper title="Interactive (Auto-animate)">
        <Progress {...args} value={progress} />
      </StoryWrapper>

      <StoryWrapper title="Sizes">
        <Flex flexDirection="column" gap="20px">
          <Progress size="small" value={30} />
          <Progress size="medium" value={50} />
          <Progress size="large" value={80} />
        </Flex>
      </StoryWrapper>

      <StoryWrapper title="Colors">
        <Flex flexDirection="column" gap="20px">
          <Progress color="primary" value={70} />
          <Progress color="success" value={90} />
          <Progress color="warning" value={40} />
        </Flex>
      </StoryWrapper>

      <StoryWrapper title="Indeterminate (Loading)">
        <Progress indeterminate />
      </StoryWrapper>
    </Flex>
  )
}

export const 기본: Story = {
  render: (args) => <InteractiveProgress {...args} />
}
