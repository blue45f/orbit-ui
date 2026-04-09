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
