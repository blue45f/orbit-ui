import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { FloatingTextField } from './FloatingTextField'

const meta = {
  title: 'mint/Text Fields/FloatingTextField',
  component: FloatingTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: '이메일을 입력하세요',
    disabled: false,
    error: false,
    onChange: fn(),
  },
  argTypes: {
    value: {
      control: 'text',
      description: '입력된 값 (있으면 Populated 상태)',
    },
    placeholder: {
      control: 'text',
      description: '라벨로 표시될 플레이스홀더 텍스트',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
  },
} satisfies Meta<typeof FloatingTextField>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style', 'type'],
    },
  },
  render: (args) => <FloatingTextField {...args} style={{ width: '300px' }} />,
}

const FocusedExample = ({ value, placeholder, error }: { value?: string; placeholder?: string; error?: boolean }) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div>
      <FloatingTextField
        value={value}
        placeholder={placeholder}
        error={error}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ width: '300px' }}
      />
      <small style={{ display: 'block', marginTop: '4px', color: '#666' }}>
        {isFocused ? '(Focused - 클릭하여 포커스)' : '(클릭하여 포커스)'}
      </small>
    </div>
  )
}

export const 모든상태: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '1000px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>State</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Enabled</p>
            <FloatingTextField placeholder='이메일을 입력하세요' style={{ width: '300px' }} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Focused</p>
            <FocusedExample placeholder='이메일을 입력하세요' />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</p>
            <FloatingTextField placeholder='이메일을 입력하세요' disabled style={{ width: '300px' }} />
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Populated</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField placeholder='이메일을 입력하세요' style={{ width: '300px' }} />
              <FocusedExample placeholder='이메일을 입력하세요' />
              <FloatingTextField placeholder='이메일을 입력하세요' disabled style={{ width: '300px' }} />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField
                value='user@example.com'
                placeholder='이메일을 입력하세요'
                style={{ width: '300px' }}
              />
              <FocusedExample value='user@example.com' placeholder='이메일을 입력하세요' />
              <FloatingTextField
                value='user@example.com'
                placeholder='이메일을 입력하세요'
                disabled
                style={{ width: '300px' }}
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '1000px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Error: false</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField placeholder='이메일을 입력하세요' error={false} style={{ width: '300px' }} />
              <FocusedExample placeholder='이메일을 입력하세요' error={false} />
              <FloatingTextField
                placeholder='이메일을 입력하세요'
                error={false}
                disabled
                style={{ width: '300px' }}
              />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField
                value='user@example.com'
                placeholder='이메일을 입력하세요'
                error={false}
                style={{ width: '300px' }}
              />
              <FocusedExample value='user@example.com' placeholder='이메일을 입력하세요' error={false} />
              <FloatingTextField
                value='user@example.com'
                placeholder='이메일을 입력하세요'
                error={false}
                disabled
                style={{ width: '300px' }}
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
              <FloatingTextField placeholder='이메일을 입력하세요' error={true} style={{ width: '300px' }} />
              <FocusedExample placeholder='이메일을 입력하세요' error={true} />
              <FloatingTextField
                placeholder='이메일을 입력하세요'
                error={true}
                disabled
                style={{ width: '300px' }}
              />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FloatingTextField
                value='user@example.com'
                placeholder='이메일을 입력하세요'
                error={true}
                style={{ width: '300px' }}
              />
              <FocusedExample value='user@example.com' placeholder='이메일을 입력하세요' error={true} />
              <FloatingTextField
                value='user@example.com'
                placeholder='이메일을 입력하세요'
                error={true}
                disabled
                style={{ width: '300px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ClearButton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
          ClearButton은 포커스되고 값이 있을 때만 표시됩니다 (onFocused)
        </p>
        <FloatingTextField placeholder='이메일을 입력하세요' style={{ width: '300px' }} />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>값이 있는 경우 (포커스 필요)</p>
        <FloatingTextField
          value='user@example.com'
          placeholder='이메일을 입력하세요'
          style={{ width: '300px' }}
        />
      </div>
    </div>
  ),
}

export const 디자인QA = {
  args: {
    placeholder: 'Enter text',
    disabled: false,
    error: false,
    width: '300px',
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ width, ...args }: any) => <FloatingTextField {...args} style={{ width }} />,
}
