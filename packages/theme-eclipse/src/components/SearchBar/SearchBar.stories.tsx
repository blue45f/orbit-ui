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

// ─── Chakra UI 실시간 사용자 검색 패턴 ────────────────────────────────────────
// Chakra UI InputGroup + InputLeftElement 패턴 — 아바타와 함께 표시되는 유저 검색

const MOCK_USERS = [
  { id: 'u1', name: '김지수', role: '프론트엔드 개발자', avatar: 'KJ', color: '#6366f1' },
  { id: 'u2', name: '이민준', role: 'UX 디자이너', avatar: 'LM', color: '#f59e0b' },
  { id: 'u3', name: '박서연', role: '백엔드 개발자', avatar: 'PS', color: '#10b981' },
  { id: 'u4', name: '최현우', role: '프로덕트 매니저', avatar: 'CH', color: '#ef4444' },
  { id: 'u5', name: '정다은', role: 'QA 엔지니어', avatar: 'JD', color: '#8b5cf6' },
  { id: 'u6', name: '한승호', role: '데이터 분석가', avatar: 'HS', color: '#ec4899' },
]

function ChakraUserSearchRender() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<(typeof MOCK_USERS)[0] | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = query.length > 0
    ? MOCK_USERS.filter(
        (u) =>
          u.name.includes(query) || u.role.toLowerCase().includes(query.toLowerCase()),
      )
    : MOCK_USERS

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(e.target.value)
    setSelected(null)
    setOpen(true)
  }

  const handleSelect = (user: (typeof MOCK_USERS)[0]) => {
    setSelected(user)
    setQuery(user.name)
    setOpen(false)
  }

  return (
    <div style={{ width: '380px' }}>
      <p style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>팀원에게 작업 할당</p>
      <div style={{ position: 'relative' }}>
        <SearchBar
          value={query}
          placeholder="이름 또는 역할로 검색..."
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        {open && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              margin: '4px 0 0',
              padding: '6px 0',
              listStyle: 'none',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 10,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 100,
              maxHeight: 260,
              overflowY: 'auto',
            }}
          >
            {filtered.length === 0 && (
              <li style={{ padding: '12px 16px', fontSize: 14, color: '#94a3b8' }}>검색 결과 없음</li>
            )}
            {filtered.map((user) => (
              <li
                key={user.id}
                onMouseDown={() => handleSelect(user)}
                style={{
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  background: selected?.id === user.id ? '#f0f9ff' : 'transparent',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLLIElement).style.background = '#f8fafc' }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLLIElement).style.background =
                    selected?.id === user.id ? '#f0f9ff' : 'transparent'
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: user.color,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {user.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{user.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{user.role}</div>
                </div>
                {selected?.id === user.id && (
                  <div style={{ marginLeft: 'auto', color: '#6366f1', fontSize: 16 }}>✓</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selected && (
        <div
          style={{
            marginTop: 12,
            padding: '10px 14px',
            background: '#f0f9ff',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: selected.color,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {selected.avatar}
          </div>
          <span style={{ fontSize: 13, color: '#0369a1', fontWeight: 500 }}>
            {selected.name} ({selected.role}) 에게 할당됨
          </span>
        </div>
      )}
    </div>
  )
}

export const Chakra_실시간_사용자_검색: Story = {
  name: 'Chakra 실시간 사용자 검색 (아바타 드롭다운)',
  render: () => <ChakraUserSearchRender />,
}

// ─── Google Material 3 스코프 전환 검색 패턴 ─────────────────────────────────
// M3 Search 컴포넌트의 scope chip 패턴 — 탭으로 검색 범위를 전환하는 UI

type M3SearchScope = 'all' | 'docs' | 'issues' | 'code'

const M3_SCOPES: { key: M3SearchScope; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'docs', label: '문서' },
  { key: 'issues', label: '이슈' },
  { key: 'code', label: '코드' },
]

const M3_RESULTS: Record<M3SearchScope, { title: string; sub: string; tag: string }[]> = {
  all: [
    { title: 'Button 컴포넌트 가이드', sub: 'docs/components/button', tag: '문서' },
    { title: 'Button size prop 오류', sub: 'issues/4821', tag: '이슈' },
    { title: 'SolidButton.tsx', sub: 'packages/theme-eclipse/src', tag: '코드' },
  ],
  docs: [
    { title: 'Button 컴포넌트 가이드', sub: 'docs/components/button', tag: '문서' },
    { title: 'Accessibility 가이드', sub: 'docs/a11y', tag: '문서' },
  ],
  issues: [
    { title: 'Button size prop 오류', sub: 'issues/4821', tag: '이슈' },
    { title: 'Toggle 포커스 링 누락', sub: 'issues/4756', tag: '이슈' },
  ],
  code: [
    { title: 'SolidButton.tsx', sub: 'packages/theme-eclipse/src', tag: '코드' },
    { title: 'Button.stories.tsx', sub: 'packages/theme-eclipse/src', tag: '코드' },
  ],
}

const TAG_COLORS: Record<string, string> = {
  문서: '#3b82f6',
  이슈: '#ef4444',
  코드: '#10b981',
}

function Material3ScopeSearchRender() {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<M3SearchScope>('all')

  const results = query.length > 0
    ? M3_RESULTS[scope].filter(
        (r) => r.title.toLowerCase().includes(query.toLowerCase()),
      )
    : M3_RESULTS[scope]

  return (
    <div style={{ width: '420px' }}>
      <SearchBar
        value={query}
        placeholder="검색..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <div style={{ display: 'flex', gap: 6, marginTop: 10, marginBottom: 14 }}>
        {M3_SCOPES.map((s) => (
          <button
            key={s.key}
            onClick={() => setScope(s.key)}
            style={{
              padding: '5px 14px',
              borderRadius: 20,
              border: 'none',
              fontSize: 13,
              fontWeight: scope === s.key ? 600 : 400,
              cursor: 'pointer',
              background: scope === s.key ? '#1a1a2e' : '#f1f5f9',
              color: scope === s.key ? '#fff' : '#475569',
              transition: 'background 0.15s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {results.length === 0 && (
          <p style={{ fontSize: 14, color: '#94a3b8', padding: '8px 0' }}>검색 결과 없음</p>
        )}
        {results.map((r) => (
          <div
            key={r.sub}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: '#fff',
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{r.title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{r.sub}</div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 12,
                background: `${TAG_COLORS[r.tag]}20`,
                color: TAG_COLORS[r.tag],
              }}
            >
              {r.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Material3_스코프_전환_검색: Story = {
  name: 'Material 3 스코프 전환 검색 (Scope Chip 패턴)',
  render: () => <Material3ScopeSearchRender />,
}

// ─── Chakra UI 최근 검색 히스토리 패턴 ───────────────────────────────────────
// Chakra UI Combobox + history 패턴 — 최근 검색어 표시 및 삭제

const DEFAULT_HISTORY = ['디자인 시스템', 'Storybook 배포', 'vanilla-extract', 'Figma 토큰']

function ChakraSearchHistoryRender() {
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState<string[]>(DEFAULT_HISTORY)
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (!query.trim()) return
    setHistory((prev) => [query, ...prev.filter((h) => h !== query)].slice(0, 6))
    setOpen(false)
  }

  const removeHistory = (item: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setHistory((prev) => prev.filter((h) => h !== item))
  }

  const selectHistory = (item: string) => {
    setQuery(item)
    setOpen(false)
  }

  return (
    <div style={{ width: '380px' }}>
      <div style={{ position: 'relative' }}>
        <SearchBar
          value={query}
          placeholder="문서, 컴포넌트, 이슈 검색..."
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        {open && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 4,
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 10,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              zIndex: 100,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '8px 14px 4px',
                fontSize: 11,
                color: '#94a3b8',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              최근 검색
            </div>
            {history.length === 0 && (
              <div style={{ padding: '10px 14px', fontSize: 13, color: '#cbd5e1' }}>
                최근 검색 기록이 없습니다
              </div>
            )}
            {history.map((item) => (
              <div
                key={item}
                onMouseDown={() => selectHistory(item)}
                style={{
                  padding: '9px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: '#334155',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>&#128337;</span>
                  {item}
                </span>
                <button
                  onMouseDown={(e) => removeHistory(item, e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#cbd5e1',
                    fontSize: 16,
                    lineHeight: 1,
                    padding: '0 4px',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            {history.length > 0 && (
              <div
                style={{
                  padding: '8px 14px',
                  borderTop: '1px solid #f1f5f9',
                  textAlign: 'center',
                }}
              >
                <button
                  onMouseDown={() => setHistory([])}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    color: '#94a3b8',
                  }}
                >
                  전체 기록 삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        style={{
          marginTop: 10,
          width: '100%',
          padding: '9px',
          borderRadius: 8,
          border: 'none',
          background: '#0f172a',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        검색
      </button>
    </div>
  )
}

export const Chakra_최근_검색_히스토리: Story = {
  name: 'Chakra 최근 검색 히스토리 (History Combobox 패턴)',
  render: () => <ChakraSearchHistoryRender />,
}
