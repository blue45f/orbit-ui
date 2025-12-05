import { CheckIcon, ChevronRightLineIcon } from '@ui-forge/icons'
import { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '../Checkbox'

import { ListNode } from './ListNode'

ListNode.displayName = 'ListNode'

const meta = {
  title: 'foundation/ListNode',
  component: ListNode,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
} satisfies Meta<typeof ListNode>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: ({ ...args }) => (
    <ListNode {...args}>
      <ListNode.Center>
        <div style={{ fontSize: 20, fontWeight: 700 }}>List Header</div>
      </ListNode.Center>
    </ListNode>
  ),
} satisfies Story

export const 인터랙티브 = {
  render: ({ ...args }) => (
    <div style={{ width: 375 }}>
      <ListNode as='button' onClick={() => alert('clicked')} {...args}>
        <ListNode.Leading>
          <CheckIcon size={18} />
        </ListNode.Leading>
        <ListNode.Center>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Title</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Description</div>
        </ListNode.Center>
      </ListNode>
    </div>
  ),
} satisfies Story

export const Leading과_Trailing = {
  render: ({ ...args }) => (
    <div style={{ width: 375 }}>
      <ListNode as='button' {...args}>
        <ListNode.Leading>
          <div
            style={{
              width: 45,
              height: 45,
              borderRadius: 8,
              background: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            IMG
          </div>
        </ListNode.Leading>
        <ListNode.Center>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Title</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Description</div>
        </ListNode.Center>
        <ListNode.Trailing>
          <span style={{ fontSize: 12, color: '#999' }}>→</span>
        </ListNode.Trailing>
      </ListNode>
    </div>
  ),
} satisfies Story

export const Trailing만 = {
  render: ({ ...args }) => (
    <div style={{ width: 375 }}>
      <ListNode as='button' {...args}>
        <ListNode.Center>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Title</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Description</div>
        </ListNode.Center>
        <ListNode.Trailing>
          <div>
            <div style={{ fontSize: 13, color: '#666', textAlign: 'right' }}>Detail</div>
            <div style={{ fontSize: 12, color: '#999', textAlign: 'right', marginTop: 2 }}>
              <ChevronRightLineIcon size={12} />
            </div>
          </div>
        </ListNode.Trailing>
      </ListNode>
    </div>
  ),
} satisfies Story

export const 비활성화 = {
  render: ({ ...args }) => (
    <div style={{ width: 375 }}>
      <ListNode as='button' disabled {...args}>
        <ListNode.Leading>
          <Checkbox disabled>
            <Checkbox.Icon>
              <CheckIcon size={18} />
            </Checkbox.Icon>
          </Checkbox>
        </ListNode.Leading>
        <ListNode.Center>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Title</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Description</div>
        </ListNode.Center>
      </ListNode>
    </div>
  ),
} satisfies Story

export const 디자인_QA = {
  render: ({ ...args }) => (
    <div style={{ width: 375, border: '1px solid #e0e0e0' }}>
      {/* List Header */}
      <ListNode {...args}>
        <ListNode.Center>
          <div style={{ fontSize: 20, fontWeight: 700 }}>List Header</div>
        </ListNode.Center>
      </ListNode>

      <ListNode as='button' {...args}>
        <ListNode.Center>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Button Item</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>인터렉션이 가능한 상태</div>
        </ListNode.Center>
        <ListNode.Trailing>
          <ChevronRightLineIcon size={18} color='#222' />
        </ListNode.Trailing>
      </ListNode>

      <ListNode as='a' {...args}>
        <ListNode.Center>
          <div style={{ fontSize: 16, fontWeight: 600 }}>A Item</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>인터렉션이 가능한 상태</div>
        </ListNode.Center>
        <ListNode.Trailing>
          <ChevronRightLineIcon size={18} color='#222' />
        </ListNode.Trailing>
      </ListNode>

      <ListNode as='li' {...args}>
        <ListNode.Leading>
          <div style={{ width: '32px', fontSize: '16px', fontWeight: 'bold' }}>Li</div>
        </ListNode.Leading>
        <ListNode.Center>
          <div style={{ fontSize: 16, fontWeight: 600 }}>List Item</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>단순 리스트 형태 (인터렉션 불가)</div>
        </ListNode.Center>
      </ListNode>

      <ListNode as='div' {...args}>
        <ListNode.Leading>
          <div style={{ width: '32px', fontSize: '16px', fontWeight: 'bold' }}>Div</div>
        </ListNode.Leading>
        <ListNode.Center>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Div Item</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>단순 박스 형태 (인터렉션 불가)</div>
        </ListNode.Center>
        <ListNode.Trailing>
          <div style={{ fontSize: 13, color: '#666' }}>Trailing</div>
        </ListNode.Trailing>
      </ListNode>
    </div>
  ),
} satisfies Story
