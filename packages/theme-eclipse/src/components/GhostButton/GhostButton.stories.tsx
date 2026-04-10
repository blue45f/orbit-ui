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
