import { Flex } from '@heejun-com/core'
import {
  ChevronRightLineIcon,
  DeleteLineIcon,
  LinkIcon,
  CopyLineIcon,
  ShareIcon,
  HeartLineIcon,
  HeartFillIcon,
} from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps, useState } from 'react'

import { GhostButton, GhostButtonProps } from '.'

const iconSize: Record<GhostButtonProps['size'], number> = {
  small: 12,
  large: 14,
}

GhostButton.displayName = 'GhostButton'
GhostButton.Center.displayName = 'GhostButton.Center'
GhostButton.Trailing.displayName = 'GhostButton.Trailing'

const meta = {
  title: 'eclipse/Actions/Buttons/GhostButton',
  component: GhostButton,
  tags: ['autodocs'],
  args: { color: 'black', size: 'large', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'gray'],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof GhostButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  args: {
    size: 'large',
  },
  render: (prop: ComponentProps<typeof GhostButton>) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Ghost Colors</h4>
        <Flex columnGap="24px" alignItems="center" flexWrap="wrap" rowGap="16px">
          <GhostButton {...prop} color="black">
            <GhostButton.Center>Black</GhostButton.Center>
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize[prop.size]} />
            </GhostButton.Trailing>
          </GhostButton>
          <GhostButton {...prop} color="gray">
            <GhostButton.Center>Gray</GhostButton.Center>
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize[prop.size]} />
            </GhostButton.Trailing>
          </GhostButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 사이즈 = {
  args: {
    color: 'black',
  },
  render: (prop: ComponentProps<typeof GhostButton>) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Ghost Sizes</h4>
        <Flex columnGap="24px" alignItems="center" flexWrap="wrap" rowGap="16px">
          <GhostButton {...prop} size="small">
            <GhostButton.Center>Small</GhostButton.Center>
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize.small} />
            </GhostButton.Trailing>
          </GhostButton>
          <GhostButton {...prop} size="large">
            <GhostButton.Center>Large</GhostButton.Center>
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize.large} />
            </GhostButton.Trailing>
          </GhostButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 디자인QA = {
  args: {
    color: 'black',
    size: 'large',
    trailing: true,
    text: 'Ghost Action',
    disabled: false,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ leading: _leading, trailing, text, ...args }: any) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Interactive Playground</h4>
        <GhostButton {...args}>
          <GhostButton.Center>{text}</GhostButton.Center>
          {trailing && (
            <GhostButton.Trailing>
              <ChevronRightLineIcon size={iconSize[args.size as GhostButtonProps['size']]} />
            </GhostButton.Trailing>
          )}
        </GhostButton>
      </div>
    )
  },
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: Destructive 액션 그룹
   Chakra UI Button variant="ghost" colorScheme="red" 패턴에 대응하는
   GhostButton 조합 — 삭제/위험 액션을 투명 버튼으로 표현
-------------------------------------------------------------------------- */
export const Chakra_Destructive_액션_그룹: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '480px' }}>
      {/* 아이템 삭제 확인 카드 */}
      <div
        style={{
          padding: '20px',
          borderRadius: '12px',
          border: '1.5px solid #fee2e2',
          background: '#fff5f5',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#b91c1c', marginBottom: '6px' }}>
          항목을 삭제하시겠습니까?
        </div>
        <div style={{ fontSize: '13px', color: '#dc2626', marginBottom: '16px' }}>
          이 작업은 되돌릴 수 없으며 모든 데이터가 영구적으로 삭제됩니다.
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <GhostButton color="gray" size="large">
            <GhostButton.Center>취소</GhostButton.Center>
          </GhostButton>
          <GhostButton color="black" size="large">
            <GhostButton.Center>
              <span style={{ color: '#dc2626' }}>삭제</span>
            </GhostButton.Center>
            <GhostButton.Trailing>
              <DeleteLineIcon size={14} color="#dc2626" />
            </GhostButton.Trailing>
          </GhostButton>
        </div>
      </div>

      {/* 인라인 위험 액션 목록 */}
      <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>파일 목록</span>
        </div>
        {['design-tokens.json', 'eclipse-theme.ts', 'component-docs.mdx'].map((file, _i) => (
          <div
            key={file}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            <span style={{ fontSize: '13px', color: '#334155', fontFamily: 'monospace' }}>{file}</span>
            <GhostButton color="gray" size="small">
              <GhostButton.Center>
                <span style={{ color: '#ef4444' }}>삭제</span>
              </GhostButton.Center>
              <GhostButton.Trailing>
                <DeleteLineIcon size={12} color="#ef4444" />
              </GhostButton.Trailing>
            </GhostButton>
          </div>
        ))}
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 링크형 버튼 패턴
   Chakra UI Button variant="link" 패턴 — GhostButton을 링크처럼 사용하는
   인라인 내비게이션, 본문 내 행동 유도, 연관 링크 그룹
-------------------------------------------------------------------------- */
export const Chakra_링크형_버튼: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '480px' }}>
      {/* 인라인 텍스트 링크 패턴 */}
      <div
        style={{
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: '#fff',
        }}
      >
        <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.8', marginBottom: '12px' }}>
          Orbit UI는 3-Tier 토큰 시스템을 채택하고 있습니다. 자세한 내용은{' '}
          <GhostButton color="black" size="small" as="a" href="#">
            <GhostButton.Center>
              <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>디자인 토큰 가이드</span>
            </GhostButton.Center>
            <GhostButton.Trailing>
              <LinkIcon size={12} />
            </GhostButton.Trailing>
          </GhostButton>
          를 참고하세요.
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {['문서 보기', '예시 확인', '마이그레이션 가이드'].map((label) => (
            <GhostButton key={label} color="gray" size="small" as="a" href="#">
              <GhostButton.Center>
                <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>{label}</span>
              </GhostButton.Center>
              <GhostButton.Trailing>
                <ChevronRightLineIcon size={12} />
              </GhostButton.Trailing>
            </GhostButton>
          ))}
        </div>
      </div>

      {/* 공유/복사 액션 패턴 (Chakra ghost 버튼 툴바) */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: '#fff',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
          공유 옵션
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <GhostButton color="black" size="large">
            <GhostButton.Center>링크 복사</GhostButton.Center>
            <GhostButton.Trailing>
              <CopyLineIcon size={14} />
            </GhostButton.Trailing>
          </GhostButton>
          <GhostButton color="black" size="large">
            <GhostButton.Center>공유</GhostButton.Center>
            <GhostButton.Trailing>
              <ShareIcon size={14} />
            </GhostButton.Trailing>
          </GhostButton>
        </div>
      </div>
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Chakra UI 벤치마크: 좋아요 토글 버튼 패턴
   Chakra UI IconButton + isActive 패턴 — GhostButton을 토글 액션으로 사용
   소셜 피드, 피드백 버튼, 컨텐츠 반응 UI
-------------------------------------------------------------------------- */
const LikeToggleRender = () => {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(42)

  const handleLike = () => {
    if (liked) {
      setCount((prev) => prev - 1)
    } else {
      setCount((prev) => prev + 1)
    }
    setLiked((prev) => !prev)
  }

  const items = [
    { id: '1', title: 'Design System 3-Tier Token 발표', likes: 128, liked: false },
    { id: '2', title: 'Chakra UI → Orbit UI 마이그레이션 가이드', likes: 74, liked: true },
    { id: '3', title: 'vanilla-extract 성능 비교 분석', likes: 56, liked: false },
  ]

  const [itemLikes, setItemLikes] = useState(items)

  const toggleItem = (id: string) => {
    setItemLikes((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item,
      ),
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '440px' }}>
      {/* 단일 좋아요 토글 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <GhostButton color={liked ? 'black' : 'gray'} size="large" onClick={handleLike}>
          <GhostButton.Center>
            {liked ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48' }}>
                <HeartFillIcon size={14} color="#e11d48" />
                좋아요 {count}
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
                <HeartLineIcon size={14} color="#64748b" />
                좋아요 {count}
              </span>
            )}
          </GhostButton.Center>
        </GhostButton>
      </div>

      {/* 피드 아이템 좋아요 목록 */}
      <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {itemLikes.map((item, i) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              borderBottom: i < itemLikes.length - 1 ? '1px solid #f1f5f9' : 'none',
              background: '#fff',
            }}
          >
            <span style={{ fontSize: '13px', color: '#1e293b', flex: 1, marginRight: '16px' }}>
              {item.title}
            </span>
            <GhostButton
              color={item.liked ? 'black' : 'gray'}
              size="small"
              onClick={() => toggleItem(item.id)}
            >
              <GhostButton.Center>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: item.liked ? '#e11d48' : '#94a3b8',
                  }}
                >
                  {item.liked ? (
                    <HeartFillIcon size={12} color="#e11d48" />
                  ) : (
                    <HeartLineIcon size={12} color="#94a3b8" />
                  )}
                  {item.likes}
                </span>
              </GhostButton.Center>
            </GhostButton>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Chakra_좋아요_토글_버튼: Story = {
  render: () => <LikeToggleRender />,
}

/* --------------------------------------------------------------------------
   Radix UI 아이콘 액션 툴바 패턴
   Radix Toolbar: 아이콘 버튼을 그룹화, 그룹 사이 구분선, hover 강조
-------------------------------------------------------------------------- */
const RadixIconToolbarRender = () => {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Text formatting toolbar */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>서식 툴바</div>
        <div
          role="toolbar"
          aria-label="텍스트 서식"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            padding: '4px',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            background: '#f8fafc',
          }}
        >
          {/* Format group */}
          {[
            { label: 'Bold', icon: 'B', active: bold, toggle: () => setBold((v) => !v), style: { fontWeight: 800 } },
            { label: 'Italic', icon: 'I', active: italic, toggle: () => setItalic((v) => !v), style: { fontStyle: 'italic' } },
            { label: 'Underline', icon: 'U', active: underline, toggle: () => setUnderline((v) => !v), style: { textDecoration: 'underline' } },
          ].map((btn) => (
            <GhostButton
              key={btn.label}
              color="black"
              size="small"
              aria-pressed={btn.active}
              aria-label={btn.label}
              onClick={btn.toggle}
              style={{ background: btn.active ? '#ede9fe' : 'transparent' }}
            >
              <GhostButton.Center>
                <span style={{ ...btn.style, color: btn.active ? '#6366f1' : '#475569', fontSize: 13 }}>
                  {btn.icon}
                </span>
              </GhostButton.Center>
            </GhostButton>
          ))}

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 4px' }} />

          {/* Action group */}
          {[
            { label: '링크 복사', icon: <LinkIcon size={15} /> },
            { label: '복사', icon: <CopyLineIcon size={15} /> },
            { label: '공유', icon: <ShareIcon size={15} /> },
          ].map((btn) => (
            <GhostButton key={btn.label} color="black" size="small" aria-label={btn.label}>
              <GhostButton.Center>{btn.icon}</GhostButton.Center>
            </GhostButton>
          ))}

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 4px' }} />

          {/* Destructive */}
          <GhostButton color="black" size="small" aria-label="삭제">
            <GhostButton.Center>
              <DeleteLineIcon size={15} style={{ color: '#ef4444' }} />
            </GhostButton.Center>
          </GhostButton>
        </div>
      </div>

      {/* Preview */}
      <div style={{
        padding: '12px 16px',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        fontSize: 14,
        color: '#1e293b',
        fontWeight: bold ? 700 : 400,
        fontStyle: italic ? 'italic' : 'normal',
        textDecoration: underline ? 'underline' : 'none',
        background: '#fff',
      }}>
        Orbit UI 디자인 시스템 — Radix Toolbar 패턴 미리보기
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Radix UI Toolbar 패턴 — aria-pressed로 토글 상태, role=&quot;toolbar&quot;로 접근성 구현
      </div>
    </div>
  )
}

export const Radix_아이콘_툴바: Story = {
  name: 'Radix UI - 아이콘 액션 툴바 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix Toolbar 패턴. role="toolbar" + aria-label, aria-pressed로 접근성 구현. ' +
          '그룹 구분선, 토글 버튼(B/I/U), 액션 버튼, 위험 버튼을 조합한 에디터 툴바입니다.',
      },
    },
  },
  render: () => <RadixIconToolbarRender />,
}

/* --------------------------------------------------------------------------
   Google Material 3 Outlined Button 패턴
   M3 Outlined variant: 외곽선 + 투명 배경, hover 시 Primary 색상 얇게 채움
-------------------------------------------------------------------------- */
const M3OutlinedButtonsRender = () => {
  const actions = [
    { label: '저장', color: '#6750A4', bgHover: 'rgba(103,80,164,0.08)' },
    { label: '공유', color: '#006E1C', bgHover: 'rgba(0,110,28,0.08)' },
    { label: '삭제', color: '#B3261E', bgHover: 'rgba(179,38,30,0.08)' },
    { label: '보관', color: '#006A6A', bgHover: 'rgba(0,106,106,0.08)' },
  ]

  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          M3 Outlined Button (역할별 색상)
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {actions.map((action) => (
            <button
              key={action.label}
              onMouseEnter={() => setHovered(action.label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '10px 24px',
                borderRadius: 100,
                border: `1.5px solid ${action.color}`,
                background: hovered === action.label ? action.bgHover : 'transparent',
                color: action.color,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'background 0.15s, transform 0.1s',
                transform: hovered === action.label ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          GhostButton — Orbit UI 동일 패턴
        </div>
        <Flex columnGap="8px" rowGap="8px" flexWrap="wrap">
          <GhostButton color="black" size="large">
            <GhostButton.Center>저장</GhostButton.Center>
            <GhostButton.Trailing><ChevronRightLineIcon size={16} /></GhostButton.Trailing>
          </GhostButton>
          <GhostButton color="black" size="large">
            <GhostButton.Center>공유</GhostButton.Center>
            <GhostButton.Trailing><ShareIcon size={16} /></GhostButton.Trailing>
          </GhostButton>
          <GhostButton color="black" size="large" disabled>
            <GhostButton.Center>비활성</GhostButton.Center>
          </GhostButton>
        </Flex>
      </div>

      <div style={{ fontSize: 11, color: '#94a3b8' }}>
        Google M3: 역할별 시맨틱 색상(Primary/Secondary/Error/Tertiary) 적용 Outlined 버튼
      </div>
    </div>
  )
}

export const M3_Outlined_버튼_패턴: Story = {
  name: 'Google Material 3 - 역할별 색상 Outlined 버튼 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Google Material 3 Outlined Button. 역할에 따라 Primary/Secondary/Error/Tertiary 색상을 적용하고 ' +
          'hover 시 해당 색상을 8% opacity로 배경에 채웁니다. Orbit UI GhostButton으로 동일 표현 가능합니다.',
      },
    },
  },
  render: () => <M3OutlinedButtonsRender />,
}

/* --------------------------------------------------------------------------
   Radix UI DropdownMenu 스타일 컨텍스트 메뉴 패턴
   GhostButton을 트리거로 사용, 오버레이 드롭다운 목록 시연
-------------------------------------------------------------------------- */
const RadixContextMenuRender = () => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const menuItems = [
    { label: '편집', icon: '✏️', shortcut: 'Cmd+E' },
    { label: '복제', icon: '📋', shortcut: 'Cmd+D' },
    { label: '공유', icon: '🔗', shortcut: 'Cmd+Shift+S' },
    null,
    { label: '이름 변경', icon: '🏷️', shortcut: 'F2' },
    { label: '이동', icon: '📁', shortcut: '' },
    null,
    { label: '삭제', icon: '🗑️', shortcut: 'Del', danger: true },
  ]

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <GhostButton
        color="black"
        size="large"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="더보기 메뉴"
      >
        <GhostButton.Center>••• 더보기</GhostButton.Center>
      </GhostButton>

      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9 }}
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            aria-label="컨텍스트 메뉴"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 4,
              zIndex: 10,
              minWidth: 200,
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              background: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              overflow: 'hidden',
              padding: '4px',
            }}
          >
            {menuItems.map((item, i) =>
              item === null ? (
                <div key={i} style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />
              ) : (
                <button
                  key={item.label}
                  role="menuitem"
                  onClick={() => { setSelected(item.label); setOpen(false) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                    color: item.danger ? '#ef4444' : '#1e293b',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = item.danger ? '#fef2f2' : '#f8fafc' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
                >
                  <span style={{ width: 18, textAlign: 'center', fontSize: 14 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.shortcut && (
                    <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', fontWeight: 500 }}>
                      {item.shortcut}
                    </span>
                  )}
                </button>
              )
            )}
          </div>
        </>
      )}

      {selected && (
        <div style={{ marginTop: 12, fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
          선택: {selected}
        </div>
      )}
    </div>
  )
}

export const Radix_컨텍스트_메뉴_트리거: Story = {
  name: 'Radix UI - GhostButton 트리거 컨텍스트 메뉴 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Radix DropdownMenu 패턴. GhostButton을 트리거로 사용, aria-haspopup="menu"와 aria-expanded로 ' +
          '접근성 구현. 구분선, 단축키 힌트, 위험 항목 색상 구분을 포함합니다.',
      },
    },
  },
  render: () => <RadixContextMenuRender />,
}

/* --------------------------------------------------------------------------
   Notion 벤치마크: 블록 에디터 인라인 포맷팅 툴바
   Notion 문서 편집기에서 텍스트 선택 시 나타나는 인라인 툴바 패턴
-------------------------------------------------------------------------- */
const NOTION_FORMAT_TOOLS: { key: string; label: string; shortcut: string }[] = [
  { key: 'bold', label: 'B', shortcut: 'Cmd+B' },
  { key: 'italic', label: 'I', shortcut: 'Cmd+I' },
  { key: 'underline', label: 'U', shortcut: 'Cmd+U' },
  { key: 'strike', label: 'S', shortcut: 'Cmd+Shift+S' },
  { key: 'code', label: '</>', shortcut: 'Cmd+E' },
  { key: 'link', label: 'Link', shortcut: 'Cmd+K' },
]

function NotionEditorToolbarRender() {
  const [active, setActive] = useState<Set<string>>(new Set())
  const [text] = useState('Orbit UI는 React 기반 디자인 시스템입니다. vanilla-extract로 CSS-in-JS를 구현하며, 3단계 토큰 시스템을 사용합니다.')

  const toggle = (key: string) =>
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const getTextStyle = (): React.CSSProperties => ({
    fontWeight: active.has('bold') ? 700 : 400,
    fontStyle: active.has('italic') ? 'italic' : 'normal',
    textDecoration: [
      active.has('underline') ? 'underline' : '',
      active.has('strike') ? 'line-through' : '',
    ].filter(Boolean).join(' ') || 'none',
    fontFamily: active.has('code') ? 'monospace' : 'inherit',
  })

  return (
    <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Toolbar */}
      <div style={{
        display: 'inline-flex', gap: 2, padding: '4px 6px',
        background: '#1e293b', borderRadius: 10,
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        alignSelf: 'flex-start',
      }}>
        {NOTION_FORMAT_TOOLS.map((tool, i) => (
          <div key={tool.key} style={{ display: 'flex', alignItems: 'center' }}>
            {i === 5 && (
              <div style={{ width: 1, height: 18, background: '#334155', margin: '0 4px' }} />
            )}
            <GhostButton
              color="gray"
              size="small"
              onClick={() => toggle(tool.key)}
              style={{
                color: active.has(tool.key) ? '#e0e7ff' : '#94a3b8',
                background: active.has(tool.key) ? '#3730a3' : 'transparent',
                borderRadius: 6,
                minWidth: tool.key === 'code' ? 36 : tool.key === 'link' ? 40 : 28,
                fontWeight: tool.key === 'bold' ? 800 : tool.key === 'italic' ? 700 : 600,
                fontStyle: tool.key === 'italic' ? 'italic' : 'normal',
                fontFamily: tool.key === 'code' ? 'monospace' : 'inherit',
              }}
            >
              {tool.label}
            </GhostButton>
          </div>
        ))}
      </div>

      {/* Editable text preview */}
      <div style={{
        padding: '16px 20px', borderRadius: 10,
        border: '1.5px solid #e2e8f0', background: '#fff',
        fontSize: 15, lineHeight: 1.7, color: '#1e293b',
        ...getTextStyle(),
      }}>
        {text}
      </div>

      {/* Active format indicator */}
      {active.size > 0 && (
        <div style={{ fontSize: 11, color: '#94a3b8' }}>
          적용된 포맷: {Array.from(active).map((k) => NOTION_FORMAT_TOOLS.find((t) => t.key === k)?.label).join(', ')}
        </div>
      )}
    </div>
  )
}

export const Notion_블록_에디터_포맷_툴바: Story = {
  name: 'Notion - 블록 에디터 인라인 포맷팅 툴바 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Notion 인라인 텍스트 편집 툴바 패턴. 다크 배경 플로팅 툴바에 GhostButton을 나열, ' +
          '클릭 시 active 상태(색상 반전)로 토글되며 하단 텍스트 미리보기에 포맷이 즉시 반영됩니다.',
      },
    },
  },
  render: () => <NotionEditorToolbarRender />,
}

/* --------------------------------------------------------------------------
   Raycast 벤치마크: 빠른 액션 커맨드 리스트 패턴
   Raycast Extension Commands: GhostButton이 액션 트리거 역할을 하는 컴팩트 리스트
-------------------------------------------------------------------------- */
type RaycastCommand = {
  id: string
  title: string
  subtitle: string
  shortcut: string
  category: 'recent' | 'action' | 'nav'
}

const RAYCAST_COMMANDS: RaycastCommand[] = [
  { id: 'r1', title: '새 이슈 생성', subtitle: 'Linear · 새 이슈를 빠르게 생성합니다', shortcut: 'N', category: 'action' },
  { id: 'r2', title: '클립보드 히스토리', subtitle: '최근 복사된 항목 보기', shortcut: 'V', category: 'recent' },
  { id: 'r3', title: 'PR 리뷰 요청', subtitle: 'GitHub · 열린 PR 목록에서 선택', shortcut: 'P', category: 'action' },
  { id: 'r4', title: 'Storybook 열기', subtitle: 'localhost:6007 브라우저에서 열기', shortcut: 'S', category: 'nav' },
  { id: 'r5', title: '색상 피커', subtitle: 'HEX/RGB/HSL 색상 변환 도구', shortcut: 'C', category: 'action' },
]

const CMD_CATEGORY_COLOR: Record<RaycastCommand['category'], string> = {
  recent: '#8b5cf6',
  action: '#6366f1',
  nav: '#14b8a6',
}

function RaycastCommandListRender() {
  const [activeId, setActiveId] = useState<string | null>('r1')
  const [query, setQuery] = useState('')

  const filtered = RAYCAST_COMMANDS.filter(
    (c) => !query || c.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{
      width: 460, borderRadius: 16, overflow: 'hidden',
      border: '1px solid #27272a', background: '#09090b',
      boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
    }}>
      {/* Search input */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth={2.5}>
          <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="명령어 검색..."
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontSize: 14, color: '#e4e4e7', caretColor: '#6366f1',
          }}
          autoFocus
        />
        <kbd style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: '#18181b', color: '#52525b', border: '1px solid #27272a' }}>
          ESC
        </kbd>
      </div>

      {/* Command list */}
      <div style={{ maxHeight: 300, overflow: 'auto' }}>
        {filtered.length > 0 ? (
          filtered.map((cmd) => (
            <div
              key={cmd.id}
              onMouseEnter={() => setActiveId(cmd.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px',
                background: activeId === cmd.id ? '#18181b' : 'transparent',
                transition: 'background 0.1s',
              }}
            >
              <div
                style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: CMD_CATEGORY_COLOR[cmd.category] + '20',
                  border: `1px solid ${CMD_CATEGORY_COLOR[cmd.category]}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: CMD_CATEGORY_COLOR[cmd.category],
                  flexShrink: 0,
                }}
              >
                {cmd.shortcut}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e4e4e7' }}>{cmd.title}</div>
                <div style={{ fontSize: 11, color: '#52525b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cmd.subtitle}</div>
              </div>
              <GhostButton
                color="gray"
                size="small"
                style={{
                  color: activeId === cmd.id ? '#6366f1' : '#3f3f46',
                  fontSize: 11,
                  opacity: activeId === cmd.id ? 1 : 0,
                  transition: 'opacity 0.15s',
                }}
              >
                실행
              </GhostButton>
            </div>
          ))
        ) : (
          <div style={{ padding: '32px 16px', textAlign: 'center', fontSize: 13, color: '#52525b' }}>
            일치하는 명령어 없음
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 16px', borderTop: '1px solid #27272a', display: 'flex', gap: 12 }}>
        {[{ key: 'Enter', action: '실행' }, { key: '↑↓', action: '이동' }, { key: 'Tab', action: '미리보기' }].map(({ key, action }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#52525b' }}>
            <kbd style={{ padding: '1px 6px', borderRadius: 4, background: '#18181b', border: '1px solid #27272a', color: '#71717a' }}>{key}</kbd>
            <span style={{ marginLeft: 4 }}>{action}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Raycast_명령어_액션_팔레트: Story = {
  name: 'Raycast - 빠른 명령어 액션 팔레트 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Raycast Extension 커맨드 팔레트 패턴. 다크 배경, 검색 입력, 카테고리별 색상 키 힌트, ' +
          'hover 시 GhostButton 액션 표시(opacity 0 → 1). 키보드 네비게이션 힌트 푸터 포함.',
      },
    },
  },
  render: () => <RaycastCommandListRender />,
}

/* --------------------------------------------------------------------------
   Linear 벤치마크: 뷰 전환 액션 툴바
   Linear 이슈 뷰에서 리스트/보드/타임라인 전환 + 필터/그룹/정렬 GhostButton 조합
-------------------------------------------------------------------------- */
type LinearView = 'list' | 'board' | 'timeline'

const LINEAR_VIEWS: { id: LinearView; label: string }[] = [
  { id: 'list', label: 'List' },
  { id: 'board', label: 'Board' },
  { id: 'timeline', label: 'Timeline' },
]

function LinearViewToolbarRender() {
  const [view, setView] = useState<LinearView>('list')
  const [showFilters, setShowFilters] = useState(false)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const MOCK_ISSUES = [
    { id: 'ORB-312', title: '캘린더 스토리 Radix 패턴 추가', priority: 'high', status: 'progress' },
    { id: 'ORB-311', title: 'GhostButton Notion 인라인 툴바', priority: 'medium', status: 'done' },
    { id: 'ORB-310', title: 'Template 50 TravelBooking', priority: 'high', status: 'todo' },
    { id: 'ORB-309', title: 'AccessibilityGuide MDX 보강', priority: 'low', status: 'progress' },
  ]

  const sorted = [...MOCK_ISSUES].sort((a, b) =>
    sortDir === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
  )

  const statusColor: Record<string, string> = { progress: '#6366f1', done: '#10b981', todo: '#94a3b8' }

  return (
    <div style={{ width: 520, display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', background: '#fafafa', borderBottom: '1px solid #f1f5f9' }}>
        {/* View switcher */}
        <div style={{ display: 'flex', gap: 1, background: '#f1f5f9', borderRadius: 6, padding: 2 }}>
          {LINEAR_VIEWS.map((v) => (
            <GhostButton
              key={v.id}
              color={view === v.id ? 'black' : 'gray'}
              size="small"
              onClick={() => setView(v.id)}
              style={{
                background: view === v.id ? '#fff' : 'transparent',
                borderRadius: 4,
                fontWeight: view === v.id ? 700 : 500,
                boxShadow: view === v.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {v.label}
            </GhostButton>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Action buttons */}
        <GhostButton
          color="gray"
          size="small"
          onClick={() => setShowFilters(!showFilters)}
          style={{ color: showFilters ? '#6366f1' : '#64748b', fontWeight: showFilters ? 700 : 500 }}
        >
          Filter
        </GhostButton>

        <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />

        <GhostButton
          color="gray"
          size="small"
          onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
          style={{ color: '#64748b' }}
        >
          {sortDir === 'desc' ? 'Newest' : 'Oldest'}
        </GhostButton>

        <GhostButton color="gray" size="small" style={{ color: '#64748b' }}>
          Group
        </GhostButton>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <div style={{ padding: '8px 12px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Priority: All', 'Status: All', 'Assignee: Any'].map((f) => (
            <GhostButton key={f} color="gray" size="small" style={{ color: '#6366f1', background: '#eff6ff', borderRadius: 6, fontSize: 11 }}>
              {f}
            </GhostButton>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ background: '#fff' }}>
        {sorted.map((issue, i) => (
          <div
            key={issue.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px',
              borderBottom: i < sorted.length - 1 ? '1px solid #f8fafc' : 'none',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[issue.status], flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#1e293b', flex: 1 }}>{issue.title}</span>
            <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>{issue.id}</span>
            <GhostButton color="gray" size="small" style={{ color: '#cbd5e1', fontSize: 18, lineHeight: 1 }}>
              ···
            </GhostButton>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Linear_뷰_전환_액션_툴바: Story = {
  name: 'Linear - 뷰 전환 + 필터/정렬 액션 툴바 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Linear 이슈 뷰 툴바 패턴. List/Board/Timeline 뷰 전환 GhostButton 그룹, ' +
          'Filter/Sort/Group 액션 버튼, 열기/닫기 가능한 필터 바 조합.',
      },
    },
  },
  render: () => <LinearViewToolbarRender />,
}
