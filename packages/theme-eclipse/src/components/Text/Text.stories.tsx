import { Flex, TextStyleBaseSize } from '@heejun-com/core'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { vars } from '../../styles/theme-vars'
import { EclipseProvider } from '../EclipseProvider'

import { ForcedTextStyle, Text } from './Text'

Text.displayName = 'Text'

const meta = {
  title: 'eclipse/Data Display/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "Text는 Material Design 3 타입 스케일 기반 타이포그래피 컴포넌트입니다. displayLarge부터 labelSmall까지 13가지 textStyle을 지원합니다.",
      },
    },
  },
  args: {
    textStyle: 'bodyLarge',
    children: 'Children에 값을 입력하여, Text 컴포넌트의 텍스트를 확인해보세요.',
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(vars.sem.color).filter((key) => key.startsWith('foreground')),
    },
    textStyle: {
      control: 'select',
      options: [
        'bodyLarge',
        ...Object.keys(vars.sem.textStyle).map((key) =>
          key.replace(/LineHeight|Size|Weight|Tracking|Face/g, '')
        ),
      ],
    },
    as: {
      control: 'select',
      options: [
        'span',
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'strong',
        's',
        'i',
        'em',
        'div',
        'label',
        'a',
      ],
    },
    theme: {
      control: 'object',
    },
  },
} satisfies Meta<React.ComponentProps<typeof Text>>

type Story = StoryObj<typeof meta>

export default meta

export const 기본 = {
  render: (args: React.ComponentProps<typeof Text>) => {
    const { children, ...rest } = args
    return <Text {...rest}>{children}</Text>
  },
} satisfies Story

export const 모든_사이즈 = {
  render: (args: React.ComponentProps<typeof Text>) => {
    const { children: _children, textStyle: _textStyle, ...rest } = args
    const typographyStyles = Object.keys(vars.sem.textStyle)
      .map((key) => key.replace(/LineHeight|Size|Weight|Tracking|Face/g, ''))
      .filter((key, index, arr) => arr.indexOf(key) === index)

    return (
      <Flex flexDirection="column" rowGap={vars.ref.spacing[200]}>
        {typographyStyles.map((style) => (
          <Text key={style} {...rest} textStyle={style as string}>
            {style} 사이즈의 텍스트입니다.
          </Text>
        ))}
      </Flex>
    )
  },
} satisfies Story

export const 텍스트_스타일_강제 = {
  render: (args: React.ComponentProps<typeof Text>) => {
    const { children, textStyle, ...rest } = args
    return (
      <ForcedTextStyle color="primary5">
        <Text {...rest} textStyle={textStyle as string}>
          {children}
        </Text>
      </ForcedTextStyle>
    )
  },
} satisfies Story

export const 디자인_QA = {
  args: {
    baseSize: 'medium',
    textStyle: 'bodyLarge',
    children: '텍스트입니다',
  },
  argTypes: {
    baseSize: {
      control: 'select',
      options: ['xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'xxxLarge'],
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  render: ({ baseSize, children, textStyle, ...rest }: any) => {
    return (
      <EclipseProvider baseTextSize={baseSize as TextStyleBaseSize}>
        <Text {...rest} textStyle={textStyle as string}>
          {textStyle}사이즈: {children}
        </Text>
      </EclipseProvider>
    )
  },
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 타이포그래피 계층 시연
   Notion 페이지 스타일 — 계층화된 문서 타이포그래피
-------------------------------------------------------------------------- */
const NOTION_SECTIONS = [
  {
    style: 'subheadingLarge',
    text: 'Orbit UI 디자인 시스템',
    desc: 'subheadingLarge — 페이지 제목',
  },
  {
    style: 'subheadingSmall',
    text: '3-Tier 토큰 아키텍처',
    desc: 'subheadingSmall — 섹션 제목',
  },
  {
    style: 'bodyLarge',
    text: 'Orbit UI는 Reference → Semantic → Component 3단계 토큰 시스템을 사용합니다. 브랜드 컬러 하나만 변경해도 전체 UI가 일관되게 업데이트됩니다.',
    desc: 'bodyLarge — 본문',
  },
  {
    style: 'descriptionLarge',
    text: '자세한 내용은 DesignToken.mdx를 참고하세요.',
    desc: 'descriptionLarge — 부가 설명',
  },
  {
    style: 'descriptionSmall',
    text: '최종 업데이트: 2026-04-10 · Orbit UI v2.0',
    desc: 'descriptionSmall — 메타 정보',
  },
] as const

export const Notion_타이포그래피_계층 = {
  name: 'Notion - 타이포그래피 계층 시연',
  render: () => (
    <div
      style={{
        maxWidth: 560,
        padding: '32px',
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #e2e8f0',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {NOTION_SECTIONS.map((section) => (
          <React.Fragment key={section.style}>
            <Text
              textStyle={section.style as string}
              style={{ lineHeight: 1.75 }}
            >
              {section.text}
            </Text>
            <div
              style={{
                fontSize: 10,
                color: '#c7d2fe',
                fontFamily: 'monospace',
                marginBottom: 8,
                paddingLeft: 2,
              }}
            >
              {section.desc}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Figma Plugin 벤치마크: 컴팩트 속성 패널 텍스트
   Figma 속성 패널 스타일 — 고밀도 레이블/값 쌍 레이아웃
-------------------------------------------------------------------------- */
const PROPERTIES = [
  { label: 'Width', value: '320px' },
  { label: 'Height', value: '240px' },
  { label: 'Border Radius', value: '8px' },
  { label: 'Opacity', value: '100%' },
  { label: 'Fill', value: '#6366f1' },
  { label: 'Stroke', value: 'None' },
  { label: 'Font Size', value: '14px' },
  { label: 'Font Weight', value: '600' },
  { label: 'Line Height', value: '1.6' },
]

export const Figma_컴팩트_속성_패널 = {
  name: 'Figma Plugin - 컴팩트 속성 패널 텍스트',
  render: () => (
    <div
      style={{
        width: 240,
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <div
        style={{
          padding: '6px 10px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Text textStyle="descriptionSmall" style={{ fontWeight: 700, color: '#475569' }}>
          Properties
        </Text>
      </div>
      <div style={{ padding: '4px 0' }}>
        {PROPERTIES.map((prop) => (
          <div
            key={prop.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px 10px',
            }}
          >
            <Text textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>
              {prop.label}
            </Text>
            <Text
              textStyle="descriptionSmall"
              style={{ color: '#1e293b', fontWeight: 600, fontFamily: 'monospace', fontSize: 11 }}
            >
              {prop.value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Google Material 3 벤치마크: 타입 스케일 롤 시연
   Material 3 TypeScale — Display, Headline, Body, Label 롤 비교
-------------------------------------------------------------------------- */
const M3_TYPE_ROLES = [
  { m3Role: 'Display Large', orbitStyle: 'subheadingLarge', desc: 'Hero, 랜딩 페이지 메인 헤드라인' },
  { m3Role: 'Headline Medium', orbitStyle: 'subheadingSmall', desc: '섹션 제목, 카드 타이틀' },
  { m3Role: 'Body Large', orbitStyle: 'bodyLarge', desc: '본문, 설명 텍스트' },
  { m3Role: 'Label Medium', orbitStyle: 'descriptionLarge', desc: '버튼 레이블, 입력 필드 레이블' },
  { m3Role: 'Label Small', orbitStyle: 'descriptionSmall', desc: '캡션, 메타 정보' },
] as const

// ─── Linear Design 벤치마크: 이슈 리스트 타이포그래피 ────────────────────────
// Linear 이슈 목록의 핵심: 제목은 굵게, 메타(담당자/날짜/우선순위)는 작고 흐리게.
// 모든 정보가 한 줄에 담기는 고밀도 패턴이 특징입니다.

const LINEAR_ISSUES = [
  { id: 'ORB-341', title: 'CounterBadge max 처리 로직 추가', status: '진행중', priority: 'High', assignee: 'HK', date: '오늘', statusColor: '#6366f1' },
  { id: 'ORB-340', title: 'Text 컴포넌트 lineClamp prop 지원', status: 'Todo', priority: 'Medium', assignee: 'SL', date: '어제', statusColor: '#94a3b8' },
  { id: 'ORB-339', title: 'EclipseProvider 다크모드 초기값 버그', status: '검토', priority: 'Urgent', assignee: 'JP', date: '3일 전', statusColor: '#f59e0b' },
  { id: 'ORB-338', title: 'Slider 접근성 개선 — aria-valuetext', status: '완료', priority: 'Low', assignee: 'HK', date: '5일 전', statusColor: '#10b981' },
] as const

const PRIORITY_COLOR = { Urgent: '#ef4444', High: '#f59e0b', Medium: '#6366f1', Low: '#94a3b8' } as const

export const Linear_이슈_리스트_타이포: Story = {
  name: 'Linear Design - 이슈 리스트 타이포그래피 패턴',
  render: () => (
    <div
      style={{
        width: 560,
        background: '#fff',
        borderRadius: 10,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {LINEAR_ISSUES.map((issue, i) => (
        <div
          key={issue.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '9px 14px',
            borderBottom: i < LINEAR_ISSUES.length - 1 ? '1px solid #f8fafc' : 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff' }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: issue.statusColor,
              flexShrink: 0,
            }}
          />
          <Text textStyle="descriptionSmall" style={{ color: '#94a3b8', fontFamily: 'monospace', flexShrink: 0, width: 54 }}>
            {issue.id}
          </Text>
          <Text textStyle="descriptionLarge" style={{ flex: 1, color: '#0f172a', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {issue.title}
          </Text>
          <span
            style={{
              fontSize: 10,
              padding: '2px 6px',
              borderRadius: 4,
              fontWeight: 700,
              background: `${PRIORITY_COLOR[issue.priority]}18`,
              color: PRIORITY_COLOR[issue.priority],
              flexShrink: 0,
            }}
          >
            {issue.priority}
          </span>
          <Text textStyle="descriptionSmall" style={{ color: '#94a3b8', flexShrink: 0, width: 32, textAlign: 'center' }}>
            {issue.assignee}
          </Text>
          <Text textStyle="descriptionSmall" style={{ color: '#94a3b8', flexShrink: 0, width: 48, textAlign: 'right' }}>
            {issue.date}
          </Text>
        </div>
      ))}
    </div>
  ),
}

// ─── Arco Design 벤치마크: 정보 밀도 레이아웃 ───────────────────────────────
// Arco Design Description 컴포넌트 패턴:
// 레이블(회색) + 값(검정) 쌍을 그리드로 배치하는 정보 밀도 높은 레이아웃입니다.

const ARCO_DEPLOY_INFO = [
  { label: '환경', value: 'Production' },
  { label: '버전', value: 'v2.0.0-beta.16' },
  { label: '빌드', value: '#4281' },
  { label: '상태', value: '배포 완료', highlight: '#10b981' },
  { label: '배포 시각', value: '2026-04-10 14:32' },
  { label: '소요 시간', value: '3m 24s' },
  { label: '패키지 수', value: '8개' },
  { label: '청크 크기', value: '2.9 MB' },
  { label: '담당자', value: 'hjun@example.com' },
  { label: '브랜치', value: 'main' },
] as const

export const Arco_정보_밀도_레이아웃: Story = {
  name: 'Arco Design - Description 정보 밀도 레이아웃',
  render: () => (
    <div
      style={{
        width: 480,
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #e2e8f0',
        padding: '20px 24px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Text textStyle="subheadingSmall" style={{ marginBottom: 16, display: 'block' }}>
        배포 정보
      </Text>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          borderTop: '1px solid #f1f5f9',
        }}
      >
        {ARCO_DEPLOY_INFO.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              padding: '10px 0',
              borderBottom: '1px solid #f1f5f9',
              paddingRight: i % 2 === 0 ? 24 : 0,
              paddingLeft: i % 2 === 1 ? 24 : 0,
              borderLeft: i % 2 === 1 ? '1px solid #f1f5f9' : 'none',
            }}
          >
            <Text textStyle="descriptionSmall" style={{ color: '#94a3b8', fontWeight: 500 }}>
              {item.label}
            </Text>
            <Text
              textStyle="descriptionLarge"
              style={{
                color: 'highlight' in item ? item.highlight : '#0f172a',
                fontWeight: 'highlight' in item ? 700 : 500,
                fontFamily: ['버전', '빌드', '브랜치'].includes(item.label) ? 'monospace' : 'inherit',
                fontSize: 13,
              }}
            >
              {item.value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  ),
}

// ─── Linear Design 벤치마크: 변경 이력 타이포그래피 ─────────────────────────
// Linear의 Changelog 페이지 패턴: 버전 헤더 + 날짜 + 변경 항목 불릿 리스트.
// 제목은 굵고 크게, 날짜는 작고 흐리게, 항목은 중간 크기 consistent 텍스트로 구성됩니다.

const LINEAR_CHANGELOG = [
  {
    version: 'v2.0.0-beta.16',
    date: '2026-04-10',
    items: [
      { type: 'feat', text: 'FileBrowser 템플릿 — 그리드/목록 뷰 전환, 즐겨찾기, 다중 선택' },
      { type: 'feat', text: 'SearchBar — Chakra 실시간 사용자 검색, M3 스코프 전환 패턴' },
      { type: 'fix', text: 'Toggle — 온보딩 기능 토글 카드 클릭 영역 개선' },
    ],
  },
  {
    version: 'v2.0.0-beta.15',
    date: '2026-04-09',
    items: [
      { type: 'feat', text: 'NotifCenter 템플릿 — 카테고리 탭, 미읽음 필터, 알림 삭제' },
      { type: 'feat', text: 'Checkbox — Tailwind 플랜 기능 선택, Mantine 컬럼 표시 설정' },
      { type: 'docs', text: 'AccessibilityGuide.mdx — Tailwind UI + Mantine 접근성 벤치마크' },
    ],
  },
] as const

const CHANGE_TYPE_COLOR = { feat: '#10b981', fix: '#ef4444', docs: '#3b82f6' } as const
const CHANGE_TYPE_LABEL = { feat: '기능', fix: '수정', docs: '문서' } as const

export const Linear_변경_이력_타이포: Story = {
  name: 'Linear Design - Changelog 변경 이력 타이포그래피',
  render: () => (
    <div
      style={{
        width: 520,
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      {LINEAR_CHANGELOG.map((release) => (
        <div key={release.version}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <Text textStyle="subheadingSmall" style={{ fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>
              {release.version}
            </Text>
            <Text textStyle="descriptionSmall" style={{ color: '#94a3b8' }}>
              {release.date}
            </Text>
          </div>
          <div
            style={{
              borderLeft: '2px solid #e2e8f0',
              paddingLeft: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {release.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    padding: '2px 5px',
                    borderRadius: 4,
                    background: `${CHANGE_TYPE_COLOR[item.type]}18`,
                    color: CHANGE_TYPE_COLOR[item.type],
                    flexShrink: 0,
                    marginTop: 2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {CHANGE_TYPE_LABEL[item.type]}
                </span>
                <Text textStyle="descriptionLarge" style={{ color: '#334155', lineHeight: 1.6 }}>
                  {item.text}
                </Text>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Material3_타입_스케일_비교 = {
  name: 'Material 3 - TypeScale 역할 비교',
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <div style={{ marginBottom: 16 }}>
        <Text textStyle="subheadingSmall">Material 3 TypeScale → Orbit UI TextStyle 매핑</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {M3_TYPE_ROLES.map((role, i) => (
          <div
            key={role.m3Role}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '12px 0',
              borderBottom: i < M3_TYPE_ROLES.length - 1 ? '1px solid #f1f5f9' : 'none',
            }}
          >
            <div style={{ width: 140, flexShrink: 0 }}>
              <Text textStyle={role.orbitStyle as string}>
                {role.m3Role}
              </Text>
            </div>
            <div>
              <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#6366f1', marginBottom: 2 }}>
                {role.orbitStyle}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{role.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

// --- Cycle 74: Arco Design + Linear 벤치마크 ---

const ArcoDataTableTextRender = () => {
  const ROWS = [
    { name: '김혜준', role: '디자이너', team: '서울팀', status: 'active', joined: '2023-03-15' },
    { name: '이준호', role: '프론트엔드', team: '서울팀', status: 'active', joined: '2022-11-01' },
    { name: '박수연', role: 'PM', team: '부산팀', status: 'inactive', joined: '2024-01-20' },
    { name: '최민준', role: '백엔드', team: '원격', status: 'active', joined: '2023-07-08' },
  ]

  return (
    <div style={{ width: 600, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 14 }}>
        <Text textStyle="titleSmall">팀 멤버</Text>
        <div style={{ marginTop: 2 }}>
          <Text textStyle="bodySmall" color="onSurfaceVariant">
            총 {ROWS.length}명 · 최근 업데이트: 오늘
          </Text>
        </div>
      </div>
      <div style={{ borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.8fr 1fr', background: '#f8fafc', padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>
          {['이름', '역할', '팀', '상태', '입사일'].map((h) => (
            <div key={h}>
              <Text textStyle="labelSmall" color="onSurfaceVariant">{h}</Text>
            </div>
          ))}
        </div>
        {ROWS.map((row, i) => (
          <div
            key={row.name}
            style={{
              display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.8fr 1fr',
              padding: '10px 14px',
              borderBottom: i < ROWS.length - 1 ? '1px solid #f8fafc' : 'none',
              alignItems: 'center',
            }}
          >
            <Text textStyle="bodyMedium">{row.name}</Text>
            <Text textStyle="bodySmall" color="onSurfaceVariant">{row.role}</Text>
            <Text textStyle="bodySmall" color="onSurfaceVariant">{row.team}</Text>
            <div>
              <span style={{
                fontSize: 10, padding: '2px 7px', borderRadius: 10, fontWeight: 600,
                background: row.status === 'active' ? '#dcfce7' : '#f1f5f9',
                color: row.status === 'active' ? '#16a34a' : '#94a3b8',
              }}>
                {row.status === 'active' ? '활성' : '비활성'}
              </span>
            </div>
            <Text textStyle="labelSmall" color="onSurfaceVariant">{row.joined}</Text>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Arco_데이터_테이블_타이포: StoryObj<typeof meta> = {
  name: 'Arco Design - 데이터 테이블 타이포그래피 계층',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Table 타이포그래피 패턴 벤치마크. 테이블 헤더(labelSmall), 데이터 셀(bodySmall/bodyMedium), 제목(titleSmall), 부제(bodySmall onSurfaceVariant) 계층 적용.',
      },
    },
  },
  render: () => <ArcoDataTableTextRender />,
}

const LinearIssueDetailTextRender = () => {
  return (
    <div style={{ width: 520, fontFamily: 'system-ui, sans-serif', padding: '0 2px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#94a3b8', background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>ORB-142</span>
          <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: '#fef3c7', color: '#d97706', fontWeight: 600 }}>진행 중</span>
        </div>
        <Text textStyle="headlineSmall">Button hover 색상 대비 수정</Text>
        <div style={{ marginTop: 6 }}>
          <Text textStyle="bodyMedium" color="onSurfaceVariant">
            현재 GhostButton hover 상태의 배경색이 WCAG AA 기준(4.5:1)을 충족하지 않아 저시력 사용자가 상태 변화를 인지하기 어렵습니다.
          </Text>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { label: '담당자', value: '김혜준' },
          { label: '우선순위', value: '긴급' },
          { label: '사이클', value: 'Cycle 74' },
          { label: '마감일', value: '2026-04-15' },
        ].map((item) => (
          <div key={item.label}>
            <Text textStyle="labelSmall" color="onSurfaceVariant">{item.label}</Text>
            <div style={{ marginTop: 2 }}>
              <Text textStyle="bodySmall">{item.value}</Text>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Text textStyle="titleSmall">재현 방법</Text>
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            '1. GhostButton 컴포넌트를 렌더링',
            '2. 마우스를 버튼 위로 이동',
            '3. 배경색 변화 대비비 측정 (현재 2.8:1)',
            '4. WCAG AA 기준: 최소 4.5:1 필요',
          ].map((step) => (
            <Text key={step} textStyle="bodySmall" color="onSurfaceVariant">{step}</Text>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 16, padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
        <Text textStyle="labelSmall" color="onSurfaceVariant">수정 제안</Text>
        <div style={{ marginTop: 4 }}>
          <Text textStyle="bodySmall">
            hover 배경을 <code style={{ fontFamily: 'monospace', background: '#e2e8f0', padding: '0 4px', borderRadius: 3 }}>#e2e8f0</code> 으로 변경 시 대비비 5.2:1 달성 가능.
          </Text>
        </div>
      </div>
    </div>
  )
}

export const Linear_이슈_상세_타이포: StoryObj<typeof meta> = {
  name: 'Linear - 이슈 상세 뷰 타이포그래피',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 이슈 상세 페이지 타이포그래피 패턴. 이슈 번호(monospace labelSmall), 제목(headlineSmall), 본문(bodyMedium), 메타 정보(labelSmall+bodySmall), 코드 인라인 강조 계층.',
      },
    },
  },
  render: () => <LinearIssueDetailTextRender />,
}

const ArcoLinearReadmeTextRender = () => {
  return (
    <div style={{ width: 560, fontFamily: 'system-ui, sans-serif', maxWidth: '100%' }}>
      <div style={{ marginBottom: 6 }}>
        <Text textStyle="displaySmall">Orbit UI</Text>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Text textStyle="bodyLarge" color="onSurfaceVariant">
          Figma 기반 React 디자인 시스템 — Base → Theme → Custom 3-tier 아키텍처
        </Text>
      </div>

      <div style={{ height: 1, background: '#e2e8f0', marginBottom: 20 }} />

      <div style={{ marginBottom: 16 }}>
        <Text textStyle="headlineMedium">시작하기</Text>
      </div>

      <div style={{ marginBottom: 8 }}>
        <Text textStyle="titleMedium">설치</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text textStyle="bodyMedium" color="onSurfaceVariant">
          pnpm 워크스페이스를 사용합니다. 아래 명령어로 의존성을 설치하세요.
        </Text>
      </div>

      <div style={{ marginBottom: 20 }}>
        <Text textStyle="titleMedium">패키지 구조</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { pkg: '@heejun-com/core', desc: '비스타일 베이스 컴포넌트 (Tailwind CSS)' },
          { pkg: '@heejun-com/theme-eclipse', desc: 'Eclipse 테마 래퍼 (vanilla-extract)' },
          { pkg: '@heejun-com/icons', desc: 'SVG 아이콘 컴포넌트' },
        ].map((item) => (
          <div key={item.pkg} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 220, flexShrink: 0 }}>
              <Text textStyle="labelMedium">
                <code style={{ fontFamily: 'monospace', background: '#f1f5f9', padding: '1px 6px', borderRadius: 4, fontSize: 12 }}>
                  {item.pkg}
                </code>
              </Text>
            </div>
            <Text textStyle="bodySmall" color="onSurfaceVariant">{item.desc}</Text>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: '#e2e8f0', margin: '20px 0' }} />

      <div style={{ display: 'flex', gap: 16 }}>
        <div>
          <Text textStyle="labelSmall" color="onSurfaceVariant">라이선스</Text>
          <div style={{ marginTop: 2 }}>
            <Text textStyle="bodySmall">MIT</Text>
          </div>
        </div>
        <div>
          <Text textStyle="labelSmall" color="onSurfaceVariant">버전</Text>
          <div style={{ marginTop: 2 }}>
            <Text textStyle="bodySmall">0.1.0</Text>
          </div>
        </div>
        <div>
          <Text textStyle="labelSmall" color="onSurfaceVariant">React</Text>
          <div style={{ marginTop: 2 }}>
            <Text textStyle="bodySmall">18 / 19</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Arco_Linear_README_타이포: StoryObj<typeof meta> = {
  name: 'Arco + Linear - README 문서 타이포그래피 계층',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design 문서 페이지 + Linear README 타이포그래피 패턴 조합. displaySmall 제목부터 labelSmall 메타까지 6단계 계층 실전 적용. 코드 강조, 구분선, 메타 정보 레이아웃.',
      },
    },
  },
  render: () => <ArcoLinearReadmeTextRender />,
}

/* --------------------------------------------------------------------------
   Radix UI — 컴포넌트 API 문서 타이포그래피
   PropTable + 설명 계층 패턴
-------------------------------------------------------------------------- */
const RADIX_PROPS = [
  { name: 'textStyle', type: 'TextStyle', default: 'bodyMedium', desc: 'Material Design 3 타입 스케일 키' },
  { name: 'color', type: 'ColorToken', default: 'onSurface', desc: '시맨틱 색상 토큰 이름' },
  { name: 'as', type: 'ElementType', default: 'span', desc: '렌더링할 HTML 태그 (polymorphic)' },
  { name: 'truncate', type: 'boolean', default: 'false', desc: '텍스트 말줄임 적용 여부' },
]

function RadixApiDocRender() {
  return (
    <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 컴포넌트 헤더 */}
      <div style={{ borderBottom: '1px solid var(--sem-eclipse-color-borderSubtle)', paddingBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
          <Text textStyle="headlineMedium">Text</Text>
          <code style={{ fontSize: 12, padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#6366f1', fontFamily: 'monospace' }}>@heejun-com/theme-eclipse</code>
        </div>
        <Text textStyle="bodyMedium" color="onSurfaceVariant">
          Material Design 3 타입 스케일을 기반으로 한 타이포그래피 컴포넌트. displayLarge부터 labelSmall까지 13가지 스타일을 지원합니다.
        </Text>
      </div>

      {/* Props 테이블 */}
      <div>
        <Text textStyle="titleSmall">Props</Text>
        <div style={{ marginTop: 10, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 1fr', background: 'var(--sem-eclipse-color-backgroundSecondary)', padding: '8px 12px', gap: 8 }}>
            {['이름', '타입', '기본값', '설명'].map((h) => (
              <Text key={h} textStyle="labelSmall" color="onSurfaceVariant">{h}</Text>
            ))}
          </div>
          {RADIX_PROPS.map((p, i) => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 1fr', padding: '10px 12px', gap: 8, background: i % 2 === 0 ? 'var(--sem-eclipse-color-backgroundPrimary)' : 'var(--sem-eclipse-color-backgroundSecondary)', alignItems: 'start' }}>
              <code style={{ fontFamily: 'monospace', fontSize: 12, color: '#6366f1' }}>{p.name}</code>
              <code style={{ fontFamily: 'monospace', fontSize: 11, color: '#10b981' }}>{p.type}</code>
              <code style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{p.default}</code>
              <Text textStyle="bodySmall" color="onSurfaceVariant">{p.desc}</Text>
            </div>
          ))}
        </div>
      </div>

      {/* 사용 예시 */}
      <div>
        <Text textStyle="titleSmall">사용 예시</Text>
        <div style={{ marginTop: 8, padding: '12px 16px', borderRadius: 8, background: '#0f172a', fontFamily: 'monospace', fontSize: 12, color: '#e2e8f0', lineHeight: 1.8 }}>
          <span style={{ color: '#94a3b8' }}>{'// 기본 사용'}</span><br />
          <span style={{ color: '#f472b6' }}>{'<Text'}</span> <span style={{ color: '#34d399' }}>textStyle</span><span style={{ color: '#e2e8f0' }}>{'="headlineMedium"'}</span> <span style={{ color: '#34d399' }}>color</span><span style={{ color: '#e2e8f0' }}>{'="onSurface"'}</span><span style={{ color: '#f472b6' }}>{'>'}</span><br />
          <span style={{ color: '#e2e8f0', paddingLeft: 16 }}>{'Orbit UI 타이포그래피'}</span><br />
          <span style={{ color: '#f472b6' }}>{'</Text>'}</span>
        </div>
      </div>
    </div>
  )
}

export const Radix_API_문서_타이포그래피: StoryObj<typeof meta> = {
  name: 'Radix UI — 컴포넌트 API 문서 타이포그래피',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI 공식 문서 스타일의 PropTable + 헤더 계층 패턴. headlineMedium 컴포넌트 타이틀, bodyMedium 설명, titleSmall 섹션 구분, bodySmall + labelSmall 테이블 내용 계층 실전 적용.',
      },
    },
  },
  render: () => <RadixApiDocRender />,
}

/* --------------------------------------------------------------------------
   Vercel Design — 배포 상태 알림 타이포그래피
   상태 뱃지 + 메시지 계층 + 타임스탬프 패턴
-------------------------------------------------------------------------- */
const VERCEL_EVENTS = [
  { type: 'success', icon: '●', color: '#10b981', title: '배포 성공', message: 'orbit-ui feat/cycle-112 → production 8분 전에 완료되었습니다.', meta: 'a9fa67f · by hjunkim', time: '8m ago' },
  { type: 'building', icon: '○', color: '#f59e0b', title: '빌드 진행 중', message: 'orbit-ui main → preview 빌드 중입니다. 평균 소요 시간 약 2분.', meta: 'cb60c3e · by hjunkim', time: '2m ago' },
  { type: 'error', icon: '✕', color: '#ef4444', title: '빌드 실패', message: 'orbit-ui feat/fix-toggle → preview TypeScript 오류 1건이 발생했습니다.', meta: 'd5fd051 · by hjunkim', time: '23m ago' },
  { type: 'queued', icon: '◌', color: '#94a3b8', title: '대기 중', message: 'orbit-ui chore/deps-update → preview 빌드 대기열에서 처리를 기다리고 있습니다.', meta: '0bcdcd1 · by hjunkim', time: '1h ago' },
]

function VercelDeployNotifyRender() {
  return (
    <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ marginBottom: 4 }}>
        <Text textStyle="titleMedium">배포 알림 센터</Text>
        <div style={{ marginTop: 2 }}>
          <Text textStyle="bodySmall" color="onSurfaceVariant">최근 배포 이벤트 4건</Text>
        </div>
      </div>
      {VERCEL_EVENTS.map((event, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 10, border: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-backgroundPrimary)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 2 }}>
            <span style={{ fontSize: 18, color: event.color, lineHeight: 1, fontWeight: 700 }}>{event.icon}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'space-between' }}>
              <Text textStyle="labelMedium">{event.title}</Text>
              <Text textStyle="labelSmall" color="onSurfaceVariant">{event.time}</Text>
            </div>
            <div style={{ marginTop: 3 }}>
              <Text textStyle="bodySmall" color="onSurfaceVariant">{event.message}</Text>
            </div>
            <div style={{ marginTop: 6 }}>
              <code style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', background: 'var(--sem-eclipse-color-backgroundSecondary)', padding: '2px 6px', borderRadius: 4 }}>{event.meta}</code>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const Vercel_배포_상태_알림_타이포: StoryObj<typeof meta> = {
  name: 'Vercel Design — 배포 상태 알림 타이포그래피',
  parameters: {
    docs: {
      description: {
        story: 'Vercel 대시보드 배포 알림 UI 타이포그래피 패턴. titleMedium 섹션 제목, labelMedium 이벤트 타입, bodySmall 메시지, labelSmall 타임스탬프, monospace 커밋 해시 계층 구현.',
      },
    },
  },
  render: () => <VercelDeployNotifyRender />,
}

/* --------------------------------------------------------------------------
   Radix UI + Vercel — 에러 상태 타이포그래피
   빈 상태 / 오류 / 권한 없음 메시지 패턴
-------------------------------------------------------------------------- */
type EmptyState = 'empty' | 'error' | 'forbidden' | 'notfound'

const EMPTY_STATES: Record<EmptyState, { icon: string; title: string; body: string; action: string; color: string }> = {
  empty: { icon: '○', title: '아직 데이터가 없습니다', body: '첫 번째 컴포넌트 스토리를 추가하면 여기에 표시됩니다.', action: '스토리 추가하기', color: '#94a3b8' },
  error: { icon: '⚠', title: '오류가 발생했습니다', body: '서버에서 데이터를 불러오는 중 예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도하세요.', action: '다시 시도', color: '#ef4444' },
  forbidden: { icon: '⊘', title: '접근 권한이 없습니다', body: '이 리소스에 접근하려면 관리자 권한이 필요합니다.', action: '권한 요청', color: '#f59e0b' },
  notfound: { icon: '∅', title: '페이지를 찾을 수 없습니다', body: 'URL을 확인하거나 돌아가기 버튼으로 이전 페이지로 이동하세요.', action: '홈으로 돌아가기', color: '#6366f1' },
}

function RadixVercelEmptyStateRender() {
  const [state, setState] = React.useState<EmptyState>('empty')
  const s = EMPTY_STATES[state]
  return (
    <div style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 상태 선택 탭 */}
      <div style={{ display: 'flex', gap: 6 }}>
        {(Object.keys(EMPTY_STATES) as EmptyState[]).map((key) => (
          <button key={key} onClick={() => setState(key)} style={{ padding: '4px 12px', borderRadius: 20, border: `1px solid ${state === key ? EMPTY_STATES[key].color : 'var(--sem-eclipse-color-borderSubtle)'}`, background: state === key ? `${EMPTY_STATES[key].color}12` : 'transparent', color: state === key ? EMPTY_STATES[key].color : 'var(--sem-eclipse-color-foregroundTertiary)', fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
            {key}
          </button>
        ))}
      </div>
      {/* 빈 상태 카드 */}
      <div style={{ padding: '48px 32px', borderRadius: 16, border: '1px dashed var(--sem-eclipse-color-borderDefault)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
        <span style={{ fontSize: 48, color: s.color, lineHeight: 1 }}>{s.icon}</span>
        <div>
          <Text textStyle="titleMedium">{s.title}</Text>
        </div>
        <div style={{ maxWidth: 300 }}>
          <Text textStyle="bodySmall" color="onSurfaceVariant">{s.body}</Text>
        </div>
        <button style={{ marginTop: 8, padding: '8px 20px', borderRadius: 8, border: `1px solid ${s.color}`, background: `${s.color}10`, color: s.color, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          {s.action}
        </button>
      </div>
      <div style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundDisabled)' }}>Radix UI + Vercel — 빈 상태 / 에러 / 권한없음 메시지 타이포</div>
    </div>
  )
}

export const Radix_Vercel_빈상태_에러_타이포: StoryObj<typeof meta> = {
  name: 'Radix UI + Vercel — 빈 상태 / 에러 타이포그래피 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Radix UI + Vercel의 Empty State / Error 메시지 UI 타이포그래피 패턴. titleMedium 제목, bodySmall 설명 텍스트, 상태별 색상 코딩, 4가지 상태(empty/error/forbidden/notfound) 전환.',
      },
    },
  },
  render: () => <RadixVercelEmptyStateRender />,
}

// Cycle 141 - Raycast Extensions + Figma Plugin UI benchmark
function RaycastResultItem141Render() {
  const [selected, setSelected] = React.useState(1)

  const results = [
    { id: 1, category: 'Storybook', title: 'Progress Component', desc: 'Cycle 140에 추가된 업로드 진행률 컴포넌트', shortcut: '⌘1' },
    { id: 2, category: 'Issue', title: 'ORB-241 TextField focus ring', desc: 'a11y: focus visible 개선', shortcut: '⌘2' },
    { id: 3, category: 'Doc', title: 'BenchmarkComparison.mdx', desc: 'Cycle 141 Raycast 섹션 추가', shortcut: '⌘3' },
    { id: 4, category: 'Component', title: 'OutlineButton', desc: '16종 스토리 포함 — 액션 패널, 필터 바', shortcut: '⌘4' },
  ]

  const categoryColor: Record<string, string> = {
    Storybook: '#7c3aed',
    Issue: '#dc2626',
    Doc: '#0284c7',
    Component: '#059669',
  }

  return (
    <div style={{ width: 420, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 10, fontSize: 11, color: '#64748b' }}>Raycast — 검색 결과 타이포그래피 패턴</div>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        {results.map((r) => (
          <div
            key={r.id}
            onClick={() => setSelected(r.id)}
            style={{ padding: '10px 16px', background: selected === r.id ? '#f0f9ff' : '#fff', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 3 }}>
                <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: categoryColor[r.category], background: `${categoryColor[r.category]}12`, padding: '1px 5px', borderRadius: 3 }}>
                  {r.category}
                </span>
                <Text textStyle="labelMedium">{r.title}</Text>
              </div>
              <Text textStyle="bodySmall" color="onSurfaceVariant">{r.desc}</Text>
            </div>
            <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', flexShrink: 0, marginLeft: 12, background: '#f8fafc', padding: '2px 5px', borderRadius: 4, border: '1px solid #e2e8f0' }}>
              {r.shortcut}
            </span>
          </div>
        ))}
        <div style={{ padding: '8px 16px', background: '#fafafa', borderTop: '1px solid #f1f5f9' }}>
          <Text textStyle="labelSmall" color="onSurfaceVariant">
            {results.length}개 결과 · ↑↓ 탐색 · Enter 열기
          </Text>
        </div>
      </div>
    </div>
  )
}

export const Raycast_검색결과_타이포: StoryObj<typeof meta> = {
  name: 'Raycast — 검색 결과 타이포그래피 (Cycle 141)',
  parameters: {
    docs: {
      description: {
        story: 'Raycast 검색 결과 패턴. 카테고리 뱃지 + labelMedium 제목 + bodySmall 설명. 선택 상태 배경 변화, 단축키 키캡.',
      },
    },
  },
  render: () => <RaycastResultItem141Render />,
}

function FigmaPropertyPanel141Render() {
  const props = [
    { label: 'Width', value: '360px', token: 'spacing-90' },
    { label: 'Height', value: 'auto', token: 'auto' },
    { label: 'Font Size', value: '14px', token: 'text-body-md' },
    { label: 'Line Height', value: '1.5 (21px)', token: 'leading-normal' },
    { label: 'Font Weight', value: '400 Regular', token: 'font-regular' },
    { label: 'Letter Spacing', value: '0em', token: 'tracking-normal' },
    { label: 'Color', value: '#1E293B', token: 'color.foreground.primary' },
  ]

  return (
    <div style={{ width: 280, fontFamily: 'system-ui, sans-serif', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <Text textStyle="labelMedium">속성 패널</Text>
        <div style={{ marginTop: 1 }}>
          <Text textStyle="labelSmall" color="onSurfaceVariant">Figma Plugin UI 타이포그래피</Text>
        </div>
      </div>
      <div style={{ padding: 4 }}>
        {props.map((p) => (
          <div key={p.label} style={{ padding: '7px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, alignItems: 'start', borderBottom: '1px solid #f8fafc' }}>
            <Text textStyle="labelSmall" color="onSurfaceVariant">{p.label}</Text>
            <div>
              <Text textStyle="labelSmall">{p.value}</Text>
              <div style={{ marginTop: 1 }}>
                <Text textStyle="labelSmall" color="onSurfaceVariant" style={{ fontFamily: 'monospace', fontSize: 9 }}>{p.token}</Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Figma_속성_패널_타이포: StoryObj<typeof meta> = {
  name: 'Figma Plugin UI — 속성 패널 타이포그래피 (Cycle 141)',
  parameters: {
    docs: {
      description: {
        story: 'Figma 속성 패널 UI 타이포그래피. labelMedium 헤더, labelSmall 키/값 쌍, monospace 토큰 레퍼런스. 컴팩트 밀도.',
      },
    },
  },
  render: () => <FigmaPropertyPanel141Render />,
}

function RaycastFigmaChangeLog141Render() {
  const changes = [
    { version: 'v2.1.0', date: '2026-04-10', tag: 'minor', items: ['Cycle 141: OutlineButton 액션 패널 스토리', 'Text 속성 패널 타이포 패턴', 'Templates: CalendarApp 추가'] },
    { version: 'v2.0.9', date: '2026-04-09', tag: 'patch', items: ['Cycle 140: Progress 업로드 진행률', 'FloatingTextField 멀티스텝 폼', 'Mantine + Arco 분석 대시보드'] },
    { version: 'v2.0.8', date: '2026-04-08', tag: 'patch', items: ['Toggle 서식 도구바', 'SearchBar 전역 검색', 'AI 글쓰기 스튜디오 템플릿'] },
  ]

  const tagColor: Record<string, string> = { minor: '#7c3aed', patch: '#0284c7', major: '#dc2626' }

  return (
    <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 12 }}>
        <Text textStyle="titleMedium">변경 이력</Text>
        <div style={{ marginTop: 2 }}>
          <Text textStyle="bodySmall" color="onSurfaceVariant">Raycast + Figma — 릴리스 노트 타이포 패턴</Text>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {changes.map((ch) => (
          <div key={ch.version} style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Text textStyle="labelLarge">{ch.version}</Text>
              <span style={{ fontSize: 10, fontWeight: 700, color: tagColor[ch.tag], background: `${tagColor[ch.tag]}12`, padding: '1px 7px', borderRadius: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {ch.tag}
              </span>
              <Text textStyle="labelSmall" color="onSurfaceVariant">{ch.date}</Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {ch.items.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 6 }}>
                  <span style={{ color: '#94a3b8', flexShrink: 0, marginTop: 1 }}>·</span>
                  <Text textStyle="bodySmall">{item}</Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Raycast_Figma_변경이력_타이포: StoryObj<typeof meta> = {
  name: 'Raycast + Figma — 변경 이력 타이포그래피 (Cycle 141)',
  parameters: {
    docs: {
      description: {
        story: 'Raycast 릴리스 노트 + Figma UI 타이포. titleMedium 헤더, labelLarge 버전, labelSmall 날짜/태그, bodySmall 항목. 수직 타임라인 레이아웃.',
      },
    },
  },
  render: () => <RaycastFigmaChangeLog141Render />,
}
