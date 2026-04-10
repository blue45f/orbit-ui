import { useState } from 'react'
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
/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: OR/AND 라벨 구분선 (로그인 폼 패턴)
   shadcn/ui LoginForm 패턴 — 소셜 로그인과 이메일 로그인 사이의 분리선
-------------------------------------------------------------------------- */
export const shadcn_OR_구분선 = {
  render: () => (
    <Flex flexDirection="column" rowGap="24px" style={{ width: '360px', padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <Typography textStyle="subheadingSmall" style={{ textAlign: 'center', color: '#1e293b' }}>
        로그인
      </Typography>
      {/* 소셜 로그인 버튼들 */}
      <Flex flexDirection="column" rowGap="8px">
        {[
          { label: 'GitHub으로 계속하기', bg: '#24292f', color: '#fff' },
          { label: 'Google로 계속하기', bg: '#fff', color: '#374151', border: '1px solid #e2e8f0' },
        ].map((btn) => (
          <button
            key={btn.label}
            style={{
              width: '100%', padding: '10px 16px', borderRadius: '8px',
              border: btn.border ?? 'none', background: btn.bg, color: btn.color,
              fontSize: '14px', fontWeight: 500, cursor: 'pointer',
            }}
          >
            {btn.label}
          </button>
        ))}
      </Flex>

      {/* shadcn/ui OR 구분선 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Divider />
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#94a3b8', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
          또는
        </span>
        <Divider />
      </div>

      {/* 이메일 로그인 */}
      <Flex flexDirection="column" rowGap="10px">
        <input
          type="email"
          placeholder="이메일"
          style={{
            width: '100%', padding: '9px 12px', borderRadius: '8px',
            border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box',
            outline: 'none',
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          style={{
            width: '100%', padding: '9px 12px', borderRadius: '8px',
            border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box',
            outline: 'none',
          }}
        />
        <button
          style={{
            width: '100%', padding: '10px', borderRadius: '8px',
            background: '#1e293b', color: '#fff', border: 'none',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          이메일로 로그인
        </button>
      </Flex>
      <Typography textStyle="descriptionSmall" style={{ textAlign: 'center', color: '#94a3b8' }}>
        shadcn/ui 로그인 폼 패턴 — OR 구분선으로 인증 방식 분리
      </Typography>
    </Flex>
  ),
} satisfies Story

/* --------------------------------------------------------------------------
   Radix UI 벤치마크: 컨텍스트 메뉴 구분선 패턴
   Radix UI ContextMenu.Separator 패턴 — 메뉴 항목 그룹 사이 구분
-------------------------------------------------------------------------- */
function ContextMenuDividerDemo() {
  const [selected, setSelected] = useState<string | null>(null)

  const menuGroups: Array<Array<{ key: string; label: string; shortcut: string; danger?: boolean }>> = [
    [
      { key: 'copy', label: '복사', shortcut: '⌘C' },
      { key: 'cut', label: '잘라내기', shortcut: '⌘X' },
      { key: 'paste', label: '붙여넣기', shortcut: '⌘V' },
    ],
    [
      { key: 'duplicate', label: '복제', shortcut: '⌘D' },
      { key: 'rename', label: '이름 바꾸기', shortcut: 'F2' },
    ],
    [
      { key: 'delete', label: '삭제', shortcut: '⌫', danger: true },
    ],
  ]

  return (
    <Flex flexDirection="column" rowGap="16px" style={{ alignItems: 'flex-start', padding: '20px' }}>
      <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>
        항목을 선택하면 아래에 표시됩니다.
      </Typography>
      <div
        style={{
          width: 220, background: '#fff', borderRadius: '10px',
          border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden', padding: '4px 0',
        }}
      >
        {menuGroups.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && (
              <div style={{ padding: '4px 0' }}>
                <Divider />
              </div>
            )}
            {group.map((item) => (
              <button
                key={item.key}
                onClick={() => setSelected(item.label)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '7px 14px', border: 'none', background: 'none',
                  cursor: 'pointer', fontSize: '13px',
                  color: item.danger ? '#ef4444' : '#1e293b',
                  textAlign: 'left',
                }}
              >
                <span>{item.label}</span>
                <kbd style={{
                  fontSize: '11px', color: '#94a3b8', background: '#f1f5f9',
                  padding: '1px 5px', borderRadius: '4px', fontFamily: 'monospace',
                }}>
                  {item.shortcut}
                </kbd>
              </button>
            ))}
          </div>
        ))}
      </div>
      {selected && (
        <Typography textStyle="descriptionSmall" style={{ color: '#6366f1', fontWeight: 600 }}>
          선택됨: {selected}
        </Typography>
      )}
      <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>
        Radix UI ContextMenu.Separator 패턴 — 그룹 사이 Divider로 시각적 계층 형성
      </Typography>
    </Flex>
  )
}

export const Radix_컨텍스트_메뉴_구분선 = {
  render: () => <ContextMenuDividerDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Radix UI ContextMenu.Separator 패턴. 메뉴 항목을 기능 그룹별로 Divider로 구분합니다. 삭제 등 파괴적 액션은 별도 그룹에 분리해 실수를 방지합니다.',
      },
    },
  },
} satisfies Story

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 프로필 카드 내부 구분선
   shadcn/ui Card 패턴 — 사용자 정보와 통계 섹션을 Divider로 분리
-------------------------------------------------------------------------- */
export const shadcn_프로필_카드_구분선 = {
  render: () => (
    <div
      style={{
        width: 300, background: '#fff', borderRadius: '14px',
        border: '1px solid #e2e8f0', overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* 프로필 헤더 */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', margin: '0 auto 10px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: '22px',
        }}>
          K
        </div>
        <Typography textStyle="subheadingSmall" style={{ color: '#1e293b', display: 'block', marginBottom: '2px' }}>
          김민준
        </Typography>
        <Typography textStyle="descriptionSmall" style={{ color: '#64748b' }}>
          Senior Frontend Engineer
        </Typography>
      </div>

      {/* Divider */}
      <Divider />

      {/* 통계 */}
      <div style={{ display: 'flex', padding: '16px 0' }}>
        {[
          { label: '프로젝트', value: '24' },
          { label: '커밋', value: '1.2k' },
          { label: '팔로워', value: '318' },
        ].map((stat, i) => (
          <div key={stat.label} style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'stretch' }}>
            {i > 0 && <Divider orientation="vertical" length="100%" />}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <Typography textStyle="subheadingSmall" style={{ color: '#1e293b', fontWeight: 700 }}>
                {stat.value}
              </Typography>
              <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8', fontSize: '11px' }}>
                {stat.label}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <Divider />

      {/* 액션 */}
      <div style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
        <button style={{
          flex: 1, padding: '8px', borderRadius: '7px', border: '1px solid #e2e8f0',
          background: '#fff', color: '#374151', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        }}>
          팔로우
        </button>
        <button style={{
          flex: 1, padding: '8px', borderRadius: '7px', border: 'none',
          background: '#1e293b', color: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
        }}>
          메시지
        </button>
      </div>
    </div>
  ),
} satisfies Story

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
