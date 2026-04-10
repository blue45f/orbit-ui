import { useState } from 'react'
import { Flex } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'

import { Typography } from '../Text'

import { Divider } from './Divider'

Divider.displayName = 'Divider'

const meta = {
  title: 'eclipse/Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
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

/* --------------------------------------------------------------------------
   Cycle 69: Linear Design + Google Material 3 벤치마크
-------------------------------------------------------------------------- */

/* Linear — 미니멀 섹션 구분선
   Linear 앱의 리스트 섹션 구분 패턴. 얇은 구분선 + 섹션 헤더 텍스트 조합.
   사이드바 그룹 구분, 설정 패널 섹션 분리에 활용되는 극도로 절제된 스타일.
-------------------------------------------------------------------------- */
export const Linear_미니멀_섹션_구분선 = {
  name: 'Linear — 미니멀 섹션 구분선',
  parameters: {
    docs: {
      description: {
        story: 'Linear 앱 사이드바 섹션 분리 패턴. 구분선 위 소문자 섹션 헤더(9-10px, 회색, 자간 넓음)와 함께 사용. 최소한의 시각적 노이즈로 계층 구분.',
      },
    },
  },
  render: () => {
    const sectionStyle = {
      fontSize: '10px' as const,
      fontWeight: 700 as const,
      color: '#94a3b8',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
      padding: '12px 0 6px',
      fontFamily: 'system-ui, sans-serif',
    }
    const itemStyle = {
      padding: '7px 0',
      fontSize: '13px' as const,
      color: '#374151',
      cursor: 'pointer',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center' as const,
      gap: '8px',
    }

    return (
      <div style={{ width: 220, background: '#fff', padding: '8px 0', fontFamily: 'system-ui, sans-serif' }}>
        {/* 섹션 1 */}
        <div style={{ padding: '0 12px' }}>
          <div style={sectionStyle}>내 팀</div>
          <Divider />
        </div>
        <div style={{ padding: '4px 12px 8px' }}>
          {['Issues', 'Cycles', 'Backlog'].map((item) => (
            <div key={item} style={itemStyle}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />
              {item}
            </div>
          ))}
        </div>

        {/* 섹션 2 */}
        <div style={{ padding: '0 12px' }}>
          <div style={sectionStyle}>프로젝트</div>
          <Divider />
        </div>
        <div style={{ padding: '4px 12px 8px' }}>
          {['Orbit UI v2', 'Design System', 'Storybook'].map((item) => (
            <div key={item} style={itemStyle}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              {item}
            </div>
          ))}
        </div>

        {/* 섹션 3 */}
        <div style={{ padding: '0 12px' }}>
          <div style={sectionStyle}>보기</div>
          <Divider />
        </div>
        <div style={{ padding: '4px 12px 8px' }}>
          {['All Issues', 'Active', 'My Issues'].map((item) => (
            <div key={item} style={itemStyle}>
              <div style={{ width: 6, height: 6, borderRadius: 2, background: '#f59e0b' }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/* Google Material 3 — 인셋 Divider (Inset Divider)
   Material 3의 Inset Divider 패턴. 리스트 아이템에서 아바타/아이콘 영역 아래에는
   구분선을 그리지 않고 텍스트 시작점부터 그리는 패턴. 연속성 유지 + 시각 분리.
-------------------------------------------------------------------------- */
export const Material3_인셋_Divider = {
  name: 'Google Material 3 — 인셋 Divider (리드 오프셋)',
  parameters: {
    docs: {
      description: {
        story: 'Material Design 3 Inset Divider 패턴. 아이콘/아바타 좌측 영역을 건너뛰고 텍스트 시작점부터 구분선을 시작. 리스트 연속성을 유지하면서 항목 분리.',
      },
    },
  },
  render: () => {
    const CONTACTS = [
      { initial: 'AK', name: 'Alice Kim', status: '온라인', statusColor: '#22c55e', bg: '#6366f1' },
      { initial: 'BL', name: 'Bob Lee', status: '자리 비움', statusColor: '#f59e0b', bg: '#0ea5e9' },
      { initial: 'CP', name: 'Carol Park', status: '오프라인', statusColor: '#94a3b8', bg: '#10b981' },
      { initial: 'DO', name: 'David Oh', status: '방해 금지', statusColor: '#ef4444', bg: '#f59e0b' },
    ]

    return (
      <div style={{ width: 300, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#374151', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
          연락처 목록 (M3 Inset Divider)
        </div>
        {CONTACTS.map((contact, i) => (
          <div key={contact.name}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
              {/* 아바타 */}
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: contact.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {contact.initial}
              </div>
              {/* 텍스트 */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{contact.name}</div>
                <div style={{ fontSize: 11, color: contact.statusColor, fontWeight: 500, marginTop: 2 }}>{contact.status}</div>
              </div>
            </div>
            {/* 인셋 Divider: 아바타(40px) + gap(12px) + padding(16px) = 68px offset */}
            {i < CONTACTS.length - 1 && (
              <div style={{ paddingLeft: 68 }}>
                <Divider />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  },
}

/* Linear + Material 3 — 텍스트 레이블 구분선
   Linear의 타임라인 날짜 구분 + Material 3의 중앙 텍스트 divider 패턴.
   구분선 가운데에 날짜/라벨 텍스트를 삽입하는 "OR 구분선"의 발전형.
-------------------------------------------------------------------------- */
export const Linear_Material3_타임라인_날짜_구분선 = {
  name: 'Linear + M3 — 타임라인 날짜 구분선',
  parameters: {
    docs: {
      description: {
        story: 'Linear 타임라인 날짜 구분 + Material 3 텍스트 Divider 조합. 날짜 레이블을 가운데 배치하고 양쪽에 구분선을 늘여 시각적 타임라인 구성. 이슈 로그, 채팅, 활동 피드에 적합.',
      },
    },
  },
  render: () => {
    const TIMELINE_EVENTS = [
      { date: '오늘', events: [
        { time: '14:32', text: 'Alice Kim이 이슈를 완료로 변경했습니다', type: 'success' },
        { time: '11:15', text: '코드 리뷰 댓글 3개 추가됨', type: 'info' },
      ]},
      { date: '어제', events: [
        { time: '18:42', text: 'PR #89가 main에 병합됐습니다', type: 'success' },
        { time: '09:00', text: '스프린트 계획 회의 시작', type: 'neutral' },
      ]},
      { date: '4월 8일', events: [
        { time: '16:20', text: '버그 #142 생성됨 — 우선순위: 높음', type: 'warning' },
      ]},
    ]

    const typeColor: Record<string, string> = {
      success: '#22c55e', info: '#6366f1', neutral: '#94a3b8', warning: '#f59e0b',
    }

    return (
      <div style={{ width: 380, fontFamily: 'system-ui, sans-serif', padding: '8px 0' }}>
        {TIMELINE_EVENTS.map((group) => (
          <div key={group.date} style={{ marginBottom: 16 }}>
            {/* 날짜 레이블 구분선 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Divider />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', whiteSpace: 'nowrap', letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
                {group.date}
              </span>
              <Divider />
            </div>
            {/* 이벤트 목록 */}
            {group.events.map((ev, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 11, color: '#94a3b8', flexShrink: 0, minWidth: 40 }}>{ev.time}</span>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: typeColor[ev.type], marginTop: 4, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{ev.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  },
}
