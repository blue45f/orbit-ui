import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useEffect, useState } from 'react'

import { Dropdown, type DropdownProps } from './Dropdown'

const meta = {
  title: 'Foundation/Dropdown',
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

const DefaultExample = (args: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(args.activated ?? false)

  useEffect(() => {
    setIsOpen(args.activated ?? false)
  }, [args.activated])

  return <Dropdown {...args} activated={isOpen} onClick={() => setIsOpen(!isOpen)} />
}

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style'],
    },
  },
  render: (args) => <DefaultExample {...args} />,
}

const WithLeadingExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dropdown value="Option 1" activated={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <Dropdown.Leading>$</Dropdown.Leading>
    </Dropdown>
  )
}

export const Leading: Story = {
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

const AllStatesExample = () => {
  const [unselectedEnabledOpen, setUnselectedEnabledOpen] = useState(false)
  const [unselectedActivatedOpen, setUnselectedActivatedOpen] = useState(false)
  const [selectedEnabledOpen, setSelectedEnabledOpen] = useState(false)
  const [selectedActivatedOpen, setSelectedActivatedOpen] = useState(false)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        width: '600px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '8px' }}>Unselected (value 없음)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Dropdown
            placeholder="Enabled"
            activated={unselectedEnabledOpen}
            onClick={() => setUnselectedEnabledOpen(!unselectedEnabledOpen)}
          />
          <Dropdown
            placeholder="Activated"
            activated={unselectedActivatedOpen}
            onClick={() => setUnselectedActivatedOpen(!unselectedActivatedOpen)}
          />
          <Dropdown placeholder="Disabled" disabled />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Selected (value 있음)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Dropdown
            value="Enabled"
            activated={selectedEnabledOpen}
            onClick={() => setSelectedEnabledOpen(!selectedEnabledOpen)}
          />
          <Dropdown
            value="Activated"
            activated={selectedActivatedOpen}
            onClick={() => setSelectedActivatedOpen(!selectedActivatedOpen)}
          />
          <Dropdown value="Disabled" disabled />
        </div>
      </div>
    </div>
  )
}

export const 모든상태: Story = {
  render: () => <AllStatesExample />,
}

export const 디자인QA = {
  args: {
    value: '',
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
  render: function RenderComponent({ leading, trailing, ...args }: any) {
    const [isOpen, setIsOpen] = useState(args.activated ?? false)

    useEffect(() => {
      setIsOpen(args.activated ?? false)
    }, [args.activated])

    return (
      <Dropdown {...args} activated={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {leading && (
          <Dropdown.Leading>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
            </svg>
          </Dropdown.Leading>
        )}
        {trailing && (
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
        )}
      </Dropdown>
    )
  },
}
