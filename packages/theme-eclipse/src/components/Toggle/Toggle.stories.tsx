import type { Meta, StoryObj } from '@storybook/react'

import { Toggle } from './Toggle'

Toggle.displayName = 'Toggle'

const meta = {
  title: 'eclipse/Inputs/Selection/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: (args) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      <Toggle {...args} />
      <span style={{ fontSize: '14px' }}>기본 토글</span>
    </label>
  ),
}

export const 디자인_QA: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <label htmlFor="toggle-basic" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <Toggle id="toggle-basic" />
        <span style={{ fontSize: '14px' }}>기본</span>
      </label>

      <label htmlFor="toggle-checked" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <Toggle id="toggle-checked" defaultChecked />
        <span style={{ fontSize: '14px' }}>기본 체크됨</span>
      </label>

      <label htmlFor="toggle-disabled" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', opacity: 0.5 }}>
        <Toggle id="toggle-disabled" disabled />
        <span style={{ fontSize: '14px' }}>비활성화</span>
      </label>

      <label htmlFor="toggle-disabled-checked" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', opacity: 0.5 }}>
        <Toggle id="toggle-disabled-checked" disabled defaultChecked />
        <span style={{ fontSize: '14px' }}>비활성화 (체크됨)</span>
      </label>
    </div>
  ),
}
