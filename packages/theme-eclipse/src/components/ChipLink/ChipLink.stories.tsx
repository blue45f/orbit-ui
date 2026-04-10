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

/* --------------------------------------------------------------------------
   Mantine 스타일 칩 그룹 다중 선택
   Chip.Group multiple 패턴 - 기술 스택 필터 다중 선택 UI
-------------------------------------------------------------------------- */
const TECH_STACKS = [
  { id: 'react', label: 'React', icon: <StarLineIcon /> },
  { id: 'ts', label: 'TypeScript', icon: <CheckIcon /> },
  { id: 'tailwind', label: 'Tailwind', icon: <SettingLineIcon /> },
  { id: 'vite', label: 'Vite', icon: <SearchIcon /> },
  { id: 'storybook', label: 'Storybook', icon: <LinkIcon /> },
  { id: 'vitest', label: 'Vitest', icon: <HeartLineIcon /> },
]

const MantineChipGroupRender = () => {
  const [selected, setSelected] = React.useState<string[]>(['react', 'ts'])

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  return (
    <div style={{ maxWidth: 480, padding: 28, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>기술 스택 필터</div>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
        {selected.length > 0 ? `${selected.length}개 선택됨` : '선택 없음'}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {TECH_STACKS.map(({ id, label, icon }) => {
          const isSelected = selected.includes(id)
          return (
            <span key={id}>
              {isSelected ? (
                <span
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: '#6366f1', color: '#fff', cursor: 'pointer', userSelect: 'none', border: '1.5px solid #6366f1' }}
                  onClick={() => toggle(id)}
                >
                  <span style={{ display: 'flex', width: 14, height: 14 }}>{icon}</span>
                  {label}
                </span>
              ) : (
                <ChipLink
                  href="#"
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); toggle(id) }}
                >
                  <ChipLink.Leading>{icon}</ChipLink.Leading>
                  {label}
                </ChipLink>
              )}
            </span>
          )
        })}
      </div>

      {selected.length > 0 && (
        <div style={{ padding: '12px 16px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>선택된 스택</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selected.map((id) => {
              const tech = TECH_STACKS.find((t) => t.id === id)
              return tech ? (
                <span key={id} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 12, background: '#eef2ff', color: '#6366f1', fontWeight: 600 }}>
                  {tech.label}
                </span>
              ) : null
            })}
          </div>
          <button
            style={{ marginTop: 10, fontSize: 11, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={() => setSelected([])}
          >
            전체 해제
          </button>
        </div>
      )}
    </div>
  )
}

export const Mantine_칩_그룹_다중선택: Story = {
  render: () => <MantineChipGroupRender />,
}

/* --------------------------------------------------------------------------
   Arco Design 스타일 기술 스택 배지 쇼케이스
   아이콘과 레이블이 결합된 스택 배지 카드 패턴 - 포트폴리오/프로필 활용
-------------------------------------------------------------------------- */
const STACK_CATEGORIES = [
  {
    name: 'Frontend',
    color: '#6366f1',
    bg: '#eef2ff',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'Design System',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    items: ['Storybook', 'vanilla-extract', 'Figma', 'Design Tokens'],
  },
  {
    name: 'Testing',
    color: '#10b981',
    bg: '#f0fdf4',
    items: ['Vitest', 'Testing Library', 'Playwright'],
  },
]

export const Arco_기술스택_배지: Story = {
  render: () => (
    <div style={{ maxWidth: 520, padding: 28, fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>기술 스택</div>
        <div style={{ fontSize: 12, color: '#64748b' }}>Orbit UI 프로젝트를 구성하는 기술 스택입니다</div>
      </div>

      {STACK_CATEGORIES.map(({ name, color, items }) => (
        <div key={name}>
          <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            {name}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {items.map((item) => (
              <ChipLink key={item} href="#">
                <ChipLink.Leading>
                  <StarLineIcon />
                </ChipLink.Leading>
                {item}
              </ChipLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Mantine 스타일 검색 태그 인터페이스
   태그 기반 검색 필드 - 입력으로 태그 추가, 클릭으로 제거하는 패턴
-------------------------------------------------------------------------- */
const SearchTagsRender = () => {
  const [tags, setTags] = React.useState<string[]>(['디자인 시스템', 'React'])
  const [input, setInput] = React.useState('')

  const addTag = () => {
    const trimmed = input.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed])
      setInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <div style={{ maxWidth: 460, padding: 28, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>태그 검색</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '10px 12px', border: '1.5px solid #6366f1', borderRadius: 10, background: '#fff', minHeight: 48, marginBottom: 12, alignItems: 'center' }}>
        {tags.map((tag) => (
          <ChipLink
            key={tag}
            href="#"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); removeTag(tag) }}
          >
            <ChipLink.Leading><CheckIcon /></ChipLink.Leading>
            {tag}
          </ChipLink>
        ))}
        <input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') addTag() }}
          placeholder={tags.length === 0 ? '태그 입력 후 Enter' : '태그 추가...'}
          style={{ border: 'none', outline: 'none', fontSize: 13, color: '#374151', background: 'transparent', minWidth: 100, flex: 1 }}
        />
      </div>

      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 16 }}>
        태그를 클릭하면 제거됩니다 · Enter로 추가
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>추천 태그</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['컴포넌트', 'UI Kit', '토큰', 'Figma', '접근성', '다크모드'].filter((s) => !tags.includes(s)).map((suggest) => (
            <ChipLink
              key={suggest}
              href="#"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); if (!tags.includes(suggest)) setTags((prev) => [...prev, suggest]) }}
            >
              {suggest}
            </ChipLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Mantine_검색_태그: Story = {
  render: () => <SearchTagsRender />,
}
