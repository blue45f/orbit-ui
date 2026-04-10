/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react'
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

/* --------------------------------------------------------------------------
   Cycle 67: Mantine + Arco Design 벤치마크
-------------------------------------------------------------------------- */

/* Mantine — 폼 섹션 리듬
   Mantine의 Stack 컴포넌트 패턴. 폼 섹션 간 일관된 수직 리듬을 Space로 구성.
   헤딩, 입력 필드, 설명 텍스트 사이의 간격 계층을 명확히 표현.
-------------------------------------------------------------------------- */
export const Mantine_폼_섹션_리듬 = {
  name: 'Mantine — 폼 섹션 수직 리듬',
  parameters: {
    docs: {
      description: {
        story: 'Mantine Stack 컴포넌트 패턴. 섹션 간 큰 Space(spacingKeys[6]), 필드 간 중간 Space(spacingKeys[3]), 레이블-인풋 간 작은 Space(spacingKeys[1])로 계층적 리듬 형성.',
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 440, padding: 32, fontFamily: 'system-ui, sans-serif', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>프로필 설정</div>
      <Space y={spacingKeys[2]} />
      <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>공개 프로필 정보를 업데이트합니다. 변경사항은 저장 후 반영됩니다.</div>

      {/* 섹션 구분 — 큰 간격 */}
      <Space y={spacingKeys[6]} />

      {/* 기본 정보 섹션 */}
      <div style={{ fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>기본 정보</div>
      <Space y={spacingKeys[3]} />

      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>표시 이름</div>
        <Space y={spacingKeys[1]} />
        <input placeholder="홍길동" style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
      </div>

      <Space y={spacingKeys[3]} />

      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>이메일</div>
        <Space y={spacingKeys[1]} />
        <input placeholder="user@example.com" type="email" style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
        <Space y={spacingKeys[1]} />
        <div style={{ fontSize: 11, color: '#94a3b8' }}>본인 인증된 이메일은 변경 후 재인증이 필요합니다.</div>
      </div>

      {/* 섹션 구분 — 큰 간격 */}
      <Space y={spacingKeys[6]} />

      {/* 소개 섹션 */}
      <div style={{ fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>소개</div>
      <Space y={spacingKeys[3]} />

      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>자기소개</div>
        <Space y={spacingKeys[1]} />
        <textarea rows={3} placeholder="간략한 소개를 작성해 주세요." style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
        <Space y={spacingKeys[1]} />
        <div style={{ fontSize: 11, color: '#94a3b8' }}>최대 160자</div>
      </div>

      <Space y={spacingKeys[5]} />

      {/* 저장 버튼 */}
      <button style={{ width: '100%', padding: '11px 0', borderRadius: 10, background: '#0f172a', color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
        변경사항 저장
      </button>
    </div>
  ),
}

/* Arco Design — 카드 그리드 간격 패턴
   Arco Design Grid 컴포넌트의 간격 제어 패턴. Space로 카드 사이 일관된 간격을 형성하고
   수평/수직 구분자를 Space로 대체하는 레이아웃 패턴.
-------------------------------------------------------------------------- */
const STAT_CARDS = [
  { label: '총 프로젝트', value: '24', change: '+3', up: true },
  { label: '활성 멤버', value: '8', change: '+1', up: true },
  { label: '이번달 배포', value: '47', change: '-5', up: false },
  { label: '오픈 이슈', value: '12', change: '+2', up: false },
]

export const Arco_카드_그리드_간격_패턴 = {
  name: 'Arco Design — 카드 그리드 간격 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Arco Design Grid 간격 제어 패턴. Space를 카드 간 구분과 섹션 내 수직 리듬에 활용. 통계 카드 → 상세 목록 레이아웃에서 섹션 간 시각적 리듬 형성.',
      },
    },
  },
  render: () => (
    <div style={{ width: 500, padding: 28, fontFamily: 'system-ui, sans-serif', background: '#f8fafc', borderRadius: 16 }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>팀 현황</div>
      <Space y={spacingKeys[2]} />
      <div style={{ fontSize: 12, color: '#64748b' }}>이번 달 주요 지표</div>

      <Space y={spacingKeys[5]} />

      {/* 통계 카드 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {STAT_CARDS.map((card) => (
          <div key={card.label} style={{ padding: '16px 18px', borderRadius: 12, background: '#fff', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {card.label}
            </div>
            <Space y={spacingKeys[2]} />
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{card.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: card.up ? '#16a34a' : '#dc2626', marginBottom: 2 }}>
                {card.change}
              </div>
            </div>
            <Space y={spacingKeys[1]} />
            <div style={{ fontSize: 10, color: '#94a3b8' }}>전월 대비</div>
          </div>
        ))}
      </div>

      <Space y={spacingKeys[5]} />

      {/* 구분선 역할의 Space + 시각적 분리 */}
      <div style={{ height: 1, background: '#e2e8f0' }} />

      <Space y={spacingKeys[4]} />

      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>최근 활동</div>

      <Space y={spacingKeys[3]} />

      {['main 브랜치에 PR #89 병합됨', 'Alice가 디자인 팀에 합류했습니다', '프로덕션 배포 v2.4.1 성공'].map((item, i) => (
        <div key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: '#475569' }}>{item}</div>
          </div>
          {i < 2 && <Space y={spacingKeys[2]} />}
        </div>
      ))}
    </div>
  ),
}

/* Arco Design — 인라인 태그 간격 패턴
   Arco Design Space 컴포넌트의 wrap 모드. x축 Space로 인라인 요소들 사이
   일관된 수평 간격을 형성하는 태그/칩 배열 패턴.
-------------------------------------------------------------------------- */
const TECH_TAGS = [
  { name: 'React', color: '#0ea5e9' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
  { name: 'vanilla-extract', color: '#c26dff' },
  { name: 'Storybook', color: '#ff4785' },
  { name: 'Vite', color: '#646cff' },
  { name: 'Vitest', color: '#6e9f18' },
  { name: 'pnpm', color: '#f69220' },
  { name: 'ESLint', color: '#4b32c3' },
  { name: 'Prettier', color: '#f7b93e' },
]

export const Arco_인라인_태그_간격_패턴 = {
  name: 'Arco Design — 인라인 태그 x 간격 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Arco Design Space wrap 모드. x축 Space로 인라인 태그·칩 사이 일관된 수평 간격 형성. gap 토큰 크기별 간격 비교 데모.',
      },
    },
  },
  render: function ArcoInlineTags() {
    const [gapIdx, setGapIdx] = useState(2)
    const gap = spacingKeys[gapIdx]

    return (
      <div style={{ width: 480, padding: 28, fontFamily: 'system-ui, sans-serif', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>기술 스택</div>
        <Typography textStyle="descriptionSmall" style={{ color: '#94a3b8', marginBottom: 16, display: 'block' }}>
          간격 토큰: <strong style={{ color: '#6366f1' }}>{gap}</strong>
        </Typography>

        {/* 간격 선택 슬라이더 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>좁음</span>
          <input
            type="range" min={0} max={spacingKeys.length - 1} value={gapIdx}
            onChange={(e) => setGapIdx(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: 11, color: '#94a3b8' }}>넓음</span>
        </div>

        {/* 태그 배열 — x 간격 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {TECH_TAGS.map((tag, i) => (
            <React.Fragment key={tag.name}>
              <div style={{
                padding: '5px 10px', borderRadius: 99,
                background: `${tag.color}18`, border: `1px solid ${tag.color}44`,
                fontSize: 12, fontWeight: 600, color: tag.color,
                whiteSpace: 'nowrap', marginBottom: 8,
              }}>
                {tag.name}
              </div>
              {i < TECH_TAGS.length - 1 && <Space x={gap} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  },
}
