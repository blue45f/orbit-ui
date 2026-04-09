import { CheckIcon, StarLineIcon, HeartLineIcon, SearchIcon, LinkIcon, SettingLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'

import { ChipLink } from './ChipLink'
import * as styles from './ChipLink.stories.css'

ChipLink.displayName = 'ChipLink'
ChipLink.Leading.displayName = 'ChipLink.Leading'

const meta = {
  title: 'eclipse/Actions/Chips/ChipLink',
  component: ChipLink,
  args: {},
  argTypes: {
    onClick: { action: 'clicked' },
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof ChipLink>

export default meta
type Story = StoryObj<typeof meta>

export const 기본 = {
  // eslint-disable-next-line
  render: () => {
    return (
      <ChipLink href="https://github.com/blue45f/ui-forge" target="_blank">
        ChipLink
      </ChipLink>
    )
  },
}

export const 모든상태: Story = {
  render: () => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Leading O</th>
            <th>Leading X</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ChipLink href="https://github.com/blue45f/ui-forge" target="_blank">
                <ChipLink.Leading>
                  <CheckIcon />
                </ChipLink.Leading>
                ChipLink
              </ChipLink>
            </td>
            <td>
              <ChipLink href="https://github.com/blue45f/ui-forge" target="_blank">
                ChipLink
              </ChipLink>
            </td>
          </tr>
        </tbody>
      </table>
    )
  },
}

export const 디자인_QA = {
  args: {
    leading: false,
    borderWidth: 1,
    text: 'ChipLink',
  },
  // eslint-disable-next-line
  render: ({ leading, text, ...rest }: any) => {
    return (
      <ChipLink {...rest} href="https://github.com/blue45f/ui-forge" target="_blank">
        {leading && (
          <ChipLink.Leading>
            <CheckIcon />
          </ChipLink.Leading>
        )}
        {text}
      </ChipLink>
    )
  },
}

/* --------------------------------------------------------------------------
   Arco Design 스타일 태그 컬렉션
   카테고리별 태그 링크 그룹 패턴 - 아시아권 UI의 태그 클라우드 스타일
-------------------------------------------------------------------------- */
export const 태그_컬렉션: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px', padding: '24px' }}>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
          Components
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['Button', 'TextField', 'Modal', 'Dropdown', 'Chip', 'Toggle', 'Carousel'].map((name) => (
            <ChipLink key={name} href="#">
              <ChipLink.Leading>
                <CheckIcon />
              </ChipLink.Leading>
              {name}
            </ChipLink>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
          Resources
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { label: 'GitHub', icon: <LinkIcon /> },
            { label: 'Storybook', icon: <StarLineIcon /> },
            { label: 'Figma', icon: <SettingLineIcon /> },
            { label: 'npm', icon: <SearchIcon /> },
          ].map(({ label, icon }) => (
            <ChipLink key={label} href="#">
              <ChipLink.Leading>{icon}</ChipLink.Leading>
              {label}
            </ChipLink>
          ))}
        </div>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Arco Design 스타일 인터랙티브 필터 태그
   선택/해제 가능한 링크 태그 필터 패턴 - 상품 카테고리 필터 등에 활용
-------------------------------------------------------------------------- */
const filterCategories = [
  { id: 'all', label: '전체' },
  { id: 'action', label: 'Actions' },
  { id: 'input', label: 'Inputs' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'display', label: 'Data Display' },
  { id: 'navigation', label: 'Navigation' },
]

const componentsByCategory: Record<string, string[]> = {
  all: ['Button', 'TextField', 'Modal', 'DataTable', 'Toast', 'Breadcrumb', 'Toggle', 'Chip'],
  action: ['Button', 'SolidButton', 'GhostButton', 'Chip', 'ChipLink'],
  input: ['TextField', 'FloatingTextField', 'Toggle', 'Dropdown', 'Slider'],
  feedback: ['Modal', 'AlertDialog', 'Toast', 'Progress', 'Loading'],
  display: ['DataTable', 'Carousel', 'Avatar', 'LabelBadge', 'Accordion'],
  navigation: ['Breadcrumb', 'TabGroup', 'Drawer', 'AppBar', 'PageIndicator'],
}

const FilterTagsRender = () => {
  const [selected, setSelected] = React.useState('all')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '560px', padding: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {filterCategories.map(({ id, label }) => (
          <span key={id}>
            {selected === id ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: '#6366f1',
                  color: '#fff',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => setSelected(id)}
              >
                {label}
              </span>
            ) : (
              <ChipLink
                href="#"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  setSelected(id)
                }}
              >
                {label}
              </ChipLink>
            )}
          </span>
        ))}
      </div>

      <div
        style={{
          padding: '16px 20px',
          borderRadius: '12px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {filterCategories.find((c) => c.id === selected)?.label} ({componentsByCategory[selected].length})
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {componentsByCategory[selected].map((name) => (
            <ChipLink key={name} href="#">
              <ChipLink.Leading>
                <CheckIcon />
              </ChipLink.Leading>
              {name}
            </ChipLink>
          ))}
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export const 인터랙티브_필터_태그: Story = {
  render: () => <FilterTagsRender />,
}

/* --------------------------------------------------------------------------
   Arco Design 스타일 관련 링크 목록
   아티클/문서 페이지에서 볼 수 있는 관련 태그 링크 패턴
-------------------------------------------------------------------------- */
export const 관련_링크_패턴: Story = {
  render: () => (
    <div style={{ maxWidth: '520px', padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
          Orbit UI Design System
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
          React 기반 3-tier 아키텍처 디자인 시스템. Base components, Theme layer, Custom extensions로 구성됩니다.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
            관련 문서
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <ChipLink href="#">
              <ChipLink.Leading><LinkIcon /></ChipLink.Leading>
              Getting Started
            </ChipLink>
            <ChipLink href="#">
              <ChipLink.Leading><LinkIcon /></ChipLink.Leading>
              Component API
            </ChipLink>
            <ChipLink href="#">
              <ChipLink.Leading><LinkIcon /></ChipLink.Leading>
              Design Tokens
            </ChipLink>
            <ChipLink href="#">
              <ChipLink.Leading><LinkIcon /></ChipLink.Leading>
              Changelog
            </ChipLink>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
            관련 컴포넌트
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <ChipLink href="#">
              <ChipLink.Leading><HeartLineIcon /></ChipLink.Leading>
              Chip
            </ChipLink>
            <ChipLink href="#">
              <ChipLink.Leading><HeartLineIcon /></ChipLink.Leading>
              LabelBadge
            </ChipLink>
            <ChipLink href="#">
              <ChipLink.Leading><HeartLineIcon /></ChipLink.Leading>
              AnimatedBadge
            </ChipLink>
            <ChipLink href="#">
              <ChipLink.Leading><HeartLineIcon /></ChipLink.Leading>
              SpeechBadge
            </ChipLink>
          </div>
        </div>
      </div>
    </div>
  ),
}
