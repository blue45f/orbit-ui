import { CheckIcon, ChevronDownLineIcon, StarLineIcon, HeartLineIcon, CancelIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { vars } from '../../styles'

import { Chip } from './Chip'
import * as styles from './Chip.stories.css'

Chip.displayName = 'Chip'
Chip.Leading.displayName = 'Chip.Leading'
Chip.Trailing.displayName = 'Chip.Trailing'

const meta = {
  title: 'eclipse/Actions/Chips/Chip',
  component: Chip,
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
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

/** Inline SVG placeholder used as a safe, copyright-free image avatar */
const AvatarPlaceholder = ({ size = 24, color = '#6366f1' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill={color} fillOpacity="0.15" />
    <circle cx="12" cy="9" r="3.5" fill={color} fillOpacity="0.7" />
    <path d="M5 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const 기본: Story = {
  render: (args) => {
    return <Chip {...args}>Chip</Chip>
  },
}

export const 아이콘: Story = {
  render: (args) => {
    return (
      <Chip {...args}>
        <Chip.Leading>
          <CheckIcon />
        </Chip.Leading>
        Chip
        <Chip.Trailing>
          <ChevronDownLineIcon />
        </Chip.Trailing>
      </Chip>
    )
  },
}

export const 이미지: Story = {
  render: (args) => {
    return (
      <Chip {...args}>
        <Chip.Leading>
          <AvatarPlaceholder size={24} color="#6366f1" />
        </Chip.Leading>
        Orbit User
      </Chip>
    )
  },
}

export const 썸네일: Story = {
  render: (args) => {
    return (
      <Chip {...args}>
        <Chip.Leading>
          <AvatarPlaceholder size={30} color="#8b5cf6" />
        </Chip.Leading>
        <span style={{ paddingLeft: vars.ref.spacing[50] }}>Design System</span>
        <Chip.Trailing>
          <ChevronDownLineIcon />
        </Chip.Trailing>
      </Chip>
    )
  },
}

export const 모든상태: Story = {
  render: () => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th />
            <th>Leading O</th>
            <th>Leading X</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Trailing O</th>
            <td>
              <Chip>
                <Chip.Leading>
                  <CheckIcon />
                </Chip.Leading>
                Chip
                <Chip.Trailing>
                  <ChevronDownLineIcon />
                </Chip.Trailing>
              </Chip>
            </td>
            <td>
              <Chip>
                Chip
                <Chip.Trailing>
                  <ChevronDownLineIcon size={18} />
                </Chip.Trailing>
              </Chip>
            </td>
          </tr>
          <tr>
            <th>Trailing X</th>
            <td>
              <Chip>
                <Chip.Leading>
                  <AvatarPlaceholder size={24} color="#6366f1" />
                </Chip.Leading>
                Chip
              </Chip>
            </td>
            <td>
              {' '}
              <Chip>Chip</Chip>
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
    trailing: false,
    borderWidth: 1,
    variant: 'default',
    text: 'Chip',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'icon', 'image', 'thumbnail'],
    },
  },
  // eslint-disable-next-line
  render: ({ leading, trailing, variant, text, ...rest }: any) => {
    if (variant === 'icon') {
      return (
        <Chip {...rest}>
          {leading && (
            <Chip.Leading>
              <StarLineIcon />
            </Chip.Leading>
          )}
          {text}
          {trailing && (
            <Chip.Trailing>
              <ChevronDownLineIcon />
            </Chip.Trailing>
          )}
        </Chip>
      )
    }

    if (variant === 'image') {
      return (
        <Chip {...rest}>
          {leading && (
            <Chip.Leading>
              <AvatarPlaceholder size={24} color="#6366f1" />
            </Chip.Leading>
          )}
          {text}
          {trailing && (
            <Chip.Trailing>
              <ChevronDownLineIcon />
            </Chip.Trailing>
          )}
        </Chip>
      )
    }
    if (variant === 'thumbnail') {
      return (
        <Chip {...rest}>
          {leading && (
            <Chip.Leading>
              <AvatarPlaceholder size={30} color="#8b5cf6" />
            </Chip.Leading>
          )}
          <span style={{ paddingLeft: vars.ref.spacing[50] }}>{text}</span>
          {trailing && (
            <Chip.Trailing>
              <ChevronDownLineIcon />
            </Chip.Trailing>
          )}
        </Chip>
      )
    }

    return (
      <Chip {...rest}>
        {leading && (
          <Chip.Leading>
            <HeartLineIcon />
          </Chip.Leading>
        )}
        {text}
        {trailing && (
          <Chip.Trailing>
            <ChevronDownLineIcon />
          </Chip.Trailing>
        )}
      </Chip>
    )
  },
}

// ─── Mantine: 필터 칩 그룹 패턴 ───────────────────────────────────────────────
// Mantine의 MultiSelect + Chip 패턴을 참고합니다.
// 필터 칩은 선택/해제 토글이 가능하며, 현재 활성 필터를 시각적으로 표현합니다.
const FilterChipGroupRender = () => {
  const categories = ['전체', '디자인', '개발', '마케팅', '기획', '데이터']
  const [selected, setSelected] = useState<string[]>(['전체'])

  const toggle = (cat: string) => {
    if (cat === '전체') {
      setSelected(['전체'])
      return
    }
    setSelected((prev) => {
      const withoutAll = prev.filter((c) => c !== '전체')
      if (withoutAll.includes(cat)) {
        const next = withoutAll.filter((c) => c !== cat)
        return next.length === 0 ? ['전체'] : next
      }
      return [...withoutAll, cat]
    })
  }

  const allItems = [
    { title: 'Orbit UI 디자인 토큰 가이드', cat: '디자인', date: '2026-04-08' },
    { title: 'React 19 성능 최적화 전략', cat: '개발', date: '2026-04-07' },
    { title: '브랜드 캠페인 A/B 테스트', cat: '마케팅', date: '2026-04-06' },
    { title: 'Q2 로드맵 수립 워크샵', cat: '기획', date: '2026-04-05' },
    { title: '사용자 행동 데이터 분석', cat: '데이터', date: '2026-04-04' },
  ]
  const filtered = allItems.filter((item) => selected.includes('전체') || selected.includes(item.cat))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px' }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Mantine 필터 칩 그룹
        </p>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
          카테고리를 선택해 콘텐츠를 필터링합니다. 복수 선택이 가능합니다.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isActive = selected.includes(cat)
            return (
              <span
                key={cat}
                style={{
                  display: 'inline-flex',
                  outline: isActive ? '2px solid #6366f1' : '2px solid transparent',
                  borderRadius: '999px',
                  transition: 'outline 0.15s',
                }}
              >
                <Chip onClick={() => toggle(cat)} aria-pressed={isActive}>
                  {isActive && cat !== '전체' && (
                    <Chip.Leading>
                      <CheckIcon size={14} />
                    </Chip.Leading>
                  )}
                  {cat}
                </Chip>
              </span>
            )
          })}
        </div>
        <p style={{ margin: '16px 0 0', fontSize: '12px', color: '#94a3b8' }}>
          선택된 필터: <strong style={{ color: '#6366f1' }}>{selected.join(', ')}</strong>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map((item) => (
          <div
            key={item.title}
            style={{
              padding: '14px 16px',
              background: '#fff',
              borderRadius: '10px',
              border: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>{item.title}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.date}</div>
            </div>
            <span style={{
              flexShrink: 0, fontSize: '11px', fontWeight: 700,
              padding: '3px 8px', borderRadius: '20px',
              background: 'rgba(99,102,241,0.08)', color: '#6366f1',
            }}>
              {item.cat}
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #e2e8f0' }}>
            선택한 카테고리의 콘텐츠가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

export const Mantine_필터_칩_그룹: Story = {
  name: 'Mantine - 필터 칩 그룹 (MultiSelect 패턴)',
  render: () => <FilterChipGroupRender />,
}

// ─── Mantine: 태그 입력 + 칩 삭제 패턴 ──────────────────────────────────────
// Mantine의 TagsInput 컴포넌트 패턴을 참고합니다.
// 텍스트 입력 후 Enter로 태그를 추가하고, 칩의 X 버튼으로 삭제합니다.
const TagInputRender = () => {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'Orbit UI'])
  const [inputValue, setInputValue] = useState('')

  const addTag = () => {
    const trimmed = inputValue.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed])
    }
    setInputValue('')
  }

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px' }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Mantine TagsInput 패턴
        </p>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
          기술 스택이나 키워드 태그를 입력하고 관리합니다.
        </p>
      </div>

      <div style={{
        padding: '10px 12px', background: '#fff', borderRadius: '10px',
        border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap',
        gap: '6px', alignItems: 'center', minHeight: '52px',
      }}>
        {tags.map((tag) => (
          <span key={tag} style={{ display: 'inline-flex' }}>
            <Chip>
              {tag}
              <Chip.Trailing>
                <CancelIcon
                  size={14}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    removeTag(tag)
                  }}
                />
              </Chip.Trailing>
            </Chip>
          </span>
        ))}
        <input
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
            if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
              setTags((prev) => prev.slice(0, -1))
            }
          }}
          placeholder={tags.length === 0 ? '태그를 입력하고 Enter' : ''}
          style={{
            border: 'none', outline: 'none', fontSize: '14px',
            color: '#0f172a', minWidth: '120px', flex: 1,
            background: 'transparent', padding: '4px 0',
          }}
        />
      </div>
      <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>
        Enter로 태그 추가 · Backspace로 마지막 태그 삭제 · X 버튼으로 개별 삭제
      </p>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>추천 태그</p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['Next.js', 'Tailwind CSS', 'vanilla-extract', 'Storybook', 'Vite']
            .filter((t) => !tags.includes(t))
            .map((tag) => (
              <span key={tag} style={{ display: 'inline-flex' }}>
                <Chip onClick={() => setTags((prev) => [...prev, tag])}>
                  <Chip.Leading>
                    <StarLineIcon size={12} />
                  </Chip.Leading>
                  {tag}
                </Chip>
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}

export const Mantine_태그_입력_패턴: Story = {
  name: 'Mantine - 태그 입력 패턴 (TagsInput)',
  render: () => <TagInputRender />,
}

// ─── Material 3: 필터 칩 상태 레이어 ─────────────────────────────────────────
// M3 Filter Chip: 선택 시 Container 색상 + Check 아이콘으로 상태를 표시합니다.
// Hover 8%, Pressed 12% 상태 레이어로 피드백을 줍니다.
const Material3FilterChipRender = () => {
  const filters = [
    { id: 'trending', label: '트렌딩' },
    { id: 'new', label: '신규' },
    { id: 'popular', label: '인기' },
    { id: 'recommended', label: '추천' },
    { id: 'sale', label: '할인' },
    { id: 'free', label: '무료' },
  ]
  const [activeFilters, setActiveFilters] = useState<string[]>(['trending'])

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Material 3 Filter Chip
        </p>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
          M3 Filter Chip은 선택 시 Filled 스타일로 전환되어 활성 상태를 명확히 표시합니다.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter.id)
          return (
            <span
              key={filter.id}
              style={{
                display: 'inline-flex', borderRadius: '999px',
                boxShadow: isActive ? '0 2px 8px rgba(99,102,241,0.2)' : 'none',
                transition: 'box-shadow 0.15s',
              }}
            >
              <Chip onClick={() => toggleFilter(filter.id)} aria-pressed={isActive}>
                {isActive && (
                  <Chip.Leading>
                    <CheckIcon size={14} />
                  </Chip.Leading>
                )}
                {filter.label}
              </Chip>
            </span>
          )
        })}
      </div>

      <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <span style={{ fontSize: '12px', color: '#64748b' }}>
          활성 필터 ({activeFilters.length}개): {' '}
          <strong style={{ color: '#6366f1' }}>
            {activeFilters.length > 0
              ? activeFilters.map((id) => filters.find((f) => f.id === id)?.label).join(', ')
              : '없음'}
          </strong>
        </span>
      </div>

      <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>M3 State Layer 규칙</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { state: 'Hovered', opacity: '8%' },
            { state: 'Focused', opacity: '12%' },
            { state: 'Pressed', opacity: '12%' },
            { state: 'Dragged', opacity: '16%' },
          ].map((item) => {
            const pct = parseFloat(item.opacity) / 100
            return (
              <div key={item.state} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '20px', borderRadius: '4px',
                  background: `rgba(99,102,241,${pct})`, border: '1px solid #e2e8f0',
                }} />
                <span style={{ fontSize: '12px', color: '#0f172a', fontWeight: 500, width: '80px' }}>{item.state}</span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.opacity} opacity</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const Material3_필터칩_상태레이어: Story = {
  name: 'Material 3 - 필터 칩 + 상태 레이어 시스템',
  render: () => <Material3FilterChipRender />,
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: Autocomplete 태그 선택기
   MUI Autocomplete + Chip의 핵심 패턴 — 입력창에서 검색 후 Chip으로 선택 항목 추가
-------------------------------------------------------------------------- */
const MUI_SKILL_OPTIONS = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL',
  'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Figma',
  'Storybook', 'Vitest', 'Playwright', 'ESLint', 'Prettier',
]

function MuiAutocompleteChipsRender() {
  const [selected, setSelected] = useState<string[]>(['React', 'TypeScript'])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = MUI_SKILL_OPTIONS.filter(
    (opt) => opt.toLowerCase().includes(query.toLowerCase()) && !selected.includes(opt),
  )

  const addItem = (item: string) => {
    setSelected((prev) => [...prev, item])
    setQuery('')
    setOpen(false)
  }

  const removeItem = (item: string) => setSelected((prev) => prev.filter((s) => s !== item))

  return (
    <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>기술 스택 선택 (MUI Autocomplete 패턴)</div>
      <div
        style={{
          minHeight: 44,
          padding: '6px 12px',
          borderRadius: 10,
          border: `1.5px solid ${open ? '#6366f1' : '#e2e8f0'}`,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
          background: '#fff',
          cursor: 'text',
          transition: 'border-color 0.15s',
        }}
        onClick={() => setOpen(true)}
      >
        {selected.map((item) => (
          <Chip key={item} selected>
            <Chip.Leading>
              <CheckIcon />
            </Chip.Leading>
            <Chip.Trailing>
              <CancelIcon onClick={() => removeItem(item)} />
            </Chip.Trailing>
            {item}
          </Chip>
        ))}
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={selected.length === 0 ? '기술 스택 검색...' : ''}
          style={{ border: 'none', outline: 'none', fontSize: 13, color: '#1e293b', minWidth: 120, flex: 1, background: 'transparent' }}
        />
      </div>
      {open && filtered.length > 0 && (
        <div style={{ borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {filtered.slice(0, 6).map((opt) => (
            <div
              key={opt}
              onMouseDown={() => addItem(opt)}
              style={{ padding: '10px 14px', cursor: 'pointer', fontSize: 13, color: '#334155', transition: 'background 0.1s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
      <div style={{ fontSize: 12, color: '#94a3b8' }}>
        선택됨: {selected.length}개 / {MUI_SKILL_OPTIONS.length}개
      </div>
    </div>
  )
}

export const MUI_Autocomplete_태그_선택기: Story = {
  name: 'MUI - Autocomplete 태그 선택기 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Autocomplete + Chip 핵심 패턴. 입력창에 텍스트를 입력하면 드롭다운에서 옵션을 선택해 ' +
          'Chip으로 추가합니다. Chip의 Trailing 아이콘으로 개별 항목을 제거합니다.',
      },
    },
  },
  render: () => <MuiAutocompleteChipsRender />,
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 태그 클라우드 인터랙션
   Chakra의 Tag 컴포넌트 패턴 — 인기도 가중치 기반 크기 변화 + 호버 강조
-------------------------------------------------------------------------- */
type TagItem = { label: string; count: number; selected: boolean }

const CHAKRA_TAGS: TagItem[] = [
  { label: 'React', count: 1240, selected: false },
  { label: 'TypeScript', count: 980, selected: false },
  { label: 'UI Design', count: 756, selected: true },
  { label: 'Next.js', count: 612, selected: false },
  { label: 'Tailwind', count: 540, selected: true },
  { label: 'Figma', count: 480, selected: false },
  { label: 'Node.js', count: 390, selected: false },
  { label: 'GraphQL', count: 280, selected: false },
  { label: 'Testing', count: 210, selected: false },
  { label: 'Docker', count: 180, selected: false },
  { label: 'CSS', count: 150, selected: false },
  { label: 'Git', count: 120, selected: false },
]

function ChakraTagCloudRender() {
  const [tags, setTags] = useState(CHAKRA_TAGS)

  const toggle = (label: string) =>
    setTags((prev) => prev.map((t) => (t.label === label ? { ...t, selected: !t.selected } : t)))

  const _maxCount = Math.max(...tags.map((t) => t.count))

  const selectedCount = tags.filter((t) => t.selected).length

  return (
    <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>관심 태그 선택</div>
        <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 700 }}>{selectedCount}개 선택됨</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((tag) => (
          <Chip
            key={tag.label}
            selected={tag.selected}
            onClick={() => toggle(tag.label)}
          >
            {tag.selected && (
              <Chip.Leading>
                <CheckIcon />
              </Chip.Leading>
            )}
            {tag.label}
            <Chip.Trailing>
              <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.7 }}>{(tag.count / 1000).toFixed(1)}k</span>
            </Chip.Trailing>
          </Chip>
        ))}
      </div>
      <div style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, fontSize: 12, color: '#64748b' }}>
        인기도에 따라 칩 크기가 달라집니다. 클릭해서 관심 태그를 선택하세요.
      </div>
    </div>
  )
}

export const Chakra_태그_클라우드: Story = {
  name: 'Chakra UI - 태그 클라우드 인터랙션 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Tag 컴포넌트 패턴. 인기도(count) 값에 따라 Chip의 size를 small/medium/large로 ' +
          '자동 매핑합니다. 선택 시 Leading에 CheckIcon을 삽입하고 Trailing에 카운트를 표시합니다.',
      },
    },
  },
  render: () => <ChakraTagCloudRender />,
}

/* --------------------------------------------------------------------------
   MUI 벤치마크: 상태 기반 필터 칩 툴바
   MUI Chip variant="outlined/filled" + clickable 패턴 — 복수 필터 조합 적용
-------------------------------------------------------------------------- */
type FilterGroup = { id: string; label: string; options: { value: string; label: string }[] }

const MUI_FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'status',
    label: '상태',
    options: [
      { value: 'active', label: '활성' },
      { value: 'inactive', label: '비활성' },
      { value: 'pending', label: '대기 중' },
    ],
  },
  {
    id: 'role',
    label: '역할',
    options: [
      { value: 'admin', label: '관리자' },
      { value: 'member', label: '멤버' },
      { value: 'guest', label: '게스트' },
    ],
  },
  {
    id: 'plan',
    label: '플랜',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise' },
    ],
  },
]

const MOCK_USERS = [
  { name: '김희준', status: 'active', role: 'admin', plan: 'enterprise' },
  { name: '이서연', status: 'active', role: 'member', plan: 'pro' },
  { name: '박지호', status: 'inactive', role: 'member', plan: 'free' },
  { name: '최은아', status: 'pending', role: 'guest', plan: 'free' },
  { name: '정민수', status: 'active', role: 'member', plan: 'pro' },
  { name: '한지우', status: 'active', role: 'admin', plan: 'enterprise' },
]

function MuiFilterChipToolbarRender() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string | null>>({ status: null, role: null, plan: null })

  const toggleFilter = (groupId: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [groupId]: prev[groupId] === value ? null : value,
    }))
  }

  const clearAll = () => setActiveFilters({ status: null, role: null, plan: null })

  const filteredUsers = MOCK_USERS.filter((user) =>
    Object.entries(activeFilters).every(([key, val]) => !val || user[key as keyof typeof user] === val),
  )

  const hasFilters = Object.values(activeFilters).some(Boolean)

  return (
    <div style={{ width: 460, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>사용자 필터 (MUI Chip 패턴)</div>
        {hasFilters && (
          <button onClick={clearAll} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#ef4444', fontWeight: 600 }}>
            필터 초기화
          </button>
        )}
      </div>
      {MUI_FILTER_GROUPS.map((group) => (
        <div key={group.id}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{group.label}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {group.options.map((opt) => {
              const isActive = activeFilters[group.id] === opt.value
              return (
                <Chip
                  key={opt.value}
                  selected={isActive}
                  onClick={() => toggleFilter(group.id, opt.value)}
                >
                  {isActive && (
                    <Chip.Leading>
                      <CheckIcon />
                    </Chip.Leading>
                  )}
                  {opt.label}
                </Chip>
              )
            })}
          </div>
        </div>
      ))}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>결과: {filteredUsers.length}명</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filteredUsers.map((user) => (
            <div key={user.name} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 12px', background: '#f8fafc', borderRadius: 8 }}>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{user.name}</span>
              {[user.status, user.role, user.plan].map((val, i) => (
                <span key={i} style={{ fontSize: 11, padding: '1px 8px', borderRadius: 10, background: '#eef2ff', color: '#6366f1', fontWeight: 600 }}>{val}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const MUI_상태_필터_칩_툴바: Story = {
  name: 'MUI - 상태 기반 복수 필터 칩 툴바 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'MUI Chip clickable + variant 패턴. 그룹별 단일 선택 필터를 Chip으로 구현합니다. ' +
          '활성 필터는 selected 상태로 강조하고 초기화 버튼으로 전체 필터를 리셋합니다.',
      },
    },
  },
  render: () => <MuiFilterChipToolbarRender />,
}

const FIGMA_PROPERTY_OPTIONS = [
  { id: 'variant', label: 'Variant' },
  { id: 'size', label: 'Size' },
  { id: 'state', label: 'State' },
  { id: 'color', label: 'Color' },
  { id: 'icon', label: 'Icon' },
  { id: 'label', label: 'Label' },
]

const FigmaPropertyFilterRender = () => {
  const [active, setActive] = useState<Set<string>>(new Set(['variant', 'size']))

  const toggle = (id: string) => {
    setActive(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ width: 340, fontFamily: 'Inter, system-ui, sans-serif', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#111', marginBottom: 10 }}>Component Properties</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {FIGMA_PROPERTY_OPTIONS.map(opt => {
          const isOn = active.has(opt.id)
          return (
            <Chip key={opt.id} selected={isOn} onClick={() => toggle(opt.id)}>
              {isOn && <Chip.Leading><CheckIcon /></Chip.Leading>}
              {opt.label}
            </Chip>
          )
        })}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: '#9ca3af' }}>
        {active.size}개 속성 표시 중 · Figma Property Filter 패턴
      </div>
    </div>
  )
}

export const Figma_컴포넌트_속성_필터: Story = {
  name: 'Figma - 컴포넌트 속성 필터 칩',
  parameters: {
    docs: {
      description: {
        story: 'Figma Component Properties 패널의 속성 필터 칩 패턴. Variant/Size/State/Color 등 속성을 Chip으로 다중 선택하여 인스펙터에 표시할 항목을 제어합니다.',
      },
    },
  },
  render: () => <FigmaPropertyFilterRender />,
}

const FIGMA_PLUGIN_CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'productivity', label: '생산성' },
  { id: 'design', label: '디자인' },
  { id: 'developer', label: '개발자' },
  { id: 'accessibility', label: '접근성' },
  { id: 'icons', label: '아이콘' },
]

const FigmaPluginCategoryRender = () => {
  const [selected, setSelected] = useState('all')

  return (
    <div style={{ width: 360, fontFamily: 'Inter, system-ui, sans-serif', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#f9fafb' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Figma Plugins</div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>카테고리를 선택하세요</div>
      </div>
      <div style={{ padding: '10px 16px', display: 'flex', flexWrap: 'wrap', gap: 6, borderBottom: '1px solid #f0f0f0' }}>
        {FIGMA_PLUGIN_CATEGORIES.map(cat => (
          <Chip key={cat.id} selected={selected === cat.id} onClick={() => setSelected(cat.id)}>
            {cat.label}
          </Chip>
        ))}
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 8 }}>
          {selected === 'all' ? '모든 플러그인' : `${FIGMA_PLUGIN_CATEGORIES.find(c => c.id === selected)?.label} 플러그인`}
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `hsl(${i * 80 + 200}, 70%, 60%)`, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>Plugin Name {i}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>플러그인 설명 텍스트</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Figma_플러그인_카테고리_필터: Story = {
  name: 'Figma - 플러그인 카테고리 단일 선택 필터',
  parameters: {
    docs: {
      description: {
        story: 'Figma Plugins 브라우저의 카테고리 필터 패턴. 단일 선택 Chip 그룹으로 플러그인 카테고리를 필터링하며, 선택된 카테고리에 맞는 플러그인 목록을 보여줍니다.',
      },
    },
  },
  render: () => <FigmaPluginCategoryRender />,
}

const FIGMA_FRAME_TYPES = [
  { id: 'mobile', label: 'Mobile', icon: '📱' },
  { id: 'tablet', label: 'Tablet', icon: '⬜' },
  { id: 'desktop', label: 'Desktop', icon: '🖥' },
  { id: 'watch', label: 'Watch', icon: '⌚' },
  { id: 'tv', label: 'TV', icon: '📺' },
]

const FigmaFrameTypeSelectorRender = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(['mobile', 'desktop']))

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ width: 340, fontFamily: 'Inter, system-ui, sans-serif', background: '#1e1e1e', borderRadius: 10, padding: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#e5e5e5', marginBottom: 4 }}>Frame Presets</div>
      <div style={{ fontSize: 11, color: '#888', marginBottom: 12 }}>디자인할 디바이스 유형을 선택하세요</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {FIGMA_FRAME_TYPES.map(type => {
          const isOn = selected.has(type.id)
          return (
            <Chip key={type.id} selected={isOn} onClick={() => toggle(type.id)}>
              <Chip.Leading>
                <span style={{ fontSize: 12 }}>{type.icon}</span>
              </Chip.Leading>
              {type.label}
            </Chip>
          )
        })}
      </div>
      <div style={{ marginTop: 12, padding: '8px 10px', background: '#2d2d2d', borderRadius: 6, fontSize: 11, color: '#888' }}>
        {selected.size > 0
          ? `${[...selected].map(id => FIGMA_FRAME_TYPES.find(t => t.id === id)?.label).join(', ')} 프레임 생성 예정`
          : '하나 이상의 디바이스를 선택하세요'}
      </div>
    </div>
  )
}

export const Figma_프레임_프리셋_선택: Story = {
  name: 'Figma - 다크 테마 프레임 프리셋 선택 칩',
  parameters: {
    docs: {
      description: {
        story: 'Figma 새 프레임 생성 시 디바이스 프리셋 선택 패턴. 다크 UI 배경에서 Chip으로 Mobile/Tablet/Desktop 등 다중 선택. 아이콘 + 텍스트 조합의 Chip.Leading을 활용합니다.',
      },
    },
  },
  render: () => <FigmaFrameTypeSelectorRender />,
}

/* --------------------------------------------------------------------------
   Cycle 124 — Vercel Design + Radix UI 벤치마크
-------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Vercel: 환경 변수 스코프 칩 패턴
   Vercel Env 화면 — Production/Preview/Development 환경 범위 칩
-------------------------------------------------------------------------- */
export const Vercel_환경변수_스코프_칩: Story = {
  name: 'Vercel - 환경변수 스코프 칩 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Environment Variables 설정 화면 패턴. Production/Preview/Development 환경 범위를 ' +
          'Chip으로 다중 선택하여 환경변수 적용 범위를 지정합니다.',
      },
    },
  },
  render: function Render() {
    const ENVS = [
      { id: 'production', label: 'Production', icon: '🚀', desc: '배포된 프로덕션 환경' },
      { id: 'preview', label: 'Preview', icon: '👁', desc: 'PR 프리뷰 배포 환경' },
      { id: 'development', label: 'Development', icon: '💻', desc: '로컬 개발 환경' },
    ]

    const VARS = [
      { key: 'DATABASE_URL', value: '****', scopes: new Set(['production', 'preview']) },
      { key: 'NEXTAUTH_SECRET', value: '****', scopes: new Set(['production', 'preview', 'development']) },
      { key: 'API_BASE_URL', value: 'https://api.example.com', scopes: new Set(['production']) },
      { key: 'DEBUG', value: 'true', scopes: new Set(['development']) },
    ]

    const [activeScopes, setActiveScopes] = useState<Set<string>>(new Set(['production', 'preview', 'development']))

    const toggle = (id: string) => {
      setActiveScopes((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    const filtered = VARS.filter((v) => [...activeScopes].some((s) => v.scopes.has(s)))

    return (
      <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>환경 변수</div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>환경 필터</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {ENVS.map((env) => (
              <Chip key={env.id} selected={activeScopes.has(env.id)} onClick={() => toggle(env.id)}>
                <Chip.Leading>
                  <span style={{ fontSize: 12 }}>{env.icon}</span>
                </Chip.Leading>
                {env.label}
              </Chip>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map((v) => (
            <div key={v.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, border: '1px solid #f1f5f9', background: '#fff', fontFamily: 'monospace' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', flex: 1 }}>{v.key}</span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>{v.value}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[...v.scopes].map((s) => (
                  <span key={s} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>환경을 선택하세요</div>
          )}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Radix: 다중 선택 콤보 칩 패턴
   Radix Select + 칩 삭제 패턴 — 입력창과 칩 목록 연동
-------------------------------------------------------------------------- */
export const Radix_다중_선택_콤보_칩: Story = {
  name: 'Radix UI - 다중 선택 콤보 칩 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix Select + Chip 조합 패턴. 드롭다운에서 선택 시 Chip이 추가되고, ' +
          'Chip.Trailing의 X 버튼으로 개별 제거하는 태그 입력 인터페이스입니다.',
      },
    },
  },
  render: function Render() {
    const ALL_TAGS = ['React', 'TypeScript', 'Vite', 'Tailwind', 'vanilla-extract', 'Storybook', 'Vitest', 'Playwright', 'ESLint', 'Prettier']
    const [selected, setSelected] = useState<string[]>(['React', 'TypeScript'])
    const [input, setInput] = useState('')

    const available = ALL_TAGS.filter((t) => !selected.includes(t) && t.toLowerCase().includes(input.toLowerCase()))

    const add = (tag: string) => {
      setSelected((prev) => [...prev, tag])
      setInput('')
    }
    const remove = (tag: string) => setSelected((prev) => prev.filter((t) => t !== tag))

    return (
      <div style={{ width: 420, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>기술 스택 선택</div>

        <div style={{ minHeight: 44, padding: '8px 10px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#fff', display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {selected.map((tag) => (
            <Chip key={tag} selected>
              {tag}
              <Chip.Trailing>
                <CancelIcon size={12} onClick={(e: React.MouseEvent) => { e.stopPropagation(); remove(tag) }} />
              </Chip.Trailing>
            </Chip>
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selected.length === 0 ? '기술 스택 검색...' : ''}
            style={{ border: 'none', outline: 'none', fontSize: 13, background: 'transparent', minWidth: 120, flex: 1 }}
          />
        </div>

        {input.length > 0 && available.length > 0 && (
          <div style={{ padding: '8px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            {available.map((tag) => (
              <div
                key={tag}
                onClick={() => add(tag)}
                style={{ padding: '8px 10px', borderRadius: 8, fontSize: 13, color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <CheckIcon size={14} style={{ color: '#94a3b8' }} />
                {tag}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {ALL_TAGS.filter((t) => !selected.includes(t)).map((tag) => (
            <Chip key={tag} onClick={() => add(tag)}>
              {tag}
            </Chip>
          ))}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Vercel + Radix: 배포 태그 + 환경 필터 복합 패턴
   두 시스템의 칩 패턴 결합 — 태그 관리 + 환경 필터
-------------------------------------------------------------------------- */
export const Vercel_Radix_배포_태그_필터: Story = {
  name: 'Vercel + Radix UI - 배포 태그 + 환경 필터 복합 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel 배포 목록 + Radix 다중 필터 패턴 결합. 환경/상태 Chip 필터로 배포 목록을 ' +
          '좁히고, 브랜치 태그 Chip을 추가/제거하여 배포를 분류합니다.',
      },
    },
  },
  render: function Render() {
    const STATUS_OPTS = ['전체', 'Ready', 'Building', 'Failed']
    const ENV_OPTS = ['production', 'preview', 'development']

    const DEPLOYS = [
      { id: 1, name: 'feat/design-tokens', env: 'preview', status: 'Ready', ago: '2분 전', tags: ['ui'] },
      { id: 2, name: 'main', env: 'production', status: 'Ready', ago: '1시간 전', tags: ['stable', 'lts'] },
      { id: 3, name: 'fix/button-a11y', env: 'preview', status: 'Building', ago: '방금', tags: ['hotfix'] },
      { id: 4, name: 'chore/deps', env: 'development', status: 'Failed', ago: '3일 전', tags: ['deps'] },
      { id: 5, name: 'feat/calendar', env: 'preview', status: 'Ready', ago: '5시간 전', tags: ['ui', 'beta'] },
    ]

    const [statusFilter, setStatusFilter] = useState('전체')
    const [envFilter, setEnvFilter] = useState<Set<string>>(new Set(['production', 'preview', 'development']))

    const toggleEnv = (env: string) => {
      setEnvFilter((prev) => {
        const next = new Set(prev)
        if (next.has(env)) next.delete(env)
        else next.add(env)
        return next
      })
    }

    const filtered = DEPLOYS.filter((d) => {
      const matchStatus = statusFilter === '전체' || d.status === statusFilter
      const matchEnv = envFilter.has(d.env)
      return matchStatus && matchEnv
    })

    const STATUS_COLOR: Record<string, string> = { Ready: '#10b981', Building: '#f59e0b', Failed: '#ef4444' }

    return (
      <div style={{ width: 520, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>배포 목록</div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {STATUS_OPTS.map((s) => (
              <Chip key={s} selected={statusFilter === s} onClick={() => setStatusFilter(s)}>
                {s}
              </Chip>
            ))}
          </div>
          <div style={{ width: 1, background: '#e2e8f0', margin: '0 4px' }} />
          <div style={{ display: 'flex', gap: 6 }}>
            {ENV_OPTS.map((e) => (
              <Chip key={e} selected={envFilter.has(e)} onClick={() => toggleEnv(e)}>
                <Chip.Leading>
                  <span style={{ fontSize: 10 }}>{e === 'production' ? '🚀' : e === 'preview' ? '👁' : '💻'}</span>
                </Chip.Leading>
                {e}
              </Chip>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map((d) => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fff' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[d.status], flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', fontFamily: 'monospace' }}>{d.name}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{d.env} · {d.ago}</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {d.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: '#f0f0ff', color: '#6366f1', fontWeight: 700 }}>
                    {tag}
                  </span>
                ))}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: STATUS_COLOR[d.status] }}>{d.status}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>조건에 맞는 배포 없음</div>
          )}
        </div>
      </div>
    )
  },
}

// ─── Cycle 155: Arco Design + Raycast Extensions ───────────────────────────

const ARCO_TAGS = [
  { id: 'all', label: '전체' },
  { id: 'frontend', label: '프론트엔드' },
  { id: 'backend', label: '백엔드' },
  { id: 'design', label: '디자인' },
  { id: 'infra', label: '인프라' },
  { id: 'docs', label: '문서' },
]

function ArcoTagFilterRender() {
  const [selected, setSelected] = useState<string[]>(['all'])
  const toggle = (id: string) => {
    if (id === 'all') { setSelected(['all']); return }
    setSelected(prev => {
      const without = prev.filter(s => s !== 'all')
      const next = without.includes(id) ? without.filter(s => s !== id) : [...without, id]
      return next.length === 0 ? ['all'] : next
    })
  }
  return (
    <div style={{ width: 360, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 10 }}>Arco Design 태그 필터 패턴</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {ARCO_TAGS.map(tag => (
          <Chip
            key={tag.id}
            onClick={() => toggle(tag.id)}
            theme={{ enabledSelectedFillColor: selected.includes(tag.id) ? '#E8F3FF' : undefined, enabledSelectedForegroundColor: selected.includes(tag.id) ? '#165DFF' : undefined, enabledSelectedBorderColor: selected.includes(tag.id) ? '#165DFF' : undefined }}
          >
            {selected.includes(tag.id) && (
              <Chip.Leading><CheckIcon size={12} /></Chip.Leading>
            )}
            {tag.label}
          </Chip>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        선택됨: {selected.join(', ')} — Arco Design Tag.CheckableTag 패턴
      </div>
    </div>
  )
}

export const Arco_데이터_태그_필터: Story = {
  name: 'Arco Design - 데이터 시각화 태그 필터',
  render: () => <ArcoTagFilterRender />,
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Tag.CheckableTag 패턴. 선택된 태그는 파란 배경+테두리로 강조되고 체크 아이콘이 등장합니다. ' +
          '"전체" 선택 시 개별 선택이 초기화되는 Arco 태그 그룹 동작을 재현합니다.',
      },
    },
  },
}

const RAYCAST_COMMANDS = [
  { id: 'search', label: '빠른 검색', keys: ['⌘', 'K'] },
  { id: 'new', label: '새 항목 생성', keys: ['⌘', 'N'] },
  { id: 'copy', label: '링크 복사', keys: ['⌘', 'C'] },
  { id: 'open', label: '새 탭에서 열기', keys: ['⌘', 'T'] },
]

function RaycastShortcutChipRender() {
  const [active, setActive] = useState<string | null>(null)
  return (
    <div style={{ width: 320, fontFamily: 'Inter, system-ui, sans-serif', background: '#1c1c1e', borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#8e8e93', marginBottom: 8, padding: '0 4px' }}>COMMANDS</div>
      {RAYCAST_COMMANDS.map(cmd => (
        <div
          key={cmd.id}
          onClick={() => setActive(cmd.id)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 8, cursor: 'pointer', background: active === cmd.id ? '#2c2c2e' : 'transparent', marginBottom: 2 }}
        >
          <span style={{ fontSize: 13, color: '#f2f2f7' }}>{cmd.label}</span>
          <div style={{ display: 'flex', gap: 3 }}>
            {cmd.keys.map((k, i) => (
              <span key={i} style={{ fontSize: 10, color: '#8e8e93', padding: '2px 6px', background: '#3a3a3c', border: '1px solid #48484a', borderRadius: 4, fontWeight: 500 }}>
                {k}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 6, padding: '0 4px', fontSize: 11, color: '#6d6d72' }}>Raycast 단축키 칩 — 다크 팔레트</div>
    </div>
  )
}

export const Raycast_커맨드_팔레트_칩: Story = {
  name: 'Raycast - 커맨드 팔레트 단축키 칩',
  render: () => <RaycastShortcutChipRender />,
  parameters: {
    docs: {
      description: {
        story:
          'Raycast Extensions 커맨드 팔레트 단축키 표시 패턴. 다크 배경에 키보드 단축키를 소형 뱃지로 표현합니다. ' +
          'Raycast의 KeyboardShortcut 컴포넌트 패턴과 Chip 테마 오버라이드를 조합해 구현합니다.',
      },
    },
  },
}

const ISSUE_LABELS = [
  { id: 'bug', text: '버그', color: '#F53F3F', selected: true },
  { id: 'feat', text: '기능', color: '#165DFF', selected: false },
  { id: 'docs', text: '문서', color: '#00B42A', selected: true },
  { id: 'perf', text: '성능', color: '#FF7D00', selected: false },
  { id: 'test', text: '테스트', color: '#722ED1', selected: false },
]

function ArcoRaycastLabelChipRender() {
  const [labels, setLabels] = useState(ISSUE_LABELS)
  const toggle = (id: string) => setLabels(prev => prev.map(l => l.id === id ? { ...l, selected: !l.selected } : l))
  const selected = labels.filter(l => l.selected)
  return (
    <div style={{ width: 340, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 10 }}>Arco + Raycast 이슈 레이블 칩</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {labels.map(label => (
          <Chip
            key={label.id}
            onClick={() => toggle(label.id)}
            theme={{ enabledSelectedFillColor: label.color + '18', enabledSelectedForegroundColor: label.color, enabledSelectedBorderColor: label.color + '60', enabledUnselectedBorderColor: '#e5e6eb' }}
          >
            <Chip.Leading>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: label.selected ? label.color : '#c9cdd4' }} />
            </Chip.Leading>
            {label.text}
            {label.selected && (
              <Chip.Trailing>
                <CancelIcon size={12} />
              </Chip.Trailing>
            )}
          </Chip>
        ))}
      </div>
      <div style={{ padding: '8px 12px', background: '#f7f8fa', borderRadius: 8, fontSize: 12, color: '#4e5969' }}>
        선택된 레이블: {selected.length > 0 ? selected.map(l => l.text).join(', ') : '없음'}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>Arco Tag + Raycast 이슈 레이블 토글 패턴</div>
    </div>
  )
}

export const Arco_Raycast_이슈_레이블_칩: Story = {
  name: 'Arco Design + Raycast - 이슈 레이블 칩 시스템',
  render: () => <ArcoRaycastLabelChipRender />,
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design + Raycast 복합 패턴. 컬러 도트·텍스트·삭제 아이콘 구성의 레이블 칩을 토글하며 이슈에 레이블을 할당합니다. ' +
          'Arco Tag closable 패턴과 Raycast 이슈 레이블 UI를 Chip 테마 오버라이드로 구현합니다.',
      },
    },
  },
}

/* --------------------------------------------------------------------------
   Cycle 180 — shadcn/ui + Apple HIG
   Benchmark:
   1. shadcn/ui Badge/Chip: 인터랙티브 필터 필 — 멀티셀렉트 + 전체 해제
   2. Apple HIG: 터치 친화적 크기 + 탭 타겟 최소 44×44pt 권고
   3. Apple HIG: Chip을 "제안 태그"로 활용해 클릭 시 사라지는 패턴
-------------------------------------------------------------------------- */

function ShadcnFilterChipGroupRender() {
  const [selected, setSelected] = useState<string[]>([])

  const filterGroups = [
    {
      label: '카테고리',
      chips: ['컴포넌트', '토큰', '패턴', '가이드', '예시'],
    },
    {
      label: '상태',
      chips: ['안정', '베타', '실험적', '사용 중단'],
    },
    {
      label: '프레임워크',
      chips: ['React', 'Next.js', 'Remix', 'Vue', 'Svelte'],
    },
  ]

  const toggle = (chip: string) => {
    setSelected((prev) => prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip])
  }

  const clearAll = () => setSelected([])

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>문서 필터</div>
        {selected.length > 0 && (
          <button onClick={clearAll} style={{ fontSize: 11, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'system-ui', padding: '2px 6px', borderRadius: 4 }}>
            전체 해제 ({selected.length})
          </button>
        )}
      </div>
      {filterGroups.map((group) => (
        <div key={group.label} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>{group.label}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {group.chips.map((chip) => (
              <Chip
                key={chip}
                selected={selected.includes(chip)}
                onClick={() => toggle(chip)}
              >
                {selected.includes(chip) && (
                  <Chip.Leading>
                    <CheckIcon size={12} />
                  </Chip.Leading>
                )}
                {chip}
                {selected.includes(chip) && (
                  <Chip.Trailing>
                    <CancelIcon size={10} />
                  </Chip.Trailing>
                )}
              </Chip>
            ))}
          </div>
        </div>
      ))}
      {selected.length > 0 && (
        <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: '#ede9fe', fontSize: 11, color: '#7c3aed' }}>
          필터 적용 중: {selected.join(', ')}
        </div>
      )}
    </div>
  )
}

export const Shadcn_필터_칩_그룹: Story = {
  name: 'shadcn/ui — 멀티셀렉트 필터 칩 그룹 (전체 해제)',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'shadcn/ui Badge 필터 패턴 적용. 카테고리/상태/프레임워크 3그룹 멀티셀렉트 칩, 선택 시 체크 아이콘+취소 아이콘 추가. 선택된 수 표시 + 전체 해제 버튼. 문서 필터링 UX.',
      },
    },
  },
  render: () => <ShadcnFilterChipGroupRender />,
}

function AppleHIGTechStackChipRender() {
  const [selected, setSelected] = useState<string[]>(['React', 'TypeScript'])

  const techStacks = [
    { name: 'React', color: '#61dafb', bg: '#e8f8fd' },
    { name: 'TypeScript', color: '#3178c6', bg: '#e8f0fb' },
    { name: 'Tailwind', color: '#38bdf8', bg: '#e0f7fe' },
    { name: 'Next.js', color: '#000000', bg: '#f3f4f6' },
    { name: 'Vite', color: '#646cff', bg: '#eeefff' },
    { name: 'Vitest', color: '#6e9f18', bg: '#f0f7e6' },
    { name: 'Storybook', color: '#ff4785', bg: '#feeef5' },
    { name: 'ESLint', color: '#4b32c3', bg: '#eeeafb' },
    { name: 'pnpm', color: '#f69220', bg: '#fef3e6' },
    { name: 'vanilla-extract', color: '#e17ab6', bg: '#fdeef8' },
  ]

  const toggle = (name: string) => {
    setSelected((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name])
  }

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 4 }}>기술 스택 선택</div>
      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 12 }}>Apple HIG 스타일 태그 칩 — 최소 터치 타겟 적용</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {techStacks.map((tech) => (
          <Chip
            key={tech.name}
            selected={selected.includes(tech.name)}
            onClick={() => toggle(tech.name)}
            theme={selected.includes(tech.name) ? {
              enabledSelectedFillColor: tech.bg,
              enabledSelectedForegroundColor: tech.color,
              enabledSelectedBorderColor: tech.color + '60',
            } : undefined}
          >
            <Chip.Leading>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: tech.color }} />
            </Chip.Leading>
            {tech.name}
          </Chip>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: '#6b7280' }}>
        선택됨 ({selected.length}): {selected.length > 0 ? selected.join(' · ') : '없음'}
      </div>
    </div>
  )
}

export const Apple_HIG_기술_스택_태그_칩: Story = {
  name: 'Apple HIG — 기술 스택 컬러 태그 칩 (브랜드 색상 오버라이드)',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Apple HIG 터치 친화적 컴포넌트 원칙 + shadcn/ui Badge 스타일 적용. 각 기술 스택 고유 브랜드 색상으로 theme 오버라이드. 선택 시 배경+테두리+텍스트 색상이 해당 기술 색상으로 변경.',
      },
    },
  },
  render: () => <AppleHIGTechStackChipRender />,
}

function ShadcnAppleAISuggestionChipRender() {
  const [prompt, setPrompt] = useState('')
  const [suggestions, setSuggestions] = useState([
    '회의 요약 작성', '이메일 초안 작성', '코드 리뷰', '버그 분석',
    '문서 번역', '아이디어 브레인스토밍', '데이터 요약', '일정 정리',
  ])

  const addToPrompt = (suggestion: string) => {
    setPrompt((prev) => prev ? `${prev}, ${suggestion}` : suggestion)
    setSuggestions((prev) => prev.filter((s) => s !== suggestion))
  }

  const reset = () => {
    setPrompt('')
    setSuggestions([
      '회의 요약 작성', '이메일 초안 작성', '코드 리뷰', '버그 분석',
      '문서 번역', '아이디어 브레인스토밍', '데이터 요약', '일정 정리',
    ])
  }

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 12 }}>AI 프롬프트 빌더</div>
      <div style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#f9fafb', minHeight: 60, marginBottom: 12, fontSize: 13, color: prompt ? '#111827' : '#9ca3af' }}>
        {prompt || '아래 제안 칩을 클릭해 프롬프트를 구성하세요...'}
      </div>
      {suggestions.length > 0 && (
        <>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', marginBottom: 6 }}>제안 (클릭 시 추가)</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {suggestions.map((s) => (
              <Chip key={s} selected={false} onClick={() => addToPrompt(s)}>
                <Chip.Leading>
                  <span style={{ fontSize: 10 }}>+</span>
                </Chip.Leading>
                {s}
              </Chip>
            ))}
          </div>
        </>
      )}
      {suggestions.length === 0 && (
        <div style={{ fontSize: 12, color: '#6b7280', padding: '8px 0' }}>모든 제안이 추가되었습니다.</div>
      )}
      {prompt && (
        <button onClick={reset} style={{ marginTop: 10, fontSize: 11, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'system-ui', padding: 0 }}>
          초기화
        </button>
      )}
    </div>
  )
}

export const Shadcn_Apple_AI_프롬프트_제안_칩: Story = {
  name: 'shadcn/ui + Apple HIG — AI 프롬프트 제안 칩 (클릭 시 소비)',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'shadcn/ui Command 제안 패턴 + Apple HIG 소비형 인터랙션. 제안 칩 클릭 시 칩은 사라지고 텍스트가 프롬프트에 추가됨. AI 어시스턴트의 빠른 프롬프트 구성 UX 패턴.',
      },
    },
  },
  render: () => <ShadcnAppleAISuggestionChipRender />,
}
