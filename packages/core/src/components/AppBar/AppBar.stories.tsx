/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForwardIcon, MenuIcon } from '@ui-forge/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { TextField } from '../TextField'

import { AppBar } from './AppBar'

const meta: Meta<typeof AppBar> = {
  title: 'foundation/AppBar',
  component: AppBar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    (Story) => {
      return (
        <div style={{ background: '#f6f6f6', margin: '-1rem', height: '100vh' }}>
          <Story />
        </div>
      )
    },
  ],
  argTypes: {
    arrangement: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'equal-weight'],
    },
    alignment: {
      control: 'select',
      options: ['center', 'bottom', 'top'],
    },
    height: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof AppBar>

export const 기본: Story = {
  args: {
    children: '페이지 제목',
  },
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Center>Hello, World!</AppBar.Center>
    </AppBar>
  ),
}

export const 최대_너비: Story = {
  args: {
    children: '페이지 제목',
    maxWidth: 300,
  },
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Leading>
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
      </AppBar.Leading>
      <AppBar.Center>Hello, World!</AppBar.Center>
    </AppBar>
  ),
}

export const 아이콘_포함: Story = {
  args: {
    children: '페이지 제목',
  },
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Leading>
        <MenuIcon />
      </AppBar.Leading>
      <AppBar.Center>Hello, World!</AppBar.Center>
      <AppBar.Trailing>
        <ForwardIcon />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 검색_필드_포함: Story = {
  render: function WithSearchFieldComponent() {
    const [value, setValue] = useState('')

    return (
      <AppBar>
        <AppBar.Leading>
          <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
        </AppBar.Leading>
        <AppBar.Center>
          <TextField
            style={{ width: '100%' }}
            placeholder='Search..'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <TextField.ClearButton visibility='onPopulated' onClick={() => console.log('Cleared!')} />
          </TextField>
        </AppBar.Center>
        <AppBar.Trailing>
          <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
        </AppBar.Trailing>
      </AppBar>
    )
  },
}

export const 멀티_슬롯: Story = {
  args: {
    children: '페이지 제목',
    arrangement: 'start',
  },
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Leading>
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
      </AppBar.Leading>
      <AppBar.Center>Hello, World!</AppBar.Center>
      <AppBar.Trailing>
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 중앙_정렬: Story = {
  args: {
    children: '페이지 제목',
    arrangement: 'equal-weight',
  },
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Leading>
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
      </AppBar.Leading>
      <AppBar.Center>Hello, World!</AppBar.Center>
      <AppBar.Trailing>
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 커스텀_테마: Story = {
  args: {
    children: '커스텀 테마',
    theme: {
      fillColor: 'green',
      foregroundColor: '#333',
      paddingHorizontal: '16px',
      gap: '12px',
    },
  },
  render: (args) => (
    <AppBar {...args}>
      <AppBar.Leading>
        <div style={{ width: 24, height: 24, background: '#666', borderRadius: 4 }} />
      </AppBar.Leading>
      <AppBar.Center>Hello, World!</AppBar.Center>
      <AppBar.Trailing>
        <div style={{ width: 24, height: 24, background: '#666', borderRadius: 4 }} />
      </AppBar.Trailing>
    </AppBar>
  ),
}

export const 스크롤: Story = {
  args: {
    children: '페이지 제목',
    arrangement: 'equal-weight',
  },
  render: (args) => (
    <div>
      <AppBar {...args}>
        <AppBar.Center>Hello, World!</AppBar.Center>
      </AppBar>
      {[...Array(100)].map((_, index) => (
        <div key={index} style={{ height: 30, background: '#f6f6f6' }}>
          {index} 번 요소
        </div>
      ))}
    </div>
  ),
}

export const 디자인QA: Story = {
  args: {
    children: '페이지 제목',
    arrangement: 'equal-weight',
    leadingActionCount: 0,
    trailingActionCount: 0,
  } as never,
  argTypes: {
    leadingActionCount: {
      control: { type: 'number', min: 0, max: 3, step: 1 },
      description: 'Leading 영역 액션 버튼 개수',
    },
    trailingActionCount: {
      control: { type: 'number', min: 0, max: 3, step: 1 },
      description: 'Trailing 영역 액션 버튼 개수',
    },
  } as never,
  render: (args) => (
    <div>
      <AppBar {...args}>
        <AppBar.Leading>
          <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
        </AppBar.Leading>
        <AppBar.Center>Hello, World!</AppBar.Center>
        <AppBar.Trailing>
          <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }} />
        </AppBar.Trailing>
      </AppBar>
      {[...Array(100)].map((_, index) => (
        <div key={index} style={{ height: 30, background: '#f6f6f6' }}>
          {index} 번 요소
        </div>
      ))}
    </div>
  ),
}
