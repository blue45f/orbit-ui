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

const ANT_OPERATION_ACTIONS = [
  { id: 'edit', label: '편집', color: '#1677ff' },
  { id: 'delete', label: '삭제', color: '#ff4d4f' },
  { id: 'share', label: '공유', color: '#1677ff' },
]

const AntTableOperationsRender = () => {
  const [records] = useState([
    { id: 1, name: '김철수', email: 'kim@example.com', role: 'Admin', status: '활성' },
    { id: 2, name: '이영희', email: 'lee@example.com', role: 'Editor', status: '활성' },
    { id: 3, name: '박민준', email: 'park@example.com', role: 'Viewer', status: '비활성' },
  ])
  const [deletedId, setDeletedId] = useState<number | null>(null)
  const [editedId, setEditedId] = useState<number | null>(null)

  return (
    <div style={{ width: 520, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 12 }}>사용자 목록</div>
      <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 0.8fr 1fr', padding: '8px 12px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
          {['이름', '이메일', '역할', '상태', '작업'].map(h => (
            <span key={h} style={{ fontSize: 11, fontWeight: 700, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
          ))}
        </div>
        {records.map((rec, idx) => (
          <div
            key={rec.id}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 0.8fr 1fr', padding: '10px 12px', borderBottom: idx < records.length - 1 ? '1px solid #f5f5f5' : 'none', background: deletedId === rec.id ? '#fff2f0' : editedId === rec.id ? '#f0f5ff' : '#fff', transition: 'background 0.2s', alignItems: 'center' }}
          >
            <span style={{ fontSize: 13, color: '#262626', fontWeight: 600 }}>{rec.name}</span>
            <span style={{ fontSize: 12, color: '#595959' }}>{rec.email}</span>
            <span style={{ fontSize: 12, color: '#595959' }}>{rec.role}</span>
            <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, background: rec.status === '활성' ? '#f6ffed' : '#fff1f0', color: rec.status === '활성' ? '#52c41a' : '#ff4d4f', fontWeight: 600 }}>{rec.status}</span>
            <div style={{ display: 'flex', gap: 0 }}>
              {ANT_OPERATION_ACTIONS.map(action => (
                <GhostButton
                  key={action.id}
                  size="small"
                  color="gray"
                  onClick={() => {
                    if (action.id === 'delete') setDeletedId(rec.id)
                    else setEditedId(rec.id)
                    setTimeout(() => { setDeletedId(null); setEditedId(null) }, 1200)
                  }}
                  style={{ color: action.color, fontSize: 12, padding: '2px 6px' }}
                >
                  {action.label}
                </GhostButton>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#8c8c8c' }}>Ant Design Table Operation 패턴 — 행별 GhostButton 액션</div>
    </div>
  )
}

export const Ant_테이블_행_작업_버튼: Story = {
  name: 'Ant Design - 테이블 행 작업(Operation) 버튼 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Ant Design Table의 Operation 컬럼 패턴. 각 행에 편집/삭제/공유 GhostButton을 나란히 배치합니다. 클릭 시 행 배경색으로 시각적 피드백을 제공하며, 색상 구분으로 위험 액션(삭제)을 강조합니다.',
      },
    },
  },
  render: () => <AntTableOperationsRender />,
}

const MANTINE_TABS = [
  { id: 'recent', label: '최근 항목' },
  { id: 'starred', label: '즐겨찾기' },
  { id: 'shared', label: '공유됨' },
]

const MANTINE_ITEMS = {
  recent: ['프로젝트 계획서.docx', '디자인 명세.figma', '스프린트 보드.notion'],
  starred: ['분기 OKR.sheet', '컴포넌트 가이드.md'],
  shared: ['팀 회의록.doc', '기술 스펙.pdf', '온보딩 자료.pptx', '릴리스 노트.md'],
}

const MantineContextMenuRender = () => {
  const [activeTab, setActiveTab] = useState<'recent' | 'starred' | 'shared'>('recent')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyLink = (item: string) => {
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 1500)
  }

  return (
    <div style={{ width: 360, fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid #dee2e6', borderRadius: 10, overflow: 'hidden' }}>
      {/* Tab row */}
      <div style={{ display: 'flex', borderBottom: '1px solid #dee2e6', background: '#f8f9fa' }}>
        {MANTINE_TABS.map(tab => (
          <GhostButton
            key={tab.id}
            size="small"
            color={activeTab === tab.id ? 'black' : 'gray'}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{ flex: 1, padding: '10px 0', borderRadius: 0, borderBottom: activeTab === tab.id ? '2px solid #339af0' : '2px solid transparent', fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 400 }}
          >
            {tab.label}
          </GhostButton>
        ))}
      </div>
      {/* List */}
      <div style={{ padding: '8px 0' }}>
        {MANTINE_ITEMS[activeTab].map(item => (
          <div
            key={item}
            style={{ display: 'flex', alignItems: 'center', padding: '8px 14px', background: hoveredItem === item ? '#f8f9fa' : '#fff', transition: 'background 0.1s', cursor: 'default' }}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span style={{ flex: 1, fontSize: 13, color: '#212529' }}>{item}</span>
            {hoveredItem === item && (
              <GhostButton size="small" color="gray" onClick={() => copyLink(item)} style={{ fontSize: 11, color: copiedItem === item ? '#40c057' : '#868e96' }}>
                {copiedItem === item ? '복사됨!' : '링크 복사'}
              </GhostButton>
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: '8px 14px', borderTop: '1px solid #f0f0f0', fontSize: 11, color: '#adb5bd' }}>Mantine Tabs + hover 액션 패턴</div>
    </div>
  )
}

export const Mantine_탭_컨텍스트_액션: Story = {
  name: 'Mantine - 탭 + hover 컨텍스트 액션 버튼',
  parameters: {
    docs: {
      description: {
        story: 'Mantine Tabs 패턴과 hover 시 드러나는 컨텍스트 액션을 GhostButton으로 구현. 최근/즐겨찾기/공유 탭 전환에 GhostButton을 탭 헤더로 활용하고, 리스트 항목 hover 시 링크 복사 버튼을 표시합니다.',
      },
    },
  },
  render: () => <MantineContextMenuRender />,
}

const MANTINE_TOOLBAR_ACTIONS = [
  { id: 'bold', label: 'B', title: '굵게', active: false },
  { id: 'italic', label: 'I', title: '기울임', active: false },
  { id: 'underline', label: 'U', title: '밑줄', active: false },
  { id: 'strike', label: 'S', title: '취소선', active: false },
] as const

type ToolbarActionId = typeof MANTINE_TOOLBAR_ACTIONS[number]['id']

const MantineRichTextToolbarRender = () => {
  const [activeFormats, setActiveFormats] = useState<Set<ToolbarActionId>>(new Set())
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left')

  const toggleFormat = (id: ToolbarActionId) => {
    setActiveFormats(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const ALIGN_OPTIONS = [
    { id: 'left' as const, label: '≡' },
    { id: 'center' as const, label: '≡' },
    { id: 'right' as const, label: '≡' },
  ]

  return (
    <div style={{ width: 400, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '6px 8px', border: '1px solid #dee2e6', borderBottom: 'none', borderRadius: '8px 8px 0 0', background: '#f8f9fa' }}>
        {MANTINE_TOOLBAR_ACTIONS.map(action => (
          <GhostButton
            key={action.id}
            size="small"
            color={activeFormats.has(action.id) ? 'black' : 'gray'}
            onClick={() => toggleFormat(action.id)}
            style={{ minWidth: 28, fontSize: 13, fontWeight: 700, fontStyle: action.id === 'italic' ? 'italic' : 'normal', textDecoration: action.id === 'underline' ? 'underline' : action.id === 'strike' ? 'line-through' : 'none', padding: '4px 8px', background: activeFormats.has(action.id) ? '#e8f4fd' : 'transparent', borderRadius: 4 }}
          >
            {action.label}
          </GhostButton>
        ))}
        <div style={{ width: 1, height: 18, background: '#dee2e6', margin: '0 4px' }} />
        {ALIGN_OPTIONS.map((opt, idx) => (
          <GhostButton
            key={opt.id}
            size="small"
            color={align === opt.id ? 'black' : 'gray'}
            onClick={() => setAlign(opt.id)}
            style={{ minWidth: 28, fontSize: 14, padding: '4px 8px', background: align === opt.id ? '#e8f4fd' : 'transparent', borderRadius: 4, letterSpacing: idx === 0 ? '0' : idx === 1 ? '2px' : '-2px' }}
          >
            {opt.label}
          </GhostButton>
        ))}
      </div>
      <div style={{ padding: '12px 14px', border: '1px solid #dee2e6', borderRadius: '0 0 8px 8px', minHeight: 80, fontSize: 13, color: '#495057', lineHeight: 1.6 }}>
        <span style={{ fontWeight: activeFormats.has('bold') ? 700 : 400, fontStyle: activeFormats.has('italic') ? 'italic' : 'normal', textDecoration: activeFormats.has('underline') ? 'underline' : activeFormats.has('strike') ? 'line-through' : 'none', textAlign: align, display: 'block' }}>
          Mantine RichTextEditor 툴바 패턴 — GhostButton으로 서식 버튼 구현. 활성 포맷은 배경색 강조로 표시됩니다.
        </span>
      </div>
    </div>
  )
}

export const Mantine_리치텍스트_서식_툴바: Story = {
  name: 'Mantine - 리치텍스트 서식 툴바 패턴',
  parameters: {
    docs: {
      description: {
        story: 'Mantine RichTextEditor의 서식 툴바 패턴. Bold/Italic/Underline/Strikethrough 토글과 텍스트 정렬 컨트롤을 GhostButton으로 구현합니다. 활성 상태는 배경색으로 강조되며 실제 텍스트 스타일이 실시간 반영됩니다.',
      },
    },
  },
  render: () => <MantineRichTextToolbarRender />,
}

/* --------------------------------------------------------------------------
   Mantine 벤치마크: 사이드바 내비게이션 메뉴 버튼 패턴
   Mantine NavLink — 아이콘+레이블+뱃지 결합 사이드바 항목
-------------------------------------------------------------------------- */
const NAV_ITEMS = [
  { label: '대시보드', icon: '◉', count: null, active: true },
  { label: '이슈', icon: '⊡', count: 12, active: false },
  { label: '프로젝트', icon: '◈', count: 3, active: false },
  { label: '사이클', icon: '◎', count: null, active: false },
  { label: '로드맵', icon: '◑', count: null, active: false },
] as const

function MantineNavMenuRender() {
  const [active, setActive] = useState<string>('대시보드')

  return (
    <div style={{ width: 220, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 8px', marginBottom: 4 }}>
        워크스페이스
      </div>
      {NAV_ITEMS.map((item) => (
        <GhostButton
          key={item.label}
          color={active === item.label ? 'black' : 'gray'}
          size="large"
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            background: active === item.label ? '#f1f5f9' : 'transparent',
            borderRadius: 8,
            padding: '0 8px',
          }}
          onClick={() => setActive(item.label)}
        >
          <GhostButton.Center>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: 'left', fontSize: 13, fontWeight: active === item.label ? 600 : 400 }}>{item.label}</span>
              {item.count !== null && (
                <span style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', background: '#eef2ff', padding: '1px 6px', borderRadius: 999 }}>
                  {item.count}
                </span>
              )}
            </span>
          </GhostButton.Center>
        </GhostButton>
      ))}
    </div>
  )
}

export const Mantine_사이드바_내비게이션_메뉴: Story = {
  name: 'Mantine - 사이드바 내비게이션 메뉴 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine NavLink 패턴. GhostButton을 사이드바 내비게이션 항목으로 활용합니다. ' +
          '활성 항목 배경 강조, 아이콘+레이블+카운트 뱃지 조합, 클릭 상태 전환을 구현합니다.',
      },
    },
  },
  render: () => <MantineNavMenuRender />,
}

/* --------------------------------------------------------------------------
   Ant Design 벤치마크: 드롭다운 메뉴 액션 그룹 패턴
   Ant Dropdown Menu — 섹션별 그룹화된 컨텍스트 액션 목록
-------------------------------------------------------------------------- */
const ACTION_GROUPS: Array<{ group: string; actions: Array<{ label: string; icon: string; shortcut: string; danger?: boolean }> }> = [
  {
    group: '보기',
    actions: [
      { label: '코드 복사', icon: '⎘', shortcut: '⌘C' },
      { label: '링크 복사', icon: '⛓', shortcut: '⌘⇧C' },
    ],
  },
  {
    group: '편집',
    actions: [
      { label: '이름 변경', icon: '✎', shortcut: 'F2' },
      { label: '복제', icon: '⊕', shortcut: '⌘D' },
    ],
  },
  {
    group: '위험',
    actions: [
      { label: '삭제', icon: '⊗', shortcut: '⌦', danger: true },
    ],
  },
]

export const Ant_드롭다운_액션_그룹_메뉴: Story = {
  name: 'Ant Design - 드롭다운 액션 그룹 메뉴 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Ant Design Dropdown Menu 패턴. GhostButton을 그룹 섹션별 메뉴 항목으로 사용합니다. ' +
          '보기/편집/위험 그룹으로 구분하고 각 항목에 아이콘 + 키보드 단축키를 배치합니다.',
      },
    },
  },
  render: () => (
    <div style={{ width: 200, fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
      {ACTION_GROUPS.map((group, gi) => (
        <div key={group.group}>
          {gi > 0 && <div style={{ height: 1, background: '#f1f5f9' }} />}
          <div style={{ padding: '4px 4px 0' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 10px 2px' }}>
              {group.group}
            </div>
            {group.actions.map((action) => (
              <GhostButton
                key={action.label}
                color={action.danger ? 'gray' : 'gray'}
                size="small"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  borderRadius: 6,
                  color: action.danger ? '#ef4444' : undefined,
                }}
              >
                <GhostButton.Center>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                    <span style={{ fontSize: 13 }}>{action.icon}</span>
                    <span style={{ flex: 1, textAlign: 'left', fontSize: 12 }}>{action.label}</span>
                    <span style={{ fontSize: 10, color: '#94a3b8' }}>{action.shortcut}</span>
                  </span>
                </GhostButton.Center>
              </GhostButton>
            ))}
          </div>
        </div>
      ))}
      <div style={{ height: 4 }} />
    </div>
  ),
}

/* --------------------------------------------------------------------------
   Mantine + Ant Design 복합: 데이터 뷰 전환 + 내보내기 액션 바
   뷰 토글(리스트/그리드/테이블) + 내보내기 메뉴 조합
-------------------------------------------------------------------------- */
function MantineAntViewActionBarRender() {
  const [view, setView] = useState<'list' | 'grid' | 'table'>('list')
  const [exporting, setExporting] = useState(false)

  const views = [
    { key: 'list' as const, label: '목록', icon: '☰' },
    { key: 'grid' as const, label: '그리드', icon: '⊞' },
    { key: 'table' as const, label: '테이블', icon: '⊟' },
  ]

  const handleExport = async (format: string) => {
    setExporting(true)
    await new Promise(r => setTimeout(r, 1000))
    setExporting(false)
    window.alert(`${format} 내보내기 완료`)
  }

  return (
    <div style={{ width: 380, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* 액션 바 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
        {/* 뷰 전환 토글 */}
        <div style={{ display: 'flex', gap: 2, background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', padding: 2 }}>
          {views.map(v => (
            <GhostButton
              key={v.key}
              color={view === v.key ? 'black' : 'gray'}
              size="small"
              style={{
                borderRadius: 6,
                background: view === v.key ? '#1e293b' : 'transparent',
                color: view === v.key ? '#fff' : '#94a3b8',
                minWidth: 56,
              }}
              onClick={() => setView(v.key)}
            >
              <GhostButton.Center>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span>{v.icon}</span>
                  <span style={{ fontSize: 11 }}>{v.label}</span>
                </span>
              </GhostButton.Center>
            </GhostButton>
          ))}
        </div>
        {/* 내보내기 */}
        <div style={{ display: 'flex', gap: 4 }}>
          {['CSV', 'JSON', 'XLSX'].map(fmt => (
            <GhostButton
              key={fmt}
              color="gray"
              size="small"
              disabled={exporting}
              onClick={() => handleExport(fmt)}
            >
              <GhostButton.Center>{fmt}</GhostButton.Center>
            </GhostButton>
          ))}
        </div>
      </div>
      {/* 콘텐츠 프리뷰 */}
      <div style={{ padding: '12px', background: '#fff', borderRadius: 8, border: '1px solid #f1f5f9', minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, color: '#94a3b8' }}>현재 뷰: <strong style={{ color: '#1e293b' }}>{view}</strong></span>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8' }}>Mantine 뷰 토글 + Ant Design 내보내기 액션 바 패턴</div>
    </div>
  )
}

export const Mantine_Ant_뷰전환_내보내기_액션바: Story = {
  name: 'Mantine + Ant Design - 데이터 뷰 전환 + 내보내기 액션 바',
  parameters: {
    docs: {
      description: {
        story:
          'Mantine + Ant Design 복합 패턴. 뷰 전환(목록/그리드/테이블)을 GhostButton 토글 그룹으로 구현하고, ' +
          'CSV/JSON/XLSX 내보내기 액션 버튼을 조합합니다. 활성 뷰는 배경색 반전으로 강조합니다.',
      },
    },
  },
  render: () => <MantineAntViewActionBarRender />,
}

// ─── Cycle 154: MUI + Chakra UI ────────────────────────────────────────────

function MuiToolbarActionRender() {
  const [active, setActive] = useState<string | null>(null)
  const actions = [
    { id: 'undo', label: '실행 취소', icon: <ChevronRightLineIcon size={12} style={{ transform: 'rotate(180deg)' }} /> },
    { id: 'redo', label: '다시 실행', icon: <ChevronRightLineIcon size={12} /> },
    { id: 'copy', label: '복사', icon: <CopyLineIcon size={12} /> },
    { id: 'link', label: '링크 삽입', icon: <LinkIcon size={12} /> },
    { id: 'share', label: '공유', icon: <ShareIcon size={12} /> },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280' }}>MUI 툴바 액션 버튼 패턴</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '4px 8px', background: '#f8fafc', borderRadius: 6, border: '1px solid #e2e8f0' }}>
        {actions.map((action, i) => (
          <div key={action.id} style={{ display: 'flex', alignItems: 'center' }}>
            {i === 2 && <div style={{ width: 1, height: 16, background: '#e2e8f0', margin: '0 4px' }} />}
            <GhostButton
              color="gray"
              size="small"
              onClick={() => setActive(action.id)}
              style={{ borderRadius: 4, background: active === action.id ? '#e0f2fe' : 'transparent' }}
            >
              <GhostButton.Center>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{action.icon}{action.label}</span>
              </GhostButton.Center>
            </GhostButton>
          </div>
        ))}
      </div>
      {active && (
        <div style={{ fontSize: 11, color: '#0284c7', padding: '4px 8px', background: '#e0f2fe', borderRadius: 4 }}>
          실행: {actions.find(a => a.id === active)?.label}
        </div>
      )}
      <div style={{ fontSize: 11, color: '#9ca3af' }}>MUI IconButton + ButtonGroup 조합 패턴 재현</div>
    </div>
  )
}

export const MUI_툴바_액션_버튼: StoryObj<typeof meta> = {
  name: 'MUI - 툴바 액션 버튼 (구분선 포함)',
  render: () => <MuiToolbarActionRender />,
  parameters: {
    docs: {
      description: {
        story:
          'MUI Toolbar + IconButton 패턴. 구분선으로 액션 그룹을 시각적으로 분리하고 클릭 상태를 강조 배경으로 표현합니다. ' +
          'MUI ButtonGroup의 divider 패턴을 GhostButton 조합으로 재현합니다.',
      },
    },
  },
}

function ChakraMenuItemRender() {
  const [selected, setSelected] = useState<string | null>(null)
  const items = [
    { id: 'edit', label: '편집', icon: <CopyLineIcon size={12} />, shortcut: '⌘E' },
    { id: 'duplicate', label: '복제', icon: <CopyLineIcon size={12} />, shortcut: '⌘D' },
    { id: 'share', label: '공유', icon: <ShareIcon size={12} />, shortcut: '⌘S' },
    { id: 'delete', label: '삭제', icon: <DeleteLineIcon size={12} />, shortcut: '⌫', danger: true },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280' }}>Chakra UI 메뉴 아이템 패턴</div>
      <div style={{ width: 200, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        {items.map((item, i) => (
          <div key={item.id}>
            {i === items.length - 1 && <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />}
            <GhostButton
              color={item.danger ? 'black' : 'gray'}
              size="small"
              onClick={() => setSelected(item.id)}
              style={{ width: '100%', borderRadius: 4, justifyContent: 'space-between' }}
            >
              <GhostButton.Center>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flex: 1, color: item.danger ? '#ef4444' : '#1e293b' }}>
                  {item.icon}
                  <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                  <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 8 }}>{item.shortcut}</span>
                </span>
              </GhostButton.Center>
            </GhostButton>
          </div>
        ))}
      </div>
      {selected && <div style={{ fontSize: 11, color: '#0284c7' }}>선택됨: {items.find(i => i.id === selected)?.label}</div>}
      <div style={{ fontSize: 11, color: '#9ca3af' }}>Chakra UI Menu.Item 패턴 — 아이콘 + 레이블 + 단축키</div>
    </div>
  )
}

export const Chakra_메뉴_아이템_버튼: StoryObj<typeof meta> = {
  name: 'Chakra UI - 컨텍스트 메뉴 아이템 (단축키 + 위험 액션)',
  render: () => <ChakraMenuItemRender />,
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Menu.Item 패턴. 아이콘·레이블·단축키 3단 구성, 구분선으로 위험 액션 분리, 삭제 항목 빨간색 강조. ' +
          'Chakra useMenuList hook의 isDestructive 옵션을 GhostButton 스타일로 재현합니다.',
      },
    },
  },
}

function MuiChakraQuickActionRender() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const toggleFav = (id: string) => setFavorites(prev => {
    const next = new Set(prev)
    if (next.has(id)) { next.delete(id) } else { next.add(id) }
    return next
  })
  const pages = ['디자인 시스템 문서', '스프린트 보드', '팀 위키', '회고 노트', 'API 명세서']
  return (
    <div style={{ width: 280, fontFamily: 'Inter, system-ui, sans-serif', color: '#1e293b' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 8 }}>MUI + Chakra 퀵 액션 패널</div>
      {pages.map(page => (
        <div key={page} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0' }}>
          <Flex style={{ flex: 1 }}>
            <GhostButton color="gray" size="small" style={{ flex: 1, justifyContent: 'flex-start' }}>
              <GhostButton.Center>
                <span style={{ textAlign: 'left', color: '#475569', fontSize: 13 }}>{page}</span>
              </GhostButton.Center>
            </GhostButton>
          </Flex>
          <GhostButton color="gray" size="small" onClick={() => toggleFav(page)}>
            {favorites.has(page) ? <HeartFillIcon size={12} style={{ color: '#f43f5e' }} /> : <HeartLineIcon size={12} />}
          </GhostButton>
          <GhostButton color="gray" size="small">
            <ChevronRightLineIcon size={12} />
          </GhostButton>
        </div>
      ))}
      <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>즐겨찾기: {favorites.size}개 — MUI List + Chakra 토글 패턴</div>
    </div>
  )
}

export const MUI_Chakra_퀵_액션_패널: StoryObj<typeof meta> = {
  name: 'MUI + Chakra UI - 퀵 액션 패널 (즐겨찾기 토글)',
  render: () => <MuiChakraQuickActionRender />,
  parameters: {
    docs: {
      description: {
        story:
          'MUI + Chakra UI 복합 패턴. MUI List 스타일 페이지 목록에 Chakra UI 토글 버튼 패턴을 결합해 ' +
          '즐겨찾기(하트 아이콘) + 탐색(화살표) 인라인 퀵 액션을 구현합니다.',
      },
    },
  },
}
