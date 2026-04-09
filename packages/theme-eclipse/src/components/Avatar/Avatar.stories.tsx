import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './Avatar'

const meta = {
  title: 'eclipse/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Avatar는 사용자 프로필 이미지 또는 대체 텍스트(이니셜)를 표시하는 컴포넌트입니다. ' +
          'Compound 패턴으로 `Avatar.Image`와 `Avatar.Fallback`을 조합해 사용합니다. ' +
          '이미지 로드 실패 시 `Avatar.Fallback`이 자동으로 표시됩니다.',
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Avatar.Image + Avatar.Fallback 조합 패턴. 이미지 로드 실패 시 Fallback이 자동으로 표시됩니다. ' +
          '이미지는 inline SVG로 제공하여 외부 의존성 없이 동작합니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {/* SVG 이미지로 표시 */}
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
          이미지 성공
        </p>
        <Avatar>
          <Avatar.Image
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%236366f1'/%3E%3Ccircle cx='20' cy='16' r='8' fill='%23a5b4fc'/%3E%3Cellipse cx='20' cy='34' rx='13' ry='9' fill='%23a5b4fc'/%3E%3C/svg%3E"
            alt="사용자 프로필"
          />
          <Avatar.Fallback>HJ</Avatar.Fallback>
        </Avatar>
      </div>
      {/* 이미지 없이 Fallback만 */}
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
          Fallback 전용
        </p>
        <Avatar>
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
      </div>
      {/* 잘못된 src -> Fallback 표시 */}
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
          이미지 실패 (Fallback)
        </p>
        <Avatar>
          <Avatar.Image src="/invalid-image.png" alt="실패 이미지" />
          <Avatar.Fallback>FB</Avatar.Fallback>
        </Avatar>
      </div>
    </div>
  ),
}

export const 크기_변형: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar style={{ width: '24px', height: '24px', fontSize: '10px' }}>
        <Avatar.Fallback>XS</Avatar.Fallback>
      </Avatar>
      <Avatar style={{ width: '32px', height: '32px', fontSize: '12px' }}>
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <Avatar style={{ width: '40px', height: '40px', fontSize: '14px' }}>
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>
      <Avatar style={{ width: '56px', height: '56px', fontSize: '18px' }}>
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
      <Avatar style={{ width: '72px', height: '72px', fontSize: '24px' }}>
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>
    </div>
  ),
}

export const 폴백_이니셜: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {[
        { initials: 'KJ', color: '#6366f1' },
        { initials: 'PM', color: '#10b981' },
        { initials: 'LS', color: '#f59e0b' },
        { initials: 'CD', color: '#ef4444' },
        { initials: 'YH', color: '#8b5cf6' },
        { initials: 'OH', color: '#06b6d4' },
      ].map(({ initials, color }) => (
        <Avatar
          key={initials}
          style={{ background: color }}
        >
          <Avatar.Fallback style={{ background: color, color: '#fff', fontWeight: '700' }}>
            {initials}
          </Avatar.Fallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const 이미지_그룹_스택: Story = {
  parameters: {
    docs: {
      description: {
        story: '여러 아바타를 겹쳐 표시하는 그룹 스택 패턴입니다. 팀원 목록이나 좋아요 표시 등에 활용합니다.',
      },
    },
  },
  render: () => {
    const members = [
      { fallback: 'KJ', color: '#6366f1' },
      { fallback: 'PM', color: '#10b981' },
      { fallback: 'LS', color: '#f59e0b' },
      { fallback: 'CD', color: '#ef4444' },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', fontWeight: '600' }}>
            팀원 스택 (4명 + 더보기)
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {members.map(({ fallback, color }, i) => (
              <Avatar
                key={fallback}
                style={{
                  width: '36px',
                  height: '36px',
                  fontSize: '12px',
                  background: color,
                  border: '2px solid var(--sem-eclipse-color-backgroundPrimary, #fff)',
                  marginLeft: i === 0 ? '0' : '-10px',
                  zIndex: members.length - i,
                }}
              >
                <Avatar.Fallback style={{ background: color, color: '#fff', fontWeight: '700' }}>
                  {fallback}
                </Avatar.Fallback>
              </Avatar>
            ))}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#f1f5f9',
                border: '2px solid var(--sem-eclipse-color-backgroundPrimary, #fff)',
                marginLeft: '-10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
                color: '#64748b',
              }}
            >
              +8
            </div>
            <span style={{ marginLeft: '12px', fontSize: '13px', color: '#64748b' }}>
              12명이 참여 중
            </span>
          </div>
        </div>
      </div>
    )
  },
}

export const 온라인_상태_표시: Story = {
  parameters: {
    docs: {
      description: {
        story: '온라인/오프라인/자리비움 상태를 아바타와 함께 표시하는 패턴입니다.',
      },
    },
  },
  render: () => {
    const users = [
      { initials: 'KJ', color: '#6366f1', status: 'online', statusColor: '#22c55e', label: '온라인' },
      { initials: 'PM', color: '#10b981', status: 'away', statusColor: '#f59e0b', label: '자리비움' },
      { initials: 'LS', color: '#f59e0b', status: 'busy', statusColor: '#ef4444', label: '방해금지' },
      { initials: 'CD', color: '#64748b', status: 'offline', statusColor: '#94a3b8', label: '오프라인' },
    ]
    return (
      <div style={{ display: 'flex', gap: '24px' }}>
        {users.map(({ initials, color, statusColor, label }) => (
          <div key={initials} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar style={{ width: '44px', height: '44px', fontSize: '14px', background: color }}>
                <Avatar.Fallback style={{ background: color, color: '#fff', fontWeight: '700' }}>
                  {initials}
                </Avatar.Fallback>
              </Avatar>
              <span
                style={{
                  position: 'absolute',
                  bottom: '1px',
                  right: '1px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: statusColor,
                  border: '2px solid var(--sem-eclipse-color-backgroundPrimary, #fff)',
                }}
              />
            </div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>{label}</span>
          </div>
        ))}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Notion 스타일: 멘션(Mention) UI 패턴
   @사용자 멘션 드롭다운 리스트. Notion의 slash command 스타일로 아바타 + 이름 + 역할 표시.
-------------------------------------------------------------------------- */
const NotionMentionRender = () => {
  const [query, setQuery] = React.useState('@')
  const [selected, setSelected] = React.useState<string | null>(null)

  const members = [
    { id: 'KJ', name: 'Kim Jihye', role: 'Design Lead', color: '#6366f1' },
    { id: 'PM', name: 'Park Minjun', role: 'Frontend Dev', color: '#10b981' },
    { id: 'LS', name: 'Lee Soyeon', role: 'Product Manager', color: '#f59e0b' },
    { id: 'CD', name: 'Choi Dongwook', role: 'Backend Dev', color: '#ef4444' },
    { id: 'YH', name: 'Yoon Haerin', role: 'QA Engineer', color: '#8b5cf6' },
  ]

  const filtered = members.filter(
    (m) =>
      query === '@' ||
      m.name.toLowerCase().includes(query.replace('@', '').toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px' }}>
      {/* 에디터 영역 */}
      <div
        style={{
          padding: '16px',
          borderRadius: '10px',
          border: '1.5px solid #e2e8f0',
          background: '#fff',
          fontSize: '14px',
          color: '#1e293b',
          lineHeight: '1.7',
          minHeight: '64px',
        }}
      >
        <span>다음 스프린트에서 </span>
        {selected && (
          <span
            style={{
              padding: '1px 6px',
              borderRadius: '4px',
              background: 'rgba(99,102,241,0.08)',
              color: '#6366f1',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            @{selected}
          </span>
        )}
        {!selected && (
          <input
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              color: '#6366f1',
              width: '120px',
              background: 'transparent',
            }}
            aria-label="멘션 입력"
          />
        )}
        <span> 님이 담당합니다.</span>
      </div>

      {/* 멘션 드롭다운 */}
      {!selected && (
        <div
          style={{
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            background: '#fff',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '8px 12px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            People
          </div>
          {filtered.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelected(member.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                borderBottom: '1px solid #f8fafc',
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
            >
              <Avatar style={{ width: '28px', height: '28px', fontSize: '10px', background: member.color, flexShrink: 0 }}>
                <Avatar.Fallback style={{ background: member.color, color: '#fff', fontWeight: '700' }}>
                  {member.id}
                </Avatar.Fallback>
              </Avatar>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b' }}>{member.name}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{member.role}</div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: '11px', color: '#cbd5e1' }}>@{member.name.split(' ')[0].toLowerCase()}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
              검색 결과 없음
            </div>
          )}
        </div>
      )}

      {selected && (
        <button
          onClick={() => { setSelected(null); setQuery('@') }}
          style={{
            alignSelf: 'flex-start',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            background: '#fff',
            fontSize: '12px',
            color: '#64748b',
            cursor: 'pointer',
          }}
        >
          멘션 초기화
        </button>
      )}
    </div>
  )
}

export const Notion_멘션_UI: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Notion 스타일 @멘션 드롭다운. 아바타 + 이름 + 역할 조합으로 팀원을 선택하는 패턴입니다.',
      },
    },
  },
  render: () => <NotionMentionRender />,
}

/* --------------------------------------------------------------------------
   Figma Plugin UI: 레이어 목록 패턴
   Figma의 레이어 패널처럼 중첩 인덴트 + 타입 아이콘 + 아바타로 편집자 표시
-------------------------------------------------------------------------- */
const FigmaLayerListRender = () => {
  const [activeLayer, setActiveLayer] = React.useState<string | null>('layer-btn-1')

  type Layer = {
    id: string
    name: string
    type: 'frame' | 'component' | 'text' | 'rect'
    indent: number
    editor?: { id: string; color: string }
  }

  const layers: Layer[] = [
    { id: 'layer-frame-1', name: 'Dashboard Frame', type: 'frame', indent: 0 },
    { id: 'layer-comp-1', name: 'Header', type: 'component', indent: 1, editor: { id: 'KJ', color: '#6366f1' } },
    { id: 'layer-txt-1', name: 'Title / H1', type: 'text', indent: 2 },
    { id: 'layer-rect-1', name: 'Divider', type: 'rect', indent: 2 },
    { id: 'layer-comp-2', name: 'ButtonGroup', type: 'component', indent: 1, editor: { id: 'PM', color: '#10b981' } },
    { id: 'layer-btn-1', name: 'Primary Button', type: 'component', indent: 2 },
    { id: 'layer-btn-2', name: 'Ghost Button', type: 'component', indent: 2 },
    { id: 'layer-frame-2', name: 'Content Area', type: 'frame', indent: 1 },
    { id: 'layer-txt-2', name: 'Body Text', type: 'text', indent: 2, editor: { id: 'LS', color: '#f59e0b' } },
  ]

  const typeIcon = (type: Layer['type']) => {
    const icons: Record<Layer['type'], React.ReactNode> = {
      frame: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="1" width="10" height="10" rx="1" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="1" y1="4" x2="11" y2="4" stroke="#94a3b8" strokeWidth="1" />
          <line x1="4" y1="1" x2="4" y2="11" stroke="#94a3b8" strokeWidth="1" />
        </svg>
      ),
      component: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1L11 6L6 11L1 6L6 1Z" stroke="#8b5cf6" strokeWidth="1.5" />
        </svg>
      ),
      text: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <text x="1" y="10" fontSize="10" fontWeight="700" fill="#3b82f6">T</text>
        </svg>
      ),
      rect: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      ),
    }
    return icons[type]
  }

  return (
    <div
      style={{
        width: '220px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        background: '#fff',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          padding: '8px 12px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '-0.01em' }}>Layers</span>
        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{layers.length}</span>
      </div>

      {/* 레이어 목록 */}
      {layers.map((layer) => {
        const isActive = activeLayer === layer.id
        return (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(isActive ? null : layer.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              width: '100%',
              padding: `5px 8px 5px ${8 + layer.indent * 14}px`,
              background: isActive ? 'rgba(99,102,241,0.08)' : 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              borderBottom: '1px solid #f8fafc',
              transition: 'background 0.1s',
            }}
          >
            <span style={{ flexShrink: 0 }}>{typeIcon(layer.type)}</span>
            <span
              style={{
                fontSize: '11px',
                color: isActive ? '#6366f1' : '#374151',
                fontWeight: isActive ? '600' : '400',
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {layer.name}
            </span>
            {layer.editor && (
              <Avatar
                style={{
                  width: '16px',
                  height: '16px',
                  fontSize: '7px',
                  background: layer.editor.color,
                  flexShrink: 0,
                }}
              >
                <Avatar.Fallback
                  style={{ background: layer.editor.color, color: '#fff', fontWeight: '700' }}
                >
                  {layer.editor.id}
                </Avatar.Fallback>
              </Avatar>
            )}
          </button>
        )
      })}
    </div>
  )
}

export const Figma_레이어_목록: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Figma Plugin UI 레이어 패널 패턴. 중첩 인덴트 + 타입 아이콘 + 편집자 아바타 조합.',
      },
    },
  },
  render: () => <FigmaLayerListRender />,
}

export const 프로필_카드_패턴: Story = {
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui 스타일의 프로필 카드 조합 패턴입니다. Avatar와 텍스트, 버튼을 결합한 실무 사용 예시입니다.',
      },
    },
  },
  render: () => (
    <div
      style={{
        width: '280px',
        borderRadius: '16px',
        border: '1px solid var(--sem-eclipse-color-borderPrimary, #e2e8f0)',
        background: 'var(--sem-eclipse-color-backgroundPrimary, #fff)',
        overflow: 'hidden',
      }}
    >
      <div style={{ height: '80px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ marginTop: '-28px', marginBottom: '12px' }}>
          <Avatar
            style={{
              width: '56px',
              height: '56px',
              fontSize: '20px',
              border: '3px solid var(--sem-eclipse-color-backgroundPrimary, #fff)',
              background: '#6366f1',
            }}
          >
            <Avatar.Fallback style={{ background: '#6366f1', color: '#fff', fontWeight: '700' }}>
              KJ
            </Avatar.Fallback>
          </Avatar>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: '700', color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)' }}>
            Kim Jihye
          </p>
          <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#6366f1', fontWeight: '600' }}>
            Senior Designer
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--sem-eclipse-color-foregroundSecondary, #64748b)', lineHeight: '1.5' }}>
            Design systems, accessibility, and component-driven development.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{
              flex: 1, padding: '8px', borderRadius: '8px',
              background: '#6366f1', color: '#fff', border: 'none',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }}
          >
            팔로우
          </button>
          <button
            style={{
              flex: 1, padding: '8px', borderRadius: '8px',
              background: 'transparent',
              border: '1px solid var(--sem-eclipse-color-borderPrimary, #e2e8f0)',
              color: 'var(--sem-eclipse-color-foregroundPrimary, #0f172a)',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }}
          >
            메시지
          </button>
        </div>
      </div>
    </div>
  ),
}
