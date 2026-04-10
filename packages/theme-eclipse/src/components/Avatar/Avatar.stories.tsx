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

/* --------------------------------------------------------------------------
   shadcn/ui 벤치마크: 팀 멤버 목록 패턴
   shadcn/ui Avatar Group + AvatarStack — 멤버 오버레이 그룹 UI
-------------------------------------------------------------------------- */
const TEAM_MEMBERS = [
  { name: 'Alice Kim', color: '#6366f1' },
  { name: 'Bob Lee', color: '#f59e0b' },
  { name: 'Carol Park', color: '#10b981' },
  { name: 'David Choi', color: '#ef4444' },
  { name: 'Emma Yoon', color: '#8b5cf6' },
]

export const shadcn_팀_멤버_그룹 = {
  name: 'shadcn/ui - 팀 멤버 오버레이 그룹',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 340 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>프로젝트 팀</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Avatar stack — overlap */}
        <div style={{ display: 'flex' }}>
          {TEAM_MEMBERS.map((m, i) => (
            <div
              key={m.name}
              title={m.name}
              style={{
                marginLeft: i === 0 ? 0 : -10,
                zIndex: TEAM_MEMBERS.length - i,
                position: 'relative',
              }}
            >
              <Avatar style={{ width: 36, height: 36, fontSize: 12, border: '2px solid #fff' }}>
                <Avatar.Fallback style={{ background: m.color, color: '#fff', fontSize: 12, fontWeight: 700 }}>
                  {m.name.split(' ').map((n) => n[0]).join('')}
                </Avatar.Fallback>
              </Avatar>
            </div>
          ))}
          <div
            style={{
              marginLeft: -10,
              zIndex: 0,
              position: 'relative',
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#f1f5f9',
              border: '2px solid #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: '#64748b',
            }}
          >
            +3
          </div>
        </div>
        <span style={{ marginLeft: 12, fontSize: 13, color: '#64748b' }}>8명 참여 중</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TEAM_MEMBERS.map((m) => (
          <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar style={{ width: 28, height: 28, fontSize: 11 }}>
              <Avatar.Fallback style={{ background: m.color, color: '#fff', fontSize: 11, fontWeight: 700 }}>
                {m.name.split(' ').map((n) => n[0]).join('')}
              </Avatar.Fallback>
            </Avatar>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{m.name}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>멤버</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 이슈 담당자 할당 패턴
   Linear assign member — 아바타 + 이름 + 역할 레이블 조합 UI
-------------------------------------------------------------------------- */
const ASSIGNEES = [
  { name: 'Heejun Kim', role: 'Frontend', color: '#6366f1', issues: 5, status: '진행 중' },
  { name: 'Sumin Lee', role: 'Design', color: '#f59e0b', issues: 3, status: '검토 중' },
  { name: 'Jinho Park', role: 'Backend', color: '#10b981', issues: 8, status: '진행 중' },
]

export const Linear_담당자_할당_패널 = {
  name: 'Linear - 이슈 담당자 할당 패널',
  render: function Render() {
    const [selected, setSelected] = React.useState<string | null>(null)
    return (
      <div style={{ maxWidth: 320 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>담당자 선택</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {ASSIGNEES.map((a) => {
            const isSelected = selected === a.name
            return (
              <div
                key={a.name}
                onClick={() => setSelected(isSelected ? null : a.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  border: `1px solid ${isSelected ? a.color + '40' : 'transparent'}`,
                  background: isSelected ? a.color + '08' : 'transparent',
                  transition: 'all 0.15s',
                }}
              >
                <Avatar style={{ width: 28, height: 28, fontSize: 11 }}>
                  <Avatar.Fallback style={{ background: a.color, color: '#fff', fontSize: 11, fontWeight: 700 }}>
                    {a.name.split(' ').map((n) => n[0]).join('')}
                  </Avatar.Fallback>
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{a.role} · 이슈 {a.issues}개</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 12,
                  background: a.status === '진행 중' ? '#6366f108' : '#f59e0b08',
                  color: a.status === '진행 중' ? '#6366f1' : '#f59e0b',
                  border: `1px solid ${a.status === '진행 중' ? '#6366f130' : '#f59e0b30'}`,
                }}>
                  {a.status}
                </span>
              </div>
            )
          })}
        </div>
        {selected && (
          <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 13, color: '#475569' }}>
            <strong>{selected}</strong>이(가) 담당자로 지정되었습니다.
          </div>
        )}
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 사용자 프로필 카드 패턴
   Mantine Avatar + Text + Badge — 소셜 프로필 카드 UI
-------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 색상 스키마 아바타 그리드
   Chakra UI의 colorScheme prop 시스템 — semantic colors × size 매트릭스
   각 배경 색상이 의미론적 역할을 가지는 아바타 그리드 패턴
-------------------------------------------------------------------------- */
const CHAKRA_COLORS = [
  { label: 'primary', bg: '#6366f1', text: '#fff', initials: 'PR' },
  { label: 'success', bg: '#10b981', text: '#fff', initials: 'SC' },
  { label: 'warning', bg: '#f59e0b', text: '#fff', initials: 'WN' },
  { label: 'error', bg: '#ef4444', text: '#fff', initials: 'ER' },
  { label: 'secondary', bg: '#8b5cf6', text: '#fff', initials: 'SD' },
  { label: 'neutral', bg: '#64748b', text: '#fff', initials: 'NT' },
]

const CHAKRA_SIZES = [
  { label: 'sm', size: 28, fontSize: 10 },
  { label: 'md', size: 40, fontSize: 14 },
  { label: 'lg', size: 56, fontSize: 20 },
]

export const Chakra_색상_스키마_아바타: Story = {
  name: 'Chakra UI - colorScheme × size 매트릭스',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI colorScheme × size prop 매트릭스 패턴. ' +
          '시맨틱 색상 역할(primary/success/warning/error/secondary/neutral)과 크기(sm/md/lg)의 9가지 조합을 시각화합니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {CHAKRA_SIZES.map((size) => (
        <div key={size.label}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 10, letterSpacing: '0.05em' }}>
            SIZE — {size.label.toUpperCase()}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {CHAKRA_COLORS.map((color) => (
              <div key={color.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Avatar
                  style={{
                    width: size.size, height: size.size,
                    borderRadius: '50%',
                    backgroundColor: color.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Avatar.Fallback
                    style={{
                      background: color.bg, color: color.text,
                      fontSize: size.fontSize, fontWeight: 800,
                    }}
                  >
                    {color.initials}
                  </Avatar.Fallback>
                </Avatar>
                <span style={{ fontSize: 9, color: '#94a3b8', fontWeight: 500 }}>{color.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Chakra UI colorScheme prop 패턴 — semantic color × size 매트릭스
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Material 3 벤치마크: 상태 레이어 + 프레즌스 인디케이터
   M3의 state layer 시스템(idle/hover/active) + 프레즌스 상태 표시 패턴
   아바타 호버 시 8% → 16% 오버레이로 상태를 표현하는 M3 패턴
-------------------------------------------------------------------------- */
type PresenceStatus = 'online' | 'away' | 'busy' | 'offline'

const presenceConfig: Record<PresenceStatus, { color: string; label: string }> = {
  online:  { color: '#10b981', label: '온라인' },
  away:    { color: '#f59e0b', label: '자리비움' },
  busy:    { color: '#ef4444', label: '방해금지' },
  offline: { color: '#94a3b8', label: '오프라인' },
}

const M3_TEAM: { initials: string; name: string; role: string; bg: string; status: PresenceStatus }[] = [
  { initials: 'KM', name: '김민지', role: 'Frontend', bg: '#6366f1', status: 'online' },
  { initials: 'LD', name: '이동욱', role: 'Backend', bg: '#8b5cf6', status: 'busy' },
  { initials: 'PS', name: '박소연', role: 'Design', bg: '#ec4899', status: 'away' },
  { initials: 'CJ', name: '최준호', role: 'DevOps', bg: '#10b981', status: 'online' },
  { initials: 'JH', name: '정하은', role: 'QA', bg: '#f59e0b', status: 'offline' },
]

export const M3_상태_레이어_프레즌스: Story = {
  name: 'Material 3 - 상태 레이어 + 프레즌스 인디케이터',
  parameters: {
    docs: {
      description: {
        story:
          'Material 3 state layer 시스템. 아바타 hover 시 8% 오버레이, active 시 16% 오버레이로 상태를 시각화합니다. ' +
          '프레즌스 인디케이터(online/away/busy/offline)로 실시간 상태를 표시합니다.',
      },
    },
  },
  render: function Render() {
    const [hovered, setHovered] = React.useState<string | null>(null)

    return (
      <div style={{ maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>팀원 현황</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {M3_TEAM.map((member) => {
            const pCfg = presenceConfig[member.status]
            const isHover = hovered === member.initials
            return (
              <div
                key={member.initials}
                onMouseEnter={() => setHovered(member.initials)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                  borderRadius: 12,
                  background: isHover ? 'rgba(99,102,241,0.08)' : '#fff',
                  border: '1px solid #f1f5f9',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Avatar
                    style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: member.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    <Avatar.Fallback
                      style={{ background: member.bg, color: '#fff', fontSize: 15, fontWeight: 800 }}
                    >
                      {member.initials}
                    </Avatar.Fallback>
                    {/* M3 state layer */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `rgba(255,255,255,${isHover ? 0.16 : 0})`,
                      transition: 'background 0.15s',
                      borderRadius: '50%',
                    }} />
                  </Avatar>
                  {/* Presence dot */}
                  <div style={{
                    position: 'absolute', bottom: 1, right: 1,
                    width: 12, height: 12, borderRadius: '50%',
                    background: pCfg.color, border: '2px solid #fff',
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{member.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{member.role}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                  background: pCfg.color + '15', color: pCfg.color,
                }}>
                  {pCfg.label}
                </span>
              </div>
            )
          })}
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8' }}>
          M3 state layer 패턴 — hover 8%, active 16% 오버레이 + 프레즌스 인디케이터
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Chakra + M3 조합: 팀 디렉토리 부서별 그룹
   Chakra UI의 Stack composition + M3의 컨테이너 색상 역할을 결합한
   부서별로 그룹화된 팀 디렉토리 패턴
-------------------------------------------------------------------------- */
type DeptMember = { initials: string; name: string; role: string; bg: string }

const DEPT_DATA: { dept: string; containerBg: string; borderColor: string; members: DeptMember[] }[] = [
  {
    dept: 'Design System',
    containerBg: '#eef2ff',
    borderColor: '#c7d2fe',
    members: [
      { initials: 'KM', name: '김민지', role: 'Lead', bg: '#6366f1' },
      { initials: 'PS', name: '박소연', role: 'Designer', bg: '#8b5cf6' },
    ],
  },
  {
    dept: 'Platform',
    containerBg: '#f0fdf4',
    borderColor: '#bbf7d0',
    members: [
      { initials: 'LD', name: '이동욱', role: 'Lead', bg: '#10b981' },
      { initials: 'JH', name: '정하은', role: 'Engineer', bg: '#059669' },
      { initials: 'HW', name: '황태양', role: 'Intern', bg: '#34d399' },
    ],
  },
  {
    dept: 'Infrastructure',
    containerBg: '#fffbeb',
    borderColor: '#fde68a',
    members: [
      { initials: 'CJ', name: '최준호', role: 'Lead', bg: '#f59e0b' },
    ],
  },
]

export const Chakra_M3_팀_디렉토리: Story = {
  name: 'Chakra + M3 - 팀 디렉토리 부서별 그룹',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Stack composition + M3 container color role 패턴. ' +
          '각 부서가 M3의 컨테이너 색상(primaryContainer/secondaryContainer/tertiaryContainer)으로 시각적으로 구분됩니다.',
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>팀 디렉토리</div>
      {DEPT_DATA.map((dept) => (
        <div
          key={dept.dept}
          style={{
            borderRadius: 12,
            background: dept.containerBg,
            border: `1px solid ${dept.borderColor}`,
            padding: '14px 16px',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 12, letterSpacing: '0.05em' }}>
            {dept.dept.toUpperCase()} · {dept.members.length}명
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {dept.members.map((m) => (
              <div key={m.initials} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar
                  style={{
                    width: 36, height: 36, borderRadius: '50%', background: m.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Avatar.Fallback
                    style={{ background: m.bg, color: '#fff', fontSize: 12, fontWeight: 800 }}
                  >
                    {m.initials}
                  </Avatar.Fallback>
                </Avatar>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{m.name}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Chakra Stack composition + M3 container color role 패턴
      </div>
    </div>
  ),
}

export const Mantine_프로필_카드 = {
  name: 'Mantine - 사용자 프로필 카드',
  render: () => (
    <div
      style={{
        maxWidth: 300,
        borderRadius: 16,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}
    >
      {/* Cover */}
      <div style={{ height: 80, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
      {/* Profile */}
      <div style={{ padding: '0 20px 20px', marginTop: -24 }}>
        <div style={{ marginBottom: 12 }}>
          <Avatar style={{ width: 56, height: 56, fontSize: 18, border: '3px solid #fff', boxSizing: 'border-box' }}>
            <Avatar.Fallback style={{ background: '#6366f1', color: '#fff', fontSize: 18, fontWeight: 800 }}>
              HJ
            </Avatar.Fallback>
          </Avatar>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Heejun Kim</div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>@heejun · Frontend Engineer</div>
        <div style={{ fontSize: 13, color: '#475569', marginTop: 10, lineHeight: 1.6 }}>
          Orbit UI 디자인 시스템을 만들고 있습니다. React, TypeScript, Vanilla-Extract 애호가.
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
          {[{ label: '팔로워', value: '1.2K' }, { label: '팔로잉', value: '384' }, { label: '프로젝트', value: '27' }].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   MUI — 배지 아바타 그룹 (Cycle 117)
   MUI AvatarGroup + Badge 패턴 — 온라인 상태 인디케이터
-------------------------------------------------------------------------- */
export const MUI_배지_아바타_그룹: Story = {
  name: 'MUI — 배지 아바타 그룹 (Cycle 117)',
  parameters: {
    docs: {
      description: {
        story:
          'MUI AvatarGroup + Badge 패턴. 온라인/오프라인/자리비움 상태 인디케이터, 오버랩 그룹, +N 더보기 표시.',
      },
    },
  },
  render: () => {
    const members = [
      { initials: 'KJ', color: '#6366f1', status: 'online' as const },
      { initials: 'PM', color: '#8b5cf6', status: 'online' as const },
      { initials: 'LS', color: '#10b981', status: 'away' as const },
      { initials: 'CH', color: '#f59e0b', status: 'offline' as const },
      { initials: 'YR', color: '#ef4444', status: 'online' as const },
    ]
    const statusColor = { online: '#10b981', away: '#f59e0b', offline: '#94a3b8' }
    const statusLabel = { online: '온라인', away: '자리비움', offline: '오프라인' }
    const maxVisible = 4
    const visible = members.slice(0, maxVisible)
    const extra = members.length - maxVisible
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
        {/* Overlapping group */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>팀 멤버 ({members.length}명)</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {visible.map((m, i) => (
              <div key={m.initials} style={{ position: 'relative', marginLeft: i === 0 ? 0 : -10, zIndex: visible.length - i }}>
                <Avatar style={{ width: 40, height: 40, border: '2px solid var(--sem-eclipse-color-backgroundPrimary)' }}>
                  <Avatar.Fallback style={{ background: m.color, color: '#fff', fontSize: 13, fontWeight: 700 }}>
                    {m.initials}
                  </Avatar.Fallback>
                </Avatar>
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%', background: statusColor[m.status], border: '2px solid var(--sem-eclipse-color-backgroundPrimary)' }} />
              </div>
            ))}
            {extra > 0 && (
              <div style={{ marginLeft: -10, width: 40, height: 40, borderRadius: '50%', background: 'var(--sem-eclipse-color-backgroundSecondary)', border: '2px solid var(--sem-eclipse-color-backgroundPrimary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundSecondary)' }}>
                +{extra}
              </div>
            )}
          </div>
        </div>
        {/* Status list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {members.map((m) => (
            <div key={m.initials} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <Avatar style={{ width: 32, height: 32 }}>
                  <Avatar.Fallback style={{ background: m.color, color: '#fff', fontSize: 11, fontWeight: 700 }}>
                    {m.initials}
                  </Avatar.Fallback>
                </Avatar>
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%', background: statusColor[m.status], border: '2px solid var(--sem-eclipse-color-backgroundPrimary)' }} />
              </div>
              <span style={{ fontSize: 13, color: 'var(--sem-eclipse-color-foregroundPrimary)', flex: 1 }}>{m.initials}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: statusColor[m.status] }}>{statusLabel[m.status]}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Chakra UI — 사이즈 변형 아바타 쇼케이스 (Cycle 117)
   Chakra Avatar의 size variant 시스템 — xs/sm/md/lg/xl
-------------------------------------------------------------------------- */
export const Chakra_사이즈_변형_아바타: Story = {
  name: 'Chakra UI — 사이즈 변형 아바타 (Cycle 117)',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Avatar의 size variant 패턴. xs(24px)~xl(72px) 크기 계층, 각 사이즈에 적절한 폰트 크기 비율 적용.',
      },
    },
  },
  render: () => {
    const sizes = [
      { label: 'xs', px: 24, font: 10 },
      { label: 'sm', px: 32, font: 12 },
      { label: 'md', px: 40, font: 14 },
      { label: 'lg', px: 52, font: 17 },
      { label: 'xl', px: 72, font: 22 },
    ]
    return (
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          {sizes.map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Avatar style={{ width: s.px, height: s.px }}>
                <Avatar.Fallback style={{ background: '#6366f1', color: '#fff', fontSize: s.font, fontWeight: 700 }}>
                  OR
                </Avatar.Fallback>
              </Avatar>
              <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', fontFamily: 'monospace' }}>{s.label}</span>
              <span style={{ fontSize: 10, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{s.px}px</span>
            </div>
          ))}
        </div>
        {/* With image fallback showcase */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          {sizes.map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Avatar style={{ width: s.px, height: s.px }}>
                <Avatar.Image src="broken-url.jpg" alt={`avatar-${s.label}`} />
                <Avatar.Fallback style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', fontSize: s.font, fontWeight: 700 }}>
                  UI
                </Avatar.Fallback>
              </Avatar>
              <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', fontFamily: 'monospace' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   MUI + Chakra — 댓글 스레드 아바타 패턴 (Cycle 117)
   아바타를 활용한 소셜 댓글 UI 구성
-------------------------------------------------------------------------- */
export const MUI_Chakra_댓글_스레드: Story = {
  name: 'MUI + Chakra — 댓글 스레드 (Cycle 117)',
  parameters: {
    docs: {
      description: {
        story:
          'MUI + Chakra의 comment thread 패턴. Avatar + timestamp + 좋아요 카운트 조합. 중첩 댓글 구조, 입력 영역 포함.',
      },
    },
  },
  render: () => {
    const comments = [
      {
        initials: 'KJ', color: '#6366f1', name: 'Kim Jihye', time: '2시간 전',
        text: 'EclipseProvider의 다크모드 전환이 정말 자연스럽네요! Toggle 하나로 전체 테마가 바뀌는 게 인상적입니다.',
        likes: 12,
        replies: [
          { initials: 'PM', color: '#8b5cf6', name: 'Park Minjun', time: '1시간 전', text: '동의해요. 시맨틱 토큰 설계가 탄탄해서 가능한 것 같아요.', likes: 5 },
        ],
      },
      {
        initials: 'LS', color: '#10b981', name: 'Lee Soyeon', time: '45분 전',
        text: 'HoverCard 컴포넌트 패턴이 Radix UI와 유사한데 Orbit UI만의 토큰 시스템이 더해져서 훨씬 편리합니다.',
        likes: 8,
        replies: [],
      },
    ]
    return (
      <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
        {comments.map((c) => (
          <div key={c.name}>
            <div style={{ display: 'flex', gap: 10 }}>
              <Avatar style={{ width: 36, height: 36, flexShrink: 0 }}>
                <Avatar.Fallback style={{ background: c.color, color: '#fff', fontSize: 12, fontWeight: 700 }}>
                  {c.initials}
                </Avatar.Fallback>
              </Avatar>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{c.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{c.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--sem-eclipse-color-foregroundSecondary)', lineHeight: 1.6 }}>{c.text}</p>
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>
                  ♡ {c.likes} · 답글
                </div>
              </div>
            </div>
            {c.replies.length > 0 && (
              <div style={{ marginLeft: 46, marginTop: 10, paddingLeft: 14, borderLeft: '2px solid var(--sem-eclipse-color-borderSubtle)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.replies.map((r) => (
                  <div key={r.name} style={{ display: 'flex', gap: 8 }}>
                    <Avatar style={{ width: 28, height: 28, flexShrink: 0 }}>
                      <Avatar.Fallback style={{ background: r.color, color: '#fff', fontSize: 10, fontWeight: 700 }}>
                        {r.initials}
                      </Avatar.Fallback>
                    </Avatar>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)' }}>{r.name}</span>
                        <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>{r.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)', lineHeight: 1.6 }}>{r.text}</p>
                      <div style={{ marginTop: 4, fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>♡ {r.likes}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  },
}
