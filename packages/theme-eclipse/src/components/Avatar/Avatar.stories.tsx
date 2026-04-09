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
