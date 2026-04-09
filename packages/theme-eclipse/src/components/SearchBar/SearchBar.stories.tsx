import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { Chip } from '../Chip'
import { SearchBar } from './SearchBar'

const meta = {
  title: 'eclipse/Inputs/Text Fields/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: '검색어를 입력하세요',
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    caption: {
      control: 'text',
      description: 'Caption 텍스트',
    },
    disabled: {
      table: {
        disable: true,
      },
    },
    value: {
      control: 'text',
      description: '입력된 값 (있으면 Populated 상태)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
    },
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    controls: {
      exclude: ['theme', 'className', 'style', 'axis'],
    },
  },
  render: (args) => <SearchBar {...args} />,
}

const FocusedExample = ({ value, placeholder }: { value?: string; placeholder?: string }) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div>
      <SearchBar
        value={value}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <small style={{ display: 'block', marginTop: '4px', color: '#666' }}>
        {isFocused ? '(Focused - 클릭하여 포커스)' : '(클릭하여 포커스)'}
      </small>
    </div>
  )
}

export const 모든상태: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        width: '800px',
      }}
    >
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>State</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Enabled</p>
            <SearchBar placeholder="검색어를 입력하세요" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Focused</p>
            <FocusedExample placeholder="검색어를 입력하세요" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</p>
            <SearchBar placeholder="검색어를 입력하세요" disabled />
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Populated</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Empty</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <SearchBar placeholder="검색어를 입력하세요" />
              <FocusedExample placeholder="검색어를 입력하세요" />
              <SearchBar placeholder="검색어를 입력하세요" disabled />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Populated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <SearchBar value="검색어" placeholder="검색어를 입력하세요" />
              <FocusedExample value="검색어" placeholder="검색어를 입력하세요" />
              <SearchBar value="검색어" placeholder="검색어를 입력하세요" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ClearButton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
          ClearButton은 값이 있을 때만 표시됩니다 (onPopulated)
        </p>
        <SearchBar placeholder="검색어를 입력하세요" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>값이 있는 경우</p>
        <SearchBar value="검색어" placeholder="검색어를 입력하세요" />
      </div>
    </div>
  ),
}

export const 캡션_사용: Story = {
  args: {
    caption: '100개',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <SearchBar {...args} />
    </div>
  ),
}

export const 디자인QA = {
  args: {
    placeholder: '검색어를 입력하세요',
    onChange: fn(),
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ ...args }: any) => <SearchBar {...args} />,
}

// ─── Ant Design 자동완성 드롭다운 패턴 ───────────────────────────────────────
// Ant Design Select / AutoComplete 컴포넌트의 dropdown 제안 패턴을 참고했습니다.
const SUGGESTIONS = ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Vite', 'Vitest', 'Orbit UI']

const AutocompleteDemoRender = () => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = query.length > 0 ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase())) : []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(e.target.value)
    setSelected(null)
    setOpen(e.target.value.length > 0)
  }

  const handleSelect = (item: string) => {
    setQuery(item)
    setSelected(item)
    setOpen(false)
  }

  return (
    <div style={{ position: 'relative', width: '360px' }}>
      <SearchBar
        value={query}
        placeholder="기술 스택 검색..."
        onChange={handleChange}
        onFocus={() => { if (query.length > 0) setOpen(true) }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && filtered.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: '4px 0 0',
            padding: '4px 0',
            listStyle: 'none',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            zIndex: 100,
          }}
        >
          {filtered.map((item) => (
            <li
              key={item}
              onMouseDown={() => handleSelect(item)}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                background: item === selected ? '#f1f5f9' : 'transparent',
                color: '#0f172a',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLLIElement).style.background = '#f8fafc' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLLIElement).style.background = item === selected ? '#f1f5f9' : 'transparent' }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <p style={{ marginTop: '8px', fontSize: '13px', color: '#6366f1', fontWeight: 500 }}>
          선택됨: {selected}
        </p>
      )}
    </div>
  )
}

export const 자동완성_드롭다운: Story = {
  name: '자동완성 드롭다운 (Ant Design AutoComplete 패턴)',
  render: () => <AutocompleteDemoRender />,
}

// ─── Ant Design Select 멀티 선택 + 필터 칩 패턴 ──────────────────────────────
// Ant Design Select mode="multiple" 와 태그 칩 패턴을 참고했습니다.
const FILTER_CATEGORIES = ['디자인', '개발', '기획', 'QA', '마케팅', '운영']

const FilterChipSearchRender = () => {
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>(['디자인'])

  const toggleFilter = (label: string) => {
    setActiveFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '480px' }}>
      <SearchBar
        value={query}
        placeholder="팀원 검색..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {FILTER_CATEGORIES.map((cat) => (
          <span
            key={cat}
            style={{ opacity: activeFilters.includes(cat) ? 1 : 0.5 }}
          >
            <Chip onClick={() => toggleFilter(cat)}>
              {cat}
            </Chip>
          </span>
        ))}
      </div>
      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
        활성 필터: {activeFilters.length > 0 ? activeFilters.join(', ') : '없음'}{query ? ` · 검색어: "${query}"` : ''}
      </p>
    </div>
  )
}

export const 필터칩_검색_조합: Story = {
  name: '필터 칩 + 검색 조합 (Ant Design Select 멀티 태그 패턴)',
  render: () => <FilterChipSearchRender />,
}
