/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react'
import { Meta } from '@storybook/react'

import { vars } from '../../styles/theme-vars'
import { FilledButton as Button } from '../SolidButton'
import { OutlinedButton } from '../OutlineButton'
import { Typography } from '../Text'

import { Space, SpaceProps, Spacing } from './Space'

Space.displayName = 'Space'

const spacingKeys = Object.keys(vars.ref.spacing) as Spacing[]

const meta = {
  title: 'eclipse/Layout/Space',
  component: Space,
  args: {},
  argTypes: {
    x: { control: 'select', options: spacingKeys },
    y: { control: 'select', options: spacingKeys },
  },
} satisfies Meta<typeof Space>

export default meta

export const 가로_간격 = {
  args: {
    x: spacingKeys[1],
  },
  render: (args: SpaceProps) => (
    <div style={{ display: 'flex' }}>
      <OutlinedButton color="black" size="medium">
        버튼1
      </OutlinedButton>
      <Space {...args} />
      <OutlinedButton color="black" size="medium">
        버튼2
      </OutlinedButton>
    </div>
  ),
}

export const 세로_간격 = {
  args: {
    y: spacingKeys[1],
  },
  render: (args: SpaceProps) => (
    <div>
      <OutlinedButton color="black" size="medium">
        버튼1
      </OutlinedButton>
      <Space {...args} />
      <OutlinedButton color="black" size="medium">
        버튼2
      </OutlinedButton>
    </div>
  ),
}

export const 디자인_QA = {
  args: {
    y: spacingKeys[1],
  },
  render: (args: SpaceProps) => {
    if (args.x) {
      return (
        <div style={{ display: 'flex' }}>
          <OutlinedButton color="black" size="medium">
            버튼1
          </OutlinedButton>
          <Space {...args} />
          <OutlinedButton color="black" size="medium">
            버튼2
          </OutlinedButton>
        </div>
      )
    }

    return (
      <div>
        <OutlinedButton color="black" size="medium">
          버튼1
        </OutlinedButton>
        <Space {...args} />
        <OutlinedButton color="black" size="medium">
          버튼2
        </OutlinedButton>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   폼 레이아웃 (수직 스택) — Ant Design Form 패턴
   라벨 + 입력 필드 + 제출 버튼을 Space로 분리
-------------------------------------------------------------------------- */
export const 폼_레이아웃 = {
  render: () => (
    <div style={{ width: '320px', padding: '24px', background: 'white', borderRadius: '12px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
      <Typography textStyle="subheadingSmall">프로필 수정</Typography>
      <Space y={spacingKeys[4]} />

      <div>
        <Typography textStyle="descriptionLarge" style={{ color: '#475569', fontWeight: 600 }}>이름</Typography>
        <Space y={spacingKeys[2]} />
        <input
          type="text"
          defaultValue="홍길동"
          style={{
            width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0',
            borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box',
          }}
        />
      </div>

      <Space y={spacingKeys[4]} />

      <div>
        <Typography textStyle="descriptionLarge" style={{ color: '#475569', fontWeight: 600 }}>이메일</Typography>
        <Space y={spacingKeys[2]} />
        <input
          type="email"
          defaultValue="hong@example.com"
          style={{
            width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0',
            borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box',
          }}
        />
      </div>

      <Space y={spacingKeys[3]} />
      <Typography textStyle="descriptionLarge" style={{ color: '#94a3b8', fontSize: '11px' }}>
        * 이메일은 로그인에 사용됩니다.
      </Typography>
      <Space y={spacingKeys[5]} />

      <div style={{ display: 'flex' }}>
        <OutlinedButton color="black" size="medium">
          취소
        </OutlinedButton>
        <Space x={spacingKeys[3]} />
        <Button color="primary" size="medium">
          <Button.Center>저장</Button.Center>
        </Button>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   버튼 그룹 (수평 배열) — Ant Design Button Group 패턴
   여러 버튼을 Space로 균등하게 배치
-------------------------------------------------------------------------- */
export const 버튼_그룹 = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div>
        <Typography textStyle="descriptionLarge" style={{ marginBottom: '10px', color: '#64748b', fontWeight: 600 }}>
          소간격 (spacingKeys[2])
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <OutlinedButton color="black" size="small">편집</OutlinedButton>
          <Space x={spacingKeys[2]} />
          <OutlinedButton color="black" size="small">복제</OutlinedButton>
          <Space x={spacingKeys[2]} />
          <OutlinedButton color="black" size="small">삭제</OutlinedButton>
        </div>
      </div>

      <div>
        <Typography textStyle="descriptionLarge" style={{ marginBottom: '10px', color: '#64748b', fontWeight: 600 }}>
          중간격 (spacingKeys[4])
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <OutlinedButton color="black" size="medium">취소</OutlinedButton>
          <Space x={spacingKeys[4]} />
          <Button color="primary" size="medium">
            <Button.Center>저장</Button.Center>
          </Button>
        </div>
      </div>

      <div>
        <Typography textStyle="descriptionLarge" style={{ marginBottom: '10px', color: '#64748b', fontWeight: 600 }}>
          대간격 (spacingKeys[6])
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button color="black" size="large">
            <Button.Center>뒤로</Button.Center>
          </Button>
          <Space x={spacingKeys[6]} />
          <Button color="primary" size="large">
            <Button.Center>다음 단계</Button.Center>
          </Button>
        </div>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   간격 토큰 시각화 (Ant Design Space 컴포넌트 sizes 패턴)
   모든 spacing 토큰을 시각적으로 비교
-------------------------------------------------------------------------- */
export const 간격_토큰_시각화 = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
      <Typography textStyle="subheadingSmall">Spacing Token 비교</Typography>
      <Space y={spacingKeys[3]} />
      {spacingKeys.slice(0, 8).map((key) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8', width: '80px', fontFamily: 'monospace' }}>
            {key}
          </span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#6366f1' }} />
            <Space x={key} />
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#6366f1' }} />
          </div>
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Vercel Design 벤치마크: 카드 내부 밀도 비교
   Vercel의 컴팩트/기본/여유 3가지 레이아웃 밀도를 Space로 구현
-------------------------------------------------------------------------- */
export const Vercel_레이아웃_밀도_비교 = {
  render: () => {
    const densities = [
      { label: '컴팩트', gap: spacingKeys[2], pad: spacingKeys[3] },
      { label: '기본', gap: spacingKeys[4], pad: spacingKeys[5] },
      { label: '여유', gap: spacingKeys[6], pad: spacingKeys[7] },
    ]
    return (
      <div style={{ display: 'flex', gap: 20, padding: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {densities.map(({ label, gap, pad }) => (
          <div
            key={label}
            style={{
              padding: vars.ref.spacing[pad],
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              width: 180,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <Typography textStyle="descriptionLarge" style={{ color: '#94a3b8', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
              {label}
            </Typography>
            <Space y={gap} />
            <Typography textStyle="subheadingSmall" style={{ color: '#1e293b' }}>카드 제목</Typography>
            <Space y={gap} />
            <Typography textStyle="descriptionSmall" style={{ color: '#64748b', lineHeight: 1.5 }}>
              Space 컴포넌트로 레이아웃 밀도를 정밀하게 조정합니다.
            </Typography>
            <Space y={gap} />
            <OutlinedButton color="black" size="small">자세히 보기</OutlinedButton>
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 반응형 간격 토글
   Ant Design Space size 동적 변경 패턴 — 인터랙티브 간격 조절
-------------------------------------------------------------------------- */
const presets: Spacing[] = spacingKeys.slice(1, 8)

function InteractiveSpacingDemo() {
  const [selectedKey, setSelectedKey] = useState<Spacing>(spacingKeys[4])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '20px' }}>
      <Typography textStyle="subheadingSmall">간격 크기 선택</Typography>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {presets.map((key) => (
          <button
            key={key}
            onClick={() => setSelectedKey(key)}
            style={{
              padding: '4px 12px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
              background: selectedKey === key ? '#1e293b' : '#f1f5f9',
              color: selectedKey === key ? '#fff' : '#475569',
              transition: 'all 0.15s',
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ background: '#6366f1', borderRadius: 6, padding: '8px 16px', color: '#fff', fontSize: 13, fontWeight: 600 }}>
          요소 A
        </div>
        <Space y={selectedKey} />
        <div style={{ background: '#8b5cf6', borderRadius: 6, padding: '8px 16px', color: '#fff', fontSize: 13, fontWeight: 600 }}>
          요소 B
        </div>
        <Space y={selectedKey} />
        <div style={{ background: '#06b6d4', borderRadius: 6, padding: '8px 16px', color: '#fff', fontSize: 13, fontWeight: 600 }}>
          요소 C
        </div>
      </div>
      <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>
        선택된 간격: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, color: '#6366f1' }}>{selectedKey}</code>
        {' '}= {vars.ref.spacing[selectedKey]}
      </Typography>
    </div>
  )
}

export const Ant_인터랙티브_간격_조절 = {
  render: () => <InteractiveSpacingDemo />,
}

/* --------------------------------------------------------------------------
   Vercel Design 벤치마크: 섹션 구분 패턴
   Vercel 설정 페이지의 섹션 그룹핑 — 큰 Space로 섹션 분리, 작은 Space로 항목 분리
-------------------------------------------------------------------------- */
export const Vercel_설정_섹션_구분 = {
  render: () => (
    <div style={{ width: 360, padding: '24px', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
      {/* 섹션 1 */}
      <Typography textStyle="subheadingSmall" style={{ color: '#1e293b', fontWeight: 700 }}>
        일반 설정
      </Typography>
      <Space y={spacingKeys[3]} />
      <Typography textStyle="descriptionLarge" style={{ color: '#64748b', lineHeight: 1.6 }}>
        기본 프로젝트 정보를 수정합니다.
      </Typography>
      <Space y={spacingKeys[4]} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid #f1f5f9' }}>
        <Typography textStyle="descriptionLarge" style={{ color: '#374151', fontWeight: 500 }}>프로젝트 이름</Typography>
        <Typography textStyle="descriptionLarge" style={{ color: '#6366f1', fontWeight: 600 }}>orbit-ui</Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid #f1f5f9' }}>
        <Typography textStyle="descriptionLarge" style={{ color: '#374151', fontWeight: 500 }}>프레임워크</Typography>
        <Typography textStyle="descriptionLarge" style={{ color: '#475569' }}>React</Typography>
      </div>

      {/* 섹션 구분 — 큰 Space */}
      <Space y={spacingKeys[7]} />

      {/* 섹션 2 */}
      <Typography textStyle="subheadingSmall" style={{ color: '#1e293b', fontWeight: 700 }}>
        위험 영역
      </Typography>
      <Space y={spacingKeys[3]} />
      <Typography textStyle="descriptionLarge" style={{ color: '#64748b', lineHeight: 1.6 }}>
        아래 작업은 되돌릴 수 없습니다.
      </Typography>
      <Space y={spacingKeys[4]} />
      <div style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #fecaca', background: '#fef2f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography textStyle="descriptionLarge" style={{ color: '#991b1b', fontWeight: 600 }}>프로젝트 삭제</Typography>
          <Space y={spacingKeys[1]} />
          <Typography textStyle="descriptionSmall" style={{ color: '#b91c1c' }}>모든 데이터가 영구 삭제됩니다</Typography>
        </div>
        <Button color="primary" size="small" style={{ background: '#ef4444', borderColor: '#ef4444', flexShrink: 0 }}>
          <Button.Center>삭제</Button.Center>
        </Button>
      </div>
      <Space y={spacingKeys[3]} />
      <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8', textAlign: 'center', display: 'block' }}>
        Vercel 설정 페이지 패턴 — Space로 섹션 간 리듬 형성
      </Typography>
    </div>
  ),
}
