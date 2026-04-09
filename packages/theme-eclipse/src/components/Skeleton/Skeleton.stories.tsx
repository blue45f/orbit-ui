import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@heejun-com/core'

import { Skeleton } from './Skeleton'

const meta = {
  title: 'eclipse/Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

const Card = ({ children }: { children: React.ReactNode }) => (
  <div style={{ 
    width: '300px', 
    padding: '1.5rem', 
    borderRadius: '16px', 
    border: '1px solid var(--sem-eclipse-color-borderSecondary)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    {children}
  </div>
)

export const 기본: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h4 style={{ marginBottom: '1.5rem', fontSize: '14px', opacity: 0.6, fontWeight: 600 }}>Simple Shapes</h4>
        <Flex flexDirection="column" gap="12px">
          <Skeleton height={20} width="60%" />
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="40%" />
          <Skeleton height={100} width="100%" />
        </Flex>
      </div>

      <div>
        <h4 style={{ marginBottom: '1.5rem', fontSize: '14px', opacity: 0.6, fontWeight: 600 }}>Example Composition (Card)</h4>
        <Card>
          <Skeleton height={150} width="100%" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Skeleton height={40} width={40} style={{ borderRadius: '50%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Skeleton height={12} width="70%" />
              <Skeleton height={10} width="40%" />
            </div>
          </div>
          <Skeleton height={40} width="100%" style={{ marginTop: '0.5rem' }} />
        </Card>
      </div>
    </div>
  )
}
