import { ChevronRightLineIcon, SearchIcon } from '@heejun-com/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { Dropdown } from './Dropdown'

const meta = {
  title: 'eclipse/Inputs/Pickers/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: '',
    placeholder: '선택하세요',
    activated: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    value: {
      control: 'text',
      description: '선택된 값 (있으면 selected 상태)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style'],
    },
  },
  render: (args) => <Dropdown {...args} />,
}

const WithLeadingExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dropdown value="Option 1" activated={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <Dropdown.Leading>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Dropdown.Leading>
    </Dropdown>
  )
}

export const 기본_Leading: Story = {
  render: () => <WithLeadingExample />,
}

const WithCustomTrailingExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dropdown value="Option 1" activated={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <Dropdown.Trailing>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 5L15 12L9 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Dropdown.Trailing>
    </Dropdown>
  )
}

export const 커스텀_Trailing: Story = {
  render: () => <WithCustomTrailingExample />,
}

const LongTextExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{ width: '200px' }}>
      <Dropdown
        value="This is a very long text that should be truncated when it exceeds the available space"
        activated={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Dropdown.Leading>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
          </svg>
        </Dropdown.Leading>
      </Dropdown>
    </div>
  )
}

export const 긴텍스트: Story = {
  render: () => <LongTextExample />,
}

const FocusedExample = ({ value, placeholder }: { value?: string; placeholder?: string }) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div>
      <Dropdown
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
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        width: '900px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '8px' }}>Unselected (value 없음)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Dropdown placeholder="Enabled" />
          <FocusedExample placeholder="Focused" />
          <Dropdown placeholder="Activated" activated />
          <Dropdown placeholder="Disabled" disabled />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Dropdowned (value 있음)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Dropdown value="Enabled" />
          <FocusedExample value="Focused" />
          <Dropdown value="Activated" activated />
          <Dropdown value="Disabled" disabled />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Error</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Dropdown placeholder="Error (Unselected)" error />
          <Dropdown value="Error (Dropdowned)" error />
          <Dropdown placeholder="Error (Activated)" error activated />
          <Dropdown placeholder="Error (Disabled)" error disabled />
        </div>
      </div>
    </div>
  ),
}

export const 디자인QA = {
  args: {
    value: 'Option 1',
    placeholder: '선택하세요',
    activated: false,
    disabled: false,
    leading: true,
    trailing: true,
  },
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ leading, trailing, ...args }: any) => {
    return (
      <Dropdown {...args}>
        {leading && (
          <Dropdown.Leading>
            <SearchIcon size={24} />
          </Dropdown.Leading>
        )}
        {trailing && (
          <Dropdown.Trailing>
            <ChevronRightLineIcon size={24} />
          </Dropdown.Trailing>
        )}
      </Dropdown>
    )
  },
}
