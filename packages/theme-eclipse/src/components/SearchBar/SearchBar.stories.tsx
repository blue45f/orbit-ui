import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { SearchBar } from './SearchBar'

const meta = {
  title: 'eclipse/2. Inputs/Text Fields/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: '검색어를 입력하세요',
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    caption: {
      control: 'text',
      description: 'Caption 텍스트',
    },
    disabled: {
      table: {
        disable: true,
      },
    },
    value: {
      control: 'text',
      description: '입력된 값 (있으면 Populated 상태)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style', 'axis'],
    },
  },
  render: (args) => <SearchBar {...args} />,
}

const FocusedExample = ({ value, placeholder }: { value?: string; placeholder?: string }) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div>
      <SearchBar
        value={value}
        placeholder={placeholder}
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
            <SearchBar placeholder="검색어를 입력하세요" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Focused</p>
            <FocusedExample placeholder="검색어를 입력하세요" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</p>
            <SearchBar placeholder="검색어를 입력하세요" disabled />
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Populated</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <SearchBar placeholder="검색어를 입력하세요" />
              <FocusedExample placeholder="검색어를 입력하세요" />
              <SearchBar placeholder="검색어를 입력하세요" disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <SearchBar value="검색어" placeholder="검색어를 입력하세요" />
              <FocusedExample value="검색어" placeholder="검색어를 입력하세요" />
              <SearchBar value="검색어" placeholder="검색어를 입력하세요" disabled />
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
          ClearButton은 값이 있을 때만 표시됩니다 (onPopulated)
        </p>
        <SearchBar placeholder="검색어를 입력하세요" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>값이 있는 경우</p>
        <SearchBar value="검색어" placeholder="검색어를 입력하세요" />
      </div>
    </div>
  ),
}

export const 캡션_사용: Story = {
  args: {
    caption: '100개',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <SearchBar {...args} />
    </div>
  ),
}

export const 디자인QA = {
  args: {
    placeholder: '검색어를 입력하세요',
    onChange: fn(),
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ ...args }: any) => <SearchBar {...args} />,
}
