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
