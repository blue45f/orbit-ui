import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React, { useState } from 'react'

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

// --- Cycle 74: Arco Design + Linear 벤치마크 ---

const ArcoGlobalSearchRender = () => {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'docs' | 'issues' | 'members'>('all')
  const [searching, setSearching] = useState(false)

  const TABS: { id: 'all' | 'docs' | 'issues' | 'members'; label: string; count: number }[] = [
    { id: 'all', label: '전체', count: 42 },
    { id: 'docs', label: '문서', count: 18 },
    { id: 'issues', label: '이슈', count: 15 },
    { id: 'members', label: '멤버', count: 9 },
  ]

  const RESULTS = {
    all: [
      { type: 'docs', icon: '📄', title: '컴포넌트 가이드', sub: 'Design System / 문서' },
      { type: 'issues', icon: '🐛', title: 'Button hover 상태 버그', sub: 'theme-eclipse #142' },
      { type: 'members', icon: '👤', title: '김혜준', sub: '디자이너 · 서울팀' },
    ],
    docs: [
      { type: 'docs', icon: '📄', title: '시작하기', sub: 'Design System / 가이드' },
      { type: 'docs', icon: '📄', title: '컴포넌트 가이드', sub: 'Design System / 문서' },
    ],
    issues: [
      { type: 'issues', icon: '🐛', title: 'Button hover 상태 버그', sub: 'theme-eclipse #142' },
      { type: 'issues', icon: '✅', title: 'TextField 접근성 개선', sub: 'theme-eclipse #138' },
    ],
    members: [
      { type: 'members', icon: '👤', title: '김혜준', sub: '디자이너 · 서울팀' },
      { type: 'members', icon: '👤', title: '이준호', sub: '프론트엔드 · 서울팀' },
    ],
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(e.target.value)
    setSearching(true)
    setTimeout(() => setSearching(false), 400)
  }

  const results = query ? RESULTS[activeTab] : []

  return (
    <div style={{ width: 520, fontFamily: 'system-ui, sans-serif' }}>
      <SearchBar
        placeholder="프로젝트 전체 검색..."
        onChange={handleChange}
        value={query}
      />
      {query && (
        <div style={{ marginTop: 4, background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', padding: '0 12px' }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? '#0f172a' : '#94a3b8',
                  borderBottom: activeTab === tab.id ? '2px solid #0f172a' : '2px solid transparent',
                  marginBottom: -1,
                }}
              >
                {tab.label}
                <span style={{
                  marginLeft: 4, fontSize: 10, padding: '1px 5px', borderRadius: 10,
                  background: activeTab === tab.id ? '#0f172a' : '#f1f5f9',
                  color: activeTab === tab.id ? '#fff' : '#94a3b8',
                }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          {searching ? (
            <div style={{ padding: 16, textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>검색 중...</div>
          ) : results.length === 0 ? (
            <div style={{ padding: 16, textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>결과 없음</div>
          ) : (
            results.map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                  borderBottom: i < results.length - 1 ? '1px solid #f8fafc' : 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 16 }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.sub}</div>
                </div>
              </div>
            ))
          )}
          <div style={{ padding: '6px 14px', borderTop: '1px solid #f1f5f9', fontSize: 10, color: '#94a3b8' }}>
            Enter 선택 · Esc 닫기
          </div>
        </div>
      )}
      <p style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Arco Design — 탭 분류 + 카운트 배지 전역 검색 패턴
      </p>
    </div>
  )
}

export const Arco_탭_분류_전역_검색: Story = {
  name: 'Arco Design - 탭 분류 전역 검색 (카운트 배지)',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design GlobalSearch 벤치마크. 탭으로 결과 카테고리 분류(전체/문서/이슈/멤버), 탭별 카운트 배지, 로딩 상태, 빈 결과 처리 포함.',
      },
    },
  },
  render: () => <ArcoGlobalSearchRender />,
}

const LinearIssueSearchRender = () => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  type IssueStatus = 'in-progress' | 'todo' | 'done' | 'cancelled'
  type IssuePriority = 'urgent' | 'high' | 'medium' | 'low'

  const ISSUES: { id: string; title: string; status: IssueStatus; priority: IssuePriority; assignee: string }[] = [
    { id: 'ORB-142', title: 'Button hover 색상 대비 수정', status: 'in-progress', priority: 'urgent', assignee: 'KH' },
    { id: 'ORB-138', title: 'TextField 접근성 개선 (aria-label)', status: 'todo', priority: 'high', assignee: 'JH' },
    { id: 'ORB-130', title: 'Modal 포커스 트랩 누락', status: 'done', priority: 'medium', assignee: 'SY' },
    { id: 'ORB-125', title: 'DataTable 정렬 아이콘 정렬', status: 'cancelled', priority: 'low', assignee: 'KH' },
    { id: 'ORB-120', title: 'Carousel 터치 스와이프 지원', status: 'todo', priority: 'medium', assignee: 'JH' },
  ]

  const STATUS_CFG: Record<IssueStatus, { label: string; color: string; dot: string }> = {
    'in-progress': { label: '진행 중', color: '#f59e0b', dot: '#f59e0b' },
    todo: { label: '할 일', color: '#64748b', dot: '#94a3b8' },
    done: { label: '완료', color: '#22c55e', dot: '#22c55e' },
    cancelled: { label: '취소됨', color: '#ef4444', dot: '#fca5a5' },
  }

  const PRIORITY_CFG: Record<IssuePriority, { label: string; color: string }> = {
    urgent: { label: '긴급', color: '#ef4444' },
    high: { label: '높음', color: '#f97316' },
    medium: { label: '보통', color: '#f59e0b' },
    low: { label: '낮음', color: '#94a3b8' },
  }

  const filtered = ISSUES.filter(
    (i) =>
      !query ||
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.id.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{ width: 480, fontFamily: 'system-ui, sans-serif' }}>
      <SearchBar
        placeholder="이슈 검색 (ID 또는 제목)..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <div style={{ marginTop: 6, background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 16, textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>이슈 없음</div>
        ) : (
          filtered.map((issue, idx) => (
            <div
              key={issue.id}
              onClick={() => setSelected(issue.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                borderBottom: idx < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
                cursor: 'pointer',
                background: selected === issue.id ? '#f8fafc' : '#fff',
              }}
            >
              <div style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: STATUS_CFG[issue.status].dot,
              }} />
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#94a3b8', flexShrink: 0 }}>
                {issue.id}
              </span>
              <span style={{ fontSize: 13, flex: 1, color: '#1e293b', fontWeight: 400 }}>{issue.title}</span>
              <span style={{
                fontSize: 9, padding: '1px 5px', borderRadius: 3, flexShrink: 0,
                color: PRIORITY_CFG[issue.priority].color,
                background: PRIORITY_CFG[issue.priority].color + '18',
                fontWeight: 600,
              }}>
                {PRIORITY_CFG[issue.priority].label}
              </span>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', background: '#e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: '#475569', flexShrink: 0,
              }}>
                {issue.assignee}
              </div>
            </div>
          ))
        )}
      </div>
      {selected && (
        <div style={{ marginTop: 6, fontSize: 12, color: '#475569' }}>
          선택된 이슈: <strong>{selected}</strong>
        </div>
      )}
      <p style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
        Linear — 이슈 인라인 검색 (상태 dot + 우선순위 배지 + 담당자 아바타)
      </p>
    </div>
  )
}

export const Linear_이슈_인라인_검색: Story = {
  name: 'Linear - 이슈 인라인 검색 (상태 + 우선순위)',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 이슈 검색 패턴 벤치마크. ID/제목 인라인 필터, 상태 dot 인디케이터, 우선순위 배지(긴급/높음/보통/낮음), 담당자 아바타 조합.',
      },
    },
  },
  render: () => <LinearIssueSearchRender />,
}

const ArcoLinearCommandSearchRender = () => {
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState(['컴포넌트 가이드', 'Button API', '다크모드'])
  const [pinned] = useState(['대시보드', '릴리즈 노트'])

  const SUGGESTIONS = [
    'SearchBar 사용법',
    'TextField vs SearchBar',
    'Command 팔레트 패턴',
    'Accessibility 체크리스트',
    'Dark Mode 토큰',
  ]

  const filtered = query
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : []

  const addRecent = (term: string) => {
    setRecentSearches((prev) => [term, ...prev.filter((r) => r !== term)].slice(0, 5))
    setQuery('')
  }

  return (
    <div style={{ width: 460, fontFamily: 'system-ui, sans-serif' }}>
      <SearchBar
        placeholder="문서 검색..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <div style={{ marginTop: 4, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {!query ? (
          <>
            <div style={{ padding: '10px 14px 4px' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', marginBottom: 6, textTransform: 'uppercase' }}>고정됨</div>
              {pinned.map((p) => (
                <div key={p} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
                  borderBottom: '1px solid #f8fafc', cursor: 'pointer',
                }}>
                  <span style={{ fontSize: 11, color: '#f59e0b' }}>★</span>
                  <span style={{ fontSize: 13, color: '#1e293b' }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '10px 14px 8px' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', marginBottom: 6, textTransform: 'uppercase' }}>최근 검색</div>
              {recentSearches.map((r) => (
                <div key={r} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
                  borderBottom: '1px solid #f8fafc', cursor: 'pointer',
                }}
                  onClick={() => addRecent(r)}
                >
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>↺</span>
                  <span style={{ fontSize: 13, color: '#475569' }}>{r}</span>
                </div>
              ))}
            </div>
          </>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 16, textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>
            &quot;{query}&quot; 검색 결과 없음
          </div>
        ) : (
          <div style={{ padding: '8px 0' }}>
            {filtered.map((s, i) => (
              <div
                key={i}
                onClick={() => addRecent(s)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
                  cursor: 'pointer',
                  borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
                }}
              >
                <span style={{ fontSize: 11, color: '#6366f1' }}>→</span>
                <span style={{ fontSize: 13, color: '#1e293b' }}>{s}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ padding: '6px 14px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8' }}>
          <span>최근 검색 {recentSearches.length}개</span>
          <span>Enter 검색</span>
        </div>
      </div>
      <p style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
        Arco + Linear — 고정 북마크 + 최근 검색 히스토리 복합 패턴
      </p>
    </div>
  )
}

export const Arco_Linear_고정_북마크_검색: Story = {
  name: 'Arco + Linear - 고정 북마크 + 최근 검색 복합',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design Search + Linear 고정 항목 패턴 조합. 고정(핀) 북마크 섹션, 최근 검색 히스토리, 실시간 자동완성 제안, 클릭 시 히스토리 자동 추가.',
      },
    },
  },
  render: () => <ArcoLinearCommandSearchRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 전역 커맨드 검색 (Command Palette 스타일)
   shadcn/ui Command 컴포넌트의 핵심 UX — 섹션 구분(최근/제안/페이지)과
   키보드 탐색 힌트를 포함한 전역 검색 패턴.
-------------------------------------------------------------------------- */
const SHADCN_RESULTS = {
  recent: [
    { id: 'r1', label: 'DataTable 기본', path: '/eclipse/data-display/datatable/기본', icon: '🕐' },
    { id: 'r2', label: 'Button 색상 변형', path: '/eclipse/inputs/button/색상', icon: '🕐' },
  ],
  pages: [
    { id: 'p1', label: 'Getting Started', path: '/docs/getting-started', icon: '📖' },
    { id: 'p2', label: 'Design Token', path: '/docs/design-token', icon: '🎨' },
    { id: 'p3', label: 'Component Overview', path: '/docs/components', icon: '🧩' },
  ],
  components: [
    { id: 'c1', label: 'TextField', path: '/eclipse/inputs/textfield', icon: '✏' },
    { id: 'c2', label: 'SearchBar', path: '/eclipse/inputs/searchbar', icon: '🔍' },
    { id: 'c3', label: 'Toggle', path: '/eclipse/inputs/toggle', icon: '🔘' },
    { id: 'c4', label: 'Progress', path: '/eclipse/feedback/progress', icon: '📊' },
    { id: 'c5', label: 'Modal', path: '/eclipse/overlay/modal', icon: '🪟' },
  ],
}

const ShadcnCommandSearchRender = () => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filterItems = (items: typeof SHADCN_RESULTS.components) =>
    query ? items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())) : items

  const filteredPages = filterItems(SHADCN_RESULTS.pages)
  const filteredComponents = filterItems(SHADCN_RESULTS.components)
  const hasResults = filteredPages.length > 0 || filteredComponents.length > 0

  return (
    <div style={{ width: 480 }}>
      {selected && (
        <div style={{
          marginBottom: 10, padding: '8px 12px', borderRadius: 8,
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          fontSize: 12, color: '#16a34a', fontWeight: 600,
        }}>
          → {selected}
        </div>
      )}

      <div style={{ borderRadius: 12, border: '1.5px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9' }}>
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="컴포넌트, 문서, 스토리 검색..."
          />
        </div>

        <div style={{ maxHeight: 320, overflowY: 'auto' }}>
          {!query && (
            <div>
              <div style={{ padding: '8px 14px 4px', fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                최근 방문
              </div>
              {SHADCN_RESULTS.recent.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '9px 14px', border: 'none', background: 'none',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                >
                  <span style={{ fontSize: 13 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: '#1e293b' }}>{item.label}</span>
                  <span style={{ fontSize: 11, color: '#cbd5e1', marginLeft: 'auto' }}>{item.path}</span>
                </button>
              ))}
            </div>
          )}

          {hasResults && query && (
            <>
              {filteredPages.length > 0 && (
                <div>
                  <div style={{ padding: '8px 14px 4px', fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    문서
                  </div>
                  {filteredPages.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelected(item.path)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', padding: '9px 14px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                    >
                      <span style={{ fontSize: 13 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, color: '#1e293b' }}>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
              {filteredComponents.length > 0 && (
                <div>
                  <div style={{ padding: '8px 14px 4px', fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    컴포넌트
                  </div>
                  {filteredComponents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelected(item.path)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', padding: '9px 14px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
                    >
                      <span style={{ fontSize: 13 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, color: '#1e293b' }}>{item.label}</span>
                      <span style={{ fontSize: 11, color: '#cbd5e1', marginLeft: 'auto' }}>컴포넌트</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {query && !hasResults && (
            <div style={{ padding: '24px 14px', textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
              &quot;{query}&quot;에 대한 검색 결과가 없습니다.
            </div>
          )}
        </div>

        <div style={{ padding: '8px 14px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 12, fontSize: 10, color: '#cbd5e1' }}>
          <span>↑↓ 탐색</span>
          <span>↵ 선택</span>
          <span>Esc 닫기</span>
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        shadcn/ui Command 패턴 — 섹션 구분 + 키보드 힌트 + 최근 방문
      </div>
    </div>
  )
}

export const shadcn_커맨드_팔레트_검색: Story = {
  name: 'shadcn/ui - 전역 커맨드 팔레트 검색',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Command 컴포넌트 패턴. 최근 방문 섹션(쿼리 없을 때), 검색 시 문서/컴포넌트로 섹션 구분, 하단 키보드 단축키 힌트 포함.',
      },
    },
  },
  render: () => <ShadcnCommandSearchRender />,
}

/* --------------------------------------------------------------------------
   Arco Design 벤치마크: 고급 필터 결합 검색
   Arco Design Search 패턴 — 타입/상태/날짜 범주 칩 필터와 텍스트 검색을
   결합해 대용량 데이터를 효율적으로 필터링하는 엔터프라이즈 패턴.
-------------------------------------------------------------------------- */
const ARCO_ITEMS = [
  { id: 'i1', name: 'Button 컴포넌트 리팩토링', type: 'task', status: 'done', date: '2026-04-01' },
  { id: 'i2', name: 'TextField 접근성 개선', type: 'bug', status: 'in-progress', date: '2026-04-05' },
  { id: 'i3', name: 'Storybook MDX 문서 작성', type: 'docs', status: 'done', date: '2026-03-28' },
  { id: 'i4', name: 'Design Token 변경 사항 PR', type: 'task', status: 'review', date: '2026-04-07' },
  { id: 'i5', name: 'Modal 포커스 트랩 버그', type: 'bug', status: 'open', date: '2026-04-08' },
  { id: 'i6', name: 'DataTable 정렬 기능 추가', type: 'feat', status: 'in-progress', date: '2026-04-09' },
]

const ARCO_TYPE_CFG = {
  task:  { label: 'Task', color: '#6366f1' },
  bug:   { label: 'Bug', color: '#ef4444' },
  docs:  { label: 'Docs', color: '#f59e0b' },
  feat:  { label: 'Feat', color: '#10b981' },
} as const

const ARCO_STATUS_CFG = {
  open:        { label: '오픈', color: '#94a3b8' },
  'in-progress': { label: '진행 중', color: '#6366f1' },
  review:      { label: '리뷰', color: '#f59e0b' },
  done:        { label: '완료', color: '#10b981' },
} as const

const ArcoAdvancedFilterRender = () => {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filtered = ARCO_ITEMS.filter((item) => {
    const matchText = !query || item.name.toLowerCase().includes(query.toLowerCase())
    const matchType = !typeFilter || item.type === typeFilter
    const matchStatus = !statusFilter || item.status === statusFilter
    return matchText && matchType && matchStatus
  })

  return (
    <div style={{ width: 520 }}>
      <div style={{ marginBottom: 12 }}>
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이슈 검색..."
        />
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', marginRight: 4 }}>타입:</span>
        {Object.entries(ARCO_TYPE_CFG).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setTypeFilter(typeFilter === key ? null : key)}
            style={{
              padding: '3px 10px', borderRadius: 20, cursor: 'pointer',
              border: `1.5px solid ${typeFilter === key ? cfg.color : '#e2e8f0'}`,
              background: typeFilter === key ? cfg.color + '14' : '#fff',
              color: typeFilter === key ? cfg.color : '#64748b',
              fontSize: 11, fontWeight: typeFilter === key ? 700 : 400,
            }}
          >
            {cfg.label}
          </button>
        ))}
        <span style={{ fontSize: 11, color: '#cbd5e1', margin: '0 4px' }}>|</span>
        <span style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', marginRight: 4 }}>상태:</span>
        {Object.entries(ARCO_STATUS_CFG).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(statusFilter === key ? null : key)}
            style={{
              padding: '3px 10px', borderRadius: 20, cursor: 'pointer',
              border: `1.5px solid ${statusFilter === key ? cfg.color : '#e2e8f0'}`,
              background: statusFilter === key ? cfg.color + '14' : '#fff',
              color: statusFilter === key ? cfg.color : '#64748b',
              fontSize: 11, fontWeight: statusFilter === key ? 700 : 400,
            }}
          >
            {cfg.label}
          </button>
        ))}
        {(typeFilter || statusFilter || query) && (
          <button
            onClick={() => { setTypeFilter(null); setStatusFilter(null); setQuery('') }}
            style={{ padding: '3px 10px', borderRadius: 20, border: '1.5px solid #e2e8f0', background: '#fff', color: '#94a3b8', fontSize: 11, cursor: 'pointer' }}
          >
            초기화
          </button>
        )}
      </div>

      <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '8px 14px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 11, color: '#94a3b8' }}>
          {filtered.length}개 결과 / 전체 {ARCO_ITEMS.length}개
        </div>
        {filtered.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
            검색 결과가 없습니다.
          </div>
        ) : (
          filtered.map((item, i) => {
            const typeCfg = ARCO_TYPE_CFG[item.type as keyof typeof ARCO_TYPE_CFG]
            const statusCfg = ARCO_STATUS_CFG[item.status as keyof typeof ARCO_STATUS_CFG]
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px',
                  borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none',
                }}
              >
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                  background: typeCfg.color + '14', color: typeCfg.color, whiteSpace: 'nowrap',
                }}>
                  {typeCfg.label}
                </span>
                <span style={{ flex: 1, fontSize: 13, color: '#1e293b' }}>{item.name}</span>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                  background: statusCfg.color + '14', color: statusCfg.color, whiteSpace: 'nowrap',
                }}>
                  {statusCfg.label}
                </span>
                <span style={{ fontSize: 11, color: '#cbd5e1', whiteSpace: 'nowrap' }}>{item.date}</span>
              </div>
            )
          })
        )}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        Arco Design 고급 검색 패턴 — 텍스트 + 타입/상태 칩 필터 결합
      </div>
    </div>
  )
}

export const Arco_고급_필터_결합_검색: Story = {
  name: 'Arco Design - 고급 필터 결합 검색',
  parameters: {
    docs: {
      description: {
        story:
          'Arco Design 엔터프라이즈 검색 패턴. 텍스트 검색 + 타입 필터(Task/Bug/Docs/Feat) + 상태 필터(오픈/진행중/리뷰/완료)를 결합. 각 필터는 토글로 작동하고 결과 수를 실시간 표시합니다.',
      },
    },
  },
  render: () => <ArcoAdvancedFilterRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui + Arco Design 벤치마크: 퍼지 하이라이트 검색
   shadcn/ui의 highlight 매칭 + Arco의 스코어링 패턴 — 검색어 문자를
   개별적으로 강조 표시하는 고급 UX 패턴.
-------------------------------------------------------------------------- */
const FUZZY_ITEMS = [
  { id: 'f1', label: 'DataTable', category: '데이터 표시', desc: '정렬/필터/선택 가능한 데이터 테이블' },
  { id: 'f2', label: 'DatePicker', category: '입력', desc: '날짜 선택 캘린더 컴포넌트' },
  { id: 'f3', label: 'Dropdown', category: '입력', desc: '선택 드롭다운 메뉴' },
  { id: 'f4', label: 'Dialog', category: '오버레이', desc: '모달 대화 상자' },
  { id: 'f5', label: 'Divider', category: '레이아웃', desc: '구분선 컴포넌트' },
  { id: 'f6', label: 'DrawerPanel', category: '오버레이', desc: '슬라이드 패널' },
]

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const parts: React.ReactNode[] = []
  let lastIdx = 0
  let qIdx = 0

  for (let i = 0; i < text.length && qIdx < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[qIdx]) {
      if (i > lastIdx) parts.push(text.slice(lastIdx, i))
      parts.push(
        <mark key={i} style={{ background: '#fef3c7', color: '#92400e', borderRadius: 2, padding: '0 1px', fontWeight: 700 }}>
          {text[i]}
        </mark>
      )
      lastIdx = i + 1
      qIdx++
    }
  }

  if (lastIdx < text.length) parts.push(text.slice(lastIdx))
  return <>{parts}</>
}

const ShadcnArcoFuzzySearchRender = () => {
  const [query, setQuery] = useState('dt')

  const scored = FUZZY_ITEMS
    .map((item) => {
      const lowerLabel = item.label.toLowerCase()
      const lowerQuery = query.toLowerCase()
      let score = 0
      let qi = 0
      for (let i = 0; i < lowerLabel.length && qi < lowerQuery.length; i++) {
        if (lowerLabel[i] === lowerQuery[qi]) { score++; qi++ }
      }
      const matched = qi === lowerQuery.length
      return { ...item, score, matched }
    })
    .filter((item) => !query || item.matched)
    .sort((a, b) => b.score - a.score)

  return (
    <div style={{ width: 420 }}>
      <div style={{ marginBottom: 8 }}>
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='퍼지 검색 (예: "dt" → DataTable, DrawerPanel)'
        />
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10 }}>
        쿼리의 각 문자가 순서대로 포함된 결과를 찾습니다 (fuzzy match)
      </div>

      <div style={{ borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {scored.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
            결과 없음
          </div>
        ) : (
          scored.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '11px 14px',
                borderBottom: i < scored.length - 1 ? '1px solid #f8fafc' : 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 2 }}>
                  {highlightMatch(item.label, query)}
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.desc}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {item.category}
                </span>
                {query && (
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#6366f1' }}>
                    점수: {item.score}/{query.length}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8' }}>
        shadcn/ui + Arco 퍼지 매칭 패턴 — 문자 순서 매칭 + 노란 하이라이트
      </div>
    </div>
  )
}

export const shadcn_Arco_퍼지_하이라이트_검색: Story = {
  name: 'shadcn/ui + Arco - 퍼지 하이라이트 검색',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui 문자 하이라이트 + Arco 스코어링 패턴. 검색어 문자를 순서대로 매칭해 각 글자를 개별 강조 표시. 점수가 높은 순서로 정렬됩니다. "dt" 입력 시 DataTable, DrawerPanel 등을 찾습니다.',
      },
    },
  },
  render: () => <ShadcnArcoFuzzySearchRender />,
}

// ============================================================
// Cycle 139 — shadcn/ui + Notion Design 벤치마크 반영
// ============================================================

// shadcn/ui 스타일 — 문서 내 검색 (find in page 패턴)
export const Shadcn_문서_내_검색: Story = {
  name: 'shadcn/ui — 문서 내 검색 (Cycle 139)',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui Find in Page 패턴. 검색어 입력 시 문서 내 매칭 위치를 강조 표시. ' +
          '이전/다음 버튼으로 매칭 간 이동 + 현재 위치 카운터 표시. 대소문자 무시.',
      },
    },
  },
  render: function ShadcnFindInPageRender() {
    const CONTENT_139 = [
      '컴포넌트 기반 개발 — Orbit UI는 재사용 가능한 컴포넌트를 중심으로 설계됩니다.',
      '3-tier 토큰 시스템으로 Reference Token, Semantic Token, Component Token을 계층화합니다.',
      '각 컴포넌트는 Storybook으로 문서화되며 TypeScript 타입이 완전히 지원됩니다.',
      'vanilla-extract 기반 테마 시스템으로 빌드 타임에 안전한 CSS-in-JS를 제공합니다.',
      '컴포넌트 API는 Compound Component 패턴으로 유연한 조합을 지원합니다.',
    ]

    const [query, setQuery] = useState('')
    const [cursor, setCursor] = useState(0)

    const matches: { lineIdx: number; matchIdx: number }[] = []
    if (query) {
      CONTENT_139.forEach((line, lineIdx) => {
        let searchFrom = 0
        for (;;) {
          const pos = line.toLowerCase().indexOf(query.toLowerCase(), searchFrom)
          if (pos === -1) break
          matches.push({ lineIdx, matchIdx: pos })
          searchFrom = pos + 1
        }
      })
    }

    const totalMatches = matches.length
    const safeIdx = totalMatches > 0 ? cursor % totalMatches : 0

    function highlight(line: string, lineIdx: number) {
      if (!query) return <span>{line}</span>
      const parts: React.ReactNode[] = []
      let last = 0
      let matchCount = 0
      let searchFrom = 0
      for (;;) {
        const pos = line.toLowerCase().indexOf(query.toLowerCase(), searchFrom)
        if (pos === -1) break
        const globalIdx = matches.findIndex((m, i) => m.lineIdx === lineIdx && i >= matchCount)
        parts.push(<span key={last}>{line.slice(last, pos)}</span>)
        const isCurrent = matches[safeIdx]?.lineIdx === lineIdx && matches.findIndex((m) => m.lineIdx === lineIdx && m.matchIdx === pos) === safeIdx
        parts.push(<mark key={pos} style={{ background: isCurrent ? '#fbbf24' : '#fef9c3', borderRadius: 2, padding: '0 1px' }}>{line.slice(pos, pos + query.length)}</mark>)
        last = pos + query.length
        searchFrom = pos + 1
        matchCount++
        void globalIdx
      }
      parts.push(<span key="last">{line.slice(last)}</span>)
      return <>{parts}</>
    }

    return (
      <div style={{ width: 460, fontFamily: 'system-ui, sans-serif' }}>
        {/* 검색 바 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <SearchBar
              value={query}
              placeholder="문서에서 검색..."
              onChange={(e) => { setQuery((e.target as HTMLInputElement).value); setCursor(0) }}
            />
          </div>
          {totalMatches > 0 && (
            <>
              <span style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap' }}>{safeIdx + 1}/{totalMatches}</span>
              <button onClick={() => setCursor((c) => (c - 1 + totalMatches) % totalMatches)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: 'pointer' }}>↑</button>
              <button onClick={() => setCursor((c) => (c + 1) % totalMatches)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, cursor: 'pointer' }}>↓</button>
            </>
          )}
          {query && totalMatches === 0 && (
            <span style={{ fontSize: 11, color: '#ef4444', whiteSpace: 'nowrap' }}>결과 없음</span>
          )}
        </div>
        {/* 문서 내용 */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
          {CONTENT_139.map((line, idx) => (
            <div key={idx} style={{ padding: '10px 14px', borderBottom: idx < CONTENT_139.length - 1 ? '1px solid #f1f5f9' : 'none', fontSize: 13, lineHeight: 1.7, color: '#0f172a' }}>
              {highlight(line, idx)}
            </div>
          ))}
        </div>
      </div>
    )
  },
}

// Notion 스타일 — 블록 타입 필터 검색
const NOTION_BLOCKS_139 = [
  { type: 'text', label: '텍스트', desc: '일반 텍스트 블록', icon: 'T' },
  { type: 'heading1', label: '제목 1', desc: '큰 섹션 헤딩', icon: 'H1' },
  { type: 'heading2', label: '제목 2', desc: '중간 섹션 헤딩', icon: 'H2' },
  { type: 'bullet', label: '글머리 기호', desc: '순서 없는 목록', icon: '•' },
  { type: 'numbered', label: '번호 목록', desc: '순서 있는 목록', icon: '1.' },
  { type: 'toggle', label: '토글', desc: '접을 수 있는 콘텐츠', icon: '▶' },
  { type: 'quote', label: '인용', desc: '인용문 블록', icon: '"' },
  { type: 'code', label: '코드', desc: '코드 블록 (구문 강조)', icon: '</>' },
  { type: 'divider', label: '구분선', desc: '수평선으로 분리', icon: '—' },
  { type: 'callout', label: '콜아웃', desc: '아이콘과 함께 강조', icon: '!' },
  { type: 'table', label: '표', desc: '행과 열로 구성된 테이블', icon: '⊞' },
  { type: 'image', label: '이미지', desc: '이미지 업로드 또는 URL', icon: '▣' },
]

export const Notion_블록_타입_검색: Story = {
  name: 'Notion — 블록 타입 필터 검색 (Cycle 139)',
  parameters: {
    docs: {
      description: {
        story:
          'Notion Block Selector 패턴. 블록 타입(텍스트/제목/목록/코드/표/이미지 등) 검색 필터링. ' +
          '아이콘 + 이름 + 설명 3줄 구조. 검색어 매칭 하이라이트. 키보드 Enter로 선택.',
      },
    },
  },
  render: function NotionBlockSearchRender() {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState<string | null>(null)

    const filtered = query
      ? NOTION_BLOCKS_139.filter((b) => b.label.includes(query) || b.desc.includes(query) || b.type.includes(query))
      : NOTION_BLOCKS_139

    return (
      <div style={{ width: 320, fontFamily: 'system-ui, sans-serif' }}>
        <SearchBar
          value={query}
          placeholder="블록 유형 검색..."
          onChange={(e) => { setQuery((e.target as HTMLInputElement).value); setSelected(null) }}
        />
        <div style={{ marginTop: 6, borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', maxHeight: 300, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>일치하는 블록이 없습니다</div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.type}
                onClick={() => { setSelected(b.type); setQuery(b.label) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', cursor: 'pointer',
                  background: selected === b.type ? '#f0f9ff' : '#fff', borderBottom: '1px solid #f8fafc',
                  transition: 'background 100ms',
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 6, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#475569', flexShrink: 0 }}>{b.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: selected === b.type ? 700 : 500, color: '#0f172a' }}>{b.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{b.desc}</div>
                </div>
                {selected === b.type && <span style={{ marginLeft: 'auto', fontSize: 12, color: '#0ea5e9' }}>✓</span>}
              </div>
            ))
          )}
        </div>
        {selected && (
          <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: '#f0f9ff', border: '1px solid #bae6fd', fontSize: 12, color: '#0369a1' }}>
            선택됨: <strong>{NOTION_BLOCKS_139.find((b) => b.type === selected)?.label}</strong>
          </div>
        )}
      </div>
    )
  },
}

// shadcn/ui + Notion — 전역 검색 + 최근 항목 + 퀵 액션
const GLOBAL_SEARCH_RECENT_139 = [
  { id: 'r1', title: 'Toggle 스토리 추가', type: '최근', icon: '◈', time: '방금 전' },
  { id: 'r2', title: 'BenchmarkComparison.mdx', type: '최근', icon: '◉', time: '5분 전' },
  { id: 'r3', title: 'KanbanBoard 템플릿', type: '최근', icon: '◎', time: '20분 전' },
]

const GLOBAL_SEARCH_ACTIONS_139 = [
  { id: 'a1', label: '새 스토리 생성', shortcut: 'N', color: '#6366f1' },
  { id: 'a2', label: '타입체크 실행', shortcut: 'T', color: '#22c55e' },
  { id: 'a3', label: 'Storybook 빌드', shortcut: 'B', color: '#f59e0b' },
]

const GLOBAL_DOCS_139 = [
  { id: 'd1', title: 'SolidButton', path: 'eclipse/Inputs/Buttons', type: '컴포넌트' },
  { id: 'd2', title: 'DataTable', path: 'eclipse/Data Display', type: '컴포넌트' },
  { id: 'd3', title: '3-Tier Token System', path: 'Docs/DesignToken', type: '문서' },
  { id: 'd4', title: 'Carousel setApi 패턴', path: 'eclipse/Data Display/Carousel', type: '컴포넌트' },
]

export const Shadcn_Notion_전역_검색: Story = {
  name: 'shadcn/ui + Notion — 전역 검색 + 퀵 액션 (Cycle 139)',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui + Notion 전역 검색 패턴. 최근 항목 / 컴포넌트 문서 / 퀵 액션 3개 섹션. ' +
          '검색어 없으면 최근 항목 + 퀵 액션 표시, 입력 시 실시간 문서 필터링.',
      },
    },
  },
  render: function ShadcnNotionGlobalSearchRender() {
    const [query, setQuery] = useState('')

    const filteredDocs = query
      ? GLOBAL_DOCS_139.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()) || d.path.toLowerCase().includes(query.toLowerCase()))
      : []

    return (
      <div style={{ width: 420, fontFamily: 'system-ui, sans-serif' }}>
        <SearchBar
          value={query}
          placeholder="검색하거나 명령을 입력하세요..."
          onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
        />
        <div style={{ marginTop: 6, borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          {!query ? (
            <>
              {/* 최근 항목 */}
              <div style={{ padding: '8px 12px 4px', fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.5 }}>최근 항목</div>
              {GLOBAL_SEARCH_RECENT_139.map((r) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f8fafc' }}>
                  <span style={{ fontSize: 15, color: '#64748b' }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.type} · {r.time}</div>
                  </div>
                </div>
              ))}
              {/* 퀵 액션 */}
              <div style={{ padding: '8px 12px 4px', fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.5, borderTop: '1px solid #f1f5f9' }}>빠른 작업</div>
              {GLOBAL_SEARCH_ACTIONS_139.map((a) => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f8fafc' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: a.color }}>{a.shortcut}</div>
                  <span style={{ fontSize: 13, color: '#0f172a' }}>{a.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8', border: '1px solid #e2e8f0', borderRadius: 4, padding: '1px 5px', fontFamily: 'monospace' }}>{a.shortcut}</span>
                </div>
              ))}
            </>
          ) : (
            <>
              {filteredDocs.length > 0 ? (
                <>
                  <div style={{ padding: '8px 12px 4px', fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.5 }}>검색 결과</div>
                  {filteredDocs.map((d) => (
                    <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f8fafc' }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: d.type === '컴포넌트' ? '#eef2ff' : '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: d.type === '컴포넌트' ? '#6366f1' : '#16a34a' }}>
                        {d.type === '컴포넌트' ? 'C' : 'D'}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{d.title}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{d.path}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>
                  &ldquo;{query}&rdquo;에 대한 결과가 없습니다
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Cycle 164 — Google Material 3 + shadcn/ui
   Material 3: 검색 바 + 칩 필터 패턴 (Search with Suggestion Chips)
-------------------------------------------------------------------------- */
const M3_SUGGESTIONS = ['Button', 'TextField', 'Modal', 'DataTable', 'Toggle', 'Slider', 'Progress', 'Toast']
const M3_CATEGORIES = ['전체', '입력', '피드백', '내비게이션', '표시']

const M3_COMPONENT_LIST = [
  { name: 'SolidButton', category: '입력', desc: '채워진 스타일 버튼 컴포넌트' },
  { name: 'TextField', category: '입력', desc: '텍스트 입력 필드' },
  { name: 'Modal', category: '피드백', desc: '확인/알림 다이얼로그' },
  { name: 'Toast', category: '피드백', desc: '비침투적 알림 메시지' },
  { name: 'Progress', category: '피드백', desc: '로딩 진행 표시' },
  { name: 'Toggle', category: '입력', desc: '온/오프 전환 스위치' },
  { name: 'AppBar', category: '내비게이션', desc: '상단 앱바 레이아웃' },
  { name: 'DataTable', category: '표시', desc: '데이터 테이블/그리드' },
  { name: 'Slider', category: '입력', desc: '범위 슬라이더 컴포넌트' },
  { name: 'Skeleton', category: '피드백', desc: '로딩 스켈레톤 UI' },
]

function M3SearchWithChipsRender() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('전체')
  const [recentSearches, setRecentSearches] = useState<string[]>(['Button', 'Modal'])

  const addRecent = (term: string) => {
    if (!term.trim()) { return }
    setRecentSearches(prev => [term, ...prev.filter(r => r !== term)].slice(0, 5))
  }

  const filtered = M3_COMPONENT_LIST.filter(c => {
    const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.desc.includes(query)
    const matchCat = activeCategory === '전체' || c.category === activeCategory
    return matchQuery && matchCat
  })

  return (
    <div style={{ width: 400, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Material 3 — 검색 + 제안 칩 패턴</p>
      <div style={{ borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '8px 12px' }}>
          <SearchBar
            placeholder="컴포넌트 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter') { addRecent(query) } }}
          />
        </div>

        {/* M3 Suggestion Chips */}
        {!query && (
          <div style={{ padding: '0 12px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {M3_SUGGESTIONS.map(s => (
              <button key={s} onClick={() => { setQuery(s); addRecent(s) }} style={{ padding: '4px 12px', borderRadius: 20, border: '1px solid #e5e7eb', background: '#f8fafc', color: '#475569', fontSize: 11, cursor: 'pointer', fontWeight: 500, transition: 'all 100ms' }}>{s}</button>
            ))}
          </div>
        )}

        {/* Category chips (M3 Filter Chip) */}
        <div style={{ padding: '0 12px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {M3_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '4px 12px', borderRadius: 20, border: `1.5px solid ${activeCategory === cat ? '#6366f1' : '#e5e7eb'}`, background: activeCategory === cat ? '#eef2ff' : 'transparent', color: activeCategory === cat ? '#4338ca' : '#64748b', fontSize: 11, cursor: 'pointer', fontWeight: activeCategory === cat ? 700 : 400, transition: 'all 150ms' }}>{cat}</button>
          ))}
        </div>

        {/* Results */}
        <div style={{ borderTop: '1px solid #f1f5f9', maxHeight: 200, overflowY: 'auto' }}>
          {filtered.length > 0 ? filtered.map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderBottom: '1px solid #f8fafc' }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#6366f1', flexShrink: 0 }}>{c.name[0]}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{c.name}</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>{c.desc}</div>
              </div>
              <div style={{ marginLeft: 'auto', flexShrink: 0 }}><Chip>{c.category}</Chip></div>
            </div>
          )) : (
            <div style={{ padding: '20px', textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>결과 없음</div>
          )}
        </div>
      </div>
      {recentSearches.length > 0 && (
        <div style={{ marginTop: 8, fontSize: 10, color: '#94a3b8' }}>최근: {recentSearches.join(' · ')}</div>
      )}
    </div>
  )
}

export const Material3_검색_칩_필터_패턴: Story = {
  name: 'Google Material 3 — 검색 + 제안/필터 칩 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Material 3 Search + Suggestion Chip + Filter Chip 패턴. 검색어 입력 전 제안 칩 표시, 카테고리 필터 칩(Filter Chip), 검색 결과 + Chip 배지 조합. M3 색상 역할 시스템 적용.',
      },
    },
  },
  render: () => <M3SearchWithChipsRender />,
}

/* --------------------------------------------------------------------------
   shadcn/ui: 전역 검색 + 스코프 선택 패턴
-------------------------------------------------------------------------- */
const SHADCN_SEARCH_SCOPES = ['전체', '컴포넌트', '문서', '예시']
const SHADCN_SCOPE_RESULTS: Record<string, Array<{ title: string; desc: string; icon: string }>> = {
  '전체': [
    { title: 'SolidButton', desc: 'packages/theme-eclipse/src/components', icon: '◆' },
    { title: 'Button 사용 가이드', desc: 'docs/components/button', icon: '📄' },
    { title: 'Button with Icon 예시', desc: 'storybook/examples', icon: '✦' },
  ],
  '컴포넌트': [
    { title: 'SolidButton', desc: 'Primary 버튼 컴포넌트', icon: '◆' },
    { title: 'OutlineButton', desc: 'Outlined 버튼 컴포넌트', icon: '◆' },
    { title: 'GhostButton', desc: 'Ghost 버튼 컴포넌트', icon: '◆' },
  ],
  '문서': [
    { title: 'Button 사용 가이드', desc: 'GettingStarted.mdx', icon: '📄' },
    { title: 'Theme Architecture', desc: 'Architecture.mdx', icon: '📄' },
  ],
  '예시': [
    { title: 'Button with Icon 예시', desc: 'Leading + Trailing Icon', icon: '✦' },
    { title: 'Loading State 예시', desc: 'Button.Loading 슬롯', icon: '✦' },
  ],
}

function ShadcnGlobalSearchRender() {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState('전체')

  const results = (SHADCN_SCOPE_RESULTS[scope] ?? []).filter(r =>
    !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{ width: 400, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>shadcn/ui — 전역 검색 + 스코프 선택</p>
      <div style={{ borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '8px 12px 0' }}>
          <SearchBar
            placeholder="전체 검색 (⌘ K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Scope tabs (shadcn/ui TabsList 패턴) */}
        <div style={{ display: 'flex', padding: '6px 12px', gap: 0, borderBottom: '1px solid #f1f5f9' }}>
          {SHADCN_SEARCH_SCOPES.map(s => (
            <button key={s} onClick={() => setScope(s)} style={{ flex: 1, padding: '5px 0', fontSize: 11, border: 'none', background: 'transparent', cursor: 'pointer', color: scope === s ? '#6366f1' : '#64748b', fontWeight: scope === s ? 700 : 400, borderBottom: scope === s ? '2px solid #6366f1' : '2px solid transparent', transition: 'all 150ms' }}>{s}</button>
          ))}
        </div>

        {/* Results */}
        <div style={{ maxHeight: 200, overflowY: 'auto' }}>
          {results.length > 0 ? results.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid #f8fafc', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f8fafc' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '' }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#6366f1', flexShrink: 0 }}>{r.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{r.title}</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>{r.desc}</div>
              </div>
            </div>
          )) : (
            <div style={{ padding: '20px', textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>
              &ldquo;{query}&rdquo; 결과 없음 ({scope})
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Shadcn_전역_검색_스코프_선택: Story = {
  name: 'shadcn/ui — 전역 검색 + 스코프 선택 패턴',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui 전역 검색 패턴. SearchBar + 스코프 탭(전체/컴포넌트/문서/예시) 조합. 탭 전환으로 검색 스코프 변경, 스코프별 결과 아이콘 차별화. shadcn/ui 공식 문서 검색 UX 모방.',
      },
    },
  },
  render: () => <ShadcnGlobalSearchRender />,
}

/* --------------------------------------------------------------------------
   Material 3 + shadcn/ui: 복합 실시간 검색 + 히스토리 관리 패턴
-------------------------------------------------------------------------- */
const M3_TRENDING = ['SolidButton', 'DataTable', 'TextField', 'Progress']

function M3ShadcnSearchHistoryRender() {
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState<string[]>(['Modal', 'Toggle', 'Chip'])
  const [focused, setFocused] = useState(false)

  const suggestions = query
    ? M3_COMPONENT_LIST.filter(c => c.name.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
    : []

  const handleSelect = (term: string) => {
    setQuery(term)
    setHistory(prev => [term, ...prev.filter(h => h !== term)].slice(0, 8))
    setFocused(false)
  }

  const removeHistory = (term: string) => {
    setHistory(prev => prev.filter(h => h !== term))
  }

  return (
    <div style={{ width: 380, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Material 3 + shadcn/ui — 검색 히스토리 관리</p>
      <div style={{ position: 'relative' }}>
        <SearchBar
          placeholder="컴포넌트 이름으로 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
        />

        {/* Dropdown panel */}
        {focused && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20, marginTop: 4, borderRadius: 12, background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            {/* Auto-complete suggestions */}
            {suggestions.length > 0 && (
              <div style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '4px 12px' }}>자동완성</div>
                {suggestions.map(c => (
                  <button key={c.name} onMouseDown={() => handleSelect(c.name)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>◆</span>
                    <span style={{ fontSize: 12, color: '#1e293b' }}><strong style={{ color: '#6366f1' }}>{c.name.slice(0, query.length)}</strong>{c.name.slice(query.length)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Trending — M3 패턴 */}
            {!query && (
              <div style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '4px 12px' }}>트렌딩</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '4px 12px' }}>
                  {M3_TRENDING.map(t => (
                    <button key={t} onMouseDown={() => handleSelect(t)} style={{ padding: '4px 10px', borderRadius: 16, border: '1px solid #e5e7eb', background: '#f8fafc', color: '#475569', fontSize: 11, cursor: 'pointer' }}>{t}</button>
                  ))}
                </div>
              </div>
            )}

            {/* History — shadcn/ui 패턴 */}
            {history.length > 0 && !query && (
              <div style={{ padding: '6px 0' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '4px 12px' }}>최근 검색</div>
                {history.map(h => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', padding: '7px 12px' }}>
                    <button onMouseDown={() => handleSelect(h)} style={{ flex: 1, border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: 12, color: '#374151' }}>🕐 {h}</button>
                    <button onMouseDown={() => removeHistory(h)} style={{ border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 12, padding: '0 4px' }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export const M3_Shadcn_검색_히스토리_관리: Story = {
  name: 'Material 3 + shadcn/ui — 실시간 검색 + 히스토리 관리',
  parameters: {
    docs: {
      description: {
        story: 'Material 3 검색 트렌딩 + shadcn/ui 자동완성 패턴 결합. 포커스 시 트렌딩/히스토리 드롭다운, 입력 시 자동완성(매칭 텍스트 강조), 히스토리 삭제. 검색 경험의 3단계(트렌딩→자동완성→히스토리 관리) 완성.',
      },
    },
  },
  render: () => <M3ShadcnSearchHistoryRender />,
}
