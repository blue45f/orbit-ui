import { Flex } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'

import { Typography } from '../Text'

import { Divider } from './Divider'

Divider.displayName = 'Divider'

const meta = {
  title: 'eclipse/Layout/Divider',
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

/* --------------------------------------------------------------------------
   텍스트 구분선 (Ant Design Divider with text 패턴)
   섹션 헤더 역할을 하는 텍스트 포함 구분선
-------------------------------------------------------------------------- */
export const 텍스트_섹션_구분 = {
  render: () => (
    <Flex flexDirection="column" rowGap="24px" style={{ width: '480px', padding: '20px' }}>
      {/* 섹션 헤더 스타일 */}
      {(['기본 정보', '결제 정보', '배송 정보'] as const).map((section) => (
        <div key={section}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Divider length="20px" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>
              {section}
            </span>
            <Divider />
          </div>
          <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '6px' }}>
            <Typography textStyle="descriptionLarge" style={{ color: '#94a3b8' }}>
              {section} 콘텐츠 영역
            </Typography>
          </div>
        </div>
      ))}
    </Flex>
  ),
} satisfies Story

/* --------------------------------------------------------------------------
   대시보드 섹션 구분 패턴 (Ant Design Dashboard 레이아웃)
   카드 그리드 사이의 섹션 구분
-------------------------------------------------------------------------- */
export const 대시보드_섹션 = {
  render: () => (
    <Flex flexDirection="column" rowGap="0" style={{ width: '520px', padding: '20px', background: '#f1f5f9', borderRadius: '12px' }}>
      {/* 첫 번째 섹션 */}
      <div style={{ marginBottom: '16px' }}>
        <Typography textStyle="subheadingSmall" style={{ marginBottom: '12px', display: 'block' }}>
          핵심 지표
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[
            { label: '총 매출', value: '₩ 1,240만' },
            { label: '주문 수', value: '3,421건' },
            { label: '신규 회원', value: '187명' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'white', padding: '14px', borderRadius: '8px' }}>
              <Typography textStyle="descriptionLarge" style={{ color: '#64748b', fontSize: '11px' }}>
                {item.label}
              </Typography>
              <Typography textStyle="subheadingSmall">{item.value}</Typography>
            </div>
          ))}
        </div>
      </div>

      {/* 수평 구분선 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <Divider />
        <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>최근 활동</span>
        <Divider />
      </div>

      {/* 두 번째 섹션 */}
      <div>
        <Flex flexDirection="column" rowGap="8px">
          {[
            { action: '새 주문 접수', time: '2분 전', status: '신규' },
            { action: '결제 완료', time: '15분 전', status: '완료' },
            { action: '배송 시작', time: '1시간 전', status: '진행' },
          ].map((item, idx) => (
            <div key={idx}>
              <Flex justifyContent="space-between" alignItems="center" style={{ padding: '10px 12px', background: 'white', borderRadius: '6px' }}>
                <Typography textStyle="descriptionLarge">{item.action}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{item.time}</span>
                  <Divider orientation="vertical" length="12px" />
                  <span style={{ fontSize: '11px', color: '#6366f1', fontWeight: 600 }}>{item.status}</span>
                </div>
              </Flex>
            </div>
          ))}
        </Flex>
      </div>
    </Flex>
  ),
} satisfies Story
