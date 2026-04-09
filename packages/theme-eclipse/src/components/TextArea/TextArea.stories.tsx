import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { TextArea } from './TextArea'

const meta = {
  title: 'eclipse/2. Inputs/Text Fields/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text',
    disabled: false,
    error: false,
    minimumLine: 3,
    onChange: fn(),
  },
  argTypes: {
    value: {
      control: 'text',
      description: '입력된 값 (있으면 Populated 상태)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    minimumLine: {
      control: 'number',
      description: '최소 줄 수',
    },
    maximumLine: {
      control: 'number',
      description: '최대 줄 수',
    },
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style', 'axis'],
    },
  },
  render: (args) => <TextArea {...args} />,
}

const FocusedExample = ({
  value,
  placeholder,
  error,
  minimumLine,
}: {
  value?: string
  placeholder?: string
  error?: boolean
  minimumLine?: number
}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div>
      <TextArea
        value={value}
        placeholder={placeholder}
        error={error}
        minimumLine={minimumLine}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <small style={{ display: 'block', marginTop: '4px', color: '#666' }}>
        {isFocused ? '(Focused - 클릭하여 포커스)' : '(클릭하여 포커스)'}
      </small>
    </div>
  )
}

export const 모든상태: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        width: '800px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>State</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Enabled</p>
            <TextArea placeholder="Enter text" minimumLine={3} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Focused</p>
            <FocusedExample placeholder="Enter text" minimumLine={3} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</p>
            <TextArea placeholder="Enter text" minimumLine={3} disabled />
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Populated</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea placeholder="Enter text" minimumLine={3} />
              <FocusedExample placeholder="Enter text" minimumLine={3} />
              <TextArea placeholder="Enter text" minimumLine={3} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
              />
              <FocusedExample
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
              />
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const 에러상태: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        width: '800px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Error: false</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea placeholder="Enter text" minimumLine={3} error={false} />
              <FocusedExample placeholder="Enter text" minimumLine={3} error={false} />
              <TextArea placeholder="Enter text" minimumLine={3} error={false} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={false}
              />
              <FocusedExample
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={false}
              />
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={false}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Error: true</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea placeholder="Enter text" minimumLine={3} error={true} />
              <FocusedExample placeholder="Enter text" minimumLine={3} error={true} />
              <TextArea placeholder="Enter text" minimumLine={3} error={true} disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={true}
              />
              <FocusedExample
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={true}
              />
              <TextArea
                value={`Sample text\nLine 2\nLine 3`}
                placeholder="Enter text"
                minimumLine={3}
                error={true}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const 디자인QA = {
  args: {
    placeholder: 'Enter text',
    disabled: false,
    error: false,
    minimumLine: 3,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ ...args }: any) => <TextArea {...args} />,
}
