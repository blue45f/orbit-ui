import { CheckIcon, StarLineIcon, HeartLineIcon, SearchIcon, LinkIcon, SettingLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { ChipLink } from './ChipLink'
import * as styles from './ChipLink.stories.css'

ChipLink.displayName = 'ChipLink'
ChipLink.Leading.displayName = 'ChipLink.Leading'

const meta = {
  title: 'eclipse/Actions/Chips/ChipLink',
  component: ChipLink,
  tags: ['autodocs'],
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
  const [selected, setSelected] = useState('all')

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
  const [selected, setSelected] = useState<string[]>(['react', 'ts'])

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
  const [tags, setTags] = useState<string[]>(['디자인 시스템', 'React'])
  const [input, setInput] = useState('')

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

// ─── Cycle 64: Linear Design + Figma Plugin UI ─────────────────────────────

type LinearLabel = {
  id: string
  name: string
  color: string
  count: number
}

const LINEAR_LABELS: LinearLabel[] = [
  { id: 'bug', name: 'Bug', color: '#ef4444', count: 3 },
  { id: 'feature', name: 'Feature', color: '#6366f1', count: 8 },
  { id: 'improvement', name: 'Improvement', color: '#22c55e', count: 5 },
  { id: 'docs', name: 'Documentation', color: '#f59e0b', count: 2 },
  { id: 'design', name: 'Design', color: '#ec4899', count: 4 },
]

const LinearIssueLabelRender = () => {
  const [active, setActive] = useState<Set<string>>(new Set(['bug', 'feature']))

  const toggle = (id: string) => {
    setActive(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>이슈 레이블 필터</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {LINEAR_LABELS.map((label) => {
          const _isOn = active.has(label.id)
          return (
            <ChipLink
              key={label.id}
              href="#"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); toggle(label.id) }}

            >
              <ChipLink.Leading>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: label.color }} />
              </ChipLink.Leading>
              {label.name}
            </ChipLink>
          )
        })}
      </div>
      <div style={{ fontSize: 12, color: '#64748b' }}>
        선택된 레이블: <strong style={{ color: '#0f172a' }}>{active.size}개</strong> ·
        표시 이슈: <strong style={{ color: '#6366f1' }}>{LINEAR_LABELS.filter(l => active.has(l.id)).reduce((s, l) => s + l.count, 0)}개</strong>
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: '#94a3b8' }}>Linear 이슈 레이블 필터 패턴</div>
    </div>
  )
}

export const Linear_이슈_레이블_필터: Story = {
  name: 'Linear - 이슈 레이블 필터 ChipLink',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 이슈 레이블 필터 패턴. ChipLink에 color dot Leading을 배치하고, 선택 여부에 따라 투명도로 활성 상태를 표현합니다. 선택된 레이블에 해당하는 이슈 수가 실시간으로 집계됩니다.',
      },
    },
  },
  render: () => <LinearIssueLabelRender />,
}

type FigmaComponent = {
  id: string
  name: string
  library: string
  category: string
  href: string
}

const FIGMA_COMPONENTS: FigmaComponent[] = [
  { id: 'btn', name: 'SolidButton', library: 'Orbit UI', category: 'Actions', href: '#' },
  { id: 'inp', name: 'TextField', library: 'Orbit UI', category: 'Inputs', href: '#' },
  { id: 'bdg', name: 'LabelBadge', library: 'Orbit UI', category: 'Display', href: '#' },
  { id: 'tab', name: 'TabGroup', library: 'Orbit UI', category: 'Navigation', href: '#' },
  { id: 'mdl', name: 'Drawer', library: 'Orbit UI', category: 'Overlay', href: '#' },
]

const FigmaComponentLinkRender = () => {
  const [filter, setFilter] = useState('전체')
  const categories = ['전체', ...Array.from(new Set(FIGMA_COMPONENTS.map(c => c.category)))]

  const filtered = FIGMA_COMPONENTS.filter(c => filter === '전체' || c.category === filter)

  return (
    <div style={{ width: 360, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Figma 컴포넌트 소스 링크</div>
      {/* Category filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {categories.map((cat) => (
          <ChipLink
            key={cat}
            href="#"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); setFilter(cat) }}

          >
            {cat}
          </ChipLink>
        ))}
      </div>
      {/* Component list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map((comp) => (
          <div key={comp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{comp.name}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{comp.category}</div>
            </div>
            <ChipLink href={comp.href} target="_blank">
              <ChipLink.Leading>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: '#f24e1e' }} />
              </ChipLink.Leading>
              {comp.library}
            </ChipLink>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>Figma 컴포넌트 라이브러리 링크 패턴</div>
    </div>
  )
}

export const Figma_컴포넌트_라이브러리_링크: Story = {
  name: 'Figma Plugin - 컴포넌트 라이브러리 링크 태그',
  parameters: {
    docs: {
      description: {
        story: 'Figma Plugin UI의 컴포넌트 소스 링크 패턴. 카테고리 필터 ChipLink + 컴포넌트별 라이브러리 출처 ChipLink를 조합합니다. Leading에 Figma 아이콘 색상 도트를 배치해 라이브러리 출처를 표현합니다.',
      },
    },
  },
  render: () => <FigmaComponentLinkRender />,
}

type LinearProject = {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed'
  statusColor: string
  count: number
}

const LINEAR_PROJECTS: LinearProject[] = [
  { id: 'orbit', name: 'Orbit UI v2', status: 'active', statusColor: '#22c55e', count: 14 },
  { id: 'token', name: '토큰 시스템 재설계', status: 'active', statusColor: '#22c55e', count: 7 },
  { id: 'storybook', name: 'Storybook 고도화', status: 'paused', statusColor: '#f59e0b', count: 3 },
  { id: 'icons', name: 'Icon 확장 팩', status: 'completed', statusColor: '#6366f1', count: 0 },
  { id: 'docs', name: 'MDX 문서화', status: 'active', statusColor: '#22c55e', count: 9 },
]

const LinearProjectTagRender = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>프로젝트 태그 탐색</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {LINEAR_PROJECTS.map((proj) => (
          <ChipLink
            key={proj.id}
            href="#"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); setSelectedId(selectedId === proj.id ? null : proj.id) }}

          >
            <ChipLink.Leading>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: proj.statusColor }} />
            </ChipLink.Leading>
            {proj.name}
            {proj.count > 0 && (
              <span style={{ marginLeft: 4, fontSize: 10, fontWeight: 700, color: proj.statusColor }}>({proj.count})</span>
            )}
          </ChipLink>
        ))}
      </div>
      {selectedId && (() => {
        const proj = LINEAR_PROJECTS.find(p => p.id === selectedId)
        if (!proj) return null
        return (
          <div style={{ padding: '12px 14px', borderRadius: 10, border: `1px solid ${proj.statusColor}30`, background: proj.statusColor + '08' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{proj.name}</div>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: proj.statusColor + '20', color: proj.statusColor, fontWeight: 600 }}>{proj.status}</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b' }}>진행 중 이슈 {proj.count}개</div>
          </div>
        )
      })()}
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>Linear 프로젝트 태그 링크 탐색 패턴</div>
    </div>
  )
}

export const Linear_프로젝트_태그_탐색: Story = {
  name: 'Linear - 프로젝트 태그 탐색 링크',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 프로젝트 태그 탐색 패턴. ChipLink에 상태 색상 Leading 도트를 배치하고 선택 시 상세 정보 카드를 인라인으로 표시합니다. 프로젝트 탐색, 빠른 필터 링크 UI에 활용됩니다.',
      },
    },
  },
  render: () => <LinearProjectTagRender />,
}

const RAYCAST_ACTIONS = [
  { id: 'copy', label: 'Copy Link', shortcut: '⌘C', icon: '⌘' },
  { id: 'open', label: 'Open in Browser', shortcut: '⌘O', icon: '↗' },
  { id: 'share', label: 'Share', shortcut: '⌘S', icon: '↑' },
  { id: 'bookmark', label: 'Add Bookmark', shortcut: '⌘D', icon: '★' },
  { id: 'preview', label: 'Quick Look', shortcut: '⌘Space', icon: '⎵' },
]

const RaycastQuickActionLinksRender = () => {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div style={{ width: 320, fontFamily: 'Inter, system-ui, sans-serif', background: '#1c1c1e', borderRadius: 12, padding: '12px 0', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '4px 12px 10px', fontSize: 11, fontWeight: 600, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Actions</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 6px' }}>
        {RAYCAST_ACTIONS.map(action => (
          <div key={action.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ChipLink
              href="#"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); setActiveId(action.id) }}
              selected={activeId === action.id}
            >
              <ChipLink.Leading>
                <span style={{ fontSize: 13, opacity: 0.7 }}>{action.icon}</span>
              </ChipLink.Leading>
              {action.label}
            </ChipLink>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#636366', background: '#2c2c2e', padding: '1px 6px', borderRadius: 4 }}>{action.shortcut}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 12px 4px', fontSize: 10, color: '#48484a', textAlign: 'center' }}>Raycast Quick Action 패턴</div>
    </div>
  )
}

export const Raycast_퀵액션_링크: Story = {
  name: 'Raycast - 퀵 액션 링크 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Raycast 커맨드 팔레트의 액션 목록 패턴. 다크 배경에 ChipLink를 세로로 배치하고 키보드 단축키를 우측에 표시합니다. 커맨드 팔레트, 컨텍스트 메뉴, 퀵 액션 UI에 적합합니다.',
      },
    },
  },
  render: () => <RaycastQuickActionLinksRender />,
}

const SHADCN_BREADCRUMB_ITEMS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'components', label: 'Components', href: '/docs/components' },
  { id: 'chip', label: 'ChipLink', href: '/docs/components/chip-link' },
]

const ShadcnBreadcrumbRender = () => (
  <div style={{ width: 360, fontFamily: 'Inter, system-ui, sans-serif' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {SHADCN_BREADCRUMB_ITEMS.map((item, idx) => (
        <React.Fragment key={item.id}>
          <ChipLink href={item.href} onClick={(e: React.MouseEvent) => e.preventDefault()}>
            {item.label}
          </ChipLink>
          {idx < SHADCN_BREADCRUMB_ITEMS.length - 1 && (
            <span style={{ fontSize: 12, color: '#94a3b8' }}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
    <div style={{ marginTop: 12, padding: '12px 14px', background: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#64748b' }}>
      shadcn/ui 브레드크럼 네비게이션 패턴 — 계층적 경로를 ChipLink로 구현
    </div>
  </div>
)

export const Shadcn_브레드크럼_네비게이션: Story = {
  name: 'shadcn/ui - 브레드크럼 네비게이션',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui Breadcrumb 컴포넌트 패턴을 ChipLink로 구현. 계층적 경로를 구분자(/)와 함께 수평으로 나열합니다. 문서 사이트, 관리자 대시보드, 파일 탐색기 UI에 적합합니다.',
      },
    },
  },
  render: () => <ShadcnBreadcrumbRender />,
}

const NOTION_BLOCK_TYPES = [
  { id: 'text', label: 'Text', icon: 'T', desc: '일반 텍스트' },
  { id: 'heading', label: 'Heading 1', icon: 'H1', desc: '대형 제목' },
  { id: 'list', label: 'Bulleted List', icon: '•', desc: '순서 없는 목록' },
  { id: 'todo', label: 'To-do', icon: '☑', desc: '체크리스트' },
  { id: 'callout', label: 'Callout', icon: '💡', desc: '강조 블록' },
  { id: 'code', label: 'Code', icon: '</>', desc: '코드 블록' },
]

const NotionBlockTypeLinkRender = () => {
  const [selected, setSelected] = useState<string>('text')

  return (
    <div style={{ width: 320, fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
      <div style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0', background: '#f9fafb' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>블록 유형 전환</div>
        <div style={{ fontSize: 11, color: '#9ca3af' }}>Notion 블록 타입 선택 패턴</div>
      </div>
      <div style={{ padding: 8 }}>
        {NOTION_BLOCK_TYPES.map(block => (
          <div key={block.id} style={{ marginBottom: 2 }}>
            <ChipLink
              href="#"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); setSelected(block.id) }}
              selected={selected === block.id}
            >
              <ChipLink.Leading>
                <span style={{ fontSize: 12, fontWeight: 700, width: 20, textAlign: 'center', color: selected === block.id ? undefined : '#6b7280' }}>{block.icon}</span>
              </ChipLink.Leading>
              {block.label}
              <span style={{ fontSize: 10, color: '#9ca3af', marginLeft: 4 }}>— {block.desc}</span>
            </ChipLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Notion_블록_타입_전환: Story = {
  name: 'Notion - 블록 타입 전환 링크 메뉴',
  parameters: {
    docs: {
      description: {
        story: 'Notion 블록 타입 전환 팝업 패턴. 아이콘 + 이름 + 설명을 가진 ChipLink 목록으로 콘텐츠 블록 유형(Text/Heading/List/To-do 등)을 선택합니다. 인라인 슬래시 커맨드 메뉴에 적합합니다.',
      },
    },
  },
  render: () => <NotionBlockTypeLinkRender />,
}

/* --------------------------------------------------------------------------
   Cycle 125 — MUI + Tailwind UI 벤치마크
-------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   MUI: 탐색 경로(breadcrumb) 스타일 링크 칩 패턴
   MUI Breadcrumbs 의 링크 스타일 — 클릭 가능한 경로 탐색 칩 체인
-------------------------------------------------------------------------- */
export const MUI_경로_탐색_링크_칩: Story = {
  name: 'MUI - 경로 탐색 링크 칩 체인 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Breadcrumbs + Chip 조합 아이디어. 클릭 가능한 ChipLink를 체인으로 연결하여 ' +
          '계층형 카테고리 탐색을 구현합니다. 현재 위치는 비활성 칩으로 표시합니다.',
      },
    },
  },
  render: function Render() {
    const TREE = [
      { id: 'home', label: '홈', children: ['design', 'dev', 'pm'] },
      { id: 'design', label: '디자인', children: ['ui', 'ux', 'motion'] },
      { id: 'dev', label: '개발', children: ['frontend', 'backend', 'infra'] },
      { id: 'pm', label: '프로덕트', children: ['roadmap', 'analytics', 'feedback'] },
      { id: 'ui', label: 'UI 컴포넌트', children: [] },
      { id: 'ux', label: 'UX 리서치', children: [] },
      { id: 'motion', label: '모션 디자인', children: [] },
      { id: 'frontend', label: '프론트엔드', children: [] },
      { id: 'backend', label: '백엔드', children: [] },
      { id: 'infra', label: '인프라', children: [] },
      { id: 'roadmap', label: '로드맵', children: [] },
      { id: 'analytics', label: '분석', children: [] },
      { id: 'feedback', label: '피드백', children: [] },
    ]

    const [path, setPath] = React.useState(['home'])

    const getNode = (id: string) => TREE.find((n) => n.id === id)

    const navigate = (id: string, depth: number) => {
      setPath((prev) => [...prev.slice(0, depth + 1), id])
    }

    const current = path[path.length - 1]
    const currentNode = getNode(current)

    return (
      <div style={{ width: 440, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
          카테고리 탐색
        </div>

        {/* Breadcrumb chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
          {path.map((id, i) => {
            const node = getNode(id)
            const isLast = i === path.length - 1
            return (
              <React.Fragment key={id}>
                {isLast ? (
                  <span style={{ fontSize: 13, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: '#6366f1', color: '#fff' }}>
                    {node?.label}
                  </span>
                ) : (
                  <ChipLink href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate(id, i) }} selected={false}>
                    {node?.label}
                  </ChipLink>
                )}
                {!isLast && <span style={{ color: '#cbd5e1', fontSize: 12 }}>›</span>}
              </React.Fragment>
            )
          })}
        </div>

        {/* Children chips */}
        {currentNode && currentNode.children.length > 0 && (
          <div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>하위 카테고리 선택:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {currentNode.children.map((childId) => {
                const child = getNode(childId)
                return (
                  <ChipLink
                    key={childId}
                    href="#"
                    onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate(childId, path.length) }}
                    selected={false}
                  >
                    <ChipLink.Leading><SearchIcon size={12} /></ChipLink.Leading>
                    {child?.label}
                  </ChipLink>
                )
              })}
            </div>
          </div>
        )}

        {currentNode && currentNode.children.length === 0 && (
          <div style={{ padding: '14px', borderRadius: 10, background: '#f0f0ff', border: '1px solid #c7d2fe', fontSize: 13, color: '#4338ca', fontWeight: 600 }}>
            /{path.join(' / ')} — 현재 위치
          </div>
        )}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Tailwind UI: 필터 태그 스택 패턴
   Tailwind UI Filter chips — 검색 결과 필터를 ChipLink로 표현
-------------------------------------------------------------------------- */
export const Tailwind_검색_필터_태그_스택: Story = {
  name: 'Tailwind UI - 검색 필터 태그 스택 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind UI 필터 태그 패턴. 활성 필터를 ChipLink 목록으로 표시하고 ' +
          '각 태그의 X 버튼으로 개별 제거, "전체 초기화" 링크로 모두 제거합니다.',
      },
    },
  },
  render: function Render() {
    const ALL_FILTERS = [
      { id: 'react', group: '기술', label: 'React' },
      { id: 'ts', group: '기술', label: 'TypeScript' },
      { id: 'remote', group: '근무형태', label: '원격' },
      { id: 'full', group: '고용형태', label: '정규직' },
      { id: 'senior', group: '경력', label: '시니어' },
    ]
    const [active, setActive] = React.useState(new Set(ALL_FILTERS.map((f) => f.id)))
    const remove = (id: string) => setActive((prev) => { const n = new Set(prev); n.delete(id); return n })

    const grouped = ALL_FILTERS.filter((f) => active.has(f.id)).reduce<Record<string, typeof ALL_FILTERS>>((acc, f) => {
      acc[f.group] = [...(acc[f.group] ?? []), f]
      return acc
    }, {})

    return (
      <div style={{ width: 460, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>
            검색 결과 <span style={{ color: '#6366f1' }}>{active.size > 0 ? `(${active.size}개 필터 적용)` : ''}</span>
          </div>
          {active.size > 0 && (
            <button
              onClick={() => setActive(new Set())}
              style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              전체 초기화
            </button>
          )}
        </div>

        {active.size > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', minWidth: 60 }}>{group}</span>
                {items.map((f) => (
                  <ChipLink
                    key={f.id}
                    href="#"
                    selected
                    onClick={(e: React.MouseEvent) => { e.preventDefault(); remove(f.id) }}
                  >
                    {f.label}
                    <span style={{ marginLeft: 4, opacity: 0.7 }}>×</span>
                  </ChipLink>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '16px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>
            활성 필터 없음 — 모든 결과 표시 중
          </div>
        )}

        <div style={{ marginTop: 14, fontSize: 12, color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: 10 }}>
          필터를 클릭하면 해당 조건이 제거됩니다.
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   MUI + Tailwind: 기술 스택 매트릭스 링크 칩
   두 시스템의 태그/필터 패턴 결합 — 기술 매핑 탐색기
-------------------------------------------------------------------------- */
export const MUI_Tailwind_기술_스택_매트릭스: Story = {
  name: 'MUI + Tailwind UI - 기술 스택 매트릭스 탐색기',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Chip group + Tailwind UI filter 패턴 결합. 레이어(Frontend/Backend/Infra)별로 ' +
          '기술 스택을 ChipLink 그룹으로 탐색하고 선택된 기술의 상세 정보를 표시합니다.',
      },
    },
  },
  render: function Render() {
    const STACK = {
      Frontend: [
        { id: 'react', label: 'React', desc: 'UI 컴포넌트 라이브러리', level: 'expert' },
        { id: 'ts', label: 'TypeScript', desc: '정적 타입 언어', level: 'expert' },
        { id: 'vite', label: 'Vite', desc: '빌드 도구', level: 'advanced' },
        { id: 'tailwind', label: 'Tailwind', desc: 'CSS 유틸리티 프레임워크', level: 'advanced' },
        { id: 'storybook', label: 'Storybook', desc: '컴포넌트 문서화', level: 'intermediate' },
      ],
      Backend: [
        { id: 'node', label: 'Node.js', desc: 'JS 런타임', level: 'advanced' },
        { id: 'postgres', label: 'PostgreSQL', desc: '관계형 데이터베이스', level: 'advanced' },
        { id: 'redis', label: 'Redis', desc: '인메모리 캐시', level: 'intermediate' },
        { id: 'graphql', label: 'GraphQL', desc: 'API 쿼리 언어', level: 'intermediate' },
      ],
      Infra: [
        { id: 'vercel', label: 'Vercel', desc: '프론트엔드 배포', level: 'expert' },
        { id: 'github', label: 'GitHub Actions', desc: 'CI/CD 파이프라인', level: 'advanced' },
        { id: 'docker', label: 'Docker', desc: '컨테이너화', level: 'intermediate' },
      ],
    }

    const LEVEL_COLOR: Record<string, string> = { expert: '#10b981', advanced: '#6366f1', intermediate: '#f59e0b' }

    const [selected, setSelected] = React.useState<string | null>('react')

    const selectedItem = Object.values(STACK).flat().find((i) => i.id === selected)

    return (
      <div style={{ width: 500, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>기술 스택 매트릭스</div>

        {Object.entries(STACK).map(([layer, items]) => (
          <div key={layer} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              {layer}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {items.map((item) => (
                <ChipLink
                  key={item.id}
                  href="#"
                  selected={selected === item.id}
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); setSelected(item.id) }}
                >
                  <ChipLink.Leading>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: LEVEL_COLOR[item.level], display: 'inline-block' }} />
                  </ChipLink.Leading>
                  {item.label}
                </ChipLink>
              ))}
            </div>
          </div>
        ))}

        {selectedItem && (
          <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 12, border: '1.5px solid #6366f1', background: '#f0f0ff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{selectedItem.label}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: LEVEL_COLOR[selectedItem.level], color: '#fff', fontWeight: 700 }}>
                {selectedItem.level}
              </span>
            </div>
            <div style={{ fontSize: 13, color: '#64748b' }}>{selectedItem.desc}</div>
          </div>
        )}
      </div>
    )
  },
}
