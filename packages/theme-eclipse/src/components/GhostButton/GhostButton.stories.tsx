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
