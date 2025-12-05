import { Flex } from '@ui-forge/core'
import { ChevronRightLineIcon, CheckIcon, ChevronDownLineIcon } from '@ui-forge/icons'
import type { Meta, StoryObj } from '@storybook/react'

import { ContainedCheckbox } from '../BoxedCheckbox'
import { Radio } from '../RadioButton'
import { Switch } from '../Toggle'

import { ListTile } from './ListTile'

ListTile.displayName = 'ListTile'
ListTile.Leading.displayName = 'ListTile.Leading'
ListTile.Title.displayName = 'ListTile.Title'
ListTile.Description.displayName = 'ListTile.Description'
ListTile.Trailing.displayName = 'ListTile.Trailing'

const meta = {
  title: 'mint/Lists/ListTile',
  component: ListTile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
} satisfies Meta<typeof ListTile>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
      </ListTile>
    </div>
  ),
}

export const Leading_Trailing: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile as='button' onClick={() => alert('clicked')}>
        <ListTile.Leading>
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
        </ListTile.Leading>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
        <ListTile.Trailing>
          <ChevronRightLineIcon size={18} color='#222' />
        </ListTile.Trailing>
      </ListTile>
    </div>
  ),
}

export const 인터랙티브: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile as='button' onClick={() => alert('clicked')}>
        <ListTile.Leading>
          <CheckIcon size={18} />
        </ListTile.Leading>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
      </ListTile>
    </div>
  ),
}

export const 비활성화: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile as='button' disabled>
        <ListTile.Leading>
          <CheckIcon size={18} />
        </ListTile.Leading>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
      </ListTile>
    </div>
  ),
}

export const Trailing만: Story = {
  render: () => (
    <div style={{ width: 375 }}>
      <ListTile as='button' onClick={() => alert('clicked')}>
        <ListTile.Title>Title</ListTile.Title>
        <ListTile.Description>Description</ListTile.Description>
        <ListTile.Trailing>
          <div>
            <div style={{ fontSize: 13, color: '#666', textAlign: 'right' }}>Detail</div>
            <div style={{ fontSize: 12, color: '#999', textAlign: 'right', marginTop: 2 }}>
              <ChevronRightLineIcon size={12} />
            </div>
          </div>
        </ListTile.Trailing>
      </ListTile>
    </div>
  ),
}

export const 디자인_QA: Story = {
  render: () => (
    <Flex flexDirection='column' gap='20px'>
      <ListTile>
        <ListTile.Title>일반 리스트 아이템</ListTile.Title>
        <ListTile.Description>단순 리스트 형태 (인터렉션 불가, 터치 없음)</ListTile.Description>
      </ListTile>

      <ListTile as='label' htmlFor='checkbox-list-item'>
        <ListTile.Leading>
          <ContainedCheckbox id='checkbox-list-item' />
        </ListTile.Leading>
        <ListTile.Title>체크박스 리스트 아이템</ListTile.Title>
        <ListTile.Description>인터랙티브 리스트 형태 (인터렉션 가능, 전체가 터치영역)</ListTile.Description>
      </ListTile>

      <ListTile as='label' htmlFor='radio-list-item'>
        <ListTile.Leading>
          <Radio id='radio-list-item' value='ryu' />
        </ListTile.Leading>
        <ListTile.Title>라디오 리스트 아이템</ListTile.Title>
        <ListTile.Description>인터랙티브 리스트 형태 (인터렉션 가능, 전체가 터치영역)</ListTile.Description>
      </ListTile>

      <ListTile as='a' href='#'>
        <ListTile.Title>링크 리스트 아이템</ListTile.Title>
        <ListTile.Description>인터랙티브 리스트 형태 (인터렉션 가능, 전체가 터치영역)</ListTile.Description>
        <ListTile.Trailing>
          <ChevronRightLineIcon />
        </ListTile.Trailing>
      </ListTile>

      <ListTile as='button'>
        <ListTile.Title>아코디언 리스트 아이템</ListTile.Title>
        <ListTile.Description>인터랙티브 리스트 형태 (인터렉션 가능, 전체가 터치영역)</ListTile.Description>
        <ListTile.Trailing>
          <ChevronDownLineIcon />
        </ListTile.Trailing>
      </ListTile>

      <ListTile as='li'>
        <ListTile.Title>스위치 리스트 아이템</ListTile.Title>
        <ListTile.Description>단순 리스트 형태 (액션 요소만 터치 영역)</ListTile.Description>
        <ListTile.Trailing>
          <Switch />
        </ListTile.Trailing>
      </ListTile>
    </Flex>
  ),
}
