import { Flex } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'

import { Divider } from './Divider'

Divider.displayName = 'Divider'

const meta = {
  title: 'eclipse/6. Layout/Divider',
  component: Divider,
  args: {
    orientation: 'horizontal',
    length: '100%',
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Divider 방향',
    },
    length: {
      control: 'text',
      description: 'Divider 크기 (orientation 방향의 크기)',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Divider>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args) => (
    <Flex flexDirection="column" rowGap="20px" style={{ width: '400px' }}>
      <Divider {...args} />
    </Flex>
  ),
} satisfies Story

export const 수평 = {
  render: () => (
    <Flex flexDirection="column" rowGap="20px" style={{ width: '400px' }}>
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>콘텐츠 사이 구분선</p>
        <Divider />
      </div>
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>고정 너비 (200px)</p>
        <Divider length="200px" />
      </div>
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>고정 너비 (100px)</p>
        <Divider length="100px" />
      </div>
    </Flex>
  ),
} satisfies Story

export const 수직 = {
  render: () => (
    <Flex columnGap="20px" style={{ height: '200px', padding: '20px' }}>
      <div>
        <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>전체 높이</p>
        <Divider orientation="vertical" length="100%" />
      </div>
      <div>
        <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>고정 높이 (150px)</p>
        <Divider orientation="vertical" length="150px" />
      </div>
      <div>
        <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>고정 높이 (100px)</p>
        <Divider orientation="vertical" length="100px" />
      </div>
      <div>
        <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>고정 높이 (50px)</p>
        <Divider orientation="vertical" length="50px" />
      </div>
    </Flex>
  ),
} satisfies Story

export const 사용_예시 = {
  render: () => (
    <Flex flexDirection="column" rowGap="30px" style={{ width: '400px', padding: '20px' }}>
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>
          리스트 아이템 구분
        </h3>
        <Flex flexDirection="column" rowGap="10px">
          <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            아이템 1
          </div>
          <Divider />
          <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            아이템 2
          </div>
          <Divider />
          <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            아이템 3
          </div>
        </Flex>
      </div>
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>
          버튼 그룹 구분
        </h3>
        <Flex columnGap="10px" alignItems="center">
          <button
            type="button"
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: 'white',
            }}
          >
            취소
          </button>
          <Divider orientation="vertical" length="20px" />
          <button
            type="button"
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: 'white',
            }}
          >
            확인
          </button>
        </Flex>
      </div>
    </Flex>
  ),
} satisfies Story

export const 디자인QA = {
  args: {
    orientation: 'horizontal',
    length: '100%',
  },
  parameters: {
    controls: {
      exclude: ['as', 'children', 'onClick'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ orientation, length, ...rest }: any) => {
    const vertical = orientation === 'vertical'
    return (
      <Flex
        flexDirection={vertical ? 'row' : 'column'}
        columnGap={vertical ? '20px' : '0'}
        rowGap={vertical ? '0' : '20px'}
        style={{ padding: '20px', width: '500px', height: '300px' }}
      >
        <div>
          <p>선1</p>
          <Divider orientation={orientation} length={length} {...rest} />
        </div>
        <div>
          <p>선2</p>
          <Divider orientation={orientation} length={length} {...rest} />
        </div>
      </Flex>
    )
  },
}
