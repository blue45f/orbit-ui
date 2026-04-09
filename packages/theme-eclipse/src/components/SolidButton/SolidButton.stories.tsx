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
