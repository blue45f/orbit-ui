import { Flex } from '@heejun-com/core'
import { ChatLineIcon, ChevronRightLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'

import { SolidButton, SolidButtonProps } from '.'

SolidButton.displayName = 'SolidButton'
SolidButton.Leading.displayName = 'SolidButton.Leading'
SolidButton.Center.displayName = 'SolidButton.Center'
SolidButton.Trailing.displayName = 'SolidButton.Trailing'

const iconSize: Record<SolidButtonProps['size'], number> = {
  small: 12,
  medium: 14,
  large: 16,
}

const meta = {
  title: 'eclipse/Actions/Buttons/SolidButton',
  component: SolidButton,
  args: { color: 'black', size: 'medium', disabled: false },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
      control: 'select',
      options: ['black', 'primary', 'gray', 'white'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} satisfies Meta<typeof SolidButton>

type Story = StoryObj<typeof meta>

export default meta

export const 색상 = {
  args: {
    size: 'large',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Brand Colors</h4>
        <Flex columnGap="24px" alignItems="center" flexWrap="wrap" rowGap="16px">
          <SolidButton {...prop} color="black">
            <SolidButton.Center>Black</SolidButton.Center>
          </SolidButton>
          <SolidButton {...prop} color="primary">
            <SolidButton.Center>Primary</SolidButton.Center>
          </SolidButton>
          <SolidButton {...prop} color="gray">
            <SolidButton.Center>Gray</SolidButton.Center>
          </SolidButton>
          <SolidButton {...prop} color="white">
            <SolidButton.Center>White</SolidButton.Center>
          </SolidButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 사이즈 = {
  args: {
    color: 'black',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Button Sizes</h4>
        <Flex columnGap="24px" alignItems="flex-end" flexWrap="wrap" rowGap="16px">
          <SolidButton {...prop} size="small">
            <SolidButton.Leading>
              <ChatLineIcon />
            </SolidButton.Leading>
            <SolidButton.Center>Small</SolidButton.Center>
            <SolidButton.Trailing>
              <ChevronRightLineIcon size={iconSize.small} />
            </SolidButton.Trailing>
          </SolidButton>
          <SolidButton {...prop} size="medium">
            <SolidButton.Leading>
              <ChatLineIcon />
            </SolidButton.Leading>
            <SolidButton.Center>Medium</SolidButton.Center>
            <SolidButton.Trailing>
              <ChevronRightLineIcon size={iconSize.medium} />
            </SolidButton.Trailing>
          </SolidButton>
          <SolidButton {...prop} size="large">
            <SolidButton.Leading>
              <ChatLineIcon />
            </SolidButton.Leading>
            <SolidButton.Center>Large</SolidButton.Center>
            <SolidButton.Trailing>
              <ChevronRightLineIcon size={iconSize.large} />
            </SolidButton.Trailing>
          </SolidButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

export const 로딩 = {
  args: {
    loading: true,
    color: 'black',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Loading State</h4>
        <SolidButton {...prop}>
          <SolidButton.Leading>
            <ChatLineIcon />
          </SolidButton.Leading>
          <SolidButton.Center>불러오는 중...</SolidButton.Center>
          <SolidButton.Trailing>
            <ChevronRightLineIcon size={iconSize[prop.size]} />
          </SolidButton.Trailing>
        </SolidButton>
      </div>
    )
  },
} satisfies Story

export const 전체너비 = {
  args: {
    size: 'medium',
  },
  render: (prop: SolidButtonProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Full Width</h4>
        <Flex flexDirection="column" gap="12px" style={{ width: '100%', maxWidth: '400px' }}>
          <SolidButton {...prop} color="black" width="100%">
            <SolidButton.Center>Primary Action</SolidButton.Center>
          </SolidButton>
          <SolidButton {...prop} color="gray" width="100%">
            <SolidButton.Center>Secondary Action</SolidButton.Center>
          </SolidButton>
        </Flex>
      </div>
    )
  },
} satisfies Story

// ─── Apple HIG: 계층적 버튼 (Primary / Secondary / Tertiary) ────────────────
// Apple HIG에서 버튼 계층은 화면에서의 시각적 중요도를 나타냅니다.
// Primary(Filled) > Secondary(Outlined) > Tertiary(Ghost) 순으로 강조도가 낮아집니다.
export const Apple_HIG_버튼_계층: Story = {
  name: 'Apple HIG - 계층적 버튼 (Primary / Secondary / Tertiary)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '480px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          단계별 강조도
        </p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <SolidButton color="primary" size="medium">
            <SolidButton.Center>Primary (Filled)</SolidButton.Center>
          </SolidButton>
        </div>
      </div>
      <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
          결제 플로우 예시
        </p>
        <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b' }}>
          Primary 버튼은 페이지당 하나만 존재해야 합니다.
          Secondary와 Tertiary는 보조 액션에 사용합니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <SolidButton color="primary" size="large">
            <SolidButton.Center>구매하기 (Primary)</SolidButton.Center>
          </SolidButton>
          <SolidButton color="gray" size="large">
            <SolidButton.Center>장바구니 담기 (Secondary)</SolidButton.Center>
          </SolidButton>
          <SolidButton color="white" size="large">
            <SolidButton.Center>나중에 보기 (Tertiary)</SolidButton.Center>
          </SolidButton>
        </div>
      </div>
      <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
          모달 액션 예시 (파괴적 작업)
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <SolidButton color="gray" size="medium">
            <SolidButton.Center>취소 (Tertiary)</SolidButton.Center>
          </SolidButton>
          <SolidButton color="black" size="medium">
            <SolidButton.Center>삭제 (Primary)</SolidButton.Center>
          </SolidButton>
        </div>
      </div>
    </div>
  ),
} satisfies Story

export const 디자인QA = {
  args: {
    color: 'primary',
    size: 'medium',
    text: '디자인 확인용 버튼',
    leading: true,
    trailing: true,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  render: ({ color, size, text, leading, trailing, ...rest }: any) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#888' }}>Interactive Playground</h4>
        <SolidButton color={color} size={size} {...rest}>
          {leading && (
            <SolidButton.Leading>
              <ChatLineIcon />
            </SolidButton.Leading>
          )}
          <SolidButton.Center>{text}</SolidButton.Center>
          {trailing && (
            <SolidButton.Trailing>
              <ChevronRightLineIcon size={iconSize[size as SolidButtonProps['size']]} />
            </SolidButton.Trailing>
          )}
        </SolidButton>
      </div>
    )
  },
}
