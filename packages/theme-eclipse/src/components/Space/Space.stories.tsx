/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
