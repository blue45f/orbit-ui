import { Flex } from '@heejun-com/core'
import { ArrowRightIcon, ChatLineIcon, ChevronRightLineIcon, NotificationLineIcon, SearchIcon, SettingLineIcon } from '@heejun-com/icons'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

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
  tags: ['autodocs'],
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

// ─── Material 3: 색상 역할 시스템 (Color Role System) ────────────────────────
// M3는 Primary / Secondary / Tertiary / Error 4가지 색상 역할을 정의합니다.
// 각 역할은 Container(배경)와 On-Container(텍스트/아이콘) 한 쌍으로 존재합니다.
export const Material3_색상역할_시스템: Story = {
  name: 'Material 3 - 색상 역할 시스템 (Primary/Secondary/Tertiary/Error)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '560px' }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          M3 Color Roles
        </p>
        <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
          Material 3의 색상 역할 시스템입니다. SolidButton의 color prop을 M3 역할에 매핑하여 사용합니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Primary Role */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '120px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Primary</div>
            <SolidButton color="primary" size="medium">
              <SolidButton.Center>Filled Button</SolidButton.Center>
            </SolidButton>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>가장 강조되는 주요 액션</span>
          </div>
          {/* Secondary Role → black */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '120px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Secondary</div>
            <SolidButton color="black" size="medium">
              <SolidButton.Center>Filled Button</SolidButton.Center>
            </SolidButton>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>보조 액션, 중간 강조</span>
          </div>
          {/* Tertiary Role → gray */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '120px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Tertiary</div>
            <SolidButton color="gray" size="medium">
              <SolidButton.Center>Filled Button</SolidButton.Center>
            </SolidButton>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>3차 보조, 낮은 강조</span>
          </div>
          {/* Surface Role → white */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '120px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Surface</div>
            <div style={{ background: '#1e293b', padding: '8px 12px', borderRadius: '12px' }}>
              <SolidButton color="white" size="medium">
                <SolidButton.Center>Filled Button</SolidButton.Center>
              </SolidButton>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>어두운 배경 위 표면 버튼</span>
          </div>
        </div>
      </div>

      {/* Color Role 실전 카드 */}
      <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>M3 실전: 알림 다이얼로그</p>
        <p style={{ margin: '0 0 20px', fontSize: '12px', color: '#64748b' }}>
          위험한 액션에는 Error 역할(red), 확인에는 Primary, 취소에는 Surface를 권장합니다.
        </p>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>계정을 삭제하시겠습니까?</p>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
            이 작업은 되돌릴 수 없습니다. 모든 데이터가 영구적으로 삭제됩니다.
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <SolidButton color="gray" size="medium">
              <SolidButton.Center>취소</SolidButton.Center>
            </SolidButton>
            <SolidButton color="black" size="medium">
              <SolidButton.Center>삭제</SolidButton.Center>
            </SolidButton>
          </div>
        </div>
      </div>
    </div>
  ),
}

// ─── Material 3: 밀도 시스템 (Density System) ────────────────────────────────
// M3는 Compact(-2) / Default(0) / Comfortable(+2) 세 가지 밀도를 정의합니다.
// SolidButton의 size prop (small/medium/large)으로 이를 표현합니다.
export const Material3_밀도_시스템: Story = {
  name: 'Material 3 - 밀도 시스템 (Compact / Default / Comfortable)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '600px' }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          M3 Density System
        </p>
        <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
          정보 밀도가 높은 전문가용 앱(Compact)에서 소비자 앱(Comfortable)까지 밀도를 조절합니다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Compact */}
          <div style={{ padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: '#f1f5f9', color: '#475569' }}>Compact (-2)</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>정보 밀도 높음 · 데이터 대시보드, 툴바</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <SolidButton color="primary" size="small">
                <SolidButton.Center>저장</SolidButton.Center>
              </SolidButton>
              <SolidButton color="black" size="small">
                <SolidButton.Center>편집</SolidButton.Center>
              </SolidButton>
              <SolidButton color="gray" size="small">
                <SolidButton.Center>취소</SolidButton.Center>
              </SolidButton>
            </div>
          </div>

          {/* Default */}
          <div style={{ padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: '#ede9fe', color: '#7c3aed' }}>Default (0)</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>기본값 · 대부분의 앱에 적합</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <SolidButton color="primary" size="medium">
                <SolidButton.Center>저장</SolidButton.Center>
              </SolidButton>
              <SolidButton color="black" size="medium">
                <SolidButton.Center>편집</SolidButton.Center>
              </SolidButton>
              <SolidButton color="gray" size="medium">
                <SolidButton.Center>취소</SolidButton.Center>
              </SolidButton>
            </div>
          </div>

          {/* Comfortable */}
          <div style={{ padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#16a34a' }}>Comfortable (+2)</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>여유 있는 터치 타겟 · 모바일, 소비자 앱</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <SolidButton color="primary" size="large">
                <SolidButton.Center>저장</SolidButton.Center>
              </SolidButton>
              <SolidButton color="black" size="large">
                <SolidButton.Center>편집</SolidButton.Center>
              </SolidButton>
              <SolidButton color="gray" size="large">
                <SolidButton.Center>취소</SolidButton.Center>
              </SolidButton>
            </div>
          </div>
        </div>
      </div>

      {/* 실전: 폼 제출 패턴 */}
      <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>M3 실전: 폼 + 버튼 밀도 매칭</p>
        <p style={{ margin: '0 0 20px', fontSize: '12px', color: '#64748b' }}>
          폼 필드의 크기와 버튼의 밀도를 일치시켜 일관된 레이아웃을 만듭니다.
        </p>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>이름</label>
            <input style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }} placeholder="홍길동" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>이메일</label>
            <input style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }} placeholder="hong@example.com" />
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '8px' }}>
            <SolidButton color="gray" size="medium">
              <SolidButton.Center>초기화</SolidButton.Center>
            </SolidButton>
            <SolidButton color="primary" size="medium">
              <SolidButton.Center>제출하기</SolidButton.Center>
            </SolidButton>
          </div>
        </div>
      </div>
    </div>
  ),
}

// ─── Material 3: FAB (Floating Action Button) 패턴 ───────────────────────────
// FAB는 화면의 가장 중요한 액션을 위해 항상 떠 있는 버튼입니다.
// M3에서는 Small FAB / Regular FAB / Large FAB / Extended FAB 4가지를 정의합니다.
export const Material3_FAB_패턴: Story = {
  name: 'Material 3 - FAB (Floating Action Button) 패턴',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '560px' }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          M3 FAB Variants
        </p>
        <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
          FAB는 SolidButton에 원형/확장 스타일을 추가하여 구현합니다.
          페이지에서 가장 중요한 단일 액션에만 사용하세요.
        </p>
      </div>

      {/* FAB 변형들 */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {/* Small FAB */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ padding: '20px', background: 'rgba(99,102,241,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.25)' }}>
            <SolidButton color="primary" size="small">
              <SolidButton.Center>+</SolidButton.Center>
            </SolidButton>
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Small FAB</span>
        </div>

        {/* Regular FAB */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ padding: '20px', background: 'rgba(99,102,241,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.25)' }}>
            <SolidButton color="primary" size="medium">
              <SolidButton.Center>+</SolidButton.Center>
            </SolidButton>
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Regular FAB</span>
        </div>

        {/* Large FAB */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ padding: '20px', background: 'rgba(99,102,241,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.25)' }}>
            <SolidButton color="primary" size="large">
              <SolidButton.Center>+</SolidButton.Center>
            </SolidButton>
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Large FAB</span>
        </div>

        {/* Extended FAB */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ padding: '20px', background: 'rgba(99,102,241,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.25)' }}>
            <SolidButton color="primary" size="large">
              <SolidButton.Leading>
                <ChatLineIcon />
              </SolidButton.Leading>
              <SolidButton.Center>새 메시지 작성</SolidButton.Center>
            </SolidButton>
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Extended FAB</span>
        </div>
      </div>

      {/* FAB 실전 배치 예시 */}
      <div style={{ position: 'relative', height: '280px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>M3 실전: FAB 배치 위치</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>FAB는 우측 하단(모바일) 또는 우측 상단(태블릿/PC)에 배치합니다.</p>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['아티클 1 - Orbit UI 디자인 토큰 가이드', '아티클 2 - Material 3 컬러 시스템', '아티클 3 - Mantine v7 마이그레이션'].map((item) => (
              <div key={item} style={{ padding: '12px 16px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#374151' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* FAB 위치 */}
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', boxShadow: '0 6px 24px rgba(99,102,241,0.4)' }}>
          <SolidButton color="primary" size="large">
            <SolidButton.Leading>
              <ChatLineIcon />
            </SolidButton.Leading>
            <SolidButton.Center>작성</SolidButton.Center>
          </SolidButton>
        </div>
      </div>
    </div>
  ),
}

// ─── shadcn/ui: 아이콘 + 텍스트 조합 패턴 ────────────────────────────────────
// shadcn/ui Button은 아이콘과 텍스트를 자유롭게 조합합니다.
// SolidButton의 Compound 패턴으로 동일하게 구현합니다.
export const shadcn_아이콘_조합_패턴: Story = {
  name: 'shadcn/ui - 아이콘+텍스트 조합 패턴',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '560px' }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          shadcn/ui Icon+Text Patterns
        </p>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
          Leading(왼쪽 아이콘), Trailing(오른쪽 아이콘), 크기별 아이콘 스케일 패턴을 데모합니다.
        </p>
      </div>

      <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Leading Icon (아이콘 왼쪽)</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <SolidButton color="primary" size="medium">
            <SolidButton.Leading><SearchIcon size={14} /></SolidButton.Leading>
            <SolidButton.Center>검색</SolidButton.Center>
          </SolidButton>
          <SolidButton color="black" size="medium">
            <SolidButton.Leading><NotificationLineIcon size={14} /></SolidButton.Leading>
            <SolidButton.Center>알림 설정</SolidButton.Center>
          </SolidButton>
          <SolidButton color="gray" size="medium">
            <SolidButton.Leading><SettingLineIcon size={14} /></SolidButton.Leading>
            <SolidButton.Center>환경설정</SolidButton.Center>
          </SolidButton>
        </div>
      </div>

      <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Trailing Icon (아이콘 오른쪽)</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <SolidButton color="primary" size="medium">
            <SolidButton.Center>다음 단계</SolidButton.Center>
            <SolidButton.Trailing><ArrowRightIcon size={14} /></SolidButton.Trailing>
          </SolidButton>
          <SolidButton color="black" size="medium">
            <SolidButton.Center>계속하기</SolidButton.Center>
            <SolidButton.Trailing><ChevronRightLineIcon size={14} /></SolidButton.Trailing>
          </SolidButton>
        </div>
      </div>

      <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>크기별 아이콘 스케일 (small / medium / large)</p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <SolidButton color="primary" size="small">
            <SolidButton.Leading><ChatLineIcon size={12} /></SolidButton.Leading>
            <SolidButton.Center>Small</SolidButton.Center>
          </SolidButton>
          <SolidButton color="primary" size="medium">
            <SolidButton.Leading><ChatLineIcon size={14} /></SolidButton.Leading>
            <SolidButton.Center>Medium</SolidButton.Center>
          </SolidButton>
          <SolidButton color="primary" size="large">
            <SolidButton.Leading><ChatLineIcon size={16} /></SolidButton.Leading>
            <SolidButton.Center>Large</SolidButton.Center>
          </SolidButton>
        </div>
      </div>
    </div>
  ),
} satisfies Story

// ─── shadcn/ui: 인터랙티브 로딩 상태 패턴 ────────────────────────────────────
// shadcn/ui에서 버튼 클릭 후 로딩 → 완료 상태를 전환하는 패턴입니다.
// SolidButton의 loading prop과 disabled로 동일하게 구현합니다.
function InteractiveLoadingRender() {
  const [states, setStates] = useState<Record<string, 'idle' | 'loading' | 'done'>>({
    save: 'idle',
    submit: 'idle',
    delete: 'idle',
  })

  const trigger = (key: string, duration = 1500) => {
    setStates((prev) => ({ ...prev, [key]: 'loading' }))
    setTimeout(() => {
      setStates((prev) => ({ ...prev, [key]: 'done' }))
      setTimeout(() => {
        setStates((prev) => ({ ...prev, [key]: 'idle' }))
      }, 1500)
    }, duration)
  }

  const actions = [
    { key: 'save', label: '변경사항 저장', loadingLabel: '저장 중...', doneLabel: '저장 완료', color: 'primary' as const },
    { key: 'submit', label: '제출하기', loadingLabel: '처리 중...', doneLabel: '제출 완료', color: 'black' as const },
    { key: 'delete', label: '계정 삭제', loadingLabel: '삭제 중...', doneLabel: '삭제됨', color: 'gray' as const },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px' }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          shadcn/ui Interactive Loading Pattern
        </p>
        <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
          버튼을 클릭하면 로딩 → 완료 상태 전환을 확인할 수 있습니다.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {actions.map(({ key, label, loadingLabel, doneLabel, color }) => {
          const state = states[key]
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <SolidButton
                color={color}
                size="medium"
                loading={state === 'loading'}
                disabled={state !== 'idle'}
                onClick={() => trigger(key)}
                style={{ minWidth: '160px' }}
              >
                <SolidButton.Center>
                  {state === 'loading' ? loadingLabel : state === 'done' ? doneLabel : label}
                </SolidButton.Center>
              </SolidButton>
              <span style={{
                fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '99px',
                background: state === 'idle' ? '#f1f5f9' : state === 'loading' ? 'rgba(99,102,241,0.08)' : 'rgba(16,185,129,0.08)',
                color: state === 'idle' ? '#94a3b8' : state === 'loading' ? '#6366f1' : '#10b981',
              }}>
                {state}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ padding: '16px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: '600', color: '#475569' }}>shadcn/ui vs Orbit UI 로딩 패턴 비교</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ padding: '10px', borderRadius: '8px', background: '#0f172a', fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.6 }}>
            {'// shadcn/ui\n<Button disabled={isPending}>\n  {isPending && <Loader2 />}\n  Save\n</Button>'}
          </div>
          <div style={{ padding: '10px', borderRadius: '8px', background: '#0f172a', fontSize: '11px', color: '#e2e8f0', fontFamily: 'monospace', lineHeight: 1.6 }}>
            {'// Orbit UI\n<SolidButton loading={isPending}>\n  <SolidButton.Loading />\n  <SolidButton.Center>Save\n  </SolidButton.Center>\n</SolidButton>'}
          </div>
        </div>
      </div>
    </div>
  )
}

export const shadcn_인터랙티브_로딩_패턴: Story = {
  name: 'shadcn/ui - 인터랙티브 로딩 상태 패턴',
  render: () => <InteractiveLoadingRender />,
} satisfies Story

// ─── Chakra UI: ButtonGroup 연결 패턴 ────────────────────────────────────────
// Chakra UI의 ButtonGroup isAttached prop — 버튼을 하나의 연결된 그룹으로 표시
export const Chakra_버튼_그룹_연결_패턴: Story = {
  name: 'Chakra UI - ButtonGroup 연결 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI ButtonGroup isAttached 패턴. 툴바·액션 그룹에서 관련 버튼을 시각적으로 연결합니다. ' +
          'SolidButton에 borderRadius를 조정해 동일하게 구현합니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 540 }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Chakra UI ButtonGroup isAttached
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
          관련 액션을 하나의 연결된 그룹으로 묶어 공간 효율을 높이고 의미적 연관성을 표현합니다.
        </p>
      </div>

      {/* 텍스트 정렬 그룹 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>텍스트 정렬</span>
        <div style={{ display: 'flex' }}>
          {(['좌', '가운데', '우'] as const).map((label, i, arr) => (
            <SolidButton
              key={label}
              color="gray"
              size="small"
              style={{
                borderRadius: i === 0 ? '8px 0 0 8px' : i === arr.length - 1 ? '0 8px 8px 0' : '0',
                borderRight: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.12)' : undefined,
              }}
            >
              <SolidButton.Center>{label}</SolidButton.Center>
            </SolidButton>
          ))}
        </div>
      </div>

      {/* 뷰 전환 그룹 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>뷰 전환</span>
        <div style={{ display: 'flex' }}>
          <SolidButton color="primary" size="medium" style={{ borderRadius: '8px 0 0 8px' }}>
            <SolidButton.Leading><SearchIcon size={14} /></SolidButton.Leading>
            <SolidButton.Center>목록</SolidButton.Center>
          </SolidButton>
          <SolidButton color="gray" size="medium" style={{ borderRadius: '0', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
            <SolidButton.Leading><SettingLineIcon size={14} /></SolidButton.Leading>
            <SolidButton.Center>그리드</SolidButton.Center>
          </SolidButton>
          <SolidButton color="gray" size="medium" style={{ borderRadius: '0 8px 8px 0', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
            <SolidButton.Center>캘린더</SolidButton.Center>
          </SolidButton>
        </div>
      </div>

      {/* 위험 확인 그룹 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>확인·취소 그룹</span>
        <div style={{ display: 'flex' }}>
          <SolidButton color="gray" size="medium" style={{ borderRadius: '8px 0 0 8px' }}>
            <SolidButton.Center>취소</SolidButton.Center>
          </SolidButton>
          <SolidButton color="black" size="medium" style={{ borderRadius: '0 8px 8px 0', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
            <SolidButton.Center>확인</SolidButton.Center>
          </SolidButton>
        </div>
      </div>
    </div>
  ),
} satisfies Story

// ─── Chakra UI: 소셜 로그인 버튼 패턴 ───────────────────────────────────────
// Chakra UI에서 자주 쓰이는 소셜 액션 버튼 — SVG 아이콘 + 레이블 조합
function ChakraSocialButtonRender() {
  const [clickedProvider, setClickedProvider] = useState<string | null>(null)

  const providers = [
    {
      name: 'Google',
      color: 'white' as const,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.88z" fill="#4285F4" />
          <path d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.58-2a4.8 4.8 0 01-7.14-2.52H.9v2.07A8 8 0 008 16z" fill="#34A853" />
          <path d="M3.57 9.54A4.8 4.8 0 013.32 8c0-.54.1-1.06.25-1.54V4.39H.9A8 8 0 000 8c0 1.29.31 2.51.9 3.61l2.67-2.07z" fill="#FBBC05" />
          <path d="M8 3.18c1.22 0 2.31.42 3.17 1.24l2.37-2.37A8 8 0 00.9 4.39l2.67 2.07A4.77 4.77 0 018 3.18z" fill="#EA4335" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      color: 'black' as const,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38v-1.34C3.73 14.36 3.26 12.9 3.26 12.9c-.36-.92-.89-1.16-.89-1.16-.73-.5.06-.49.06-.49.8.06 1.23.82 1.23.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.77-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82a7.67 7.67 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.14.46.55.38A8 8 0 008 0z" />
        </svg>
      ),
    },
    {
      name: 'Kakao',
      color: 'primary' as const,
      icon: (
        <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor">
          <path d="M8 0C3.58 0 0 2.8 0 6.25c0 2.22 1.47 4.17 3.68 5.28l-.94 3.5 4.08-2.7c.39.05.78.07 1.18.07 4.42 0 8-2.8 8-6.25C16 2.8 12.42 0 8 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 400 }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Chakra UI Social Auth Pattern
        </p>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
          소셜 로그인 버튼은 Chakra UI에서 흔히 볼 수 있는 패턴입니다. SVG 인라인 아이콘 + 레이블 조합입니다.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {providers.map(({ name, color, icon }) => (
          <SolidButton
            key={name}
            color={color}
            size="large"
            onClick={() => setClickedProvider(name)}
            style={{ width: '100%', justifyContent: 'center', position: 'relative' }}
          >
            <SolidButton.Leading>{icon}</SolidButton.Leading>
            <SolidButton.Center>{name}로 계속하기</SolidButton.Center>
          </SolidButton>
        ))}
      </div>
      {clickedProvider && (
        <div style={{ padding: '10px 16px', borderRadius: 10, background: '#f0fdf4', border: '1.5px solid #bbf7d0', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
          {clickedProvider} 로그인 선택됨
        </div>
      )}
      <div style={{ padding: '14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11 }}>
        <div style={{ padding: '8px', borderRadius: 8, background: '#0f172a', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.6 }}>
          {'// Chakra UI\n<Button leftIcon={<Google />}>\n  Google로 계속\n</Button>'}
        </div>
        <div style={{ padding: '8px', borderRadius: 8, background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', lineHeight: 1.6 }}>
          {'// Orbit UI\n<SolidButton>\n  <SolidButton.Leading><Google /></SolidButton.Leading>\n  <SolidButton.Center>Google로 계속</SolidButton.Center>\n</SolidButton>'}
        </div>
      </div>
    </div>
  )
}

export const Chakra_소셜_로그인_버튼: Story = {
  name: 'Chakra UI - 소셜 로그인 버튼 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI Button + leftIcon 패턴. 인라인 SVG 아이콘과 레이블을 조합한 소셜 인증 버튼입니다. ' +
          'Orbit UI의 SolidButton.Leading으로 동일 패턴을 구현합니다.',
      },
    },
  },
  render: () => <ChakraSocialButtonRender />,
} satisfies Story

// ─── Chakra UI: 확인 다이얼로그 액션 그룹 ────────────────────────────────────
// Chakra UI의 AlertDialog 패턴 — 위험 액션 전 사용자 확인 UI
function ChakraConfirmDialogRender() {
  const [open, setOpen] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)

  const actions = [
    { id: 'logout', label: '로그아웃', confirmLabel: '로그아웃', desc: '현재 세션이 종료됩니다.', danger: false },
    { id: 'delete', label: '계정 삭제', confirmLabel: '영구 삭제', desc: '모든 데이터가 영구 삭제됩니다. 이 작업은 되돌릴 수 없습니다.', danger: true },
    { id: 'archive', label: '프로젝트 보관', confirmLabel: '보관하기', desc: '프로젝트가 보관 처리됩니다. 언제든 복원할 수 있습니다.', danger: false },
  ]

  const confirm = (id: string) => {
    setOpen(null)
    setDone(id)
    setTimeout(() => setDone(null), 2500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 440 }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Chakra UI AlertDialog 패턴
        </p>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
          위험한 액션은 확인 다이얼로그로 사용자 의도를 재확인합니다. 취소를 기본 포커스로 설정합니다.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {actions.map((action) => (
          <div key={action.id}>
            <SolidButton
              color={action.danger ? 'gray' : 'black'}
              size="medium"
              onClick={() => setOpen(action.id)}
            >
              <SolidButton.Center>{action.label}</SolidButton.Center>
            </SolidButton>
            {open === action.id && (
              <div style={{ marginTop: 10, padding: '16px', borderRadius: 12, border: `2px solid ${action.danger ? '#fecaca' : '#e2e8f0'}`, background: action.danger ? '#fff5f5' : '#f8fafc' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: action.danger ? '#ef4444' : '#1e293b', marginBottom: 6 }}>{action.label} 확인</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 14 }}>{action.desc}</div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <SolidButton color="gray" size="small" onClick={() => setOpen(null)}>
                    <SolidButton.Center>취소</SolidButton.Center>
                  </SolidButton>
                  <SolidButton color="black" size="small" onClick={() => confirm(action.id)}>
                    <SolidButton.Center>{action.confirmLabel}</SolidButton.Center>
                  </SolidButton>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {done && (
        <div style={{ padding: '12px 16px', borderRadius: 10, background: '#f0fdf4', border: '1.5px solid #bbf7d0', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
          {actions.find((a) => a.id === done)?.label} 완료
        </div>
      )}
    </div>
  )
}

export const Chakra_확인_다이얼로그_액션: Story = {
  name: 'Chakra UI - 확인 다이얼로그 액션 패턴',
  parameters: {
    docs: {
      description: {
        story:
          'Chakra UI AlertDialog 패턴. 위험·되돌릴 수 없는 액션 전 인라인 확인 UI를 표시합니다. ' +
          '취소를 기본 강조로 두어 실수를 방지합니다.',
      },
    },
  },
  render: () => <ChakraConfirmDialogRender />,
} satisfies Story

/* --------------------------------------------------------------------------
   Vercel — 배포 액션 버튼 패턴 (Cycle 120)
   Vercel Design의 compact action button 패턴 — 배포/롤백/취소
-------------------------------------------------------------------------- */
function VercelDeployActionsRender() {
  const [status, setStatus] = useState<'idle' | 'deploying' | 'done' | 'error'>('idle')

  function deploy() {
    setStatus('deploying')
    setTimeout(() => setStatus('done'), 2000)
  }

  function rollback() {
    setStatus('deploying')
    setTimeout(() => setStatus('idle'), 1500)
  }

  const statusConfig = {
    idle: { label: '대기', color: '#94a3b8' },
    deploying: { label: '배포 중', color: '#f59e0b' },
    done: { label: '완료', color: '#10b981' },
    error: { label: '실패', color: '#ef4444' },
  }

  return (
    <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 16, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusConfig[status].color, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>orbit-ui / main</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>상태: {statusConfig[status].label}</div>
        </div>
        <code style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>232bae7</code>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <SolidButton color="primary" size="medium" disabled={status === 'deploying'} onClick={deploy}>
          <SolidButton.Center>{status === 'deploying' ? '배포 중...' : '배포'}</SolidButton.Center>
        </SolidButton>
        <SolidButton color="black" size="medium" disabled={status !== 'done'} onClick={rollback}>
          <SolidButton.Center>롤백</SolidButton.Center>
        </SolidButton>
        <SolidButton color="black" size="medium" disabled={status !== 'deploying'} onClick={() => setStatus('error')}>
          <SolidButton.Center>취소</SolidButton.Center>
        </SolidButton>
      </div>

      {status === 'done' && (
        <div style={{ padding: '10px 14px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 12, color: '#16a34a' }}>
          배포 완료 — storybook-static.vercel.app 에서 확인 가능합니다.
        </div>
      )}
      {status === 'error' && (
        <div style={{ padding: '10px 14px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', fontSize: 12, color: '#dc2626' }}>
          배포가 취소되었습니다. 다시 시도하려면 배포 버튼을 클릭하세요.
        </div>
      )}
    </div>
  )
}

export const Vercel_배포_액션_버튼: Story = {
  name: 'Vercel — 배포 액션 버튼 패턴 (Cycle 120)',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Design의 compact action button 패턴. 배포/롤백/취소 상태에 따라 버튼 활성화 제어, 상태 인디케이터 및 결과 메시지 표시.',
      },
    },
  },
  render: () => <VercelDeployActionsRender />,
} satisfies Story

/* --------------------------------------------------------------------------
   shadcn/ui — 폼 제출 버튼 상태 (Cycle 120)
   shadcn의 button + form validation 패턴 — 유효성 기반 제어
-------------------------------------------------------------------------- */
function ShadcnFormSubmitRender() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const isValid = name.trim().length >= 2 && email.includes('@')

  function handleSubmit() {
    if (!isValid) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  if (submitted) {
    return (
      <div style={{ width: 360, padding: '32px 24px', textAlign: 'center', border: '1px solid #bbf7d0', borderRadius: 10, background: '#f0fdf4' }}>
        <div style={{ fontSize: 20, marginBottom: 8 }}>✓</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#16a34a', marginBottom: 4 }}>등록 완료</div>
        <div style={{ fontSize: 13, color: '#4ade80' }}>{email} 로 확인 메일을 발송했습니다.</div>
        <div style={{ marginTop: 16 }}>
          <SolidButton color="primary" size="small" onClick={() => { setSubmitted(false); setName(''); setEmail('') }}>
            <SolidButton.Center>다시 시도</SolidButton.Center>
          </SolidButton>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 12, padding: 20, border: '1px solid #e2e8f0', borderRadius: 10 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>회원 등록</div>
      <input
        placeholder="이름 (최소 2자)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px 12px', borderRadius: 6, border: `1px solid ${name && name.trim().length < 2 ? '#fca5a5' : '#e2e8f0'}`, fontSize: 13, outline: 'none' }}
      />
      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '8px 12px', borderRadius: 6, border: `1px solid ${email && !email.includes('@') ? '#fca5a5' : '#e2e8f0'}`, fontSize: 13, outline: 'none' }}
      />
      <SolidButton color="primary" size="medium" disabled={!isValid || loading} onClick={handleSubmit}>
        <SolidButton.Center>{loading ? '처리 중...' : '등록하기'}</SolidButton.Center>
        {!loading && isValid && <SolidButton.Trailing><ArrowRightIcon style={{ width: 14, height: 14 }} /></SolidButton.Trailing>}
      </SolidButton>
      {!isValid && (name || email) && (
        <div style={{ fontSize: 11, color: '#f59e0b' }}>이름과 올바른 이메일을 입력해야 제출 버튼이 활성화됩니다.</div>
      )}
    </div>
  )
}

export const shadcn_폼_제출_버튼_상태: Story = {
  name: 'shadcn/ui — 폼 제출 버튼 상태 (Cycle 120)',
  parameters: {
    docs: {
      description: {
        story:
          'shadcn/ui의 form submit button 패턴. 유효성 검사 기반 버튼 활성화, 로딩 상태, 완료 피드백. 이름 2자+ + 이메일 @ 포함 시 제출 버튼 활성화.',
      },
    },
  },
  render: () => <ShadcnFormSubmitRender />,
} satisfies Story

/* --------------------------------------------------------------------------
   Vercel + shadcn — 위험 영역 액션 버튼 (Cycle 120)
   삭제/초기화 등 destructive action 확인 패턴
-------------------------------------------------------------------------- */
function VercelShadcnDestructiveRender() {
  const [confirmStep, setConfirmStep] = useState<'idle' | 'confirm' | 'done'>('idle')
  const [inputVal, setInputVal] = useState('')
  const projectName = 'orbit-ui'

  function reset() {
    setConfirmStep('idle')
    setInputVal('')
  }

  return (
    <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>위험 영역</div>

      <div style={{ padding: '16px', borderRadius: 8, border: '1.5px solid #fecaca', background: '#fff' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#dc2626', marginBottom: 4 }}>프로젝트 삭제</div>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
          이 작업은 되돌릴 수 없습니다. 모든 배포, 환경 변수, 설정이 영구 삭제됩니다.
        </div>

        {confirmStep === 'idle' && (
          <SolidButton color="primary" size="small" onClick={() => setConfirmStep('confirm')}>
            <SolidButton.Center>프로젝트 삭제</SolidButton.Center>
          </SolidButton>
        )}

        {confirmStep === 'confirm' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 12, color: '#475569' }}>
              확인을 위해 <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>{projectName}</code> 를 입력하세요:
            </div>
            <input
              placeholder={projectName}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{ padding: '7px 10px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', fontFamily: 'monospace' }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <SolidButton color="primary" size="small" disabled={inputVal !== projectName} onClick={() => setConfirmStep('done')}>
                <SolidButton.Center>영구 삭제</SolidButton.Center>
              </SolidButton>
              <SolidButton color="black" size="small" onClick={reset}>
                <SolidButton.Center>취소</SolidButton.Center>
              </SolidButton>
            </div>
          </div>
        )}

        {confirmStep === 'done' && (
          <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
            프로젝트가 삭제되었습니다. (데모)
          </div>
        )}
      </div>
    </div>
  )
}

export const Vercel_shadcn_위험_영역_액션: Story = {
  name: 'Vercel + shadcn — 위험 영역 destructive 버튼 (Cycle 120)',
  parameters: {
    docs: {
      description: {
        story:
          'Vercel Design + shadcn/ui의 destructive action 확인 패턴. 삭제 버튼 → 프로젝트명 재입력 확인 → 영구 삭제 3단계 플로우.',
      },
    },
  },
  render: () => <VercelShadcnDestructiveRender />,
} satisfies Story

/* --------------------------------------------------------------------------
   shadcn/ui — 공유 액션 버튼 그룹 (Copy URL / Download / Share)
-------------------------------------------------------------------------- */
function ShadcnShareActionsRender() {
  const [copied, setCopied] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  }

  return (
    <div style={{ maxWidth: 420, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 4 }}>공유 옵션</p>
      <p style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 16 }}>이 컴포넌트 예시를 팀과 공유하세요.</p>
      <div style={{ display: 'flex', gap: 8, padding: '12px', borderRadius: 10, border: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-surfaceDefault)', marginBottom: 12 }}>
        <input
          readOnly
          value="https://orbit.ui/components/button#solid"
          style={{ flex: 1, fontSize: 12, color: 'var(--sem-eclipse-color-foregroundSecondary)', background: 'none', border: 'none', outline: 'none', fontFamily: 'monospace' }}
        />
        <SolidButton color="primary" size="small" onClick={handleCopy}>
          <SolidButton.Center>{copied ? '복사됨!' : 'URL 복사'}</SolidButton.Center>
        </SolidButton>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <SolidButton color="black" size="small" onClick={handleDownload} style={{ flex: 1 }}>
          <SolidButton.Center>{downloaded ? '다운로드 완료' : 'PNG 다운로드'}</SolidButton.Center>
        </SolidButton>
        <SolidButton color="gray" size="small" style={{ flex: 1 }}>
          <SolidButton.Center>Figma로 내보내기</SolidButton.Center>
        </SolidButton>
      </div>
    </div>
  )
}

export const Shadcn_공유_액션_버튼_그룹: Story = {
  name: 'shadcn/ui — 공유 액션 버튼 그룹 (Copy URL / Download / Share)',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui의 Copy URL 버튼 패턴. 클릭 후 "복사됨!" 텍스트로 즉각 피드백을 제공하고 2초 후 원래 텍스트로 복귀. SaaS 문서/컴포넌트 공유 UI에서 자주 쓰이는 패턴.',
      },
    },
  },
  render: () => <ShadcnShareActionsRender />,
} satisfies Story

/* --------------------------------------------------------------------------
   Linear Design — 이슈 생성 인라인 폼 (컨텍스트 버튼 그룹)
-------------------------------------------------------------------------- */
function LinearIssueCreateRender() {
  const [priority, setPriority] = useState<'urgent' | 'high' | 'medium' | 'low'>('medium')
  const [title, setTitle] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const priorityConfig = {
    urgent: { label: '긴급', color: '#ef4444' },
    high: { label: '높음', color: '#f59e0b' },
    medium: { label: '보통', color: '#6366f1' },
    low: { label: '낮음', color: '#94a3b8' },
  }

  const priorities = ['urgent', 'high', 'medium', 'low'] as const

  const handleSubmit = () => {
    if (title.trim()) {
      setSubmitted(true)
      setTimeout(() => { setSubmitted(false); setTitle('') }, 2500)
    }
  }

  return (
    <div style={{ maxWidth: 460, fontFamily: 'system-ui, sans-serif' }}>
      {submitted ? (
        <div style={{ padding: '16px', borderRadius: 10, border: '1px solid #bbf7d0', background: '#f0fdf4', textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#16a34a' }}>이슈가 생성되었습니다</p>
          <p style={{ fontSize: 11, color: '#22c55e' }}>ORB-{Math.floor(Math.random() * 900) + 100}: {title}</p>
        </div>
      ) : (
        <div style={{ padding: '16px', borderRadius: 10, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: 'var(--sem-eclipse-color-surfaceDefault)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="이슈 제목..."
            style={{ width: '100%', fontSize: 14, fontWeight: 500, color: 'var(--sem-eclipse-color-foregroundPrimary)', border: 'none', outline: 'none', background: 'none', marginBottom: 12, boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 10, borderTop: '1px solid var(--sem-eclipse-color-borderSubtle)' }}>
            <span style={{ fontSize: 11, color: 'var(--sem-eclipse-color-foregroundTertiary)' }}>우선순위:</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {priorities.map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, border: `1px solid ${priority === p ? priorityConfig[p].color : 'var(--sem-eclipse-color-borderSubtle)'}`, background: priority === p ? `${priorityConfig[p].color}18` : 'transparent', color: priority === p ? priorityConfig[p].color : 'var(--sem-eclipse-color-foregroundTertiary)', cursor: 'pointer', fontWeight: priority === p ? 600 : 400, transition: 'all 0.15s' }}
                >
                  {priorityConfig[p].label}
                </button>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <SolidButton color="gray" size="small" onClick={() => setTitle('')}>
              <SolidButton.Center>취소</SolidButton.Center>
            </SolidButton>
            <SolidButton color="primary" size="small" onClick={handleSubmit} disabled={!title.trim()}>
              <SolidButton.Center>이슈 생성</SolidButton.Center>
              <SolidButton.Trailing><ArrowRightIcon style={{ width: 12, height: 12 }} /></SolidButton.Trailing>
            </SolidButton>
          </div>
        </div>
      )}
    </div>
  )
}

export const Linear_이슈_생성_인라인_폼: Story = {
  name: 'Linear Design — 이슈 생성 인라인 폼 (컨텍스트 버튼 그룹)',
  parameters: {
    docs: {
      description: {
        story: 'Linear의 이슈 생성 인라인 폼 패턴. 우선순위 선택 → 제목 입력 → 생성/취소 버튼 구성. 제목 미입력 시 생성 버튼 비활성화, 성공 시 녹색 피드백 메시지.',
      },
    },
  },
  render: () => <LinearIssueCreateRender />,
} satisfies Story

/* --------------------------------------------------------------------------
   shadcn/ui + Linear — 확인/취소 패턴 (다이얼로그 액션 영역)
-------------------------------------------------------------------------- */
function ShadcnLinearConfirmActionsRender() {
  const [scenario, setScenario] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const scenarios = [
    { key: 'idle', label: '기본 상태' },
    { key: 'loading', label: '처리 중' },
    { key: 'success', label: '성공' },
    { key: 'error', label: '오류' },
  ] as const

  const handleConfirm = () => {
    setScenario('loading')
    setTimeout(() => {
      setScenario(Math.random() > 0.3 ? 'success' : 'error')
      setTimeout(() => setScenario('idle'), 2000)
    }, 1500)
  }

  return (
    <div style={{ maxWidth: 420, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {scenarios.map((s) => (
          <button
            key={s.key}
            onClick={() => setScenario(s.key)}
            style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, border: '1px solid var(--sem-eclipse-color-borderDefault)', background: scenario === s.key ? 'var(--sem-eclipse-color-fillPrimary)' : 'transparent', color: scenario === s.key ? '#fff' : 'var(--sem-eclipse-color-foregroundTertiary)', cursor: 'pointer' }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '20px', borderRadius: 12, border: '1px solid var(--sem-eclipse-color-borderSubtle)', background: 'var(--sem-eclipse-color-surfaceDefault)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--sem-eclipse-color-foregroundPrimary)', marginBottom: 6 }}>변경 사항 저장</p>
        <p style={{ fontSize: 12, color: 'var(--sem-eclipse-color-foregroundTertiary)', marginBottom: 20 }}>수정된 내용을 저장하면 다른 팀원에게도 반영됩니다.</p>

        {scenario === 'success' && (
          <div style={{ padding: '8px 12px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', marginBottom: 12, fontSize: 12, color: '#16a34a', fontWeight: 500 }}>
            저장이 완료되었습니다.
          </div>
        )}
        {scenario === 'error' && (
          <div style={{ padding: '8px 12px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', marginBottom: 12, fontSize: 12, color: '#dc2626', fontWeight: 500 }}>
            저장에 실패했습니다. 다시 시도해 주세요.
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <SolidButton color="gray" size="small" disabled={scenario === 'loading'}>
            <SolidButton.Center>취소</SolidButton.Center>
          </SolidButton>
          <SolidButton
            color="primary"
            size="small"
            onClick={handleConfirm}
            disabled={scenario === 'loading' || scenario === 'success'}
          >
            <SolidButton.Center>
              {scenario === 'loading' ? '저장 중...' : scenario === 'success' ? '저장됨' : '저장'}
            </SolidButton.Center>
          </SolidButton>
        </div>
      </div>
    </div>
  )
}

export const Shadcn_Linear_확인_취소_패턴: Story = {
  name: 'shadcn/ui + Linear — 확인/취소 다이얼로그 액션',
  parameters: {
    docs: {
      description: {
        story: 'shadcn/ui AlertDialog + Linear 모달 액션 조합 패턴. 기본/처리중/성공/오류 4가지 상태를 SolidButton으로 표현. 처리 중 disabled 처리, 성공/오류 인라인 피드백.',
      },
    },
  },
  render: () => <ShadcnLinearConfirmActionsRender />,
} satisfies Story
